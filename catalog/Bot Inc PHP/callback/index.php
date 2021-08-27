<?php

include "MySQL.php";
include "VkAPI.php";
include "MyVkAPI.php";
include "Search.php";
include "Functions.php";
include "Hooks.php";
include "Emoji.php";

$Vk = new MyVkAPI;
$Sql = new MySQL;
$Search = new Search();

$data = json_decode(file_get_contents('php://input'));

$settings = $Sql->get_settings($data->group_id, $data->secret);
if (!$settings or ($settings["work"] == 0 and $data->type != "confirmation")) {
	exit("ok");
}

// Устанавиваем ключи
$Vk->access_token = $settings["access_token"];
$Vk->service_token = $settings["service_token"]; // В данный момент не используется
switch ($data->type) {

	case 'confirmation':
		$code = $settings["confirmation_code"];
		exit($code);

		break;

	case 'message_new':

		//Записываем во входящее
		$Sql->insert_message_new($data->group_id, $data->object->user_id, $data->object->body, $data->object->date);

		$Hooks = new Hooks($settings["functions"], "Hooks_message_new");
		foreach ($Hooks->hooks_array as $value) { // подключаем хуки
			include_once $value . ".php";
		}

		$answer = $Search->search($settings["vk_id"], $data->group_id, $data->object->body);

		$Func = new Functions($settings["functions"]);

		// если запрещенный вызов
		if($Func->is_in_blacklist($data->object->body)) {
			$Vk->messages_send(
				$data->object->user_id,
				"",
				$Search->randomize($Search->get_unfounded($settings["vk_id"], $data->group_id))
			);
			exit("ok");
		}

		// Проверяем функция ли это и есть ли такой файл
		if ($func_name = $Func->is_function($answer)) {
			if ($path_name = $Sql->isset_function($func_name) and $Func->is_set($path_name)) {
				include_once __DIR__ . "/Functions/$path_name.php";

				$func = new $path_name;
				$resp = $func->go();
				if (!$resp) {
					$Vk->messages_send(
						$data->object->user_id,
						"",
						$Search->randomize($Search->get_unfounded($settings["vk_id"], $data->group_id))
					);
				}
			}
			else {
				$Vk->messages_send(
					$data->object->user_id,
					"",
					$Search->randomize($Search->get_unfounded($settings["vk_id"], $data->group_id))
				);
			}
		}
		else {
			$Vk->messages_send($data->object->user_id, "", $Search->randomize($answer));
		}

		exit("ok");

		break;

	case 'group_join':
		$Sql->insert_group_join($data->group_id, $data->object->user_id, strtotime("now"));

		$Hooks = new Hooks($settings["functions"], "Hooks_group_join");
		foreach ($Hooks->hooks_array as $value) { // подключаем хуки
			include_once $value . ".php";
		}

		exit("ok");
		break;

	case 'group_leave':
		$Sql->insert_group_leave($data->group_id, $data->object->user_id, strtotime("now"));

		$Hooks = new Hooks($settings["functions"], "Hooks_group_leave");
		foreach ($Hooks->hooks_array as $value) { // подключаем хуки
			include_once $value . ".php";
		}

		exit("ok");
		break;

	case 'wall_repost':
		$Sql->add_repost(
			$data->group_id,
			$data->object->copy_history[0]->id,
			$data->object->copy_history[0]->owner_id,
			$data->object->from_id
		);

		$Hooks = new Hooks($settings["functions"], "Hooks_wall_repost");
		foreach ($Hooks->hooks_array as $value) { // подключаем хуки
			include_once $value . ".php";
		}

		exit("ok");
		break;

	default: // Если что-то другое пришло
		exit("ok");
		break;
}