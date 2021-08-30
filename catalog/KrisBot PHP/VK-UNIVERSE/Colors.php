<?php
function console(...$params){
	foreach ($params as $text) {
		echo $text;
	}
	echo PHP_EOL;
}
function r($wrd, $var){
	if(preg_match_all($wrd, $var, $matches, PREG_SET_ORDER)){
		global $params;
		$params = $matches[0];
		return true;
	}
}
function rx($wrd, $var){
	if(preg_match_all($wrd, $var, $matches, PREG_SET_ORDER)){
		global $mth;
		$mth = $matches[0];
		return true;
	}
}
class Colors {
	public static function __callStatic($color, $text) {
		$colors = array(
		    'gray'     => 30,
		    'black'     => 30,
		    'red'      => 31,
		    'green'     => 32,
		    'yellow'    => 33,
		    'blue'     => 34,
		    'magenta'    => 35,
		    'cyan'     => 36,
		    'white'     => 37,
		    'default'    => 39,
  		);
  		if(rx("/(.*)_bold/", $color)){
  			global $mth;
  			$color = "1;".$colors[$mth[1]];
  		}else{
			$color = $colors[$color];
		}
			return "\033[".$color."m".$text[0]."\033[0m";
	}
}
?>