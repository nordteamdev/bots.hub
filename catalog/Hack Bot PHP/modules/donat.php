<?php
function BuyDonate($id = false,$twoMessage = false){
	global $UserInfo,$Nick,$admin,$kbd;
	if(empty($id)){
		if(empty($twoMessage)){
			$i = 1;
			$buttons = [];
			array_push($buttons, 'Команды');
			$message = $Nick.', весь донат ты видишь ниже:<br>';
			while (GetInfoProduct($i) != false) {
				$product = GetInfoProduct($i);
				array_push($buttons, 'Донат '.$i);
				$message .= $i.'. ('.$product['name'].') - '.ConvertValute($product['price']).SwitchEmoji('donate_balance').'<br>';
				$message .= '_________________________<br>';
				$i++;
			}
			$message .= SwitchEmoji('donate_balance').'Матрицы - Игровая донат-валюта';
			$message .= '🔔 Чтобы приобрести что-то напиши "донат [номер]".<br><br> 🔔 Чтобы пополнить счет матриц перейдите на : https://vk.cc/9HQ2SW <br><br>'.
			SwitchEmoji('ok').'У донатов есть описание,<br>напишите "донат [номер] инфо", чтобы узнать подробности.<br>';
			$message .= SwitchEmoji('donate_balance').'Ваши матрицы: '.ConvertValuteDouble($UserInfo['donate_balance']).'<br>';
			$kbd = CreateKeyboard($buttons);
		}

	}elseif(!empty($id) && $twoMessage == 'инфо'){
		$product = GetInfoProduct($id);
		if($product != false){
			$message = $Nick.', описание к донату: '.$id.'<br>'.$product['desc'];
		}else{
			$message = $Nick.', неверный номер.';
		}
	}else{
		$product = GetInfoProduct($id,1);
		if($product != false){
			if($product != 'enough money'){
				$comment = $product['comment'];
				$text = '"'.$UserInfo['name'].'" купил: "'.$product['name'].'"';
				SellMsg($admin,$text);
				$message = $Nick.', вы купили "'.$product['name'].'"<br>'.$comment;
			}else{
				$message = $Nick.', недостаточно матриц'.SwitchEmoji('donate_balance');
			}
		}else{
			$message = $Nick.', неверный номер.';
		}
	}
	return $message;
}
function GetInfoProduct($id,$buy = false){
	global $UserInfo;
	$desc = false;
	switch ($id) {
		case '1':
			$type = 'dollar';
			$count = KKK('1kkk');
			$price = 9;
			$name = ConvertValute($count).SwitchEmoji($type);
			$desc = SwitchEmoji('plus').ConvertValute($count).'$ на свой игровой баланс.';
			break;
		case '2':
			$type = 'dollar';
			$count = KKK('5kkk');
			$price = 39;
			$name = ConvertValute($count).SwitchEmoji($type);
			$desc = SwitchEmoji('plus').ConvertValute($count).'$ на свой игровой баланс.';
			break;
		case '3':
			$type = 'dollar';
			$count = KKK('15kkk');
			$price = 79;
			$name = ConvertValute($count).SwitchEmoji($type);
			$desc = SwitchEmoji('plus').ConvertValute($count).'$ на свой игровой баланс.';
			break;
		case '4':
			$type = 'dollar';
			$count = KKK('150kkk');
			$price = 120;
			$name = ConvertValute($count).SwitchEmoji($type);
			$desc = SwitchEmoji('plus').ConvertValute($count).'$ на свой игровой баланс.';
			break;
		case '5':
			$type = 'bnc';
			$count = KKK('10');
			$price = 5;
			$name = ConvertValute($count).SwitchEmoji($type);
			$desc = SwitchEmoji('plus').ConvertValute($count).SwitchEmoji($type).' для улучшения своей машины';
			break;
		case '6':
			$type = 'bnc';
			$count = KKK('100');
			$price = 40;
			$name = ConvertValute($count).SwitchEmoji($type);
			$desc = SwitchEmoji('plus').ConvertValute($count).SwitchEmoji($type).' для улучшения своей машины';
			break;
		case '7':
			$type = 'privelege';
			$value = 3;
			$count = 1;
			$price = 50;
			$time = time()+GetBanTimes('7d');
			$name = SwitchEmoji('bonus').'Privelege "VIP"';
			$comment = 'Напишите "cmd", чтобы узнать список команд.';
			$desc = SwitchEmoji('ok').'привелегия "VIP" НА НЕДЕЛЮ, смена цвета личной карты<br>'.
			'Вам будут доступны следующие команды и бонусы:<br>'.
			SwitchEmoji('plus').'Смена названия предметов.<br>'.
			SwitchEmoji('plus').'Максимальное кол-во ферм - 2.500.<br>'.
			SwitchEmoji('plus').'Лимит передачи валюты 1.000.000.000$ вместо 5.000$.<br>'.
			SwitchEmoji('plus').'Снижение цен на имущество -50% на бизнесы -20%.<br>';
			break;
			case '8':
			$type = 'privelege';
			$value = 3;
			$count = 1;
			$price = 400;
			$time = 'unlim';
			$name = SwitchEmoji('bonus').'Privelege "ADMIN"(Навсегда)';
			$comment = 'Напишите "cmd", чтобы узнать список команд.';
			$desc = SwitchEmoji('ok').'привелегия "ADMIN"(Навсегда),смена цвета личной карты  <br>Можете делать всё кроме как менять баланс игры.';
			break;
	

		default:
			return false;
			break;
	}
	if($buy){
		if($UserInfo['donate_balance'] >= $price){
			switch ($type) {
				case 'dollar':
					SetFieldF('dollar',$UserInfo['dollar']+$count);
					break;
				case 'bnc':
					AddJsonValue('bnc','bnc',$count,'+');
					break;
				case 'ppack':
					AddJsonValue('hack','refresh_time',time()+($count*3600));
					break;
				case 'ppack':
					SetIp();
					break;
				case 'privelege':
					SetFieldF('role',$value);
					AddJsonValue('role_settings','time',$time);
					break;
				case 'knb':
					AddJsonValue('knb',$value,$count,'+');
					break;	
				case 'change_ip':
					SetFieldF('ip',SetIp());
					break;
				default:
					return false;
					break;
			}
			SetFieldF('donate_balance',$UserInfo['donate_balance']-$price);
		}else{
			return 'enough money';
		}
	}
	return [
		'type'=>$type,
		'count'=>$count,
		'price'=>$price,
		'name'=>$name,
		'comment'=>$comment,
		'desc'=>$desc
		];
}
?>