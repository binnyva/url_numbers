<?php
//////////////////////// Layout Functions ///////////////////
function printHead($title='') {
	global $template, $config;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html><head>
<title><?=$title?></title>
<link href="<?=joinPath($config['site_url'],'css/style.css')?>" rel="stylesheet" type="text/css" />
<?=implode("\n", $template->css_includes);?>
<?php
}

function printBegin() {
?>
</head>
<body>

<div id="content">
<!-- Begin Content -->
<?php
}

function printTop($title='') {
	printHead($title);
	printBegin();
}

function printEnd() {
	global $template, $config;
?>
<!-- End Content -->
</div>
<div id="end">
<h1 id="logo"><a href="<?=$config['site_url']?>"><?=$config['site_title']?></a></h1>
</div>

<?=implode("\n", $template->js_includes);?>
</body>
</html>
<?php }
