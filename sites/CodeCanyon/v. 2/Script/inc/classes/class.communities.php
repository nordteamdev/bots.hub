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

require_once('class.community_wall.php');
 
class _COMMUNITIES extends _global_co {


public $userid;
public $time;
public $key;
public $id;
public $default_cover;
public $group_templates;

public function __construct($filter_function = false){

//the old building from parent class
parent::__construct();



//$this->photoid = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : '';
$this->userid = isset($this->USER['id']) ? $this->USER['id'] : 0;
$this->key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';
$this->id = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : (isset($_GET['id']) ? (int) $this->test_input($_GET['id']) : '');
$this->id = preg_replace('/[^0-9]/', '', $this->id);
$this->time = time();
$this->default_cover = $this->settings['GROUPS_DEFAULT_COVER'];
$this->group_templates = $this->theme_dir."/communities/";


$this->template->assign('this',$this);



}


// index
public function communities(){
	
	$sql = "select * from ".tbl_communities." order by created desc";
	
	$count = $this->db->query("select COUNT(*) from ".tbl_communities);	
	$count = $count->fetch_row();

	$page_url = '/communities?page=%s';
	$query = $this->pagination($this->settings['COMMUNITIES_LIMIT'],true,$page_url,$sql,$count[0]);


	$this->template->assign(['res' => $query[0],'key' => $this->key, "active" => 0,
	"pagination" => $query[1],
	'each_groups' => $this->theme_dir.'/communities/each-group.html',
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE,
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR]);
	$content = $this->template->fetch($this->theme_dir.'/communities/index.html');
	echo $this->getPage($content);
}


// community details
public function communityPage() {
	

	$query = $this->query_select("select * from ".tbl_communities." where `id`='{$this->id}' limit 1");
	
	// get albums
	$albums = $this->query_select("select SQL_CALC_FOUND_ROWS a.title,a.id,p.id as picid from ".tbl_communities_albums." a
		left join ".tbl_communities_pics." p ON p.albumid = a.id
	where a.group_id='{$this->id}' group by a.id having ( COUNT(p.id) > 0 ) order by a.added limit 2");
	
	$albums_count = $this->db->query("SELECT FOUND_ROWS() as c");
	$albums_count = $albums_count->fetch_array(MYSQLI_ASSOC);
	$albums_count = isarray($albums_count) ? $albums_count['c'] : 0;
	
	$this->template->assign([
	'res' => $query,
	'id' => $this->id, 
	'albums_q' => $albums,
	'albums_count' => $albums_count,
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE, 
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR,
	'group_default_cover' => $this->default_cover
	]);

	$content = $this->template->fetch($this->theme_dir.'/communities/group-details.html');
	echo $this->getPage($content);
	
}


public function privateCommunity($r){
	
	// private group
	$this->template->assign([
	'r' => $r,
	'id' => $this->id, 
	'subscribed' => $this->isSubscribed($this->id),
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE, 
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR,
	'group_default_cover' => $this->default_cover,
	'isadmin' => $this->checkAdmin($this->USER['id'],$r['admin'])
	]);
	$content = $this->template->fetch($this->theme_dir.'/communities/private-group.html');
	echo $this->getPage($content);
}


// popup for upload images
public function uploadImagePopup() {
	
	$single = isset($_POST['single']) ? $_POST['single'] : '';
	
	$this->template->assign([
	'id' => $this->id 
	]);
	$content = $this->template->fetch( $single != '' ? $this->theme_dir.'/communities/popup-add-logo-image.html' : $this->theme_dir.'/communities/popup-add-images.html');
	echo $this->getPage($content);
}

// check for admin
public function checkAdmin($userid,$list) {
	
	
	$list = strpos($list,',') ? explode(',',$list) : $list;
	
	if( isarray($list) ) {
	
		$r = in_array($userid,$list) ? 1 : 0;
	
	
	} else {
		
		
		$r = $userid == $list ? 1 : 0;
		
	}
	
	return $r;
	
}

// save status
public function saveStatus() {
	
	$status = isset($_POST['status']) ? $this->test_input($_POST['status']) : '';
	
	$msg = array();
	$upd = false;
	$msg['msg'] = 1;
	
	if( $this->isAdmin() )

	{
	$upd = $this->query_update("update ".tbl_communities." set `status`='{$status}' where `id`='{$this->id}'");
	
	}
	
	
	if(!$upd) $msg['msg'] = 0;
	else
		$msg['status'] = $this->str_smilies($status);
	
	
	echo json_encode($msg);
}


// new group, create popup
public function new_group_popup() {
	
	$content = $this->template->fetch($this->theme_dir.'/communities/new-popup.html');
	echo $this->getPage($content);
	
}

// search by communities
public function searchByCommunities() {
	
	$response = array();
	
	$query = $this->query_select("select * from ".tbl_communities." 
																	where `name` LIKE N'%{$this->key}%' 
																	OR `description` LIKE '%{$this->key}%' 
																	OR `category` LIKE '%{$this->key}%' order by `name` asc");
	
	
	$this->template->assign([
	'res' => $query, 
	'key' => $this->key,
	'highlight' => 1,
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE, 
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR]);
	$content = $this->template->fetch($this->theme_dir.'/communities/each-group.html');
	
	echo $this->getPage($content);
}

// upload community covers to local server
private function uploadCoverToLocal()
{
	

$act = isset($_POST['act']) ? $this->test_input($_POST['act']) : '';

$target_dir = __ROOT__.__COMMUNITIES_COVERS_DIR;

if(!file_exists($target_dir))
	mkdir($target_dir, 0777,true);

$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo(basename($_FILES["file"]["name"]),PATHINFO_EXTENSION);
$fileN = $_FILES["file"]["name"];
$temp = explode('.', $fileN);
$imageFileType = end($temp);

$newName = basename(mt_rand() . mt_rand() . '.' . $imageFileType);
$rename_file = $target_dir . $newName;


	$_msg = $this->communityBeforeUploadCover($_FILES["file"],$imageFileType);
	$msg = $_msg[1];
	$uploadOk = $_msg[0];
	$msg['file'] = '';
	
	
if ($uploadOk == 0) {
    $msg['msg'] = "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $rename_file)) {
        $msg['msg'] = "OK";
		$msg['file'] = $this->settings['HOST'].'/'.__COMMUNITIES_COVERS_DIR.$newName;
		$msg['clean_cover_url'] = $newName;
		$msg['s3'] = 'no';
		
		if($act) {$this->query_update("update ".tbl_communities." set `cover`='{$newName}' where `id`='{$this->id}'");$msg['close_p'] = 1;}
		
		
    } else {
       $msg['msg'] = "Sorry, there was an error uploading your file.";
    }
}

echo json_encode($msg);
	
	
}
private function communityBeforeUploadCover($file,$filetype){
	$msg = array();
	
	$uploadOk = 1;
	
	
	// Check if image file is a actual image or fake image
		$check = getimagesize($file["tmp_name"]);
		if($check !== false) {
			$msg['msg'] = "File is an image - " . $check["mime"] . ".";
			$uploadOk = 1;
		} else {
			$msg['msg'] = "File is not an image.";
			$uploadOk = 0;
		}

		// Check file size
	if ($file["size"] > $this->settings['MAX_FILE_UPLOAD']*1048576) {
		$msg = "Sorry, your file is too large.";
		$uploadOk = 0;
	}
		
		
		
	// Allow certain file formats
	if( ! in_array($filetype, $this->settings['VALID_FORMATS']) ) {
		$msg['msg'] = "Sorry, only image files are allowed.";
		$uploadOk = 0;
	}
	
	return [$uploadOk,$msg];
	
}

private function uploadCoverToS3(){
	
	$bucket = '';
	
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_COMMUNITIES_COVERS_BUCKET'];
	
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	 
	 
	$success = false;
	
	
	$act = isset($_POST['act']) ? $this->test_input($_POST['act']) : '';


	$uploadOk = 1;
	$imageFileType = pathinfo(basename($_FILES["file"]["name"]),PATHINFO_EXTENSION);
	$fileN = $_FILES["file"]["name"];
	$temp = explode('.', $fileN);
	$imageFileType = end($temp);

	$newName = basename(mt_rand() . mt_rand() . '.' . $imageFileType);


	$fileTempName = $_FILES['file']['tmp_name'];
	
	$_msg = $this->communityBeforeUploadCover($_FILES["file"],$imageFileType);
	$msg = $_msg[1];
	$uploadOk = $_msg[0];
	$msg['file'] = '';
	

	if ($uploadOk == 0) {
    $msg['msg'] = "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
	
	    foreach($buckets as $bucket):
		
		$folderName = 'communities/covers/';  // path on s3 bucket.
					if($this->s3->putObjectFile($fileTempName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
			 
						
						$s3_link = '//'.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/communities/covers/'.$newName;
						$msg['msg'] = "OK";
						$msg['file'] = $s3_link;
						$msg['clean_cover_url'] = $newName;
						$msg['s3'] = 'yes';
						
						if($act) {$this->query_update("update ".tbl_communities." set `cover`='{$s3_link}' where `id`='{$this->id}'");$msg['close_p'] = 1;}
						
						
						
					} else {
							$msg['msg'] = "Sorry, there was an error uploading your file.";
					}
					
		endforeach;
}

	echo json_encode($msg);
	
}

// upload cover
public function addcover(){
	
	
	
	if($this->settings['AMAZON_S3_ENABLED'])
		$this->uploadCoverToS3();
	else
		$this->uploadCoverToLocal();
	
	
	
	
}

public function communityPicturesWall($clubid,$albumid, $page = 0){
	


	// for manually call
	$limit_st = $this->settings['COMMUNITIES_ALBUM_ITEMS_LIMIT']; // from settings
	$start = ($page * $limit_st) - $limit_st;
	$limit = $page ? "limit {$start},{$limit_st}" : "limit ".$limit_st;
	
	
	$sql = "select * from ".tbl_communities_pics." where `group_id`='{$clubid}' and `albumid`='{$albumid}' order by id desc ".$limit;
	
	$q = $this->query_select($sql);

	return $q;
	
}

public function getCommunityAlbumsPicturesCount($clubid,$album){
	
	
$q = $this->db->query("select COUNT(*) from ".tbl_communities_pics." where `group_id`='{$clubid}' and `albumid`='{$album}'");
$q = $q->fetch_row();
 
return $q[0];
}
public function communityVideosWall($clubid,$page = 0){
	

	// for manually call
	$limit_st = $this->settings['COMMUNITIES_ALBUM_ITEMS_LIMIT']; // from settings
	$start = ($page * $limit_st) - $limit_st;
	$limit = $page ? "limit {$start},{$limit_st}" : "limit ".$limit_st;
	
	
	$sql = "select * from ".tbl_communities_pics." where `group_id`='{$clubid}' and `type`<>'jpg' and `type`<>'png' and `type`<>'gif' order by id desc ".$limit;
	
	$q = $this->query_select($sql);

	return $q;
	
}
public function getCommunityAlbumsVideosCount($clubid){
	
	
$q = $this->db->query("select COUNT(*) from ".tbl_communities_pics." where `group_id`='{$clubid}' and `type`<>'jpg' and `type`<>'png' and `type`<>'gif'");
$q = $q->fetch_row();
 
return $q[0];
}
public function getCommunityAlbumCover($clubid,$album){
	
	
		
	$sql = "select id from ".tbl_communities_pics." where `group_id`='{$clubid}' and `file`='picture' and `albumid`='{$album}' order by id desc limit 1";
	
	$q = $this->db->query($sql);
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	echo '/clubpicture?i='.$r['id'].'&size=medium&clubid='.$clubid.'&v'.$this->time;
	
}

public function albums(){
	
	$query = $this->query_select("select * from ".tbl_communities." where `id`='{$this->id}' limit 1");
	
	$this->template->assign([
	'res' => $query,
	'id' => $this->id, 
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE, 
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR,
	'group_default_cover' => $this->default_cover
	]);
	$content = $this->template->fetch($this->theme_dir.'/communities/albums.html');
	echo $this->getPage($content);
}


public function albumDetails(){
	


	

	$albumid = isset($_GET['albumid']) ? $this->test_input($_GET['albumid']) : '';
	
	$query = $this->query_select("select * from ".tbl_communities." where `id`='{$this->id}' limit 1");
	
	if($albumid >= 1) {
		
		$album_title_q = $this->db->query("select title from ".tbl_communities_albums." where `id`='{$albumid}' limit 1");
		$album_title_r = $album_title_q->fetch_array(MYSQLI_ASSOC);
		
	}
	
	$album_title = $albumid <= 0 ? $this->lang['Community_Main_album'] : $album_title_r['title'];
	
	$this->template->assign([
	'res' => $query,
	'id' => $this->id, 
	'albumid' => $albumid,
	'album_title' => $album_title,
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE, 
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR,
	'group_default_cover' => $this->default_cover
	]);
	
	$content = $this->template->fetch($this->theme_dir.'/communities/album-details.html');
	echo $this->getPage($content);
}


public function albumGetMoreItems(){
	


	$a = array();

	$albumid = isset($_POST['albumid']) ? $this->test_input($_POST['albumid']) : '';
	$page = isset($_POST['page']) ? $this->test_input($_POST['page']) : '';
	
	$query = $this->query_select("select * from ".tbl_communities." where `id`='{$this->id}' limit 1");
	
	foreach($query as $a):
	$r = $a;
	endforeach;

	
	$this->template->assign([
	'r' => $a,
	'id' => $this->id, 
	'albumid' => $albumid,
	'page' => $page+1,
	'pictures_count' => false,
	'isadmin' => $this->checkAdmin($this->userid,$a['admin'])

	]);
	
	$content = $this->template->fetch($this->theme_dir.'/communities/album-items.html');
	echo $this->getPage($content);
}
public function albumGetMoreVideos(){
	


	$a = array();

	$albumid = isset($_POST['albumid']) ? $this->test_input($_POST['albumid']) : '';
	$page = isset($_POST['page']) ? $this->test_input($_POST['page']) : '';
	
	$query = $this->query_select("select * from ".tbl_communities." where `id`='{$this->id}' limit 1");
	
	foreach($query as $a):
	$r = $a;
	endforeach;

	
	$this->template->assign([
	'r' => $a,
	'id' => $this->id, 
	'albumid' => 'videos',
	'page' => $page+1,
	'videos_count' => false,
	'isadmin' => $this->checkAdmin($this->userid,$a['admin'])

	]);
	
	$content = $this->template->fetch($this->theme_dir.'/communities/album-items-filter-videos.html');
	echo $this->getPage($content);
}
public function createAlbum(){
	
	$r = array();
	$r['msg'] = 0;
	
	if(!$this->isAdmin()) {echo json_encode($r);die;}
	
	$title = isset($_POST['title']) ? $this->test_input($_POST['title']) : '';

	if(!empty($title)){
		$add_album = $this->query_insert("insert into ".tbl_communities_albums." set `title`='{$title}',`group_id`='{$this->id}',`added`='{$this->time}',`author`='{$this->userid}'");
		if($add_album)
			{$r['msg'] = 1;$r['albumid'] = $add_album;}
		
	}
	echo json_encode($r);
	
}

public function updateCommAlbum(){
	
	$r = array();
	$r['msg'] = 0;
	$r['deleted'] = 0;
	
	if(!$this->isAdmin()) {$r['m_status'] = 'You don\'t have permission to do this.';echo json_encode($r);die;}
	
	$title = isset($_POST['title']) ? $this->test_input($_POST['title']) : '';
	$delete_album = isset($_POST['del_album']) ? $this->test_input($_POST['del_album']) : '';
	$albumid = isset($_POST['albumid']) ? (int) $this->test_input($_POST['albumid']) : '0';

	if($delete_album == 'true') {
		
		// select all files from album
		$all_alb_files = $this->query_select("select * from ".tbl_communities_pics." where `albumid`='{$albumid}'");
		
		if(count($all_alb_files)){
			
			foreach($all_alb_files as $file):
			
				if($file['file'] == 'video'){
					$this->deleteVideo ($file['userid'], $file['id'], $file['filename'], $file['vd_external']);
				} else {
					$this->deletePicture($file['userid'], $file['id'], $file['filename']);
				}
			
			endforeach;
			
		}
		
		$delete_album_q = $this->query_delete("delete from ".tbl_communities_albums." where `id`='{$albumid}'");
		
		if($delete_album_q){
			
			$r['msg'] = 1;
			$r['albumid'] = $albumid;
			$r['clubid'] = $this->id;
			$r['deleted'] = 1;
			echo json_encode($r);
			
		} else {
			
			$r['msg'] = 0; $r['m_status'] = $this->lang['err_tehnical'];
			echo json_encode($r);
			
		}
		
		die;
	}
	
	
	if(!empty($title)){
		$update_album = $this->query_update("update ".tbl_communities_albums." set `title`='{$title}' where `id`='{$albumid}'");
		if($update_album){
			
			{$r['msg'] = 1;$r['albumid'] = $albumid;$r['clubid'] = $this->id;}
		}
		
	}
	echo json_encode($r);
	
}
public function itemAuthor($author){
	
	return $this->userid == $author;
	
}
public function saveFileInfo(){
	
	$info = isset($_POST['info']) ? $this->test_input($_POST['info']) : '';
	$file_id = isset($_POST['file_id']) ? (int) $this->test_input($_POST['file_id']) : '';

	// check author 
	$c = count($this->query_select("Select id from ".tbl_communities_pics." where `id`='{$file_id}' and `userid`='{$this->userid}' limit 1"));
	

	if(!$this->isAdmin() || !$c) {echo 0;die;}

	$r = 0;
	
	if($info && $file_id){
		
		if($this->query_update("update ".tbl_communities_pics." set `info`='{$info}' where `id`='{$file_id}'"))
			$r = 1;
		
		
	}
	echo $r;
	
}
public function shareCommunity(){
	
	$r = 1;
	$to = isset($_POST['to']) ? $_POST['to'] : '';
	
	if(carray($to)){
		
		
		
		foreach($to as $user_fullname):
		
		$q = $this->db->query("select id from ".tbl_users." where `fullname`='{$user_fullname}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$uid = $r['id'];
		
		$this->toNotif($uid,'community',$this->id,'invitation',$this->userid,true);
		endforeach;
		$r = 1;
		
	} else $r = 0;
 

 echo $r;
	
}
public function albumVideos(){
	
	
	$query = $this->query_select("select * from ".tbl_communities." where `id`='{$this->id}' limit 1");
	

	$this->template->assign([
	'res' => $query,
	'id' => $this->id, 
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE, 
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR,
	'group_default_cover' => $this->default_cover
	]);
	
	$content = $this->template->fetch($this->theme_dir.'/communities/album-videos.html');
	echo $this->getPage($content);
	
	
}


public function communityAlbums($clubid,$c = false){
	
	$q = $this->query_select("select * from ".tbl_communities_albums." where `group_id`='{$clubid}' order by added desc");
	return $c ? count($q) : $this->query_select("select * from ".tbl_communities_albums." where `group_id`='{$clubid}' order by added desc");
	
}
public function getGroupAlbumsCount($group_id){
	
	$q = $this->db->query("select COUNT(*) as c from ".tbl_communities_albums." where `group_id`='{$group_id}'");
	$c = $q->fetch_row();	
	return $c[0]+1;
	 
	
}
public function headerMenu($page,$id){
	
	$q = $this->db->query("select name from ".tbl_communities." where `id`='{$id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	// add value to global id
	$this->id = $id;
	

	$this->template->assign([
	'page' => $page,
	'isAdmin' => $this->isAdmin(),
	'group_name' => $r['name'],
	'group_id' => $id
	
	]);
	
	$this->template->display($this->theme_dir.'/communities/header.html');
}

public function buildPostBox($id) {
	
	$this->template->assign([
	'id' => $id
	]);
	
	$this->template->display($this->theme_dir.'/communities/add-post.html');
	
}


// get followers
public function getCommunityFollowers($group_id,$limit = 6,$count = false) {
	
	
	$sql = "select u.fullname,u.id,u.name,u.profile_photo from ".tbl_users." u,".tbl_communities_followers." f
	
	where u.id = f.userid and f.group_id = '{$group_id}' group by f.userid order by RAND() desc limit ".$limit."
	
	";
	
	return $count ? $this->getCommunityFollowersC($group_id) : $this->query_select($sql);
	
}
public function getCommunityFollowersC($group_id) {
	
	$q = $this->db->query("select COUNT(*) from ".tbl_communities_followers." where group_id = '{$group_id}'");
			
		$c = $q->fetch_row();
		$c = $c[0];
	return $c;
	
}

public function albumEdit(){
	
	if(!$this->isAdmin()) {echo 'You don\'t have authorize to view this';die;}
	
	$albumid = isset($_POST['albumid']) ? $this->test_input($_POST['albumid']) : '';
	
	$q = $this->query_select("select * from ".tbl_communities_albums." where `id`='{$albumid}' limit 1");
	
	$this->template->assign([
	'q' => $q,
	'clubid' => $this->id
	]);
	
	$this->template->display($this->theme_dir.'/communities/album-edit.html');
	
}

public function communityFollowers() {
	
	$this->template->assign([
	'res' => $this->getCommunityFollowers($this->id,999)
	]);
	$content = $this->template->fetch($this->theme_dir.'/communities/popup-followers.html');
	
	echo $this->getPage($content);
}
public function communityAddAdmin() {
	
	$this->template->assign([
	'clubid' => $this->id,
	'isadmin' => $this->isAdmin(),
	'res' => $this->getCommunityFollowers($this->id,9999)
	]);
	$content = $this->template->fetch($this->theme_dir.'/communities/popup-add-admin.html');
	
	echo $this->getPage($content);
}

// manage administrators
public function communityManageAdminstrators($ac){
	
	$admin_id = isset($_POST['admin_id']) ? $this->test_input($_POST['admin_id']) : '';
	
	$r = 0;
	
	if( !$this->isAdmin() || $this->USER['id'] === $admin_id ) { echo $r; die; }
	
	// get admin list
	$q = $this->db->query("select admin from ".tbl_communities." where `id`='{$this->id}' limit 1");
	$q = $q->fetch_array(MYSQLI_ASSOC);
	$list = $q['admin'];
	
	$list_b = strpos($list,',') ? explode(',',$list) : $list;
	$is_list = isarray($list_b) ? 1 : 0;

	
	switch($ac) {
		
		case 'remove':
		if(!strpos($list,$admin_id)){ echo $r; die;}
		 
		$update = $this->query_update("update ".tbl_communities." SET admin = TRIM(BOTH ',' FROM
      REPLACE(
        REPLACE(CONCAT(',',REPLACE(admin, ',', ',,'), ','),',{$admin_id},', ''), ',,', ',')
    ) where `id`='{$this->id}'");
	
		$this->toNotif($admin_id,'community',$this->id,'removed_from_admin',$this->userid,true);
		 
		if($update) $r = 1;
		
		break;
		
		case 'add':
		
		if(strpos($list,$admin_id)){ echo $r; die;}
		
		$list = $list.','.$admin_id;
		$update = $this->query_update("update ".tbl_communities." SET admin ='{$list}' where `id`='{$this->id}'");
		$this->toNotif($admin_id,'community',$this->id,'added_to_admin',$this->userid,true);
		if($update) $r = 1;
		break;
		
	}
	
	echo $r;
}

// upload pictures to S3
public function communityUploadPicturesToS3() {
	
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_COMMUNITIES_PICTURES_BUCKETS'];
	
 
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	
		$max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
		$uploadOk = 1;

		$message = array();
		$count   = 0;
		$albid = isset($_POST['albumid']) && (int)$_POST['albumid'] > 0 ? $this->test_input($_POST['albumid']) : '0';
		$is_post = isset($_POST['is_post']) ? $this->test_input($_POST['is_post']) : '';
	
	
	
	$s3_dir = __ROOT__.'/stcmd/s3-communities-pictures/';
	$s3_dir_large = $s3_dir.'/'.strtoupper(AWS_S3_BUCKET_NAME).'LARGE/';
	$success = false;
		
		
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
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VALID_FORMATS'])) {
                $message[] = "$name is not a valid format, only " . $this->settings['VALID_FORMATS'][1];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
                $newName = basename($this->id.'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
				$mainImage = $s3_dir_large . $newName;
			    $fileTempName = $_FILES['files']['tmp_name'][$f];
				$r = 0;
		
				if (move_uploaded_file($fileTempName, $mainImage)) {
 
				$count++; // Number of successfully uploaded files
				
			foreach($buckets as $bucket):
		
		
				    // generate dir  
					$s3_b_dir = $s3_dir.strtoupper(AWS_S3_BUCKET_NAME.$bucket).'/';
		
		if (!file_exists($s3_b_dir))
					mkdir($s3_b_dir, 0777, true);
				
				
				if ( strstr($bucket, "medium") !== false ) {
					
						$r_image =	smart_resize_image($mainImage, 
                                       null,
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       true,
                                       $s3_b_dir.$newName,
                                       FALSE ); 
									   

				 
					}else if( strstr($bucket, "small") !== false){
	 
									
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
					
					
					list($CurWidth,$CurHeight) = getimagesize($mainImage);
					
					
					
					    $r_image = cropImage($CurWidth,$CurHeight,
												$this->settings['GROUPS_SMALL_IMAGES_SIZE'],
												$s3_b_dir.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
																
			
									   

					}
 
					
					$folderName = 'communities/images/'.$bucket.'/'.$this->id.'/';  // path on s3 bucket.
					
		 
				    //move the file
					if($this->s3->putObjectFile($s3_b_dir.$newName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
					$r = 1;
				 
					// delete images from localhost
					 if ( strstr($bucket, "large") === false) unlink($s3_b_dir.$newName);
					}
				
				
				if ($r) {
					 
					$success = true;
				}else{
					$message[] = "Something went wrong while uploading your file... sorry.";
				}
				
				
				endforeach;
				// delete main image from server
				if( $success ) unlink($mainImage);

 
				if($success):
					
					$photoId = $this->query_insert("insert into ".tbl_communities_pics." set `s3`='yes',`userid`='{$this->userid}',`filename` = '{$newName}', `added`='{$this->time}',
													`size`='{$fileSize}', `type`='{$fileExt}',`group_id`='{$this->id}', `albumid`='{$albid}'");
					
					
				if (!$photoId) {
                     
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
						
						// add to feed
						if(!$is_post) $this->insertIntoFeed($photoId,$this->id,'picture');
						
					}
					
					
					
					
					
				endif;
				
				
				
				}
		
		
		
		
		}
		}
		
	endforeach;
	
	
if ($message) 
    echo json_encode($message);
 else
    echo json_encode(array("status" => "OK", 
"clubid" => $this->id, 
"photoid" => $photoId, 
"filename" => $newName, 
"userid" => $this->userid, 
"added" => $this->time, 
"size" => $fileSize, 
"extension" => $fileExt, 
"albumid" => $albid));
	
	
}

// upload pictures
public function communityUploadPictures(){
	
	
	$max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.__COMMUNITIES_IMAGES_DIR;
    $large       = $dir.'/large/'.$this->id.'/';
    $medium      = $dir.'/medium/'.$this->id.'/';
    $small       = $dir.'/small/'.$this->id.'/'; 

	$image_url_done_large = $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/large/'.$this->id.'/';
	$image_url_done_small = $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/';

    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

    // medium dir
    if(!file_exists($medium))
    mkdir($medium, 0777, true);

    // small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);


$uploadOk = 1;

$message = array();
$count   = 0;
$albid = isset($_POST['albumid']) && (int)$_POST['albumid'] > 0 ? $this->test_input($_POST['albumid']) : '0';
$is_post = isset($_POST['is_post']) ? $this->test_input($_POST['is_post']) : '';

	//if(!$this->isAdmin()) {$uploadOk = 0; $msg['msg'] = 'You dont have permission to do that.';}
	
	
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
                $newName = basename($this->id.'_'.mt_rand().mt_rand().mt_rand() . '.' . $fileExt);
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
	$this->settings['GROUPS_SMALL_IMAGES_SIZE'],
	$small.$newName,$CreatedImage,90,$_FILES['files']['type'][$f]);
  
		
    // medium dir
    $medium_size = smart_resize_image($mainImage, 
                                       null,
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       true,
                                       $medium.$newName,
                                       FALSE ); 
									   
									   
									   
									   
	$photoId = $this->query_insert("insert into ".tbl_communities_pics." set `userid`='{$this->userid}',`filename` = '{$newName}', `added`='{$this->time}',
	`size`='{$fileSize}', `type`='{$fileExt}',`group_id`='{$this->id}', `albumid`='{$albid}'");
				
				

				      if (!$photoId) {
                        @unlink($mainImage);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
						
						// add to feed
						if(!$is_post) $this->insertIntoFeed($photoId,$this->id,'picture');
						
					}
				
				}
				
			}
		}
	}
	
if ($message) 
    echo json_encode($message);
 else
    echo json_encode(array("status" => "OK", 
"clubid" => $this->id, 
"photoid" => $photoId, 
"filename" => $newName, 
"userid" => $this->userid, 
"added" => $this->time, 
"size" => $fileSize, 
"extension" => $fileExt, 
"albumid" => $albid));



}

// delete picture
public function deletePicture($userid = false, $picture_id = false, $filename = false) {
	
$userid = $userid ? $userid : (isset($_GET['userid']) ? (int) $this->test_input($_GET['userid']) : 0);
$picture_id = $picture_id ? $picture_id : (isset($_GET['picid']) ? (int) $this->test_input($_GET['picid']) : 0);
$filename = $filename ? $filename : (isset($_GET['filename']) ? $this->test_input($_GET['filename']) : 0);


// check for s3
$xbz = $this->db->query("select `s3`,`group_id` from ".tbl_communities_pics." where `id`='{$picture_id}' limit 1");
$xbz = $xbz->fetch_array(MYSQLI_ASSOC);
$s3 = $xbz['s3'];
$group_id = $xbz['group_id'];
$msg = 1;	
	
if($this->USER['id'] !== $userid || !$picture_id)
$msg = 0;


if( $s3 == 'no'){
    $dir = __ROOT__.__COMMUNITIES_IMAGES_DIR;
    $large       = $dir.'/large/'.$this->id.'/';
    $medium      = $dir.'/medium/'.$this->id.'/';
    $small       = $dir.'/small/'.$this->id.'/'; 

// delete large
if(file_exists($large.$filename))
 unlink($large.$filename);

// delete medium
if(file_exists($medium.$filename))
 unlink($medium.$filename);

// delete small
if(file_exists($small.$filename))
 unlink($small.$filename);


// delete from database
$delete = $this->query_delete("delete from ".tbl_communities_pics." where `id`='{$picture_id}'");

if($delete) {
	
    // delete video from feed
	$this->deleteItemFromFeed($picture_id,$group_id,'picture');
	$msg = 1;
	
	
	}
 else 
	 $msg = 0;
}
 else if ($s3 == 'yes'){
	 

foreach($this->settings['AMAZON_S3_COMMUNITIES_PICTURES_BUCKETS'] as $_bucket):
          
						
									// Delete objects from a bucket
							 
								$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/communities/images/'.$_bucket.'/'.$this->id, $filename);
												   endforeach;
	 
// delete from database
$delete = $this->query_delete("delete from ".tbl_communities_pics." where `id`='{$picture_id}'");

if($delete) $msg = 1;
 else 
	 $msg = 0;
	 
 }
 
 echo $msg;

	
}

// delete video
public function deleteVideo ($userid = false, $video_id = false, $filename = false, $extern = false) {
	
$userid = $userid ? $userid : (isset($_POST['userid']) ? (int) $this->test_input($_POST['userid']) : 0);
$video_id = $video_id ? $video_id : (isset($_POST['videoid']) ? (int) $this->test_input($_POST['videoid']) : 0);
$filename = $filename ? $filename : (isset($_POST['filename']) ? $this->test_input($_POST['filename']) : 0);
$extern = $extern ? $extern : (isset($_POST['extern']) ? 1 : 0);
	
$msg = 1;	
	
if($this->userid !== $userid || !$video_id){
$msg = array();
$msg['s'] = 0;
}


// check for s3
$xbe = $this->db->query("select `s3`,`group_id` from ".tbl_communities_pics." where `id`='{$video_id}' limit 1");
$xbe = $xbe->fetch_array(MYSQLI_ASSOC);
$s3 = $xbe['s3'];
$group_id = $xbe['group_id'];

	
	
	if($s3 == 'yes'){
		
	if(!$extern){

          
						
								// Delete objects from a bucket
								$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/communities/videos/'.$this->id, $filename);
											
		
		
		
								// delete cover
								$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/communities/videos/'.$this->id.'/covers', $video_id.'.png');
												   
												   
	}
	
	
// delete from database
$delete = $this->query_delete("delete from ".tbl_communities_pics." where `id`='{$video_id}' and `file`='video'");

if($delete) $msg['s'] = 1;
 else 
	 $msg['s'] = 0;
		
	}else if ($s3 == 'no'){
    $dir = __ROOT__.__COMMUNITIES_VIDEOS_DIR;
    $file_mp4         = $dir.$this->id.'/'.$filename;
	$video_cover = $dir.$this->id.'/covers/'.$video_id.'.png';


// delete video
if(!$extern && file_exists($file_mp4))
 @unlink($file_mp4);

// delete cover
if(file_exists($video_cover))
 @unlink($video_cover);

// delete from database
$delete = $this->query_delete("delete from ".tbl_communities_pics." where `id`='{$video_id}' and `file`='video'");

if($delete) {
	
	// delete video from feed
	$this->deleteItemFromFeed($video_id,$group_id,'video');
	
	
	$msg['s'] = 1;
	
	}
 else 
	 $msg['s'] = 0;
 
} 
 
 echo json_encode($msg);
	
}
public function deleteItemFromFeed($itemid,$clubid,$type){
	
   $sql = "update ".tbl_feed." SET `itemid`= TRIM(BOTH ',' FROM REPLACE(REPLACE(itemid, '{$itemid}', ''), ',,', ','))  where FIND_IN_SET({$itemid}, itemid) AND `categ`='{$type}' and `parent_id`='{$clubid}' and `community`='yes'";
   $this->query_update($sql);
   
   $this->query_delete("delete from ".tbl_feed." where `itemid`='' and `community`='yes'");
   
}
// upload videos to s3
public function communityUploadVideosToS3() {
	
	
	
$albid = isset($_POST['albumid']) && (int)$_POST['albumid'] > 0 ? $this->test_input($_POST['albumid']) : '0';
$is_post = isset($_POST['is_post']) ? $this->test_input($_POST['is_post']) : '';
//define variables
$count   = 0;
$fileSize = '';
$message = array();
	
	$success = false;
	
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_COMMUNITIES_VIDEO_BUCKET'];
	$bucket = '';
	
	
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	
    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > 1048576 * $this->settings['VD_MAX_FILE_UPLOAD']) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VD_VALID_FORMATS'])) {
                $message[] = $this->lang['video_invalid_format'];
                continue; // Skip invalid file formats
                
            } else {
				
				
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
				$nFN = basename($this->id.'_'.mt_rand().mt_rand().mt_rand());
                $newName = basename($nFN . '.' . $fileExt);
				 
				
				
				$fileTempName = $_FILES['files']['tmp_name'][$f];
				$folderName = 'communities/videos/'.$this->id.'/'; // path on s3 bucket.
				$htps = HTTPS_ON ? 'https://' : 'http://';
				$nFN = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/'.$folderName.$newName;
				
				
				foreach($buckets as $bucket):
 
                // No error found! Move uploaded files 
                if($this->s3->putObjectFile($fileTempName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
                    $count++; // Number of successfully uploaded files
 
						$s3_video_url = $nFN;
 

							$getID3 = new getID3;
										$meta_dt = $getID3->analyze($fileTempName);
						 
										$video_dur = isset($meta_dt['playtime_string']) ? $meta_dt['playtime_string'] : '--:--';
											
										$fileSize = isset($meta_dt['filesize']) ? $meta_dt['filesize'] : rand();

                    $name_m   = $_FILES["files"]["name"][$f];
					$nm = @str_replace(".".$fileExt, "", $name_m);


						$videoId = $this->query_insert("insert into ".tbl_communities_pics." set 	`s3`='yes',
																									`userid`='{$this->userid}',
																									`vd_name`='{$nm}',
																									`filename` = '{$newName}',
																									`added`='{$this->time}',
																									`size`='{$fileSize}',
																									`type`='{$fileExt}',
																									`group_id`='{$this->id}',
																									`vd_duration`='{$video_dur}',
																									`albumid`='{$albid}',
																									`file`='video'
							");

                    if (!$videoId) {
                        
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
						
						// add to feed
						if(!$is_post) $this->insertIntoFeed($videoId,$this->id,'video');
						
					}
                    
                    
                }
				endforeach;
            }
        }
    }
	
	
	
if ($message) 
    echo json_encode($message);
 else
    echo json_encode(array("status" => "OK", "title" => $nm,
"vd_dur" => $video_dur,
"src" => $nFN,
"videoid" => $videoId,
 "filename" => $newName,
 "userid" => $this->userid,
 "added" => $this->time,
 "size" => $fileSize,
 "extension" => $fileExt,
 "albumid" => $albid));
	
	
}


// upload videos
public function communityUploadVideos() {
	
$albid = isset($_POST['albumid']) && (int)$_POST['albumid'] > 0 ? $this->test_input($_POST['albumid']) : '0';
$is_post = isset($_POST['is_post']) ? $this->test_input($_POST['is_post']) : '';
//define variables
$count   = 0;
$message = array();

 
    $max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.__COMMUNITIES_VIDEOS_DIR.$this->id.'/';
    $videos_dir       = $dir;
    $send_dir = __COMMUNITIES_VIDEOS_DIR.$this->id.'/';
	
    // generate dir by group id
    if (!file_exists($dir))
    @mkdir($dir, 0777, true);


    // Loop $_FILES to execute all files
    foreach ($_FILES['files']['name'] as $f => $name) {
        if ($_FILES['files']['error'][$f] == 4) {
            continue; // Skip file if any error found
        }
        if ($_FILES['files']['error'][$f] == 0) {
            if ($_FILES['files']['size'][$f] > 1048576 * $this->settings['VD_MAX_FILE_UPLOAD']) {
                $message[] = "$name is too large!.";
                continue; // Skip large files
            } elseif (!in_array(pathinfo(strtolower($name), PATHINFO_EXTENSION), $this->settings['VD_VALID_FORMATS'])) {
                $message[] = $this->lang['video_invalid_format'];
                continue; // Skip invalid file formats
                
            } else {
                $fileN = $_FILES['files']['name'][$f];
                $temp    = explode('.', $fileN);
				$fileExt = end($temp);
				$nFN = basename($this->id.'_'.mt_rand().mt_rand().mt_rand());
                $newName = basename($nFN . '.' . $fileExt);
				$mainvideo = $videos_dir . $newName;
				
                // No error found! Move uploaded files 
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$f], $mainvideo)) {
                    $count++; // Number of successfully uploaded files

				$getID3 = new getID3;
				$meta_dt = $getID3->analyze($mainvideo);
				$video_dur = isset($meta_dt['playtime_string']) ? $meta_dt['playtime_string'] : '--:--';
			    $fileSize = isset($meta_dt['filesize']) ? $meta_dt['filesize'] : rand();



                    $name_m   = $_FILES["files"]["name"][$f];
					$nm = @str_replace(".".$fileExt, "", $name_m);


						$videoId = $this->query_insert("insert into ".tbl_communities_pics." set 
																									`userid`='{$this->userid}',
																									`vd_name`='{$nm}',
																									`filename` = '{$nFN}',
																									`added`='{$this->time}',
																									`size`='{$fileSize}',
																									`type`='{$fileExt}',
																									`group_id`='{$this->id}',
																									`vd_duration`='{$video_dur}',
																									`albumid`='{$albid}',
																									`file`='video'
							");

                    if (!$videoId) {
                        @unlink($mainvideo);
                        $message[] = "Error! [ Connect to database ], the file have been deleted, please try again.";
                    } else {
						
						// add to feed
						if(!$is_post) $this->insertIntoFeed($videoId,$this->id,'video');
						
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
    echo json_encode(array("status" => "OK", "title" => $nm,
"vd_dur" => $video_dur,
"src" => $send_dir.$newName,
"videoid" => $videoId,
 "filename" => $newName,
 "userid" => $this->userid,
 "added" => $this->time,
 "size" => $fileSize,
 "extension" => $fileExt,
 "albumid" => $albid));

	
	
}
private function lastFeedUpdate($clubid){


$lst_w = $this->db->query("select `id`,`itemid`,`categ`,`added` from ".tbl_feed." where `parent_id` = '{$clubid}' and `byuser` = '{$this->userid}' order by added desc limit 1");
$res = $lst_w->fetch_array(MYSQLI_ASSOC);

return sizeof($res) ? $res['categ'].'='.$res['id'].'='.$res['itemid'].'='.$res['added'] : '';

}
private function insertIntoFeed($itemid = 0,$clubid,$categ){


$response = false;
$to = $categ;
$parent_id = $clubid; 
$i = $this->userid;
$c = 0;
$now = strtotime("-5 minutes");
$minus_12_hours = strtotime("-12 hours");
$q = $this->db->query("select `id`,`itemid` from ".tbl_feed." where `byuser`='{$i}' and `categ` = '{$to}' and `parent_id`='{$parent_id}' and `added` >= '{$now}' order by added desc limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

$itid = $r['itemid'];
$fid = $r['id'];
$last_up_feed = ex_egal($this->lastFeedUpdate($clubid));
if($itemid > 0){

if( (!empty($itid) && !empty($fid)) || ($last_up_feed[0] == $to && $last_up_feed[3] <= $minus_12_hours) ){

$up_itid = !empty($itid) ? $itemid.','.$itid : $itemid .',' .$last_up_feed[2];
$fid = !empty($fid) ? $fid : $last_up_feed[1];
$query = "update ".tbl_feed." set `itemid` = '{$up_itid}', `added`='".time()."' where `id` = '{$fid}'";
$c = 1;

} else {

$query = "insert into ".tbl_feed." set `community`='yes',`byuser`='{$this->userid}',`itemid`='{$itemid}',`added`='{$this->time}',`categ`='{$to}', `parent_id` = '{$parent_id}'";
$c = 0;

}
$exec_query = $c ? $this->db->query($query) : $this->query_insert($query);      

}
if($exec_query)
$response = true;

return $response;

}

// add logo to s3
public function communityAddLogoToS3(){
	
	
	
		
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_COMMUNITIES_PICTURES_BUCKETS'];
	
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
 
	$s3_dir = __ROOT__.'/stcmd/s3-communities-pictures/';
	$s3_dir_large = $s3_dir.'/'.strtoupper(AWS_S3_BUCKET_NAME).'LARGE/';
	$success = false;
		
		
    // generate dir  
    if (!file_exists($s3_dir))
    mkdir($s3_dir, 0777, true);
 
    // generate dir  
    if (!file_exists($s3_dir_large))
    mkdir($s3_dir_large, 0777, true);


		$uploadOk = 1;
		$imageFileType = pathinfo(basename($_FILES["file"]["name"]),PATHINFO_EXTENSION);
		$fileN = $_FILES["file"]["name"];
		$temp = explode('.', $fileN);
		$imageFileType = end($temp);
		$fileTempName = $_FILES["file"]["tmp_name"];
		
		
		
		$newName = basename(mt_rand().mt_rand() . '.' . $imageFileType);
		$rename_file = $s3_dir_large . $newName;
		$mainImage = $rename_file;
 



			if(!$this->isAdmin()) {$uploadOk = 0; $msg['msg'] = 'You dont have permission to do that.';}
		
		
		
	$_msg = $this->communityBeforeUploadCover($_FILES["file"],$imageFileType);
	$msg = $_msg[1];
	$uploadOk = $_msg[0];
	$msg['file'] = '';
		
		
 if ($uploadOk == 0) {
    $msg['msg'] = "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
	
    if (move_uploaded_file($fileTempName, $rename_file)) {

		
		
		foreach($buckets as $bucket):
		
		
				    // generate dir  
					$s3_b_dir = $s3_dir.strtoupper(AWS_S3_BUCKET_NAME.$bucket).'/';
	 
		if (!file_exists($s3_b_dir))
					mkdir($s3_b_dir, 0777, true);
				
				
				if ( strstr($bucket, "medium") !== false ) {
					
						$r_image =	smart_resize_image($mainImage, 
                                       null,
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       true,
                                       $s3_b_dir.$newName,
                                       FALSE ); 
									   

				 
					}else if( strstr($bucket, "small") !== false){
	 
									
					$fileSize = filesize($mainImage);
					
					//Let's check allowed $ImageType, we use PHP SWITCH statement here
					switch(strtolower($_FILES['file']['type']))
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
					
					
					list($CurWidth,$CurHeight) = getimagesize($mainImage);
					
					
					
					    $r_image = cropImage($CurWidth,$CurHeight,
												$this->settings['GROUPS_SMALL_IMAGES_SIZE'],
												$s3_b_dir.$newName,$CreatedImage,90,$_FILES['file']['type']);
																
			
									   

					}
 
					
					
					$folderName = 'communities/images/'.$bucket.'/'.$this->id.'/';  // path on s3 bucket.
					 
				    //move the file
					if($this->s3->putObjectFile($s3_b_dir.$newName, AWS_S3_BUCKET_NAME, $folderName.$newName, S3::ACL_PUBLIC_READ)){
					$r = 1;
				 
					// delete images from localhost
					 if ( strstr($bucket, "large") === false) unlink($s3_b_dir.$newName);
					}
				
				
				if ($r) {
					 
					$success = true;
				}else{
					$message[] = "Something went wrong while uploading your file... sorry.";
				}
				
				
				endforeach;
				// delete main image from server
				if( $success ) unlink($mainImage);
		
		
		if($success) {
			$logo_small = '//'.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/communities/images/small/'.$this->id.'/'.$newName;
			$logo_large = '//'.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/communities/images/large/'.$this->id.'/'.$newName;
	// update logo in database
		if( $this->query_update("update ".tbl_communities." set `logo`='{$logo_small}' where `id`='{$this->id}'") ) {
		$uploadOk = 1;
		
        $msg['msg'] = "OK";
		$msg['file'] = $logo_large;
		$msg['clean_cover_url'] = $newName;
		$msg['small_size'] = $logo_small;
		
	}else{
			$uploadOk = 0;
			$msg['msg'] = "Sorry, there was an error updating your logo.";
		}
		
		
    } else {
       $msg['msg'] = "Sorry, there was an error uploading your file.";
    }
	
	
		}		

		
		
		
		}
	
	echo json_encode($msg);
}
	
	


// add logo
public function communityAddLogo(){
	


    $dir = __ROOT__.__COMMUNITIES_IMAGES_DIR;
    $large       = $dir.'/large/'.$this->id.'/';
    $medium      = $dir.'/medium/'.$this->id.'/';
    $small       = $dir.'/small/'.$this->id.'/'; 

	$image_url_done_large = $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/large/'.$this->id.'/';
	$image_url_done_small = $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$this->id.'/';

    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);

    // large dir
    if(!file_exists($large))
    mkdir($large, 0777, true);

    // medium dir
    if(!file_exists($medium))
    mkdir($medium, 0777, true);

    // small dir
    if(!file_exists($small))
    mkdir($small, 0777, true);


$uploadOk = 1;
$imageFileType = pathinfo(basename($_FILES["file"]["name"]),PATHINFO_EXTENSION);
$fileN = $_FILES["file"]["name"];
$temp = explode('.', $fileN);
$imageFileType = end($temp);

$newName = basename(mt_rand().mt_rand() . '.' . $imageFileType);
$rename_file = $large . $newName;
$msg = array();
$msg['file'] = '';



	if(!$this->isAdmin()) {$uploadOk = 0; $msg['msg'] = 'You dont have permission to do that.';}


	$_msg = $this->communityBeforeUploadCover($_FILES["file"],$imageFileType);
	$msg = $_msg[1];
	$uploadOk = $_msg[0];
	$msg['file'] = '';
	
	
if ($uploadOk == 0) {
    $msg['msg'] = "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
	
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $rename_file)) {

		
	
	//Let's check allowed $ImageType, we use PHP SWITCH statement here
	switch(strtolower($_FILES["file"]['type']))
	{
		case 'image/png':
			//Create a new image from file 
			$CreatedImage = imagecreatefrompng($rename_file);
			break;
		case 'image/gif':
			$CreatedImage = imagecreatefromgif($rename_file);
			break;			
		case 'image/jpeg':
		case 'image/pjpeg':
		case 'image/jpg':
			$CreatedImage = imagecreatefromjpeg($rename_file);
			break;
		default:
			$this->dieErr(['response' => 'Unsupported File!']); //output error and exit
	}
			list($CurWidth,$CurHeight)=getimagesize($rename_file);
		
 
    // small dir
    $small_size = cropImage($CurWidth,$CurHeight,
	$this->settings['GROUPS_SMALL_IMAGES_SIZE'],
	$small.$newName,$CreatedImage,90,$_FILES['file']['type']);
  
		
    // medium dir
    $medium_size = smart_resize_image($rename_file, 
                                       null,
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       $this->settings['GROUPS_MEDIUM_IMAGES_SIZE'],
                                       true,
                                       $medium.$newName,
                                       FALSE ); 

    
	// update logo in database
	if( $this->query_update("update ".tbl_communities." set `logo`='{$newName}' where `id`='{$this->id}'") ) {
		$uploadOk = 1;
		
        $msg['msg'] = "OK";
		$msg['file'] = $image_url_done_large.$newName;
		$msg['clean_cover_url'] = $newName;
		$msg['small_size'] = $image_url_done_small.$newName;
		
	}else{
			$uploadOk = 0;
			$msg['msg'] = "Sorry, there was an error updating your logo.";
		}
		
		
    } else {
       $msg['msg'] = "Sorry, there was an error uploading your file.";
    }
	
	
}

echo json_encode($msg);
	
	
	
}

// delete cover
public function deleteCover(){
	
	if(!$this->isAdmin()) {echo json_encode(array('msg'=>'0'));die;}
	
	// select cover
	$a = $this->db->query("Select cover from ".tbl_communities." where `id`='{$this->id}' limit 1");
	$b = $a->fetch_array(MYSQLI_ASSOC);
	
	$current_cover = $b['cover'];
	
	if($this->communityCheckS3Pictures($current_cover)){
		
	$s3_cover = explode('/',$current_cover);
    $s3_cover = $s3_cover[count($s3_cover)-1];	
	 
	$this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/communities/covers', $s3_cover);
	} else {
	@unlink(__ROOT__.__COMMUNITIES_COVERS_DIR.'/'.$current_cover);
	}
	
	$upd = $this->query_update("update ".tbl_communities." set `cover` = '',`cover_position`='' where `id`='{$this->id}'");
	
	if($upd) echo json_encode(array('msg'=>'1','default_cover' => $this->default_cover)); else echo json_encode(array('msg' => '0', 'err' => $this->lang['community_delete_cover_error']));
	
}

// check if the user is subscribed already to the respective group
public function isSubscribed($group_id){
	return count($this->query_select("select id from ".tbl_communities_followers." where `group_id`='{$group_id}' and `userid`='{$this->userid}' limit 1"));
}

// join to the group
public function joinToThisGroup() {
	$a = 0;
	
	if(!$this->isSubscribed($this->id) && $this->id){
		
		
		// subscribe to the group
		if( $this->query_insert("insert into ".tbl_communities_followers." set `userid`='{$this->userid}',`group_id`='{$this->id}',`added`='{$this->time}'") )
			$a = 1;
		
		
	}

	echo $a;
}

// unjoin this group
public function unjoinToThisGroup() {
	
	$a = 0;
	
	if($this->isSubscribed($this->id) && $this->id){
		
		
		// subscribe to the group
		if( $this->query_delete("delete from ".tbl_communities_followers." where `group_id`='{$this->id}' and `userid`='{$this->userid}'") )
			$a = 1;
		
		
	}

	echo $a;
}

// check for admin
public function isAdmin($uid = 0, $group_id = 0){
	
	$userid = $uid ? $uid : $this->USER['id'];
	$group_id = $group_id ? $group_id : $this->id;
	$q = $this->db->query("select admin from ".tbl_communities." where `id`='{$group_id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	$list = $r['admin'];
	
	return $this->checkAdmin($userid,$list);
	
	
}

//save cover position
public function communitySaveCoverPosition() {
	
	$position = isset($_POST['position']) ? (int) $this->test_input($_POST['position']) : '';
	
	$r = 0;
	
	if($this->isAdmin()) {
	
			
			
				if( $this->query_update("update ".tbl_communities." set `cover_position`='{$position}' where `id`='{$this->id}'") )
				$r = 1;
			
		
	
	
	}
	
	
	echo $r;
	
	
}


// change cover
public function changeCover(){
	
	$this->template->assign("id",$this->id);
	$content = $this->template->fetch($this->theme_dir.'/communities/popup-change-cover.html');
	echo $this->getPage($content);
	
}

// save communities
public function saveCommunity() {
	
	
	$data = isset($_POST['d']) ? $_POST['d'] : '';
	$response = array();
	$response['msg'] = 0;
	if($data){
		
		$data = json_decode($data,true);
		
		$title = $this->test_input($data['title']);
		$type = $data['type'];
		$general_category = $data['general_category'];
		$category = $data['category'];
		$subcategory = $data['subcategory'];
		$cover = $data['cover'];
		$website = $data['website'];
		$description = $this->test_input($data['description']);
		$privacy = $data['privacy'];
		$birthday = $data['birthday'];
		
		// location 
		$location = $data['location'];
		$location_lat =  $data['location_lat'];
		$location_lon =  $data['location_lon']; 
		$location_data = $location_data = !empty($data['location_data']) ? json_encode($data['location_data']) : ''; 
		
		
		// insert community
		$b = $this->query_insert("insert into ".tbl_communities." SET 
																		`name`='{$title}',
																		`type`='{$type}',
																		`general_category`='{$general_category}',
																		`category`='{$category}',
																		`subcategory`='{$subcategory}',
																		`cover`='{$cover}',
																		`website`='{$website}',
																		`description`='{$description}',
																		`privacy`='{$privacy}',
																		`admin`='{$this->userid}',
																		`created`='{$this->time}',
																		`birthday`='{$birthday}',
																		`location`='{$location}',
																		`loc_lat` = '{$location_lat}',
																		`loc_lon` = '{$location_lon}',
																		`loc_data` = '{$location_data}'
																		
																		
								");
		// auto join to the group
		$add_follower = $this->query_insert("insert into ".tbl_communities_followers." set `userid`='{$this->userid}',`group_id`='{$b}',`added`='{$this->time}'");						

		
		if($b) {

			$response['msg'] = 1;
			$response['id'] = $b;
			
			}
	}
	
	
	echo json_encode($response);
}


// edit community
public function editCommunity(){
	
	
	
	$a = $this->lang['community_err_editing'];
	
	if($this->isAdmin()){
		
		
		$q = $this->db->query("select * from ".tbl_communities." where `id`='{$this->id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		$this->template->assign( "r", $r );
		$content = $this->template->fetch($this->theme_dir.'/communities/edit-popup.html');
		$a = $this->getPage($content);
		
		
	}
	
	echo $a;
	
}

public function updateCommunity(){
	
	
	$data = isset($_POST['d']) ? $_POST['d'] : '';
	$response = array();
	$response['msg'] = 0;
	if($data){
		
		$data = json_decode($data,true);
		
		$title = $this->test_input($data['title']);
		$type = $data['type'];
		$general_category = $data['general_category'];
		$category = $data['category'];
		$subcategory = $data['subcategory'];
		$cover = $data['cover'];
		$website = $data['website'];
		$description = $this->test_input($data['description']);
		$privacy = $data['privacy'];
		$birthday = $data['birthday'];
		
		// location 
		$location = $data['location'];
		$location_lat =  $data['location_lat'];
		$location_lon =  $data['location_lon']; 
		$location_data = !empty($data['location_data']) ? json_encode($data['location_data']) : ''; 
		 
		 
		// allow to add posts
		$allow_to_post = $data['allow_to_post'];
		
		// update community
		$b = $this->query_update("update ".tbl_communities." SET 		`allow_to_post`='{$allow_to_post}',
																		`name`='{$title}',
																		`type`='{$type}',
																		`general_category`='{$general_category}',
																		`category`='{$category}',
																		`subcategory`='{$subcategory}',
																		`cover`='{$cover}',
																		`website`='{$website}',
																		`description`='{$description}',
																		`privacy`='{$privacy}',
																		`admin`='{$this->userid}',
																		`created`='{$this->time}',
																		`birthday`='{$birthday}',
																		`location`='{$location}',
																		`loc_lat` = '{$location_lat}',
																		`loc_lon` = '{$location_lon}',
																		`loc_data` = '{$location_data}'
															where `id`='{$this->id}'			
								");
		
		if($b) {

			$response['msg'] = 1;
			$response['id'] = $this->id;
			
			}
	}
	
	
	echo json_encode($response);
	
}

// wall
public function feed(){
	
	
	
	$wall = new club_wall;
	
	$wall->build_user_feed($this->id);
	
	
}

public function myClubs(){

	$sql = "select c.* from ".tbl_communities_followers." f, ".tbl_communities." c
	where c.id = f.group_id and f.userid='{$this->userid}' group by c.id
	order by created desc";

	
	$page_url = '/communities/my?page=%s';
	$query = $this->pagination($this->settings['COMMUNITIES_LIMIT'],true,$page_url,$sql,$this->myClubsCount());
	
	$this->template->assign(['res' => $query[0],'pagination' => $query[1],'key' => $this->key, "active" => 1,
	'each_groups' => $this->theme_dir.'/communities/each-group.html',
	'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE,
	'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/',
	'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR]
	
	);
	$content = $this->template->fetch($this->theme_dir.'/communities/index.html');
	echo $this->getPage($content);
	
}

public function myClubsCount($user_id = NULL){
	
	$user_id = $user_id ? $user_id : $this->userid;
	$q = $this->db->query("select COUNT(*) as c from ".tbl_communities_followers." where userid='{$user_id}'");
	$c = $q->fetch_row();	
	return $c[0];
}

// get group details
public function groupDetails( $group_id ){
	
	return $this->query_select("select * from ".tbl_communities." where `id`='{$group_id}' limit 1");
}
 
// get community admins
public function getCommunityAdmins($group_id){
	
	$admins_arr = array();
	$admins = $this->db->query("select admin from ".tbl_communities." where `id`='{$group_id}' limit 1");
	$admins = $admins->fetch_array(MYSQLI_ASSOC);
	$admins = $admins['admin'];
	$m_admins = strpos($admins,',') ? true : false;
	
	if($m_admins) {
		
		$admins = explode(',',$admins);
		foreach($admins as $admin):
		$_user = $this->db->query("select `id`,`fullname`,`username`,`profile_photo` as photo from ".tbl_users." where `id`='{$admin}' limit 1");
		$_user = $_user->fetch_array(MYSQLI_ASSOC);
		$admins_arr[] = $_user;
		endforeach;
	} else {
		
		$_user = $this->db->query("select `id`,`fullname`,`username`,`profile_photo` as photo from ".tbl_users." where `id`='{$admins}' limit 1");
		$_user = $_user->fetch_array(MYSQLI_ASSOC);
		$admins_arr[] = $_user;
		
	}
	
	return $admins_arr;
} 

public function suggGroups($limit){
	
	$q = $this->query_select("select c.* from ".tbl_communities." c
left join ".tbl_communities_followers." cf ON !(cf.userid='{$this->userid}' and cf.group_id = c.id)

	
	where 
c.privacy = 'Open'  and FIND_IN_SET('{$this->userid}',c.admin) = 0
		group by c.id order by RAND() limit 
	".$limit);
	
	return $q;
}

public function communityCheckS3Pictures($pic){
	
	
	if(strstr($pic,"s3.amazonaws.com") !== false)
		return $pic;
	else
		return false;
	
}

public function groupHeader(){
	
	return $this->template->fetch($this->theme_dir.'/communities/group-header.html');
}
 
} // end class