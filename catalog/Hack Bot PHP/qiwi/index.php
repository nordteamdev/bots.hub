<?php
require_once 'src/Qiwi.php';

require_once (realpath('../index.php'));
$token = '526320859d5a8d840fd18e350a28dafadcf356248314a28909fc6919585f1b64e61c5310c03337b04cf12';
$qiwi = new Qiwi(79232370380, '6f46a1e6fff0c31bf6dbdc23a4fab982');
$hours = date('H')+1;
$hours = $hours>23 ? 23 : $hours;
$history = $qiwi->getPaymentsHistory([
	'startDate' => date('Y').'-'.date('m').'-'.date('d').'T'.date('H').':00:00+03:00',
	'endDate' => date('Y').'-'.date('m').'-'.date('d').'T'.$hours.':'.date('i').':00+03:00',
	'rows'=>'50',
	'operation'=>'IN',
	'sources'=>'QW_RUB',
	

]);

if($history['data']){
	$data = $history['data'];
}else{
	echo 'not donates';
	return;
}

$successes = json_decode(file_get_contents('successes.json'),1);
if($successes['day'] != date('d')){
	$successes = array('day'=>date('d'));
}


for($i=0;$i<count($data);$i++){
	$id = $data[$i]['txnId'];
	if(!in_array($id,$successes)){
		$comment = $data[$i]['comment'];
		$isDonate = 1;
	
		$mysqli = new mysqli("localhost", "root", "adsjgm23f", 'bot'); 
		$mysqli->set_charset('utf8mb4');

		$number = $data[$i]['account'];
		$summ = $data[$i]['sum']['amount'];	
		$summ = floor($summ);
		$currency = $data[$i]['currency'];
		if(!empty(GetId($comment))){
			$id_VK = GetId($comment);
			$User = $mysqli->query('SELECT * FROM `users` WHERE `id_VK`='.$id_VK)->fetch_assoc();
			
			$donate_settings = empty($User['donate_settings']) ? DefaultDonateSettings() : json_decode($User['donate_settings'],1);
			$day = $donate_settings['day']+1 == 7 ? 0 : $donate_settings['day']+1;
			if($day == date('w')){
				$donate_settings['day'] = date('w');
				$donate_settings['x']+=0.1;
				$x = $donate_settings['x'];
				$x = $x>=0.8 ? 0.8 : $x;
				SetField('donate_settings',json_encode($donate_settings,JSON_UNESCAPED_UNICODE),$User['id_VK']);
			}else{
				$donate_settings['x'] = 0;
				SetField('donate_settings',json_encode($donate_settings,JSON_UNESCAPED_UNICODE),$User['id_VK']);
			}
			$UserSumm = $summ;
			$summ = $summ+($summ*$x)+($summ*$xB);//плюс ежедневный донат + общий множитель
			$summ*=file('../data/donat_settings/donat_x.txt')[0];//умножить на множитель (xdonat)
			$text = '[id'.$User['id_VK'].'|'.$User['name'].'] задонатил: '.ConvertValute($UserSumm).'R';
			SellMsg(336041508,$text);
			$text = $User['name'].', спасибо за донат, в размере: '.ConvertValute($UserSumm).'R<br>'.
			'Бонус ежедневного доната: '.ConvertValute($UserSumm*$x).'R<br>';
			SellMsg($User['id_VK'],$text);
			Donate($User,$summ);
			
			
		}
		array_push($successes, $id);
		file_put_contents('successes.json', json_encode($successes,JSON_UNESCAPED_UNICODE));
		$mysqli->close();
		if($isDonate){
			echo 'DONATEEEEEEED<br>';
			
			
		}
	}
}

function Donate($User,$summ){
	SetField('donate_balance',$User['donate_balance']+$summ,$User['id_VK']);
}

function DefaultDonateSettings()
{
	global $User;
	if(empty($User['donate_settings'])){
		$donate_settings = array(
			'day'=>date('w'),
			'x'=>0
		);
		SetField('donate_settings',json_encode($donate_settings,JSON_UNESCAPED_UNICODE),$User['id_VK']);
		return $donate_settings;
	}
}
?>
