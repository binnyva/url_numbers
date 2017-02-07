// This changes the colors used in the slices
function getNextColor() {
	color_index++;
	if(color_index > all_colors.length) color_index = 0;
	return all_colors[color_index];
}
 
function showMessage(message) {
	alert(message);
}