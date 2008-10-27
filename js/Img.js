Img = {
	// This function is called when the user clicks on the next/previous index links.
	"load": function (link, slice_index) {
		this.show(link.href);
		
		// Set the index(id number of the slice) of the last clicked number as the main_number.
		main_slice = Number(link.parentNode.id.replace(/[^\d]/g, ""));
		
		var slice = getNextSlice(link.href, "", slice_index); //Get a new slice with the new URL.
		var slice_ele = link.parentNode;
		slice_ele.innerHTML = getSliceHtml(slice);
		
		// If one of the number in the URL changes, make sure that change reflects in all other control links. All must have the same change.
		// Say our url is http://localhost/Under_Construction/URL_Numbers/Calvin_Hobbes/1987/ch870206.gif - so there are 2 slices - 1987 and 870206
		// If we click on the next year link, the links next to the 870206 must have the link to the next year as well.
		$(".controls").each(function(ele) {
			if(ele.parentNode == slice_ele) return;//Don't replace the links in the current slice
			var lnk = ele.href.toString();
			var new_lnk = lnk.slice(0, (slice.last_index - slice.number.length)) + slice.number + lnk.slice(slice.last_index);
			ele.href = new_lnk;
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
