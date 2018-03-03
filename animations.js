// pond.addEventListener('mousedown', (e) => createRipple(e));

function createRipple(e, width) {
	console.log(width);
	var div = document.createElement('div');
	div.className = 'ripple';
	// set initial size of ripple depending on where the mouse was clicked
	var rippleSize = scaleNumbers(0, width, 10, 100, e.clientX);
	rippleSize = Math.floor(rippleSize);
	console.log(rippleSize);
	// var rippleSize = 100;
	div.style.left = (e.clientX - (rippleSize/2) - 9) + 'px';
	div.style.top = (e.clientY - (rippleSize/2) - 8) + 'px';
	div.style.height = rippleSize+'px';
	div.style.width = rippleSize+'px';
	div.style.animationDuration = '11s';
	pond.appendChild(div);
}

function deleteRipples() {
	var ripples = document.getElementsByClassName('ripple');
	var ripplesArr = Array.from(ripples);
	if (ripplesArr.length > 0) {
		ripplesArr.map((ripple) => {
			var rippleDimensions = ripple.getBoundingClientRect();
			rippleDimensions.height > 1000 ? pond.removeChild(ripple) : null;
		})
	}
} 

setInterval(() => deleteRipples(), 1000)