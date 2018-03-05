class Reverb {
	constructor(audioContext, pathToIr) {
		this.ctx = audioContext;
		this.reverb = this.ctx.createConvolver(); // create reverb
		this.reverb.connect( this.ctx.destination ); // connect reverb to output
		this.pathToIr = pathToIr;
		this.load_ir_(pathToIr, this.reverb); // load ir for reverb unit
	}
	load_ir_(pathToIr, reverb) {
		var irRRequest = new XMLHttpRequest();
		irRRequest.open("GET", pathToIr, true);
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
}