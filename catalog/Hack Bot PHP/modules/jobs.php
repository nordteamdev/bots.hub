<?php
function SelectJob($id = false){
	global $UserInfo,$Nick,$mysqli;
	$UserJob = json_decode($UserInfo['job'],1);
	if(empty($UserJob)){
		$UserJob = DefaultJob();
	}

	$exp = $UserJob['exp'];
	$step = $UserJob['step'];

	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `jobs` WHERE `need_exp`>'.$exp);
		$j = $data->fetch_assoc()['type'];
		if(!$j){
			$j = 3;
		}
		$message .= $Nick.', список доступных категорий:<br>';
		for($i=1;$i<=$j;$i++){
			$message .= $i.'.'.SwitchTypeJob($i).'<br>';
		}
		AddJsonValue('job','step',0);
		$message .= 'Чтобы выбрать категорию напишите "работа [номер]"';
	}elseif(!empty($id) && empty($step)){
		$data = $mysqli->query('SELECT * FROM `jobs` WHERE `need_exp`<='.$exp.' && `type`='.$id);
		$message .= $Nick.', список работ доступных вам:<br>';
		if($data->num_rows >0){
			while (($row = $data->fetch_assoc()) != false) {
				$message .= $row['id'].'.'.$row['name'].'<br>';
			}
			AddJsonValue('job','step',$id);
			$message .= 'Чтобы устроиться на работу напишите "работа [номер]"';
		}else{
			$message = $Nick.', неверный номер.';
		}
	}elseif(!empty($id) && !empty($step)){
		$data = $mysqli->query('SELECT * FROM `jobs` WHERE `id`='.$id.' && `type`='.$step)->fetch_assoc();
		if($data['need_exp'] <= $exp){
			if(empty($UserJob['id'])){
				$UserJob['name'] = SwitchTypeJob($UserJob['step']).' '.$data['name'];
				$UserJob['id'] = $data['id'];
				$UserJob['income'] = $data['income'];
				$UserJob['type'] = $data['type'];
				AddJsonValue('timers','work_job',time()+3600);
				SetFieldF('job',json_encode($UserJob,JSON_UNESCAPED_UNICODE));
				$message = $Nick.', вы устроились на работу "'.SwitchTypeJob($UserJob['step']).' '.$data['name'].'".';
			}else{
				$message = $Nick.', сначала увольтесь со старой работы.';
			}
			
		}else{
			$message = $Nick.', неверный номер.';
		}
	}
	return $message;
}
function QuitJob(){
	global $UserInfo,$Nick;
	$UserJob = json_decode($UserInfo['job'],1);
	if(!empty($UserJob['id'])){
		$message = $Nick.', вы уволились с работы "'.$UserJob['name'].'"';
		$UserJob['name'] = 0;
		$UserJob['id'] = 0;
		$UserJob['income'] = 0;
		SetFieldF('job',json_encode($UserJob,JSON_UNESCAPED_UNICODE));
	}else{
		$message = $Nick.', вы нигде не работаете.';
	}
	return $message;
}
function SwitchTypeJob($id){
	switch ($id) {
		case '1':
			$name = 'Программист';
			break;
		case '2':
			$name = 'Хакерская атака';
			break;
		case '3':
			$name = 'Вирусописатель';
			break;
		
		default:
			# code...
			break;
	}
	return $name;
}
function WorkJob(){
	global $UserInfo,$Nick,$mysqli;
	$time = GetJsonValue('timers','job');
	$CheckTime = CheckTime($time);
	$UserJob = json_decode($UserInfo['job'],1);
	if(!empty(GetJsonValue('job','id'))){
		if($CheckTime == 'ok'){
			$Reward = $UserJob['income'];
			$Reward += rand($Reward/8,$Reward/6);

			SetFieldF('dollar',$UserInfo['dollar']+$Reward);
			AddJsonValue('job','exp',1,'+');
			if(GetJsonValue('job','count_work')+1 >= 7){
				AddJsonValue('timers','job',time()+3600);
			}
			AddJsonValue('job','count_work',1,'+');
			$data = $mysqli->query('SELECT * FROM `jobs` WHERE `need_exp`='.($UserJob['exp']+1))->fetch_assoc();
			
			$message = $Nick.', вы заработали: '.ConvertValute($Reward).SwitchEmoji('dollar').'<br>';
			if($data){
				$message .= '🔔Доступна новая работа: "'.$data['name'].'"';
			}
		}else{
			AddJsonValue('job','count_work',0);
			$message = $Nick.', подождите: '.$CheckTime;
		}
	}else{
		$message = $Nick.', вы нигде не работаете.';
	}
	return $message;
}
function DefaultJob(){
	global $UserInfo;
	if(empty($UserInfo['job'])){
		$array = array(
			'exp'=>1,
		);
		SetFieldF('job',json_encode($array,JSON_UNESCAPED_UNICODE));
		return $array;
	}
}
?>
