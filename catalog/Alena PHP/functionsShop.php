<?php
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//

function BuySkill($id){
	global $UserInfo,$mysqli,$Nick;
	$id *=1;
	$skill = $mysqli->query('SELECT * FROM `skills` WHERE `id`='.$id);
	$skill = $skill->fetch_assoc();
	$UserSkills = json_decode($UserInfo['skills'],1);
	if(empty($UserSkills)){
		$SkillArr = array('skills'=>array());
		SetFieldF('skills',json_encode($SkillArr,JSON_UNESCAPED_UNICODE));
		$UserInfo = selectFromIDVK(false,$UserInfo['id_VK']);
		$UserSkills = json_decode($UserInfo['skills'],1);
	}
	if($UserInfo['donate_balance'] >= $skill['price']){
		if(!in_array($skill['value'],$UserSkills['skills'])){
			if($id<=2){
				SetFieldF('donate_balance',$UserInfo['donate_balance']-$skill['price']);
				array_push($UserSkills['skills'],$skill['value']);
				SetFieldF('skills',json_encode($UserSkills,JSON_UNESCAPED_UNICODE));
				$message = $Nick.', вы купили умение: "'.$skill['name'].'"';
			}
		}else{
			$message = $Nick.', у вас уже есть данное умение';
		}
	}else{
		$message = $Nick.', недостаточно R <br>💊Донатка: '.ConvertValute($UserInfo['donate_balance']).'R';
	}
	return $message;
	
}
function GetSkillsUser(){
	global $UserInfo,$Nick;
	$UserSkills = json_decode($UserInfo['skills'],1);
	$str .= 'Ваши умения: <br>';
	if(!empty($UserSkills)){
		for($i=0;$i<count($UserSkills['skills']);$i++){
			$str .= SwitchSkills($UserSkills['skills'][$i]).'<br>';
			
		}
		SetFieldF('skills',0);
		return $str;
	}else{
		return 'У вас нет умений';
	}
}
function SwitchSkills($skill){
	switch($skill){
		case 'auto_farm':
		return 'Автосбор с ферм ';
		break;
		case 'auto_buisness':
		return 'Автосбор с бизнеса';
		break;
	}
}
function GetSkills(){
	global $mysqli,$UserInfo;
	$data = $mysqli->query('SELECT * FROM `skills`');
	$UserSkills = json_decode($UserInfo['skills'],1);
	while(($row = $data->fetch_assoc()) != false){
		if(in_array($row['value'],$UserSkills['skills'])){
			$emoji = '🔹';
		}else{
			$emoji = '🔸';
		}
		$str .= $emoji.$row['id'].'.'.$row['name'].' ('.ConvertValute($row['price']).'R)<br>';
	}
	return $str;
}
function BuyDonat($id){
	global $UserInfo,$Nick;
	$id *=1;
	switch ($id){
		case 1:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(9)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(9));
			SetFieldF('balance',$UserInfo['balance']+(pow(10,9)*5));
			$message = $Nick.', вы купили 5ккк$';
		}
		break;
		case 2:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(65)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(65));
			SetFieldF('balance',$UserInfo['balance']+(pow(10,9)*50));
			$message = $Nick.', вы купили 50ккк$';
		}
		break;
		case 3:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(100)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(100));
			SetFieldF('balance',$UserInfo['balance']+(pow(10,9)*140));
			$message = $Nick.', вы купили 140ккк$';
		}
		break;	
		case 4:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(150)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(180));
			SetFieldF('balance',$UserInfo['balance']+(pow(10,9)*300));
			$message = $Nick.', вы купили 300ккк$';
		}
		break;
		case 5:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(230)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(250));
			SetFieldF('balance',$UserInfo['balance']+(pow(10,12)));
			$message = $Nick.', вы купили 1кккк$';
		}
		break;
		case 6:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(400)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(450));
			SetFieldF('balance',$UserInfo['balance']+(pow(10,12)*15));
			$message = $Nick.', вы купили 15кккк$';
		}
		break;
		case 7:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(135)){
			if($UserInfo['role'] == 1){
				SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(150));
				SetFieldF('role',2);
				SetFieldF('BTC',$UserInfo['BTC']+pow(10,3)*3);
				SetFieldF('TPC',$UserInfo['TPC']+pow(10,3)*3);
				SetFieldF('balance',$UserInfo['balance']+pow(10,9)*3);
				$message = $Nick.', вы купили VIP.<br>
				💷+3.000TPC
				🌐+3.000BTC
				💰+3.000.000.000$
				<br> Просмотреть список команд "cmd"';
			}else{
				$message = $Nick.', ваша роль выше VIP.';
			}
		}
		break;
		case 8:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(1100)){
			if($UserInfo['role'] <= 2){
				SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(1700));
				SetFieldF('role',3);
				$message = $Nick.', вы купили Admin статус.<br> Просмотреть список команд "cmd"';
			}else{
				$message = $Nick.', ваша роль выше Admin.';
			}
		}
		break;
		case 9:
		if($UserInfo['donate_balance']>=CalculateProzentDonat(50)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']-CalculateProzentDonat(50));
			SetFieldF('banned',0);
			SetFieldF('bantime',0);	
			$message = $Nick.', вы разбанены!';
		}
		break;
		default:
		$message = $Nick.', неверный номер.';
		break;
	}
	if(empty($message)){
		$message = $Nick.', недостаточно денег ваша донатка: '.ConvertValute($UserInfo['donate_balance']).' R';
	}
	return $message;
}
function GetNelegalInfo(){
	$tovar = file('nelegal_game/tovar.txt');
	$peredan_tovar = file('nelegal_game/peredan_tovar.txt');
	$otvoz = file('nelegal_game/otvoz.txt');
	return 
	"
	Сделано химиком: ".ConvertValute($tovar[0])."
	Передано  кладовщиком: ".ConvertValute($peredan_tovar[0])."
	Доставлено развозчиком: ".ConvertValute($otvoz[0]);
	;
}
function WorkNelegalJob($str){
	global $UserInfo,$Nick;
	$time =  $UserInfo['nelegal_time'];
	$lvl = $UserInfo['lvl'];
	$Count = $lvl/10;
	
	$reward = (100000000*$lvl);
	if($UserInfo['pet_id']!=0){
		$PetInfo = PetInfo($UserInfo['pet_id']);
		$PetInfo = explode(' ',$PetInfo);
		$pet_bonuse = $PetInfo[1];
		$Ba = "🐍Доп. бонус питомца: ".ConvertValute($pet_bonuse*$reward)."$";
	}else{
		$Ba = '';
		$pet_bonuse = 0;
	}
	$Reward = ($reward)+($pet_bonuse*$reward);
	if($UserInfo['role'] <= 2){
		if(CheckTime($time) == 'ok' || CheckTime($time) == '00'){
			if($UserInfo['nelegal_role'] == 1 && $str == "изготовить товар"){
				ClearWritePlus($Count*2,'nelegal_game/tovar.txt');
				SetFieldF('balance',$UserInfo['balance']+$Reward+$pet_bonuse);
				SetFieldF('nelegal_time',time()+86400);
				$ok = 1;
				$message = $Nick.', вы изготовили '.($Count*3).'т  товара за '.ConvertValute($reward+$pet_bonuse).'$<br>'.$Ba.'<br>💰Баланс: '.ConvertValute($UserInfo['balance']+$Reward).'$';
			}elseif($UserInfo['nelegal_role'] == 2 && $str == "передать товар"){
				$file = file('nelegal_game/tovar.txt');
				if($file[0]>=$Count/6 && $file[0]-$Count>=1){
					$Count = $file[0]/6;
				}else{
					return $Nick.', приходите позже';
				}
				ClearWritePlus($Count,'nelegal_game/peredan_tovar.txt');
				ClearWriteMinus($Count,'nelegal_game/tovar.txt');
				SetFieldF('balance',$UserInfo['balance']+$Reward);
				SetFieldF('nelegal_time',time()+7200);
				$message = $Nick.', вы передали '.$Count.'т  товара за '.ConvertValute($reward).'$<br>'.$Ba.'<br>💰Баланс: '.ConvertValute($UserInfo['balance']+$Reward).'$';
				
			}elseif($UserInfo['nelegal_role'] == 3 && $str == "доставить товар"){
				$file = file('nelegal_game/peredan_tovar.txt');
				if($file[0]>=$Count/6 && $file[0]-$Count>=1){
					$Count = $file[0]/6;
				}else{
					return $Nick.', приходите позже';
				}
				ClearWritePlus($Count,'nelegal_game/otvoz.txt');
				ClearWriteMinus($Count,'nelegal_game/peredan_tovar.txt');
				SetFieldF('balance',$UserInfo['balance']+$Reward+($pet_bonuse*$reward));
				SetFieldF('nelegal_time',time()+7200);
				$message = $Nick.', вы доставили '.$Count.'т  товара за '.ConvertValute($reward+($pet_bonuse*$reward)).'$<br>'.$Ba.'<br>💰Баланс: '.ConvertValute($UserInfo['balance']+$Reward).'$';
			
			
			}elseif($UserInfo['nelegal_role'] == 4 && $str == "продать товар"){
				$file = file('nelegal_game/otvoz.txt');
				if($file[0]>=$Count/6 && $file[0]-$Count>=1){
					$Count = $file[0]/6;
				}else{
					return $Nick.', приходите позже';
				}
				ClearWriteMinus($Count,'nelegal_game/otvoz.txt');
				SetFieldF('balance',$UserInfo['balance']+$Reward+($pet_bonuse*2*$reward));
				SetFieldF('nelegal_time',time()+28800);
				$message = $Nick.', вы продали '.$Count.'т  товара за '.ConvertValute($reward+($pet_bonuse*2*$reward)).'$<br>'.$Ba.'<br>💰Баланс: '.ConvertValute($UserInfo['balance']+$Reward).'$';
			
			}else{
				return $Nick.', роль не соответствует работе.';
			}
			
		}else{
			$message = $Nick.', вы сможете '.SwitchWorkNelegal().' товар через: '.CheckTime($time);
		}
	}
	return $message;
}
function SwitchWorkNelegal(){
	global $UserInfo,$Nick;
	switch ($UserInfo['nelegal_role']){
		case 1:
		$work = "изготовить";
		break;
		case 2:
		$work =  "передать";
		break;
		case 3:
		$work =  "доставить";
		break;
		case 4:
		$work =  "продать";
		break;
	}
	return $work;
}
function SelectNelegalRole($num){
	global $UserInfo,$Nick;
	if(empty($UserInfo['nelegal_role'])){
		if($UserInfo['lvl']>=5){
			if($num>0 && $num<=4 ){
				SetFieldF('nelegal_role',$num);
				$message = $Nick.', теперь вы: '.SwitchNelegalRole($num);
			}else{
				$message = $Nick.', неверный номер.';
			}
		}else{
			$message = $Nick.', требуемый уровень 5.';
		}
	}else{
		$message = $Nick.', вы уже выбрали роль.<br>Ваша роль: '.SwitchNelegalRole($UserInfo['nelegal_role']).'.';
	}
	return $message;
}
function SwitchNelegalRoleJob(){
	global $UserInfo,$Nick;
	switch ($UserInfo['nelegal_role']){
		case 1:
		$job =  $Nick.', для того чтобы работать напишите "нелегал изготовить товар".';
		break;
		case 2:
		$job =  $Nick.', для того чтобы работать напишите "нелегал передать товар".';
		break;
		case 3:
		$job =  $Nick.', для того чтобы работать напишите "нелегал доставить товар".';
		break;
		case 4:
		$job =  $Nick.', для того чтобы работать напишите "нелегал продать товар".';
		break;
	}
	return $job;
}
function SwitchNelegalRole($num){
	switch ($num){
		case 1:
		$role =  'Химик';
		break;
		case 2:
		$role =  'Кладовщик';
		break;
		case 3:
		$role =  'Развозчик';
		break;
		case 4:
		$role =  'Продавец';
		break;
	}
	return $role;
}
function GetNelegalRoles(){
	global $Nick;
	return 
	$Nick.', вы можете выбрать роль только 1 раз.
	1.Химик - работает над производством запрещенных товаров.
	2.Кладовщик - передает запрещенные товары развозчику.
	3.Развозчик - перевозит запрещенные товары заказчику.
	4.Продавец - продает товары.
	Для выбора роли напишите "нелегал [номер]"
	';
}
function BuyPet($id){
	global $UserInfo,$Nick;
	$PetInfo = PetInfo($id);
	if($PetInfo != false){
		$PetInfo = explode(' ', $PetInfo);
		if($UserInfo['pet_id']==0){
			if($PetInfo[0]<= $UserInfo['balance']){
				SetFieldF('pet',$PetInfo[2]);
				SetFieldF('pet_id',$id);
				SetFieldF('balance',$UserInfo['balance']-$PetInfo[0]);
				$message = $Nick.', вы купили питомца: "'.$PetInfo[2].'" за '.ConvertValute($PetInfo[0]).'$';
			}else{
				$message = $Nick.', недостаточно денег.';
			}
		}else{
			$message = $Nick.', сначала продайте своего питомца.';
		}
	}else{
		$message = $Nick.', неверный номер.';
	}
	return $message;
}
function SellPet(){
	global $UserInfo,$Nick;
	if($UserInfo['pet_id'] !=0){
		$PetInfo = PetInfo($UserInfo['pet_id']);
		$PetInfo = explode(' ', $PetInfo);
		SetFieldF('pet','');
		SetFieldF('pet_id',0);
		SetFieldF('balance',$UserInfo['balance']+($PetInfo[0]*0.75));
		$message = $Nick.', вы продали питомца: "'.$PetInfo[2].'" за '.ConvertValute($PetInfo[0]*0.75).'$';
	}else{
		$message =  $Nick.', у вас нет питомца.';
	}
	return $message;
}
function GetPet(){
	global $Nick;
	return $Nick.
	', список питомцев:(цена/прибыль ежедневного бонуса)<br>'.
	'🐰1.Мышь(1.000.000$/1%)<br>'.
	'🐹2.Хомяк(10.000.000$/3%)<br>'.
	'🐱3.Кот(105.000.000$/7%)<br>'.
	'🦊4.Лиса(505.000.000$/10%)<br>'.
	'🐶5.Собака(900.000.000$/14%)<br>'.
	'🐯6.Тигр(1.000.000.000$/19%)<br>'.
	'🦁7.Лев(150.000.000.000$/25%)<br>'.
	'🐵8.Обезьяна(400.000.000.000$/28%)<br>'.
	'🐺9.Волк(500.000.000.000$/34%)<br>'.
	'🦄10.Единорог(700.000.000.000$/37%)<br>'.
	'🐊11.Крокодил(900.000.000.000$/40%)<br>'.
	'🐍12.Змея(1.000.000.000.000$/45%)<br>';
}
function PetInfo($id){
	switch($id){
		case '1':
		$message = (1000000).' '.(0.1).' 🐰Мышь';
		break;
		case '2':
		$message = (10000000).' '.(0.3).' 🐹Хомяк';
		break;
		case '3':
		$message = (105000000).' '.(0.7).' 🐱Кот';
		break;
		case '4':
		$message = (505000000).' '.(0.10).' 🦊Лиса';
		break;
		case '5':
		$message = (900000000).' '.(0.14).' 🐶Собака';
		break;
		case '6':
		$message = (1000000000).' '.(0.19).' 🐯Тигр';
		break;
		case '7':
		$message = (150000000000).' '.(0.25).' 🦁Лев';
		break;
		case '8':
		$message = (400000000000).' '.(0.28).' 🐵Обезьяна';
		break;
		case '9':
		$message = (500000000000).' '.(0.34).' 🐺Волк';
		break;
		case '10':
		$message = (700000000000).' '.(0.37).' 🦄Единорог';
		break;
		case '11':
		$message = (900000000000).' '.(0.40).' 🐊Крокодил';
		break;
		case '12':
		$message = (1000000000000).' '.(0.45).' 🐍Змея';
		break;
		default:
		return false;
		break;
	}
	return $message;
}
function GetGift(){
	global $UserInfo,$userId,$Nick,$AdminId;
	$Day = $UserInfo['gift_day'];
	if($Day  > 30){
		SetFieldF('gift_day',1);
		$Day = 1;
	}
	if(CheckTime($UserInfo['gift_time']*1) == 'ok' || CheckTime($UserInfo['gift_time']*1) == '00' || $userId == $AdminId[0]){
		$rew = file('files/gift.txt');
		$Reward = $Day*$rew[0];
		SetFieldF('balance',$UserInfo['balance']+$Reward);
		SetFieldF('gift_time',time()+86400);
		SetFieldF('gift_day',$Day+1);
		return $Nick.', вы получили 🎁подарок от админа🎁: '.ConvertValute($Reward).'$ день ['.$Day.'/30]<br>❗Заходите каждый день чтобы получить больше!';
	}else{
		return $Nick.', вы сможете получить подарок через: '.CheckTime($UserInfo['gift_time']);
	}
	
}
function GetDaysJob(){
	global $mysqli,$UserInfo;
	$GetJobInfo = GetJobInfo($UserInfo['job_id']);
	$DB = $mysqli->query("SELECT * FROM `jobs` WHERE `exp`> '".($UserInfo['job_exp'])."';");
	$DB = $DB->fetch_assoc();
	$days = $DB['exp']-$UserInfo['job_exp'];
	if($days >0){
		return $DB['name'].'|'.$days;
	}
}
function CheckNewJob(){
	global $UserInfo;
	$WorkInfo = GetJobInfo($UserInfo['job_id']+1);
	$CheckWorkTime = CheckTimeJob();
	if (!$CheckWorkTime){
		if($UserInfo['job_exp'] == $WorkInfo['exp'] && $UserInfo['job_exp'] !=1){
			$message = '<br>Доступна новая работа: "'.$WorkInfo['name'].'"';
		}
	}
	return $message;
}

function QuitJob(){
	global $UserInfo,$Nick;
	if (!empty($UserInfo['job_id'])){
		SetFieldF('job_id',0);
		$message = $Nick.', вы уволились с работы.';
	}else{
		$message = $Nick.', вы нигде не работаете.';
	}
	return $message;
}
function GetJob($id){
	global $UserInfo,$Nick;
	$WorkInfo = GetJobInfo($id);
	if (empty($UserInfo['job_id'])){
		if($WorkInfo && $UserInfo['job_exp']>=$WorkInfo['exp']){
			SetFieldF('job_id',$WorkInfo['id']);
			$message = $Nick.', вы устроились на работу: "'.$WorkInfo['name'].'"';
		}else{
			$message = $Nick.', введите корректный номер работы';
		}
	}else{
		$message = $Nick.', у вас может быть только 1 работа.';
	}
	return $message;
}
function GetNameJob($id){
	global $mysqli;
	$request = $mysqli->query("SELECT * FROM `jobs` WHERE `id` =".$id."");
	$job = $request->fetch_assoc();
	return $job['name'];
}
function WorkJob(){
	$CheckWorkTime = CheckTimeJob();
	global $UserInfo,$Nick;
	$WorkInfo = GetJobInfo($UserInfo['job_id']);
	$Income = $WorkInfo['income']+rand(-150,200);
	$ClanBonuse = IncludeBonuse($Income,'bonuse_job_lvl');
	$Income = $Income+($Income*($UserInfo['lvl']/100));
	$ClanBonuseText = MessageBonuse($ClanBonuse);
	
	if (!empty($UserInfo['job_id'])){
		if (!$CheckWorkTime){
				$dd = GetDaysJob();
				if(!empty($dd)){
					$dd = explode('|',$dd);	
					$WorkDays = '<br>⏳Осталось '.$dd[1].' дней до работы "'.$dd[0].'".'; 	
				}
				if (($UserInfo['count_job'])>=6){
					if($UserInfo['role']>=2){
						SetFieldF('time_job',time()+2400);
					}else{
						SetFieldF('time_job',time()+3600);
					}
					SetFieldF('count_job',0);
					SetFieldF('balance',$UserInfo['balance']+$Income);
					SetFieldF('job_exp',$UserInfo['job_exp']+1);
					AddCompleteTask(8,1);
					return $Nick.', за этот день вы заработали: '.ConvertValute($Income)."$".$WorkDays.$ClanBonuseText.' ';
				}
				AddCompleteTask(8,1);
				SetFieldF('job_exp',$UserInfo['job_exp']+1);
				SetFieldF('count_job',$UserInfo['count_job']+1);
				SetFieldF('balance',$UserInfo['balance']+$Income+$ClanBonuse);
				$message = $Nick.', за этот день вы заработали: '.ConvertValute($Income)."$".$WorkDays.$ClanBonuseText;
				
		}else{
			$message = $Nick.', вы сможете работать через: '.$CheckWorkTime;
		}
	}else{
		$message = $Nick.', вы нигде не работаете.';
	}
	return $message;
}
function CheckTimeJob(){
	global $UserInfo;
	$Hours = CheckTime($UserInfo['time_job']);
	if($Hours == 'ok' || $Hours == '00'){
		//SetFieldF('time_job',0);
		return false;
	}else{
		return $Hours;
	}
}
function GetJobList(){
	global $UserInfo,$Nick,$mysqli;
	$Data = $mysqli->query("SELECT * FROM `jobs` ");
	while(($row = $Data->fetch_assoc()) !=false){
		if ($UserInfo['job_exp']>=$row['exp']){
			if($UserInfo['job_id'] != $row['id']){
				$chr = '🔸';
			}else{
				$chr = '🔹';
			}
			$str .= $chr.$row['id'].'.'.$row['name'].' ~ '.ConvertValute($row['income'])."$<br>";
		}
	}
	$str .= 'Для того чтобы устроиться напишите "работа [номер]"';
	return $str;
}
function GetJobInfo($id){
	$k = 0;
	global $mysqli;
	$Data = $mysqli->query("SELECT * FROM `jobs` ");
	while(($row = $Data->fetch_assoc()) !=false){
		if ($row['id'] == $id){
			$k = 1;
			return $row;
		}
	}
	if($k!=1){return false;}
}
function GetFarmTPCShop($DB){
	global $mysqli;
	$Data = $mysqli->query("SELECT * FROM `".$DB."` ");
	$str = '';
	while(($row = $Data->fetch_assoc()) !=false){
		if ($row['id']>4){return $str;}
		$str.= $row['id'].')'.' '.$row['name'].' '.$row['production'].'tpc/hour '.number_format($row['price'],0,'.','.')."$<br>";
		
	}
	return $str;
}
function FarmAssembleTPC(){
	global $UserInfo,$Nick,$userId;
	$Hours = CheckHour($UserInfo['time_farmTPC']);
	$Hours = explode (' ',$Hours);
	if($UserInfo['count_farmTPC']>0){
		if ($Hours[1]=='ok'){
			$InfoTpc = GetSubjectShopInfo('farmTPC',$UserInfo['id_farmTPC'],'production')*$Hours[0]*$UserInfo['count_farmTPC'];
			$ClanBonuse = IncludeBonuse($InfoTpc,'bonuse_farm_lvl');
			$ClanBonuseText = MessageBonuse($ClanBonuse,'TPC');
			SetField('TPC',$UserInfo['TPC']+$InfoTpc+$ClanBonuse,$userId);
			SetField('time_farmTPC',time(),$userId);
			AddCompleteTask(3,$InfoTpc);
			$message = $Nick.',вы собрали: '.ConvertValute($InfoTpc)." TPC".$ClanBonuseText;
		}else{
			$message = $Nick.', приходите через: '.CheckHour($UserInfo['time_farmTPC']);
		}
	}else{
		$message = $Nick.', у вас нет ферм.';
	}
	return $message;
}
function BuyFarmTPC($count,$id_farm){
	global $UserInfo,$Nick,$userId;
	$id_farm = GetSubjectShopInfo('farmTPC',$id_farm,'id');
	$name_farm = GetSubjectShopInfo('farmTPC',$id_farm,'name');
	$price_farm = GetSubjectShopInfo('farmTPC',$id_farm,'price');
	if ($count>0){
		if($id_farm<=3 && $id_farm>0){
			if(!($UserInfo['count_farmTPC']+$count>500)){
					if($id_farm <=4){
						if($UserInfo['count_farmTPC']<=500){
							if($UserInfo['id_farmTPC'] == $id_farm || $UserInfo['id_farmTPC'] == 0){
								if ($UserInfo['balance'] >= GetSubjectShopInfo('farmTPC',$id_farm,'price')*$count){
									SetField('id_farmTPC',$id_farm,$userId);
									SetField('name_farmTPC',$name_farm,$userId);
									SetField('balance',$UserInfo['balance']-$price_farm*$count,$userId);
									SetField('count_farmTPC',$UserInfo['count_farmTPC']+$count,$userId);
									SetField('time_farmTPC',time(),$userId);
									$message = $Nick.', вы купили ферму: '.$name_farm.' (x'.$count.') за '.ConvertValute($price_farm*$count).'$';
								}else{
									$message = $Nick.', недостаточно денег.';
								}
							}else{
								$message = $Nick.', вы не можете купить другую ферму.';
							}
						}else{
							$message = $Nick.', вы не можете купить больше 500 ферм.';
						}
					}
				}else{
					$message = $Nick.', вы не можете купить больше 500 ферм.';
				}
		}
	}
	return $message;
}
function SellFarmTPC($count){
	$message ='';
		global $Nick,$UserInfo,$balance;
		if (empty($count)){
			$count = 1;
		}
		if($UserInfo['count_farmTPC']-$count <0 ){
			return $Nick.', у вас нет столько ферм.';
		}
		$sub_id = $UserInfo['id_farmTPC'];
		$price = GetSubjectShopInfo('farmTPC',$sub_id,'sell_price')*$count;
		if ($count>0){
			if(!empty($UserInfo['id_farmTPC']) && $UserInfo['count_farmTPC']>0){
				SetFieldF('count_farmTPC',$UserInfo['count_farmTPC']-$count);
				if($UserInfo['count_farmTPC']-$count == 0 ){
					SetFieldF('id_farmTPC',0);
					SetFieldF('name_farmTPC',null);
				}
				SetFieldF('balance',$balance+$price);
				$message = $Nick.', вы продали фермы (x'.$count.'): за '.number_format($price,0,'.','.')."$";
			}else{
				$message = $Nick.', у вас нет ферм.';
			}
		}
		return $message;
}
function SetTpcPrice(){
	$file = file('files/tpc.txt');
	$filebtc = file('files/bitcoin.txt');
	$f = fopen('files/tpc.txt','w+');
	fwrite($f,$filebtc[0]*20);
	fclose($f);
	
	
}
function TpcPrice(){
	$priceTPC = file('files/tpc.txt');
	return number_format($priceTPC[0], 2, ',', '');
}
function BuyTPC($count){
	global $UserInfo,$Nick;
	
	$priceTPC = file('files/tpc.txt');
	if(empty($count)){
		$count = floor($UserInfo['balance']/$priceTPC[0]);
	}
	$priceTPC = $count*$priceTPC[0];
	if(($UserInfo['BTC']+$Count)<10000000000000){
		if ($UserInfo['balance']>= $priceTPC ){
			if($count>0){
				SetFieldF('balance',$UserInfo['balance']-$priceTPC);
				SetFieldF('TPC',$UserInfo['TPC']+$count);
				$message = $Nick.', вы купили '.ConvertValute($count).' TPC за '.ConvertValute($priceTPC).'$';
			}
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}
	return $message;
}
function SellTPC($count){
	global $UserInfo,$Nick;
	if (empty($count)){$count=$UserInfo['TPC'];}
	if ($UserInfo['TPC']>=$count && $UserInfo['TPC']> 0){
		$priceTPC = file('files/tpc.txt');
		$priceTPC = $count*$priceTPC[0];
		SetFieldF('balance',$UserInfo['balance']+$priceTPC);
		SetFieldF('TPC',$UserInfo['TPC']-$count);
		AddCompleteTask(11,$count);
		$message = $Nick.', вы продали '.ConvertValute($count).' TPC за '.ConvertValute($priceTPC).'$';
	}else{
		$message = $Nick.', у вас нету столько TPC';
	}
	return $message;
	
}
function BuisnessStats(){
	global $UserInfo,$Nick;
	$message = '';
	if(!empty($UserInfo['buisness']) && !empty($UserInfo['buisness_id'])){	
		$BalanceBuisness = CheckBalanceBuisness();
		$Buisness = GetBuisnessInfo($UserInfo['buisness_id']);
		$BuisnessUpgradePrice = $Buisness['price']*$UserInfo['buisness_lvl']*7;
		$message = $Nick.', ваш бизнес: "'.$UserInfo['buisness'].'":<br>'.
		'💷Прибыль: '.ConvertValute($UserInfo['buisness_income']).'$<br>'.
		'🕹️Lvl: '.ConvertNumberEmoji($UserInfo['buisness_lvl']).'<br>'.
		'🏧На счетё: '.ConvertValute($BalanceBuisness).'$';
		if($UserInfo['balance']>=$BuisnessUpgradePrice && $UserInfo['buisness_lvl']<4){
			$message.= '<br>✅Доступно улучшение!('.ConvertValute($BuisnessUpgradePrice).'$)';
		}
	}else{
		$message = $Nick.', у вас нет бизнеса.';
	}
	return $message;
}
function CheckBalanceBuisness(){
	global $UserInfo;
	$Hours = CheckHour($UserInfo['buisness_time']);
	$Hours = explode (' ',$Hours);
	if($Hours[1] == 'ok'){
		if($Hours[0]>24){
			return $UserInfo['buisness_income']*24;
		}else{
			return $UserInfo['buisness_income']*$Hours[0];
		}
	}else{
		return 0;
	}
}
function BuisnessAssemble(){
	global $UserInfo,$Nick;
	$Hours = CheckHour($UserInfo['buisness_time']);
	$Hours = explode (' ',$Hours);
	if(!empty($UserInfo['buisness']) && !empty($UserInfo['buisness_id'])){
		if($Hours[1] == 'ok'){
			$BalanceBuisness = CheckBalanceBuisness();
			$ClanBonuse = IncludeBonuse($BalanceBuisness,'bonuse_buisness_lvl');
			$ClanBonuseText = MessageBonuse($ClanBonuse);
			SetFieldF('balance',$UserInfo['balance']+$BalanceBuisness+$ClanBonuse);
			SetFieldF('buisness_time',time());
			$message = $Nick.', вы собрали со своего бизнеса '.ConvertValute($BalanceBuisness).'$'.$ClanBonuseText;
		}else{
			$message = $Nick.', на счету вашего бизнеса еще нечего нет.';
		}
	}else{
		$message = $Nick.', у вас нет бизнеса.';
	}
	return $message;
}
function BuisnessUpgrade(){
	global $UserInfo,$Nick;
	if(!empty($UserInfo['buisness']) && !empty($UserInfo['buisness_id'])){
		$Buisness = GetBuisnessInfo($UserInfo['buisness_id']);
		$BuisnessUpgradePrice = $Buisness['price']*$UserInfo['buisness_lvl']*7;
		if($UserInfo['balance']>=$BuisnessUpgradePrice){
			if($UserInfo['buisness_lvl']<4){
				SetFieldF('balance',$UserInfo['balance']-$BuisnessUpgradePrice);
				SetFieldF('buisness_lvl',$UserInfo['buisness_lvl']+1);
				SetFieldF('buisness_income',$Buisness['lvl_'.($UserInfo['buisness_lvl']+1)]);
				$message = $Nick.', вы улучшили свой бизнес до ('.($UserInfo['buisness_lvl']+1).' LVL) ';
			}else{
				$message = $Nick.', у вас максимальный уровень бизнеса.';
			}
		}else{
			$message = $Nick.', недостаточно денег.<br>Требуется для улучшения: '.
			ConvertValute($BuisnessUpgradePrice).'$
			💰Баланс: '.ConvertValute($UserInfo['balance']).'$';
		}
		
	}else{
		$message = $Nick.', у вас нет бизнеса.';
	}
	return $message;
	
}
function GetBuisnessPrice($lvl,$price){
	for($i=1;$i<=$lvl;$i++){
		$Reward += $price*$i;
	}
	return $Reward*0.8;
}
function BuisnessSell(){
	global $UserInfo,$Nick;
	if(!empty($UserInfo['buisness']) && !empty($UserInfo['buisness_id'])){
		$Buisness = GetBuisnessInfo($UserInfo['buisness_id']);
		$BuisnessName = $Buisness['name'];
		$BuisnessSellPrice = GetBuisnessPrice($UserInfo['buisness_lvl'],$Buisness['price']);
		SetFieldF('balance',$UserInfo['balance']+$BuisnessSellPrice);
		SetFieldF('buisness',0);
		SetFieldF('buisness_income',0);
		SetFieldF('buisness_lvl',1);
		SetFieldF('buisness_id',0);
		$message = $Nick.', вы продали свой бизнес "'.$UserInfo['buisness'].'" за '.ConvertValute($BuisnessSellPrice).'$';
	}else{
		$message = $Nick.', у вас нет бизнеса.';
	}
	return $message;
}
function AddBuisness($id){
	global $UserInfo,$Nick;
	$Buisness = GetBuisnessInfo($id);
	if($id<=CountBuisness() && $id>0){
		if($UserInfo['balance']>=$Buisness['price']){
			if(empty($UserInfo['buisness']) && empty($UserInfo['buisness_id'])){
				SetFieldF('balance',$UserInfo['balance']-$Buisness['price']);
				SetFieldF('buisness',$Buisness['name']);
				SetFieldF('buisness_income',$Buisness['income']);
				SetFieldF('buisness_lvl',1);
				SetFieldF('buisness_time',time());
				SetFieldF('buisness_id',$Buisness['id']);
				$message = $Nick.', вы купили бизнес: "'.$Buisness['name'].'" за '.ConvertValute($Buisness['price'])."$";
				
			}else{
				$message = $Nick.', у вас может быть только 1 бизнес.';
			}
		}else{
			$message = $Nick.', недостаточно денег.<br>💰Баланс: '.ConvertValute($UserInfo['balance']).'$';
		}
	}else{
		$message = $Nick.', введите корректный номер.';
	}
	return $message;
}
function CountBuisness(){
	global $mysqli;
	$k=0;
	$select = $mysqli->query("SELECT * FROM `buisness`");
	while(($row = $select->fetch_assoc()) !=false){
		$k+=1;
	}
	return $k;
}
function GetBuisnessInfo($id){
	global $mysqli;
	$buisness = $mysqli->query("SELECT * FROM `buisness` WHERE `id`=".$id);
	return $buisness->fetch_assoc();
	
}
function GetBuisnessList(){
	global $UserInfo,$mysqli;
	$message = 'Список бизнесов: [доход(час)/цена]<br>';
	$select = $mysqli->query("SELECT * FROM `buisness`");
	while(($row = $select->fetch_assoc()) !=false){
		if($UserInfo['buisness_id'] != $row['id']){
			$chr = '🔸';
		}else{
			$chr = '🔹';
		}
		
		$message .= $chr.$row['id'].'.'.$row['name'].' ('.ConvertValute($row['income']).'$/'.ConvertValute($row['price']).'$)<br>';
	}
	$message .= 'Для покупки бизнеса напишите "Бизнесы [номер]"';
	return $message;
}
function Bonuse(){
	global $userId,$BTC,$UserInfo,$Nick,$balance;
	$lvl = $UserInfo['lvl'];
	$lvl_bonuse = $lvl/100;
	if(empty($UserInfo['id_farm'])){
		$id_farm = 1;
	}else{
		$id_farm = $UserInfo['id_farm'];
	}
	if(empty($UserInfo['id_farmTPC'])){
		$id_farmTPC = 1;
	}else{
		$id_farmTPC = $UserInfo['id_farmTPC'];
	}
	$name_farm = GetSubjectShopInfo('farm',$id_farm,'name');
	$name_farmTPC = GetSubjectShopInfo('farmTPC',$id_farmTPC,'name');
	if (CheckTime($UserInfo['time_bonuse']*1) == 'ok' || CheckTime($UserInfo['time_bonuse']*1) == '00' || $userId == 212198981){
		$Bonuse = GetBonus();
		$Bonuse = explode (' ', $Bonuse);
		if($UserInfo['pet_id']!=0){
			$PetInfo = PetInfo($UserInfo['pet_id']);
			$PetInfo = explode(' ',$PetInfo);
			$pet_bonuse = $PetInfo[1];
			$Ba = "🐍Доп. бонус питомца: ".ConvertValute($pet_bonuse*$Bonuse[0]);
		}else{
			$Ba = '';
			$pet_bonuse = 0;
		}
		if ($UserInfo['role']>=2){
			$Bonuses = 2000000000;
			if($UserInfo['pet_id']!=0){
				$Ba = "🐍Доп. бонус питомца: ".ConvertValute($pet_bonuse*$Bonuses);
			}
			SetFieldF('time_bonuse',time()+64800);
			SetFieldF('balance',$balance+$Bonuses+floor($pet_bonuse*$Bonuses)+floor($lvl_bonuse*$Bonuses));
			return $Nick.', вы выиграли: '.ConvertValute($Bonuses)."$<br>".'💥Бонус уровня: '.ConvertValute($lvl_bonuse*$Bonuses).'$<br>'.$Ba.'$';		
		}
		
		if ($Bonuse[1] == 'money'){
			SetFieldF('time_bonuse',time()+64800);
			SetFieldF('balance',$balance+$Bonuse[0]+floor($pet_bonuse*$Bonuse[0])+floor($lvl_bonuse*$Bonuse[0]));
			$message = $Nick.', вы выиграли: '.ConvertValute($Bonuse[0])."$<br>".'💥Бонус уровня: '.ConvertValute($lvl_bonuse*$Bonuse[0]).'$<br>'.$Ba.'';		
		}elseif($Bonuse[1] == 'farm'){
			SetFieldF('time_bonuse',time()+64800);
			SetFieldF('time_farm',time()+3600);
			SetFieldF('id_farm',$id_farm);
			SetFieldF('name_farm',$name_farm);
			SetFieldF('count_farm',$UserInfo['count_farm']+$Bonuse[0]);
			$message = $Nick.', вы выиграли: '.ConvertValute($Bonuse[0]*1)." ферм ".$name_farm;	
		}elseif($Bonuse[1] == 'farmTPC'){
			SetFieldF('time_bonuse',time()+64800);
			SetFieldF('id_farmTPC',$id_farmTPC);
			SetFieldF('time_farmTPC',time()+3600);
			SetFieldF('count_farmTPC',$UserInfo['count_farmTPC']+$Bonuse[0]);
			SetFieldF('name_farmTPC',$name_farmTPC);
			$message = $Nick.', вы выиграли: '.ConvertValute($Bonuse[0]*1)." ферм ".$name_farmTPC;
		}elseif($Bonuse[1] == 'donate'){
			SetFieldF('time_bonuse',time()+64800);
			SetFieldF('donate_balance',$UserInfo['donate_balance']+$Bonuse[0]);
			$message = $Nick.', вы выиграли: '.ConvertValute($Bonuse[0])."R<br>";	
		}elseif($Bonuse[1] == 'btc'){
			SetFieldF('time_bonuse',time()+64800);
			SetFieldF('BTC',$BTC+$Bonuse[0]+floor($pet_bonuse*$Bonuse[0]));
			$message = $Nick.', вы выиграли: '.ConvertValute($Bonuse[0]*1)."BTC<br>".$Ba.'BTC';	
		}
	}else{
		$message = $Nick.', вы можете получить бонус через '.CheckTime($UserInfo['time_bonuse']);
	}
	return $message;
}
function BuyFarm($count,$id_farm){
	global $UserInfo,$Nick,$userId;
	$id_farm = GetSubjectShopInfo('farm',$id_farm,'id');
	$name_farm = GetSubjectShopInfo('farm',$id_farm,'name');
	$price_farm = GetSubjectShopInfo('farm',$id_farm,'price');
	if ($count>0){
		if($id_farm<=4 && $id_farm>0){
			if(!($UserInfo['count_farm']+$count>1250)){
					if($id_farm <=4){
						if($UserInfo['count_farm']<=1250){
							if($UserInfo['id_farm'] == $id_farm || $UserInfo['id_farm'] == 0){
								if ($UserInfo['balance'] >= GetSubjectShopInfo('farm',$id_farm,'price')*$count){
									SetField('id_farm',$id_farm,$userId);
									SetField('name_farm',$name_farm,$userId);
									SetField('balance',$UserInfo['balance']-$price_farm*$count,$userId);
									SetField('count_farm',$UserInfo['count_farm']+$count,$userId);
									SetField('time_farm',time(),$userId);
									$message = $Nick.', вы купили ферму: '.$name_farm.' (x'.$count.') за '.ConvertValute($price_farm*$count).'$';
								}else{
									$message = $Nick.', недостаточно денег.';
								}
							}else{
								$message = $Nick.', вы не можете купить другую ферму.';
							}
						}else{
							$message = $Nick.', вы не можете купить больше 1250 ферм.';
						}
					}
				}else{
					$message = $Nick.', вы не можете купить больше 1250 ферм.';
				}
		}
	}
	return $message;
}
function FarmAssemble(){
	global $UserInfo,$Nick,$BTC,$userId;
	$Hours = CheckHour($UserInfo['time_farm']);
	$Hours = explode (' ',$Hours);
	if($Hours[0]>24){
		$HoursFarm  = 24;
	}else{
		$HoursFarm = $Hours[0];
	}
	if($UserInfo['count_farm']>0){
		if ($Hours[1]=='ok'){
			$InfoBtc = GetSubjectShopInfo('farm',$UserInfo['id_farm'],'production')*$HoursFarm*$UserInfo['count_farm'];
			$BonuseFarm = GetSummFarm();
			$ClanBonuse = IncludeBonuse($InfoBtc,'bonuse_farm_lvl');
			$ClanBonuseText = MessageBonuse($ClanBonuse,'BTC');
			SetField('BTC',$BTC+$InfoBtc+$BonuseFarm+$ClanBonuse,$userId);
			SetField('time_farm',time(),$userId);
			AddCompleteTask(4,$InfoBtc);
			$message = $Nick.',вы собрали: '. ConvertValute($InfoBtc+$BonuseFarm) ." BTC".$ClanBonuseText;
		}else{
			$message = $Nick.', приходите через: '.CheckHour($UserInfo['time_farm']);
		}
	}else{
		$message = $Nick.', у вас нет ферм.';
	}
	return $message;
}
function SellFarm($count){
	$message ='';
		global $Nick,$UserInfo,$balance;
		if (empty($count)){
			$count = 1;
		}
		if($UserInfo['count_farm']-$count <0 ){
			return $Nick.', у вас нет столько ферм.';
		}
		$sub_id = $UserInfo['id_farm'];
		$price = GetSubjectShopInfo('farm',$sub_id,'sell_price')*$count;
		if ($count>0){
			if(!empty($UserInfo['id_farm']) && $UserInfo['count_farm']>0){
				SetFieldF('count_farm',$UserInfo['count_farm']-$count);
				if($UserInfo['count_farm']-$count == 0 ){
					SetFieldF('id_farm',0);
					SetFieldF('name_farm',null);
					SetNullUpgradeFarm();
				}
				SetFieldF('balance',$balance+$price);
				$message = $Nick.', вы продали фермы (x'.$count.'): за '.number_format($price,0,'.','.')."$";
			}else{
				$message = $Nick.', у вас нет ферм.';
			}
		}
		return $message;
}
function SellSubject($DB,$name_subRP,$sub_idIP){
		global $Nick,$UserInfo,$balance;
		if(!empty($UserInfo[$DB.'_id'])){
			$sub_id = $UserInfo[$DB.'_id'];
			$price = GetSubjectShopInfo($DB,$sub_id,'sell_price');
			SetFieldF($DB,null);
			SetFieldF($DB.'_id',0);
			SetFieldF('balance',$balance+$price);
			$message = $Nick.', вы продали '.$sub_idIP.': за '.number_format($price,0,'.','.')."$";
		}else{
			$message = $Nick.', у вас нет '.$name_subRP.'.';
		}
		return $message;
}
function BuySubject($DB,$sub_id,$name_sub){
		global $Nick,$UserInfo,$balance;
		$price = GetSubjectShopInfo($DB,$sub_id,'price');
		$sub_name = GetSubjectShopInfo($DB,$sub_id,'name');
		if($sub_id<=CountShopId($DB)  && $sub_id>0){
			if(empty($UserInfo[$DB.'_id'])){
				if($balance>=$price){
					SetFieldF($DB,$sub_name);
					SetFieldF($DB.'_id',$sub_id);
					SetFieldF('balance',$balance-$price);
					$message = $Nick.', вы купили '.$name_sub.': '.$sub_name.' за '.number_format($price,0,'.','.')."$";
				}else{
					$message = $Nick.', недостаточно денег.';
				}
			}else{
				$message = $Nick.', сначала продайте '.$name_sub.'.';
			}
		}
		return $message;
}

function CountShopId($DB){
	global $mysqli;
	$id = 0;
	$Data = $mysqli->query("SELECT * FROM `".$DB."` ");
	$str = '';
	return $Data->num_rows;
}
function GETSHOP(){
	$str = '
	🚙Транспорт:
⠀⠀	🚗Машины
⠀	🛩Самолеты
⠀	🛵Мотоциклы
⠀	🚁Вертолеты

	🏘Недвижимость:
⠀	🏠Дома
⠀	🌇Квартиры

	♻Прочее:
⠀	🐍Питомцы
⠀	✨Умения
⠀	📱Телефоны
⠀	🌐Биткоины
⠀	💷Тайпанкоины
⠀	👑Рейтинг
⠀	🔋Фермы 
⠀	🔋Тпски';
	return $str;
}
function GetSubjectShopPrice($DB,$id){
	global $mysqli;
	$Data = $mysqli->query("SELECT * FROM `".$DB."` ");
	$str = '';
	while(($row = $Data->fetch_assoc()) !=false){
		if ($row['id']==$id){
			return $row['price'];
		}
	}
	
}
function FBuy($str){
	return '<br>Для покупки напишите "'.$str.' [номер]"';
}

function GetSubjectShop($DB){
	global $mysqli,$UserInfo;
	
	$Data = $mysqli->query("SELECT * FROM `".$DB."` ");
	$str = '';
	while(($row = $Data->fetch_assoc()) !=false){
		$chr = $UserInfo[$DB.'_id'] == $row['id'] ? '🔹' : '🔸';
		$str.= $chr.$row['id'].'. '.$row['name'].'('.number_format($row['price'],0,'.','.')."$)<br>";
		
	}
	return $str;
}
function GetSubjectShopInfo($DB,$id,$Type){
	global $mysqli;
	$Data = $mysqli->query("SELECT * FROM `".$DB."` ");
	while(($row = $Data->fetch_assoc()) !=false){
		if ($row['id']==$id){
			return $row[$Type];
		}
	}
}
function GetFarmShop($DB){
	global $mysqli,$UserInfo;
	$Data = $mysqli->query("SELECT * FROM `".$DB."` ");
	$str = '';
	while(($row = $Data->fetch_assoc()) !=false){
		$chr = $UserInfo['id_farm'] == $row['id'] ? '🔹' : '🔸';
		if ($row['id']>4){return $str;}
		$str.= $chr.$row['id'].')'.' '.$row['name'].' '.$row['production'].'btc/hour '.number_format($row['price'],0,'.','.')."$<br>";
		
	}
	return $str;
}
function GetSubjectsShop($DB){
	global $mysqli;
	$Data = $mysqli->query("SELECT * FROM `".$DB."` ");
	$str = '';
	while(($row = $Data->fetch_assoc()) !=false){
		$str.= $row['id'].')'.' '.$row['name'].' '.$row['price']."<br>";
	}
	return $str;
}
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//
?>