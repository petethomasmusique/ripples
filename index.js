// horizontal dragging
// sound interferes with each other?
// AUDIO
var audioCtx = new (window.AudioContext || window.webkitAudioContext); // create context
var reverb = new Reverb(audioCtx, 'sounds/minster1_000_ortf_48k.wav');

// ROUTING
var poolSynthsDry = audioCtx.createGain();
poolSynthsDry.connect(audioCtx.destination);
poolSynthsDry.gain.setValueAtTime(0.2, audioCtx.currentTime);
var poolSynthsWet = audioCtx.createGain();
poolSynthsWet.connect(reverb.reverb);
poolSynthsWet.gain.setValueAtTime(0.1, audioCtx.currentTime);

// POOL
var poolNode = document.getElementById('pond');
var tones = [45, 48, 50, 52, 55, 57, 60, 62, 64, 67, 69];
var pool = new Pool(audioCtx, poolSynthsWet, poolSynthsDry, poolNode, tones);


// iterate over pool.synths to set timbre of each
pool.synths.map( (synth)=> {
	synth.carrRatio = 1;
	synth.modRatio = 2;
	synth.modRatio = 2;
	synth.modAmp = 2;
	synth.a = 0.1; 
	synth.aMod = 1; synth.dMod = 0.01; synth.dSus = 0.2;
})

// use pool.setTones() to change the scale of the pool
// pool.setTones(tonesModulated);