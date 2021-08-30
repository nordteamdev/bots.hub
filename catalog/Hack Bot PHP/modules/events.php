<?php
function EventHack(){
	global $UserInfo,$Nick,$peer_id;
	if(!empty($UserInfo['job'])){
		$type = GetJsonValue('job','type');
		$id = GetJsonValue('job','id');
		if(ChanceProzent(1)){
			$data = SwitchStrPrice($type,$id);
			SellMsg($peer_id,$Nick.','.$data['text']);
			SetFieldF('dollar',$UserInfo['dollar']+$reward);
		}
	}
}
function SwitchStrPrice($type,$id){
	global $mysqli;
	
	switch ($type) {
		case '1':
			$str = 'вы написали: ';
			$data = $mysqli->query('SELECT * FROM `jobs` WHERE `type`='.$type.' && `id`='.$id)->fetch_assoc();
			$str .= 'Скрипт на '.$data['name'];
			$reward = rand(1,300)*$id*rand(1,3);
			break;
		case '2':
			$str = 'от вас была произведена хакерская атака ';
			$data = $mysqli->query('SELECT * FROM `jobs` WHERE `type`='.$type.' && `id`='.$id)->fetch_assoc();
			$str .= $data['name'];
			$reward = rand(1,500)*$id*rand(1,5);
			break;
		case '3':
			$str = 'вы создали вирус типа: ';
			$data = $mysqli->query('SELECT * FROM `jobs` WHERE `type`='.$type.' && `id`='.$id)->fetch_assoc();
			$str .= $data['name'];
			$reward = rand(1,200)*$id*rand(1,8);
			break;
		
		default:
			# code...
			break;
	}
	$str .= '<br>+'.ConvertValute($reward).'$';
	return ['text'=>$str,'reward'=>$reward];
}
?>