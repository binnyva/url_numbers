//////////////////////////////////////////// URL Parsers ////////////////////////////////////////////
function simpleParse() {
	var url = $("url").value;
	if(!url) return;
	$("details").show();
	
	initializeGlobalVariables(); // Reinitialize Globals
	
	//Global variables...
	simple_parse_slices_count = 0;
	simple_parse_slices = []; 
	
	simple_parse_slices[0] = {};
	for(var i in slices[0]) simple_parse_slices[0][i] = slices[0][i]; //Create a copy of the data - not a reference link(Happens in FF - also it line 38, same file)
	
	// There is no simple parse - we take the URL, we create a mask(best guess). Then we call the mask parse.
	var mask = "";
	var slice = getNextSlice(url, 0);
 	while(slice.number) {
 		mask += slice.text_before + slice.mask;
 		if(slice.number != 1) mask += "(" + Number(slice.number) + ")";
 		slice = getNextSlice(url, slice.slice_end_index);
 	}
 	mask += slice.text_before;
 	$("mask").value = mask;
 	maskParse();
}

// Returns the parts of the URL and the number next to it.
function getNextSlice(url, index) {
	var full_url = url;
	url = url.slice(index);
	if(!url) return false;
	
	simple_parse_slices_count++;
	var match_position = 0;
	var number = "";
	
	var last_slice = simple_parse_slices[simple_parse_slices_count - 1];
	var field = {}; // Initialize all the values
	for(var i in simple_parse_slices[0]) field[i] = simple_parse_slices[0][i]; // I cant to field = simple_parse_slices[0];  - it creates a reference link in FF. So all changes to field will reflect in simple_parse_slices[0] as well.
	field.index = simple_parse_slices_count;

	var number_match = url.match(/(\d+)/);
	if(number_match) {
		field.number = number_match[0];
		field.length = field.number.length;
		var match_position = url.indexOf(field.number);
		var slice = url.slice(0, match_position);
		field.mask = getMask(field.number);
		field.slice_end_index = index + match_position + field.length; // The slice ends when the mask of this slice and its description field and a spearator ends
		
		// Finds the beginnig and ending location of this slice
		field.start_index = last_slice.end_index + match_position;
		field.end_index = field.start_index + field.length;
		field.text_before = full_url.slice(last_slice.slice_end_index, field.start_index);
		
	} else {
		field.start_index = last_slice.end_index;
		field.text_before = full_url.slice(index); //Get the final part of the url
	}
	simple_parse_slices[Number(simple_parse_slices_count)] = field;

	return field;
}

/// Get the next and previous link for the given slice
function getSliceHtml(slice_index, reset) {
	// Get the neccessary info of the said slice
	var slice_details = slices[slice_index];
	if(reset) slice_details.number = slice_details.starts_at; // For number reset.

	if(slice_details.number === false) return "";
	var text = "";
	
	var next_url = Slice.getUrl(slice_index, 1);
	var prev_url = Slice.getUrl(slice_index, -1);
	
	if((Number(slice_details.number)-1) >= 0) text += "<a onclick='return Img.load("+slice_index+", -1);' class='controls' href='" + prev_url + "'>&laquo;</a> ";
	text += Slice.getNumber(slice_details) +" <a onclick='return Img.load("+slice_index+", 1);' class='controls' href='" + next_url + "'>&raquo;</a>";
	
	return text;
}

// Get the next and previous urls in the main slice - used to cache those images.
function getSliceImageUrl(direction) {
	var link = getMainSliceAnchor();
	if(link) return link.href;
	
	return "";
}


// Build the control interface with all the slices.
function buildInterfaceWithSlices() {
	var html = "";
	var url = "";
	
	for(var i=1; i<slices.length; i++) {
		var current_slice = slices[i];
		
		html += current_slice.text_before;
		url += current_slice.text_before;
		
		if(current_slice.number !== false) {
			url += getSliceNumber(current_slice);
			
			var color = getNextColor();
			html += "<span class='slice-number' id='slice-"+i+"' style='background-color:"+color+";'>";
			html += getSliceHtml(i);
			html += "</span>";
			main_slice = i; //The last slice should be the main slice.
		}
	}
	
	Img.show(url);
	$("url-area").innerHTML = html;
}

function getMainSliceAnchor(direction) {
	if(typeof direction == "undefined") direction = 1;

	// If the number is 0, the 0'th index might not be there.
	var links = $("slice-"+main_slice).getElementsByTagName("a");
	if(links.length)
		if(links[direction]) return links[direction];
		else return links[0]; //Again, the 0 bug.
	
	return "";
}