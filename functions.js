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
