<?php

/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 16.06.17
 * Time: 23:34
 */
class Functions
{
	public $functions;

	public function __construct($input)
	{
		$this->functions = $input;
	}

	public function is_function($input)
	{
		$input = trim($input);
		if (mb_substr($input, 0, 1) == "*" and mb_substr($input, -1, 1) == "*") {
			return $func_name = mb_substr($input, 1, mb_strlen($input) - 2);
		}
		else
			return false;
	}

	public function is_set($func_name)
	{
		$isset_functions = scandir(__DIR__ . "/Functions");
		$valid_functions = explode(";", $this->functions);

		$check = false;
		for ($i = 0; $i < count($valid_functions); $i++) {
			// Если в настройках есть и найден файл
			if ($valid_functions[$i] == $func_name and in_array($func_name . ".php", $isset_functions)) {
				$check = true;
			}
		}

		if ($check) {
			return $func_name;
		}
		else {
			return false;
		}
	}

	public function is_in_blacklist($input)
	{
		$arr = array(
			"сообщение при подписке",
			"сообщение при отписке",
			"рекламный текст",
			"частота повторов рекламы",
			"первая реклама",
			"отвечать только подписчикам",
			"рандом с исключением",
			"пустой рандом с исключением"
		);

		$input = mb_strtolower($input);
		for ($i = 0; $i < count($arr); $i++) {
			if (mb_stristr($input, $arr[$i], 0, "UTF-8") !== false)
				return true;
		}

		return false;
	}
}