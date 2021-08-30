<?php
function TransferId($id,$summ){
	global $UserInfo,$Nick,$admin;
	$Limits = json_decode($UserInfo['limits'],1);
	if(empty($Limits)){
		$Limits = DefaultLimits();
	}
	$limit_transfer = !empty($Limits['limit_transfer']) ? $Limits['limit_transfer'] : 5000;
	$limit_transfer = $UserInfo['role'] >= 2 ? KKK('1kkk') : $limit_transfer;
	$time_transfer = CheckTimeTransfer();
	$day_transfer = $Limits['day_transfer'];

	$refresh_time = time()+86400;
	$User = selectFromID($id);
	if($UserInfo['role']<=2 || $UserInfo['id_VK']==$admin){
		if($User){
			if($UserInfo['id'] != $User['id'] || $UserInfo['id_VK']==$admin){
				if($UserInfo['dollar'] >= $summ){
					if($summ>0){
						if($time_transfer == 'ok' || $UserInfo['id_VK']==$admin){
							if($day_transfer+$summ <= $limit_transfer){
								AddJsonValue('limits','day_transfer',$summ,'+');
							}elseif($day_transfer+$summ > $limit_transfer && $limit_transfer-$day_transfer != 0){
								AddJsonValue('limits','day_transfer',$limit_transfer);
								$summ = $limit_transfer-$day_transfer;
								AddJsonValue('limits','time_transfer',$refresh_time);
							}else{
								AddJsonValue('limits','time_transfer',$refresh_time);
							}
							if($summ >KKK('10k')){
								$text = '🛎Уведомление!🛎<br>'.
								'"'.$UserInfo['name'].'" передал вам '.ConvertValute($summ).SwitchEmoji('dollar').'<br>';
								SellMsg($User['id_VK'],$text);
							}
							SetFieldF('dollar',$UserInfo['dollar']-$summ);
							SetField('dollar',$User['dollar']+$summ,$User['id_VK']);
							$message = $Nick.', вы передали игроку "'.$User['name'].'" '.ConvertValute($summ).SwitchEmoji('dollar');
						}else{
							$message = $Nick.', подождите: '.CheckTimeTransfer();
						}
					}else{
						$message = $Nick.', минимальная сумма передачи 1'.SwitchEmoji('dollar');
					}
				}else{
					$message = $Nick.', недостаточно '.SwitchEmoji('dollar');
				}
			}else{
				$message = $Nick.', вы не можете передать валюту себе.';
			}
		}else{
			$message = $Nick.', игрока нет в системе.';
		}
	}else{
		$message = $Nick.', вы не можете передавать валюту.';
	}
	
	return $message;
}

function DefaultLimits(){
	global $UserInfo;
	$Limits = json_decode($UserInfo['limits'],1);
	if(empty($Limits)){
		$array = array(
			'limit_transfer'=>KKK('10k'),
			'day_transfer'=>0,
			'time_transfer'=>0,
		);
		SetFieldF('limits',json_encode($array,JSON_UNESCAPED_UNICODE));
		return $array;
	}
}
?>