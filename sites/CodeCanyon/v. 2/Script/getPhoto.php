<?php

/*

Kontackt License Agreement (DMCA License)

Copyright (c) 2015, Alex Dobrovolscki (dobriisasa@gmail.com)
All rights reserved.

* Redistributions of source code is strictly forbidden.

* By using Kontackt you may have your own purchase copy, if you are not own a license, you can buy one from https://codecanyon.net/user/dobrovolscki/portfolio.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/


// engine file
require_once('inc/_core.php');
require 'inc/classes/resize.image.class.inc';




try {
	// build engine
	$core = new _SOCIALPLUS;
	$resize_image = new Resize_Image;
    $glb  = $core->im_global();

    $c_w = $c_h= "";
    $album = isset($_GET['album']) ? 1 : 0;
    $low =    isset($_GET['low']) ? 1 : 0;
	$size = isset($_GET['sz']) ? $core->test_input($_GET['sz']) : '';//$low ? 'small' : (isset($_GET['sz']) ? $core->test_input($_GET['sz']) : '');
    $fileId = isset($_GET['p']) ? (int) $core->test_input($_GET['p']) : '';
    $gender = isset($_GET['g']) ? $core->test_input($_GET['g']) : '';
    $hook_online = isset($_GET['onlinehook']) ? $core->test_input($_GET['onlinehook']) : '';
	$attach = isset($_GET['attach']) ? true : false;
	$from   = isset($_GET['from']) && $_GET['from'] == 'attach' ? 1 : 0;
    $custom_size = isset($_GET['custom']) ? 1 : 0;
	$return_file = isset($_GET['return_file']) ? 1 : 0;
	$resize = isset($_GET['resize']) ? $_GET['resize'] : '';
	$corrupted = isset($_GET['corr']) ? true : false;
	$delalbum = isset($_GET['delalbum']) ? 1 : 0;
	$d_filename = $delalbum ? (isset($_GET['fn']) ? $_GET['fn'] : '') : '';
	$force_resize = isset($_GET['force_resize']) ? $_GET['force_resize'] : '';
	$msg = isset($_GET['msg']) ? 1 : 0;

	if(!$size || !$fileId || !is_numeric($fileId))
	$size = 'large';


		// check for s3
		$is_s3 = $attach ? $core->db->query("select `s3` from ".tbl_attach." where `id`='{$fileId}' limit 1") : $core->db->query("select `s3` from ".tbl_photos." where `id`='{$fileId}' limit 1");
		$is_s3 = $is_s3->fetch_array(MYSQLI_ASSOC);
		$is_s3 = $is_s3['s3'] == 'yes' ? true : false;


	$fn = $glb->linkGetPhoto($size,$fileId,$attach,$delalbum);
 

 
	 

	
	
	if($from && (!file_exists($fn) && !$is_s3) ){
	$fn = $glb->linkGetPhoto($size,$fileId,1);
	} else if( (!file_exists($fn) && !$is_s3) || empty($fn)){
	$_hook_online = $hook_online ? 'online_' : 'online_';
        $fn = $msg ? __ROOT__.__TRANS_BG : ($corrupted ? __ROOT__.$glb->settings['CORRUPTED_PHOTO_DEFAULT'] : ($gender ? __ROOT__.$glb->settings['USER_DEFAULT_PHOTO'][$_hook_online.$gender] : __ROOT__.$glb->settings['USER_DEFAULT_PHOTO']['male']));

        if($custom_size)
        list($c_w, $c_h) = explode('*',$_GET['custom']);

	// for trashed album cover
	if($album)
	$fn = $core->theme_dir."/css/images/empty-album.png";///"/css/images/Picture-60.png";
	
	}
   
	if( $delalbum ){
		
		
		
		$getDeletedPhotoLink = $core->db->query("select `s3` from ".tbl_deleted_photos." where `photoid`='{$fileId}' limit 1");
		$getDeletedPhotoLink = $getDeletedPhotoLink->fetch_array(MYSQLI_ASSOC);
		$is_s3 = $getDeletedPhotoLink['s3'] == 'yes' ? true : false;
		$htps = HTTPS_ON ? 'https://' : 'http://';
		
		
		$fn = $is_s3 ? $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uphoto/'.$size.'/'.$d_filename : __ROOT__.__TRASH_.'grid/'.$d_filename;
		
	}
   	if($return_file) {echo $fn; exit;}


   if ($album && $c_w && $c_h) 
        $fn = resize_png($fn ,$c_w, $c_h, 'photo');
    
	//$glb->notFound();
 
	header('Content-Type: image/jpeg');

	if($resize){
	$dimension = explode('|',$resize);	
	$original_img_size = getimagesize($fn);
	// Get the new with & height
$new_width = (int)$dimension[0];
$new_height = (int)$dimension[1];


$resize_image->new_width = $force_resize ? $new_width : ($original_img_size[0] > $new_width ? $new_width : $original_img_size[0]);
$resize_image->new_height = $force_resize ? $new_height : ($original_img_size[1] > $new_height ? $new_height : $original_img_size[1]);
 
$resize_image->image_to_resize = $fn; // Full Path to the file
 
$resize_image->ratio = true; // Keep aspect ratio
 
$process = $resize_image->resize(); // Output image	

		
	}else if(!$low)
	{
$p_ext = explode('.',$fn);
$p_ext = strtolower($p_ext[sizeof($p_ext)-1]);

// watermark to images
	if(($p_ext == 'jpeg' || $p_ext == 'jpg' || $p_ext == 'png') && $core->settings['WATERMARK'] == false && $size == 'large' && $fileId && !$hook_online && $fn != __ROOT__."/css/images/Picture-60.png")
{

// Load the stamp and the photo to apply the watermark to
$stamp = imagecreatefrompng(__WATERMARK);

switch($p_ext){
case 'jpg':
case 'jpeg':
$im = imagecreatefromjpeg($fn);
break;

case 'png':
$im = imagecreatefrompng($fn);;
break;

}

// Set the margins for the stamp and get the height/width of the stamp image
$marge_right = 10;
$marge_bottom = 10;
$sx = imagesx($stamp);
$sy = imagesy($stamp);

// Copy the stamp image onto our photo using the margin offsets and the photo 
// width to calculate positioning of the stamp. 
imagecopy($im, $stamp, imagesx($im) - $sx - $marge_right, imagesy($im) - $sy - $marge_bottom, 0, 0, imagesx($stamp), imagesy($stamp));

// Output and free memory
switch($p_ext){
case 'jpg':
case 'jpeg':

imagejpeg($im);

case 'png':
imagepng($im);
break;

break;


}
imagedestroy($im);


} else {
  
	echo file_get_contents($fn);
	
}
	}else
	{

$p_ext = explode('.',$fn);
$p_ext = strtolower($p_ext[sizeof($p_ext)-1]);

switch($p_ext){
case 'jpg':
case 'jpeg':

$percent = 0.5; // percentage of resize

// Get new dimensions
list($width, $height) = getimagesize(str_replace("small","large",$fn));
$new_width = $width;
$new_height = $height;

// Resample
$image_p = imagecreatetruecolor($new_width, $new_height);

$y = imagesy($image_p);
$x = imagesx($image_p);
$image = imagecreatefromjpeg($fn);
imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $x, $y);

// Output
imagejpeg($image_p, null, 10);
imagedestroy($img);
break;

case 'png':
$img = imagecreatefrompng($fn);
 imagepng($img, NULL, 0);
break;


	}


}
} catch (Exception $e) {
	print $e->getMessage();
}


function resize_png( $original_image, $new_height, $new_width, $filename )
{  
    
    list($width, $height) = getimagesize($original_image);
    $image_p = imagecreatetruecolor($new_width, $new_height);
    $image = imagecreatefrompng($original_image);        
    imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    header('Content-Type: image/jpeg'); 
    imagepng($image_p);
    imagedestroy($image_p);
}

