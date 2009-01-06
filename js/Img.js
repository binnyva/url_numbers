Img = {
	// This function is called when the user clicks on the next/previous index links.
	"load": function (slice_index, direction) {
		var url = Slice.getUrl(slice_index, direction);
		this.show(url);
		$("url").value = url;
		
		// Set the index(id number of the slice) of the last clicked number as the main_number.
		main_slice = slice_index;
		
		var slice_details = slices[main_slice];
		slice_details.number = applyMask(Number(slice_details.number) + (slice_details.increment_by * direction), slice_details.mask_length);
		
		var slice_ele = document.getElementById("slice-"+slice_index);
		
		// If one of the number in the URL changes, make sure that change reflects in all other control links. All must have the same change.
		// Say our url is http://localhost/Under_Construction/URL_Numbers/Calvin_Hobbes/1987/ch870206.gif - so there are 2 slices - 1987 and 870206
		// If we click on the next year link, the links next to the 870206 must have the link to the next year as well.
		$(".slice-number").each(function(ele, i) {
			var this_slice_index = i+1;
			
			if(this_slice_index == slice_index) ele.innerHTML = getSliceHtml(this_slice_index);
			else if(this_slice_index >= slice_index) ele.innerHTML = getSliceHtml(this_slice_index, true);
		});
		
		return false; //Prevent the page from going to the Href link.
	},
	
	// Display the image
	"show": function(url) {
		loading();
		$("image-area").show();
		
		if($("use-proxy").checked) url = "get_image.php?url=" + url; //Use a proxy with referal - if its on
		if($("auto-resize").checked) { //Remove size restrictions
			$("image-ele").removeAttribute("width");
			$("image-ele").removeAttribute("height");
		}
		$("image-ele").src = url;
	},
	
	// Called when the image has finished loading.
	"loaded": function() {
		loaded();
		
		//Resize the bigger images.
		if($("auto-resize").checked) {
			var img = $("image-ele");
			if(img.height > window.innerHeight) img.height = window.innerHeight;
			if(img.width > (window.innerWidth-60)) img.width = (window.innerWidth-60); //40 is 20+20 - for two handles - another 20 for margin.
		}
		
		// Cache the next image
		var cached_image = new Image();
		var url = getSliceImageUrl();
		if($("use-proxy").checked) url = "get_image.php?url=" + url; //Use a proxy with referal - if its turned on.
		
		$("caching").innerHTML = "caching <a href='"+url+"'>next image</a>..."
		$("caching").show();
		
		cached_image.src = url;
		cached_image.onload = Img.hideCachingMessage;
		cached_image.onerror = Img.hideCachingMessage;
	},
	
	// Hides the Cacheing Message
	"hideCachingMessage": function() {
		$("caching").hide();
	},
	
	// This happens when an image fails to load. Basically, hides the 'loading' message.
	"loadError": function() {
		loaded();
	},
	
	// Load the next or previous image in the main slice
	"openSlice": function(direction) {
		var link = getMainSliceAnchor(direction);
		if(link) link.onclick(); //Click the link - that is execute the function in the onclick attribute
	},
	"next": 	function() {Img.openSlice(1);},
	"previous": function() {Img.openSlice(0);}
}
