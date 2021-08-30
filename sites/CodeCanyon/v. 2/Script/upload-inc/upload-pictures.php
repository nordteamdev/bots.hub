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

$upload_media = true;
// engine file
require_once('../inc/_core.php');


 
	// build engine
	$core = new _SOCIALPLUS;
	
	if(!$core->settings['AMAZON_S3_ENABLED']) uploadLocal(); else uploadToAmazon();
	

		
		
function uploadToAmazon(){
	
 global $core;
 
//define variables
$albid = '0';
$count   = 0;
$message = $CreatedImage = $fileSize = $injectPhotos = "";
 
 
	
	/* create folders */
	$buckets = $core->settings['AMAZON_S3_PICTURES_BUCKETS'];

 
	if( !  in_array(AWS_S3_BUCKET_NAME, $core->s3->listBuckets()) ) {
	
			//create a new bucket
			$core->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}

	



// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
	$s3_dir = '../stcmd/s3-user-pictures/';
	$s3_dir_large = $s3_dir.'/'.strtoupper(AWS_S3_BUCKET_NAME).'LARGE/';
	$success = false;
	$feed = $photoId = $newName = $userid = $fileExt = '';
    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];
	
    // generate dir  
    if (!file_exists($s3_dir))
    mkdir($s3_dir, 0777, true);
 
    // generate dir  
    if (!file_exists($s3_dir_large))
    mkdir($s3_dir_large, 0777, true);

	// Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name):
	
	
	
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $core->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $core->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            }  else {
	
	
	
		
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
                $newName = basename($core->USER['id'].'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
 
				$fileTempName = $_FILES['files']['tmp_name'][$f];
				$r = 0;
				
				
				
			
				if (move_uploaded_file($fileTempName, $s3_dir_large.$newName)) {
				$mainImage = $s3_dir_large.$newName;
				$count++; // Number of successfully uploaded files
				
				foreach($buckets as $bucket):

 
				    // generate dir  
					$s3_b_dir = $s3_dir.strtoupper(AWS_S3_BUCKET_NAME.$bucket).'/';
					
					
					if (!file_exists($s3_b_dir))
					mkdir($s3_b_dir, 0777, true);
			 
			 
				 
				
					if ( $bucket == 'medium' ) {
					
						$r_image =	smart_resize_image($mainImage, 
                                       null,
                                       $core->settings['MEDIUM_SIZE'],
                                       $core->settings['MEDIUM_SIZE'],
                                       true,
                                       $s3_b_dir.$newName,
                                       FALSE ); 
									   

				 
					} else if($bucket != 'large'){
	 
									
					$fileSize = filesize($mainImage);
					
					//Let's check allowed $ImageType, we use PHP SWITCH statement here
					switch(strtolower($_FILES['files']['type'][$f]))
					{
						case 'image/png':
							//Create a new image from file 
							$CreatedImage = imagecreatefrompng($mainImage);
							break;
						case 'image/gif':
							$CreatedImage = imagecreatefromgif($mainImage);
							break;			
						case 'image/jpeg':
						case 'image/pjpeg':
						case 'image/jpg':
							$CreatedImage = imagecreatefromjpeg($mainImage);
							break;
						default:
							$core->dieErr(['response' => 'Unsupported File!']); //output error and exit
					}
					
					
					list($CurWidth,$CurHeight) = getimagesize($mainImage);
					
					
					
					
					
						$r_image =	cropImage(  $CurWidth,
												$CurHeight,
												$core->settings[strtoupper($bucket).'_SIZE'],
												$s3_b_dir.$newName,
												$CreatedImage,
												90,
												$_FILES['files']['type'][$f]); 
									   

					}
 

					$folderName = 'uphoto/'.$core->USER['id'].'/'.$bucket.'/';  // path on s3 bucket.

					
					//move the file
					if($core->s3->putObjectFile($s3_b_dir.$newName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
					$r = 1;
					// delete images from local server
					 if ( $bucket != 'large') unlink($s3_b_dir.$newName);
					}
				
				
				if ($r) {
					 
					$success = true;
				}else{
					$message[] = "Something went wrong while uploading your file... sorry.";
				}
				
				
				endforeach;
				// delete main image from server
				if( $success ) unlink($mainImage);
				
				
		

			$toAlbum = isset($_POST['to_album']) ? $core->test_input($_POST['to_album']) : '';
		    $albid = isset($_POST['albid']) && (int)$_POST['albid'] > 0 ? $core->test_input($_POST['albid']) : '0';
                    $userid = $core->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
					
			if($toAlbum){
				
				// check if the album "Miscellaneous" is created
				$check = $core->db->query("select id from ".tbl_albums." where `userid`='{$userid}' and `name`='LANG_ALBUM_MISCELLANEOUS'");
				$albid = $check->fetch_array(MYSQLI_ASSOC);
				$albid = $albid['id'];
				if(!$albid)
					// create album "Miscellaneous"
					$albid = $core->query_insert("insert into ".tbl_albums." set `userid`='{$userid}',`name`='LANG_ALBUM_MISCELLANEOUS',`added`='".time()."'");
				
			}		
					
		    $photoId = $core->query_insert("insert into ".tbl_photos." set `s3`='yes',`userid`='{$userid}',`filename` = '{$newName}', `added`='".time()."', `size`='{$fileSize}', `extension`='{$fileExt}', `albumid`='{$albid}'");

		    if(!$albid) updateProfilePhoto($userid);
		    else updateAlbumCover($albid);

                    if (!$photoId) {
                        @unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
			if(!$toAlbum)
		    // update feed
		    $feed = updateFeed($photoId,$albid);  
			else $feed = '';

                    }
				
				
				
				
				
				}
				
		}
			

		}			
	endforeach;
	
 
echo $message ? json_encode($message) 
				: 
				json_encode(array("FEED_STATUS" => $feed,"status" => "OK", "photoid" => $photoId, "filename" => $newName, "userid" => $userid, "added" => time(), "size" => $fileSize, "extension" => $fileExt, "albumid" => $albid));

}
	
}	
		
function uploadLocal(){	
global $core;

//define variables
$albid = '0';
$count   = 0;
$message = $CreatedImage = $fileSize = $injectPhotos = "";

// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
 

  $feed = $photoId = $newName = $userid = $fileExt = '';
    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];
    $dir = '../'.$core->settings['PH_OUTPUT_DIR'].$core->USER['id'].'/';
	
	

	
    $large       = $dir.'/large/';
	$grid       = $dir.'/grid/';
	$exp       = $dir.'/exp/';
    $medium      = $dir.'/medium/'; 
    $thumbnail   = $dir.'/thumb/';
    $small       = $dir.'/small/';  

    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

 



    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $core->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $core->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
		$fileExt = end($temp);
                $newName = basename($core->USER['id'].'_'.mt_rand().mt_rand().mt_rand(). '.' . $fileExt);
		$mainImage = $large . $newName;

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $mainImage)) {
                    $count++; // Number of successfully uploaded files


        $fileSize = filesize($mainImage);
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES['files']['type'][$f]))
	{
		case 'image/png':
			//Create a new image from file 
			$CreatedImage = imagecreatefrompng($mainImage);
			break;
		case 'image/gif':
			$CreatedImage = imagecreatefromgif($mainImage);
			break;			
		case 'image/jpeg':
		case 'image/pjpeg':
		case 'image/jpg':
			$CreatedImage = imagecreatefromjpeg($mainImage);
			break;
		default:
			$core->dieErr(['response' => 'Unsupported File!']); //output error and exit
	}
			list($CurWidth,$CurHeight)=getimagesize($mainImage);

    // create thumbs
    for($i=1;$i<6;++$i){


    switch ($i){

    case '1':

    // medium dir
    if(!file_exists($medium))
    mkdir($medium, 0777, true);
    $medium_size = smart_resize_image($mainImage, 
                                       null,
                                       $core->settings['MEDIUM_SIZE'],
                                       $core->settings['MEDIUM_SIZE'],
                                       true,
                                       $medium.$newName,
                                       FALSE ); ///resizeImage($mainImage, $medium.$newName,$CreatedImage, $core->settings['MEDIUM_SIZE'], $core->settings['MEDIUM_SIZE']);///cropImage($CurWidth,$CurHeight,$core->settings['MEDIUM_SIZE'],$medium.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);

    break;
    
    case '2':

    // thumb dir
    if(!file_exists($thumbnail))
    mkdir($thumbnail, 0777, true);
    $thumb_size = cropImage($CurWidth,$CurHeight,$core->settings['THUMB_SIZE'],$thumbnail.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  
    break;

    case '3':
 
    // small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);
    $small_size = cropImage($CurWidth,$CurHeight,$core->settings['SMALL_SIZE'],$small.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  
    break;
	
    case '4':
 
    // grid dir
    if(!file_exists($grid))
    mkdir($grid, 0777, true);
    $grid_size = cropImage($CurWidth,$CurHeight,$core->settings['GRID_SIZE'],$grid.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  
    break;
	
	case '5':
	
    // exp dir
    if(!file_exists($exp))
    mkdir($exp, 0777, true);
    $exp_size = cropImage($CurWidth,$CurHeight,$core->settings['EXP_SIZE'],$exp.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  
    break;
	
    default: return;

  }
			

}
			$toAlbum = isset($_POST['to_album']) ? $core->test_input($_POST['to_album']) : '';
		    $albid = isset($_POST['albid']) && (int)$_POST['albid'] > 0 ? $core->test_input($_POST['albid']) : '0';
                    $userid = $core->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
					
			if($toAlbum){
				
				// check if the album "Miscellaneous" is created
				$check = $core->db->query("select id from ".tbl_albums." where `userid`='{$userid}' and `name`='LANG_ALBUM_MISCELLANEOUS'");
				$albid = $check->fetch_array(MYSQLI_ASSOC);
				$albid = $albid['id'];
				if(!$albid)
					// create album "Miscellaneous"
					$albid = $core->query_insert("insert into ".tbl_albums." set `userid`='{$userid}',`name`='LANG_ALBUM_MISCELLANEOUS',`added`='".time()."'");
				
			}		
					
		    $photoId = $core->query_insert("insert into ".tbl_photos." set `userid`='{$userid}',`filename` = '{$newName}', `added`='".time()."', `size`='{$fileSize}', `extension`='{$fileExt}', `albumid`='{$albid}'");

		    if(!$albid) updateProfilePhoto($userid);
		    else updateAlbumCover($albid);

                    if (!$photoId) {
                        @unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
			if(!$toAlbum)
		    // update feed
		    $feed = updateFeed($photoId,$albid);  
			else $feed = '';

                    }
                    
                    
                }
            }
        }
    }

if ($message) {
    
    ////foreach ($message as $msg)
        //echo $msg;
    echo json_encode($message);
} else
    echo json_encode(array("FEED_STATUS" => $feed,"status" => "OK", "photoid" => $photoId, "filename" => $newName, "userid" => $userid, "added" => time(), "size" => $fileSize, "extension" => $fileExt, "albumid" => $albid));


}



}
function lastFeedUpdate(){
global $core,$albid;
$i = $core->USER['id'];
$lst_w = $core->db->query("select `id`,`itemid`,`categ`,`added` from ".tbl_feed." where `parent_id` = '{$albid}' and `byuser` = '{$i}' order by added desc limit 1");
$res = $lst_w->fetch_array(MYSQLI_ASSOC);

return sizeof($res) ? $res['categ'].'='.$res['id'].'='.$res['itemid'].'='.$res['added'] : '';

}

function updateFeed($phId = 0,$album){
global $core;

$response = false;
$to = !$album ? 'pphotos' : 'palbum';
$parent_id = $album; 
$i = $core->USER['id'];
$c = 0;
$now = strtotime("-5 minutes");
$minus_12_hours = strtotime("-12 hours");
$q = $core->db->query("select `id`,`itemid` from ".tbl_feed." where `byuser`='{$i}' and `categ` = '{$to}' and `parent_id`='{$parent_id}' and `added` >= '{$now}' order by added desc limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

$itid = $r['itemid'];
$fid = $r['id'];
$last_up_feed = ex_egal(lastFeedUpdate());
if($phId > 0){

if( (!empty($itid) && !empty($fid)) || ($last_up_feed[0] == $to && $last_up_feed[3] <= $minus_12_hours) ){

$up_itid = !empty($itid) ? $phId.','.$itid : $phId .',' .$last_up_feed[2];
$fid = !empty($fid) ? $fid : $last_up_feed[1];
$query = "update ".tbl_feed." set `itemid` = '{$up_itid}', `added`='".time()."' where `id` = '{$fid}'";
$c = 1;

} else {

$query = "insert into ".tbl_feed." set `byuser`='".$core->USER['id']."',`itemid`='{$phId}',`added`='".time()."',`categ`='{$to}', `parent_id` = '{$parent_id}'";
$c = 0;

}
$exec_query = $c ? $core->db->query($query) : $core->query_insert($query);      

}
if($exec_query)
$response = true;

return $response;

}

function updateAlbumCover($id){
    global $core, $photoId;
		    // check if album have a cover
                    $request = $core->db->query("select `cover` from ".tbl_albums." where id='{$id}' limit 1");
		    $result = $request->fetch_array(MYSQLI_ASSOC);
		    $cover = $result['cover'];
		
	            if(!$cover)
		    $updateCover = $core->query_update("update ".tbl_albums." set `cover`= '{$photoId}' where id = ".$id);
			
}

function updateProfilePhoto($uid){
    global $core, $newName, $photoId;

		    $profPhoto = "";

		    // check if user have default photo
                    $request = $core->db->query("select `profile_photo` from ".tbl_users." where id='{$uid}' limit 1");
		    $result = $request->fetch_array(MYSQLI_ASSOC);
		    $profPhoto = $result['profile_photo'];

		   
                    if(!$profPhoto)                  
						$updateUser = $core->query_update("update ".tbl_users." set `profile_photo`= '{$photoId}' where id = ".$uid);
			

}
 