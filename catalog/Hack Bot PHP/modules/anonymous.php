<?php
function ManageAnonym($cmd){
	global $UserInfo,$Nick,$body,$bodyx,$bodyxl;
	switch ($cmd) {
		case 'создать':
			$message = CreateAnonymous(substr($body, strlen($bodyx[0].$bodyx[1])+2));
			break;
		case 'выйти':
			$message = LeaveAnonym();
			break;
		case 'приветствие':
			$message = AnonymHello();
			break;
		case 'войти':
			$message = ConnectToAnonym($bodyx[2]);
			break;
		case 'жертва':
			$message = DonateAnonym(KKK($bodyxl[2]));
			break;
		default:
			$message = GetAnonym($UserInfo['anonym']);
			break;
	}
	return $message;
}
function GetAnonym($id = false){
	global $UserInfo,$Nick;
	$id = empty($id) ? $UserInfo['anonym'] : $id;
	$anonym = SelectAnonym($id);
	$dirGame = 'games/knb.txt';
	$timeGame = file_get_contents($dirGame);
	$str = '⏱До конца игр: '.GetBanTime($timeGame).'<br>';
	if($anonym){
		$CountMembers = count(json_decode($anonym['members'],1));
		$message = $Nick.', ваш anonym:<br>'.
		'🆔ID: "'.$anonym['id'].'"<br>'.
		'✏Название: "'.$anonym['name'].'"<br>'.
		'👤Анонимов: '.ConvertValute($CountMembers).'<br>'.
		'💰Общак: '.ConvertValute($anonym['balance']).'$<br>';

	}else{
		$message = GetErrorAnonym();
	}
	return $message;
}
function ConnectToAnonym($id){
	global $UserInfo,$Nick,$mysqli;
	$id = empty($id) ? 0 : $id;
	$data = $mysqli->query('SELECT * FROM `anonymous` WHERE `id`='.$id)->fetch_assoc();
	if($data){
		if(empty($UserInfo['anonym'])){
			$membersAnonym = json_decode($data['members'],1);
			$membersAnonym[$UserInfo['id_VK']] = 'member';
			SetFieldAnonym('members',json_encode($membersAnonym,JSON_UNESCAPED_UNICODE),$data['id']);
			$settingsAnonym = json_decode($data['settings'],1);
			$hello_text = empty($settingsAnonym['hello_text']) ? 'вы присоединились к "'.$data['name'].'"' : $settingsAnonym['hello_text'];
			$text = $Nick.', '.$hello_text;
			$attachment = $settingsAnonym['hello_attachment'];
			$message = '';
			SetFieldF('anonym',$data['id']);
			SellMsg($UserInfo['id_VK'],$text,$attachment);
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
		if($UserInfo['role']<3 || $UserInfo['id_VK'] == $admin){
			if($UserInfo['dollar'] >= $summ){
				SetFieldAnonym('balance',$anonym['balance']+$summ,$anonym['id']);
				SetFieldF('dollar',$UserInfo['dollar']-$summ);
				$message = $Nick.', вы пожертвовали в anonym: '.ConvertValute($summ).'$';
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
			$num = 1;
			break;
		case 'admin':
			$num = 2;
			break;
		case 'developer':
			$num = 3;
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
	return $message;
		
}
function GetErrorAnonym($num = false){
	global $Nick;
	$num = empty($num) ? 1 : $num;
	switch ($num) {
		case '1':
			$message = $Nick.', вы не состоите в anonym.';
			break;
		
		default:
			# code...
			break;
	}
	return $message;
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
function SelectAnonym($id = false){
	global $mysqli,$UserInfo;
	$id = empty($id) ? $UserInfo['anonym'] : $id;
	$id = empty($id) ? 0 : $id;
	$anonym = $mysqli->query('SELECT * FROM `anonymous` WHERE `id`='.$id)->fetch_assoc();
	return $anonym;
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
?>