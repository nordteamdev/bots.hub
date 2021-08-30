<?php
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
function TestKbd(){
	global $kbd;
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
	$kbd = json_encode($a,JSON_UNESCAPED_UNICODE);
}
function CreateKeyboard($buttons){
	global $UserInfo;
	$countButtons = count($buttons);
	if($countButtons == 0){
		return $UserInfo['keyb'];
	}
	$keyboard = 
	[
		'one_time'=>false,
		'buttons'=>[
			
		]
	];
	$fourBtn = floor($countButtons/4);
	$i = 0;
	$j = 0;
	while(!empty($buttons)){
		$colorBtn = RandColor();
		$keyboard['buttons'][$j] = empty($keyboard['buttons'][$j]) ? array() : $keyboard['buttons'][$j];

		array_push($keyboard['buttons'][$j],GetBtn($buttons[$i],$colorBtn));

		unset($buttons[$i]);
		
		$i++;
		if($i%4 == 0){
			$j++;
		}

		
	}
	return json_encode($keyboard,JSON_UNESCAPED_UNICODE);

}
function ClearKbd(){
	
	$a = array(
		'one_time' => false,
		'buttons' => 
			array(
				array(
				GetBtn("Команды",RandColor()),
				GetBtn("Ферма",RandColor()),
				GetBtn("Бонус",RandColor()),
				GetBtn("Очистить кнопки",RandColor()),
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
					GetBtn("Бонус",$color1),		
					GetBtn("Ферма",$color2),
					GetBtn("Помощь",$color3),			
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
?>