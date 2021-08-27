<?php
/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 16.06.17
 * Time: 23:34
 */
class Hooks
{
	public $hooks_array;
	function __construct($hooks, $folder)
	{
		$hooks = explode(";", $hooks);
		$valid_hooks = scandir(__DIR__ . "/$folder");
		$return_arr = array();
		for ($i = 0; $i < count($hooks); $i++) {
			if (in_array($hooks[$i] . ".php", $valid_hooks)) {
				array_push($return_arr, __DIR__ . "/$folder/" . $hooks[$i]);
			}
		}
		// Добавить приоритет хук?
		$this->hooks_array = $return_arr;
	}
}