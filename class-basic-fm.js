class BasicFm {
	constructor(audioContext) {
		// initialize values
		this._ctx = audioContext;
		this._freq = 200; this._amp = 0.5;
		this._carrRatio = 5; this._modRatio = 4; this._modAmp = 4;
		this._a = 0.1; this._d = 0.1; this._s = 1; this._r = 1; this._sLevel = 0.5;
		this._aMod = 0.1; this._dMod = 0.1; this._sMod = 1; this._rMod = 1; this._sLevelMod = 0.5;
		this._carrier = new BasicOsc(this._ctx, 'sine', 440, 0);
		this._modulator = new BasicOsc(this._ctx, 'sine', 440, 0);
		// connect modulator node to the frequency of carrier
		this._modulator.volume.connect(this._carrier.osc.frequency);
		// by default connects carrier to main output. Can change using connectTo()
		this._carrier.volume.connect(this._ctx.destination);
	}
	_setFreq(freq) {
		this._freq = freq; // set global carrier _freq value
		this._setHarmonicity(); // set global mod _freq value
		this._carrier.osc.frequency.setValueAtTime( // set carrier osc _freq
			this._freq, 
			this._ctx.currentTime
		);
		this._modulator.osc.frequency.setValueAtTime( // set mod osc _freq
			this._harmonicity, 
			this._ctx.currentTime
		);
	}
	_setHarmonicity() {
		this._harmonicity = (this._freq * this._modRatio) / this._carrRatio;
	}

	_triggerEnv(osc, amp, a, d, s, r, sLevel) {
		var fadeTime = this._ctx.currentTime;
		var now = this._ctx.currentTime + 0.01;
		osc.volume.gain.cancelScheduledValues(fadeTime); // cancels anything that might be scheduled in the future
		osc.volume.gain.setValueAtTime(osc.volume.gain.value, fadeTime);
		osc.volume.gain.linearRampToValueAtTime(0, now); // attack
		osc.volume.gain.linearRampToValueAtTime(1 * amp, now + a); // attack
		osc.volume.gain.linearRampToValueAtTime(1 * amp, now + a); // attack
		osc.volume.gain.linearRampToValueAtTime(sLevel * amp, now + a + d); // decay
		osc.volume.gain.linearRampToValueAtTime(sLevel * amp, now + a + d + s); // sustain
		osc.volume.gain.linearRampToValueAtTime(0, now + a + d + s + r); // release
	}
	_getMidiCps(note) {
		var positionFromConcertA = note - 69;
		return 440 * Math.pow(2, positionFromConcertA/12);
	}

	// PUBLIC METHODS
	play(note=60, amp=this._amp) {
		var freq = this._getMidiCps(note);
		this._setFreq(freq);
		this._amp = amp;
		this._triggerEnv(this._carrier, this._amp, this._a, this._d, this._s, this._r, this._sLevel);
		this._triggerEnv(this._modulator, this._modAmp * this._harmonicity * this._amp, this._amp, this._aMod, this._dMod, this._sMod, this._rMod, this._sLevel);
	}
	setCarrEnv(a, d, s, r, sLevel) {
		this._a = a;
		this._d = d;
		this._s = s;
		this._r = r;
		this._sLevel = sLevel;
	}
	setModEnv(a, d, s, r, sLevel) {
		this._aMod = a;
		this._dMod = d;
		this._sMod = s;
		this._rMod = r;
		this._sLevelMod = sLevel;
	}
	setModAmp(amp) {
		this._modAmp = amp;
	}
	setRatio(carrRatio, modRatio) {
		this._carrRatio = carrRatio;
		this._modRatio = modRatio;
	}
	connectTo(outputNode, replace=true) {
		replace ? this._carrier.volume.disconnect() : null; // disconnect from all other sources first?
		this._carrier.volume.connect(outputNode);
	}
}
