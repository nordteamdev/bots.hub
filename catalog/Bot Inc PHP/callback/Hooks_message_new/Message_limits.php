<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 17.12.17
 * Time: 22:37
 *
 * Хука, реализующая ограничения по количеству сообщений
 */

function message_global_limits()
{
	global $Sql, $Vk, $data, $settings;

	@$limits_day = $Sql->get_from_user_db(
		$settings['vk_id'],
		$settings['group_id'],
		"%Ограничения ответов в сутки%"
	)["output"];
	@$limits_text = $Sql->get_from_user_db($settings['vk_id'], $settings['group_id'], "%Текст ограничения%")["output"];

	if (!empty($limits_text)) {
		$user_count_messages = $Sql->get_count_messages_today($settings['group_id'], $data->object->user_id);
		if (is_numeric($limits_day) and $user_count_messages > $limits_day) {
			$Vk->messages_send($data->object->user_id, "", $limits_text);
			exit("ok");
		}
	}
}

function message_local_limits()
{
	global $Sql, $Vk, $data, $settings;

	$limit = $Sql->get_exact_limits_user_db($settings['vk_id'], $settings['group_id'], $data->object->body);
	if ($limit) {

		$user_count_messages = $Sql->get_exact_count_messages_by_date(
			$settings['group_id'],
			$data->object->user_id,
			$data->object->body,
			$limit["limit_time"]
		);

		if ($user_count_messages > $limit["limit_count"]) {

			$Vk->messages_send($data->object->user_id, "", $limit["limit_text"]);
			exit("ok");
		}
	}
}

message_global_limits();
message_local_limits();