<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 23.12.17
 * Time: 20:18
 */

function Advert()
{
	global $data, $Vk, $Sql, $settings;

	@$advert_text = $Sql->get_from_user_db(
		$settings['vk_id'],
		$settings['group_id'],
		"%Рекламный текст%"
	)["output"];

	@$advert_frequency = $Sql->get_from_user_db(
		$settings['vk_id'],
		$settings['group_id'],
		"%Частота повторов рекламы%"
	)["output"];

	@$advert_first = $Sql->get_from_user_db(
		$settings['vk_id'],
		$settings['group_id'],
		"%Первая реклама%"
	)["output"];

	if (!empty($advert_text) and !empty($advert_frequency)) {
		$user_count_messages = $Sql->get_count_messages_today($settings['group_id'], $settings['vk_id']);
		if (($user_count_messages % $advert_frequency == 0 and $user_count_messages != 0) or
			$user_count_messages == $advert_first) {
			$Vk->messages_send($data->object->user_id, "", $advert_text);
		}
	}
}

Advert();