// TODO: key scaling, when higher shorter so the env isn't the same for everything
// note on off on mouse down / mouse up
// horizontal dragging
// hold down mouse?
// compressor between synth and reverb
// sound interferes with each other?
// mouse / cursor...
// AUDIO
var audioCtx = new (window.AudioContext || window.webkitAudioContext); // create context
var reverb = new Reverb(audioCtx, 'sounds/minster1_000_ortf_48k.wav');

// THE POND
var pondObj = {
	pond: document.getElementById('pond'),
	height: this.pond.clientHeight,
	width: this.pond.clientWidth,
	tones: [45, 48, 50, 52, 55, 57, 60, 62, 64, 67, 69],
	synths: new Array,
	mouseDown: false,
}

// EVENT LISTENERS
window.addEventListener('mousedown', () => pondObj.mouseDown = true);
window.addEventListener('mouseup', () => pondObj.mouseDown = false);

// CREATE
createPond(pondObj);
createSynths(pondObj, reverb.reverb);
setSynthsTimbre(pondObj);

// HOUSEKEEPING
setInterval(() => deleteRipples(), 1000);
// TODO: turn off none playing synths...