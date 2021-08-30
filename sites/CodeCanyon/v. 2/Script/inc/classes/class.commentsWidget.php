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
     						        

 
class comm_widget extends _global_co {


public $postid;
public $userid;
public $time;
public $categ;
public $limit_cm;
public $load_prev;

public function __construct(){

//the old building from parent class
parent::__construct();


	 $this->userid = $this->USER['id'];
	 $this->time = time();
	 $this->postid = isset($_POST['id']) ? (int) $this->test_input(b_decode($_POST['id'])) : '';
	 $this->categ = isset($_POST['categ']) ? $this->test_input($_POST['categ']) : '';
	 $this->load_prev = isset($_POST['load_prev']) ? $this->test_input($_POST['load_prev']) : '';
	 $this->customLimit = isset($_POST['customlimit']) ? $this->test_input($_POST['customlimit']) : '';
	 $this->limit_cm = $this->customLimit ? $this->customLimit : $this->settings['CMWIDGET_COMMENTS_LIMIT']; // from settings
	 $this->limit_cm = $this->load_prev ? "{$this->limit_cm},9999" : $this->limit_cm;
}



 // post comment (comments widget)
 public function addComment(){
	 
$comment = isset($_POST['comment']) ? $this->test_input($_POST['comment']) : '';

$community = isset($_POST['community']) ? 'yes' : 'no';

$res = array();
$i = $this->test_input($this->userid);
$now = time();
if(!is_numeric($this->postid))
$res['s'] = 0;
else if($comment && $this->postid){

// insert comment
$query = $this->query_insert("insert into ".tbl_comments." set 
								`userid`='{$this->userid}',
	 							`itemid`='{$this->postid}',
								`categ` = 'comment',
								`added` = '{$now}',
								`text`  = '{$comment}',
								`community` = '{$community}',
								`item_type`='{$this->categ}'
			     ");
 
if($query){
	$mentioned = false;
	// check for mentioned friend
	if( strpos($comment, '[umention]') !== false ){
		
		$mentioned = true;
		
	}
	
 /*
	if($mentioned) {
		$mentioned_id = 0;
			$comment =  preg_replace_callback("/\[umention\]((\s|.)+?)\[\/umention\]/i", function($id)  { 
				 
				$mentioned_id = $id[1];
				return '';
				}, $comment);
		
		
		if($mentioned_id != $this->userid && $this->categ == 'post') $sendNotification = $this->toNotif($mentioned_id,"comment",$query,"post",$this->postid,false,$mentioned);
		if($mentioned_id != $this->userid && $this->categ == 'video') $sendNotification = $this->toNotif($mentioned_id,"comment",$query,"video",$this->postid,false,$mentioned);
		
		
	} else {
		*/
	
	
	if($this->categ === 'post'){
	
	// select userid for respective post
	$q_user = $this->db->query("select `userid` from ".tbl_posts." where `id`='{$this->postid}' limit 1");
	$r_user = $q_user->fetch_array(MYSQLI_ASSOC);
	$r_userid = $r_user['userid'];

	// send notification to repsective user
	if($r_userid !== $this->userid) $sendNotification = $this->toNotif($r_userid,"comment",$query,"post",$this->postid,false,$mentioned);
	
	} elseif($this->categ === 'video'){
	
	// select userid for respective post
	$q_user = $community == 'yes' ? $this->db->query("select `userid` from ".tbl_communities_pics." where `id`='{$this->postid}' limit 1") : $this->db->query("select `userid` from ".tbl_videos." where `id`='{$this->postid}' limit 1");
	$r_user = $q_user->fetch_array(MYSQLI_ASSOC);
	$r_userid = $r_user['userid'];
	 

	// send notification to repsective user
	if($r_userid !== $this->userid) $sendNotification = $this->toNotif($r_userid,"comment",$query,"video",$this->postid,false,$mentioned);
	
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
 
 // get previous comments
public function prevComments(){
	
	
return $this->getPostComments($this->limit_cm);
	
	
}
 
 // get post's comments
 public function getPostComments($load_prev = false){
	 $custom_limit = isset($_POST['customlimit']) ? (int) $this->test_input($_POST['customlimit']) : 0;
	 $post_limit = isset($_POST['limit']) ? (int) $this->test_input($_POST['limit']) : 0;
	 $this->limit_cm = $load_prev && !$post_limit ? "{$this->limit_cm},9999" : ($post_limit && !$load_prev ? $post_limit : $this->limit_cm);
     $this->limit_cm = $custom_limit ? "{$custom_limit},9999" : $this->limit_cm;
	 $community = isset($_POST['community']) ? "and c.community='yes'" : "";
	 
	 $res = $comm_data = array();

	 if(!is_numeric($this->postid) || $this->postid < 0){
		 
		$res['s'] = 0;
		 
		 
	 } else {
		 
		 


$res['s'] = 0;
$res['POST_LIMIT'] = $this->limit_cm;

$query = $this->query_select("select 
 SQL_CALC_FOUND_ROWS c.id,
(select COUNT(distinct id) from ".tbl_comments." where `categ`='reply' and `itemid`=c.id) as replies_count,

(select COUNT(distinct id) from ".tbl_klass." where `type`='comment' and `itemid` = c.id) as comm_likes_count,

 COUNT(distinct lb.id) as liked_by_me, c.id, c.updated, c.added, c.text,
 u.gender as ugender,u.fullname as uname, u.id as uid, u.profile_photo as uphoto from ".tbl_comments." c
	left join ".tbl_users." u ON u.id = c.userid

	left join ".tbl_klass." lb ON lb.itemid = c.id and lb.type='comment' and lb.userid = '{$this->userid}'

 where c.itemid='{$this->postid}' and c.categ='comment' ".$community." and c.item_type='{$this->categ}' group by c.id order by c.added desc limit ".$this->limit_cm);
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
(select COUNT(distinct id) from ".tbl_klass." where `type`='comment' and `itemid`=r.id) as r_comm_likes_count,
COUNT(distinct lb.id) as r_liked_by_me,
r.userid as r_author,ur.fullname as r_uname,ur.profile_photo as r_uphoto,ur.gender as r_ugender, r.id as r_id,r.updated as r_updated, r.itemid as r_parentid,r.added as r_added, r.text as r_text 
				  from ".tbl_comments." r
	left join ".tbl_users." ur ON ur.id = r.userid

	left join ".tbl_klass." lb ON lb.itemid = r.id and lb.userid = '{$this->userid}'
 where r.itemid='".$data['id']."' and r.categ='reply' group by r.id order by r.added desc limit ".$this->settings['CMWIDGET_COMMENTS_LIMIT']);

foreach($replies_q as $r_data):
$r_adaugat = $this->time_elapsed($r_data['r_added'],0,1);
$replies_to_reply = array();
// get replies of reply
$reply_of_reply = $this->query_select("
select 
(select COUNT(distinct id) from ".tbl_klass." where `type`='comment' and `itemid`=r.id) as r_comm_likes_count,

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

	left join ".tbl_klass." lb ON lb.itemid = r.id and lb.userid = '{$this->userid}'
    where r.itemid='".$r_data['r_id']."' and r.categ='reply_to_reply' group by r.id order by r.added desc limit ".$this->settings['CMWIDGET_COMMENTS_LIMIT']);

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
//print_r($res);die;

		 
		 
		 
	 }
	 
	 echo json_encode($res);
	 
 }
 

} // end class