// TODO: key scaling, when higher shorter so the env isn't the same for everything
// horizontal dragging
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
	synth.setRatio(1, 2)
	synth.setModAmp(2)
	synth._a = 0.1; 
	synth.setModEnv(1, 0.01, 0.2, 1, 0.5);
})

// use pool.setTones() to change the scale of the pool
// pool.setTones(tonesModulated);