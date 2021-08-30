<?php
function ManageAnonym($cmd){
	global $UserInfo,$Nick,$body,$bodyx,$bodyxl;
	$body3 = substr($body, strlen($bodyx[0].$bodyx[1])+2);
	switch ($cmd) {
		case 'создать':
			$message = CreateAnonymous($body3);
			break;
		case 'выйти':
		case 'покинуть':
			$message = LeaveAnonym();
			break;
		case 'приветствие':
			$message = AnonymHello();
			break;
		case 'войти':
		case 'вступить':
			$message = ConnectToAnonym($bodyx[2]);
			break;
		case 'жертва':
		case 'донат':
			$message = DonateAnonym(KKK($bodyxl[2]));
			break;
		case 'мем':
		case 'уч':
		case 'участники':
			$message = GetMembersAnonym($bodyxl[2]);
			break;
		case 'вирус':
		case 'virus':
			if(empty($bodyxl[2])){
				$message = GetAnonymVirus();
			}else{
				$message = SetNameVirusAnonym($body3);
			}
			break;	
		case 'настройки':
		case 'нстр':
			$message = GetSettingsAnonym();
			break;
		case 'чс':
			$user_id = FastUserId('role');
			$message = AddPlayerToBlAnonym($user_id);
			break;
		case 'дечс':
			$user_id = FastUserId('role');
			$message = DeletePlayerToBlAnonym($user_id);
			break;
		case 'чска':
			$message = GetBlackListAnonym($bodyxl[2]);
			break;
		case 'роль':
		case 'привелегия':
		case 'р':
			$Fwd = CheckFwd();
			$user_id = $Fwd ? FastUserId() : $bodyxl[2];
			$user_id =  GetId($user_id);
			$val = $Fwd ? $bodyxl[2] : $bodyxl[3];
			$message = SetRoleAnonym($user_id,$val);
			break;
		case 'exec':
		case 'ехес':
			$message = SellRewardAnonym();
			break;
		case 'up':
		case 'ап':
		case 'бонус':
		case 'бонусы':
		case 'апгрейды':
			$message = BuyUpgradeAnonym($bodyxl[2]);
			break;
		case 'minf':
		case 'минф':
			$message = SetMinimalFanonym(KKK($bodyxl[2]));
			break;
		case 'место':
			$message = AddPlacesAnonym();
			break;
		default:
			$message = GetAnonym($UserInfo['anonym']);
			break;
	}
	return $message;
}

function HelpCmdAnonym(){
	global $Nick;
	$message = $Nick.', список команд anonym:<br>'.
	'
	📔Аноним - информация о вашем anonym
	📓Аноним чска - черный список anonym
	➕Аноним создать [название]
	🕷Аноним exec - активировать вирус
	👤Аноним роль [ссылка/смс] [+/-]
	❌Аноним выйти
	⚙Аноним настройки
	🎁Аноним бонусы
	🚪Аноним место - +1 место в anonym
	🖥Аноним минф [число] - установить минимальное количество F для вступления
	⛔Аноним чс [смс/ид вконтакте]
	👤Аноним приветствие [текст+аудио]
	♿Аноним войти [id]
	💰Аноним жертва [сумма]
	👥Аноним мем [../страница]
	🐞Аноним вирус [../название]
	';
	return $message;
}
function GetAnonym($id = false){
	global $UserInfo,$Nick,$peer_id;
	$id = empty($id) ? $UserInfo['anonym'] : $id;
	$anonym = SelectAnonym($id);
	if($anonym){
		$CountMembers = count(json_decode($anonym['members'],1));
		$message = $Nick.', ваш anonym:<br>'.
		'🆔ID: "'.$anonym['id'].'"<br>'.
		'🔥Уровень: "'.$anonym['lvl'].'"<br>'.
		'✏Название: "'.$anonym['name'].'"<br>'.
		'👤Анонимов: '.ConvertValute($CountMembers).'/'.$anonym['max_members'].'<br>'.
		'💰Общак: '.ConvertValute($anonym['balance']).'$<br>';
		//$dirImg = 'modules/anonymous/viruses/'.$anonym['lvl'].'.PNG';
		//$attachment = PostPhoto($UserInfo['id_VK'],$dirImg);
		
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function GetSettingsAnonym(){
	global $UserInfo,$Nick,$peer_id;
	$anonym = SelectAnonym();
	if($anonym){
		$aSettings = json_decode($anonym['settings'],1);
		
		$attachment = !empty($aSettings['hello_attachment']) ? $aSettings['hello_attachment'] : false;
		
		$attachment_text = $attachment == false ? 'Нету' : 'Есть';
		
		$virusName = empty($aSettings['virus_name']) ? 'Virus'.rand(1,100) : $aSettings['virus_name'];

		$hello_text = !empty($aSettings['hello_text']) ? $aSettings['hello_text'] : 'undefined';
		
		$message = $Nick.', настройки вашего anonym:<br>'.
		'📨Текст приветствия: "'.$hello_text.'"<br>'.
		'📯Аудио-файл: '.$attachment_text.'<br>'.
		'🐞Вирус: "'.$virusName.'"<br>'.
		'🖥Минимальное кол-во F для вступления: '.ConvertValute($aSettings['min_f_to_join']).'F<br>';
		SellMsg($peer_id,$message,$attachment);
		return;
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function AddPlacesAnonym(){
	global $UserInfo,$Nick,$admin;
	$anonym = SelectAnonym();
	$price = 2;
	if($anonym){
		if($UserInfo['role'] <=2 || $UserInfo['id_VK'] == $admin){
			if($UserInfo['donate_balance'] >= $price){
				SetFieldF('donate_balance',$UserInfo['donate_balance']-$price);
				SetFieldAnonym('max_members',$anonym['max_members']+1,$anonym['id']);
				$message = $Nick.', +1 место в вашем anonym.';
			}else{
				$message = $Nick.', стоимость добавления места: '.$price.SwitchEmoji('donate_balance');
			}
		}else{
			$message = $Nick.', вы не можете добавлять места в anonym.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function SetMinimalFanonym($val){
	global $UserInfo,$Nick,$admin;
	$anonym = SelectAnonym();
	if($anonym){
		$aSettings = json_decode($anonym['settings'],1);
		$role = GetMyRoleAnonym();
		if($role >=2){
			if(($val >0 && $val < 120)|| $UserInfo['id_VK'] == $admin){
				$aSettings['min_f_to_join'] = $val;
				SetFieldAnonym('settings',json_encode($aSettings,JSON_UNESCAPED_UNICODE),$anonym['id']);
				$message = $Nick.', вы установили минимальное значение 🖥F('.ConvertValute($val).')🖥 для вступления в anonym.';
			}else{
				$message = $Nick.', неверное значение.';
			}
		}else{
			$message = $Nick.', ваш статус недостаточно высок чтобы изменять настройки anonym.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function BuyUpgradeAnonym($id = false){
	global $UserInfo,$Nick;
	$anonym = SelectAnonym();
	if($anonym){
		if(empty($anonym['bonuses'])){
			SetFieldAnonym('bonuses',DefaultBonusesAnonym(),$anonym['id']);
			$anonym = SelectAnonym();
		}
		$aBonuses = json_decode($anonym['bonuses'],1);
		$role = GetMyRoleAnonym();
		if(!empty($id)){
			if($role >=2){
				$bonuse = GetUpgradeBonuseAnonym($id,$anonym['lvl']);
				if($bonuse){
					if($anonym['balance'] >= $bonuse['price']){
						if($aBonuses[$bonuse['abbr']] + 5 <= $bonuse['max_value']){

							$aBonuseLvl = $aBonuses[$bonuse['abbr']]/5;
							$price = $bonuse['price']*$aBonuseLvl; // price bonuse 

							$aBonuses[$bonuse['abbr']] += 5;// +step bonuse
							
							SetFieldAnonym('balance',$anonym['balance']-$price,$anonym['id']);// minus balance
							SetFieldAnonym('bonuses',json_encode($aBonuses),$anonym['id']); // set bonuses
							$message = $Nick.', вы успешно улучшили бонус: "'.$bonuse['name'].'" за '.ConvertValute($price).'$';
						}else{
							$message = $Nick.', уровень данного бонуса максимален.';
						}
					}else{
						$message = $Nick.', недостаточно $ на балансе anonym.';
					}
				}else{
					$message = $Nick.', неверный номер.';
				}
			}else{
				$message = $Nick.', ваш статус недостаточно высок чтобы улучшать бонусы anonym.';
			}
		}else{
			$i = 1;
			$bonuse = GetUpgradeBonuseAnonym($i,$anonym['lvl']);
			while ($bonuse != false) {
				$aBonuseProzent = $aBonuses[$bonuse['abbr']];
				$aBonuseLvl = $aBonuseProzent/5;
				$price = $bonuse['price']*$aBonuseLvl;
				$message .= ConvertNumEmoji($i).'.'.$bonuse['name'].' '.$aBonuseProzent.'% ('.ConvertValute($price).'$)<br>';
				$i++;
				$bonuse = GetUpgradeBonuseAnonym($i,$anonym['lvl']);
			}
			$message .= '🔔Для улучшения бонуса напишите "аноним бонусы [номер]"';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
	
}
function SetRoleAnonym($user_id,$val){
	global $UserInfo,$Nick;
	$anonym = SelectAnonym();
	if($anonym){
		$role = GetMyRoleAnonym();
		$User = selectFromIDVK($user_id);
		if($User){
			if($User['id_VK'] != $UserInfo['id_VK']){
				$members = json_decode($anonym['members'],1);
				if(!empty($members[$User['id_VK']])){
					if($role == 3){
						$roleUser = SwitchRolesAnonym($members[$User['id_VK']]);// member admin developer...
						if($val == '+'){
							if($roleUser == 1){
								$roleUser = 2;
								$members[$User['id_VK']] = SwitchRolesAnonym($roleUser,'role');// строковое значение
								SetFieldAnonym('members',json_encode($members,JSON_UNESCAPED_UNICODE),$anonym['id']);
								$message = $Nick.', вы установили роль игрока "'.$User['name'].'" '.$members[$User['id_VK']].' в своем anonym.';
							}else{
								$message = $Nick.', ошибка: вы не можете увеличить роль игрока выше админа.';
							}
						}elseif($val == '-'){
							if($roleUser != 2){
								$roleUser = 1;
								$members[$User['id_VK']] = SwitchRolesAnonym($roleUser,'role');// строковое значение	
								SetFieldAnonym('members',json_encode($members,JSON_UNESCAPED_UNICODE),$anonym['id']);
								$message = $Nick.', вы установили роль игрока "'.$User['name'].'" '.$members[$User['id_VK']].' в своем anonym.';
							}else{
								$message = $Nick.', ошибка: вы не можете уменьшить роль игрока ниже игрока.';
							}
						}else{
							$message = $Nick.', допустимые параметры +/-';
						}
					}else{
						$message = $Nick.', ваш статус недостаточно высок чтобы менять роли игроков anonym.';
					}
				}else{
					$message = $Nick.', игрока нет в вашем anonym.';
				}
			}else{
				$message = $Nick.', вы не можете менять свою роль.';
			}
		}else{
			$message = $Nick.', игрок не найден, напишите корректную ссылку на профиль.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function GetAnonymVirus(){
	global $UserInfo,$Nick,$peer_id;
	$anonym = SelectAnonym();
	if($anonym){
		$aSettings = json_decode($anonym['settings'],1);
		$virusName = empty($aSettings['virus_name']) ? 'Virus'.rand(1,100) : $aSettings['virus_name'];
		$dirImg = 'modules/anonymous/viruses/'.$anonym['lvl'].'.PNG';
		$attachment = PostPhoto($UserInfo['id_VK'],$dirImg);
		$message = $Nick.', вирус вашего anonym:<br>'.
		'✏Название: '.$virusName.'<br>'.
		SwitchEmoji('plus').'Прибыль: '.ConvertValute(GetIncomeVirus()).SwitchEmoji('btc');
		SellMsg($peer_id,$message,$attachment);
		return;
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function GetIncomeVirus(){
	$anonym = SelectAnonym();
	$aSettings = json_decode($anonym['settings'],1);
	$VirusIncome = $anonym['lvl']*100*('1.'.rand(0,99));
	return $VirusIncome;
}
function SellRewardAnonym(){
	global $UserInfo,$Nick;
	$anonym = SelectAnonym();
	$aSettings = json_decode($anonym['settings'],1);
	$time_sell_reward = $aSettings['time_sell_reward'];
	if($anonym){
		if(GetBanTime($time_sell_reward) == 'ok'){
			$members = json_decode($anonym['members'],1);
			$countMembers = count($members);
				if($countMembers>=3){
				$VirusIncome = GetIncomeVirus();
				$Reward = floor($VirusIncome/$countMembers);
				for($i=0;$i<$countMembers;$i++){
					$key = key($members);
					$User = selectFromIDVK($key);
					SetField('btc',$User['btc']+$Reward,$User['id_VK']);
					next($members);
				}
				$aSettings['time_sell_reward'] = time()+GetBanTimes('3d');
				SetFieldAnonym('settings',json_encode($aSettings,JSON_UNESCAPED_UNICODE),$anonym['id']);
				$message = $Nick.', всем участникам anonym выдано по '.ConvertValute($Reward).SwitchEmoji('btc');
			}else{
				$message = $Nick.', в anonym должно быть минимум 3 участника.';
			}
		}else{
			$message = $Nick.', подождите: '.GetBanTime($time_sell_reward);
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}

function GetMembersAnonym($offset = false){
	global $UserInfo,$Nick;
	$anonym = SelectAnonym();
	$offset = !empty($offset) ? ($offset-1)*10 : 0;
	if($anonym){
		$members = json_decode($anonym['members'],1);
		$countMembers = count($members);
		$message = $Nick.', member list:<br>';
		if($countMembers >= $offset){
			for($i=$offset;$i<$countMembers;$i++){
				$key = key($members);
				$User = selectFromIDVK($key);
				if(!$User){
					AddPlayerToBlAnonym($key,1);
					continue;
				}
				$message .= ConvertNumEmoji($i+1).'.[id'.$User['id_VK'].'|'.$User['name'].'] - Роль:'.ConvertNumEmoji(SwitchRolesAnonym($members[$key])).'<br>';
				next($members);
			}
		}else{
			$message = $Nick.', неверная страница.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function GetBlackListAnonym($offset = false){
	global $UserInfo,$Nick;
	$anonym = SelectAnonym();
	$offset = !empty($offset) ? ($offset-1)*10 : 0;
	if($anonym){
		$members = json_decode($anonym['black_list'],1);
		$countMembers = count($members);
		if($countMembers>0){
			$message = $Nick.', black list:<br>';
			if($countMembers >= $offset){
				for($i=$offset;$i<$countMembers;$i++){
					$User = selectFromIDVK($members[$i]);
					$message .= ($i+1).'.[id'.$User['id_VK'].'|'.$User['name'].']<br>';
				}
			}else{
				$message = $Nick.', неверная страница.';
			}
		}else{
			$message = $Nick.', черный список вашего anonym пуст.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}

function DeletePlayerToBlAnonym($user_id){
	global $UserInfo,$Nick;
	$anonym = SelectAnonym();
	if($anonym){
		$role = GetMyRoleAnonym();
		if($role>=2){
			$aBlackList = json_decode($anonym['black_list'],1);
			$aBlackList = empty($aBlackList) ? array() : $aBlackList;
			$AnonymMembers = json_decode($anonym['members'],1);
			$User = selectFromIDVK($user_id);
			if($User){
				if(in_array($User['id_VK'], $aBlackList)){	
					$key  = array_search($User['id_VK'], $aBlackList);
					unset($aBlackList[$key]);
					SetFieldAnonym('black_list',json_encode($aBlackList,JSON_UNESCAPED_UNICODE),$anonym['id']);
					$message = $Nick.', вы успешно удалили игрока "'.$User['name'].'" из черного списка.';
				}else{
					$message = $Nick.', игрока нет в черном списке.';
				}
					
			}else{
				$message = $Nick.', игрок не найден, напишите корректную ссылку на профиль.';
			}
				
				
		}else{
			$message = $Nick.', у вас нет прав на исполнение данной команды.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function AddPlayerToBlAnonym($user_id,$isSystem = false){
	global $UserInfo,$Nick;
	$anonym = SelectAnonym();
	if($anonym ){
		$role = GetMyRoleAnonym();
		if($role>=2 || !empty($isSystem)){
			$aBlackList = json_decode($anonym['black_list'],1);
			$aBlackList = empty($aBlackList) ? array() : $aBlackList;

			$AnonymMembers = json_decode($anonym['members'],1);

			$User = selectFromIDVK($user_id);
			if($User || !empty($isSystem)){
				if($UserInfo['id_VK'] != $User['id_VK']){
					if(!in_array($User['id_VK'],$aBlackList)){
						if(!empty($AnonymMembers[$user_id])){
							unset($AnonymMembers[$user_id]);
							SetFieldAnonym('members',json_encode($AnonymMembers,JSON_UNESCAPED_UNICODE),$anonym['id']);
						}
						if(empty($isSystem)){
							array_push($aBlackList, $User['id_VK']);
							SetFieldAnonym('black_list',json_encode($aBlackList,JSON_UNESCAPED_UNICODE),$anonym['id']);
						}
					}else{
						return $Nick.', игрок уже в черном списке.';
					}
					
					if($User['anonym'] == $anonym['id']){
						SetField('anonym',0,$User['id_VK']);
					}
					$message = $Nick.', вы успешно добавили игрока "[id'.$User['id_VK'].'|'.$User['name'].']" в черный список anonym.';
				}else{
					$message = $Nick.', вы не можете добавить в чс себя.';
				}
			}else{
				$message = $Nick.', игрок не найден, напишите корректную ссылку на профиль.';
			}
		}else{
			$message = $Nick.', у вас нет прав на исполнение данной команды.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function SetNameVirusAnonym($str){
	global $UserInfo,$Nick;
	$max_lenght = 18;
	$anonym = SelectAnonym();
	$role = GetMyRoleAnonym();
	if($anonym){
		if($role >= 2){
			if(iconv_strlen($str) <= $max_lenght){	
				if(CheckStrAnonum($str)){
					if($anonym){
						$aSettings = json_decode($anonym['settings'],1);
						$aSettings['virus_name'] = $str;
						SetFieldAnonym('settings',json_encode($aSettings,JSON_UNESCAPED_UNICODE),$anonym['id']);
						$message = $Nick.', теперь вирус вашего anonym "'.$str.'"';
					}else{
						$message = GetErrorAnonym();
					}
				}else{
					$message = $Nick.', вы используете запрещенные символы.';
				}
			}else{
				$message = $Nick.', название вируса слишком длинное.';
			}
		}else{
			$message = $Nick.', вы не можете менять имя вируса с вашей привелегией anonym.';
		}
	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function ConnectToAnonym($id){
	global $UserInfo,$Nick,$mysqli,$peer_id;
	$id = empty($id) ? 0 : $id;
	$anonym = $mysqli->query('SELECT * FROM `anonymous` WHERE `id`='.$id)->fetch_assoc();
	if($anonym){
		if(empty($UserInfo['anonym'])){
			$aBlackList = json_decode($anonym['black_list'],1);
			if(in_array($UserInfo['id_VK'], $aBlackList)){
				return $Nick.', вы занесены в черный список данного anonym.';
			}
			$aSettings = json_decode($anonym['settings'],1);
			$summ_f_machine = SummMachine();// summ f user
			if($summ_f_machine >= $aSettings['min_f_to_join']){
				$membersAnonym = json_decode($anonym['members'],1); // array members
				if(count($membersAnonym)+1 <= $anonym['max_members']){

					$membersAnonym[$UserInfo['id_VK']] = 'member'; // set role user to anonym

					SetFieldAnonym('members',json_encode($membersAnonym,JSON_UNESCAPED_UNICODE),$anonym['id']); // set value
					
					$hello_text = empty($aSettings['hello_text']) ? 'вы присоединились к "'.$anonym['name'].'"' : $aSettings['hello_text'];
					$text = $Nick.', '.$hello_text;
					$attachment = $aSettings['hello_attachment'];
					$message = '';
					SetFieldF('anonym',$anonym['id']);
					SellMsg($peer_id,$text,$attachment);
				}else{
					$message = $Nick.', данный anonym заполнен.';
				}
			}else{
				$message = $Nick.', для вступления в данный anonym требуется 🖥'.$aSettings['min_f_to_join'].'🖥';
			}
		}else{
			$message = $Nick.', сначала выйдите из своего anonym.';
		}
	}else{
		$message = $Nick.', anonym с таким id не найдено.';
	}
	return $message;
}
function DonateAnonym($summ){
	global $UserInfo,$Nick,$admin;
	$summ = $summ<1 ? 1 :$summ;
	$anonym = SelectAnonym();
	if($anonym){
		if($UserInfo['role']<=2 || $UserInfo['id_VK'] == $admin){
			if($UserInfo['dollar'] >= $summ){
				$aSettings = json_decode($anonym['settings'],1);
				$aSettings['donate']+=$summ;
				if($aSettings['donate']>=$anonym['lvl']*KKK('50kkk')*rand(1,5) && $anonym['lvl'] != 19){
					SetFieldAnonym('lvl',$anonym['lvl']+1,$anonym['id']);
					$aSettings['donate'] = 0;
					$newLVL = true;
				}
				SetFieldAnonym('settings',json_encode($aSettings,JSON_UNESCAPED_UNICODE),$anonym['id']);
				SetFieldAnonym('balance',$anonym['balance']+$summ,$anonym['id']);
				SetFieldF('dollar',$UserInfo['dollar']-$summ);
				$message = $Nick.', вы пожертвовали в anonym: '.ConvertValute($summ).'$<br>';
				if($newLVL){
					$message .= 'Ваш anonym обрел новый уровень, вирус улучшен.';
				}
			}else{
				$message = $Nick.', недостаточно $.';
			}
		}else{
			$message = $Nick.', вы не можете донатить в anonym.';
		}
	}else{
		$message = GetErrorAnonym(1);
	}
	return $message;
}
function CreateAnonymous($name){
	global $UserInfo,$Nick,$mysqli;
	$Price = 5;
	$TypePrice = 'donate_balance';
	if(empty($UserInfo['anonym'])){
		if($UserInfo[$TypePrice] >= $Price){
			if(CheckNameAnonymous($name) == 'ok'){
				$members = array($UserInfo['id_VK']=>'developer');
				$members = json_encode($members,JSON_UNESCAPED_UNICODE);
				
				 $mysqli->query('INSERT INTO `anonymous` 
					(`name`,`members`) 
					VALUES 
					("'.$name.'",\' '.$members.'\')');
				 $id = $mysqli->query('SELECT LAST_INSERT_ID()')->fetch_assoc()['LAST_INSERT_ID()'];
				SetFieldF($TypePrice,$UserInfo[$TypePrice]-$Price);
				SetFieldF('anonym',$id);
				$message = $Nick.', вы создали anonym "'.$name.'"';
			}else{
				$message =  $Nick.', '.CheckNameAnonymous($name);
			}
		}else{
			$message = $Nick.', недостаточно '.SwitchEmoji($TypePrice).' для создания anonym.<br>'.
			'Цена: '.ConvertValute($Price).SwitchEmoji($TypePrice);
		}
	}else{
		CheckAnonym();
		
	}
	return $message;
}
function SwitchRolesAnonym($role,$type = false){
	$type = empty($type) ? 'num' : $type;
	switch ($role) {
		case 'member':
		case '1':
			$num = 1;
			$role = 'member';
			break;
		case 'admin':
		case '2':
			$num = 2;
			$role = 'admin';
			break;
		case 'developer':
		case '3':
			$num = 3;
			$role = 'developer';
			break;
		
		default:
			return false;
			break;
	}
	return $$type;
}
function GetMyRoleAnonym(){
	global $UserInfo;
	$anonym = SelectAnonym($UserInfo['anonym']);
	$AnonymMembers = json_decode($anonym['members'],1);
	return SwitchRolesAnonym($AnonymMembers[$UserInfo['id_VK']]);
}
function AnonymHello(){
	global $data,$UserInfo,$Nick,$body,$bodyx;
	$role = GetMyRoleAnonym();
	$attachments = $data->object->attachments[0];
	$anonym = SelectAnonym();
	$text = substr($body, strlen($bodyx[0].$bodyx[1])+2);

	if(CheckStrAnonum($text)){
		if($role >= 2){
			if(iconv_strlen($text)<50){
				if($anonym){
					if(!empty($attachments)){
						$type = $attachments->type;
						if($type == 'audio'){
							$id = $attachments->$type->id;
							$owner_id = $attachments->$type->owner_id;
							$attachment = $type.$owner_id.'_'.$id;
							if(!empty($id)){
								$settingsAnonym = json_decode($anonym['settings'],1);
								$settingsAnonym['hello_attachment'] = $attachment;
								$settingsAnonym['hello_text'] = $text;
								SetFieldAnonym('settings',json_encode($settingsAnonym,JSON_UNESCAPED_UNICODE),$anonym['id']);
								$message = $Nick.', вы установили приветствие для своего anonym.';
							}else{
								$message = $Nick.', невозможно установить приветствие.<br>Попробуйте другой аудио-файл.';
							}
						}else{

						}
					}else{
						$message = $Nick.', прикрепите аудио файл.';
					}
				}else{
					$message = GetErrorAnonym();
				}
			}else{
				$message = $Nick.', слишком большой текст.';
			}
		}else{
			$message = $Nick.', ваш статус недостаточно высок чтобы менять приветствие anonym.';
		}
	}else{
		$message = $Nick.', вы используете запрещенные символы.';
	}
	return $message;
		
}
function GetErrorAnonym($num = false){
	global $Nick;
	$num = empty($num) ? 1 : $num;
	switch ($num) {
		case '1':
			$message = $Nick.', вы не состоите в anonym.<br>Напишите "аноним помощь", чтобы узнать подробнее о командах.';
			break;
		
		default:
			# code...
			break;
	}
	return $message;
}
function CheckStrAnonum($str){
	$BlackArr = array ('.','[',']','(',')','|','@');
	str_replace($BlackArr, '', $str,$count);
	if($count == 0){
		return true;
	}
	return false;
}
function CheckAnonym(){
	global $mysqli,$UserInfo,$Nick;
	$anonym = $mysqli->query('SELECT * FROM `anonymous` WHERE `id`='.$UserInfo['anonym'])->fetch_assoc();
	if(!$anonym){
		SetFieldF('anonym',0);
		SellMsg($UserInfo['id_VK'],$Nick.', глава распустил anonym, теперь вы можете вступить в другой anonym.');
	}else{
		SellMsg($UserInfo['id_VK'],$Nick.', сначала выйдите из своего anonym.');
	}

}
function LeaveAnonym(){
	global $mysqli,$UserInfo,$Nick;
	if(!empty($UserInfo['anonym'])){
		$anonym = SelectAnonym($UserInfo['anonym']);
		
		$AnonymMembers = json_decode($anonym['members'],1);
		if($AnonymMembers[$UserInfo['id_VK']] != 'developer'){
			unset($AnonymMembers[$UserInfo['id_VK']]);
			SetFieldAnonym('members',json_encode($AnonymMembers,JSON_UNESCAPED_UNICODE),$anonym['id']);
			SetFieldF('anonym',0);
			$message = $Nick.', вы вышли из anonym "'.$anonym['name'].'"';
		}else{
			SetFieldF('anonym',0);
			$mysqli->query('DELETE FROM `anonymous` WHERE `id`='.$anonym['id']);
			$mysqli->query('UPDATE `users` SET `anonym`=NULL WHERE `users`.`anonym`='.$anonym['id']);
			$message = $Nick.', вы распустили свой anonym.';
		}
	}else{
		$message = $Nick.', вы не состоите в anonym.';
	}
	return $message;
}
function SetFieldAnonym($field,$value,$id){
	global $mysqli,$UserInfo;
	if($value == null){
		$mysqli->query('UPDATE `anonymous` SET `'.$field.'`= NULL WHERE `id`='.$id);
	}else{
		$mysqli->query ('UPDATE `anonymous` SET `'.$field.'` = \''.$value.'\' WHERE `id`='.$id);
	}
	
}

function CheckNameAnonymous($name){
	$BlackArr = array ('.','[',']','(',')','|','@');
	str_replace($BlackArr, '', $name,$count);
	if($count == 0){
		if(iconv_strlen($name) <= 20){
			if(iconv_strlen($name) > 5){
				return 'ok';
			}else{
				return 'название слишком короткое.';
			}
		}else{
			return 'название слишком длинное.';
		}
	}else{
		return 'в названии присутствуют лишние символы.';
	}
}
function GetUpgradeBonuseAnonym($id,$anonym_lvl){
	switch ($id) {
		case '1':
		case 'property_price_prozent':
			$price = KKK('1kkk');
			$name = 'Скидка на имущество';
			$abbr = 'property_price_prozent';
			$max_value = 30;
			break;
		case '2':
		case 'every_day_bonus_prozent':
			$price = KKK('2kkk');
			$name = 'Процент ежедневного бонуса';
			$abbr = 'every_day_bonus_prozent';
			$max_value = 75;
			break;
		case '3':
		case 'time_grab_prozent':
			$price = KKK('3kkk');
			$name = 'Процент времени хакинга';
			$abbr = 'time_grab_prozent';
			$max_value = 100;
			break;
		default:
			return false;
			break;
	}
	$price = $price*$anonym_lvl;
	return [
		'price'=>$price,
		'name'=>$name,
		'abbr'=>$abbr,
		'max_value'=>$max_value
		];
}
function DefaultBonusesAnonym(){
	$arr = [
		'property_price_prozent'=>5,
		'every_day_bonus_prozent'=>5,
		'time_grab_prozent'=>5,
		];
	return json_encode($arr,JSON_UNESCAPED_UNICODE);
}
?>