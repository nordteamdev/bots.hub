<?php

require_once('vk.php');
include('economy.php');
include('function.php');
include('bizness.php');

define('CH','CHANNEL');
define('HP','HELP');
define('ST','STREAM');
define('TR','TRENDS');
define('JB','JOB');

$vk = new VK();

$id = id admin;

$cmd = ['казино', 'написать', 'профиль', 'баланс', 'работать', 'команды', 'передать', 'магазин', 'помощь', 'взломать'];

if($vk->data['type'] == 'message_new') {
	$peer_id = $vk->data['object']['peer_id']; // Id
	$user_id = $vk->data['object']['from_id']; // Id2
  $msg = $vk->data['object']['text']; // Msg
  $name = "[id".$user_id."|".$vk->name($user_id)[0]['first_name']."], ";
  $payload = $vk->data['object']['payload'];
  $payload = json_decode($payload, true);
  
  $msg = str_replace(',', ' ', $msg);
  $msg = str_replace(']', '}', $msg);
  $msg = trim(preg_replace('|\s+|', ' ', trim(preg_replace('/\[club[0-9]{1,}\|[^]]{1,}]/', '', $msg))));
  $msg = trim(preg_replace('|\s+|', ' ', trim(preg_replace('/\[id[0-9]{1,}\|[^]]{1,}]/', '', $msg))));
  $msg = mb_strtolower($msg, 'UTF-8'); 
  $msg = explode(' ', $msg);
  
  if(!file_exists("players/".$user_id)) {
  	$array = array(
  	  "ban" => false,
  	  "comp" => false,
      "money" => 1000,
      "dclient" => 0,
      "nclient" => 0,
    );
    $data = serialize($array);
    @file_put_contents("players/".$user_id, $data);
    $vk->send($peer_id, $name."Твой профиль был зарегистрирован! 😛\nНапиши «помощь» (без кавычек), для помощи ❓");
  } else {
  	$d = file_get_contents('players/'.$user_id);
	  $a = unserialize($d);
  	if($a['ban'] == true and in_array($msg[0], $cmd)) {
  		$vk->send($peer_id, $name."Твой аккаунт заблокирован! 🚫");
  	} else {
  	
  	switch($msg[0]) {
  		
  		case 'работать':
  		  $r = mt_rand(2, 15);
  		  addMoney($user_id, $r);
  		  $vk->send($peer_id, $name."Рабочий день окончен! 😘\nТы заработал ".$r."$ 💵");
  		break;
  		
  		case 'баланс':
  		  $vk->send($peer_id, $name."Твой баланс: ".getMoney($user_id)."$ 🤑");
  		break;
  		
  		case 'помощь':
  		  $vk->send($peer_id, $name."Теперь ты программист. Твоя задача: выполнять заказы, и оставлять клиентов довольными! Свою рупутацию ты можешь посмотреть с помощью команды «профиль» 💿\n\n  📱 Для начала купи свое первое устройство. Сделать это можно в магазине (команда: «магазин»). Подзаработать денег можно с помощью команды «работать» 😃\n\n  📕 После этого можешь приступить к работе! Пиши и продавай свои программы. Сделать это можно с помощью команды «написать» 😎");
  		break;
  		
  		case 'магазин':
  		  if(!isset($msg[1])) {
  		  	$vk->send($peer_id, $name."Список устройств:\n\n 📱 Телефон\n  Цена: 1.000$\n  Заработок с одного заказа: 10-30$\n\n 📺 Телевизор\n  Цена: 3.000$\n  Заработок с одного заказа: 30-90$\n\n 📟 Бабушкин_ноутбук\n  Цена: 5.000$\n  Заработок с одного заказа: 90-200$\n\n 💻 Ноутбук\n  Цена: 20.000$\n  Заработок с одного заказа: 200-500$\n\n ⌨ Компьютер\n  Цена: 100.000$\n  Заработок с одного заказа: 1.000-2.000$\n\n 📺 Микроволновка\n  Цена: 500.000$\n  Заработок с одного заказа: 5.000-20.000$\n\n💰 Для покупки введи: магазин <название товара>\n\n❌ Не хватает денег? Пиши «работать»");
  		  } else {
  		  	switch($msg[1]) {
  		  		
  		  		case 'телефон':
  		  		  if(getMoney($user_id) >= 1000) {
  		  		  	reduceMoney($user_id, 1000);
  		  		  	newComp($user_id, "phon");
  		  		  	$vk->send($peer_id, $name."Ты купил телефон! 😃");
  		  		  } else $vk->send($peer_id, $name."У тебя нет денег!");
  		  		break;
  		  		
  		  		case 'телевизор':
  		  		  if(getMoney($user_id) >= 3000) {
  		  		  	reduceMoney($user_id, 3000);
  		  		  	newComp($user_id, "tv");
  		  		  	$vk->send($peer_id, $name."Ты купил телевизор! 😃");
  		  		  } else $vk->send($peer_id, $name."У тебя нет денег!");
  		  		break;
  		  		
  		  		case 'бабушкин_ноутбук':
  		  		  if(getMoney($user_id) >= 5000) {
  		  		  	reduceMoney($user_id, 5000);
  		  		  	newComp($user_id, "bnoyt");
  		  		  	$vk->send($peer_id, $name."Ты купил ноутбук бабушки! 😃");
  		  		  } else $vk->send($peer_id, $name."У тебя нет денег!");
  		  		break;
  		  		
  		  		case 'ноутбук':
  		  		  if(getMoney($user_id) >= 20000) {
  		  		  	reduceMoney($user_id, 20000);
  		  		  	newComp($user_id, "noyt");
  		  		  	$vk->send($peer_id, $name."Ты купил ноутбук! 😃");
  		  		  } else $vk->send($peer_id, $name."У тебя нет денег!");
  		  		break;
  		  		
  		  		case 'компьютер':
  		  		  if(getMoney($user_id) >= 100000) {
  		  		  	reduceMoney($user_id, 100000);
  		  		  	newComp($user_id, "pc");
  		  		  	$vk->send($peer_id, $name."Ты купил комп! 😃");
  		  		  } else $vk->send($peer_id, $name."У тебя нет денег!");
  		  		break;
  		  		
  		  		case 'микроволновка':
  		  		  if(getMoney($user_id) >= 500000) {
  		  		  	reduceMoney($user_id, 500000);
  		  		  	newComp($user_id, "micro");
  		  		  	$vk->send($peer_id, $name."Ты купил микроволновку! 😃");
  		  		  } else $vk->send($peer_id, $name."У тебя нет денег!");
  		  		break;
  		  		
  		  	}
  		  }
  		break;
  		
  		case 'написать':
  		  if(getComp($user_id) != false) {
  		  	switch(getComp($user_id)) {
  		  		
  		  		case 'phon':
  		  		  $r = mt_rand(10, 30);
  		  		  addMoney($user_id, $r);
  		  		  if($r >= 15) {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она порадовала клиента! 📰\nТы заработал: ".$r."$");
  		  		  	addDClient($user_id);
  		  		  } else {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она не очень порадовала клиента! 💸\nТы заработал: ".$r."$");
  		  		  	addNClient($user_id);
  		  		  }
  		  		break;
  		  		
  		  		case 'tv':
  		  		  $r = mt_rand(30, 90);
  		  		  addMoney($user_id, $r);
  		  		  if($r >= 45) {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она порадовала клиента! 📰\nТы заработал: ".$r."$");
  		  		  	addDClient($user_id);
  		  		  } else {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она не очень порадовала клиента! 💸\nТы заработал: ".$r."$");
  		  		  	addNClient($user_id);
  		  		  }
  		  		break;
  		  		
  		  		case 'bnoyt':
  		  		  $r = mt_rand(90, 200);
  		  		  addMoney($user_id, $r);
  		  		  if($r >= 100) {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она порадовала клиента! 📰\nТы заработал: ".$r."$");
  		  		  	addDClient($user_id);
  		  		  } else {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она не очень порадовала клиента! 💸\nТы заработал: ".$r."$");
  		  		  	addNClient($user_id);
  		  		  }
  		  		break;
  		  		
  		  		case 'noyt':
  		  		  $r = mt_rand(200, 500);
  		  		  addMoney($user_id, $r);
  		  		  if($r >= 250) {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она порадовала клиента! 📰\nТы заработал: ".$r."$");
  		  		  	addDClient($user_id);
  		  		  } else {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она не порадовала клиента! 💸\nТы заработал: ".$r."$");
  		  		  	addNClient($user_id);
  		  		  }
  		  		break;
  		  		
  		  		case 'pk':
  		  		  $r = mt_rand(1000, 2000);
  		  		  addMoney($user_id, $r);
  		  		  if($r >= 1000) {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она порадовала клиента! 📰\nТы заработал: ".$r."$");
  		  		  	addDClient($user_id);
  		  		  } else {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она не порадовала клиента! 💸\nТы заработал: ".$r."$");
  		  		  	addNClient($user_id);
  		  		  }
  		  		break;
  		  		
  		  		case 'micro':
  		  		  $r = mt_rand(5000, 20000);
  		  		  addMoney($user_id, $r);
  		  		  if($r >= 10000) {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она порадовала клиента! 📰\nТы заработал: ".$r."$");
  		  		  	addDClient($user_id);
  		  		  } else {
  		  		  	$vk->send($peer_id, $name."Ты написал программу, и она не порадовала клиента! 💸\nТы заработал: ".$r."$");
  		  		  	addNClient($user_id);
  		  		  }
  		  		break;
  		  		
  		  	}
  		  } else $vk->send($peer_id, $name."У тебя нет оборудования! Купить его можно в магазине. 📌");
  		break;
  		
  		case 'профиль':
  		  $vk->send($peer_id, $name."Твой профиль:\n\n✏ Id: ".$user_id."\n?? Баланс: ".getMoney($user_id)."\n👍 Довольных клиентов: ".getDClient($user_id)."\n👎Недовольных клиентов: ".getNClient($user_id)."");
  		  	
  		break;
  		
  		case 'команды':
  		  $vk->send($peer_id, $name."Мои команды:\n\n • Баланс - просмотр баланса.\n\n • Профиль - просмотр профиля.\n\n • Магазин - покупка оборудования.\n\n • Написать - написать и продать программу.\n\n • Работать - работать.\n\n • Помощь - помощь по боту.\n\n • Казино - казино.\n\n • Передать - передать деньги.\n\n • Взломать - попробовать взломать что-либо.");
  		break;
  		
  		case 'addmon':
  		  if($id == $peer_id) {
  		  	if(isset($msg[1]) and isset($msg[2])) {
  		  		if(is_numeric($msg[2])) {
  		  			if(file_exists("players/".$msg[1])) {
  		  				addMoney($msg[1], $msg[2]);
  		  			  $vk->send($peer_id, $name."Ты выдал ".$msg[2]."$ игроку, с id ".$msg[1].".");
  		  			} else $vk->send($peer_id, $name."Игрока не существует!");
  		  		}
  		  	}
  		  }
  		break;
  		
  		case 'remmon':
  		  if($id == $peer_id) {
  		  	if(isset($msg[1])) {
  		  		//if(is_numeric($msg[2])) {
  		  			if(file_exists("players/".$msg[1])) {
  		  				remMoney($msg[1]);
  		  			  $vk->send($peer_id, $name."Ты очистил баланс игроку, с id ".$msg[1].".");
  		  			} else $vk->send($peer_id, $name."Игрока не существует!");
  		  		//}
  		  	}
  		  }
  		break;
  		
  		case 'рассылка':
  		  if($user_id == $id) {
  		  	if(isset($msg[1])) {
  		  	  foreach(glob("players/*") as $u) {
  		  	  	sleep(0.1);
  		  	  	$chat_id = str_replace('players/', '', $u);
  		  		  $vk->send($chat_id, "🆘 НОВЫЙ ПОСТ В ГРУППЕ: ".$msg[1]." 🆘");
  		  	  }
  		    }
  		  }
  		break;
  		
  		case 'казино':
  		  if(isset($msg[1])) {
  		  	if(is_numeric($msg[1]) and $msg[1] > 0) {
  		  		if(getMoney($user_id) >= $msg[1]) {
  		  			reduceMoney($user_id, $msg[1]);
  		  			if(mt_rand(1, 4) != 1) {
  		  				$vk->send($peer_id, $name."Ты проиграл(а)! 😓");
  		  			} else {
  		  				$s = $msg[1] * mt_rand(2, 3);
  		  				$vk->send($peer_id, $name."Ты выиграл(а) ".$s."$! 😏");
  		  				addMoney($user_id, $s);
  		  			}
  		  		} else $vk->send($peer_id, $name."У тебя нет денег! ❌");
  		  	} else $vk->send($peer_id, $name."Сумма ставки должна быть положительным числом! ❌");
  		  } else $vk->send($peer_id, $name."Ты должен(на) ввести сумму ставки! ❌");
  		break;
  		
  		case 'ban':
  		  if($peer_id == $id) {
  		  	if(isset($msg[1])) {
  		  		if(file_exists("players/".$msg[1])) {
  		  			ban($msg[1]);
  		  			$vk->send($peer_id, $name."Ты забанил игрока.");
  		  		} else $vk->send($peer_id, $name."Игрока не существует!");
  		  	}
  		  }
  		break;
  		
  		case 'unban':
  		  if($peer_id == $id) {
  		  	if(isset($msg[1])) {
  		  		if(file_exists("players/".$msg[1])) {
  		  			unban($msg[1]);
  		  			$vk->send($peer_id, $name."Ты разбанил игрока.");
  		  		} else $vk->send($peer_id, $name."Игрока не существует!");
  		  	}
  		  }
  		break;
  		
  		case 'stats':
  		  if($peer_id == $id) {
  		  	$zar = count(glob("players/*"));
  		  	$vk->send($peer_id, $name."Зарегистрированыx пользователей: ".$zar);
  		  	
  		  }
  		break;
  		
  		case 'передать':
  		  if(isset($msg[1]) and isset($msg[2])) {
  		  	if(is_numeric($msg[2]) and $msg[2] > 0) {
  		  		if(file_exists("players/".$msg[1])) {
  		  			if(getMoney($user_id) >= $msg[2]) {
  		  				$vk->send($peer_id, $name."Ты перевел ".$msg[2]."$ игроку с ID ".$msg[1]." 😎");
  		  				reduceMoney($user_id, $msg[2]);
  		  				addMoney($msg[1], $msg[2]);
  		  				} else $vk->send($peer_id, $name."У тебя нет денег! 🔄");
  		  		} else $vk->send($peer_id, $name."Данного игрока не существует! 🔄");
  		  	} else $vk->send($peer_id, $name."ID или сумма указана не в верном формате! 🔄");
  		  } else $vk->send($peer_id, $name."Использование: <ID> <сумма> 🔄");
  		break;
  		
  		case 'раздача':
  		  if($user_id == $id) {
  		  	foreach(glob("reposts/*") as $u) {
  		  	  sleep(0.1);
  		  	  $id = str_replace('reposts/', '', $u);
  		  	  addMoney($id, 50000);
  		  	  unlink($u);
  		  	  $vk->send($peer_id, $name."Раздача окончена!");
  		    }
  		  }
  		break;
  		
  		/*
  		case 'бизнес':
  		  if(file_exists('bizness/'.$user_id)) {
  		  if(!isset($msg[1])) {
  		  	if(getBizness($user_id)['name'] == false) {
  		  	  $vk->send($peer_id, $name."Использование: бизнес открыть/продать <название> <планета> 😎\n\nДоступные бизнесы:\n💻 РемонтКомпов\n  Цена: 100.000$\n  Доход: 1.000$ - 2.000$\n🎮 РазработкаИгр\n  Цена: 500.000$\n  Доход: 2.000$ - 5.000$\n⛔ ОператорСвязи\n  Цена: 900.000$\n  Доход: 5.000$ - 20.000$\n🌐 ItКомпания\n  Цена: 3.500.000$\n  Доход: 20.000$ - 50.000$\n🌍 Интернет\n  Цена: 20.000.000$\n  Доход: 50.000$ - 200.000$\n\nДоступные планеты:\n🌎 Land\n  Цена: бесплатно\n  Доп. прибыль: 0%\n🌋 Mars\n  Цена: + 10.000$ к цене бизнеса\n  Доп. прибыль: 20% от всей прибыли\n\n❔ Все планеты (кроме Land) дают тебе доп. прибыль к твоему бизнесу. К примеру твоя планета - Mars, а прибыль от бизнеса - 100$. В общей сложности ты получишь 120$.\n\nУдачи, бизнесмен 😛");
  		    } else {
  		    	$vk->send($peer_id, $name."Информация о твоем бизнесе:\n🌎 Планета: ".getBizness($user_id)['world']."\n👽 Тип: ".getBizness($user_id)['name']."\n\nДля того, чтобы работать, пиши «бизнес работать»");
  		    }
  		  } else {
  		  	switch($msg[1]) {
  		  		
  		  		case 'открыть':
  		  		  if(isset($msg[2]) and isset($msg[3])) {
  		  		  	if(getBizness($user_id)['name'] == false) {
  		  		  	
  		  		  	switch($msg[2]) {
  		  		  		
  		  		  		case 'ремонткомпов':
  		  		  		  switch($msg[3]) {
  		  		  		  	
  		  		  		  	case 'land':
  		  		  		  	  if(getMoney($user_id) >= 100000) {
  		  		  		  	  	reduceMoney($user_id, 100000);
  		  		  		  	  	newBiznes($user_id, 'ремонткомпов', 'land');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес! 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  	case 'mars':
  		  		  		  	  if(getMoney($user_id) >= 110000) {
  		  		  		  	  	reduceMoney($user_id, 110000);
  		  		  		  	  	newBiznes($user_id, 'ремонткомпов', 'mars');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  }
  		  		  		break;
  		  		  		
  		  		  		case 'разработкаигр':
  		  		  		  switch($msg[3]) {
  		  		  		  	
  		  		  		  	case 'land':
  		  		  		  	  if(getMoney($user_id) >= 500000) {
  		  		  		  	  	reduceMoney($user_id, 500000);
  		  		  		  	  	newBiznes($user_id, 'разработкаигр', 'land');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес! 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  	case 'mars':
  		  		  		  	  if(getMoney($user_id) >= 510000) {
  		  		  		  	  	reduceMoney($user_id, 510000);
  		  		  		  	  	newBiznes($user_id, 'разработкаигр', 'mars');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  }
  		  		  		break;
  		  		  		
  		  		  		case 'операторсвязи':
  		  		  		  switch($msg[3]) {
  		  		  		  	
  		  		  		  	case 'land':
  		  		  		  	  if(getMoney($user_id) >= 900000) {
  		  		  		  	  	reduceMoney($user_id, 900000);
  		  		  		  	  	newBiznes($user_id, 'операторсвязи', 'land');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес! 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  	case 'mars':
  		  		  		  	  if(getMoney($user_id) >= 910000) {
  		  		  		  	  	reduceMoney($user_id, 910000);
  		  		  		  	  	newBiznes($user_id, 'операторвсязи', 'mars');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  }
  		  		  		break;
  		  		  		
  		  		  		case 'itкомпания':
  		  		  		  switch($msg[3]) {
  		  		  		  	
  		  		  		  	case 'land':
  		  		  		  	  if(getMoney($user_id) >= 3500000) {
  		  		  		  	  	reduceMoney($user_id, 3500000);
  		  		  		  	  	newBiznes($user_id, 'itкомпания', 'land');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес! 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  	case 'mars':
  		  		  		  	  if(getMoney($user_id) >= 3600000) {
  		  		  		  	  	reduceMoney($user_id, 3600000);
  		  		  		  	  	newBiznes($user_id, 'itкомпания', 'mars');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  }
  		  		  		break;
  		  		  		
  		  		  		case 'интернет':
  		  		  		  switch($msg[3]) {
  		  		  		  	
  		  		  		  	case 'land':
  		  		  		  	  if(getMoney($user_id) >= 20000000) {
  		  		  		  	  	reduceMoney($user_id, 20000000);
  		  		  		  	  	newBiznes($user_id, 'интернет', 'land');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес! 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  	case 'mars':
  		  		  		  	  if(getMoney($user_id) >= 20010000) {
  		  		  		  	  	reduceMoney($user_id, 20010000);
  		  		  		  	  	newBiznes($user_id, 'интернет', 'mars');
  		  		  		  	  	$vk->send($peer_id, $name."Ты успешно открыл бизнес 😺");
  		  		  		  	  } else $vk->send($peer_id, $name."У тебя нет денег! 👻");
  		  		  		  	break;
  		  		  		  	
  		  		  		  }
  		  		  		break;
  		  		  		
  		  		  	}
  		  		  	
  		  		    } else $vk->send($peer_id, $name."У тебя уже есть бизнес! 😛");
  		  		  } else $vk->send($peer_id, $name."Использование: бизнес открыть <бизнес> <регион>");
  		  		break;
  		  		
  		  		case 'работать':
  		  		  if(getBiznes($user_id)['name'] != false) {
  		  		  $b = getBiznes($user_id)['name'];
  		  		  switch($b) {
  		  		  	
  		  		  	case 'ремонткомпов':
  		  		  	  if(getBiznes($user_id)['world'] == 'land') {
  		  		  	  	$s = mt_rand(1000, 2000);
  		  		  	  	addMoney($user_id, $s);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$s."$ ☺");
  		  		  	  } elseif(getBiznes($user_id)['world'] == 'mars') {
  		  		  	  	$s = mt_rand(1000, 2000);
  		  		  	  	$p = $s * 0.2;
  		  		  	  	$ss = $s + $p;
  		  		  	  	addMoney($user_id, $ss);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$ss."$ ☺");
  		  		  	  }
  		  		  	break;
  		  		  	
  		  		  	case 'разработкаигр':
  		  		  	  if(getBiznes($user_id)['world'] == 'land') {
  		  		  	  	$s = mt_rand(2000, 5000);
  		  		  	  	addMoney($user_id, $s);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$s."$ ☺");
  		  		  	  } elseif(getBiznes($user_id)['world'] == 'mars') {
  		  		  	  	$s = mt_rand(2000, 5000);
  		  		  	  	$p = $s * 0.2;
  		  		  	  	$ss = $s + $p;
  		  		  	  	addMoney($user_id, $ss);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$ss."$ ☺");
  		  		  	  }
  		  		  	break;
  		  		  	
  		  		  	case 'операторсвязи':
  		  		  	  if(getBiznes($user_id)['world'] == 'land') {
  		  		  	  	$s = mt_rand(5000, 20000);
  		  		  	  	addMoney($user_id, $s);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$s."$ ☺");
  		  		  	  } elseif(getBiznes($user_id)['world'] == 'mars') {
  		  		  	  	$s = mt_rand(5000, 20000);
  		  		  	  	$p = $s * 0.2;
  		  		  	  	$ss = $s + $p;
  		  		  	  	addMoney($user_id, $ss);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$ss."$ ☺");
  		  		  	  }
  		  		  	break;
  		  		  	
  		  		  	case 'itкомпания':
  		  		  	  if(getBiznes($user_id)['world'] == 'land') {
  		  		  	  	$s = mt_rand(20000, 50000);
  		  		  	  	addMoney($user_id, $s);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$s."$ ☺");
  		  		  	  } elseif(getBiznes($user_id)['world'] == 'mars') {
  		  		  	  	$s = mt_rand(20000, 50000);
  		  		  	  	$p = $s * 0.2;
  		  		  	  	$ss = $s + $p;
  		  		  	  	addMoney($user_id, $ss);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$ss."$ ☺");
  		  		  	  }
  		  		  	break;
  		  		  	
  		  		  	case 'разработкаигр':
  		  		  	  if(getBiznes($user_id)['world'] == 'land') {
  		  		  	  	$s = mt_rand(50000, 200000);
  		  		  	  	addMoney($user_id, $s);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$s."$ ☺");
  		  		  	  } elseif(getBiznes($user_id)['world'] == 'mars') {
  		  		  	  	$s = mt_rand(50000, 200000);
  		  		  	  	$p = $s * 0.2;
  		  		  	  	$ss = $s + $p;
  		  		  	  	addMoney($user_id, $ss);
  		  		  	  	$vk->send($peer_id, $name."Ты заработал ".$ss."$ ☺");
  		  		  	  }
  		  		  	break;
  		  		  	
  		  		  }
  		  		break;
  		  		
  		  	}
  		  } else $vk->send($peer_id, $name."У вас нет бизнеса! 😮");
  		  } else {
  		  	$a = array(
  	        "name" => false,
  	        "comp" => false,
            "pers" => 0,
            "world" => false,
            "g" => 0,
          );
          $d = serialize($a);
          @file_put_contents("bizness/".$user_id, $d);
  		  }
  		break;
  		*/
  		
  		case 'топ':
  		  $object = getTrends();
  		  $message = "Топ богачей 👑";
  		  for($i = 0; $i < 11; $i++) {
  		  	$message = $message."\n".$object[$i];
  		  }
  		  $vk->send($peer_id, $name.$message);
  		break;
  		
  		case 'взломать':
  		  if(isset($msg[1])) {
  		  	switch($msg[1]) {
  		  		
  		  		case 'магазин':
  		  		if(getMoney($user_id) >= 10000) {
  		  		  if(mt_rand(1, 3) == 2) {
  		  		  	addMoney($user_id, 5000);
  		  		  	$vk->send($peer_id, $name."У вас получилось! ✔");
  		  		  } else {
  		  		  	reduceMoney($user_id, 10000);
  		  		  	$vk->send($peer_id, $name."У вас не получилось! ❌");
  		  		  }
  		  		} else $vk->send($peer_id, $name."У вас нет денег. Для попытки взлома, у вас должно быть минимум столько денег, сколь нужно будет выплатить в случае неудачи. 😗");
  		  		break;
  		  		
  		  		case 'it-центр':
  		  		if(getMoney($user_id) >= 40000) {
  		  		  if(mt_rand(1, 6) == 3) {
  		  		  	addMoney($user_id, 20000);
  		  		  	$vk->send($peer_id, $name."У вас получилось! ✔");
  		  		  } else {
  		  		  	reduceMoney($user_id, 40000);
  		  		  	$vk->send($peer_id, $name."У вас не получилось! ❌");
  		  		  }
  		  		} else $vk->send($peer_id, $name."У вас нет денег. Для попытки взлома, у вас должно быть минимум столько денег, сколь нужно будет выплатить в случае неудачи. 😗");
  		  		break;
  		  		
  		  		case 'пентагон':
  		  		if(getMoney($user_id) >= 500000) {
  		  		  if(mt_rand(1, 12) == 6) {
  		  		  	addMoney($user_id, 100000);
  		  		  	$vk->send($peer_id, $name."У вас получилось! ✔");
  		  		  } else {
  		  		  	reduceMoney($user_id, 500000);
  		  		  	$vk->send($peer_id, $name."У вас не получилось! ❌");
  		  		  }
  		  		} else $vk->send($peer_id, $name."У вас нет денег. Для попытки взлома, у вас должно быть минимум столько денег, сколь нужно будет выплатить в случае неудачи. 😗");
  		  		break;
  		  		
  		  	}
  		  } else $vk->send($peer_id, $name."Ты можешь попытать удачу, и попробовать взломать одну, из представленных ниже организацию 😎\nВ случае удачи, тебе будет выплачена определенная сумма денег. В случае неудачи, с тебя будет взыскан штраф! 💸\n\n1⃣ Магазин\n  Вознаграждение: 5.000$\n  Штраф: 10.000$\n  Шанс: 1/3\n2⃣ It-центр\n  Вознаграждение: 20.000$\n  Штраф: 40.000$\n  Шанс: 1/6\n3⃣ Пентагон\n  Вознаграждение: 100.000$\n  Штраф: 500.000$\n  Шанс: 1/12\n\nДля попытки взлома, введи: взломать <название организации> 💯");
  		break;
  		
  	}
  
  }
 }
  
} elseif($vk->data['type'] == 'wall_repost') {
	$id_repost = $vk->data['object']['copy_history'][0]['id'];
	$id_user = $vk->data['object']['from_id'];
	if($id_repost == '18'){
		if(!file_exists('reposts/'.$id_user))
			@file_put_contents('reposts/'.$id_user, "complete");
  }
}