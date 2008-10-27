Bookmark = {
	"init": function() {
		// Get the bookmarks
		var bookmarks_str = JSL.cookie("url_numbers_bookmark").get();
		if(bookmarks_str) bookmarks = eval("(" + bookmarks_str + ")"); // Its a JSON string.

		this.buildMenu();
	},
	
	"bookmark": function() {
		var url = $("image-ele").src;
		var current_bookmark = -1;
		
		var domain_finder_re = new RegExp(/^https?\:\/\/(www\.)?([^\\\/]+).+$/i); //Find the domain name in the URL.
		var url_domain = url.replace(domain_finder_re, "$2");
	
		JSL.array(bookmarks).each(function(ele,i) {
			//Find the bookmark with the same domain as the current bookmark
			var bookmark_domain = ele.url.replace(domain_finder_re, "$2");
			
			if(url_domain == bookmark_domain) current_bookmark = i; // Found a bookmark with the same domain as the current URL.
		});
		
		if(current_bookmark == -1) bookmarks.push({"url": url}); //No other bookmark found for that domain - create a new bookmark.
		else bookmarks[current_bookmark] = {"url": url}; // Existing bookmark found - update it.
		
		Bookmark.save();
	},
	
	/// Delete a said bookmark - called when the delete button is clicked.
	"remove": function (e) {
		var id = this.id.replace(/\D/g, "");
		
		var new_bookmarks = []
		JSL.array(bookmarks).each(function(ele,i) {
			if(i != id) new_bookmarks.push(ele); // Remove the bookmark to be deleted.
		});
		JSL.dom("bookmark-row-"+id).parentNode.removeChild(JSL.dom("bookmark-row-"+id).get());
		
		this.save(new_bookmarks);
		this.buildMenu();
	},
	
	// Builds the bookmarks menu using the bookmarks array that was taken from the cookie.
	"buildMenu": function() {
		var html = [];
		JSL.array(bookmarks).each(function(ele,i) {
			html.push("<span id='bookmark-row-"+i+"'><a href='"+ele.url+"' class='filler' id='bookmark-"+i+"'>"+ele.url+"</a>"
				+ " - <a href='#' id='delete-bookmark-"+i+"' class='delete-bookmarks icon delete'>Delete Bookmark</a></span>");
		});
		$("saved-bookmarks").innerHTML = html.join("<br />");
		
		// Set up the event handlers
		$(".filler").click(function(e) {
			JSL.event(e).stop();
			$("url").value = this.href;
		});
		$(".delete-bookmarks").click(this.remove);
	
	},
	
	"save": function (new_bookmarks) {
		new_bookmarks = new_bookmarks || bookmarks;
		JSL.cookie("url_numbers_bookmark").set(array2json(new_bookmarks), 365); //Cookie will expire in an year
		bookmarks = new_bookmarks;
		showMessage("Bookmark Saved");
	}
}