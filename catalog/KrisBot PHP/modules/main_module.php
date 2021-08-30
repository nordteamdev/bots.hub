<?php
foreach(glob("modules/*.php") as $file){  
	$file = str_ireplace("modules/", "", $file);
    if(($file !== '.') AND ($file !== '..') and ($file != "main_module.php"))
   		require($file);
}
function match($wrd, $var){
	if(preg_match_all($wrd, $var, $matches, PREG_SET_ORDER)){
		global $params;
		$params = $matches[0];
		return $matches[0];
	}
}
function get_name($text){
	return match('/^(?:(?:https?\:\/\/)?(?:vk\.com\/)|\[)(.+?)(?:\|.+\]|$)/', $text)[1];
}
function number_format_short( $n, $precision = 1 ) {
	if ($n < 999) {
		// 0 - 900
		$n_format = number_format($n, $precision);
		$suffix = '';
	} else if ($n < 999999) {
		// 0.9k-850k
		$n_format = number_format($n / 1000, $precision);
		$suffix = 'к';
	} else if ($n < 999999999) {
		// 0.9m-850m
		$n_format = number_format($n / 1000000, $precision);
		$suffix = 'кк';
	} else if ($n < 999999999999) {
		// 0.9b-850b
		$n_format = number_format($n / 1000000000, $precision);
		$suffix = 'ккк';
	} else {
		// 0.9t+
		$n_format = number_format($n / 1000000000000, $precision);
		$suffix = 'кккк';
	}
  // Remove unecessary zeroes after decimal. "1.0" -> "1"; "1.00" -> "1"
  // Intentionally does not affect partials, eg "1.50" -> "1.50"
	if ( $precision > 0 ) {
		$dotzero = '.' . str_repeat( '0', $precision );
		$n_format = str_replace( $dotzero, '', $n_format );
	}
	return $n_format . $suffix;
}
function u_eval($q, $settings){
	global $msg, $update, $vkue, $cmds;
	ob_start();
		try {
			$tot = htmlspecialchars_decode($q);
			$tot = str_ireplace("\n", "", $tot);
			$tot = str_ireplace("<br>", "", $tot);
			$tot = str_ireplace("&quot;", "", $tot);
			   	eval($tot);
			$data = ob_get_contents();
		} catch (Exception $e) {
		}
		ob_end_clean();
		return "результат - ".strip_tags($data);
}
function arr_rand($arr, $num = 1){
	return $arr[array_rand($arr, $num)];
}
function print_wikidata($mes)
{
	global $vkue;
	$data = json_decode(file_get_contents("https://ru.wikipedia.org/w/api.php?action=opensearch&search=".urlencode($mes)."&prop=info&format=json&inprop=url")); 
	if(!isset($data[2][0])) return "Не найдена статья с названием \"{$mes}\"";
	$short = $vkue->api->utils_getShortLink(['url' => $data[3][0]]);
	$text = $data[2][0].'
Полный текст статьи - '.$short["response"]["short_url"];
	if(stristr($text, 'может иметь следующие значения:'))
	{
		$text = 'В Википедии страница "'.$mes.'" является страницой разрешения неоднозначностей. Несколько вариантов, которые она предлагает: '."{$data[3][0]}, {$data[3][1]}.";
	}
	return $text;
}
function getID($id=false){
	global $msg, $vkue;
	if(isset($msg->fwd)){
		$ids=[];
		foreach ($msg->fwd as $message) {
			$ids[]=$message['user_id'];
		}
		return $ids;
	}
	if($id){
		if(preg_match_all("/vk.com\/(.*)/",$id,$matches, PREG_SET_ORDER)){
			$get=$matches[0][1];
			return $vkue->api->users_get(['user_ids'=>$get])['response'][0]['id'];
		}
	}
}
?>