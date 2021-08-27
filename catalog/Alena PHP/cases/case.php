<?php
function BuyCase($id = false){
	global $UserInfo,$Nick,$mysqli;
	if(empty($id)){
		$message = $Nick.', кейсы:<br>'.
		'1.Кейс 1 - 5.000.000.000$';
		$message .= '<br>Для покупки напишите кейсы [номер]';
	}else{
		$id *=1;
		if($id > 0 && $id<=1){
			$CaseInfo = GetChanceCase($id);
			if($UserInfo['balance'] >= $CaseInfo['price']){
				SetFieldF('balance',$UserInfo['balance'] - $CaseInfo['price']);
				unset($CaseInfo['price']);
				$UserInfo = selectFromIDVK(false,$UserInfo['id_VK']);
				for($i = 0; $i < count($CaseInfo); $i++){
					$key = key($CaseInfo);
					if(ChanceProzent($CaseInfo[$key])){
						$win = 1;
						$rewardInfo = GetRewardCase($id,$key);
						if($key != 'farm'){
							$Reward = rand($rewardInfo['first'],$rewardInfo['second'])*$rewardInfo['step'];
							SetFieldF($key,$UserInfo[$key] + $Reward);
							$message = $Nick.', вы выиграли: '.ConvertValute($Reward).' '.SwitchTypeRewardCases($key);
						}else{
							$id_farm = !empty($UserInfo['id_farm']) ? $UserInfo['id_farm'] : 1;
							$FarmInfo = $mysqli->query('SELECT * FROM `farm` WHERE `id`='.$id_farm)->fetch_assoc();
							$name_farm = $FarmInfo['name'];
							$count_farm = rand($rewardInfo['first'],$rewardInfo['second'])*$rewardInfo['step'];
							SetFieldF('count_farm',$UserInfo['count_farm'] + $count_farm);
							SetFieldF('id_farm',$id_farm);
							SetFieldF('name_farm',$name_farm);
							SetFieldF('time_farm',time());
							$message = $Nick.', вы выиграли: (x'.ConvertValute($count_farm).') '.SwitchTypeRewardCases($key);
							
						}
					}
					next($CaseInfo);
				}
				if($win  != 1 ){
					$message = $Nick.', вы нечего не выиграли';
				}
			}else{
				$message = $Nick.', недостаточно денег.';
			}
		}else{
			$message = $Nick.', неверный номер.';
		}
	}
	return $message;
}
function SwitchTypeRewardCases($type){
	switch ($type) {
		case 'rating':
			$text = '👑Рейтинг';
			break;
		case 'money':
			$text = '💰Валюта';
			break;
		case 'BTC':
			$text = '🌐Биткоины';
			break;
		case 'TPC':
			$text = '💷Тайпанкоины';
			break;
		case 'farm':
			$text = '🔋Фермы';
			break;
		
		default:
			# code...
			break;
	}
	return $text;
}
function GetChanceCase($id){
	switch ($id) {
		case '1':
			$rating = 10;
			$money = 20;
			$BTC = 10;
			$TPC = 25;
			$farm = 5;
			$price = KKK('5ккк');
			break;
		default:
			return false;
			break;
	}
	return array(
		'price'=>$price,
		'rating'=>$rating,
		'money'=>$money,
		'BTC'=>$BTC,
		'TPC'=>$TPC,
		'farm'=>$farm
		);
}
function GetRewardCase($id,$type){
	switch ($id) {
		case '1':
			switch ($type) {
				case 'money':
					$first = 1;
					$step = KKK('1kkk');
					$second = 15;
					break;
				case 'rating':
					$first = 1;
					$step = 1;
					$second = 15;
					break;
				case 'BTC':
					$first = 1;
					$step = KKK('1k');
					$second = 15;
					break;
				case 'TPC':
					$first = 1;
					$step = KKK('1k');
					$second = 4;
					break;
				case 'farm':
					$first = 1;
					$step = 1;
					$second = 15;
					break;

			}
			break;
		default:
			return false;
			break;
	}
	return array('first'=>$first,'second'=>$second,'step'=>$step);
}
?>