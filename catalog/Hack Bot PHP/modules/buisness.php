<?php
function BuyBuisness($id){
	global $UserInfo,$Nick,$mysqli;
	$uBuisness = json_decode($UserInfo['buisness'],1);
	$oneBuisness = !empty($uBuisness[0]) ? $uBuisness[0] : null;
	$twoBuisness = !empty($uBuisness[1]) ? $uBuisness[1] : null;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `buisness`');
		$message = $Nick.', список бизнесов:<br>';
		while (($row = $data->fetch_assoc()) != false){
			$emoji = $oneBuisness['id'] == $row['id'] || $twoBuisness['id'] == $row['id']  ? '🔹' : '🔸';
			
			$message .= $emoji.$row['id'].'. '.$row['name'].' <br>(➕'.ConvertValute($row['income']).'$ 💰'.ConvertValute($row['price']).'$)<br>';
			$message .= '';


		}
		$message .= 'Чтобы купить бизнес напишите "бизнесы [номер]"';
	}else{
		$data = $mysqli->query('SELECT * FROM `buisness` WHERE `id`='.$id)->fetch_assoc();
		if($data){
			$countuBuisness = count($uBuisness);
			if($countuBuisness+1 <= GetMaxCountBuisness()){
				$buisnessPrice = $data['price'];
				$buisnessPrice = $UserInfo['role'] >= 2 ? floor($buisnessPrice-($buisnessPrice*0.2)) : $buisnessPrice;
				if($UserInfo['dollar'] >= $buisnessPrice ){
					$uBuisness[$countuBuisness]['id'] = $data['id'];
					$uBuisness[$countuBuisness]['income'] = $data['income'];
					$uBuisness[$countuBuisness]['price'] = $buisnessPrice;
					$uBuisness[$countuBuisness]['name'] = $data['name'];
					$uBuisness[$countuBuisness]['price_worker'] = $data['price_worker'];
					$uBuisness[$countuBuisness]['workers'] = 0;
					$uBuisness[$countuBuisness]['max_workers'] = $data['max_workers'];
					$uBuisness[$countuBuisness]['lvl'] = 1;
					$uBuisness[$countuBuisness]['time'] = time();
					SetFieldF('dollar',$UserInfo['dollar']-$buisnessPrice);
					SetFieldF('buisness',json_encode($uBuisness,JSON_UNESCAPED_UNICODE));
					$message = $Nick.', вы купили бизнес "'.$data['name'].'" за '.ConvertValute($buisnessPrice);
				}else{
					$message = $Nick.', недостаточно $.';
				}
			}else{
				$message = $Nick.', у вас может быть всего '.GetMaxCountBuisness().' бизнеса.';
			}
		}else{
			$message = $Nick.', неверный номер.';
		}
	}
	return $message;
}
function GetMaxCountBuisness($i = false){
	global $UserInfo,$admin;
	$i = empty($i) ? 0 : $i;
	$role = $UserInfo['role'];
	if($UserInfo['id_VK'] == $admin){
		$count = 999;
	}elseif($role >=3){
		$count = 10;
	}else{
		$count = 2;
	}
	$count +=$i;
	return $count;
}
function GetBuisnessInfo($id = false){
	global $UserInfo,$Nick;
	$uBuisness = json_decode($UserInfo['buisness'],1);
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountBuisness(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$buisness = $uBuisness[$id];
	if(!empty($buisness)){
		$UpPrice = $buisness['price']*$buisness['lvl']*2.5;
		$notif = $UserInfo['dollar'] >= $UpPrice && $buisness['lvl'] != 4 ? SwitchEmoji('ok').'Доступно улучшение ('.ConvertValute($UpPrice).'$)' : '';
		$balanceBuisness = GetBalanceBuisness($id);
		$income = GetBalanceBuisness($id,1);
		$message = $Nick.', ваш '.($id+1).' бизнес:<br>'.
		'💼'.$buisness['name'].' ('.$buisness['lvl'].' ⚡Уровень)<br>'.
		'➕Прибыль: '.ConvertValute($income).'$<br>'.
		'💰На счету: '.ConvertValute($balanceBuisness).'$<br>'.
		'👷Рабочих: '.$buisness['workers'].'/'.floor($buisness['max_workers']/4*$buisness['lvl']).'<br>'.$notif;
	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function AddWorkersToBuisness($id = false,$count = false){
	global $UserInfo,$Nick;
	$count =  empty($count) ? 1 : $count;
	$count = $count<=0 ? 1 : $count;
	$uBuisness = json_decode($UserInfo['buisness'],1);
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountBuisness(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$max_workers = $uBuisness[$id]['max_workers']/4*$uBuisness[$id]['lvl'];
	if($uBuisness[$id]['workers'] + $count > $max_workers){
		$count = $max_workers-$uBuisness[$id]['workers'];
	}
	if($count == 0 ){
		if($uBuisness[$id]['lvl'] == 4){
			return $Nick.', у вас максимальное количество 👷Рабочих.';
		}
		return $Nick.', улучшите бизнес чтобы нанять больше 👷Рабочих ';
	}
	$Price = $uBuisness[$id]['price_worker']*$count;
	if($UserInfo['dollar'] >= $Price){
		$count = floor($count);
		$uBuisness[$id]['workers'] += $count;
		SetFieldF('dollar',$UserInfo['dollar']-$Price);
		SetFieldF('buisness',json_encode($uBuisness,JSON_UNESCAPED_UNICODE));
		$message = $Nick.', вы наняли '.ConvertValute($count).' 👷Рабочих на '.($id+1).' бизнес.';
	}else{
		$message = $Nick.', недостаточно $.';
	}
	return $message;
}
function AssembleBuisnessAdmin(){
	global $UserInfo,$Nick;
	$uBuisness = json_decode($UserInfo['buisness'],1);
	for($i=1;$i<=count($uBuisness);$i++){
		$income += AssembleBuisness($i,1);
	}
	$message = $Nick.', вы собрали со своих бизнесов: '.ConvertValute($income).'$';
	return $message;
}
function UpgradeBuisness($id){
	global $UserInfo,$Nick;
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1  >= GetMaxCountBuisness(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$uBuisness = json_decode($UserInfo['buisness'],1);
	$lvl = $uBuisness[$id]['lvl'];
	if(!empty($uBuisness[$id]['id'])){
		if($lvl+1 <=4){
			$Price = $uBuisness[$id]['price']*$lvl*2.5;
			if($UserInfo['dollar']>$Price){
				$uBuisness[$id]['lvl'] += 1;
				SetFieldF('dollar',$UserInfo['dollar']-$Price);
				SetFieldF('buisness',json_encode($uBuisness,JSON_UNESCAPED_UNICODE));
				$message = $Nick.', вы улучшили '.($id+1).' бизнес.';
			}else{
				$message = $Nick.', недостаточно $.';
			}
		}else{
			$message = $Nick.', у вас максимальный уровень бизнеса.';
		}
	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function AssembleBuisness($id = false,$adm = false){
	global $UserInfo,$Nick;
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountBuisness(1) && $UserInfo['role']<3){
		return $Nick.', неверный номер бизнеса.';
	}
	$uBuisness = json_decode($UserInfo['buisness'],1);
	$income = GetBalanceBuisness($id);
	if(!empty($uBuisness[$id]['id'])){
		if($income != 0){
				$uBuisness[$id]['time'] = time();
				SetFieldF('dollar',$UserInfo['dollar']+$income);
				SetFieldF('buisness',json_encode($uBuisness,JSON_UNESCAPED_UNICODE));
				if($adm){
					return $income;
				}
				$message = $Nick.', вы собрали со своего '.($id+1).' бизнеса: '.ConvertValute($income).'$';
		}else{
			$message = $Nick.', на счету вашего '.($id+1).' бизнеса нечего нет.';
		}
	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function SellBuisness($id = false){
	global $UserInfo,$Nick;
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountBuisness(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$uBuisness = json_decode($UserInfo['buisness'],1);
	$lvl = $uBuisness[$id]['lvl'];
	if(count($uBuisness) == 0 || empty($uBuisness[0]['id'])){
		SetFieldF('buisness','null');
	}
	if(!empty($uBuisness[$id]['id'])){
		$Price = $uBuisness[$id]['price']*0.80;
		$message = $Nick.', вы продали бизнес "'.$uBuisness[$id]['name'].'" за '.ConvertValute($Price).'$';
		unset($uBuisness[$id]);
		sort($uBuisness);
		SetFieldF('dollar',$UserInfo['dollar']+$Price);
		SetFieldF('buisness',json_encode($uBuisness,JSON_UNESCAPED_UNICODE));

	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function GetBalanceBuisness($id,$getIncome = false){
	global $UserInfo;
	$uBuisness = json_decode($UserInfo['buisness'],1);
	$buisness = $uBuisness[$id];
	$time = CheckHour($buisness['time']);
	if($time[1] == 'ok' || $getIncome){
		$hours = $getIncome ? 1 : $time[0];
		$hours = $hours>24 ? 24 : $hours;
		$max_workers = $buisness['max_workers'];
		$income = $hours*$buisness['income'];
		$income_worker = floor($income/$max_workers);
		$income = $income+($income_worker*$buisness['workers']);
		$income = floor($income * ($buisness['lvl']));
		return $income;
		
	}else{
		return 0;
	}
}
?>
