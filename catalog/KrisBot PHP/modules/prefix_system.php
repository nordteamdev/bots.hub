<?php
function checkPrefix($string, $uid){
	if(donate::get($uid)!='dev' and donate::get($uid)!='tester'){
		if(r('/разработчик|разраб|Одмен|Админ|Вип|Хелпер|Dev|модер|крис|создатель|основатель|Rome|Роме|Тестер/iu', $string)){
			return "[Запрещенный ник]";
		}else{
			if(Clans::check($uid)){return '['.Clans::check($uid)['name'].'] '.$string;}
			return $string;
		}
	}else{
		if(Clans::check($uid)){return '['.Clans::check($uid)['name'].'] '.$string;}
		return $string;
	}
}
function getPrefix($msg){
	$users = get('modules/base/prefixes.json');
	$status = donate::get($msg->from_id);
	if($status == 'User'){$status="";}elseif($status=='dev'){$status="♦DEVELOPER♦ ";}elseif($status=='tester'){$status="&#128314;Тестер&#128314; ";}else{$status="[".mb_strtoupper($status[0])."] ";}
	if($msg->from_id==206608447){
		$status="&#9830;Создатель&#9830; ";
	}
	if(!isset($users[$msg->from_id])){
		return checkPrefix($status.$msg->user_info['first_name'], $msg->from_id);
	}
	return checkPrefix($status.$users[$msg->from_id], $msg->from_id);
}
function getPrefixfromID($uid){
	$users = get('modules/base/prefixes.json');
	if(!isset($users[$uid])){
		return checkPrefix($msg->user_info['first_name'], $uid);
	}
	return checkPrefix($users[$uid]);
}
function setPrefix($uid, $prefix){
	$users = get('modules/base/prefixes.json');
	$users[$uid]=checkLink($prefix);
	file_put_contents('modules/base/prefixes.json', json_encode($users));
}
?>