<?php
set_time_limit(10000);
 
// engine file
require_once('inc/_core.php');



try {
	// build engine
	$core = new _SOCIALPLUS;

 
// Image to resize
$image = isset($_GET['p']) ? $core->test_input(urldecode($_GET['p'])) : '';
 
$url = parse_url($image);
$root = __ROOT__;
 
if(isarray($url) && isset($url['scheme']))
$root = $url['scheme'] == 'https' || $url['scheme'] == 'http' ? '' : __ROOT__;
	
 

$fn = !$image ? $root.'/music/css/images/feed_cover.png' : $root.$image;
 

	header('Content-Type: image/jpeg');
	echo file_get_contents($fn);

} catch (Exception $e) {
	print $e->getMessage();
}

?>