<?php
function BuyfarmBytc($id = false,$count = false){
	global $UserInfo,$Nick,$mysqli;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `farmBytc`');
		$message = $Nick.', фермы байткоинов '.SwitchEmoji('byte').'<br>';
		while(($row = $data->fetch_assoc()) != false){
			$emoji = $row['id'] == GetJsonValue('farmBytc','id') ? '🔹' : '🔸';
			$message .= $emoji.$row['id'].'.'.$row['name'].' ('.ConvertValute($row['price']).'$) '.ConvertValuteDouble($row['income']).SwitchEmoji('byte').'<br>';
		}
		$message .= 'Для покупки ферм напишите байтфермы [номер] [количество].';
	}elseif(!empty($id)){
		$count = ($count<1) ? 1 : $count;
		$data = $mysqli->query('SELECT * FROM `farmBytc` WHERE `id`='.$id)->fetch_assoc();
		$price = $count*$data['price'];
		if($UserInfo['dollar'] >= $price){
			if(empty($UserInfo['farmBytc']) || GetJsonValue('farmBytc','id') == $id){
				$limitfarmBytc = $UserInfo['role'] >=2 ? 2500 : 1500;
				if(GetJsonValue('farmBytc','count') + $count <= $limitfarmBytc){
					$ufarmBytc = json_decode($UserInfo['farmBytc'],1);
					$ufarmBytc['name'] = $data['name'];
					$ufarmBytc['income'] = $data['income'];
					$ufarmBytc['id'] = $data['id'];
					$ufarmBytc['time'] = time();
					$ufarmBytc['count'] += $count;
					SetFieldF('farmBytc',json_encode($ufarmBytc,JSON_UNESCAPED_UNICODE));
					SetFieldF('dollar',$UserInfo['dollar']-$price);
					$message = $Nick.', вы купили байтфермы "'.$data['name'].'" '.X($count).' за '.ConvertValute($price).'$';
				}else{
					$message = $Nick.', у вас максимальное количество байтферм.'.X($limitfarmBytc);
				}
			}else{
				$message = $Nick.', сначала продайте байтфермы.';
			}
		}else{
			$message = $Nick.', недостаточно $';
		}
	}
	return $message;
}
function AddfarmBytc($id,$count){
	global $mysqli,$UserInfo;
	$ufarmBytc = json_decode($UserInfo['farmBytc'],1);
	$data = $mysqli->query('SELECT * FROM `farmBytc` WHERE `id`='.$id)->fetch_assoc();
	$ufarmBytc['name'] = $data['name'];
	$ufarmBytc['income'] = $data['income'];
	$ufarmBytc['id'] = $data['id'];
	$ufarmBytc['time'] = time();
	$ufarmBytc['count'] = $count;
	SetFieldF('farmBytc',json_encode($ufarmBytc,JSON_UNESCAPED_UNICODE));
}
function SellfarmBytc($count = false){
	global $UserInfo,$Nick,$mysqli;
	if(!empty($UserInfo['farmBytc'])){
		$count = ($count<1) ? 1 : $count;
		if(GetJsonValue('farmBytc','count') - $count >= 0){
			$data = $mysqli->query('SELECT * FROM `farmBytc` WHERE `id`='.GetJsonValue('farmBytc','id'))->fetch_assoc();
			$price = $count*$data['price']*0.75;
			if(GetJsonValue('farmBytc','count') - $count == 0){
				SetFieldF('farmBytc',NULL);
			}else{
				AddJsonValue('farmBytc','count',$count,'-');
			}
			SetFieldF('dollar',$UserInfo['dollar']+$price);
			$message = $Nick.', вы продали байтфермы "'.GetJsonValue('farmBytc','name').'" '.X($count).' за '.ConvertValute($price).'$';
		}
	}else{
		$message = $Nick.', у вас нет байтферм.';
	}
	return $message;
}
function farmBytcAssemble(){
	global $UserInfo,$Nick;
	if(!empty($UserInfo['farmBytc'])){
		$time = CheckHour(GetJsonValue('farmBytc','time'));
		if($time[1] == 'ok'){
			$hours = $time[0];
			$hours = $hours>12 ? 12 : $hours;
			$income = GetJsonValue('farmBytc','income')*$hours*GetJsonValue('farmBytc','count');
			SetFieldF('byte',$UserInfo['byte']+$income);
			AddJsonValue('farmBytc','time',time());
			$message = $Nick.', вы собрали: '.ConvertValuteDouble($income).SwitchEmoji('byte');
		}else{
			$message = $Nick.', приходите через: '.$time;
		}
	}else{
		$message = $Nick.', у вас нет байтферм.';
	}
	return $message;
}
?>