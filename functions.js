// USEFUL FUNCTIONS
function scaleNumbers(inMax, inMin, outMax, outMin, number) {
	var percent = (number - inMin) / (inMax - inMin);
	return percent * (outMax - outMin) + outMin;
}
