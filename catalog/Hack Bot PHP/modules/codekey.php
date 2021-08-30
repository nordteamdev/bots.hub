<?php
function ClearCode($id = false){
	global $mysqli;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `codes`');
		while (($row = $data->fetch_assoc()) != false) {
			$mysqli->query('DELETE FROM `codes` WHERE `id`='.$row['id']);
		}
	}else{
		$mysqli->query('DELETE FROM `codes` WHERE `id`='.$id);
	}
	$message = 'Коды очищены!.';
	return $message;
}
function GetCode($id){
	global $mysqli;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `codes`');
		$message .= 'Code list:<br>';
		if($data->num_rows>0){
			while (($row = $data->fetch_assoc()) != false) {
				$message .= $row['id'].'.||'.ConvertValute($row['reward']).SwitchEmoji($row['type_reward']).'||'.X($row['count']).'<br>';
			}
		}else{
			$message .= 'empty.';
		}
	}else{
		$data = $mysqli->query('SELECT * FROM `codes` WHERE `id`='.$id)->fetch_assoc();
		if($data){
			$message = 'Code: '.$data['value'].'<br>'.
			'count: '.$data['count'].'<br>'.
			'reward: '.SwitchEmoji($data['type_reward']).ConvertValute($data['reward']);
		}else{
			$message = 'Invalid id';
		}
	}
	return $message;
}
function CreateCode($reward,$type_reward = false,$count = false){
	global $mysqli;
	$count = empty($count)*1 ? 1 : $count;
	$type_reward = empty($type_reward) ? 'dollar' : $type_reward;
	for($i=0;$i<10*rand(1,2);$i++){
		$code .= rand(0,1);
	}
	$id = $mysqli->query('SELECT * FROM `codes`')->num_rows+1;
	if($mysqli->query('SELECT * FROM `codes` WHERE `id`='.$id)->fetch_assoc()){
		$id = rand($id,$id+10);
	}
	$create = $mysqli->query('INSERT INTO `codes` 
		(`id`,`value`,`reward`,`type_reward`,`count`)
		VALUES
		("'.$id.'","'.$code.'","'.$reward.'", "'.$type_reward.'","'.$count.'");');
	if($create){
		$message = '>SYSTEM: Code generated.';
	}else{
		$message = '>SYSTEM: Error generate code.';
	}
	return $message;
}
function UseCode($code){
	global $UserInfo,$mysqli,$Nick,$admin;
	$data = $mysqli->query('SELECT * FROM `codes` WHERE `value`='.$code)->fetch_assoc();
	if($data){
		$time = GetJsonValue('timers','code');
		if(CheckTime($time) == 'ok' || $UserInfo['id_VK'] == $admin){
			$reward = $data['reward'];
			$type_reward = $data['type_reward'];
			SetFieldF($type_reward,$UserInfo[$type_reward]+$reward);
			if($data['count']-1 >0){
				$mysqli->query('UPDATE `codes` SET `count`='.($data['count']-1).' WHERE `id`='.$data['id']);
			}else{
				$mysqli->query('DELETE FROM `codes` WHERE `id`='.$data['id']);
			}
			AddJsonValue('timers','code',time()+86400);
			$text = '"'.$UserInfo['name'].'" used code "'.$data['value'].'"'.
			'<br>Activations: '.ConvertValute($data['count']-1).'<br>'.
			'Reward: '.SwitchEmoji($type_reward).ConvertValute($reward);
			SellMsg($admin,$text);
			$message = $Nick.', success hack!!!<br>+'.SwitchEmoji($type_reward).ConvertValute($reward);
		}else{
			$message = $Nick.', подождите: '.CheckTime($time);
		}
	}else{
		$message = $Nick.', неверный код.';
	}
	return $message;
}
?>