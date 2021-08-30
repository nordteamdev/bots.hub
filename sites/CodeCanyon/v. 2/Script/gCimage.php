<?php
set_time_limit(10000);
 
// engine file
require_once('inc/_core.php');



try {
	// build engine
	$core = new _SOCIALPLUS;
        $glb  = $core->im_global();

include 'inc/classes/resize.image.class.inc';


$resize_image = new Resize_Image;
 
// Image to resize
$image = isset($_GET['img']) ? $glb->test_input($_GET['img']) : '';
$size = isset($_GET['sz']) ? $glb->test_input($_GET['sz']) : '';
$dimension = isset($_GET['dm']) ? explode('*',$_GET['dm']) : '';
$album = isset($_GET['album']) ? $_GET['album'] : '';
$attach = isset($_GET['from']) == 'attach' ? true : false;
$dimension = $attach && $size == 'small' ?  explode('*','80*80') : '';
 
$fn = $glb->linkGetPhoto($size,$image,$attach);

$is_s3 = $core->CheckS3Pictures($fn) ? true : false;
 



/* Some validation */
if($core->settings['AMAZON_S3_ENABLED'] && $is_s3 ){ 
	header('Content-Type: image/jpeg');
	echo file_get_contents($fn);
}else if($album && (!@file_exists($fn) && !$core->settings['AMAZON_S3_ENABLED']) ){
	
	// for trashed album cover
	$fn = __ROOT__."/css/images/empty-album.png";
	
} else if( !@file_exists($fn) && !$core->settings['AMAZON_S3_ENABLED'] ) {
exit('The requested image does not exist.');
}  

if($dimension){



// Get the new with & height
$new_width = (int)$dimension[0];
$new_height = (int)$dimension[1];
 
$resize_image->new_width = $new_width;
$resize_image->new_height = $new_height;
 
$resize_image->image_to_resize = $fn; // Full Path to the file
 
$resize_image->ratio = !$attach ? true : false; // Keep aspect ratio
 
$process = $resize_image->resize(); // Output image

} else {
	
	header('Content-Type: image/jpeg');
	echo file_get_contents($fn);
	
}

} catch (Exception $e) {
	print $e->getMessage();
}

?>