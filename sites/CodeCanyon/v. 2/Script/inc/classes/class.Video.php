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

 
class Video extends _global_co {

public $videoid;
public $userid;
public $time;
public $userplaylist;
public $nop;
public $playlist;
public $clubid;

// constructor
public function __construct(){

//the old building from parent class
parent::__construct();


//$this->photoid = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : '';
$this->userid = isset($this->USER['id']) ? $this->USER['id'] : 0;
$this->time = time();
$this->videoid = isset($_POST['vid']) ? (int) $this->test_input($_POST['vid']) : (isset($_GET['vid']) ? (int) $this->test_input($_GET['vid']) : 0);
$this->userplaylist = isset($_POST['userplaylist']) ? (int) $this->test_input($_POST['userplaylist']) : (isset($_GET['userplaylist']) ? (int) $this->test_input($_GET['userplaylist']) : 0);
$this->nop = isset($_POST['nop']) ? $this->test_input($_POST['nop']) : (isset($_GET['nop']) ? $this->test_input($_GET['nop']) : false);
$this->playlist = isset($_POST['playlist']) ? $this->test_input($_POST['playlist']) : (isset($_GET['playlist']) ? $this->test_input($_GET['playlist']) : 0);
$this->clubid = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : (isset($_GET['clubid']) ? (int) $this->test_input($_GET['clubid']) : 0);

$this->template->assign(["clubid" => $this->clubid, "playlist" => $this->playlist]);

if($this->playlist){

	$playlist_videos = explode(",",$this->playlist);

	$this->template->assign("playlist_videos",$playlist_videos);
	
	
}


if(!$this->videoid || !is_numeric($this->videoid))
{
	
	echo 0; //err code 0 == invalid video id
	exit;
	
}
}

// open videos from club
private function openVideoFromClub($update_views = false) {
	
	
	// check if the video exist in database
	$q = $this->db->query("Select v.`s3`, v.id,v.type as extension,v.vd_external as external, v.views, v.userid, v.added,v.filename,v.vd_name as title,v.vd_duration as dur,v.vd_tags as tags
	,(select COUNT(*) from ".tbl_klass." where type='video' and itemid=v.id) as klass_count
	,(select COUNT(id) from ".tbl_klass." where type='video' and itemid=v.id and `userid` = '{$this->userid}') as eu
	from ".tbl_communities_pics."v where v.id='{$this->videoid}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	if(!count($r) || empty($r)) { echo 1; die;} //err code 1 == video not found
	
	// update this video +1 views
	if($update_views) $update_views = $this->query_update("update ".tbl_communities_pics." set `views`=views+1 where `id`='{$this->videoid}'");
	
	// select similar videos
	$active_vide_title = $this->test_input($r['title'],true);
	$similar_q = $this->query_select("select id,vd_name as title,views,vd_duration as dur from ".tbl_communities_pics." where `vd_name` LIKE N'%{$active_vide_title}%' and `id`<>'{$this->videoid}' order by added desc limit ".$this->settings['VIDEO_POPUP_SIMILAR_LIMIT']);

	$wd_comm_count = $this->getCommentsCount($r['id'],'video',1);
	$wd_comm_href = "/video?cmd=open&clubid=".$this->clubid."&vid=".$r['id'];
	$wd_comm_data = 'data-ivideo="1" data-scrollto="comments"';
	
	// create res array specially for widget list
	$res = array("byuser" => $this->clubid, "itemid" => $r['id']);
	
	// select author name of this video
	$u_name = $this->db->query("select name from ".tbl_communities." where `id`='{$this->clubid}' limit 1");
	$u_name = $u_name->fetch_array(MYSQLI_ASSOC);
	
	$res['uid'] = $r['userid'];
	$this->template->assign(["nop" => $this->nop, "u_name" => $u_name['name'], 
	'userplaylist' => $this->userplaylist,
	'res' => $res,
	'kl_count' => $r['klass_count'],
	'kl_eu' => ($r['eu'] ? true : false),
	'wd_comm_data' => $wd_comm_data,
	'wd_comm_href' => $wd_comm_href,
	'wd_comm_count' => $wd_comm_count,
	'item_type' => 'video',
	'this' => $this,
	'r' => $r,
	'video_dir' => __COMMUNITIES_VIDEOS_DIR.$this->clubid.'/',
	'similar_query' => $similar_q]);
	$content = $this->template->display($this->theme_dir.__POPUPS.'/p_video.html');
	echo $content;
	
	
}

// open video popup
public function open($update_views = false){
	
	
	if($this->clubid) {
		
		$this->openVideoFromClub($update_views);
		exit;
	}
	
	
	// check if the video exist in database
	$q = $this->db->query("Select v.*
	,(select COUNT(*) from ".tbl_klass." where type='video' and itemid=v.id) as klass_count
	,(select COUNT(id) from ".tbl_klass." where type='video' and itemid=v.id and `userid` = '{$this->userid}') as eu
	from ".tbl_videos."v where v.id='{$this->videoid}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	if(!count($r) || empty($r)) { echo 1; die;} //err code 1 == video not found
	
	// update this video +1 views
	if($update_views) $update_views = $this->query_update("update ".tbl_videos." set `views`=views+1 where `id`='{$this->videoid}'");
	
	// select similar videos
	$active_vide_title = $this->test_input($r['title'],true);
	$similar_q = $this->query_select("select id,title,views,dur from ".tbl_videos." where `title` LIKE N'%{$active_vide_title}%' and `id`<>'{$this->videoid}' order by added desc limit ".$this->settings['VIDEO_POPUP_SIMILAR_LIMIT']);

	$wd_comm_count = $this->getCommentsCount($r['id'],'video');
	$wd_comm_href = "/video?cmd=open&vid=".$r['id'];
	$wd_comm_data = 'data-ivideo="1" data-scrollto="comments"';
	
	// create res array specially for widget list
	$author_id = $r['userid'];
	$res = array("byuser" => $r['userid'], "itemid" => $r['id']);
	
	// select author name of this video
	$u_name = $this->db->query("select name from ".tbl_users." where `id`='{$author_id}' limit 1");
	$u_name = $u_name->fetch_array(MYSQLI_ASSOC);
	$res['uid'] = $r['userid'];
	$this->template->assign(["nop" => $this->nop, 
 
	"video_dir" => __VD_DIR.$r['userid']."/videos/","u_name" => !empty($u_name['name']) ? $u_name['name'] : '',
	'userplaylist' => $this->userplaylist,'res' => $res,'kl_count' => $r['klass_count'],
	'kl_eu' => ($r['eu'] ? true : false),'wd_comm_data' => $wd_comm_data,
	'wd_comm_href' => $wd_comm_href, 'wd_comm_count' => $wd_comm_count,
	'item_type' => 'video','this' => $this, 'r' => $r, 'similar_query' => $similar_q]);
	$content = $this->template->display($this->theme_dir.__POPUPS.'/p_video.html');
	echo $content;
	
}
public function getVideoDetails($video_id,$playing_id) {
	
	if(  !is_numeric($video_id)){
		$result = array();
	} else {
	
	// select videos
	$result = $this->db->query("select id,views,vd_name as title,vd_duration as dur from ".tbl_communities_pics." where `id`='{$video_id}' and `id`!='{$playing_id}' order by added desc");
	$result = $result->fetch_array(MYSQLI_ASSOC);
	}
	
	return $result;
	
}
// create user's playlist
public function userVidPlaylist($userid,$vid){

	if(!$vid || !$userid || !is_numeric($userid) || !is_numeric($vid)){
		$result = array();
	} else {
	
	// select videos
	$result = $this->query_select("select id,views,title,dur from ".tbl_videos." where `id`<>'{$vid}' and `userid`='{$userid}' order by added desc limit 30");
	
	}
	
	return $result;
}
 
 // check if the video was viewed
 public function vdViewed($vid){
	 @session_start();
	 $s_db = isset($_SESSION['vid_db']) ? 1 : 0;
	 return $s_db ? (in_array($vid, $_SESSION['vid_db']) ? true : false) : false;
 }
 
 public function view_video_by_link()
 {
	$content = '<a id="refresh-url" href="'.str_replace('&nop=1','',$_SERVER["REQUEST_URI"]).'" data-ivideo="1"></a>';
	echo $this->getPage($content);
 }
 
} // end class