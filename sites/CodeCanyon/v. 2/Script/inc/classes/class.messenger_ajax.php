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



class PRIVATE_MESSAGES extends _global_co {

public $userid = 0;

public function __construct(){

//the old building from parent class
parent::__construct();
$this->userid = $this->USER['id'];


}

// last online friends convert timestamp to e.g -> September 27 2015 at 19:04
public function lastMessageConvertTime($time){

if(date('d',$time) == date('d')){
// hour + minutes
$d = date('H:i',$time);
} else if(date('d',$time) == date('d')-1){
$d = $this->lang['yesterday'];
} else if(date('Y',$time) != date('Y')){
$d = $this->gMinMonthName(date("j M, y", $time));
} else {
$d = $this->gMinMonthName(date("j M", $time));
}

return $d;

}

// build query for selected conversation
public function run_msg_query($uid,$page = 0){

$i = $this->userid;

$msg_limit = $this->settings['PM_MESSAGES_LIMIT']; // from settings
$start = ($page * $msg_limit) - $msg_limit;
///$start = isset($_POST['s_at']) ? $this->test_input($_POST['s_at']) : $start;

$limit = $page ? "limit {$start},{$msg_limit}" : "limit ".$msg_limit;

$query = $this->query_select("
SELECT * FROM (
select *, (select COUNT(id) from ".tbl_msg." where fromUser = '{$i}' and toUser = '{$uid}' and `deleteby` != '{$i}' OR 
			     `fromUser` = '{$uid}' and `toUser` = '{$i}' and `deleteby` != '{$i}') as c

			      from ".tbl_msg." where fromUser = '{$i}' and toUser = '{$uid}' and `deleteby` != '{$i}'
			      OR 
			     `fromUser` = '{$uid}' and `toUser` = '{$i}' and `deleteby` != '{$i}' order by time desc {$limit}

) sub
 ORDER BY time ASC
");

return $query;

}

// get conversation
public function getConversation($uid) {

$i = $this->userid;
$messages = array();
$query = $this->run_msg_query($uid);

// set messages as read
$set_read = $this->query_update("update ".tbl_msg." set `read`='yes' where `fromUser` = '{$uid}' and `toUser`='{$i}' and `read`='no'");

foreach($query as $result){

$date = date('j',$result['time']);
$dateMonth = date('Y',$result['time']) == date('Y') ? ($date === date('j') ? $this->lang['today'] : ($date == date('j') -1 ? $this->lang['yesterday'] : date('j F', $result['time']))) : date('j F, Y', $result['time']);
$messages[] = array('id' => $result['id'],'bg' => $result['bg'],'msg' => $this->str_smilies($result['msg'],false,$result['id'],false,true), 'fromUser' => $result['fromUser'],
		     'toUser' => $result['toUser'], 'time' => $this->pm_time($result['time']), 'lastby' => $result['lastby'], 'count' => $result['c'] > $this->settings['PM_MESSAGES_LIMIT'] ? 1 : '',
		     'read' => $result['read'], 'uonline' => $this->getUserStatus($uid), 'date' => $date, 'currDate' => date('j'), 'dateMonth' => $dateMonth);

}
echo count($query) > 0 ? json_encode(["messages" => $messages, "allowsendpm" => $this->allowSendPm($uid)]) : json_encode(["allowsendpm" => $this->allowSendPm($uid), 'exp' => $this->lang['pm_no_msg'], 'sub' => $this->lang['pm_first_move'] ]);

}

// convert timestamp to hour and minutes
public function pm_time($t){
return date("H:i",$t);
}

// edit message
public function editMessage($text,$rcpid,$msg_id){

// author ID
$i = $this->userid;

// check for message author
$q_check = $this->db->query("select `fromUser` from ".tbl_msg." where `id`='{$msg_id}' limit 1");
$c_res = $q_check->fetch_array(MYSQLI_ASSOC);

if($c_res['fromUser'] != $i)
die;
else {

$update = $this->query_update("update ".tbl_msg." set `msg`='$text' where `id` = '{$msg_id}' and `fromUser`='{$i}'");

if($update)
echo json_encode( [ 'response' => 'success', 'text' => $this->str_smilies($text,false,false,false,true), 'msgid' => $msg_id, 'recipient' => $rcpid ] );
else
echo $this->lang['pm_error_edit'];

}


}
public function getLastMessage($recipient_id){
	$i = $this->userid;
	$q = $this->db->query("select `msg`,`time`,`fromUser` from ".tbl_msg." where (fromUser = '{$i}' && toUser = '{$recipient_id}' OR fromUser = '{$recipient_id}' && toUser = '{$i}') order by time desc limit 1");
	return $q->fetch_array(MYSQLI_ASSOC);
	
	
}
// construct query for dialogs
public function getDialogQuery($page = 0){

$i = $this->userid;

$t_limit = $this->settings['PM_CONVERSATIONS_LIMIT']; // from settings
$start = ($page * $t_limit) - $t_limit;
$start = isset($_POST['s_at']) ? $this->test_input($_POST['s_at']) : $start;

$limit = $page ? "limit {$start},{$t_limit}" : "limit ".$t_limit;
$query = $this->query_select("select u.id, u.fullname, u.profile_photo, u.online from  
".tbl_msg." as m ,".tbl_users." as u

		
									 
				WHERE (
						u.id = m.toUser && m.fromUser = '{$i}' && m.toUser NOT IN (SELECT `userid` from ".tbl_blacklist." where `employer`='{$i}')
						||
						u.id = m.fromUser && m.toUser = '{$i}' && m.fromUser NOT IN (SELECT `userid` from ".tbl_blacklist." where `employer`='{$i}')
					  )
				&& m.deleteby != '{$i}' && m.hidden = 'no'
				GROUP BY IF( m.fromUser = '{$i}', m.toUser, m.fromUser ) 
				order by MAX(m.id) desc ".$limit);

return $query;
}

// write chat
public function chatWrite() {
	
	
	$userid = isset($_POST['userid']) ? $this->test_input($_POST['userid']) : 0;
	$folder = __ROOT__.__CHAT_WRITE.$this->userid.'-'.$userid;
	$a = false;
	
	if (!file_exists($folder)) {
    mkdir($folder, 0777, true);
	$a = true;
	}
	echo $a;
}

// delete write folder
public function chatWriteDelete() {
	
	
	$userid = isset($_POST['userid']) ? $this->test_input($_POST['userid']) : 0;
	$folder = __ROOT__.__CHAT_WRITE.$this->userid.'-'.$userid;
	$a = false;
	
	if (file_exists($folder)) {
    	rmdir($folder);
		$a = true;
	}
	echo $a;
}

// get users
public function getUsersDialog(){
$i = $this->userid; 
$query = $this->getDialogQuery();

$this->template->assign(['this' => $this, 'query' => $query, 'i' => $i, 'sct' => '1']);
$content = $this->template->fetch($this->theme_dir."/messages/conversUsers.html");

echo $this->getPage($content);
}


// send message
public function sendMessage($msg,$toUser,$result = true,$shared = false,$no_background = false){

$bg = $no_background ? 'no' : (isset($_POST['bg']) ? $this->test_input($_POST['bg']) : 'yes');



// stop sending to yourself
if($toUser === $this->userid) die;

// check if the user is in blacklist
$q_blacklist = $this->db->query("select `id` from ".tbl_blacklist." where `employer` = '{$toUser}' and `userid`='{$this->userid}' limit 1");
$r_blacklist = $q_blacklist->fetch_array(MYSQLI_ASSOC);

if($r_blacklist['id']){
	
echo $this->sendResponse(['response' => 'blacklist']);
die;

}

///$bg = $shared ? 'no' : 'yes';
$shared = $shared ? 'yes' : 'no';


$now = time();
$insert = $this->query_insert("insert into ".tbl_msg." set `shared`='{$shared}', `bg`='{$bg}', `msg`='{$msg}', `fromUser`='{$this->userid}', `toUser`='{$toUser}', `time`='{$now}', `lastby`='{$this->userid}'");

if(!$result) return true;

if($insert){
echo $this->sendResponse(['response' => 'success', 'bg' => $bg, 'text' => $this->str_smilies($msg,false,$insert,false,true),'shared' => $shared,  'time' => $this->pm_time($now), 'msgid' => $insert, 'recipient' => $toUser]);

} else {

echo $this->sendResponse(['response' => $this->lang['pm_not_delivered']]);

}

}
// check for new messages
public function checkForNewMessage($i,$recipient){
$response = array();

// select unread messages
$query = $this->query_select("select * from ".tbl_msg." where
																`read`='no' and `toUser`='{$i}' and `fromUser`='{$recipient}' order by time desc limit 30");


// set as read the unread messages
$update = $this->query_update("update ".tbl_msg." set `read`='yes' where fromUser='{$recipient}' and `toUser`='{$i}' and `read`='no'");


// check for unread messages
$q = $this->db->query( "select COUNT(*) as c from ".tbl_msg." where `read`='no' and `fromUser`='{$i}' and `toUser`='{$recipient}'" );
$u = $q->fetch_array(MYSQLI_ASSOC);
//$response['count_unread'] = $u['c'];


foreach($query as $result)
$response[] = array( 'id' => $result['id'], 'bg' => $result['bg'], 'msg' => $this->str_smilies($result['msg'],false,$result['id'],false,true), 'from' => $result['fromUser'],
		   'time' => $this->pm_time($result['time']), 'shared' => $result['shared'], 'lastby' => $result['lastby'], 'read' => $result['read'], 'uonline' => $this->getUserStatus($recipient));


echo json_encode(array("count_unread" => $u['c'], "d" => $response));

}

// get count of new messages
public function getNewMsgCount(){

$response = array();
$toR = array();
$i = $this->USER['id'];

$c = 0;

//$query = $this->query_select("select COUNT(id), fromUser, msg from ".tbl_msg." where `toUser` = '$i' and `read` = 'no' group by msg order by id desc limit 1");
///$ares = count($query->fetch_array(MYSQLI_ASSOC));

$sql = "
select u.fullname, u.profile_photo, COUNT(m2.id) as c, m1.fromUser, m1.msg, m1.time as time_stamp from ".tbl_msg." m1

left join ".tbl_msg." m2 ON m2.toUser = '{$i}' and m2.read = 'no' 
left join ".tbl_users." u ON u.id = m1.fromUser
where
 m1.toUser = '{$i}' and m1.read = 'no' 
group by m1.id order by m1.id desc limit 1

";

$query = $this->query_select($sql);
foreach($query as $res){

$response[] = array( 'time' => $this->lastMessageConvertTime($res['time_stamp']), 'uid' => $res['fromUser'], 'fullname' => $res['fullname'], 'photo' => $res['profile_photo'], 'count' => $res['c'], 
'msg' => $this->str_smilies($res['msg'],1,false,false,true) );
$c = $res['c'];

}
// 'uonline' => $this->getUserStatus($res['fromUser'])
if(!$c){

// update online status on messages dialog
$query = $this->query_select("select u.id from ".tbl_users." u, ".tbl_friends." f
                              where f.userid='{$i}' and f.status='confirmed' and u.id = f.friendid and u.id != '{$i}' 
			      group by u.id order by u.online desc,RAND() ");
foreach($query as $res)
$toR[] = array('o_uid' => $res['id'], 'o_uConnected' => $this->getUserStatus($res['id']));

echo 'null|-|'. json_encode($toR) .'|-|'. $this->count_online_friends();
}else
echo json_encode($response) . '|-|'.$c;

}

// online users
public function switchToOnlineTab(){

echo $this->getOnlineFr();

}

// typing module
public function typing($uid, $typing){

// var
$var = 0;

$chat = false;

// my uid 
$mid = $this->userid;


  if($typing == "1"){ 
  $q1 = "   
 			select * from ".tbl_msg_typing." where `toUser` = '{$mid}' AND `fromUser`='{$uid}'
			OR `toUser` = '{$uid}' AND `fromUser`='{$mid}'
			ORDER by `id` DESC limit 1
		  ";
  $query_q1 = $this->db->query($q1);
  $assoc_q1 = $query_q1->fetch_array(MYSQLI_ASSOC);

  // if not exist typing in database, then insert
  if(!$assoc_q1){
  $q_2 = $this->query_insert("insert into ".tbl_msg_typing." set `typing`='{$typing}',`fromUser`='{$uid}', `toUser`='{$mid}'");

  if($q_2) $var = 1;
  }
  // if user has stop typing, then delete it from database
  } else if($typing == "0"){ 

  $q_3 = $this->query_delete("delete from ".tbl_msg_typing." where `typing`='1' and `toUser`='{$mid}' and `fromUser`='{$uid}'");
  $var = 1;
  } else {
  $var = 0;
  }


  if($var){

  $q_4 = $this->db->query("select * from ".tbl_msg_typing." where `toUser` = '{$mid}' AND `fromUser`='{$uid}' OR `toUser` = '{$uid}' AND `fromUser`='{$mid}' ORDER by `id` DESC LIMIT 1");
  $chat = $q_4->fetch_array(MYSQLI_ASSOC);

  }

if(!$chat)
$chat = array("typing" => "0","toUser" => $mid);

// send response
echo json_encode( [ 'user' => $chat['toUser'], 'typing' => $chat['typing'] ] );

}


// report message
public function reportMessage($id){
$i = $this->userid;
$up_m = $this->lang['pm_reported_msg'];
// check if the message exist
$q_check = $this->db->query("select `id`,`deleteby` from ".tbl_msg." where `id` = '{$id}' limit 1");
$r_check = $q_check->fetch_array(MYSQLI_ASSOC);

if($r_check['id'] && $r_check['deleteby'] != $i) {
$delete = $this->query_delete("update ".tbl_msg." set `deleteby`='{$i}' where `id` = '{$id}'");
$insert_in_report = $this->query_insert("insert into ".tbl_report." SET `type` = 'private_messages', `type_id`='".$r_check['id']."', `report_by`='{$i}', `added`='".time()."'");
echo '1';
} else
echo $this->lang['pm_not_found'];

}

// delete message
public function deleteMessage($id){
$i = $this->userid;
// check if the message exist
$q_check = $this->db->query("select `id`,`deleteby` from ".tbl_msg." where `id` = '{$id}' limit 1 ");
$r_check = $q_check->fetch_array(MYSQLI_ASSOC);

if($r_check['id'] && $r_check['deleteby']) {
$delete = $this->query_delete("delete from ".tbl_msg." where `id` = '{$id}'");
echo '1';
} else if($r_check['id'] && !$r_check['deleteby']) {
$update = $this->query_update("update ".tbl_msg." set `deleteby` = '{$i}' where `id` = '{$id}'");
echo '1';
} else
echo $this->lang['pm_not_found'];

}

// user to blacklist
public function toBlacklist($id){

$i = $this->userid;
$r = '0';
$now = time();
// check if the user exist into blacklist
$check = $this->db->query("select `id` from ".tbl_blacklist." where `employer`='{$i}' and `userid`='{$id}'");
$exist = $check->fetch_array(MYSQLI_ASSOC);


if(!$exist['id']){ 

// insert into database
$insert = $this->query_insert("insert into ".tbl_blacklist." set `employer` = '{$i}', `userid` = '{$id}', `added`='{$now}' ");

$r = '1';
}
else if($exist['id']) $r = $this->lang['pm_us_exist_blacklist'];

echo $r;

}

// hide conversation
public function hideConversation($id){

$i = $this->userid;

// hide 
$q = $this->query_update("update ".tbl_msg." set `hidden`='yes' where `toUser`='{$i}' and `fromUser`='{$id}' or `toUser`='{$id}' and `fromUser`='{$i}'");

echo 1;
}

// delete conversation
public function delConversation($id){

$i = $this->userid;
/*
// check if the conversation is stark ready for delete from our database
// so if one user has called to delete, we have only to hide it from respective user
// when the opponent user call this action then delete it from database

$q_ch = $this->db->query("select `id` from ".tbl_msg." where  `toUser`='$i' and `fromUser`='$id' and `deleteby`!='$i' or `toUser`='$id' and `fromUser`='$i' and `deleteby`!='$i' limit 1");
$r_ch = $q_ch->num_rows;

if(!$r_ch){

// hide it
$action = $this->query_update("update ".tbl_msg." set `deleteby`='$i' where `toUser`='$i' and `fromUser`='$id' OR `toUser`='$id' and `fromUser`='$i'");

}else{

// delete it 
$action = $this->query_delete("delete from ".tbl_msg." where `toUser`='$i' and `fromUser`='$id' OR `toUser`='$id' and `fromUser`='$i'");

}*/
// check if the exist messages
$q_ch = $this->db->query("select `id` from ".tbl_msg." where `toUser`='{$i}' and `fromUser`='{$id}' and `deleteby`!='{$i}' or `toUser`='{$id}' and `fromUser`='{$i}' and `deleteby`!='{$i}' limit 1");
$r_ch = $q_ch->num_rows;

if($r_ch)
// when the opponent user call this action then delete it from database
$dte = $this->query_delete("delete from ".tbl_msg." where `toUser`='{$i}' and `fromUser`='{$id}' and `deleteby` = '{$id}' OR `toUser`='{$id}' and `fromUser`='{$i}' and `deleteby` = '{$id}'");

// so if one user has called to delete, we have only to hide it from respective user
$uptd = $this->query_update("update ".tbl_msg." set `deleteby`='{$i}' where `toUser`='{$i}' and `fromUser`='{$id}' and `deleteby` = '0' OR `toUser`='{$id}' and `fromUser`='{$i}' and `deleteby` = '0'");


if($uptd || $dte)
echo '1';
else
echo $this->lang['pm_err_delete_conv'];
}

// search friends
public function PMsearchForFriends(){  
$key = isset($_POST['key']) ? $this->test_input($_POST['key']) : '';
$i = $this->userid;
$rsp = $query = array();
$sql = "select u.fullname,u.profile_photo as photo,u.id from  ".tbl_friends." f, ".tbl_users." u
	 where f.userid='{$i}' and u.id = f.friendid and f.status='confirmed' and (u.name LIKE N'%{$key}%' OR u.surname LIKE N'%{$key}%' OR u.fullname LIKE N'%{$key}%') group by u.id order by u.online desc";

$query = $this->query_select($sql);

foreach($query as $res)
$rsp[] = array('id' => $res['id'], 'name' => $res['fullname'], 'photo' => $res['photo'], 'online' => $this->getUserStatus($res['id']));

echo json_encode($rsp);
}

// get more conversations
public function getMoreConversations($page){

$i = $this->userid;
$query = $this->getDialogQuery($page);
$this->template->assign(['this' => $this, 'query' => $query, 'i' => $i, 'sct' => false]);
$content = $this->template->fetch($this->theme_dir."/messages/conversUsers.html");

echo $this->getPage($content);

}

// get previous messages
public function getPrevMessages($uid,$page) {

$i = $this->userid;
$messages = array();
$query = $this->run_msg_query($uid,$page);

foreach($query as $result){

$date = date('j',$result['time']);
$dateMonth = date('Y',$result['time']) == date('Y') ? ($date === date('j') ? $this->lang['today'] : ($date == date('j') -1 ? $this->lang['yesterday'] : date('j F', $result['time']))) : date('j F, Y', $result['time']);
$messages[] = array('id' => $result['id'], 'msg' => $this->str_smilies($result['msg'],false,$result['id'],false,true), 'fromUser' => $result['fromUser'],
		     'toUser' => $result['toUser'], 'time' => $this->pm_time($result['time']), 'lastby' => $result['lastby'], 'exp' => '0', 'count' => $result['c'] > $this->settings['PM_MESSAGES_LIMIT'] ? true : false,
		     'read' => $result['read'], 'uonline' => $this->getUserStatus($uid), 'date' => $date, 'currDate' => date('j'), 'dateMonth' => $dateMonth);

}
echo count($query) > 0 ? json_encode($messages) : json_encode(['exp' => '1']);

}

public function open_messages_window_by_link(){
	$content = '<a id="refresh-url" href="'.$_SERVER["REQUEST_URI"].'" onclick="return privateMessages(event,this);"></a>';
	echo $this->getPage($content);
}

} // end class

