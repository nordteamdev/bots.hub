<?php
function Buymanikss($id){
	global $UserInfo,$Nick,$mysqli;
	$umanikss = json_decode($UserInfo['manikss'],1);
	$onemanikss = !empty($umanikss[0]) ? $umanikss[0] : null;
	$twomanikss = !empty($umanikss[1]) ? $umanikss[1] : null;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `manikss`');
		$message = $Nick.', список бизнесов:<br>';
		while (($row = $data->fetch_assoc()) != false){
			$emoji = $onemanikss['id'] == $row['id'] || $twomanikss['id'] == $row['id']  ? '🔹' : '🔸';
			
			$message .= $emoji.$row['id'].'. '.$row['name'].' <br>(➕'.ConvertValute($row['income']).'$ 💰'.ConvertValute($row['price']).'$)<br>';
			$message .= '';


		}
		$message .= 'Чтобы купить бизнес напишите "бизнесы [номер]"';
	}else{
		$data = $mysqli->query('SELECT * FROM `manikss` WHERE `id`='.$id)->fetch_assoc();
		if($data){
			$countumanikss = count($umanikss);
			if($countumanikss+1 <= GetMaxCountmanikss()){
				$manikssPrice = $data['price'];
				$manikssPrice = $UserInfo['role'] >= 2 ? floor($manikssPrice-($manikssPrice*0.2)) : $manikssPrice;
				if($UserInfo['dollar'] >= $manikssPrice ){
					$umanikss[$countumanikss]['id'] = $data['id'];
					$umanikss[$countumanikss]['income'] = $data['income'];
					$umanikss[$countumanikss]['price'] = $manikssPrice;
					$umanikss[$countumanikss]['name'] = $data['name'];
					$umanikss[$countumanikss]['price_worker'] = $data['price_worker'];
					$umanikss[$countumanikss]['workers'] = 0;
					$umanikss[$countumanikss]['max_workers'] = $data['max_workers'];
					$umanikss[$countumanikss]['lvl'] = 1;
					$umanikss[$countumanikss]['time'] = time();
					SetFieldF('dollar',$UserInfo['dollar']-$manikssPrice);
					SetFieldF('manikss',json_encode($umanikss,JSON_UNESCAPED_UNICODE));
					$message = $Nick.', вы купили бизнес "'.$data['name'].'" за '.ConvertValute($manikssPrice);
				}else{
					$message = $Nick.', недостаточно $.';
				}
			}else{
				$message = $Nick.', у вас может быть всего '.GetMaxCountmanikss().' бизнеса.';
			}
		}else{
			$message = $Nick.', неверный номер.';
		}
	}
	return $message;
}
function GetMaxCountmanikss($i = false){
	global $UserInfo,$admin;
	$i = empty($i) ? 0 : $i;
	$role = $UserInfo['role'];
	if($UserInfo['id_VK'] == $admin){
		$count = 999;
	}elseif($role >=3){
		$count = 10;
	}else{
		$count = 2;
	}
	$count +=$i;
	return $count;
}
function GetmanikssInfo($id = false){
	global $UserInfo,$Nick;
	$umanikss = json_decode($UserInfo['manikss'],1);
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountmanikss(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$manikss = $umanikss[$id];
	if(!empty($manikss)){
		$UpPrice = $manikss['price']*$manikss['lvl']*2.5;
		$notif = $UserInfo['dollar'] >= $UpPrice && $manikss['lvl'] != 4 ? SwitchEmoji('ok').'Доступно улучшение ('.ConvertValute($UpPrice).'$)' : '';
		$balancemanikss = GetBalancemanikss($id);
		$income = GetBalancemanikss($id,1);
		$message = $Nick.', ваш '.($id+1).' бизнес:<br>'.
		'💼'.$manikss['name'].' ('.$manikss['lvl'].' ⚡Уровень)<br>'.
		'➕Прибыль: '.ConvertValute($income).'$<br>'.
		'💰На счету: '.ConvertValute($balancemanikss).'$<br>'.
		'👷Рабочих: '.$manikss['workers'].'/'.floor($manikss['max_workers']/4*$manikss['lvl']).'<br>'.$notif;
	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function AddWorkersTomanikss($id = false,$count = false){
	global $UserInfo,$Nick;
	$count =  empty($count) ? 1 : $count;
	$count = $count<=0 ? 1 : $count;
	$umanikss = json_decode($UserInfo['manikss'],1);
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountmanikss(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$max_workers = $umanikss[$id]['max_workers']/4*$umanikss[$id]['lvl'];
	if($umanikss[$id]['workers'] + $count > $max_workers){
		$count = $max_workers-$umanikss[$id]['workers'];
	}
	if($count == 0 ){
		if($umanikss[$id]['lvl'] == 4){
			return $Nick.', у вас максимальное количество 👷Рабочих.';
		}
		return $Nick.', улучшите бизнес чтобы нанять больше 👷Рабочих ';
	}
	$Price = $umanikss[$id]['price_worker']*$count;
	if($UserInfo['dollar'] >= $Price){
		$count = floor($count);
		$umanikss[$id]['workers'] += $count;
		SetFieldF('dollar',$UserInfo['dollar']-$Price);
		SetFieldF('manikss',json_encode($umanikss,JSON_UNESCAPED_UNICODE));
		$message = $Nick.', вы наняли '.ConvertValute($count).' 👷Рабочих на '.($id+1).' бизнес.';
	}else{
		$message = $Nick.', недостаточно $.';
	}
	return $message;
}
function AssemblemanikssAdmin(){
	global $UserInfo,$Nick;
	$umanikss = json_decode($UserInfo['manikss'],1);
	for($i=1;$i<=count($umanikss);$i++){
		$income += Assemblemanikss($i,1);
	}
	$message = $Nick.', вы собрали со своих бизнесов: '.ConvertValute($income).'$';
	return $message;
}
function Upgrademanikss($id){
	global $UserInfo,$Nick;
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1  >= GetMaxCountmanikss(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$umanikss = json_decode($UserInfo['manikss'],1);
	$lvl = $umanikss[$id]['lvl'];
	if(!empty($umanikss[$id]['id'])){
		if($lvl+1 <=4){
			$Price = $umanikss[$id]['price']*$lvl*2.5;
			if($UserInfo['dollar']>$Price){
				$umanikss[$id]['lvl'] += 1;
				SetFieldF('dollar',$UserInfo['dollar']-$Price);
				SetFieldF('manikss',json_encode($umanikss,JSON_UNESCAPED_UNICODE));
				$message = $Nick.', вы улучшили '.($id+1).' бизнес.';
			}else{
				$message = $Nick.', недостаточно $.';
			}
		}else{
			$message = $Nick.', у вас максимальный уровень бизнеса.';
		}
	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function Assemblemanikss($id = false,$adm = false){
	global $UserInfo,$Nick;
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountmanikss(1) && $UserInfo['role']<3){
		return $Nick.', неверный номер бизнеса.';
	}
	$umanikss = json_decode($UserInfo['manikss'],1);
	$income = GetBalancemanikss($id);
	if(!empty($umanikss[$id]['id'])){
		if($income != 0){
				$umanikss[$id]['time'] = time();
				SetFieldF('dollar',$UserInfo['dollar']+$income);
				SetFieldF('manikss',json_encode($umanikss,JSON_UNESCAPED_UNICODE));
				if($adm){
					return $income;
				}
				$message = $Nick.', вы собрали со своего '.($id+1).' бизнеса: '.ConvertValute($income).'$';
		}else{
			$message = $Nick.', на счету вашего '.($id+1).' бизнеса нечего нет.';
		}
	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function Sellmanikss($id = false){
	global $UserInfo,$Nick;
	$id = $id<1 ? 1 : $id;
	$id -=1;
	if($id+1 >= GetMaxCountmanikss(1)){
		return $Nick.', неверный номер бизнеса.';
	}
	$umanikss = json_decode($UserInfo['manikss'],1);
	$lvl = $umanikss[$id]['lvl'];
	if(count($umanikss) == 0 || empty($umanikss[0]['id'])){
		SetFieldF('manikss','null');
	}
	if(!empty($umanikss[$id]['id'])){
		$Price = $umanikss[$id]['price']*0.80;
		$message = $Nick.', вы продали бизнес "'.$umanikss[$id]['name'].'" за '.ConvertValute($Price).'$';
		unset($umanikss[$id]);
		sort($umanikss);
		SetFieldF('dollar',$UserInfo['dollar']+$Price);
		SetFieldF('manikss',json_encode($umanikss,JSON_UNESCAPED_UNICODE));

	}else{
		$message = $Nick.', у вас нет '.($id+1).' бизнеса.';
	}
	return $message;
}
function GetBalancemanikss($id,$getIncome = false){
	global $UserInfo;
	$umanikss = json_decode($UserInfo['manikss'],1);
	$manikss = $umanikss[$id];
	$time = CheckHour($manikss['time']);
	if($time[1] == 'ok' || $getIncome){
		$hours = $getIncome ? 1 : $time[0];
		$hours = $hours>24 ? 24 : $hours;
		$max_workers = $manikss['max_workers'];
		$income = $hours*$manikss['income'];
		$income_worker = floor($income/$max_workers);
		$income = $income+($income_worker*$manikss['workers']);
		$income = floor($income * ($manikss['lvl']));
		return $income;
		
	}else{
		return 0;
	}
}
?>
