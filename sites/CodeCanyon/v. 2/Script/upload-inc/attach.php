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
require_once('../inc/_core.php');

 
	$core = new _SOCIALPLUS;
 

 
if(!$core->settings['AMAZON_S3_ENABLED']) uploadLocal(); else uploadToAmazon();
 
 function uploadToAmazon(){
	global $core;
	
	
	//define variables
	$albid = '0';
	$count   = 0;
	$message = $CreatedImage = $fileSize = $injectPhotos = "";
	 
	/* create folders */
	$buckets = $core->settings['AMAZON_S3_ATTACHMENTS_BUCKET'];
	
	if( !  in_array(AWS_S3_BUCKET_NAME, $core->s3->listBuckets()) ) {
	
			//create a new bucket
			$core->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	 
	 
	$success = false;
	 
	 
	 
	 	// upload
	if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
 

  
    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];


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
                $newName = basename($core->USER['id'].'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
				
				
				$fileTempName = $_FILES['files']['tmp_name'][$f];
				
				$folderName = 'attachments/'.$core->USER['id'].'/';  // path on s3 bucket.

                // No error found! Move uploaded files 
                 foreach($buckets as $bucket):
		 
					if($core->s3->putObjectFile($fileTempName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
                    $count++; // Number of successfully uploaded files

					$mainImage = $fileTempName;
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

		    $toUser = isset($_POST['to']) && (int)$_POST['to'] > 0 ? $core->test_input($_POST['to']) : '0';
                    $userid = $core->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
		    $photoId = $core->query_insert("insert into ".tbl_attach." set `s3`='yes',`userid`='$userid',`filename` = '$newName', `added`='".time()."', `file_size`='$fileSize', `sended_to`='$toUser'");

                    if (!$photoId) {
                        ////@unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } 
                    
                    
                }
				endforeach;
            }
        }
    }

if ($message) 
    echo json_encode($message);
else
    echo json_encode(array("status" => "OK", "photoid" => $photoId, "filename" => $newName, "userid" => $userid, "added" => time(), "size" => $fileSize));


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
 

  
    $max_file_size = 1048576 * $core->settings['MAX_FILE_UPLOAD'];
    $dir = '../'.$core->settings['AT_OUTPUT_DIR'].$core->USER['id'].'/';



    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);


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
                $newName = basename($core->USER['id'].'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
		$mainImage = $dir . $newName;

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

		    $toUser = isset($_POST['to']) && (int)$_POST['to'] > 0 ? $core->test_input($_POST['to']) : '0';
                    $userid = $core->USER['id'];
                    $name_m   = $_FILES["files"]["name"][$f];
		    $photoId = $core->query_insert("insert into ".tbl_attach." set `userid`='$userid',`filename` = '$newName', `added`='".time()."', `file_size`='$fileSize', `sended_to`='$toUser'");

                    if (!$photoId) {
                        @unlink($mainImage);
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
    echo json_encode(array("status" => "OK", "photoid" => $photoId, "filename" => $newName, "userid" => $userid, "added" => time(), "size" => $fileSize));


}

 }
?>