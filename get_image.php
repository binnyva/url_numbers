<?php
require('../../iframe/common.php');
// Download an image and show it. Some site wont let you hot link - in those cases, this comes in handy
 
$data = load($_REQUEST['url'], array('return_info'=>true));
header("Content-type: " . $data['headers']['Content-Type']);
print($data['body']);
