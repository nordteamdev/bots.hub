<?php
function Start(){
	CheckBank();
	CheckConference();
	GetBnc();
	SetActiveDay();
	CheckRole();
	//CheckSpam();
	CheckLifeServer();
	//SetBufferKbd();

}
function CheckBank(){
	global $UserInfo;
	$uBank = json_decode($UserInfo['bank'],1);
	$hours = CheckHour($uBank['time']);
	if(is_array($hours)){
		if($hours[1] == 'ok'){
			$summ = $uBank['balance']/100*5*$hours[0];
			if($uBank['balance']+$summ>=KKK('300kk')){
				$summ = KKK('300kk');
			}else{
				$summ = $uBank['balance']+$summ;
			}
			AddJsonValue('bank','balance',$summ);

		}	
	}
}

function GetConferenceBonuse(){
	global $UserInfo,$Nick,$token,$peer_id,$group_id,$userId,$admin;
	$a = api('messages.getConversationMembers?peer_id='.$peer_id.'&v=5.95&access_token='.$token);
	$getConversationMembers = api('messages.getConversationsById?peer_ids='.$peer_id.'&extended=0&group_id='.abs($group_id).'&v=5.95&access_token='.$token);
		if($a['items'][0]['is_owner'] == true && $a['items'][0]['member_id'] == $UserInfo['id_VK']){
			if($getConversationMembers['items'][0]['chat_settings']['members_count']>=50){
				$uConferencesBonuse = json_decode($UserInfo['conferences'],1);
				$uConferencesBonuse = empty($uConferencesBonuse) ? [] : $uConferencesBonuse;
				if(!in_array($peer_id, $uConferencesBonuse)){
					array_push($uConferencesBonuse, $peer_id);
					SetFieldF('conferences',json_encode($uConferencesBonuse,JSON_UNESCAPED_UNICODE));
					SetFieldF('dollar',$UserInfo['dollar']+KKK('50k'));
					$message = $Nick.', вы получили 50.000'.SwitchEmoji('dollar').' за созданную беседу c 50 участниками.';
					SellMsg($admin,'@id'.$userId.' получил бонус за беседу: '.$peer_id);
				}else{
					$message = $Nick.', вы уже получали награду за данную беседу.';
				}
				
			}else{
				$message = $Nick.', в вашей беседе нехватает участников для получения бонуса.';
			}
		}else{
			$message = $Nick.', вы не являетесь создателем беседы.';
		}
	return $message;
}
function CheckLifeServer(){
	global $UserInfo,$Nick;
	if(!empty($UserInfo['server'])){
		$time = GetJsonValue('server','time_life');
		if(GetBanTime($time) == 'ok'){
			SetFieldF('server',null);
			SellMsg($UserInfo['id_VK'],$Nick.', аренда вашего сервера закончилась.');
		}
	}
	
}
function getRating(){
	global $UserInfo,$userId,$Nick,$mysqli;
	$result_set = $mysqli->query("SELECT * FROM `users` ORDER BY `users`.`dollar` DESC");
	$i = 1;
	$str = '';
	while(($row = $result_set->fetch_assoc()) !=false){
		if ($row['role']>=2 || $row['markertop'] !=0){continue;}
		if($row['nicknf']==0){
			$Nickc = $row['name'];
		}else{
			$Nickc = "[id".$row['id_VK']."|".$row['name']."]";
		}
		$str.= ConvertNumberEmoji($i).' '.$Nickc.' — 💰'.ConvertValute($row['dollar'])."<br>";
		if($i>=10){
			if (getMyRating() != 'Вы не можете быть в топе.'){
				$str .= '—————————————————<br>'.getMyRating().' '.$Nick.' — 💰'.ConvertValute($UserInfo['dollar']);
			}else{
				$str .= '—————————————————<br>'.getMyRating();
			}
			
			return $str;
		}
		$i+=1;
	}
	
}
function AddLastCmdToBufferCmd(){
	global $UserInfo,$body;
	$buffer = json_decode($UserInfo['buffer_kbd'],1);
	if(count($buffer)>=6){
		$buffer = array();
	}
	array_push($buffer, $body);
	SetFieldF('buffer_kbd',json_encode($buffer,JSON_UNESCAPED_UNICODE));
}
function SetBufferKbd(){
	global $UserInfo;
	if(empty($UserInfo['buffer_kbd'])){ SetFieldF('buffer_kbd',json_encode(array(),JSON_UNESCAPED_UNICODE));}
}

function SelectAnonym($id = false){
	global $mysqli,$UserInfo;
	$id = empty($id) ? $UserInfo['anonym'] : $id;
	$id = empty($id) ? 0 : $id;
	$anonym = $mysqli->query('SELECT * FROM `anonymous` WHERE `id`='.$id)->fetch_assoc();
	return $anonym;
}
function Report(){
	global $UserInfo,$data,$UserFirstName,$body,$bodyxl,$Nick,$peer_id,$userId,$admin,$reportConference;
	$limit = GetJsonValue('limits','report_time');
	if(GetJsonValue('ban','banalarm') == 1){
		return $Nick.', вы не можете использовать команду "репорт".';
	}
	if(empty($bodyxl[1])){
		return $Nick.', напишите смс.';
	}
	if(CheckTime($limit) == 'ok' || $userId == $admin){
		if($UserInfo['role']<=2 || $userId == $admin || $userId == 212198981){	
			$text = substr($body, strlen($bodyxl[0]));
			AddJsonValue('limits','report_time',time()+30);
			if(!empty($data->object->attachments[0])){
				for($i=0;$i<count($data->object->attachments);$i++){
					$attachments = $data->object->attachments[$i];

						$type = $attachments->type;
						if($type == 'photo'){
							$sizes = $attachments->$type->sizes;
							$url = $sizes[count($sizes)-1]->url;
							$file = 'data/photos_report/report.jpg';
							file_put_contents($file,file_get_contents($url));
							$attachmented .= PostPhoto($userId,$file).',';
							unlink($file);
						}else{
							$owner_id = $attachments->$type->owner_id;
							$id = $attachments->$type->id;
							$attachmented .= $type.$owner_id.'_'.$id.',';
						}
				}
				$attachmented = substr($attachmented,0, -1);
			}
			if(empty($text) && empty($attachmented)){
				return $Nick.', введите текст сообщения.';
			}
			$ReportBody = 
			'❗Новое сообщение!<br>'.
			'🖊Имя: '.$UserFirstName.'<br>'.
			'✏Ник: '.$UserInfo['name'].'<br>'.
			'🔍ID: '.$UserInfo['id'].'<br>'.
			'🔍PEER: '.$peer_id.'<br>'.
			'📎Ссылка: vk.com/id'.$userId.'<br>'.
			'📝Текст: '.$text."<br>";
			SellMsg($reportConference,$ReportBody,$attachmented);
			$message = $Nick.', ваше сообщение отправлено.';
		}else{
			$message = $Nick.', error';
		}
	}else{
		$message = $Nick.', подождите: '.CheckTime($limit);
	}
	return $message;
}
function AddStats($type,$value,$operation = false, $user_id = false){
	global $UserInfo;
	$UserInfo = empty($user_id) ? $UserInfo : selectFromIDVK($user_id);
	$Stats = json_decode($UserInfo['stats'],1);
	if($operation == '+'){
		$Stats[$type] += $value;
	}elseif($operation == '-'){
		$Stats[$type] -= $value;
	}else{
		$Stats[$type] = $value;
	}
	SetField('stats',json_encode($Stats,JSON_UNESCAPED_UNICODE),$UserInfo['id_VK']);
}
function RB($type = false){
	global $userId;
	$User = selectFromIDVK($userId);
	if(empty($type)){
		return '💰Баланс: '.ConvertValute($User['dollar']).SwitchEmoji('dollar');
	}else{
		return SwitchEnToRus($type).': '.ConvertValute($User[$type]).SwitchEmoji($type);
	}
}
function Balance(){
	global $UserInfo,$Nick;
	$balance = 
		'💰'.SwitchEnToRus('dollar').': '.ConvertValute($UserInfo['dollar']).SwitchEmoji('dollar').'<br>'.
		SwitchEmoji('btc').SwitchEnToRus('btc').': '.ConvertValuteDouble($UserInfo['btc']).'<br>'.
		SwitchEmoji('bnc').SwitchEnToRus('bnc').': '.ConvertValute(GetJsonValue('bnc','bnc')).'<br>'.
		SwitchEmoji('donate_balance').SwitchEnToRus('donate_balance').': '.ConvertValuteDouble($UserInfo['donate_balance']).'<br>';
	return $Nick.', ваш баланс:<br>'.$balance;
}
function Pidor(){
	global $UserInfo,$Nick;
	return $Nick.'аоа';
}
function BuyRating($count){
	global $UserInfo,$Nick;
	$count = $count<1 ? 1 : $count;
	$priceRating = KKK('50kk');
	$Price = $priceRating*$count;
	if($UserInfo['dollar'] >= $Price){
		SetFieldF('dollar',$UserInfo['dollar']-$Price);
		SetFieldF('rating',$UserInfo['rating']+$count);
		$message = $Nick.', вы купили '.X($count).' рейтинга'.SwitchEmoji('rating').' за '.ConvertValute($Price);
	}else{
		$message = $Nick.', недостаточно $.<br>Цена 1 единицы рейтинга: '.ConvertValute($priceRating).'$';
	}
	return $message;
}
function SellRating($count){
	global $UserInfo,$Nick;
	$count = $count<1 ? 1 : $count;
	$Price = KKK('50kk')*$count*0.75;
	if($UserInfo['rating'] >= $count){
		SetFieldF('dollar',$UserInfo['dollar']+$Price);
		SetFieldF('rating',$UserInfo['rating']-$count);
		$message = $Nick.', вы продали '.X($count).' рейтинга'.SwitchEmoji('rating').' за '.ConvertValute($Price);
	}else{
		$message = $Nick.', недостаточно '.SwitchEmoji('rating').'.';
	}
	return $message;
}
function SwitchRusToEn($str){
	switch ($str) {
		case 'байты':
			$tr = 'byte';
			break;
		case 'ферма':
		case 'farm':
			$tr = 'farm';
			break;
		case 'бизнес':
		case 'buisness':
			$tr = 'buisness';
			break;
		case 'матрицы':
		case 'матрица':
		case 'matrix':
			$tr = 'donate_balance';
			break;
		case 'машины':
		case 'машину':
		case 'машина':
			$tr = 'car';
			break;
		case 'дома':
		case 'дом':
			$tr = 'house';
			break;
		case 'мотоциклы':
		case 'мотоцикл':
			$tr = 'moto';
			break;
		case 'вертолеты':
		case 'вертолёты':
		case 'вертолет':
		case 'вертолёт':
			$tr = 'vert';
			break;
		case 'самолеты':
		case 'самолёты':
		case 'самолет':
		case 'самолёт':
			$tr = 'samolet';
			break;
		case 'телефоны':
		case 'телефон':
			$tr = 'telephone';
			break;
		case 'квартиры':
		case 'квартиру':
		case 'квартира':
			$tr = 'kvart';
			break;
		case 'btc':
		case 'битки':
		case 'биткоины':
		case 'btc':
			$tr = 'btc';
			break;
		case 'dollar':
		case 'доллары':
			$tr = 'dollar';
			break;
		case 'bnc':
		case 'бинкоины':
			$tr = 'bnc';
			break;
		default:
			return false;
			break;
	}
	return $tr;
}
  
function SwitchEnToRus($str){
	switch ($str) {
		case 'role':
			$tr = 'Привелегия';
			break;
		case 'byte':
			$tr = 'Байты';
			break;
		case 'farm':
			$tr = '🔋Ферма';
			break;
		case 'donate_balance':
			$tr = 'Матрицы';
			break;
		case 'car':
			$tr = '🚗Машина';
			break;
		case 'house':
			$tr = '🏠Дом';
			break;
		case 'moto':
			$tr = '🛵Мотоцикл';
			break;
		case 'vert':
			$tr = '🚁Вертолет';
			break;
		case 'samolet':
			$tr = '🛩Самолет';
			break;
		case 'telephone':
			$tr = '📱Телефон';
			break;
		case 'kvart':
			$tr = '🌇Квартира';
			break;
		case 'buisness':
		case 'бизнес':
			$tr = 'Бизнес';
			break;

		case 'btc':
		case 'битки':
		case 'биткоины':
		case 'btc':
		case 'BTC':
			$tr = 'Биткоины';
			break;
		case 'dollar':
		case 'доллары':
			$tr = 'Доллары';
			break;
		case 'bnc':
		case 'бинкоины':
			$tr = 'Бинкоины';
			break;
		default:
			return false;
			break;
	}
	return $tr;
}
function d(){
	$v = file('data/v.txt');
	$likes = file('data/like.txt');
	$message = '
	����� �� �������: '.GetTime().'<br>'.
	'?�������� �� �����: '.ConvertValute(Actives()).'<br>'.
	'??���� ��������: 01.01.01 <br>'.
	'??������: '.ConvertValute($likes[0]).'<br>'.
	'??Version: '.$v[0];
	return $message;
}


function CheckRole(){
	global $UserInfo;
	if($UserInfo['role'] >1){
		$time = GetJsonValue('role_settings','time');
		if(GetBanTime($time) == 'ok' && $time != 'unlim'){
			SetFieldF('role',1);
		}
	}
}
function GetBnc(){
	global $UserInfo;
	$time = GetJsonValue('bnc','time');
	if(CheckTime($time) == 'ok' && GetJsonValue('bnc','bnc') <=2){
		AddJsonValue('bnc','bnc',2);
		AddJsonValue('bnc','time',time()+86400);
	}
}
function SetIp(){
	global $userId;
	$delOne = floor($userId/999);
	$delTwo = floor($userId/200000);
	$delThree = floor($userId/3000000);
	$ip = rand(100,999).'.'.$delOne.'.'.$delTwo.'.'.$delThree.'.'.rand(1000,9999);
	return $ip;
}

function SwitchEmoji($str){
	switch ($str) {
		case 'byte':
			$emoji = '➗';
			break;
		case 'buisness':
			$emoji = '💼';
			break;
		case 'stars':
		case 'star':
			$emoji = '⭐';
			break;
		case 'donate_balance':
			 $emoji = '👾';
			break;
		case 'minus':
			$emoji = '➖';
			break;
		case 'plus':
			$emoji = '➕';
			break;
		case 'ok':
			$emoji = '✅';
			break;
		case 'no':
			$emoji = '❌';
			break;
		case 'sp':
		case 'SP':
			$emoji = '☮';
			break;
		case 'rating':
			$emoji = '👑';
			break;
		case 'transfer':
			$emoji = '💸';
			break;
		case 'silver':
			$emoji = '⚪';
			break;
		case 'diamond':
			$emoji = '💎';
			break;
		case 'lvl':
			$emoji = '⚡';
			break;
		case 'job':
			$emoji = '⛏';
			break;
		case 'id':
			$emoji = '🆔';
			break;
		case 'mysor':
			$emoji = '🗑';
			break;
		case 'rock':
			$emoji = '⬛';
			break;
		case 'wood':
			$emoji = '🌳';
			break;
		case 'coal':
			$emoji = '🌑';
			break;
		case 'metallr':
			$emoji = '💿';
			break;
		case 'goldr':
			$emoji = '📀';
			break;
		case 'ring':
			$emoji = '💍';
			break;
		case 'points':
			$emoji = '⛰';
			break;
		case 'crown':
			$emoji = '👑';
			break;
		case 'exp':
			$emoji = '🔥';
			break;
		case 'point':
			$emoji = '⛰';
			break;
		case 'bonus':
			$emoji = '🎁';
			break;
		case 'players':
			$emoji = '👥';
			break;
		case 'active':
			$emoji = '📈';
			break;
		case 'day_go':
			$emoji = '➕';
			break;
		case 'token':
			$emoji = '🀄';
			break;
		case 'weapon':
			$emoji = '🗡';
			break;
		case 'acs':
			$emoji = '💣';
			break;
		case 'glory':
			$emoji = '💥';
			break;
		case 'tors':
			$emoji = '👕';
			break;
		case 'nogi':
			$emoji = '👖';
			break;
		case 'stupni':
			$emoji = '👟';
			break;
		case 'dollar':
		case 'доллары':
			$emoji = '💰';
			break;
		case 'bnc':
		case 'бинкоины':
			$emoji = '💾';
			break;
		case 'btc':
		case 'битки':
		case 'биткоины':
		case 'btc':
			$emoji = '🌐';
			break;
		default:
			# code...
			break;
	}
	return $emoji;
}

function ConvertNumEmoji($num){
	$edit_number = array('0⃣','1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣'); 
	$arrnum = array(0,1,2,3,4,5,6,7,8,9);
	return str_replace($arrnum,$edit_number,$num);
}
function LinkName($User){
	return '[id'.$User['id_VK'].'|'.$User['name'].']';
}
function CheckSpam($text = false){
	global $userId,$body,$peer_id,$group_id,$token,$admin,$mainConference;
	if($peer_id == $mainConference){
		$body = empty($text) ? $body : $text;
		str_replace(array('vk.com/','/pool','/public','/club','wall','me/join/','=photo'), '', $body,$count);
		if($userId != $admin){
			if($count >0 || iconv_strlen($body)>450){
				Kick($userId);
				SetBan('Spam',time()+GetBanTimes('5d'),1,$userId);
			}else{
				return 'ok';
			}
		}
		return false;	
	}
}


function SetActiveDay(){
	SetFieldF('active',GetDateReg(1));
}
function GetDateReg($h = false){
	if(empty($h)){
		$date = date('d.m.Y');
	}else{
		$date = date('d.m.Y H:i');
	}
	return $date;
}
function ChanceProzent($chance){
	$rand = rand(0,100);
	$randDrob = rand(0,99);
	$ch = $rand.'.'.$randDrob;
	if($chance>$ch){
		return true;
	}
}
function WinEmoji($a){
	$arrWin = array('😄','😁','😊','😃','😉','😜','😋','🤗','😎','😏','🙂','🙃','😳','😸','😹','😼','😺','🤑');
	$arrLose = array('😒','😢','😭','😩','😨','😰','😳','😕','😦','😵','🤔','😟','😥','😪','😓','😱','😞','😖');
	$rand = rand(1,2);
	if($rand == 1){
		if($a == 1){
			return $arrWin[rand(0,count($arrWin)-1)];
		}else{
			return $arrLose[rand(0,count($arrLose)-1)];
		}
	}else{
		return '';
	}
}
function CheckTimeTransfer(){
	global $UserInfo;
	$Time = GetJsonValue('limits','time_transfer');
	if(CheckTime($Time) == 'ok'){
		AddJsonValue('limits','time_transfer',0);
		return 'ok';
	}else{
		AddJsonValue('limits','day_transfer',0);
		return CheckTime(GetJsonValue('limits','time_transfer'));
	}
}
function X($num){
	return '(x'.ConvertValute($num).')';
}
function PostPhoto($id,$namepict){
	global $token;
	$photosgetMessagesUploadServer = api('photos.getMessagesUploadServer?peer_id='.$id.'&v=5.80&access_token='.$token);
	$image_path = dirname(__FILE__).'/'.$namepict;
	$result = PostImage($image_path,$photosgetMessagesUploadServer['upload_url']);
	$saveMessagesPhoto = api("photos.saveMessagesPhoto?server=".$result['server']."&photo=".$result['photo']."&hash=".$result['hash']."&v=5.80&access_token=".$token);
	$end = $id.'_'.$saveMessagesPhoto[0]['id'];
	return 'photo'.$end; 


}
function PostImage($file,$url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, ['file1' => new CurlFile($file)]);
	$response = curl_exec($ch);
	$response = json_decode($response,true);
	curl_close($ch);
	return $response;
}
function CheckHour($time){
	$str = '';
	$check_time = time()-$time;
	$hours = floor( (time()-$time) / 3600 );
	$minutes = floor(($check_time%3600)/60);
	$seconds = $check_time%60; 
	if ($hours>=1){
		return array($hours,'ok');
	}else{
		$str = abs(59-$minutes).":".abs(59-$seconds);
		return $str;
	}
}
function KKK($str){
	global $UserInfo;
	
	$strs = substr($str,0,6);
	if ($strs == 'все' || $strs == 'всё' || $str == 'вабанк' || $str == 'ва-банк' || $str == 'vse' || $str == 'all' ){
		$Rate = $UserInfo['dollar'];
	}else{
		$arr = array('к','k');
		str_replace($arr,'',$str,$count);
		$Rate = ((int)$str*pow(1000,$count));
	}
	return $Rate;
}
function GetJsonValue($field,$value,$user_id = false){
	global $UserInfo;
	$User = empty($user_id) ? $UserInfo : selectFromIDVK($user_id);
	$Json = json_decode($User[$field],1);
	if(!empty($Json[$value])){
		return $Json[$value];
	}
}
function SetField($field,$value,$IDVK){
	global $mysqli;
	if($value == null || $value == 'null'){
		$mysqli->query("UPDATE `users` SET `".$field."` = NULL WHERE `users`.`id_VK` = ".$IDVK.";");
	}else{
		$mysqli->query("UPDATE `users` SET `".$field."` = '".$value."' WHERE `users`.`id_VK` = ".$IDVK.";");
	}
	
}
function SetFieldF($field,$value){
	global $mysqli,$userId;
	if($value == null || $value == 'null'){
		$mysqli->query("UPDATE `users` SET `".$field."` = NULL WHERE `users`.`id_VK` = ".$userId);
	}else{
		$mysqli->query("UPDATE `users` SET `".$field."` = '".$value."' WHERE `users`.`id_VK` = ".$userId);
	}
}


function CheckTime($time){
	$str = '';
	$check_time = $time-time();
	$hours = floor(($check_time%86400)/3600);
	$minutes = floor(($check_time%3600)/60);
	$seconds = $check_time%60; 
	if ($hours>0){
		if($hours<=9){
			$str .= '0';
		}
		$str.=$hours.':';
	}
	if ($minutes>=0){
		if($minutes<=9){
			$str .= '0';
		}
		$str.=$minutes.':';
	}
	if ($seconds>=0){
		if($seconds<=9){
			$str .= '0';
		}
		$str.=$seconds;
	}
	if (empty($str) || $str == '00:00' || $str == '00'){
		return 'ok';
	}
	return $str;
}
function ChangeName(){
	global $Nick,$UserInfo,$body,$bodyl;
	$price = pow(10,6)*1;
	$pricedonate = 1;
		if(iconv_strlen(substr($body,7))>18){
			return 'Максимальная длина ника 18.<br>Длина вашего ника: '.iconv_strlen(substr($body,7));
		}
		$BlackArr = array ('.','[',']','(',')','|','@','taipan','бог','адм','разраб','adm','создатель','творец','тайпан','✓ | [Администрация]');
		$nicknamecheck = str_replace($BlackArr,'',substr($bodyl,7),$countss);
		if($countss>0){
			$nickname = str_replace($BlackArr,'?',substr($bodyl,7));
			$nickname = SetNickName($nickname);
			SetFieldF('name',$nickname);
		}else{
			$nickname = str_replace($BlackArr,'?',substr($body,7));
			$nickname = SetNickName($nickname);
			SetFieldF('name',$nickname);
		}
		$message = 'Теперь вы "'.$nickname.'"';
	
	return $message;
}
function Last_name($link){
	global $token;
	if (strlen($link)>=15){
		$id = substr($link,15);
	}else{$id = $link;}
	$json = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".$id."&name_case=Nom&v=5.80&access_token=".$token),1);
	if($json['response'][0]['last_name']){
		return $json['response'][0]['last_name'];
	}else{
		return '';
	}
}
function GetId($link){
	global $token;
	$Search = array('https://m.vk.com/','https://m.vk.com/id','https://vk.com/id','https://vk.com/',
		'http://m.vk.com/','http://m.vk.com/id','http://vk.com/id','http://vk.com/','vk.com/','vk.com/id','m.vk.com/','m.vk.com/id');
	$id = str_replace($Search, '', $link);
	$json = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".urlencode($id)."&name_case=Nom&v=5.80&access_token=".$token),1);
	if(empty($json['response'][0]['id'])){
		$id = $id*1 == 0 ? "id".$id : $id;
	}else{
		return $json['response'][0]['id'];
	}
	$json = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".urlencode($id)."&name_case=Nom&v=5.80&access_token=".$token),1);
	return $json['response'][0]['id'];
}
function api($met){
	$ch = curl_init('https://api.vk.com/method/'.$met);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
	curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
	$response =  curl_exec($ch);
	$json = json_decode($response,true);
	curl_close($ch);
	return $json['response'];
}

function apiPOST($method,$array){
$url = sprintf( 'https://api.vk.com/method/%s', $method);
$ch = curl_init();
	curl_setopt_array( $ch, array(
		CURLOPT_POST    => TRUE,            // это именно POST запрос!
		CURLOPT_RETURNTRANSFER  => TRUE,    // вернуть ответ ВК в переменную
		CURLOPT_SSL_VERIFYPEER  => FALSE,   // не проверять https сертификаты
		//CURLOPT_SSL_VERIFYHOST  => FALSE,
		CURLOPT_POSTFIELDS      => $array,
		CURLOPT_URL  => $url,    // веб адрес запроса
	));

$response = curl_exec($ch); // запрос выполняется и всё возвращает в переменную
$json = json_decode($response,true);
curl_close( $ch);
return $json['response'];
}
function uniord($ch) {
     $n = ord($ch{0});
     if ($n < 128) { 
         return $n;
     }
     if ($n < 192 || $n > 253) { 
         return false;
     }
     $arr = array(1 => 192, 
                  2 => 224, 
                  3 => 240, 
                  4 => 248, 
                  5 => 252, 
                  );
     foreach ($arr as $key => $val) { 
         if ($n >= $val) { 
             $char[] = ord($ch{$key}) - 128; 
             $range  = $val; 
         } else { 
             break; 
         } 
     }
     $retval = ($n - $range) * pow(64, sizeof($char));
     foreach ($char as $key => $val) { 
         $pow = sizeof($char) - ($key + 1); 
         $retval += $val * pow(64, $pow);  
     }
     return $retval; 
}
function AddJsonValue($field,$type,$value,$typeOperation = false,$user_id = false){
	global $userId;
	$UserInfo = !empty($user_id) ? selectFromIDVK($user_id) : selectFromIDVK($userId);
	$Json = json_decode($UserInfo[$field],1);
	if($typeOperation == '+'){
		$Json[$type] += $value;
	}elseif($typeOperation == '-'){
		$Json[$type] -= $value;
	}elseif(empty($typeOperation)){
		$Json[$type] = $value;
	}
	SetField($field,json_encode($Json,JSON_UNESCAPED_UNICODE),$UserInfo['id_VK']);
}
function selectFromIDVK($id){
	global $mysqli;
	$data = $mysqli->query('SELECT * FROM `users` WHERE `id_VK`='.$id);
	if($data->num_rows != 0){
		return $data->fetch_assoc();
	}else{
		return false;
		
	}
}
function selectFromID($id){
	global $mysqli;
	$data = $mysqli->query('SELECT * FROM `users` WHERE `id`='.$id);
	if($data->num_rows != 0){
		return $data->fetch_assoc();
	}else{
		return false;
		
	}
}
function GetUnban(){
	global $UserInfo;
	$Ban = json_decode($UserInfo['ban'],1);
	if(GetBanTime($Ban['game_ban_time']) == 'ok'){
		Ban('game_ban',0);
		Ban('game_ban_text',0);
		Ban('game_ban_time',0);
		Ban('game_ban_user',0);
	}
}
function ConvertValute($ch){
	if($ch>0){
		if ($ch*1 >=pow(10,21)){
			return $ch;
		}else{
			return number_format($ch,0,'.','.');
		} 
	}else{
		if ($ch*1 <= -pow(10,21)){
			return $ch;
		}else{
			return number_format($ch,0,'.','.');
		} 
	}
}
function ConvertValuteDouble($ch){
	if($ch>0){
		if ($ch*1 >=pow(10,21)){
			return $ch;
		}else{
			return number_format($ch,2,',','.');
		} 
	}else{
		if ($ch*1 <= -pow(10,21)){
			return $ch;
		}else{
			return number_format($ch,2,',','.');
		} 
	}
}
function SetNickName($str){
	$arr = array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я');
	str_replace($arr,'',$str,$count);
	if($count == 0){
		if(uniord($str[0].$str[1].$str[2].$str[3])<500){
			$str = mb_strtoupper($str[0]).substr($str,1);
		}else{
			$str = $str;
		}
	}else{
		if(uniord($str[0].$str[1].$str[2].$str[3])<1103){
			$str = mb_strtoupper($str[0].$str[1],"UTF-8").substr($str,2);
		}else{
			$str = $str;
		}
	}
	return $str;
}

function BuyBtc($count = false){
	global $UserInfo,$Nick;
	$btcPrice = BitcoinPrice();
	if(empty($count)){
		$count = floor($UserInfo['dollar']/$btcPrice);
	}else{
		$count = floor($count);
	}
	$Price = floor($count * $btcPrice);
	if($count>0){
		if($UserInfo['dollar'] >= $Price){
			SetFieldF('dollar',$UserInfo['dollar']-$Price);
			SetFieldF('btc',$UserInfo['btc']+$count);
			$message = $Nick.', вы купили '.ConvertValuteDouble($count).SwitchEmoji('btc').' за '.ConvertValute($Price);
		}else{
			$message = $Nick.', недостаточно $';
		}
	}
	return $message;
}
function SellBTC($name,$count = false){
	global $Nick,$UserInfo;
	$balance = $UserInfo['dollar'];
	if ($name == 'биткоины' && $UserInfo['btc']>0){
		$BTCPRICE = BitcoinPrice()*1;
		if (empty($count)){
			$PriceBTC = $UserInfo['btc']*$BTCPRICE;
			SetFieldF('dollar',$balance+$PriceBTC);
			$message = $Nick.', вы продали: '.ConvertValute($UserInfo['btc']).' 🌐btc за '.ConvertValute($PriceBTC).'$';
			SetFieldF('btc',0);
		}else{
			$CountBTC = floor($count*1);
			if($UserInfo['btc']>=$CountBTC){
				if($CountBTC>=1){
					$PriceBTC = $CountBTC*$BTCPRICE;
					SetFieldF('dollar',$balance+$PriceBTC);
					$message = $Nick.', вы продали: '.ConvertValute($CountBTC).'🌐btc за '.ConvertValute($PriceBTC).'$';
					SetFieldF('btc',$UserInfo['btc']-$CountBTC);
				}else{
					$message = $Nick.', минимальное количестов продажи 1🌐.';
				}
			}else{
				$message = $Nick.', у вас недостаточно биткоинов.';
			}
		}
	}else{
		$message = $Nick.', у вас нет биткоинов🌐.';
	}	
	return $message;
}
function SellBytc($name,$count = false){
	global $Nick,$UserInfo;
	$balance = $UserInfo['dollar'];
	if ($name == 'байткоины' && $UserInfo['byte']>0){
		$bytePRICE = BitcoinPrice()*1;
		if (empty($count)){
			$Pricebyte = $UserInfo['byte']*$bytePRICE;
			SetFieldF('dollar',$balance+$Pricebyte);
			$message = $Nick.', вы продали: '.ConvertValute($UserInfo['byte']).' 🌐byte за '.ConvertValute($Pricebyte).'$';
			SetFieldF('byte',0);
		}else{
			$Countbyte = floor($count*1);
			if($UserInfo['byte']>=$Countbyte){
				if($Countbyte>=1){
					$Pricebyte = $Countbyte*$bytePRICE;
					SetFieldF('dollar',$balance+$Pricebyte);
					$message = $Nick.', вы продали: '.ConvertValute($Countbyte).SwitchEmoji('byte').'Байткоинов за '.ConvertValute($Pricebyte).'$';
					SetFieldF('byte',$UserInfo['byte']-$Countbyte);
				}else{
					$message = $Nick.', минимальное количестов продажи 1🌐.';
				}
			}else{
				$message = $Nick.', у вас недостаточно биткоинов.';
			}
		}
	}else{
		$message = $Nick.', у вас нет биткоинов🌐.';
	}	
	return $message;
}
function BitcoinPrice($type = false){
	$bit = json_decode(file_get_contents("https://api.cryptonator.com/api/full/btc-usd"),1);
	$bit = $bit['ticker']['price'];
	$bytecoin = $bit*1.5;
	if ($bit>0){
		$f = fopen('data/course/bitcoin.txt','w+');
		fwrite($f,$bit);
		fclose($f);

		$fbyte = fopen('data/course/bytecoin.txt','w+');
		fwrite($fbyte,$bytecoin);
		fclose($fbyte);
		if($type == 'byte'){
			return number_format($bytecoin, 2, ',', '');	
		}
		return number_format($bit, 2, ',', '');	
	}elseif($bit == 0){
		$file = file('data/course/bitcoin.txt')[0];
		return number_format($file, 2, ',', '');
	}
}
function GetMyProperty($user_id = false){
	global $UserInfo,$Nick;
	$message = '';
	$UserInfo = empty($user_id) ? $UserInfo : selectFromIDVK($user_id); 
	$car = !empty($UserInfo['car']) ? SwitchEnToRus('car').': '.GetJsonValue('car','name').'<br>' : null;
	$house = !empty($UserInfo['house']) ? SwitchEnToRus('house').': '.GetJsonValue('house','name').'<br>' : null;
	$moto = !empty($UserInfo['moto']) ? SwitchEnToRus('moto').': '.GetJsonValue('moto','name').'<br>' : null;
	$vert = !empty($UserInfo['vert']) ? SwitchEnToRus('vert').': '.GetJsonValue('vert','name').'<br>' : null;
	$samolet = !empty($UserInfo['samolet']) ? SwitchEnToRus('samolet').': '.GetJsonValue('samolet','name').'<br>' : null;
	$telephone = !empty($UserInfo['telephone']) ? SwitchEnToRus('telephone').': '.GetJsonValue('telephone','name').'<br>' : null;
	$kvart = !empty($UserInfo['kvart']) ? SwitchEnToRus('kvart').': '. GetJsonValue('kvart','name').'<br>' : null;
	$server = !empty(GetJsonValue('server','name')) ? '🗄Сервер: '.GetJsonValue('server','name').'<br>' : ''; 
	$farm = !empty(GetJsonValue('farm','name')) ? '🔋Ферма: '.GetJsonValue('farm','name').X(GetJsonValue('farm','count')).'<br>' : '';
	$farmBytc = !empty(GetJsonValue('farmBytc','name')) ? '🔋БайтФерма: '.GetJsonValue('farmBytc','name').X(GetJsonValue('farmBytc','count')).'<br>' : '';

	$uBuisness = json_decode($UserInfo['buisness'],1);
	if(!empty($uBuisness)){
		for($i=0;$i<count($uBuisness);$i++){
			$buisness .= '💼'.$uBuisness[$i]['name'].'<br>';
		}
	}
	
	//$twoBuisness = !empty($uBuisness[1]['id']) ? '💼'.$uBuisness[1]['name'].'<br>' : null;
	$message .= $car;
	$message .= $house;
	$message .= $moto;
	$message .= $vert;
	$message .= $samolet;
	$message .= $telephone;
	$message .= $kvart;
	$message .= $server;
	if(!empty($message)){
		$message .= '<br>';
	}
	
	$message .= $buisness;
	$message .= '<br>';
	$message .= $farm;
	$message .= $farmBytc;
	//$message .= $twoBuisness;
	return $message;
}
function SummMachine(){
	global $UserInfo;
	return $UserInfo['CPU']+$UserInfo['RAM']+$UserInfo['VC']+$UserInfo['internet']+$UserInfo['spy']+$UserInfo['antivirus'];
}
function WithDrawMatrix($qiwi=false,$summ=false){
	global $UserInfo,$Nick,$admin,$mysqli;
	if(empty($summ)){
		$message = $Nick.', напишите "вывести матрицы [свой qiwi кошелек] [сумма]"';
	}else{
		if($UserInfo['donate_balance'] >= $summ){
			if($UserInfo['referal_money'] >= floor($summ/2)){
				if($summ >= 2){
					$message = $Nick.', мы отправили сообщение администраторам, дождитесь ответа.';
					$text = '💸[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].'] отправил запрос на вывод '.
					SwitchEmoji('donate_balance').ConvertValuteDouble($summ).SwitchEmoji('donate_balance').'матриц.<br>QIWI: '.$qiwi;
					SellMsg($admin,$text);
					SetFieldF('donate_balance',$UserInfo['donate_balance']-$summ);
					SetFieldF('referal_money',$UserInfo['referal_money']-floor($summ/2));
				}else{
					$message = $Nick.', минимальный вывод 2 матрицы'.SwitchEmoji('donate_balance');
				}
			}else{
				$message = $Nick.', чтобы вывести '.$summ.' матриц  у вас должно быть минимум '.floor($summ/2).' нулей.<br>Получайте 2 нуля за друга, подробнее - команда "друг"<br>'.
				'0️⃣Ваши нули:'.$UserInfo['referal_money'];
			}
		}else{
			$message = $Nick.', недостаточно '.SwitchEmoji('donate_balance').'матриц.';
		}
	}
	return $message;

}
function Get($user_id = false){
	global $UserInfo,$Nick,$mysqli;
	$UserInfo = empty($user_id) ? $UserInfo : selectFromIDVK($user_id); // просмотр профиля от игрока/админа
	$show = !empty($user_id) ? true : false;//если просмотрел админ
	$count_ref = $mysqli->query('SELECT * FROM `users` WHERE `ref`="'.$UserInfo['referal_code'].'"')->num_rows;
	if($UserInfo['anonym']>0){
		require_once('modules/anonymous/anonymous.php');
		$anonym = selectAnonym();
		$anonym = '👤Anonym: "'.$anonym['name'].'"<br>';
	}else{
		$anonym = '';
	}
	if(!$show){
		$main = $UserInfo['name'].', твой профиль:<br>';
		$game_ban = '';
		$game_ban_time = '';
		$game_ban_text = '';
		$game_ban_user = '';
		$IDVK = '';
		$link_page = '';
		$work_days = '';
	}else{
		/******************************************************MAIN INFORMATION***************************************************/
		$main = 'Профиль игрока "'.$UserInfo['name'].':<br>';
		$date_reg = '📅Registration date: '.$UserInfo['date_reg'].'<br>';
		$active = '🕹Last activity: '.$UserInfo['active'].'<br>';
		$IDVK = '🆔VK: '.$UserInfo['id_VK'].'<br>';
		$link_page  = '🕳Page: https://vk.com/id'.$UserInfo['id_VK'].'<br>'; 

		/*************************************************************************************************************************/
		
		$work_days = '⛏Worked days: '.ConvertValute(GetJsonValue('job','exp',$UserInfo['id_VK'])).'<br>';
		/***********************************************BAN INFORMATION***********************************************************/
		$Ban = json_decode($UserInfo['ban'],1);
		$AdminName = UsersGet($Ban['game_ban_user'],'first_name');
		$game_ban = $Ban['game_ban'] == 1 ? '❌Заблокирован<br>' : null;
		$game_ban_time = $Ban['game_ban_time'] != 0 ? '⏱Срок: '.GetBanTime($Ban['game_ban_time']).'<br>' : null;
		$game_ban_text = !empty($Ban['game_ban_text']) ? '📜Причина: '.$Ban['game_ban_text'].'<br>' : null;
		$game_ban_user = $Ban['game_ban_user'] != 0 ? '👤Заблокировал: [id'.$user_id.'|'.$AdminName.']<br>' : null;
		/************************************************************************************************************************/
	}
	$message .= $main.'<br>';
	$message .= $game_ban;
	$message .= $game_ban_time;
	$message .= $game_ban_text;
	$message .= $game_ban_user;

	$message .= $IDVK;
	$message .= $link_page;
	$message .= '🆔 ID:'.$UserInfo['id'].'<br>';
	$message .= $anonym;
	$message .= '💰 Баланс: '.ConvertValute($UserInfo['dollar']).'$<br>';
	$message .=  '💳В банке: '.ConvertValute(GetJsonValue('bank','balance')).'<br>';
	$message .= '💾 BINCOINS: '.ConvertValute(GetJsonValue('bnc','bnc')).'<br>';
	$message .= SwitchEmoji('rating'). 'Рейтинг: '.ConvertValute($UserInfo['rating']).'<br>';
	$message .= $UserInfo['donate_balance']>0 ? SwitchEmoji('donate_balance'). 'Матрицы: '.ConvertValuteDouble($UserInfo['donate_balance']).'<br>' : null;
	$message .= SwitchEmoji('btc'). 'Биткоины: '.ConvertValuteDouble($UserInfo['btc']).'<br>';
	$message .= SwitchEmoji('byte'). 'Байткоины: '.ConvertValuteDouble($UserInfo['byte']).'<br>';
	$message .= '🖥 Производительность хак-машины: '.ConvertValute(SummMachine()).'F<br>';
	
	$Property = GetMyProperty($UserInfo['id_VK']);
	if(!empty($Property)){
		$message .= '⠀ 🔑 Имущество:<br>'.$Property;
	}
	$message .= '<br>';
	if(!empty(GetJsonValue('job','id'))){
		$message .= '⛏ Работа: '.GetJsonValue('job','name').'<br>';
	}
	$message .= '<br>';
	$message .= '👥 Друзей: '.ConvertValute($count_ref).'<br>';
	$message .= $date_reg;
	$message .= $active;
	$message .= $work_days;

	return $message;
}
?>
