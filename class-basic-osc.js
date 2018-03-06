class BasicOsc {
  	constructor(audioContext, waveform, freq=440, amp=0) { // option to set amp at start
      this.osc = audioContext.createOscillator();
      this.volume = audioContext.createGain();
      this.osc.type = waveform;
      this.osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      this.volume.gain.setValueAtTime(amp, audioContext.currentTime);
      this.osc.connect(this.volume);
      this.osc.start();
  	};
};

// rather than writing lots of methods, you can leverage the methods of the nodes you've created.
// E.g. BasicOsc.osc has all the methods available for the oscillator
// E.g. BasicOsc.volume has all the methods available for the gain node