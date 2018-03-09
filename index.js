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
var maj6 = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81];
var min6 = [57, 60, 62, 63, 67, 69, 72, 74, 75, 79, 81];
var wt = [60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80];
var dim = [60, 61, 63, 64, 66, 67, 69, 70, 72, 73, 75, 76]
var pool = new Pool(audioCtx, poolSynthsWet, poolSynthsDry, poolNode, dim);


// iterate over pool.synths to set timbre of each
pool.synths.map( (synth)=> {
	synth.setRatio(1, 2);
	synth.setModAmp(0.5);
	synth.setCarrEnv(0.1, 0.1, 1, 1, 0.5);
	synth.setModEnv(1, 0.01, 0.2, 1, 0.5);
	synth.setAmpMidi(5);
})

// use pool.setTones() to change the scale of the pool
// pool.setTones(tonesModulated);

// CONTROLS
var controlContainer = document.getElementById('controls');
var controls = ['amp', 'scale'];
controls = controls.map((item, i) => new Dial(controlContainer, i, item))
var ampDial = controls[0];
ampDial._dial.addEventListener('mousemove', (e) => handleAmpEvent(e));

function handleAmpEvent(e) {
	if(ampDial._mousedown) {
		pool.synths.map((synth) => {
			synth.setAmpMidi(ampDial._value);
			console.log(synth.getAmpMidi());
		})
	}
}