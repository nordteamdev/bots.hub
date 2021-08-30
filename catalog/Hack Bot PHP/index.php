<?php
require('functions.php');
require('keyboard.php');
require('other.php');
require('settings.php');


error_reporting(0);



if (!isset($_REQUEST)) { 
    return;
}

$confirmationToken = '0df917bf';
$token = '26845e13ac6da93efe55620edf9dccf1b0af88b437aaa7c1fd5f1d95a2b4fdeefd9894d2099a16d8d81f2';
$data = json_decode(file_get_contents('php://input'));

$secretKey = 'aoa223123';
if(strcmp($data->secret, $secretKey) !== 0 && strcmp($data->type, 'confirmation') !== 0){
    return;
}

switch ($data->type) {
case 'message_reply':
	echo 'ok';
break;
case 'confirmation':
	echo $confirmationToken;
break;
case 'wall_repost':
	$mysqli = new mysqli("localhost", "root", "riconc1020", "f0399733_bot"); 
	$mysqli->set_charset('utf8mb4');
	Repost();
	$mysqli->close();
	break;

case 'wall_reply_new':
	$mysqli = new mysqli("localhost", "root", "riconc1020", "f0399733_bot"); 
	$mysqli->set_charset('utf8mb4');
	$userId = $data->object->from_id;
	$group_id = $data->object->post_owner_id;
	$UserInfo = selectFromIDVK($userId);
	if($userId>0){
		if($UserInfo){
			$comment_info  = json_decode(file_get_contents('data/comment/comment_info.json'),1);
			if($data->object->post_id == $comment_info['post_id']){
				if(CheckTime($comment_info['time']) != 'ok'){
					SetFieldF($comment_info['type_reward'],$UserInfo[$comment_info['type_reward']] + $comment_info['count_reward']);
					$comment_id = $data->object->id;
					$message = $UserInfo['name'].', выдал тебе: '.ConvertValute($comment_info['count_reward']).SwitchEmoji($comment_info['type_reward']);
					$do = api('wall.createComment?owner_id='.$group_id.'&post_id='.$comment_info['post_id'].'&from_group='.
						abs($group_id).'&message='.urlencode($message).'&reply_to_comment='.$comment_id.'&v=5.101&guid='.rand(1,10000).'&access_token='.$token);
					
				}
			}
		}
	}
	$mysqli->close();
	break;
case 'group_join':
	$userId = $data->object->user_id;
	$mysqli = new mysqli("localhost", "root", "riconc1020", "bot"); 
	$mysqli->set_charset('utf8mb4');
	$UserInfo = selectFromIDVK($userId);
	if(GetJsonValue('limits','group_join') == 0){
		SetFieldF('dollar',$UserInfo['dollar']+KKK('200k'));
		AddJsonValue('limits','group_join',1);
		$message = "+200.000$ за вступление, спасибо.";
		
	}else{
		$message = 'Вы уже получили награду.';
	}
	SellMsg($userId,$message);
	echo ('ok');
	break;
case 'message_new':

ini_set('display_errors',0); 
$attachment = false;

$group_id = '-'.$data->group_id;
$body = $data->object->text;

$peer_id = $data->object->peer_id;
if(Last_name($peer_id) == ''){
	$strriposscob = strripos($body, ']');
		if($strriposscob != false){
			$body = substr($body,$strriposscob+2);
		}
	
}
$userId = $data->object->from_id;

$mainConference = 2000000059;





$bodyx = explode(' ',$body);
$bodyxl = explode(' ',mb_strtolower($body,"UTF-8"));
$bodyl = mb_strtolower($body,"UTF-8");

$UserFirstName = UsersGet($userId,'first_name');
$mysqli = new mysqli("localhost", "root", "riconc1020", "bot"); 
$mysqli->set_charset('utf8mb4');

$UserInfo = selectFromIDVK($userId);

$Nick = GetJsonValue('settings','name') == 1 ? '[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].']' : $UserInfo['name'];
CheckKbd();

if(GetJsonValue('settings','kbd')==1){
	$kbd = $UserInfo['keyb'];
}else{
	$kbd = CloseKeyboard();
}
if(1){
	if($UserInfo){
		if(GetJsonValue('ban','game_ban') == 0 || $userId == $admin ){
			Start();
			switch ($bodyxl[0]) {
				case 'конфабонус':
					$message = GetConferenceBonuse();
					break;
				case 'кейсы':
					require_once('modules/cases.php');
					$message = openCase($bodyxl[1],$bodyxl[2]);
					break;
				case 'лотерея':
				case 'лот':
					require_once('modules/lot/lot.php');
					$message = Lot(KKK($bodyxl[1]));
					break;
				case 'банк':
					require_once('modules/bank.php');
					$message = Bank($bodyxl[1],($bodyxl[2]));
					break;
				case 'уведомления':
					$value = $bodyxl[1] == 'вкл' ? 1 : 0;
					$value = $bodyxl[1] == 'выкл' ? 0 : $value;
					$message = $value;
					SetFieldF('notification',$value);
					$message = $Nick.', уведомления '.$bodyxl[1].'.';
					break;
				case 'peer':
					$message = $peer_id;
					break;
				case 'хаки':
					require_once('modules/upgrades.php');
					$message = GetMyUpgradesComp($bodyxl[1]);
					break;
				case 'автомат':
					require_once('modules/games.php');
					$message = Automate(KKK($bodyxl[1]));
					break;
				case 'вывести':
					if($bodyxl[1] == 'матрицы'){
						$message =WithDrawMatrix($bodyx[2],$bodyx[3]);
					}
					break;
				case 'друг':
					require_once('modules/referal.php');
					$message = Ref($bodyx[1]);
					break;
				case 'декор':
					require_once('modules/entertainment.php');
					$subbodyl = substr($bodyl, strlen($bodyxl[0])+1);
					$message = DcorText($subbodyl);		
					break;
				case 'скуб':
					require_once('modules/games.php');
					$message = Skub($bodyxl[1],$bodyxl[2]);
					break;
				case 'карта':
					require_once('modules/personal_card/create_card.php');
					$dirImage = AddPersonalCard();

					$attachment = PostPhoto($userId,$dirImage);
					if(iconv_strlen($attachment) < iconv_strlen($userId)+6){
						$message = 'Write me';
						$attachment = false;
					}else{
						
						$message = 'Your personal card:';
					}
					
					
					unlink($dirImage);

					break;
				case 'кнб':
				require_once('modules/knbGame.php');
					$message = Knb($bodyxl[1]);
					break;
				case 'аноним':
					require_once('modules/anonymous/anonymous.php');
					$message = ManageAnonym($bodyxl[1]);
					if($bodyxl[1] == 'помощь'){
						$message = HelpCmdAnonym();
					}
					break;
				case 'код':
					require_once('modules/codekey.php');
					$message = UseCode($bodyxl[1]);
					break;
				case 'куп':
					require_once('modules/games.php');
					$message = Coop(KKK($bodyxl[1]));
					break;
				case 'бизнесы':
					require_once('modules/buisness.php');
					$message = BuyBuisness($bodyxl[1]);
					break;
					case 'маники':
					require_once('modules/manikss.php');
					$message = Buymanikss($bodyxl[1]);
					break;
				case 'бизнес':
					require_once('modules/buisness.php');
					switch ($bodyxl[1]) {
						case 'нанять':
							$message = AddWorkersToBuisness($bodyxl[2],KKK($bodyxl[3]));
							break;
						case 'снять':
							if(($bodyxl[2] == 'все' || $bodyxl[2] == 'всё') && $UserInfo['role']>=3){
								$message = AssembleBuisnessAdmin();
							}else{
								$message = AssembleBuisness($bodyxl[2]);
							}
							
							break;
						case 'улучшить':
							$message = UpgradeBuisness($bodyxl[2]);
							break;
						default:
							$message = GetBuisnessInfo($bodyxl[1]);
							break;
					}
					break;
				case 'топ':
					require_once('modules/top.php');
					switch ($bodyxl[1]) {
						case 'рейтинг':
							$message = GetTop('rating');
							break;
						case 'btc':
						case 'битки':
						case 'биткоины':
							$message = GetTop('btc');
							break;
						default:
							$message = GetTop('dollar');
							break;
					}
					break;
					
				case 'биткоины':
				case 'рейтинг':
					require_once('modules/commands.php');
					$message = GetHelpShop($bodyxl[0]);
					break;
				case 'магазин':
					require_once('modules/commands.php');
					$message = GetOtherCommand('shop');
					break;	
				case 'монетка':
					require_once('modules/games.php');
					if($UserInfo['role']<=2 || $userId == $admin){
						if(empty($bodyxl[1])){
							$message = GetListMonetka();
						}elseif($bodyxl[1]*1 >=1){
							$message = PlayMonetka($bodyxl[1]);
						}elseif($bodyxl[1] == 'отмена'){
							$message = DelMonetka();
						}else{
							$message = AddMonetka(KKK($bodyxl[2]),$bodyxl[1]);
						}
					}else{
						$message = '';
					}
					break;
				case 'таймеры':
				case 'т':
					require_once('modules/timers.php');
					$message = GetTimers();
					break;
				case 'работа':
					require_once('modules/jobs.php');
					$message = SelectJob($bodyxl[1]);
					break;
				case 'уволиться':
					require_once('modules/jobs.php');
					$message = QuitJob();
					break;
				case 'работать':
					require_once('modules/jobs.php');
					$message = WorkJob();
					break;
				case 'донат':
                     $message = $UserInfo['name'].'Узнать список товаров и купить донат в автоматическом режиме можно на нашем сайте:<br>bothack.fun ✅ ';
                     break;
				case 'фокуб':
					require_once('modules/games.php');
					$message = FourCub(KKK($bodyxl[1]));
					break;
				case 'крапс':
					require_once('modules/games.php');
					$message = Craps(KKK($bodyxl[1]));
					break;
				case 'кубик':
					require_once('modules/games.php');
					$message = Kubik(KKK($bodyxl[1]));
					break;
				case 'руль':
				case 'рулетка':
					require_once('modules/games.php');
					$message = Roulette($bodyxl[1],KKK($bodyxl[2]));
					break;
				case 'бо':
				case 'трейд':
					require_once('modules/games.php');
					$message = Trade(($bodyxl[1]),KKK($bodyxl[2]));
					break;
				case 'курс':
					BitcoinPrice();
					$message = 
					SwitchEmoji('btc').'Биткоин: '.ConvertValute(BitcoinPrice())."$<br>".
					SwitchEmoji('byte').'Байткоин: '.ConvertValute(BitcoinPrice('byte'))."$<br>";
				break;
				case 'фермы':
					require_once('modules/farm.php');
					$message = BuyFarm($bodyxl[1],$bodyxl[2]);
					break;
				case 'ферма':
					require_once('modules/farm.php');
					$message = FarmAssemble();
					break;
				case 'байтфермы':
					require_once('modules/farmBytc.php');
					$message = BuyfarmBytc($bodyxl[1],$bodyxl[2]);
					break;
				case 'байтферма':
					require_once('modules/farmBytc.php');
					$message = farmBytcAssemble($bodyxl[1]);
					break;
				case 'реши':				
					require_once('modules/calc/calc.php');
					$formula = $bodyxl[1];
					$vars = substr($body, strlen($bodyxl[0].$bodyxl[1])+1);
						$precision = 4; // Number of digits after the decimal point
						try {
						    $parser = new FormulaParser($formula, $precision);
						    $variables = $parser->SearchVariables($vars);
						    $parser->setVariables($variables);
						    $result = $parser->getResult(); // [0 => 'done', 1 => 16.38]
						} catch (\Exception $e) {
						  // $e->getMessage(), "\n";
						}
						if($result[0] != "error"){
							$message =  $Nick.', '.$formula.' = '.($result[1]);
						}else{
							$message = $Nick.', '.$result[1];
						}
					
					break;
				case 'стих':
					require_once('modules/entertainment.php');
					$message = AnekdotRu('poems');
					break;
				case 'фраза':
					require_once('modules/entertainment.php');
					$message = AnekdotRu('aphorism');
					break;
				case 'анекдот':
					require_once('modules/entertainment.php');
					$message = AnekdotRu();
					break;
				case 'отношения':
					require_once('modules/commands.php');
					$message = GetOtherCommand('relations');
					break;
				case 'дата':
					require_once('modules/entertainment.php');
					$user_id = FastUserId();
					$message = FoafVK($user_id);
					break;
				case 'беседа':
					$message = $Nick.', присоединяйся https://vk.cc/9H7uKV';
					break;
				case 'загадка':
					require_once('modules/entertainment.php');
					$message = Zagadka();
					break;
				case 'ответ':
					require_once('modules/entertainment.php');
					$message = ZagadkaAnswer(substr($bodyl, strlen($bodyxl[0])+1));
					break;
				case 'сдаюсь':
					$ZagadkaAnswer = GetJsonValue('zagadki','true_answer');
					if($ZagadkaAnswer != 'def'){
						AddJsonValue('zagadki','true_answer','def');
						$message = $Nick.', правильный ответ: "'.$ZagadkaAnswer.'"';
					}else{
						$message = $Nick.', напишите "загадка"';
					}
					break;
				case 'репорт':
					$message = Report();
					break;
				case 'факт':
					require_once('modules/entertainment.php');
					$message = RandstuffRu('fact');
					break;
				case 'мудрость':
					require_once('modules/entertainment.php');
					$message = RandstuffRu('saying');
					break;
				

				case 'кого':
				case 'кто':
				case 'кому':
					if(Last_name($peer_id) == ''){
						if(!empty($bodyxl[1])){
							require_once('modules/entertainment.php');
							$message = Why();
						}else{
							$message = $Nick.', введите текст.';
						}
					}	
					break;
				case 'гиф':
					require_once('modules/entertainment.php');
					if($UserInfo['role'] >=3){
						if(!empty($bodyx[1])){
							$q = substr($body, 6);
							$attachment = SearchDoc($q);
						}else{
							$message = $Nick.', напишите текст.';
						}
					}else{
						$message = $Nick.', команда включена только для админов.';
					}
					break;
				case 'передать':
					require_once('modules/transfer.php');
					$id = $bodyxl[1];
					$summ = KKK($bodyxl[2]);
					$message = TransferId($id,$summ);
					break;
				case 'таймеры':
				case 'т':
					require_once('modules/timers.php');
					$message = GetTimers();
					break;
				case 'бонус':
					require_once('modules/bonuse.php');
					$message = Bonus();
					break;
				case 'казино':
				case 'азино':
				case 'kasino':
				case 'каз':
					require_once('modules/games.php');
					$message = Casino(KKK($bodyxl[1]));	
					break;
						break;
				case 'дказино':
				case 'дазино':
				case 'дказ':
					require_once('modules/games.php');
					$message = Dcasino(KKK($bodyxl[1]));	
					break;
				case 'стакан':
				case 'ст':
					require_once('modules/games.php');
					$message = Stakan(KKK($bodyxl[1]),$bodyxl[2]);	
					break;	
				case 'число':
					require_once('modules/games.php');
					$message = RandNum($bodyxl[1]);
					break;
				case 'команды':
				case 'помощь':
				case 'меню':
				require_once('modules/commands.php');
					$message = GetCommands();
					break;
				case 'профиль':
				case 'проф':
				case 'п':
					$message = Get();
					break;
				case 'ник':
					if ($bodyxl[1] == 'вкл'){
						AddJsonValue('settings','name',1);
						$message = "[id".$userId."|".$UserInfo['name']."]".', ваш ник включен.';
					}elseif($bodyxl[1] == 'выкл'){
						AddJsonValue('settings','name',0);
						$message = $UserInfo['name'].', ваш ник выключен.';
						
					}elseif(!empty($bodyxl[1])){
						$message = ChangeName();
						
					}
					break;
				case 'bind':
				case 'бинд':
				case 'button':
				case 'кнопка':
					$btn = substr($body,strlen($bodyxl[0])+1);	

					$json = json_decode($UserInfo['keyb'],1);
					$count = count($json['buttons']);
					if($count<10){
						if(!empty($bodyx[1])){
							AddButtonToKbd($UserInfo['keyb'],$btn);
							$User = selectFromIDVK($userId);
							$kbd = $User['keyb'];
							$message = $Nick.', кнопка: "'.$btn.'" добавлена';
						}
					}else{
						$message = $Nick.', максимальное количество кнопок.';
					}
					break;
				case 'очистить':
					if ($bodyxl[1] == 'кнопки'){
						ClearKbd();
						$User = selectFromIDVK($userId);
						$kbd = $User['keyb'];
						$message = $Nick.', кнопки очищены.';
					}
					break;
				case 'баланс':
					$message = Balance();
					break;
						case 'тестоп':
			$message = getRating();
			break;
				case 'клавиатура':
					if ($bodyxl[1] == 'вкл'){
						AddJsonValue('settings','kbd',1);
						$kbd = $UserInfo['keyb'];
						$message = $Nick.', клавиатура включена.';
					}elseif($bodyxl[1] == 'выкл'){
						AddJsonValue('settings','kbd',0);
						if(Last_name($peer_id) != ''){
							$kbd = CloseKeyboard();
						}
						$message = $Nick.', клавиатура отключена.';
					}else{
						$message = $Nick.'напишите "клавиатура [вкл] или [выкл]" .';
					}
					break;
				case 'машины':
				case 'дома':
				case 'мотоциклы':
				case 'вертолеты':
				case 'вертолёты':
				case 'самолеты':
				case 'самолёты':
				case 'телефоны':
				case 'квартиры':
					require_once('modules/property.php');
					$message = BuyProperty(SwitchRusToEn($bodyxl[0]),$bodyxl[1]);
					break;
				case 'поцеловать':
				case 'поцелуй':
				case 'kiss':
				case 'ударить':
				case 'удар':
				case 'bump':
				case 'пнуть':
				case 'tokick':
				case 'hug':
				case 'обнять':
				case 'обьятие':
				case 'объятие':
				case 'sex':
				case 'секс':
				case 's':
				case 'кончить':
				case 'конча':
				case 'плюнуть':
				case 'харкнуть':
				case 'плевок':
				case 'какать':
				case 'кекать':
				case 'пердануть':
				case 'пукать':
				case 'пук':
				case 'фак':
					require_once('modules/relations.php');
					$message = Relations($bodyxl[1],$bodyxl[0]);
					break;
				case 'продать':
					switch ($bodyxl[1]) {
						case 'фермы':
						case 'ферму':
							require_once('modules/farm.php');
							$message = SellFarm($bodyxl[2]);
							break;
						case 'байтфермы':
						case 'байтферму':
							require_once('modules/farmBytc.php');
							$message = SellfarmBytc($bodyxl[2]);
							break;
						case 'битки':
						case 'биткоины':
							$message = SellBTC('биткоины',KKK($bodyxl[2]));
							break;
						case 'байткоины':
						case 'байты':
							$message = SellBytc('байткоины',KKK($bodyxl[2]));
							break;	
						case 'рейтинг':
							$message = SellRating(KKK($bodyxl[2]));
							break;	
						case 'бизнес':
							require_once('modules/buisness.php');	
							$message = SellBuisness($bodyxl[2]);
							break;
						case 'машину':
						case 'дом':
						case 'мотоцикл':
						case 'вертолет':
						case 'вертолёт':
						case 'самолет':
						case 'самолёт':
						case 'телефон':
						case 'квартиру':
							require_once('modules/property.php');
							$message = SellProperty($bodyxl[1]);
							break;
						default:
							# code...
							break;
					}
					break;
				default:
					if($UserInfo['role']>1 || $userId == $admin){
						require_once('admin/admin.php');
						$message = Developer();
					}
					if(empty($message)){
						require_once('modules/cmd.php');
						$message = CMD(substr($body,0,strlen($bodyxl[0])));
					}
					
					break;
			}
		}else{
			$user_id = GetJsonValue('ban','game_ban_user');
			GetUnban();
			$AdminName = UsersGet($user_id,'first_name');
			if(Last_name($peer_id) != ''){
				$attachment = PostPhoto($userId,'images/ban.jpg');
				$message = $Nick.', вы заблокированы!'.'<br>'.
				'⏱До разблокировки: '.GetBanTime(GetJsonValue('ban','game_ban_time')).'<br>'.
				'📜Комментарий: '.GetJsonValue('ban','game_ban_text').'<br>'.
				'👤Вас заблокировал: [id'.$user_id.'|'.$AdminName.']';
			}
		}
	}elseif (!$UserInfo && $userId>0) {
		require_once('modules/personal_card/create_card.php');	
				
		$text = '"[id'.$userId.'|'.$UserFirstName.']", Успешно зарегестрировался в @hack_bots(Боте) ✅';
		SellMsg($admin,$text);

		$dollar = 5000;
		$date_reg = GetDateReg(1);
		$referal_code = floor($userId/2)+5;
		$UserFirstName = str_replace("'",'', $UserFirstName);
		$registration = $mysqli->query("INSERT INTO `users` (`id_VK`,`name`,`date_reg`,`dollar`,`ip`,`referal_code`) 
			VALUES ('".$userId."','".$UserFirstName."','".$date_reg."','".$dollar."','".SetIp()."','".$referal_code."');");
				$message = $UserFirstName.',<br> >Successful connect.<br>Напишите мне "меню" или "команды".<br>FAQ  https://vk.cc/9HDNz3';
		
		$UserInfo = selectFromIDVK($userId);
		$dirImage = AddPersonalCard();
		$attachment = PostPhoto($userId,$dirImage);
		unlink($dirImage);
		
	}
}

if(!empty($message)){
	AddGameLogs();
	if(ChanceProzent(10)){
		$hint = file('data/hint/hint.txt');
		$hint = mb_convert_encoding($hint[rand(0,count($hint)-1)], 'UTF-8','cp-1251');
		$message .='<br>♟️Подсказка: '.$hint;
	}
	if(!empty($UserInfo['job'])){
		require_once('modules/events.php');
		EventHack();
	}
}
SetFieldF('online_time',time()); // set online point
if($playGame){
	AddLastCmdToBufferCmd();
	$buttons = json_decode($UserInfo['buffer_kbd'],1);
	array_push($buttons, 'Команды');
	$kbd = CreateKeyboard($buttons);
}
if (Last_name($peer_id) == ''){
	$kbd = KbdConference();
}
$mysqli->close();
if(!empty($message)){
	
	$checkNullBalance = str_replace(['недостаточно $','недостаточно денег'], '', $message,$countNullB);
	if($countNullB>0){
		$attachment = 'market-137112508_3044790';
	}
	$request_params = array(
			'keyboard' => $kbd,
			'attachment' => $attachment,
			'message' => $message,
			'peer_id' => $peer_id,
			'access_token' => $token,
			'v' => '5.80'
		);
	apiPOST('messages.send',$request_params);
}
echo ('ok');
break;
}

?>
