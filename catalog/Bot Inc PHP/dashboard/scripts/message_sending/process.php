<?php
session_start();
include "../VkApi.php";
include "../MySQL.php";

$VK = new VkApi;
$SQL = new MySQL;
$user_id = $argv[1];
$group_id = $argv[2];

$user_info = $SQL->get_user_info($user_id, $group_id);
$VK->access_token = $user_info["access_token"];

$memcached = new Memcached();
$memcached->addServer('localhost', 11211);

$message = $memcached->get('message_sending_message_' . $user_id);
$attachment = $memcached->get('message_sending_attachment_' . $user_id);

$memcached->set('message_sending_value_now' . $user_id, 0); // Ставим в 0 и говорим, что идет загрузка сообщений

sending(
	$memcached->get('message_sending_from_' . $user_id),
	$memcached->get('message_sending_to' . $user_id),
	$message,
	$attachment,
	$VK
);

sleep(2); // Чтобы js понял
$memcached->delete('message_sending_start_' . $user_id);
$memcached->delete('message_sending_message_' . $user_id);
$memcached->delete('message_sending_attachment_' . $user_id);
$memcached->delete('message_sending_from_' . $user_id);
$memcached->delete('message_sending_to' . $user_id);


function sending($from, $to, $message = "", $attachment = "", $VK)
{
	global $memcached, $user_id;
	$count = $to - $from;
	if ($count > 5000) {
		$supp = array();
		for ($i = 0; $i < ($count / 5000); $i++) {
			$start = microtime(true); // Грамотно выставляем паузы

			$resp = $VK->execute(
				'
						var support = API.messages.getDialogs({"count": 200, "offset":' . ($from + $i * 5000) . '});
						var count = 0;
						var arr = [];
						arr.push(support);
						 while(count < 24)
						 {
							support = API.messages.getDialogs({"count": 200, "offset":1, "start_message_id":support.items[199].message.id});
							arr.push(support);
							
							count = count + 1;
						 }
						return arr;
			'
			);
			if (microtime(true) - $start < 0.3)
				usleep(300000 - round((microtime(true) - $start), 2) * 10000);

			$resp = $resp->response;

			for ($k = 0; $k < count($resp); $k++)
				for ($j = 0; $j < count($resp[$k]->items); $j++)
					array_push($supp, $resp[$k]->items[$j]->message->user_id);
		}

		unset($user_ids);
		$user_ids = array();

		for ($i = 0; $i < $count; $i++)
			$user_ids[$i] = $supp[$i];

	}
	elseif ($count > 200) {
		$user_ids = $VK->execute(
			'
						var support = API.messages.getDialogs({"count": 200, "offset":' . $from . '});
						var count = 0;
						var arr = [];
						arr.push(support);
						 while(count < 24)
						 {
							support = API.messages.getDialogs({"count": 200, "offset":1, "start_message_id":support.items[199].message.id});
							arr.push(support);
							
							count = count + 1;
						 }
						return arr;
				 '
		);

		$user_ids = $user_ids->response;
		$supp = array();
		for ($i = 0; $i < count($user_ids); $i++)
			for ($j = 0; $j < count($user_ids[$i]->items); $j++)
				array_push($supp, $user_ids[$i]->items[$j]->message->user_id);

		unset($user_ids);
		$user_ids = array();

		for ($i = 0; $i < $count; $i++)
			$user_ids[$i] = $supp[$i];

	}
	else {

		$user_ids = $VK->execute(
			'
						var dialogs = API.messages.getDialogs({"count": ' . $count . ', "offset":' . $from . '});
						
						var arr = [];
						
						var count = 0;
						while(count < dialogs.items.length)
						{
							arr.push(dialogs.items[count].message.user_id);
							count = count + 1;
						}
						
						return arr;
				 '
		);

		$user_ids = $user_ids->response;
	}

	$k = 0;

	// В соответстивии с длиной сообщения выставляем кол-во одновременныхз запросов в вк
	if (iconv_strlen($message) > 100) {
		$max = 1;
	}
	elseif (iconv_strlen($message) > 70) {
		$max = 3;
	}
	elseif (iconv_strlen($message) > 50) {
		$max = 5;
	}
	elseif (iconv_strlen($message) > 22) {
		$max = 10;
	}
	elseif (iconv_strlen($message) > 6) {
		$max = 17;
	}
	else {
		$max = 25;
	}

	for ($i = 0; $i < ($count / $max); $i++) {

		echo $i . "\n";
		$start = microtime(true); // Грамотно выставляем паузы
		$req = "";
		if ($i == (int)($count / $max)) {
			for ($j = 0; $j < $count % $max; $j++, $k++)
				$req .= 'API.messages.send({"user_id":' . $user_ids[$k] . ', "message":"' . $message .
						'", "attachment":"' . $attachment . '"});';
			$req .= 'return true;';
			$VK->execute($req);
		}
		else {
			for ($j = 0; $j < $max; $j++, $k++)
				$req .= 'API.messages.send({"user_id":' . $user_ids[$k] . ', "message":"' . $message .
						'", "attachment":"' . $attachment . '"});';
			$req .= 'return true;';
			$VK->execute($req);
		}


		// Устанавливем сколько процентов
		$memcached->set(
			'message_sending_value_now' . $user_id,
			(int)((100 * ($i + 1) * $max) / $count)
		);

		// Спим, если надо
		if (microtime(true) - $start < 0.3)
			usleep(300000 - round((microtime(true) - $start), 2) * 10000);

	}

	$memcached->set('message_sending_value_now' . $user_id, 100);
}






