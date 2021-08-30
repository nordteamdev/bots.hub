<?php

function AddPersonalCard(){
	global $UserInfo;
	$ProfileInfo = UsersGetLang($UserInfo['id_VK'],'en');
	$fontSize = 23;
	$dir = 'modules/personal_card/';
	$PrivelegeName = SwitchRole($UserInfo['role']);
	$PRIVELEGE = true;
	$img = $dir."images/".$PrivelegeName.".jpg";
	$pic = ImageCreateFromjpeg($img);
	if($pic){
		$color=ImageColorAllocate($pic, 255, 255, 255); 
		putenv('GDFONTPATH=' . realpath('.'));
		$font =  $dir.'fonts/font-hack';
		$UserName = $ProfileInfo['first_name'].' '.$ProfileInfo['last_name'];
		$fileName = $dir.'images/id'.$UserInfo['id_VK'].".jpg";
		ImageTTFtext($pic, $fontSize, 0, 265, 38, $color, $font, $UserInfo['id']);
		ImageTTFtext($pic, $fontSize, 0, 330, 98, $color, $font, $UserName);// first name
		ImageTTFtext($pic, $fontSize-5, 0, 470, 176, $color, $font, $UserInfo['date_reg']);// date registration
		$fontSize-=8;
		ImageTTFtext($pic, $fontSize, 0, 360, 139, $color, $font, mb_strtoupper($PrivelegeName));	
		Imagejpeg($pic,$fileName); 
		ImageDestroy($pic); 
		return $fileName;
	}else{
		return 'error';
	}

	

}

?>