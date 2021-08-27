<?php

class VkAPI
{
	public $access_token, $version = 5.64, $attachment_in, $attachment_out, $sleep = 350000;

	public function account_ban_user($user_id)
	{
		return $this->request("account.banUser", array('user_id' => $user_id));
	}

	protected function request($method, $params = array())
	{
		$url = 'https://api.vk.com/method/' . $method;
		$params['access_token'] = $this->access_token;
		$params['v'] = $this->version;
		@$resp = json_decode($this->curl($url . '?' . http_build_query($params)));

		if (($resp == NULL) or isset($resp->error)) {
			usleep($this->sleep);
			@$resp = json_decode($this->curl($url . '?' . http_build_query($params)));

			if (($resp == NULL) or isset($resp->error)) {
				usleep($this->sleep);
				@$resp = json_decode($this->curl($url . '?' . http_build_query($params)));
			}

			if (($resp == NULL) or isset($resp->error)) {
				return false;
			}
		}
		//print_r($params);
		return $resp;
	}

	//------------------------------------------------------------------------------------------------------------------
	// Account
	//------------------------------------------------------------------------------------------------------------------

	protected function curl($url)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 10);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		$resp = curl_exec($ch);
		curl_close($ch);
		return $resp;
	}

	public function account_setOnline()
	{
		return $this->request("account.setOnline", array());
	}

	public function account_getAppPermissions()
	{
		return $this->request("account.getAppPermissions");
	}

	//------------------------------------------------------------------------------------------------------------------
	// Execute
	//------------------------------------------------------------------------------------------------------------------

	public function execute($code)
	{
		return $this->request("execute", array('code' => $code));
	}

	//------------------------------------------------------------------------------------------------------------------
	// Messages
	//------------------------------------------------------------------------------------------------------------------

	public function messages_get($count = 20, $offset = 0, $out = 0)
	{
		return $this->request("messages.get", array('count' => $count, 'offset' => $offset, 'out' => $out));
	}

	public function messages_getById($message_ids)
	{
		return $this->request("messages.getById", array('message_ids' => $message_ids));
	}

	public function messages_getChat($chat_id, $fields = '', $name_case = '')
	{
		return $this->request(
			"messages.getChat",
			array(
				'chat_id'   => $chat_id,
				'fields'    => $fields,
				'name_case' => $name_case
			)
		);
	}

	public function messages_getDialogs($count = 10, $offset)
	{
		return $this->request("messages.getDialogs", array('count' => $count, 'offset' => $offset));
	}

	public function messages_getHistory($count = 20, $offset = 0, $rev = 0)
	{
		return $this->request("messages.getHistory", array('count' => $count, 'offset' => $offset, 'rev' => $rev));
	}

	public function messages_markAsRead($message_ids)
	{
		return $this->request("messages.markAsRead", array('message_ids' => $message_ids));
	}

	public function messages_send($user_id = '', $chat_id = '', $message = '', $attachment = '')
	{
		$params = array();

		if ($chat_id == '') {
			$params['user_id'] = $user_id;
		}
		else {
			$params['chat_id'] = $chat_id;
		}

		$params['message'] = $message;
		$params['attachment'] = $attachment;

		return $this->request("messages.send", $params);
	}

	//------------------------------------------------------------------------------------------------------------------
	// Friends
	//------------------------------------------------------------------------------------------------------------------

	public function friends_add($user_id, $text = "", $follow = 0)
	{
		return $this->request("friends.add", array('user_id' => $user_id, 'text' => $text, 'follow' => $follow));
	}

	public function friends_delete($user_id)
	{
		return $this->request("friends.delete", array('user_id' => $user_id));
	}

	public function friends_get($user_id = "", $list_id = "", $count = "", $fields = "")
	{
		return $this->request(
			"friends.get",
			array(
				'count'    => $count,
				'$user_id' => $user_id,
				'list_id'  => $list_id,
				'fields'   => $fields
			)
		);
	}

	public function friends_getRequests($out, $count = 100, $sort = 0)
	{
		return $this->request("friends.getRequests", array('out' => $out, 'count' => $count, 'sort' => $sort));
	}

	//------------------------------------------------------------------------------------------------------------------
	// Groups
	//------------------------------------------------------------------------------------------------------------------

	public function groups_getById($group_ids = "", $fields = "")
	{
		return $this->request(
			"groups.getById",
			array(
				'group_ids' => $group_ids,
				'fields'    => $fields
			)
		);
	}

	public function groups_getCallbackConfirmationCode($group_id)
	{
		return $this->request(
			"groups.getCallbackConfirmationCode",
			array('group_id' => $group_id)
		);
	}

	public function groups_getCallbackServerSettings($group_id)
	{
		return $this->request(
			"groups.getCallbackServerSettings",
			array('group_id' => $group_id)
		);
	}

	public function groups_getCallbackSettings($group_id)
	{
		return $this->request(
			"groups.getCallbackSettings",
			array('group_id' => $group_id)
		);
	}

	public function groups_setCallbackServer($group_id, $server_url = "")
	{
		return $this->request(
			"groups.setCallbackServer",
			array(
				'group_id'    => $group_id,
				'$server_url' => $server_url
			)
		);
	}

	public function groups_setCallbackSettings($group_id,
											   $message_new = 0,
											   $message_reply = 0,
											   $message_allow = 0,
											   $message_deny = 0,
											   $photo_new = 0,
											   $audio_new = 0,
											   $video_new = 0,
											   $wall_reply_new = 0,
											   $wall_reply_edit = 0,
											   $wall_post_new = 0,
											   $wall_repost = 0,
											   $board_post_new = 0,
											   $board_post_edit = 0,
											   $board_post_restore = 0,
											   $board_post_delete = 0,
											   $photo_comment_new = 0,
											   $video_comment_new = 0,
											   $market_comment_new = 0,
											   $group_join = 0,
											   $group_leave = 0)
	{
		return $this->request(
			"groups.setCallbackSettings",
			array(
				'group_id'           => $group_id,
				'message_new'        => $message_new,
				'message_reply'      => $message_reply,
				'message_allow'      => $message_allow,
				'message_deny'       => $message_deny,
				'photo_new'          => $photo_new,
				'audio_new'          => $audio_new,
				'video_new'          => $video_new,
				'wall_reply_new'     => $wall_reply_new,
				'wall_reply_edit'    => $wall_reply_edit,
				'wall_post_new'      => $wall_post_new,
				'wall_repost'        => $wall_repost,
				'board_post_new'     => $board_post_new,
				'board_post_edit'    => $board_post_edit,
				'board_post_restore' => $board_post_restore,
				'board_post_delete'  => $board_post_delete,
				'photo_comment_new'  => $photo_comment_new,
				'video_comment_new'  => $video_comment_new,
				'market_comment_new' => $market_comment_new,
				'group_join'         => $group_join,
				'group_leave'        => $group_leave
			)
		);
	}

	public function groups_setCallbackServerSettings($group_id, $secret_key)
	{
		return $this->request(
			"groups.setCallbackServerSettings",
			array(
				'group_id'   => $group_id,
				'secret_key' => $secret_key
			)
		);
	}

	public function groups_isMember($group_id, $user_id)
	{
		return $this->request(
			"groups.isMember",
			array(
				'group_id' => $group_id,
				'user_id'  => $user_id
			)
		);
	}

	//------------------------------------------------------------------------------------------------------------------
	// Users
	//------------------------------------------------------------------------------------------------------------------

	public function users_get($user_id, $fields = "", $name_case = "nom")
	{
		return $this->request(
			"users.get",
			array(
				'user_ids'  => $user_id,
				'fields'    => $fields,
				'name_case' => $name_case
			)
		);
	}
}