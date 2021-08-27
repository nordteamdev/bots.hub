<?php

class MySQL
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

	public function get_settings($group_id, $secret)
	{
		$resp = $this->query("SELECT * FROM users WHERE group_id = ?s AND uniqid = ?s LIMIT 1", $group_id, $secret);
		$resp = @mysqli_fetch_assoc($resp);

		if (!$resp) {
			return false;
		}
		else {
			return $resp;
		}
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
			$part = $this->escapeVar($value);
			$query .= $part;
		}

		//$query = str_replace('\\\\', ' ', $query);
		return $query;
	}

	private function escapeVar($value)
	{
		if ($value === NULL)
			return 'NULL';

		return "'" . mysqli_real_escape_string($this->link, $value) . "'";
	}

	/** Пишем в базу ***/
	public function add_repost($group_id, $wall_id, $wall_owner_id, $vk_id)
	{
		$this->query(
			"INSERT INTO wall_repost(group_id, wall_id, wall_owner_id, vk_id) VALUES(?s, ?s, ?s, ?s)",
			$group_id,
			$wall_id,
			$wall_owner_id,
			$vk_id
		);
	}

	public function insert_message_new($group_id, $user_id, $body, $date)
	{
		$this->query(
			"INSERT INTO message_new(group_id, vk_id, message, date) VALUES(?s, ?s, ?s, ?s)",
			$group_id,
			$user_id,
			$body,
			$date
		);
	}

	public function insert_group_join($group_id, $user_id, $date)
	{
		$this->query("INSERT INTO group_join(group_id, vk_id, date) VALUES(?s, ?s, ?s)", $group_id, $user_id, $date);
	}

	public function insert_group_leave($group_id, $user_id, $date)
	{
		$this->query("INSERT INTO group_leave(group_id, vk_id, date) VALUES(?s, ?s, ?s)", $group_id, $user_id, $date);
	}

	/** Подписчики ***/
	public function is_subscriber($group_id, $vk_id)
	{
		$resp = $this->query(
			"SELECT * FROM subscribers WHERE vk_id = ?s AND group_id = ?s LIMIT 1",
			$vk_id,
			$group_id
		);

		$resp = @mysqli_fetch_assoc($resp);
		if (!$resp) {
			return false;
		}
		return true;
	}

	public function add_subscriber($group_id, $user_id)
	{
		$this->query("INSERT INTO subscribers(group_id, vk_id) VALUES(?s, ?s);", $group_id, $user_id);
	}

	public function delete_subscriber($group_id, $user_id)
	{
		$this->query("DELETE FROM subscribers WHERE vk_id = ?s AND group_id = ?s;", $user_id, $group_id);
	}

	public function get_from_user_db($vk_id, $group_id, $text) // Может оптимизировать через полнотекстовый идекс?
	{
		$resp = $this->query(
			"SELECT * FROM user_db WHERE vk_id = ?i AND group_id = ?i AND input = ?s",
			$vk_id,
			$group_id,
			$text
		);

		return @mysqli_fetch_assoc($resp);
	}

	public function get_count_messages_today($group_id, $user_id)
	{
		$resp = $this->query(
			"SELECT COUNT(id) as count FROM message_new WHERE group_id = ?s AND vk_id = ?s AND date > ?s",
			$group_id,
			$user_id,
			strtotime("today")
		);
		$resp = mysqli_fetch_assoc($resp);

		return $resp["count"];
	}


	public function get_exact_count_messages_by_date($group_id, $user_id, $message, $limit_time)
	{
		// Переделать надо в boolean mode
		$resp = $this->query(
			"SELECT COUNT(id) as count FROM message_new WHERE group_id = ?s AND vk_id = ?s AND date > ?s AND MATCH(message) AGAINST(?s)",
			$group_id,
			$user_id,
			strtotime("now") - 60 * $limit_time, // в минутах
			$message
		);
		$resp = mysqli_fetch_assoc($resp);
		return $resp["count"];
	}

	public function get_exact_limits_user_db($vk_id, $group_id, $input)
	{
		// Переделать надо в boolean mode
		$resp = $this->query(
			"SELECT * FROM user_db_limits WHERE vk_id = ?i AND group_id = ?i AND MATCH(input) AGAINST(?s)",
			$vk_id,
			$group_id,
			$input
		);

		return @mysqli_fetch_assoc($resp);
	}

	public function isset_function($function)
	{
		$resp = $this->query("SELECT * FROM functions WHERE name = ?s", $function);

		$resp = @mysqli_fetch_assoc($resp);
		if (!$resp)
			return false;
		return $resp["path_name"];
	}
}