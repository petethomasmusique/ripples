class Dial {
	constructor(containerDiv, id, label) {
		this._controls = containerDiv;
		this._id = id;
		this._label = label;
		this._mousedown = false;
		this._createDial();
		this._value = 0;
	}
	_createDial() {
		this._dial = document.createElement('div');
		this._dial.setAttribute('id', 'dial_'+this._id);
		this._dial.className = 'dial';
		var face = document.createElement('div');
		face.className = 'face';
		this._dial.appendChild(face);
		this._position = document.createElement('div');
		this._position.className = 'position';
		face.appendChild(this._position);
		var tip = document.createElement('div');
		tip.className = 'tip';
		this._position.appendChild(tip);
		this._controls.appendChild(this._dial);
		this._dialInfo = this._dial.getBoundingClientRect();
		var label = document.createElement('p');
		label.className = 'label';
		label.textContent = this._label;
		this._dial.appendChild(label);
		this._addEventListeners();
	}
	_addEventListeners() {
		this._dial.addEventListener('mousedown', () => this._mousedown = true);
		window.addEventListener('mouseup', () => this._mousedown = false);
		this._dial.addEventListener('mousemove', (e) => this._mousedown ? this._handleMouseMove(e) : null);
	}
	_handleMouseMove(e) {
		var y = this._dialInfo.height - e.offsetY;
		this._value = this._value < 127 ? Math.floor(this._scaleNumbers(this._dialInfo.height, 0, 127, 0, y)) : 126;
		this._rotateDial();
	}
	_rotateDial() {
		var deg = this._scaleNumbers(127, 0, 160, -160, this._value);
		this._position.style.transform = 'rotate('+deg+'deg)';
	}
	_scaleNumbers(inMax, inMin, outMax, outMin, number) {
		var percent = (number - inMin) / (inMax - inMin);
		return percent * (outMax - outMin) + outMin;
	}

	// PUBLIC METHODS
	getValue() {
		return this._value;
	}
}