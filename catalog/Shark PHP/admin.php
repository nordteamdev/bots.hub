<?php 
function Admin($role){
	
	$message = '';
	global $data,$token,$tokenpgroup,$AdminId,$userId,$body,
	$peer_id,$Nick,$UserInfo,$mysqli,$bodyxl,$bodyx;
	//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//
//****************************************************ROLE 2************************************************************************************//	
	if ($role>=2){
		switch ($bodyxl[0]){
			case 'cmd':
			$message = '
			Список команд доступных вам:
			set [ферма/самолёт/
			мото/телефон/квартира/дом/вертолёт/машина] [название]
			info [link]
			infoid [id игровой]';
			break;
			case 'info':
			$message = Get($bodyxl[1]);
			break;
			case 'infoid':
			$User = selectFromID(false,$bodyxl[1]);
			$message = Get($User['id_VK']);	
			break;
			case 'set':
				switch($bodyxl[1]){
					case 'машина':
					SetFieldF('car',SetSubstr());
					break;
					case 'вертолет': 
					case 'вертолёт': 
					SetFieldF('vert',SetSubstr());
					break;
					case 'дом':
					SetFieldF('house',SetSubstr());
					break;
					case 'квартира':
					SetFieldF('kvart',SetSubstr());
					break;
					case 'телефон':
					SetFieldF('telephone',SetSubstr());
					break;
					case 'мото':
					SetFieldF('moto',SetSubstr());
					break;
					case 'самолет':
					case 'самолёт':
					SetFieldF('samolet',SetSubstr());
					break;
					case 'ферма':
					SetFieldF('name_farm',SetSubstr());
					break;
					case 'ферматпс':
					SetFieldF('name_farmTPC',SetSubstr());
					break;
					
				}
			break;
		}
	}
	
	
//****************************************************ROLE 3************************************************************************************//
	if($role>=3){
		switch ($bodyxl[0]){
			case 'infoclan':
			$message = GetClanInfo($bodyx[1]);
			break;
			case 'cmd':
			$message .= '
			ADMIN
			set [название имущества] [название] 
			set [фермаколичество-количество/фермаайди-ид фермы] [число] 
			set [ник] [строка] 
			set [фермавремя] [кол-во часов] 
			set [деньги] [число] 
			set [jobexp] [число] 
			set [jobtime] [кол-во часов] 
			set [банк] [число] 
			set [банквремя] [кол-во часов] 	
			set bname [name]	
			set exp [exp]
			set lvl [lvl]
			set btime [кол-во часов] 
			set bincome [прибыль] 
			set blvl [lvl] - лвл бизнеса (аккуратнее)
			set ban [link] [сек,мин,час,день]- бан
			set bantr [link] - бан  передачи
			set nrole [role]
			Стата - статистика бота 
			Деньги [количество] 
			removebonus - сброс ежедневного бонуса 
			set [шанс] [число] 
			set fl [count]
			set rlt [0/1]
			set автомат [0/1]
			set напёрсток [0/1]
			set банклимит [0/1]
			set префикс [0/1]
			set инвиз [0/1]';
			break;
			case 'admrules':
			$message = AdminRules();
			break;
			case 'стата':
			if (Last_name($peer_id) != '' || $userId == $AdminId[0]){
				$CasinoJackpot = file('files/casinojackpot.txt');
				$fileLikes = file('files/like.txt');
				$Stats = GetStats();
				$Stats = explode(' ',$Stats);
				$message = 'Статистика бота:
				👁️‍Количество игроков: '.ConvertValute($Stats[0])."<br>".
				'💲Сумма денег игроков: '.ConvertValute($Stats[1])."$<br>".
				'💊Сумма доната игроков: '.ConvertValute($Stats[13])." R<br>".
				'👑Сумма рейтинга: '.ConvertValute($Stats[2])."<br>".
				'💳Cумма в банке: '.ConvertValute($Stats[5])."$<br>".
				'🌐Сумма биткоинов: '.ConvertValute($Stats[6])."<br>".
				'💷Сумма тайпанкоинов: '.ConvertValute($Stats[8])."<br>".
				'🔋Сумма ферм: '.ConvertValute($Stats[3])."<br>".
				'🔋Сумма фермTPC: '.ConvertValute($Stats[9])."<br>".
				'🤖Jackpot casino: '.ConvertValute($CasinoJackpot[0])."$<br>".
				'💓В браке: '.ConvertValute($Stats[4])."<br>".
				'⛔Забаненых: '.ConvertValute($Stats[7])."<br>".
				'⌚Дневной актив: '.ConvertValute($Stats[10])."<br>".
				'🔑Ключей: '.ConvertValute(CountKey())."<br>".
				'👥Invited: '.ConvertValute($Stats[11])."<br>".
				'🔌Пинг ~ '.ping("www.vk.com", 80, 10)."<br>".
				'👥Пришло за сутки: '.ConvertValute($Stats[12])."<br>".
				'👍Лайков: '.ConvertValute($fileLikes[0])."<br>".
				'📧Количество смс за сутки: '.RemoveMessagesCountGet()."<br>".
				'📧⌚Количество смс за час~'.round(RemoveMessagesCountGet()/24)."<br>".
				'Размер бота: '.GetSizeBot();
				
			}
			break;
			case 'removebonus':
			SetFieldF('time_bonuse',time()-86400);
			break;
			case 'деньги':
			$summ = KKK($bodyxl[1]);
			SetFieldF('balance',$UserInfo['balance']+(floor($summ)));
			$message = 
			'Было:  '.ConvertValute($UserInfo['balance'])."$"."<br>".
			'Стало: '.ConvertValute($UserInfo['balance']+$summ)."$";
			break;
			case 'admin':
			$message = AdminPanel();
			break;
			case 'set':
				switch($bodyxl[1]){
					case 'unban':
					$User = selectFromIDVK(false,GetId($bodyx[2]));
					Unban(GetId($bodyx[2]));
					SellMsg($User['id_VK'],'🔥'.$User['name'].', вы разбанены');
					$text = 'Разбанил ID:'.$User['id'].' '.GetDateF();
					AddLogs($userId,$text);
					$message = 
					'Игрок: "'.$User['name'].'" разбанен';	
					break;
					case 'unbanid':
					$Users = $mysqli->query("SELECT * FROM `users` ");
					$User = selectFromID($Users,$bodyx[2]);
					Unban(GetId($bodyx[2]));
					SellMsg($User['id_VK'],'🔥'.$User['name'].', вы разбанены');
					$text = 'Разбанил ID:'.$User['id'].' '.GetDateF();
					AddLogs($userId,$text);
					$message = 
					'Игрок: "'.$User['name'].'" разбанен';	
					break;
					case 'unbantr':
					$Users = $mysqli->query("SELECT * FROM `users` ");
					$User = selectFromIDVK($Users,GetId($bodyx[2]));
					SetField('banned_tr',0,GetId($bodyx[2]));
					$message = 'Разбанил передачу ID:'.$User['id'].' '.GetDateF();
					$message = 'Разбанил ID:'.$User['id'].' '.GetDateF();
					AddLogs($userId,$message);
					break;
					case 'деньги': 
					SetFieldF('balance',$bodyx[2]*1);
					break;
					case 'фермаколичество':
					SetFieldF('count_farm',$bodyx[2]);
					break;
					case 'фермавремя':
					SetFieldF('time_farm',$UserInfo['time_farm']-(3600*$bodyx[2]));
					break;
					case 'ферматпс':
					SetFieldF('name_farmTPC',SetSubstr());
					break;
					case 'фермаколичествотпс':
					SetFieldF('count_farmTPC',$bodyx[2]);
					break;
					case 'ник': 
					SetFieldF('name',SetSubstr());
					break;
					case 'фермавремятпс':
					SetFieldF('time_farmTPC',$UserInfo['time_farmTPC']-(3600*$bodyx[2]));
					break;
					case 'шанс':
					SetFieldF('chance_set',$bodyx[2]);
					break;
					case 'банквремя':
					SetFieldF('bank_time',$UserInfo['bank_time']-(3600*$bodyx[2]));
					break;
					case 'банк':
					SetFieldF('bank',$UserInfo['bank']+($bodyx[2]));
					break;
					case 'jobexp':
					SetFieldF('job_exp',($bodyx[2]));		
					break;
					case 'jobtime':
					SetFieldF('time_job',$UserInfo['time_job']-($bodyx[2]*3600));
					break;
					case 'btime':
					SetFieldF('buisness_time',$UserInfo['buisness_time']-(3600*$bodyx[2]));
					break;
					case 'ban':
					$User = selectFromIDVK(false,GetId($bodyx[2]));
					if($UserInfo['role'] > $User['role'] || $userId == $AdminId[0]){	
						$textban = substr($body,strlen($bodyx[1].$bodyx[2].$bodyx[3])+6);
						Ban(GetId($bodyx[2]),GetBanTimes($bodyx[3]),$textban);
						$text = 'Забанил ID:'.$User['id'].' '.GetDateF();
						AddLogs($userId,$text);
						SellMsg(GetId($bodyx[2]),'🔥'.$User['name'].', вы забанены на:'.GetBanTime(time()+GetBanTimes($bodyx[3])).'<br>🔥Причина бана:"'.$textban.'"');
						$message = 
						'Игрок: "'.$User['name'].'" забанен на: '.(GetBanTimes($bodyx[3])).' sec';
					}else{
						$message = $Nick.', ошибка blyat.';
					}
					
					break;
					case 'banid':
					$User = selectFromID(false,$bodyx[2]);
					if($UserInfo['role'] > $User['role'] || $userId == $AdminId[0]){	
						$textban = substr($body,strlen($bodyx[1].$bodyx[2].$bodyx[3])+6);
						Ban(GetId($bodyx[2]),GetBanTimes($bodyx[3]),$textban);
						$text = 'Забанил ID:'.$User['id'].' '.GetDateF();
						AddLogs($userId,$text);
						SellMsg($User['id_VK'],'🔥'.$User['name'].', вы забанены на:'.GetBanTime(time()+GetBanTimes($bodyx[3])).'<br>🔥Причина бана:"'.$textban.'"');
						$message = 
						'Игрок: "'.$User['name'].'" забанен на: '.(GetBanTimes($bodyx[3])).' sec';
					}else{
						$message = $Nick.', ошибка blyat.';
					}
					
					break;
					case 'bantr':
					if(GetId($bodyx[2]) != $AdminId[0]){
						$Users = $mysqli->query("SELECT * FROM `users` ");
						$User = selectFromIDVK($Users,GetId($bodyx[2]));
						SetField('banned_tr',1,GetId($bodyx[2]));
						$text = 'Забанил передачу ID:'.$User['id'].' '.GetDateF();
						AddLogs($userId,$text);
						$message = 
						'Игроку: "'.$User['name'].'" отключена передача валюты';
					}else{
						$message = 'Нет прав.';
					}
					break;
					case 'bincome':
					SetFieldF('buisness_income',$bodyx[2]);
					break;
					case 'blvl':
					SetFieldF('buisness_lvl',$bodyx[2]);
					break;
					case 'bname':
					SetFieldF('buisness',SetSubstr());
					break;
					case 'lvl':
					SetFieldF('lvl',$bodyx[2]);
					break;
					case 'exp':
					SetFieldF('lvl_exp',$bodyx[2]);
					break;
					case 'rlt':
					SetFieldF('roulette_chance',$bodyx[2]);
					break;
					case 'fl':
					SetFieldF('fl_admin',$bodyx[2]);
					break;
					case 'автомат':
					SetFieldF('automate_on',$bodyx[2]);
					break;
					case 'напёрсток':
					case 'наперсток':
					SetFieldF('stakan_on',$bodyx[2]);
					break;
					case 'банклимит':
					SetFieldF('bank_on',$bodyx[2]);
					break;
					case 'префикс':
					SetFieldF('prefix',$bodyx[2]);
					break;
					case 'инвиз':
					SetFieldF('invisible',$bodyx[2]);
					break;
					case 'nrole':
					SetFieldF('nelegal_role',$bodyx[2]);
					break;
					
					
				}
			break;
		}
	}
//****************************************************ROLE 4************************************************************************************//
	if($role>=4){
		switch ($bodyxl[0]){
			case 'дать':
			if(GetId($bodyx[1])!= $AdminId[0]){
				if(KKK($bodyx[2]) <= pow(10,9)*15 && KKK($bodyx[2])>0 || $userId == $AdminId[0]){
					$Balans = GetFieldInfo($bodyx[1],'balance');
					$Nickname = GetFieldInfo($bodyx[1],'name');
					$ID = GetFieldInfo($bodyxl[1],'id');
					$IDVK = GetId($bodyxl[1]);
					
					SetField('balance',$Balans+KKK($bodyx[2]),GetId($bodyxl[1]));
					$text = 'Передал id:'.$ID.'| id_VK:'.$IDVK.' | '.number_format(KKK($bodyx[2]),0,'.','.').'$ | '.GetDateF();
					AddLogs($userId,$text);
					$message = 'Информация об операции:
					👔Ник: '.$Nickname.'<br>'.
					'🔎ID: '.$ID.'<br>'.
					'🔎IDVK: '.$IDVK.'<br>'.
					'💰Баланс:<br>'.
					'Было: '.number_format($Balans,0,'.','.').'<br>'.
					'Стало: '.number_format($Balans+KKK($bodyx[2]),0,'.','.');
					$TextMsg = $Nickname.', зачислено: '.ConvertValute(KKK($bodyx[2])).'$';
					SellMsg($IDVK,$TextMsg);
				}
			}else{$message = "Error";}
			break;
		}
	}
	
			
//****************************************************ROLE 6************************************************************************************//
	if ($UserInfo['role'] == 6 || $userId == $AdminId[0] || $userId == 212198981){
		if($userId == $AdminId[0] || $userId == 212198981){
			switch($bodyxl[0]){
				case 'обнулить':
				$id = GEtId($bodyxl[1]);
					if($id){
						$User = selectFromIDVK(false,$id);
						switch ($bodyxl[2]) {
							case 'баланс':
								SetField('balance',0,$id);
								break;
							case 'рейтинг':
								SetField('rating',0,$id);
								break;
							case 'биткоины':
								SetField('BTC',0,$id);
								break;
							case 'тайпанкоины':
								SetField('TPC',0,$id);
								break;
							default:
								return $Nick.', ошибка напишите тип [баланс/рейтинг/биткоины/тайпанкоины].';
								break;
						}
						$message = $Nick.', вы обнулили '.$bodyxl[2].' игрока "'.$User['name'].'"';
					}else{
						$message = $Nick.', ошибка, неверная ссылка или id.';
					}
					break;
				case 'список':
				if($bodyxl[1] == 'добавить'){
					$id = GetId($bodyx[2]);
					$f = fopen('files/razdacha.txt','a+');
					fwrite($f,$id.PHP_EOL);
					fclose($f);
					$message = $id.' добавлен';
				}elseif($bodyxl[1] == 'очистить'){
					$f = fopen('files/razdacha.txt','w+');
					fclose($f);
					$message = 'Список раздачи очищен';
				}elseif($bodyxl[1] == 'раздать'){
					$message = Razdacha(KKK($bodyxl[2]));
				}else{
					$message = GetListRazdacha();
				}	
				break;
				case 'donate':
					$User = selectFromIDVK(false,GEtId($bodyx[1]));
					if($User){
						SetField('donate_balance',$User['donate_balance']+KKK($bodyx[2]),$User['id_VK']);
						$message = switchRole($UserInfo['role']).', вы выдали игроку "'.$User['name'].'" '.ConvertValute(KKK($bodyx[2])).' руб';
					}else{
						$message = switchRole($UserInfo['role']).', игрока нет в базе.';
					}
					break;
				case 'kick':
				SellMsg($peer_id,'Кикнул НАХУЙ!');
				kick(GEtId($bodyx[1]));
				break;
				case 'leave':
				SellMsg($peer_id,'Пока...');
				Leave($bodyx[1]);
				break;

				case 'peer':
				$message = $peer_id;
				break;
				case 'setf':
				if($userId == $AdminId[0]){
					SetField($bodyx[2],$bodyx[3],GetId($bodyx[1]));
					$message = 'Success!';
				}
				break;
				case 'setfield':
				if($userId == $AdminId[0]){
					SetFieldF($bodyx[1],$bodyx[2]);
					$message = 'Success!';
				}
				break;
				case 'clearlogs':
				ClearLogs(GetId($bodyx[1]));
				$message = 'Success';
				break;
				case 'phote':
				file_put_contents('image.jpg',file_get_contents($bodyx[1]));
				$message = 'Saved';
				break;
				case 'calllogs':
				$message = ClearAllLogs();
				break;
				case 'race':
				if($bodyxl[1] == 'start' || $bodyxl[1] == 'stop'){
					$f = fopen('files/clanracetime.txt','w+');
					if($bodyxl[1] == 'start'){
						fwrite($f,time()+(86400*7));
						$message = switchRole($UserInfo['role']).', клан-гонка началась!!!';
					}elseif($bodyxl[1] == 'stop'){
						fwrite($f,1);
						$message = switchRole($UserInfo['role']).', клан-гонка остановлена.';
					}
					fclose($f);
				}
				
				break;
				case 'prozent':
				$f = fopen('files/prozentdonat.txt','w+');
				fwrite($f,$bodyx[1]*1);
				fclose($f);
				$message = 'P: '.($bodyx[1]*1).'%';
				break;
				case 'refid':
				$message = Refid();
				break;
				case 'нагрузка':
				$p = round(memory_get_peak_usage(1)/1024/1024,4);
				$v = round(memory_get_usage(1)/1024/1024,4);
				$i = round(memory_get_usage()/1024/1024,4);
				$message =  'Пик: '.$p.'MB<br>'.
				'Выделено: '.$v.'MB<br>'.
				'Используется: '.$i.'MB<br>'.
				'Prozent: '.round($i/($v/100), 2).'%';
					
				break;

			}
		}
		switch ($bodyxl[0]){
			case 'nick':
			if(!empty($bodyx[1])){
				$message = SearchNick(substr($body,strlen($bodyxl[0])+1));
			}
			break;
			case 'infobclan':
			$message  = GetBonuses($bodyx[1]);
			break;
			case 'getvip':
			$message  = GetRolesList(2);
			break;
			case 'getadm':
			$message  = GetRolesList(3);
			break;
			case 'gethelp':
			$message  = GetRolesList(5);
			break;
			case 'getdev':
			$message  = GetRolesList(6);
			break;
			case 'getvalute':
			if(!empty($bodyx[1])){
				$message = GetValuteList(KKK($bodyx[1]),'balance');
			}
			break;
			case 'clearskills':
			SetFieldF('skills',0);
			$message = $Nick.', умения очищены.';
			break;
			case 'getdonate':
			$message = GetValuteList(KKK($bodyx[1]),'donate_balance');
			break;
			case 'getfarm':
			if(!empty($bodyx[1])){
				$message = GetValuteList(KKK($bodyx[1]),'count_farm');
			}
			break;
			case 'getfarm':
			if(!empty($bodyx[1])){
				$message = GetValuteList(KKK($bodyx[1]),'count_farm');
			}
			break;
			case 'getfarmtpc':
			if(!empty($bodyx[1])){
				$message = GetValuteList(KKK($bodyx[1]),'count_farmTPC');
			}
			break;
			case 'getbank':
			if(!empty($bodyx[1])){
				$message = GetValuteList(KKK($bodyx[1]),'bank');
			}
			break;		
			case 'getbanned':
			$message = 'Banlist:<br>';
			$message .= GetListBanned($bodyx[1]);
			break;	
			case 'msg':
			SellMsg(GetId($bodyx[1]),SetSubstr());
			$message = 'Ok!';
			break;
			case 'photevk':
			$att = $data->object->attachments;
			$count = count($att[0]->photo->sizes)-1;
			$url = $att[0]->photo->sizes[$count]->url;
			file_put_contents('image.jpg',file_get_contents($url));
			$message = 'Saved';
			break;
			case 'photo':
			$attachment = PostPhoto(GetId($bodyx[1]),"image.jpg");
			$request_params = array(
			'attachment' => $attachment,
			'peer_id' => $peer_id,
			'access_token' => $token,
			'v' => '5.80'
				);
			$get_params = http_build_query($request_params);
			file_get_contents('https://api.vk.com/method/messages.send?'.$get_params);
			break;
			case 'version':
			$f = fopen('files/v.txt','w+');
			$Rew = $bodyx[1];
			fwrite($f,$Rew);
			fclose($f);
			$message = 'Version changed: '.$bodyx[1];
			break;
			case 'gift':
			$f = fopen('files/gift.txt','w+');
			$Rew = KKK($bodyx[1]);
			fwrite($f,$Rew);
			fclose($f);
			$message = 'gift: '.ConvertValute($Rew).'$';
			break;
			case 'ping':
			$message = '🔌Ping: '.ping($bodyx[1], 80, 10);
			break;
			case 'cmc':
			ClearMessagesCount();
			$message = 'ok';
			break;
			case 'ip':
			$message  = $_SERVER['REMOTE_ADDR']."<br>".$_SERVER['HTTP_USER_AGENT'];
			break;
			case 'php_uname':
			$message = php_uname();
			break;
			case 'gugol':
			SetFieldF('balance',1.0E+156);
			$message = 'Gugol Active';
			break;
			case 'getlogs':
			$message = GetLogs(GetId($bodyx[1]));
			break;
			case 'key':
			if($userId == $AdminId[0]){
				if (!empty($bodyxl[1])){
					AddKey(KKK($bodyxl[1]),KKK($bodyx[2]));
					$message = '🔐Ключ создан.';
				}else{
					$message = '🔐ERROR🔐';
				}
			}
			break;
			case 'keys':
			$list = GetListKeyS();
			if (!empty($list)){
				$message = $list;
			}else{
				$message = '🗑️Empty(list)';
			}
			
			break;
			case 'keydel':
			DelKey($bodyx[1]);
			$message = '☢️Ключ удален.';
			break;
			case 'keyclear':
			ClearKeys();
			$message = '☣️️Ключи удалены.';
			break;
			case 'a':
			AnswerToId('AdminAlarm: '.substr($body,strlen($bodyx[0].$bodyx[1]. 1)),$bodyx[1]);
			$message  = 'ok!';
			break;
			case 'keyget':
			$list = KeyGet();
			if (!empty($list)){
				$message = $list;
			}else{
				$message = '🗑️Empty(list)';
			}
			break;
			case 'b':
			SetFieldF('time_alarm',0);
			break;
			case 'cmdadm':
			$message .= 
			'
			getbanned [offset] - banlist
			phote [link]
			phote {attachment}
			photo [idVK]
			info [link] 
			infoid [id игровой] 
			infobclan [id] - cbonuse
			infoclan [id]
			version [version]
			gift [summ] - everyday gift
			set markertop [link] [1/0]
			set unbantr [link]
			set unban [link]   
			set id [first] [second]
			set limit [link] [num] - tr
			set nick [link] [nick]
			keys - getlist
			keydel [key]
			keyclear - clear keys
			keyget - get keys
			a [id] [text]
			set m [link] [0/1]';
			break;
			case 'dev':
			if($userId == $AdminId[0]){
				$message = 
				'
				race [start/stop]
				calllogs
				prozent [p]
				set crp - clean clanwar
				setfield [field] [value]
				set rewardclan [ClanId] [summ]
				SetF [link] [field] [value] 
				set clansilent [1/0]
				set limitr [link] [limit]
				refid - refresh ids
				leave [peer_id]
				kick [link|userid]
				';
			}
			break;
			case 'set':
			switch($bodyxl[1]){
				case 'role':
				if ($userId == $AdminId[0]){
					if ($bodyxl[3]>6 || $bodyxl[3]<1){
						return 'Error';
					}			
					SetField('role',$bodyxl[3],GetId($bodyxl[2]));
					$message = switchRole($UserInfo['role']).', вы установили роль игрока "'.
					GetName(GetId($bodyxl[2])).'" - '.switchRole($bodyxl[3]).'.<br>';
				}
				break;
				case 'markertop':			
				$text = 'Установил маркер: id_VK:'.GetId($bodyx[2]).' | '.GetDateF();
				AddLogs($userId,$text);			
				SetField('markertop',$bodyxl[3],GetId($bodyxl[2]));
				$message = switchRole($UserInfo['role']).', marker "'.
				GetName(GetId($bodyxl[2])).'" - {'.$bodyxl[3].'}<br>';
				
				break;
				case 'newgame':
				if ($userId == $AdminId[0]){
					$mysqli->query("DELETE FROM `users` WHERE `users`.`id_VK` = ".GetId($bodyx[2]).";");
					$User = selectFromIDVK(false,GetId($bodyx[2]));
					$text = 'Обнулил id:'.$User['id'].'| id_VK:'.GetId($bodyx[2]).' | '.GetDateF();
					AddLogs($userId,$text);
					$message = 
					'Игрок: '.GetId($bodyx[2]).' обнулен';
					
				}
				break;
				case 'limit':
				/*
				$bodyx[0]// 1 слово в смс
				$bodyx[1]// 2 слово в смс
				$bodyx[2]// 3 слово в смс
				GetId($bodyx[2])// GetId это функция для получения id страницы вконтакте 
				*/
				$User = selectFromIDVK(false,GetId($bodyx[2]));//берем информацию о пользователе
				SetField('time_transfer',$bodyx[3],$User['id_VK']);// меняем значение поля time_transfer у пользователя
				SetField('summ_transfer',0,$User['id_VK']);// меняем значение поля summ_transfer у пользователя
				$message = 'Лимит игрока "'.$User['id_VK'].'" установлен на '.$bodyx[3];// это сообщение которое будет отправлено в ответ на запрос
				break;
				case 'chance': 
				if($userId == $AdminId[0]){
					$text = 'Добавил шанс:'.$bodyx[3].'| id_VK:'.GetId($bodyx[2]).' | '.GetDateF();
					SetField('chance_set',KKK($bodyx[3]),GetId($bodyx[2]));
				}
				break;
				case 'newgameid':
				if ($userId == $AdminId[0]){
					$Users = $mysqli->query("SELECT * FROM `users` ");
					$Player = selectFromID($Users,$bodyx[2]);
					$mysqli->query("DELETE FROM `users` WHERE `users`.`id` = ".$bodyx[2].";");
					$text = 'Обнулил id:'.$Player['id'].'| id_VK:'.$Player['id_VK'].' | '.GetDateF();
					AddLogs($userId,$text);
					$message = 
					'Игрок: "'.$Player['name'].'" обнулен';
				}
				break;
				case 'id':
				$Users = $mysqli->query("SELECT * FROM `users` ");
				$Player = selectFromID($Users,$bodyx[2]);
				$Player2 = selectFromID($Users,$bodyx[3]);
				SetField('id',16,$Player2['id_VK']);
				SetField('id',$bodyx[3],$Player['id_VK']);
				SetField('id',$bodyx[2],$Player2['id_VK']);
				$text = 'Сменил id:'.$bodyx[3].'=>'.$bodyx[2].'| id_VK:'.$IDVK.' | '.GetDateF();
				AddLogs($userId,$text);
				$message = 'Id игрока "'.$Player['name'].'" изменен '.$bodyx[2].' => '.$bodyx[3];
				break;
				case 'limitr':				
				//$text = 'Сменил limit:'.$Player['id'].'| id_VK:'.GetId($bodyx[2]).' | '.GetDateF();
				//AddLogs($userId,$text);				
				$User = selectFromIDVK(false,GetId($bodyx[2]));
				$Summ = KKK($bodyxl[3]);
				SetField('one_limit_transfer',$Summ,$User['id_VK']);
				$message = $Nick.', дневной лимит передачи валюты игрока "'.$User['name'].'" изменен =>'.ConvertValute($Summ).'$';
				break;
				case 'nick':
				$Users = $mysqli->query("SELECT * FROM `users` ");
				$Player = selectFromIDVK($Users,GEtId($bodyx[2]));
				$Nick = substr($body,9+(strlen($bodyx[2])));
				$text = 'Сменил ник:'.$Player['id'].'| id_VK:'.$Player['id_VK'].' | '.GetDateF();
				AddLogs($userId,$text);
				SetField('name',substr($body,9+(strlen($bodyx[2]))),GetId($bodyx[2]));
				$message = 'Ник игрока "'.$Player['name'].'" изменен '.$Player['name'].' => '.$Nick;
				break;
				case 'level':
				$text = 'Сменил lvl:'.$bodyx[3].'| id_VK:'.GetId($bodyx[2]).' | '.GetDateF();
				AddLogs($userId,$text);	
				SetField('lvl',$bodyx[3],GetId($bodyx[2]));
				break;
				case 'рейтинг': 
				SetFieldF('rating',$bodyx[2]*1);
				break;
				case 'фермаайдитпс': 
				SetFieldF('id_farmTPC',$bodyx[2]);
				break;
				case 'фермаайди':
				SetFieldF('id_farm',$bodyx[2]);
				break;
				case 'ntime':
				SetFieldF('nelegal_time',time()-($bodyx[2]*3600));
				break;
				case 'rewardclan':
				if($userId == $AdminId[0]){
					$clan = SelectClan($bodyx[2]);
					SetFieldClan('race_balance',$clan['race_balance']+KKK($bodyx[3]),$clan['id']);
					$message = 'ClanId =>'.$clan['id'].' +reward: '.ConvertValute(KKK($bodyx[3])).'$';
				}
				break;
				case 'crp':
				if($userId == $AdminId[0]){
					
					$message = ClearRacesPoints();
				}
				break;
				case 'clansilent':
				if($userId == $AdminId[0]){
					SetFieldClan('silent',$bodyx[2],$UserInfo['clan_id']);
					$message = 'Ok!';
				}
				break;
				case 'unbanall':
				Setf();
				break;
				
				
				
			}
			break;
		}
		
	}
	return $message;
}

function GetSizeBot(){
	global $mysqli;
	foreach(glob('*') as $file){
		if(filetype($file) == 'dir'){
			if($file == 'photos'){
				foreach(glob($file.'/*') as $filed){
					$size += filesize($filed);
				}
			}
		}elseif(filetype($file) == 'file'){
			$size += filesize($file);
		}
	}
	$size = $size/1024;
	return round($size,2).'kb';
	
}
function Setf(){
	global $mysqli;
	$data = $mysqli->query("SELECT * FROM `users`");
	while(($row = $data->fetch_assoc()) != false){
		if($row['banned'] == 1){
			SetField('banned',0,$row['id_VK']);
		}
	}
}
//--------------------------------------------------DEVELOPER VK.COM/riconc-------------------------------------------------------------//
?>