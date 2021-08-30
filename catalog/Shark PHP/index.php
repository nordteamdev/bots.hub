<?php
//--------------------------------------------------DEVELOPER VK.COM/taipancool-------------------------------------------------------------//
require_once('games.php');
require_once('functions.php');
require_once('admin.php');
require_once('otherfunc.php');
require_once('keyboard.php');
require_once('functionsShop.php');
require_once('clans.php');



if (!isset($_REQUEST)) { 
    return;
}
$confirmationToken = 'b7ca5c11 ';
$token = 'e43fe7bcabf11c4ddd5688994fed79ee9a185dfa2a2d451f1443a3949f1dcaa225138f2efb55c791082c6';
$data = json_decode(file_get_contents('php://input'));

switch ($data->type) {
case 'message_reply':
	echo 'ok';
break;
case 'confirmation':
	echo $confirmationToken;
break;
case 'group_join':
	$peer_id = $data->object->user_id;
	$message = "🔔Благодрарим за подписку на наше сообщество🔔";
	$request_params = array(
		'message' => $message,
		'peer_id' => $peer_id,
		'access_token' => $token,
		'v' => '5.80'
	);
	$get_params = http_build_query($request_params);
	file_get_contents('https://api.vk.com/method/messages.send?'.$get_params);
	echo ('ok');
break;
case 'message_new':
ini_set('display_errors',0); 
$attachment = false;

RemoveMessagesCount();
$AdminId = file ('files/AdminId.txt');
$tokenpgroup = file ('files/tokenpgroup.txt');
$konfa = file('files/konfa.txt');

$body = $data->object->text;
$peer_id = $data->object->peer_id;
$userId = $data->object->from_id;

$bodyx = explode(' ',$body);
if (substr($body,1,13) == 'club173508826' && Last_name($peer_id) == ''){
	$body = substr($body,strlen($bodyx[0])+1);	
}
$Users_get = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids=".$userId."&name_case=Nom&v=5.80&access_token=".$token),1);
$UserFirstName = $Users_get['response'][0]['first_name'];

$mysqli = new mysqli("localhost", "a0259469_bot", "GVKDysrF", "a0259469_bot"); 
$mysqli->set_charset('utf8mb4');
$UserInfo = selectFromIDVK(false,$userId);
CheckKbd();

$Nick = $UserInfo['name'];
$balance = $UserInfo['balance'];
$BTC = $UserInfo['BTC'];

$message = '';

if($UserInfo['kbd'] == 0){
	$kbd = CloseKeyboard();
}else{
	$kbd = $UserInfo['keyb'];
}
$bodyxl = explode(' ',mb_strtolower($body,"UTF-8"));
$bodyx = explode(' ',$body);
$bodyl = mb_strtolower($body,"UTF-8");

if ($UserInfo['nicknf'] == 1){
	$Nick = "[id".$userId."|".$Nick."]";
}
if(CheckTime($UserInfo['bantime']) == 'ok'){
	SetFieldF('banned',0);
	SetFieldF('bantime',0);	
}
if($UserInfo){
	if ($UserInfo['banned'] == 0 || $userId == $AdminId[0] || $bodyxl[0] == 'донат' ){
		switch($bodyxl[0]){
			case 'кости':
				$message = Bones(KKK($bodyxl[1]));
				break;
			case 'кейсы':
				require_once ('cases/case.php');
				$message = BuyCase($bodyxl[1]);
				break;
			case 'видео':
				if(!empty($bodyx[1])){
					$q = substr($body, 10);
					$message = $Nick.', видео по запросу "'.$q.'"';
					$attachment = SearchVideo($q);
				}else{
					$message = $Nick.', напишите текст.';
				}
				break;
			case 'гиф':
				if(!empty($bodyx[1])){
					$q = substr($body, 6);
					$message = $Nick.', гиф по запросу "'.$q.'"';
					$attachment = SearchDoc($q);
				}else{
					$message = $Nick.', напишите текст.';
				}
				break;
			case 'монетка':
			if(empty($bodyxl[1])){
				$message = GetListMonetka();
			}elseif($bodyxl[1]*1 >=1){
				$message = PlayMonetka($bodyxl[1]);
			}elseif($bodyxl[1] == 'отмена'){
				$message = DelMonetka();
			}else{
				$message = AddMonetka(KKK($bodyxl[2]),$bodyxl[1]);
			}
			break;
			case 'b':
			$message =  BuyCases($bodyxl[1]);
			break;
			case 'умения':
			if(empty($bodyx[1])){
				$message = GetSkills();
				$message .= 'Чтобы купить умения напишите "умения [номер]"';
			}else{
				$message = BuySkill($bodyxl[1]);
			}
			break;
			case 'кубик':
			$message = Kubik(KKK($bodyx[1]));
			break;
			case 'spin':
			if($bodyxl[1] == 'go'){
				$message = Spin();
			}elseif($bodyxl[1] == 'инфо'){
				$message = 
				$Nick.', это рулетка в которой можно выиграть:<br>'.
				'
				👺Admin навсегда
				🌚VIP навсегда
				👑Рейтинг
				💷Тайпанкоины
				🌐Биткоины
				🔋Ферму
				💰Валюту
				💊Донатку
				Цена одной прокрутки 5R
				Чтобы крутить напишите "spin go"';
			}
			break;
			case 'лайк':
			if($UserInfo['like_nf'] == 0 ){
				SetFieldF('balance',$UserInfo['balance']+pow(10,9));
				SetFieldF('like_nf',1);
				$file = file('files/like.txt');
				file_put_contents('files/like.txt',$file[0]+1);
				$message = $Nick.', спасибо за лайк! +'.ConvertValute(pow(10,9)).'$';
			}else{
				$message = $Nick.', вы уже ставили лайк боту.';
			}
			break;
			case 'умения':
				if(empty($bodyx[1])){
					$message = GetSkills();
					$message .= 'Чтобы купить умения напишите "умения [номер]"';
				}else{
					$message = BuySkill($bodyxl[1]);
				}
				break;
			case 'задания':
			$message = GetTasks();
			break; 
			case 'др':
			$aDate = time(); 
			$bDate = strtotime('07.12.2018');
			$datediff = $bDate - $aDate;
			$dt = abs(floor($datediff/(60*60*24)));
			$message = 'Боту: '.$dt.'д<br>До др:'.(365-$dt).'д';
			break;
			case 'профиль':
			$message = GetInformationProfile();
			break;
			case 'помощь':
			case 'команды':
			case 'меню': 
			$message .= $Nick.', мои команды:

🎉Развлекательные:
📹 Видео [фраза]
📺 Гиф [фраза]
⚖ Выбери [фраза] или [фраза2]
📊Вероятность [фраза]
🎮Игры:
🎁Кейсы
🎲Кости [сумма]
🦅Монетка [орел/решка][ставка]
🎰Казино [сумма]
🕧Стол [сумма]
🎰Автомат [помощь/[сумма]] [линии]
🎱Рулетка [red/black/zero] [сумма] 
🥛Напёрсток [1-3] [сумма]
📉Трейд [вверх/вниз] [сумма]
✌🖐🏻✊Бот [камень/ножницы/бумага] [сумма]
♣Fl [ставка]
♣Flgo - играть в fourlear
💴Заработок:
🔨Работа - список доступных работ
⚒Работать 
❌Уволиться
🔩Нелегал
📋Бизнес[улучшить/снять]
💼Бизнесы - список бизнесов
🔋Ферма - собрать биткоины
🔋Тпс - собрать тайпанкоины
 
💡 Разное:
📒Профиль
💊Донат - информация о донате
💲Баланс
💵Банк[сумма/[снять [сумма]]]
👑 Рейтинг - ваш рейтинг
✒Ник [ник/вкл/выкл]
🛍Магазин
💸 Продать [предмет] 
🤝 Передать [id] [сумма]
👍Лайк - поставить лайк боту
✅Задания
🏆 Топ
🎁Riconc - подарок от админа
💎Бонус - ежедневный бонус
💑Брак [id]/Браки 
Браки - список предложений
🤦‍♀️Развод

🕳Прочее:
👥Кланы - команды кланов
🎊Джекпот
⚠Alarm [сообщение]
✉Беседа
👥Реф [id]
😈Инфо
❓Кто
✍Name
⏱Дата [idVK/ссылка]
⚙Настройки:
⌨Клавиатура [вкл/выкл]
📣Уведомления [вкл/выкл]
🔘Кнопка [имя кнопки]
❌Очистить кнопки';
			break;
			case 'уведомления':
			if($bodyx[1] == 'вкл'){
				SetFieldF('notif',1);
				$message = $Nick.', уведомления включены.';
			}elseif($bodyx[1] == 'выкл'){
				SetFieldF('notif',0);
				$message = $Nick.', уведомления выключены.';
			}
			break;
			case 'клавиатура':
			if ($bodyxl[1] == 'вкл'){
				SetFieldF('kbd',1);
				$kbd = $UserInfo['keyb'];
				$message = $Nick.', клавиатура включена.';
			}elseif($bodyxl[1] == 'выкл'){
				SetFieldF('kbd',0);
				if(Last_name($peer_id) != ''){
					$kbd = CloseKeyboard();
				}
				$message = $Nick.', клавиатура отключена.';
			}else{
				$message = $Nick.'напишите "клавиатура [вкл] или [выкл]" .';
			}
			break;
			case 'баланс':
			$message = 
			$Nick.', на балансе: '.ConvertValute($balance)."$"."<br>".
			'💳В банке: '.ConvertValute($UserInfo['bank'])."$<br>".
			'💊Донат: '.ConvertValute($UserInfo['donate_balance'])."₽<br>";
			break;
			case 'casino':
			$message = GoCasinoDonate(KKK($bodyxl[1],'donate'));
			break;
			case 'ник':
			if ($bodyxl[1] == 'вкл'){
				SetFieldF('nicknf',1);
				$message = "[id".$userId."|".$UserInfo['name']."]".', ваш ник включен.';
			}elseif($bodyxl[1] == 'выкл'){
				SetFieldF('nicknf',0);
				$message = $UserInfo['name'].', ваш ник выключен.';
				
			}elseif(!empty($bodyxl[1])){
				if(iconv_strlen(substr($body,7))>18){
					$message = 'Максимальная длина ника 18.<br>Длина вашего ника: '.iconv_strlen(substr($body,7));
					break;
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
				
			}
			break;
			case 'курс':
			$message = 
			'💵Биткоин: '.ConvertValute(BitcoinPrice())."$
			💷Тайпанкоин: ".ConvertValute(TpcPrice()).'$';
			break;
			case 'казино':
			case 'азино':
			$Rate = KKK($bodyxl[1]);
			$ArrEmoji = array('💎','😎','🌚','🌝','🙃','🎁');
			$Reward = str_replace($ArrEmoji,'',$bodyxl[1],$count);
			if ($count>0){
				$AdmEmoji = AdmEmoji($bodyxl[1]);
			}
			$message = GoCasino($Rate,$AdmEmoji);
			break;
			case 'бонус':
			$message = Bonuse();
			break;
			
			case 'фермы':
			if(!empty($bodyx[2])){
				$count = $bodyx[2]*1;
			}else{
				$count = 1;
			}
			if (empty($bodyx[1])){
				$message .= '🌐Фермы биткоинов:<br>';;
				$message .= GetFarmShop('farm');
				$message .= 'Для покупки ферм биткоинов напишите "фермы [номер]"<br>';
				$message .= 'Для продажи ферм биткоинов напишите "продать фермы [количество]"';
			}else{
				$message = BuyFarm($count,$bodyx[1]);
			}
			break;
			case 'тпски':
			if(!empty($bodyx[2])){
				$count = $bodyx[2]*1;
			}else{
				$count = 1;
			}
			if (empty($bodyx[1])){
				$message .= '💷Фермы тайпанкоинов:<br>';
				$message .= GetFarmTPCShop('farmTPC')."";
				$message .= 'Для покупки ферм тайпанкоинов напишите "тпски [номер]"<br>';
				$message .= 'Для продажи ферм тайпанкоинов напишите "продать тпски [количество]"';
			}else{
				$message = BuyFarmTPC($count,$bodyx[1]);
			}
			break;
			case 'ферма':
			switch($bodyxl[1]){
				case 'собрать':
				$message = FarmAssemble();
				break;
				case 'улучшить':
					if(!empty($bodyxl[2])){
						$message = BuyUpgradeFarm($bodyxl[2]);
					}else{
						$message = GetUpgradeFarm();
					}	
				break;
				default:
				$message = FarmMenu();
				break; 
				default:
				$message = FarmMenu();
				break;
			}
			break;
			case 'тпс':
			$message .= FarmAssembleTPC();	
			break;
			case 'передать':
			if ($UserInfo['banned_tr']!= 1){
				$summ = $bodyxl[2];
				$idTR = $bodyxl[1];
				$message = TransferToId(KKK($summ),$idTR);
			}
			break;
			case 'продать':
			switch($bodyxl[1]){
				case 'биз':
				case 'бизнес':
				$message = BuisnessSell();
				break;
				case 'питомца':
				$message = SellPet();
				break;
				case 'битки':
				case 'биткоины':
				AddCompleteTask(10,KKK($bodyx[2]),$userId);
				$message = SellBTC('биткоины',KKK($bodyx[2]));
				break;
				case 'тайпы':
				case 'тайпанкоины':
				$message = SellTPC(KKK($bodyx[2]));
				break;
				case 'машину':
				$message = SellSubject('car','машины','машину');
				break;
				case 'самолет':
				case 'самолёт':
				$message = SellSubject('samolet','самолета','самолёт');
				break;
				case 'вертолет':
				case 'вертолёт':
				$message = SellSubject('vert','вертолёта','вертолёт');
				break;
				case 'дом':
				$message = SellSubject('house','дома','дом');
				break;
				case 'квартиру':
				$message = SellSubject('kvart','квартиры','квартиру');
				break;
				case 'телефон':
				$message = SellSubject('telephone','телефона','телефон');
				break;
				case 'мотоцикл':
				$message = SellSubject('moto','мотоцикла','мотоцикл');
				break;
				case 'фермы':
				$message = SellFarm(KKK($bodyx[2]));
				break;
				case 'тпски':
				$message = SellFarmTPC(KKK($bodyx[2]));
				break;
				case 'рейтинг':
				$message = SellRating(KKK($bodyx[2]));
				break;
				
				
				

			}
			break;
			case 'купить':
			switch($bodyxl[1]){
				case 'биткоины':
				$BTCPRICE = BitcoinPrice();
				$Count = KKK($bodyx[2]);
				if(empty($bodyx[2])){
					$Count = floor($UserInfo['balance']/$BTCPRICE);
				}
				if(($UserInfo['BTC']+$Count)<pow(10,12)*10){
					if(empty($Count)){$Count=1;}
					$PriceBTC = $Count*$BTCPRICE;
					if($Count>=1 && $balance>=$PriceBTC){
						SetField('balance',$balance-$PriceBTC,$userId);
						SetField('BTC',$UserInfo['BTC']+$Count,$userId);
						$message = $Nick.', вы купили: '.ConvertValute($Count).' BTC за '.ConvertValute($PriceBTC).'$';
					}else{
						$message = $Nick.', недостаточно денег';
					}
				}
				break;
				case 'тайпанкоины':
				$message = BuyTPC(KKK($bodyx[2]));
				break;
				case 'рейтинг':
				$message = BuyRating(KKK($bodyx[2]));
				break;
			}
			break;
			case 'магазин':
			$message = GETSHOP();
			break;
			case 'машины':
			if (empty($bodyx[1])){
				$message = GetSubjectShop('car').FBuy('машины');
			}else{
				$message = BuySubject('car',$bodyx[1],'машину');
			}
			break;
			case 'самолеты':
			case 'самолёты':
			if (empty($bodyx[1])){
				$message = GetSubjectShop('samolet').FBuy('cамолеты');
			}else{
				$message = BuySubject('samolet',$bodyx[1],'cамолёт');
			}
			break;
			case 'вертолеты':
			case 'вертолёты':
			if (empty($bodyx[1])){
				$message = GetSubjectShop('vert').FBuy('вертолеты');
			}else{
				$message = BuySubject('vert',$bodyx[1],'вертолет');
			}
			break;
			case 'дома':
			if (empty($bodyx[1])){
				$message = GetSubjectShop('house').FBuy('дома');
			}else{
				$message = BuySubject('house',$bodyx[1],'дом');
			}
			break;
			case 'квартиры':
			if (empty($bodyx[1])){
				$message = GetSubjectShop('kvart').FBuy('квартиры');
			}else{
				$message = BuySubject('kvart',$bodyx[1],'квартиру');
			}
			break;
			case 'телефоны':
			if (empty($bodyx[1])){
				$message = GetSubjectShop('telephone').FBuy('телефоны');
			}else{
				$message = BuySubject('telephone',$bodyx[1],'телефон');
			}
			break;
			case 'мотоциклы':
			if (empty($bodyx[1])){
				$message = GetSubjectShop('moto').FBuy('мотоциклы');
			}else{
				$message = BuySubject('moto',$bodyx[1],'мотоцикл');
			}
			break;
			case 'рейтинг':
			$message = $Nick.', для покупки рейтинга напишите "купить рейтинг [количество]"';
			break;
			case 'биткоины':
			$message = $Nick.', для покупки биткоинов напишите "купить биткоины [количество]"<br>';
			break;
			case 'тайпанкоины':
			$message = $Nick.', для покупки тайпанкоинов напишите "купить тайпанкоины [количество]"<br>';
			break;
			case 'банк':
			if (!empty($bodyx[1])){
				$message = Bank($bodyxl[1],$bodyxl[2]);
			}else{
				$message = $Nick.', в банке: '.ConvertValute($UserInfo['bank']+ProzentBank())."$";
				if(ProzentBank()){
					$message .= '<br>+Проценты: '.ConvertValute(ProzentBank())."$";
				}	
			}
			
			break;
			case 'напёрсток':
			case 'наперсток':
			$OneThree = $bodyx[1]*1;
			$Summ = KKK($bodyx[2]);
			$message = Stakan($OneThree,$Summ);
			break;
			case 'трейд':
			$message = Trade($bodyxl[1],KKK($bodyxl[2]));
			break;
			case 'alarm':
			if (CheckTime($UserInfo['time_alarm'])=='ok' || CheckTime($UserInfo['time_alarm']) == '00'){
				if ($UserInfo['count_alarm']<=2){
					$BlackArr = array ('.','[',']','(',')','|','@','$','%','*',':',',','/','{','}');
					$InfoText = str_replace($BlackArr,'',substr($body,5),$count);
					if ($count==0){
						$Userss = $mysqli->query("SELECT * FROM `users` ");
						$UserInfoAdmin = selectFromIDVK($Userss,$AdminId[0]);
						$text = 
						'⚠Новое сообщение!⚠
						Имя: '."[id".$userId."|".$UserFirstName."]".'<br>'.
						'ID: '.$UserInfo['id'].'<br>'.
						'IDVK: '.$UserInfo['id_VK'].'<br>'.
						'Текст: '.$InfoText;
						Alarm();
						if ($UserInfoAdmin['img'] == 1){
							SellMsg($AdminId[0],$text,PostPhoto($AdminId[0],'photos/alarm.jpg'));
						}else{
							SellMsg($AdminId[0],$text);
						}
						$message = $Nick.', ваше сообщение отправлено.';
					}else{
						$message = $Nick.', в тексте присутствуют лишние символы.';
					}
				}
			}else{
				$message = $Nick.', подождите '.CheckTime($UserInfo['time_alarm']);
			}

			break;
			case 'топ':
			$message = getRating();
			break;
			case 'рулетка':
			$message = Roulette($bodyxl[1],KKK($bodyx[2]));
			break;
			case 'работа':
			if(empty($bodyx[1])){
				$message = GetJobList();
			}else{
				$message = GetJob($bodyx[1]);
			}
			break;
			case 'уволиться':
			$message = QuitJob();
			break;
			case 'работать':
				$message = WorkJob().CheckNewJob();
				break; 
			cqase 'бизнесы':
			if(empty($bodyx[1])){
				$message = GetBuisnessList();
			}else{
				$message = AddBuisness($bodyx[1]);
			}
			break;
			case 'бизнес':
			if(empty($bodyxl[1])){
				$message = BuisnessStats();
			}
			if($bodyxl[1] == 'улучшить'){
				$message = BuisnessUpgrade();
			}elseif($bodyxl[1] == 'снять'){
				$message = BuisnessAssemble();
			}
			break;
			case 'беседа':
			$message = $konfa[0];
			break;
			case 'ключ':
			if (Last_name($peer_id) != ''){
				if ($UserInfo['role'] <=  2 || $UserInfo['role']==6){
					if (CheckTime($UserInfo['key_time']) == 'ok' || CheckTime($UserInfo['key_time']) == '00'){
							$message = CheckKey($bodyx[1]);
					}else{
						$message = $Nick.', вы можете активировать ключи через: '.CheckTime($UserInfo['key_time']);
					}
				}else{
					$message = $Nick.', вам не нужен ключ.';
				}
			}else{
				$message = $Nick.', нельзя вводить ключ в беседе.';
			}
			break;
			case 'реф':
			$message = Referal($bodyx[1]);
			break;
			case 'инфо':
			$message = d();
			break;
			case 'автомат':
			if ($bodyxl[1] == 'помощь'){
				$message = 'Выигрышные комбинации:
					🎁 - x500
					🍎 - x25
					🍏 - x20
					🍐 - x10
					🍊 - x5
					🍋 - x2
					🍌 - x1.5
					Линии:
					1 - 1 горизонтальная в середине
					3 - 3 горизонтальных 
					5 - 3 горизонтальных и 2 по диагонали
					';
			}else{
				$Automat = AutomatDisplay();
				$Automat = explode(' ',$Automat);
				$lines = $bodyx[2];
				$stavka = KKK($bodyx[1]);
				if (CheckStavkaAutomate($stavka,$lines) == 'ok'){
					if($lines == 1 || $lines == 3 || $lines == 5){
						$message = CheckReward($Automat,$lines,$stavka);
						$message .= $Automat[0]."<br>";
					}else{
						$message = $Nick.', введите линии [1/3/5]';
					}
				}else{
					$message = CheckStavkaAutomate($stavka,$lines);
				}			
			}
			break;
			case 'кнопка':
			$btn = substr($body,12);	
			$json = json_decode($UserInfo['keyb'],1);
			$count = count($json['buttons']);
			if($count<10){
				if(!empty($bodyx[1])){
					AddButtonToKbd($UserInfo['keyb'],$btn);
					$User = selectFromIDVK(false,$userId);
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
				$User = selectFromIDVK(false,$userId);
				$kbd = $User['keyb'];
				$message = $Nick.', кнопки очищены.';
			}
			break;
			case 'riconc':
			$message = GetGift();
			break; 
			case 'кто':
			$arr = array('разраб','адм','adm','созд');
			if (Last_name($peer_id) == ''){
				if(!empty($bodyx[1])){
					$message = Why();
				}else{
					$message = $Nick.', введите текст.';
				}
			}else{
				$message = $Nick.', команда работает только в беседе.';
			}
			str_replace($arr,'',$body,$count);
			str_replace('я','',$body,$countim);
			str_replace(array('ты','вы'),'',$body,$countyou);
			if ($countim>0){
				$UsersGet = UsersGet($userId);
				$message = $Nick.', вы: '.$UsersGet['first_name'].' '.$UsersGet['last_name'];
			}elseif($countyou>0){
				$message = $Nick.', я: Bot Shark ^_^';
			}elseif($count>0){
				
				$message = $Nick.',  [riconc|йа]';
			}
			
			break;
			case 'name':
			$file = file('files/nicknames.txt');
			$message = $Nick.', предлагаю вам ник: '.$file[rand(0,count($file)-1)];
			break;
			case 'дата':
			$message = GetDateRegUserVk(GetId($bodyx[1]));
			break;
			case 'fl':
				if(!empty($bodyx[1])){
					$message = AddFl(KKK($bodyx[1]));
				}else{
					$message  = '6 одного цвета х10
									4 красных х2
									4 одной масти x5
									4 черных 0.2';
				}
				break;
			case 'flgo':
				$message = GetFl();
				break; 
			case 'бот':
			$message = Knb($bodyxl[1],KKK($bodyxl[2]));
			break;
			case 'джекпот':
			$fileJacpotPlayer = file('files/casinojackpotplayer.txt');
			$fileJacpot = file('files/casinojackpot.txt');
			$message = $Nick.', <br>🎯Последний выиграл джекпот: '.$fileJacpotPlayer[0].'<br> 💰Джекпот: '.ConvertValute($fileJacpot[0]).'$';
			break;
			case 'вероятность':
			if(!empty($bodyx[1])){
				$message = Ver();
			}
			break;
			case 'выбери':
			if (!empty($bodyx[1])){
				$message = SelectStr($body);
			}
			break;
			case 'питомцы':
			if(empty($bodyx[1])){
				$message = GetPet();
				$message .= '<br>Чтобы купить питомца напишите "питомцы [номер]"';
			}else{
				$message = BuyPet($bodyx[1]);
			}
			break;
			case 'развод':
			$message = Divorce();
			break;
			case 'браки':
			if(empty($bodyx[1])){
				$message = MarryGetList();
			}else{
				$message = MarryAccept($bodyx[1]);
			}
			break;
			case 'брак':
			$message = MarryRequest($bodyx[1]);
			break;
			case 'нелегал':
			if(empty($UserInfo['nelegal_role'])){
				if(empty($bodyx[1])){
					$message = GetNelegalRoles();
				}else{
					$message = SelectNelegalRole($bodyx[1]);
				}
			}else{
				if(empty($bodyx[1])){
					$message = SwitchNelegalRoleJob().GetNelegalInfo();
				}else{
					$message = WorkNelegalJob($bodyxl[1].' '.$bodyxl[2]);
				}
			}
			
			break;	
			case 'стол':
			$message  = GoTable(KKK($bodyx[1]),$bodyxl[1]);
			break;
			case 'клан':
			CheckClearClanNotif();
			switch($bodyxl[1]){
				case 'создать':
					$message = CreateClan($bodyx[2]);
				break;
				case 'вступить':
					$message = GoClan($bodyx[2]);
				break;
				case 'покинуть':
					$message = LeaveClan();
				break;
				case 'участники':
					$message = GetMembersClan();
				break;
				case 'участники':
				case 'уч':
					$message = GetMembersClan();
				break;
				
				case 'донат':
				AddCompleteTask(1,KKK($bodyx[2]));
				$message = DonateClan(KKK($bodyx[2]));
				break;
				case 'улучшить':
				$message = ClanUpgrade();
				break;
				case 'приват':
				$message = SetPrivate($bodyxl[2]);
				break;
				case 'бонусы':
				if(empty($bodyx[2])){
					$message = GetBonuses();
				}else{
					$message = BuyBonuse($bodyx[2]);
				}
				break;
				case 'награда':
				$message = DivisionRaceClan();
				break;
				case 'гонка':
				$message = GetRatingClanRace();
				break;
				case 'чистка':
				$message = ClearLogsClan();
				break;
				case 'зам':
				if($bodyxl[2] == 'дать'){
					$message = AddClanZam($bodyx[3]);
				}elseif($bodyxl[2] == 'снять'){
					$message = UnZamClan($bodyx[3]);
				}
				break;
				case 'админ':
				if(CheckAdminClan() || IsZamMemberClan($UserInfo['id'])){
					$message = '
					 ✅Клан улучшить - улучшить клан
					 ❌Выгнать [id] - выгнать участника из клана
					 🚷Клан приват [вкл/выкл] - статус клана
					 💂Клан зам [дать/снять] [id] - дать/снять заместителя в клане
					💰Клан награда - распределить награду за клан гонку между участниками
					';
				}
				break;
				case 'заместители':
				case 'замы':
				$message = GetZamsClan();
				break;
				case 'соб':
				$message = CheckClanNotifications();
				break;
				default:
					$message = GetClanInfo();
				break;
			}
			break;
			case 'кланы':
			$message = $Nick.'. 
			❓Клан - информация о вашем клане
			 ➕Клан создать [название]
			 🔜Клан вступить [id] - вступить в клан
			 🔚Клан покинуть - покинуть клан
			 📄Клан участники  - список участников клана
			 💂Клан заместители  - список заместителей клана
			 💸Клан донат [сумма] - задонатить в клан
			 🔝Кланы топ - топ кланов
			 ♟️Клан гонка - посмотреть топ по клан-гонке';
			if($bodyxl[1] == 'топ'){
				$message = GetRatingClan();
			}
			break;
			case 'выгнать':
			$message = KickUserClan($bodyx[1]);
			break;
			default:
			if ($UserInfo['role']>1 || $userId == $AdminId[0]){	
				$message = Admin($UserInfo['role']);
			}
			break;
			case 'донат':
				$file = file('files/prozentdonat.txt');
				if(empty($bodyx[1])){
					$message = 'Текущая скидка: '.$file[0].'%<br>'.
					'1.💰5kkk - '.CalculateProzentDonat(9).'R'.'<br>'.
					'2.💰50kkk - '.CalculateProzentDonat(65).'R'.'<br>'.
					'3.💰140kkk - '.CalculateProzentDonat(100).'R'.'<br>'.
					'4.💰300kkk - '.CalculateProzentDonat(150).'R'.'<br>'.
					'5.💰1kkkk - '.CalculateProzentDonat(230).'R'.'<br>'.
					'6.💰15kkkk - '.CalculateProzentDonat(400).'R'.'<br>'.
					'7.🌚VIP(+🎁GIFT) - '.CalculateProzentDonat(135).'R'.'<br>'.
					'8.👺Admin (+особые требования) - '.CalculateProzentDonat(1100).'R<br>'.
					'9.😎Разбан - '.CalculateProzentDonat(35).'R'.'<br> Для покупки доната напишите донат [номер]<br>'.
					'💊Донатка: '.ConvertValute($UserInfo['donate_balance'])." R<br>";
				}else{
					$message = BuyDonat($bodyx[1]);
				}
				break;
			
		}	
		CheckActive();
		ProzentBank();
		SetActiveDay();
		ActiveSkills();
		CheckTimeTr();
	}else{
		if (Last_name($peer_id) != ''){
			$message = 
			'
			До разбана: '.GetBanTime($UserInfo['bantime']).'
			Причина:'.$UserInfo['ban_text'];
		}
	}
}elseif(!$UserInfo){
	$M = 5000;
	$mysqli->query("INSERT INTO `users` (`id_VK`,`name`,`date_reg`,`balance`,`TPC`,`BTC`) 
	VALUES (".$userId.",'User".$userId."','".GetDateReg()."',".$M.",100,100)");
	$message = 
	$UserFirstName.', Вы успешно зарегестрировались<br>Удачной игры в SHARK BOT';
}


if(!empty($message)){
	if(rand(1,200) == 1){
		$message .= '<br>🆘Расскажите о боте друзьям и получите валюту.🆘<br>';
	}
	AddExp();
}

if($UserInfo['task_nf'] == 0 && CheckCompletedTask() == 5 && !empty($UserInfo['tasks'])){
	$reward = rand(1,10)*pow(10,9);
	SetFieldF('task_nf',1);
	SetFieldF('balance',$UserInfo['balance']+$reward);
	AddExp();
	$message .= '<br>'.$Nick.', вы выполнили все задания. +'.ConvertValute($reward).'$<br>💰Баланс:'.ConvertValute($UserInfo['balance']+$reward).'$';
} 
$mysqli->close();
if (Last_name($peer_id) == ''){
	$kbd = CloseKeyboard();
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

echo ('ok');
break;

}
//--------------------------------------------------DEVELOPER VK.COM/taipancool-------------------------------------------------------------//
?>