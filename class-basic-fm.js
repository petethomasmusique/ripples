class BasicFm {
	constructor(audioContext) {
		// initialize values
		this.ctx = audioContext;
		this.freq = 200; this.amp = 0.5;
		this.carrRatio = 5; this.modRatio = 4; this.modAmp = 4;
		this.a = 0.1; this.d = 0.1; this.s = 1; this.r = 1; this.sLevel = 0.5;
		this.aMod = 0.1; this.dMod = 0.1; this.sMod = 1; this.rMod = 1; this.sLevelMod = 0.5;
		this.carrier = new BasicOsc(this.ctx, 'sine', 440, 0);
		this.modulator = new BasicOsc(this.ctx, 'sine', 440, 0);
		// connect modulator node to the frequency of carrier
		this.modulator.volume.connect(this.carrier.osc.frequency);
		// connect volume of carrier to output using this.carrier.volume.connect()
	}
	freq_(freq) {
		this.freq = freq; // set global carrier freq value
		this.harmonicity_(freq); // set global mod freq value
		this.carrier.osc.frequency.setValueAtTime( // set carrier osc freq
			this.freq, 
			this.ctx.currentTime
		);
		this.modulator.osc.frequency.setValueAtTime( // set mod osc freq
			this.harmonicity, 
			this.ctx.currentTime
		);
	}
	harmonicity_() {
		this.harmonicity = (this.freq * this.modRatio) / this.carrRatio;
	}
	carrEnv_(a=this.a, d=this.d, s=this.s, r=this.r, sLevel=this.sLevel) {
		this.a = a;
		this.d = d;
		this.s = s;
		this.r = r;
		this.sLevel = sLevel;
	}
	modEnv_(a=this.aMod, d=this.dMod, s=this.sMod, r=this.rMod, sLevel=this.sLevelMod) {
		this.aMod = a;
		this.dMod = d;
		this.sMod = s;
		this.rMod = r;
		this.sLevelMod = sLevel;
	}
	triggerEnv_(osc, amp, a, d, s, r, sLevel) {
		var fadeTime = this.ctx.currentTime;
		var now = this.ctx.currentTime + 0.01;
		osc.volume.gain.cancelScheduledValues(fadeTime); // cancels anything that might be scheduled in the future
		osc.volume.gain.setValueAtTime(osc.volume.gain.value, fadeTime);
		osc.volume.gain.linearRampToValueAtTime(0, now); // attack
		osc.volume.gain.linearRampToValueAtTime(1 * amp, now + a); // attack
		osc.volume.gain.linearRampToValueAtTime(1 * amp, now + a); // attack
		osc.volume.gain.linearRampToValueAtTime(sLevel * amp, now + a + d); // decay
		osc.volume.gain.linearRampToValueAtTime(sLevel * amp, now + a + d + s); // sustain
		osc.volume.gain.linearRampToValueAtTime(0, now + a + d + s + r); // release
	}
	note_(note) {
		var positionFromConcertA = note - 69;
		return 440 * Math.pow(2, positionFromConcertA/12);
	}
	play(note=60, amp=this.amp) { // TODO: freq and amp args
		var freq = this.note_(note);
		this.freq_(freq);
		this.amp = amp;
		this.triggerEnv_(this.carrier, this.amp, this.a, this.d, this.s, this.r, this.sLevel);
		this.triggerEnv_(this.modulator, this.modAmp * this.harmonicity * this.amp, this.amp, this.aMod, this.dMod, this.sMod, this.rMod, this.sLevel);
	}
}
