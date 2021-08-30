<?php
function Bonus(){
	global $UserInfo,$Nick,$admin;
	$time = GetJsonValue('timers','bonus');
	if(CheckTime($time) == 'ok' || $UserInfo['id_VK'] == $admin){
		if(ChanceProzent(10)){
			$Reward = rand(1,5)*rand(1,10);
			$type = 'btc';
			$Reward = AnonymousBonuse($Reward);
			SetFieldF('btc',$UserInfo['btc']+$Reward);
		}elseif(ChanceProzent(5)){
			$Reward = rand(1,5);
			$type = 'bnc';
			$Reward = AnonymousBonuse($Reward);
			AddJsonValue('bnc','bnc',$Reward,'+');
		}elseif(ChanceProzent(10)){
			$Reward = rand(1,15);
			$type = 'rating';
			$Reward = AnonymousBonuse($Reward);
			SetFieldF('rating',$UserInfo['rating']+$Reward);
		}else{
			$Reward = rand(1,5)*rand(1,10)*KKK('1k');
			$type = 'dollar';
			$Reward = AnonymousBonuse($Reward);
			SetFieldF('dollar',$UserInfo['dollar']+$Reward);
		}
		$message = $Nick.', вы выиграли: '.ConvertValute($Reward).SwitchEmoji($type);
		AddJsonValue('timers','bonus',time()+86400);
	}else{
		$message = $Nick.', подождите: '.CheckTime($time);
	}
	return $message;
}
function AnonymousBonuse($summ){
	global $UserInfo;
	if(!empty($UserInfo['anonym'])){
		$anonym = SelectAnonym();
		$aBonuses = json_decode($anonym['bonuses'],1);
		$anonymProzent = $aBonuses['every_day_bonus_prozent']/100;
	}else{
		$anonymProzent = 0;
	}
	$summ = $summ+($summ*$anonymProzent);
	return floor($summ);
}