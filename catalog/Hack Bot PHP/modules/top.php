<?php

function GetTop($type = false){
	global $UserInfo,$mysqli,$Nick;
	$type = empty($type) ? 'dollar' : $type;
	$minRole = 2;
	$message = 'ТОП игроков по '.SwitchEmoji($type).'<br><br>';
	$mysqli->query('SET @n:=0;');
	$data = $mysqli->query('SELECT name,id,id_VK,'.$type.', (@n:=@n+1) AS pos FROM users WHERE role<3 && '.$type.'!=0 ORDER BY '.$type.' DESC LIMIT 1000;');
	if($data->num_rows == 0){
		return 'Данный топ пуст е*та';
	}
	$i = 0;
	while(($row = $data->fetch_assoc()) != false){
		$message .= ConvertNumEmoji($row['pos']).'[id'.$row['id_VK'].'|'.$row['name'].']'.' '.ConvertValuteTop($row[$type]).SwitchEmoji($type).'<br>';
		$i++;
		if($i == 10){break;}
	}
	$position = GetPositionTop($type,$UserInfo['id']);
	$message .= '------------------------------------------<br>';
	if($position == false){
		$message .= 'Вы не можете быть в топе.';
	}else{
		$message .= 'Твое место: '.ConvertNumEmoji( GetPositionTop($type,$UserInfo['id']));
	}
	return $message;
}
function GetPositionTop($type,$id){
	global $mysqli;
	$mysqli->query('SET @n:=0;');
	$data = $mysqli->query('SELECT pos FROM (SELECT name,id,'.$type.', (@n:=@n+1) AS pos FROM users WHERE role<=3 ORDER BY '.$type.' DESC LIMIT 1000) users WHERE id='.$id.';');
	$position = $data->fetch_assoc()['pos'];
	if(!empty($position)){
		return $position;
	}else{
		return false;
	}
}

function ConvertValuteTop($num){
	if($num >= pow(10,48)){
		$num = floor($num/pow(10,48));
		$name = 'квиндцлн';
	}elseif($num >= pow(10,45)){
		$num = floor($num/pow(10,45));
		$name = 'кват';
	}elseif($num >= pow(10,42)){
		$num = floor($num/pow(10,42));
		$name = 'тредлн';
	}elseif($num >= pow(10,39)){
		$num = floor($num/pow(10,39));
		$name = 'дуодлн';
	}elseif($num >= pow(10,36)){
		$num = floor($num/pow(10,36));
		$name = 'унделн';
	}elseif($num >= pow(10,33)){
		$num = floor($num/pow(10,33));
		$name = 'децлн';
	}elseif($num >= pow(10,30)){
		$num = floor($num/pow(10,30));
		$name = 'нонлн';
	}elseif($num >= pow(10,27)){
		$num = floor($num/pow(10,27));
		$name = 'октлн';
	}elseif($num >= pow(10,24)){
		$num = floor($num/pow(10,24));
		$name = 'септлн';
	}elseif($num >= pow(10,21)){
		$num = floor($num/pow(10,21));
		$name = 'секстлн';
	}elseif($num >= pow(10,18)){
		$num = floor($num/pow(10,18));
		$name = 'квинтлн';
	}elseif($num >= pow(10,15)){
		$num = floor($num/pow(10,15));
		$name = 'квдрлн';
	}elseif($num >= pow(10,12)){
		$num = floor($num/pow(10,12));
		$name = 'трлн';
	}elseif($num >= pow(10,9)){
		$num = floor($num/pow(10,9));
		$name = 'млрд';
	}elseif($num >= pow(10,6)){
		$num = floor($num/pow(10,6));
		$name = 'млн';
	}elseif($num >= pow(10,3)){
		$num = floor($num/pow(10,3));
		$name = 'тыс';
	}else{
		$name = ConvertValute($num);
		return $name;
	}

	return $num.$name;
}
?>