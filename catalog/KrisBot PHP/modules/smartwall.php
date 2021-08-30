<?php
function wall_update(){
	global $vkue;
	$time = explode(':', date('H:i'));
	$emojiTime = array('0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣');
	$text_time = $emojiTime[$time[0][0]] . $emojiTime[$time[0][1]] . ':' . $emojiTime[$time[1][0]] . $emojiTime[$time[1][1]];
	$dialogs = $vkue->api->messages_getDialogs()['response']['count'];
	$messages = $vkue->api->messages_get()['response']['count'];

	global $cmds;
	$text = "";
	foreach ($cmds['messages'] as $cmd) {
	    if(isset($cmd['d']))
	        $text .="&#9654;".$cmd['d']."\n";
	}

	$edit = $vkue->api->wall_edit(['post_id' => 5, 'message' => "Обновлено - $text_time\nЯ работаю на VK-UNIVERSE ".$vkue->version." ( vk.com/bailian4ik )\n\nВсего диалогов - ".$dialogs."\nВсего сообщений - ".$messages."\n\n&#9889;Все доступные команды:\n".$text]);
	//file_put_contents(1, print_r($edit,1));
}
?>