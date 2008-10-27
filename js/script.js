//Globals
all_colors = new Array("#99FFCC","#CCFFFF","#FF9999","#FFFFCC","#33CC99","#99CC99","#0099CC");
color_index = 0;

slices = [];
main_slice = 1;
bookmarks = [];
//p=function(){};

function init() {
	// Setup all the event handlers
	$("show-details").click(simpleParse);
	$("masked-parse").click(maskParse);
	$("bookmark-current-url").click(Bookmark.bookmark);
	Bookmark.init();
	
	$("image-ele").load(Img.loaded);
	$("previous-image").click(Img.previous);
	$("next-image").click(Img.next);
	
	// Keyboard Shortcuts
	shortcut.add("right", Img.next);
	shortcut.add("left", Img.previous);
	shortcut.add("Space", Img.next);
	shortcut.add("Backspace", Img.previous);
	
	//$("url").value = "http://localhost/Under_Construction/URL_Numbers/Comics/Naruto/00000000/Naruto-Pilot-01.jpg";
	//$("url").value = "http://www.schlockmercenary.com/comics/schlock20001115.png";
	//simpleParse();
	$("mask").value = "http://www.schlockmercenary.com/comics/schlock####(2000)|##(11)|##(15).png";
	maskParse();
}


/**
 * :TODO:
 * Find the most frequently used/changed number in multi-number url
 * Cache the next 3 images
 * Use Keyboard shortcuts to navigate
 * 
 *
 */