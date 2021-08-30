<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2016 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
$json_error_data   = array();
$json_success_data = array();
$type              = Wo_Secure($_GET['type'], 0);
if ($type == 'check_hash') {
    if (empty($_GET['hash_id'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '3',
                'error_text' => 'No hash sent.'
            )
        );
    } 
    if (empty($json_error_data)) {
    	$hash = Wo_Secure($_GET['hash_id']);
    	$query = mysqli_query($sqlConnect, "SELECT * FROM " . T_APPS_HASH . " WHERE `hash_id` = '{$hash}' AND `active` = '1'");
    	if (mysqli_num_rows($query) == 1) {
    		$sql_fetch = mysqli_fetch_assoc($query);
    		$user_id = $sql_fetch['user_id'];
    		$time = time();
    		$s    = sha1(rand(111111111, 999999999)) . md5(microtime()) . rand(11111111, 99999999);
            $cookie =  Wo_CreateLoginSession($sql_fetch['user_id']);
    		$add_session = mysqli_query($sqlConnect, "INSERT INTO " . T_APP_SESSIONS . " (`user_id`, `session_id`, `platform`, `time`) VALUES ('{$user_id}', '{$s}', 'phone', '{$time}')");
            if (!empty($_POST['device_id'])) {
                $device_id  = Wo_Secure($_POST['device_id']);
                $update  = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `device_id` = '{$device_id}' WHERE `user_id` = '{$user_id}'");
            }
    		$json_success_data = array('user_id' => $user_id, 'session_id' => $s, 'cookie' => $cookie);
    		$mysqli = mysqli_query($sqlConnect, "DELETE FROM " . T_APPS_HASH . " WHERE `hash_id` = '{$hash}' AND `active` = '1'");
    	} else {
    		$json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'api_version' => $api_version,
                'errors' => array(
                    'error_id' => '4',
                    'error_text' => 'invalid hash id.'
                )
            );
    		header("Content-type: application/json");
            echo json_encode($json_error_data, JSON_PRETTY_PRINT);
            exit();
    	}
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
$json_success_data = array(
    'api_status' => '200',
    'api_text' => 'success',
    'api_version' => $api_version,
    'user_data' => $json_success_data
);
header("Content-type: application/json");
echo json_encode($json_success_data);
exit();
?>