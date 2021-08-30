<?php
set_time_limit(10000);
 
// engine file
require_once('inc/_core.php');

include 'inc/classes/resize.image.class.inc';

try {
	// build engine
	$core = new _SOCIALPLUS;
        $glb  = $core->im_global();


$resize_image = new Resize_Image;
 
// Image to resize
$vid = isset($_GET['v']) ? $glb->test_input($_GET['v']) : '';
$dimension = isset($_GET['dm']) ? explode('*',$_GET['dm']) : '';
$corr = isset($_GET['corr']) ? 1 : 0;
$empty = isset($_GET['empty']) ? 1 : 0;
$empty_dark = isset($_GET['empty_dark']) ? 1 : 0;
$album = isset($_GET['album']) ? 1 : 0;
$play_m = isset($_GET['playic']) ? 1 : 0;
// for communities
$clubid = isset($_GET['clubid']) ? (int) $glb->test_input($_GET['clubid']) : '';
$htps = HTTPS_ON ? 'https://' : 'http://';


// check if video is located to s3
$vc = $clubid ? $core->db->query("select `s3` from ".tbl_communities_pics." where `id`='{$vid}' limit 1") : $core->db->query("select `s3` from ".tbl_videos." where `id`='{$vid}' limit 1");
$vc = $vc->fetch_array(MYSQLI_ASSOC);
$s3 = $vc['s3'] == 'yes' ? 1 : 0;

 
if($clubid) {
	
	$fn = $s3 ? $htps.AWS_S3_BUCKET_NAME.$core->settings['AMAZON_S3_COMMUNITIES_VIDEO_COVERS_BUCKET'][0].'.s3.amazonaws.com/'.$vid.'.png' : __ROOT__.__COMMUNITIES_VIDEOS_DIR.$clubid.'/covers/'.$vid.'.png';
	
	
} else {
		 
 
	$fn = $s3 ? $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uvideo/'.$glb->getVidCover($vid).'/covers/'.$vid.'.png' : __ROOT__.__VD_DIR.$glb->getVidCover($vid).'/thumbs/'.$vid.'.png';
	
}



/* Some validation */
if( (!@file_exists($fn) && !$s3) ){ 
	// for trashed album cover
	$fn = $album ? _EMPTY_ALBUM : ($play_m ? __ROOT__.'/template/'._THEME.'/css/images/video/play-m.png' : ($empty_dark ? __ROOT__."/template/"._THEME."/css/images/bg_black.jpg" : ($empty ? __ROOT__."/template/"._THEME."/css/images/empty.png" : (!$corr ?  __ROOT__."/template/"._THEME."/css/images/bg_black.jpg" : __ROOT__."/template/"._THEME."/css/images/video/video-xl.png"))));
} 
 

	if($core->CheckS3Pictures($fn)){
		
	 	if(!$core->checkAWSfileExists($fn)) $fn = __ROOT__."/template/"._THEME."/css/images/empty.png";
		 
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


	header('Content-Type: image/png');
	echo file_get_contents($fn);

}

} catch (Exception $e) {
	print $e->getMessage();
}

?>