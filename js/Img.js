Img = {
	// This function is called when the user clicks on the next/previous index links.
	"load": function (link, direction) {
		var url = link.href;
		this.show(url);
		$("url").value = url;
		
		// Set the index(id number of the slice) of the last clicked number as the main_number.
		main_slice = getIdNumber(link.parentNode);
		
		var slice_details = slices[main_slice];
		slice_details.number = applyMask(Number(slice_details.number) + (slice_details.increment_by * direction), slice_details.mask);
		
		var slice_ele = link.parentNode;
		slice_ele.innerHTML = getSliceHtml(main_slice);
		
		// If one of the number in the URL changes, make sure that change reflects in all other control links. All must have the same change.
		// Say our url is http://localhost/Under_Construction/URL_Numbers/Calvin_Hobbes/1987/ch870206.gif - so there are 2 slices - 1987 and 870206
		// If we click on the next year link, the links next to the 870206 must have the link to the next year as well.
		$(".slice-number").each(function(ele) {
			if(ele == slice_ele) return;//Don't replace the links in the current slice
			var slice_index = getIdNumber(ele);
			ele.innerHTML = getSliceHtml(slice_index);
		});
		
		return false; //Prevent the page from going to the Href link.
	},
	
	// Display the image
	"show": function(url) {
		loading();
		$("image-ele").src = url;
		//$("image-ele").src = "get_image.php?url=" + url;
	},
	
	// Called when the image has finished loading.
	"loaded": function() {
		loaded();
		
		// Cache the next image
		var cached_image = new Image();
		cached_image.src = getSliceImageUrl();
	},
	
	// Load the next or previous image in the main slice
	"openSlice": function(direction) {
		if(typeof direction == "undefined") direction = 1;
		var link = $("slice-"+main_slice).getElementsByTagName("a")[direction];
		link.onclick(); //Click the link - that is execute the function in the onclick attribute
	},
	"next": 	function() {Img.openSlice(1);},
	"previous": function() {Img.openSlice(0);}
}
