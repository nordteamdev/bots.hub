<?php
function GetTimers(){
	global $UserInfo,$Nick;
	$str = '💼';
	$uBuisness = json_decode($UserInfo['buisness'],1);
	if(!empty($uBuisness)){
		if(!empty($uBuisness[0])){
			$oneBuisnessName ='💼'.$uBuisness[0]['name'];
			$oneBuisnessTime = CheckHour($uBuisness[0]['time'])[1] == 'ok' ? $oneBuisnessName.': '.SwitchEmoji('ok') : $oneBuisnessName.': '.CheckHour($uBuisness[0]['time']);
		}
		if(!empty($uBuisness[1])){
			$twoBuisnessName ='💼'.$uBuisness[1]['name'];
			$twoBuisnessTime = CheckHour($uBuisness[1]['time'])[1] == 'ok' ? $twoBuisnessName.': '.SwitchEmoji('ok') : $twoBuisnessName.': '.CheckHour($uBuisness[1]['time']);
		}

	}
	$Job = CheckTime(GetJsonValue('timers','job')) == 'ok' ? '✅' : CheckTime(GetJsonValue('timers','job'));
	$Code = CheckTime(GetJsonValue('timers','code')) == 'ok' ? '✅' : CheckTime(GetJsonValue('timers','code'));
	$Bonus = CheckTime(GetJsonValue('timers','bonus')) == 'ok' ? '✅' : CheckTime(GetJsonValue('timers','bonus'));
	$transfer = CheckTime(GetJsonValue('limits','time_transfer')) == 'ok' ? '✅' : CheckTime(GetJsonValue('limits','time_transfer'));
	$message = $Nick.', ваши таймеры:<br>'.
	SwitchEmoji('job').'Работа: '.$Job.'<br>'.
	'⚙Код: '.$Code.'<br>'.
	SwitchEmoji('bonus').'Бонус: '.$Bonus.'<br>'.
	$oneBuisnessTime.'<br>'.
	$twoBuisnessTime.'<br>'.
	SwitchEmoji('transfer').'Передача: '.$transfer;
	return $message;
}
?>