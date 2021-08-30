<?php 
function Wo_SecureData($config = array(), $data = array()) {
    global $non_allowed;
    if (!empty($config['multi_array'])) {
        $final_data = array();
        foreach ($data as $key => $user) {
            foreach ($non_allowed as $key => $value) {
                unset($user[$value]);
            }
            $final_data[] = $user;
        }
        return $final_data;
    } else {
        foreach ($non_allowed as $key => $value) {
            unset($data[$value]);
        }
    }
    return $data;
}

function Wo_UserContactsAPP($limit = 20, $json_contacts = '{}', $user_id = 0) {
    global $wo, $sqlConnect;
    if (empty($json_contacts)) {
        return false;
    }
    $data = array();
    $json_decode = json_decode($json_contacts, true);
    if (!empty($json_decode)) {
        foreach ($json_decode as $key => $contact) {
            $contact_name = Wo_Secure($contact['Key']);
            $contact_phone = Wo_Secure($contact['Value']);
            $contact_phone = str_replace(' ', '', $contact_phone);
            $contact_phone = str_replace('+', '', $contact_phone);
            $contact_phone = str_replace('-', '', $contact_phone);
            $query_one = " SELECT `user_id` FROM " . T_USERS . " WHERE `active` = '1' AND `phone_number` LIKE '%{$contact_phone}%' AND `user_id` NOT IN (SELECT `blocked` FROM " . T_BLOCKS . " WHERE `blocker` = '{$user_id}') AND `user_id` NOT IN (SELECT `blocker` FROM " . T_BLOCKS . " WHERE `blocked` = '{$user_id}') AND `user_id` NOT IN (SELECT `following_id` FROM " . T_FOLLOWERS . " WHERE `follower_id` = {$user_id}) AND `user_id` <> {$user_id} ORDER BY `user_id` DESC LIMIT 1";
            $query = mysqli_query($sqlConnect, $query_one);
            while ($mysqli_fetch = mysqli_fetch_assoc($query)) {
                if (!empty($mysqli_fetch['user_id'])) {
                    $data[] = Wo_UserData($mysqli_fetch['user_id']);
                }
            }
        }
    }
    return $data;
}

function Wo_GetFilePosition($file) {
    $file_type = 'text';
    if (empty($file)) {
        return $file_type;
    }
    $file_extension = pathinfo($file, PATHINFO_EXTENSION);
    if ($file_extension == 'jpg' || $file_extension == 'jpeg' || $file_extension == 'png' || $file_extension == 'gif') {
        $file_type = 'image';
        if (strpos($file, 'sticker') !== false) {
            $file_type = 'sticker';
        }
    } else if ($file_extension == 'mp4' || $file_extension == 'mkv' || $file_extension == 'avi' || $file_extension == 'mov') {
        $file_type = 'video';
    } else if ($file_extension == 'mp3' || $file_extension == 'wav') {
        $file_type = 'audio';
    } else {
        $file_type = 'file';
    }
    return $file_type;
}
?>