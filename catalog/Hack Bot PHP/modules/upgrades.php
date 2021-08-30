<?php
function SwitchRusToEnComplect($str){
	switch ($str) {
		case '1':
			$en = 'CPU';
			break;
		case '2':
			$en = 'RAM';
			break;
		case '3':
			$en = 'VC';
			break;
		case '4':
			$en = 'internet';
			break;
		case '5':
			$en = 'spy';
			break;
		case '6':
			$en = 'antivirus';
			break;
		
		default:
			return false;
			break;
	}
	return $en;
}

function GetMyUpgradesComp($str = false,$user_id = false){
	global $UserInfo,$Nick;
	$UserInfo = empty($user_id) ? $UserInfo : selectFromIDVK($user_id);
	$hello = empty($user_id) ?  $Nick.',ваша хак-машина:<br>' : 'Хак-машина игрока "'.$UserInfo['name'].'"<br>';
	if(empty($str)){
		$message = $hello.
		'1.CPU - '.GetNamesComplect('CPU',$UserInfo['CPU']).'(L'.$UserInfo['CPU'].')<br>'.
		'2.RAM - '.GetNamesComplect('RAM',$UserInfo['RAM']).'(L'.$UserInfo['RAM'].')<br>'.
		'3.VC - '.GetNamesComplect('VC',$UserInfo['VC']).'(L'.$UserInfo['VC'].')<br>'.
		'4.internet - '.GetNamesComplect('internet',$UserInfo['internet']).'(L'.$UserInfo['internet'].')<br>'.
		'5.spy - '.GetNamesComplect('spy',$UserInfo['spy']).'(L'.$UserInfo['spy'].')<br>'.
		'6.antivirus - '.GetNamesComplect('antivirus',$UserInfo['antivirus']).'(L'.$UserInfo['antivirus'].')<br>';
		$message .= 'Чтобы улучшить характеристики напишите "Хаки [номер]"';
	}else{
		$name = SwitchRusToEnComplect($str);
		if($name != false){
			$message = UpgradeComplect($name);
		}else{
			$message = $Nick.', неверный номер.';
		}
		
	}
	return $message;
}
function UpgradeComplect($str){
	global $UserInfo,$Nick;
	$arr = array('RAM','CPU','VC','internet','spy','antivirus');
	for($i=0;$i<count($arr);$i++){
		if(($UserInfo[$str]-$UserInfo[$arr[$i]])>=2){
			return $Nick.', необходимо улучшить остальные характеристики для улучшения этой.';
		}
	}
	$Plus = GetPlusPriceUp($str);
	$priceBNC = floor($UserInfo[$str]*1.5+$Plus['bnc']);
	$priceDOLLAR = floor($UserInfo[$str]*KKK('10k')*$Plus['dollar']);
	$lvl = $UserInfo[$str]+1;
	if(GetJsonValue('bnc','bnc') >= $priceBNC){
		if($UserInfo['dollar'] >= $priceDOLLAR){
			AddJsonValue('bnc','bnc',$priceBNC,'-');
			SetFieldF('dollar',$UserInfo['dollar']-$priceDOLLAR);
			SetFieldF($str,$lvl);
			$message = $Nick.', вы успешно улучшили '.$str.' до '.GetNamesComplect($str,$lvl);
		}else{
			$message = $Nick.', требуется '.ConvertValute($priceDOLLAR).' $.';
		}
	}else{
		$message = $Nick.',требуется '.ConvertValute($priceBNC).SwitchEmoji('bnc');
	}
	return $message;

}
function GetPlusPriceUp($str){
	switch ($str) {
		case 'RAM':
			$bnc = 3;
			$dollar = 3;
			break;
		case 'CPU':
			$bnc = 4;
			$dollar = 6;
			break;
		case 'VC':
			$bnc = 1;
			$dollar = 3;
			break;
		case 'internet':
			$bnc = 5;
			$dollar = 2;
			break;
		case 'spy':
			$bnc = 1;
			$dollar = 8;
			break;
		case 'antivirus':
			$bnc = 7;
			$dollar = 5;
			break;
		
		default:
			# code...
			break;
	}
	return ['bnc'=>$bnc,'dollar'=>$dollar];
}
function GetNamesComplect($sub,$lvl){
	switch ($sub) {
		case 'RAM':
			switch ($lvl) {
				case '1':
					$name = 'DDR2 1GB';
					break;
				case '2':
					$name = 'DDR2 2GB';
					break;
				case '3':
					$name = 'DDR3 2GB';
					break;
				case '4':
					$name = 'DDR3 4GB';
					break;
				case '5':
					$name = 'DDR3 8GB';
					break;
				case '6':
					$name = 'DDR4 8GB';
					break;
				case '7':
					$name = 'DDR4 16GB';
					break;
				case '8':
					$name = 'DDR4 32GB';
					break;
				case '9':
					$name = 'DDR4 64GB';
					break;
				case '10':
					$name = 'DDR4 128GB';
					break;
				
				default:
					$name = 'DDR'.$lvl.' '.pow($lvl,2).'GB';
					break;
			}
			break;
		case 'CPU':
			switch ($lvl) {
				case '1':
					$name = 'Intelet Celeron';
					break;
				case '2':
					$name = 'ADM Athlon D';
					break;
				case '3':
					$name = 'Intelet Pentium M';
					break;
				case '4':
					$name = 'Intelet Pentium 4';
					break;
				case '5':
					$name = 'ADM 4A-1250 APU';
					break;
				case '6':
					$name = 'Intelet Core2 Duo 7200';
					break;
				case '7':
					$name = 'Dual Core ADM OpEtRon 266';
					break;
				case '8':
					$name = 'Intelet Core2 Duo E66';
					break;
				case '9':
					$name = 'Intelet Core i3-2288M';
					break;
				case '10':
					$name = 'ADM Phenom 8650 TC';
					break;
				case '11':
					$name = 'ADM A3-5150M PAU';
					break;
				case '12':
					$name = 'ADM A6-3420M PAU';
					break;
				case '13':
					$name = 'Intelet Core i3-3225U';
					break;
				case '14':
					$name = 'ADM Athlon II X4 650e';
					break;
				case '15':
					$name = 'Intelet Xeon X3210';
					break;
				case '16':
					$name = 'ADM A6-3600 PAU';
					break;
				case '17':
					$name = 'Intelet Core i5-2610E';
					break;
				case '18':
					$name = 'Intelet Core i5-2310M';
					break;
				case '19':
					$name = 'Intelet Xeon E3-1220L';
					break;
				case '20':
					$name = 'ADM A8-3870K PAU';
					break;
				case '21':
					$name = 'Intelet Core i3-3250M';
					break;
				case '22':
					$name = 'Intelet Core i7-4550U';
					break;
				case '23':
					$name = 'ADM A8-5560K PAU';
					break;
				case '24':
					$name = 'ADM FX-8350 Eight-Core';
					break;
				case '25':
					$name = 'ADM FX-8350 Eight-Core2';
					break;
				case '26':
					$name = 'ADM FX-8350 Eight-Core3';
					break;
				case '27':
					$name = 'Intelet Core i7 6400U';
					break;
				case '28':
					$name = 'Intelet Xeon E5-1320';
					break;
				case '29':
					$name = 'Intelet Xeon 2550 V1';
					break;
				default:
					$name = 'Proc i'.$lvl.' Turbo'.floor($lvl/2).' '.floor(($lvl*5).($lvl*2).($lvl*4).floor($lvl/2));
					break;
			}
			break;
		case 'VC':
			switch ($lvl) {
				case '1':
					$name = 'ADM Radein 9200 SE';
					break;
				case '2':
					$name = 'Ndivia Girafic4 255';
					break;
				case '3':
					$name = 'Ndivia Ti 5200';
					break;
				case '4':
					$name = 'ADM Radein 8200 IDE';
					break;
				case '5':
					$name = 'Ndivia Girafic4 500 YU';
					break;
				case '6':
					$name = 'Ndivia Girafic4 880 YU';
					break;
				case '7':
					$name = 'ADM Radein 6600 SL';
					break;
				case '8':
					$name = 'Ndivia Girafic4 1260 YU';
					break;
				case '9':
					$name = 'Ndivia 255 Ti X2000';
					break;
				case '10':
					$name = 'Ndivia 525 Ti X1300';
					break;
				case '11':
					$name = 'Ndivia 565 Ti X900';
					break;
				case '12':
					$name = 'ADM Radein 4252 DU';
					break;
				case '13':
					$name = 'ADM Radein C440';
					break;
				case '14':
					$name = 'ADM Radein MAX 100';
					break;
				case '15':
					$name = 'Ndivia 2920 Ti';
					break;
				case '16':
					$name = 'Ndivia Begemotic 5500';
					break;
				case '17':
					$name = 'Ndivia Girafic3 2400';
					break;
				case '18':
					$name = 'Ndivia Girafic3 3200';
					break;
				case '19':
					$name = 'Ndivia Girafic3 C140';
					break;
				case '20':
					$name = 'Ndivia 2402E Ti';
					break;
				case '21':
					$name = 'Ndivia 2402E Ti+';
					break;
				case '22':
					$name = 'Ndivia Girafic2 2202';
					break;
				case '23':
					$name = 'Ndivia Girafic2 E400';
					break;
				case '24':
					$name = 'Ndivia Begemotic 1280Qx';
					break;
				
				default:
					$name = 'Usir Tribotix '.floor(($lvl/2).($lvl/4).($lvl/5)).'QxGe';
					break;
			}
			break;
		case 'internet':
			if($lvl>15){
				$abr = 'TB';
			}elseif($lvl>10){
				$abr = 'GB';
			}else{
				$abr = 'MB';
			}
			$name = pow($lvl,2).$abr;
			break;
		case 'antivirus':
			$name = 'Shidows Du'.floor(($lvl*6).($lvl/2));
			break;
		case 'spy':
			$name = 'Spy Engine X'.($lvl).' T'.pow(floor($lvl/3),2);
			break;
		default:
			# code...
			break;
	}
	return $name;
}
?>
