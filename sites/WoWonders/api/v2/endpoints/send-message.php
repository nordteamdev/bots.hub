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

$required_fields = array(
    'user_id',
    'message_hash_id'
);

if (empty($_POST['text'])) {
	if (empty($_FILES['file']['name']) && empty($_POST['image_url'])) {
	    $error_code    = 3;
	    $error_message = 'file (STREAM FILE) AND text (POST) AND image_url (POST) are missing, at least one is required';
	}
}

foreach ($required_fields as $key => $value) {
    if (empty($_POST[$value]) && empty($error_code)) {
        $error_code    = 4;
        $error_message = $value . ' (POST) is missing';
    }
}


if (empty($error_code)) {
    $recipient_id   = Wo_Secure($_POST['user_id']);
    $recipient_data = Wo_UserData($recipient_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
	    $mediaFilename = '';
        $mediaName     = '';
        if (isset($_FILES['file']['name'])) {
            $fileInfo      = array(
                'file' => $_FILES["file"]["tmp_name"],
                'name' => $_FILES['file']['name'],
                'size' => $_FILES["file"]["size"],
                'type' => $_FILES["file"]["type"]
            );
            $media         = Wo_ShareFile($fileInfo);
            $mediaFilename = $media['filename'];
            $mediaName     = $media['name'];
        }
        if (!empty($_POST['image_url'])) {
        	$fileend = '_url_image';
        	if (!empty($_POST['sticker_id'])) {
        		$fileend =  '_' . Wo_Secure($_POST['sticker_id']);
        	}
            $mediaFilename = Wo_ImportImageFromUrl($_POST['image_url'], $fileend);
        }
        $gif = '';
        if (!empty($_POST['gif'])) {
            if (strpos($_POST['gif'], '.mp4') !== false) {
                $gif = Wo_Secure($_POST['gif']);
            }
        }
    	$message_data = array(
            'from_id' => Wo_Secure($wo['user']['user_id']),
            'to_id' => Wo_Secure($recipient_id),
            'media' => Wo_Secure($mediaFilename),
            'mediaFileName' => Wo_Secure($mediaName),
            'time' => time(),
            'type_two' => (!empty($_POST['contact'])) ? 'contact' : '',
            'text' => '',
            'stickers' => $gif,
        );
		if (!empty($_POST['text'])) {
		 	$message_data['text'] = Wo_Secure($_POST['text']);
		}
        $last_id      = Wo_RegisterMessage($message_data);
        if (!empty($last_id)) {
        	$message_info = array(
                'user_id' => $recipient_id,
                'message_id' => $last_id
            );
            $message_info = Wo_GetMessages($message_info);
            foreach ($non_allowed as $key => $value) {
	           unset($message_info[0]['messageUser'][$value]);
	        }
	        if (empty($wo['user']['timezone'])) {
                $wo['user']['timezone'] = 'UTC';
            }
	        $timezone = new DateTimeZone($wo['user']['timezone']);
	        $messages = array();
	        foreach ($message_info as $key => $message) {
	        	$message['time_text'] = Wo_Time_Elapsed_String($message['time']);
                $message_po           = 'left';
                if ($message['from_id'] == $wo['user']['user_id']) {
                    $message_po = 'right';
                }
                $message['position'] = $message_po;
                $message['type']     = Wo_GetFilePosition($message['media']);
                if ($message['type_two'] == 'contact') {
                    $message['type']   = 'contact';
                }
                $message['type']     = $message_po . '_' . $message['type'];
                $message['file_size'] = 0;
                if (!empty($message['media'])) {
                    $message['file_size'] = '0MB';
                    if (file_exists($message['file_size'])) {
                        $message['file_size'] = Wo_SizeFormat(filesize($message['media']));
                    }
                    $message['media']     = Wo_GetMedia($message['media']);
                }
                if (!empty($message['time'])) {
                    $time_today = time() - 86400;
                    if ($message['time'] < $time_today) {
                        $message['time_text'] = date('m.d.y', $message['time']);
                    } else {
                        $time = new DateTime('now', $timezone);
                        $time->setTimestamp($message['time']);
                        $message['time_text'] = $time->format('H:i');
                    }
                }
                $message['message_hash_id'] = $_POST['message_hash_id'];
                array_push($messages, $message);
	        }
	        if (!empty($messages)) {
	        	$response_data = array(
	                'api_status' => 200,
	                'message_data' => $messages
	            );
	        }
        }
    }
}

