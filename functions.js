// USEFUL FUNCTIONS
function scaleNumbers(inMax, inMin, outMax, outMin, number) {
	percent = (number - inMin) / (inMax - inMin);
	return percent * (outMax - outMin) + outMin;
}
