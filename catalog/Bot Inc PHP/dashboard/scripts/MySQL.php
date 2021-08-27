<?php

class MySQL
{
	var $link;

	function __construct($config = NULL)
	{
		include_once dirname(__FILE__) . '/../../config.php';
		$this->link = mysqli_connect(
			config\MYSQL_HOST,
			config\MYSQL_USERNAME,
			config\MYSQL_PASSWORD,
			config\MYSQL_DB,
			config\MYSQL_PORT
		);
		mysqli_set_charset($this->link, "utf8mb4");
	}

	public function get_user_info($vk_id, $group_id)
	{
		$resp = $this->query("SELECT * FROM users WHERE vk_id = ?s AND group_id = ?s", $vk_id, $group_id);
		return mysqli_fetch_assoc($resp);
	}

	public function query()
	{
		//var_dump($this->prepareQuery(func_get_args()));
		return mysqli_query($this->link, $this->prepareQuery(func_get_args()));
	}

	/** Методы защиты ***/
	private function prepareQuery($args)
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
			$this->error("Integer (?i) placeholder expects numeric value, " . gettype($value) . " given");
			return FALSE;
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

	public function get_user_info_null($vk_id)
	{
		$resp = $this->query("SELECT * FROM users WHERE vk_id = ?s AND group_id IS NULL", $vk_id);
		return mysqli_fetch_assoc($resp);
	}

	public function get_user_info_by_vk_id($vk_id)
	{
		$resp = $this->query("SELECT * FROM users WHERE vk_id = ?s LIMIT 1", $vk_id);
		return mysqli_fetch_assoc($resp);
	}

	public function get_count_messages($group_id, $date1, $date2)
	{
		$resp = $this->query(
			"SELECT COUNT(id) AS count FROM message_new WHERE group_id = ?i AND date > ?i AND date < ?i LIMIT 1",
			$group_id,
			$date1,
			$date2
		);
		return mysqli_fetch_assoc($resp);
	}

	public function get_all_count_messages($group_id)
	{
		$resp = $this->query(
			"SELECT COUNT(id) AS count FROM message_new WHERE group_id = ?i LIMIT 1",
			$group_id
		);
		return mysqli_fetch_assoc($resp);
	}

	public function get_count_group_join($group_id, $date1, $date2)
	{
		$resp = $this->query(
			"SELECT COUNT(id) AS count FROM group_join WHERE group_id = ?i AND date > ?i AND date < ?i LIMIT 1",
			$group_id,
			$date1,
			$date2
		);
		return mysqli_fetch_assoc($resp);
	}

	public function get_all_count_group_join($group_id)
	{
		$resp = $this->query(
			"SELECT COUNT(id) AS count FROM group_join WHERE group_id = ?i LIMIT 1",
			$group_id
		);
		return mysqli_fetch_assoc($resp);
	}

	public function get_count_group_leave($group_id, $date1, $date2)
	{
		$resp = $this->query(
			"SELECT COUNT(id) AS count FROM group_leave WHERE group_id = ?i AND date > ?i AND date < ?i LIMIT 1",
			$group_id,
			$date1,
			$date2
		);
		return mysqli_fetch_assoc($resp);
	}

	public function get_all_count_group_leave($group_id)
	{
		$resp = $this->query(
			"SELECT COUNT(id) AS count FROM group_leave WHERE group_id = ?i LIMIT 1",
			$group_id
		);
		return mysqli_fetch_assoc($resp);
	}

	public function get_active_users($group_id, $count = 5, $date1, $date2)
	{
		$resp = $this->query(
			"SELECT vk_id, COUNT(id) AS count FROM message_new WHERE group_id = ?i AND date > ?i AND date < ?i GROUP BY `vk_id` HAVING count(*)>1 ORDER BY count DESC LIMIT ?i;",
			$group_id,
			$date1,
			$date2,
			$count
		);

		$arr = array();
		$i = 0;
		while ($row = mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}

		return $arr;
	}

	public function get_top_messages($group_id, $count = 5, $date1, $date2)
	{
		$resp = $this->query(
			"SELECT message, COUNT(id) AS count FROM message_new WHERE group_id = ?i AND date > ?i AND date < ?i GROUP BY `message` HAVING count(*)>1 AND message <> '' ORDER BY count DESC LIMIT ?i;",
			$group_id,
			$date1,
			$date2,
			$count
		);

		$arr = array();
		$i = 0;
		while (@$row = mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}

		return $arr;
	}

	public function get_user_groups($vk_id)
	{
		$resp = $this->query(
			"SELECT * FROM users WHERE vk_id = ?i",
			$vk_id
		);

		$arr = array();
		$i = 0;
		while (@$row = mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}

		return $arr;
	}

	public function delete_user_group($vk_id, $group_id)
	{
		$resp = $this->query(
			"DELETE FROM users WHERE vk_id = ?s AND group_id = ?s",
			$vk_id,
			$group_id
		);

		$arr = array();
		$i = 0;
		while (@$row = mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}

		return $arr;
	}

	public function db_upload($vk_id, $group_id, $input, $output)
	{
		$test = $this->query(
			"SELECT id, output FROM user_db WHERE vk_id = ?s AND group_id = ?i AND input = ?s",
			$vk_id,
			$group_id,
			$input
		);
		$test = @mysqli_fetch_assoc($test);
		if (!$test)
			$this->query(
				"INSERT INTO user_db(vk_id, group_id, input, output) VALUES(?i, ?i, ?s, ?s)",
				$vk_id,
				$group_id,
				$input,
				$output
			);
		else
			$this->query("UPDATE user_db SET output = ?s WHERE id = ?s", $test["output"] . ";" . $output, $test["id"]);
	}

	public function db_multi_upload($vk_id, $group_id, $arr) // Для загрузки из файла
	{
		for ($i = 0; $i < count($arr); $i++) {
			$this->query(
				"INSERT INTO user_db(vk_id, group_id, input, output) VALUES(?i, ?i, ?s, ?s);",
				$vk_id,
				$group_id,
				$arr[$i][1],
				$arr[$i][2]
			);
		}
	}

	public function db_upload_special($vk_id, $group_id, $input, $output) // для подписок/отписок и прочего
	{
		$test = $this->query(
			"SELECT id, output FROM user_db WHERE vk_id = ?s AND group_id = ?i AND input = ?s",
			$vk_id,
			$group_id,
			$input
		);
		$test = @mysqli_fetch_assoc($test);
		if (!$test)
			$this->query(
				"INSERT INTO user_db(vk_id, group_id, input, output) VALUES(?i, ?i, ?s, ?s)",
				$vk_id,
				$group_id,
				$input,
				$output
			);
		else
			$this->query("UPDATE user_db SET output = ?s WHERE id = ?s", $output, $test["id"]);
	}

	public function get_user_db($vk_id, $group_id)
	{
		$resp = $this->query(
			"SELECT input, output FROM user_db WHERE vk_id = ?i AND group_id = ?i ORDER BY id",
			$vk_id,
			$group_id
		);

		$arr = array();
		$i = 0;
		while ($row = @mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}

		return $arr;
	}

	public function get_limits_user_db($vk_id, $group_id)
	{
		$resp = $this->query("SELECT * FROM user_db_limits WHERE vk_id = ?i AND group_id = ?i", $vk_id, $group_id);

		$arr = array();
		$i = 0;
		while ($row = mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}
		return $arr;
	}

	public function get_methods_db()
	{
		$resp = $this->query("SELECT * FROM functions WHERE publish = 1 ORDER BY id");

		$arr = array();
		$i = 0;
		while ($row = mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}

		return $arr;
	}

	public function add_methods_db($name, $path_name, $description, $service, $publish)
	{
		$resp = $this->query(
			"INSERT INTO functions(name, path_name, service, description, publish, date) VALUES(?s, ?s, ?s, ?s,?s, ?s);",
			$name,
			$path_name,
			$service,
			$description,
			$publish,
			date('Y-m-d H:i:s')
		);

		$arr = array();
		$i = 0;
		while ($row = mysqli_fetch_assoc($resp)) {
			$arr[$i] = $row;
			$i++;
		}

		return $arr;
	}

	public function delete_methods_db($name)
	{
		$this->query("DELETE FROM functions WHERE name = ?s", $name);
	}

	public function get_from_user_db($vk_id, $group_id, $text) // мб оптимизировать?
	{
		$resp = $this->query(
			"SELECT * FROM user_db WHERE vk_id = ?i AND group_id = ?i AND input = ?s",
			$vk_id,
			$group_id,
			$text
		);

		return @mysqli_fetch_assoc($resp);
	}

}

?>
