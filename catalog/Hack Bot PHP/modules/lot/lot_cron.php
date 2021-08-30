<?php
require_once('../../index.php');
file_put_contents('time.txt',time()+3600);
$lotInfo = json_decode(file_get_contents('lot.json'),1);
$allSumm = array_sum($lotInfo);
$win = 0;
if($allSumm > 0){
	while($win == 0){
		foreach ($lotInfo as $key => $val) {
			$prozent = $val/($allSumm/100);
			if(ChanceProzent($prozent)){
				$mysqli = new mysqli("localhost", "root", "adsjgm23f", "bot"); 
				$mysqli->set_charset('utf8mb4');	
				$User = selectFromID($key);
				SetField('dollar',$User['dollar']+$allSumm,$User['id_VK']);
				SellMsg($User['id_VK'],'Вы выиграли в лотерею: '.ConvertValute($allSumm).'$');
				file_put_contents('lot.json', json_encode([],JSON_UNESCAPED_UNICODE));
				file_put_contents('last_win.txt',$User['id_VK']);
				$mysqli->close();
				$win = 1;
				return;
			}
		}
	}
}else{
	echo 'Lot sum low.';
}
?>