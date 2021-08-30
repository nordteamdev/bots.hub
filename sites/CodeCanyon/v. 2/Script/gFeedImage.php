 <?php
// engine file
require_once('inc/_core.php');

include 'inc/resize.image.class.inc';

try {
	// build engine
	$core = new _SOCIALPLUS;
        $glb  = $core->im_global();

	// Image to resize
	$image = isset($_GET['img']) ? $glb->test_input($_GET['img']) : '';
	$size = isset($_GET['sz']) ? $glb->test_input($_GET['sz']) : '';
	$dimension = isset($_GET['dm']) ? explode('*',$_GET['dm']) : '';
	$fn = $glb->linkGetPhoto($size,$image,0);
        $image = $fn; // Location/name of image
        $max_width = $dimension[0]; // Max width to display image
        $max_height = $dimension[1]; // Max height to display image
         
        list($width, $height) = getimagesize($image);
        $scale = min($max_width/$width, $max_height/$height);
         
        if ($scale < '1') {
            $scale_width = floor($scale * $width);
            $scale_height = floor($scale * $height);
        } else {
            $scale_width = $width;
            $scale_height = $height;
        }
         
        echo $scale_width . ',' . $scale_height;

} catch (Exception $e) {
	print $e->getMessage();
}

