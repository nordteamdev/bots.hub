<?php
function Ref($referal_code = false){
	global $UserInfo,$Nick,$mysqli,$admin;
	$isADM = $UserInfo['id_VK'] == $admin;
	if(!empty($referal_code)){
		if($UserInfo['referal_code'] != $referal_code || $isADM){
			if(empty($UserInfo['ref']) || $isADM){
				$User = $mysqli->query('SELECT * FROM `users` WHERE `referal_code`="'.$referal_code.'"')->fetch_assoc();
				if($User){
					$Reward = KKK('200k');
					SetFieldF('dollar',$UserInfo['dollar']+$Reward);
					SetField('dollar',$User['dollar']+($Reward*1.5),$User['id_VK']);
					SetFieldF('ref',$referal_code);
					SetField('referal_money',$User['referal_money']+2,$User['id_VK']);
					$count = $mysqli->query('SELECT * FROM `users` WHERE `ref`='.$UserInfo['id']);
					$message = $Nick.', вы получили '.ConvertValute($Reward).SwitchEmoji('dollar');
					SellMsg($User['id_VK'],'"'.$UserInfo['name'].'" ваш реферал +'.ConvertValute($Reward*1.5).'<br>+ 0️⃣2нуля');
					if($count%5 == 0){
						if($count%20 == 0){
							AddJsonValue('limits','limit_transfer',KKK('100k'),'+');
						}
					}
				}else{
					$message = $Nick.', игрока нет в системе.';
				}
			}else{
				$message = $Nick.', вы уже вводили реферальный код.';
			}
		}else{
			$message = $Nick.', вы не можете пригласить себя.';
		}
	}else{
		$message = ManualRef();
	}
	return $message;
}
function ManualRef(){
	global $UserInfo,$Nick;
	$message = $Nick.', если твой друг напишет боту "Друг '.$UserInfo['referal_code'].'"<br>'.
	'Ты получишь 200.000'.SwitchEmoji('dollar').'<br>'.
	'За каждого 20 приглашенного твой лимит передачи валюты увеличивается на 100.000'.SwitchEmoji('dollar').'<br>'.
	'НЕ ЗАНИМАЙСЯ СПАМОМ, ЭТА ТЕМА ИСКЛЮЧИТЕЛЬНО ДЛЯ УЖЕ ЗАРЕГИСТРИРОВАННЫХ ИГРОКОВ hack_bot.exe';
	return $message;
}
?>
