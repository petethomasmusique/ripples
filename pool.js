// Refactor so as elegant as possible
// TODO: key scaling, when higher shorter so the env isn't the same for everything
// note on off on mouse down / mouse up
// horizontal dragging
// hold down mouse?
// compressor between synth and reverb
// sound interferes with each other?
// mouse / cursor...
// AUDIO UNITS
var audioCtx = new (window.AudioContext || window.webkitAudioContext); // create context
var basicFm = new BasicFm(audioCtx); // create synth
var reverb = audioCtx.createConvolver(); // create reverb
reverb.connect( audioCtx.destination ); // connect reverb to output
load_ir(reverb, "sounds/minster1_000_ortf_48k.wav"); // load ir for reverb unit

// DOM 
var mouseDown = false;
var pond = document.getElementById('pond');
var height = pond.clientHeight;
var width = pond.clientWidth;
window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);

// DATA
var tones = [45, 48, 50, 52, 55, 57, 60, 62, 64, 67, 69];
var tonesArray = new Array; //  array of synths

// create
createPond();
setTimbre();

function createPond() {
	var stripHeight = (height/tones.length); // make allowances for borders, this may change
	tones.map( (tone, i) => {
		tonesArray[i] = new BasicFm(audioCtx);	
		tonesArray[i].carrier.volume.connect( reverb ); // connect synth to output of reverb
		var div = document.createElement('div');
		div.style.height = stripHeight + 'px';
		div.style.width = width + 'px';
		div.addEventListener('mousedown', (e) => handleMouseDown(e, tone + 12, i));
		div.addEventListener('mouseover', (e) => handleMouseOver(e, tone + 12, i));
		pond.insertBefore(div, pond.firstChild);
	})
}

function handleMouseOver(e, note, i) {
	if (mouseDown) {
		tonesArray[i].modAmp = scaleNumbers(0, width, 0.1, 6, e.clientX);
		tonesArray[i].play(note, scaleNumbers(0, width, 0.05, 0.25, e.clientX));
		createRipple(e, width);
	} 
}

function handleMouseDown(e, note, i) {
	tonesArray[i].modAmp = scaleNumbers(0, width, 0.1, 6, e.clientX);
	tonesArray[i].play(note, scaleNumbers(0, width, 0.1, 0.4, e.clientX));
	createRipple(e, width);
}


function setTimbre() {
	tonesArray.map( (synth)=> {
		synth.carrRatio = 1;
		synth.modRatio = 2;
		synth.modRatio = 2;
		synth.modAmp = 2;
		synth.a = 0.1; 
		synth.aMod = 1; synth.dMod = 0.01; synth.dSus = 0.2;
	})
}