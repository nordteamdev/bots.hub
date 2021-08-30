<?php
function BuyServer($id = false){
	global $UserInfo,$Nick,$mysqli;
	if(empty($id)){
		$data = $mysqli->query('SELECT * FROM `servers`');
		$message = $Nick.', список серверов:<br>';
		$message .= '💸 -- стоимость<br>➕ -- прибыль/в часов<br>';
		$donate_balanceEmoji = SwitchEmoji('donate_balance');
		while (($row = $data->fetch_assoc()) != false) {
			$message .= $row['id'].'. '.$row['name'].
			' (💸'.ConvertValuteDouble($row['price']).''.$donate_balanceEmoji.') (➕'.ConvertValuteDouble($row['income']).''.$donate_balanceEmoji.'/'.$row['hours'].')<br>';
		}
		$message .= 'Чтобы арендовать сервер напишите "сервера [номер]".<br>';
		$message .= 'Ваши матрицы: '.ConvertValuteDouble($UserInfo['donate_balance']).$donate_balanceEmoji;
	}else{
		$data = $mysqli->query('SELECT * FROM `servers` WHERE `id`='.$id)->fetch_assoc();
		if($data){
			$message = AddJsonServer($id);
		}else{
			$message = $Nick.', неверный номер.';
		}
	}
	return $message;

}
function AddJsonServer($id){
	global $UserInfo,$Nick,$mysqli,$admin;
	$server = $mysqli->query('SELECT * FROM `servers` WHERE `id`='.$id)->fetch_assoc();
	$uServer = json_decode($UserInfo['server'],1);
	if(empty($uServer)){
		if($UserInfo['donate_balance'] >= $server['price']){
			$hoursLife = GetLifeServerH($server['price'],$server['income'],$server['hours']);
			$timeLife = time()+$hoursLife;
			$arrayServer = 
			[
				'time_life'=>$timeLife,
				'name'=>$server['name'],
				'income'=>$server['income'],
				'hours'=>$server['hours'],
				'price'=>$server['price'],
				'last_assemble_time'=>time()+($server['hours']*3600)+rand(-5,30)
			];
			$text = '[id'.$UserInfo['id_VK'].'|'.$UserInfo['name'].'] купил сервер "'.$server['name'].'" ';
			SellMsg($admin,$text);
			SetFieldF('donate_balance',$UserInfo['donate_balance']-$server['price']);
			SetFieldF('server',json_encode($arrayServer,JSON_UNESCAPED_UNICODE));
			$message = $Nick.', вы купили "'.$server['name'].'" чтобы узнать информацию напишите "сервер"';
		}else{
			$message = $Nick.', недостаточно '.SwitchEmoji('donate_balance');
		}
	}else{
		$message = $Nick.', у вас есть активный сервер.';
	}
	return $message;
}
function AssembleServer(){
	global $UserInfo,$Nick;
	$UserInfo = selectFromIDVK($UserInfo['id_VK']);
	$uServer = json_decode($UserInfo['server'],1);
	$time = $uServer['time_life'];
	if(!empty($uServer)){
		if(GetBanTime($time) != 'ok'){
			$last_assemble_time = $uServer['last_assemble_time'];
			if(CheckTime($last_assemble_time) == 'ok'){
				$hours = $uServer['hours']*3600;
				AddJsonValue('server','last_assemble_time',time()+$hours+rand(-4,4));
				SetFieldF('donate_balance',$UserInfo['donate_balance']+$uServer['income']);
				$message = $Nick.', вы собрали с сервера: '.ConvertValuteDouble($uServer['income']).SwitchEmoji('donate_balance');
			}else{
				$message = $Nick.', приходите через: '.CheckTime($last_assemble_time);
			}
		}
	}else{
		$message = $Nick.', у вас нет сервера.';
	}
	return $message;
}

function GetMyServer(){
	global $UserInfo,$Nick;
	$uServer = json_decode($UserInfo['server'],1);
	if(!empty($uServer)){
		$message = $Nick.', ваш сервер "'.$uServer['name'].'" <br>';
		$message .= '➕Прибыль: '.ConvertValuteDouble($uServer['income']).SwitchEmoji('donate_balance').'/каждые '.$uServer['hours'].' часов<br>'.
		'⏱Аренда: '.GetBanTime($uServer['time_life']).'<br>'.
		'❗Чтобы собрать матрицы с сервера напишите "сервер собрать"<br>'.
		'❗Помощь -- "сервер помощь"';
	}else{
		$message = $Nick.', у вас нет сервера, арендуйте его через команду "сервера"';
	}
	return $message;
}
function GetHelpServer(){
	global $Nick;
	$message = $Nick.', сервера это новая система заработка РЕАЛЬНОЙ ВАЛЮТЫ!<br>'.
	'1.Сначала вам нужно арендовать нужный вам сервер через команду "сервера"<br>'.
	'2.Собирайте каждые N часов прибыль с сервера.<br>'.
	'3.Выводите матрицы используя команду "вывести матрицы"<br>'.
	'❗Уважительная просьба если вам не пришли деньги на ваш qiwi кошелек напишите нам через команду "репорт" с вами свяжется администратор.<br>'.
	'❗Мы не занимаемся мошенничеством! Если вы считаете что вас обманули напишите в тему "Вопросы и ответы", мы обязательно вам поможем.<br>'.
	'❗Не верьте мошенникам которые предлагают вам купить игровую валюту за пределами бота, в противном случае пишите подробно в "репорт" о данном человеке.';
	return $message;
}
function GetLifeServerH($price,$income,$hours){
	$f = (($price/$income)*$hours);
	$life = $f+($f*0.1);
	return $life*3600;
}
?>
