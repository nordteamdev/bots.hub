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

					        

require_once("class._u_feed.php");
require_once("class.toFeed.php");

 
require_once('class._d2_global.php');

class _global_co extends _SOCIALPLUS {
public $ntime;
public $userid;
public $feed_templates = "/feed/";
public $gPhoto   = "/getPhoto";
public $notesFile = "/body/notes.html";


public function __construct(){

//the old building from parent class
parent::__construct();
$this->userid = $this->USER['id'];
$this->ntime = time();
}

public function errorMessage($msg){

$arraySize = sizeof($msg);
/*
if($arraySize > 0){
echo '<div class="err_section">';

for($i=0;$i<$arraySize;$i++)
printf('<div class="error_message">%s</div>',$msg[$i]);

echo '</div>';
*/
if($arraySize > 0){
	$t = '';
	for($i=0;$i<$arraySize;$i++)
		$t .= sprintf('<div class="error_message">%s</div>',$msg[$i]);
$this->infoM($t);


}

}
public function scriptLocation($url){
@header("location: $url");
?>
<script>
document.body.style.display='none';
window.location = '<?php echo $url;?>';
</script>
<?php
}
public function notFound(){
$this->scriptLocation($this->pNotFound);
die;
}
// define the path of photo (small, thumb , medium, large)
public function getUserPhoto($user,$size){

return $this->gPhoto.'?p='.$user['profile_photo'].'&sz='.$size.'&token='.time();
}

// get photo for communities
public function communityGeneratePicture($size,$group_id,$pic_id,$logo = false){
	
$photo = __ROOT__.$this->settings['USER_DEFAULT_PHOTO']['male'];
    $htp = HTTPS_ON ? 'https:' : 'http:';
if($pic_id > 0 && !$logo){


// select photo from database
$a =  "select `filename`,`s3` from ".tbl_communities_pics." where id = '{$pic_id}' limit 1";
$b = $this->db->query($a);
$b = $b->fetch_array(MYSQLI_ASSOC);

if(isset($b['filename'])){

$photo = $b['s3'] == 'yes' ? $htp.'//'.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/communities/images/'.$size.'/'.$group_id.'/'.$b['filename'] : __ROOT__.__COMMUNITIES_IMAGES_DIR.'/'.$size.'/'.$group_id.'/'.$b['filename'];

}

} else if ($logo) {
	
$photo = __ROOT__.__COMMUNITIES_DEFAULT_IMAGE;
// select photo from database
$a =  "select `logo` from ".tbl_communities." where id = '{$group_id}' limit 1";
$b = $this->db->query($a);
$b = $b->fetch_array(MYSQLI_ASSOC);


 

if(!empty($b['logo'])) {

	$photo = $this->CheckS3Pictures($b['logo']) ? $htp.$b['logo'] : __ROOT__.__COMMUNITIES_IMAGES_DIR.'/'.$size.'/'.$group_id.'/'.$b['logo'];
}




 
	
}





return $photo;
	
}
// get photo for market products
public function marketGeneratePicture($size,$product_id,$pic_id){
	
$photo = __ROOT__._MARKET_DEFAULT_COVER;
$htp = HTTPS_ON ? 'https:' : 'http:';
if($pic_id > 0){


// select photo from database
$a =  "select `filename`,`s3`,`userid` from ".tbl_market_pictures." where id = '{$pic_id}' limit 1";
$b = $this->db->query($a);
$b = $b->fetch_array(MYSQLI_ASSOC);

if(isset($b['filename'])){
$userid = $b['userid'];
$photo = $b['s3'] == 'yes' ? $htp.'//'.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/market/images/'.$userid.'/'.$size.'/'.$b['filename'] : __ROOT__.__MARKET_IMAGES_DIR.'/'.$userid.'/'.$size.'/'.$b['filename'];

}

}  
 
return $photo;
	
}

// function to assign correct path to photos
public function linkGetPhoto($size,$photoId,$attach){


$photo = __ROOT__.$this->settings['USER_DEFAULT_PHOTO']['male'];
$htps = HTTPS_ON ? 'https://' : 'http://';
 
if($photoId > 0){

// select photo from database
$sqlText = $attach ? "select `s3`,`filename`,`userid` from ".tbl_attach." where `id` = '{$photoId}' limit 1" 
				   : "select `s3`,`userid`,`filename`,`extension` from ".tbl_photos." where id = '{$photoId}' limit 1";
$query = $this->query_select($sqlText);





if(count($query) > 0){

foreach($query as $res):
 
		

 
	if($attach){
		
		$photo = $res['s3'] == 'yes' ? $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/attachments/'.$res['userid'].'/'.$res['filename'] : __ROOT__.__AT_DIR.$res['userid'].'/'.$res['filename'];
		
	} else if($res['s3'] == 'yes'){
		
		
		$photo = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uphoto/'.$res['userid'].'/'.$size.'/'.$res['filename'];
	} else {
		
		$photo = __ROOT__.__IMG_DIR.$res['userid'].'/'.$size.'/'.$res['filename'];
		
		
	}
				 
  endforeach;

}

} 

return $photo;

}

// get cover for video
public function getVidCover($vid){

$g = $this->db->query("select `userid` from ".tbl_videos." where `id`='{$vid}' limit 1");
$r = $g->fetch_array(MYSQLI_ASSOC);

return isset($r) && $r ? $r['userid'] : '';

}

// select photos of respective user
public function getUPhotos($user,$ord='ORDER BY position ASC, id DESC'){
//return $this->query_select("select id,filename,size,extension,position,added from ".tbl_photos." where `userid`=".$user['id']." and `albumid`='0' ".$ord);
 $curUserid = isset($this->USER['id']) ? $this->USER['id'] : 0;
return $this->query_select("select COUNT(distinct lb.id) as lbyme,COUNT(distinct l.id) as lc,COUNT(distinct c.id) as kc,p.id,p.userid,p.filename,p.size,p.extension,p.position,p.added from ".tbl_photos." p
left join ".tbl_klass." l ON l.itemid=p.id and l.type='photo'
left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='{$curUserid}'
left join ".tbl_comments." c ON c.itemid=p.id and c.categ='photo'
where p.userid='".$user['id']."' and p.albumid='0' group by p.id ".$ord);
}

// select photos of respective album
public function getUPhotosA($user,$id,$ord='ORDER BY position ASC, id DESC'){
/*
return $this->query_select("select p.id,p.userid,p.filename,p.size,p.extension,p.position,p.added from ".tbl_photos." p
left join ".tbl_comments."

 where p.userid`=".$user['id']." and p.albumid='$id' ".$ord);
 
 */
 $curUserid = isset($this->USER['id']) ? $this->USER['id'] : 0;
return $this->query_select("select COUNT(distinct lb.id) as lbyme,COUNT(distinct l.id) as lc,COUNT(distinct c.id) as kc,p.id,p.userid,p.filename,p.size,p.extension,p.position,p.added from ".tbl_photos." p
left join ".tbl_klass." l ON l.itemid=p.id and l.type='photo'
left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='{$curUserid}'
left join ".tbl_comments." c ON c.itemid=p.id and c.categ='photo'
where p.userid='".$user['id']."' and p.albumid='{$id}' group by p.id ".$ord);
 
 
}



// return user's photo count
public function getUserPhotosCount($id){

if(!$id) $this->notFound();

return count($this->query_select("select id from ".tbl_photos." where `userid`='{$id}'"));

}
// get count of black list
public function getBlackListCount(){

$i = $this->USER['id'];

$c = count($this->query_select("select id from ".tbl_blacklist." where `employer`='$i'"));
return $c;
}
// get users from blacklist
public function getUsersFromBlackList(){

$i = $this->USER['id'];

$q = $this->query_select("select u.gender,u.fullname,u.profile_photo,u.id from ".tbl_blacklist." b, ".tbl_users." u where u.id=b.userid and b.employer='{$i}' order by b.added desc");
return $q;
}

// get user location history
public function getUserLocationHistory(){
$data = array();
$i = $this->USER['id'];
// select from db
$q = $this->query_select("select * from ".tbl_iplog." where `userid`='{$i}' order by id desc");
 
 
if(count($q))
{
foreach($q as $r):

$rs = json_decode($r['data'],true);

$data[] = array(
					"country_name" => isset($rs['country_name']) ? $rs['country_name'] : 'Unknown country name',
					"region_name" => isset($rs['region_name']) ? $rs['region_name'] : 'Unknown region name',
					"city" => isset($rs['city']) ?  $rs['city'] : 'Unknown city name',
					"ip" => isset($rs['ip']) ? $rs['ip'] : 'Unknown IP address.',
					"time" => date("d.m.Y H:i",$r['time'])
				);


endforeach;

}

return $data;

}

// build link cover for apps
public function buildAppCoverUrl($id,$thumb){
	
	$q = $this->db->query("Select `filename` from ".tbl_apps_covers." where `id`='{$id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	$r = $r['filename'];
	$thumb = $thumb ? 'thumb/' : 'large/';
	return __ROOT__.'/stcmd/apps-covers/'.$thumb . $r;
	
}

// profile settings page 
public function profile_settings_page(){

$getTab = isset($_GET['tab']) ? $_GET['tab'] : '';

$pPhotos = "";

$user_small_photo = $this->getUserPhoto($this->USER,'small');



$this->template->assign(['this' => $this, 'getTab' => $getTab,
 'user' => $this->USER, 'small_photo' => $user_small_photo, '_usermenu' => $this->theme_dir.$this->menuFile,
 '_wideMenu' => $this->theme_dir.$this->wideMenu]);


$content = $this->template->fetch($this->theme_dir.'/settings/index.html');
 
echo $this->getPage($content);

}



// get top liked 5 photos
public function getProfileTopPhotos($uid){
	$uid = (int) $uid;
 	$sql = "select p.id,COUNT(k.id) as likes_count from ".tbl_photos." p left join ".tbl_klass." k ON k.type='photo' and k.itemid=p.id  where p.userid='{$uid}' group by p.id order by likes_count desc, position asc,added desc limit 10";
	return $uid > 0 ? $this->query_select($sql) : [];
}

// user's profile main page
public function profile_feed_page( $uid = '',$profileName = ''){


$user = $this->checkUserCredential($uid,$profileName);
$userReq = '';





if(!empty($uid)) 
$userReq = "q=".$uid;
else if(!empty($profileName))
$userReq = "n=".$profileName."";
else if(!empty($profileName) && !empty($uid))
$userReq = "q=".$uid."&n=".$profileName."";
else 
$userReq = "q=".$user['id'];

$user_age = $this->getUserAge($user['birthday']);

$user_medium_photo =  '/getPhoto?p='.$user['profile_photo'].'&sz=medium';
$user_thumb_photo =  '/getPhoto?p='.$user['profile_photo'].'&sz=thumb';
$i = $this->USER['id'];
$uid = !empty($uid) ? $uid : $i;

// add guest
$this->addGuest($uid);

// select user's status
$st = $this->db->query("select * from ".tbl_posts." where `userid`='{$uid}' and available='yes' order by id desc limit 1");
$st = $st->fetch_array(MYSQLI_ASSOC);
$s_details = $s_artist = $s_songname = $s_albumname = $s_fname = $s_id = $s_cover = '';

if($st['type'] == 'song'){
// select details of respective song
$song_id = $st['text'];
$s_query = $this->db->query("select `id`,`artist`,`title`,`album`,`path`,`cover` from ".tbl_songs." where `id` = '$song_id' limit 1");
$s_details = $s_query->fetch_array(MYSQLI_ASSOC);

$s_id = $s_details['id'];
$s_artist = $s_details['artist'];
$s_songname = $s_details['title'];
$s_albumname = $s_details['album'];
$s_fname = $s_details['path'];
$s_cover = $s_details['cover'];

}
$i = $this->USER['id'];


// check for friend
$fr_query = count($this->query_select("select id from ".tbl_friends." where `userid`='{$uid}' and `friendid`='{$i}' and `status`='confirmed' limit 1"));

$this->template->assign([
 // for status 
 'p_id' => $st['id'], 'p_text' => $this->strPosts($st['text']), 'p_added' => $st['added'], 'p_song' => $st['type'] == 'song' ? true : false,
 'p_song_id' => $s_id, 'p_song_fname' => $s_fname, 'p_song_cover' => $s_cover, 'p_song_artist' => $s_artist, 'p_song_name' => $s_songname, 'p_song_album' => $s_albumname,
 'st' => $st, 'is_friend' => $this->isfriend($uid), 'is_friend_t' => $this->isfriend($uid), 'count_p' => sizeof($st), 
 '_usermenu_feed' =>  $this->theme_dir.$this->menuFile_FEED, '_posts' => $this->theme_dir.$this->postsFile,
 'user_thumb_photo' => $user_thumb_photo, 'this' => $this, 'userid' => $uid, 'userHref' => $userReq, '_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu,
 'cur_url' => !empty(__CUR_URL) && __CUR_URL !== '/' ? __CUR_URL : '/profile?', 'user_medium_photo' => $user_medium_photo, 'user' => $user, 'user_age' => $user_age]);

$content = $this->template->fetch($this->theme_dir.'/profile/ufeed.html');

echo $this->getPage($content);


}

// user's profile main page
public function index_feed_page(){

$user = $this->USER;
$i = $user['id'];

$res = array();

// select user's status
$st = $this->db->query("select * from ".tbl_posts." where `userid`='{$i}' and available='yes' order by id desc limit 1");
$st = $st->fetch_array(MYSQLI_ASSOC);
$s_details = $s_artist = $s_songname = $s_albumname = $s_fname = $s_id = $s_cover = '';
$res['itemid'] = $st['id'];

if($st['type'] == 'song'){
// select details of respective song
$song_id = $st['text'];
$s_query = $this->db->query("select `id`,`artist`,`title`,`album`,`path`,`cover` from ".tbl_songs." where `id` = '{$song_id}' limit 1");
$s_details = $s_query->fetch_array(MYSQLI_ASSOC);

$s_id = $s_details['id'];
$s_artist = $s_details['artist'];
$s_songname = $s_details['title'];
$s_albumname = $s_details['album'];
$s_fname = $s_details['path'];
$s_cover = $s_details['cover'];

}



$this->template->assign([
 // for status 

						
  'p_id' => $st['id'], 'p_text' => $this->strPosts($st['text']), 'p_added' => $st['added'], 'p_song' => $st['type'] == 'song' ? true : false, 'p_song_id' => $s_id, 'p_song_fname' => $s_fname, 'p_song_cover' => $s_cover, 'p_song_artist' => $s_artist, 'p_song_name' => $s_songname, 'p_song_album' => $s_albumname,
 'st' => $st,'count_p' => sizeof($st), '_usermenu' => $this->theme_dir.$this->menuFile, '_posts' =>$this->theme_dir.$this->postsFile,'this' => $this, 'userid' => $user['id'],
 'cur_url' => !empty(__CUR_URL) && __CUR_URL !== '/' ? __CUR_URL : '/profile?', 'user' => $user]);

$content = $this->template->fetch($this->theme_dir.'/feed/myfeed.html');

echo $this->getPage($content);


}

// get profile theme
public function getProfileTheme($uid){
	
/*
$query = $this->db->query("select theme from ".tbl_users." where `id` = '{$uid}' limit 1");
$res = $query->fetch_array(MYSQLI_ASSOC);
$themeid = $res['theme'];
$theme_display = $themeid == '0' ? 'style="display:sone;"' : '';
$themeUrl = $themeid != '0' ? $this->settings['THEMES_DIR'].$this->getCurrentTheme(false,$themeid) : $this->settings['HOST'].$this->settings['DEFAULT_THEME'];
$theme_css_style = $themeid != '0' ? 

'<style id="st_left_right_theme">


.cover_t_c_repeat_l, .cover_t_c_repeat_r {
    background-image: url(

			
				'.$this->settings['THEMES_DIR'].'/body/'.$this->getCurrentTheme(1,$themeid).'
			

			);
}
body {
    background-image: url(

			
				'.$this->settings['THEMES_DIR'].'/body/'.$this->getCurrentTheme(1,$themeid).'
			

			);
    
}


</style>' : '';
$theme_markup = '<div '.$theme_display.' class="cover_t_c cover_t_c_repeat_w" id="t_cover_th_vw">
    <div class="cover_t_c_repeat dzsparallaxer">
      <div id="hook_Block_ThemeTopCenterImageRB" class="hookBlock">

	<img class="divimage dzsparallaxer--target" src="'.$themeUrl.'" alt="" id="th_v_bod">

</div>

  <div class="cover_t_c_repeat_l"></div>
        <div class="cover_t_c_repeat_r"></div>
    </div>
</div>'.$theme_css_style;

return $theme_markup;
*/

$query = $this->db->query("select id,theme,profile_photo from ".tbl_users." where `id` = '{$uid}' limit 1");
$res = $query->fetch_array(MYSQLI_ASSOC);
$theme_id = $res['theme'];


$htps = HTTPS_ON ? 'https://' : 'http://';

 
 $this->template->assign([ "res" => $res, "this" => $this, "s3_cover_url" => $htps.AWS_S3_BUCKET_NAME.".s3.amazonaws.com/ucovers/".$uid."/", "_d" => new _c_global_co ]);
 $content = $this->template->fetch($this->theme_dir.'/profile/theme.html');
return $content;
}

// create theme from photos collage
public function createUserThemeFromCollage($uid){
	$data = array();
	//$q = $this->query_select("select id from ".tbl_photos." where `userid`='{$uid}' order by added desc limit 6");
	$q = $this->query_select("SELECT * FROM (
												(SELECT p.id,p.added, p.extension,p.info as str FROM ".tbl_photos." p where p.userid = '{$uid}')
										UNION ALL
												(SELECT v.id,v.added,v.extension,v.title as str FROM ".tbl_videos." v where v.userid = '{$uid}')
											) res
												order by res.added desc limit 6");
									
	if(count($q)){
		
		foreach($q as $r):
		
		$data[] = array("id" => $r['id'], "added" => $r['added'], "str" => $r['str'], "is_video" => !in_array($r['extension'],$this->settings['VALID_FORMATS']) ? true : false);
		
		endforeach;
		
	}		

	return $data;
}
 // theme details
 public function getThemeDetails($themeid){
	 
	 $themeid = (int) $themeid;
	 
	 $q = $this->db->query("select * from ".tbl_themes." where `id`='{$themeid}' limit 1");
	 return $q->fetch_array(MYSQLI_ASSOC);
	 
 }
 // corrupted feed
 public function corrFeed(){
 
 $this->template->assign("this", $this);
 $content = $this->template->fetch($this->theme_dir.'/feed/corrupted-feed.html');
return $content;
 }
// construct feed
public function cFeed($uid = 0, $page = 0){

$i = $uid > 0 ? (int) $uid : $this->USER['id'];

$filter = isset($_POST['filter']) ? $this->test_input($_POST['filter']) : '';
// call wall class
$wall = new _u_wall;

$wall->build_user_feed($i,$filter,$page);

}

// extract example friend
public function extractExampleFriend(){

$q = $this->db->query("select `id`,`name`,`profile_photo` from ".tbl_users." where `profile_photo`>0 order by RAND() limit 1");
return $q->fetch_array(MYSQLI_ASSOC);

}

// check if user have friend request at viewing profile
public function frReqViewProf($id){

$i = $this->USER['id'];

// check if request was sended already
$check = $this->db->query("select `id` from ".tbl_friends." where `userid`='{$id}' and `friendid`='{$i}' and status='pending' limit 1");
$count = $check->num_rows;

return $count > 0 ? true : false;

}

// check if friend request is pending
public function pendingFriendReq($id){

$uid = $this->USER['id'];

// check if request was sended already
$count = count($this->query_select("select `id` from ".tbl_friends." where (`userid`='{$uid}' and `friendid`='{$id}' or `userid`='{$id}' and `friendid`='{$uid}') and `status`='pending' limit 1"));

return $count ? true : false;

}

// send friend request
public function sendFriendRequest($id){

$uid = $this->USER['id'];
$now = time();

// check if the users is already friends
$check = count( $this->query_select("select id from ".tbl_friends." where (`userid`='{$uid}' and `friendid`='{$id}' || `userid`='{$id}' and `friendid`='{$uid}') && `status`='confirmed' limit 1 "));

if($check)
$this->dieErr(['response' => 'already_friends']);
	

if($this->pendingFriendReq($id))
$this->dieErr(['response' => 'open_notif']);///$this->lang['fr_req_already_sended']]);

$send = $this->query_insert("insert into ".tbl_friends." SET `userid`='{$uid}', `friendid`='{$id}',`added`='{$now}'");
// send notification
$this->toNotif($id,'friends',$send);

if($send)
echo $this->sendResponse(['response' => '1']);
else
echo $this->sendResponse(['response' => '0']);

}

// remove notification
public function removeNotification($id){

$i = $this->USER['id'];
$r = 0;

if(!$i) $this->dieErr(['response' => '0']);

$delete = $this->query_delete("delete from ".tbl_notif." where `id`='{$id}'");

if($delete)
$r = 1;

echo $this->sendResponse(['response' => $r]);

}

public function oppositeRelationship($r){

$a = array(
"father" => $this->USER['gender'] == 'male' ? $this->lang['son'] : $this->lang['daughter'],
"uncle" => $this->USER['gender'] == 'male' ? $this->lang['nephew'] : $this->lang['niece'],
"nephew" => $this->USER['gender'] == 'male' ? $this->lang['uncle'] : $this->lang['aunt'],
"grandfather" =>  $this->USER['gender'] == 'male' ? $this->lang['nephew'] : $this->lang['niece'],
"father-in-law" => $this->USER['gender'] == 'male' ? $this->lang['son_in_law'] : $this->lang['daughter_in_law'],
"son-in-law" => $this->USER['gender'] == 'male' ? $this->lang['father_in_law'] : $this->lang['mother_in_law'],
"godfather" => $this->USER['gender'] == 'male' ? $this->lang['godson'] : $this->lang['goddaughter'],
"godson" => $this->USER['gender'] == 'male' ? $this->lang['godfather'] : $this->lang['godmother'],
"mother" => $this->USER['gender'] == 'male' ? $this->lang['son'] : $this->lang['daughter'],
"aunt" => $this->USER['gender'] == 'male' ? $this->lang['nephew'] : $this->lang['niece'],
"niece" => $this->USER['gender'] == 'male' ? $this->lang['uncle'] : $this->lang['aunt'],
"mother-in-law" => $this->USER['gender'] == 'male' ? $this->lang['son_in_law'] : $this->lang['daughter_in_law'],
"daughter-in-law" => $this->USER['gender'] == 'male' ? $this->lang['father_in_law'] : $this->lang['mother_in_law'],
"godmother" => $this->USER['gender'] == 'male' ? $this->lang['godson'] : $this->lang['goddaughter'],
"goddaughter" => $this->USER['gender'] == 'male' ? $this->lang['godfather'] : $this->lang['godmother']
);

# relative users!

/*
 @param $r - user relationship.
*/

if(strpos($r,',')){

$k = explode(",",$r);

for( $i = 0; $i<sizeof($k); $i++ ){
if(array_key_exists( $k[$i], $a ))
$r = str_replace( $k[$i], $a[$k[$i]], $r );
}

}
 
return $r;

}

// confirm friend request
public function confirmFriendReq($fID,$m,$time,$notifId){

$i = $this->USER['id'];
$query = false;
$now = time();
if($this->USER['id'] == $fID)
$this->dieErr(['response' => 'INVALID ID!']);

// check if user exist in our database
$check = $this->db->query("select id from ".tbl_users." where `id`='$fID' limit 1");
$count = $check->num_rows;

if($count <= 0) 
$this->dieErr(['response' => str_replace('%s', $fID, $this->lang['user_dosent_exist'])]);


if($m){

// select relationship
$q_rel = $this->db->query("select `relationship` from ".tbl_friends." where `userid`='$fID' and `friendid`='$i' and `added` = '$time'");
$r_rel = $q_rel->fetch_array(MYSQLI_ASSOC);
$oppositeRelationship = $this->oppositeRelationship($r_rel['relationship']);

// add friend
$query = $this->query_update("update ".tbl_friends." set `status`='confirmed' where `userid`='$fID' and `friendid`='$i' and `added` = '$time'");


$insert = $this->query_insert("insert into ".tbl_friends." SET `userid`='$i', `friendid`='$fID',`added`='$now',`status`='confirmed',`relationship`='$oppositeRelationship'");

// send notification that the friend request was accepted
$this->toNotif($fID,"friends",$i,json_encode(["text" => "the friend request was accepted"]),3);

// add to news feed
$this->toFeed($fID,'newfriend','friendFeed');

} else {

// ignore friend
$query = $this->query_delete("delete from ".tbl_friends." where `userid`='$fID' and `friendid`='$i' and `added` = '$time'");
$delete = $this->query_delete("delete from ".tbl_notif." where `id`='$notifId'");

// send notification that the friend request was declined
$this->toNotif($fID,"friends",$i,json_encode(["text" => "the friend request was declined"]),4);

}

if($query)
echo $this->sendResponse(['response' => '1', 'notif_id' => $notifId]);
else
echo $this->sendResponse(['response' => '0']);
}


// empty wall
public function empty_feed(){

return '<div class="wall_no_results"><span>'.$this->lang['empty_wall'].'</span></div>';

}
public function getUmenuRedesign(){
$uid = isset($_SESSION['cur_uid']) ? ($_SESSION['cur_uid'] > 0 ? $_SESSION['cur_uid'] : $this->USER['id']) : $this->USER['id'];
$user = $this->checkUserCredential($uid,'');
$userPhotos = $this->getUPhotos($user,'ORDER BY position ASC, added DESC LIMIT '.$this->settings['P_PHOTOS_LIMIT']);
$photoCount = count($userPhotos);
$userAddPhoto = $photoCount > 0 ? 'square' : 'big';
$addPhoto = $this->theme_dir."/profile/addPhotos/add-photo-{$userAddPhoto}.html";
$_notes = $this->theme_dir.$this->notesFile;
$this->template->assign(['user' => $user, "user_age" => $this->getUserAge($user['birthday']), 'this' => $this, 'pCount' => $photoCount, 
'_notes' => $_notes, 'query' => ($photoCount > 0 ? $userPhotos : ''), 'gPhoto' => $this->gph(), '_addPhoto' => $addPhoto, 
 'small_photo' => $this->getUserPhoto($user,'small'), '_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu]);
$this->template->display($this->theme_dir.'/profile/umenu.html');
}
public function gph(){
return $this->settings['HOST'].$this->gPhoto;
}

// get user's personal photos
public function profile_personal_photos($uid = '',$profileName = ''){
$user = $this->checkUserCredential($uid,$profileName);
$userPhotos = $this->getUPhotos($user,'ORDER BY position ASC, added DESC LIMIT '.$this->settings['P_PHOTOS_LIMIT']);
$photoCount = count($userPhotos);
$userAddPhoto = $photoCount > 0 ? 'square' : 'big';
$addPhoto = $this->theme_dir."/profile/addPhotos/add-photo-{$userAddPhoto}.html";
$_notes = $this->theme_dir.$this->notesFile;
$this->template->assign(['user' => $user, 'this' => $this, 'pCount' => $photoCount, '_notes' => $_notes, 
'query' => ($photoCount > 0 ? $userPhotos : ''), 'gPhoto' => $this->gph(), '_addPhoto' => $addPhoto,  
'small_photo' => $this->getUserPhoto($user,'small'), '_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu]);
$content = $this->template->fetch($this->theme_dir.'/profile/personal_photos.html');

echo $this->getPage($content);
}

public function gFileExt($file){

$ext = explode(".", $file);

return end($ext);

}

public function profile_photo_return($uid,$profileName){





        $pid = isset($_GET['pid']) ? $this->test_input($_GET['pid']) : '';
		$fileName = isset($_GET['phf']) ? $this->test_input($_GET['phf']) : '';
        $fileExt  = isset($_GET['ex']) ? $this->test_input($_GET['ex']) : '';
        $fileSize = isset($_GET['fsz']) ? (int) $this->test_input($_GET['fsz']) : 0;
        $position = isset($_GET['pos']) ? (int) $this->test_input($_GET['pos']) : 0;
        $added = isset($_GET['ad']) ? (int) $this->test_input($_GET['ad']) : 0;
		$phInfo = isset($_GET['info']) ? $this->test_input($_GET['info']) : '';
		$albumid = isset($_GET['i']) ? (int) $this->test_input($_GET['i']) : (isset($_GET['albid']) ? (int) $this->test_input($_GET['albid']) : 0);
$response = '';
if(empty($fileName) || !$pid) $this->notFound();


$getDeletedPhotoLink = $this->db->query("select `s3`,`userid` from ".tbl_deleted_photos." where `photoid`='{$pid}' limit 1");
		$getDeletedPhotoLink = $getDeletedPhotoLink->fetch_array(MYSQLI_ASSOC);
		$s3= $getDeletedPhotoLink['s3'];
		$photo_owenr_id = $getDeletedPhotoLink['userid'];



$user = $this->checkUserCredential($uid);

if($this->USER['id'] !== $user['id'] || (!$uid) || !$fileName)
$this->notFound();
else if (!$pid)
$this->notFound();

$trash = __ROOT__.__TRASH_;
$large = $trash.$this->pSize['large'];
$medium = $trash.$this->pSize['medium'];
$thumb  = $trash.$this->pSize['thumb'];
$small  = $trash.$this->pSize['small'];
$exp_size = $trash.$this->pSize['exp'];
$grid_size = $trash.$this->pSize['grid'];

if(!$added) $added = time();




if($s3 =='yes'){
	$htps = HTTPS_ON ? 'https://' : 'http://';
$htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uphoto/'.$photo_owenr_id.'/large/'.$fileName;
	
$fileSize = !empty($fileSize) ? $fileSize : filesize($large.$fileName);
$fileExt  = !empty($fileExt) ? $fileExt : $this->gFileExt($large.$fileName);

$phRestored = $this->query_insert("insert into ".tbl_photos." set   `s3`='{$s3}',
																	`id`='{$pid}',
																	`userid`='".$this->USER['id']."',
																	`filename` = '{$fileName}',
																	 `added`='{$added}', 
																	 `size`='{$fileSize}', 
																	 `extension`='{$fileExt}',
																	 `position`='{$position}',
																	 `albumid`='{$albumid}',
																	 `info`='{$phInfo}'
								");
$im = __ROOT__.__IMG_DIR.$this->USER['id'];

// restore the photo in "tagged album"
$restore_inTaggedAlbum = $this->query_update("update ".tbl_tag_album." set `available`='yes' where `photoid`='{$pid}'");

// restore comments for respective photo
$restore_comments = $this->query_update("update ".tbl_comments." set `available`='yes' where `itemid`='{$pid}' and `categ`='photo'");

// restore likes
$restore_likes = $this->query_update("update ".tbl_klass." set `item_deleted`='no' where `itemid`='{$photoId}' and `type`='photo' and `community`='no'");

// delete returned photo from "deleted album"
$delete = $this->query_delete("delete from ".tbl_deleted_photos." where `photoid`='{$pid}' and `userid`='{$this->userid}'");
	$response =  $phRestored;
}
else if(file_exists($large.$fileName) && $s3 =='no' ){

$fileSize = !empty($fileSize) ? $fileSize : filesize($large.$fileName);
$fileExt  = !empty($fileExt) ? $fileExt : $this->gFileExt($large.$fileName);

$phRestored = $this->query_insert("insert into ".tbl_photos." set   `s3`='{$s3}',
																	`id`='{$pid}',
																	`userid`='".$this->USER['id']."',
																	`filename` = '{$fileName}',
																	 `added`='{$added}', 
																	 `size`='{$fileSize}', 
																	 `extension`='{$fileExt}',
																	 `position`='{$position}',
																	 `albumid`='{$albumid}',
																	 `info`='{$phInfo}'
								");
$im = __ROOT__.__IMG_DIR.$this->USER['id'];

// restore the photo in "tagged album"
$restore_inTaggedAlbum = $this->query_update("update ".tbl_tag_album." set `available`='yes' where `photoid`='{$pid}'");

// restore comments for respective photo
$restore_comments = $this->query_update("update ".tbl_comments." set `available`='yes' where `itemid`='{$pid}' and `categ`='photo'");

// delete returned photo from "deleted album"
$delete = $this->query_delete("delete from ".tbl_deleted_photos." where `photoid`='{$pid}' and `userid`='{$this->userid}'");

if($phRestored && $s3 == 'no'){

for($i = 0; $i < sizeof($this->pSize); $i++){

if($i == 0)
rename($large.$fileName, $im.$this->pSize['large'].$fileName);
else if($i == 1)
rename($thumb.$fileName, $im.$this->pSize['thumb'].$fileName);
else if($i == 2)
rename($small.$fileName, $im.$this->pSize['small'].$fileName);
else if($i == 3)
rename($medium.$fileName, $im.$this->pSize['medium'].$fileName);
else if ($i == 4)
	rename($exp_size.$fileName, $im.$this->pSize['exp'].$fileName);
else if ($i == 5)
	rename($grid_size.$fileName, $im.$this->pSize['grid'].$fileName);

}

$response = $phRestored;

} else $response = '0';


	
} else $response = '0';

}



public function profile_delete_photo($uid, $profileName, $photoId){

$user = $this->checkUserCredential($uid,$profileName);

if($this->USER['id'] !== $user['id'] || (!$uid && !$profileName) || !$photoId)
$this->notFound();


// all its ok, delete the photo
$usid = $this->USER['id'];
$sqlSelect = "select `s3`,`id`,`filename`,`added`,`size`,`position`,`albumid`,`extension`,`info` from ".tbl_photos." where id='{$photoId}' and `userid` = '".$this->USER['id']."' limit 1";
$pselect = $this->db->query($sqlSelect);
$res = $pselect->fetch_array(MYSQLI_ASSOC);
$padded = $res['added'];
$psize = $res['size'];
$p_position = $res['position'];
$p_albumid = $res['albumid'];
$p_extension = $res['extension'];
$p_info = $res['info'];
$im = __ROOT__.__IMG_DIR.$this->USER['id'];
$trash = __ROOT__.__TRASH_;
$limg = $im.$this->pSize['large'].$res['filename'];
$filename = $res['filename'];
$s3 = $res['s3'];



// if user delete her profile photo
if($res['id'] == $this->USER['profile_photo']){
	
// select another photo for profile page
$an_ph = $this->db->query("select id from ".tbl_photos." where `userid`='".$this->USER['id']."' and `albumid`='0' order by id desc limit 1");
$new_profile_photo = $an_ph->fetch_array(MYSQLI_ASSOC);
$new_profile_photo = $new_profile_photo['id'] ? $new_profile_photo['id'] : '0';	
	
$this->db->query("update ".tbl_users." set `profile_photo` = '{$new_profile_photo}' where `id`=".$this->USER['id']);
}


if( $filename ){

$sqlDel = "delete from ".tbl_photos." where id='{$photoId}' and `userid` = ".$this->USER['id'];
$pdelete = $this->query_delete($sqlDel);

// turn the image as pending status in tagged by friends album
$update = $this->query_update("update ".tbl_tag_album." set `available`='no' where `photoid` = '{$photoId}'");

// turn off all the comments for respective photo
$off_comments = $this->query_update("update ".tbl_comments." set `available`='no' where `itemid`='{$photoId}' and `categ`='photo'");

// turn off all likes for respective photo
$off_likes = $this->query_update("update ".tbl_klass." set `item_deleted`='yes' where `itemid`='{$photoId}' and `type`='photo' and `community`='no'");

// delete from notification
$notif_delete = $this->query_delete("delete from ".tbl_grades." where `itemid`='{$photoId}' and `categ`='photo' and `community`='no'");
 

// delete from feed the respective photo
$this->deletePhotoFromFeed($photoId);

$this->deletePictureFromPost($photoId);

// add to deleted photos
$bn = $this->query_insert("insert into ".tbl_deleted_photos." set   `s3`='{$s3}',
																	`photoid`='{$photoId}',
																	`userid`='{$usid}',
																	`time`='{$this->ntime}',
																	`filename`='{$filename}',
																	`padded`='{$padded}',
																	`size`='{$psize}',
																	`extension`='{$p_extension}',
																	`albumid`='{$p_albumid}',
																	`info`='{$p_info}',
																	`position`='{$p_position}'
							");


if(file_exists($limg) && $s3 == 'no'){

if(!file_exists($trash.$this->pSize['large']))
 mkdir($trash.$this->pSize['large'], 0777, true);

 if(!file_exists($trash.$this->pSize['medium']))
 mkdir($trash.$this->pSize['medium'], 0777, true);

 if(!file_exists($trash.$this->pSize['small']))
 mkdir($trash.$this->pSize['small'], 0777, true);

 if(!file_exists($trash.$this->pSize['thumb']))
 mkdir($trash.$this->pSize['thumb'], 0777, true);

 if(!file_exists($trash.$this->pSize['exp']))
 mkdir($trash.$this->pSize['exp'], 0777, true);

 if(!file_exists($trash.$this->pSize['grid']))
 mkdir($trash.$this->pSize['grid'], 0777, true);

for($i = 0; $i < sizeof($this->pSize); $i++){
//rename($im.$this->pSize[$i].$res['filename'], $trash.$this->pSize[$i].$res['filename']);	
	
if($i == 0)
@rename($im.$this->pSize['large'].$res['filename'], $trash.$this->pSize['large'].$res['filename']);
else if($i == 1)
@rename($im.$this->pSize['thumb'].$res['filename'], $trash.$this->pSize['thumb'].$res['filename']);
else if($i == 2)
@rename($im.$this->pSize['small'].$res['filename'], $trash.$this->pSize['small'].$res['filename']);
else if($i == 3)
@rename($im.$this->pSize['medium'].$res['filename'], $trash.$this->pSize['medium'].$res['filename']);
else if($i == 4)
@rename($im.$this->pSize['exp'].$res['filename'], $trash.$this->pSize['exp'].$res['filename']);
else if($i == 5)
@rename($im.$this->pSize['grid'].$res['filename'], $trash.$this->pSize['grid'].$res['filename']);

}

}

if($pdelete) echo '1';

} else echo '0';

}


// get user photo's count
public function gUserCountPhotos($uid){

$q = $this->query_select("
select COUNT(id) as c from ".tbl_photos." where `userid`='{$uid}'  and albumid = '0'
UNION ALL
select COUNT(id) as c from ".tbl_albums." where `userid`='{$uid}' 
");

return $q['0']['c'].';'.$q['1']['c'];
}
public function deleteVideoFromPost($id){
	
	$post_vd_id = '[postVideo]'.$id.'[/postVideo]';
	$select_post = $this->db->query("select id,text from ".tbl_posts." where `text` LIKE CONCAT('%[postVideo]', '{$id}', '[/postVideo]%') limit 1");
	$res = $select_post->fetch_array(MYSQLI_ASSOC);
	
	if(isset($res['id'])){
		
		$post_id = $res['id'];
		$post_text = str_replace($post_vd_id, '', $res['text']);
		
		if($post_text == ''){
			
			$query = $this->query_delete("delete from ".tbl_posts." where `id`='{$post_id}'");
			
			// delete post from feed
			$this->query_delete("delete from ".tbl_feed." where `itemid`='{$post_id}' and `categ`='post_media'");
			
		} else {
		
		$query = $this->query_update("update ".tbl_posts." set `text` = '{$post_text}' where `id`='{$post_id}'");
		}
	}
	
	
	 
	return true;
}
public function deletePictureFromPost($id){
	
	$post_pic_id = '[postPhoto]'.$id.'[/postPhoto]';
	$select_post = $this->db->query("select id,text from ".tbl_posts." where `text` LIKE CONCAT('%[postPhoto]', '{$id}', '[/postPhoto]%') limit 1");
	$res = $select_post->fetch_array(MYSQLI_ASSOC);
	
	if(isset($res['id'])){
		
		$post_id = $res['id'];
		$post_text = str_replace($post_pic_id, '', $res['text']);
		
		if($post_text == ''){
			
			$query = $this->query_delete("delete from ".tbl_posts." where `id`='{$post_id}'");
			// delete post from feed
			$this->query_delete("delete from ".tbl_feed." where `itemid`='{$post_id}' and `categ`='post_media'");
 
		} else {
		
		$query = $this->query_update("update ".tbl_posts." set `text` = '{$post_text}' where `id`='{$post_id}'");
		}
	}
	
	
	 
	return true;
	
}

public function deletePhotoFromFeed($id){

   $uid = $this->USER['id'];
   
   $query = $this->query_delete("delete from ".tbl_feed." where `itemid`='{$id}' and (`categ`='pphotos' OR `categ`='palbum')");
   
   $sql = "update ".tbl_feed." SET `itemid`= TRIM(BOTH ',' FROM REPLACE(REPLACE(itemid, '{$id}', ''), ',,', ','))  where FIND_IN_SET({$id}, itemid) AND (`categ`='pphotos' OR `categ`='palbum') and `byuser`=".$uid;
   $this->query_update($sql);



   return true;
}

// construct "tagged by friends" album
public function buildTaggedAlbum($uid){

$q = $this->query_select("select SQL_CALC_FOUND_ROWS t.id,t.* from ".tbl_tag_album." t where t.available='yes' and t.userid='$uid' order by t.id desc limit 1");
$c = $this->db->query("select FOUND_ROWS() as c");
$c = $c->fetch_array(MYSQLI_ASSOC);
if(sizeof($q)) return [$q,$c['c']]; else return;

}

// get year when the photo has been added
public function getPhotoAddedYear($added) {

$pyear = date('Y',$added);


return $pyear !== date('Y') ? $pyear : 0;

}

// get photo stars
public function pwGetPhotoStars($photoid = 0,$community = false){
$rate_bg = 0;
if(!is_numeric($photoid) || !$photoid){ return 0;die; }
$community = $community ? "`community`='yes' and" : '';
         $query = $this->query_select("SELECT * FROM ".tbl_photo_rate." 
												where ".$community." id_photo='{$photoid}' group by id"); 
		 
                foreach($query as $data){
				
                    $rate_db[] = $data;
                    $sum_rates[] = $data['rate'];
					
                }
                if(@count($rate_db)){
				
                    $rate_times = count($rate_db);
                    $sum_rates = array_sum($sum_rates);
                    $rate_value = $sum_rates/$rate_times;
                    $rate_bg = (($rate_value)/5)*100;
					
                }else{
				
                    $rate_bg = 0;
					
                }
				
				return $rate_bg;

}

// get song details
public function getSongDetails($song_id){

$s_query = $this->db->query("select `id`,`artist`,`title`,`album`,`path`,`cover` from ".tbl_songs." where `id` = '{$song_id}' limit 1");
$s_details = $s_query->fetch_array(MYSQLI_ASSOC);

return $s_details;
}

// posts page
public function profile_posts_page( $uid = '', $profileName = '' ){

$filter = isset($_GET['filter']) ? $_GET['filter'] : '';

$user = $this->checkUserCredential($uid,$profileName);
$pAddr = __IMG_DIR.$user['id'];
$mediumPath = $pAddr.'/medium/';
$smallPath = $pAddr.'/small/';
$thumbPath = $pAddr.'/thumb/';
$user_small_photo = $this->getUserPhoto($user,'small');
$uid = $user['id'];
$i = $this->USER['id'];
$posts_count = '';


switch($filter):

	case 'links':
				$sql = "SELECT distinct p.*,u.fullname,u.profile_photo,u.id as uid, u.gender, COUNT(k.id) as kl_eu FROM ".tbl_slinks." l, ".tbl_posts." p
				 left join ".tbl_klass." k ON k.type='post' and k.userid='{$i}' and k.itemid=p.id
				 left join ".tbl_users." u ON u.id = p.userid
				 where p.userid='{$uid}' and l.byuser='{$uid}'
				 and p.text LIKE CONCAT('%[postLink]', l.id, '[/postLink]%')
				 group by l.id order by l.added desc";
				$posts_count = $this->getSharedLinksCount($uid);
				$page_url = "/profile?q=$uid&cmd=posts&filter=links&page=%s&nav=posts";
	break;
	
	case 'tagged':
				$sql = "SELECT distinct p.*,u.fullname,u.profile_photo,u.id as uid, u.gender, COUNT(k.id) as kl_eu FROM ".tbl_posts." p
				 left join ".tbl_klass." k ON k.type='post' and k.userid='{$i}' and k.itemid=p.id
				 left join ".tbl_users." u ON u.id = p.userid
				 where p.userid <> '{$uid}'
				 and p.text LIKE CONCAT('%[postTag]', {$uid}, '[/postTag]%')
				 group by p.id order by p.added desc";
				$posts_count = $this->getPostsTaggedByFriendsCount($uid);
				$page_url = "/profile?q=$uid&cmd=posts&filter=tagged&page=%s&nav=posts";
	break;
	
	case 'shared':
 
				 
				 $sql = "select distinct
				 u2.fullname as ushared_fullname,
				 u2.id as ushared_id,
				 u2.profile_photo as ushared_picture,
				 u2.gender as ushared_gender,
				 s.id as share_id,
				 s.owner_id as post_author_id,
				 s.post_id as original_post_id,
				 s.post_type,
				 s.community as original_post_community,
				 p.*,
				 u.fullname,
				 u.profile_photo,
				 u.id as uid,
				 u.gender,
				 COUNT(k.id) as kl_eu 
				 FROM ".tbl_shared_posts." s
				 inner join ".tbl_posts." p ON p.id = s.post_id
				 left join ".tbl_klass." k ON k.type='post' and k.userid='{$i}' and k.itemid=p.id
				 left join ".tbl_users." u ON u.id = p.userid
				 left join ".tbl_users." u2 ON u2.id = s.userid
				 where s.userid='{$uid}' 
				 
				 group by s.id order by s.added desc
				 ";
				 
				$this->template->assign(['item_type' => 'shared-content', 'shared-content' => 1]);
				$posts_count = $this->getUserSharedPostsCount($uid);
				$page_url = "/profile?q=$uid&cmd=posts&filter=shared&page=%s&nav=posts";
	break;
	
	case '':
	default:
				$sql = "SELECT p.*,u.fullname, u.profile_photo,u.id as uid, u.gender,COUNT(k.id) as kl_eu FROM ".tbl_posts." p 
						left join ".tbl_klass." k ON k.type='post' and k.userid='{$i}' and k.itemid=p.id
						left join ".tbl_users." u ON u.id = p.userid

						where p.userid='{$uid}' group by p.id order by p.added desc";
				$posts_count = $this->getPostsCount($uid);
				$page_url = "/profile?q={$uid}&cmd=posts&page=%s&nav=posts";

endswitch;

 

$create_results = $this->pagination($this->settings['POSTS_PAGE_RES_LIMIT'],true,$page_url,$sql,$posts_count);
// curr page url
$url =  "{$_SERVER['REQUEST_URI']}";
$escaped_url = htmlspecialchars( $url, ENT_QUOTES, 'UTF-8' );



// get status
// select user's status
$st = $this->db->query("select * from ".tbl_posts." where `userid`='{$uid}' and available='yes' order by id desc limit 1");
$st = $st->fetch_array(MYSQLI_ASSOC);
$s_details = $s_artist = $s_songname = $s_albumname = $s_fname = $s_id = $s_cover = '';

if($st['type'] == 'song'){

// select details of respective song
$song_id = $st['text'];
$s_details = $this->getSongDetails($song_id);

$s_id = $s_details['id'];
$s_artist = $s_details['artist'];
$s_songname = $s_details['title'];
$s_albumname = $s_details['album'];
$s_fname = $s_details['path'];
$s_cover = $s_details['cover'];

}

$this->template->assign([
 'pagination' => $create_results[1],
 
 'curr_pg_url' => $escaped_url,
 
 'filter' => $filter,
 
 'this' => $this,

 'query' => $create_results[0],

 'thumbPath' => $thumbPath,
 'smallPath' => $smallPath,
 'mediumPath' => $mediumPath,

 'user' => $user,
 
 'small_photo' => $user_small_photo,
 '_usermenu' => $this->theme_dir.$this->menuFile,
 '_wideMenu' => $this->theme_dir.$this->wideMenu,
 'st' => $st,
 // for status 
 'p_id' => $st['id'],
 'p_text' => $this->strPosts($st['text']),
 'p_added' => $st['added'],
 'p_song' => $st['type'] == 'song' ? true : false,
 'p_song_id' => $s_id,
 'p_song_fname' => $s_fname,
 'p_song_cover' => $s_cover,
 'p_song_artist' => $s_artist,
 'p_song_name' => $s_songname,
 'p_song_album' => $s_albumname,
 'count_post' => sizeof($st),
 '_posts' => $this->theme_dir.$this->postsFile
 
]);

$content = $this->template->fetch($this->theme_dir.'/profile/posts.html');
echo $this->getPage($content);
}
public function getClubidFromMediaPhotos($post_id) {
	
	$q = $this->db->query("select group_id from ".tbl_communities_pics." where `id`='{$post_id}' limit 1");
	$q = $q->fetch_array(MYSQLI_ASSOC);
	
	return $q['group_id'];
	
	
	
}
public function getClubIDbyPostId($post_id){
	
	$a = $this->db->query("select clubid from ".tbl_posts." where `id`='{$post_id}' limit 1");
	$a = $a->fetch_array(MYSQLI_ASSOC);
	return $a['clubid'];
	
	
}

// feed corrupted objects, markup
public function feedItemNotFound($categ){
$text = '';
switch($categ){

case 'photo':

$text = 'The photo is not available, has been removed or blocked.';

break;

case 'video':

$text = 'Video is not available, has been removed or blocked.';

break;

case 'song':

$text = 'Track is not available, has been removed or blocked.';

break;

}
return '';//$text;
}


public function getPostDetails($id){
	
	
	if(is_numeric($id)){
		$q = $this->db->query("select * from ".tbl_posts." where `id`='{$id}' limit 1 ");
		return $q->fetch_array(MYSQLI_ASSOC);
	} else {
		return array();
	}
}


// generate media statuses
public function generateMediaPost($string,$type,$id = 0,$clubid=0){
 
$more = 0;
 
switch($type){
	



	
/// simple text
case 'text':
$string = preg_replace("/\[postPlace\]((\s|.)+?)\[\/postPlace\]/i", "", $string); // escape places
$string = preg_replace("/\[postTag\]((\s|.)+?)\[\/postTag\]/i", "", $string);  // escape tagged people
$string = preg_replace("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", "", $string); // escape songs
$string = preg_replace("/\[postPhoto\]((\s|.)+?)\[\/postPhoto\]/i", "", $string); // escape photos
$string = preg_replace("/\[postVideo\]((\s|.)+?)\[\/postVideo\]/i", "", $string); // escape videos
$string = preg_replace("/\[postLink\]((\s|.)+?)\[\/postLink\]/i", "", $string); // escape links
$string = preg_replace("/\[poll\]((\s|.)+?)\[\/poll\]/i", "", $string); // escape poll
$string = preg_replace("/\[bgcolor\]((\s|.)+?)\[\/bgcolor\]/i", "", $string); // escape bgcolors

$count_text = preg_replace("/[^A-Za-z]/","", mb_convert_encoding($string, 'iso-8859-1', 'utf-8'));
 
 
return !empty($string) && trim($string) && strlen($string) > 0 ? '<div class="media-text_cnt"><span class="media-block media-text textWrap">'.$string.'</span></div>' : '';
break;

case 'bgcolor':

	$bgcolor = $color = '';

	$string = preg_replace_callback("/\[postBg\]((\s|.)+?)\[\/postBg\]/i", function($text) use (&$bgcolor) {
	$text = $text[1];
	$c = $text;
    $t_old = $text;
	
	$text = preg_replace_callback("/\[postBgColor\]((\s|.)+?)\[\/postBgColor\]/i", function($c) use (&$color) {
    $color = $c[1];
	return '';
	},$text);
 
	$fontsize = strlen($text) >= 150 && strlen($text) < 250 ? 'f27' : (strlen($text) >= 250 ? 'f21' : '');
	$text = strlen($text) > 251 ? substr($text,0,250)."..." : $text;

	$bgcolor = '<Div class="postbgcolored postonfeed-color-'.$color.'"><div class="postbgcol-text '. $fontsize .'">'.$this->str_smilies($text,false,false,true).'</div></div>';
	$bgcolor = $this->checkForTranslating($bgcolor);
	return '';
	
	},$string);
	
 
return $bgcolor;



break;
case 'tagged_people':

    $taggedUsers = array();

	// create tagged users
    $string = preg_replace_callback("/\[postTag\]((\s|.)+?)\[\/postTag\]/i", function($id)  use (&$taggedUsers) {

		$taggedUsers[] = $id[1]; 
		return'';

	}, $string);


	// get people tags
	$userTagged = '';
	if(sizeof($taggedUsers)){

		$tg_c = 0;
		foreach($taggedUsers as $uid):
		
		$q = $this->db->query("select id,fullname,gender,profile_photo as photo from ".tbl_users." where `id`='{$uid}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		static $c = 0;

		$userTagged .= sprintf(' <span class="f12">%s <span '.(sizeof($taggedUsers) > 2 && $c > 1 ? 'style="display:none;" data-aria-hidden="true"' : '').' data-udatacont=\'{"uid":"'.$r['id'].'","ugender":"'.$r['gender'].'","uname":"'.$r['fullname'].'","uphoto":"'.$r['photo'].'"}\' class="post-tagged-friends" id="'.$r['id'].'"><a class="o f12" href="/profile?q=%s" hrefattr="true"><strong>%s</strong></a></span>%s %s</span>'
		,($c === 0 ? $this->lang['with'] : ''),$r['id'],$r['fullname'],(sizeof($taggedUsers) == 2 && $c == 0 ? '&nbsp;'.$this->lang['and'] : (sizeof($taggedUsers) > 2 && $c == 0 ? ',' : '') ), ( sizeof($taggedUsers) > 2 && $c == 1 ? '<span class="il all-hidden-tagged-people">'.str_replace('%friends', ((sizeof($taggedUsers) - 2) > 1 ? $this->lang['friends'] : $this->lang['friend']), str_replace('%c', sizeof($taggedUsers)-2, $this->lang['and_other_friends'])).'</span>' : '') );
		$c++;
		
		endforeach;
		
		
	}
	
	return $userTagged;
	
break;

case 'places':

	// create places
	$place = array();
	$string = preg_replace_callback("/\[postPlace\]((\s|.)+?)\[\/postPlace\]/i", function($id) use (&$place) {
	$r = '';

	if(! (int) $id[1] || !is_numeric($id[1])){
	$place['0'] = ''; $place['1'] = '';
	} else {
		
	// load data from database
	$q = $this->db->query("select * from ".tbl_checkin." where `id`='{$id[1]}' order by added desc limit 1");
	$r = count($q) ? $q->fetch_array(MYSQLI_ASSOC) : 0;
	
	}
	
	if(!$r) { $place['0'] = ''; $place['1'] = '';
	
	} else {
		
	$jdata = json_decode($r['data'],true);
	
	$place_id = isset($jdata['pl-i']) && $jdata['pl-i'] != '' ? $jdata['pl-i'] : '';
	$place_name = isset($jdata['pl-n']) && $jdata['pl-n'] != '' ? $jdata['pl-n'] : '';
    $place_type = isset($jdata['pl-type']) && $jdata['pl-type'] != '' ? $jdata['pl-type'] : '';
	$display_name = isset($jdata['display_name']) ? $jdata['display_name'] : '';
	$country = isset($jdata['country']) && $jdata['country'] != '' ? $jdata['country'] : '';
	$city = isset($jdata['city']) && $jdata['city'] != '' ? $jdata['city'] : '';
	$road = isset($jdata['road']) && $jdata['road'] != '' ? $jdata['road'] : '';
	$loc_addr = [$country,$city,$road];
	$place_lt = $jdata['pl-lt'];
	$place_ln = $jdata['pl-ln'];
	$map_lc_addr = sizeof($loc_addr) ? substr(implode(", ", $loc_addr), 0) : '';
    $hookData = '<div class="hookData _0"><!--'.$r['data'].'--></div>';
	$location = '<div class="map-box __none"><div class="hookMapData"><!--'.$r['data'].'--></div></div>';
	$map_dt_loc = $location.'<div class="feed-ovr-map-loc"></div><div class="feed-tip-map-loc media-map" id="feed-tip-map-loc-'.$place_id.'"><div class="map_loading"><div class="map_load_ic tico_img"></div></div></div><div class="feed_map_location_details"><div title="'.$place_type.'" class="stub-img__48 feed-stb-place-ic stub-place stub-place-'.$place_type.'"></div><ul class="feed-map-ul"><li class="fd-map-placename">'.$place_name.'</li><li class="fd-map-placetype">'.$place_type.'</li><li class="fd-map-placetype">'.$map_lc_addr.'</li></ul></div>';
	$data = ' <span class="post_jb_tip_map" id="'.$r['id'].'">'.$hookData.'<span class="f12">'.($jdata['pl-type'] == 'vilage' || $jdata['pl-type'] == 'town' || $jdata['pl-type'] == 'city' || $jdata['pl-type'] == 'country' ? $this->lang['in'] : $this->lang['at']).'&nbsp;<span class="ic_feed_place"></span>&nbsp;<a class="o" onclick="searchPlaceInGroups(this,\''.$place_ln.'\',\''.$place_lt.'\');" href="javascript:void(0);"><strong>'.$place_name.'</strong></a></span></span>';
	$place['0'] = $data;
	$place['1'] = $map_dt_loc;
	}
	return '';
	},$string);

return $place;
break;

case 'photos':

	// create photos
	$sh_photos = array();
	$string_photos = '';
    $string = preg_replace_callback("/\[postPhoto\]((\s|.)+?)\[\/postPhoto\]/i", function($id) use (&$sh_photos){
		$sh_photos[] = $id[1];
		return '';//"<div class=\"pstatus_photos_sh\"><img src=\"/getPhoto?p={$id[1]}&sz=small\" /></div>";
	}, $string);
	$c = 0;

	if(count($sh_photos))
	foreach($sh_photos as $photo):
	if($c >= 2) break;
	$string_photos .= $clubid ? 
	'<a href="/post?i='.$id.'&clubid='.$clubid.'" data-type-post="1" data-scrollto="'.$photo.'" hrefattr="true" class="scrollTo media_more_a photos_sh collage image-hover"><img src="/clubpicture?i='.$photo.'&size=medium&clubid='.$clubid.'&corr=1" /></a>' 
	: '<a href="/post?i='.$id.'" data-type-post="1" data-scrollto="'.$photo.'" hrefattr="true" class="scrollTo media_more_a photos_sh collage image-hover"><img src="/getPhoto?p='.$photo.'&sz=medium" /></a>';
	$c++;
	endforeach;
	
	return count($sh_photos) ? [$string_photos,count($sh_photos)] : ['0' => $this->feedItemNotFound('photo'), '1' => ''];
break;


case 'videos':

	// create videos
	$videos_arr = array();
	$string_videos = '';
	$video_meta_data = array();
	$no_videos = 0;
    $string = preg_replace_callback("/\[postVideo\]((\s|.)+?)\[\/postVideo\]/i", function($id) use (&$videos_arr){
		$videos_arr[] = $id[1];
		return '';
	}, $string);
    $c = 0;

	if(count($videos_arr))
	foreach($videos_arr as $video_id):
	
	if($c >= 3) break;

	$q = $clubid ? $this->db->query("select `s3`,vd_duration as dur,id,type as extension,vd_external as external,vd_name as title,filename,userid,views from ".tbl_communities_pics." where `id`='{$video_id}' limit 1") 
	: $this->db->query("select `s3`,dur,id,extension,`external`,title,filename,userid,views from ".tbl_videos." where `id`='{$video_id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	
	if(!$r){
	
	$no_videos = 1;
	
	} else {
	
	$video_meta_data['fn'][] = $clubid ? __COMMUNITIES_VIDEOS_DIR.$clubid.'/'.$r['filename'].$r['extension'] : __VD_DIR.$r['userid'].'/videos/'.$r['filename'].'.mp4';
	$video_meta_data['cv'][] = $clubid ? __COMMUNITIES_VIDEOS_DIR.$clubid.'/covers/'.$r['id'].'.png' : __VD_DIR.$r['userid'].'/thumbs/'.$r['id'].'.png';
	$video_meta_data['id'][] = $r['id'];
	$video_cover = $clubid ? '/videoCover?v='.$r['id'].'&clubid='.$clubid : '/videoCover?v='.$r['id'];
	$video_meta = $clubid ? __COMMUNITIES_VIDEOS_DIR.$clubid.'/' : __VD_DIR.$r['userid'].'/videos/';
	$video_a_href = $clubid ? '/video?vid='.$r['id'].'&cmd=open&clubid='.$clubid : '/video?vid='.$r['id'].'&cmd=open';
	$vd_clubid = $clubid ? $clubid : false;
	$string_videos .= 	'<div id="videojw_'.$r['id'].'" style="display:none;"></div>
	<div class="media-block media-video">
	<div class="vid-card vid-card__xl">
		<div class="vid-card_cnt h-mod" data-video-meta=\'{"vd_p":"'.$video_meta.'","vd_s3_userid":"'.$r['userid'].'","vd_s3":"'.$r['s3'].'","s3_url":"'.$this->s3_video_url.'","vd_clubid":"'.$vd_clubid.'","vd_title":"'.$r['title'].'","vd_fn":"'.$r['filename'].'","vd_i":"'.$r['id'].'","vd_ext":"'. ($r['extension'] == 'NULL' ? $r['external'] : $r['extension']).'"}\'>
			<div class="vid-card_cnt_w"><div class="video-card-cover" style="background-image:url('.$video_cover.');"></div><i class="vid_play"></i><i class="vid-card_duration">'.$r['dur'].'</i></div>
		</div>
		<div class="ellip video-card_n-w"><a href="'.$video_a_href.'" data-ivideo="1" class="video-card_n ellip">'.$r['title'].'</a>
			<div class="video-card_info"><span class="video-card_info_i">'.$r['views'].'&nbsp;'.$this->lang['video_views'].'</span></div>
		</div>
	</div>
</div>
';
	
	
	/*'<div class="feed_video_cnt_pl">
   <video>
      <source type="video/mp4"  src="'.__VD_DIR.$r['userid'].'/videos/'.$r['filename'].'">
   </video>
</div>';*/
	

	
	
	//<video controls width="500" height="400"><source src="'.__VD_DIR.$r['userid'].'/videos/'.$r['filename'].'"></source></video>';
	}
	$c++;
	endforeach;
	
	return $no_videos ? ['0' => $this->feedItemNotFound('video'), '1' => ''] : [$string_videos,count($videos_arr)];
	
	
break;

// create songs
case 'tracks':

	//create tracks
	$songs_arr = array();
	$tracks_markup = '';
	$cc = 0;
$string = preg_replace_callback("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", function($id) use (&$songs_arr) { 
$songs_arr[] = $id[1];
return '';$ssongs > 4 ? '' : $song_markup;
}, $string);


if(count($songs_arr)){

foreach($songs_arr as $song):

if($cc >= 4) break;

// select info for respective song
$q = $this->db->query("select id,artist,title,album,cover,path as filename from ".tbl_songs." where `id`='{$song}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

$tracks_markup .= sprintf('<div class="track __media-status songpsh"><div class="track_hld soh-s"><span id="pm_sec_outsite_track_%s" class="track_play" data-track-inf=\'{"track":"%s","cover":"%s","artist":"%s","songname":"%s","albumname":"%s"}\' onclick="nobilMusicPlayOutsideTrack(this,event)"></span><div class="track_cnt textWrap"><span class="track_song ellip"><A onclick="nobilMusicSearch(\'%s\');">%s</a> - <A onclick="nobilMusicSearch(\'%s\');">%s</a> <span class="foh-s track_info"> %s <a onclick="nobilMusicSearch(\'%s\');" class="track_album">%s</a></span></span></div></div></div>'
,$r['id'],$r['filename'],$r['cover'],$r['artist'],$r['title'],$r['album'],$r['artist'],$r['artist'],$r['title'],$r['title'],$this->lang['from'],$r['album'],$r['album']);

$cc++;
endforeach;


}

return count($songs_arr) ? [$tracks_markup,count($songs_arr)] : ['0' => $this->feedItemNotFound('song'), '1' => ''];

break;

 

// generate poll
case 'poll':

	$poll = '';

	$string = preg_replace_callback("/\[poll\]((\s|.)+?)\[\/poll\]/i", function($id) use (&$poll) {
	
	$id = $id[1];
	$poll = $this->getPollMarkup($id);
	return '';
	
	},$string);
	

return $poll;
break;

// get cover of first song
case 'songs_cover':
$songs_id = array();
$response = '';
$string = preg_replace_callback("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", function($id) use (&$songs_id) { 
$songs_id[] = $id[1];
return '';
}, $string);

if(count($songs_id)){
	$first_song_id = $songs_id[count($songs_id)-1];
	$q = $this->db->query("select cover from ".tbl_songs." where `id`='{$first_song_id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	$response = !empty($r['cover']) ? $r['cover'] : '';	
}
return $response;
break;

// create links
case 'links':

    $lk_video = $lk_image = $lk_url = '';
	$link_markup = array();
	$cnt = '';
	// create links
	$string  = preg_replace_callback("/\[postLink\]((\s|.)+?)\[\/postLink\]/i", function($id) use (&$link_markup) {
		global $lk_video,$lk_image,$lk_url;
		
		// select info about the link
		$q = $this->db->query("select * from ".tbl_slinks." where `id`='{$id[1]}' order by id desc limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		if(count($r)){
		
		$d = json_decode($r['data'],true);

		$is_video = isset($d['type']) ? ($d['type'] == 'video' ? '<div class="preview-link-has-video"><div class="preview-v-play-ic"></div></div>' : '') : '';
		$no_image = isset($d['image']) ? ($d['image'] != '' ? '' : '__noimage') : '__noimage';
		$is_image = isset($d['image']) ? ($d['image'] != '' ? '<img src="'.$d['image'].'">' : '') : '';
		$is_title = isset($d['title']) ? (!empty($d['title']) ? $d['title'] : '') : '';
		$is_descr = isset($d['description']) ? (!empty($d['description']) ? $d['description'] : '') : '';
		$is_url = isset($d['url']) ? (!empty($d['url']) ? $d['url'] : '') : '';
		$is_site_name = isset($d['site_name']) ? (!empty($d['site_name']) ? $d['site_name'] : '') : '';
		$is_only_img = isset($d['type']) ? ($d['type'] == 'image' ? $d['image'] : '') : '';
		$is_only_video = isset($d['type']) ? ($d['type'] == 'video' ? $d['image'] : '') : '';
		
		if($is_only_img){
		
			$lk_image = sprintf('<div class="stpreview-only-image">
			<img class="stpost_url_only_image" onerror="this.src=\'/css/images/BrailleFilled-64.png\';" src="%s">
			</div>',$is_only_img);
			

			$link_markup['images'][] = $is_only_img;///$lk_image;
			
		}else if ($is_only_video){
			
			$lk_video = '<div id="videojw_'.$r['id'].'" style="display:none;"></div>
	<div class="media-block media-video">
	<div class="vid-card vid-card__xl">
		<div class="vid-card_cnt h-mod" data-video-meta=\'{"vd_p":"'.$d['video:url'].'","vd_title":"'.$d['title'].'","vd_cv":"'.$d['image'].'","vd_i":"'.$r['id'].'","vd_external":"'.$d['site_name'].'"}\'>
			<div class="vid-card_cnt_w"><div class="video-card-cover" style="background-image:url('.$d['image'].');"></div><i class="vid_play"></i><i class="vid-card_duration">08:30</i></div>
		</div>
		<div class="video-card_n-w"><a href="/video/64979045285984-1" class="video-card_n ellip">'.$d['title'].'</a>
			<div class="video-card_info"><span class="video-card_info_i">'.$d['description'].'</span></div>
			<div class="video-card_info"><span class="video-card_info_i">0&nbsp;views</span>
			</div>
		</div>
	</div>
</div>
';
			
			
			
			/*sprintf('<div class="stpos_video"><div class="preview-link-has-video __onlyvid"><div class="preview-v-play-ic"></div></div>
			<div class="video-prv-cover" style="background-image:url(%s);"></div><div class="video-title-c stpost">%s</div></div>'
			,$is_only_video,$is_title);*/

		

			$link_markup['videos'][] = $lk_video;

		}else{
		$lk_url = sprintf( '<a class="ext_lnk_href" title="%s" href="/r?u=%s" target="_blank"><div class="shared-post_url_preview soh-s" id="su-%s">
									
									<div class="link-preview-image-thumb %s">
									%s %s</div>
									<div class="preview-info-cnt">
									<div class="link-preview-title ellip textWrap">%s</div>
									<div class="link-preview-description textWrap">%s</div>
									<div class="link-preview-site-name textWrap"><a href="/r?u=%s">%s</a></div>
									</div>
									
									</div></a>
									',$is_site_name,$is_url,$r['id'],$no_image,$is_video,$is_image,$is_title,$is_descr,$is_url,$is_site_name);
		

			$link_markup['urls'][] = $lk_url;
		}
		
		}
	

		return '';
	}, $string);

    $count_image_nm = 0;
	if( isset($link_markup['images']) && count($link_markup['images']) ){
		
		$img_count = count($link_markup['images']);
		if($img_count >= 3){
		$cnt .= '<div class="m-r"><div id="'.mt_rand(1000,99999).'" class="nobleSlider nb-feed-post-images"><div class="nb-slides">';//'<div class="feed_image_collage __'.count($link_markup['images']).'">';
		foreach($link_markup['images'] as $image_url):
		if($count_image_nm >= 5) break;
		$cnt .= '		<div class="nb-slide">
					<img class="nb-image" src="'.__SLIDER_BLANK.'"
					data-src="'.$image_url.'"/>

				
			</div>'; //'<a href="'.$image_url.'" class="photos_sh collage"><img src="'.$image_url.'" /></a>';
		$count_image_nm++;
		endforeach;
		$cnt .= '</div></div></div>';
		
		} else {
		
		$cnt .= '<div class="feed_image_collage __'.$img_count.'">';
		foreach($link_markup['images'] as $image_url):
		$cnt .= '<a href="'.$image_url.'" class="photos_sh collage"><img src="'.$image_url.'" /></a>';
		endforeach;
		$cnt .= '</div>';
		
		}
	}
	if( isset($link_markup['videos']) && count($link_markup['videos'])  ){
		foreach($link_markup['videos'] as $html):
		$cnt .= $html;
		endforeach;
		
	}
	if( isset($link_markup['urls']) && count($link_markup['urls']) ){
	
		foreach($link_markup['urls'] as $html):
		$cnt .= $html;
		endforeach;
		
	}

	
return $cnt;
break;

}

}

// select cover for last video
public function selectCoverForLastVideo($userid){
	
	if(is_numeric($userid)){
		$cover = $this->db->query("Select id from ".tbl_videos." where `userid`='{$userid}' order by added desc limit 1");
		$cover = $cover->fetch_array(MYSQLI_ASSOC);
	}
	
	return isset($cover) && $cover['id'] > 0 ? $cover['id'] : 0;
	
}


// profile albums page
public function profile_photos_page( $uid = '',$profileName = ''){

$pPhotos = $all_photos_q = $query = '';

$user = $this->checkUserCredential($uid,$profileName);
$i = isset($this->USER['id']) ? $this->USER['id'] : 0;

$user_small_photo = $this->getUserPhoto($user,'small');
///$userPhotos = $this->getUPhotos($user,'ORDER BY position DESC, added ASC');
$photoCounts = @explode(';',$this->gUserCountPhotos($uid));
$personalPhotoCounts = $photoCounts[0];
$albumPhotoCounts = $photoCounts[1];
$photos = ($personalPhotoCounts || $albumPhotoCounts) > 0 ? 1 : 0;
$userAddPhoto =  $photos ? 'small' : 'big';
$addPhoto = $this->theme_dir."/profile/addPhotos/add-photo-{$userAddPhoto}.html";
$pAddr = __IMG_DIR.$user['id'];
$mediumPath = $pAddr.'/medium/';
$smallPath = $pAddr.'/small/';
$thumbPath = $pAddr.'/thumb/';



if($photos){

// select user's albums
$sql = "select * from ".tbl_albums." where userid='".$user['id']."' order by added desc";
$query = $this->query_select($sql);

$all_photos_q = $this->query_select("select DISTINCT COUNT(distinct lb.id) as lbyme,COUNT(distinct l.id) as lc,COUNT(distinct c.id) as kc,p.id,.p.userid,p.albumid,a.name,p.albumid,p.added from ".tbl_photos." p
left join ".tbl_albums." a ON a.id=p.albumid
left join ".tbl_klass." l ON l.itemid=p.id and l.type='photo'
left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid='".$this->USER['id']."'
left join ".tbl_comments." c ON c.itemid=p.id and c.categ='photo'
where p.userid='{$uid}' group by p.id order by p.added desc limit ".$this->settings['PROFILE_WALL_PHOTOS_LIMIT']);

// select videos
$all_videos_q = $this->query_select("

    SELECT 
	v.id as vid, v.added as added,v.dur as dur,v.title as vtitle, v.external as external, v.userid as vuserid,COUNT(l.id) as lbyme, COUNT(l_c.id) as lc, COUNT(c.id) as kc 
      FROM ".tbl_videos." v
	left join ".tbl_klass." l ON l.itemid=v.id and l.type='video' and l.userid='{$i}'
	left join ".tbl_klass." l_c ON l_c.itemid=v.id and l_c.type='video'
	left join ".tbl_comments." c ON c.itemid=v.id and c.categ='video'
	  
	  where v.userid='{$uid}'
	  
     GROUP BY v.id
	 order by v.added desc
	 limit ".$this->settings['PROFILE_WALL_PHOTOS_LIMIT']);
	 


// extract items from array & join it into single array
for($i=0;$i<sizeof($all_videos_q);$i++):
array_push($all_photos_q,$all_videos_q[$i]);
endfor;

// there we have videos + photos, there is all videos separated by photos
// so here will sort videos & photos like (mysql:: order by)
$sort = array();
foreach($all_photos_q as $k=>$v) {
    $sort['added'][$k] = $v['added'];
}

array_multisort($sort['added'], SORT_DESC, $all_photos_q);

// select cover for personal album
////$cv_p_album = $this->db->query("select id from ".tbl_photos." where `userid`='{$uid}' and albumid='0' order by position asc, added desc limit 1");
$cv_p_album = $this->getPphotoCover($uid);///$cv_p_album->fetch_array(MYSQLI_ASSOC);
}

if(!empty($all_photos_q) && sizeof($all_photos_q)){
$pPhotos = $all_photos_q['0'];
}

//echo 'ESSS---'.$all_photos_q['17']['id'];
//print_r($all_photos_q);
$this->template->assign(['this' => $this,
 'query' => $query,
 'alb_count'=>sizeof($query),
 'all_photos_q' => $all_photos_q,
 'personalPhotos' => isset($cv_p_album) ? $cv_p_album : '',
 'thumbPath' => $thumbPath,
 'smallPath' => $smallPath,
 'mediumPath' => $mediumPath,
 'countPhotosA' => $albumPhotoCounts,
 'countPhotosP' => $personalPhotoCounts,
 'is_photos' => $photos,
 'user' => $user,
 '_addPhoto' => $addPhoto,
 'small_photo' => $user_small_photo,
 '_usermenu' => $this->theme_dir.$this->menuFile,
 '_wideMenu' => $this->theme_dir.$this->wideMenu
]);
$content = $this->template->fetch( $this->theme_dir.'/profile/photos.html');

echo $this->getPage($content);
}

// get 4 small photos for album hover event
public function getAlbumHoverPhotos($albumid, $uid){
	$result = array();
	$albumid = (int) $albumid;
	if(is_numeric($albumid) && is_numeric($uid) && $uid > 0 )
	{
		
		$result = $this->query_select("select id as pid from ".tbl_photos." where `albumid`='{$albumid}' and `userid`='{$uid}' order by id desc limit 4");
		
		
	}
	return $result;
}

// check if the user have deleted photos
public function checkForTrashAlbum(){
	
	$c = $this->db->query("select COUNT(*) from ".tbl_deleted_photos." where `userid`='{$this->userid}'");
	$c = $c->fetch_row();
	return $c[0];
}

// generate random size for images from profile
public function generateRandomImageSize($numb){
$rand_a = mt_rand(0,1);
$rand_b = mt_rand(0,9);
return $numb > 100 ? ($numb / 100) * 68 : $numb;//$numb/floatVal('1.'.mt_rand(100000,9999999999));//"$rand_a.$rand_b";
}

// get gifts count
public function getUserGiftsCount($user_id,$filter = ''){
$i = $user_id ? $user_id : $this->USER['id'];

$q = $this->db->query("select COUNT(*) from ".tbl_ugifts." where `userid`='{$i}' ".$filter);
$q = $q->fetch_row();
$c = $q[0];
return $c;
}

// profile's gifts page
public function profile_gifts_page( $uid = '',$profileName = ''){

$pPhotos = "";
$filter = isset($_GET['filter']) ? $this->test_input($_GET['filter']) : '';
$f = $filter;
 
$user = $this->checkUserCredential($uid,$profileName);

$user_small_photo = $this->getUserPhoto($user,'small');

$pAddr = __IMG_DIR.$user['id'];
$mediumPath = $pAddr.'/medium/';
$smallPath = $pAddr.'/small/';
$thumbPath = $pAddr.'/thumb/';



switch($filter){
	
	case 'anonym':
	$filter = "and ug.anonym='yes'";
	break;
	
	case 'private':
	$filter = "and ug.private='yes'";
	break;

}


$gifts_count = $this->getUserGiftsCount($user['id'],str_replace('ug.','',$filter));
	$sql = "select g.*, ug.fromuser, ug.private, ug.anonym, u.fullname, u.id as uid from ".tbl_ugifts." ug 
	
	left join ".tbl_gifts." g ON g.id = ug.gift_id
	left join ".tbl_users." u ON u.id = ug.fromuser
	
	where ug.userid='".$user['id']."' ".$filter." group by ug.id
	order by ug.added desc";
	
	$page_url = '/user/gifts/'.$user['id'].'/page/%s';
	
	$query = $this->pagination(16,true,$page_url,$sql,$gifts_count);
 

$this->template->assign([
							 'query' => $query[0],
							 'pagination' => $query[1],
							 'g_count' => $gifts_count,
							 'this' => $this, 
							 'filter' => $f, 
							 'thumbPath' => $thumbPath,
							 'smallPath' => $smallPath,
							 'mediumPath' => $mediumPath,
							 'user' => $user, 
							 'small_photo' => $user_small_photo, 
							 '_usermenu' => $this->theme_dir.$this->menuFile,
							 '_wideMenu' => $this->theme_dir.$this->wideMenu
 
 ]);


$content = $this->template->fetch($this->theme_dir.'/profile/user-gifts.html');

echo $this->getPage($content);
}

// profile's groups page
public function profile_about_page( $uid = '',$profileName = ''){

$pPhotos = "";
 

$user = $this->checkUserCredential($uid,$profileName);

$user_small_photo = $this->getUserPhoto($user,'small');

$pAddr = __IMG_DIR.$user['id'];
$mediumPath = $pAddr.'/medium/';
$smallPath = $pAddr.'/small/';
$thumbPath = $pAddr.'/thumb/';


$this->template->assign([
							 'relative_friends' => $this->getUserRelativeFriends($user['id'],6),
							 'this' => $this,
							 'thumbPath' => $thumbPath,
							 'smallPath' => $smallPath,
							 'mediumPath' => $mediumPath,
							 'user' => $user, 
							 'small_photo' => $user_small_photo, 
							 '_usermenu' => $this->theme_dir.$this->menuFile,
							 '_wideMenu' => $this->theme_dir.$this->wideMenu
 
 ]);


$content = $this->template->fetch($this->theme_dir.'/profile/about.html');

echo $this->getPage($content);
}

// profile's groups page
public function profile_groups_page( $uid = '',$profileName = ''){

$pPhotos = "";
$f = isset($_GET['filter']) ? $this->test_input($_GET['filter']) : '';

$user = $this->checkUserCredential($uid,$profileName);

$user_small_photo = $this->getUserPhoto($user,'small');

$pAddr = __IMG_DIR.$user['id'];
$mediumPath = $pAddr.'/medium/';
$smallPath = $pAddr.'/small/';
$thumbPath = $pAddr.'/thumb/';
$c_class = new _COMMUNITIES;
$groups_count = $this->userGroupsCount($user['id']);

	$sql = "select c.* from ".tbl_communities_followers." f, ".tbl_communities." c
	where c.id = f.group_id and f.userid='".$user['id']."' group by c.id
	order by created desc";
	$page_url = '/groups/'.$user['id'].'/page/%s';
	$query = $this->pagination($this->settings['COMMUNITIES_LIMIT'],true,$page_url,$sql,$groups_count);
 

$this->template->assign([
							 'query' => $query[0],
							 'pagination' => $query[1],
							 'g_count' => $groups_count,
							 'this' => $this, 
							 'filter' => $f, 
							 'thumbPath' => $thumbPath,
							 'smallPath' => $smallPath,
							 'mediumPath' => $mediumPath,
							 'user' => $user, 
							 'small_photo' => $user_small_photo, 
							 '_usermenu' => $this->theme_dir.$this->menuFile,
							 '_wideMenu' => $this->theme_dir.$this->wideMenu,
							 'com' => $c_class,
							'community_default_image' => __COMMUNITIES_DEFAULT_IMAGE,
							'group_small_logo_path' => $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/',
							'group_covers_path' => $this->settings['HOST'].__COMMUNITIES_COVERS_DIR
 
 ]);


$content = $this->template->fetch($this->theme_dir.'/profile/groups.html');

echo $this->getPage($content);
}


// profile's friends
public function profile_friends_page( $uid = '',$profileName = '', $f = ''){

$pPhotos = "";

$user = $this->checkUserCredential($uid,$profileName);

$user_small_photo = $this->getUserPhoto($user,'small');

$pAddr = __IMG_DIR.$user['id'];
$mediumPath = $pAddr.'/medium/';
$smallPath = $pAddr.'/small/';
$thumbPath = $pAddr.'/thumb/';


$mode = isset($_GET['mode']) ? $this->test_input($_GET['mode']) : '';
$list = isset($_GET['list']) ? true : false;
$key = isset($_GET['key']) ? $this->test_input($_GET['key']) : '';


$this->template->assign([

							 'this' => $this, 
							 'filter' => $f, 
							 'list' => $list,
							 'thumbPath' => $thumbPath,
							 'smallPath' => $smallPath,
							 'mediumPath' => $mediumPath,
							 'user' => $user, 
							 'small_photo' => $user_small_photo, 
							 '_usermenu' => $this->theme_dir.$this->menuFile,
							 '_wideMenu' => $this->theme_dir.$this->wideMenu, 
							 'mode' => $mode, 
							 'mdo' => $mode ? '&mode='.$mode : '', 
							 'key' => $key
 
 ]);


$content = $this->template->fetch($this->theme_dir.'/friends/index.html');

echo $this->getPage($content);
}

// rewrite relationships name
public function rewriteRelationships($r){
$b = array("relative","colleague","best","classmate","coursemate","army","childhood");
$c = array($this->lang['relatives'],$this->lang['colleagues'],$this->lang['best_friends'],
$this->lang['classmates'],$this->lang['coursemates'],$this->lang['army_friends'],$this->lang['who_you_are_playing_with']); 
return str_replace($b,$c,$r);
}

public function myFriendRelationName($str,$md){

$arr = $cnm = $rnm = array();
$r = '';
$str_ex = strpos($str,',') ? explode(",",$str) : $str;

if (is_array($str_ex) || ($str_ex instanceof Traversable)){
for($i = 0; $i < sizeof($str_ex);$i++):
$a = $str_ex[$i];
if($a !== "playing_together" 
   && $a !== "best_friend"
   && $a !== "colleague"
   && $a !== "classmate"
   && $a !== "coursemate"
   && $a !== "army_friend")
   $rnm[] = $a;

endfor;

} else $rnm[] = $str;


if($md == 'relative')
$r = isarray($rnm) && isset($rnm['0']) ? $rnm['0'] : '';


return $this->rltReplc($r);
}

public function rltReplc($str){
$a = array(

// relative
"relative",

// female gender
 "mother", "sister", "aunt", "niece", "mother-in-law", "daughter-in-law", "godmother", "goddaughter",

// male gender
"father", "brother", "uncle", "nephew", "grandfather", "father-in-law", "son-in-law", "godfather", "godson",

"playing_together","best_friend","colleague","classmate","coursemate","army_friend");


$b = array( $this->lang['relative'], $this->lang['mother'], $this->lang['sister'], $this->lang['aunt'],
 $this->lang['niece'], $this->lang['mother-in-law'], $this->lang['daughter-in-law'], $this->lang['godmother'], $this->lang['goddaughter'],
 $this->lang['father'], $this->lang['brother'], $this->lang['uncle'], $this->lang['nephew'], $this->lang['grandfather'],
 $this->lang['father-in-law'], $this->lang['son-in-law'], $this->lang['godfather'], $this->lang['godson'], $this->lang['playing_together'],
 $this->lang['best_friend'], $this->lang['colleague'], $this->lang['classmate'], $this->lang['coursemate'], $this->lang['army_friend']
 );

return str_replace($a,$b,$str);
}

// last added friends (special for friends page)
public function lastAddedFriends($uid){

$q = $this->query_select("select u.id,u.fullname,u.profile_photo,u.gender from ".tbl_users." u, ".tbl_friends." f 
			  where u.id = f.friendid and f.userid='$uid' and f.status='confirmed'
			  order by f.added desc limit 10");
return $q;
}

// sql find in set for friends relationship
private function relationshipFindInSet(){
return 			        "FIND_IN_SET('relative', f.relationship) OR
				 FIND_IN_SET('father', f.relationship) OR
				 FIND_IN_SET('son', f.relationship) OR
				 FIND_IN_SET('daughter', f.relationship) OR
				 FIND_IN_SET('brother', f.relationship) OR
				 FIND_IN_SET('uncle', f.relationship) OR
				 FIND_IN_SET('nephew', f.relationship) OR
				 FIND_IN_SET('grandfather', f.relationship) OR
				 FIND_IN_SET('father-in-law', f.relationship) OR
				 FIND_IN_SET('son-in-law', f.relationship) OR
				 FIND_IN_SET('godfather', f.relationship) OR
				 FIND_IN_SET('godson', f.relationship) OR
				 FIND_IN_SET('mother', f.relationship) OR
				 FIND_IN_SET('sister', f.relationship) OR
				 FIND_IN_SET('aunt', f.relationship) OR
				 FIND_IN_SET('niece', f.relationship) OR
				 FIND_IN_SET('mother-in-law', f.relationship) OR
				 FIND_IN_SET('daughter-in-law', f.relationship) OR
				 FIND_IN_SET('godmother', f.relationship) OR
				 FIND_IN_SET('goddaughter', f.relationship)";
}

// generate queries for relationship betwen friends
public function friendRelationship($relat,$uid,$count = 0){
$i = $this->USER['id'];

$find_in_set = $this->relationshipFindInSet();
if($relat == 'relative'){

$sql = "select f.id from ".tbl_friends." f 
			  where f.friendid = '{$uid}' and f.status='confirmed'
			  and (
				$find_in_set
				)
			  
			  order by f.added desc";

} else {

$sql = "select f.id from ".tbl_friends." f 
			  where f.friendid = '$uid' and f.status='confirmed' and
			  FIND_IN_SET('$relat', f.relationship)
			  
			  order by f.added desc limit 10";

}

$query = $count ? $this->db->query($sql) : $this->query_select($sql);
$res = $count ? $query->num_rows : $query;
return $res;//count($this->query_select($sql));
}

// get friends of respective user
public function fr_pg_Friends($uid,$filter = '',$relationship = ''){
$flimit = $this->settings['FRIENDS_PER_PAGE_LIMIT']; // from settings
$f = !empty($filter) ? " and (u.name LIKE '".$filter."%' OR u.surname LIKE '".$filter."%') " : "";
$find_in_set = $this->relationshipFindInSet();


// bad relationship replace with that are in database
$rplc_relat = array("best","army","childhood");
$rplc_dtbas = array("best_friend", "army_friend", "playing_together");
$relationship = str_replace($rplc_relat,$rplc_dtbas,$relationship);

// online interval (minutes)
$on_int = strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");

//IN (select friendid from ".tbl_friends." where `userid`='$uid' and status='confirmed') 
if(!$relationship){
$q = $this->query_select("select u.id,u.fullname,u.profile_photo,u.online,u.text_post,u.gender,f.relationship from ".tbl_users." u, ".tbl_friends." f
			   
			  where u.id = f.friendid and f.userid = '{$uid}' and f.status='confirmed'
			  ".$f."
			  group by u.id
			  order by id desc ". (!$f ? "limit ".$flimit : "") );

} else {

switch($relationship){

case 'relative':

$q = $this->query_select("select u.id,u.fullname,u.profile_photo,u.online,u.gender,u.text_post,f.relationship from ".tbl_users." u, ".tbl_friends." f
			   
			  where u.id = f.friendid and f.userid = '{$uid}' and f.status='confirmed'
			  and (
				 $find_in_set
				)
			  
			  order by RAND() desc ");

break;

case 'online':

$q = $this->query_select("select u.id,u.fullname,u.profile_photo,u.online,u.gender,f.relationship,u.text_post from ".tbl_users." u, ".tbl_friends." f
			  
			  where u.id = f.friendid and f.userid = '$uid' and f.status='confirmed'
			  and u.online > '$on_int'			
			  order by RAND() desc ");

break;

default:

$q = $this->query_select("select u.id,u.fullname,u.profile_photo,u.online,u.gender,f.relationship,u.text_post from ".tbl_users." u, ".tbl_friends." f
			   
			  where u.id = f.friendid and f.userid = '$uid'  and f.status='confirmed'
			  and FIND_IN_SET('$relationship', f.relationship) 			
			  order by RAND() desc ");

break;

}




}

return $q;
 

}

// get friends using list group by alphabet
public function friendGroupAlphabetically($uid,$filter ='',$relationship = ''){
$flimit = $this->settings['FRIENDS_PER_PAGE_LIMIT']; // from settings
$find_in_set = $this->relationshipFindInSet();


// bad relationship replace with that are in database
$rplc_relat = array("best","army","childhood");
$rplc_dtbas = array("best_friend", "army_friend", "playing_together");
$relationship = str_replace($rplc_relat,$rplc_dtbas,$relationship);

// online interval (minutes)
$on_int = strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");

if(!$relationship){
$q = $this->query_select("
SELECT SUBSTRING(u.name, 1, 1) as alpha, u.id,u.fullname,u.profile_photo,u.online,u.text_post,u.gender,f.relationship
 from ".tbl_users." u,".tbl_friends." f
  
			  where u.id = f.friendid and f.userid = '$uid' and f.status='confirmed'
			  
 GROUP BY u.id order by alpha, u.name asc limit 
".$flimit);

} else {

switch($relationship){

case 'relative':

$q = $this->query_select("


SELECT SUBSTRING(u.name, 1, 1) as alpha, u.id,u.fullname,u.profile_photo,u.online,u.gender,f.relationship,p.id as pid, p.text as ptext, p.type as ptype
 from ".tbl_users." u, ".tbl_friends." f
 left join ".tbl_posts." p ON p.userid = f.friendid AND p.available='yes' 
where u.id = f.friendid and f.userid = '$uid' and f.status='confirmed'

			  and (
				 $find_in_set
				)
	  
 GROUP BY u.id order by alpha

, u.name asc ");

break;

case 'online':

$q = $this->query_select("
SELECT SUBSTRING(u.name, 1, 1) as alpha, u.id,u.fullname,u.profile_photo,u.online,u.gender,f.relationship,p.id as pid, p.text as ptext, p.type as ptype
 from ".tbl_users." u, ".tbl_friends." f
 left join ".tbl_posts." p ON p.userid = f.friendid AND p.available='yes' 
where u.id = f.friendid and f.userid = '$uid' and f.status='confirmed' and u.online > '$on_int'
			  
 GROUP BY u.id order by alpha, u.name asc");


break;

default:

$q = $this->query_select("
SELECT SUBSTRING(u.name, 1, 1) as alpha, u.id,u.fullname,u.profile_photo,u.online,u.gender,f.relationship,p.id as pid, p.text as ptext, p.type as ptype
 from ".tbl_users." u, ".tbl_friends." f
 left join ".tbl_posts." p ON p.userid = f.friendid AND p.available='yes' 
where u.id = f.friendid and f.userid = '$uid' and f.status='confirmed' and FIND_IN_SET('$relationship', f.relationship) 
			  
 GROUP BY u.id order by alpha, u.name asc");

break;

}


}


return $q;
}

// get alphabet for friends name
public function getAlpha($uid){

$a = array();
$q = $this->query_select("
SELECT SUBSTRING(u.name, 1, 1) as alpha, u.id,u.fullname,u.profile_photo
 from ".tbl_users." u
			  where u.id IN (select friendid from ".tbl_friends." where `userid`='$uid' and status='confirmed') 
			  
 GROUP BY u.id order by alpha, u.name asc");

///$this->friendGroupAlphabetically($uid);
foreach($q as $r)
$a[] = strtoupper($r['alpha']);

$this->template->assign( ['this'=> $this, 'a' => $a] );
echo $this->getPage($this->template->fetch($this->theme_dir.'/alpha/alphabet.html'));

}




public function profile_update_sort(){

    $data = $_POST['photo'];
    $albId = !empty($_POST['alb']) ? $this->test_input($_POST['alb']) : '0';

    $i = 0;
    foreach ($data as $id) {
        $id = $this->test_input($id);
        $repositPhotos = $this->query_update("update ".tbl_photos." set `position` = '{$i}' where `id`='{$id}' AND `userid`='".$this->USER['id']."' AND `albumid`=" . $albId);
        
        $i++;
    }
    echo 1;

}
public function profile_sort_photos($album = ''){

$query = $album ? $this->getUPhotosA($this->USER,$album,'ORDER BY position ASC, added DESC') : $this->getUPhotos($this->USER,'ORDER BY position ASC, added DESC');
$user_small_photo = $this->getUserPhoto($this->USER,'small');
$sortIn = $album ? $album : 'personal';
$goBack = $album ? "/profile?q=".$this->USER['id']."&cmd=album&i=".$album."&nav=photos" : "/profile?q=".$this->USER['id']."&cmd=pphotos&nav=photos";
$this->template->assign(['user' => $this->USER, 'query' => $query, 'bk' => $goBack, 'act' => $sortIn, 'gPhoto' => $this->gPhoto, 'this' => $this,
 'small_photo' => $user_small_photo, '_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu]);
$content = $this->template->fetch($this->theme_dir.'/profile/sort_photos.html');
echo $this->getPage($content);

}
public function verifyOwnerPhoto($pid){
// check if the picture 
$verify = $this->db->query("select id,filename,`s3`,`userid` from ".tbl_photos." where id='{$pid}' and userid='".$this->USER['id']."' limit 1");
$res = $verify->fetch_array(MYSQLI_ASSOC);

return $res;
}

// crop photo
public function crop_photo($filename,$photoId = 0,$s3 = false, $owner = 0){

$result = 0;

// x & y
$c_x = isset($_POST['cr__x']) ? (int) $this->test_input($_POST['cr__x']) : '';
$c_y = isset($_POST['cr__y']) ? (int) $this->test_input($_POST['cr__y']) : '';

// x2 && y2
$c_xx = isset($_POST['cr__x2']) ? (int) $this->test_input($_POST['cr__x2']) : '';
$c_yy = isset($_POST['cr__y2']) ? (int) $this->test_input($_POST['cr__y2']) : '';

// width & height
$c_w = isset($_POST['cr__w']) ? (int) $this->test_input($_POST['cr__w']) : '';
$c_h = isset($_POST['cr__h']) ? (int) $this->test_input($_POST['cr__h']) : '';

// IMG fake width & IMG fake height
$c_fake_w = isset($_POST['cr__w2']) ? (int) $this->test_input($_POST['cr__w2']) : '';
$c_fake_h = isset($_POST['cr__h2']) ? (int) $this->test_input($_POST['cr__h2']) : '';

// IMG original width & IMG original height
$c_orig_w = isset($_POST['cr__w3']) ? (int) $this->test_input($_POST['cr__w3']) : '';
$c_orig_h = isset($_POST['cr__h3']) ? (int) $this->test_input($_POST['cr__h3']) : '';


if($c_x < 0 || $c_y < 0 || $c_xx < 0 || $c_yy < 0 || $c_w < 0 || $c_h < 0){
$result = 0;

} else if ($s3) {
$owner = $this->USER['id'];
$htps = HTTPS_ON ? 'https://' : 'http://';
$smThSize = '';
$src = __ROOT__.'/stcmd/s3_crop/'.$owner.'/';
$s3_result = 0;

if(!file_exists($src))
	mkdir($src,0777,true);

$nArr = array("0" => $this->pSize['small'], "1" => $this->pSize['thumb']);

///$s3_url = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uphoto/'.$owner.$nArr[$i]. $filename;
$s3_url_large_img = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/uphoto/'.$owner.'/large/'. $filename;

 

// Open the file to get existing content
$data = file_get_contents($s3_url_large_img);

// New file
$s3_large_on_local = $src.$filename;

// Write the contents back to a new file
if(file_put_contents($s3_large_on_local, $data)){




$createFromLargeImg = $s3_large_on_local;//$src.$this->pSize['large'].$filename;



for($i = 0;$i<sizeof($nArr); $i++):

$folder = $src.$nArr[$i];

if(!file_exists( $folder ))
	mkdir($folder,0777,true);


$newImg = $folder.$filename;





if($nArr[$i] == '/thumb/')
$smThSize = $this->settings['THUMB_SIZE'];
else
$smThSize = $this->settings['SMALL_SIZE'];

$iSize = $iSize = $smThSize;
$Quality = 90;

$SrcImage = imagecreatefromjpeg($createFromLargeImg);
$NewCanves = ImageCreateTrueColor( $iSize, $iSize );


if(imagecopyresampled($NewCanves, $SrcImage, 0, 0, $c_x, $c_y, $iSize, $iSize,  $c_w, $c_h)) {
                $imageType = explode('.',$filename);

		switch(strtolower(end($imageType)))
		{
			case 'png':
				imagepng($NewCanves,$newImg);
				break;
			case 'gif':
				imagegif($NewCanves,$newImg);
				break;			
			case 'jpeg':
			case 'jpg':
			case 'pjpeg':
				imagejpeg($NewCanves,$newImg,$Quality);
				break;
			default:
				return false;
		}

	//Destroy image, frees memory	
	if(is_resource($NewCanves)) {
		
		imagedestroy($NewCanves);
		
		
		}
		$s3_folder = 'uphoto/'.$owner.$nArr[$i];
		$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/'.$s3_folder, $filename);
		
		if($delete) {
		$folderName = $s3_folder;  // path on s3 bucket.
		if($this->s3->putObjectFile($newImg, AWS_S3_BUCKET_NAME, $folderName.$filename, S3::ACL_PUBLIC_READ)){
			$s3_result =1; 
			unlink($newImg);
		}
		}
}


endfor; // for loop

if($s3_result)
unlink($src.$filename);

$result = $s3_result;


} else $result = 0;


} else {
	
	
	
$smThSize = '';
$src = __ROOT__.__IMG_DIR.$this->USER['id'].'/';
$nArr = array("0" => $this->pSize['small'], "1" => $this->pSize['thumb']);

for($i = 0;$i<sizeof($nArr); $i++){
$newImg = $src.$nArr[$i].$filename;
$createFromLargeImg = $src.$this->pSize['large'].$filename;

if($nArr[$i] == '/thumb/')
$smThSize = $this->settings['THUMB_SIZE'];
else
$smThSize = $this->settings['SMALL_SIZE'];

$iSize = $iSize = $smThSize;
$Quality = 90;

$SrcImage = imagecreatefromjpeg($createFromLargeImg);
$NewCanves = ImageCreateTrueColor( $iSize, $iSize );


if(imagecopyresampled($NewCanves, $SrcImage, 0, 0, $c_x, $c_y, $iSize, $iSize,  $c_w, $c_h)) {
                $imageType = explode('.',$filename);

		switch(strtolower(end($imageType)))
		{
			case 'png':
				imagepng($NewCanves,$newImg);
				break;
			case 'gif':
				imagegif($NewCanves,$newImg);
				break;			
			case 'jpeg':
			case 'jpg':
			case 'pjpeg':
				imagejpeg($NewCanves,$newImg,$Quality);
				break;
			default:
				return false;
		}

	//Destroy image, frees memory	
	if(is_resource($NewCanves)) {imagedestroy($NewCanves);}

}


} // for loop


$result = 1;

}

return $result;

}

// rotate image
public function rotateImage($angle, $photoId){

$result = 0;

if(!$photoId || !$angle) {
echo 0;
die;
}

$getImage = $this->db->query("select filename,extension from ".tbl_photos." where `id`='$photoId' and `userid`=".$this->USER['id']);
$res = $getImage->fetch_array(MYSQLI_ASSOC);

if($res['filename']){

$filename = $res['filename'];
$imageType = $res['extension'];
$src = __ROOT__.__IMG_DIR.$this->USER['id'].'/';
$nArr = array("0" => $this->pSize['small'], "1" => $this->pSize['thumb'], "2" => $this->pSize['medium'], "3" => $this->pSize['large'], "4" => $this->pSize['exp'], '5' => $this->pSize['grid']);


for($i = 0;$i<sizeof($nArr); $i++){
$newImg = $src.$nArr[$i].$filename;

$Quality = 100;
$angle = -90;


		switch(strtolower($imageType))
		{
			case 'png':
				$SrcImage = imagecreatefrompng($newImg);
				break;
			case 'gif':
				$SrcImage = imagecreatefromgif($newImg);
				break;			
			case 'jpeg':
			case 'jpg':
			case 'pjpeg':
				$SrcImage = imagecreatefromjpeg($newImg);
				break;
			default:
				$SrcImage = imagecreatefromjpeg($newImg);
		}

$rotate = imagerotate($SrcImage, $angle, 0);


		switch(strtolower($imageType))
		{
			case 'png':
				imagepng($rotate,$newImg);
				break;
			case 'gif':
				imagegif($rotate,$newImg);
				break;			
			case 'jpeg':
			case 'jpg':
			case 'pjpeg':
				imagejpeg($rotate,$newImg,$Quality);
				break;
			default:
				return false;
		}

	//Destroy image, frees memory	
	if(is_resource($rotate)) {imagedestroy($rotate);}




} // for loop

$result = 1;
}

echo $result;

}

// update description of photos
public function profile_update_photoDescr($descr,$photo){


$update = $this->query_update("update ".tbl_photos." set `info`='$descr' where `id`='$photo' and `userid`=".$this->USER['id']);

echo $update ? 1 : 0;

}

// set user's profile photo
public function profile_update_profPhoto($pid){

$res = $this->verifyOwnerPhoto($pid);



if(count($res) > 0 ){
	
$photo = $res['filename'];
$photoId = $res['id'];
$s3 = $res['s3'] == 'yes' ? true : false;
$picture_owner = $res['userid'];
$cropResult = $this->crop_photo($photo,$photoId,$s3,$picture_owner);

if($cropResult){

$query = $this->query_update("update ".tbl_users." set `profile_photo` = '{$photoId}' where id=".$this->USER['id']);

if($query)
echo $pid;
else
echo 0;

} else {

echo 0;

}

} else {
echo 0;
}

}

// get count of notifications
public function notifCount($type){

$i = $this->USER['id'];
if($type !== 'other')
$q = $this->db->query("select COUNT(*) as count from ".tbl_notif." where `categ`='{$type}' and `userid`='{$i}' and `unread`='no'");
else 
$q = $this->db->query("select COUNT(*) as count from ".tbl_notif." where `unread`='no' and  (`categ` = 'comment-like' || `categ`='other' || `categ`='photo_tags' || `categ`='photo_tag_request') && `userid`='{$i}'");


$r = $q->fetch_array(MYSQLI_ASSOC);
return $r['count'];
}

// build post in grades popup
public function gradesBuildPost($id){

$response = '';

// select post
$q = $this->db->query("select type,text from ".tbl_posts." where `id`='{$id}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

if($r){
	
	
if ($r['type'] == 'song'){
// select date of song
$sq = $this->db->query("select `artist`,`title` from ".tbl_songs." where `id`='".$r['text']."' limit 1");
$sq = $sq->fetch_array(MYSQLI_ASSOC);
$response = '<span class="ic ic_musical_note"></span>'.$sq['artist'].' - '.$sq['title'];
} else if (!preg_match('/[^A-Za-z0-9]/', $r['text'])){
	
	$response = $r['text'];
	
	
} else {
	
	$response = '';
}



}

return $response;

}
public function getCommunityId($id,$categ){
	
	$clubid = 0;
	switch($categ){
		
		case 'post':
		$x = $this->db->query("Select clubid from ".tbl_posts." where `id`='{$id}' and `community`='yes' limit 1");
		$x = $x->fetch_array(MYSQLI_ASSOC);
		$clubid = $x['clubid'];
		break;
		
	}
	return $clubid;
}
// update grades as viewed
public function upGrades($id){

// make as viewed
$this->query_update("update ".tbl_grades." set `viewed`='yes' where viewed='no' and `id`='{$id}'");


}

// popups
public function rpopup($name, $id = '', $userid = '', $page = 0){

$i = $this->USER['id'];
switch($name){


// change profile picture
case 'change-profile-photo':

 

 // get user's albums
 $albums_r = $this->query_select("select * from ".tbl_albums." where `userid`='{$i}' and `video`='no' order by added desc");
 

 $this->template->assign([ "this" => $this, "albums_r" => $albums_r ]);
 $content = $this->template->fetch($this->theme_dir.'/popups/p_change-profile-photo.html');

 echo $this->getPage($content);	
break;

// notifications
case 'Notif':

$this->template->assign(['this' => $this, 'notif' => $this->userNotifCount()]);
$content = $this->template->fetch($this->theme_dir.__POPUPS.'/p_notifications.html');
echo $this->getPage($content);

break;

case 'grades':

// for manually call
$limit_st = $this->settings['GRADES_LIMIT']; // from settings
$start = ($page * $limit_st) - $limit_st;
$limit = $page ? "limit {$start},{$limit_st}" : "limit ".$limit_st;

$q = $this->query_select("select 

	
				(
                   CASE WHEN g.type = 'stars' THEN 
                            (select COUNT(distinct id) from ".tbl_photo_rate." where id_photo=g.itemid)
                        ELSE 
                            (select COUNT(distinct id) from ".tbl_klass." where itemid=g.itemid and type=g.categ)
                        END
                ) as ks_count,
				(case WHEN g.categ = 'post' then (select id from ".tbl_posts." where id=g.itemid)END ) as status,
	
u.profile_photo,u.fullname,u.gender,u.id as uid,g.* from ".tbl_grades." g
left join ".tbl_users." u ON u.id=g.userid

where g.owner='{$i}' group by g.id order by g.added desc ".$limit);

// select count of new grades
$c_newGrades = $this->db->query("select COUNT(distinct id) as c from ".tbl_grades." where owner='{$i}' and viewed='no'");
$c_newGrades = $c_newGrades->fetch_array(MYSQLI_ASSOC);



$this->template->assign(['this' => $this, 'q' => $q, 'load_more' => ($page), 'count_new_grades' => $c_newGrades['c']]);
$content = $this->template->fetch($this->theme_dir.__POPUPS.'/p_grades.html');
if(!$page)echo $this->getPage($content);
else
return $content;
break;

// add album
case 'aAlbum':

$this->template->assign(['this' => $this]);
$content = $this->template->fetch($this->theme_dir.__POPUPS.'/p_add_album.html');
echo $this->getPage($content);

break;

// crop photos
case 'crop_photo':

$res = $this->verifyOwnerPhoto($id);

if(count($res) > 0 ){

$this->template->assign(['this' => $this, 'photo' => $id, 'gPhoto' => $this->gPhoto]);
$content = $this->template->fetch($this->theme_dir.__POPUPS.'/p_crop_photo.html');
echo $this->getPage($content);

} else echo 0;

break;

default: echo 0;

}

}

public function checkUserCredential($uid = '',$profileName = ''){


$user = $this->USER;
/*
if(!empty( $profileName )) 
$profileName = strtolower(str_replace(".", " ", $profileName));


if(!empty($uid))
$q = "`id`='{$uid}'";
else if(!empty($profileName))
$q = "LOWER(`username`)='{$profileName}'";
else if(!empty($profileName) && !empty($uid))
$q = "`id`='{$uid}' and LOWER(`username`)='{$profileName}'";
*/

$uid_to_username = strtolower($uid);
if($uid)
	$q = "`id`='{$uid}' || LOWER(`username`)='{$uid_to_username}'";
else 
$q = "`id`='".$user['id']."'";



$sql = "select * from ".tbl_users." where ".$q." limit 1";
$query = $this->db->query($sql);
$user = $query->fetch_array(MYSQLI_ASSOC);

if(count($user) <= 0)
$this->notFound();

return $user;

}
//get owner of the photo in tagged album
public function getOwnerOfPhotoInTaggedAlbum($photoid){

$cow = $this->db->query("select `userid` from ".tbl_photos." where `id`='{$photoid}' limit 1");
$cow = $cow->fetch_array(MYSQLI_ASSOC);

return $cow['userid'];

}

// get deleted photos , album "deleted photos"
public function profile_deleted_album($uid,$profileName = ''){
	
	$all_photos_q = $all_videos_q = array();
 
$all_photos_q = $this->query_select("select * from ".tbl_deleted_photos." where `userid`='{$uid}' order by id desc");

// select videos
$all_videos_q = $this->query_select("select id, videoid as vd_id, title,external,dur,time from ".tbl_deleted_videos." where `userid`='{$uid}' order by id desc");
	 
$photoCount = count($all_photos_q) + count($all_videos_q);

// extract items from array & join it into single array
for($i=0;$i<sizeof($all_videos_q);$i++):
array_push($all_photos_q,$all_videos_q[$i]);
endfor;

// there we have videos + photos, there is all videos separated by photos
// so here will sort videos & photos like (mysql:: order by)
$sort = array();
foreach($all_photos_q as $k=>$v) {
    $sort['added'][$k] = $v['time'];
}

array_multisort($sort['added'], SORT_DESC, $all_photos_q);
												
												
												
												


$user = $this->checkUserCredential($uid,$profileName);
$_notes = $this->theme_dir.$this->notesFile;
$this->template->assign([	'this' => $this,
							'user' => $user,
							'uid' => $uid,
							'pCount' => $photoCount,
							'_notes' => $_notes,
							'gPhoto' => $this->gph(),
							'query' => $all_photos_q,
							'_usermenu' => $this->theme_dir.$this->menuFile,
							'_wideMenu' => $this->theme_dir.$this->wideMenu
 ]);
$content = $this->template->fetch($this->theme_dir.'/profile/deleted_album.html');

echo $this->getPage($content);	
	
}



// get photos from [tagged by friends] album
public function profile_tagged_album($uid,$profileName = ''){


//$query = $this->query_select("select photoid from ".tbl_tag_album." where `userid`='$uid' order by id desc");
/*
$this->query_select("select COUNT(distinct lb.id) as lbyme,COUNT(distinct l.id) as lc,COUNT(distinct c.id) as kc,p.id,p.userid,p.filename,p.size,p.extension,p.position,p.added from ".tbl_photos." p
left join ".tbl_klass." l ON l.itemid=p.id and l.type='photo'
left join ".tbl_klass." lb ON lb.itemid=p.id and lb.type='photo' and lb.userid=p.userid
left join ".tbl_comments." c ON c.itemid=p.id and c.categ='photo'
where p.userid='".$user['id']."' and p.albumid='0' group by p.id ".$ord);
*/
/*
$query = $this->query_select("select COUNT(distinct lb.id) as lbyme,COUNT(distinct l.id) as lc,COUNT(distinct c.id) as kc, t.photoid as id, p.userid from ".tbl_tag_album." t
left join ".tbl_photos." p ON p.id=t.photoid
left join ".tbl_klass." l ON l.itemid=t.photoid and l.type='photo'
left join ".tbl_klass." lb ON lb.itemid=t.photoid and lb.type='photo' and lb.userid='".$this->USER['id']."'
left join ".tbl_comments." c ON c.itemid=t.photoid and c.categ='photo'

 where t.userid='{$uid}' group by t.id order by t.id desc");

*/
 $query = $this->query_select("select t.*,p.userid as photo_owner from ".tbl_tag_album."t
	left join ".tbl_photos." p ON p.id = t.photoid
 where t.userid='{$uid}' group by t.id order by t.id desc");
$photoCount = count($query);

$user = $this->checkUserCredential($uid,$profileName);
$_notes = $this->theme_dir.$this->notesFile;
$this->template->assign(['this' => $this, 'user' => $user, "uid" => $uid, 'pCount' => $photoCount, 
'small_photo' => $this->getUserPhoto($user,'small'), '_notes' => $_notes, 'gPhoto' => $this->gph(), 'query' => $query, '_usermenu' => $this->theme_dir.$this->menuFile,
 '_wideMenu' => $this->theme_dir.$this->wideMenu]);
$content = $this->template->fetch($this->theme_dir.'/profile/tagged_album.html');

echo $this->getPage($content);

}

// get album's pictures count
public function getAlbumPicturesCount($albumid){
	
	$q = $this->db->query("Select `id` from ".tbl_photos." where `albumid`='{$albumid}' ");
	
	return $q->num_rows;
	
	
	
}

// get count of video album
public function getVideoAlbumCount($userid) {
	
	
	$q = $this->db->query("Select `id` from ".tbl_videos." where `userid`='{$userid}' ");
	
	return $q->num_rows;
	
}

// album's photos
public function profile_album_photos($uid,$id,$profileName = ''){
	
$i = isset($this->USER['id']) ? $this->USER['id'] : 0;
$al_query = $this->db->query("select name,id,visible_to,video,userid from ".tbl_albums." where `id` = '{$id}' and `userid`='{$uid}' limit 1");
$album_res = $al_query->fetch_array(MYSQLI_ASSOC);
$albumid = $album_res['id'];
$album_author = $album_res['userid'];

if(!$album_res) $this->infoM($this->lang['not_found']);
$user = $this->checkUserCredential($uid,$profileName);
$query = $album_res['video'] == 'yes' ? $this->query_select("select v.*,COUNT(l.id) as lbyme, COUNT(l_c.id) as lc, COUNT(c.id) as kc from ".tbl_videos." v
 left join ".tbl_klass." l ON l.itemid=v.id and l.type='video' and l.userid='{$i}'
 left join ".tbl_klass." l_c ON l_c.itemid=v.id and l_c.type='video'
 left join ".tbl_comments." c ON c.itemid=v.id and c.categ='video'
 where v.albumid='{$albumid}' and v.userid='{$album_author}' group by v.id order by v.added desc limit ".$this->settings['A_PHOTOS_LIMIT']) 
 : 
 $this->getUPhotosA($user,$id,'ORDER BY position ASC, added DESC LIMIT '.$this->settings['A_PHOTOS_LIMIT']);//$this->query_select("select * from ".tbl_photos." where `albumid`='$id' and `userid`='".$uid." order by ');
$photoCount = $album_res['video'] == 'yes' ? $this->getVideoAlbumCount($album_author) : $this->getAlbumPicturesCount($albumid); //count($query);
$userAddPhoto = $photoCount > 0 ? 'square' : 'big';
$addPhoto = $this->theme_dir."/profile/addPhotos/add-alb-photo-{$userAddPhoto}.html";
$user = $this->checkUserCredential($uid,$profileName);

$_notes = $this->theme_dir.$this->notesFile;

$this->template->assign(['this' => $this, 'user' => $user, 'albid' => $id, 'pCount' => $photoCount, 'album_res' => $album_res, 
'small_photo' => $this->getUserPhoto($user,'small'), '_notes' => $_notes, 'gPhoto' => $this->gph(), '_addPhoto' => $addPhoto, 'query' => $query, 
'_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu]);
$content = $album_res['video'] == 'yes' ? $this->template->fetch($this->theme_dir.'/profile/album_videos.html') : $this->template->fetch($this->theme_dir.'/profile/album_photos.html');

echo $this->getPage($content);

}

// delete album (with all photos from server, from db).
public function delete_album($id){

// check if user is the owner of respective album
$check = $this->db->query("select `userid` from ".tbl_albums." where `id`='{$id}' limit 1");
$ow_res = $check->fetch_array(MYSQLI_ASSOC);

if($ow_res['userid'] !== $this->USER['id'])
$this->dieErr(['response' => '0', 'message' => $this->lang['err_owner_album']]);
else {

$delete = $this->query_delete("delete from ".tbl_albums." where `id`='{$id}' and `userid`=".$this->USER['id']);
if(!$delete)
dieErr(['response' => '0', 'message' => $this->lang['err_tehnical']]); 
else{

// select all photos filename of respective album to delete from server
$sp = $this->query_select("select `filename` from ".tbl_photos." where `userid`='".$this->USER['id']."' and `albumid`='{$id}'");

$photoPath = __ROOT__.__IMG_DIR.$this->USER['id'].'/';
$sizeArr = array("0" => $this->pSize['small'], "1" => $this->pSize['thumb'], "2" => $this->pSize['medium'], "3" => $this->pSize['large'], "4" => $this->pSize['exp'], '5' => $this->pSize['grid']);

foreach($sp as $res) {

$filename = $res['filename'];

for($i = 0;$i<sizeof($sizeArr); $i++){
$PICTURES = $photoPath.$sizeArr[$i].$filename;

@unlink($PICTURES);

}

}

// query for delete all photos of this album from database
$dp = $this->query_delete("delete from ".tbl_photos." where `userid`='".$this->USER['id']."' and `albumid`='$id'");

echo json_encode(['response' => '1', 'id' => $id]);

}

}

}

// get album's count photos
public function getAlbumPhotoCount($id){

$query = $this->db->query("select COUNT(id) from ".tbl_photos." where albumid=".$id);
$res = $query->fetch_array(MYSQLI_ASSOC);
return $res['COUNT(id)'];
}

// get album videos count
public function getAlbumVideosCount($id,$uid){
	
$query = $this->db->query("select COUNT(id) from ".tbl_videos." where albumid='{$id}' and `userid`='{$uid}'");
$res = $query->fetch_array(MYSQLI_ASSOC);
return $res['COUNT(id)'];
	
}

// get user's albums
public function getUAlbums($id = 0){

$uid = $this->USER['id'];


$query = $this->query_select("select id,name,cover from ".tbl_albums." where `userid` = '$uid' and `id`<>'$id' order by added desc");
$pp_album = $id <= 0 ? false : true;
$p_cov = $p_name = '';
$alb_count = sizeof($query);



if($pp_album){
$pp_cover = $this->getUPhotos($this->USER, 'order by position asc, added desc limit 1');

foreach($pp_cover as $r)
$p_cov = $r['id'];
$p_name = $this->lang['personal_photos'];
}

$this->template->assign(['this' => $this, 'query' => $query, 'pp_album' => $pp_album, 'p_cov' => $p_cov, 'p_name' => $p_name]);
$content = $this->template->fetch($this->theme_dir.'/profile/getAlbums.html');

///if( ($alb_count > 0 && !$id) || ($alb_count <= 0 && $id) )
if( $alb_count)
echo $this->getPage($content);
else
echo '0-albums';

}

// insert new album
public function addAlbum($checks,$name){
// insert to sql as json
$visible = json_encode($checks);
$query = $this->query_insert("insert into ".tbl_albums." set `userid`='".$this->USER['id']."',
                               `name`='{$name}', `added` = '".time()."', `visible_to` = '{$visible}'");

if($query)
$resp = ['response' => $query, 'name' => $name, 'uid' => $this->USER['id']];
else 
$resp = ['response' => '0'];

echo json_encode($resp);
}

// update existent album
public function updateAlbum($checks,$name,$id){

//check if this user is the owner of album
$check = $this->db->query("select `userid` from ".tbl_albums." where `id`=".$id." limit 1");
$valid = $check->fetch_array(MYSQLI_ASSOC);

if($valid['userid'] !== $this->USER['id'])
$this->dieErr(['response' => '0']);

// all its okay, lets update
$visible = json_encode($checks);
$query = $this->query_update("update ".tbl_albums." set 
                               `name`='$name',`visible_to` = '$visible' where `userid`='".$this->USER['id']."' and `id`=".$id);

if($query)
$resp = ['response' => $id, 'name' => $name, 'uid' => $this->USER['id']];
else 
$resp = ['response' => '0'];

echo json_encode($resp);
}


// move selected photos
public function movePhotos($arr,$toAlbum,$fromAlbum = 0){

$e = explode(',', $arr[0]);


// check for album cover
if($fromAlbum > 0){
$c = $this->db->query("select `cover` from ".tbl_albums." where `id`='{$fromAlbum}' and `userid`='".$this->USER['id']."'");
$cv = $c->fetch_array(MYSQLI_ASSOC);
}
///for($i =0; $i<count($e);$i++){
foreach($e as $id){
$id = $this->test_input($id);
$query = $this->query_update("update ".tbl_photos." set `albumid`='$toAlbum', `added`='".time()."',`position`='0' where `id`='$id' and `userid`='".$this->USER['id']."'");



if($fromAlbum >0 && ($cv['cover'] == $id && $query))
$upd = $this->query_update("update ".tbl_albums." set `cover`='0' where `id`='$fromAlbum' and `userid`='".$this->USER['id']."'");

}

echo 1;

}

// photo to album cover
public function toAlbumCover($id,$albumId){

// check for photo
$req = $this->db->query("select `id` from ".tbl_photos." where `id`='{$id}' and `userid`='".$this->USER['id']."' limit 1");
$check = $req->fetch_array(MYSQLI_ASSOC);

if(!$check) 
$result = 0;
else {
$update = $this->query_update("update ".tbl_albums." set `cover`='{$id}' where `id`='{$albumId}' and `userid`='".$this->USER['id']."'");
$result = $update ? 1 : 0;
}

echo $result;

}

// update notifications as read
public function setAsReadNotif($id,$categ){

if(!$id || !$categ) $this->dieErr(['content' => 'An tehnical error occured at update notifications, please retry.']);

$update = $this->query_update("update ".tbl_notif." set `unread`='yes' where `userid`='{$id}' and `categ`='{$categ}'");

return $update;

}

// check for update relationship
public function checkForUpdateFriendRelation(){
$i = $this->USER['id'];
$query = $this->query_select("select n.id as nid,n.json as notifjson,n.time as added,n.unread,u.id,u.fullname,u.profile_photo 
from 
 ".tbl_users." u,
 ".tbl_notif." n
 where n.userid='$i'
 and u.id = n.item
 and n.condition = ''
 and n.item IN (select friendid from ".tbl_friends." where `userid`='{$i}' and status='confirmed')
 order by n.time desc");
return $query;
}

// get query for notifications
public function notif_run_query($n){

$i = $this->USER['id'];
$query = '';
switch ($n){

case 'story':
$query = $this->query_select("select n.*, u.profile_photo as uphoto,u.id as uid,u.gender,u.fullname, s.id as story_id from ".tbl_notif."n, ".tbl_users." u, ".tbl_stories." s where n.categ='story' and n.userid='{$i}' and u.id=n.condition and s.id=n.item order by n.time desc");

break;


case 'community':

$query = $this->query_select("select n.*, g.name as club_name, g.id as club_id, g.logo as club_logo from ".tbl_notif."n, ".tbl_communities." g where n.categ='community' and n.userid='{$i}' and g.id=n.item order by n.time desc");

break;

case 'gift':

$query = $this->query_select("select n.* from ".tbl_notif."n where n.categ='gift' and n.userid='{$i}' order by n.time desc");


break;

case 'text':

$query = $this->query_select("select n.* from ".tbl_notif."n where n.categ='text' and n.userid='{$i}' order by time desc");

break;


case 'comment':
$is_community = $clubid = $comment_like = 0;
$query = $group_details = array();
$cm_q = $this->query_select("select * from ".tbl_notif." where `userid`='{$i}' and `categ`='comment' order by id desc");
foreach($cm_q as $cm_r):

$n_c_read = $cm_r['unread'];
$n_c_id = $cm_r['id'];
$n_c_mentioned = $cm_r['mentioned'];
$n_c_item = $cm_r['item'];
$n_c_json = $cm_r['json'];
$n_c_time = $cm_r['time'];
$n_c_condition = $cm_r['condition'];
 
$clubid = 0;
	$r_query = $this->db->query("select c.community,c.item_type,c.itemid, c.text,u.id as uid,u.fullname,u.profile_photo from ".tbl_comments." c , ".tbl_users." u
	
	where
	c.categ='comment' and c.item_type='{$n_c_json}' and u.id = c.userid and c.available='yes' and c.id='{$n_c_item}' group by c.id limit 1");
	$r_resp = $r_query->fetch_array(MYSQLI_ASSOC);
	
	// get community id by post
	if($r_resp['community'] == 'yes'){
		$is_community = 1;
		switch($r_resp['item_type']){
			
			case 'post':
			$clubid = $this->db->query("select clubid from ".tbl_posts." where `id`='".$r_resp['itemid']."' limit 1 ");
			$clubid = $clubid->fetch_array(MYSQLI_ASSOC);
			$clubid = $clubid['clubid'];
			
			$group_details = $this->getCommunityDetails($clubid);

			break;
			
			case 'photo':
			case 'video':
			$clubid = $this->db->query("select group_id from ".tbl_communities_pics." where `id`='".$r_resp['itemid']."' limit 1 ");
			$clubid = $clubid->fetch_array(MYSQLI_ASSOC);
			$clubid = $clubid['group_id'];
			$group_details = $this->getCommunityDetails($clubid);

			break;
			
			
			
		}
		
	}
	
	
	
	
	$query[] = array( 
	"id" => $n_c_id,
	"categ" => $n_c_json,
 
	"text" => $r_resp['text'],
	"mentioned" => $n_c_mentioned,
	"item" => $n_c_condition,
	"time" => $n_c_time,
	"unread" => $n_c_read,
	"user_id" => $r_resp['uid'],
	"user_fullname" => $r_resp['fullname'],
	"user_photo" => $r_resp['profile_photo'],
	"is_community" => $is_community,
	"group_details" => $group_details,
	"clubid" => $clubid
	);
	

	
	


endforeach;
break;


case 'comment-like':


$query = $this->query_select("select n.*,u.id as uid,u.profile_photo as uphoto, u.fullname,c.text as str_comment from ".tbl_notif." n

left join ".tbl_users." u ON u.id = SUBSTRING_INDEX(n.condition, '|', -1)
left join ".tbl_comments." c ON c.id = SUBSTRING_INDEX(n.condition, '|', -2)
where n.userid='{$i}' and n.categ='comment-like' group by n.id order by n.time desc

");


break;


case 'friends':

$query = $this->query_select("select n.id as nid,f.added,f.relationship,f.status,n.unread,u.id,u.fullname,u.profile_photo 
from ".tbl_friends." f, ".tbl_notif."n, ".tbl_users."u
 where f.friendid='{$i}'
 and u.id = f.userid
 and n.item=f.id group by f.id
 order by f.status desc,f.added desc");

break; 


case 'post_tags':

$query = $this->query_select("select n.item, n.id as nid, n.time, n.unread, u.fullname,u.id as uid,u.profile_photo,u.gender from ".tbl_notif."n, ".tbl_users."u 
where u.id=n.json and `categ`='post_tags' and `userid`='{$i}' order by n.id desc
 ");

break;

case 'photo_tags':

$query = $this->query_select("select n.item, n.id as nid, n.time, n.unread, u.fullname,u.id as uid from ".tbl_notif."n, ".tbl_users."u 
where u.id=n.json and `categ`='photo_tags' and `userid`='{$i}' order by n.id desc
 ");

break;

case 'photo_tags_requested':

$query = $this->query_select("select n.item, n.id as nid,n.json, n.time, n.unread, u.fullname,u.id from ".tbl_notif."n, ".tbl_users."u 
where u.id=n.condition and `categ`='photo_tags_requested' and `userid`='{$i}' order by n.id desc
 ");

break;


}

return $query;

}

//get all notifications
public function getAllNotif($categs,$count,$id){
 
$i = $this->USER['id'];
$content = '';
foreach($categs as $key) {

$query = $this->notif_run_query($key);
$this->setAsReadNotif($i,$key);

$this->template->assign(['this' => $this, 'query' => $query]);


$content .= $this->template->fetch($this->theme_dir."/notifications/categ/notif-$key.html");


}


if(empty($content))
$content = $this->empty_notif();

echo $this->getPage($content);


}

// empty notification 
public function empty_notif(){
$this->template->assign('this' , $this);
$content = $this->template->fetch($this->theme_dir."/notifications/categ/empty-notif.html");
return $content;
}

public function liveUpdateLog($c){
	
$i = $this->USER['id'];

switch($c){

case 'messages':
	$messenger = $this->im_messenger();
	$response = array('response' => '1', 'count' => '0');
	$count_by_users = array();
	$q = $this->query_select("select COUNT(m.id) as count, (select count(*) from ".tbl_msg." mc where mc.read='no' and mc.fromUser=u.id and mc.toUser='{$i}') as msg_count,

 

	m.fromUser, m.msg, m.time, m.toUser, m.shared, m.id as mid, m.bg, u.online, u.fullname, u.id as uid, u.profile_photo as avatar from ".tbl_msg." m
							left join ".tbl_users." u ON u.id = m.fromUser
							
							where m.read='no' and m.toUser='{$i}' 
							and m.id = (select MAX(ml.id) from ".tbl_msg." ml where ml.toUser='{$i}' and ml.read='no' and ml.fromUser = u.id)

							
							group by m.fromUser order by m.id desc");
							
							
							/*and m.id = (
							
							select MAX(id) from ".tbl_msg." mb where mb.toUser='{$i}' and mb.read='no'
							
							)*/
							
	if(count($q)){
		
		$msg_count = 0;
		foreach($q as $r):
							$message = array('bg' => $r['bg'], 
								'min_text' => $this->str_smilies($messenger->str_messenger($r['msg']),1), 
								'text' => $this->str_smilies($messenger->str_messenger($r['msg'])),
								'shared' => $r['shared'],  
								'time' => date("H:i",$r['time']), 
								'curr_date' => date('j'),
								'timestamp' => $r['time'],
								'msgid' => $r['mid'], 
								'fromUser' => $r['fromUser'],
								'count' => $r['msg_count'],
								'toUser' => $r['toUser']);
								
								$count_by_users[$r['fromUser']] = $r['msg_count'];
 
								$data[] = array("message" => $message, "user" => array("id" => $r['uid'], "online" => $r['online'], "online_ago" => $this->time_elapsed($r['online']), "fullname" => $r['fullname'], "avatar" => $r['avatar']));
			
		$msg_count++;
		endforeach;
		
	//	if(count($sort))
		// array_multisort($sort, SORT_DESC, $data);
		$response['count'] = $msg_count;
		
		$response['user_count'] = $count_by_users;
		$response['messages'] = $data;
	}  
echo $this->sendResponse($response);
break;

case 'grades':
$c_gr = count($this->query_select("select id from ".tbl_grades." where `owner` = '{$i}' and `viewed`='no'"));
echo $this->sendResponse(['response' => '1', 'count' => $c_gr]);
break;

case 'notifications':

echo $this->sendResponse(['response' => '1', 'count' => $this->userNotifCount(1)]);

break;

case 'mapnotif':
echo $this->getMapNotifications();
break;

case 'guests':

$response = '';
$check = $this->db->query("select g.id from ".tbl_guests." g where g.userid='{$i}' and g.guestid NOT IN (select userid from ".tbl_blacklist." where `employer`='{$i}' and `userid`=g.guestid) and g.new='yes'");

if($check) {
$count = $check->num_rows;
$response =  $this->sendResponse(['response' => '1', 'count' => $count]);
} else {
$response = $this->sendResponse(['response' => '0']);
}

echo $response;

break;

// update user online status
case 'online':

if($this->settings['_NODE_ENABLED']){
$contacts = isset($_POST['contacts']) ? json_decode($_POST['contacts'],true) : "null";
$contacts = count($contacts) ? implode(',', array_map('intval', $contacts)) : "null"; 
} else {
	$contacts = "null";
}
$r = $this->updateOnlineStatus($this->USER['id']);
$nOnlineInterval = strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");
$onlineFriendsArr = array();
$all = false;
$limit = $all ? '' : "limit ".$this->settings['FRIENDS_ONLINE_LIMIT'];
// select online friends and contacts of respective user
$query = $this->query_select("select (select COUNT(f2.id) from ".tbl_friends." f2 where f2.userid='{$i}' and f2.friendid=u.id) as is_friend, u.id,u.profile_photo,u.fullname,u.online,u.gender from ".tbl_users." u, ".tbl_friends." f 
                              where 
				 
			    (f.userid='{$i}' && u.id = f.friendid && f.status='confirmed' && f.friendid NOT IN (SELECT `userid` from ".tbl_blacklist." where `employer`='{$i}') && f.userid='{$i}' || u.id IN({$contacts}))
				&& u.id != '{$i}' and u.display_online='true'
				group by u.id order by u.online desc,RAND() ".$limit);

foreach($query as $res):
$onlineFriendsArr[] = array('id' => $res['id'],
				'is_friend' => $res['is_friend'],
			    'fullname' => $res['fullname'],
			    'photo' => $res['profile_photo'],
			    'online_int' => $res['online'],
			    'online' => $res['online'] > $nOnlineInterval,
				'online_ago' => $this->time_elapsed($res['online'],1)
			    );
endforeach;

echo $this->sendResponse(['response' => $r, 'data' => json_encode($onlineFriendsArr)]);

break;

default: die;


}

}

//get notifications
public function getNotification($n,$count = false,$nid = false){

$i = $this->USER['id'];


if($n === 'all'){

$query = $this->query_select("select id,categ from ".tbl_notif." where `userid`='{$i}' group by categ order by id desc");

$arrCateg = array();
$arrNotifId = array();

foreach($query as $res) {

$arrCateg[] = $res['categ'];
$arrNotifId[] = $res['id'];

}

$this->getAllNotif($arrCateg,count($query),$arrNotifId);

} else if($n === 'other') {


$query = $this->query_select("select id,categ from ".tbl_notif." where (`categ`='comment-like' || `categ`='other' or `categ`='photo_tags' or `categ`='photo_tags_requested') and `userid`='{$i}' group by categ order by id desc");

$arrCateg = array();
$arrNotifId = array();

foreach($query as $res) {

$arrCateg[] = $res['categ'];
$arrNotifId[] = $res['id'];

}

$this->getAllNotif($arrCateg,count($query),$arrNotifId);

} else {

$query = $this->notif_run_query($n);
$this->setAsReadNotif($i,$n);
$this->template->assign(['this' => $this, 'query' => $query]);

if(!$query)
$content = $this->empty_notif();
else 
$content = $this->template->fetch( $this->theme_dir."/notifications/categ/notif-$n.html");

echo $this->getPage($content);

}


} // function

// relationship delimiter for notification
public function relationDelimiter($_str){
 
$str = explode(',',$_str);
$size_str = sizeof($str);
$c = 0;
$b = 0;
$relat_span = $txt = $bx_span = '';


for($i = 0; $i < $size_str; $i++){


if( $size_str-2 == $c){
$bx_span = '&nbsp;and&nbsp;';
$b = 1;
}else $bx_span = '';

if(!$b)
$bx_span = ',&nbsp;';

$relation_name_trd = $this->translateRelationShip($str[$i]);

$txt .= $relation_name_trd.$bx_span . ($size_str-1 == $c ? '.' : '');
$c++;
}

return $size_str > 1 ? $txt : ( !empty($_str) ? $this->translateRelationShip($_str).'.' : ''); 
}


// translate relationships
public function translateRelationShip($relation){
	
return $relation ? $this->lang[$relation == 'playing_together' ? 'n_playing_together' : $relation] : '<span class="txterr">unknown</span>';
}



// hide status
public function hideCurStatus($id = 0){
$res = '';
$i = $this->USER['id'];
if(!$id || !is_numeric($id)){

$res = $this->lang['err_invalid_id'];

} else {

// check if requested status is owned by respective user
$q_c = $this->db->query("select id from ".tbl_posts." where `id`='{$id}' and `userid`='{$i}' limit 1");
$r_c = $q_c->num_rows;

if($r_c) {
$hideit = $this->query_update("update ".tbl_posts." set `available`='no' where `id`='{$id}' and `userid`='{$i}'");
$res = 1;}
else $res = $this->lang['err_status_not_found'];

}

echo $res;

}

public function toFeed($id,$type,$klb,$parentid = '',$in_community = false){
$parentid = $parentid == '' ? 0 : $parentid;

 
$class = new _to_feed($id,$type,$parentid,$in_community);

$class->$klb();

}

// insert in guests
public function addGuest($userId){

$guestId = $this->USER['id'];
$time = time();
$_s_gId = isset($_SESSION['guestid']) ? $_SESSION['guestid'] : 0;

if($guestId != $userId) {

if($userId !== $guestId && $_s_gId !== $userId){

// check if guest exist already
$reqC = $this->db->query("select `id` from ".tbl_guests." where `userid` = '{$userId}' and `guestid` = '{$guestId}' limit 1");
$c = $reqC->num_rows;
  

$socketio_data = array("event" => "guests_notif", "userid" => $userId);
if($c > 0){

$update = $this->query_update("update ".tbl_guests." set `added` = '{$time}', `new`='yes' where `userid` = '{$userId}' and `guestid` = '{$guestId}'");

if($update)
 $this->emit_notification_to_socketio($socketio_data);
} else {
$send = $this->query_insert("insert into ".tbl_guests." set `userid` = '{$userId}', `guestid` = '{$guestId}', `added`='{$time}'");

 if($send) $this->emit_notification_to_socketio($socketio_data);
}

$_SESSION['guestid'] = $userId;

} 
}

}

// check if the user is in blacklist
public function checkUserBlacklisted($uid){
	
	$i = $this->USER['id'];
	return count($this->query_select("select id from ".tbl_blacklist." where `userid`='{$uid}' and `employer`='{$i}' limit 1"));
	
}

// bookmarks (page)
public function bookmarks(){

$i = $this->USER['id'];
$small_photo = $this->getUserPhoto($this->USER,'small');
$categ = isset($_GET['categ']) ? $this->test_input($_GET['categ']) : '';


$b_users_c = count($this->query_select("select id from ".tbl_bookmarks." where `uid`='{$i}' and `categ`='user'"));
$b_photos_c = count($this->query_select("select id from ".tbl_bookmarks." where `uid`='{$i}' and `categ`='photo'"));
$b_posts_c = count($this->query_select("select id from ".tbl_bookmarks." where `uid`='{$i}' and `categ`='post'"));

$sql = "select b.* from ".tbl_bookmarks." b where b.`uid`='{$i}' order by b.`added` desc";
$query = $this->query_select($sql);

$this->template->assign(['this' => $this, 'b_users_c' => $b_users_c, 'b_photos_c' => $b_photos_c, 'b_posts_c' => $b_posts_c,
 'categ' => $categ, 'query' => $query, 'i' => $i, 'user' => $this->USER, '_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu, 'small_photo' => $small_photo]);
$content = $this->template->fetch($this->theme_dir."/bookmarks/index.html");

echo $this->getPage($content);

}

// get bookmarked items
public function getBookmarkedItems($categ)
{
	
	$i = $this->USER['id'];
	
	switch($categ){
		
		default:
		case 'users':
		
		$sql = "select b.id as bid, b.added as badded, u.* from ".tbl_bookmarks." b
	
		left join ".tbl_users." u ON u.id = b.itemid
		
		where b.`uid`='{$i}' and b.categ='user' group by b.id order by b.`added` desc limit 100";
		
		break;
		
		case 'posts':
		
		$sql = "select b.id as bid, b.added as badded, p.*, u.id as uid, u.fullname as ufullname, u.profile_photo as uphoto, u.gender as ugender
		from ".tbl_bookmarks." b
		
		left join ".tbl_posts." p ON p.id = b.itemid
		left join ".tbl_users." u ON u.id = p.userid
		
		where b.`uid`='{$i}' and b.categ='post' group by b.id order by b.`added` desc limit 100";
		
		break;
		
		
		case 'photos':
		
		$sql = "select b.id as bid, b.added as badded, u.id as powner_id, u.fullname as powner_fn, u.gender as powner_g, u.profile_photo as powner_p, p.* from ".tbl_bookmarks." b
	
		left join ".tbl_photos." p ON p.id = b.itemid
		left join ".tbl_users." u ON u.id = p.userid
		where b.`uid`='{$i}' and b.categ='photo' group by b.id order by b.`added` desc limit 100";
		
		break;
		
	}

return $this->query_select($sql);
	
	
}
// get guests (page)
public function getGuests(){

$i = $this->USER['id'];
$small_photo = $this->getUserPhoto($this->USER,'small');

$sql = "select g.added,g.new,u.id,u.fullname,u.location,u.text_post,u.profile_photo,u.gender from ".tbl_guests." g, ".tbl_users." u where g.userid='{$i}' and u.id=g.guestid and u.id NOT IN (select userid from ".tbl_blacklist." where `employer`='{$i}' and `userid`=g.guestid) order by g.added desc";
$query = $this->query_select($sql);

$this->template->assign(['this' => $this, 'query' => $query, 'i' => $i, 'user' => $this->USER, '_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu, 'small_photo' => $small_photo]);
$content = $this->template->fetch($this->theme_dir."/guests/index.html");

echo $this->getPage($content);

}

// set guests page as read
public function updateGuestsPage(){

$i = $this->USER['id'];

$this->query_update("update ".tbl_guests." set `new`='no' where `userid` = '{$i}'");

}

// get status for respective user by id
public function getUserPost($uid){

$query = $this->db->query("select * from ".tbl_posts." where `userid`='$uid' and `available`='yes' order by added desc limit 1");

return $query->fetch_array(MYSQLI_ASSOC);

}

// get song details (from posts)
public function getPostSongInfo($sid){

$query = $this->db->query("select `id`,`artist`,`title`,`album`,`cover`,`path` from ".tbl_songs." where `id`='$sid' limit 1");

return $query->fetch_array(MYSQLI_ASSOC);

}


// themes
public function themes(){

$i = $this->USER['id'];
$small_photo = $this->getUserPhoto($this->USER,'small');

$sql = "select * from ".tbl_themes." where `kn`='true' and `userid`='0' order by id desc";
$query = $this->query_select($sql);

$this->template->assign(['this' => $this, 'query' => $query, 'user' => $this->USER, '_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu, 'small_photo' => $small_photo]);
$content = $this->template->fetch($this->theme_dir."/themes/themes.html");

echo $this->getPage($content);

}

// theme preview
public function pTheme($id){

 $query = $this->db->query("select * from ".tbl_themes." where `id` = '{$id}' and `kn`='true' limit 1");
 $response = $query->fetch_array(MYSQLI_ASSOC);

 
 return json_encode([ "body" => $this->settings['THEMES_DIR'].'/body/'.$response['body'], "photo" => $this->settings['THEMES_DIR'].$response['photo'] ]);
/* $this->template->assign([ 'rs' => $response, 'user' => $this->USER, 'this' => $this, 'lang_a_theme' => $this->lang['choose_another_theme'], 
'lang_confirm' => $this->lang['confirm_btn'] ]);
*/ $this->template->display($this->theme_dir."/nav/themes/preview.html");


}

// save theme
public function saveTheme($id){


$i = $this->USER['id'];
$update = $this->query_update("update ".tbl_users." set `theme` = '$id' where `id` = '$i'");

if($update){

$query = $this->db->query("select `photo`, `body` from ".tbl_themes." where `id` = '$id' limit 1");
$res = $query->fetch_array(MYSQLI_ASSOC);
echo json_encode(array('photo' => $this->settings['THEMES_DIR'].$res['photo'], 'body' => $this->settings['THEMES_DIR'].'/body/'.$res['body']));

} else
      echo 0;

}

// get user's theme
public function profileTheme($uid){

//$uid = isset($uid) ? (int) $uid : $this->USER['id'];


$query = $this->db->query("
        select t.photo, t.body from ".tbl_themes." t, ".tbl_users." u
	where t.id = u.theme and u.id = '$uid' 
	");

$result = $query->fetch_array(MYSQLI_ASSOC);


if(count($result) > 0)
echo json_encode([ 'header_photo' => $this->settings['THEMES_DIR'].$result['photo'], 'body' => $this->settings['THEMES_DIR'].'/body/'.$result['body'], 'uid' => $uid ]);
else
echo 0;

	@setcookie("__th_changer", $uid, 0x7fffffff, "/");
}

// get user's all photos
public function gAllPhotos(){


$i = $this->USER['id'];
// query for select all photos
$sql_p = "select * from ".tbl_photos." where `userid`='{$i}' order by added desc";
$query_photos = $this->query_select($sql_p);

// query for select only albums
$sql_a = "select a.* from ".tbl_albums." a, ".tbl_photos." p where a.userid='{$i}' and p.albumid=a.id group by a.id order by a.added desc";
$query_albums = $this->query_select($sql_a);


$userPhotos = $this->getUPhotos($this->USER,'ORDER BY position DESC, added ASC');
$photoCount = count($userPhotos);

$pPhotos = array();

if($photoCount > 0){
foreach($userPhotos as $res)
$pPhotos = $res;
}

$this->template->assign(['this' => $this, 'query_p' => $query_photos, 'query_a' => $query_albums, 'pPhotos' => $pPhotos, 'pPhotoCount' => $photoCount]);
$content = $this->template->fetch($this->theme_dir."/attach_files/photos_albums.html");

echo $this->getPage($content);



}

// jBox get all photos from album
public function jBoxPhotoAlbum($id){
$i = $this->USER['id'];

if($id > 0)
$query = $this->query_select("select p.id,a.name from ".tbl_photos." p, ".tbl_albums." a where a.userid='$i' and p.albumid=a.id and p.userid='$i' and a.id='$id' order by p.added");
else
$query = $this->query_select("select id from ".tbl_photos." where `albumid`='0' and `userid`='$i' order by added");

$this->template->assign(['this' => $this, 'c' => '0', 'opa' => ($id > 0 ? false : true), 'query' => $query]);
$content = $this->template->fetch($this->theme_dir."/attach_files/albPhotos.html");

echo $this->getPage($content);

}
// jBox construct html5 for upload files
public function jBoxGetUploadHtml($recipient = 0){


$i = $this->USER['id'];

// query
$q_last_u ='';
if($recipient){

$q_last_u = $this->query_select("select a.id, u.fullname from ".tbl_attach." a, ".tbl_users." u where a.userid = '{$i}' and a.sended_to='{$recipient}' and u.id = a.sended_to order by a.added desc limit 21");
}


// query for
$q_all_u = $this->query_select("select a.id,a.added, u.fullname from ".tbl_attach." a, ".tbl_users." u where a.userid = '{$i}' and u.id = a.sended_to group by a.id order by rand() desc limit 22,60");

$this->template->assign(['this' => $this, 'upload_picture_from_comp' => $this->lang['upload_picture_from_comp'], 
'query_last_u' => $q_last_u, 'q_o_c' => '0', 'q_x_c' => '0', 'q_all_u' => $q_all_u]);
$content = $this->template->fetch($this->theme_dir."/attach_files/upload_photos.html");
echo $this->getPage($content);
}

public function logClick($cmd,$itemid,$type,$item,$community_id = 0) {

$i = $this->USER['id'];
$sql = $msg = '';
$insert = 0;
$lk_act = 1;
$itemOwner = '';
$response = array();


$community = $community_id ? "`community`='yes' and" : "";
$community_i = $community_id ? "`community`='yes'," : "";
$community_to_Feed = $community_id ? true : false;


if($community){
	
switch($cmd){

case 'like':

// check like for own photos (not allowed)
switch($item){
	
	case 'photo':
	$c_ow = $this->db->query("select userid from ".tbl_communities_pics." where `id`='{$itemid}' and `file`='picture' limit 1");
	break;
	
	case 'post':
	$c_ow = $this->db->query("select userid from ".tbl_posts." where `id`='{$itemid}' and `community`='yes' limit 1");
	break;
	
	case 'video':
	$c_ow = $this->db->query("select userid from ".tbl_communities_pics." where `id`='{$itemid}' and `file`='video' limit 1");
	break;
	
	case 'shared-content':
	$c_ow = $this->db->query("select userid from ".tbl_shared_posts." where `id`='{$itemid}' limit 1");
	break;
	
}

break;
}



}else{
	
switch($cmd){

case 'like':

// check like for own photos (not allowed)
switch($item){
	
	case 'photo':
	$c_ow = $community_id ? $community_id : $this->db->query("select userid from ".tbl_photos." where `id`='{$itemid}' limit 1");
	break;
	
	case 'post':
	$c_ow = $community_id ? $community_id : $this->db->query("select userid from ".tbl_posts." where `id`='{$itemid}' limit 1");
	break;
	
	case 'video':
	$c_ow = $community_id ? $community_id : $this->db->query("select userid from ".tbl_videos." where `id`='{$itemid}' limit 1");
	break;
	
	case 'shared-content':
	$c_ow = $this->db->query("select userid from ".tbl_shared_posts." where `id`='{$itemid}' limit 1");
	break;
	
	case 'market_product':
	$c_ow = $this->db->query("select userid from ".tbl_market." where `id`='{$itemid}' limit 1");
	break;
}
break;

}



}
 

$c_ow = $community_id ? $community_id : $c_ow->fetch_array(MYSQLI_ASSOC);
$itemOwner = $community_id ? $community_id : $c_ow['userid'];
$is_author = false;

// check if the user is author of the post
if($itemOwner === $this->USER['id']) { $is_author = true;}


// verify if already liked this item
$lk_verify = $this->db->query("select id from ".tbl_klass." where ".$community." `itemid`='{$itemid}' and `userid`='{$i}' and `type`='{$item}' limit 1");
$lk_v_resp = $lk_verify->fetch_array(MYSQLI_ASSOC);

if(!$lk_v_resp['id']){

// insert like
$sql = "insert into ".tbl_klass." set ".$community_i." `itemid` = '{$itemid}', `userid`='{$i}', `type`='{$item}'";

if(!$is_author){
// send notification in grades popup
$toGrades = $this->query_insert("insert into ".tbl_grades." set ".$community_i." `itemid`='{$itemid}', `userid`='{$i}', `type`='like', `owner`='{$itemOwner}', `categ`='{$item}', `added`=".time());
$socketio_data = array("event" => "grades_notif", "userid" => $itemOwner);

if($toGrades)
 $this->emit_notification_to_socketio($socketio_data);

}
$insert = 1;

// inject likes to feed
switch($item){
	
	case 'photo':	if(!$is_author) $this->toFeed($itemid, 'like_photo', 'PlikesToFeed', $itemOwner, $community_to_Feed);	break;
	
	case 'post':	if(!$is_author) $this->toFeed($itemid, 'like_post', 'POSTlikesToFeed', $itemOwner, $community_to_Feed);	break;
	
	case 'video':	if(!$is_author) $this->toFeed($itemid, 'like_video', 'VlikesToFeed', $itemOwner, $community_to_Feed);	break;
	
	case 'shared-content':	if(!$is_author) $this->toFeed($itemid, 'like_shared_post', 'SlikesToFeed', $itemOwner, $community_to_Feed);	break;
}


} else {

// like already, delete like
$sql = "delete from ".tbl_klass." where ".$community." `itemid` = '{$itemid}' and `userid`='{$i}' and `type`='{$item}'";


// delete from feed
//$deleteLikeFromFeed = $this->query_delete("delete from ".tbl_feed." where `categ`='like_photo' and `byuser`='{$i}' and `itemid`='{$itemid}'");

if(!$is_author) {
   $sql_lk_del = "update ".tbl_feed." SET `byuser`= TRIM(BOTH ',' FROM REPLACE(REPLACE(`byuser`, '{$i}', ''), ',,', ','))  where FIND_IN_SET({$i}, `byuser`) AND ".$community." `itemid`='{$itemid}'";
   $this->query_update($sql_lk_del);
   
   // update for multiple photos
   $sql_lk_mdel = "update ".tbl_feed." SET `itemid`= TRIM(BOTH ',' FROM REPLACE(REPLACE(`itemid`, '{$itemid}', ''), ',,', ',')) where ".$community." FIND_IN_SET({$itemid}, `itemid`) AND `byuser`='{$i}'";
   $this->query_update($sql_lk_mdel);

   
   switch ($item){
	   
	 case 'photo':

   // check for single photo
   $check_q3 = $this->db->query("select `itemid`,`id` from ".tbl_feed." where ".$community." `categ`='like_photo_album' and `byuser`='{$i}' limit 1");
   $check_q3 = $check_q3->fetch_array(MYSQLI_ASSOC);
   $need_update_feedid = $check_q3['id'];
   $ch_q3 = !strpos($check_q3['itemid'], ',') ? 1 : 0;
   
   if($ch_q3){
	   
	    $this->query_update("update ".tbl_feed." set `categ`='like_photo' where `id`='{$need_update_feedid}'");  
	   
    }	 
	 
	 break;

	 case 'post':
	 
	 // delete from feed likes on post
	 $this->query_delete("delete from ".tbl_feed." where ".$community." `categ`='like_post' && `itemid`='{$itemid}' && `byuser`='{$i}'");
	 
	 break;
	 
	 case 'shared-content':
	 
	 // delete from feed likes on post
	 $this->query_delete("delete from ".tbl_feed." where `categ`='like_shared_post' && `itemid`='{$itemid}' && `byuser`='{$i}'");
	 
	 break;
	 
	 case 'video':

   // check for single video
   $check_q3 = $this->db->query("select `itemid`,`id` from ".tbl_feed." where ".$community." `categ`='like_multi_videos' and `byuser`='{$i}' limit 1");
   $check_q3 = $check_q3->fetch_array(MYSQLI_ASSOC);
   $need_update_feedid = $check_q3['id'];
   $ch_q3 = !strpos($check_q3['itemid'], ',') ? 1 : 0;
   if($ch_q3){
	   
	    $this->query_update("update ".tbl_feed." set `categ`='like_video' where `id`='{$need_update_feedid}'");  
	   
   }
	 
	 
	 break;
	   
	   
	   
   }
   

   $deleteLikeFromFeed = $this->query_delete("delete from ".tbl_feed." where `byuser`=''");


// delete from grades
$deleteGrades = $this->query_delete("delete from ".tbl_grades." where ".$community." `itemid`='{$itemid}' and `userid`='{$i}' and `type`='like' and `owner`='{$itemOwner}' and `categ`='{$item}'");
$socketio_data = array("event" => "grades_notif", "userid" => $itemOwner);

if($deleteGrades)
 $this->emit_notification_to_socketio($socketio_data);
}

$lk_act = 0;

}

$exec_query = $this->db->query($sql);

if($exec_query)
echo json_encode([ 'succ' => '1', 'msg' => $msg, 'last_id' => $insert ? $this->db->insert_id : '', 'like_action' => $lk_act ]);
else
echo json_encode([ 'succ' => '0' ]);

}

// delete friend
public function unfriend($friendid){

$i = $this->USER['id'];
$query = false;
$query_x = $query_y =$query_v =$query_z =$query_n ='';
// check if the user exist in database and is friend
$q     = $this->db->query("select id from ".tbl_friends." f where (f.friendid='{$friendid}' and f.userid='{$i}'
	 OR f.friendid='{$i}' and f.userid='{$friendid}') and f.status='confirmed'
	 limit 1");
$ex    = $q->num_rows;

if($ex){


// delete friend 
$sql_f = "delete from ".tbl_feed_fv." where `userid`='{$i}' and `fvid`='{$friendid}'";
$sql_x = "delete from ".tbl_friends." where `userid`='{$i}' and `friendid`='{$friendid}'";
$sql_y = "delete from ".tbl_friends." where `userid`='{$friendid}' and `friendid`='{$i}'";
$sql_v = "delete from ".tbl_feed." where (`itemid` = '{$friendid}' and `byuser` = '{$i}') or (`itemid` = '{$i}' and `byuser` = '{$friendid}') and `categ`='newfriend'";
$sql_z = "update ".tbl_feed." SET `itemid`= TRIM(BOTH ',' FROM REPLACE(REPLACE(itemid, '{$friendid}', ''), ',,', ','))  where FIND_IN_SET({$friendid}, itemid) and byuser = '{$i}' and `categ`='newfriend'";
$sql_n = "
	DELETE
 	 FROM ".tbl_notif."
 	WHERE NOT EXISTS
   	  (SELECT f.id
        FROM ".tbl_friends." f
      	 WHERE f.id = item)
";

$query_x = $this->query_delete($sql_x);
$query_y = $this->query_delete($sql_y);
$query_v = $this->query_update($sql_v);
$query_z = $this->query_delete($sql_z);
$query_n = $this->query_delete($sql_n);
$query_f = $this->query_delete($sql_f);
// send notification to respective user
// that has been removed from friends
$this->toNotif($friendid,"friends",$i,json_encode(["text" => "deleted you from #h friends"]),2);

}

echo 1; 

}

//update friend relationship from notification
public function notifUpdateFriendRelation($nid,$fid){
$i = $this->USER['id'];
$response = 0;

// select the relationship from notification table
$q = $this->db->query("select json from ".tbl_notif." where `id`='$nid' and `userid`='$i' and `item`='$fid' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

if($r['json']){
$relation = json_decode($r['json'],true);
$relation = $relation['relationship'];
$convert_relation = $this->oppositeRelationship($relation);
// update relationship
// my sql
$update_x = $this->query_update("update ".tbl_friends." set `relationship`='{$convert_relation}' where `userid`='{$i}' and `friendid`='{$fid}'");
// friend sql
$update_y = $this->query_update("update ".tbl_friends." set `relationship`='{$relation}' where `friendid`='{$i}' and `userid`='{$fid}'");

// delete the notification
$this->query_delete("delete from ".tbl_notif." where `id`='{$nid}'");

$response = 1;

}

echo $response;
}

// check for deleted friend relation
public function checkForDeletedFriendRelation(){

$i = $this->USER['id'];

$query = $this->query_select("select n.id as nid,n.json as notifjson,n.time as added,n.unread,u.id,u.fullname,u.profile_photo 
from 
 ".tbl_users." u,
 ".tbl_notif." n
 where n.userid='$i'
 and n.json != ''
 and u.id = n.item
 and n.condition = '1'
 and n.item IN (select friendid from ".tbl_friends." where `userid`='$i' and status='confirmed')
 order by n.time desc");
 
return $query;

}

// check for deleted friend
public function checkForDeletedFriend(){

$i = $this->USER['id'];
$query = $this->query_select("select n.id as nid,n.json as notifjson,n.time as added,n.unread,u.id,u.fullname,u.profile_photo 
from 
 ".tbl_users." u,
 ".tbl_notif." n
 where n.userid='$i'
 and n.json != ''
 and u.id = n.item
 and n.condition = '2'
 and n.item NOT IN (select friendid from ".tbl_friends." where `userid`='$i' and status='confirmed')
 order by n.time desc");
return $query;

}

// check for deleted friend
public function checkForAcceptedFriendRequests(){

$i = $this->USER['id'];
$query = $this->query_select("select n.id as nid,n.json as notifjson,n.time as added,n.unread,u.id,u.fullname,u.profile_photo 
from 
 ".tbl_users." u,
 ".tbl_notif." n
 where n.userid='$i'
 and n.json != ''
 and u.id = n.item
 and n.condition = '3'
 and n.item IN (select friendid from ".tbl_friends." where `userid`='$i' and status='confirmed')
 order by n.time desc");
return $query;

}
// check for deleted friend
public function checkForDeclinedFriendRequests(){

$i = $this->USER['id'];
$query = $this->query_select("select n.id as nid,n.json as notifjson,n.time as added,n.unread,u.id,u.fullname,u.profile_photo 
from 
 ".tbl_users." u,
 ".tbl_notif." n
 where n.userid='$i'
 and n.json != ''
 and u.id = n.item
 and n.condition = '4'
 and n.item NOT IN (select friendid from ".tbl_friends." where `userid`='$i' and status='confirmed')
 order by n.time desc");
return $query;

}
// update friend relationships simultaneously at sending friends reques
public function updateRelationShip($fid,$rkl = '', $fromPopup =''){
$i = $this->USER['id'];
$relationship = !empty($rkl) ? $rkl : (isset($_POST['fr']) ? $_POST['fr'] : '');
$result = $this->lang['err_tehnical'];
$direct = isset($_POST['direct']) ? 1 : 0;


// check if this is friend with respective user
$q = $this->db->query("select id from ".tbl_friends." where `userid`='$i' and `friendid`='$fid' limit 1");
$c = $q->num_rows;

// check if the current friend request is pending
$q = $this->db->query("select id from ".tbl_friends." where `userid`='$i' and `friendid`='$fid' and `status`='pending' limit 1");
$b = $q->num_rows;

if(!$c)
{ echo $this->lang['user_is_not_your_friend'];
exit;
}else {

// remove relationship
if(!$relationship){

// delete from notification
$this->query_delete("delete from ".tbl_notif." where `userid`='{$fid}' and `item`='{$i}' and `json`!=''");

$g = $this->db->query("select id from ".tbl_friends." where relationship !='' and`userid`='{$fid}' and `friendid`='{$i}' limit 1");
$h = $g->num_rows;
if($h)
$this->toNotif($fid,'friends',$i,json_encode(['text'=> '#n has removed you from #g relative friends']),1);

// my sql
$update_x = $this->query_update("update ".tbl_friends." set `relationship`='' where `userid`='{$i}' and `friendid`='{$fid}'");
// friend sql
$update_y = $this->query_update("update ".tbl_friends." set `relationship`='' where `friendid`='{$i}' and `userid`='{$fid}'");


} else if($direct || $b) {
$update_x = $this->query_update("update ".tbl_friends." set `relationship`='{$relationship}' where `userid`='{$i}' and `friendid`='{$fid}'");
} else {
$notif_js = json_encode(array("relationship" => $relationship));
$cjek = $this->db->query("select json from ".tbl_notif." where `userid`='{$fid}' and `item`='{$i}' and `json`!='' limit 1");
$kr  = $cjek->fetch_array(MYSQLI_ASSOC);
$data_c = sizeof($kr);

if($data_c && !empty($fromPopup)){

$recent_data = json_decode($kr['json'],true);
$rd_j = $recent_data['relationship'];
$new_relat = $rd_j.','.$relationship;

if(strpos($rd_j,",")){
$rd_j_ex = explode(",",$rd_j);
for($k=0;$k < sizeof($rd_j_ex); $k++):
if($relationship == $rd_j_ex[$k])
$new_relat = $rd_j;
endfor;

} else if($relationship == $rd_j){
$new_relat = $rd_j;
} 

$notif_js = json_encode(array("relationship" => $new_relat));
}
if($data_c)
$up = $this->query_update("update ".tbl_notif." set `json`='{$notif_js}', `unread`='no' where `userid`='{$fid}' and `item`='{$i}'");
else
$this->toNotif($fid,'friends',$i,$notif_js);
}
$result = '1';
}
if(!$fromPopup)
echo $result;

}

// get relationship between users
public function getUserRelationShip($uid){
$i = $this->USER['id'];
$query = $this->db->query("select relationship from ".tbl_friends." where `userid`='{$i}' and `friendid`='{$uid}' and `status`='confirmed' limit 1");
$relation = $query->fetch_array(MYSQLI_ASSOC);

return $relation['relationship'];

}

// get all my friends
public function myFriends(){
$i = $this->USER['id'];

$res = array();
$args = $this->query_select("select u.id,u.profile_photo as uph,u.fullname from ".tbl_users." u, ".tbl_friends." f
                              where f.userid='$i' and f.status='confirmed' and u.id=f.friendid");
 
if(sizeof($args)){

foreach($args as $arg){
// check if the user is already in favorite list
$q_k = $this->db->query("select id from ".tbl_feed_fv." where `userid`='$i' and `fvid`='".$arg['id']."' limit 1");
$r_k = $q_k->num_rows;
$res[] = array('data-x' => 1, 'status' => ($r_k ? 1 : 0), 'id' => $arg['id'], 'photo' => $arg['uph'], 'fname' => $arg['fullname']);
}

} else {

$res[] = array('data-x' => 0);

}

echo json_encode($res);

}

// get user's songs
public function getUserTracks($uid,$limit = 3){
	
	$uid = (int) $uid;

	$q = $this->query_select("select (select COUNT(id) from ".tbl_music." where owner='{$uid}') as tr_count,
	m.id,m.artist,m.title,m.album,m.path as filename,m.cover,m.time
	from ".tbl_music." mm, ".tbl_songs." m 
	WHERE m.id=mm.musid and mm.owner = '{$uid}'
	group by m.id order by mm.position asc, mm.added desc limit " . $limit);
	
	return $q;
}

// get user's videos
public function getUserVideos($uid, $limit = 2){
	
	$uid = (int) $uid;
	$q = $this->query_select("select (select COUNT(id) from ".tbl_videos." where userid='{$uid}') as vd_count, id,title,dur from ".tbl_videos." where userid='{$uid}' order by added desc limit ".$limit);
	
	return $q;
	
}

// get user's photo albums
public function getUserPhotoAlbums($uid, $limit = 2){
	$uid = (int) $uid;
	$q = $this->query_select("select (select COUNT(id) from ".tbl_albums." where userid=a.userid) as albums_count,(select id from ".tbl_photos." where albumid=a.id and userid=a.userid order by added desc limit 1)as default_cover, a.id,a.name,a.cover,COUNT(p.id) as c_photos
	from ".tbl_albums."a
	left join ".tbl_photos." p ON p.albumid = a.id
	where a.userid='{$uid}' and a.video='no' group by a.id order by a.added desc limit ".$limit);
	
	return $q;
}

// get user's relative friends
public function getUserRelativeFriends($uid,$limit = 6){
	
	$uid = (int) $uid;
	$limit = $limit ? 'limit '.$limit : '';
	$find_in_set = $this->relationshipFindInSet();
	$q = $this->query_select("select u.id,u.fullname,u.name,u.surname,u.profile_photo as photo,u.online,u.gender,f.relationship from ".tbl_users." u, ".tbl_friends." f
			  where u.id = f.friendid and f.userid = '{$uid}' and f.status='confirmed'
			  and (
				 $find_in_set
				)
			  
			  order by f.added desc ".$limit);
	return $q;
	
}

// get user's friends
public function getUserFriends($uid, $limit = 6){
	
	$uid = (int) $uid;
	$q = $this->query_select("select u.location,u.id,u.fullname,u.name,u.surname,u.profile_photo as photo, u.gender from ".tbl_users."u, ".tbl_friends."f where u.id=f.friendid and f.userid='{$uid}' and f.status='confirmed' order by f.added desc limit ".$limit);
	
	return $q;
}

// feed add/remove favorite users
public function feedFavoriteUs($task,$uid){
	
$i = $this->USER['id'];
$now = time();
$sql = $task == 'add' ? "insert into ".tbl_feed_fv." set `userid`='{$i}', `fvid`='{$uid}',`added`='{$now}'" : 
	                "delete from ".tbl_feed_fv." where `userid`='{$i}' and `fvid`='{$uid}'";

$query = $this->db->query($sql);

if($query) echo 1;
else echo $this->lang['err_tehnical'];

}

// user's photos count 
public function userPhotosCount($uid,$a='0'){
	$a = $a === 'all' ? '' : "and `albumid`='{$a}'";
$request = $this->db->query("select id from ".tbl_photos." where userid='{$this->test_input($uid)}' ".$a);
return $request->num_rows;//$a ? $this->noMonHund($request->num_rows) : $request->num_rows;
}



// get user's apps count
public function userAppsCount($c = 0,$a = 0){
$i = $c ? $c : $this->USER['id'];
$q = $this->db->query("select COUNT(*) from ".tbl_my_apps." where `userid`='{$i}'");
$q = $q->fetch_row();
$c = $q[0];
return $a ? $this->noMonHund($c) : $c;
}
// get user's apps count
public function userTracksCount($c = 0,$a = 0){
$i = $c ? $c : $this->USER['id'];
$q = $this->db->query("select COUNT(*) from ".tbl_music." where `owner`='{$i}'");
$q = $q->fetch_row();
$c = $q[0];
return $a ? $this->noMonHund($c) : $c;
}

// get user's posts count
public function postsCount($c = 0,$a = 0){
$i = $c ? $c : $this->USER['id'];

$q = $this->db->query("select `id` from ".tbl_posts." where `userid`='{$i}'");
$q2 = $this->db->query("select id from ".tbl_shared_posts." where `userid`='{$i}'");

return $a ? $this->noMonHund($q->num_rows + $q2->num_rows) : $q->num_rows + $q2->num_rows;
}


// search for friends (for friends page)
public function searchForFriends(){

$key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';
$list = isset($_POST['list']) ? 1:0;
 
$query = array();
//u.id IN (select friendid from ".tbl_friends." where `userid`='$uid' and status='confirmed')
$uid = isset($_POST['friendid']) ? $this->test_input($_POST['friendid']) : 0;//$this->USER['id'];
if(!empty($key)){

$query = $this->query_select("select u.id,u.fullname,u.profile_photo,u.online,f.relationship,u.text_post from ".tbl_friends." f 

			  inner join ".tbl_users." u ON u.id<>0 and u.id = f.friendid and (u.name LIKE N'%{$key}%' OR u.surname LIKE N'%{$key}%' OR u.fullname LIKE N'%{$key}%') 
			  where  f.userid = '{$uid}' and f.status='confirmed'
			  
			  group by u.id
			  order by f.added desc");


}

$this->template->assign([ "this" => $this, "query" => $query, "key" => $key, "list" => false ]);
echo $this->sendResponse(array("is_result" => sizeof($query), "result" => $this->template->fetch($this->theme_dir."/friends/search_result.html")));

}

public function getRelativesub(){
return  "relative,father,brother,uncle,nephew,grandfather,father-in-law,son-in-law,godfather,godson,mother,sister,aunt,niece,mother-in-law,daughter-in-law,godmother,goddaughter,son,daughter";
}

// get "indicate relationship" button
public function getRelationshipButton(){
	
$user = isset($_POST['uid']) ? (int) $this->test_input(b_decode($_POST['uid'])) : '';

	if(!is_numeric($user) || $user <= 0 || !isset($this->USER)) $r = 0; 
	else {
		$arr = $this->query_select("select id as uid, name as ufn, gender from ".tbl_users." where `id`='{$user}' limit 1");
		$arr[0]['relationship'] = $this->getUserRelationShip($user);
		$friend_json_data = json_encode($arr);
		$relationship_select_button = '<div class="v115-redesign-btnm"><button data-friend-btn="add_friend_btn_sub_photo"  class="flat_button button_wide secondary indicate-relationship __relationship __from_new_req" data-usnf=\''.$friend_json_data.'\' id="action_menu_set_relationship_a" href="/profile?q='.$user.'" hrefattr="true"><i class="icofont icofont-ui-user">&#xed6c;</i>'.$this->lang['inidicate_friends_relationship'].'</button></div>';
		
		
		
		
		
		$r =  $relationship_select_button;//'<div class="add_friend_btn_sub_photo bbtn __relationship" id="action_menu_set_relationship"><a class="u-menu_a  __from_new_req" data-usnf=\''.$friend_json_data.'\' id="action_menu_set_relationship_a" href="/profile?q='.$user.'" hrefattr="true"><span class="tico"><i class="tico_img ic ic_relation"></i>'.$this->lang['inidicate_friends_relationship'].'</span></a></div>';
		
	}
	echo $r;
}

// friends relationship in popup 
public function popupFriendRelationShip() {
$i = $this->USER['id'];
$relation = isset($_POST['relation']) ? $this->test_input($_POST['relation']) : '';


$query = $this->query_select("select u.gender,u.id,u.fullname,u.profile_photo as photo,u.gender,f.relationship from ".tbl_users." u,".tbl_friends." f
                          where f.userid='{$i}' and u.id=f.friendid order by f.added");

$this->template->assign([ "this" => $this, "query" => $query, "getRelation" => $relation ]);
echo $this->getPage($this->template->fetch($this->theme_dir."/friends/friends_popup.html"));
}

// check if the user is invited in relation and request is pending
public function getRelationInNotif($uid){

$response = '';
$q = $this->db->query("select `json` from ".tbl_notif." where `userid`='$uid' and `condition`='' order by time desc limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

if(sizeof($r)){
$response = json_decode($r['json'],true);
$response = $response['relationship'];
}
return $response;
}

// check if the friend is already in an specific relation
public function friendIsInRelation($db_relation,$getRelation){

$getRelation = str_replace("best","best_friend",str_replace("childhood","playing_together",$getRelation));

if($getRelation == 'relative'){
$getRelation = $this->getRelativesub();
}


$res = '';

$rl_x = strpos($db_relation,",") ? 1 : 0;
$rsp = $rl_x ? explode(",",$db_relation) : $db_relation;

if( strpos($db_relation,",") && strpos($getRelation,",")){



$ex_grelat = explode(",",$getRelation);
$ex_dbrelat = explode(",",$db_relation);

for($i = 0; $i < sizeof($ex_dbrelat); $i++):
for($j = 0; $j < sizeof($ex_grelat); $j++):

if($ex_dbrelat[$i] === $ex_grelat[$j])
$res = $ex_dbrelat[$i];


endfor;
endfor;


} else if(strpos($db_relation,",")){

$ex_dbrelat = explode(",",$db_relation);

for($i = 0; $i < sizeof($ex_dbrelat); $i++):
if($getRelation === $ex_dbrelat[$i])
$res = $ex_dbrelat[$i];

endfor;


} else if(strpos($getRelation,",")){

$ex_grelat = explode(",",$getRelation);

for($i = 0; $i < sizeof($ex_grelat); $i++):
if($db_relation === $ex_grelat[$i])
$res = $ex_grelat[$i];

endfor;

} else if($getRelation && $db_relation){

if($db_relation === $getRelation)
$res = $db_relation;


}


return $this->rltReplc($res);
}

// save friend relationship from popup
public function saveFriendPopupRelationship(){

$data = isset($_POST['data']) ? $_POST['data'] : '';
$res = 0;

if(!empty($data)){
foreach($data as $fid => $relation):
$r = str_replace("army","army_friend",str_replace("best","best_friend",str_replace("childhood","playing_together",$relation)));
$this->updateRelationShip($fid,$r,1);
endforeach;
$res = 1;
}

echo $res;
}

// create windows popup
public function wpopups(){

$cmd = isset($_POST['action']) ? $this->test_input($_POST['action']) : '';
$send_arr = isset($_POST['dt']) ? $_POST['dt'] : '';

$a = $send_arr ? json_decode($send_arr,true) : '';

$rp_userid = $rp_itemid = "";
$rp_userid = $a['uid'];
$rp_itemid = $a['id'];
$type = $a['type'];


switch($type){

case 'photo':

$this->template->assign([ "this" => $this, "userid" => $rp_userid, "photoid" => $rp_itemid ]);

// display template
$this->template->display($this->theme_dir."/popups/report/photo.html");

break;

case 'video':

$this->template->assign([ "this" => $this, "userid" => $rp_userid, "videoid" => $rp_itemid ]);

// display template
$this->template->display($this->theme_dir."/popups/report/video.html");


break;

case 'post':
$this->template->assign([ "this" => $this, "userid" => $rp_userid, "postid" => $rp_itemid ]);

// display template
$this->template->display($this->theme_dir."/popups/report/post.html");
break;


case 'user':
$this->template->assign([ "this" => $this, "userid" => $rp_userid, "i_id" => $rp_itemid ]);

// display template
$this->template->display($this->theme_dir."/popups/report/user.html");
break;
}



}


// rate
public function rateIt(){

        $i = $this->USER['id'];   
	$response = array();
	$response['success'] = 0;
    	//search if the user(ip) has already gave a note
    	$therate = isset($_POST['rate']) ? (int) $this->test_input($_POST['rate']) : '';
    	$theitem = isset($_POST['itemid']) ? (int) $this->test_input($_POST['itemid']) : '';
$community = isset($_POST['clubid']) ? 'yes' : 'no';
    	$query = $this->db->query("SELECT COUNT(*) as c FROM ".tbl_photo_rate." where id_photo= '{$theitem}' and `userid`='{$i}' and `community`='{$community}' "); 
	$c_res = $query->fetch_array(MYSQLI_ASSOC);
        $count = $c_res['c'];
    	if(!$count){
    		$this->query_insert("INSERT INTO ".tbl_photo_rate." (id_photo, userid, rate, community)VALUES('{$theitem}', '{$i}', '{$therate}', '{$community}')");
		
			// insert into grades
			# select the owner of the photo, so we need to know who received the grades
			$ow_ph = $this->db->query("select `userid` from ".tbl_photos." where `id`='{$theitem}' limit 1");
			$ow_ph = $ow_ph->fetch_array(MYSQLI_ASSOC);
			$ow_ph = $ow_ph['userid'];
		$toGrades = $this->query_insert("insert ".tbl_grades." set `userid`='{$i}',`itemid`='{$theitem}',`type`='stars', `owner`='{$ow_ph}',`community`='{$community}', `categ`='photo', `added`='".time()."', `data` = '{$therate}'");
		$socketio_data = array("event" => "grades_notif", "userid" => $ow_ph);

		if($toGrades)
		 $this->emit_notification_to_socketio($socketio_data);
			
                $query = $this->query_select("SELECT id,rate FROM ".tbl_photo_rate." 
											  where id_photo='{$theitem}' and `community`='{$community}' group by id"); 
                foreach($query as $data){
                    $rate_db[] = $data;
                    $sum_rates[] = $data['rate'];
                }
                if(@count($rate_db)){
                    $rate_times = count($rate_db);
                    $sum_rates = array_sum($sum_rates);
                    $rate_value = $sum_rates/$rate_times;
                    $rate_bg = (($rate_value)/5)*100;
                }else{
                    $rate_times = 0;
                    $rate_value = 0;
                    $rate_bg = 0;
                }
		$response['success'] = 1;
		$response['rate_times'] = $rate_times;
		$response['rate_value'] = $rate_value;
		$response['rate_bg'] = $rate_bg;
		$response['photoid'] = $theitem;


	}
echo json_encode($response);
}

// check photo stars rating
public function checkRatingPhoto(){
$i = $this->USER['id'];
$voted_by_me = 0;
$my_rate = '';
$getPhotoId = isset($_POST['photoid']) ? $this->test_input($_POST['photoid']) : '';
$community = isset($_POST['clubid']) ? 'yes' : 'no';
$response = array();
if(!$getPhotoId)
$response['success'] = 0;
else {

         $query = $this->query_select("SELECT a.*,COUNT(b.id) as voted_by_me, b.rate as my_rate FROM ".tbl_photo_rate." a
												left join ".tbl_photo_rate." b ON b.userid='{$i}' and b.community='{$community}' and b.id_photo='{$getPhotoId}'
												where a.id_photo='{$getPhotoId}' group by a.id"); 
		 
		 // select photo owner
		 $photo_owner = count($this->query_select("select id from ".tbl_photos." where `id`='{$getPhotoId}' and `userid`='{$i}' limit 1"));

                foreach($query as $data){
                    $rate_db[] = $data;
                    $sum_rates[] = $data['rate'];
					$voted_by_me = $data['voted_by_me'];
					$my_rate = $data['my_rate'];
                }
                if(@count($rate_db)){
                    $rate_times = count($rate_db);
                    $sum_rates = array_sum($sum_rates);
                    $rate_value = $sum_rates/$rate_times;
                    $rate_bg = (($rate_value)/5)*100;
                }else{
                    $rate_times = 0;
                    $rate_value = 0;
                    $rate_bg = 0;
                }
				$response['community'] = $community;
		$response['success'] = 1;
		$response['rate_times'] = $rate_times;
		$response['rate_value'] = $rate_value;
		$response['rate_bg'] = $rate_bg;
		$response['voted_by_me'] = $voted_by_me;
		$response['my_rate'] = $my_rate;
		$response['photoid'] = $getPhotoId;
		$response['photo_owner'] = $photo_owner ? 1 : 0;
}

echo json_encode($response);

}

// post comment to photo
public function photoPostComment(){
$comment = isset($_POST['comment']) ? $this->test_input($_POST['comment']) : '';
$photoid = isset($_POST['commToPhoto']) ? $this->test_input(b_decode($_POST['commToPhoto'])) : '';
$community = isset($_POST['community']) ? ",`community`='yes'" : '';
$item_type = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : 'photo';


$res = array();
$i = $this->test_input($this->USER['id']);
$now = time();
if(!is_numeric($photoid))
$res['s'] = 0;
else if($comment && $photoid){

// insert comment
$query = $this->query_insert("insert into ".tbl_comments." set 
								`userid`='{$i}',
	 							`itemid`='{$photoid}',
								`categ` = 'comment',
								`added` = '{$now}',
								`text`  = '{$comment}',
								`item_type`  = '{$item_type}'
								".$community."
			     ");

if($query){
	
	switch($item_type){
		
		case 'photo':
		

	// select userid for respective photo 
	$q_user = $community ? $this->db->query("select `userid` from ".tbl_communities_pics." where `id`='{$photoid}' limit 1") : $this->db->query("select `userid` from ".tbl_photos." where `id`='{$photoid}' limit 1");
	$r_user = $q_user->fetch_array(MYSQLI_ASSOC);
	$r_userid = $r_user['userid'];

	// send notification to repsective user
	if($r_userid !== $i) $sendNotification = $community ? $this->toNotif($r_userid,"comment",$query,"photo",$photoid,true) : $this->toNotif($r_userid,"comment",$query,"photo",$photoid);
	


		break;
		
		
		
		
		
	}
	

	
	
$res['s'] = 1;
$res['comm_id'] = $query;
$res['added'] = $this->time_elapsed($now,1);
$res['text'] = $this->str_smilies($comment);
}

} else {
$res['s'] = 0;
}

echo json_encode($res);

}

// get photo comments
public function photoGetComments($load_prev = 0,$directId = 0, $customLimit = 0){

$photoid = $directId ? $directId : (isset($_POST['photoid']) ? $this->test_input(b_decode($_POST['photoid'])) : '');
$item_type = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : '';
$community = isset($_POST['community']) ? "c.community='yes' and" : '';

$limit_cm = $customLimit ? $customLimit : $this->settings['PHOTO_VIEWER_COMMENTS_LIMIT']; // from settings
$limit_cm = $load_prev ? "{$limit_cm},9999" : $limit_cm;

$i = $this->USER['id'];
$res = $comm_data = array();
$res['s'] = 0;


$query = $this->query_select("select 
 SQL_CALC_FOUND_ROWS c.id,
(select COUNT(distinct id) from ".tbl_comments." where `categ`='reply' and `item_type`='{$item_type}' and `itemid`=c.id) as replies_count,
 COUNT(distinct l.id) as comm_likes_count,COUNT(distinct lb.id) as liked_by_me, c.id, c.updated, c.added, c.text,
 u.gender as ugender,u.fullname as uname, u.id as uid, u.profile_photo as uphoto from ".tbl_comments." c
	left join ".tbl_users." u ON u.id = c.userid
 	left join ".tbl_klass." l ON l.itemid = c.id
	left join ".tbl_klass." lb ON l.itemid = c.id and l.userid = '{$i}'

 where c.itemid='{$photoid}' and ".$community." c.item_type='{$item_type}' and c.categ='comment' group by c.id order by c.added desc limit ".$limit_cm);
$all_comments_count = $this->db->query("SELECT FOUND_ROWS() as c");
$all_comments_count = $all_comments_count->fetch_array(MYSQLI_ASSOC);
$all_comments_count = $all_comments_count['c'];
$comm_count = count($query);


if($comm_count){

foreach($query as $data):
$adaugat = $this->time_elapsed($data['added'],0,1);
$replies_arr = array();


// get replies
$replies_q = $this->query_select("
select 
(select COUNT(distinct id) from ".tbl_comments." where `categ`='reply_to_reply' and `itemid`=r.id) as replies_count,
COUNT(distinct l.id) as r_comm_likes_count,COUNT(distinct lb.id) as r_liked_by_me,
r.userid as r_author,ur.fullname as r_uname,ur.profile_photo as r_uphoto,ur.gender as r_ugender, r.id as r_id,r.updated as r_updated, r.itemid as r_parentid,r.added as r_added, r.text as r_text 
				  from ".tbl_comments." r
	left join ".tbl_users." ur ON ur.id = r.userid
 	left join ".tbl_klass." l ON l.itemid = r.id
	left join ".tbl_klass." lb ON l.itemid = r.id and l.userid = '{$i}'
 where r.itemid='".$data['id']."' and r.categ='reply' group by r.id order by r.added desc limit ".$this->settings['PHOTO_VIEWER_COMMENTS_REPLIES_LIMIT']);

foreach($replies_q as $r_data):
$r_adaugat = $this->time_elapsed($r_data['r_added'],0,1);
$replies_to_reply = array();
// get replies of reply
$reply_of_reply = $this->query_select("
select 

COUNT(distinct l.id) as r_comm_likes_count,
COUNT(distinct lb.id) as r_liked_by_me,
ur.id as r_author,
ur.fullname as r_uname,
ur.profile_photo as r_uphoto,
ur.gender as r_ugender,
r.id as r_id,
r.updated as r_updated,
 r.itemid as r_parentid,
 r.added as r_added,
 r.text as r_text 
 
	from ".tbl_comments." r
	
	left join ".tbl_users." ur ON ur.id = r.userid
 	left join ".tbl_klass." l ON l.itemid = r.id
	left join ".tbl_klass." lb ON l.itemid = r.id and l.userid = '{$i}'
    where r.itemid='".$r_data['r_id']."' and r.categ='reply_to_reply' group by r.id order by r.added desc limit ".$this->settings['PHOTO_VIEWER_COMMENTS_REPLIES_LIMIT']);

foreach($reply_of_reply as $rr_data):

$rr_adaugat = $this->time_elapsed($rr_data['r_added'],0,1);
$replies_to_reply[] = array(

				'r_id' => $rr_data['r_id'],
			    'r_added' => $this->time_elapsed($rr_data['r_added'],1),
				'r_text' => $this->str_smilies($rr_data['r_text']),
				'r_comm_likes_count' => $rr_data['r_comm_likes_count'],
				'r_liked_by_me' => $rr_data['r_liked_by_me'] > 0 ? 1 : 0,
				'r_allow_edit' =>  ($rr_adaugat[0] < 5 && $rr_adaugat[1] == 'minute') || ($rr_adaugat[0] <= 60 && $r_adaugat[1] == 'second') ? 1 : 0,
				'r_author_name' => $rr_data['r_uname'],
				'r_author_id' => $rr_data['r_author'],
				'r_author_img' => $rr_data['r_uphoto'],
				'r_author_gender' => $rr_data['r_ugender'],
				'r_updated' => $rr_data['r_updated'] ? $this->time_elapsed($rr_data['r_updated']) : '',
				'r_can_be_edited' => strpos($r_data['r_text'],'[img]') || $rr_data['r_updated'] > 0 ? 0 : 1,
				'r_long_time_ag' => $this->time_elapsed($rr_data['r_added'])
				);
endforeach;

$replies_arr[] = array(

				'r_id' => $r_data['r_id'],
			    'r_added' => $this->time_elapsed($r_data['r_added'],1),
				'r_text' => $this->str_smilies($r_data['r_text']),
				'r_replies_count' => $r_data['replies_count'] ? $r_data['replies_count'] : '',
				'r_comm_likes_count' => $r_data['r_comm_likes_count'],
				'r_liked_by_me' => $r_data['r_liked_by_me'] > 0 ? 1 : 0,
				'r_allow_edit' =>  ($r_adaugat[0] < 5 && $r_adaugat[1] == 'minute') || ($r_adaugat[0] <= 60 && $r_adaugat[1] == 'second') ? 1 : 0,
				'r_author_name' => $r_data['r_uname'],
				'r_author_id' => $r_data['r_author'],
				'r_author_img' => $r_data['r_uphoto'],
				'r_author_gender' => $r_data['r_ugender'],
				'r_updated' => $r_data['r_updated'] > 0 ? $this->time_elapsed($r_data['r_updated']) : '',
				'r_can_be_edited' => strpos($r_data['r_text'],'[img]') || $r_data['r_updated'] > 0 ? 0 : 1,
				'r_long_time_ag' => $this->time_elapsed($r_data['r_added']),
				
				// replies of reply
				'r_of_reply' => $replies_to_reply

				);
endforeach;


$comm_data[] = array(		'id' => $data['id'],'comments_count' => $all_comments_count,
			     	'added' => $this->time_elapsed($data['added'],1),
				'text' => $this->str_smilies($data['text']),
				'replies_count' => !$data['replies_count'] ? '' : $data['replies_count'],
				'comm_likes_count' => $data['comm_likes_count'],
				'liked_by_me' => $data['liked_by_me'] > 0 ? 1 : 0,
				'allow_edit' =>  ($adaugat[0] < 5 && $adaugat[1] == 'minute') || ($adaugat[0] <= 60 && $adaugat[1] == 'second') ? 1 : 0,
				'author_name' => $data['uname'],
				'author_id' => $data['uid'],
				'author_img' => $data['uphoto'],
				'author_gender' => $data['ugender'],
				'can_be_edited' => strpos($data['text'],'[img]') || $data['updated'] > 0 ? 0 : 1,
				'updated' => $data['updated'] > 0 ? $this->time_elapsed($data['updated']) : '',
				'long_time_ag' => $this->time_elapsed($data['added']),
				
				// replies 
				'replies' => $replies_arr

				);
endforeach;
$res['s'] = 1;
$res['comments_count'] = $comm_count;
$res['comm_data'] = $comm_data;
}
////print_r($res);die;
echo json_encode($res);
}

// tagged request
public function tagged_request($str,$data){
$return_html = '';
$cond = 0;

if(sizeof($data))
{
$data_count = count(json_decode($data,true));
foreach(json_decode($data,true) as $res):
$userid = $res['userid'];
$_tag_uid_asTxt = preg_match('/as-text/',$userid);

if(!$_tag_uid_asTxt){
// select user names for respective tags
$t_ufn = $this->db->query("select id,fullname from ".tbl_users." where `id` = '".$res['userid']."' limit 1");
$t_ufn = $t_ufn->fetch_array(MYSQLI_ASSOC);
$return_html .= '<a class="tagged_req_notif" hrefattr="true" href="/profile?q='.$t_ufn['id'].'">'.$t_ufn['fullname'].'</a>' . ( $data_count > 1+$cond ? ',&nbsp;' : '&nbsp;' );
} else {
$return_html .= '<span title="'.$this->lang['tagged_as_text'].'" class="tag_as_text">'.$res['uname'].'</span>' . ( $data_count > 1+$cond ? ',&nbsp;' : '&nbsp;' );

}
$cond++;
endforeach;

}
return str_replace('%people%', $return_html, $str);
}



// notification text generator
public function notifText($text){

$str = str_replace('%remove_himself_from_post%', $this->lang['removed_himself_from_post'], $text);
$str = str_replace('%view_post%', $this->lang['view_post'], $str);
return $str;

}

 // check if the item is liked by respective user for shared posts
 public function likedByMeSharedContent($id){

	$q = $this->db->query("select COUNT(*) as c from ".tbl_klass." where `itemid`='{$id}' and `type`='shared-content' and `userid`='{$this->userid}'");
	$c = $q->fetch_row();	 
	return $c[0];  
 }
  
  // get album photos count
 public function albumPhotosCount($id){
     	 
    $id = $id == 0 ? '0' : $id;
	$q = $this->db->query("select COUNT(*) as c from ".tbl_photos." where `albumid`='{$id}'");
	$c = $q->fetch_row();	 
	return $c[0]; 
	 
 }
  // get likes count for shared posts
 public function getLikesCountSharedPost($id){
	 
 
	$q = $this->db->query("select COUNT(*) as c from ".tbl_klass." where `itemid`='{$id}' and `type`='shared-content'");
	$c = $q->fetch_row();	 
	return $c[0]; 
	 
 }
// get comments count for shared posts 
 public function getCommentsCountSharedPosts($id){
	 
  
	$q = $this->db->query("select COUNT(*) as c from ".tbl_comments." where  `itemid`='{$id}' and `categ` = 'comment' and `item_type`='shared-content' and `available`='yes'");
	$c = $q->fetch_row();   
	return $c[0]; 
	 
 }
 
 // get comments count
 public function getCommentsCount($id,$item_type,$community = 0){
	 
	$community = $community ? "`community`='yes' and" : ''; 
	$q = $this->db->query("select COUNT(*) as c from ".tbl_comments." where ".$community." `itemid`='{$id}' and `categ` = 'comment' and `item_type`='{$item_type}' and `available`='yes'");
	$c = $q->fetch_row();   
	return $c[0]; 
	 
 }
 // get likes count
 public function getLikesCount($id,$categ,$community = 0){
	 
	$community = $community ? "`community`='yes' and" : ''; 
	$q = $this->db->query("select COUNT(*) as c from ".tbl_klass." where ".$community." `itemid`='{$id}' and `type`='{$categ}'");
	$c = $q->fetch_row();	 
	return $c[0]; 
	 
 }
 
 // get user's shared posts count
  public function getUserSharedPostsCount($uid){
	 
	$q = $this->db->query("select COUNT(*) as c from ".tbl_shared_posts." where `userid`='{$uid}'");
	$c = $q->fetch_row();	 
	return $c[0]; 
	 
 } 
 // get share count
 public function getShareCount($id,$item_type = ''){
	$item_type = $item_type ? "and `post_type`='{$item_type}'" : '';
	$q = $this->db->query("select COUNT(*) as c from ".tbl_shared_posts." where `post_id`='{$id}' ".$item_type."");
	$c = $q->fetch_row(); 
 
	return $c[0];
	 
 }
 
 // check if content is shared by respective user
 public function cntSharedByMe($id,$item_type){
 
	$i = $this->USER['id'];
	$q = $this->db->query("select COUNT(*) as c from ".tbl_shared_posts." where `post_id`='{$id}' and `post_type`='{$item_type}'  and `userid`='{$i}'");
	$c = $q->fetch_row(); 
	return $c[0]; 
	 
 }
 
 // check if the item is liked by respective user
 public function likedByMe($id,$categ,$community = 0){
	 $community = $community ? "`community`='yes' and" : '';
	$q = $this->db->query("select COUNT(*) as c from ".tbl_klass." where ".$community." `itemid`='{$id}' and `type`='{$categ}' and `userid`='{$this->userid}'");
	$c = $q->fetch_row();	 
	return $c[0];  
 }
 
 // get posts count 
 public function getPostsCount($uid){
 
	$q = $this->db->query("select COUNT(*) as c from ".tbl_posts." where `userid`='{$uid}'");
	$c = $q->fetch_row(); 
	return $c[0]; 
 
 }

public function userGroupsCount ($uid) {
	$communities = new _COMMUNITIES(true);
	return $communities->myClubsCount($uid);
	
}


 // get count of shared links
 public function getSharedLinksCount($uid){
 
	$q = $this->db->query("select COUNT(*) as c from ".tbl_slinks." where `byuser`='{$uid}'");
	$c = $q->fetch_row(); 
	return $c[0]; 
 
 }
 
 // get count of posts that the user is tagged in
 public function getPostsTaggedByFriendsCount($uid){
 
	$q = $this->db->query("select COUNT(id) as c from ".tbl_posts." where `userid`<>'{$uid}' and `text` LIKE CONCAT('%[postTag]',{$uid},'[/postTag]%')");
	$c = $q->fetch_row(); 
	return $c[0]; 
 
 }
 
 // get user's feed count
 public function userFeedCount($uid){
	 
	$uid = isset($uid) ? (int) $this->test_input($uid) : 0;

		if(is_numeric($uid) && $uid > 0){
			
			$count = $this->db->query("select COUNT(id) as c from ".tbl_feed." where `byuser`='{$uid}' && `categ`<>'newfriend'");
			$count = $count->fetch_array(MYSQLI_ASSOC);
			$c = count($count) && isarray($count) ? $count['c'] : 0;
			return $c;
			
		} else {return 0;}
	 
	 
 }
 


// get music collection name
public function getMusicCollectionName($c_id)
{
	
	$col_id = (int) $c_id;
	$d = array();
	
	if($col_id){
		
		// select details about collection
		$q = $this->db->query("select `name`,`favorite_cover` from ".tbl_playlists." where `id`='{$col_id}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$d[] = array("name" => $r['name'], 'cover' => $r['favorite_cover']);
		
	}
	
	return $d;
}

// get all votes for respective poll]
public function get_all_answers($qid,$ord = false){

	// get all available answers
	$ans = $this->answer_options($qid,$ord);
	$stmt = $this->query_select("SELECT * FROM ".tbl_poll_answers." where `question_id` = '{$qid}'");
	$answer_count = 0;
	$count = array();
	foreach($stmt as $info){
		$answer_count++;
		$b = $info['option_id'];
		
		if ( isset($count[$b]) )
		$count[$b] += 1;
	else{
		$count[$b] = 0;
		$count[$b] += 1;
	}//$count[] = array( "opt" => $info['option_id'] += 1);
	}
	
	return json_encode(array("success" => 1,"total" => "$answer_count","details" => $count, "opt"=>$ans));
}

// get all options for respective poll
public function answer_options($qid,$ord = false){

	$stmt = $this->query_select("SELECT * FROM ".tbl_poll_options." where `question_id` = '{$qid}' order by id asc");
	$ans = array();
	foreach($stmt as $info){
		$ans[$info['id']] = $info['option'];
	}
	if(!$ord)krsort($ans);
	return $ans; 
}
 // get cities for respective country
 public function cRct($country_id = 0){
	 $q = array();

	 if($country_id)
	 $q = $this->query_select("select id,name from ".tbl_states." where `country_id`='{$country_id}' order by name asc");
	 
	 return $q;
 }
 
// online users
public function onlineUsers(){

$u_location = $this->USER['location_id'];
 
$g = isset($_GET['gender']) ? $this->test_input($_GET['gender']) : '';
$g = $g == "1" ? "male" : ($g == "2" ? "female" : '');
$frage = isset($_GET['fromage']) ? $this->test_input($_GET['fromage']) : '';
$toage = isset($_GET['toage']) ? $this->test_input($_GET['toage']) : '';

 
$c_location = isset($_GET['location']) ? $this->test_input($_GET['location']) : '';
$all_c = isset($_GET['allc']) ? 1 : 0;
$nog = isset($_GET['nog']) ? 1 : 0;
$my_id = $this->USER['id'];
$curr_addr = $_SERVER['REQUEST_URI'];
//$gender = $g_male && $g_female ? '' : (!$g_male && !$g_female ? '' : "and `gender`='{$g}'");
$gender = $g ? "and `gender`='{$g}'" : '';

$w_toage = $toage ? "and TIMESTAMPDIFF(YEAR, birthday, CURDATE()) <= '{$toage}'" : '';
$w_fromage = $frage ?  "and TIMESTAMPDIFF(YEAR, birthday, CURDATE()) >= '{$frage}'" : '';

if($all_c)
	$w = "where `id`<>0 ".$gender.$w_toage.$w_fromage;
else
	$w = "where `location_id` = '{$c_location}' ".$gender.$w_toage.$w_fromage;





$on_int = strtotime("-{$this->settings['ONLINE_INTERVAL']} minutes");
$q = $this->query_select("select * from ".tbl_users." ".$w." and `status`='confirmed' and `online` >= '{$on_int}' and `id`<>'{$my_id}' order by online desc,RAND() limit 100");
	
 
$this->template->assign( [ 

 "this" => $this,
 "q" => $q,
 "c_addr" => $curr_addr,
 "allc" => $c_location ? '' : $all_c,
 "nog" => $nog,
 "g" => $g,
 "frage" => $frage,
 "toage" => $toage,
 "c_location" => $c_location,
 "u_location_name" => $this->USER['location'],
 
 
 "user" => $this->USER,
 "_usermenu" => $this->theme_dir.$this->menuFile,
 '_wideMenu' => $this->theme_dir.$this->wideMenu 
 
 ] );

 echo $this->getPage($this->template->fetch($this->theme_dir.'/online/index.html'));

}



// get friend relationship
public function albumVisibleTo($album_arr,$userid){
	
$album_arr = json_decode($album_arr,true);

// get relative keywords
$rkeys = $this->getRelativesub();

if($this->USER['id'] === $userid){

	return 1;
	exit;
}

// if album is setted for everyone
if( (isarray($album_arr) && in_array("1", $album_arr) ) || !$album_arr) {return 1;exit;}



	
$fr_relationship_org = $this->getUserRelationShip($userid);	
$fr_relationship = strstr($fr_relationship_org,",") ? explode(",",$fr_relationship_org) : $fr_relationship_org;

// check for friend
$is_friend = $this->isfriend($userid);

// if album is setted only for relative
if( isarray($album_arr) && in_array("3", $album_arr) && $is_friend && !isarray($fr_relationship) && strstr($rkeys,$fr_relationship) ) 
{
	return 1;exit;
}
else if ( isarray($album_arr) && in_array("3", $album_arr) && $is_friend && isarray($fr_relationship) ){
	
	foreach($fr_relationship as $relationship):
	
	 if(strstr($rkeys,$relationship)){ return 1;exit;}
	 
	 endforeach;
}

$r = 0;

$arr = array(

				"1" => "everyone",
				"2" => "all_friends", 
				"3" => "relative", 
				"4" => "my_partner", 
				"5" => "best_friend", 
				"6" => "colleague", 
				"7" => "classmate", 
				"8" => "coursemate", 
				"9" => "army_friend"
				
				);
if( isarray($album_arr) && in_array("2", $album_arr) && $is_friend ) {return 1;exit;}
if( $album_arr && isarray($album_arr) ) {				
				
if( isarray($fr_relationship) ){
	foreach($fr_relationship as $relationship):
	
				
	    
				if( in_array(array_search($relationship,$arr),$album_arr) ) {$r = 1;break;}
	endforeach;

} else {
    
    	if( in_array(array_search($fr_relationship,$arr),$album_arr) ) {$r = 1;}
}

} else $r = $album_arr;

	return $r;
}

// gifts (page)
public function gifts(){

$i = $this->USER['id'];
$small_photo = $this->getUserPhoto($this->USER,'small');
$categ = isset($_GET['categ']) ? (int) $this->test_input($_GET['categ']) : '';
$attached_user = isset($_GET['u']) ? (int) $this->test_input($_GET['u']) : '';
$touser = '';

if($attached_user)
	$touser = $this->getUserDetails($attached_user);

$sql = "select * from ".tbl_gifts." where `categ`='{$categ}' order by added desc";
$query = $this->query_select($sql);

$this->template->assign([
						 'this' => $this,
						 'categ' => $categ,
						 'query' => $query,
						 'touser' => $touser,
						 'u' => $attached_user,
						 'i' => $i,
						 'user' => $this->USER,
						 '_usermenu' => $this->theme_dir.$this->menuFile,
						 '_wideMenu' => $this->theme_dir.$this->wideMenu,
						 'small_photo' => $small_photo
						 ]);
						 
$content = $this->template->fetch($this->theme_dir."/gifts/index.html");

echo $this->getPage($content);

}

// get gifts
public function getGifts($categ){
	
	$q = $this->query_select("select * from ".tbl_gifts." where `categ`='{$categ}' order by `added` desc limit 20");
	
		return $q;
	
}

// get gifts count
public function getGiftsCount($categ){
	
	
		return count($this->query_select("select id from ".tbl_gifts." where `categ`='{$categ}'"));
}

public function getPostAuthor($post_id){
	
	return $this->query_select("select u.* from ".tbl_users." u, ".tbl_posts." p where p.id='{$post_id}' and u.id=p.userid group by u.id limit 1");
	
	
}


// generate shared community post
public function generateCommunitySharedPost($clubid){
	
			 $this->template->assign("clubid",$clubid);
			 return $this->template->fetch($this->theme_dir.'/communities/shared.html');
	
}

// generate post content
public function generatePostContent($string,$type,$shared = false,$clubid = 0){
$this->clubid = $clubid;

	if($shared) {
		$_a_r = array();
		$_a_r['type'] = $type;
		
	$community = $clubid ? " and `community`='yes' and `clubid`='{$clubid}'" : "";	
 
 /*
    // check if is photo
	$check_photo = $this->db->query("select SQL_CALC_FOUND_ROWS id from ".tbl_photos." where `id`='{$string}' limit 1");
	$check_photo = $check_photo->fetch_array(MYSQLI_ASSOC);
	
	$is_photo = $this->db->query("SELECT FOUND_ROWS() as c");
	$is_photo = $is_photo->fetch_array(MYSQLI_ASSOC);
	$is_photo = $is_photo['c'];*/
	
	///if(! $is_photo ){
 
	// select post
	$_a_q = $this->db->query("select * from ".tbl_posts." where `id`='{$string}' ".$community."  limit 1");
	$_a_r = $_a_q->fetch_array(MYSQLI_ASSOC);
 	
	if($_a_r['community'] == 'yes'){
		$this->clubid = $_a_r['clubid'];
 
	} 
	
	///} else {
		//$_a_r = $check_photo;
	//	$_a_r['type'] = 'photos';
		
	//}
	

 
  
	switch($_a_r['type']) {
		
		case 'song':
		$string = "[postSong]".$_a_r['text']."[/postSong]";
		break;
		
		case 'club':  
		$string = "[community]".$_a_r['text']."[/community]";
		break;
		
		case 'photo':
		$string = "[postPhoto]".$_a_r['text']."[/postPhoto]";
		$type = "photo";
		break;
		
		case 'video':
		$string = "[postVideo]".$_a_r['text']."[/postVideo]";
		$type = "video";
		break;
		
		case 'post':
		$string = "[post]".$_a_r['text']."[/post]";
		$type = "post";
		break;
		
		default:
		$string = $_a_r['text'];
		break;
	}
	


	}
 
	switch($type){
		
		
	case 'bgcolor':

	$bgcolor = $color = '';

	$string = preg_replace_callback("/\[postBg\]((\s|.)+?)\[\/postBg\]/i", function($text) use (&$bgcolor) {
	$text = $text[1];
	$c = $text;
    $t_old = $text;
	
	$text = preg_replace_callback("/\[postBgColor\]((\s|.)+?)\[\/postBgColor\]/i", function($c) use (&$color) {
    $color = $c[1];
	return '';
	},$text);
 
	$fontsize = strlen($text) >= 150 && strlen($text) < 250 ? 'f27' : (strlen($text) >= 250 ? 'f21' : '');
	$text = strlen($text) > 251 ? substr($text,0,250)."..." : $text;

	$bgcolor = '<Div class="postbgcolored postonfeed-color-'.$color.'"><div class="postbgcol-text '. $fontsize .'">'.$this->str_smilies($text,false,false,true).'</div></div>';
	$bgcolor = $this->checkForTranslating($bgcolor);
	
	return '';
	
	},$string);
	

	return $bgcolor;



	break;		
		
		
		case 'post':
		
		$post_markup = '';
		$string = preg_replace_callback("/\[post\]((\s|.)+?)\[\/post\]/i", function($id) use (&$post_markup) { 

			$postid = $id[1];
			$a = $this->db->query("select * from ".tbl_posts." where `id`='{$postid}'  limit 1");
			$a = $a->fetch_array(MYSQLI_ASSOC);
			
			if($a['community'] == 'yes'){
				$clubid = $a['clubid'];
		 
			}  else {
				
				$clubid = 0;
			}

			$this->template->assign(["clubid" => $clubid, "pid" => $a['id'],"pd" => $a, "p_text" => $a['text']]);
			$post_markup .= $this->template->fetch($this->theme_dir.'/feed/post-shared.html');
		return '';
		}, $string);
		
		return $post_markup;//'<div id="post_shared">'.$post_markup.'</div>';
		break;
		
		
		case 'club':

		$community_markup = '';
		$string = preg_replace_callback("/\[community\]((\s|.)+?)\[\/community\]/i", function($id) use (&$community_markup) { 

			$clubid = $id[1];
 
			 $this->template->assign("clubid",$clubid);
			 $community_markup .= $this->template->fetch($this->theme_dir.'/communities/shared.html');



			return '';
			
		}, $string);
 
		return $community_markup;
		break;
		case 'video':
		case 'videos':

			// create videos
			$sh_videos = '';
			$string = preg_replace_callback("/\[postVideo\]((\s|.)+?)\[\/postVideo\]/i", function($id)use (&$sh_videos){

			
			$q = $this->clubid ? $this->db->query("select vd_duration as dur,`s3`,id,type as extension,vd_external as external,vd_name as title,filename,userid,views from ".tbl_communities_pics." where `id`='{$id[1]}' limit 1") : 
			$this->db->query("Select * from ".tbl_videos." where `id`='{$id[1]}' limit 1");
			$r = $q->fetch_array(MYSQLI_ASSOC);
			
			$video_cover = $this->clubid ? '/videoCover?v='.$r['id'].'&clubid='.$this->clubid : '/videoCover?v='.$r['id'];
			$video_meta = $this->clubid ? __COMMUNITIES_VIDEOS_DIR.$this->clubid.'/' : __VD_DIR.$r['userid'].'/videos/';
			$video_a_href = $this->clubid ? '/video?vid='.$r['id'].'&cmd=open&clubid='.$this->clubid : '/video?vid='.$r['id'].'&cmd=open';
			$vd_clubid = $this->clubid ? $this->clubid : false;
			
			
				
					$sh_videos .= 	'<div id="videojw_'.$r['id'].'" style="display:none;"></div>
	<div class="media-block2 media-video2">
	<div class="vid-card vid-card__xl">
		<div class="vid-card_cnt h-mod" data-video-meta=\'{"vd_p":"'.$video_meta.'","vd_s3_userid":"'.$r['userid'].'","vd_s3":"'.$r['s3'].'","s3_url":"'.$this->s3_video_url.'","vd_clubid":"'.$vd_clubid.'","vd_title":"'.$r['title'].'","vd_fn":"'.$r['filename'].'","vd_i":"'.$r['id'].'","vd_ext":"'. ($r['extension'] == 'NULL' ? $r['external'] : $r['extension']).'"}\'>
			<div class="vid-card_cnt_w"><div class="video-card-cover" style="background-image:url('.$video_cover.');"></div><i class="vid_play"></i><i class="vid-card_duration">'.$r['dur'].'</i></div>
		</div>
		<div class="ellip video-card_n-w"><a href="'.$video_a_href.'" data-ivideo="1" class="video-card_n ellip">'.$r['title'].'</a>
			<div class="video-card_info"><span class="video-card_info_i">'.$r['views'].'&nbsp;'.$this->lang['video_views'].'</span></div>
		</div>
	</div>
</div>
';
		return '';
	}, $string);
		
			return !empty($sh_videos) ? '<div class="media-block media-video">'.$sh_videos.'</div>' : '';
		
		break;
		
		case 'photo':
		case 'photos':
		
			// create photos
			$sh_photos = '';
			$all_post_img = array();
			$string = preg_replace_callback("/\[postPhoto\]((\s|.)+?)\[\/postPhoto\]/i", function($id)use (&$all_post_img){
				$all_post_img[] = $id[1];
				return '';
			},$string);
			
			if(count($all_post_img)):
		    foreach($all_post_img as $id):
			$is_gif = $this->is_gif($id, ($this->clubid ? true : false) );	
			
			// select author of photo
			$author = $this->clubid ? $this->db->query("select `userid` from ".tbl_communities_pics." where `id`='{$id}' limit 1") 
										:
										$this->db->query("select `userid` from ".tbl_photos." where `id`='{$id}' limit 1");
										
			$author = $author->fetch_array(MYSQLI_ASSOC);
			$author_id = $author['userid'];
			
			
					$sh_photos .= $this->clubid ? 
					'<div class="media-photos_i-w  __size-full">
							<div class="media-photos_i soh-s" data-imagescrollto="'.$id.'">
							<a href="/photo?q='.$author_id.'&clubid='.b_encode($this->clubid).'&show=filter-community&from=medium&o='.b_encode($id).'&pp='.b_encode(implode(',',$all_post_img)).'&cmd=openPhotoViewer&_token='.time().'" onclick="removePostViewer(event);return openPhotoViewer(event,this);" data-vphopen="1" data-vphi="'.base64_encode($id).'" class="media-photos_a">
							<img data-original="/clubpicture?clubid='.$this->clubid.'&i='.$id.'&size='.($is_gif ? 'medium' : 'large').'" '.( $is_gif ? 'data-gif-id="gif-'.$id.'" data-gif="/clubpicture?clubid='.$this->clubid.'&i='.$id.'&size=large" data-wait="true" data-playon="hover"' : '').' class="media-photos_img '. ($is_gif ? 'gifplayer' : '') .' "></a>
							</div></div>'
									
					: 
					
					'<div class="media-photos_i-w  __size-full">
							<div class="media-photos_i soh-s" data-imagescrollto="'.$id.'">
							<a href="/photo?q='.$author_id.'&show=filter&from=medium&o='.b_encode($id).'&pp='.b_encode(implode(',',$all_post_img)).'&cmd=openPhotoViewer&_token='.time().'" onclick="removePostViewer(event);return openPhotoViewer(event,this);" data-vphopen="1" data-vphi="'.base64_encode($id).'" class="media-photos_a">
							<img data-original="/getPhoto?p='.$id.'&sz='.($is_gif ? 'medium' : 'large').'" '.( $is_gif ? 'data-gif-id="gif-'.$id.'" data-gif="/getPhoto?p='.$id.'&sz=large" data-wait="true" data-playon="hover"' : '').' class="media-photos_img '. ($is_gif ? 'gifplayer' : '') .' "></a>
							</div></div>';
			endforeach;
			endif;
			
			return !empty($sh_photos) ? '<div class="media-block media-photos">'.$sh_photos.'</div>' : '';
		
		break;
		
// create songs
case 'tracks':


	$tracks_markup = '';

$string = preg_replace_callback("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", function($id) use (&$tracks_markup) { 

// select info for respective song
$q = $this->db->query("select id,artist,title,album,cover,path as filename from ".tbl_songs." where `id`='{$id[1]}' limit 1");
$r = $q->fetch_array(MYSQLI_ASSOC);

$tracks_markup .= sprintf('<div class="track __media-status songpsh"><div class="track_hld soh-s"><span id="pm_sec_outsite_track_%s" class="track_play" data-track-inf=\'{"track":"%s","cover":"%s","artist":"%s","songname":"%s","albumname":"%s"}\' onclick="nobilMusicPlayOutsideTrack(this,event)"></span><div class="track_cnt textWrap"><span class="track_song ellip"><A onclick="nobilMusicSearch(\'%s\');">%s</a> - <A onclick="nobilMusicSearch(\'%s\');">%s</a> <span class="foh-s track_info"> %s <a onclick="nobilMusicSearch(\'%s\');" class="track_album">%s</a></span></span></div></div></div>'
,$r['id'],$r['filename'],$r['cover'],$r['artist'],$r['title'],$r['album'],$r['artist'],$r['artist'],$r['title'],$r['title'],$this->lang['from'],$r['album'],$r['album']);


return '';
}, $string);


return !empty($tracks_markup) ? '<div class="media-music">'.$tracks_markup.'</div>' : '';


break;
		
		// create links
		case 'links':
		$link_markup = '';
			// create links
	$string  = preg_replace_callback("/\[postLink\]((\s|.)+?)\[\/postLink\]/i", function($id) use (&$link_markup) {
	
		
		// select info about the link
		$q = $this->db->query("select * from ".tbl_slinks." where `id`='{$id[1]}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		
		if(count($r)){
		
		$d = json_decode($r['data'],true);

		$is_video = isset($d['type']) ? ($d['type'] == 'video' ? '<div class="preview-link-has-video"><div class="preview-v-play-ic"></div></div>' : '') : '';
		$no_image = isset($d['image']) ? ($d['image'] != '' ? '' : '__noimage') : '__noimage';
		$is_image = isset($d['image']) ? ($d['image'] != '' ? '<img src="'.$d['image'].'">' : '') : '';
		$is_title = isset($d['title']) ? (!empty($d['title']) ? $d['title'] : '') : '';
		$is_descr = isset($d['description']) ? (!empty($d['description']) ? $d['description'] : '') : '';
		$is_url = isset($d['url']) ? (!empty($d['url']) ? $d['url'] : '') : '';
		$is_site_name = isset($d['site_name']) ? (!empty($d['site_name']) ? $d['site_name'] : '') : '';
		$is_only_img = isset($d['type']) ? ($d['type'] == 'image' ? $d['image'] : '') : '';
		$is_only_video = isset($d['type']) ? ($d['type'] == 'video' ? $d['image'] : '') : '';
		
		$link_markup .= sprintf( '<a class="ext_lnk_href" title="%s" href="/r?u=%s" target="_blank"><div class="shared-post_url_preview soh-s" id="su-%s">
									
									<div class="link-preview-image-thumb %s">
									%s %s</div>
									<div class="preview-info-cnt">
									<div class="link-preview-title ellip textWrap">%s</div>
									<div class="link-preview-description textWrap">%s</div>
									<div class="link-preview-site-name textWrap"><a href="/r?u=%s">%s</a></div>
									</div>
									
									</div></a>
									',$is_site_name,$is_url,$r['id'],$no_image,$is_video,$is_image,$is_title,$is_descr,$is_url,$is_site_name);
		}					
		},$string);
		return $link_markup;
		break;
		
		
case 'tagged_people':

    $userTagged = '';

	// create tagged users
    $string = preg_replace_callback("/\[postTag\]((\s|.)+?)\[\/postTag\]/i", function($id)  use (&$userTagged) {

		$q = $this->db->query("select id,fullname,gender,profile_photo as photo from ".tbl_users." where `id`='{$id[1]}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		static $c = 0;

		$userTagged .= ($c > 0 ? ',&nbsp;' : '').'<span class="post-tg-people"><A class="o" href="/profile?q='.$r['id'].'" hrefattr="true">'.$r['fullname'].'</a></span>';
		$c++;
		return'';

	}, $string);

	
	return !empty($userTagged) ? $this->lang['with'].'&nbsp;'.$userTagged : '';
	
break;

case 'places':
    
	// create places
	$place = '';

	$string = preg_replace_callback("/\[postPlace\]((\s|.)+?)\[\/postPlace\]/i", function($id) use (&$place) {

	// load data from database
	$q = $this->db->query("select * from ".tbl_checkin." where `id`='{$id[1]}' order by added desc limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);

	$jdata = json_decode($r['data'],true);
	
	$place_name = isset($jdata['pl-n']) && $jdata['pl-n'] != '' ? $jdata['pl-n'] : '';
	$location = '<div class="map-box __none"><div class="hookMapData"><!--'.$r['data'].'--></div></div>';
	$place_ln = $jdata['pl-ln'];
	$place_lt = $jdata['pl-lt'];
	$data = ' <span class="post_jb_tip_map" id="'.$r['id'].'"><span class="f12">'.($jdata['pl-type'] == 'vilage' || $jdata['pl-type'] == 'town' || $jdata['pl-type'] == 'city' || $jdata['pl-type'] == 'country' ? $this->lang['in'] : $this->lang['at']).' <strong><A href="javascript:void(0);" onclick="searchPlaceInGroups(this,\''.$place_ln.'\',\''.$place_lt.'\');">'.$place_name.'</a></strong></span></span>'.$location;
	$map_loc = '<div class="post-tip-map-loc media-map" id="feed-tip-map-loc-'.$r['place_id'].'"><div class="map_loading"><div class="map_load_ic tico_img"></div></div></div>';
	$place = $data.$map_loc;
	return '';
	},$string);
	

return $place;
break;

// generate poll
case 'poll':

	$m_poll = '';

	$string = preg_replace_callback("/\[poll\]((\s|.)+?)\[\/poll\]/i", function($id) use (&$m_poll) {
	
	$id = $id[1];
	$m_poll = $this->getPollMarkup($id);

	return '';
	},$string);
	

return $m_poll;
break;

/// simple text
case 'text':
$string = preg_replace("/\[postPlace\]((\s|.)+?)\[\/postPlace\]/i", "", $string); // escape places
$string = preg_replace("/\[postTag\]((\s|.)+?)\[\/postTag\]/i", "", $string);  // escape tagged people
$string = preg_replace("/\[postSong\]((\s|.)+?)\[\/postSong\]/i", "", $string); // escape songs
$string = preg_replace("/\[postPhoto\]((\s|.)+?)\[\/postPhoto\]/i", "", $string); // escape photos
$string = preg_replace("/\[postVideo\]((\s|.)+?)\[\/postVideo\]/i", "", $string); // escape videos
$string = preg_replace("/\[postLink\]((\s|.)+?)\[\/postLink\]/i", "", $string); // escape links
$string = preg_replace("/\[poll\]((\s|.)+?)\[\/poll\]/i", "", $string); // escape polls
$string = preg_replace("/\[community\]((\s|.)+?)\[\/community\]/i", "", $string); // escape communities
$string = preg_replace("/\[post\]((\s|.)+?)\[\/post\]/i", "", $string); // escape posts


 
return '<div class="media-text_cnt"><span class="media-block media-text">'.$this->str_smilies($string).'</span></div>';
break;	


		
		
}

	
}

// details about community
public function getCommunityDetails($id){
	
	$q = $this->db->query("select * from ".tbl_communities." where `id`='{$id}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	$r['logo_path'] = $this->settings['HOST'].__COMMUNITIES_IMAGES_DIR.'/small/'.$id.'/';
	$r['cover_url'] = !empty($r['cover']) ? ($this->CheckS3Pictures($r['cover']) ? $r['cover'] : $this->settings['HOST'].__COMMUNITIES_COVERS_DIR.$r['cover']) : $this->settings['GROUPS_DEFAULT_COVER'];
	
 
	$r['default_logo'] = __COMMUNITIES_DEFAULT_IMAGE;
	return $r;
}

public function getGroupVideoDetails($video_id){
	$q = $this->db->query("select * from ".tbl_communities_pics." where `id`='{$video_id}' limit 1");
	return $q->fetch_array(MYSQLI_ASSOC);
}

// check if the user is subscribed to group
public function CheckUserInGroup($clubid){
	$a = new _COMMUNITIES(true);
	return $a->isSubscribed($clubid);
}

// check if user from the group is admin
public function checkGroupAdmin($uid,$clubid){
	
	$a = new _COMMUNITIES(true);
	return $a->isAdmin($uid,$clubid);
	
}


/*
// community details
public function communityDetails($group_id){
	$c = new _COMMUNITIES;
	return $c->groupDetails( $group_id );
}*/


// users on map
public function usersOnMap(){
	
 $this->template->assign([ "this" => $this ]);
 $content = $this->template->fetch($this->theme_dir.'/users-on-map/index.html');
 
echo $this->getPage($content);
}

public function getMapNotifications(){
 
	$i = $this->USER['id'];
	//$ignore_ids = isset($_POST['ignore_ids']) ? implode(',',json_decode($ignore_ids,true)) : '';
	$ignore_ids = isset($_SESSION['ignore_fmapbox_ids']) ? implode(',',$_SESSION['ignore_fmapbox_ids']) : 0;
	 
	$dt = strtotime('-2 hours');
	$q = $this->db->query("select * from ".tbl_friends_on_map." where `available`='yes' and `userid`<>'{$i}' AND `time` > '{$dt}' and FIND_IN_SET(id, '{$ignore_ids}') = 0");
	$count = $q->num_rows;
	$count = $this->nearbyPeopleCount(1) + $count; 
	
	
	
	return $this->sendResponse(['response' => '1', 'count' => $count]);
}
 
public function getUserBooks($uid,$limit = 6){
	
	$q = $this->query_select("select SQL_CALC_FOUND_ROWS b.*,p.json,p.page_id as p_pageid from ".tbl_users_books." b 
	
	left join ".tbl_pages." p ON p.id = b.page_id and p.type='book'
	
	where b.userid='{$uid}' order by b.id desc limit ".$limit);
	$count = $this->db->query("SELECT FOUND_ROWS() as c");
	$count = $count->fetch_array(MYSQLI_ASSOC);
	$count = $count['c'];
	
	return [$count,$q];
 
	 
	
}
public function getUserMovies($uid,$limit = 6){

	$q = $this->query_select("select SQL_CALC_FOUND_ROWS m.*,p.json,p.page_id as p_pageid from ".tbl_users_movies." m 
	
								left join ".tbl_pages." p ON p.id = m.page_id and p.type='movie'
								where m.userid='{$uid}' group by m.id order by m.id desc limit ".$limit);
	$count = $this->db->query("SELECT FOUND_ROWS() as c");
	$count = $count->fetch_array(MYSQLI_ASSOC);
	$count = $count['c'];
	
	return [$count,$q];
 
	 
	
}
public function checkIfTheMovieIsAlreadyInColl($id){
	
	$i = $this->USER['id'];
	// check if page is liked by respective user
	return count($this->query_select("select id from ".tbl_users_movies." where `page_id`='{$id}' and `userid`='{$i}' limit 1"));
}
public function checkIfTheBookIsAlreadyInColl($id){
	
	$i = $this->USER['id'];
	// check if page is liked by respective user
	return count($this->query_select("select id from ".tbl_users_books." where `page_id`='{$id}' and `userid`='{$i}' limit 1"));
}
public function getUserCountLikedPage($page_id,$type,$a = false){
	
	
	switch($type){
		
		case 'movie':

		$q = $this->db->query("select COUNT(*) from ".tbl_users_movies." where `page_id`='{$page_id}'");
		$q = $q->fetch_row();
		$c = $q[0];

		break;
		
		case 'book':

		$q = $this->db->query("select COUNT(*) from ".tbl_users_books." where `page_id`='{$page_id}'");
		$q = $q->fetch_row();
		$c = $q[0];
		 
		break;
		
		
	}
	
	return $a ? $this->noMonHund($c) : $c;
	
}
public function pageNotFound(){
	
 $content = $this->template->fetch($this->theme_dir.'/pages/not-found.html');
 
 echo $this->getPage($content);

 exit;
}
public function buildPage() {
	
 $i = $this->USER['id'];	
 $id = isset($_GET['id']) ? $this->test_input($_GET['id']) : '';
 $type = isset($_GET['categ']) ? $this->test_input($_GET['categ']) : '';
 $id = str_replace('.php','',$id);
 
 $q = $this->db->query("select * from ".tbl_pages." where `id`='{$id}' and `type`='{$type}' limit 1");
 $r = $q->fetch_array(MYSQLI_ASSOC);
 
 
 // for not found pages
 if(!$r['id']){

 return $this->pageNotFound();

	 
 }
 
 
 
 
 $page_cover = $ic = "";
 $item_data = json_decode($r['json'],true);
 $page_data = array();
 $check = false;
 $cover_url = $r['cover'];
  
 switch($type)
 {
	 
	 case 'movie':
	 
	// check if page is liked by respective user
	$check = count($this->query_select("select id from ".tbl_users_movies." where `page_id`='{$id}' and `userid`='{$i}' limit 1"));
	 
	 
	 $page_cover = "/movieGetPoster?p=".urlencode($r['cover']);
	 $ic = '<i class="icofont icofont-film">&#xeff9;</i>';
	 
	 $page_data['released_date'] = $page_data['overview'] = '';
	 
	 
	 if ( isset($item_data['release_date']) ) {
		 
		$page_data['release_date'] = $item_data['release_date'];
		
	 }
	 
	 if ( isset($item_data['overview']) ) {
		 
		$page_data['overview'] = $item_data['overview'];
		
	 }

	 
	 
	 break;
	 
	 
	 case 'book':
	 
		// check if page is liked by respective user
		$check = count($this->query_select("select id from ".tbl_users_books." where `page_id`='{$id}' and `userid`='{$i}' limit 1"));
	
	 
	 $ic = '<i class="icofont icofont-book">&#xef8f;</i>';
	 $page_cover = "/bookGetPoster?p=".urlencode($r['cover']);
	 $page_data['authors'] = $page_data['publish_date'] = $page_data['textSnippet'] = $page_data['description'] = $page_data['publisher'] = $page_data['pageCount'] = $page_data['categories'] = '';
	 
	 if ( isset($item_data['volumeInfo']['authors']) ) {
		$authors = $item_data['volumeInfo']['authors'];
		$page_data['authors'] = isarray( $authors ) ? implode(',',$authors) : $authors;
		
	 }
	 
	 if ( isset($item_data['volumeInfo']['publishedDate']) ) {
		 
		$page_data['publish_date'] = $item_data['volumeInfo']['publishedDate'];
		
	 }
	 
	 if ( isset($item_data['searchInfo']['textSnippet']) ) {
		 
		$page_data['textSnippet'] = $item_data['searchInfo']['textSnippet'];
		
	 }
	

	 if ( isset($item_data['volumeInfo']['description']) ) {
		 
		$page_data['description'] = $item_data['volumeInfo']['description'];
		
	 }
	
	 if ( isset($item_data['volumeInfo']['publisher']) ) {
		 
		$page_data['publisher'] = $item_data['volumeInfo']['publisher'];
		
	 }
	
	
	 if ( isset($item_data['volumeInfo']['pageCount']) ) {
		 
		$page_data['pageCount'] = $item_data['volumeInfo']['pageCount'];
		
	 }

	 
	 if ( isset($item_data['volumeInfo']['categories']) ) {
		 
		$categories = $item_data['volumeInfo']['categories'];
		$page_data['categories'] = isarray( $categories ) ? implode(',',$categories) : $categories;

		
	 }
	 
	 
	
	 break;
	 
	 
 } 
 
 
 
 $this->template->assign([ "r" => $r, "is_in_coll" => $check, "type" => $type, "ic" => $ic, "page_data" => $page_data, "cover_url" => urlencode($cover_url), "cover" => $page_cover, "id" => $id, "this" => $this ]);
 $content = $this->template->fetch($this->theme_dir.'/pages/index.html');
 
 echo $this->getPage($content);
	
}

public function addPageItemToMyColl(){
	
	$data = isset($_POST['sdata']) ? (isJson($_POST['sdata']) ? json_decode($_POST['sdata'],true) : false) : false;

	$r = 0;
	
	if( isarray($data) ){
		
	
	$id = $data['id'];
	$type = $data['type'];
	$cover = $data['cover'];
	$title = urldecode($data['title']);
	$orig_page_id = $data['page_id'];
	
	switch($type)
	{
		
		case 'movie':
		
		$check = count($this->query_select("select id from ".tbl_users_movies." where `page_id`='{$id}' and `userid`='{$this->userid}' limit 1"));
		$add = $this->query_delete("insert into ".tbl_users_movies." set `movie_title`='{$title}',`movie_cover`='{$cover}',`movie_id`='{$orig_page_id}', `page_id`='{$id}',`userid`='{$this->userid}'");
		if($add && !$check) $r = 1;
		break;
		
		case 'book':
		$check = count($this->query_select("select id from ".tbl_users_books." where `page_id`='{$id}' and `userid`='{$this->userid}' limit 1"));
		$add = $this->query_delete("insert into ".tbl_users_books." set `book_title`='{$title}',`book_cover`='{$cover}',`book_id`='{$orig_page_id}', `page_id`='{$id}',`userid`='{$this->userid}'");
		if($add && !$check) $r = 1;
		break;

	}

	

		
	}
		
		
	return $r;	
	
	
	
}


public function removePageItemFromColl(){
	
	$type = isset($_POST['type']) ? $this->test_input($_POST['type']) : '';
	$page_id = isset($_POST['page_id']) ? $this->test_input($_POST['page_id']) : '';
	$r = 0;
	switch($type)
	{
		
		case 'movie':
		$table = tbl_users_movies;
 
		break;
		
		case 'book':
		$table = tbl_users_books;
		break;
		
		
	}
	
		$remove = $this->query_delete("delete from ".$table." where `page_id`='{$page_id}' and `userid`='{$this->userid}'");
		if($remove) $r = 1;
		
		
	return $r;	
}
 

 public function buildUserBooksPage($uid){
	 
    $user = $this->getUserDetails($uid);
	 
	$this->template->assign(["this" => $this, "user" => $user, "books" => $this->getUserBooks($uid,100)]); 
	echo $this->getPage($this->template->fetch($this->theme_dir.'/profile/books.html'));
 }
 
 public function buildUserMoviesPage($uid){
	 
    $user = $this->getUserDetails($uid);
	 
	$this->template->assign(["this" => $this, "user" => $user,	'_usermenu' => $this->theme_dir.$this->menuFile, '_wideMenu' => $this->theme_dir.$this->wideMenu, "movies" => $this->getUserMovies($uid,100)]); 
	echo $this->getPage($this->template->fetch($this->theme_dir.'/profile/movies.html'));
 }
 public function getMarketProductDetails($id){
	 $q = $this->db->query("select * from ".tbl_market." where `id`='{$id}' limit 1");
	 return $q->fetch_array(MYSQLI_ASSOC);
 }
 
 
public function getUserGroups( $userid, $limit = 3 ){
	$sql = $this->query_select("select c.* from ".tbl_communities_followers." f, ".tbl_communities." c
	where c.id = f.group_id and f.userid='{$userid}' group by c.id
	order by created desc limit ".$limit);
	
	return [count($sql),$sql];

}	

public function UsergetLastPictures($uid,$limit = 5){
	
	return $this->query_select("select * from ".tbl_photos." where `userid`='{$uid}' order by id desc limit ".$limit);
	
}
} // end Classs