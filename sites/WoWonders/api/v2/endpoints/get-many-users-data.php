<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2018 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
$response_data = array(
    'api_status' => 400
);

if (empty($_POST['user_ids'])) {
    $error_code    = 3;
    $error_message = 'user_ids (POST) is missing';
}

if (empty($error_code)) {
    $users_data = array();
    $user_ids   = Wo_Secure($_POST['user_ids']);
    $users      = explode(',', $user_ids);
    $continue   = true;
    $not_found  = 0;
    foreach ($users as $key => $user_profile_id) {
        if (!empty($user_profile_id) && is_numeric($user_profile_id) && $continue == true) {
            $user_profile_data = Wo_UserData($user_profile_id);
            foreach ($non_allowed as $key => $value) {
                unset($user_profile_data[$value]);
            }
            if (empty($user_profile_data)) {
                $continue  = false;
                $not_found = $user_profile_id;
            } else {
                $user_profile_data['gender']          = ($user_profile_data['gender'] == 'male') ? $wo['lang']['male'] : $wo['lang']['female'];
                $user_profile_data['lastseen_status'] = ($user_profile_data['lastseen'] > (time() - 60)) ? 'online' : 'offline';
                $user_profile_data['lastseen_text']   = ($user_profile_data['lastseen'] > (time() - 60)) ? $wo['lang']['online'] : $wo['lang']['last_seen'] . ' ' . Wo_Time_Elapsed_String($user_profile_data['lastseen']);
                array_push($users_data, $user_profile_data);
            }
        }
    }
    if ($continue == false) {
        $error_code    = 4;
        $error_message = 'User #' . $user_profile_id . ' not found';
    } else {
        $response_data = array(
            'status' => 200,
            'users' => $users_data
        );
    }
}