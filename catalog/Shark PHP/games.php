<?php
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//

function Bones($summ){
	global $UserInfo,$Nick;
	if($UserInfo['balance']>=$summ){
		if($summ>0){
			$rand = rand(1,6);
			$randPlayer = rand(1,6);
			if($randPlayer>$rand){
				SetFieldF('balance',$UserInfo['balance']+$summ);
				$message = $Nick.', вам выпало 🎲'.$randPlayer.' - мне выпало 🎲'.$rand.'.<br>Вы выиграли '.ConvertValute($summ).'$';
				$balance = ConvertValute($UserInfo['balance']+$summ);
			}elseif($rand>$randPlayer){
				SetFieldF('balance',$UserInfo['balance']-$summ);
				$message = $Nick.', вам выпало 🎲'.$randPlayer.' - мне выпало 🎲'.$rand.'.<br>Вы проиграли '.ConvertValute($summ).'$';
				$balance = ConvertValute($UserInfo['balance']-$summ);
			}elseif($randPlayer==$rand){
				$message = $Nick.', вам выпало 🎲'.$randPlayer.' - мне выпало 🎲'.$rand.'.<br>Ничья ';
				$balance = ConvertValute($UserInfo['balance']);
			}
			$message .= '<br>💰Баланс: '.$balance.'$';
		}else{
			$message = $Nick.', ставка должна быть минимум 1$';
		}
	}else{
		$message = $Nick.', недостаточно денег.';
	}
	return $message;
}
function PlayMonetka($id){
	global $Nick,$balance,$UserInfo,$userId;
	$f = file('games/monetka.txt');
	$file = explode(' ',$f[$id]);
	$UserM = selectFromIDVK(false,$file[0]);
	if($id>=1 && $id<count($f)){
		if($userId != $UserM['id_VK']){
			$summ = $file[2]*1;
			if($UserInfo['balance'] >= $summ){
				$arr = array('Орёл','Решка');
				$StArr = $arr[rand(0,1)];
				if($StArr == $file[1]){
					SetField('balance',$UserM['balance']+($summ*2),$UserM['id_VK']);
					SetFieldF('balance',$UserInfo['balance']-$summ);
					AddCompleteTaskId(9,1,$UserM['id_VK']);
					AddCompleteTaskId(7,1,$UserM['id_VK']);
					AddCompleteTask(7,1);				
					$message = $Nick.', вы проиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					$text = '{Монетка} вы выиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					SellMsg($UserM['id_VK'],$text);
				}elseif($StArr != $file[1]){
					SetFieldF('balance',$UserInfo['balance']+$summ);
					AddCompleteTask(9,1);
					AddCompleteTaskId(7,1,$UserM['id_VK']);
					AddCompleteTask(7,1);
					$message = $Nick.', вы выиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					$text = '{Монетка} вы проиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					SellMsg($UserM['id_VK'],$text);
				}
				DelMonetka($id);
			}else{
				$message  = $Nick.', недостаточно денег.';
			}
		}else{
			$message = $Nick.', это ваша ставка.';
		}
	}else{
		$message = $Nick.', неверный номер.';
	}
	return $message;
}
function AddMonetka($summ,$stavka){
	global $UserInfo,$Nick;
	$file = file('games/monetka.txt');
	$countFile = count($file);
	$stavMessage =  ConvertStavkaMonetka($stavka,2);
	$stavka =  ConvertStavkaMonetka($stavka,1);
	if($summ >= 100){
		if($UserInfo['balance'] >= $summ){
			if(!SearchMonetka()){
				if($stavka){
					SetFieldF('balance',$UserInfo['balance']-$summ);
					$file[$countFile] = $UserInfo['id_VK'].' '.$stavka.' '.$summ.PHP_EOL;
					file_put_contents('games/monetka.txt',$file);
					$message = $Nick.', вы поставили: '.ConvertValute($summ).' на "'.$stavMessage.'"';
				}
			}else{
				$message = $Nick.', вы уже делали ставку, отмените ее командой "монетка отмена"';
			}
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}
	return $message;
}
function GetListMonetka(){
	global $UserInfo,$Nick;
	$file = file('games/monetka.txt');
	if(!empty($file[1])){
		for($i=1;$i<count($file);$i++){
			$ExFile = explode(' ',$file[$i]);
			$emoji = $UserInfo['balance'] >= $ExFile[2]*1 ?'🔹' :'🔸';
			
			
			$message .= $emoji.($i).'.'.$ExFile[1].' ('.ConvertValute($ExFile[2]).'$)'.'<br>';
		}
	}else{
		$message = $Nick.', никто не играет.';
	}
	return $message;
}

function ConvertStavkaMonetka($stavka,$type){
	if($type == 1){
		switch($stavka){
			case 'орел':
			case 'орёл':
			return 'Орёл';
			break;
			case 'решка':
			return 'Решка';
			break;
			default:
			return false;
			break;
		}
	}elseif($type == 2){
		switch($stavka){
			case 'орел':
			case 'орёл':
			return 'Орла';
			break;
			case 'решка':
			return 'Решку';
			break;
			default:
			return false;
			break;
		}
	}
}
function DelMonetka($i = false){ 
	global $UserInfo,$Nick;
	$i = empty($i) ? SearchMonetka() : $i;
	$file = file('games/monetka.txt');
	if($i>=1 && $i<count($file) && $i){
		$ExFile = explode(' ',$file[$i]);
		if(!$i){
			SetFieldF('balance',$UserInfo['balance']+$ExFile[2]);
		}
		unset($file[$i]);
		file_put_contents('games/monetka.txt',$file);
		$message = $Nick.', вы отменили ставку.';
	}else{
		$message = $Nick.', у вас нет ставок.';
	}
	return $message;
}
function SearchMonetka(){
	global $userId;
	$file = file('games/monetka.txt');
	for($i=1;$i<=count($file);$i++){
		$ExFile = explode(' ',$file[$i]);
		if($ExFile[0] == $userId){
			return $i;
		}
	}
	return false;
}
function BuyCases($count){
	global $UserInfo,$Nick;
	$count = empty($count) ? 1 : $count;
	$price = 3;
	$arrayValute = rand(1,10)*pow(10,8);
	$arrayBtc = array(10,100,200,250,300,450,600,900,1000,pow(10,6));
	$arrayTpc = array(10,100,200,250,300,450,600,900,1000,pow(10,3)*3);
	if($UserInfo['donate_balance']>=$price*$count){
		SetFieldF('donate_balance',$UserInfo['donate_balance']-$price);
		if(ChanceProzent(15)){
			$Reward = $arrayBtc[rand(0,count($arrayBtc)-1)];
			SetFieldF('BTC',$UserInfo['BTC']+$Reward);
			$message = $Nick.', вы выиграли биткоины: '.ConvertValute($Reward).'BTC';
		}elseif(ChanceProzent(10)){
			$Reward = $arrayTpc[rand(0,count($arrayTpc)-1)];
			SetFieldF('TPC',$UserInfo['TPC']+$Reward);
			$message = $Nick.', вы выиграли тайпанкоины: '.ConvertValute($Reward).'TPC';
		}elseif(ChanceProzent(5)){
			SetFieldF('time_bonuse',time()-86400);
			$message = $Nick.', ваш ежедневный бонус сброшен';
		}elseif(ChanceProzent(5)){
			SetFieldF('time_job',$UserInfo['time_job']-3600);
			$message = $Nick.', ваше время работы сброшено';
		}else{
			$Reward = $arrayValute;
			SetFieldF('balance',$UserInfo['balance']+$Reward);
			$message = $Nick.', вы выиграли валюту: '.ConvertValute($Reward).'$';
		}
	}else{
		$message = $Nick.', недостаточно R <br>💊Донатка: '.ConvertValute($UserInfo['donate_balance']).'R';
	}
	return $message;
}
function Kubik($summ){
	global $UserInfo,$Nick;
	$randUser = rand(1,6);
	$randBot = rand(1,6);
	if($summ>=0){
		if($UserInfo['balance']>=$summ){
			if($randUser>$randBot){
				SetFieldF('balance',$UserInfo['balance']+$summ);
				$message = $Nick.', ты выиграл:<br>'.
				'Твои кости: '.$randUser.'<br>'.
				'Мои кости: '.$randBot.'<br>'.
				'💰Баланс: '.ConvertValute($UserInfo['balance']+$summ);
			}elseif($randUser<$randBot){
				SetFieldF('balance',$UserInfo['balance']-$summ);
				$message = $Nick.', ты проиграл:<br>'.
				'Твои кости: '.$randUser.'<br>'.
				'Мои кости: '.$randBot.'<br>'.
				'💰Баланс: '.ConvertValute($UserInfo['balance']-$summ);
			}else{
				$message = $Nick.', ничья:<br>'.
				'Твои кости: '.$randUser.'<br>'.
				'Мои кости: '.$randBot.'<br>'.
				'💰Баланс: '.ConvertValute($UserInfo['balance']);
			}
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}
	return $message;
}
function Spin(){
	global $UserInfo,$Nick,$mysqli,$AdminId;
	if($UserInfo['donate_balance']>=5){
		SetFieldF('donate_balance',$UserInfo['donate_balance']-5);
		$rewardBalance = rand(1,3)*pow(10,9)+rand(pow(10,6)/2,pow(10,6));
		$rewardRating = rand(1,15);
		$rewardBtc = rand(1,750)*pow(10,3);
		$rewardTpc = rand(1,32)*pow(10,3);
		$rewardDonate = rand(1,10);
		if(empty($UserInfo['id_farm'])){
			$id_farm = rand(1,3);
			$farmInfo = $mysqli->query('SELECT * FROM `farm` WHERE `id`='.$id_farm);
			$farmInfo = $farmInfo->fetch_assoc();
			$name_farm = $farmInfo['name'];
			$count_farm = rand(1,20);
			$time_farm = time();
			$farm = 1;
		}
		if(ChanceProzent(1) && $UserInfo['role']<2){
			SetFieldF('role',2);
			SellMsg($AdminId[0],'[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].'] получил VIP в SPIN GO');
			$message = $Nick.', вы выиграли 🌚VIP!🌚';
		}elseif(ChanceProzent(3)){
			SetFieldF('donate_balance',$UserInfo['donate_balance']+$rewardDonate);
			$message = $Nick.', вы выиграли 💊донат валюту (x'.$rewardDonate.')';
			
		}elseif(ChanceProzent(15)){
			SetFieldF('rating',$UserInfo['rating']+$rewardRating);
			$message = $Nick.', вы выиграли 👑рейтинг (x'.$rewardRating.')';
			
		}elseif(ChanceProzent(15)){
			SetFieldF('TPC',$UserInfo['TPC']+$rewardTpc);
			$message = $Nick.', вы выиграли 💷тайпанкоины (x'.ConvertValute($rewardTpc).')';
			
		}elseif(ChanceProzent(25)){
			SetFieldF('BTC',$UserInfo['BTC']+$rewardBtc);
			$message = $Nick.', вы выиграли 🌐биткоины (x'.ConvertValute($rewardBtc).')';
			
		}elseif(ChanceProzent(10) && $farm ==1){
			SetFieldF('name_farm',$name_farm);
			SetFieldF('count_farm',$count_farm);
			SetFieldF('time_farm',$time_farm);
			SetFieldF('id_farm',$id_farm);
			$message = $Nick.', вы 🔋ферму: '.$name_farm.'(x'.$count_farm.')!';
		}else{
			SetFieldF('balance',$UserInfo['balance']+$rewardBalance);
			$message = $Nick.', вы 💰выиграли  '.ConvertValute($rewardBalance).'$';
		}
		if($UserInfo['donate_balance']-5>=5){
			$message .= '<br>Еще можно крутить: '.ConvertValute(floor($UserInfo['donate_balance']/5)).' раз';
		}
		
	}else{
		$message =  $Nick.', недостаточно R<br>💊Донатка: '.ConvertValute($UserInfo['donate_balance']);
	}
	return $message;
}
function ChanceProzent($ch){
	$rand = rand(1,100);
	if($rand<=$ch){
		return true;
	}else{
		return false;
	}
}
function GoTable($summ,$stav = false){
	global $Nick,$UserInfo,$AdminId,$userId;
	$table = SelectTable();
	$limit = 30;
	$players = json_decode($table['players'],1);
	if(count($players) >= 10 && $stav == 'стоп' || ($userId == $AdminId[0] && $stav == 'стоп')){
		return RandPlayerTable();
	}
	if(in_array($UserInfo['id'],$players) != true){
		if($UserInfo['balance']>= $summ){
			if($summ >= 2500000000){
				if($summ <= 5000000000){
						if(count($players) != 0){
							array_push($players,$UserInfo['id']);
							
						}else{
							$players = array($UserInfo['id']);
						}
						SetFieldTable('summ',$table['summ']+$summ);
						SetFieldTable('players',json_encode($players));
						SetFieldF('balance',$UserInfo['balance']-$summ);
						if((count($players)) == $limit){
							return RandPlayerTable();
						}
						$message = $Nick.', вы положили: '.ConvertValute($summ).'$ на стол, игроков: ['.(count($players)).'/'.$limit.']';
				}else{
					$message = $Nick.', максимальная ставка 5.000.000.000$';
				}
			}else{
				$message = $Nick.', минимальная ставка 2.500.000.000$';
				
			}
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}else{
		$message = $Nick.', вы уже вносили сумму. игроков ['.(count($players)).'/'.$limit.']';
	}
	return $message;
}
function RandPlayerTable(){
	$table = SelectTable();
	$players = json_decode($table['players'],1);
	$WinnerId = $players[rand(0,count($players)-1)];
	$Winner = selectFromID(false,$WinnerId);
	$ClanBonuse = IncludeBonuse($table['summ'],'bonuse_games_lvl');
	SetFieldG('balance',$Winner['balance']+$table['summ']+$ClanBonuse,$Winner['id']);
	$ClanBonuseText = MessageBonuse($ClanBonuse);
	$text = $Winner['name'].', {Стол} вы выиграли: '.ConvertValute($table['summ']).'$<br>💰Баланс: '.ConvertValute($Winner['balance']+$table['summ']).$ClanBonuseText;
	SetFieldTable('summ',0);
	$players = array();
	SetFieldTable('players',json_encode($players));
	SellMsg($Winner['id_VK'],$text);
	return 'Победитель: [id'.$Winner['id_VK'].'|'.$Winner['name'].']';
	
}
function SetFieldTable($field,$value){
	global $mysqli;
	$mysqli->query("UPDATE `table` SET `".$field."` = '".$value."' WHERE `id` = 1;");
}
function SelectTable(){
	global $mysqli;
	$table = $mysqli->query("SELECT * FROM `table` WHERE `id`= 1;");
	return $table->fetch_assoc();
}
function Knb($stav,$summ){
	global $Nick,$UserInfo;
	$rand = rand(1,3);
	if($summ >= 0){
		if($summ<=$UserInfo['balance']){
			$ClanBonuse = IncludeBonuse($summ,'bonuse_games_lvl');
			$ClanBonuseText = MessageBonuse($ClanBonuse);
			if($stav == 'камень' || $stav == 'к'){
				if ($rand == 1){
					$message = $Nick.', ничья '.WinEmoji(1).'<br>💰Баланс: '.ConvertValute($UserInfo['balance']);		
				}elseif($rand == 2){
					SetFieldF('balance',$UserInfo['balance']+$summ+$ClanBonuse);
					$message = $Nick.', ты выиграл '.WinEmoji(1).', я поставила ножницы.<br>💰Баланс: '.ConvertValute($UserInfo['balance']+$summ).$ClanBonuseText;	
				}else{
					SetFieldF('balance',$UserInfo['balance']-$summ);
					$message = $Nick.', ты проиграл '.WinEmoji(0).', я поставила бумагу.<br>💰Баланс: '.ConvertValute($UserInfo['balance']-$summ);					
				}
			}elseif($stav == 'ножницы' || $stav == 'н'){
				if ($rand == 2){
					$message = $Nick.', ничья '.WinEmoji(1).'<br>💰Баланс: '.ConvertValute($UserInfo['balance']);	
				}elseif($rand == 3){
					SetFieldF('balance',$UserInfo['balance']+$summ+$ClanBonuse);
					$message = $Nick.', ты выиграл '.WinEmoji(1).', я поставила бумагу.<br>💰Баланс: '.ConvertValute($UserInfo['balance']+$summ).$ClanBonuseText;			
				}else{				
					SetFieldF('balance',$UserInfo['balance']-$summ);
					$message = $Nick.', ты проиграл '.WinEmoji(0).', я поставила камень.<br>💰Баланс: '.ConvertValute($UserInfo['balance']-$summ);		
				}
			}elseif($stav == 'бумага' || $stav == 'б'){
				if ($rand == 3){
					$message = $Nick.', ничья '.WinEmoji(1).'<br>💰Баланс: '.ConvertValute($UserInfo['balance']);	
				}elseif($rand == 1){
					SetFieldF('balance',$UserInfo['balance']+$summ+$ClanBonuse);
					$message = $Nick.', ты выиграл '.WinEmoji(1).', я поставила камень.<br>💰Баланс: '.ConvertValute($UserInfo['balance']+$summ).$ClanBonuseText;	
				}else{
					SetFieldF('balance',$UserInfo['balance']-$summ);
					$message = $Nick.', ты проиграл '.WinEmoji(0).', я поставила ножницы.<br>💰Баланс: '.ConvertValute($UserInfo['balance']-$summ);		
				}
			}
		}else{
			$message = $Nick.', недостаточно денег<br>💰Баланс: '.ConvertValute($UserInfo['balance']);	
		}
	}else{
		$message = $Nick.', ставка должна быть минимум 0$.';	
	}
	return $message;
}
function AddFl($summa){
	global $Nick,$UserInfo;
	if ($UserInfo['balance']>=$summa && $summa>=10){
		if($UserInfo['fl_summ']==0){
			SetFieldF('balance',$UserInfo['balance']-$summa);
			SetFieldF('fl_summ',$summa);
			AddCompleteTask(5,1);
			$message = $Nick.', вы поставили: '.ConvertValute($summa).'$';
		}else{
			$message = $Nick.', вы уже сделали ставку играйте.';
		}
	}else{
		$message = $Nick.', минимальная ставка 10$.';
	}
	return $message;
}
function CheckCombinationsFl($str){
	$str = explode(' ',$str);
	if($str[0]>=4){
		$reward = 0.2;
	}
	if($str[5]>=4){
		$reward = 2;
	}
	if($str[5]>=5){
		$reward = 5;
	}
	if($str[0]==6){
		$reward = 10;
	}
	if($str[1]>=4){
		$reward = 20;
	}
	if($str[2]>=4){
		$reward = 20;
	}
	if($str[3]>=4){
		$reward = 20;
	}
	if($str[4]>=4){
		$reward = 20;
	}
	
	return $reward;
}


 
function CheckFlReward($learsfield){
	$vinny = 0;
	$worms = 0;
	$baptize = 0;
	$bobi = 0;
	$black = 0;
	$red = 0;	
	$lears = array('1'=>'♠️','2'=>'♥️','3'=>'♣️','4'=>'♦️','5'=>'🃏');
	for($i=0;$i<iconv_strlen($learsfield);$i++){
		switch($learsfield[$i]){
			case 1:
			$vinny += 1;
			$black += 1;
			break;
			case 2:
			$worms += 1;
			$red += 1;
			break;
			case 3:
			$baptize += 1;
			$black += 1;
			break;
			case 4:
			$bobi += 1;
			$red += 1;
			break;
		}
	}
	return $black.' '.$vinny.' '.$worms.' '.$baptize.' '.$bobi.' '.$red;
}
function GetFl(){
	global $Nick,$UserInfo,$AdminId;
	$lears = array('1'=>'♠️','2'=>'♥️','3'=>'♣️','4'=>'♦️','5'=>'🃏');
	$learsRand = rand(1,5);	
	$limit = 6;
	if ($UserInfo['role'] >=3 && $UserInfo['fl_admin'] >=6){$limit = $UserInfo['fl_admin'] ;}
	if(iconv_strlen($UserInfo['fl_field'])+1 <=$limit ){
		if ($UserInfo['fl_summ']>0){
			SetFieldF('fl_field',$UserInfo['fl_field'].$learsRand);
			$message = $Nick.', выпало: '.$lears[$learsRand].'<br>Ваша комбинация: '.CheckFl($UserInfo['fl_field']).$lears[$learsRand];
		}else{
			$message = $Nick.', сделайте ставку.';
		}
	}else{
		$reward = (CheckCombinationsFl(CheckFlReward($UserInfo['fl_field']))*$UserInfo['fl_summ']);
		$ClanBonuse = IncludeBonuse($reward,'bonuse_games_lvl');
		$ClanBonuseText = MessageBonuse($ClanBonuse);
		$message = $Nick.', ваш выигрыш: '.ConvertValute($reward)."$";
		if ($reward != 0){
			$message .= WinEmoji(1).$ClanBonuseText;
		}else{
			$message .= WinEmoji(0);
		}
		SetFieldF('balance',$UserInfo['balance']+$reward+$ClanBonuse);
		SetFieldF('fl_field','');
		SetFieldF('fl_summ',0);
	}
	return $message;
}
function CheckFl($learsfield){
	$lears = array('1'=>'♠️','2'=>'♥️','3'=>'♣️','4'=>'♦️','5'=>'🃏');
	for($i=0;$i<iconv_strlen($learsfield);$i++){
		$y = (string)$learsfield[$i];
		$str .= $lears[$y];
	}
	return $str;
}
function CheckStavkaAutomate($stavka,$lines){
	global $Nick,$UserInfo;
	if (($lines*$stavka) <= $UserInfo['balance']){
		if ($stavka >= 1000000000){
			return 'ok';
		}else{
			$message = $Nick.', для игры ставка должна быть минимум 1.000.000.000 $';
		}
	}else{
		$message = $Nick.', недостаточно денег. '.'<br> 💰Баланс: '.ConvertValute($UserInfo['balance']).'$';
	}
	return $message;
}
function CheckReward($Automat,$lines,$stavka){
	global $Nick,$UserInfo;
	$stavka = KKK($stavka);
		switch ($lines){
			case 1:
			if ($Automat[4]==$Automat[5] && $Automat[5]==$Automat[6]){
				$Reward = CheckRewardBox($Automat[4]);
			}
			break;
			case 3:
			if ($Automat[1]==$Automat[2] && $Automat[2]==$Automat[3]){
				$Reward += CheckRewardBox($Automat[1]);
			}
			if ($Automat[4]==$Automat[5] && $Automat[5]==$Automat[6]){
				$Reward += CheckRewardBox($Automat[4]);
			}
			if ($Automat[7]==$Automat[8] && $Automat[8]==$Automat[9]){
				$Reward += CheckRewardBox($Automat[7]);
			}
			break;
			case 5:
			if ($Automat[1]==$Automat[2] && $Automat[2]==$Automat[3]){
				$Reward += CheckRewardBox($Automat[1]);
			}
			if ($Automat[4]==$Automat[5] && $Automat[5]==$Automat[6]){
				$Reward += CheckRewardBox($Automat[4]);
			}
			if ($Automat[7]==$Automat[8] && $Automat[8]==$Automat[9]){
				$Reward += CheckRewardBox($Automat[7]);
			}
			if ($Automat[1]==$Automat[5] && $Automat[5]==$Automat[9]){
				$Reward += CheckRewardBox($Automat[1]);
			}
			if ($Automat[3]==$Automat[5] && $Automat[5]==$Automat[7]){
				$Reward += CheckRewardBox($Automat[3]);
			}
			break;

			
		}
		if (empty($Reward)){
			SetFieldF('balance',$UserInfo['balance']-($lines*$stavka));
			return $Nick.', вы ничего не выиграли'.WinEmoji(0).'<br>';
			
		}
		$Reward = $Reward*$stavka;
		$ClanBonuse = IncludeBonuse($Reward,'bonuse_games_lvl');
		$ClanBonuseText = MessageBonuse($ClanBonuse);
		SetFieldF('balance',$UserInfo['balance']+$Reward+$ClanBonuse);
		$message = $Nick.', ваш выигрыш: '.ConvertValute($Reward).'$'.WinEmoji(1).$ClanBonuseText.'<br>';
	
	return $message;
}
function CheckRewardBox($box){
	switch ($box){
		case '🎁':
		$Reward = 500;
		break;
		case '🍎':
		$Reward = 25;
		break;
		case '🍏':
		$Reward = 20;
		break;
		case '🍐':
		$Reward = 10;
		break;
		case '🍊':
		$Reward = 5;
		break;
		case '🍋':
		$Reward = 2;
		break;
		case '🍌':
		$Reward = 1.5;
		break;
	}
	return $Reward;
}
function AutomatChanceBox($box){
	global $UserInfo;
	switch ($box){
		case '🎁':		
		$Chance = ChanceProzent(1);
		if ($UserInfo['automate_on']==1){
			$Chance = true;
		}
		break;
		case '🍏':
		$Chance = ChanceProzent(7);
		break;
		case '🍎':
		$Chance = ChanceProzent(10);
		break;
		case '🍐':
		$Chance = ChanceProzent(10);
		break;
		case '🍊':
		$Chance = ChanceProzent(10);
		break;
		case '🍋':
		$Chance = ChanceProzent(10);
		break;
		case '🍌':
		$Chance = ChanceProzent(25);
		break;
		
	}
	return $Chance;
}

function AutomatDisplay(){
	global $UserInfo;
	$array = array('🍏','🍎','🍐','🍊','🍋','🍌','🎁');
	$j=0;
	$arrayWin = array();
	for($i=1;$i<=9;$i++){
		$RandBox = rand(1,40);
		$Box = $array[rand(0,count($array)-1)];
		if ($UserInfo['automate_on']==1){
			$Box = '🎁';
		}
		$BoxChance = AutomatChanceBox($Box);
		if($BoxChance){
			
			if($j == 3){
				$str .= '<br>';
				$j=0;
			}
			$str .= $Box;
			$Winned .= $Box.' ';
			$j+=1;
		}else{
			$i--;
		}
	}
	return $str.' '.$Winned;
}
function Roulette($stavka,$summ){
	global $Nick,$UserInfo;
	if($UserInfo['balance'] >= $summ ){
		if($summ >=1000){
			if ($stavka == 'red' || $stavka == 'black'){
				$winsumm = $summ*2;
				$ClanBonuse = IncludeBonuse($winsumm,'bonuse_games_lvl');
				$ClanBonuseText = MessageBonuse($ClanBonuse);
				
				if ($stavka == 'red'){
					if (ChanceProzent(35) || $UserInfo['roulette_chance']==1){
						SetFieldF('balance',$UserInfo['balance']+$winsumm+$ClanBonuse);
						$message = $Nick.', шарик остановился на ❤️красном❤️ поле, вы выиграли: '.ConvertValute($winsumm).'$'.WinEmoji(1).$ClanBonuseText;
					}else{
						SetFieldF('balance',$UserInfo['balance']-$summ);
						$message = $Nick.', шарик остановился на 🖤черном🖤 поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
					}
				}elseif ($stavka == 'black'){
					if (ChanceProzent(35)  || $UserInfo['roulette_chance']==1){
						SetFieldF('balance',$UserInfo['balance']+$winsumm+$ClanBonuse);
						$message = $Nick.', шарик остановился на 🖤черном🖤 поле, вы выиграли: '.ConvertValute($winsumm).'$'.WinEmoji(1).$ClanBonuseText;
					}else{
						SetFieldF('balance',$UserInfo['balance']-$summ);
						$message = $Nick.', шарик остановился на ❤️красном❤️ поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
					}
				}	
			}elseif($stavka == 'zero'){
				if(ChanceProzent(5)|| $UserInfo['roulette_chance']==1){
					$winsumm = $summ*35;
					SetFieldF('balance',$UserInfo['balance']+$winsumm+$ClanBonuse);
					$message = $Nick.', шарик остановился на 💚зеленом💚 поле, вы выиграли: '.ConvertValute($winsumm).'$'.WinEmoji(1).$ClanBonuseText;
				}else{
					if (rand(1,2)==1){
						$message = $Nick.', шарик остановился на ❤️красном❤️ поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
					}else{
						SetFieldF('balance',$UserInfo['balance']-$summ);
						$message = $Nick.', шарик остановился на 🖤черном🖤 поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
					}
					SetFieldF('balance',$UserInfo['balance']-$summ);
				}
			}
		}else{
			$message = $Nick.', минимальная ставка 1000$';
		}
	}else{
		$message = $Nick.', недостаточно денег.';
	}
	return $message;
	
}


function Trade($p,$summ){
	global $balance,$Nick;
	if($summ>0){
		if($balance >= $summ){
			$rand = rand(6,47);
			$gain = round($summ/30*$rand)+$rand;
			$ClanBonuse = IncludeBonuse($gain,'bonuse_games_lvl');
			$ClanBonuseText = MessageBonuse($ClanBonuse);
			if($p == 'вверх'){
				if(ChanceProzent(40)){
					SetFieldF('balance',$balance+$gain+$ClanBonuse);
					$message = $Nick.', 📈курс подорожал на '.$rand.'$, вы выиграли: '.ConvertValute($gain)."$".WinEmoji(1)."<br>💰Баланс: ".ConvertValute($balance+$gain).$ClanBonuseText;
				}else{
					SetFieldF('balance',$balance-$summ);
					$message = $Nick.', 📉курс подешевел на '.$rand.'$, вы потеряли: '.ConvertValute($summ)."$".WinEmoji(0)."<br>💰Баланс: ".ConvertValute($balance-$summ);
				}
			}elseif($p == 'вниз' ){
				if(ChanceProzent(40)){
					SetFieldF('balance',$balance+$gain+$ClanBonuse);
					$message = $Nick.', 📉курс подешевел на '.$rand.'$, вы выиграли: '.ConvertValute($gain)."$".WinEmoji(1)."<br>💰Баланс: ".ConvertValute($balance+$gain).$ClanBonuseText;
				}else{
					SetFieldF('balance',$balance-$summ);
					$message = $Nick.', 📈курс подорожал на '.$rand.'$, вы потеряли: '.ConvertValute($summ)."$".WinEmoji(0)."<br>💰Баланс: ".ConvertValute($balance-$summ);
				}
			} 		
			
		}else{
				$message = $Nick.', недостаточно денег.';
			}
	}
	return $message;
	
}
function Stakan($stavka,$summ){
	global $balance,$Nick,$UserInfo;
	$Rand = rand(1,3);
	if($summ>0){
		if($stavka>0 && $stavka<=3){
			if($balance >= $summ ){
				$ClanBonuse = IncludeBonuse($summ,'bonuse_games_lvl');
				$ClanBonuseText = MessageBonuse($ClanBonuse);
				if ($Rand == $stavka || $UserInfo['stakan_on']==1){
					SetFieldF('balance',$balance+floor($summ*2)+$ClanBonuse);
					$message = $Nick.', вы угадали ваш приз: '.ConvertValute($summ*2)."$".WinEmoji(1)."<br>"."💰Баланс: ".ConvertValute($balance+floor($summ*2))."$".$ClanBonuseText;
				}else{
					SetFieldF('balance',$balance-floor($summ));
					$message = $Nick.', вы не угадали это был '.$Rand."-й напёрсток ".WinEmoji(0)."<br>"."💰Баланс: ".ConvertValute($balance-floor($summ*1))."$";
				}
			}else{
				$message = $Nick.', недостаточно денег.';
			}
		}
	}
	return $message;
	
}

function GoCasinoDonate($summ){
	global $UserInfo,$Nick;
	$summ = floor($summ);
	if($UserInfo['donate_balance']+$summ<100){
		$ChanceWin = ChanceProzent(28);
		$ChanceX5 = ChanceProzent(5);
		$ChanceX3 = ChanceProzent(10);
	}else{
		$ChanceWin = ChanceProzent(19);
		$ChanceX5 = ChanceProzent(1);
		$ChanceX3 = ChanceProzent(4);
	}
	if($summ>=10){
		if($UserInfo['donate_balance']>=$summ){
			$ChanceOne = ChanceProzent(10);
			if($ChanceWin ){
				if($ChanceX5 ){
					SetFieldF('donate_balance',$UserInfo['donate_balance']+floor($summ*5));
					$message = $Nick.', вы выиграли'.WinEmoji(1).' '.floor($summ*5).'$(x5)';
					$ch = 5;
				}elseif($ChanceX3){
					SetFieldF('donate_balance',$UserInfo['donate_balance']+floor($summ*3));
					$message = $Nick.', вы выиграли'.WinEmoji(1).' '.floor($summ*3).'$(x3)';
					$ch = 3;
				}else{
					SetFieldF('donate_balance',$UserInfo['donate_balance']+floor($summ));
					$message = $Nick.', вы выиграли'.WinEmoji(1).' '.floor($summ).'$(x2)';
					$ch = 2;
				}
			}elseif($ChanceOne){
				$message = $Nick.', вы нечего не потеряли'.WinEmoji(1).'(x1)';
			}else{
				$Chance075 = ChanceProzent(33);
				$Chance05 = ChanceProzent(36);
				$Chance025 = ChanceProzent(40);
				if($Chance075){
					SetFieldF('donate_balance',$UserInfo['donate_balance']-floor($summ*0.25));
					$message = $Nick.', вы проиграли '.WinEmoji(0).' -'.floor($summ*0.25).'$ (x0.75)'; 
					$ch = -0.25;
				}elseif($Chance05){
					SetFieldF('donate_balance',$UserInfo['donate_balance']-floor($summ*0.5));
					$message = $Nick.', вы проиграли '.WinEmoji(0).' -'.floor($summ*0.5).'$ (x0.5)'; 
					$ch = -0.5;
				}elseif($Chance025){
					SetFieldF('donate_balance',$UserInfo['donate_balance']-floor($summ*0.75));
					$message = $Nick.', вы проиграли '.WinEmoji(0).' -'.floor($summ*0.75).'$ (x0.25)'; 
					$ch = -0.75;
				}else{
					SetFieldF('donate_balance',$UserInfo['donate_balance']-$summ);
					$message = $Nick.', вы проиграли '.WinEmoji(0).' -'.($summ).'$ (x0)'; 
					$ch = -1;
				}
			}
			$donate_balance = selectFromIDVK(false,$UserInfo['id_VK'])['donate_balance'];
			$message .= '<br>💊Донатка: '.ConvertValute($donate_balance)." R<br>";
		}else{
			$message = $Nick.', недостаточно денег.
			💊Донатка: '.ConvertValute($UserInfo['donate_balance'])." R<br>";
		}
	}else{
		$message = $Nick.', минимальная ставка 10R.';
	}
	return $message;
}
function GoCasino($Rate,$AdmEmoji){
	global $UserInfo,$Nick,$balance;
	$file = file('files/casinojackpot.txt');
	if ($Rate >0){
		if($balance>=$Rate){
			$Casino = Casino($Rate*1,$AdmEmoji);
			$Casino = explode(' ',$Casino);
			switch($Casino[2]){
				case 1:
				$ClanBonuse = IncludeBonuse($Casino[0],'bonuse_games_lvl');
				$ClanBonuseText = MessageBonuse($ClanBonuse).'<br>';
				SetFieldF('balance',$balance+$Casino[0]+$ClanBonuse);
				$message = $Nick.', вы выиграли '.ConvertValute($Casino[0]).'$ ('.$Casino[1].')'.WinEmoji(1).$ClanBonuseText;
				$message .= '💰Баланс: '.ConvertValute($balance+($Casino[0]+$ClanBonuse))."$";
				break;
				case 0:
				SetFieldF('balance',$balance+$Casino[0]);
				$message = $Nick.', вы проиграли '.ConvertValute($Casino[0]).'$ ('.$Casino[1].')'.WinEmoji(0)."<br>";
				$message .= '💰Баланс: '.ConvertValute($balance+$Casino[0]*1)."$";
				if ($UserInfo['role'] <=2 && $UserInfo['markertop'] == 0 && $file[0]<=30000000000000){
					$message .= '<br>📈Jackpot: '.ConvertValute($file[0]).'$';
					
				}elseif ($file[0]>=30000000000000){
						$message .= '<br>📈Jackpot: '.ConvertValute($file[0]).'$';
				}
				break;
				case 2:
				$message = $Nick.', ваши деньги остаются при вас ('.$Casino[1].')'.WinEmoji(1)."<br>";
				$message .= '💰Баланс: '.ConvertValute($balance)."$";
				
				break;
			}
			AddCompleteTask(2,1);
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}else{
		$message = $Nick.', ставка должна быть минимум 1$';
		
	}
	return $message;
}
function Casino($Summ,$Chance = false){
	global $userId,$UserInfo,$AdminId;
	$rands = rand(1,100);
	$CH='';
	$Win = false;
	$fileJacpot = file('files/casinojackpot.txt');
	$chance_set = $UserInfo['chance_set'];
	if($chance_set != 1){
		SetFieldF('chance_set',1);
		if($chance_set == 0 ){
			$CH = 'x'.$chance_set;
			$Win = 0;
			return ($Summ*-1).' '.$CH.' '.$Win; 
		}
		$CH = 'x'.$chance_set;
		$Win = 1;
		return ($Summ*$chance_set).' '.$CH.' '.$Win; 
	}
	if (ChanceProzent(30)){
		$Randw = rand(1,100);
		if (ChanceProzent(1)){
			$Reward = 50;
			$CH='x50';
		}elseif(ChanceProzent(3)){
			$Reward = 5;
			$CH='x5';
		}elseif(ChanceProzent(5)){
			$Reward = 3;
			$CH='x3';
		}elseif($rands == 1 && $Summ >= 5000000000 && $UserInfo['role'] <=2 && $UserInfo['markertop'] == 0 && $fileJacpot[0]>=pow(10,12)*2.5){
			$Reward = 1;
			$Summ = $fileJacpot[0];
			$CH='🎉JACKPOT!🎉';
			$f = fopen('files/casinojackpot.txt','w+');
			fclose($f);
			$fp = fopen('files/casinojackpotplayer.txt','w+');
			fwrite($fp,'[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].']');
			fclose($fp);
		}else{
			$Reward = 1;
			$CH='x2';
			
		}
		$Win = 1;
	}elseif(ChanceProzent(10)){
		$Reward = 0;
		$CH = 'x1';
		$Win = 2;
	}else{
		$Rand = rand(1,4);
		if ($Rand == 1){
			$Reward = -1;
			$CH='x0';
		}elseif($Rand == 2){
			$Reward = -0.25;
			$CH='x0.75';
		}elseif($Rand == 3){
			$Reward = -0.5;
			$CH='x0.5';
		}elseif($Rand == 4){
			$Reward = -0.75;
			$CH='x0.25';
		}
		if ($UserInfo['role'] <=2 && $UserInfo['markertop'] == 0 && $fileJacpot[0] < pow(10,12)*3){
			$f = fopen('files/casinojackpot.txt','w+');
			fwrite ($f,$fileJacpot[0]+abs($Summ*0.05));
			fclose($f);
		}
		$Win = 0;
	}
	
	if ($UserInfo['role']>=3 && $Chance){	
	$ArrEmoji = array('💎','😎','🌚','🌝','🙃','🎁');
	$arrNum = array(rand(9000,9000*3),777,50,-1,3600,1);
	$Reward = str_replace($ArrEmoji,$arrNum,$Chance);
	$Win = 1;
	$CH = 'x'.$Reward.'';		
		
	}
	
	return ($Summ*$Reward).' '.$CH.' '.$Win; 
}

//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//
?>