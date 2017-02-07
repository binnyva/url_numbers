Slice = {
	// Creates a new URL with the given slice - it changes the number at the given slice index - adds 1 or -1
	"getUrl": function(slice_index, direction) {
		//This is a bit complex. Go thru all the slices and get their content.
		var url = "";
		var that = this;
		if(typeof direction == "undefined") direction = 1; //Second argument is optional.
		var slice_details = this.getSlice(slice_index);
		
		JSL.array(slices.slice(1)).each(function(ele, i) {
			url += ele.text_before;
			
			if(ele.number !== false) { //As long as there is a number - it can be 0 as well.
				if(i+1 == slice_index) url += applyMask(Number(slice_details.number) + (slice_details.increment_by * direction), slice_details.mask_length);
				else if(i+1 > slice_index) url += applyMask(ele.starts_at, ele.mask_length);// Number reset - if there is a url http://03/07.jpg, and I want to change the first number, it will set the next number to its start_at location as well - so the url becomes http://04/01.jpg
				else url += that.getNumber(ele);
			}
		});
		return url;
	},
	
	"getNumber": function(slice_or_index) {
		var slice_details = this.getSlice(slice_or_index);
		return applyMask(slice_details.number, slice_details.mask_length);
	},
	
	"getSlice": function(slice_or_index) {
		if(isNaN(slice_or_index)) return slice_or_index; // Its not a index(number)
		else return slices[slice_or_index];
	}
}
