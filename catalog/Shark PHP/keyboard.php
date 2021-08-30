<?php
//--------------------------------------------------DEVELOPER VK.COM/taipancool-------------------------------------------------------------//
function RandColor(){
	$arr = array("primary","negative","positive");
	return $arr[rand(0,count($arr)-1)];
}
function CheckKbd(){
	global $UserInfo;
	if(empty($UserInfo['keyb'])){
		$a = array(
		'one_time' => false,
		'buttons' => 
			array(
				array(
				GetBtn("Команды",RandColor()),
				GetBtn("Очистить кнопки",RandColor())
				)
				
			)
		);
	SetFieldF('keyb',json_encode($a,JSON_UNESCAPED_UNICODE));
	}
}
function ClearKbd(){
	
	$a = array(
		'one_time' => false,
		'buttons' => 
			array(
				array(
				GetBtn("Команды",RandColor()),
				GetBtn("Очистить кнопки",RandColor())
				)
				
			)
		);
	SetFieldF('keyb',json_encode($a,JSON_UNESCAPED_UNICODE));
}
function AddButtonToKbd($kbd,$button){
	$kbd = json_decode($kbd,1);
	if(empty($kbd)){
		$a = array(
		'one_time' => false,
		'buttons' => 
			array(
				array(
				GetBtn("Команды",RandColor()),
				GetBtn("Очистить кнопки",RandColor())
				)
				
			)
		);
	}else{
		$a = $kbd;
	}
	$ButtonsCount = count($a['buttons']);
	if($ButtonsCount+1<=10){
		if(count($a['buttons'][$ButtonsCount-1]) < 4){
			array_push($a['buttons'][$ButtonsCount-1],GetBtn($button,RandColor()));
		}else{
			array_push($a['buttons'],array(GetBtn($button,RandColor())));
		}
	}else{
		SetFieldF('keyb',null);
	}
	SetFieldF('keyb',json_encode($a,JSON_UNESCAPED_UNICODE));
	
	
}

function CloseKeyboard(){
	$kbd =  [
		'one_time' => false,
		'buttons' => []
		]; 
	return json_encode($kbd,JSON_UNESCAPED_UNICODE);
}
function KbdConference(){ 
	$color1 = "positive";
	$color2 = "negative";
	$color3 = "primary";
	$color4 = "default";
	$kbd = [
		'one_time' => false,
		'buttons' => [
				[
					GetBtn("Команды",$color1),		
					GetBtn("Инфо",$color1),
					GetBtn("Задания",$color1),		
					GetBtn("Лайк ",$color1),		
				],[
					GetBtn("Тпс",$color2),				
					GetBtn("Ферма",$color2),				
					GetBtn("Бизнес снять",$color2),		
				],[
					GetBtn("Продать тайпанкоины",$color3),		
					GetBtn("Продать биткоины",$color3),		
					GetBtn("Бизнес",$color3),		
					GetBtn("Уволиться",$color3),			
				],[
					GetBtn("Клан гонка",$color4),		
					GetBtn("Кланы",$color4),	
					GetBtn("Бизнес улучшить",$color4),		
					GetBtn("Топ",$color4),		
				],[
					GetBtn("Курс",$color2),		
					GetBtn("Бонус",$color2),		
					GetBtn("Deniz_mm",$color2),		
						
				],[
					GetBtn("Магазин",$color4),			
					GetBtn("Name",$color4),		
				]
			]
		]; 
	return json_encode($kbd,JSON_UNESCAPED_UNICODE);
}

function GetBtn($label,$color = false){
	if ($color == false){$color = "default";}
		return [
					'action' => [
						 "type" => "text", 
						  "label" => $label 
					],
					'color' => $color
				];	
} 
//--------------------------------------------------DEVELOPER VK.COM/taipancool-------------------------------------------------------------//
?>