//Globals
all_colors = new Array("#99FFCC","#CCFFFF","#FF9999","#FFFFCC","#33CC99","#99CC99","#0099CC");
bookmarks = [];
url_list = [];
url_list_index = 0;
initializeGlobalVariables();
autoplay_timer = false;
autoplay_next_ready = false;
home = document.location.href;

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
		"starts_at":	1, 		// Starting number of the slice
		"ends_at":		0,		// The number will go up to this value. For example this will be 31 if its a month
		"increment_by":	1,		// The next number is number+increment_by
		"number":		false,	// The current number in the slice.
		"index":		0,		// The index of this slice - this slice is at 'slices[index]'
		"text_before":	""		// The text before the number/mask
	}];
	main_slice = 1;
}

function init() {
	console.log("hi");
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
	$("autoplay").click(function() {
		if(this.checked) $("autoplay-options").show("inline");
		else $("autoplay-options").hide();
	});
	
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
	
	
	// More initializations...
	if(home.indexOf("?")+1) {
		var parts = home.split("?");
		home = home[0];
	}
	
	if($("url").value) simpleParse();
	
	//$("url").value = "http://localhost/Under_Construction/URL_Numbers/Comics/Naruto/00000000/Naruto-Pilot-01.jpg";
	//simpleParse();
	//$("mask").value = "http://localhost/Projects/URL_Numbers/Comics/Calvin_Hobbes/####/ch##|##|##.gif";
}

/// Save the URL List - if any is given into the array.
function saveList() {
	var list = $("url-list").value.split("\n");
	for(var i in list) {
		if(!list[i]) continue;
		
		var parts = list[i].split(/\s+/); // The list may have comments after the URL
		if(parts.length > 1) {
			url_list.push(parts[0]);
		} else {
			url_list.push(list[i]);
		}
	}
	
	$("url-list-nav").innerHTML = getUrlNavCode(url_list_index);
	$("url").value = url_list[0];
	simpleParse();
}

function nextUrlInList() {
	url_list_index++;
	if(!url_list[url_list_index]) url_list_index = 0; // Overshot.
	
	$("url-list-nav").innerHTML = getUrlNavCode(url_list_index);
	useThisUrl(url_list[url_list_index]);
	return false;
}

function prevUrlInList() {
	url_list_index--;
	if(url_list_index == -1) url_list_index = url_list.length - 1; // Undershot.
	
	$("url-list-nav").innerHTML = getUrlNavCode(url_list_index);
	useThisUrl(url_list[url_list_index]);
	return false;
}

function getUrlNavCode(url_list_index) {
	var prev_index = url_list_index - 1;
	if(!url_list[url_list_index - 1]) prev_index = url_list.length - 1;
	
	var next_index = url_list_index + 1;
	if(!url_list[url_list_index + 1]) prev_index = 0;
	
	return "<a href='"+url_list[prev_index]+"' onclick='return prevUrlInList()'>&lt; Prev</a>"
		+ " | <a href='"+url_list[url_list_index]+"' onclick='return useThisUrl(this.href)'>"+url_list[url_list_index]+"</a> "
		+ " | <a href='"+url_list[next_index]+"' onclick='return nextUrlInList()'>Next &gt;</a> ";
}

function useThisUrl(url) {
 	$("url").value = url;
 	simpleParse();
 	return false;
}

function array2json(arr) {
    return JSON.stringify(arr);
}

function getIdNumber(ele) {
	return Number(ele.id.replace(/[^\d]/g, ""));
}



/**
 * :TODO:
 * Find the most frequently used/changed number in multi-number url
 * Cache the next 3 images
 * Use Keyboard shortcuts to navigate
 * 
 *
 */