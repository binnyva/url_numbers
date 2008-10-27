///////////////////////////////////////////////// Mask S/icers ///////////////////////////////////////

//Parse the URL with a given mask.
function maskParse() {
	//var url = $("url").value;
	var mask =$("mask").value;
	if(!mask) return;
	
	var run = 0;
	var text = "";
	var slice_count = 1;
	var slice = getNextSliceMasked(mask, 0);
 	while(slice.number) {
		var number = Number(slice.number);
		if(number) {
			var color = getNextColor();
	
			text += slice.slice + "<span id='slice-"+slice_count+"' style='background-color:"+color+";'>";
			text += getSliceHtml(slice);
			text += "</span>";
			slice_count++;
			
		}
		
 		//p(JSL.debug.dump(slice));
 		
 		run++;
 		if(run>10) break;
 		slice = getNextSliceMasked(mask, slice.last_index);
 	}	

	$("url-area").innerHTML = text + slice.slice;
	//Img.show(url);
}

function getNextSliceMasked(mask, index) {
	var full_mask= mask;
	mask= mask.slice(index);
	if(!mask) return false;
	
	var number = "";
	var match_position = 0;
	var slice = "";
	var new_url_plus = "";
	var new_url_minus = "";
	
	var mask_match = mask.match(/((\#+)(\(([^\)]+)\))?)\|?/); //A series of #s then a ( to ) description field(optional) and a | seperator(optional)
	if(mask_match) {
		var slice_mask_desc = "";
		var slice_mask = mask_match[1];
		var match_position = mask.indexOf(slice_mask);
		
		p(mask, slice_mask,  mask_match);
		
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
 			var field_property = {};
 			var starts_at = 1;
 			var ends_at = 0;

			//Parse the field commands.
			fields.each(function(ele) {
				//Its a day field
				if(ele == "day") {
					field_property.day = true;
					
					if(starts_at) { // Add a 0 padding to the starts at number.
						if(starts_at < 10) starts_at = "0" + starts_at;
					} else {
						starts_at = "01";
					}
				
				//The field is a number - its the starting digit.
				} else if(ele.match(/^\d+$/)) { 
					starts_at = Number(ele);
				}
			});
		}
		
		slice = mask.slice(0, match_position);
		var number = mask.substr(match_position, slice_mask.length);

		var len = slice_mask.length;
		//Create links with Number+1, Number-1 etc.
		var dont_look_in_url = full_mask.slice(0, match_position + index);//The part that must not be checked for the number
		var look_in_url = full_mask.slice(match_position + index, match_position+index+len); //The part of the url that must be checked for the number
		var rest_url = full_mask.slice(match_position + index + len); //The rest of the URL
		
		//Find the number, and make it 1 more and 1 less and get the url.
		new_url_plus = dont_look_in_url + look_in_url.replace(number,applyMask(Number(number)+1, slice_mask)) + rest_url;
		if(Number(number)-1) new_url_minus = dont_look_in_url + look_in_url.replace(number,applyMask(Number(number)-1, slice_mask)) + rest_url;
		else new_url_minus = full_mask;
		
	} else { //No number in url - end it by not providing the 'number' index.
		return {"slice":mask};
	}
	
	return {
		"slice":slice,
		"number":number,
		"last_index": index + match_position + slice_mask.length,
		"index":index,
		"url_plus":new_url_plus,
		"url_minus":new_url_minus
	}
}

/// Get the next and previos link for the given slice
function getSliceHtml(slice) {
	var text = "";
	if((Number(slice.number)-1) >= 0) text += " <a onclick='return Img.load(this, "+slice.index+");' class='controls' href='"+slice.url_minus+"'>&laquo;</a> ";
	text += slice.number +" <a onclick='return Img.load(this, "+slice.index+");' class='controls' href='"+slice.url_plus+"'>&raquo;</a>";
	
	return text;
}

// Get the next and previous urls in the main slice - used to cache those images.
function getSliceImageUrl(direction) {
	if(typeof direction == "undefined") direction = 1;
	return $("slice-"+main_slice).getElementsByTagName("a")[direction].href;
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
