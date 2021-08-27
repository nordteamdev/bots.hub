<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 22.12.17
 * Time: 0:27
 */

class Random_with_exception
{
	public function go()
	{
		global $Vk, $Sql, $Search, $settings, $data;

		$resp = $Sql->get_from_user_db(
			$settings['vk_id'],
			$settings['group_id'],
			"рандом с исключением"
		);

		if ($resp["output"] != "") {
			$answer = $Search->randomize($resp["output"]);

			$resp = explode(";", $resp["output"]);
			for ($i = 0; $i < count($resp); $i++) {
				if ($resp[$i] == $answer) {
					unset($resp[$i]);
					$i = count($resp);
				}
			}
			$new = implode(";", $resp);

			$Sql->query(
				"UPDATE user_db SET output = ?s WHERE vk_id = ?s AND group_id = ?s AND input = ?s",
				$new,
				$settings['vk_id'],
				$settings['group_id'],
				"рандом с исключением"
			);

			$Vk->messages_send($data->object->user_id, "", $answer);

			return true;
		}
		else {
			$resp = $Sql->get_from_user_db(
				$settings['vk_id'],
				$settings['group_id'],
				"пустой рандом с исключением"
			);

			if ($resp != "") {
				$answer = $Search->randomize($resp["output"]);
				$Vk->messages_send($data->object->user_id, "", $answer);

				return true;
			}
			else
				return false;

		}
	}
}