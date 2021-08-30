<?php
set_time_limit(10000);
 
// engine file
require_once('inc/_core.php');



try {
	// build engine
	$core = new _SOCIALPLUS;

 
// Image to resize
$image = isset($_GET['p']) ? $core->test_input($_GET['p']) : '';
 
 if($image == 'nope' || $image == '')
	 $fn = $core->theme_url.'/css/images/movie_default_poster.png';
 else
	$fn = "http://image.tmdb.org/t/p/w185/".$image;
 
	header('Content-Type: image/jpeg');
	echo file_get_contents($fn);

} catch (Exception $e) {
	print $e->getMessage();
}

?>