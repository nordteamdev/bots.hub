<?php

function Lot($summ = false){
	global $UserInfo,$Nick,$admin;
	if($UserInfo['role'] <3 || $UserInfo['id_VK'] == $admin){
		$dirLot = ('modules/lot/lot.json');
		$lot = json_decode(file_get_contents($dirLot),1);
		if(!empty($summ)){
			$summ = $summ <=0 ? 1 : $summ;
			if($UserInfo['dollar'] >= $summ){

				$lot = empty($lot) ? [] : $lot;
				GetTimeLot();
				if($lot[$UserInfo['id']] + $summ > KKK('3kk')){
					$summ = KKK('3kk')-$lot[$UserInfo['id']];
				}
				if($summ>0){
					$lot[$UserInfo['id']] = empty($lot[$UserInfo['id']]) ? 0 : $lot[$UserInfo['id']];
					$lot[$UserInfo['id']] += $summ;
					SetFieldF('dollar',$UserInfo['dollar']-$summ);
					file_put_contents($dirLot, json_encode($lot,JSON_UNESCAPED_UNICODE));
					$message = ', вы вложили в лотерею '.ConvertValute($summ).'$';
				}else{
					$message = ', максимальная ставка 3.000.000$';
				}
			}else{
				$message = ', недостаточно денег.';
			}
		}else{
			$last_win_info = file_get_contents('modules/lot/last_win.txt');
			$last_win = empty($last_win_info) ? 'никто' : '@id'.$last_win_info;
			$time = file_get_contents('time.txt');
			$message = ',
			👤 Игроков: '.count($lot).'
			💵 Приз: '.ConvertValute(GetMyChance(false)).'$ 
			➡ Прошлый победитель: '.$last_win.' 
			🕰 До розыгрыша приза осталось: '.GetTimeLot().'. 
			✅ Игра: запущена
			Ваш шанс выигрыша: '.floor(GetMyChance($UserInfo['id'])).'%';
		}
	}else{
		$message = ',  игру могут играть с ролью ниже VIP.';
	}
	return $Nick.$message;
}
function GetTimeLot(){
	$dirTime = 'modules/lot/time.txt';
	$time = file_get_contents($dirTime);
	if(empty($time)){
		$time = time()+900;
		file_put_contents($dirTime, $time);
		
	}
	return CheckTime($time);
}
function GetMyChance($id = false){
	$lot = json_decode(file_get_contents('modules/lot/lot.json'),1);
	$allSumm = array_sum($lot);

	if(empty($id)){
		return array_sum($lot);
	}
	if(empty($allSumm)){
		return 0;
	}
	$summId = $lot[$id];
	$prozent = $summId/($allSumm/100);
	return $prozent;
}
?>