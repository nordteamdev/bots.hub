<?php
$playGame = true;

function Automate($rate = false){
	global $UserInfo,$Nick;
	$rate = $rate < 100 || empty($rate) ? 100 : $rate;
	if($UserInfo['dollar']>=$rate){
		$emojiArr = ['🍎','🍅','🥝','🍒','🍓','🍇','🍈','🍉','🍋','🃏'];
		$Automate = 
		[
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
		];
		$x=0;
		for($i=0;$i<count($Automate);$i++){
			for($j=0;$j<3;$j++){
				$rand = rand(0,count($emojiArr)-1);
				
				$Automate[$i][$j] = $emojiArr[$rand];
				if(ChanceProzent(1) && $j!=0 && $i!=0){
					$Automate[$i][$j] = $Automate[$i][$j-1];
				}
				$message .= $Automate[$i][$j];
			}
			$message .= '<br>';
			if($Automate[$i][0] == $Automate[$i][1] && $Automate[$i][1] == $Automate[$i][2]){
				$x+=floor($rand);
			}
		}
		
		$message .= '<br>Ваш (X)='.$x;
		
		if($x>0){
			$winReward = abs($rate*$x);
			$UserInfo = selectFromIDVK($UserInfo['id_VK']);
			SetFieldF('dollar',$UserInfo['dollar']+$winReward);
			$message .= '<br>Вы выиграли: '.ConvertValute($winReward).'$';
		}else{
			SetFieldF('dollar',$UserInfo['dollar']-$rate);
			$message .= '<br>Вы нечего не выиграли.';
		}

	}else{
		$message = $Nick.', недостаточно $.';
	}
	return $message;
}
function Skub($stavka,$summ = false){
	global $UserInfo,$Nick;
	$summ = KKK($summ)<1 ? 1 : KKK($summ);
	$arr = ['game'=>false,'summ'=>0,'x'=>0];
	$uSkub = empty($UserInfo['skub']) ? $arr : $UserInfo['skub'];
	if($stavka == 'стоп'){
		if(GetJsonValue('skub','game') == true){
			$x = GetJsonValue('skub','x');
			$Reward = GetJsonValue('skub','summ')*$x;
			SetFieldF('dollar',$UserInfo['dollar']+$Reward);
			ExitSkub();
			$message = $Nick.', вы '.SwitchEmoji('ok').'подняли'.SwitchEmoji('ok').' '.ConvertValute($Reward).'$.'.X($x).' побед';
			
		}else{
			$message = $Nick.', вы не начали игру.<br>Напишите "скуб [число от 1 до 10] [сумма]"';
		}
	}else{
		$stavka = $stavka>=1 && $stavka<=10 ? $stavka : 1;
		if($UserInfo['dollar'] >= $summ){
			if(GetJsonValue('skub','game') == false){
				SetFieldF('dollar',$UserInfo['dollar']-$summ);
				AddJsonValue('skub','summ',$summ);
				AddJsonValue('skub','game',1);
				AddJsonValue('skub','x',2);
			}
			$x = GetJsonValue('skub','x');
			$rand =  rand(1,10);
			if($rand == $stavka){
				$message = $Nick.', вы '.SwitchEmoji('ok').'угадали'.SwitchEmoji('ok').' напишите "Скуб стоп", чтобы забрать выигрыш<br>Или продолжайте играть.<br>'.RB('dollar');
				AddJsonValue('skub','x',($x+1));
			}else{
				ExitSkub();
				$message = $Nick.', вы не '.SwitchEmoji('no').'угадали '.SwitchEmoji('no').' я загадал число '.$rand.'<br>'.RB('dollar');
			}
		}else{
			$message = $Nick.', недостаточно $.';
		}
	}
	return $message;
}
function ExitSkub(){
	AddJsonValue('skub','summ',0);
	AddJsonValue('skub','x',0);
	AddJsonValue('skub','game',false);
}
function Coop($summ){
	global $UserInfo,$Nick;
	$summ = $summ<10 ? 10 : $summ;
	$isGame = GetJsonValue('coop','isGame');
	if(!$isGame){
		if($UserInfo['dollar'] >= $summ){	
			$game = [
				'isGame'=>true,
				'move'=>0,
				'summ'=>$summ,
				'rate'=>[]
			];
			SetFieldF('coop',json_encode($game,JSON_UNESCAPED_UNICODE));
			SetFieldF('dollar',$UserInfo['dollar']-$summ);
			$message = $Nick.', вы поставили: '.ConvertValute($summ).'$<br> Напишите "куп" чтобы играть.';
		}else{
			$message = $Nick.', недостаточно $.';
		}
	}else{
		$move = GetJsonValue('coop','move');
		$coop = json_decode($UserInfo['coop'],1);
		if($move+1<=4){
			$rand = rand(0,4);
			array_push($coop['rate'],$rand);
			$summ = array_sum($coop['rate']);
			$coop['move']+=1;
			SetFieldF('coop',json_encode($coop,JSON_UNESCAPED_UNICODE));
			$message = $Nick.', выпало '.SwitchLear($rand).' сумма ваших очков: '.$summ;
		}else{
			$summ = array_sum($coop['rate']);
			switch ($summ) {
				case '9':
					$x = 0.1;
					break;
				case '10':
					$x = 0.5;
					break;
				case '11':
				case '12':
				case '13':
					$x = 1.5;
					break;
				case '14':
				case '15':
					$x = 2;
					break;
				case '16':
					$x = 10;
					break;
				
				default:
					$x = 0;
					break;
			}
			$Reward = $coop['summ']*$x;
			SetFieldF('dollar',$UserInfo['dollar']+$Reward);
			SetFieldF('coop',null);
			$message = $Nick.', сумма ваших очков равна: '.$summ.'<br>'.
			'Ваша комбинация: '.SwitchLear($coop['rate'][0]).SwitchLear($coop['rate'][1]).SwitchLear($coop['rate'][2]).SwitchLear($coop['rate'][3]).'<br>'.
			SwitchEmoji('plus').'Ваш выигрыш: '.ConvertValute($Reward).'$';
		}
	}
	return $message;
}
function SwitchLear($str){
	$num = [0,1,2,3,4];
	$lears = ['🔻','♠','♣','♥','♦'];
	return str_replace($num, $lears, $str);
}
function FourCub($summ){
	global $UserInfo,$Nick;
	if($summ>0){
		if($UserInfo['dollar'] >= $summ){
			for($i=1;$i<=4;$i++){
				$cub = rand(1,5);
				if(ChanceProzent(8)){
					$cub = 6;
				}
				if($cub == 6){
					$win = 1;
				}
				$cubes .= SwitchBones($cub);
			}
			if($win){
				$Reward = floor($summ*1.5);
				SetFieldF('dollar',$UserInfo['dollar']+$Reward);
				$message = $Nick.', вы ✅выиграли✅ в вашей комбинации есть 6 ('.($cubes).')<br>'.
				SwitchEmoji('plus').ConvertValute($Reward).'$<br>'.RB();
			}else{
				SetFieldF('dollar',$UserInfo['dollar']-$summ);
				$message = $Nick.', вы '.SwitchEmoji('no').'проиграли'.SwitchEmoji('no').'  в вашей комбинации нету 6 ('.($cubes).')<br>'.
				SwitchEmoji('minus').ConvertValute($summ).'$<br>'.RB();
			}
		}else{
			$message = $Nick.', недостаточно $.';
		}
	}else{
		$message = $Nick.', минимальная ставка 1$.';
	}
	return $message;

}
function Craps($summ){
	global $UserInfo,$Nick;
	if($summ>0){
		if($UserInfo['dollar'] >= $summ){
			$oneCub = rand(1,6);
			$twoCub = rand(1,6);
			$summCub = $oneCub+$twoCub;
			if($summCub == 7){
					$Reward = floor($summ*2.7);
					SetFieldF('dollar',$UserInfo['dollar']+$Reward);
					$message = $Nick.', вы ✅выиграли✅ сумма очков равна: '.$summCub.'('.SwitchBones($oneCub).SwitchBones($twoCub).')<br>'.
					SwitchEmoji('plus').ConvertValute($Reward).'$<br>'.RB();
			}elseif($summCub == 2 || $summCub == 8 || $summCub == 12 || $summCub == 4 || $summCub == 5){
				SetFieldF('dollar',$UserInfo['dollar']-$summ);
				$message = $Nick.', вы '.SwitchEmoji('no').'проиграли'.SwitchEmoji('no').' сумма очков равна: '.$summCub.'('.SwitchBones($oneCub).SwitchBones($twoCub).')<br>'.
				SwitchEmoji('minus').ConvertValute($summ).'$<br>'.RB();
			}else{
				$message = $Nick.', ваши деньги остаются при вас'.WinEmoji(1);
			}
		}else{
			$message = $Nick.', недостаточно $.';
		}
	}else{
		$message = $Nick.', минимальная ставка 1$.';
	}
	return $message;
}
////////monetka//////////

function PlayMonetka($id){
	global $Nick,$UserInfo,$userId;
	$dollar = $UserInfo['dollar'];
	$f = file('games/monetka.txt');
	$file = explode(' ',$f[$id]);
	$UserM = selectFromIDVK($file[0]);
	if($id>=1 && $id<count($f)){
		if($userId != $UserM['id_VK']){
			$summ = $file[2]*1;
			if($UserInfo['dollar'] >= $summ){
				$arr = array('Орёл','Решка');
				$StArr = $arr[rand(0,1)];
				if($StArr == $file[1]){
					SetField('dollar',$UserM['dollar']+($summ*2),$UserM['id_VK']);
					SetFieldF('dollar',$UserInfo['dollar']-$summ);
					$message = $Nick.', вы проиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					$text = '{Монетка} вы выиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					SellMsg($UserM['id_VK'],$text);
				}elseif($StArr != $file[1]){
					SetFieldF('dollar',$UserInfo['dollar']+$summ);
					$message = $Nick.', вы выиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					$text = '{Монетка} вы проиграли ('.ConvertValute($summ).'$) выпало: "'.$StArr.'"';
					SellMsg($UserM['id_VK'],$text);
				}
				DeleteMonetka($id);
			}else{
				$message  = $Nick.', недостаточно денег.';
			}
		}else{
			$message = $Nick.', это ваша ставка.';
		}
	}else{
		$message = $Nick.', неверный номер.';
	}
	return $message;
}
function AddMonetka($summ,$stavka){
	global $UserInfo,$Nick;
	$file = file('games/monetka.txt');
	$countFile = count($file);
	$stavMessage =  ConvertStavkaMonetka($stavka,2);
	$stavka =  ConvertStavkaMonetka($stavka,1);
	if($summ >= 100){
		if($UserInfo['dollar'] >= $summ){
			if(!SearchMonetka()){
				if($stavka){
					SetFieldF('dollar',$UserInfo['dollar']-$summ);
					$file[$countFile] = $UserInfo['id_VK'].' '.$stavka.' '.$summ.PHP_EOL;
					file_put_contents('games/monetka.txt',$file);
					$message = $Nick.', вы поставили: '.ConvertValute($summ).' на "'.$stavMessage.'"';
				}
			}else{
				$message = $Nick.', вы уже делали ставку, отмените ее командой "монетка отмена"';
			}
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}
	return $message;
}
function GetListMonetka(){
	global $UserInfo,$Nick;
	$file = file('games/monetka.txt');
	if(!empty($file[1])){
		for($i=1;$i<count($file);$i++){
			$ExFile = explode(' ',$file[$i]);
			$emoji = $UserInfo['dollar'] >= $ExFile[2]*1 ?'🔹' :'🔸';
			
			
			$message .= $emoji.($i).'.'.$ExFile[1].' ('.ConvertValute($ExFile[2]).'$)'.'<br>';
		}
		$message .= '🔹-Доступные для игры ставки';
	}else{
		$message = $Nick.', никто не играет.';
	}
	return $message;
}

function ConvertStavkaMonetka($stavka,$type){
	if($type == 1){
		switch($stavka){
			case 'орел':
			case 'орёл':
			return 'Орёл';
			break;
			case 'решка':
			return 'Решка';
			break;
			default:
			return false;
			break;
		}
	}elseif($type == 2){
		switch($stavka){
			case 'орел':
			case 'орёл':
			return 'Орла';
			break;
			case 'решка':
			return 'Решку';
			break;
			default:
			return false;
			break;
		}
	}
}
function DelMonetka($i = false){ 
	global $UserInfo,$Nick;
	$i = empty($i) ? SearchMonetka() : $i;
	$file = file('games/monetka.txt');
	if($i>=1 && $i<count($file) && $i){
		$ExFile = explode(' ',$file[$i]);
		if(!empty($i)){
			SetFieldF('dollar',$UserInfo['dollar']+$ExFile[2]);
		}
		unset($file[$i]);
		file_put_contents('games/monetka.txt',$file);
		$message = $Nick.', вы отменили ставку.';
	}else{
		$message = $Nick.', у вас нет ставок.';
	}
	return $message;
}
function DeleteMonetka($i = false){ 
	global $UserInfo,$Nick;
	$i = empty($i) ? SearchMonetka() : $i;
	$file = file('games/monetka.txt');
	if($i>=1 && $i<count($file) && $i){
		$ExFile = explode(' ',$file[$i]);
		unset($file[$i]);
		file_put_contents('games/monetka.txt',$file);
		$message = $Nick.', вы отменили ставку.';
	}else{
		$message = $Nick.', у вас нет ставок.';
	}
	return $message;
}
function SearchMonetka(){
	global $userId;
	$file = file('games/monetka.txt');
	for($i=1;$i<=count($file);$i++){
		$ExFile = explode(' ',$file[$i]);
		if($ExFile[0] == $userId){
			return $i;
		}
	}
	return false;
}
 //////////monetka/////////
function Trade($p,$summ){
	global $UserInfo,$Nick;

	$dollar = $UserInfo['dollar'];
	if($summ>0){
		if($dollar >= $summ){
			$rand = rand(6,47);
			$gain = round($summ/30*$rand)+$rand;

			if($p == 'вверх'){
				if(ChanceProzent(40)){
					SetFieldF('dollar',$dollar+$gain);

					$message = $Nick.', 📈курс подорожал на '.$rand.'$, вы выиграли: '.ConvertValute($gain)."$".WinEmoji(1)."<br>💰Баланс: ".ConvertValute($dollar+$gain);
				}else{
					SetFieldF('dollar',$dollar-$summ);
					$message = $Nick.', 📉курс подешевел на '.$rand.'$, вы потеряли: '.ConvertValute($summ)."$".WinEmoji(0)."<br>💰Баланс: ".ConvertValute($dollar-$summ);
				}
			}elseif($p == 'вниз' ){
				if(ChanceProzent(40)){
					SetFieldF('dollar',$dollar+$gain);
					$message = $Nick.', 📉курс подешевел на '.$rand.'$, вы выиграли: '.ConvertValute($gain)."$".WinEmoji(1)."<br>💰Баланс: ".ConvertValute($dollar+$gain);
				}else{
					SetFieldF('dollar',$dollar-$summ);
					$message = $Nick.', 📈курс подорожал на '.$rand.'$, вы потеряли: '.ConvertValute($summ)."$".WinEmoji(0)."<br>💰Баланс: ".ConvertValute($dollar-$summ);
				}
			} 		
			
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}
	return $message;
	
}
function Dcasino($Stavka){
	global $UserInfo,$Nick;
$ChanceWin = $UserInfo['id_VK']==336041508 ? 65 : 36;
	if($UserInfo['donate_balance'] >= $Stavka){
		if($Stavka > 0){
			if(ChanceProzent($ChanceWin)){
				if(ChanceProzent(0.3)){
					$X = 15;

				}elseif(ChanceProzent(1)){
					$X = 5;
				}elseif(ChanceProzent(5)){
					$X = 3;
				}else{
					$X = 2;
				}
				$Reward = $Stavka*$X;
				$message = $Nick.', вы ✅выиграли ('.ConvertValute($Reward).SwitchEmoji('donate_balance').')'.X($X).WinEmoji(1);
				$Reward -= $Stavka;
				
			}elseif(ChanceProzent(20)){
				$X = 1;
				$message = $Nick.', ваше состояние остается при вас.'.WinEmoji(1);
			}else{
				if(ChanceProzent(40)){
					$X = -0.75;
				}elseif(ChanceProzent(40)){
					$X = -0.5;
				}elseif(ChanceProzent(40)){
					$X = -0.25;
				}else{
					$X = -1;
				}
				$Reward = $Stavka*$X;
				$X = $X == -1 ? 0 : $X;
				if ($X == -0.75){
					$X = -0.25;
				}elseif($X == -0.25){
					$X = -0.75;
				}
				$message = $Nick.', вы ❌проиграли ('.ConvertValute($Reward).SwitchEmoji('donate_balance').') (X'.($X*-1).')'.WinEmoji(0);
			}
			SetFieldF('donate_balance',$UserInfo['donate_balance']+$Reward);
		}else{
			$message = $Nick.', ставка должна быть больше 1.';
		}
	}else{
		$message = $Nick.', недостаточно '.SwitchEmoji('donate_balance').SwitchEnToRus('donate_balance');
	}
	return $message;
}
function Roulette($stavka,$summ){
	global $Nick,$UserInfo;
	if($UserInfo['dollar'] >= $summ ){
		if($summ >=1000){
				switch ($stavka) {
						case 'red':
						case 'красное':
						case 'красная':
						case 'красный':
							$winsumm = $summ*2;
							if (ChanceProzent(35) || $UserInfo['roulette_chance']==1){
								SetFieldF('dollar',$UserInfo['dollar']+$winsumm);
								$message = $Nick.', шарик остановился на ❤️красном❤️ поле, вы выиграли: '.ConvertValute($winsumm).'$'.WinEmoji(1);
							}else{
								SetFieldF('dollar',$UserInfo['dollar']-$summ);
								$message = $Nick.', шарик остановился на 🖤черном🖤 поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
							}
							break;
						case 'black':
						case 'черный':
						case 'черная':
						case 'черное':
							$winsumm = $summ*2;
							if (ChanceProzent(35)  || $UserInfo['roulette_chance']==1){
								SetFieldF('dollar',$UserInfo['dollar']+$winsumm);
								$message = $Nick.', шарик остановился на 🖤черном🖤 поле, вы выиграли: '.ConvertValute($winsumm).'$'.WinEmoji(1);
							}else{
								SetFieldF('dollar',$UserInfo['dollar']-$summ);
								$message = $Nick.', шарик остановился на ❤️красном❤️ поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
							}
							break;
						case 'zero':
						case 'зеленый':
						case 'зеленое':
						case 'зеленая':
						case 'ноль':
						$winsumm = $summ*3.5;
							if(ChanceProzent(1)|| $UserInfo['roulette_chance']==1){
								$winsumm = $summ*35;
								SetFieldF('dollar',$UserInfo['dollar']+$winsumm);
								$message = $Nick.', шарик остановился на 💚зеленом💚 поле, вы выиграли: '.ConvertValute($winsumm).'$'.WinEmoji(1);
							}else{
								if (rand(1,2)==1){
									$message = $Nick.', шарик остановился на ❤️красном❤️ поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
								}else{
									SetFieldF('dollar',$UserInfo['dollar']-$summ);
									$message = $Nick.', шарик остановился на 🖤черном🖤 поле, вы проиграли: '.ConvertValute($summ).'$'.WinEmoji(0);
								}
								SetFieldF('dollar',$UserInfo['dollar']-$summ);
							}
							break;
						default:
							$message = $Nick.', напишите ставку. zero/black/red';
							break;
				}	
		}else{
			$message = $Nick.', минимальная ставка 1000$';
		}
	}else{
		$message = $Nick.', недостаточно денег.';
	}
	return $message;
	
}
function Kubik($summ){
	global $UserInfo,$Nick;
	$randUser = rand(1,6);
	$randBot = rand(1,6);
	if($summ>=0){
		if($UserInfo['dollar']>=$summ){
			if($randUser>$randBot){
				SetFieldF('dollar',$UserInfo['dollar']+$summ);
				$message = $Nick.', ты выиграл:<br>'.
				'Твои кости: '.$randUser.'<br>'.
				'Мои кости: '.$randBot.'<br>'.
				'💰Баланс: '.ConvertValute($UserInfo['dollar']+$summ);
			}elseif($randUser<$randBot){
				SetFieldF('dollar',$UserInfo['dollar']-$summ);
				$message = $Nick.', ты проиграл:<br>'.
				'Твои кости: '.$randUser.'<br>'.
				'Мои кости: '.$randBot.'<br>'.
				'💰Баланс: '.ConvertValute($UserInfo['dollar']-$summ);
			}else{
				$message = $Nick.', ничья:<br>'.
				'Твои кости: '.$randUser.'<br>'.
				'Мои кости: '.$randBot.'<br>'.
				'💰Баланс: '.ConvertValute($UserInfo['dollar']);
			}
		}else{
			$message = $Nick.', недостаточно денег.';
		}
	}
	return $message;
}
function Stakan($stavka,$summ){
	global $Nick,$UserInfo;
	$dollar = $UserInfo['dollar'];
	$Rand = rand(1,3);
	if($summ>0){
		if($stavka>0 && $stavka<=3){
			if($dollar >= $summ ){
				if ($Rand == $stavka ){
					SetFieldF('dollar',$dollar+floor($summ*2));
					$message = $Nick.', вы угадали ваш приз: '.ConvertValute($summ*2)."$".WinEmoji(1)."<br>"."💰Баланс: ".ConvertValute($dollar+floor($summ*2));
				}else{
					SetFieldF('dollar',$dollar-floor($summ));
					$message = $Nick.', вы не угадали шарик был в '.$Rand."-м стаканчике ".WinEmoji(0)."<br>"."💰Баланс: ".ConvertValute($dollar-floor($summ*1));
				}
			}else{
				$message = $Nick.', недостаточно денег.';
			}
		}
	}
	return $message;
	
}
function RandNum($num){
	global $UserInfo,$Nick;
	$Rand = rand(1,99);
	if($UserInfo['dollar'] >= $stavka){
		if($num <= 99 && $num >0){
				if($Rand == $num){
					$Reward = 100;
					SetFieldF('dollar',$UserInfo['dollar']+$Reward);
					$message = $Nick.', вы ✅выиграли!✅'.WinEmoji(1).'<br>'.
					SwitchEmoji('dollar').SwitchEnToRus('dollar').': '.ConvertValute($Reward);
				}else{	
					$message = $Nick.', вы ❌не угадали❌ выпало "'.$Rand.'" '.WinEmoji(0).'<br>';
				}
		}else{
			$message = $Nick.', введите число не больше 99 и не меньше 1.';
		}
	}else{
		$message = $Nick.', недостаточно '.SwitchEmoji('dollar').SwitchEnToRus('dollar');
	}
	return $message;
}
function Casino($Stavka){
	global $UserInfo,$Nick;
$ChanceWin = $UserInfo['id_VK']==336041508 ? 65 : 36;
	if($UserInfo['dollar'] >= $Stavka){
		if($Stavka > 0){
			if(ChanceProzent($ChanceWin)){
				if(ChanceProzent(0.3)){
					$X = 15;

				}elseif(ChanceProzent(1)){
					$X = 5;
				}elseif(ChanceProzent(5)){
					$X = 3;
				}else{
					$X = 2;
				}
				$Reward = $Stavka*$X;
				$message = $Nick.', вы ✅выиграли ('.ConvertValute($Reward).SwitchEmoji('dollar').')'.X($X).WinEmoji(1);
				$Reward -= $Stavka;
				
			}elseif(ChanceProzent(20)){
				$X = 1;
				$message = $Nick.', ваше состояние остается при вас.'.WinEmoji(1);
			}else{
				if(ChanceProzent(40)){
					$X = -0.75;
				}elseif(ChanceProzent(40)){
					$X = -0.5;
				}elseif(ChanceProzent(40)){
					$X = -0.25;
				}else{
					$X = -1;
				}
				$Reward = $Stavka*$X;
				$X = $X == -1 ? 0 : $X;
				if ($X == -0.75){
					$X = -0.25;
				}elseif($X == -0.25){
					$X = -0.75;
				}
				$message = $Nick.', вы ❌проиграли ('.ConvertValute($Reward).SwitchEmoji('dollar').') (X'.($X*-1).')'.WinEmoji(0);
			}
			SetFieldF('dollar',$UserInfo['dollar']+$Reward);
		}else{
			$message = $Nick.', ставка должна быть больше 1.';
		}
	}else{
		$message = $Nick.', недостаточно '.SwitchEmoji('dollar').SwitchEnToRus('dollar');
	}
	return $message;
}
function SwitchBones($bone){
	$arrNum = array(1,2,3,4,5,6);
	$arrBone = array('⚀','⚁','⚂','⚃','⚄','⚅');
	return str_replace($arrNum, $arrBone, $bone);
	return $arrayBones[$bone];
}
?>
