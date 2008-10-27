//////////////////////////////////////////// URL Parsers ////////////////////////////////////////////
function simpleParse() {
	var url = $("url").value;
	if(!url) return;
	$("details").show();
	
	initializeGlobalVariables(); // Reinitialize Globals
	
	// I did it this way because the flow was entirly different in the last version. This is an artifat from that version.
	var mask = "";
	var slice = getNextSlice(url, 0);
 	while(slice.number) {
 		mask += slice.text_before + slice.mask;
 		slice = getNextSlice(url, slice.slice_end_index);
 	}
 	mask += slice.text_before;
 	
 	$("mask").value = mask;

	buildInterfaceWithSlices();
}

// Returns the parts of the URL and the number next to it.
function getNextSlice(url, index) {
	var full_url = url;
	url = url.slice(index);
	if(!url) return false;
	
	slice_count++;
	
	var match_position = 0;
	var number = "";
	
	var last_slice = slices[slice_count - 1];
	var field = {}; // Initialize all the values
	for(var i in slices[0]) field[i] = slices[0][i]; // I cant to field = slices[0];  - it creates a reference link in FF. So all changes to field will reflect in slices[0] as well.
	field.index = slice_count;

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

	slices[Number(slice_count)] = field;
	
	return field;
}

/// Get the next and previous link for the given slice
function getSliceHtml(slice_index) {
	// Get the neccessary info of the said slice
	var slice_details = slices[slice_index];

	if(!slice_details.number) return "";
	var text = "";
	
	//This is a bit complex. Go thru all the slices and get their content.
	var url = "";
 	
 	JSL.array(slices.slice(1)).each(function(ele, i) {
 		url += ele.text_before;
 		
 		if(ele.number) {
			if(i+1 == slice_index) url += "%%INSERT_NUMBER_HERE%%";
			else url += applyMask(ele.number, ele.mask);
 		}
 	});
 	//p(url, slice_details.mask);
	
	var next_url = url.replace("%%INSERT_NUMBER_HERE%%", applyMask(Number(slice_details.number) + slice_details.increment_by, slice_details.mask));
	var prev_url = url.replace("%%INSERT_NUMBER_HERE%%", applyMask(Number(slice_details.number) - slice_details.increment_by, slice_details.mask));
	
	if((Number(slice_details.number)-1) >= 0) text += "<a onclick='return Img.load(this, -1);' class='controls' href='" + prev_url + "'>&laquo;</a> ";
	text += applyMask(slice_details.number, slice_details.mask) +" <a onclick='return Img.load(this, 1);' class='controls' href='" + next_url + "'>&raquo;</a>";
	
	return text;
}

// Get the next and previous urls in the main slice - used to cache those images.
function getSliceImageUrl(direction) {
	if(typeof direction == "undefined") direction = 1;
	return $("slice-"+main_slice).getElementsByTagName("a")[direction].href;
}


// Build the control interface with all the slices.
function buildInterfaceWithSlices() {
	var html = "";
	var url = ""
	
	for(var i=1; i<slices.length; i++) {
		var current_slice = slices[i];
		
		html += current_slice.text_before;
		url += current_slice.text_before;
		
		//p(current_slice.text_before);
		if(current_slice.number) {
			url += current_slice.number;
			
			var color = getNextColor();
			html += "<span class='slice-number' id='slice-"+i+"' style='background-color:"+color+";'>";
			html += getSliceHtml(i);
			html += "</span>";
		}
	}
	
	Img.show(url);
	$("url-area").innerHTML = html;
}

