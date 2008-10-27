<?php
require('../../iframe/common.php');

//dump($config);
//exit;

$template->addResource('http://localhost/iframe/css/style.css','style',true);
$template->addResource('http://localhost/iframe/images/silk_theme.css','style',true);

$template->addResource('http://localhost/Sites/openjs/openjs.com/scripts/jslibrary/releases/plugins/jsl_debug.js','js',true);
$template->addResource('http://localhost/Sites/openjs/openjs.com/scripts/jslibrary/releases/plugins/jsl_cookie.js','js',true);
$template->addResource('library/shortcut.js','js');
$template->addResource('library.js','js');
$template->addResource('ui.js','js');
$template->addResource('Bookmark.js','js');
$template->addResource('Img.js','js');
$template->addResource('url_slicers.js','js');
$template->addResource('mask_slicers.js','js');
$template->addResource('script.js','js');

showTop("Url Numbers");
?>
<div id="loading">loading...</div>
<form action="" method="post">
<!--
<a href="#" class="filler">http://www.schlockmercenary.com/comics/schlock20001115.png</a><br />
<a href="#" class="filler">http://www.penny-arcade.com/images/2008/20080706.jpg</a><br />
<a href="#" class="filler">http://localhost/Under_Construction/URL_Numbers/Comics/Calvin_Hobbes/1986/ch860207.gif</a><br />
<a href="#" class="filler">http://localhost/Under_Construction/URL_Numbers/Comics/Naruto/00000000/Naruto-Pilot-01.jpg</a><br />
-->
<div id="saved-bookmarks"></div>
<br />

<input name="url" id="url" type="text" value="" size="70" />
<input type="button" id="show-details" value="Parse" /><br />

<div id="details">
<input name="mask" id="mask" type="text" size="70" />
<input type="button" id="masked-parse" value="Parse with Mask" /><br />

<span id="url-area"></span>
</div>
</form>

<div id="image-area">
<a href="#" id="previous-image">&lt;</a>
<img id="image-ele" src="images/white.png" />
<a href="#" id="next-image">&gt;</a>

<br /><br />
<a href="#" id="bookmark-current-url">Bookmark</a>
</div>



<?php
showEnd();
