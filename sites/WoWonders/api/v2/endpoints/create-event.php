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
$response_data   = array(
    'api_status' => 400
);

$required_fields = array(
    'event_name',
    'event_location',
    'event_description',
    'event_start_date',
    'event_end_date',
    'event_start_time',
    'event_end_time'
);

foreach ($required_fields as $key => $value) {
    if (empty($_POST[$value]) && empty($error_code)) {
        $error_code    = 3;
        $error_message = $value . ' (POST) is missing';
    }
}

if (empty($error_code)) {
    $event_name        = Wo_Secure($_POST['event_name']);
    $event_location    = Wo_Secure($_POST['event_location']);
    $event_description = Wo_Secure($_POST['event_description']);
    $event_start_date  = Wo_Secure($_POST['event_start_date']);
    $event_end_date    = Wo_Secure($_POST['event_end_date']);
    $event_start_time  = Wo_Secure($_POST['event_start_time']);
    $event_end_time    = Wo_Secure($_POST['event_end_time']);
    
    if (strlen($event_name) < 5) {
        $error_code    = 4;
        $error_message = 'Title should be more than 10 characters';
    } else if (strlen($event_description) < 10) {
        $error_code    = 5;
        $error_message = 'Description should be more than 10 characters';
    }
    
    if (empty($error_code)) {
        $event_data = array(
            'name' => $event_name,
            'location' => $event_location,
            'description' => $event_description,
            'start_date' => $event_start_date,
            'start_time' => $event_start_time,
            'end_date' => $event_end_date,
            'end_time' => $event_end_time,
            'poster_id' => $wo['user']['id']
        );
        $last_id    = Wo_InsertEvent($event_data);
        if ($last_id && is_numeric($last_id)) {
            if (!empty($_FILES["event_cover"]["tmp_name"])) {
                $temp_name = $_FILES["event_cover"]["tmp_name"];
                $file_name = $_FILES["event_cover"]["name"];
                $file_type = $_FILES['event_cover']['type'];
                $file_size = $_FILES["event_cover"]["size"];
                Wo_UploadImage($temp_name, $file_name, 'cover', $file_type, $last_id, 'event');
            }
            $response_data = array(
                'api_status' => 200,
                'event_id' => $last_id
            );
        }
    }
}