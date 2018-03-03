pond.addEventListener('mousedown', (e) => createRipple(e));

var rippleCount = 0;

function createRipple(e) {
	rippleCount++;
	var div = document.createElement('div');
	div.className = 'ripple';
	var rippleSize = 10;
	div.style.left = (e.clientX - (rippleSize/2) - 9) + 'px';
	div.style.top = (e.clientY - (rippleSize/2) - 8) + 'px';
	pond.appendChild(div);
}

function deleteRipples() {
	var ripples = document.getElementsByClassName('ripple');
	var ripplesArr = Array.from(ripples);
	if (ripplesArr.length > 0) {
		ripplesArr.map((ripple) => {
			var rippleDimensions = ripple.getBoundingClientRect();
			rippleDimensions.height < 10 ? pond.removeChild(ripple) : null;
		})
	}
} 

setInterval(() => deleteRipples(), 5000)