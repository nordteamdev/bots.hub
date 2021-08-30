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
    $method = isset($_POST['method']) ? $core->test_input($_POST['method']) : 'cover';

	
	if(!$core->settings['AMAZON_S3_ENABLED']) uploadThemesLocal(); else uploadThemesToS3();
	
	
function  uploadThemesToS3(){
	global $core,$method;
	
	
//define variables
$albid = '0';
$count   = 0;
$message = $CreatedImage = $fileSize = $injectPhotos = $cover_url = $bbucket = "";

$success = false;
	
	/* create folders */
	$buckets = $core->settings['AMAZON_S3_USER_COVERS_BUCKETS'];
 
 
	if( !  in_array(AWS_S3_BUCKET_NAME, $core->s3->listBuckets()) ) {
	
			//create a new bucket
			$core->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	

// upload
if (isset($_POST) && isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] == "POST") {
	
	
    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.__COVERS_DIR.$core->USER['id'].'/';
    $slideshow       = $dir.'/slideshow/';
    $cover      = $dir.'/covers/'; 
	
	
	
	
	    // Loop $_FILES to execute all files
    foreach ($_FILES['file']['name'] as $f => $name) {
        if ($_FILES['file']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['file']['error'][$f] == 0) {
            if ($_FILES['file']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $core->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $core->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['file']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
                $newName = basename($core->USER['id'].'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
				$mimagePath = ($method === 'cover' ? $cover : $slideshow);
			 
				
				
				$fileTempName = $_FILES['file']['tmp_name'][$f];
				$mainImage = $fileTempName;
				$folderName = 'ucovers/'.$core->USER['id'].'/';  // path on s3 bucket.
				$htps = HTTPS_ON ? 'https://' : 'http://';
				$cover_url = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/ucovers/'.$core->USER['id'].'/'.$newName;
				
				
                // No error found! Move uploaded files 
               foreach($buckets as $bucket): 
			   
					if($core->s3->putObjectFile($fileTempName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
                    $count++; // Number of successfully uploaded files


        $fileSize = filesize($mainImage);
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES['file']['type'][$f]))
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

 
			



            $userid = $core->USER['id'];
            $name_m   = $_FILES["file"]["name"][$f];
						
			if($method === 'cover')	{	
				$imgs = $core->query_insert("insert into ".tbl_themes." set `s3`='yes',`userid`='{$userid}',`ext`='{$fileExt}',`photo` = '{$newName}', `added`='".time()."', `kn`='false'");
				///$update_cover = $core->query_update("update ".tbl_users." set `theme`='{$imgs}' where `id`='{$userid}'");
			} else
				$imgs = $core->query_insert("insert into ".tbl_slideshow_imgs." set `s3`='{$newName}',`userid`='{$userid}', `ex`='{$fileExt}', `added`='".time()."'");


                    if (!$imgs) {
                       /// @unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
		       // update feed
				$feed = '';//updateFeed($photoId,$albid);  
				// rename image file
				///rename($mainImage,$mimagePath.$imgs.'.'.$fileExt);


                    }
                    
                    
                }
				endforeach;
            }
        }
    }
	
	
	
	
	
	
	
	
}
	
	if ($message) 
    echo json_encode($message);
 else
    echo json_encode(array("FEED_STATUS" => $feed, "method" => $method, "theme_id" => $imgs,"cover_url" => $cover_url, "status" => "OK", "photoid" => $imgs, "filename" => $newName, "userid" => $userid, "added" => time()));

	
}
	
	
	
	
	
	
	
	function  uploadThemesLocal() {
global $core,$method;
//define variables
$albid = '0';
$count   = 0;
$message = $CreatedImage = $fileSize = $injectPhotos = "";


// upload
if (isset($_POST) && isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] == "POST") {
 

  
    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];
    $dir = '../'.__COVERS_DIR.$core->USER['id'].'/';
    $slideshow       = $dir.'/slideshow/';
    $cover      = $dir.'/covers/'; 


    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // cover dir
    if(!file_exists( $cover ))
    mkdir($cover, 0777, true);

	// slideshow dir
	if(!file_exists( $slideshow ))
		mkdir($slideshow, 0777, true);

    // Loop $_FILES to execute all files
    foreach ($_FILES['file']['name'] as $f => $name) {
        if ($_FILES['file']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['file']['error'][$f] == 0) {
            if ($_FILES['file']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $core->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $core->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['file']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
                $newName = basename($core->USER['id'].'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
				$mimagePath = ($method === 'cover' ? $cover : $slideshow);
				$mainImage = $mimagePath . $newName;

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["file"]["tmp_name"][$f], $mainImage)) {
                    $count++; // Number of successfully uploaded files


        $fileSize = filesize($mainImage);
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES['file']['type'][$f]))
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

 
			



            $userid = $core->USER['id'];
            $name_m   = $_FILES["file"]["name"][$f];
						
			if($method === 'cover')	{	
				$imgs = $core->query_insert("insert into ".tbl_themes." set `userid`='{$userid}',`ext`='{$fileExt}',`photo` = '{$newName}', `added`='".time()."', `kn`='false'");
				///$update_cover = $core->query_update("update ".tbl_users." set `theme`='{$imgs}' where `id`='{$userid}'");
			} else
				$imgs = $core->query_insert("insert into ".tbl_slideshow_imgs." set `userid`='{$userid}', `ex`='{$fileExt}', `added`='".time()."'");


                    if (!$imgs) {
                        @unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
		       // update feed
				$feed = '';//updateFeed($photoId,$albid);  
				// rename image file
				rename($mainImage,$mimagePath.$imgs.'.'.$fileExt);


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
    echo json_encode(array("FEED_STATUS" => $feed, "method" => $method, "theme_id" => $imgs,"cover_url" => __COVERS_DIR.$userid.'/covers/'.$imgs.'.'.$fileExt, "status" => "OK", "photoid" => $imgs, "filename" => $newName, "userid" => $userid, "added" => time()));


}




	}
 

/****
 Functions
************/
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




?>