<?php
function isban($uid){
	$users = get('modules/base/bans.json');
	if(!isset($users[$uid])){
		return false;
	}
	return true;
}
function ban_users(){
	return get('modules/base/bans.json');
}
function ban_get($uid){
	$users = get('modules/base/bans.json');
	if(!isset($users[$uid])){
		return false;
	}
	return $users[$uid];
}
function ban($uid, $cause, $banned_by){
	$users = get('modules/base/bans.json');
	$users[$uid]=['cause'=>$cause, 'banned_by'=>$banned_by];
	file_put_contents('modules/base/bans.json', json_encode($users, JSON_UNESCAPED_UNICODE));
	file_put_contents('bans.log', "$uid:$cause:$banned_by"."\n" , FILE_APPEND);
}
function tempban($uid, $cause, $time, $banned_by){
	$users = get('modules/base/bans.json');
	$users[$uid]=['cause'=>$cause, 'time'=> time()+(3600*$time), 'banned_by'=> $banned_by];
	file_put_contents('modules/base/bans.json', json_encode($users, JSON_UNESCAPED_UNICODE));
	file_put_contents('bans.log', "$uid:$cause:$banned_by:$time"."\n" , FILE_APPEND);
}
function unban($uid, $unbanned_by){
	$users = get('modules/base/bans.json');
	unset($users[$uid]);
	file_put_contents('modules/base/bans.json', json_encode($users,JSON_UNESCAPED_UNICODE));
	file_put_contents('bans.log', $unbanned_by." разбанил $uid"."\n" , FILE_APPEND);
}
?>