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



class _c_global_co extends _SOCIALPLUS {

public $userid;
public $ntime;

public function __construct(){

//the old building from parent class
parent::__construct();

// define the user id
$this->userid = $this->USER['id'];
$this->ntime = time();

if(!$this->userid || !is_numeric($this->userid)) die;

}

// add like to the comment
public function sendCommLike(){
$comm_id = isset($_POST['comm_id']) ? (int) $this->test_input($_POST['comm_id']) : 0;
$res = 0;



if(is_numeric($comm_id) && $comm_id){

// check if the comment exist
$c_details_q = $this->db->query("select id,userid,itemid,community,item_type from ".tbl_comments." where `id`='{$comm_id}' limit 1");
$c_details = $c_details_q->fetch_array(MYSQLI_ASSOC);
$c_exist = isset($c_details['id']) ? 1 : 0;
$comment_by = isset($c_details['userid']) ? $c_details['userid'] : false;
$comment_for_itemid = isset($c_details['itemid']) ? $c_details['itemid'] : 0;
$in_community =  $c_details['community'] == 'yes' ? true : false;
$item_type = isset($c_details['item_type']) ? $c_details['item_type'] : 'post';
//echo 'COMMBY--'.$comment_by;die;


if($c_exist){

// check for dislike
$c = $this->db->query("select distinct id from ".tbl_klass." where `itemid`='{$comm_id}' and `userid`='{$this->userid}' and type='comment' limit 1");
$c_liked = $c->num_rows;

if(!$c_liked){
// send like
$add = $this->query_insert("insert into ".tbl_klass." set `itemid`='{$comm_id}',
							    `userid`='{$this->userid}',
							    `type`='comment'
			     ");

if($add) {
 
	$condition = $comm_id.'|'.$this->userid; 
		
	if($comment_by && $comment_by !== $this->userid) { $this->toNotif($comment_by,'comment-like',$comment_for_itemid,$item_type,$condition,$in_community);}
	$res = 1;
	
	}

} else {
	
// remove like
$delete = $this->query_delete("delete from ".tbl_klass." where `itemid`='{$comm_id}' and
							    `userid`='{$this->userid}' and
							    `type`='comment'
			     ");

if($delete) {
	
	if($comment_by && $comment_by !== $this->userid){
	$condition = $comm_id.'|'.$this->userid;
	// delete from notification
	$delete_notification = $this->query_delete("delete from ".tbl_notif." where `categ`='comment-like' and `item`='{$comment_for_itemid}' and `condition`='{$condition}'");
	}
	
	
	$res = 3;
	
	
	}
	
}


} else $res =2;


}


echo $res;


}

// post reply to comment
public function postReplyToComment(){

$text = isset($_POST['comment']) ? $this->test_input($_POST['comment']) : '';
$comm_id = isset($_POST['commid']) ? (int) $this->test_input($_POST['commid']) : '';
$reply_to_reply = isset($_POST['reply_to_reply']) ? (int) $this->test_input($_POST['reply_to_reply']) : '';
$categ = $reply_to_reply ? 'reply_to_reply' : 'reply';


$res = array();
$res['s'] = 0;
if(is_numeric($comm_id) && $comm_id && $text){

// check for comment
$c = $this->db->query("select id from ".tbl_comments." where `id`='$comm_id' limit 1");
$c = $c->num_rows;
/*
// check for own comment (if is the own comment of the user who post, denied)
$cc = $this->db->query("select id from ".tbl_comments." where `id`='$comm_id' and `userid`='$this->userid' limit 1");
$cc = $cc->num_rows;
$cc = $reply_to_reply ? 0 : $cc;
*/
// all it's okay
if($c ){

// insert reply
$insert = $this->query_insert("insert into ".tbl_comments." SET `userid`='{$this->userid}',
								`itemid`='{$comm_id}',
								`categ`='{$categ}',
								`added`='{$this->ntime}',
								`text`='{$text}'
				");

$res['s'] = 1;
$res['comm_id'] = $insert;
$res['added'] = $this->time_elapsed($this->ntime,1);
$res['text'] = $this->str_smilies($text);

}
}
echo json_encode($res);

}

// update comment (editing comment)
public function updateComment(){
	$response = 0;
	$comm_id = isset($_POST['comm_id']) ? (int) $this->test_input($_POST['comm_id']) : '';
	$update_by = isset($_POST['up_from']) ? (int) $this->test_input($_POST['up_from']) : '';
	$text = isset($_POST['text']) ? $this->test_input($_POST['text']) : '';

	if($this->userid != $update_by) $response = 0;
	else if(empty($text) || !$text) $response = 2;
		else {

		// check for comment
		$check = count($this->query_select("select id from ".tbl_comments." where `id`='{$comm_id}' and `updated`='0' and `userid`='$this->userid' limit 1"));
		if(!$check) $response = 3;
		else {
						
			$update = $this->query_update("update ".tbl_comments." set `text`='{$text}', `updated`='$this->ntime' where `id`='$comm_id'");
			if($update) $response = $this->str_smilies($text);
		}
	}
	echo $response;
}

// get people who liked a comment
public function CommentHoverLikesPeople(){
	$comm_id = isset($_POST['comm_id']) ? (int) $this->test_input($_POST['comm_id']) : '';
	$resp = 0; // error
	$data = $users = array();
	if($comm_id){
		
		// check for comment
		$c = count($this->query_select("select id from ".tbl_comments." where `id`=".$comm_id." limit 1"));
		if($c){
			
			$q = $this->query_select("select SQL_CALC_FOUND_ROWS u.id,u.fullname,u.profile_photo,u.gender from ".tbl_klass." k
			left join ".tbl_users." u ON u.id = k.userid
			where k.itemid='$comm_id' and k.type='comment' group by u.id limit 10");
			$total_users_count = $this->db->query("select FOUND_ROWS() as c");
			$total_users_count = $total_users_count->fetch_array(MYSQLI_ASSOC);
			$total_users_count = $total_users_count['c'];
			foreach($q as $r){
				
				$users[] = array("id" => $r['id'], "fname" => $r['fullname'], "photo" => $r['profile_photo'], "gender" => $r['gender']);
				
			}
			
			$data['count'] = $total_users_count; 
			$data['users'] =  $users;
			$resp = count($users) ? json_encode($data) : 2;
		} else {
			
			$resp = 2; // not found the comment
		}
		
	}
	
	echo $resp;
}

// face detect in photos
public function faceDetect(){

// turn off error reporting	
error_reporting(0);
	
$photo_id = isset($_POST['photo']) ? $this->test_input($_POST['photo']) : '';
$user_id = isset($_POST['user']) ? $this->test_input($_POST['user']) : '';

if(!$photo_id || !is_numeric($photo_id) || !is_numeric($user_id))
	$response = 0; // error photo id

$query = $this->db->query("select filename from ".tbl_photos." where `id`='$photo_id' limit 1");
$result = $query->fetch_array(MYSQLI_ASSOC);

if(!$result['filename']) $response = 2; // photo not found
else {	
//echo $this->detectionDAT;
//exit;

$face_detect = new Face_Detector(__ROOT__.$this->detectionDAT);
$face_detect->face_detect(__ROOT__.__IMG_DIR.$user_id.'/large/'.$result['filename']);
$response = $face_detect->toJson();

}

echo $response;
	
}


// php face detector
public function phpFaceDetector(){
	

$photo = isset($_POST['photo']) ? $this->test_input($_POST['photo']) : '';
$user_id = isset($_POST['user']) ? $this->test_input($_POST['user']) : '';

if(!$photo)
	$response = 0;

/*
if(!$photo_id || !is_numeric($photo_id) || !is_numeric($user_id))
	$response = 0; // error photo id


$query = $this->db->query("select filename from ".tbl_photos." where `id`='$photo_id' limit 1");
$result = $query->fetch_array(MYSQLI_ASSOC);

if(!$result['filename']) $response = 2; // photo not found
else {	
*/
require_once 'phpfacedetector/detector.class.php';


	$data = array();

	$detect = new FaceDetector($photo);

	if(! $detect->faceDetect() ) die(  json_encode($data) );

	$data['faces'] = $detect->getFaces();
	$data['size'] = $detect->getImgSize();

	$response = json_encode($data);
	

echo $response;
	
}

// get all friends (JSON)
public function JSONgetAllFriends(){
if (!$this->userid){ echo json_encode([]); exit;}
	$query = $this->query_select("select u.fullname as name,u.profile_photo as photo, u.id as id, u.gender as gender from ".tbl_users." u, ".tbl_friends." f
						
								where u.id = f.friendid and f.userid='{$this->userid}' and f.status='confirmed' and u.allow_tag_photos='friends'
								
								group by f.friendid order by u.name asc
		
	");
	
	echo json_encode(count($query) ? $query : []);
	
	
}

// save tags in photo
public function savePhotoTags(){
	$photo_id = isset($_POST['photo']) ? $this->test_input($_POST['photo']) : '';
	$tags = isset($_POST['tags']) ? json_decode($_POST['tags'],true) : '';
	$post_by_user = isset($_POST['byu']) ? $this->test_input($_POST['byu']) : '';
	$remove_himself = isset($_POST['removeHimself']) ? ($_POST['removeHimself'] != '' ? 1 : 0) : 0;
	$tag_data = $userids_x = $userids_y = array();
	$userid = $photoid = $users_id  = '';
    $res = 0;
	$tags_req = $tags;
	//print_r($tags);exit;
	
	
	// select photo owner
	$p_ow = $this->db->query("select `userid` from ".tbl_photos." where `id`='{$photo_id}' limit 1");
	$p_ow = $p_ow->fetch_array(MYSQLI_ASSOC);

	// delete tags
if(!$tags || !sizeof($tags)) {
	
	// select users id for delete photos from tagged album
	$d_s = $this->db->query("select `data` from ".tbl_tags." where `itemid`='{$photo_id}' and `type`='photo' limit 1");
	$d_s = $d_s->fetch_array(MYSQLI_ASSOC);
	
	
	if($d_s['data'] && sizeof($d_s['data'])){
	foreach(json_decode($d_s['data'],true) as $d_res):
	$d_userid = $d_res['userid'];

	// remove photo from tagged album
	$this->query_delete("delete from ".tbl_tag_album." where `photoid`='{$photo_id}' and `userid`='$d_userid'");	
	endforeach;
	}
	
	  // delete tags for respective photo
	  $this->query_delete("delete from ".tbl_tags." where `itemid`='{$photo_id}' and `type`='photo'");
	
	   $res = 0;
} else {
	
	foreach($tags as $tag){
	$photoid = $tag['photo'];
	$userid = $tag['user'];
	$pos_top = $tag['pos_top'];
	$pos_left = $tag['pos_left'];
	$_tg_uid_asTxt = preg_match('/as-text/',$userid);
	
	if(!$_tg_uid_asTxt){
	$tag_data[] = array("userid" => $userid, "p_top" => $pos_top, "p_left" => $pos_left );
    $userids_x[] = $userid;
    } else {
			// for tag as text
			$tag_data[] = array("userid" => $userid, "uname" => $tag['uname'], "p_top" => $pos_top, "p_left" => $pos_left );
	}
   	if(!$_tg_uid_asTxt){ // check if tag is not as text
	
	
	// check if the notification is already sended
	$c_n = $this->db->query("select id from ".tbl_notif." where categ='photo_tags' and userid='{$userid}' and item='{$photoid}' and json='{$this->userid}' limit 1");
	$c_n = $c_n->fetch_array(MYSQLI_ASSOC);
	
	if(!$c_n && $userid != $p_ow['userid']){
	 if($userid !== $post_by_user)	
	 $this->toNotif($userid,'photo_tags',$photoid,$this->userid);
    }
	
	// check if photo has been added in tagged album
	$c_a = $this->db->query("select id from ".tbl_tag_album." where `userid`='{$userid}' and `photoid`='{$photoid}' limit 1");
	$c_a = $c_a->fetch_array(MYSQLI_ASSOC);
	

	if(!$c_a && $userid != $p_ow['userid'] && $userid !== $post_by_user)
	// photo has not found, then insert it
	$this->query_insert("insert into ".tbl_tag_album." set `photoid`='{$photoid}',`userid`='$userid'");
	}
	
	}
	
    $data = json_encode($tag_data);
	
	// check who want to save this tags
	$c = $this->db->query("select `userid` from ".tbl_photos." where `id`='{$photoid}' limit 1");
	$c = $c->fetch_array(MYSQLI_ASSOC);
	
	$c_t = $this->db->query("select `data` from ".tbl_tags." where `itemid`='{$photoid}' and `type`='photo' limit 1");
	$c_t = $c_t->fetch_array(MYSQLI_ASSOC);
	$ct_data = $c_t['data'];
	if($c_t['data'] && sizeof($c_t['data']))
		foreach(json_decode($c_t['data'],true) as $r):
	    $users_id .= $r['userid'].',';
	endforeach;

	//if(sizeof(json_decode($c_t['data'],true)) === sizeof($tags) && $c['userid'] !== $this->userid) {echo 3;die;}

	if($c['userid'] !== $this->userid && !in_array($post_by_user, @explode(',',$users_id))) { 
	$dt = array();
	foreach($tags_req as $tag_req):
	$_tag_uid_asTxt = preg_match('/as-text/',$userid);
	$photoid_req = $tag_req['photo'];
	$userid_req = $tag_req['user'];
	$pos_top_req = $tag_req['pos_top'];
	$pos_left_req = $tag_req['pos_left'];
	if(!$_tag_uid_asTxt)
	$dt[] = array("userid" => $userid_req, "p_top" => $pos_top_req, "p_left" => $pos_left_req );
	else
	$dt[] = array("userid" => $userid_req, "uname" => $tag_req['uname'], "p_top" => $pos_top_req, "p_left" => $pos_left_req );	
	endforeach;
	
	if($remove_himself) {echo 3; die;}
	else {
	$this->toNotif($p_ow['userid'],'photo_tags_requested',$photo_id,json_encode($dt),$this->userid);
	echo 2;
	die;
	}
	
	}
	else if($c['userid'] !== $this->userid && in_array($post_by_user, @explode(',',$users_id))){
		
		$tag_data = array();
		
		foreach(json_decode($ct_data,true) as $n):

			$userid = $n['userid'];
			$pos_top = $n['p_top'];
			$pos_left = $n['p_left'];
			if($userid !== $post_by_user)
			$tag_data[] = array("userid" => $userid, "p_top" => $pos_top, "p_left" => $pos_left );
		else
			// remove photo from tagged album
			$this->query_delete("delete from ".tbl_tag_album." where `photoid`='{$photoid}' and `userid`='{$userid}'");
	endforeach;
	
	$data = json_encode($tag_data);
		
	} else {
		
		if($ct_data && sizeof($ct_data)):
		   foreach(json_decode($ct_data,true) as $n):

			if(!in_array($n['userid'],$userids_x))
			// remove photo from tagged album
			$this->query_delete("delete from ".tbl_tag_album." where `photoid`='{$photoid}' and `userid`='".$n['userid']."'");
			
		endforeach;
		endif;
		
	}
	
	// check for tags, if exists, just update
	$check = count($this->query_select("select id from ".tbl_tags." where `itemid`='{$photoid}' and `type`='photo' limit 1"));
	
	if($check){

	$update = $this->query_update("update ".tbl_tags." set `data`='{$data}' where `itemid`='{$photoid}' and `type`='photo' ");
	
	if($update)	$res = 1;
	
	}else{
	
	$insert = $this->query_insert("insert into ".tbl_tags." set `itemid`='{$photoid}',`data`='{$data}',`type`='photo'");
	if($insert)	$res = 1;
	}

}
	echo $res;
}

// get photo tags
public function getPhotoTags(){
	
	$photoid = isset($_POST['photoid']) ? $this->test_input($_POST['photoid']) : '';
	$return_data = array();
	if(!is_numeric($photoid)) $return_data = 0;
	else {
		
		$select = $this->db->query("select `id` as pin_id,`data` from ".tbl_tags." where `itemid`='{$photoid}' and `type`='photo' limit 1");
		$response = $select->fetch_array(MYSQLI_ASSOC);
		
		// get owner of photo
		$photo_ow = $this->db->query("select `userid` from ".tbl_photos." where `id`='{$photoid}' limit 1");
		$photo_ow = $photo_ow->fetch_array(MYSQLI_ASSOC);
		
	if($response['data'] && count($response['data'])){
		foreach(json_decode($response['data'],true) as $data){
			
			
			if(!preg_match('/as-text/',$data['userid'])){ // check if tag is not as text
			// select user info
			$uinf = $this->db->query("select fullname,profile_photo as photo, gender from ".tbl_users." where `id`='".$data['userid']."' limit 1");
			$uinfo = $uinf->fetch_array(MYSQLI_ASSOC);
			} else {
				
				$uinfo = array( "userid" => $data['userid'], "gender" => '', "photo" => '0', "fullname" => $data['uname'] );
				
				
			}
			
			
			$return_data[] = array( "photo_owner" => $photo_ow['userid'],  "pin_id" => $response['pin_id'], "ugender" => $uinfo['gender'], "userid" => $data['userid'], "uname" => $uinfo['fullname'], "uphoto" => $uinfo['photo'], "p_top" => $data['p_top'], "p_left" => $data['p_left'] );
		}
		
		$return_data = json_encode($return_data);
		
	} else $return_data = 1;
		
	}
	
	echo $return_data;
	
}

// remove photo tag from notification
public function removePhotoTagFromNotif(){
	
		$photoid = isset($_POST['photoid']) ? $this->test_input($_POST['photoid']) : '';
		
		if(!$photoid || !is_numeric($photoid)) {echo 0; die;}
		
		$c_t = $this->db->query("select `data` from ".tbl_tags." where `itemid`='{$photoid}' and `type`='photo' limit 1");
	    $c_t = $c_t->fetch_array(MYSQLI_ASSOC);
	
			$tag_data = array();
		
		foreach(json_decode($c_t['data'],true) as $n):

			$userid = $n['userid'];
			$pos_top = $n['p_top'];
			$pos_left = $n['p_left'];
			if($userid !== $this->userid)
			$tag_data[] = array("userid" => $userid, "p_top" => $pos_top, "p_left" => $pos_left );
		else
			// remove photo from tagged album
			$this->query_delete("delete from ".tbl_tag_album." where `photoid`='{$photoid}' and `userid`='{$userid}'");
	endforeach;
	
	$data = json_encode($tag_data);
	
		$update = $this->query_update("update ".tbl_tags." set `data`='{$data}' where `itemid`='{$photoid}' and `type`='photo' ");
		
		
		echo 1;
}

// confirm requeste tags (from notification)
public function confirmRequestedTags(){
	
	$notif_id = isset($_POST['notID']) ? $this->test_input($_POST['notID']) : '';
	$photo_id = isset($_POST['photo']) ? $this->test_input($_POST['photo']) : '';
	$tag_new_data = $_chek_userids = array();
	$r = 0;
	if($notif_id){
		
		// select tags data from notification
		$tag = $this->db->query("select `json`,`userid` from ".tbl_notif." where `id`='{$notif_id}' limit 1");
		$tag = $tag->fetch_array(MYSQLI_ASSOC);
		
		// select current tags from respective photo
		$ptag = $this->db->query("select `data` from ".tbl_tags." where `itemid`='{$photo_id}' and `type`='photo' limit 1");
		$ptag = $ptag->fetch_array(MYSQLI_ASSOC);
		
		if(sizeof($ptag)):
		foreach( json_decode($ptag['data'],true) as $a ):
		$_tag_uid_asTxt = preg_match('/as-text/',$a['userid']);
		if(!$_tag_uid_asTxt)
		$tag_new_data[] = array("userid" => $a['userid'], "p_top" => $a['p_top'], "p_left" => $a['p_left'] );
		else
	    $tag_new_data[] = array("userid" => $a['userid'], "uname" => $a['uname'], "p_top" => $a['p_top'], "p_left" => $a['p_left'] );	
	
		$_chek_userids[] = $a['userid'];
		endforeach;
		endif;
		
		if(!sizeof($tag)){ echo 0; die;}
		
		foreach( json_decode($tag['json'],true) as $b ):
		$_tag_uid_asTxt = preg_match('/as-text/',$b['userid']);

		
		
		if(!in_array($b['userid'],$_chek_userids)){
		if(!$_tag_uid_asTxt)
		$tag_new_data[] = array("userid" => $b['userid'], "p_top" => $b['p_top'], "p_left" => $b['p_left'] );
		else
		$tag_new_data[] = array("userid" => $b['userid'], "uname" => $b['uname'], "p_top" => $b['p_top'], "p_left" => $b['p_left'] );		
		}
		
		if(!$_tag_uid_asTxt){
		// check if the photo is already added in "tagged album" for respective user, is not then add
		$tag_album_c = sizeof($this->query_select("select id from ".tbl_tag_album." where `photoid`='{$photo_id}' and `userid`='".$b['userid']."' limit 1"));
		
		if(!$tag_album_c && $b['userid'] !== $this->userid) {
			$this->query_insert("insert into ".tbl_tag_album." set `userid`='".$b['userid']."', `photoid`='{$photo_id}'");
			$this->toNotif($b['userid'],'photo_tags',$photo_id,$this->userid);
		}
		}
		endforeach;
		
		$_new_data_compilled = json_encode($tag_new_data);
		
		// check if exist tags, if not add
		$k_tag = sizeof($this->query_select("select id from ".tbl_tags." where `type`='photo' and `itemid`='{$photo_id}' limit 1"));
		
		if($k_tag){
		// update new tags
		$update = $this->query_update("update ".tbl_tags." set `data`='{$_new_data_compilled}' where `itemid`='{$photo_id}' and `type`='photo'");
		if($update) $r = 1; else $r = 0;
		
		} else {
			
			// insert new tags
			$insert = $this->query_insert("insert into ".tbl_tags." set `itemid`='{$photo_id}', `data`='{$_new_data_compilled}', `type`='photo'");
			if($insert) $r = 1; else $r = 0;
			
		}
		
	}
	echo $r;
	
}

 // update photo description
 public function updatePhotoDescription(){
	 
	 $photoid = isset($_POST['photoid']) ? $this->test_input($_POST['photoid']) : 0;
	 $descr = isset($_POST['descr']) ? htmlspecialchars($_POST['descr']) : '';
	 if(!is_numeric($photoid) || !$photoid) echo 0;
	 else {
		 
		 // check for the owner of photo
		 $check_owner = count($this->query_select("select id from ".tbl_photos." where `id`='{$photoid}' and `userid`='{$this->userid}' limit 1"));
		 if($check_owner){
			 // all is okay, update it
			 $update = $this->query_update("update ".tbl_photos." set `info`='{$descr}' where `id`='{$photoid}' and `userid`='{$this->userid}'");
			 if($update) echo $descr; else echo 0;
		 } else echo 0;
		 
	 }
	 
 }

// get max 5 people in dropDown people who liked a photo
public function getPeopleLikedPhotoDropDown(){
	
	$photo = isset($_POST['photo']) ? $this->test_input($_POST['photo']) : '';
	$item = isset($_POST['item']) ? $this->test_input($_POST['item']) : 'photo';
	$community = isset($_POST['community']) ? "k.community='yes' and " : '';
	$rsp = $tc = $principal = array();
	if(!is_numeric($photo) || !$photo){
		echo 0;
	}else{
		// left join ".tbl_photos." p ON p.id='{$photo}'
		$q = $this->query_select("select SQL_CALC_FOUND_ROWS u.id, u.id, u.fullname,u.gender, u.profile_photo as photo from ".tbl_users." u
								 
								  left join ".tbl_klass." k ON ".$community." k.itemid='{$photo}' and k.type='{$item}'
								  where u.id = k.userid group by u.id order by k.id desc limit 5
		");

		if(sizeof($q)){
			$total_res_count = $this->db->query("select FOUND_ROWS() as c");
			$total_res_count = $total_res_count->fetch_array(MYSQLI_ASSOC);
			foreach($q as $r):
			$rsp[] = array("id" => $r['id'], "name" => $r['fullname'], "gender" => $r['gender'], "photo" => $r['photo']);
			endforeach;
			$tc = $total_res_count['c'];
			$principal['total'] = $tc;
			$principal['users'] = $rsp;
			echo json_encode($principal);
		} else echo 0;
		
	}
	
	
}
  // get all people who rated a photo
 public function allPeopleRatedPhoto(){
	 $photo = isset($_POST['photo']) ? $this->test_input($_POST['photo']) : '';
	 $rsp = array();
	 	if(!is_numeric($photo) || !$photo){
		echo 0;
	}else{
				$q = $this->query_select("select u.id, u.fullname,u.gender, u.profile_photo as photo from ".tbl_users." u
								  left join ".tbl_photos." p ON p.id='{$photo}'
								  left join ".tbl_photo_rate." r ON r.id_photo=p.id and r.userid=u.id
								  where u.id = r.userid group by u.id order by r.id desc
									");
									
											if(sizeof($q)){
												
												foreach($q as $r):
												$rsp[] = array("id" => $r['id'], "name" => $r['fullname'], "gender" => $r['gender'], "photo" => $r['photo']);
												endforeach;
												
												echo json_encode($rsp); die;
												
											}
											echo 1;
		
	}
 }
 // get all people who liked a photo
 public function allPeopleLikedPhoto(){
	 $photo = isset($_POST['photo']) ? $this->test_input($_POST['photo']) : '';
	 $rsp = array();
	 	if(!is_numeric($photo) || !$photo){
		echo 0;
	}else{
				$q = $this->query_select("select u.id, u.fullname,u.gender, u.profile_photo as photo from ".tbl_users." u
								  left join ".tbl_photos." p ON p.id='{$photo}'
								  left join ".tbl_klass." k ON k.itemid=p.id and k.type='photo'
								  where u.id = k.userid group by u.id order by k.id desc
									");
									
											if(sizeof($q)){
												
												foreach($q as $r):
												$rsp[] = array("id" => $r['id'], "name" => $r['fullname'], "gender" => $r['gender'], "photo" => $r['photo']);
												endforeach;
												
												echo json_encode($rsp); die;
												
											}
											echo 1;
		
	}
 }
  // get mutual friends in popup
 public function popupGetMutualFriends(){
	 $userid = isset($_POST['u']) ? (int) $this->test_input($_POST['u']) : '';
	 $rsp = array();
	 	if(!is_numeric($userid) || !$userid){
		echo 0;
	}else{
				$glb  = $this->im_global();
				$q = $glb->getMutualFriends($userid,$limit = 100);
									
											if(isset($q[1]) && sizeof($q[1])){
												
												foreach($q[1] as $r):
												$rsp[] = array("id" => $r['id'], "yearsold" => $r['yearsold'], "cityCountry" => $this->getThisUserLocation($r['id'],true), "name" => $r['fullname'], "nick" => $r['username'], "gender" => $r['gender'], "photo" => $r['photo']);
												endforeach;
												
												echo json_encode(array("count" => $q[0],"users" => $rsp)); die;
												
											}
											echo 1;
		
	}
 }
 // get last 5 comments for photo
 public function selectMinCommentsForPhoto($all = 0){
	 
	 $photo = isset($_POST['photo']) ? $this->test_input(b_decode($_POST['photo'])) : '';
     $prevGlobalClass = $this->im_global();
	 	if(!is_numeric($photo) || !$photo){
		echo 0;
	}else{
		
		$getComments = $prevGlobalClass->photoGetComments($all,$photo,5); // this function is located in c2_global
	
 }
 
}

// settings save personal information
public function settingsSavePersonalInformation(){

	if(!$this->USER){ echo 0; die;}
	$i = $this->USER['id'];
	
	$c2global = new _global_co;
	
	// name & surname
	$name = isset($_POST['fr_name']) ? $this->test_input($_POST['fr_name']) : '';
	$surname = isset($_POST['fr_surname']) ? $this->test_input($_POST['fr_surname']) : '';

	// user birthday update
	$bday = isset($_POST['fr_bday']) ? $this->test_input($_POST['fr_bday']) : '';
	$bmonth = isset($_POST['fr_bmonth']) ? $this->test_input($_POST['fr_bmonth']) : '';
	$byear = isset($_POST['fr_byear']) ? $this->test_input($_POST['fr_byear']) : '';
	
	// default user birthday
	$upBirthDate = $this->USER['birthday'];
	$compileNewBirthday = $byear .'-'.$bmonth.'-'.$bday;
	
	if((is_numeric($bday) && is_numeric($bmonth) && is_numeric($byear))) $upBirthDate = $compileNewBirthday;
	
	
	// gender
	$pGender = isset($_POST['fr_gender']) ? $this->test_input($_POST['fr_gender']) : '';
	$pGender = $pGender == 1 ? 'male' : ($pGender == 2 ? 'female' : '');
	$upGender = $pGender == 'male' || $pGender == 'female' ? $pGender : $this->USER['gender'];

	
	// location name
	$pLocation_name = isset($_POST['location_name']) ? $this->test_input($_POST['location_name']) : '';
	$upLocation_Name = !empty( $pLocation_name ) ? $pLocation_name : $this->USER['location'];
	$location_approved = isset($_POST['location_approved']) ? ($_POST['location_approved'] == '1' ? true : false) : false;
	
	
	
	// location id
	$pLocation_id = isset($_POST['location_id']) ? $this->test_input($_POST['location_id']) : '';
	$upLocation_id = !empty( $pLocation_id ) ? $pLocation_id : $this->USER['location_id'];

 
	
	
	if(!$pLocation_name || !$location_approved || !$pLocation_id) {echo 2; die;} // invalid location
 	
	
	if(empty($name) || !preg_match("#^\p{L}+$#u", $name))
	{echo 4;die;}


	if(empty($surname) || !preg_match("#^\p{L}+$#u", $surname))
	{echo 5; die;}

	if($name == $surname)
	{echo 6; die;}
	
	$fullname = $name.' '.$surname;
 
	$search = $fullname.' '.$this->getUserAge($upBirthDate).' '.$pLocation_name;
	
	// update 
	$update = $this->query_update("update ".tbl_users." set `gender`='{$upGender}',`name`='{$name}', `surname`='{$surname}', `fullname`='{$fullname}',`search`='{$search}',`birthday`='{$upBirthDate}',`location`='{$upLocation_Name}',`location_id`='{$upLocation_id}' where `id`='{$i}' limit 1");

	if($update) echo 1; else echo 0;
}

// check user pass
public function checkUserPass($pass){
	
	$i = $this->USER['id'];
	return !count($this->query_select("select `id` from ".tbl_users." where `id`='{$i}' and `real_pass`='{$pass}' limit 1")) ? 0 : 1;
}

// save nickname
public function settingsSaveNickName(){
	
	
	if(!$this->USER){ echo 0; die;}
	$i = $this->USER['id'];

	// nickname
	$nick = isset($_POST['fr_nick']) ? $this->test_input($_POST['fr_nick']) : '';
	$upNick = $nick || !ctype_space($nick) || !is_numeric($nick) ? $nick : $this->USER['username'];
	
	// check for pass
	$pass = isset($_POST['fr_pass']) ? $this->test_input($_POST['fr_pass']) : '';
	
	if(!$pass || !$this->checkUserPass($pass)){echo 2;die;}
	
	// update 
	$update = $this->query_update("update ".tbl_users." set `username`='{$upNick}' where `id`='{$i}' limit 1");

	if($update) echo 1; else echo 0;
}
// save phone
public function settingsSavePhone(){
	
	$r = array('status' => 'error','msg' => $this->lang['sms_get_code_err']);
	if(isset($this->USER['id'])){ 
	$i = $this->USER['id'];

	
	// phone
	$phone = isset($_POST['phone_number']) ? $this->test_input($_POST['phone_number']) : '';
	$upPhone = !empty($phone) ? $phone : $this->USER['phone'];
	
	// check for pass
	$pass = isset($_POST['fr_pass']) ? $this->test_input($_POST['fr_pass']) : '';
	
	if(!$pass || !$this->checkUserPass($pass)) {
		$r['msg'] = 2;
	} else if (count($this->query_select("select id from ".tbl_users." where `id`<>'{$i}' && `phone`='{$upPhone}' limit 1"))){
		$r['msg'] = 3;
	} else {
	
	// create secret code
	$code = $this->renewSecretCode($i);
	$to_number = array($this->settings['PHONE_PREFIX_CD'].$upPhone);
	$r['code'] = $code['code'];
	if($code['status'] == 1){ 
		$message = str_replace('%code',$code['code'],str_replace('%sitename',$this->settings['SITENAME'],$this->lang['your_social_plus_code_is']));
		$send_sms = json_decode($this->sendSMS($to_number,$message),true);
		//print_r($send_sms);die;
		if($send_sms['status'] == 'done') { 
		$r['status'] = 'success';
 
		$r['code'] = $code['code'];
		}
		
	} 
	
	
	}
	
	}

	echo json_encode($r);
}

public function settingsUpdatePhone(){
	$r = 0;
	
	if(isset($this->USER['id'])){ 
	$i = $this->USER['id'];
	
	
	// phone
	$phone = isset($_POST['phone']) ? $this->test_input($_POST['phone']) : '';
	$upPhone = !empty($phone) ? $phone : $this->USER['phone'];
	
	
	// update 
	$update = $this->query_update("update ".tbl_users." set `phone`='{$upPhone}' where `id`='{$i}' limit 1");

	if($update) $r = 1; else $r = 0;
	
	
	} 
	
	echo $r;
}
 // update profile password
 public function updateProfilePassword(){
	 
	if(!$this->USER){ echo 0; die;}
	$i = $this->USER['id'];
	$update = '';
	
	// post passwords
	$old_pass = isset($_POST['fr_oldpass']) ? $_POST['fr_oldpass'] : '';
	$new_pass = isset($_POST['fr_newpass']) ? $_POST['fr_newpass'] : '';
	$re_pass = isset($_POST['fr_repass']) ? $_POST['fr_repass'] : '';
	

	if(!$this->checkUserPass($old_pass)){ echo 2;die;}	// invalid old password
	else if(strlen($new_pass) < 6) {echo 3; die;} // the password is too short
	else if($new_pass !== $re_pass) {echo 4; die;} // the password don't match
	else {
	
		$secret = $this->mksecret();
		$new_pass = md5($secret . $new_pass . $secret);
		$editsecret = $this->mksecret();
	
	// update 
	$update = $this->query_update("update ".tbl_users." set
	`password` = '{$new_pass}',
	`real_pass` = '{$re_pass}',
	`secret`='{$secret}',
	`editsecret`='{$editsecret}'
	 where `id`='{$i}' limit 1");
		
	}
		if($update) {$this->signoutcookie(); echo 1;}else echo 0;
 }
 
 // update profile email
 public function updateProfileEmail(){
	 
	if(!$this->USER){ echo 0; die;}
	$i = $this->USER['id'];
	$update = '';
    // post new mail
	$new_mail = isset($_POST['fr_mail']) ? $_POST['fr_mail'] : '';
	// post password
	$_pass = isset($_POST['fr_pass']) ? $_POST['fr_pass'] : '';	 
	


	
	if(!filter_var($new_mail, FILTER_VALIDATE_EMAIL)) {echo 2; die;} // invalid email format
	else if($new_mail === $this->USER['email']) {echo 5; die;} // this is your currently email
	else if(count($this->query_select("select id from ".tbl_users." where `email`='$new_mail' limit 1"))) {echo 3; die;} // email is already in use 
	else if(!$this->checkUserPass($_pass)) {echo 4; die;} // invalid password
	else {
		
	// update 
	$update = $this->query_update("update ".tbl_users." set `email`='{$new_mail}' where `id`='{$i}' limit 1");
		
	}
	
	if($update) {$this->signoutcookie(); echo 1;}else echo 0;
 }
 
 // remove user from blacklist
 public function removeBlackList(){
	 
	 $uid = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : '';
	 $i = $this->USER['id'];
	 
	 if(!$uid || !is_numeric($uid) || !$i) {echo 0; die;}
	 
	 // check for user in black list
	 $check = count($this->query_select("select id from ".tbl_blacklist." where `userid`='{$uid}' and `employer`='{$i}' limit 1"));
	 if($check){
		 $remove = $this->query_delete("delete from ".tbl_blacklist." where `userid`='{$uid}' and `employer`='{$i}'");
		 if($remove) echo 1; else echo 0;
	 }
	 else echo 0;
	 
 }
 
 // remove guest
 public function removeGuest(){
	 
	 $uid = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : '';
	 $i = $this->USER['id'];
	 
	 if(!$uid || !is_numeric($uid) || !$i) {echo 0; die;}
	 
	 // check for user in guests
	 $check = count($this->query_select("select id from ".tbl_guests." where `guestid`='{$uid}' and `userid`='{$i}' limit 1"));
	 if($check){
		 $remove = $this->query_delete("delete from ".tbl_guests." where `guestid`='{$uid}' and `userid`='{$i}'");
		 if($remove) echo 1; else echo 0;
	 }
	 else echo 0;	 
	 
	 
 }
 
// +1 video views
public function updateVideoViews(){
	
	$video_id = isset($_POST['vid']) ? (int) $this->test_input($_POST['vid']) : 0;
	$clubid = isset($_POST['clubid']) ? (int) $this->test_input($_POST['clubid']) : 0;
	
	
	
	if(!is_numeric($video_id) || $video_id <= 0){
		
		echo 0; 
		
	} else {
		
		$update_vd = $clubid ? $this->query_update("update ".tbl_communities_pics." set `views`=views+1 where `id`='{$video_id}'") : $this->query_update("update ".tbl_videos." set `views`=views+1 where `id`='{$video_id}'");
		if($update_vd) echo 1; else echo 0;
		
	}
	
}
// liked a content in feed, get all friends in popup
public function LikeFeedGetAllFriends(){
	
	
	$fid = isset($_POST['fid']) ? (int) $this->test_input($_POST['fid']) : 0;
	$myid = isset($this->USER['id']) ? (int) $this->USER['id'] : 0;
	$all_friends = array();
	if($fid && $myid){
		
		
		$res = $this->query_select("select `byuser` from ".tbl_feed." where `id`='{$fid}' limit 1");
		foreach($res as $r):
		$r_ex = explode(',',$r['byuser']);
		
		foreach($r_ex as $uid){
			$friends_dt = $this->query_select("select u.fullname,u.id,u.profile_photo as avatar,u.gender from ".tbl_friends." f 
										  left join ".tbl_users." u ON u.id=f.friendid where f.friendid='{$uid}' and f.userid='{$myid}' and f.status='confirmed'
										  group by u.id limit 1");
					
		foreach($friends_dt as $f)
		$all_friends[] = $f;	

		}		
		
		endforeach;
		
		$this->template->assign(['this' => $this, 'users' => $all_friends]);
		$content = $this->template->fetch($this->theme_dir.'/profile/feed/popup/like-popup.html');
		echo $content;
	} else echo 0;
	
	
}

// get user's photo albums
public function getUsPhotoAlbums(){
	$data = array();
  // sql
  $query = $this->query_select("select a.*,COUNT(p.id) as p_count from ".tbl_albums."a left join ".tbl_photos."p ON p.albumid=a.id where a.userid='{$this->userid}' and a.video='no' group by a.id order by a.added desc");
  
  $pPhotoAlbumCover = $this->getPphotoCover();
  $data[] = array("id" => 0, "name" => $this->lang['p_photos'], "count" => $this->getPphotosCount(), "cover" => $pPhotoAlbumCover['id']);
  
  foreach($query as $r):
  $data[] = array("id" => $r['id'], "name"=> $this->getAlbumName($r['name']), "count" => $r['p_count'], "cover" => $r['cover']);
  endforeach;
  
  return json_encode($data);
	
}

// get photos from certain album
public function getPhotosFalbum(){
	
	$album_id = isset($_POST['alb_id']) ? (int) $this->test_input($_POST['alb_id']) : 0;
	$data = array();
	$count = 0;
	if($album_id < 0 || !is_numeric($album_id))
		$data = 0;
	else
	{

		// extract images
		$q = $this->query_select("select id,info from ".tbl_photos." where `albumid`='{$album_id}' and `userid`='{$this->userid}' order by position asc,added desc limit ".$this->settings['P_PHOTOS_LIMIT']);
		$count = $this->db->query("select COUNT(*) from ".tbl_photos." where `albumid`='{$album_id}' and `userid`='{$this->userid}'");
		$count = $count->fetch_row();
		$count = $count[0];
		
		foreach($q as $r):
		$data[] = array("id" => $r['id'], "info"=> $r['info']);
		endforeach;
		
	}
	return $data ? json_encode(["data" => $data, "count" => $count]) : 0;
	
}



// get slideshow photos
public function getSlideshowConfig($uid = 0){
	
	$uid = $uid ? $uid : $this->userid;
	$photos = array();
	$htps = HTTPS_ON ? 'https://' : 'http://';
	
	// select photos
	$q = $this->query_select("select `s3`,id,userid,ex from ".tbl_slideshow_imgs." 
	where `userid`='{$uid}' order by position asc, added asc limit 6");
    $q_conf = $this->db->query("Select `options`,`enabled` from ".tbl_slideshow." where `userid`='{$uid}' limit 1");
	$r_conf = $q_conf->fetch_array(MYSQLI_ASSOC);
	
	
	
	
	
	if(count($q)){
		
		foreach($q as $r):	
 
		$cover_url = !empty($r['s3']) ? $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/ucovers/'.$r['userid'].'/'.$r['s3'] : $this->settings['HOST'].__COVERS_DIR.$uid.'/slideshow/'.$r['id'].'.'.$r['ex'];
		$photos[] = ["id" => $r['id'], "userid" => $r['userid'], "img" => $cover_url];
		endforeach;
		

	}

	$data = json_encode( ["conf" => ["enabled" => $r_conf['enabled'], "options" => $r_conf['options']] , "photos" => $photos ] );
	
	
	
	return $data;
}
 
 // update slideshow images order
 public function updateSlideShowImagesOrder(){
	 
    $data = isset($_POST['img']) ? $_POST['img'] : 0;
    $i    = 0;
    foreach ($data as $id) {
        $id = (int) $this->test_input($id);
        $updatePlayList = $this->query_update("update ".tbl_slideshow_imgs." set `position` = '{$i}' where `id`='{$id}' AND `userid`='{$this->userid}'");
        
        $i++;
    }
	
    echo 1;
	 
	 
 }
 
 // delete image from slideshow
 public function deleteImageFromSlideshow(){
	 
	 $image_id = isset($_POST['img']) ? (int) $this->test_input($_POST['img']) : 0;
	 $r = 0;
	 if($image_id > 0 && $this->userid){
		 
		 
		 // select info about image
		 $inf = $this->db->query("select `s3` from ".tbl_slideshow_imgs." where `id`='{$image_id}' limit 1");
		 $inf = $inf->fetch_array(MYSQLI_ASSOC);
		 
		 $s3_link = $inf['s3'];

		 // delete image
		 if($this->query_delete("delete from ".tbl_slideshow_imgs." where `id`='{$image_id}' && `userid`='{$this->userid}'")){
		
		 if ( !empty($s3_link) )
		 {
			 
		foreach($this->settings['AMAZON_S3_USER_COVERS_BUCKETS'] as $_bucket):
          
						
									// Delete objects from a bucket
							 
								$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/ucovers/'.$this->userid, $s3_link);
												   endforeach; 
			 
		 }
		 else{
	     foreach($this->settings['VALID_FORMATS'] as $image_formats)
		 @unlink(__ROOT__.__COVERS_DIR.$this->userid.'/slideshow/'.$image_id.'.'.$image_formats); 
		 }
		 
		 
		 $r = 1;
		 
		 }
	 }
	 return $r;
	 
 }
 
 // save slideshow config
 public function saveSlideShowConfig(){
	 
	$_pr = array(); 
	 
	/* Slideshow configration @parameters
	--------------------------------------*/
	$_ovr = isset($_POST['overlay']) ? $_pr['overlay'] = $this->test_input($_POST['overlay']) : '';
	$_shuf = isset($_POST['shuffle']) ? $_pr['shuffle'] = $this->test_input($_POST['shuffle']) : '';
	$_trans = isset($_POST['transition']) ? $_pr['transition'] = $this->test_input($_POST['transition']) : '';
	$_trans_dur = isset($_POST['trans_duration']) ? $_pr['trans_duration'] = $this->test_input($_POST['trans_duration']) : '';
	$_timer = isset($_POST['timer']) ? $_pr['timer'] = $this->test_input($_POST['timer']) : '';
	$_delay = isset($_POST['delay']) ? $_pr['delay'] = $this->test_input($_POST['delay']) : '';
	$_enabled = isset($_POST['enabled']) ? $this->test_input($_POST['enabled']) : '';
	$_u_theme = $_enabled == 'yes' ? '-1' : '0';
	$now = time();
	$_config = json_encode($_pr);
	

	$this->query_update("update ".tbl_users." set `theme`='{$_u_theme}' where `id`='{$this->userid}'");

	
	// update slideshow configuration
	if($this->query_update("update ".tbl_slideshow." set `enabled`='{$_enabled}',`added`='{$now}',`options`='{$_config}' where `userid`='{$this->userid}' limit 1"))
		echo 1;
	else
		echo $this->lang['err_update_slideshow'];
	 
 }
 
 // copy slideshow images from photo albums to slideshow dierctory
 public function copySlideshowImages(){
	 
	$img = isset($_POST['img_id']) ? (int) $this->test_input($_POST['img_id']) : '';
	$r = 0;

	if($img){
		
		// get image filename 
		$img_file_q = $this->db->query("select `filename`,`extension`,`s3` from ".tbl_photos." where `id`='{$img}' limit 1");
		$img_file_r = $img_file_q->fetch_array(MYSQLI_ASSOC);
		$img_filename = $img_file_r['filename'];
		$img_extenstion = $img_file_r['extension'];
		$is_s3 = $img_file_r['s3'];
		
		
	 
		
		if($img_filename && $is_s3 == 'no'){
			
		// insert image into `slideshow_img` table	
		$sl_img_id = $this->query_insert("insert into ".tbl_slideshow_imgs." set `userid`='{$this->userid}',`added`='{$this->ntime}',`ex`='{$img_extenstion}'");
		
			
			
		$img_file_dir =	__ROOT__.__IMG_DIR.$this->userid.'/large/'.$img_filename;
		$slideshow_dir = __ROOT__.__COVERS_DIR.$this->userid.'/slideshow/';
		$slideshow_filename = $sl_img_id.'.'.$img_extenstion;
 
		 // generate dir by user id
		if (!file_exists( $slideshow_dir ))
		mkdir($slideshow_dir, 0777, true);
		
			if( @copy($img_file_dir,$slideshow_dir.$slideshow_filename) )
			$r=$sl_img_id;
			
		} else {
		$srcBucket = AWS_S3_BUCKET_NAME.'/uphoto/'.$this->userid.'/large';///'/'.__IMG_DIR.$this->userid.'/large/'.$img_filename;
		$toBucket = AWS_S3_BUCKET_NAME.'/ucovers/'.$this->userid;  // path on s3 bucket.
		
		
		
		
		
		if($this->s3->copyObject($srcBucket, $img_filename, $toBucket, $img_filename,S3::ACL_PUBLIC_READ)){
		// insert image into `slideshow_img` table	
		$sl_img_id = $this->query_insert("insert into ".tbl_slideshow_imgs." set `s3`='{$img_filename}',`userid`='{$this->userid}',`added`='{$this->ntime}',`ex`='{$img_extenstion}'");
			
		$r=$sl_img_id;
		
		}
		
		
		}
		
		
		
	}

	return $r; 
 }
 
 // save wrap theme
 public function saveWrapTheme(){
	 
	 $theme_id = isset($_POST['theme_id']) ? (int) $this->test_input($_POST['theme_id']) : '';
	 $theme_pos = isset($_POST['theme_pos']) ? (int) $this->test_input($_POST['theme_pos']) : '';
	 $r = 0;
	 
	 if($theme_id){
		 $update_theme_pos = $this->query_update("update ".tbl_themes." set `position`='{$theme_pos}' where `userid`='{$this->userid}' and `id`='{$theme_id}'");
		 $update_cover = $this->query_update("update ".tbl_users." set `theme`='{$theme_id}' where `id`='{$this->userid}'");
		 if($update_cover && $update_theme_pos) $r = 1;
	 } 
	 
	 
	 return $r;
 }
 
 
 // switch to default theme
 public function switchToDefaultTheme(){
	 $r = 0;
	 
	 if(isset($this->userid)){
		 
		 $update = $this->query_update("update ".tbl_users." set `theme`='0' where `id`='{$this->userid}'");
		 
		 if($update) $r = 1;
		 
		 
	 }
	 
	 return $r;
 }
 
 // get user's uploaded themes
 public function showMyOwnThemes(){
	 $js = array();
	 $htps = HTTPS_ON ? 'https://' : 'http://';
	 if(isset($this->userid)){
		 
		 // select themes
		 $q = $this->query_select("select `id`,`ext`,`added`,`position`,`s3`,`photo` from ".tbl_themes." where `kn`='false' and `userid`='{$this->userid}' order by added desc limit 100");
		 if(count($q))
		 {
			 foreach($q as $r):
			 
			 $cover_url = $r['s3'] == 'yes' ? $htps.AWS_S3_BUCKET_NAME.".s3.amazonaws.com/ucovers/".$this->userid."/".$r['photo'] : __COVERS_DIR.$this->userid.'/covers/'.$r['id'].'.'.$r['ext'];
			 $js[] = array("id" => $r['id'], "position" => $r['position'], "ext" => $r['ext'], "src" => $cover_url, "added" => $this->time_elapsed($r['added']) );
			 
			 endforeach;
			 
		 }
		 
		 
	 }
	 
	 return count($js) ? json_encode($js) : 0;
	 
 }
 
 // delete own cover
 public function deleteOwnCover(){
	 
	 $cover_id = isset($_POST['i']) ? (int) $this->test_input($_POST['i']) : '';
	 $r = 0;
	 if($cover_id > 0){
		 
		 // check if this is active theme
		 if(count($this->query_select("select `theme` from ".tbl_users." where `id`='{$this->userid}' && `theme`='{$cover_id}' limit 1")))
			 $update_u = $this->query_update("update ".tbl_users." set `theme`='0' where `id`='{$this->userid}'");
		 
		 
		 // delete
		 $delete = $this->query_delete("delete from ".tbl_themes." where `userid`='{$this->userid}' && `kn`='false' && `id`='{$cover_id}'");
		 if($delete) $r = 1;
		 
	 }
	 
	 return $r;
 }
 // insert vote in poll
public function PollVote(){

	$answer_id  = isset($_POST['ans']) ? $this->test_input($_POST['ans']) : '';
	$question_id = isset($_POST['quid']) ? (int) $this->test_input($_POST['quid']) : '';
	
	// check if the user has voted already
	$cq = count($this->query_select("select id from ".tbl_poll_answers." where `question_id`='{$question_id}' and `user_id`='{$this->userid}' limit 1"));
	
	if($cq){
		echo json_encode(array("success"=>"2","error"=>"Already voted."));
	
	}else {
	$stmt = $this->query_insert("insert into ".tbl_poll_answers." set `question_id`='{$question_id}',`option_id`='{$answer_id}',`user_id`='{$this->userid}'");
	$c2global = new _global_co;
	
	if($stmt){
		// fetch and send details back
		echo $c2global->get_all_answers($question_id);
	}else{ 
	echo json_encode(array("success"=>"0","error"=>"Unexpected error occurred"));
	}
	
	}
}

// get participants in the poll
public function PollUsers(){
	
	$pollid = isset($_POST['sondageid']) ? (int) $this->test_input($_POST['sondageid']) : 0;
	$optionid = isset($_POST['optionid']) ? (int) $this->test_input($_POST['optionid']) : 0;
	$r = json_encode(array("succ" => 0, "err" => $this->lang['err_load_poll_participants']));

	if($pollid && is_numeric($pollid)){
		
		
		
		$b = array();
		
		$filter_by_option = $optionid > 0 ? "and pa.option_id = '{$optionid}'" : "";
		$q = $this->query_select("select u.id as uid, u.fullname as uname,u.profile_photo as uphoto,u.gender as ugender from ".tbl_users." u, ".tbl_poll_answers." pa 
				where pa.question_id = '{$pollid}' ".$filter_by_option." and u.id=pa.user_id group by pa.user_id order by pa.id desc limit 100
				");			
		foreach($q as $a):
		
		$b[] = array("uid" => $a['uid'], "uname" => $a['uname'], "uphoto" => $a['uphoto'], "ugender" => $a['ugender'], "online" => $this->getUserStatus($a['uid']));
		endforeach;
			$r = json_encode(array("succ" => 1, "data" => $b));	
		
	} 
	echo $r;
	
}
/// delete definitive video
public function deleteVideoDefinitive(){
	
	$videoid = isset($_POST['video_id']) ? (int) $this->test_input($_POST['video_id']) : 0;
	$r = 0;
	if($videoid > 0){
		
		// check if the picture owner is respective user that requested this method_exists
		$c = $this->db->query("select count(*) from ".tbl_deleted_videos." where `userid`='{$this->userid}' limit 1");
		$c = $c->fetch_row();
		$c = $c[0];
		
		if($c > 0){
			
			// select data for respective pic
			$d = $this->db->query("select `s3`,`filename`, `extension` from ".tbl_deleted_videos." where `videoid`='{$videoid}' and `userid`='{$this->userid}' limit 1");
			$d = $d->fetch_array(MYSQLI_ASSOC);
			if(!$d) $r = '404';
			else {
				$s3 = $d['s3'];
				if($s3 == 'no'){
				// delete picture files from server
				$trash = __ROOT__.__TRASH_;
				
				@unlink($trash.'/videos/'.$d['filename'].'.'.$d['extension']); # remove video
				@unlink($trash.'/videos/thumbs/'.$videoid.'.png'); # remove thumbnail

				
				// delete picture from database
				$delete = $this->query_delete("delete from ".tbl_deleted_videos." where `videoid`='{$videoid}' and `userid`='{$this->userid}'");
				if($delete) $r = 1;
			} else {
				
				foreach($this->settings['AMAZON_S3_USER_VIDEO_BUCKET'] as $_bucket):
          
						
									// Delete objects from a bucket
							 
								$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/'.$_bucket.'/'.$this->userid.'/', $d['filename'].'.'.$d['extension']);
												   endforeach;
												   
												   
												   
				// delete picture from database
				$delete = $this->query_delete("delete from ".tbl_deleted_videos." where `videoid`='{$videoid}' and `userid`='{$this->userid}'");
				if($delete) $r = 1;	   
												   
												   
			}
			
			}
			
		}
		
	}
	
	echo $r;
}
/// delete definitive picture
public function deletePictureDefinitive(){
	
	$picture_id = isset($_POST['picid']) ? (int) $this->test_input($_POST['picid']) : 0;
	$r = 0;
	if($picture_id > 0){
		
		// check if the picture owner is respective user that requested this method_exists
		$c = $this->db->query("select count(*) from ".tbl_deleted_photos." where `userid`='{$this->userid}' limit 1");
		$c = $c->fetch_row();
		$c = $c[0];
		
		if($c > 0){
			
			// select data for respective pic
			$d = $this->db->query("select `s3`,`filename` from ".tbl_deleted_photos." where `photoid`='{$picture_id}' and `userid`='{$this->userid}' limit 1");
			$d = $d->fetch_array(MYSQLI_ASSOC);
			if(!$d) $r = '404';
			else {
				$s3 = $d['s3'];
				if($s3 == 'no'){
				// delete picture files from server
				$trash = __ROOT__.__TRASH_;
				
				@unlink($trash.$this->pSize['large'].$d['filename']); # remove large photo
				@unlink($trash.$this->pSize['thumb'].$d['filename']); # remove thumbnail
				@unlink($trash.$this->pSize['medium'].$d['filename']); # remove medium
				@unlink($trash.$this->pSize['small'].$d['filename']); # remove small
				@unlink($trash.$this->pSize['exp'].$d['filename']); # remove exp
				@unlink($trash.$this->pSize['grid'].$d['filename']); # remove grid
				
				// delete picture from database
				$delete = $this->query_delete("delete from ".tbl_deleted_photos." where `photoid`='{$picture_id}' and `userid`='{$this->userid}'");
				if($delete) $r = 1;
			} else {
				
				foreach($this->settings['AMAZON_S3_PICTURES_BUCKETS'] as $_bucket):
          
						
									// Delete objects from a bucket
							 
								$delete = $this->s3->deleteObject(AWS_S3_BUCKET_NAME.'/uphoto/'.$_bucket, $d['filename']);
												   endforeach;
												   
												   
												   
				// delete picture from database
				$delete = $this->query_delete("delete from ".tbl_deleted_photos." where `photoid`='{$picture_id}' and `userid`='{$this->userid}'");
				if($delete) $r = 1;	   
												   
												   
			}
			
			}
			
		}
		
	}
	
	echo $r;
}
// build apps page
public function appsPage() {


$uid = isset($_GET['uid']) ? (int) $this->test_input($_GET['uid']) : (int) $this->USER['id'];
$c = isset($_GET['c']) ? $this->test_input($_GET['c']) : '';
$modify_header = isset($_GET['mheader']) ? $this->test_input($_GET['mheader']) : ''; // add back button to header instead of logo name
$sql_prefix = $genre = $change_query = $custom_err_message = $user_id = $user_name = $header_name = "";
$backhref = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';

if($c === 'genre'){
	$genre = isset($_GET['genre']) ? (int) $this->test_input($_GET['genre']) : '';
	$sql_prefix = "where `genre`='{$genre}'";
	
} else if ($c === 'uapps'){
	
	$user_id = isset($_GET['u']) ? (int) $this->test_input($_GET['u']) : '';
	$user_req = $this->db->query("select fullname,id,username,privacy_apps from ".tbl_users." where `id`='{$user_id}' limit 1");
	$user_req = $user_req->fetch_array(MYSQLI_ASSOC);
	$user_name = $user_req['fullname'];
	$user_uid = $user_req['id'];
	$header_name = $user_name;
	$backhref = $backhref ? $backhref : ($user_req['username'] ? '/user/'.$user_req['username'] : '/user/'.$user_req['id']);
	
	
	$change_query = 1;
	$this->template->assign(["this" => $this, "userid" => $user_id, "user_name" => $user_name]);
	$custom_err_message = $this->template->fetch($this->theme_dir."/apps/no_apps.html");
}

if(!$change_query)
$query_apps = $this->query_select("select * from ".tbl_apps." ".$sql_prefix." order by added desc limit 100");
else
$query_apps = $this->query_select("select ap.* from ".tbl_apps." ap, ".tbl_my_apps." my where ap.id=my.appid and my.userid='{$user_id}' group by my.id order by my.added desc limit 100");

// get user's apps in left side
$user_apps = $this->query_select("select a.id,a.title,a.cover from ".tbl_apps." a, ".tbl_my_apps." m where a.id=m.appid and m.userid='{$this->userid}' order by m.added desc limit 6");

// top apps
$top_apps = $this->query_select("select a.* from ".tbl_my_apps." m 
left join ".tbl_apps." a ON a.id = m.appid
group by m.appid
order by COUNT(m.id) desc limit 5");

$this->template->assign([ "user_id" => $user_id, "top_apps" => $top_apps, "backhref" => $backhref, "headername" => $header_name, "mheader" => $modify_header, "this" => $this,"query_apps"=>$query_apps, "custom_msg" => $custom_err_message, "uid" => $uid, "c" => $c, "genre" => $genre, "user_apps" => $user_apps]);
echo $this->getPage($this->template->fetch($this->theme_dir."/apps/index.html"));
}

// get app players count
public function getAppPlayersCount($appid){
	$c = 0;
	if(is_numeric($appid)){
		
		$q = $this->db->query("select COUNT(*) from ".tbl_my_apps." where `appid`='{$appid}'");
		$c = $q->fetch_row();
		$c = $c[0];
		
		
	}
	
	return $c;
}

// run app
public function runapp(){
	
$appid = isset($_POST['appid']) ? (int) $this->test_input($_POST['appid']) : '';

$r = 0;
	
if(is_numeric($appid)){

// select data about app
$q = $this->db->query("select * from ".tbl_apps." where `id`='{$appid}' limit 1");		
$q = $q->fetch_array(MYSQLI_ASSOC);	

// select images for respective app
$q_app_images = $this->query_select("select id from ".tbl_apps_covers." where `app_id`='{$appid}' order by id desc");
	
$this->template->assign([ "this" => $this,"res" => $q, "images" => $q_app_images]);
$r = $this->getPage($this->template->fetch($this->theme_dir."/apps/run_app.html"));	
	
}
	
	echo $r;
}


// play app
public function playApp(){
	
$appid = isset($_GET['id']) ? (int) $this->test_input($_GET['id']) : '';
	
// select data about app
$q = $this->db->query("select * from ".tbl_apps." where `id`='{$appid}' limit 1");		
$q = $q->fetch_array(MYSQLI_ASSOC);

if(!$q){
$r = '<div class="no_rows" id="no_apps"><div>'.$this->lang['err_launch_app'].'</div></div>';	
	
}	else {

// update app +1view
$update_views = $this->query_update("update ".tbl_apps." set `views`=views+1 where `id`='{$appid}'");

// insert this app into respective user's apps
$c_uapps = count($this->query_select("select id from ".tbl_my_apps." where `userid`='{$this->userid}' and `appid`='{$appid}' limit 1"));

if(!$c_uapps)
$inuapps = $this->query_insert("insert into ".tbl_my_apps." set `appid`='{$appid}',`userid`='{$this->userid}',`added`='{$this->ntime}'");
else
$upuapps = $this->query_update("update ".tbl_my_apps." set `added`='{$this->ntime}' where `appid`='{$appid}' and `userid`='{$this->userid}'");	


$this->template->assign([ "this" => $this, "res" => $q]);
$r = $this->getPage($this->template->fetch($this->theme_dir."/apps/play_app.html"));	
}

echo $r;
}

// search in apps page
public function searchInApps(){
	
$key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';
$genre = isset($_POST['genre']) ? (int) $this->test_input($_POST['genre']) : '';
$r = 0;	
	if(trim($key)){
		
		$sql_genre = $genre ? "and `genre`='{$genre}'" : "";
		// get results
		$query = $this->query_select("Select * from ".tbl_apps." where `title` LIKE N'%{$key}%' ".$sql_genre." order by `title` asc,`added` desc limit 100");
		
		$this->template->assign([ "this" => $this, "genre" => $genre ? $this->getAppGenre($genre) : false, "q" => $query, "key" => $key]);
		$r = $this->getPage($this->template->fetch($this->theme_dir."/apps/search_apps.html"));
	}
	echo $r;
}

// delete user profile
public function deleteUserProfile(){
	
	$uid = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : 0;
	$r = 0;
	if(is_numeric($uid) && $uid > 0 && $this->settings['delete_user_account'] === "true"){
		
		
		// select data about user'
		$about = $this->db->query("select * from ".tbl_users." where `id`='{$uid}' limit 1");
		$about = $about->fetch_array(MYSQLI_ASSOC);
		
		// check for the owner of respective profile
		if ($this->USER['id'] === $about['id']){
			
			/// all its fine, lets delete all data about the user;
			// delete all photos
			$delete_photos = $this->query_delete("delete from ".tbl_photos." where `userid`='{$uid}'");
			// if the photos are deleted succesfully from database, then delete it from server
			if($delete_photos)
				@unlink(__ROOT__.__IMG_DIR.$uid);
			
			// delete videos, how delete ?? change only the author of the video as KN (sitename)

			// delete albums
			$delete_comments = $this->query_delete("delete from ".tbl_albums." where `userid`='{$uid}'");	
			
			
			// delete from posts from wall
			$delete_wall = $this->query_delete("delete from ".tbl_feed." where `byuser`='{$uid}'");	
			
			// delete comments
			$delete_comments = $this->query_delete("delete from ".tbl_comments." where `userid`='{$uid}'");	
			
			// delete themes
			$delete_themes = $this->query_delete("delete from ".tbl_themes." where `userid`='{$uid}'");
			
			// delete image from slideshow
			$delete_slideshow_imgs = $this->query_delete("delete from ".tbl_slideshow_imgs." where `userid`='{$uid}'");
			$delete_slideshow = $this->query_delete("delete from ".tbl_slideshow." where `userid`='{$uid}'");										
													
			// delete shared links
			$delete_links = $this->query_delete("delete from ".tbl_slinks." where `byuser`='{$uid}'");
			
			// delete from search history
			$delete_search_history = $this->query_delete("delete from ".tbl_search_history." where `userid`='{$uid}'");
			
			// delete posts
			$delete_posts = $this->query_delete("delete from ".tbl_posts." where `userid`='{$uid}'");
			
			// delete from photos rating (stars)
			$delete_photo_stars = $this->query_delete("delete from ".tbl_photo_rate." where `userid`='{$uid}'");
			
			// delete notifications
			$delete_notifications = $this->query_delete("delete from ".tbl_notif." where `userid`='{$uid}'");
			
			// delete apps
			$delete_apps = $this->query_delete("delete from ".tbl_my_apps." where `userid`='{$uid}'");
			
			// delete tracks
			$delete_tracks = $this->query_delete("delete from ".tbl_music." where `owner`='{$uid}'");

			// delete tracks from history
			$delete_tracks_history = $this->query_delete("delete from ".tbl_history." where `user`='{$uid}'");

			// delete messages
			$delete_messages = $this->query_delete("delete from ".tbl_msg." where `toUser`='{$uid}'");	
			$delete_messages = $this->query_delete("delete from ".tbl_msg." where `fromUser`='{$uid}'");

			
			// delete likes
			$delete_likes = $this->query_delete("delete from ".tbl_klass." where `userid`='{$uid}'");							
												
			// delete from ip logs
			$delete_iplogs = $this->query_delete("delete from ".tbl_iplog." where `userid`='{$uid}'");	


			// delete from guests
			$delete_guests = $this->query_delete("delete from ".tbl_guests." where `userid`='{$uid}'");			

			// delete grades
			$delete_grades = $this->query_delete("delete from ".tbl_grades." where `userid`='{$uid}'");	

			// delete friends
			$delete_friends = $this->query_delete("delete from ".tbl_friends." where `userid`='{$uid}'");			
			$delete_friends = $this->query_delete("delete from ".tbl_friends." where `friendid`='{$uid}'");
			
			
			// delete from feed's favorite list
			$delete_feed_favorite = $this->query_delete("delete from ".tbl_feed_fv." where `fvid`='{$uid}'");	

				
			// delete checkd in
			$delete_checkedin = $this->query_delete("delete from ".tbl_checkin." where `user`='{$uid}'");	

			// delete from blacklist
			$delete_blacklist = $this->query_delete("delete from ".tbl_blacklist." where `userid`='{$uid}'");	
			
			
			// delete attachments
			$delete_blacklist = $this->query_delete("delete from ".tbl_attach." where `userid`='{$uid}'");	
			
			
			
			// at the final. delete the user :(
			$delete_user = $this->query_delete("delete from ".tbl_users." where `id`='{$uid}'");
	
			if($delete_user)
				$r = 1;
	
		}
		
		
	}
	
	echo $r;
	
}


// private profile
public function privateProfile(){
	
	$mode = isset($_POST['mode']) ? $this->test_input($_POST['mode']) : '';
	$r = 0;

	if ($mode && ($mode === 'off' || $mode === 'on'))
 {
		
		switch($mode){
			
			case 'on':
			$update = $this->query_update("update ".tbl_users." set `private`='yes' where `id`='{$this->userid}'");
			break;
			
			case 'off':
			$update = $this->query_update("update ".tbl_users." set `private`='no' where `id`='{$this->userid}'");
			break;
			
		}
		
		if($update) $r = 1;
		
	}
	echo $r;
}


// empty feed
public function emptyFeed(){


$popular_videos = $this->query_select("select * from ".tbl_videos." group by id order by `views` desc limit 2");
$trending_tracks = $this->query_select("select distinct m.*, m.added as dtb from ".tbl_songs." m 
										where m.artist!='Unknown Artist' and m.title!='unknown' group by m.artist
										order by m.year * 1 desc,rand() LIMIT 5");





$some_apps = $this->query_select("select * from ".tbl_apps." group by id order by views desc limit 3");

$this->template->assign([
							'this' => $this,
							'user' => $this->USER,
							'popular_videos' => $popular_videos,
							'trending_tracks' => $trending_tracks,
							'_apps' => $some_apps
  ]);
  
$this->template->display($this->theme_dir."/profile/welcome.html");

}

// search friends in chat section
public function searchChatFriends() {
	
	$key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';
	$result = array();
	if($key){
		
		$query = $this->query_select("select u.id,u.fullname,u.gender,u.username,u.profile_photo,u.online from ".tbl_users." u, ".tbl_friends." f
			  where (u.id = f.friendid and f.userid = '{$this->userid}' and f.status='confirmed') 
			  && (u.name LIKE N'%".$key."%' || u.surname LIKE N'%".$key."%' || u.fullname LIKE N'%".$key."%') 
			  group by u.id order by RAND() desc");
			  
	
		foreach($query as $u){
			
			$result[] = array("fid" => $u['id'], "fgender" => $u['gender'], "online_int" => $u['online'], "fullname" => $u['fullname'], "fphoto" => $u['profile_photo'], "fonline" => $this->time_elapsed($u['online'],1));
			
		}
	}
	echo json_encode($result);
	

}
public function basicInfoUpdate(){
	
	$interests = isset($_POST['dk_interests']) ? $this->test_input($_POST['dk_interests']) : '';
	$quotes = isset($_POST['dk_quotes']) ? $this->test_input($_POST['dk_quotes']) : '';
	$aboutme = isset($_POST['dk_aboutme']) ? $this->test_input($_POST['dk_aboutme']) : '';
	$hobby = isset($_POST['dk_hobby']) ? $this->test_input($_POST['dk_hobby']) : '';
	
	if($this->query_update("update ".tbl_users." set `hobby`='{$hobby}',`interests`='{$interests}',`quotes`='{$quotes}',`aboutme`='{$aboutme}' where `id`='{$this->userid}'")) 
	echo 1; else echo 0;
	
}
public function personal_views_update(){
	
	$political_views = isset($_POST['political_views']) ? $this->test_input($_POST['political_views']) : '';
	$world_view = isset($_POST['world_view']) ? $this->test_input($_POST['world_view']) : '';
	$personal_priority = isset($_POST['personal_priority']) ? $this->test_input($_POST['personal_priority']) : '';
	$important_in_others = isset($_POST['important_in_others']) ? $this->test_input($_POST['important_in_others']) : '';
	$views_on_smoking = isset($_POST['views_on_smoking']) ? $this->test_input($_POST['views_on_smoking']) : '';
	$views_on_alcohol = isset($_POST['views_on_alcohol']) ? $this->test_input($_POST['views_on_alcohol']) : '';
	 
	if($this->query_update("update ".tbl_users." set 
	`political_views`='{$political_views}',
	`world_view`='{$world_view}',
	`personal_priority`='{$personal_priority}',
	`important_in_others`='{$important_in_others}',
	`views_on_smoking`='{$views_on_smoking}',
	`views_on_alcohol`='{$views_on_alcohol}'
	

	where `id`='{$this->userid}'")) 
	echo 1; else echo 0;
	
}

// media update
public function mediaUpdate(){
	
	$uid = $this->USER['id'];
	$embera_hide = isset($_POST['st_hideEmberaAttachments']) ? $_POST['st_hideEmberaAttachments'] : '';
	$auto_play_videos = isset($_POST['st_autoPlayVideos']) ? $_POST['st_autoPlayVideos'] : '';
	
 
	
	if ($embera_hide == 'on') $embera_hide = 'no'; else $embera_hide = 'yes';
	if ($auto_play_videos == 'on' ) $auto_play_videos = 'yes'; else $auto_play_videos = 'no';
	
	$update = $this->query_update("update ".tbl_users." set `show_embera`='{$embera_hide}',`auto_play_videos`='{$auto_play_videos}' where `id`='{$uid}'");
	
	if($update) echo 1; else echo 0;
}

// privacy update
public function privacyupdate(){
	
	// visibility
	$v_age = isset($_POST['st_accessForAGE_VISIBILITY']) ? $this->test_input($_POST['st_accessForAGE_VISIBILITY']) : 'everyone';
	$v_apps = isset($_POST['st_accessForGAMES_APPS_VISIBILITY']) ? $this->test_input($_POST['st_accessForGAMES_APPS_VISIBILITY']) : 'everyone';
	$v_relationship = isset($_POST['st_accessForRELATIONS_BLOCK_VISIBILITY']) && $_POST['st_accessForRELATIONS_BLOCK_VISIBILITY'] > 0 ? 'friends' : 'everyone';
	
	// allow
	$a_tag_photos = isset($_POST['st_accessForMAKE_PHOTOPINS'])  && $_POST['st_accessForMAKE_PHOTOPINS'] > 0 ? 'friends' : 'nobody';
	$a_tag_posts = isset($_POST['st_accessForMARK_IN_TOPICS']) && $_POST['st_accessForMARK_IN_TOPICS'] > 0 ? 'friends' : 'nobody';
	$a_share_my_photos = isset($_POST['st_accessForPERSONAL_PHOTOS_RESHARE']) ? $this->test_input($_POST['st_accessForPERSONAL_PHOTOS_RESHARE']) : '';
	$a_comm_my_photos = isset($_POST['st_accessForPERSONAL_PHOTOS_COMMENT']) ? $this->test_input($_POST['st_accessForPERSONAL_PHOTOS_COMMENT']) : '';
	$a_send_me_pm = isset($_POST['st_accessForPERSONAL_MESSAGES']) && $_POST['st_accessForPERSONAL_MESSAGES'] > 0 ? 'friends' : 'everyone';

	// additional
	$a_show_me_online = isset($_POST['st_accessForON_SITE_NOW_VISIBILITY']) ? 'true' : 'false';
	
	
	
	switch($v_age){
		default: $v_age = 'everyone';break;
		case '1': $v_age = 'friends';break;
		case '2': $v_age = 'only_me';break;
	}
	
	switch($v_apps){
		default: $v_apps = 'everyone';break;
		case '1': $v_apps = 'friends';break;
		case '2': $v_apps = 'only_me';break;
	}
	
	switch($a_share_my_photos){
		default: $a_share_my_photos = 'everyone';break;
		case '1': $a_share_my_photos = 'friends';break;
		case '2': $a_share_my_photos = 'nobody';break;
	}
	
	switch($a_comm_my_photos){
		default: $a_comm_my_photos = 'everyone';break;
		case '1': $a_comm_my_photos = 'friends';break;
		case '2': $a_comm_my_photos = 'nobody';break;
	}
	
	// update privacy settings
	$update = $this->query_update("update ".tbl_users." set 
															`privacy_age`='{$v_age}',
															`privacy_apps`='{$v_apps}',
															`privacy_love`='{$v_relationship}',
															`allow_tag_photos`='{$a_tag_photos}',
															`allow_tag_posts` = '{$a_tag_posts}',
															`allow_share_myphotos` = '{$a_share_my_photos}',
															`allow_comment_myphotos` = '{$a_comm_my_photos}',
															`allow_send_pm` = '{$a_send_me_pm}',
															`display_online` = '{$a_show_me_online}'
								where `id`='{$this->userid}'");
								
	if($update) $r = 1; else $r = 0;

  echo $r;	

}


// add to bookmark
public function bookmarkThis(){
	
	$itemid = isset($_POST['itemid']) ? (int) $this->test_input($_POST['itemid']) : '';
	$categ = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : '';
	$r = 0;
	
	// check if the item is already in bookmarks
	$check = count($this->query_select("select id from ".tbl_bookmarks." where `uid`='{$this->userid}' and `itemid`='{$itemid}' and `categ`='{$categ}' limit 1"));
	
	if($check){
		
		$r = 'exist';
	} else if($itemid && $categ){
		
		$b_q = $this->query_insert("insert into ".tbl_bookmarks." set `itemid`='{$itemid}', `categ`='{$categ}', `added`='{$this->ntime}',`uid`='{$this->userid}'");
		
		if($b_q) $r =1;
		
	}
	echo $r;
}

// remove bookmark
public function removeBookmark(){
	
	$itemid = isset($_POST['id']) ? (int) $this->test_input($_POST['id']) : '';

	$r = 0;

	$delete = $this->query_delete("delete from ".tbl_bookmarks." where `id`='{$itemid}'");

	if($delete) $r = 1;
	
	echo $r;
}

// check if is in bookmarks
public function isFavorite(){
	
	$itemid = isset($_POST['itemid']) ? (int) $this->test_input($_POST['itemid']) : '';
	$categ = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : '';
	$i = $this->USER['id'];

	$q = $this->db->query("select `id` from ".tbl_bookmarks." where `itemid`='{$itemid}' and `categ`='{$categ}' and `uid`='{$i}' limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	echo isset($r['id']) ? $r['id'] : 0;
}

// get gift popup
public function getGiftPopup(){
	
$id = isset($_POST['giftid']) ? (int) $this->test_input($_POST['giftid']) : '';	

$r_gift = array();

if(is_numeric($id)) {
	
	// get gift info
	$q_gift = $this->db->query("select * from ".tbl_gifts." where `id`='{$id}' limit 1");
	$r_gift = $q_gift->fetch_array(MYSQLI_ASSOC);
		
	



$this->template->assign([
						 'this' => $this,
						 'rgift' => $r_gift,
						 'giftid' => $id,
						 'all_friends' => json_decode(stripslashes($this->getAllFriends()),true)
						 ]);
						 
$content = $this->template->fetch($this->theme_dir."/popups/p_gift.html");
} else{
$content = $this->template->fetch($this->theme_dir."/popups/p_error.html");	
}
echo $this->getPage($content);
	
}

// gift ready to send
public function giftReadyToSend(){
	
	$gid = isset($_POST['gid']) ? (int) $this->test_input($_POST['gid']) : '';	
	$uid = isset($_POST['uid']) ? (int) $this->test_input($_POST['uid']) : '';

	if($gid && $uid){
	
	// get data about user
	$q_u = $this->db->query("Select `id`,`fullname`,`profile_photo`,`gender` from ".tbl_users." where `id`='{$uid}' limit 1");
	$r_u = $q_u->fetch_array(MYSQLI_ASSOC);
	
	// get data about gift
	$q_g = $this->db->query("select * from ".tbl_gifts." where `id`='{$gid}' limit 1");
	$r_g = $q_g->fetch_array(MYSQLI_ASSOC);
	
$this->template->assign([
						 'this' => $this,
						 'us' => $r_u,
						 'gf' => $r_g
						 ]);
						 
		$content = $this->template->fetch($this->theme_dir."/popups/p_ready_gift.html");
	} else 
		$content = $this->template->fetch($this->theme_dir."/popups/p_error.html");

echo $this->getPage($content);
}

// buy gift
public function buyGift(){
	
	$gid = isset($_POST['giftid']) ? (int) $this->test_input($_POST['giftid']) : '';	
	$uid = isset($_POST['touser']) ? (int) $this->test_input($_POST['touser']) : '';
	$price = isset($_POST['price']) ? (int) $this->test_input($_POST['price']) : '';
	$descr = isset($_POST['gift_wish']) ? $this->test_input($_POST['gift_wish']) : '';
	$private = isset($_POST['gift_private']) ? $this->test_input($_POST['gift_private']) : '';
	$anonym = isset($_POST['gift_anonymous']) ? $this->test_input($_POST['gift_anonymous']) : '';
	
	$r = 0;
	
	if( (float)$this->USER['balance'] < (float)$price){
		
		
		$r  = 0;
	} else	if($gid && $uid && $price){
		
		$json = json_encode(["descr" => $descr, "private" => $private, "anonym" => $anonym]);
		
		if($this->toNotif($uid,'gift',$gid,$json,$this->userid)) {
			
			// take the money
			$this->query_update("update ".tbl_users." set `balance`= balance - {$price} WHERE `id`='{$this->userid}'");
		//	$qry = "UPDATE ".tbl_users." SET `balance` = (balance - :price) WHERE `id`='{$this->userid}'";
		//	$stmt = $this->db->prepare($qry);
		//	$stmt->execute(array(':price' => $price));
			
			$r = 1;
			
			}
	
		
		
	} 
	
	echo $r;
}

// accept gift
public function acceptGift(){
	
	$notif_id = isset($_POST['notif_id']) ? (int) $this->test_input($_POST['notif_id']) : '';	
	$g_time = isset($_POST['gift_send_at']) ? (int) $this->test_input($_POST['gift_send_at']) : '';
	$g_id = isset($_POST['gift_id']) ? (int) $this->test_input($_POST['gift_id']) : '';
	$fromUser = isset($_POST['fromuser']) ? (int) $this->test_input($_POST['fromuser']) : '';
	$gift_descr = isset($_POST['gift_descr']) ? $this->test_input($_POST['gift_descr']) : '';
	$gift_private = isset($_POST['gift_private']) ? $this->test_input($_POST['gift_private']) : '';
	$gift_anonym = isset($_POST['gift_anonym']) ? $this->test_input($_POST['gift_anonym']) : '';
	
	if($gift_private) $gift_private = "yes";
	if($gift_anonym) $gift_anonym = "yes";
	
	$r = 0;
	
	if($g_time && $g_id && $fromUser){
		
		
		// add gift
		$_add = $this->query_insert("insert into ".tbl_ugifts." set 	`gift_id`='{$g_id}',
																		`userid`='{$this->userid}',
																		`descr`='{$gift_descr}',
																		`added`='{$g_time}',
																		`fromuser`='{$fromUser}',
																		`private`='{$gift_private}',
																		`anonym`='{$gift_anonym}'
									");
									
		if($_add) $r = 1;							
	}
	
	echo $r;
	
}

// check if the user allow comments their photos (speccialy for local comments tab)
public function allowCommentOnPhoto(){
	
	$photoid = isset($_POST['photoid']) ? (int) $this->test_input($_POST['photoid']) : 0;
	$userid = 0;
	$r = false;
	
	if($photoid && is_numeric($photoid)){
		
		// select userid for respective photo
		$q = $this->db->query("select `userid` from ".tbl_photos." where `id`='{$photoid}' limit 1");
		$r = $q->fetch_array(MYSQLI_ASSOC);
		$userid = $r['userid'];
		$r = $this->allowCommentPhoto($userid);
	}
	
	echo $r;
	
}

// reshare content
public function reshare(){
	
	
	$itemid = isset($_POST['it_id']) ? $this->test_input($_POST['it_id']) : '';
	$community = isset($_POST['share-community']) && $_POST['share-community'] == 'yes' ? 'yes' : 'no';
    $post_author = isset($_POST['post_author']) ? $this->test_input($_POST['post_author']) : '0';
	$type = $community == 'yes' && !isset($_POST['type']) ? 'club' : (isset($_POST['type']) ? $this->test_input($_POST['type']) : 'text');
	$r = 0;
	
	
	if($itemid){
		
		// add to shared posts
		$q = $this->query_insert("insert into ".tbl_shared_posts." set 
																		`userid`='{$this->userid}',
																		`community`='{$community}',
																		`post_type`='{$type}',
																		`added`='{$this->ntime}',
																		`owner_id`='{$post_author}',
																		`post_id`='{$itemid}'
		");
		
	

		// add to feed
		if($q) {
			$c2global = new _global_co;
			$c2global->toFeed($q, 'reshare', 'resharePost', 'club', ($community == 'yes' ? true : false) );

		 $r = 1;
		}
	}
	echo $r;
}


// share in messages
public function shareInMessage(){
	
	$itemid = isset($_POST['itemid']) ? $this->test_input($_POST['itemid']) : '';
	$tousers = isset($_POST['to']) ? $_POST['to'] : '';
	$a = 0;

	
	foreach($tousers as $user):
 
	$msg = "[share]".$itemid."[/share]";
	if($this->sendPM($msg,$user,1,true)) $a = 1;
	
	endforeach;
	
	echo $a;
	
}

// storing pictures from an album
public function getPictureFromAlbum(){
	
	$album_id = isset($_POST['album_id']) ? $this->test_input($_POST['album_id']) : '0';
	 
	$q = $this->query_select("select * from ".tbl_photos." where `albumid`='{$album_id}' and `userid`='{$this->userid}' order by added desc limit 99");
	
	echo json_encode($q);
	
	
}

} // end class
