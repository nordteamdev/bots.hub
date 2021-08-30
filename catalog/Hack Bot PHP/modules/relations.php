<?php

function Relations($id,$type){
	global $UserInfo,$Nick,$peer_id;
	$user_id = FastUserId();
	$Fwd = CheckFwd();
	$User = $Fwd ? selectFromIDVK($user_id) : selectFromID($id);
	$MinRole = 1;
	if($User){
		switch ($type) {
			case 'kiss':
			case 'поцеловать':
			case 'поцелуй':
			case 'kiss':
				$you = '💋поцеловали💋';
				$me = '💋Вас поцеловал';
				$conf = '💋поцеловал💋';
				break;
			case 'кончить':
			case 'конча':
				$MinRole = 2;
				$you = '💦кончили💦';
				$me = 'На вас 💦кончил💦';
				$conf = '💦кончил💦';
				break;
			case 'какать':
			case 'кекать':
				$MinRole = 2;
				$you = '💩накакали💩';
				$me = 'На вас 💩накакали💩';
				$conf = '💩накакал💩';
				break;
			case 'фак':
				$MinRole = 2;
				$you = '🖕факнули🖕';
				$me = 'На вас 🖕факнули🖕';
				$conf = '🖕факнул🖕';
				break;
			case 'пердануть':
			case 'пукать':
			case 'пук':
				$MinRole = 2;
				$you = '💨пукнули💨';
				$me = 'На вас 💨пукнули💨';
				$conf = '💨пукнул💨';
				break;
			case 'плюнуть':
			case 'харкнуть':
			case 'плевок':
				$MinRole = 2;
				$you = '💧плюнули💧';
				$me = 'На вас 💧плюнул💧';
				$conf = '💧плюнул💧';
				break;
			case 'sex':
			case 'секс':
			case 's':
				$you = '❤занялись сексом❤';
				$me = 'С вами ❤занялся сексом❤';
				$conf = '❤занялся сексом❤';
				break;
			case 'hug':
			case 'обнять':
			case 'обьятие':
			case 'объятие':
			$you = '💞обняли💞';
			$me = '💞Вас обнял';
			$conf = '💞обнял💞';
				break;
			case 'tokick':
			case 'пнуть':
				$you = '🔥пнули🔥';
				$me = '💞Вас 🔥пнул🔥';
				$conf = '🔥пнул🔥';
				break;
			case 'bump':
			case 'ударить':
			case 'удар':
				$you = '💥ударили💥';
				$me = '💞Вас 💥ударил💥';
				$conf = '💥ударил💥';
				break;
			default:
				# code...
				break;
		}

		if(Last_name($peer_id) != ''){
			$message = $Nick.', вы '.$you.' --> "[id'.$User['id_VK'].'|'.$User['name'].']"';
			$notif = GetJsonValue('settings','notif',$User['id_VK']);
			if($notif == 1){
				SellMsg($User['id_VK'],$me.' игрок "[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].']"');
			}
		}else{
			$message = 'Игрок "[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].']"  '.$conf.' --> "[id'.$User['id_VK'].'|'.$User['name'].']"';
		}
	
	}else{
		$message = $Nick.', игрока нет в системе';
	}
	return $message;
}


?>