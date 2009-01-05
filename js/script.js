//Globals
all_colors = new Array("#99FFCC","#CCFFFF","#FF9999","#FFFFCC","#33CC99","#99CC99","#0099CC");
bookmarks = [];
initializeGlobalVariables();

//p=function(){};

// These must be initialized when ever we parse a new url.
function initializeGlobalVariables() {
	// All these are global variables - so no var.
	color_index = 0;
	
	slice_count = 0; // Slice actually starts at 1 - but the increment is given at the top of the function
	slices = [{
		"start_index":	0, 		// Slice starts at charector
		"length":		0, 		// Length of the number in the slice
		"end_index":	0,	 	// start_index + length
		"starts_at":	0, 		// Starting number of the slice
		"ends_at":		0,		// The number will go up to this value. For example this will be 31 if its a month
		"increment_by":	1,		// The next number is number+increment_by
		"number":		0,		// The current number in the slice.
		"index":		0,		// The index of this slice - this slice is at 'slices[index]'
		"text_before":	""		// The text before the number/mask
	}];
	main_slice = 1;
}

function init() {
	// Setup all the event handlers
	$("show-details").click(simpleParse);
	$("masked-parse").click(maskParse);
	$("bookmark-current-url").click(Bookmark.bookmark);
	Bookmark.init();
	
	$("image-ele").load(Img.loaded);
	$("image-ele").on("error", Img.loadError);
	$("previous-image").click(Img.previous);
	$("next-image").click(Img.next);
	$("advanced-tab").click(function() {$("advanced-options").toggle();});
	
	//User hits enter - handle the form submit.
	$("url-form").on("submit", function(e) {
		simpleParse();
		JSL.event(e).stop();
	});
	
	// Keyboard Shortcuts
	shortcut.add("right", Img.next, {"disable_in_input":true});
	shortcut.add("left", Img.previous, {"disable_in_input":true});
	shortcut.add("Space", Img.next, {"disable_in_input":true});
	shortcut.add("Backspace", Img.previous, {"disable_in_input":true});
	//shortcut.add("Enter", maskParse, {"target": "mask"}); // Target not working in latest shortcuts.js
	
	//$("url").value = "http://localhost/Under_Construction/URL_Numbers/Comics/Naruto/00000000/Naruto-Pilot-01.jpg";
	//$("url").value = "http://www.schlockmercenary.com/comics/schlock20001115.png";
	// http://localhost/Projects/URL_Numbers/Comics/Calvin_Hobbes/1986/ch860101.gif
	//simpleParse();
	//$("mask").value = "http://www.schlockmercenary.com/comics/schlock####(2000)|##(11)|##(15).png";
	//$("mask").value = "http://localhost/Projects/URL_Numbers/Comics/Calvin_Hobbes/####/ch##|##|##.gif";
	
	
	$("url").value = "http://localhost/Projects/URL_Numbers/Comics/Naruto/002/02.jpg";simpleParse();
	$("mask").value = "http://localhost/Projects/URL_Numbers/Comics/Naruto/###(2)/##.jpg";
	//maskParse();$("details").show();
}




/**
 * :TODO:
 * Find the most frequently used/changed number in multi-number url
 * Cache the next 3 images
 * Use Keyboard shortcuts to navigate
 * 
 *
 */