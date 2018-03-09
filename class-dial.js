class Dial {
	constructor(containerDiv, id, label) {
		this._controls = containerDiv;
		this._id = id;
		this._label = label;
		this._mousedown = false;
		this._createDial();
		this._value = 63;
		this._screenY = 0;
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
		this._dial.addEventListener('mousedown', () => this._mousedown = true);
		window.addEventListener('mouseup', () => this._mousedown = false);
		this._controls.addEventListener('mousemove', (e) => this._mousedown ? this._handleMouseMove(e) : null);
	}
	_handleMouseMove(e) {
		var screenY = e.screenY;
		var value = this._value;
		value += (screenY - this._screenY) > 0 ? -3 : 2;	
		this._value = value >= 0 && value <= 127 ? value : this._value; 
		this._screenY = screenY;
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