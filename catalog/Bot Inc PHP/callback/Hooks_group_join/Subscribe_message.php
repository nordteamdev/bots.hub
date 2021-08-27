<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 22.12.17
 * Time: 0:01
 * Хука, отправляющая текст при подписке
 */

function subscribe_message() {

	global $data, $Vk, $Sql, $settings;
	@$subscribe_message = $Sql->get_from_user_db(
		$settings['vk_id'],
		$settings['group_id'],
		"%Сообщение при подписке%"
	)["output"];

	if(!empty($subscribe_message))
		$Vk->messages_send($data->object->user_id, "", $subscribe_message);
}
subscribe_message();