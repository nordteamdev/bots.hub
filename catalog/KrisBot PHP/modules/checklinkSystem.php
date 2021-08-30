<?php
function checkLink($string){
global $vkue;
preg_match_all('/((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/u', $string, $matches);
if(isset($matches[0])){
	foreach ($matches[0] as $link) {
		$status = $vkue->api->utils_checkLink(['url'=>$link])['response']['status'];
		if($status=='banned')$string=str_ireplace($link, "<Ссылка удалена>", $string);
	}
}
return $string;
}
?>