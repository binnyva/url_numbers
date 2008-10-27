//////////////////////////////////////////// URL Parsers ////////////////////////////////////////////
function simpleParse() {
	var url = $("url").value;
	if(!url) return;
	$("details").show();
	
	var run = 0;
	var text = "";
	var mask = "";
	var slice_count = 1;
	var slice = getNextSlice(url, "", 0);
	while(slice.number) {
		var number = Number(slice.number);
		if(slice.number) {
			var color = getNextColor();
	
			text += slice.slice + "<span id='slice-"+slice_count+"' style='background-color:"+color+";'>";
			text += getSliceHtml(slice);
			text += "</span>";
			slice_count++;
			
			// Create the mask.
	 		mask += slice.slice + getMask(slice.number);
		}
		
		run++;
		if(run>10) break;
		slice = getNextSlice(url, "", slice.last_index);
	}
	$("url-area").innerHTML = text + slice.slice;
	mask += slice.slice;
	
	$("mask").value = mask;
	Img.show(url);
}

// Returns the parts of the URL and the number next to it.
function getNextSlice(url, mask, index) {
	var full_url = url;
	url = url.slice(index);
	if(!url) return false;
	
	var number = "";
	var match_position = 0;
	var slice = "";
	var new_url_plus = "";
	var new_url_minus = "";
	
	var mask_match = url.match(/(\d+)/);
	if(mask_match) {
		var slice_mask = "";
		var slice_mask_desc = "";
		
		number = mask_match[0];
		var match_position = url.indexOf(number);
		slice = url.slice(0, match_position);
		
		//Find the mask(if any) for this slice.
		if(mask) {
			var slice_mask_match = mask.slice(match_position).match(/\#+/);
			slice_mask = slice_mask_match[0];
			
			//Mask may have a description field right after it - if so, get it as well.
			if(mask[match_position+slice_mask.length] == "(") { //The description field starts with a ( - get it only if that char is present.
				slice_mask_desc = mask.slice(match_position+slice_mask.length).replace(/\(([^\)]+)\).*/, "$1");
			}
		} else { //If there is no explicit mask, get a mask from the url structure
			var slice_mask = getMask(number);
		}
		
		var len = number.length;
		//Create links with Number+1, Number-1 etc.
		var dont_look_in_url = full_url.slice(0, match_position + index);//The part that must not be checked for the number
		var look_in_url = full_url.slice(match_position + index, match_position+index+len); //The part of the url that must be checked for the number
		var rest_url = full_url.slice(match_position + index + len); //The rest of the URL
		
		//Find the number, and make it 1 more and 1 less and get the url.
		new_url_plus = dont_look_in_url + look_in_url.replace(number,applyMask(Number(number)+1, slice_mask)) + rest_url;
		if(Number(number)-1) new_url_minus= dont_look_in_url + look_in_url.replace(number,applyMask(Number(number)-1, slice_mask)) + rest_url;
		else new_url_minus = full_url;
		
		//p(applyMask(Number(number)+1, slice_mask), new_url_plus);
		
	} else { //No number in url - end it by not providing the 'number' index.
		return {"slice":url}
	}
	
	return {
		"slice":slice,
		"last_index":index + match_position + number.length,
		"number":number,
		"index":index,
		"url_plus":new_url_plus,
		"url_minus":new_url_minus
	}
}
