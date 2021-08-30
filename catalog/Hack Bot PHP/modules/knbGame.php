<?php

function Knb($type){
	global $UserInfo,$Nick,$admin;
	if($type == 'помощь'){
		return HelpKnb();
	}
	$uKnb = json_decode($UserInfo['knb'],1);
	$DefaultKnb = ['k'=>4,'n'=>4,'b'=>4,'stars'=>3];
	$type = SwitchTypeKnb($type);
	$uKnb = empty($uKnb) ? $DefaultKnb : $uKnb;

	$dirGame = 'games/knb/knb.txt';
	$timeGame = file_get_contents($dirGame);
	if(GetBanTime($timeGame) != 'ok'){
		if($uKnb['stars']>0){
			if($type){
				if($uKnb[$type]-1 >=0){
					$dirGame = 'games/knb/knbProcess.json';
					$Json = json_decode(file_get_contents($dirGame),1);
					$Json = empty($Json) ? array() : $Json;
					
					if(count($Json)>=1 && empty($Json[$UserInfo['id_VK']]) ){
						if(!empty($Json[$UserInfo['id_VK']])){ // если есть в файле то удалить
							$dataUserInfoKnb = $Json[$UserInfo['id_VK']];
							unset($Json[$UserInfo['id_VK']]);
							$unset = 1;
						}
						$JsonKeys = array_keys($Json); 
						$player_id = $JsonKeys[rand(0,count($JsonKeys)-1)];
						$playerMove = $Json[$player_id]['move'];
						$CalculateKnb = CalculateKnb($type,$playerMove);
						
						$Player = selectFromIDVK($player_id);
						$pKnb = json_decode($Player['knb'],1);
						//$text для второго игрока
						if($CalculateKnb['win'] == 0){
							$uKnb['stars'] += 1;
							$pKnb['stars'] -= 1;
							$message = $Nick.', вы ✅выиграли✅ противник поставил '.$CalculateKnb['abbr'].'<br>'.
							'Ваши звезды: '.($uKnb['stars']).SwitchEmoji('stars');

							$text = $Player['name'].',  "'.$UserInfo['name'].'" сыграл с вами в КНБ и вы ❌проиграли❌, он поставил '.SwitchTypeKnb($CalculateKnb['abbr'],1).'<br>'.
							'Ваши звезды: '.($pKnb['stars']).SwitchEmoji('stars');

						}elseif($CalculateKnb['win'] == 1){
							$uKnb['stars'] -= 1;
							$pKnb['stars'] += 1;
							$message = $Nick.', вы ❌проиграли❌ противник поставил '.$CalculateKnb['abbr'].'<br>'.
							'Ваши звезды: '.($uKnb['stars']).SwitchEmoji('stars');

							$text = $Player['name'].',  "'.$UserInfo['name'].'" сыграл с вами в КНБ и  вы ✅выиграли✅ противник поставил '.SwitchTypeKnb($CalculateKnb['abbr'],1).'<br>'.
							'Ваши звезды: '.($pKnb['stars']).SwitchEmoji('stars');

						}elseif($CalculateKnb['win'] == 2){
							$message = $Nick.', ♻ничья♻ <br>'.
							'Ваши звезды: '.($uKnb['stars']).SwitchEmoji('stars');

							$text = $Player['name'].',  "'.$UserInfo['name'].'" сыграл с вами в КНБ и  у вас ♻ничья♻<br>'.
							'Ваши звезды: '.($pKnb['stars']).SwitchEmoji('stars');
						}
						$uKnb[$type]-=1;
						SellMsg($Player['id_VK'],$text);
						SetFieldF('knb',json_encode($uKnb,JSON_UNESCAPED_UNICODE));
						SetField('knb',json_encode($pKnb,JSON_UNESCAPED_UNICODE),$Player['id_VK']);

						unset($Json[$player_id]);
						if($unset == 1){
							array_push($Json, $dataUserInfoKnb);
						}
						file_put_contents($dirGame, json_encode($Json,JSON_UNESCAPED_UNICODE));
					}elseif(empty($Json[$UserInfo['id_VK']])){// если нету в файле
						$Json[$UserInfo['id_VK']] = ['move'=>$type];
						$uKnb[$type]-=1;
						SetFieldF('knb',json_encode($uKnb,JSON_UNESCAPED_UNICODE));
						file_put_contents($dirGame, json_encode($Json,JSON_UNESCAPED_UNICODE));
						$message = $Nick.', вы сделали свой ход подождите пока кто нибудь сыграет.';
					}else{
						$message = $Nick.', вы уже оставляли заявку, подождите пока кто нибудь сделает ход.';
					}	
				}else{
					if($uKnb['k'] == 0 && $uKnb['n'] == 0 && $uKnb['b'] == 0 && $uKnb['stars']>=3){
						$reward = rand(1,5)*KKK('1k');
						if(ChanceProzent(30)){
							$reward *= rand(1,50);
							if(ChanceProzent(20)){
								$reward *= rand(1,10);
								if(ChanceProzent(20)){
									$reward *= rand(1,10);
									if(ChanceProzent(20)){
										$reward *= rand(1,4);
										if(ChanceProzent(20)){
											$reward *= rand(1,10);
										}
									}
								}
							}
						}
						$message = $Nick.', вы 🎉победили🎉 в игре!!!<br>'.
						'Ваша награда: '.ConvertValute($reward).'$<br>'.
						'🔔Мы обнулили ваш процесс, вы можете играть еще.';
						$text = '"'.$UserInfo['name'].'" выиграл в кнб: '.ConvertValute($reward).'$';
						SellMsg($admin,$text);
						SetFieldF('dollar',$UserInfo['dollar']+$reward);
						SetFieldF('knb',null);
					}else{
						$message = $Nick.', у вас закончились карточки данного типа.<br>'.
						'Ваши карты:<br>'.
						'✊: '.$uKnb['k'].'<br>'.
						'✌'.$uKnb['n'].'<br>'.
						'🤚'.$uKnb['b'].'<br>'.
						SwitchEmoji('stars').'Ваши звезды: '.($uKnb['stars']);
					}

					
				}
			}else{
				$message = $Nick.', выберите ход: камень/ножницы/бумага.<br>'.
				'Ваши карты:<br>'.
				'✊: '.$uKnb['k'].'<br>'.
				'✌'.$uKnb['n'].'<br>'.
				'🤚'.$uKnb['b'].'<br>'.
				SwitchEmoji('stars').'Ваши звезды: '.($uKnb['stars']);
			}
		}else{
			$str = '⏱До конца игр: '.GetBanTime($timeGame).'<br>';
			$message = $Nick.', вы проиграли в этой игре,<br> подождите когда начнется новая или купите звезды во вкладке "донат"<br>'.$str;
		}
	}else{
		$message = $Nick.', игры длятся с понедельника по пятницу.';
	}
	return $message;
}
function HelpKnb(){
	global $Nick;
	$message = $Nick.', игра кнб:<br>'.
	'		Суть игры: <br>'.
	ConvertNumEmoji(1).'С самого начала вам дается по 4 карты типов ✊✌🤚 и  3 звезды'.SwitchEmoji('stars').'<br>'.
	ConvertNumEmoji(2).'Пишите "Кнб [тип карты]" чтобы сыграть с другими игроками<br>'.
	ConvertNumEmoji(3).'Если вы выиграли другого игрока, то вы получаете 1 звезду'.SwitchEmoji('stars').'<br>'.
	ConvertNumEmoji(4).'Если вы проиграли то вы теряете 1 звезду'.SwitchEmoji('stars').'<br>'.
	ConvertNumEmoji(5).'При каждой игре количество ваших карт определенного типа снижается на 1.<br>'.
	ConvertNumEmoji(6).'Чтобы победить вам надо сохранить минимум 3 звезды'.SwitchEmoji('stars').'и потратить все карты.<br>'.
	ConvertNumEmoji(7).'Награда за победу в игре случайная, максимальная награда 1.000.000.000$.<br>'.
	ConvertNumEmoji(8).'Если вы потеряли все карты но сохранили больше 1 и меньше 3 звезд'.SwitchEmoji('stars').' то вы можете купить определенные карты во вкладке "донат".<br>'.
	ConvertNumEmoji(9).'Так же вы можете докупить звезды'.SwitchEmoji('stars').'<br>'.
	'Удачи!';
	return $message;
}
function CalculateKnb($first,$second){
	if($first == 'k' && $second == 'n'){ // камень => ножницы
		$win = 0;
		$abbr = 'ножницы';
	}elseif($first == 'n' && $second = 'k'){ // ножницы => камень
		$win = 1;
		$abbr = 'камень';
	}elseif($first == 'b' && $second == 'k'){// бумага => камень
		$win = 0;
		$abbr = 'камень';
	}elseif($first == 'k' && $second == 'b'){// камень => бумага
		$win = 1;
		$abbr = 'бумагу';
	}elseif($first == 'n' && $second == 'b'){// ножницы => бумага
		$win = 0;
		$abbr = 'бумагу';
	}elseif($first == 'b' && $second == 'n'){// бумага => ножницы
		$win = 1;
		$abbr = 'ножницы';
	}elseif($first == $second){
		$win = 2;
		$abbr = 'ничья';
	}
	return ['win'=>$win,'abbr'=>$abbr];
}
function GetRatesKnb(){
	$dirGame = 'games/knb/knbProcess.json';
	$Json = json_decode(file_get_contents($dirGame),1);
	$keys = array_keys($Json);
	for($i=0;$i<count($keys);$i++){
		$id = $keys[$i];
		$User = selectFromIDVK($id);
		$Name = '[id'.$id.'|'.$User['name'].']';
		$message .= ($i+1).'.'.$Name.'-'.SwitchTypeKnb($Json[$keys[$i]]['move'],1).'<br>';
	}
	return $message;
}
function SwitchTypeKnb($type,$returnType = false){
	switch ($type) {
		case 'k':
		case 'к':
		case 'камень':
			$type = 'k';
			$abbr = 'камень';
			break;
		case 'n':
		case 'н':
		case 'ножницы':
			$type = 'n';
			$abbr = 'ножницы';
			break;
		case 'b':
		case 'б':
		case 'бумага':
			$type = 'b';
			$abbr = 'бумагу';
			break;
		
		default:
			return false;
			break;
	}
	if($returnType){
		return $abbr;
	}
	return $type;
}
?>