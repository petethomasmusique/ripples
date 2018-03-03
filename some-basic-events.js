// TODO: key scaling, when higher shorter so the env isn't the same for everything
// note on off on mouse down / mouse up
// compressor between synth and reverb

var audioCtx = new (window.AudioContext || window.webkitAudioContext);
var basicFm = new BasicFm(audioCtx);
var reverb = audioCtx.createConvolver();
reverb.connect( audioCtx.destination ); // connect reverb to output
load_ir(reverb, "sounds/minster1_000_ortf_48k.wav"); // load ir for reverb unit

var tones = [45, 48, 50, 52, 55, 57, 60, 62, 64, 67, 69];
var tonesArray = new Array;
var mouseDown = false;
var pond = document.getElementById('pond');
var height = pond.clientHeight;
var width = pond.clientWidth;
window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);

function handleMouseOver(e, note, i) {
	if (mouseDown) {
		tonesArray[i].modAmp = scaleNumbers(0, width, 1, 10, e.clientX);
		tonesArray[i].play(note);
	} 
}

function handleMouseDown(e, note, i) {
	tonesArray[i].modAmp = scaleNumbers(0, width, 1, 10, e.clientX);
	tonesArray[i].play(note);
}

function create() {
	var stripHeight = (height/tones.length); // make allowances for borders, this may change
	console.log(stripHeight);
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

function setTimbre() {
	tonesArray.map( (synth)=> {
		synth.carrRatio = 1;
		synth.modRatio = 2;
		synth.modRatio = 2;
		synth.modAmp = 2;
		synth.aMod = 0.01; synth.dMod = 0.1; synth.dSus = 0.2;
	})
}

function scaleNumbers(inMax, inMin, outMax, outMin, number) {
	percent = (number - inMin) / (inMax - inMin);
	return percent * (outMax - outMin) + outMin;
}

create();
setTimbre();
