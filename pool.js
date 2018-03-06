// TODO: key scaling, when higher shorter so the env isn't the same for everything
// start() stop() to optimize synths
// note on off on mouse down / mouse up
// horizontal dragging
// hold down mouse?
// compressor between synth and reverb
// sound interferes with each other?
// mouse / cursor...
// AUDIO
var audioCtx = new (window.AudioContext || window.webkitAudioContext); // create context
var reverb = new Reverb(audioCtx, 'sounds/minster1_000_ortf_48k.wav');
var poolNode = document.getElementById('pond');
var tones = [45, 48, 50, 52, 55, 57, 60, 62, 64, 67, 69];
var pool = new Pool(audioCtx, reverb.reverb, poolNode, tones);

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