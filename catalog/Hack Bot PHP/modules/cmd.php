<?php
function CMD($cmd){
	global $UserInfo,$Nick,$mysqli,$kbd;

	$IsConnect = IsConnect();
	if($IsConnect){
		$User = selectFromIDVK(GetJsonValue('hack','user_id'));
		$time = GetJsonValue('hack','time');
		if(CheckTime($time) ==  'ok'){
			return Disconnect().'<br>Time is over';
		}
		$buttons = 
		[
			'/user.status()',
			'/user.disconnect()',
			'/user.getlogs()',
			'/user.clearlogs()',
			'/user.grabmoney()',
			'/user.grabbtc()',
			'/user.grabbnc()',
			'/user.untask()'
		];
	
	}
	
	$str_cmd = str_replace('/', '', $cmd, $slash);
	if($slash == 1){
		$brackets = GetBracket($str_cmd);
		$str_cmd = FixBracket($str_cmd);
		$command = explode('.', $str_cmd);
		if($brackets == 2 ){
			switch ($command[0]) {
				case 'help':
					switch ($command[1]) {
						case 'cmd':
							$message = 'Команды:
								/server
								/user
								/my
								Чтобы узнать возможности команд на пишите "/help.[команда]()"
								Пример: /help.server()';
							$buttons = 
								[
									'/help.server()',
									'/help.user()',
									'/help.my()'
									
								];							
							break;
						case 'server':
							$message = '
							check - проверить работоспособность
							connect(ip) - подключиться
							ping - начать поиск жертв
							Пример: /server.connect(123)';
							$buttons = 
								[
									'/server.check()',
									'/server.connect()',
									'/server.ping()'
								];
							break;
						case 'user':
							$message = '
							status - обновить статус задач
							disconnect - отключиться от жертвы
							getlogs - получить логи жертвы
							clearlogs - почистить за собой логи
							grabmoney - украсть деньги жертвы
							grabbtc - украсть биткоины 
							grabbnc - украсть BINCOINS
							untask - отменить задачу
							Пример: /user.status()';
							$buttons = 
								[
									'/user.status()',
									'/user.disconnect()',
									'/user.getlogs()',
									'/user.clearlogs()',
									'/user.grabmoney()',
									'/user.grabbtc()',
									'/user.untask()',
									'/user.grabbnc()'
								];
							break;
						case 'my':
							$message = '
							getlogs - проверить свои логи
							clearlogs - почистить свои логи 
							Пример: /my.getlogs()';
							$buttons = 
								[
									'/my.getlogs()',
									'/my.clearlogs()',
								];
							break;
						default:
							$message = 'Command not found.
							Write /help.cmd()';
							$buttons = ['Команды'];
							break;

					}
					break;
				case 'server':
					switch ($command[1]) {
						case 'check':
							$message = 'STATUS: OK';
							break;
						case 'connect':
							$ip = GetCmdParams($cmd);// вытащить  из скобок значение
							$User = SelectFromIP($ip);// выборка игрока по ip
							if(GetJsonValue('hack','is_connect') != true){ // если не подключен
								if($User && $User['ip'] != $UserInfo['ip']){
									if($User['role'] >=3){
										return '>SYSTEM: NO'; // если роль 3 отключить
									}
									$uRefreshTime = GetJsonValue('hack','refresh_time',$User['id_VK']); // время защиты игрока от взлома 
									if(CheckTime($uRefreshTime) == 'ok'){
										if($User['antivirus']>$UserInfo['spy']){ 
											$message = $Nick.', connect failed.<br>Улучшите Spy, чтобы взломать.';
										}else{
											if($User['antivirus']<$UserInfo['internet']){
												$time_connect = $User['internet']-$UserInfo['antivirus'];
												$time_connect = abs($time_connect*60*10);
											}else{
												$time_connect = 60*5;
											}
											$time_connect = CalcTimeGrab($time_connect);
											$time = time()+$time_connect;
											AddStats('hack',1,'+',$User['id_VK']);
											AddLogsUser('connected '.$UserInfo['ip'],$User['id_VK']); // вставить логи подкл к игроку
											SellMsg($User['id_VK'],'Вас взломали.');
											$message = $Nick.', успешный взлом!<br>'.
											'У вас есть: '.GetTimeConnect($time).'<br>'.
											GetVictim($User,false);// информация о жертве
											AddJsonValue('hack','user_id',$User['id_VK']);
											AddJsonValue('hack','user_ip',$User['ip']);
											AddJsonValue('hack','time',$time);
											AddJsonValue('hack','is_connect',true);
											AddJsonValue('hack','refresh_time',(time()+(60*15)),false,$User['id_VK']);
										}
									}else{
										$message = $Nick.', user protected.(Игрок защищен)';
									}
								}else{
									$message = 'Invalid ip adress.(Неверный ip)';
								}
							}else{
								$message = $Nick.', disconnect user.(Отключитесь от игрока)';
							}
							break;
						case 'ping':
							$message = PingUsers();
							break;
						default:
							$message = 'Unknown command';
							break;
					}
					break;
				case 'user':
					switch ($command[1]) {
						case 'status':
							if($IsConnect){
								GetResultTask(GetJsonValue('hack','task'));
								$time = GetJsonValue('hack','time');
								if(CheckTime($time+1) != 'ok'){
									$ip = GetJsonValue('hack','user_ip');
									$User = SelectFromIP($ip);

									$message = $Nick.', you connected from: '.$ip.'<br>'.
									GetVictim($User,false);
									
								}else{
									$message = Disconnect().'<br>Time is over';
								}
							}else{
								$message = $Nick.', you are not connected';
							}
							break;
						case 'disconnect':
							if($IsConnect){
								$message = Disconnect();
							}else{
								$message = $Nick.', you are not connected';
							}
							break;
						case 'getlogs':
							if($IsConnect){
								$User = selectFromIDVK(GetJsonValue('hack','user_id'));
								$message = AddTimeTask('getlogs',GetTimeTasks('getlogs'));
								AddLogsUser('>getlogs',$User['id_VK']);
							}else{
								$message = $Nick.', you are not connected';
							}
							break;
						case 'clearlogs':
							if($IsConnect){
								$User = selectFromIDVK(GetJsonValue('hack','user_id'));
								$message = 'Logs cleared!';
								SetField('logs','cleared',$User['id_VK']);
							}else{
								$message = $Nick.', you are not connected';
							}
							break;	
						case 'grabmoney':
							if($IsConnect){
								if(CheckGrab($command[1])){
									if($User['dollar']>0){
										$User = selectFromIDVK(GetJsonValue('hack','user_id'));
										$message = AddTimeTask('grabmoney',GetTimeTasks('grabmoney'));
										AddLogsUser('>grabmoney',$User['id_VK']);
									}else{
										$message = $Nick.', у игрока нет данных ресурсов.';
									}
								}else{
									$message = $Nick.', error grab.';
								}
							}else{
								$message = $Nick.', you are not connected';
							}
							break;
						case 'grabbtc':
							if($IsConnect){
								if(CheckGrab($command[1])){
									if($User['btc']>0){
										$User = selectFromIDVK(GetJsonValue('hack','user_id'));
										$message = AddTimeTask('grabbtc',GetTimeTasks('grabbtc'));
										AddLogsUser('>grabbtc',$User['id_VK']);
									}else{
										$message = $Nick.', у игрока нет данных ресурсов.';
									}
								}else{
									$message = $Nick.', error grab.';
								}
							}else{
								$message = $Nick.', you are not connected';
							}
							break;
						case 'grabbnc':
							if($IsConnect){
								if(CheckGrab($command[1])){
									if(GetJsonValue('bnc','bnc',$User['id_K'])>0){
										$User = selectFromIDVK(GetJsonValue('hack','user_id'));
										$message = AddTimeTask('grabbnc',GetTimeTasks('grabbnc'));
										AddLogsUser('>grabbnc',$User['id_VK']);
									}else{
										$message = $Nick.', у игрока нет данных ресурсов.';
									}
								}else{
									$message = $Nick.', error grab.';
								}
							}else{
								$message = $Nick.', you are not connected';
							}
							break;
						case 'untask':
							if($IsConnect){
								if(!empty(GetJsonValue('hack','task'))){
									AddJsonValue('hack','task',false);
									AddJsonValue('hack','time_task',false);
									$message = $Nick.', task deleted.';
								}else{
									$message = $Nick.', 0 active tasks.';
								}
							}else{
								$message = $Nick.', you are not connected';
							}
							break;	
						default:
							$message = 'Unknown command';
							break;
					}
					break;
				case 'my':
					switch ($command[1]) {
						case 'getlogs':
							$message = 'Your logs: <br>'.$UserInfo['logs'];
							break;
						case 'clearlogs':
							SetFieldF('logs','cleared');
							$message = 'Your logs cleared!';
							break;
						default:
							# code...
							break;
					}
					break;
				default:
					$buttons = ['Команды'];
					$message = 'Syntax error 2';
					break;
			}
			
		}else{
			$buttons = ['Команды'];
			$message = 'Syntax Error 1(Забыл скобки).Write /help.cmd()';
		}
	}
	if(!empty($buttons)) {
		array_push($buttons, '/help.cmd()');
	}
	$kbd = CreateKeyboard($buttons);
	return $message;
}


function CalcTimeGrab($time){
	global $UserInfo;
	if(!empty($UserInfo['anonym'])){
		$anonym = SelectAnonym();
		if(!empty($anonym)){
			$aBonuses = json_decode($anonym['bonuses'],1);
			$Prozent = $aBonuses['time_grab_prozent']/100;
			$time = $time+floor($time*$Prozent);
			
		}
		
	}
	return $time;
}
function GetTimeTasks($task){
	switch ($task) {
		case 'clearlogs':
			$time = 0;
			break;
		case 'getlogs':
			$time = 30;
			break;
		case 'grabmoney':
			$time = GetJsonValue('hack','time')-time();
			$time = floor($time/rand(2,4));
			break;
		case 'grabbtc':
			$time = GetJsonValue('hack','time')-time();
			$time = floor($time/rand(1,2));
			break;
		case 'grabbnc':
			$time = 0;
			break;
		default:
			# code...
			break;
	}
	return $time;
}
function AddTimeTask($operation,$time){
	global $Nick;
	$time = time()+$time;
	$thisTimeOperation = GetJsonValue('hack','time_task');
	if(GetJsonValue('hack','task') == false || CheckTime($thisTimeOperation) == 'ok'){
		AddJsonValue('hack','time_task',$time);
		AddJsonValue('hack','task',$operation);
		$time_get_task = GetTimeConnect($time) == 'ok' ? 'success' : GetTimeConnect($time);
		return 'Task added! Time:'.$time_get_task;
	}else{
		if(CheckTime($thisTimeOperation) == 'ok'){
			AddJsonValue('hack','time_task',false);
			AddJsonValue('hack','task',false);
			return $Nick.', task completed';

		}
		return  $Nick.', идет выполнение задачи: '.GetJsonValue('hack','task').' '.CheckTime($thisTimeOperation);
	}
}
function IsConnect(){
	$time = GetJsonValue('hack','time');
	if(GetJsonValue('hack','is_connect') == true || CheckTime($time) != 'ok'){
		return true;
	}
	return false;
}
function AddLogsUser($text,$user_id){
	$User = selectFromIDVK($user_id);
	$logs = $User['logs'];
	if(strlen($logs) > 250) return;
	$logs .= $text.PHP_EOL;
	SetField('logs',$logs,$User['id_VK']);

}
function GetResultTask($task){
	global $UserInfo;
	$time = GetJsonValue('hack','time_task');
	if(CheckTime($time) == 'ok'){
		$user_id = GetJsonValue('hack','user_id');
		$User = selectFromIDVK($user_id);
		$meid = $UserInfo['id_VK'];
		switch ($task) {
			case 'getlogs':
				$text = 'Logs: '.$User['ip'].'<br>';
				SellMsg($meid,$text.$User['logs']);
				break;
			case 'grabmoney':
				$dollar = GetLimitsGrab($User,'dollar');
				SellMsg($meid,'Steal success!'.ConvertValute($dollar).'$');
				SetField('dollar',$User['dollar']-$dollar,$User['id_VK']);
				SetFieldF('dollar',$UserInfo['dollar']+$dollar);
				AddStats('grabmoney',$dollar,'+');
				AddStats('grabmoney',$dollar,'+',$User['id_VK']);
				break;
			case 'grabbtc':
				$btc = GetLimitsGrab($User,'btc');
				SellMsg($meid,'Steal success!'.ConvertValute($btc).SwitchEmoji('btc'));
				SetField('btc',$User['btc']-$btc,$User['id_VK']);
				SetFieldF('btc',$UserInfo['btc']+$btc);
				AddStats('megrabbtc',$btc,'+');
				AddStats('grabbtc',$btc,'+',$User['id_VK']);
				break;
			case 'grabbnc':
				$bnc = GetLimitsGrab($User,'bnc');
				SellMsg($meid,'Steal success!'.ConvertValute($bnc).SwitchEmoji('bnc'));
				AddJsonValue('bnc','bnc',$bnc,'-',$User['id_VK']);
				AddJsonValue('bnc','bnc',$bnc,'+');
				AddStats('megrabbnc',$bnc,'+');
				AddStats('grabbnc',$bnc,'+',$User['id_VK']);
				Disconnect();
				break;
			default:
				# code...
				break;
		}
		AddJsonValue('hack','task',false);
		AddJsonValue('hack','time_task',false);
	}
}
function CheckGrab($type){
	if (GetJsonValue('hack',$type) == true){
		return true;
	}
	return false;
}
function GetLimitsGrab($User,$type){
	global $UserInfo;
	switch ($type) {
		case 'dollar':
			$max = floor(($UserInfo['spy']+$UserInfo['CPU']+$UserInfo['VC']+$UserInfo['RAM'])*KKK('50k'));
			if($User['dollar']>$max){
				$dollar = $max;
			}else{
				$dollar = $User['dollar'];
			}
			break;
		case 'btc':
			$max = floor(($UserInfo['spy']+$UserInfo['CPU']+$UserInfo['VC']+$UserInfo['RAM'])*10);
			if($User['btc']>$max){
				$btc = $max;
			}else{
				$btc = $User['btc'];
			}
			break;
		case 'bnc':
			$bnc = 1;
			
			break;
		
		default:
			return false;
			break;
	}
	return $$type;
	
}
function Disconnect(){
	global $Nick;
	$time = GetJsonValue('hack','time');
		AddJsonValue('hack','task',false);
		AddJsonValue('hack','time_task',false);
		AddJsonValue('hack','user_id',false);
		AddJsonValue('hack','user_ip',false);
		AddJsonValue('hack','time',false);
		AddJsonValue('hack','is_connect',false);
		AddJsonValue('hack','grabbnc',true);
		AddJsonValue('hack','grabbtc',true);
		AddJsonValue('hack','grabmoney',true);
	return $Nick.', you disconnected';
}
function GetVictim($User,$arr = false){
	global $UserInfo;
	$dollar = GetLimitsGrab($User,'dollar');
	$btc = GetLimitsGrab($User,'btc');
	$bnc = GetLimitsGrab($User,'bnc');
	if(!empty(GetJsonValue('hack','task'))){
		$timeTask = CheckTime(GetJsonValue('hack','time_task'));
		if($timeTask != 'ok'){
			$tasks = '📋Tasks: '.GetJsonValue('hack','task').' '.$timeTask;
		}
	}
	$time = CheckTime(GetJsonValue('hack','time')) == 'ok' ? '?' : CheckTime(GetJsonValue('hack','time'));
	return '📟Time:'.$time.'<br>'.
	SwitchEmoji('bnc').'BINCOINS: '.ConvertValute($bnc).'<br>'.
			SwitchEmoji('btc').'Биткоины: '.ConvertValute($btc).'<br>'.
			'Доллары: '.ConvertValute($dollar).SwitchEmoji('dollar').'<br>'.$tasks;
}
function GetTimeConnect($time){
	$check_time = $time-time();
	$minutes = floor(($check_time%3600)/60);
	$seconds = $check_time%60;
	if($minutes>0 || $seconds>0){
		return 'Минут:'.$minutes.' секунд:'.$seconds;
	}else{
		if($time == 'unlim'){
			return '∞';
		}
		return 'ok';
	}
}
function PingUsers(){
	global $UserInfo,$mysqli,$Nick;
	$uAntivirus = $UserInfo['antivirus'];
	$uSpy = $UserInfo['spy'];
	$data = $mysqli->query('SELECT * FROM `users` WHERE
		`antivirus`>='.($uAntivirus-1).' &&
		`antivirus`>='.($uAntivirus-1).' &&
		`spy`>='.($uSpy-1).' &&
		`spy`<='.($uSpy+1).' &&
		`id_VK` !='.$UserInfo['id_VK'].' && 
		`role` <=2
		');
	if($data->num_rows > 0){
		$count = 0;
		for ($i=0;$i<$data->num_rows;$i++){
			$ips .= $data->fetch_assoc()['ip'].'<br>';
			$count++;
			if($i == 5){
				break;
			}
		}
		if(!empty($ips)){
			$message = $Nick.', results :'.($count).'<br>'.$ips;
		}else{
			$message  = $Nick.', results: 0';
		}
	}else{
		$message = $Nick.', results: 0';
	}
	return $message;
}
function FixBracket($str){
	$oneBracket = stripos($str, '(');
	$twoBracket = stripos($str, ')');
	return substr($str, 0, $oneBracket);
}
function SelectFromIP($ip){
	global $UserInfo,$mysqli;
	$data = $mysqli->query('SELECT * FROM `users` WHERE `ip`= "'.$ip.'" && `id` !='.$UserInfo['id'])->fetch_assoc();
	return $data;
}
function GetBracket($str){
	str_replace(['(',')'], '', $str,$count);
	return $count;
}
function GetCmdParams($str){
	$oneBracket = stripos($str, '(');
	$twoBracket = stripos($str, ')');
	$str = substr($str, $oneBracket,$twoBracket);
	$params = str_replace(['(',')'], '', $str);
	return $params;
}
?>
