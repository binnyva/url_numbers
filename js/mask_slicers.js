///////////////////////////////////////////////// Mask S/icers ///////////////////////////////////////
//Parse the URL with a given mask.
function maskParse() {
	var mask = $("mask").value;
	if(!mask) return;
	
	initializeGlobalVariables(); // Reinitialize Globals
	
	// I did it this way because the flow was entirly different in the last version. This is an artifat from that version.
	var slice = getNextSliceMasked(mask, 0);
 	while(slice.number) {
 		slice = getNextSliceMasked(mask, slice.slice_end_index);
 	}

	buildInterfaceWithSlices();
}

function getNextSliceMasked(mask, index) {
	var full_mask = mask;
	mask = mask.slice(index);
	if(!mask) return false;
	
	slice_count++;
	
	var match_position = 0;
	
	var last_slice = slices[slice_count - 1];
	var field = {}; // Initialize all the values
	for(var i in slices[0]) field[i] = slices[0][i]; // I cant to field = slices[0];  - it creates a reference link in FF. So all changes to field will reflect in slices[0] as well.
	field.index = slice_count;
	
	// Find the Mask
	var mask_match = mask.match(/((\#+)(\(([^\)]+)\))?)\|?/); //A series of #s then a ( to ) description field(optional) and a | seperator(optional)
	if(mask_match) {
		var slice_mask_desc = "";
		var slice_mask = mask_match[1];
		var match_position = mask.indexOf(slice_mask);
		
		field.slice_end_index = index + match_position + mask_match[0].length; // The slice ends when the mask of this slice and its description field and a spearator ends
		field.mask = slice_mask;
		
		// Fill in the defaults
		field.number = 1;
		field.length = field.mask.length;

		//Mask may have a description field right after it - if so, get it as well.
		if(mask_match[3]) { //Get the description field if its there
			slice_mask_desc = mask_match[4].replace(/\s/,""); //Remove the white space
			var fields = JSL.array(slice_mask_desc.split(";"));
			
/** Command List
 * day			01-31
 * month		01-12
 * year			1970-
 * year2		70-69 (ie., 1970 - 2069)
 * start=NUMBER	Starts at given number - eg. start=7 (or just 7 is enough). Defaults to 1
 * end=NUMBER	Ends at given number
 * +NUMBER		'+' is an operator - Increment by the given Number. Eg. +2. Default +1
 */
			
			//Parse the field commands.
			fields.each(function(ele) {
				//Its a day field
				if(ele == "day") {
					field.day = true;
					
					if(field.starts_at) { // Add a 0 padding to the starts at number.
						if(field.starts_at < 10) field.starts_at = "0" + field.starts_at;
					} else {
						field.starts_at = "01";
					}
				
				//The field is a number - its the starting digit.
				} else if(ele.match(/^\d+$/)) {
					field.starts_at = Number(ele);
				}
			});
			
			if(!field.number) field.number = field.starts_at;
		
		}
		
		// Finds the beginnig and ending location of this slice
		field.start_index = last_slice.end_index + match_position;
		field.end_index = field.start_index + field.length;
		field.text_before = full_mask.slice(last_slice.end_index, field.start_index);
		
	} else {
		field.start_index = last_slice.end_index;
		field.text_before = full_mask.slice(index); //Get the final part of the url
	}

	slices[Number(slice_count)] = field;
	
	return field;
}

/////////////////////////////////////////////// Mask Fuctions ///////////////////////////////////////////
function applyMask(number, mask) {
	var number_str = number.toString();
	var mask_len = mask.length;
	var number_len = number_str.length;
	var final_number = "";
	if(number_len < mask_len) {
		for(var i=number_len; i<mask_len;i++) final_number += "0";
	}
	
	return final_number + number_str;
}
function getMask(number_str) {
	var hashs = "";
	for(var j=0;j<number_str.length;j++) hashs+="#";
	return hashs;
} 
