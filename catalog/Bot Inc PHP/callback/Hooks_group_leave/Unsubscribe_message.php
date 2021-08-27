<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 22.12.17
 * Time: 0:02
 * Хука, отправляющая текст при подписке
 */

function unsubscribe_message() {

	global $data, $Vk, $Sql, $settings;
	@$unsubscribe_message = $Sql->get_from_user_db(
		$settings['vk_id'],
		$settings['group_id'],
		"%Сообщение при отписке%"
	)["output"];

	if(!empty($unsubscribe_message))
		$Vk->messages_send($data->object->user_id, "", $unsubscribe_message);
}
unsubscribe_message();