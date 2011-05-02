<?php
require('../../iframe/common.php');

$template->addResource('http://localhost/iframe/css/style.css','style',true);
$template->addResource('http://localhost/iframe/images/silk_theme.css','style',true);
$template->addResource('style.css');
$template->addResource('index.css');

$template->addResource('http://localhost/Sites/openjs/openjs.com/scripts/jslibrary/releases/plugins/jsl_debug.js','js',true);
$template->addResource('http://localhost/Sites/openjs/openjs.com/scripts/jslibrary/releases/plugins/jsl_cookie.js','js',true);
$template->addResource('library/shortcut.js','js');
$template->addResource('library.js','js');
$template->addResource('ui.js','js');
$template->addResource('Bookmark.js','js');
$template->addResource('Slice.js','js');
$template->addResource('Img.js','js');
$template->addResource('url_slicers.js','js');
$template->addResource('mask_slicers.js','js');
$template->addResource('script.js','js');

printTop("Url Numbers");
?>
<div id="loading">loading...</div>
<div id="caching">caching next image...</div>

<span id="url-area"></span>
<div id="image-area">
<a href="#" id="previous-image" class="image-nav">&lt;</a>
<img id="image-ele" src="images/white.png" />
<a href="#" id="next-image" class="image-nav">&gt;</a>

<br /><br />
<a href="#" id="bookmark-current-url">Bookmark</a>
</div>

<br />

<form id="url-form" action="" method="post">
<!--
<a href="#" class="filler">http://www.schlockmercenary.com/comics/schlock20001115.png</a><br />
<a href="#" class="filler">http://www.penny-arcade.com/images/2008/20080706.jpg</a><br />
<a href="#" class="filler">http://localhost/Under_Construction/URL_Numbers/Comics/Calvin_Hobbes/1986/ch860207.gif</a><br />
<a href="#" class="filler">http://localhost/Under_Construction/URL_Numbers/Comics/Naruto/00000000/Naruto-Pilot-01.jpg</a><br />
-->
<div id="saved-bookmarks"></div>
<br />

<input name="url" id="url" type="text" value="<?php echo i($_GET, "url"); ?>" size="70" />
<input type="submit" id="show-details" value="Parse" /><br />

<div id="details">
<input name="mask" id="mask" type="text" size="70" />
<input type="button" id="masked-parse" value="Parse with Mask" /><br />

</div>

<a class="js-links" id="advanced-tab">Advanced Options</a>
<div id="advanced-options">
<ul class="horizondal-list">
<li><label for="use-proxy">Use Proxy with Referrer</label><input type="checkbox" id="use-proxy" name="use-proxy" value="1" /></li>

<li><label for="auto-resize">Auto Resize Big Images</label><input type="checkbox" id="auto-resize" name="auto-resize" value="1" /></li>

<li><label for="autoplay">Autoplay</label><input type="checkbox" id="autoplay" name="autoplay" value="1" />
<span id="autoplay-options"><label for="autoplay-delay">Delay</label><input type="text" id="autoplay-delay" name="autoplay-delay" value="4" size="2" /> seconds</span>
</li>
</ul>
<br />

<label for="url-list"><strong>URL List</strong></label><br />
<textarea id="url-list" name="url-list" rows="5" cols="50">
http://localhost/Under_Construction/URL_Numbers/Comics/Naruto/00000000/Naruto-Pilot-01.jpg
http://www.schlockmercenary.com/comics/schlock20001115.png
http://localhost/Projects/URL_Numbers/Comics/Calvin_Hobbes/1986/ch860101.gif
</textarea><br />
<input type="button" onclick="saveList()" value="Save List" />
</div>
<div id="url-list-nav"></div>
</form>


<?php
printEnd();
