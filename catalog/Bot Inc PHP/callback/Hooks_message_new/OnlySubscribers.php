<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 19.06.17
 * Time: 22:42
 * Хука, определяющая подписан ли человек на паблик
 */

if (!$Sql->is_subscriber($data->group_id, $data->object->user_id)) { // Если в базе нет
	if ($Vk->is_subscriber($data->group_id, $data->object->user_id)) { // Если вк говорит, подписан
		$Sql->add_subscriber($data->group_id, $data->object->user_id);
	}
	else {
		$please_subscribe_text = $Sql->get_from_user_db(
			$settings['vk_id'],
			$settings['group_id'],
			"%Отвечать только подписчикам%"
		)["output"];
		if(!$please_subscribe_text)
		$Vk->messages_send($data->object->user_id, "", $please_subscribe_text); // Отправляем сообщение

		exit("ok");
	}

}