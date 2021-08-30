<?php
function GetStats(){
	global $UserInfo,$Nick;

	$message = $Nick.', ваша статистика:<br>'.
	'Вас взломали: '.ConvertValute(GetJsonValue('stats','hack')).'<br>'.	
	'У вас украдено $: '.ConvertValute(GetJsonValue('stats','grabmoney')).'<br>'.	
	'У вас украдено '.SwitchEmoji('btc').': '.ConvertValute(GetJsonValue('stats','grabbtc')).'<br>'.	
	'У вас украдено '.SwitchEmoji('bnc').': '.ConvertValute(GetJsonValue('stats','grabbnc')).'<br>'.
	'Вы украли $: '.ConvertValute(GetJsonValue('stats','megrabmoney')).'<br>'.	
	'Вы украли '.SwitchEmoji('btc').': '.ConvertValute(GetJsonValue('stats','megrabbtc')).'<br>'.	
	'Вы украли '.SwitchEmoji('bnc').': '.ConvertValute(GetJsonValue('stats','megrabbnc')).'<br>';
	return $message;

}
?>