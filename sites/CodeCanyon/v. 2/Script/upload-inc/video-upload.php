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

//ini_set('display_errors',1);
 
$upload_media = true;
// engine file
require_once('../inc/_core.php');
	// build engine
	$core = new _SOCIALPLUS;
	
	
if(!$core->settings['AMAZON_S3_ENABLED']) uploadLocal(); else uploadToAmazon();
 
 
function uploadToAmazon(){
	
	 global $core;
 
//define variables
$count   = 0;
$message = $CreatedImage = $fileSize = $injectPhotos = $nm = $video_dur = $nFN = $videoId = $newName = $userid = $fileExt = $albid = "";
 
 
	
	/* create folders */
	$buckets = $core->settings['AMAZON_S3_USER_VIDEO_BUCKET'];

 
	if( !  in_array(AWS_S3_BUCKET_NAME, $core->s3->listBuckets()) ) {
	
			//create a new bucket
			$core->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	
	
// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {

    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];


	$success = false;


    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {  
        if ($_FILES['files']['error'][$f] == 4) {	  
            continue; // Skip file if any error found
        }
		
		 
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > 1048576 * $core->settings['VD_MAX_FILE_UPLOAD']) { 
                $message[] = "$name is too large!.";
                continue; // Skip large files
			
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $core->settings['VD_VALID_FORMATS'])) {
                $message[] = $core->lang['video_invalid_format'];
                continue; // Skip invalid file formats
             
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
				$nFN = basename($core->USER['id'].'_'.mt_rand().mt_rand().mt_rand());
                $newName = basename($nFN . '.' . $fileExt);
				 
				    $fileTempName = $_FILES['files']['tmp_name'][$f];
					$htps = HTTPS_ON ? 'https://' : 'http://';
				$nFN = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uvideo/'.$core->USER['id'].'/'.$newName;
			 
				$folderName = 'uvideo/'.$core->USER['id'].'/'; // path on s3 bucket.
                // No error found! Move uploaded files 
                 foreach($buckets as $bucket):
					if($core->s3->putObjectFile($fileTempName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
                    $count++; // Number of successfully uploaded files

 

 
				$s3_video_url = $nFN;
 				$getID3 = new getID3;
				$meta_dt = $getID3->analyze($fileTempName);
 
				$video_dur = isset($meta_dt['playtime_string']) ? $meta_dt['playtime_string'] : '--:--';
			    $fileSize = isset($meta_dt['filesize']) ? $meta_dt['filesize'] : rand();

			///$toAlbum = isset($_POST['to_album']) ? $core->test_input($_POST['to_album']) : '';
		    $albid = isset($_POST['albid']) && (int)$_POST['albid'] > 0 ? $core->test_input($_POST['albid']) : '0';
                    $userid = $core->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
					$nm = @str_replace(".".$fileExt, "", $name_m);
			//if($toAlbum){
				
				// check if the album "Videos" is created
				$check = $core->db->query("select id from ".tbl_albums." where `userid`='{$userid}' and `video`='yes'");
				$albid = $check->fetch_array(MYSQLI_ASSOC);
				$albid = isset($albid) && $albid > 0 ? $albid['id'] : '';
				if(!$albid)
					// create album "Miscellaneous"
					$albid = $core->query_insert("insert into ".tbl_albums." set `userid`='{$userid}',`name`='LANG_ALBUM_VIDEOS',`added`='".time()."',`video`='yes'");
				
			//}		
					
		    $videoId = $core->query_insert("insert into ".tbl_videos." set  `userid`='{$userid}',
																			`title`='{$nm}',
																			`filename` = '{$newName}',
																			`added`='".time()."',
																			`size`='{$fileSize}',
																			`extension`='{$fileExt}',
																			`albumid`='{$albid}',
																			`dur`='{$video_dur}',`s3`='yes'
											");


                    if (!$videoId) {
                       
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } 
                    
                    
                }
				endforeach;
            }
        }
    }

if ($message) {
    echo json_encode($message);
} else{


    echo json_encode(array("status" => "OK", "title" => $nm, "vd_dur" => $video_dur,"src" => $nFN,"videoid" => $videoId, "filename" => $newName, "userid" => $userid, "added" => time(), "size" => $fileSize, "extension" => $fileExt, "albumid" => $albid));
}

}



	
} 
 
 
 

function uploadLocal(){
	
	global $core;
	
//define variables
$count   = 0;
$message = $CreatedImage = $fileSize = $injectPhotos = $nm = $video_dur = $nFN = $videoId = $newName = $userid = $fileExt = $albid = "";

// upload
if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
 
    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];
    $dir = '../'.$core->settings['VD_OUTPUT_DIR'].$core->USER['id'].'/';
    $videos_dir       = $dir.'/videos/';
    $send_dir = $core->settings['VD_OUTPUT_DIR'].$core->USER['id'].'/videos/';
	
    // generate dir by user id
    if (!file_exists($dir))
    @mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($videos_dir))
    @mkdir($videos_dir, 0777, true);



    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > 1048576 * $core->settings['VD_MAX_FILE_UPLOAD']) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $core->settings['VD_VALID_FORMATS'])) {
                $message[] = $core->lang['video_invalid_format'];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
				$nFN = basename($core->USER['id'].'_'.mt_rand() .mt_rand().mt_rand());
                $newName = basename($nFN . '.' . $fileExt);
				$mainvideo = $videos_dir . $newName;
				
                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $mainvideo)) {
                    $count++; // Number of successfully uploaded files

//shell_exec('ffmpeg -i ".$mainvideo." -vcodec h264 -acodec aac -strict -2 haaaaaa.mp4');

				$getID3 = new getID3;
				$meta_dt = $getID3->analyze($mainvideo);
				$video_dur = $meta_dt['playtime_string'];
					
				$fileSize = $meta_dt['filesize'];


			///$toAlbum = isset($_POST['to_album']) ? $core->test_input($_POST['to_album']) : '';
		    $albid = isset($_POST['albid']) && (int)$_POST['albid'] > 0 ? $core->test_input($_POST['albid']) : '0';
                    $userid = $core->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
					$nm = @str_replace(".".$fileExt, "", $name_m);
			//if($toAlbum){
				
				// check if the album "Videos" is created
				$check = $core->db->query("select id from ".tbl_albums." where `userid`='{$userid}' and `video`='yes'");
				$albid = $check->fetch_array(MYSQLI_ASSOC);
				$albid = isset($albid) && $albid > 0 ? $albid['id'] : '';
				if(!$albid)
					// create album "Miscellaneous"
					$albid = $core->query_insert("insert into ".tbl_albums." set `userid`='{$userid}',`name`='LANG_ALBUM_VIDEOS',`added`='".time()."',`video`='yes'");
				
			//}		
					
		    $videoId = $core->query_insert("insert into ".tbl_videos." set  `userid`='{$userid}',
																			`title`='{$nm}',
																			`filename` = '{$nFN}',
																			`added`='".time()."',
																			`size`='{$fileSize}',
																			`extension`='{$fileExt}',
																			`albumid`='{$albid}',
																			`dur`='{$video_dur}'
											");


                    if (!$videoId) {
                        @unlink($mainvideo);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
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
    echo json_encode(array("status" => "OK", "title" => $nm, "vd_dur" => $video_dur,"src" => $send_dir.$newName,"videoid" => $videoId, "filename" => $newName, "userid" => $userid, "added" => time(), "size" => $fileSize, "extension" => $fileExt, "albumid" => $albid));


}

}
