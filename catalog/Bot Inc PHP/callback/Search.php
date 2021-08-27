<?php

/**
 * Created by PhpStorm.
 * User: bad-day
 * Date: 16.06.17
 * Time: 23:34
 * Класс для работы с поисковой базой данных
 */
class Search
{

	var $link;

	function __construct($config = NULL)
	{
		include_once dirname(__FILE__) . '/../config.php';

		$this->link = mysqli_connect(
			config\MYSQL_HOST,
			config\MYSQL_USERNAME,
			config\MYSQL_PASSWORD,
			config\MYSQL_DB,
			config\MYSQL_PORT
		);

		mysqli_set_charset($this->link, "utf8mb4");
	}

	public function search($vk_id, $group_id, $message)
	{
		$message = Emoji::Encode($message); // Чтобы в поиске работало emoji

		if (iconv_strlen($message) < 3) {
			$resp = $this->query(
				"SELECT * FROM user_db WHERE vk_id = ?i AND group_id = ?i input = ?s LIMIT 1",
				$vk_id,
				$group_id,
				$message
			);
		}
		else {

			$message = str_replace("+", " плюс", $message);
			$message = str_replace("-", " минус", $message);
			$message = str_replace("*", " звездочка", $message);
			$message = str_replace("\"", "", $message);
			$message = str_replace("<", " меньше", $message);
			$message = str_replace(">", " больше", $message);
			$message = str_replace("(", " левая скобка", $message);
			$message = str_replace(")", " правая скобка", $message);
			$message = str_replace("~", " тильда", $message);

			$resp = $this->query(
				"SELECT * FROM user_db WHERE vk_id = ?i AND group_id = ?i AND MATCH (input) AGAINST (?s IN BOOLEAN MODE) LIMIT 1;",
				$vk_id,
				$group_id,
				'"' . $message . '"'
			);

			/*		$resp = $this->query(
						"SELECT * FROM user_db WHERE vk_id = ?i AND group_id = ?i AND MATCH(input) AGAINST(?s) LIMIT 1",
						$vk_id,
						$group_id,
						$message
					);*/
		}


		@$resp = mysqli_fetch_assoc($resp);

		if ($resp) {
			return $this->randomize($resp["output"]);
		}
		else {
			return $this->randomize($this->get_unfounded($vk_id, $group_id));
		}
	}

	public function query()
	{
		//var_dump($this->prepareQuery(func_get_args()));
		return mysqli_query($this->link, $this->prepareQuery(func_get_args()));
	}

	/**
	 * Методы защиты от sql injection
	 * @param $args
	 * @return string
	 */
	protected function prepareQuery($args)
	{
		$query = '';
		$raw = array_shift($args);
		$array = preg_split('~(\?[nsiuap])~u', $raw, null, PREG_SPLIT_DELIM_CAPTURE);

		foreach ($array as $i => $part) {
			if (($i % 2) == 0) {
				$query .= $part;
				continue;
			}
			$value = array_shift($args);

			switch ($part) {
				case '?i':
					$part = $this->escapeInt($value);
					break;

				case '?s':
					$part = $this->escapeString($value);
					break;
			}
			$query .= $part;
		}

		return $query;
	}

	protected function escapeInt($value)
	{
		if ($value === NULL) {
			return 'NULL';
		}
		if (!is_numeric($value)) {

			return false;
		}
		if (is_float($value)) {
			$value = number_format($value, 0, '.', '');
		}
		return $value;
	}

	protected function escapeString($value)
	{
		if ($value === NULL) {
			return 'NULL';
		}

		return "'" . mysqli_real_escape_string($this->link, $value) . "'";
	}

	public function randomize($str)
	{
		$str = str_replace("\;", "<{TZ}>", $str);
		$str = str_replace("\\n", "<{NN}>", $str);

		$arr = explode(";", $str);
		$rand_str = $arr[rand(0, count($arr) - 1)];

		$rand_str = str_replace("<{TZ}>", ";", $rand_str);
		$rand_str = str_replace("<{NN}>", "<br>", $rand_str);
		return $rand_str;
	}

	/**
	 * Если прямым запросом к поисковой бд вернулся null, то запрос перепавляется сюда
	 * В этом методе мы делаем запрос на полученя строки "Неизвестные сообщения"
	 * @param $vk_id
	 * @param $group_id
	 * @return string
	 */
	public function get_unfounded($vk_id, $group_id)
	{


		$resp = $this->query(
			"SELECT * FROM user_db WHERE vk_id = ?i AND group_id = ?i AND MATCH (input) AGAINST (?s IN BOOLEAN MODE) LIMIT 1;",
			$vk_id,
			$group_id,
			'"Неизвестные сообщения"'
		);

		@$resp = mysqli_fetch_assoc($resp);

		if ($resp) {
			return $resp["output"];
		}
		else {
			return "not founded, please, contact to admin";
		}
	}
}