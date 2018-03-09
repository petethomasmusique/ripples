class Dial {
	constructor(containerDiv, id, label) {
		this._controls = containerDiv;
		this._id = id;
		this._label = label;
		this._mousedown = false;
		this._createDial();
		this._value = 63;
	}
	_createDial() {
		this._dial = this._createDomNode( 'div', 'dial_'+this._id, 'dial');
		var face = this._createDomNode( 'div', false, 'face');
		this._dial.appendChild(face);
		this._position = this._createDomNode( 'div', false, 'position');
		face.appendChild(this._position);
		var tip = this._createDomNode( 'div', false, 'tip');
		this._position.appendChild(tip);
		this._controls.appendChild(this._dial);
		var label = this._createDomNode( 'p', false, 'label');
		label.textContent = this._label;
		this._dial.appendChild(label);
		this._dialInfo = this._dial.getBoundingClientRect();
		this._addEventListeners();
	}
	_createDomNode(tag, id, className) {
		var node = document.createElement(tag);
		id ? node.setAttribute('id', id) : null;
		className ? node.className = className : null;
		return node;
	}
	_addEventListeners() {
		this._dial.addEventListener('mousedown', (e) => this._handleMouseDown(e));
		window.addEventListener('mouseup', () => this._mousedown = false);
		this._dial.addEventListener('mousemove', (e) => this._mousedown ? this._handleMouseMove(e) : null);
	}
	_handleMouseDown(e) {
		var y = this._dialInfo.height - e.offsetY;
		this._yOnMouseDown = Math.floor(this._scaleNumbers(this._dialInfo.height, 0, 127, 0, y));
		this._mousedown = true;
	}
	_handleMouseMove(e) {
		var y = this._dialInfo.height - e.offsetY;
		var yMidi = Math.floor(this._scaleNumbers(this._dialInfo.height, 0, 127, 0, y));
		if (this._value > 0 && this._value < 127) {
			this._value += yMidi > this._yOnMouseDown ? 1 : -1;
		}
		console.log(this._value);
		// this._value = this._value < 127 ? Math.floor(this._scaleNumbers(this._dialInfo.height, 0, 127, 0, y)) : 126;
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