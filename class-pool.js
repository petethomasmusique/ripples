// requires BasicFm
class Pool {
	constructor(audioContext, wet, dry, divNode, tonesArr) {
		// console.log(audioContext, wet, dry, divNode, tonesArr);// WTF?
		this._ctx = audioContext;
		this._outputDry = dry;
		this._outputWet = wet;
		this._pool = divNode;
		this._height = this._pool.clientHeight;
		this._width = this._pool.clientWidth;
		this._tones = tonesArr;
		this.synths = new Array; // public
		this._createSynths();
		this._createPool();
		this._mouseDown = false;
		window.addEventListener('mousedown', () => this._mouseDown = true);
		window.addEventListener('mouseup', () => this._mouseDown = false);
		setInterval(() => this._deleteRipples(), 1000);
	}
	_createSynths() {
		this._tones.map( (tone, i) => {
			this.synths[i] = new BasicFm(this._ctx);	
			this.synths[i].connectTo( this._outputDry, true ); // true - disconnect from others first
			this.synths[i].connectTo( this._outputWet, false ); // false - connect to both dry and wet
		} )
	}
	_createPool() {
		var stripHeight = (this._height/this._tones.length); 
		// create a strip in the dom for each tone
		this._tones.map( (tone, i) => {
			var div = document.createElement('div');
			div.style.height = stripHeight + 'px';
			div.style.width = this._width + 'px';
			div.addEventListener('mousedown', (e) => this._createRipple(e, i));
			div.addEventListener('mouseover', (e) => this._mouseDown ? this._createRipple(e, i) : null); 
			this._pool.insertBefore(div, this._pool.firstChild);
		})
	}
	_createRipple(e, i) {
		var note = this._tones[i] + 12;
		var synth = this.synths[i];
		var poolInfo = this._pool.getBoundingClientRect();
		var x = e.clientX - poolInfo.x;
		var y = e.clientY - poolInfo.y;
		synth.play(note, scaleNumbers(0, this._width, 0.1, 1, x));
		var div = document.createElement('div');
		div.className = 'ripple';
		var rippleSize = scaleNumbers(0, this._width, 10, 100, x); // size dependent on where clicked
		rippleSize = Math.floor(rippleSize);
		div.style.left = (x - (rippleSize/2)) + 'px';
		div.style.top = (y - (rippleSize/2)) + 'px';
		div.style.height = rippleSize + 'px';
		div.style.width = rippleSize + 'px';
		this._pool.appendChild(div);
	}
	_deleteRipples() {
		var ripples = document.getElementsByClassName('ripple');
		var ripplesArr = Array.from(ripples);
		if (ripplesArr.length > 0) {
			ripplesArr.map((ripple) => {
				var opacity = window.getComputedStyle(ripple).getPropertyValue('opacity');
				opacity == 0 ? this._pool.removeChild(ripple) : null;
			})
		}
	}
	setTones(array) {
		this._tones = array;
	}
}
