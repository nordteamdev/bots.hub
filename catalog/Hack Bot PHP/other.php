<?php
function Distrib(){
	global $body,$bodyxl,$data,$mysqli;
	$text = substr($body,strlen($bodyxl[0]));
	$attachments = $data->object->attachments[0];
	$type = $attachments->type;
	$id = $attachments->$type->id;
	$from_id = $attachments->$type->from_id;
	$attachment = $type.$from_id.'_'.$id;
	$attachment = $attachment == '_' ? null : $attachment;
	$mysqli->query('INSERT INTO `distrib` 
		(`text`,`attachment`) VALUES 
		("'.$text.'","'.$attachment.'")');
	if(!empty($text) || !empty($attachment)){
		$message = 'Рассылка скоро начнется.';
	}else{
		$message = 'Рассылка не может быть пустой.';
	}
	return $message;
}
function ShortLink($link){
	global $token;
	$short = api('utils.getShortLink?url='.urlencode($link).'&private=0&v=5.101&access_token='.$token)['short_url'];
	return $short;
}
function GetStatistic(){
	global $mysqli;
	$dRole = 2;
	$data = $mysqli->query('SELECT * FROM `users`');
	$servers = $mysqli->query('SELECT * FROM `users` WHERE `server`>0 && `role`<=2')->num_rows;
	$anonymous = $mysqli->query('SELECT * FROM `anonymous`')->num_rows;
	$codes = $mysqli->query("SELECT SUM(`count`) FROM `codes`")->fetch_assoc()['SUM(`count`)'];
	$dirGame = 'games/knb/knbProcess.json';
	$GameKnb = json_decode(file_get_contents($dirGame),1);
	$CountRatesGameKnb = count($GameKnb);
	$GetLastConference = GetLastConference();
	$Online = $mysqli->query('SELECT * FROM `users` WHERE `online_time`>='.(time()-30))->num_rows;

	$dollar = $mysqli->query("SELECT SUM(`dollar`) FROM `users` WHERE `users`.`role`<='$dRole'")->fetch_assoc()['SUM(`dollar`)'];
	$btc = $mysqli->query("SELECT SUM(`btc`) FROM `users` WHERE `users`.`role`<='$dRole'")->fetch_assoc()['SUM(`btc`)'];
	$rating = $mysqli->query("SELECT SUM(`rating`) FROM `users` WHERE `users`.`role`<='$dRole'")->fetch_assoc()['SUM(`rating`)'];
	$donate_balance = $mysqli->query("SELECT SUM(`donate_balance`) FROM `users` WHERE `users`.`role`<='$dRole'")->fetch_assoc()['SUM(`donate_balance`)'];
	$players = $data->num_rows;
	$day_go = $mysqli->query('SELECT * FROM `users` WHERE `date_reg` LIKE '."'".date('d.m.Y')."%'")->num_rows;
	$data_active = $mysqli->query('SELECT * FROM `users` WHERE `active` LIKE '."'".date('d.m.Y')."%'")->num_rows;

	return 
	'⚙ Статистика @hack_bots(Hack Bot)<br>Игроков: '.ConvertValute($players).'<br>'.
	'💰 Сумма долларов: '.ConvertValute($dollar).SwitchEmoji('dollar').'<br>'.
	SwitchEmoji('rating'). 'Сумма рейтинга: '.ConvertValute($rating).'<br>'.
	'⚙ Сумма кодов: '.ConvertValute($codes).'<br>'.
	SwitchEmoji('btc'). 'Сумма биткоинов: '.ConvertValute($btc).'<br>'.
	SwitchEmoji('donate_balance'). 'Сумма матриц: '.ConvertValute($donate_balance).'<br>'.
	'👥 Сумма anonym: '.ConvertValute($anonymous).'<br>'.
	'🗄 Серверов всего : ' .ConvertValute($servers).'<br>'.
	'🔌 Пинг ~ '.ping("www.vk.com", 80, 10)."<br>".
	'😺 В группе: '.ConvertValute(CountMembersGroup()).'<br>'.
	'✊ Сумма текущих ставок кнб: '.ConvertValute($CountRatesGameKnb).'<br>'.
	'🆔 Бесед: '.($GetLastConference-2000000000).'<br>'.
	SwitchEmoji('day_go').'Пришло: '.ConvertValute($day_go).'<br>'.
	SwitchEmoji('active').'Актив: '.ConvertValute($data_active).'<br>'.
	'🌎 Онлайн: '.ConvertValute($Online).'<br>';
}
function SwitchRole($role){
	switch ($role) {
		case '1':
			$role = 'Player';
			break;
		case '2':
			$role = 'Vip';
			break;
		case '3':
			$role = 'Admin';
			break;
		case '4':
			$role = 'Helper';
			break;
		case '5':
			$role = 'Developer';
			break;
	
		
		default:
			return 'null';
			break;
	}
	return $role;
}
function AddGameLogs(){
	global $body,$message,$UserInfo;
	$date = date('d.m.YH:i::s');
	$UserInfo = selectFromIDVK($UserInfo['id_VK']);
	$uLogs = $UserInfo['game_logs'];
	$request = str_replace('<br>', '/end', substr($body, 0,70));
	$ansv = str_replace('<br>', '/end', substr($message, 0,200));
	if(iconv_strlen($uLogs) > KKK('10k')){
		$uLogs = '';
	}
	$uLogs .= $date.'--> '.$request.'/end';
	$uLogs .= $date.'<-- '.$ansv.'/end';
	SetFieldF('game_logs',$uLogs);

}
function CreatePost($reward,$type_reward,$reward_id = false,$type_repost = false){
	global $mysqli;

	$type_reward = SwitchRusToEn($type_reward);
	$type_reward = empty($type_reward) ? SwitchEnToRus(SwitchRusToEn($type_reward)) : $type_reward;
	$type_repost = empty($type_repost) ? false : $type_repost;
	switch ($type_reward) {
		case 'dollar':
		case 'btc':
		case 'rating':
		case 'donate_balance':
			$reward = KKK($reward);
			$text_reward =  ConvertValute($reward).SwitchEmoji($type_reward); 
			break;
		case 'farm':
		case 'car':
		case 'house':
		case 'moto':
		case 'vert':
		case 'samolet':
		case 'telephone':
		case 'kvart':
		case 'buisness':
			$reward = KKK($reward);

			$type_reward_rus = SwitchEnToRus($type_reward);
			$X = $type_reward == 'farm' ? X($reward) : '';

			$name = $mysqli->query('SELECT * FROM `'.$type_reward.'` WHERE `id`='.$reward_id)->fetch_assoc()['name'];
			if(!$name){
				return false;
			}

			$text_reward = ($type_reward_rus).' "'.$name.'" '.$X;
			break;

		default:
			return false;
			break;
	}
	$values = ['reward'=>$reward,'type_reward'=>$type_reward,'reward_id'=>$reward_id,'type_repost'=>$type_repost];

	$mainText = '
	*Ваш профиль должен быть открыт в настройках приватности [⚠].
	*Вы должны быть подписаны на нас [⚠].
	Или бот не увидит ваш репост и не выдаст награду [⚠]';

	$text = '[✅] Те кто сделают репост данной записи получат: 
	'.$text_reward.$mainText;

	if($type_repost == 'wait'){
		$text = '[✅] Тем кто продержат эту запись некоторое время, выдадим: '.$text_reward.$mainText;
	}
	return ['values'=>$values,'text'=>$text];

}

function Repost($user_id = false){
	global $mysqli,$data;
	$dir = 'data/repost/wall_info.json';
	$wall_info = json_decode(file_get_contents($dir),1);
	if(empty($user_id)){
		$userId =  $data->object->from_id;
		$post_id = $data->object->copy_history[0]->id;
	}else{
		$userId  = $user_id;
		$post_id = $wall_info['post_id'];
	}
	
	if($wall_info['type_repost'] == 'wait' && empty($user_id)){
		return;
	}
	if($wall_info['post_id'] == $post_id){
		$UserInfo = selectFromIDVK($userId);
		if($UserInfo['repost_id'] != $wall_info['post_id']){ // если предыдущий пост не равен текущему
			$reward = $wall_info['reward'];
			$type_reward = $wall_info['type_reward'];
			$reward_id = $wall_info['reward_id'];
			switch ($type_reward) {
				case 'dollar':
				case 'btc':
				case 'rating':
				case 'donate_balance':
					SetField($type_reward,$UserInfo[$type_reward]+$reward,$UserInfo['id_VK']);
					if($wall_info['type_repost'] == 'wait'){
						$text = '[✅] Спасибо что продержал тот репост.<br> Держи: '.ConvertValute($reward).SwitchEmoji($type_reward);
					}else{
						$text = '[✅] Спасибо за репост, держи: '.ConvertValute($reward).SwitchEmoji($type_reward);
					}
					
					break;
				case 'farm':
					require_once('modules/farm.php');
					AddFarm($reward_id,$wall_info['reward']);
					if($wall_info['type_repost'] == 'wait'){
						$text = '[✅] Спасибо что продержал тот репост.<br> Я уже выдал тебе твои фермы:';
					}else{
						$text = '[✅] Спасибо за репост, твои фермы уже у тебя в профиле.';
					}					
					break;
				case 'farm':
				case 'car':
				case 'house':
				case 'moto':
				case 'vert':
				case 'samolet':
				case 'telephone':
				case 'kvart':
					$name = $mysqli->query('SELECT * FROM `'.$type_reward.'` WHERE `id`='.$reward_id)->fetch_assoc()['name'];
					AddJsonValue($type_reward,'id',$reward_id,false,$UserInfo['id_VK']);
					AddJsonValue($type_reward,'name',$name,false,$UserInfo['id_VK']);
					$X = $type_reward == 'farm' ? X($reward) : '';
					$type_reward_rus = SwitchEnToRus($type_reward);
					$text_reward = ($type_reward_rus).' "'.$name.'" '.$X;
					if($wall_info['type_repost'] == 'wait'){
						$text = '[✅] Спасибо что продержал тот репост.<br> Выдано:'.$text_reward;
					}else{
						$text = '[✅] За репост выдано: '.$text_reward;
					}
					
					break;
				case 'buisness':
					$uBuisness = json_decode($UserInfo['buisness'],1);
					$countuBuisness = count($uBuisness);
					if($countuBuisness<=1){
						$data = $mysqli->query('SELECT * FROM `'.$type_reward.'` WHERE `id`='.$reward_id)->fetch_assoc();
						$uBuisness[$countuBuisness]['id'] = $data['id'];
						$uBuisness[$countuBuisness]['income'] = $data['income'];
						$uBuisness[$countuBuisness]['price'] = $data['price'];
						$uBuisness[$countuBuisness]['name'] = $data['name'];
						$uBuisness[$countuBuisness]['price_worker'] = $data['price_worker'];
						$uBuisness[$countuBuisness]['workers'] = 0;
						$uBuisness[$countuBuisness]['max_workers'] = $data['max_workers'];
						$uBuisness[$countuBuisness]['lvl'] = 1;
						$uBuisness[$countuBuisness]['time'] = time();
						SetField('buisness',json_encode($uBuisness,JSON_UNESCAPED_UNICODE),$UserInfo['id_VK']);
						$type_reward_rus = SwitchEnToRus($type_reward);
						$text_reward = ($type_reward_rus).' "'.$data['name'].'"';
						if($wall_info['type_repost'] == 'wait'){
							$text = '[✅] Спасибо что продержал тот репост.<br> Выдано:'.$text_reward;
						}else{
							$text = '[✅] За репост выдано: '.$text_reward;
						}
					}else{
						$text = $UserInfo['name'].', [⁉]ошибка выдачи бизнеса, your buisness full.';
					}
					break;
				default:
					$text = false;
					break;
			}
			SetField('repost_id',$post_id,$UserInfo['id_VK']);
			if($text != false){
				SellMsg($userId,$text);
			}
		
		}
		
	
	}
}
function AddJsonValueBuisness($id,$type,$value,$typeOperation = false,$user_id = false){
	global $userId;
	$id-=1;
	$UserInfo = !empty($user_id) ? selectFromIDVK($user_id) : selectFromIDVK($userId);
	$Json = json_decode($UserInfo['buisness'],1);
	if($typeOperation == '+'){
		$Json[$id][$type] += $value;
	}elseif($typeOperation == '-'){
		$Json[$id][$type] -= $value;
	}elseif(empty($typeOperation)){
		$Json[$id][$type] = $value;
	}
	SetField('buisness',json_encode($Json,JSON_UNESCAPED_UNICODE),$UserInfo['id_VK']);
}
function CheckUserInBl(){
	global $userId;
	$dir = 'data/black_list/black_list.json';
	$Json = json_decode(file_get_contents($dir),1);
	if(!empty($Json[$userId])){
		return true;
	}
	return false;
}
function SetBan($text,$time,$user_id_banned,$user_id){
	Ban('game_ban',1,$user_id);
	Ban('game_ban_text',$text,$user_id);
	Ban('game_ban_time',$time,$user_id);
	Ban('game_ban_user',$user_id_banned,$user_id);
}
function GetMaxField($type,$limit){
	global $mysqli;
	$limit = empty($limit) ? 1 : $limit;
	$data = $mysqli->query('SELECT * FROM `users` WHERE `'.$type.'` >= '.$limit.' && `role`<3 ORDER BY `'.$type.'` DESC');
	while(($row = $data->fetch_assoc()) != false){
		$message .= LinkName($row).' ('.ConvertValute($row[$type]).')<br>';
	}
	return $message;
}
function ping($host, $port, $timeout = 1) {
  $ta = microtime(true);
  if($fp = fsockopen($host, $port, $errno, $errstr, $timeout)){
    $tb = microtime(true);
    fclose($fp);
    return round((($tb - $ta) * 1000), 0)." ms";
  } else { return "DOWN"; }
}
function Ban($type_ban,$value,$id=false){
	global $userId;
	$user_id = empty($id) ? $userId : $id;
	AddJsonValue('ban',$type_ban,$value,false,$id);
}
function CountMembersGroup(){
	global $token,$group_id;
	$request = api('groups.getMembers?group_id='.abs($group_id).'&count=1&v=5.92&access_token='.$token);
	return $request['count'];
}

function SellMsg($peer_id,$text,$attachment = false){
	global $token;
	$request_params = array(
		'attachment' => $attachment,
		'message' => $text,
		'peer_id' => $peer_id,
		'access_token' => $token,
		'v' => '5.80'
	);
$get_params = http_build_query($request_params);
$request = file_get_contents('https://api.vk.com/method/messages.send?' . $get_params);
return json_decode($request,1)['response'];
}


function GetLastConference(){
	$dir = 'data/conference/conference.json';
	$arr = json_decode(file_get_contents($dir),1);
	return max(array_keys($arr));
}
function FastUserId($mode = false){
	global $bodyxl;
	if($mode == 'role'){
		$user_id = empty(GetFwd('user_id')) ? GetId($bodyxl[2]) : GetFwd('user_id');
	}else{
		$user_id = empty(GetFwd('user_id')) ? GetId($bodyxl[1]) : GetFwd('user_id');
	}
	
	return $user_id;
}
function CheckFwd(){
	global $data;
	if(!empty($data->object->fwd_messages[0]->from_id)){
		return true;
	}
}
function GetRoleList($role){
	global $mysqli;
	$i = 1;
	$data = $mysqli->query('SELECT * FROM `users` WHERE `role`='.$role);
	if($data->num_rows == 0) return 'empty';
	while (($row = $data->fetch_assoc()) != false) {
		$message .= $i.'.[id'.$row['id_VK'].'|'.$row['name'].']<br>';
	}
	return $message;
}
function GetFwd($type){
	global $data;
	switch ($type) {
		case 'user_id':
			$res =  $data->object->fwd_messages[0]->from_id;
			break;
		case 'text':
			$res =  $data->object->fwd_messages[0]->text;
			break;
		
		default:
			# code...
			break;
	}
	return $res;
}
function GetBanTime($time){
	$check_time = (int)$time-time();
	
	$days = floor($check_time/86400);
	$hours = floor(($check_time%86400)/3600);
	$minutes = floor(($check_time%3600)/60);
	$seconds = $check_time%60;
	if($days>0 || $hours>0 || $minutes>0 || $seconds>0){
		return ' Дней:'.$days.' часов:'.$hours.' минут:'.$minutes.' секунд:'.$seconds;
	}else{
		if($time == 'unlim'){
			return '∞';
		}
		return 'ok';
	}
}
function UsersGet($userId,$type){
	global $token;
	$Users_get = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".$userId."&name_case=Nom&v=5.80&access_token=".$token),1);
	return $Users_get['response'][0][$type];	
}
function UsersGetLang($userId,$lang = false){
	global $token;
	$lang = empty($lang) ? 'en' : $lang;
	$Users_get = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".$userId."&lang=".$lang."&name_case=Nom&v=5.80&access_token=".$token),1);
	return $Users_get['response'][0];	
}
function GetBanTimes($str){
	$str = mb_strtolower($str,"UTF-8");
	$Count = $str*1;
	$sec = array('сек','секунд','sec');
	$min = array('мин','min','минута','минут');
	$hour = array('час','часов','часа');
	$day = array('дня','дней','день','day','d','д');
	$nedel = array('неделя','недель','недели','нед','ned');
	$moth = array('мес','месяц','месяцев');
	$year = array('год','лет','года');
	str_replace($sec,'',$str,$countsec);
	str_replace($min,'',$str,$countmin);
	str_replace($hour,'',$str,$counthour);
	str_replace($day,'',$str,$countday);
	str_replace($nedel,'',$str,$countnedel);
	str_replace($moth,'',$str,$countmoth);
	str_replace($year,'',$str,$countyear);
	if($countsec>0){
		return $Count;
	}
	if($countmin>0){
		return $Count*60;
	}
	if($counthour>0){
		return $Count*3600;
	}
	if($countday>0){
		return $Count*86400;
	}
	if($countnedel>0){
		return $Count*86400*7;
	}if($countmoth>0){
		return $Count*86400*30;
	}
	if($countyear>0){
		return $Count*86400*30*12;
	}else{
		return 24*60*60*3;
	}
}


function SearchNick($Nick){
	global $mysqli;
	$name = $mysqli->query("SELECT * FROM `users` WHERE `name` LIKE ".'"'.$Nick.'%"');
	$i = 1;
	if($name->num_rows == 0){
		return 'Игроков с таким ником не найдено.';
	}
	while(($row = $name->fetch_assoc()) != false){
		$str .= $i.'. [id'.$row['id_VK'].'|id'.$row['id_VK'].'] —— '.$row['name'].'<br>';
		$i++;
	}
	
	return $str;
}
function CheckConference(){
	global $peer_id;
	if(Last_name($peer_id) == ''){
		$dir = 'data/conference/conference.json';
		$json = json_decode(file_get_contents($dir),1);
		if(empty($json[$peer_id])){
			$json[$peer_id] = ['blocked'=>false];
			$json = json_encode($json,JSON_UNESCAPED_UNICODE);
			$d = file_put_contents($dir, $json);
		}
		
	}
}
function Kick($id){
	global $token,$peer_id,$admin,$group_id;
	if($id != $admin && $id != $group_id){
		$res = api('messages.removeChatUser?chat_id='.($peer_id - 2000000000).'&member_id='.$id.'&v=5.81&access_token='.$token);
		return $res;
	}
}
function EditConference($type,$value,$typeOperation = false){
	global $peer_id;
	$dir = 'data/conference/conference.json';
	$Json = json_decode(file_get_contents($dir),1);
	if($typeOperation == '+'){
		$Json[$peer_id][$type] += $value;
	}elseif($typeOperation == '-'){
		$Json[$peer_id][$type] -= $value;
	}elseif(empty($typeOperation)){
		$Json[$peer_id][$type] = $value;
	}
	
	file_put_contents($dir, json_encode($Json,JSON_UNESCAPED_UNICODE));
}
function ConferenceIsBlocked(){
	global $peer_id;
	$dir = 'data/conference/conference.json';
	$json = json_decode(file_get_contents($dir),1);
	return $json[$peer_id]['blocked'];
}
function LeaveBots(){
	global $token,$peer_id,$group_id;
	SellMsg($peer_id,'Ваша беседа заблокирована..');
	$dir = 'data/conference/conference.json';
	$json = json_decode(file_get_contents($dir),1);
	$json[$peer_id]['blocked'] = true;
	file_put_contents($dir, json_encode($json,JSON_UNESCAPED_UNICODE));

	$peer_idd = $peer_id - 2000000000;
	$res = api('messages.removeChatUser?chat_id='.$peer_idd.'&member_id='.$group_id.'&v=5.81&access_token='.$token);
	return $res;
}
?>
