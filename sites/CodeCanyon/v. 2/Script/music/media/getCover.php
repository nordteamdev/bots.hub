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

require_once($_SERVER['DOCUMENT_ROOT'] ."/music/__cache/_core.php");

$id = isset($_GET['i']) ? (int)$_GET['i'] : 0;

$cover = $action = '';
$action = isset($_GET['a']) ? $_GET['a'] : '';
if(!$id || !is_numeric($id))
die('Please enter a valid song id');

// call windowMusic
$c_eng = new __NOBIL_WindowMusic(true);

$query = $c_eng->__om_query("Select cover from ".nobil_om_songs." where id='".$id."' limit 1");

if(count($query) <= 0) die('Sorry, the song has not been founded.');

foreach($query as $res)
$cover = $res['cover'];

$vc = @explode('/', $cover);
$cover = isset($vc[3]) && '../'.$vc[3].'/' == __FILE_COVER_DIR ? $wMusic_config['host'].$cover : $cover;

if(!$cover && $action == 's') die('0');

if(!$cover) $cover = $wMusic_config['defaultCover'];

if($action == 'url') exit($cover);

$percent = 0.1; // percentage of resize

// Content type
header('Content-type: image/jpeg');

// Get new dimensions
list($width, $height) = @getimagesize($cover);

if($cover !== $wMusic_config['defaultCover'] && ($width > 128 || $height > 128)){
$new_width =  $action == 's' ? 46 : 128;///$width * $percent;
$new_height = $action == 's' ? 46 : 128;//$height * $percent;


// Resample
//$image_p = @imagecreatetruecolor($new_width, $new_height);
//$image = @imagecreatefromjpeg($cover);
//@imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

// Output
///imagejpeg($image_p, null, 80);
echo file_get_contents($cover);
}




/*
// Resample
$image_p = @imagecreatetruecolor($new_width, $new_height);


$imageType = pathinfo($cover, PATHINFO_EXTENSION);

	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($imageType))
	{
		case 'png':
			//Create a new image from file 
			$image =  @imagecreatefrompng($cover) or die(file_get_contents($cover));
			break;
		case 'gif':
			$image =  @imagecreatefromgif($cover) or die(file_get_contents($cover));
			break;			
		case 'jpeg':
		case 'pjpeg':
		case 'jpg':
			$image = @imagecreatefromjpeg($cover) or die(file_get_contents($cover));
			break;
		default:
			die('Unsupported File!'); //output error and exit
	}



		@imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

		// Output
		switch(strtolower($imageType))
		{
			case 'png':
				@imagepng($image_p, null) or die(file_get_contents($cover));
				break;
			case 'gif':
				@imagegif($image_p, null) or die(file_get_contents($cover));
				break;			
			case 'jpeg':
			case 'pjpeg':
			case 'jpg':
				@imagejpeg($image_p, null, 90) or die(file_get_contents($cover));
				break;
			default:
				return false;
		}

} else echo @file_get_contents($cover);
*/


?>