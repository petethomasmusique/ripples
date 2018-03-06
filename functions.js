// POND
function createSynths(pondObj, outputNode) {
	// create a synth for each tone
	pondObj.tones.map( (tone, i) => {
		pondObj.synths[i] = new BasicFm(audioCtx);	
		pondObj.synths[i].carrier.volume.connect( outputNode ); // connect synth to output of reverb
	} )
}

function setSynthsTimbre(pondObj) {
	pondObj.synths.map( (synth)=> {
		synth.carrRatio = 1;
		synth.modRatio = 2;
		synth.modRatio = 2;
		synth.modAmp = 2;
		synth.a = 0.1; 
		synth.aMod = 1; synth.dMod = 0.01; synth.dSus = 0.2;
	})
}

function createPond(pondObj) {
	var stripHeight = (pondObj.height/pondObj.tones.length); 
	// create a strip in the dom for each tone
	pondObj.tones.map( (tone, i) => {
		var div = document.createElement('div');
		div.style.height = stripHeight + 'px';
		div.style.width = pondObj.width + 'px';
		div.addEventListener('mousedown', (e) => createRipple(e, pondObj, i));
		div.addEventListener('mouseover', (e) => pondObj.mouseDown ? createRipple(e, pondObj, i) : null); 
		pondObj.pond.insertBefore(div, pondObj.pond.firstChild);
	})
}

function createRipple(e, pondObj, i) {
	var note = pondObj.tones[i];
	var synth = pondObj.synths[i];
	synth.modAmp = scaleNumbers(0, pondObj.width, 0.1, 6, e.clientX);
	synth.play(note, scaleNumbers(0, pondObj.width, 0.1, 0.4, e.clientX));
	var div = document.createElement('div');
	div.className = 'ripple';
	var rippleSize = scaleNumbers(0, pondObj.width, 10, 100, e.clientX); // size dependent on where clicked
	rippleSize = Math.floor(rippleSize);
	div.style.left = (e.clientX - (rippleSize/2) - 9) + 'px';
	div.style.top = (e.clientY - (rippleSize/2) - 8) + 'px';
	div.style.height = rippleSize+'px';
	div.style.width = rippleSize+'px';
	pondObj.pond.appendChild(div);
}

function deleteRipples(pondObj) {
	var ripples = document.getElementsByClassName('ripple');
	var ripplesArr = Array.from(ripples);
	if (ripplesArr.length > 0) {
		ripplesArr.map((ripple) => {
			var rippleDimensions = ripple.getBoundingClientRect();
			rippleDimensions.height > 1000 ? pondObj.pond.removeChild(ripple) : null;
		})
	}
} 

// USEFUL FUNCTIONS
function scaleNumbers(inMax, inMin, outMax, outMin, number) {
	percent = (number - inMin) / (inMax - inMin);
	return percent * (outMax - outMin) + outMin;
}
