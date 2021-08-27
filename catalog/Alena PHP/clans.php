<?php
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//
function CheckClearClanNotif(){
	global $UserInfo;
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		str_replace('br','',$clan['last_notif'],$count);
		if($count>=50){
			SetFieldClan('last_notif','',$clan['id']);
		}
	}
}
function ClearLogsClan(){
	global $Nick,$UserInfo;
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		if(IsZamMemberClan($id) || CheckAdminClan()){
			SetFieldClan('last_notif','',$clan['id']);
			$message = $Nick.', события очищены.';
		}else{
			$message = $Nick.', вы не являетесь главой или заместителем клана.';
		}
	}
	return $message;
}
function CheckClanNotifications(){
	global $UserInfo;
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		if(!empty($clan['last_notif'])){
			return $clan['last_notif'];
		}else{
			return 'Пусто.';
		}
	}
}
function GetClanInfo($id = false){
	global $Nick,$UserInfo;
	if(!$id){
		$clan = SelectClan($UserInfo['clan_id']);
	}else{
		$clan = SelectClan($id);
	}
	if($clan['silent'] == 1){ //скрытый клан (для админов)
		$ClanSilent = '🌚';
	}else{
		$ClanSilent = '';
	}
	$clan_race = file('files/clanracetime.txt'); // время клан гонки
	if (count(json_decode($clan['zam'])) == 0 ){
		$Zams = ConvertValute((count(json_decode($clan['zam']))));
	}else{
		$Zams = ConvertValute((count(json_decode($clan['zam']))-1));
		
	}
	if(GetBanTime($clan_race[0]) != 'ok'){
		$RaceTime = '⌚До конца клан-гонки:'.GetBanTime($clan_race[0]).'<br>';
		$Points = '🌀Очки:'.ConvertValute($clan['races_points']).'<br>';
	}elseif($clan['race_balance'] != 0){
		$RewardRace = '📠Награда за клан-гонку на 1 участника: '.ConvertValute($clan['race_balance']/(count(json_decode($clan['members']))-1)).'$<br>';
	}
	
	if(!empty($UserInfo['clan_id']) || $id){
		$dev = selectFromID(false,$clan['admin']);
		$message = 
		'📝Клан: '.$clan['name'].':'.$ClanSilent.'<br>'.
		'🔍ID:'.$clan['id'].'<br>'.
		'🔒Статус: '.CheckPrivate($clan['private']).'<br>'.
		'🛡LVL: '.ConvertNumberEmoji($clan['lvl']).'<br>'.
		'🔥EXP: '.ConvertValute($clan['exp']).'<br>'.
		'👑Глава клана: '.'[id'.$dev['id_VK'].'|'.$dev['name'].']<br>'.
		'💰Общак: '.ConvertValute($clan['balance']).'$<br>'.
		'👥Участников: '.ConvertValute((count(json_decode($clan['members']))-1)).'<br>'.
		'💂Заместителей: '.$Zams.'<br>'.
		$RewardRace.
		$RaceTime.
		$Points;
		if (CheckAdminClan()){
			$message .= 'Клан админ - команды для главы и заместителей клана<br>';
			$message .= 'Клан бонусы - список бонусов клана<br>';
			$message .= 'Клан соб - показать события клана<br>';
		}
		$message .= '<br>📗Дата создания: '.$clan['date_reg'].'<br>';
	}else{
		$message = $Nick.', вы не состоите в клане.';
	}
	return $message;
}
function BuyBonuse($id){
	global $Nick,$UserInfo,$userId,$AdminId;
	$clan = SelectClan($UserInfo['clan_id']);
	$Bonuse = SelectBonuse($id);
	if($Bonuse){
		if(CheckAdminClan() || IsZamMemberClan($UserInfo['id'])){
			$Bonuse = explode('|',$Bonuse);
			$BonuseType = $Bonuse[0];
			$BonusePrice = $Bonuse[1];
			$BonuseName = $Bonuse[2];
			$Price = $BonusePrice*$clan[$BonuseType];
			if(CheckMaxLvlBonuse($BonuseType) == 'ok' || $userId == $AdminId[0]){
				if($clan['balance']>=$BonusePrice*$clan[$BonuseType]){
					SetFieldClan($BonuseType,$clan[$BonuseType]+1,$clan['id']);
					$Price = $BonusePrice*$clan[$BonuseType];
					SetFieldClan('balance',$clan['balance']-$Price,$clan['id']);
					$message = $Nick.', вы улучшили lvl бонуса: "'.$BonuseName.'" до '.ConvertNumberEmoji($clan[$BonuseType]+1).'lvl <br> за '.ConvertValute($Price).'$';
				}else{
					$message = $Nick.', на балансе клана недостаточно денег.<br>❗Требуется для улучшения: '.ConvertValute($Price).'$❗';
				}
			}else{
				$message = CheckMaxLvlBonuse($BonuseType);
			}
		}else{
			$message = $Nick.', вы не являетесь главой или заместителем клана.';
		}
		
		
	}else{
		$message = $Nick.', неверный номер.';
	}
	return $message;
	
}
function IncludeBonuse($summ,$BonuseType){
	global $UserInfo;
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		return (($summ/100)*($clan[$BonuseType]*5));
	}
	
}
function CheckMaxLvlBonuse($Type){
	global $UserInfo,$Nick;
	$clan = SelectClan($UserInfo['clan_id']);
	switch($Type){
		case 'bonuse_job_lvl':
		if(($clan['bonuse_job_lvl']+1) >4){
			return $Nick.', у этого бонуса максимальный уровень.';
		}
		break;
		case 'bonuse_games_lvl':
		if(($clan['bonuse_games_lvl']+1) >4){
			return $Nick.', у этого бонуса максимальный уровень.';
		}
		break;
		case 'bonuse_farm_lvl':
		if(($clan['bonuse_farm_lvl']+1) >2){
			return $Nick.', у этого бонуса максимальный уровень.';
		}
		break;
		case 'bonuse_buisness_lvl':
		if(($clan['bonuse_buisness_lvl']+1) >4){
			return $Nick.', у этого бонуса максимальный уровень.';
		}
		break;
		
	}
	return 'ok';
	
}
function MessageBonuse($ClanBonuse,$chr = false){
	global $UserInfo;
	if(!$chr){$chr = '$';}
	if(!empty($UserInfo['clan_id'])){
		$ClanBonuseText = "<br>☠Бонус клана: ".ConvertValute($ClanBonuse).$chr;
	}else{
		$ClanBonuseText = '';
	}
	return $ClanBonuseText;
}
function GetBonuses($id = false){
	global $Nick,$AdminId,$userId,$UserInfo;
	if(!$id){
		$id = $UserInfo['clan_id'];
	}
	if(!empty($UserInfo['clan_id']) || $userId == $AdminId[0]){
		$clan = SelectClan($id);
		$message =  
		'🎁Бонусы клана:<br>'.
		'1.Доп. % заработка в работе '.ConvertNumberEmoji($clan['bonuse_job_lvl']).'LVL '.($clan['bonuse_job_lvl']*5).'% <br>💲Цена: '.ConvertValute(GetPriceBonuse(1)).'$<br>'.
		'2.Доп. % заработка в играх '.ConvertNumberEmoji($clan['bonuse_games_lvl']).'LVL '.($clan['bonuse_games_lvl']*5).'% <br>💲Цена: '.ConvertValute(GetPriceBonuse(2)).'$<br>'.
		'3.Доп. % заработка от ферм '.ConvertNumberEmoji($clan['bonuse_farm_lvl']).'LVL '.($clan['bonuse_farm_lvl']*5).'% <br>💲Цена: '.ConvertValute(GetPriceBonuse(3)).'$<br>'.
		'4.Доп. % заработка от бизнеса '.ConvertNumberEmoji($clan['bonuse_buisness_lvl']).'LVL '.($clan['bonuse_buisness_lvl']*5).'% <br>💲Цена: '.ConvertValute(GetPriceBonuse(4)).'$<br>';
	}else{
		$message = $Nick.', вы не состоите в клане.';
	}
	return $message;
	
}
function GetPriceBonuse($id){
	global $UserInfo;
	$clan = SelectClan($UserInfo['clan_id']);
	switch($id){
		case 1:
		$BonuseType = 'bonuse_job_lvl';
		$price = pow(10,13);
		break;
		case 2:
		$BonuseType = 'bonuse_games_lvl';
		$price = pow(10,13)*2;
		break;
		case 3:
		$BonuseType = 'bonuse_farm_lvl';
		$price = pow(10,13)+(pow(10,9)*200);
		break;
		case 4:
		$BonuseType = 'bonuse_buisness_lvl';
		$price = pow(10,13)+(pow(10,9)*500);
		break;	
	}
	return $price*$clan[$BonuseType];
}
function SelectBonuse($id){
	switch($id){
		case 1:
		$BonuseType = 'bonuse_job_lvl';
		$price = pow(10,13);
		$name = 'Доп. % заработка в работе';
		break;
		case 2:
		$BonuseType = 'bonuse_games_lvl';
		$price = pow(10,13)*2;
		$name = 'Доп. % заработка в играх';
		break;
		case 3:
		$BonuseType = 'bonuse_farm_lvl';
		$price = pow(10,13)+(pow(10,9)*200);
		$name = 'Доп. % заработка от ферм';
		break;
		case 4:
		$BonuseType = 'bonuse_buisness_lvl';
		$price = pow(10,13)+(pow(10,9)*500);
		$name = 'Доп. % заработка от бизнеса';
		break;	
	}
	if(!empty($price)){
		return $BonuseType.'|'.$price.'|'.$name;
	}else{
		return false;
	}
}

function CheckAdminClan(){
	global $UserInfo;
	$clan = SelectClan($UserInfo['clan_id']);
	if($UserInfo['id'] == $clan['admin']){
		return true;
	}
}

function AddClanZam($id){
	global $Nick,$UserInfo;
	$clan = SelectClan($UserInfo['clan_id']);
	$member = selectFromID(false,$id);
	$clan_zam = json_decode($clan['zam'],1);
	if($UserInfo['id'] != $id){
		if($UserInfo['id'] == $clan['admin']){
			if(IsMemberClan($id)){
				if(!IsZamMemberClan($id) ){
					if(empty($clan_zam)){
						$clan_zam = array(0);
					}
					array_push($clan_zam,$id);
					SetFieldClan('zam',json_encode($clan_zam),$clan['id']);
					$message = $Nick.', вы повысили роль игрока "'.$member['name'].'" в клане.';
				}else{
					$message = $Nick.', этот игрок является заместителем.';
				}
			}else{
				$message = $Nick.', игрока нет в вашем клане.';
			}
		}else{
			$message = $Nick.', вы не являетесь главой клана.';
		}
	}else{
		$message = $Nick.', вы глава клана.';
	}
	return $message;
}
function UnZamClan($id){
	global $Nick,$UserInfo;
	$clan = SelectClan($UserInfo['clan_id']);
	$member = selectFromID(false,$id);
	$clan_zam = json_decode($clan['zam'],1);
	if($UserInfo['id'] == $clan['admin']){
		if(IsMemberClan($id)){
			if(IsZamMemberClan($id)){
				if(empty($clan_zam)){
					$clan_zam = array(0);
				}
				$clan_zam = DelValueArr($clan_zam,$id);
				SetFieldClan('zam',json_encode($clan_zam),$clan['id']);
				$message = $Nick.', вы понизили  роль игрока "'.$member['name'].'" в клане.';
			}else{
				$message = $Nick.', этот игрок не является заместителем.';
			}
		}else{
			$message = $Nick.', игрока нет в вашем клане.';
		}
	}else{
		$message = $Nick.', вы не являетесь главой клана.';
	}
	return $message;
}
function IsMemberClan($id){
	global $UserInfo;
	$clan = SelectClan($UserInfo['clan_id']);
	$clan_members = json_decode($clan['members'],1);
	if(!empty($id)){
		return in_array($id,$clan_members);
	}	
}
function IsZamMemberClan($id){
	global $UserInfo;
	$clan = SelectClan($UserInfo['clan_id']);
	$clan_zam = json_decode($clan['zam'],1);
	if(!empty($id)){
		return in_array($id,$clan_zam);
	}	
}

function KickUserClan($id){
	global $Nick,$UserInfo;
	$member = selectFromID(false,($id));
	$id = $member['id'];
	$clan = SelectClan($UserInfo['clan_id']);
	if($clan){
		if($clan['admin'] == $UserInfo['id'] || IsZamMemberClan($UserInfo['id'])){
				$clan_members = json_decode($clan['members'],1);
			if(IsMemberClan($id)){
				if($clan['admin'] != $id){
					$clan_members = DelValueArr($clan_members,$id);
					SetFieldClan('members',json_encode($clan_members),$clan['id']);
					SetFieldClan('last_notif',$clan['last_notif'].'[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].'] кикнул: [id'.$player['id_VK'].'|'.$player['name'].'] '.date('d.j.Y,H:i').'<br>',$clan['id']);
					SetFieldG('clan_id',0,$id);
					$player = selectFromID(false,$id);
					$message = $Nick.', вы выгнали из своего клана игрока "'.$player['name'].'"';
				}else{
					$message = $Nick.', вы не можете себя кикнуть.';
				}
			}else{
				$message = $Nick.', игрока нет в вашем клане.';
			}
		}else{
			$message = $Nick.', вы не являетесь главой или заместителем клана.';
		}
	}else{
		$message = $Nick.', вы не состоите в клане.';
	}
	return $message;
}
function GetMembersClan(){
	global $Nick,$UserInfo;
	$str = $Nick.', список участников клана:<br>';
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		$members = json_decode($clan['members'],1);
		for($i=1;$i<count($members);$i++){
			$member = selectFromID(false,$members[$i]);
			if(IsZamMemberClan($member['id'])){
				$chr = '💂';
			}else{
				$chr = '';
			}
			$str .= $i.'.'.$chr.'[id'.$member['id_VK'].'|'.$member['name'].'] ID:'.$member['id'].'<br>';
		}
		
	}else{
		return $Nick.', вы не состоите в клане.';
	}
	return $str;
}
function GetZamsClan(){
	global $Nick,$UserInfo;
	$str = $Nick.', список заместителей клана:<br>';
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		$members = json_decode($clan['zam'],1);
		for($i=1;$i<count($members);$i++){
			$member = selectFromID(false,$members[$i]);
			$str .= $i.'.'.'[id'.$member['id_VK'].'|'.$member['name'].'] ID:'.$member['id'].'<br>';
		}
		
	}else{
		return $Nick.', вы не состоите в клане.';
	}
	return $str;
}
function GetRatingClan(){
	global $Nick,$UserInfo,$mysqli;
	$result_set = $mysqli->query("SELECT * FROM `Clans` ORDER BY `Clans`.`lvl` DESC");
	$i = 1;
	$str = 'Название|Глава (🛡LVL)(🔍ID)<br>';
	while(($row = $result_set->fetch_assoc()) !=false){
		if($row['silent'] != 1){
			$clan_admin = selectFromID(false,$row['admin']);
			$str.= ConvertNumberEmoji($i).$row['name'].'| '.'[id'.$clan_admin['id_VK'].'|'.$clan_admin['name'].'] 🛡LVL'.$row['lvl'].' '.'🔍'.$row['id'].''.'<br>';
			if($i>=10){
				return $str;
			}
			$i+=1;
		}
	}
	return $str;
}
function GetRatingClanRace(){
	global $Nick,$mysqli,$AdminId,$userId;
	$result_set = $mysqli->query("SELECT * FROM `Clans` ORDER BY `Clans`.`races_points` DESC");
	$i = 1;
	$clan_race = file('files/clanracetime.txt');
	$message = 'Клановая гонка!<br>';
	$clan_race = file('files/clanracetime.txt'); 
	$message .= 'До конца: '.GetBanTime($clan_race[0]).'<br>';
	if(GetBanTime($clan_race[0]) != 'ok' || $userId == $AdminId[0]){
		while(($row = $result_set->fetch_assoc()) !=false){
			if($row['silent'] != 1){
				$clan_admin = selectFromID(false,$row['admin']);
				$message.= ConvertNumberEmoji($i).$row['name'].' 🌀Очки:'.ConvertValute($row['races_points']).'🔍ID'.$row['id'].'<br>';
				if($i>=10){
					return $message;
				}
				$i+=1;
			}
		}
	}else{
		$message = $Nick.', клан-гонка еще не началась.';
	}
	return $message;
}
function ClanUpgrade(){
	global $UserInfo,$Nick;
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		$summ = $clan['lvl']*5000000000000; 
		if($clan['exp']>=$summ){
			if($UserInfo['id'] == $clan['admin'] || IsZamMemberClan($UserInfo['id'])){
				SetFieldClan('lvl',$clan['lvl']+1,$UserInfo['clan_id']);
				SetFieldClan('exp',$clan['exp']-$summ,$clan['id']);
				SetFieldClan('last_notif',$clan['last_notif'].'[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].'] улучшил клан до '.ConvertValute($clan['lvl']+1).'lvl '.date('d.j.Y,H:i').'<br>',$clan['id']);
				$message = '✅'.$Nick.', вы улучшили свой клан✅<br>🛡LVL->'.ConvertNumberEmoji($clan['lvl']+1).' (-'.ConvertValute($summ).'🔥EXP)<br>
				🔥EXP клана:: '.ConvertValute($clan['exp']-$summ);
			}else{
				$message = $Nick.', вы не являетесь главой клана.';
			}
		}else{
			$message = $Nick.', недостаточно exp клана.<br>Требуется: '.ConvertValute($summ).'🔥EXP'.
			'<br>🔥EXP: '.ConvertValute($clan['exp']).'$';
		}
	}else{
		$message = $Nick.', вы не состоите в клане.';
	}
	return $message;
}
function ClearRacesPoints(){
	global $mysqli;
	$clan_race = file('files/clanracetime.txt');
	$result_set = $mysqli->query("SELECT * FROM `Clans` ORDER BY `Clans`.`races_points` DESC");
	$message = 'Клановая гонка обнулена!<br>';
		while(($row = $result_set->fetch_assoc()) !=false){
			SetFieldClan('races_points',0,$row['id']);
		}
	
	return $message;
}
function DivisionRaceClan(){
	global $UserInfo,$Nick;;
	$clan_race = file('files/clanracetime.txt');
	if(GetBanTime($clan_race[0]) == 'ok'){
		$clan = SelectClan($UserInfo['clan_id']);
		if($clan['race_balance'] != 0){
			if($UserInfo['id'] == $clan['admin'] || IsZamMemberClan($UserInfo['id'])){
				$clan_members = json_decode($clan['members'],1);
				$Reward = floor($clan['race_balance']/(count($clan_members)-1));
				for($i=1;$i<count($clan_members);$i++){
					$member = selectFromID(false,$clan_members[$i]);
					SetFieldG('balance',$member['balance']+$Reward,$member['id']);
				}
				SetFieldClan('race_balance',0,$UserInfo['clan_id']);
				$message = $Nick.', награда распределена по участникам клана.';
			}else{
				$message = $Nick.', вы не являетесь главой или заместителем клана.';
			}
		}else{
			$message = $Nick.', на балансе нечего нет';
		}
	}else{
		$message = $Nick.', клан гонка еще не закончилась.';
	}
	return $message;
}
function DonateClan($summ){
	global $Nick,$AdminId,$UserInfo,$userId;
	$clan_race = file('files/clanracetime.txt');
	if($summ >= 100){
		if(!empty($UserInfo['clan_id'])){
			$clan = SelectClan($UserInfo['clan_id']);
			if($UserInfo['id'] != $clan['admin'] || $userId == $AdminId[0]){
				if($UserInfo['role']<=2 || $userId == $AdminId[0] ){
					if($UserInfo['balance']>=$summ){
						if($summ>0){
							if(GetBanTime($clan_race[0]) != 'ok' && $summ>=1000000000){
								SetFieldClan('races_points',$clan['races_points']+floor($summ/1000000000),$UserInfo['clan_id']);
								$RacePoints = '🌀Очки: +'.ConvertValute(floor($summ/1000000000));
							}
							SetFieldClan('balance',$clan['balance']+$summ,$UserInfo['clan_id']);
							SetFieldClan('exp',$clan['exp']+floor($summ/100),$UserInfo['clan_id']);
							SetFieldF('balance',$UserInfo['balance']-$summ);
							SetFieldClan('last_notif',$clan['last_notif'].'[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].'] задонатил: '.ConvertValuteKKK($summ).'$ '.date('d.j.Y,H:i').'<br>',$clan['id']);
							$message = $Nick.', вы пожертвовали в клан: '.ConvertValute($summ).'$<br>+'.ConvertValute(floor($summ/100)).'🔥EXP<br>'.$RacePoints;
						}else{
							$message = $Nick.', сумма должна быть минимум 1$.';
						}
					}else{
						$message = $Nick.', недостаточно денег.';
					}
				}else{
					$message = $Nick.', вы не можете донатить в кланы с вашей ролью.';
				}
			}else{
				$message = $Nick.', в клан могут донатить только участники и заместители.';
			}
		}else{
			$message = $Nick.', вы не состоите в клане.';
		}
	}else{
		$message = $Nick.', минимальный вклад в клан 100$';
	}
	return $message;
}
function SetPrivate($str){
	global $Nick,$UserInfo;
	if(!empty($UserInfo['clan_id'])){
		$clan = SelectClan($UserInfo['clan_id']);
		if($UserInfo['id'] == $clan['admin']  || IsZamMemberClan($UserInfo['id'])){
			if($str == 'вкл'){
				SetFieldClan('private',1,$UserInfo['clan_id']);
				$message = $Nick.', вы установили статус клана "Закрытый".';
			}elseif($str == 'выкл'){
				SetFieldClan('private',0,$UserInfo['clan_id']);
				$message = $Nick.', вы установили статус клана "Открытый".';
			}
		}else{
			$message = $Nick.', вы не являетесь главой или заместителем клана.';
		}
	}else{
		$message = $Nick.', вы не состоите в клане.';
	}
	return $message;
}
function CreateClan($name){
	global $body,$Nick,$AdminId,$userId,$UserInfo,$mysqli;
	$BlackArr = array ('.','[',']','(',')','|','@','#');
	str_replace($BlackArr,'',substr($body,24),$countblackarr);
	$Summ = 5000000000000; 
	if($UserInfo['role']<=2 || $userId == $AdminId[0]){
		if($UserInfo['lvl']>=10){
			if($countblackarr == 0){
				if(empty($UserInfo['clan_id'])){
					if ($UserInfo['balance']>=$Summ){
						if(iconv_strlen($name)<=15){
							$members = array(0,$UserInfo['id']);
							$members = json_encode($members);
							$mysqli->query("INSERT INTO `Clans` (`name`,`admin`,`members`,`date_reg`) 
							VALUES ('".$name."','".$UserInfo['id']."','".$members."','".GetDateReg()."')");
							$query = $mysqli->query("SELECT * FROM `Clans` WHERE `Clans`.`admin`=".$UserInfo['id'].";");
							$clan = $query->fetch_assoc();
							SetFieldF('clan_id',$clan['id']);
							SetFieldF('balance',$UserInfo['balance']-$Summ);
							$message = $Nick.', вы создали клан "'.$name.'"';
						}else{
							$message = $Nick.', название клана должно быть не более 15 символов';
						}
					}else{
						$message = $Nick.', недостаточно денег, стоимость создания клана: '.ConvertValute($Summ);
					}
				}else{
					$message = $Nick.', вы уже состоите в клане.';
				}
			}else{
				$message = $Nick.', в названии вашего клана недопустимые символы!';
			}
		}else{
			$message = $Nick.', чтобы создать клан ваш уровень должен быть не ниже 10.';
		}
	}else{
		$message = $Nick.', кланы могут создавать только игроки статусом не выше VIP.';
	}
	return $message;
}

function CheckPrivate($str){
	if($str ==1){
		return '✖Закрытый';
	}else{
		return '🔜Открытый';
	}
}

function GoClan($id){
	global $UserInfo,$Nick;
	$clan = SelectClan($id);
	
	if($clan){
		if($clan['private']==1){
			return $Nick.', доступ к клану ограничен главой клана.';
		}
		if($clan['silent'] == 1 && $UserInfo['role'] <= 2){
			return $Nick.', клана с таким id не найдено.';
		}
		if(empty($UserInfo['clan_id'])){
			$clan_members = json_decode($clan['members'],1);
			if(count($clan_members)+1 <= 30){
				if(empty($clan_members)){
					$clan_members = array(0);
				}
				array_push($clan_members,$UserInfo['id']);
				SetFieldF('clan_id',$id);
				SetFieldClan('last_notif',$clan['last_notif'].'[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].'] присоединился к клану: '.date('d.j.Y,H:i').'<br>',$id);
				SetFieldClan('members',json_encode($clan_members),$id);
				$message = $Nick.', вы вступили в клан "'.$clan['name'].'"';
			}else{
				$message = $Nick.', в клане нет мест.';
			}
		}else{
			$message = $Nick.', вы уже состоите в клане.';
		}
	}else{
		$message = $Nick.', клана с таким id не найдено.';
	}
	return $message;
}
function LeaveClan(){
	global $UserInfo,$Nick,$mysqli;
	$clan = SelectClan($UserInfo['clan_id']);
	if($clan){
		if($clan['admin'] == $UserInfo['id']){
			DissolveClan();
			$mysqli->query("DELETE FROM `Clans` WHERE `admin` = '".$UserInfo['id']."';");
			return $Nick.', вы распустили свой клан.';	
		}
		SetFieldF('clan_id',0);
		$clan_members = json_decode($clan['members'],1);
		$clan_members = DelValueArr($clan_members,$UserInfo['id']);
		if(empty($clan_members)){
			$clan_members = array(0);
		}
		SetFieldF('clan_id',$id);
		SetFieldClan('last_notif',$clan['last_notif'].'[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].']  покинул клан: '.date('d.j.Y,H:i').'<br>',$clan['id']);
		SetFieldClan('members',json_encode($clan_members),$clan['id']);
		$message = $Nick.', вы покинули клан "'.$clan['name'].'"';
	}else{
		$message = $Nick.', вы не состоите в клане.';
	}
	return $message;
}
function SetFieldClan($field,$value,$id){
	global $mysqli;
	$mysqli->query("UPDATE `Clans` SET `".$field."` = '".$value."' WHERE `id` = ".$id.";");
}
function DissolveClan(){
	global $UserInfo,$Nick,$mysqli;
	$clan = SelectClan($UserInfo['clan_id']);
	$members = json_decode($clan['members'],1);
	for($i=1;$i<count($members);$i++){
		SetFieldG('clan_id',0,$members[$i]);
	}
}
function SelectClan($id){
	global $mysqli;
	$clan = $mysqli->query("SELECT * FROM `Clans` WHERE `id`= ".$id.";");
	return $clan->fetch_assoc();
}
function DelValueArr($arr,$value){
	$arr = array_diff($arr,[$value]);
	sort($arr);
	return $arr;
}
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//
?>