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
 
class _STORIES extends _global_co {


public $userid;
public $time;
public $id;
public $stories_templates;

public function __construct(){

//the old building from parent class
parent::__construct();


 
$this->userid = isset($this->USER['id']) ? $this->USER['id'] : 0;

$this->id = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : (isset($_GET['id']) ? (int) $this->test_input($_GET['id']) : '');
$this->id = preg_replace('/[^0-9]/', '', $this->id);
$this->time = time();
$this->stories_templates = $this->theme_dir."/stories/";


$this->template->assign('this',$this);



}


// index
public function upload(){

 
 
	$act = isset($_POST['act']) ? $_POST['act'] : 0;
	$story_id = false;
	
	// check if the story exist, add files to it, if not create new one
	$q = $this->db->query("select id from ".tbl_stories." where `userid`='{$this->userid}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	if(isset($r['id']) && $r['id'] > 0){
		
 
			
			$story_id = $r['id'];
			
		} else {
			
			$story_id =  $this->createStory();
			

		
	}
	
	
	if($story_id > 0){
		
		if($act == 'upload-pictures'){
			
			$this->addPictures($story_id);
			
		} else {
			
			$this->addVideos($story_id);
			
		}
		
	} else {
		
		echo 'story_not_created';
		
	}
	

}
public function createStory(){
	
	// add new story
	return $this->query_insert("insert into ".tbl_stories." set `added`='{$this->time}',`userid`='{$this->userid}'");
	
	
}


 

// upload pictures
public function addPictures($story_id){
	
	$author_id = $this->USER['id'];
	$max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.__STORIES_FILES_DIR;
    $large       = $dir.'/'.$author_id.'/pictures/large/';
    $small       = $dir.'/'.$author_id.'/pictures/small/';

	$image_url_done_large = $this->settings['HOST'].__STORIES_FILES_DIR.'/'.$author_id.'/pictures/large/';
	$image_url_done_small = $this->settings['HOST'].__STORIES_FILES_DIR.'/'.$author_id.'/pictures/small/';

    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

    // small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);


	$uploadOk = 1;

	$message = array();
	$count   = 0;
  
	
	    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
		$fileExt = end($temp);
                $newName = basename($author_id.'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
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
			$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
	}
			list($CurWidth,$CurHeight)=getimagesize($mainImage);

	 
    // small dir
    $small_size = cropImage($CurWidth,$CurHeight,
	$this->settings['STORIES_SMALL_IMAGES_SIZE'],
	$small.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  



	
	$time = $this->time;
	$picture_id = $this->query_insert("insert into ".tbl_stories_files." set `userid`='{$author_id}',`filename` = '{$newName}', `added`='{$time}',
	`size`='{$fileSize}', `type`='{$fileExt}',`story_id`='{$story_id}'");
				
				

				      if (!$picture_id) {
                        @unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
						
						// add to feed
					//	if(!$is_post) $this->insertIntoFeed($picture_id,$this->id,'picture');
						
					}
				
				}
				
			}
		}
	}
	
if ($message) 
    echo json_encode($message);
 else
    echo json_encode(array("status" => "OK", 
"photoid" => $picture_id, 
"story_id" => $story_id,
"filename" => $newName, 
"userid" => $author_id, 
"added" => $time, 
"size" => $fileSize, 
"s3" => "no",
"extension" => $fileExt,
"small_image_url" => $image_url_done_small.$newName,
"large_image_url" => $image_url_done_large.$newName
));



}
public function notifFriends($text,$story_id){
	// get all friends
	$friends = $this->getAllFrendsId();

	if(count($friends)){
		
	foreach($friends as $friendId):	
	// to notif 
	$this->toNotif($friendId,'story',$story_id,$text,$this->USER['id']);
	endforeach;
	
	}
	
}
public function createVideoStory(){
	
	$res = array("status" => 0);
	$max_file_size = 1048576 * $this->settings['VD_MAX_FILE_UPLOAD'];
	$author_id = $this->USER['id'];
    $dir = __ROOT__.__STORIES_FILES_DIR;
    $videos_dir       = $dir.'/'.$author_id.'/video/videos/';
    $covers_dir       = $dir.'/'.$author_id.'/video/covers/';


    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // video dir
    if(!file_exists($videos_dir))
    mkdir($videos_dir, 0777, true);

    // covers dir
    if(!file_exists($covers_dir))
    mkdir($covers_dir, 0777, true);


	$uploadOk = 1;

	$message = array();
	$count   = 0;
  
	
	    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > $max_file_size) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VD_VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VD_VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
                $newName = basename($author_id.'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
				$mainVideo = $videos_dir . $newName;

                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $mainVideo)) {
                    $count++; // Number of successfully uploaded files
				$time = $this->time;
				
				
	// check for current stories, if exist just update
	$story_exists = $this->db->query("Select id from ".tbl_stories." where `userid`='{$this->userid}' and `public`='yes' limit 1");
	$story_exists = $story_exists->fetch_array(MYSQLI_ASSOC);
	$story_exists_id = isset($story_exists['id']) ? $story_exists['id'] : false;
 
	
	if(!$story_exists_id){
	// add new story
	$story_id = $this->query_insert("insert into ".tbl_stories." set `added`='{$this->time}',`userid`='{$this->userid}',`public`='yes'");
	
	
	$this->notifFriends("added_new_story",$story_id);
	
	
	} else {
	$story_id = $story_exists_id;
	
	// update story
	$this->query_update("update ".tbl_stories." set `added`='{$this->time}',`public`='yes' where `id`='{$story_id}'");
	
	// delete views for respective story
	$this->query_delete("delete from ".tbl_stories_views." where `story_id`='{$story_id}'");
	
	$this->notifFriends("updated_story",$story_id);
	
	}
				
	$video_id = $this->query_insert("insert into ".tbl_stories_files." set `userid`='{$author_id}',`filename` = '{$newName}', `added`='{$time}',
	 `type`='video',`story_id`='{$story_id}'");
				
		if($story_id > 0 && $video_id > 0){
 
		$res['status'] = "OK";
		$res['video_id'] = $video_id;
		$res['story_id'] = $story_id;
		}

				      if (!$video_id) {
                        @unlink($mainVideo);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
						
						// to notif
					//	if(!$is_post) $this->insertIntoFeed($picture_id,$this->id,'picture');
						
					}
				
				}
				
			}
		}
	}
	
if ($message) 
    echo json_encode($message);
 else
    echo json_encode($res);

	
	
	
	
}
public function delete_Story($story_id = false, $autoclean = false){
	
	
	  $this->id = $story_id ? $story_id : $this->id;
	  $clean = $autoclean ? '' : "and `userid`='{$this->userid}'";
	  $s_details = $this->db->query("Select * from ".tbl_stories." where `id`='{$this->id}' ".$clean." limit 1");
	  $s_details = $s_details->fetch_array(MYSQLI_ASSOC);
 
	  
	  
	  if(!$s_details['id']){
		  $err = 'not_found';
		  
	  } else if($s_details['id']){
		  
		  // delete pictures/videos
		  $story_files = $this->query_select("Select `id`,`type` from ".tbl_stories_files." where `story_id`='{$this->id}'");
		  
		  if(count($story_files)){
			  
			  foreach($story_files as $item):
				if($item['type'] == 'video') $this->deleteVideo($item['id'],1); else $this->deletePicture($item['id'],1);
			  endforeach;
			  
		  }
		  
		  // delete comments
		  $delete_comments = $this->query_delete("delete from ".tbl_comments." where `item_type`='story' and `itemid`='{$this->id}'");

		  // delete story
		  $delete_story = $this->query_delete("delete from ".tbl_stories." where `id`='{$this->id}'");
		  
		  if($delete_story){

			  	// delete views for respective story
				$this->query_delete("delete from ".tbl_stories_views." where `story_id`='{$this->id}'");
	
				// delete from notifications
				$this->query_delete("delete from ".tbl_notif." where `categ`='story' and `item`='{$this->id}'");
			  
			  $err = 'success';
			  
		  }
	  } else {
		  
		  $err = 'unknown';
		  
	  }
	 
	 
	if($autoclean) return $err == 'success' ? 1 : 0; else echo $err;
	
}
 private function unlinkStoriesFiles($author_id,$filename,$cover_id){
	 
    $dir = __ROOT__.__STORIES_FILES_DIR;

	
	
	
	
	if($cover_id ){
		
		
    $video       = $dir.'/'.$author_id .'/video/videos/';
    $cover       = $dir.'/'.$author_id .'/video/covers/';
		// delete large
		if(file_exists($video.$filename))
		 unlink($video.$filename);


		 
		// delete small
		if(file_exists($cover.$cover_id.'.jpg'))
		 unlink($cover.$cover_id.'.jpg');
		
	} else {
    $large       = $dir.'/'.$author_id .'/pictures/large/';
    $small       = $dir.'/'.$author_id .'/pictures/small/';
		// delete large
		if(file_exists($large.$filename))
		 unlink($large.$filename);


		 
		// delete small
		if(file_exists($small.$filename))
		 unlink($small.$filename);
		
	}
	
	
	
	


 

return true;
	 
 }
 
 public function deleteVideo($item_id = 0, $_return = false){
	 
$author_id = $this->USER['id'];

$q = $this->db->query("select `id`,`s3`,`userid`,`filename`,`type` from ".tbl_stories_files." where `id`='{$item_id}' limit 1");
$row = $q->fetch_array(MYSQLI_ASSOC);


$msg = 1;	

if(!isset($row['id'])){
	echo 0;exit;
}

$s3 = $row['s3'];
$userid = $row['userid'];
$filename = $row['filename'];	
 
	
if($author_id !== $userid || !$item_id)
$msg = 0;



$this->unlinkStoriesFiles($author_id,$filename,$item_id);





// delete from database
$delete = $this->query_delete("delete from ".tbl_stories_files." where `id`='{$item_id}'");

if($delete) $msg = 1;
 else 
	 $msg = 0;
 

 
 if($_return) return $msg; else echo $msg; 


 }
 
public function deletePicture($item_id = 0, $_return = false){
	 

$author_id = $this->USER['id'];

$q = $this->db->query("select `id`,`s3`,`userid`,`filename`,`type` from ".tbl_stories_files." where `id`='{$item_id}' limit 1");
$row = $q->fetch_array(MYSQLI_ASSOC);


$msg = 1;	

if(!isset($row['id'])){
	echo 0;exit;
}

$s3 = $row['s3'];
$userid = $row['userid'];
$filename = $row['filename'];	
$is_video = false;
	
if($author_id !== $userid || !$item_id)
$msg = 0;


 
$this->unlinkStoriesFiles($author_id,$filename,$is_video);


// delete from database
$delete = $this->query_delete("delete from ".tbl_stories_files." where `id`='{$item_id}'");

if($delete) $msg = 1;
 else 
	 $msg = 0;
 

 
 if($_return) return $msg; else echo $msg; 
 
 
}
  public function createVideoCover(){
	  $res = array();
	  $res['success'] = 0;
	$video_id = $this->id; 
 
    $dir = __ROOT__.__STORIES_FILES_DIR;
	$cover = $dir.'/'.$this->userid.'/video/covers/';
	$data = isset($_POST['cover']) ? $_POST['cover'] : '';
	$story_id = isset($_POST['story_id']) ? (int) $this->test_input($_POST['story_id']) : '';
	// remove "data:image/jpg;base64,"
	$uri =  substr($data, strpos($data, ",")+1); 	
	$data = base64_decode($uri);
	$imgRes = imagecreatefromstring($data);

	$filename = $video_id.'.jpg';
 
	$file_small =  $cover.$filename;

 
	list($CurWidth,$CurHeight)=getimagesizefromstring($data);

	 
    // small dir
    $small_size = cropImage($CurWidth,$CurHeight,
	$this->settings['STORIES_SMALL_IMAGES_SIZE'],
	$file_small,$imgRes,90,"image/jpg");
	

		if($story_id > 0 && $video_id > 0){
		
		$res['id'] = $story_id;
		$res['image_id'] = $video_id;
		$res['success'] = 1;
		$res['cover'] = $file_small;
		$res['story_obj'] = $this->getMyStoryObject($story_id);
		
		}
	
	


// return the filename
echo json_encode($res);	  
	  
  }
public function buildStory(){
	
	$res = array("success" => 0);
    $dir = __ROOT__.__STORIES_FILES_DIR;
    $large       = $dir.'/'.$this->userid.'/pictures/large/';
    $small       = $dir.'/'.$this->userid.'/pictures/small/';

	$image_url_done_large = $this->settings['HOST'].__STORIES_FILES_DIR.'/'.$this->userid.'/pictures/large/';
	$image_url_done_small = $this->settings['HOST'].__STORIES_FILES_DIR.'/'.$this->userid.'/pictures/small/';

    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

    // small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);
	
	
	
 
 
  
$data = isset($_POST['data']) ? $_POST['data'] : '';
	
// remove "data:image/jpg;base64,"
$uri =  substr($data, strpos($data, ",")+1); 	
	$data = base64_decode($uri);
	$imgRes = imagecreatefromstring($data);

	$filename = md5(uniqid()).'.jpg';
$file_large =  $large.$filename;
$file_small =  $small.$filename;

// success added large image
if( imagejpeg($imgRes,$file_large)) { 
	
	
	
	
	
	
	
	
	$fileSize = filesize($file_large);
 
	$CreatedImage = imagecreatefromjpeg($file_large);
 
	list($CurWidth,$CurHeight)=getimagesize($file_large);

	 
    // small dir
    $small_size = cropImage($CurWidth,$CurHeight,
	$this->settings['STORIES_SMALL_IMAGES_SIZE'],
	$file_small,$CreatedImage,90,"image/jpg");
	
	if($small_size){
		
	$time = $this->time;
	
	// check for current stories, if exist just update
	$story_exists = $this->db->query("Select id from ".tbl_stories." where `userid`='{$this->userid}' and `public`='yes' limit 1");
	$story_exists = $story_exists->fetch_array(MYSQLI_ASSOC);
	$story_exists_id = isset($story_exists['id']) ? $story_exists['id'] : false;
 
	
	if(!$story_exists_id){
	// add new story
	$story_id = $this->query_insert("insert into ".tbl_stories." set `added`='{$this->time}',`userid`='{$this->userid}',`public`='yes'");
	$this->notifFriends("added_new_story",$story_id);
	} else {
	$story_id = $story_exists_id;
	
	// update story
	$this->query_update("update ".tbl_stories." set `added`='{$this->time}' where `id`='{$story_id}'");
	
	// delete views for respective story
	$this->query_delete("delete from ".tbl_stories_views." where `story_id`='{$story_id}'");
	$this->notifFriends("updated_story",$story_id);
	
	}
	// add picture
	$picture_id = $this->query_insert("insert into ".tbl_stories_files." set `userid`='{$this->userid}',`filename` = '{$filename}', `added`='{$time}', `type`='image',`story_id`='{$story_id}'");

		
		if($story_id > 0 && $picture_id > 0){
		
		$res['id'] = $story_id;
		$res['image_id'] = $picture_id;
		$res['success'] = 1;
		$res['file_large'] = $file_large;
		$res['file_small'] = $file_small;
		$res['story_obj'] = $this->getMyStoryObject($story_id);
		
		}
	}
	
	
 
}

// return the filename
echo json_encode($res);
	
}


// view picture
public function viewPicture(){
	
		$image_id = $this->id;
		$size = isset($_GET['size']) ? $this->test_input($_GET['size']) : 'large';
 
		// check for video cover or image
		$q = $this->db->query("select `type`,`userid`,`filename` from ".tbl_stories_files." where `id`='{$image_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$type = isset($r['type']) ? $r['type'] : 'image';
		
		
		if($type == 'video') {
 
		$userid = $r['userid'];
		$dir = $this->settings['HOST'].__STORIES_FILES_DIR;
		$cover = $dir.'/'.$userid.'/video/covers/'.$image_id.'.jpg';
		$fn = $cover;
		} else {

		$file = $r['filename'];
		$userid = $r['userid'];
		$dir = $this->settings['HOST'].__STORIES_FILES_DIR;
		$large       = $dir.'/'.$userid.'/pictures/large/'.$file;
		$small       = $dir.'/'.$userid.'/pictures/small/'.$file;
		$fn = '';
		switch($size){
			
			case 'thumb':
			$fn = $small;
			break;
			
			case 'large':
			$fn = $large;
			break;
			
		}
		
		}
		
		header('Content-Type: image/jpeg');
	
		echo file_get_contents($fn);
	
}
public function getMyStory($uid = false){
	
	$this->userid = $uid ? $uid : $this->userid;
	$r = array("exist" => "no");
	
	// check for story
	$q = $this->db->query("select * from ".tbl_stories." where `userid`='{$this->userid}' limit 1");
	$y = $q->fetch_array(MYSQLI_ASSOC);
	
	if(isset($y['id'])){
		
		
		if($y['id'] > 0){
			
			$r['exist'] = 'yes';
			$r['time_ago'] = $this->time_elapsed($y['added'],true);
			$story_id = $y['id'];
			// select file of story
			$file = $this->db->query("select id from ".tbl_stories_files." where `story_id`='{$story_id}' order by added desc limit 1");
			$file_id = $file->fetch_array(MYSQLI_ASSOC);
			$file_id = $file_id['id'];
			$r['story_id'] = $story_id;
			$r['story_thumb_id'] = $file_id;
			
			
		}
		
	}
	return $r;
	
}
public function getMyStoryObject($id,$arr = false){
	$dir = $this->settings['HOST'].__STORIES_FILES_DIR;
	$obj = array();
//	$obj_items['files'] = $obj_items['author'] = array();
	
	// get the story
	$q = $this->db->query("select * from ".tbl_stories." where `id`='{$id}' limit 1");
	$s = $q->fetch_array(MYSQLI_ASSOC);
	
	// get files for story
	$q_files = $this->query_select("select * from ".tbl_stories_files." where `story_id`='{$id}' order by added desc");
	
	if(count($q_files)){
		
		// select data about author
		$author = $this->getUserDetails($s['userid']);
 
		foreach($q_files as $file) :
		$obj['files'][] = array( 
		"id" => $file['id'],
		"type" => $file['type'], 
		"time" => $file['added'], 
		"file_by" => $file['userid'], 
		
		"url" => $file['type'] == "image" ? "/stories?cmd=view-picture&id=".$file['id']."&size=large" : $dir.'/'.$author['id'].'/video/videos/'.$file['filename']
		    
 
		);
		endforeach;
		
		
		$obj['author']['name'] = $author['fullname'];
		$obj['author']['id'] = $author['id'];
		$obj['author']['link'] = "/user/".$author['id'];
		$obj['author']['avatar'] = "/getPhoto?p=".$author['profile_photo']."&sz=small&g=".$author['gender'];
		
		$obj['id'] = $s['id'];
		$obj['time'] = $s['added'];
		$obj['story_by_userid']  = $s['userid'];
	 
	}
	
	return $arr ? $obj : json_encode($obj);
}


public function getFriendsStories(){
	$obj = array();
	
	// get friends
		$q = $this->query_select("select DISTINCT COUNT(sv.id) views_order,s.id,s.added from ".tbl_users." u, ".tbl_friends." f, ".tbl_stories." s
		left join ".tbl_stories_views." sv ON sv.story_id != s.id and sv.userid = '{$this->userid}'
		where s.userid = f.friendid and u.id = f.friendid and f.status='confirmed' and f.userid='{$this->userid}' 
		group by s.id order by views_order desc,s.added desc limit 30
		");	
		
		if(count($q)){
			
			
			
			foreach($q as $r):
			
			$story_id = $r['id'];
			// select cover of story
			$file = $this->db->query("select id from ".tbl_stories_files." where `story_id`='{$story_id}' order by added desc limit 1");
			$file_id = $file->fetch_array(MYSQLI_ASSOC);
			$file_id = isset($file_id['id']) ? $file_id['id'] : 0;
			$time_ago = $this->time_elapsed($r['added'],true);
			
			
				$obj[] = array("obj" => $this->getMyStoryObject($story_id,1), "time_ago" => $time_ago, "cover" => $file_id);
			 
			endforeach;
			
			
			
			
		}
		
		return $obj;
	
}
public function addViews(){
	
	// add views
	if($this->id > 0){
		
		$check = $this->seen($this->id);
		
		if(!$check){
		$add = $this->query_insert("insert into ".tbl_stories_views." set `userid`='{$this->userid}',`story_id`='{$this->id}',`added`='{$this->time}'");
		} else {
		$update = $this->query_insert("update ".tbl_stories_views." set `added`='{$this->time}' where `story_id`='{$this->id}' and `userid`='{$this->userid}'");
		}
		
	}
	
	
}
// check for seen
public function seen($id,$uid = false){
	$this->userid = $uid ? $uid : $this->userid;
	return count($this->query_select("select id from ".tbl_stories_views." where `userid`='{$this->userid}' and `story_id`='{$id}'"));
}


public function getStoriesAjax(){
	
		$rightColumn = $this->theme_dir."/rightColumn/";
		$this->template->assign(["this" => $this, "stories" => $this->im_stories()]);
		echo $this->template->fetch($rightColumn.'stories-ajax.html');

	
}

public function getViews($limit = 6){
	$res = array('count' => 0);
	$query = $this->query_select("select SQL_CALC_FOUND_ROWS v.*,u.profile_photo as avatar, u.fullname, u.id as uid from ".tbl_stories_views." v
                                 left join".tbl_users." u ON u.id=v.userid
								 
								 where v.story_id='{$this->id}' and v.userid<>'{$this->userid}' group by v.id order by v.added desc limit ".$limit);
	if(count($query)){
			
	$count = $this->db->query("SELECT FOUND_ROWS() as c");
	$count = $count->fetch_array(MYSQLI_ASSOC);
	$count = $count['c'];
	
    // select story author 
    $author = $this->db->query("select userid from ".tbl_stories." where `id`='{$this->id}' limit 1");
	$author = $author->fetch_array(MYSQLI_ASSOC);
	$author = isset($author['userid']) ? $author['userid'] : 0;
	
		foreach($query as $u):
			
			$res['users'][] = array("user_name" => $u['fullname'],"user_avatar" => $u['avatar'], "user_id" => $u['uid']);
		
		endforeach;
		$res['count'] = $count;
		$res['author'] = $author;
	}
	
	echo json_encode($res);
	
}
public function getAllGuests($limit = 9999){
    $res = array('users' => array());
	$query = $this->query_select("select v.*,u.profile_photo as avatar, u.gender, u.username, TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) AS yearsold, u.location, u.fullname, u.id as uid from ".tbl_stories_views." v
                                 left join".tbl_users." u ON u.id=v.userid
								 
								 where v.story_id='{$this->id}' and v.userid<>'{$this->userid}' group by v.id order by v.added desc limit ".$limit);
	if(count($query)){
 
		foreach($query as $u):
			
			$res['users'][] = array("yearsold" => $u['yearsold'], "nick" => $u['username'], "gender" => $u['gender'], "user_location" => $u['location'], "name" => $u['fullname'],"photo" => $u['avatar'], "id" => $u['uid']);
		
		endforeach;
 
	}
	
	echo json_encode($res);
}

} // end class