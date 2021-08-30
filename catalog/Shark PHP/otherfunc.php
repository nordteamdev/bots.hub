<?php
//--------------------------------------------------DEVELOPER VK.COM/taipancool-------------------------------------------------------------//
function GetDublicates(){
	global $mysqli;
	$Users = $mysqli->query('SELECT * FROM `users`');
	while(($row = $Users->fetch_assoc()) != false){
		$data = $mysqli->query('SELECT * FROM `users` WHERE `id_VK`='.$row['id_VK'].';');
		if($data->num_rows>1){
			$str .= $row['id_VK'].'<br>';
		}
	}
	return $str;
}
function GetListRazdacha(){
	$file = file('files/razdacha.txt');
	if(empty($file)){
		return 'Список пустой';
	}
	for($i=0;$i<count($file);$i++){
		$User = selectFromIDVK(false,$file[$i]*1);
		$message .= ($i+1).'.'.'[id'.$User['id_VK'].'|'.$User['name'].']<br>';
		
	}
	return $message;
}
function LeaveBots(){
	global $token,$peer_id;
	$peer_id = $peer_id - 2000000000;
	api('messages.removeChatUser?chat_id='.$peer_id.'&member_id=-173508826&v=5.81&access_token='.$token);
}
function Razdacha($summ){
	$file = file('files/razdacha.txt');
	if(empty($file)){
		return 'Список пустой';
	}
	for($i=0;$i<count($file);$i++){
		$User = selectFromIDVK(false,$file[$i]*1);
		SetField('balance',$User['balance']+$summ,$User['id_VK']);
		$TextMsg = $User['name'].', зачислено: '.ConvertValute($summ).'$';
		SellMsg($User['id_VK'],$TextMsg);
		$message .= ($i+1).'.'.'[id'.$User['id_VK'].'|'.$User['name'].'] +'.ConvertValute($summ).'<br>';
	}
	return $message;
}
function kick($id){
	global $token,$peer_id;
	$peer_id = $peer_id - 2000000000;
	api('messages.removeChatUser?chat_id='.$peer_id.'&member_id='.$id.'&v=5.81&access_token='.$token);
}
function Leave($peer_id){
	global $token;
	$peer_id = $peer_id - 2000000000;
	api('messages.removeChatUser?chat_id='.$peer_id.'&member_id=-173508826&v=5.81&access_token='.$token);
}
function GetValuteList($count,$type){
	global $mysqli;
	$Users = $mysqli->query('SELECT * FROM `users`');
	$i = 1;
	while(($row = $Users->fetch_assoc()) != false){
		if($row[$type]>= $count && $row['role']<=2){
			$str .= $i.'. [id'.$row['id_VK'].'|'.$row['name'].'] — '.ConvertValute($row[$type]).'<br>';
			$i++;
		}
	}
	return $str;
}
function ClearAllLogs() {
    if (file_exists('logs/')) {
        foreach (glob('logs/*') as $file) {
            unlink($file);
        }
		return 'Ok!';
    }
}
function Refid(){
	global $mysqli;
	$data = $mysqli->query("SELECT * FROM `users`");
	$f = fopen('files/player_ids.txt','w+');
	$i = 0;
	while(($row = $data->fetch_assoc())!= false){
		if($row['id_VK']>0){
			$i+=1;
			fwrite($f,$row['id_VK'].PHP_EOL);
		}
	}
	fclose($f);
	return 'IDS: '.ConvertValute($i);
}
function SearchNick($Nick){
	global $mysqli;
	$name = $mysqli->query("SELECT * FROM `users`");
	$i = 1;
	while(($row = $name->fetch_assoc()) != false){
		str_replace($Nick,'',$row['name'],$count);
		str_replace(mb_strtolower($Nick,'UTF-8'),'',mb_strtolower($row['name'],'UTF-8'),$count1);
		if($count >= 1 || $count1 >= 1){
			$str .= $i.'. [id'.$row['id_VK'].'|id'.$row['id_VK'].'] —— '.$row['name'].'<br>';
			$i++;
		}
	}
	if(empty($str)){
		return 'Игроков с таким ником не найдено.';
	}
	return $str;
}
function AdminPanel(){
	global $Nick;
	global $UserInfo;
	$roulette_chance = CheckOnOff($UserInfo['roulette_chance']);	
	$automate_on = CheckOnOff($UserInfo['automate_on']);
	$stakan_on = CheckOnOff($UserInfo['stakan_on']);
	$bank_on = CheckOnOff($UserInfo['bank_on']);
	$prefix = CheckOnOff($UserInfo['prefix']);
	$invisible = CheckOnOff($UserInfo['invisible']);
	$str = 
	$Nick.', ваша админка:<br>'.
	'Шанс в казино: '.$UserInfo['chance_set'].'<br>'.
	'Выигрыш в рулетке: '.$roulette_chance.'<br>'.
	'Количество игр в fl: '.$UserInfo['fl_admin'].'<br>'.
	'Шанс х500 в автомате: '.$automate_on.'<br>'.
	'Выигрыш в напёрстке: '.$stakan_on.'<br>'.
	'Безлимит в банке: '.$bank_on.'<br>'.
	'Префикс роли: '.$prefix.'<br>'.
	'Скрыть профиль: '.$invisible.'<br>'.
	'
	💎(random)
	😎 - 777
	🌚 - 50
	🌝 - 0
	🙃 - 3600
	🎁 - 2';
	return $str;
}
function AdminRules(){
	return
	'
	1.1.Запрещено передавать валюту другим игрокам по своему желанию любыми способами.
	1.2.Запрещено крутить статистику игрокам.
	1.3.Запрещено банить игроков по собственной воле.
	1.4.Запрещено продавать валюту.
	1.5.Если вы админ это не значит что вы выше всех, все игроки и у всех есть право пожаловаться на вас.
	1.6.Срач между админами типа: *кто круче?* и подобное.
	При нарушении правил игрок лишается игровой роли, кроме правил: (/1.3/,/1.5/,/1.6/).
	Список будет пополняться.
	';
}
function Unbanall(){
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `users`");
	while(($row = $result_set->fetch_assoc()) !=false){
		Unban($row['id_VK']);
		
	}
	$f = fopen('files/banall.txt','w+');
	fclose($f);
	return ('Unbanned all');
}
function Banall(){
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `users`");
	while(($row = $result_set->fetch_assoc()) !=false){
		Ban($row['id_VK']);
	}
	return ('Banned all');
}
function Ban($idVK,$bantime,$text){
	SetField('banned',1,$idVK);
	SetField('bantime',time()+$bantime,$idVK);
	SetField('ban_text',$text,$idVK);
}
function Unban($idVK){
	SetField('banned',0,$idVK);
}
function GetBanTime($time){
	$check_time = $time-time();
	
	$days = floor($check_time/86400);
	$hours = floor(($check_time%86400)/3600);
	$minutes = floor(($check_time%3600)/60);
	$seconds = $check_time%60;
	if($days>0 || $hours>0 || $minutes>0 || $seconds>0){
		return ' Дней:'.$days.' часов:'.$hours.' минут:'.$minutes.' секунд:'.$seconds;
	}else{
		return 'ok';
	}
}
function GetBanTimes($str){
	$str = mb_strtolower($str,"UTF-8");
	$Count = $str*1;
	$sec = array('сек','секунд','sec');
	$min = array('мин','min','минута','минут');
	$hour = array('час','часов','часа');
	$day = array('дня','дней','день');
	$nedel = array('неделя','недель','недели');
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
		return 31536000;
	}
}
function GetListBanned($offset = false){
	global $mysqli;
	//if(!$offset){$offset = 0;}
	$j = 1;
	$i = 1;
	$result_set = $mysqli->query("SELECT * FROM `users`");
	while(($row = $result_set->fetch_assoc()) !=false){
		if($row['banned'] != 0 ){
			if($i >= $offset && $j<=10){
				$str .= $j.'. id'.$row['id'].'. [id'.$row['id_VK'].'|'.$row['name'].']<br>';
				$j++;
			}
			$i++;
			
		}
		
	}
	return $str;
}
function CheckOnOff($str){
	if($str ==1){
		return 'вкл';
	}else{
		return 'выкл';
	}
}
function Why(){
	global $token;
	global $Nick;
	global $peer_id;
	$request = file_get_contents('https://api.vk.com/method/messages.getConversationMembers?peer_id='.$peer_id.'&v=5.80&access_token='.$token);
	$json = json_decode($request,1);
	$count = $json['response']['count'];
	$id = $json['response']['items'][rand(0,$count-1)]['member_id'];
	$UsersGet = UsersGet($id);
	return $Nick.', я думаю, что это: [id'.$id.'|'.$UsersGet['first_name'].']';
}
function CloseKbd(){
	$kbd = [
			'one_time' => true,
			'buttons' => [
				]
			]; 
	return $kbd;
}
function GetName($link){
	global $mysqli;
	$userId = GetId($link);
	$Users = $mysqli->query("SELECT * FROM `users` ");
	$UserInfo = selectFromIDVK($Users,$userId);
	return $UserInfo['name'];
}
function sellog($text = false){
	global $userId;
	global $AdminId;
	SellMsgOtherGroup($AdminId[0],'[id'.$userId.'|'.$userId.']<br>'.$text);
}
function GetFieldInfo($link,$field){
	global $mysqli;
	$userId = GetId($link);
	$Users = $mysqli->query("SELECT * FROM `users` ");
	$UserInfo = selectFromIDVK($Users,$userId);
	return $UserInfo[$field];
}

function switchRole($role){
	switch($role){
		case 1:
		$Role = 'Игрок';
		break;
		case 2:
		$Role = 'VIP';
		break;
		case 3:
		$Role = 'Admin';
		break;
		case 4:
		$Role = 'Toster';
		break;
		case 5:
		$Role = 'Helper';
		break;
		case 6:
		$Role = 'Developer';
		break;
		
		
	}
	return $Role;
}
function Get($link){
	global $mysqli;
	global $UserInfo;
	global $AdminId;
	$userId = GetId($link);
	$UserInfoget = selectFromIDVK(false,$userId);
	$UserInfoMarry = selectFromIDVK(false,$UserInfoget['marriage_partner_id']);
	$Role = switchRole($UserInfoget['role']);
	$bantime = GetBanTime($UserInfoget['bantime'],$UserInfoget['id_VK']);
	if($UserInfoget['invisible'] == 0 || $UserInfo['id_VK'] == $AdminId[0]){
		$message ='🐩Роль:  '.$Role."<br>";
		if(!empty($UserInfoget['clan_id'])){
			$clan = SelectClan($UserInfoget['clan_id']);
			$message .= '⏭'.$clan['name'].'⏮'.'<br>';
		}
		if ($UserInfoget['banned'] == 1){
			$message .= 'Статус бана: 💔<br>';
			if($bantime == 'ok' || $bantime == '00'){
				$bantime = '00:00:00';
			}
			$message .= 'До разбана: '.$bantime.'<br>';
			$message .= 'Причина: '.$UserInfoget['ban_text']."<br>";
		}else{
			$message .= 'Статус бана: ❤<br>';	
		}
		if ($UserInfoget['banned_tr'] == 1){
			$message.= 'Статус бана передачи: 💔<br>';
		}else{
			$message.= 'Статус бана передачи: ❤<br>';
		}
		$message .= '⚡Уровень: '.$UserInfoget['lvl']."<br>";
		
		$message .= '🆔ID: '.$UserInfoget['id']."<br>".
		'🔎IDVK: '.$UserInfoget['id_VK']."<br>".
		'👔Ник: '.'[id'.$UserInfoget['id_VK'].'|'.$UserInfoget['name'].']'."<br>".
		'💰Баланс:  '.ConvertValute($UserInfoget['balance'])."$"."<br>".
		'💊Донатка:  '.ConvertValute($UserInfoget['donate_balance'])." R<br>";
		
		if (!empty($UserInfoget['bank'])){
			$message.= '💳В банке: '.ConvertValute($UserInfoget['bank'])."$<br>";
		}
		if (!empty($UserInfoget['BTC'])){
			global $BTC;
			$message.= '🌐Биткоинов:  '.ConvertValute($UserInfoget['BTC'])." BTC<br>";
		}
		if (!empty($UserInfoget['TPC'])){
			$message.= '💷Тайпанкоинов:  '.ConvertValute($UserInfoget['TPC'])." TPC<br>";
		}
		if (!empty($UserInfoget['rating'])){
			$message.= '👑Рейтинг:  '.ConvertValute($UserInfoget['rating'])."<br>";
		}
		if ($UserInfoget['marry_parther'] != 0){
			$Parther = selectFromID(false,$UserInfoget['marry_parther']);
			$message.= '💕Партнер: '.'[id'.$Parther['id_VK'].'|'.CheckNfName($UserInfoget['marry_parther']).']'."<br>";
		}
		if (!empty($UserInfoget['job'])){
			$message.= '🔨Работа: '.GetNameJob($UserInfoget['job_id'])."<br>";
		}
		if (!empty($UserInfoget['buisness'])){
			$message.= '💼Бизнес: '.$UserInfoget['buisness']." (".$UserInfoget['buisness_lvl']."LVL)<br>";
		}
		if (!empty($UserInfoget['name_farm'])){
			$message.= '🔋Ферма биткоинов: '.$UserInfoget['name_farm'].'(x'.$UserInfoget['count_farm'].')'."<br>";
		}
		if (!empty($UserInfoget['name_farmTPC'])){
			$message.= '🔋Ферма тайпанкоинов: '.$UserInfoget['name_farmTPC'].'(x'.$UserInfoget['count_farmTPC'].')'."<br>";
		}
		if (!empty($UserInfoget['date_transfer'])){
			$message.= '💸Последний раз передавал: '.$UserInfoget['date_transfer']."<br>";
		}
		if (!empty($UserInfoget['ref'])){
			$message.= '<br>👥Пригласил: '.CheckNfName($UserInfoget['ref'])."<br>";
		}
		$message .= '🗣️Всего пригласил: '.CountRef($UserInfoget['id']).'<br>';
		$message .= '🔨Отработано дней: '.ConvertValute($UserInfoget['job_exp']);
		$message .= '<br>📗Дата регистрации: '.$UserInfoget['date_reg'].'<br>';
		$message .= '📗Актив: '.$UserInfoget['active_day'];
		if (empty($Role)){$message = switchRole($UserInfo['role']).', игрока нет в базе';}
	}else{
		$message = '👔Ник: '.$UserInfoget['name']."<br>INVISIBLE";
	}
	return $message;
	
	
}
function CountRef($id){
	global $mysqli;
	$i=0;
	$result_set = $mysqli->query("SELECT * FROM `users`");
	while(($row = $result_set->fetch_assoc()) !=false){
		if ($row['ref'] == $id){
			$i+=1;
		}
	}
	return $i;
}
function UsersGet($id){
	global $token;
	$json = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".$id."&name_case=Nom&v=5.80&access_token=".$token),1);
	return $json['response'][0];
}
function Last_name($link){
	global $token;
	if (strlen($link)>=15){
		$id = substr($link,15);
	}else{$id = $link;}
	$json = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".$id."&name_case=Nom&v=5.80&access_token=".$token),1);
	return $json['response'][0]['last_name'];
}
function GetId($link){
	global $token;
	if (strlen($link)>=15){
		$id = substr($link,15);
	}else{$id = $link;}
	$json = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".urlencode($id)."&name_case=Nom&v=5.80&access_token=".$token),1);
	return $json['response'][0]['id'];
}
function ping($host, $port, $timeout = 1) {
  $ta = microtime(true);
  if($fp = fsockopen($host, $port, $errno, $errstr, $timeout)){
    $tb = microtime(true);
    fclose($fp);
    return round((($tb - $ta) * 1000), 0)." ms";
  } else { return "DOWN"; }
}

function GetBonus(){
	global $UserInfo;
	$Type = '';
	$ArrayFarm = array(5,10,15);
	$ArrayFarmTPC = array(5,10,15);
	$ArrayMoney = array(10000,50000,100000,200000,300000,400000,500000,600000,10000000,15000000,999999999,1500000000,15000000000);
	$ArrayBitcoins = array (100,500,1000,2000,10000,100000,150000,200000,250000);
	$ArrayDonate = array(1,9);
	$Rand = rand(1,100);
	if(ChanceProzent(10)){
		$Bonuse = $ArrayBitcoins[rand(0,count($ArrayBitcoins)-1)];
		$Type = 'btc';
	}elseif(ChanceProzent(3)){
		$Bonuse = $ArrayFarm[rand(0,count($ArrayFarm)-1)];
		$Type = 'farm';
	}elseif(ChanceProzent(2)){
		$Bonuse = $ArrayFarmTPC[rand(0,count($ArrayFarmTPC)-1)];
		$Type = 'farmTPC';
	}elseif(ChanceProzent(1)){
		$Bonuse = $ArrayDonate[rand(0,count($ArrayDonate)-1)];
		$Type = 'donate';
	}else{
		$Bonuse = $ArrayMoney[rand(0,count($ArrayMoney)-1)];
		$Type = 'money';
	}
	return $Bonuse.' '.$Type;
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
file_get_contents('https://api.vk.com/method/messages.send?' . $get_params);
}
function SellMsgOtherGroup($userId,$text){
	global $tokenpgroup;
	$token =  file ('files/tokenpgroup.txt');
	$request_params = array(
		'message' => $text,
		'peer_id' => $userId,
		'access_token' => $token[0],
		'v' => '5.80'
	);
$get_params = http_build_query($request_params);
file_get_contents('https://api.vk.com/method/messages.send?' . $get_params);
}
function GetRolesList($role){
	global $mysqli;
	$Users = $mysqli->query('SELECT * FROM `users`');
	$i = 1;
	$str = 'Состав '.switchRole($role).':<br>';
	while(($row = $Users->fetch_assoc()) != false){
		if($row['role']== $role){
			$str .= $i.'. [id'.$row['id_VK'].'|'.$row['name'].'] ——— '.switchRole($row['role']).'<br>';
			$i++;
		}
	}
	return $str;
}
function AddLogs($userId,$text){
	global $AdminId;
	global $userId;
	if($userId != $AdminId[0]){
		$f = fopen('logs/id'.$userId.'.txt','a+');
		fwrite ($f,$text.PHP_EOL);
		fclose($f);
		sellog($text);
	}
}
function ClearLogs($userId){
	$f = fopen('logs/id'.$userId.'.txt','w+');
	fclose($f);
}
function GetLogs($userId){
	$file = file('logs/id'.$userId.'.txt');
	$count = count($file);
	if ($count ==0){
		return 'Список логов id:'.$userId." пуст.<br>";
	}
	$str = 'Информация о действиях id:'.$userId."<br>";
	for ($i=0;$i<$count;$i++){
		$str .= $file[$i];
	}
	return $str;
}
function SetSubstr(){
	global $body;
	global $bodyx;
	return substr($body,strlen($bodyx[0].$bodyx[1])+2);
}

function Actives(){
	global $mysqli;
	$Active = 0;
	$result_set = $mysqli->query("SELECT * FROM `users`");
	while(($row = $result_set->fetch_assoc()) !=false){
		if(substr($row['active'],0,8) ==date('d').'.'.date('m').'.'.date('y')){
				$Active += 1;
		}
	}
	return $Active;
}

function GetStats(){
	$Farms = 0;
	$FarmsTPC = 0;
	$Marriage = 0;
	$Active = 0;
	$Balance = 0;
	$Banned = 0;
	$Bank = 0;
	$Referal = 0;
	$Rating = 0;
	$TPC = 0;
	$BTC = 0;
	$i = 0;
	global $mysqli;
	$result_set = $mysqli->query("SELECT * FROM `users`");
	while(($row = $result_set->fetch_assoc()) !=false){
		$i+=1;
		if (!empty($row['marry_parther'])){
			$Marriage += 1;
		}
		if (!empty($row['ref'])){
			$Referal += 1;
		}
		if (substr($row['active'],0,8) == date('d').'.'.date('m').'.'.date('y')){
				$Active += 1;
		}
		
		if($row['role']>=3 || $row['markertop']==1){
			continue;
		}
		
		
		$donate += $row['donate_balance'];
		if(substr($row['date_reg'],0,10) == date('d').".".date('m').".".date('Y')){
			$reg +=1;
		}
		$Banned += $row['banned'];
		$Balance += $row['balance'];
		$TPC += $row['TPC'];
		$Rating += $row['rating'];
		$Farms += $row['count_farm'];
		$FarmsTPC += $row['count_farmTPC'];
		$Bank += $row['bank'];
		$BTC += $row['BTC'];
		
	}
	return $i.' '.$Balance.' '.$Rating.' '.$Farms.' '.$Marriage.
	' '.$Bank.' '.$BTC.' '.$Banned.' '.$TPC.' '.$FarmsTPC.
	' '.$Active.' '.$Referal.' '.$reg.' '.$donate;
}
//--------------------------------------------------DEVELOPER VK.COM/taipancool-------------------------------------------------------------//
?>