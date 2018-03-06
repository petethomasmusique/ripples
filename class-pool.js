// requires BasicFm
// TODO: sort out the issue of scaling up and down...
// POND
class Pool {
	constructor(audioContext, outputNode, divNode, tonesArr) {
		this._ctx = audioContext;
		this._output = outputNode;
		this._pond = divNode;
		this._height = this._pond.clientHeight;
		this._width = this._pond.clientWidth;
		this._tones = tonesArr;
		this.synths = new Array; // iterate over this to change the synth settings, should this be public?
		this._createSynths();
		this._createPond();
		this._mouseDown = false;
		window.addEventListener('mousedown', () => this._mouseDown = true);
		window.addEventListener('mouseup', () => this._mouseDown = false);
		setInterval(() => this._deleteRipples(), 1000);
	}
	_createSynths() {
		this._tones.map( (tone, i) => {
			this.synths[i] = new BasicFm(this._ctx);	
			this.synths[i].carrier.volume.connect( this._output );
		} )
	}
	_createPond() {
		// TODO: delete contents if you want to create the pond afresh
		var stripHeight = (this._height/this._tones.length); 
		// create a strip in the dom for each tone
		this._tones.map( (tone, i) => {
			var div = document.createElement('div');
			div.style.height = stripHeight + 'px';
			div.style.width = this._width + 'px';
			div.addEventListener('mousedown', (e) => this._createRipple(e, i));
			div.addEventListener('mouseover', (e) => this._mouseDown ? this._createRipple(e, i) : null); 
			this._pond.insertBefore(div, this._pond.firstChild);
		})
	}
	_createRipple(e, i) {
		console.log('ripple');
		var note = this._tones[i];
		var synth = this.synths[i];
		synth.modAmp = scaleNumbers(0, this._width, 0.1, 6, e.clientX);
		synth.play(note, scaleNumbers(0, this._width, 0.1, 0.2, e.clientX));
		var div = document.createElement('div');
		div.className = 'ripple';
		var rippleSize = scaleNumbers(0, this._width, 10, 100, e.clientX); // size dependent on where clicked
		rippleSize = Math.floor(rippleSize);
		div.style.left = (e.clientX - (rippleSize/2) - 9) + 'px';
		div.style.top = (e.clientY - (rippleSize/2) - 8) + 'px';
		div.style.height = rippleSize+'px';
		div.style.width = rippleSize+'px';
		this._pond.appendChild(div);
	}
	_deleteRipples(pondObj) {
		var ripples = document.getElementsByClassName('ripple');
		var ripplesArr = Array.from(ripples);
		if (ripplesArr.length > 0) {
			ripplesArr.map((ripple) => {
				var rippleDimensions = ripple.getBoundingClientRect();
				rippleDimensions.height > 1000 ? this._pond.removeChild(ripple) : null;
			})
		}
	} 
}
