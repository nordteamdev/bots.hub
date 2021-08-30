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
    



class MESSENGER extends _global_co {

public $userid = 0;
public $now;
public function __construct(){

//the old building from parent class
parent::__construct();
$this->userid = $this->USER['id'];
$this->now = time();

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
 ORDER BY sub.time asc
");

return $query;

}

// get conversation
public function getConversation($uid, $limit = false) {

$i = $this->userid;
$messages = array();
$query = $this->run_msg_query($uid);

// do not update messages as read (for shortcuts only)
$no_update = isset($_POST['no_update']) ? $_POST['no_update'] : false;
$no_update = $no_update == 'yes' ? true : false;

// set messages as read
if(!$no_update)
$set_read = $this->setMessageAsRead("update ".tbl_msg." set `read`='yes' where `fromUser` = '{$uid}' and `toUser`='{$i}' and `read`='no'",$i,0);
 
 
 
 
$blacklist = 0;
// check if the user is in blacklist
$q_blacklist = $this->db->query("select `id` from ".tbl_blacklist." where `employer` = '{$uid}' and `userid`='{$this->userid}' limit 1");
$r_blacklist = $q_blacklist->fetch_array(MYSQLI_ASSOC);

if($r_blacklist['id']){
	
$blacklist = 1;

}
 
 
	$curr_settings = array();
	$curr_settings = $this->getConversationSettings($uid);
	$nickname = '';
	$nick_userid = 0;
	if(count($curr_settings)){
		
			foreach($curr_settings as $settings):
					$nick_userid = $settings['userid'];
					$curr_settings = json_decode($settings['settings'],true);
			endforeach;
		
		if($nick_userid != $i)
			$nickname = empty(trim($curr_settings['nicknames']['my'])) ? '' : $curr_settings['nicknames']['my'];
		else
			$nickname = empty(trim($curr_settings['nicknames']['recipient'])) ? '' : $curr_settings['nicknames']['recipient'];
		
		
	}
 

  
foreach($query as $result){

$date = date('j',$result['time']);
$dateMonth = date('Y',$result['time']) == date('Y') ? ($date === date('j') ? $this->lang['today'] : ($date == date('j') -1 ? $this->lang['yesterday'] : date('j F', $result['time']))) : date('j F, Y', $result['time']);
$messages[] = array('id' => $result['id'],  'bg' => $result['bg'],'msg' => $this->str_smilies($this->str_messenger($result['msg']),false,$result['id'],false,true), 'fromUser' => $result['fromUser'],
		     'toUser' => $result['toUser'], 'time' => $this->pm_time($result['time']), 'lastby' => $result['lastby'], 'count' => $result['c'] > $this->settings['PM_MESSAGES_LIMIT'] ? 1 : '',
		     'read' => $result['read'], 'uonline' => $this->getUserStatus($uid), 'date' => $date, 'currDate' => date('j'), 'dateMonth' => $dateMonth);

}
echo count($query) > 0 ? json_encode(["messages" => $messages, "blacklist" => $blacklist, "count_messages" => count($messages), "nickname" => $nickname, "count" => 1, "allowsendpm" => $this->allowSendPm($uid)]) : json_encode([ "blacklist" => $blacklist, "nickname" => $nickname, "messages" => array(), "count_messages" => 0, "count" => 0, "allowsendpm" => $this->allowSendPm($uid), 'exp' => $this->lang['pm_no_msg'], 'sub' => $this->lang['pm_first_move'] ]);

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
echo json_encode( [ 'response' => 'success', 'text' => $this->str_smilies($this->str_messenger($text),false,false,false,true), 'msgid' => $msg_id, 'recipient' => $rcpid ] );
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

public function getAttachments($uid){
	$i = $this->USER['id'];
	$response = array("success" => 0, "info" => "no");
	
	if($uid > 0){
		
		
		
		$query = $this->query_select("select * from ".tbl_attach." where (`userid`='{$i}' && `sended_to`='{$uid}') || (`userid`='{$uid}' && `sended_to`='{$i}')
										order by added desc");
										
										
		if(count($query)){
			
			
			foreach($query as $res):
			
				$response['files'][] = array('id' => $res['id'], 'url' => $this->settings['HOST'].'/'.__AT_DIR.'/'.$res['filename']);
			
			endforeach;
			
			$response['info'] = 'yes';
			
			
		}
		
		
		$response['success'] = 1;
		
		
		
	}
	
	echo json_encode($response);
}

public function getChatCurrentColor($uid){
	
	$i = $this->USER['id'];
	$q = $this->db->query("select `settings` from ".tbl_messenger_settings." where (`userid`='{$i}' && `recipient`='{$uid}') || (`userid`='{$uid}' && `recipient`='{$i}') limit 1");
	$r = $q->fetch_array(MYSQLI_ASSOC);
	$color = $this->settings['MESSENGER_DEFAULT_COLOR']; 
	if(isset($r['settings'])){
		
		$settings = json_decode($r['settings'],true);
		
		$color = $settings['color'];
		
	}
	
	
	
	return $color;
	
}

public function getConversationSettings($uid,$count = false){
	
	$i = $this->USER['id'];
	$settings = $this->query_select("select `settings`,`userid` from ".tbl_messenger_settings." where (`userid`='{$i}' && `recipient`='{$uid}') || (`userid`='{$uid}' && `recipient`='{$i}') limit 1");
	
	if($count){
		
		return count($settings);
		exit;
	}
	
	if(count($settings)){
		
		return $settings;
	} else {
		
		return array("0" => array("userid" => 0, "settings" => json_encode($this->defaultConversationSettings())));
	}
}
public function saveMessengerSettings($settings,$recipient_id){
	
	$settings = json_encode($settings);
	$i = $this->USER['id'];
	$text = $this->USER['name'];
	return $this->query_update("update ".tbl_messenger_settings." set `added`='{$this->now}',`userid`='{$i}',`recipient`='{$recipient_id}',`settings`='{$settings}',`text`='{$text}' where (userid='{$i}' and `recipient`='{$recipient_id}' || userid='{$recipient_id}' and `recipient`='{$i}')");
	
}
public function addMessengerSettings($settings,$recipient_id){
	
	$settings = json_encode($settings);
	$i = $this->USER['id'];
	$text = $this->USER['name'];
	return $this->query_insert("insert into ".tbl_messenger_settings." set `added`='{$this->now}',`userid`='{$i}',`recipient`='{$recipient_id}',`settings`='{$settings}',`text`='{$text}'");
		
	
}
public function defaultConversationSettings(){
						$default_settings = array();
						$default_settings['color'] = $this->settings['MESSENGER_DEFAULT_COLOR']; 
						$default_settings['nicknames']['recipient'] = '';
						$default_settings['nicknames']['my'] = '';
					
						return $default_settings;
}
public function updateMessengerSettings($recipient_id,$updated_settings){
	

	$response = 0;
	// get settings
	$curr_settings = $this->getConversationSettings($recipient_id,1);
 

				// if settings exists, just update
				if($curr_settings){
 
					
					if($this->saveMessengerSettings($updated_settings,$recipient_id))
						$response = 1;
					
					
					
				} else {
 
					if($this->addMessengerSettings($updated_settings,$recipient_id))
						$response = 1;
					
					
				}
				
				
				
	
	return $response;
}
// set color
public function setColor($uid){
	
	$color = isset($_POST['color']) ? $this->test_input($_POST['color']) : '';	
	$i = $this->USER['id'];
	$r = 0;
	
		if($uid > 0 && $i > 0){
				// get settings
				$curr_settings = array();
				$curr_settings = $this->getConversationSettings($uid);
		
		
				// if settings exists, just update
				if(count($curr_settings)){
 
					foreach($curr_settings as $settings):
					$curr_settings = json_decode($settings['settings'],true);
					endforeach;
					

				} 
	
	
		$curr_settings['color'] = $color;
		$r = $this->updateMessengerSettings($uid,$curr_settings);
 
		}
		
		
	return $r;
}


// get users
public function openBox(){
$i = $this->userid; 
$query = $this->getDialogQuery();

$this->template->assign(['this' => $this, 'query' => $query, 'i' => $i, 'sct' => '1']);
$content = $this->template->fetch($this->theme_dir."/messenger/messenger-box.html");

echo $this->getPage($content);
}
public function getUnreadMessagesCount($fromuser){
 
$q = $this->db->query("select COUNT(*) from ".tbl_msg." where `toUser`='{$this->userid}' and `fromUser`='{$fromuser}' and `read`='no'");
$q = $q->fetch_row();
$c = $q[0];
return $c;
	
}
public function constructPage(){
	
	
$contacts = $this->getDialogQuery();
$this->template->assign(['this' => $this, 'contacts' => $contacts ]);
$content = $this->template->fetch($this->theme_dir."/messenger/messenger.html");
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
	$socketio_data = array("event" => "messages_notif", "userid" => $toUser);
	$this->emit_notification_to_socketio($socketio_data);
	
	
	
echo $this->sendResponse(['response' => 'success', 'curr_date' => date('j'), 'bg' => $bg, 'min_text' => $this->str_smilies($this->str_messenger($msg,1),1), 'text' => $this->str_smilies($this->str_messenger($msg),false,$insert,false,true),'shared' => $shared, 'timestamp' => $now, 'time' => $this->pm_time($now), 'msgid' => $insert, 'recipient' => $toUser]);

} else {

echo $this->sendResponse(['response' => $this->lang['pm_not_delivered']]);

}

}
public function updateMessageAsSeen($id){
	
	// set messages as read
	$set_read = $this->setMessageAsRead("update ".tbl_msg." set `read`='yes' where `id`='{$id}' limit 1",$this->userid,1);
}
public function updateAllMessagesAsRead($fromUser){
	
	// set messages as read
	$set_read = $this->setMessageAsRead("update ".tbl_msg." set `read`='yes' where `read`='no' and `toUser`='{$this->userid}' and `fromUser`='{$fromUser}'",$this->userid,1);
}
public function nodeLastMessage($userid){
	$i = $this->USER['id'];
	$q = $this->query_select("Select * from ".tbl_msg." where fromUser='{$userid}' and `toUser`='{$i}' and `read`='no' order by id desc limit 1");
 
 $message = array();
	if(count($q)){
		
		foreach($q as $r):
			$msg_id = $r['id'];
 
			// set messages as read
			$set_read = $this->setMessageAsRead("update ".tbl_msg." set `read`='yes' where `id`='{$msg_id}' limit 1",$i,1);
 
			$message = array('bg' => $r['bg'], 
			'min_text' => $this->str_smilies($this->str_messenger($r['msg'],1),1), 
			'text' => $this->str_smilies($this->str_messenger($r['msg'])),
			'shared' => $r['shared'],  
			'time' => $this->pm_time($r['time']), 
			'msgid' => $msg_id, 
			'fromUser' => $r['fromUser'],
			'toUser' => $r['toUser']);
		
		endforeach;
		
		
	}
	
	echo count($q) > 0 ? json_encode(["message" => $message, "count" => 1, "allowsendpm" => $this->allowSendPm($userid)]) : json_encode(["message" => $message, "count" => 0, "allowsendpm" => $this->allowSendPm($userid), 'exp' => $this->lang['pm_no_msg'], 'sub' => $this->lang['pm_first_move'] ]);

	
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
$uptd = $this->query_update("update ".tbl_msg." set `deleteby`='{$i}' where `toUser`='{$i}' and `fromUser`='{$id}' and `deleteby` = '' OR `toUser`='{$id}' and `fromUser`='{$i}' and `deleteby` = ''");


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
	 where 
	 
 
	 u.id NOT IN (SELECT `userid` from ".tbl_blacklist." where `employer`='{$i}')
 
	 &&
	 f.userid='{$i}' and u.id = f.friendid and f.status='confirmed' and (u.name LIKE N'%{$key}%' OR u.surname LIKE N'%{$key}%' OR u.fullname LIKE N'%{$key}%') group by u.id order by u.online desc";

$query = $this->query_select($sql);

foreach($query as $res)
$rsp[] = array('id' => $res['id'], 'name' => $res['fullname'], 'photo' => $res['photo'], 'online' => $this->getUserStatus($res['id']));

echo json_encode($rsp);
}

// get more conversations
public function getMoreContacts($page){

$i = $this->userid;
$query = $this->getDialogQuery($page);



$this->template->assign(['this' => $this, 'contacts' => $query, 'i' => $i,'nullreturn' => 1, 'sct' => false]);
$content = $this->template->fetch($this->theme_dir."/messenger/contact-markup.html");

echo $this->getPage($content);

}

// get previous messages
public function getPrevMessages($uid,$page) {

$i = $this->userid;
$messages = array();
$query = $this->run_msg_query($uid,$page);

foreach($query as $result){

$date = date('Y-m-d',$result['time']);
$dateMonth = date('Y',$result['time']) == date('Y') ? ($date === date('Y-m-d') ? $this->lang['today'] : ($date == date('Y-m-d') -1 ? $this->lang['yesterday'] : date('j F', $result['time']))) : date('j F, Y', $result['time']);
$messages[] = array('id' => $result['id'], 'msg' => $this->str_smilies($this->str_messenger($result['msg']),false,$result['id'],false,true), 'fromUser' => $result['fromUser'],
		     'toUser' => $result['toUser'], 'time' => $this->pm_time($result['time']), 'lastby' => $result['lastby'], 'exp' => '0', 'count' => $result['c'] > $this->settings['PM_MESSAGES_LIMIT'] ? true : false,
		     'read' => $result['read'], 'uonline' => $this->getUserStatus($uid), 'date' => $date, 'currDate' => date('j'), 'dateMonth' => $dateMonth);

}
echo count($query) > 0 ? json_encode($messages) : json_encode(['exp' => '1']);

}
public function setMessageAsRead($sql,$userid,$no_check = false){
	
	if($no_check)	
	    $socketio_data = array("event" => "messages_notif", "userid" => $userid, "aditional_data" => array("no_check" => true));
	else
		$socketio_data = array("event" => "messages_notif", "userid" => $userid);
	
	$update = $this->query_update($sql);
	if($update)
	$this->emit_notification_to_socketio($socketio_data);
	
	
	
	
}

public function getNicknames($uid) {
	
	
	
	$i = $this->USER['id'];

	// get settings
	$curr_settings = array();
	$curr_settings = $this->getConversationSettings($uid);
	
	$response = array("success" => 1, "count" => 0, "my" => "", "recipient" => "");
	/*					
	// select nicknames
	$q = $this->query_select("SELECT * FROM (
												(SELECT nr.*, 'my' as who FROM ".tbl_messenger_nicknames." nr where nr.userid = '{$uid}' and nr.recipientid='{$i}') 
										UNION ALL
												(SELECT nm.*, 'recipient' as who FROM ".tbl_messenger_nicknames." nm where nm.userid = '{$i}' and nm.recipientid='{$uid}') 
											) res
												order by res.added desc limit 2");
												*/
	$nick_userid = 0;
	$nickname_exists = 0;
	// if settings exists, just update
	if( count($curr_settings) ){
		
 
			foreach($curr_settings as $settings):
				$nick_userid = $settings['userid'];
				$curr_settings = json_decode($settings['settings'],true);
				
				if(  (!empty($curr_settings['nicknames']['my']) && trim($curr_settings['nicknames']['my']) ) || (!empty($curr_settings['nicknames']['recipient']) && trim($curr_settings['nicknames']['recipient'])) )
					$nickname_exists = 1;
				
			endforeach;
			
			
			
			
		if($nick_userid != $i)
			$response = array("success" => 1, "recipient" => $curr_settings['nicknames']['my'], "my" => $curr_settings['nicknames']['recipient']);
		else
			$response = array("success" => 1, "my" => $curr_settings['nicknames']['my'], "recipient" => $curr_settings['nicknames']['recipient']);
			
			
			
		if($nickname_exists)
			$response['count'] = 1;
		else
			$response['count'] = 0;
			
			
	} 
	
	
	
	

	
	/*
	if(count($q)){
		
		foreach($q as $row):
		$response['count'] = 1;
		
		if($row['who'] == 'recipient')
			$response['recipient'] = $row;//isset($q['0']) ? $q[0] : new stdClass();
		else
			$response['my'] = $row;//isset($q['1']) ? $q[1] : new stdClass();
		endforeach;
 
		
		//$response['recipient'] = isset($q['0']) ? $q[0] : new stdClass();
		//$response['my'] = isset($q['1']) ? $q[1] : new stdClass();
 
 
	}
	*/
	
	
	echo json_encode($response);
	
	
	
}
 
public function setNickname($uid){
	$i = $this->USER['id'];
	$recipient_nickname = isset($_POST['nickname_recipient']) ? $this->test_input($_POST['nickname_recipient']) : '';
	$my_nickname = isset($_POST['my_nickname']) ? $this->test_input($_POST['my_nickname']) : '';
	$my_name = $this->USER['name'];
	$r = 0;
	$exist_id = 0;
 
	if($uid){
		$r = 1;

				
				// get settings
				$curr_settings = array();
				$curr_settings = $this->getConversationSettings($uid);
		
		
				// if settings exists, just update
				if(count($curr_settings)){
 
					foreach($curr_settings as $settings):
					$curr_settings = json_decode($settings['settings'],true);
					endforeach;
					

				} 
		
 
		
		if( empty($recipient_nickname) ){

			// delete nickname from db
			$curr_settings['nicknames']['recipient'] = "";
 
			$value = array("recipient" => "");
			$delete = $this->updateMessengerSettings($uid,$curr_settings);
		}
		
		if( empty($my_nickname) ){


			$curr_settings['nicknames']['my'] = "";
 
			$value = array("my" => "");
			$delete = $this->updateMessengerSettings($uid,$curr_settings);
			
		} 
		
		if( (trim($recipient_nickname) && strlen($recipient_nickname) < 2) || (trim($my_nickname) && strlen($my_nickname) < 2) ){
			
			$r = $this->lang['Messenger_nickname_too_short'];
			
			
		}else if ( (trim($recipient_nickname) && strlen($recipient_nickname) > 25) || (trim($my_nickname) && strlen($my_nickname) > 25) ) {
			$r = $this->lang['Messenger_nickname_too_long'];
		} else {
			
			if($recipient_nickname){

			$curr_settings['nicknames']['recipient'] = $recipient_nickname;

			$value = array("recipient" => $recipient_nickname);
			$update = $this->updateMessengerSettings($uid,$curr_settings);
			
			}
			if($my_nickname){
				
					$curr_settings['nicknames']['my'] = $my_nickname;
					
					$value = array("my" => $my_nickname);
					$update = $this->updateMessengerSettings($uid,$curr_settings);

				
				
			}
			 $r = 1;
			
		}
		
		
		
		
	}  
		
		
	
	echo $r;
}
public function search_in_conversation($uid){
	
	$key = isset($_POST['key']) ? $this->test_input(urldecode($_POST['key'])) : '';
	$i = $this->USER['id'];
	$response = array("count" => 0,"messages" => array());
	$query = $this->query_select("select * from ".tbl_msg." where `msg` LIKE N'%{$key}%' and `deleteby` != '{$i}' and (`fromUser`='{$i}' and `toUser`='{$uid}' or `fromUser`='{$uid}' and `toUser`='{$i}') group by id order by time asc");
	
	
	if(count($query)){
		 
		foreach($query as $res):
		$date = date('j',$res['time']);
		$dateMonth = date('Y',$res['time']) == date('Y') ? ($date === date('j') ? $this->lang['today'] : ($date == date('j') -1 ? $this->lang['yesterday'] : date('j F', $res['time']))) : date('j F, Y', $res['time']);
		$response['count'] = count($query);
		$response['messages'][] = array('id' => $res['id'],'date' => $date, 'currDate' => date('j'), 'dateMonth' => $dateMonth, "lastby" => $res['lastby'], "fromUser" =>  $res['fromUser'], "time" => $this->pm_time($res['time']), "msg" => $this->str_smilies($this->str_messenger($res['msg']),false,false,false,false,true));
		$response['fromUser'] = $res['fromUser'];
		endforeach;
		
		
	}
	
	echo json_encode($response);
	
}
public function onlineTab(){
	
	
echo $this->getOnlineFr();
	
	
}
public function uploadscreen(){
	
	
	if(!$this->settings['AMAZON_S3_ENABLED']) $this->uploadScreenToFtp(); else $this->uploadScreenToFtp(true);
	
	
	
	
}
public function uploadScreenToFtp($aws = false){
	
	
	$data = isset($_POST['data']) ? urldecode($_POST['data']) : '';
 
	
	$res = array("success" => 0);
 
	
   
    $max_file_size = 1048576 * $this->settings['MAX_FILE_UPLOAD'];
    $dir = __ROOT__.$this->settings['AT_OUTPUT_DIR'].$this->USER['id'].'/';



    // generate dir by user id
    if (!file_exists($dir))
    mkdir($dir, 0777, true);






	
	// remove "data:image/png;base64,"
	$uri =  substr($data, strpos($data, ",")+1); 	
	$data = base64_decode($uri);
	$imgRes = imagecreatefromstring($data);

	$filename = md5(uniqid()).'.png';
	$file_dir =  $dir.$filename;
 

	// success added large image
	if( imagepng($imgRes,$file_dir)) { 
	
	
	$image_url_done = $this->settings['HOST'].'/'.$this->settings['AT_OUTPUT_DIR'].'/'.$this->USER['id'].'/'.$filename;
	
	
	
	
	
	$fileSize = filesize($file_dir);
 
	$CreatedImage = imagecreatefrompng($file_dir);
 
	list($CurWidth,$CurHeight)=getimagesize($file_dir);

	$time = time();
	
		    $toUser = isset($_POST['to']) && (int)$_POST['to'] > 0 ? $this->test_input($_POST['to']) : '0';
			$userid = $this->USER['id'];
 
	 
	 
	 if($aws){
	 
	/* create folders */
	$buckets = $this->settings['AMAZON_S3_ATTACHMENTS_BUCKET'];
	
	if( !  in_array(AWS_S3_BUCKET_NAME, $this->s3->listBuckets()) ) {
	
			//create a new bucket
			$this->s3->putBucket(AWS_S3_BUCKET_NAME, S3::ACL_PUBLIC_READ, AWS_S3_BUCKET_LOCATION);
	
	}
	
	 
	 
	 
	 
			$pathtos3 = 'attachments/'.$this->USER['id'].'/';  // path on s3 bucket.
			$htps = HTTPS_ON ? 'https://' : 'http://';
			$image_url_done = $htps.AWS_S3_BUCKET_NAME.'.s3.amazonaws.com/attachments/'.$this->USER['id'].'/'.$filename;

	 	                 // No error found! Move uploaded files 
                 foreach($buckets as $bucket):
		 
					if($this->s3->putObjectFile($file_dir, AWS_S3_BUCKET_NAME, $pathtos3.$filename, S3::ACL_PUBLIC_READ)){
						
						
		    $photoId = $this->query_insert("insert into ".tbl_attach." set `s3`='yes',`userid`='{$this->userid}',`filename` = '{$filename}', `added`='{$time}', `file_size`='{$fileSize}', `sended_to`='{$toUser}'");
			unlink($file_dir);
			if (!$photoId) {
				
				$res['success'] = 0;
			} else {
				$res['id'] = $photoId;
				$res['success'] = 1;
				$res['image_url'] = $image_url_done;
			}

					}
	 
	 	endforeach;
		
	 	} else {
					

	
 
		

		    $photoId = $this->query_insert("insert into ".tbl_attach." set `userid`='{$this->userid}',`filename` = '{$filename}', `added`='{$time}', `file_size`='{$fileSize}', `sended_to`='{$toUser}'");

			if (!$photoId) {
				unlink($file_dir);
				$res['success'] = 0;
			} else {
				$res['id'] = $photoId;
				$res['success'] = 1;
				$res['image_url'] = $image_url_done;
			}
	
 
 
		}
 
}

// return data
echo json_encode($res);
	
	
	
	
	
	
}

public function sendVoiceClip(){
	
 
	
	$data = isset($_POST['clip']) ? $_POST['clip'] : '';
	$extension = isset($_POST['extension']) ? $_POST['extension'] : '';
	$room_id = isset($_POST['room_id']) ? $_POST['room_id'] : '';
	$recipient_id  = isset($_POST['recipient_id']) ? (int) $this->test_input($_POST['recipient_id']) : '';
 
	
	$dir = __ROOT__.__MESSENGER_VOICE_CLIPS.$room_id.'/';

	
	$r = array("success" => 0);
	
	
    // generate dir  
    if (!file_exists($dir))
		mkdir($dir, 0777, true);

	if(isset($_FILES['clip']) and !$_FILES['clip']['error']){
		
	$filename = basename(mt_rand().mt_rand().mt_rand() . '.' . $extension);

    if(move_uploaded_file($_FILES['clip']['tmp_name'], $dir . $filename)) {
		$text = "[voice-clip]".__MESSENGER_VOICE_CLIPS.$room_id."/".$filename."[/voice-clip]";

		$r = array("success" => 1, "text" => $text);
	}
	
	} 
	
	
 
	echo json_encode($r);
}


public function open_messages_window_by_link(){
	$content = '<a id="refresh-url" href="'.$_SERVER["REQUEST_URI"].'" onclick="return privateMessages(event,this);"></a>';
	echo $this->getPage($content);
}
public function callingPopups($uid){
$i = $this->userid; 
$uid = $uid;
$close = 'no';
$action = isset($_GET['action']) ? $this->test_input($_GET['action']) : ''; 
$type = isset($_GET['type']) ? $this->test_input($_GET['type']) : ''; 
$call_type = $type;

switch($type){
	
	case 'video':
	$type = array("video"=>true,"audio"=>true); 
	break;
	
	default:
	case 'audio':
	$type = array("video"=>false,"audio"=>true); 
	break;
 
}


switch($action){
	
	case 'answer':
	$popup = "call-answer.html";
	break;
	
	default:
	case 'call':
	$popup = "call-init.html";
	break;
	
}


if(!$uid || !$i || !$popup || !carray($type))
	$close = 'yes';


$this->template->assign(['this' => $this, 'call_type' => $call_type, 'close' => $close, 'type' => json_encode($type), 'user' => $this->getUserDetails($uid)]);
$this->template->display($this->theme_dir."/messenger/".$popup);
	
}
 
public function getShortcutsSessionUserInfo(){
	 
	$chat_s = isset($_POST['chat_list']) ? $this->test_input($_POST['chat_list']) : '';
	

	
	$rsp = array();
	if($chat_s) {
		
		$is_arr = strpos($chat_s, ',') !== false ? true : false;
		
		if($is_arr){
			
			$chat_s = explode(',',$chat_s);
			
			foreach($chat_s as $chat):
			
			$ch_uid = str_replace('mshortcut-','',$chat);
			
			$q = $this->query_select("select `id`,`fullname`,`profile_photo` as photo from ".tbl_users." where `id`='{$ch_uid}' limit 1");
			foreach($q as $r):
			$rsp[] = array('id' => $r['id'], 'fullname' => $r['fullname'], 'photo' => $r['photo']);
			endforeach;
			
			
			endforeach;
			
		} else {
			$ch_uid = str_replace('mshortcut-','',$chat_s);
			$q = $this->query_select("select `id`,`fullname`,`profile_photo` as photo from ".tbl_users." where `id`='{$ch_uid}' limit 1");
			foreach($q as $r):
			$rsp[] = array('id' => $r['id'], 'fullname' => $r['fullname'], 'photo' => $r['photo']);
			endforeach;
			
		}
		
		
		
	}
	 echo json_encode($rsp);
 }
 private function cltype($type,$b = false){
	$str = $b ? $this->lang['Messenger_call_back'] : $this->lang['Messenger_call_again'];

	$call_back_audio = '<A href="javascript:void(0);" onclick="messenger.redialUser(this,event,\'audio\');">'.$str.'</a>';
	$call_back_video = '<A href="javascript:void(0);" onclick="messenger.redialUser(this,event,\'video\');">'.$str.'</a>';

	return $type == 'video' ?  $call_back_video : $call_back_audio;
 }
public function str_messenger($string,$min = false){
	
 
	$string =  preg_replace_callback("/\[missedcall\]((\s|.)+?)\[\/missedcall\]/i", function($k) use(&$min) { 
			 
	
			$d = explode('-',$k[1]);
			$caller = $d[0];
			$recipient = $d[1];
			$call_type = $d[2];
			$b = false;
			$msg = 'unknown message.';
			
			if($caller == $this->USER['id']){
				$u_details = $this->getUserDetails($recipient);
				$msg = $u_details['name'].' '.$this->lang['Messenger_missed_call_from_you'];
				
			} else {
				$b = 1;
				$u_details = $this->getUserDetails($caller);
				$msg = $min ? $this->lang['Messenger_you_have_missed_a_call_from'].' '.$u_details['name'] : '<span class="error">'.$this->lang['Messenger_you_have_missed_a_call_from'].' '.$u_details['name'].'</span>';
				
			}
			
			return $min ? $msg : '<div class="messenger_call_msg">'.$msg.'<div class="messenger_call_msg_footer">'.$this->cltype($call_type,$b).'</div></div>';
		}, $string);
	
	
	$string =  preg_replace_callback("/\[callended\]((\s|.)+?)\[\/callended\]/i", function($k) use(&$min) { 
			 
	
			$d = explode('-',$k[1]);
			$caller = $d[0];
			$recipient = $d[1];
			$call_type = $d[2];
			$call_duration = $d[3];
			
			
			$msg = 'unknown message.';
			
			if($caller == $this->USER['id']){
				$u_details = $this->getUserDetails($recipient);
				$msg = 'You called '.$u_details['name'];//.$this->lang['Messenger_missed_call_from_you'];
				
			} else {
				$u_details = $this->getUserDetails($caller);
				$msg = $u_details['name'].' called you.';//'<span class="error">'.$this->lang['Messenger_you_have_missed_a_call_from'].' '.$u_details['name'].'</span>';
				 
			}
 
			return $min ? $msg : '<div class="messenger_call_msg">'.$msg.'<div class="messenger_call_msg_time">'.$call_duration.'</div><div class="messenger_call_msg_footer">'.$this->cltype($call_type).'</div></div>';
		}, $string);
	
	
	
	
	return $string;
	
}

} // end class

