<?php

/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 19.06.17
 * Time: 22:58
 * Класс наследник VkAPI, чтобы не захламлять основной класс
 */
class MyVkAPI extends VkAPI
{
	public $service_token; // Нужен в некоторых методах

	public function is_subscriber($group_id, $user_id)
	{
		$resp = $this->groups_isMember($group_id, $user_id);
		if (!isset($resp->response)) {
			return false;
		}
		elseif ($resp->response == 1) {
			return true;
		}
		else {
			return false;
		}
	}

	public function messages_send($user_id = '', $chat_id = '', $message = '', $attachment = '')
	{
		$params = array();

		if ($chat_id == '') {
			$params['user_id'] = $user_id;
		}
		else {
			$params['chat_id'] = $chat_id;
		}

		if(mb_substr($message, 0, 1) == "@")
		{
			$message = mb_substr($message, 1); // Отсекаем @
			$message = explode(" ", $message); // разбиваем по пробелам
			if($attachment = "")
				$attachment = trim($message[0]); // Прикрепляем вложение
			else
				$attachment .= "," . trim($message[0]);

			unset($message[0]); // Отбрасываем прикрепление
			$message = trim(implode(" ", $message));
		}

		$params['message'] = $message;
		$params['attachment'] = $attachment;

		return $this->request("messages.send", $params);
	}

	public function add_photo_to_wall_group($photo, $group_id)
	{
		$photo = new CURLFile($photo);
		$upload_url = $this->photos_getWallUploadServer($group_id)->response->upload_url;

		if($upload_url != false)
		{
			$ch = curl_init($upload_url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, array('photo' => $photo));
			$result = curl_exec($ch);
			curl_close($ch);

			$obj = json_decode($result, true);

			$rq = $this->photos_saveWallPhoto("", $group_id, $obj["server"], $obj["photo"], $obj["hash"]);
			return $rq;
		}
	}
}