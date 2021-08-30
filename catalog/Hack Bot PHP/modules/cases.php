<?php

function AddCase($id, $count, $user_id){
	$mysqli = new mysqli("localhost", "root", "riconc", "bot"); 
	$mysqli->set_charset('utf8mb4');
	$uCases = $mysqli->query('SELECT `cases` FROM `users` WHERE `id_VK`='.$user_id)->fetch_assoc()['cases'];
	$uCases = json_decode($uCases,1);
	$uCases = empty($uCases) ? [] : $uCases;
	$uCases[$id] += $count;
	$mysqli->query('UPDATE `users` SET `cases`=\''.json_encode($uCases).'\' WHERE `id_VK`='.$user_id);
	
	
	$mysqli->close();

}
function openCase($id = false,$op = false){
	global $UserInfo,$Nick;
	$desc = getDescCase($id);
	$uCases = json_decode($UserInfo['cases'],1);
	$uCases = empty($uCases) ? [] : $uCases;
	if(!empty($desc)){
		if($op == 'открыть'){
			if($uCases[$id]>0){
				$uCases[$id] -= 1;
				$caseRewards = getDescCase($id,'rewards');
				foreach ($caseRewards as $key => $value) {
					if(ChanceProzent($caseRewards[$key]['chance'])){
						$count = $key == 'role' ? SwitchRole($caseRewards[$key]['value']) : ConvertValute($caseRewards[$key]['value']);
						$message = $Nick.', вы выиграли '.SwitchEnToRus($key).': '.$count.SwitchEmoji($key);
						if($key != 'role'){
							SetFieldF($key,$UserInfo[$key]+$caseRewards[$key]['value']);
						}else{
							SetFieldF('role',$caseRewards[$key]['value']);
						}
						SetFieldF('cases',json_encode($uCases,JSON_UNESCAPED_UNICODE));
						return $message;
					}
				}
			}else{
				$message = ', у вас нету данного кейса.';
			}
		}else{
			$message = getDescCase($id);
			return $message;
		}
	}else{
		if(!empty($uCases)){
			for($i=1; $i<=count($uCases); $i++){
				$message .= 'Кейс '.$i.' '.X($uCases[$i]).'<br>';
			}
			$message .= 'Чтобы открыть кейс напишите "Кейсы [номер] открыть"';
			return $message;
		}else{
			$message = ', у вас нет кейсов';
		}
	}
	return $Nick.$message;
}
function getDescCase($id = false,$op = false){
	global $Nick;
	switch ($id) {
		case '1':
			$desc = 
			'Статус "VIP"
			Биткоины 2.000
			Валюта 1.000.000$';
			$rewards = [
				'role'=>['value'=>2,'chance'=>5],
				'BTC'=>['value'=>rand(1,2000),'chance'=>20],
				'dollar'=>['value'=>rand(1,1000000),'chance'=>101]
			];
			break;
		
		default:
			return false;
			break;
	}
	if(empty($op)){
		return $Nick.', с данного кейса может выпасть: '.$desc;
	}elseif($op == 'rewards'){
		return $rewards;
	}
}

?>