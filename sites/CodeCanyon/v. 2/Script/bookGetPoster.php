<?php
set_time_limit(10000);
 
// engine file
require_once('inc/_core.php');



try {
	// build engine
	$core = new _SOCIALPLUS;

 
// Image to resize
$image = isset($_GET['p']) ? urldecode($_GET['p']) : '';
 
 if($image == 'nope')
	 $image = $core->theme_url.'/css/images/book-cover-80.png';
 
	header('Content-Type: image/jpeg');
	echo file_get_contents($image);

} catch (Exception $e) {
	print $e->getMessage();
}

?>