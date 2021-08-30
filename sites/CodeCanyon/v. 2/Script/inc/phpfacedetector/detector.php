<?php
/**
* This file contains the script that is called by detector.js library
* though ajax and call the FaceDetector class to detect the faces
* 
* LICENSE: This file is destinated to be sold on CodeCanyon only by
* the user SoftServlet. Reselling or distributing this file is not
* allowed.
*
* The file can receive as parameter though $_GET['image'] and relative
* path of the image or an absolute path (http:// url).
* In case when relative path is received, you need to set the $base
* variable which will be prepended to the received relative path.
*
* Example: 
* 	- your image is located /var/www/my-site/img/image.jpg
*	- the php-face-detector is at /var/www/my-site/php-face-detector
* In this case this script will receive the string "img/image.jpg"
* the $base should be $base = '../', to load ../img/image.jpg
*/

//---------------------------------------------------
// THE BASE PATH OF IMAGES RELATIVE TO THIS DIRECTORY
//---------------------------------------------------
$base = '../';




$src = $_GET['image'];

if(!stristr($src,'http://'))
{
	$src = trim($base,'/').'/'.trim($src,'/');
}

require_once 'detector.class.php';


$data = array();

try
{
	$detect = new FaceDetector($src);

	if(! $detect->faceDetect() ) die(  json_encode($data) );

	$data['faces'] = $detect->getFaces();
	$data['size'] = $detect->getImgSize();

	echo json_encode($data);
}
catch(Exception $e)
{
	echo json_encode(array('error' => $e->getMessage()));
}

