function load_ir(reverb, irUrl) {
	var irRRequest = new XMLHttpRequest();
	irRRequest.open("GET", irUrl, true);
	irRRequest.responseType = "arraybuffer";
	irRRequest.onload = function() {
		audioCtx.decodeAudioData( irRRequest.response, 
			function(buffer) { 
				reverb.buffer = buffer; 
			} 
		);
	}
	irRRequest.send();
}
function scaleNumbers(inMax, inMin, outMax, outMin, number) {
	percent = (number - inMin) / (inMax - inMin);
	return percent * (outMax - outMin) + outMin;
}
