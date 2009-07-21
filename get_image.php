<?php
require('../../iframe/common.php');
// Download an image and show it.

$url_parts = parse_url($_REQUEST['url']);
$referrer = "$url_parts[scheme]://$url_parts[host]/"; //Some site won't let you hot link - in those cases, this comes in handy

$data = load($_REQUEST['url'], 
		array(
			'return_info'	=> true, 
			'referer'		=> $referrer,
			'cache'			=> true,
			'cache_folder'	=> '/tmp/load-cache/',
		));

// File not found!
if(isset($data['headers']['Status']) and $data['headers']['Status'] == 404) {
	header("Content-type: image/png");
	print file_get_contents('images/white.png');
	exit;
}

header("Content-type: " . $data['headers']['Content-Type']);
print $data['body'];
