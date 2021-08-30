<?php
function BuyFarm($id = false,$count = false){
	global $UserInfo,$Nick,$mysqli;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `farm`');
		$message = $Nick.', фермы биткоинов '.SwitchEmoji('btc').'<br>';
		while(($row = $data->fetch_assoc()) != false){
			$emoji = $row['id'] == GetJsonValue('farm','id') ? '🔹' : '🔸';
			$message .= $emoji.$row['id'].'.'.$row['name'].' ('.ConvertValute($row['price']).') '.ConvertValuteDouble($row['income']).SwitchEmoji('btc').'<br>';
		}
		$message .= 'Для покупки ферм напишите фермы [номер] [количество].';
	}elseif(!empty($id)){
		$count = ($count<1) ? 1 : $count;
		$data = $mysqli->query('SELECT * FROM `farm` WHERE `id`='.$id)->fetch_assoc();
		$price = $count*$data['price'];
		if($UserInfo['dollar'] >= $price){
			if(empty($UserInfo['farm']) || GetJsonValue('farm','id') == $id){
				$limitFarm = $UserInfo['role'] >=2 ? 2500 : 1500;
				if(GetJsonValue('farm','count') + $count <= $limitFarm){
					$uFarm = json_decode($UserInfo['farm'],1);
					$uFarm['name'] = $data['name'];
					$uFarm['income'] = $data['income'];
					$uFarm['id'] = $data['id'];
					$uFarm['time'] = time();
					$uFarm['count'] += $count;
					SetFieldF('farm',json_encode($uFarm,JSON_UNESCAPED_UNICODE));
					SetFieldF('dollar',$UserInfo['dollar']-$price);
					$message = $Nick.', вы купили фермы "'.$data['name'].'" '.X($count).' за '.ConvertValute($price).'$';
				}else{
					$message = $Nick.', у вас максимальное количество ферм.'.X($limitFarm);
				}
			}else{
				$message = $Nick.', сначала продайте фермы.';
			}
		}else{
			$message = $Nick.', недостаточно $';
		}
	}
	return $message;
}
function AddFarm($id,$count){
	global $mysqli,$UserInfo;
	$uFarm = json_decode($UserInfo['farm'],1);
	$data = $mysqli->query('SELECT * FROM `farm` WHERE `id`='.$id)->fetch_assoc();
	$uFarm['name'] = $data['name'];
	$uFarm['income'] = $data['income'];
	$uFarm['id'] = $data['id'];
	$uFarm['time'] = time();
	$uFarm['count'] = $count;
	SetFieldF('farm',json_encode($uFarm,JSON_UNESCAPED_UNICODE));
}
function SellFarm($count = false){
	global $UserInfo,$Nick,$mysqli;
	if(!empty($UserInfo['farm'])){
		$count = ($count<1) ? 1 : $count;
		if(GetJsonValue('farm','count') - $count >= 0){
			$data = $mysqli->query('SELECT * FROM `farm` WHERE `id`='.GetJsonValue('farm','id'))->fetch_assoc();
			$price = $count*$data['price']*0.75;
			if(GetJsonValue('farm','count') - $count == 0){
				SetFieldF('farm',NULL);
			}else{
				AddJsonValue('farm','count',$count,'-');
			}
			SetFieldF('dollar',$UserInfo['dollar']+$price);
			$message = $Nick.', вы продали фермы "'.GetJsonValue('farm','name').'" '.X($count).' за '.ConvertValute($price).'$';
		}
	}else{
		$message = $Nick.', у вас нет ферм.';
	}
	return $message;
}
function FarmAssemble(){
	global $UserInfo,$Nick;
	if(!empty($UserInfo['farm'])){
		$time = CheckHour(GetJsonValue('farm','time'));
		if($time[1] == 'ok'){
			$hours = $time[0];
			$hours = $hours>12 ? 12 : $hours;
			$income = GetJsonValue('farm','income')*$hours*GetJsonValue('farm','count');
			SetFieldF('btc',$UserInfo['btc']+$income);
			AddJsonValue('farm','time',time());
			$message = $Nick.', вы собрали: '.ConvertValuteDouble($income).SwitchEmoji('btc');
		}else{
			$message = $Nick.', приходите через: '.$time;
		}
	}else{
		$message = $Nick.', у вас нет ферм.';
	}
	return $message;
}
?>