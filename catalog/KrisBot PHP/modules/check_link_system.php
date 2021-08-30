<?php
function check_link($url){
	global $vkue;
	$status =$vkue->api->utils_checkLink(['url' => $url])['response']['status'];
	if($status=='banned')return true;
}
?>