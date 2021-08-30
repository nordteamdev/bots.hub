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
$json_error_data     = array();
$json_success_data   = array();
$json_success_data_2 = array();
$json_success_data22 = array();
$type                = Wo_Secure($_GET['type'], 0);
if ($type == 'new_product') {
    if (empty($_POST['user_id'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '3',
                'error_text' => 'No user id sent.'
            )
        );
    } else if (empty($_POST['s'])) {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'api_version' => $api_version,
            'errors' => array(
                'error_id' => '5',
                'error_text' => 'No session sent.'
            )
        );
    } else if ($wo['loggedin'] == false) {
        $json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'api_version' => $api_version,
                'errors' => array(
                    'error_id' => '6',
                    'error_text' => 'Session id is wrong.'
                )
            );
    }
    if (empty($json_error_data)) {
        $user_id         = $_POST['user_id'];
        $s               = Wo_Secure($_POST['s']);
        $user_login_data = Wo_UserData($user_id);
        $wo['lang'] = Wo_LangsFromDB($user_login_data['language']);
        if (empty($user_login_data)) {
            $json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'api_version' => $api_version,
                'errors' => array(
                    'error_id' => '6',
                    'error_text' => 'Username is not exists.'
                )
            );
            header("Content-type: application/json");
            echo json_encode($json_error_data, JSON_PRETTY_PRINT);
            exit();
        }
        if (empty($_POST['name']) || empty($_POST['category']) || empty($_POST['description'])) {
            $errors[] = $error_icon . $wo['lang']['please_check_details'];
        } else if (empty($_POST['price'])) {
            $errors[] = $error_icon . $wo['lang']['please_choose_price'];
        } else if (!is_numeric($_POST['price'])) {
            $errors[] = $error_icon . $wo['lang']['please_choose_c_price'];
        } else if ($_POST['price'] == '0.00') {
            $errors[] = $error_icon . $wo['lang']['please_choose_price'];
        } else if (empty($_FILES['postPhotos']['name'])) {
            $errors[] = $error_icon . $wo['lang']['please_upload_image'];
        }
        if (isset($_FILES['postPhotos']['name'])) {
            $allowed = array(
                'gif',
                'png',
                'jpg',
                'jpeg'
            );
            for ($i = 0; $i < count($_FILES['postPhotos']['name']); $i++) {
                $new_string = pathinfo($_FILES['postPhotos']['name']);
                if (!in_array(strtolower($new_string['extension']), $allowed)) {
                    $errors[] = $error_icon . $wo['lang']['please_check_details'];
                }
            } 
        }
        $type = 0;
        if (!empty($_POST['type'])) {
            $type = 1;
        }
        if (empty($errors)) {
            $price              = Wo_Secure($_POST['price']);
            $product_data_array = array(
                'user_id' => $wo['user']['user_id'],
                'name' => Wo_Secure($_POST['name']),
                'category' => Wo_Secure($_POST['category']),
                'description' => Wo_Secure($_POST['description']),
                'time' => Wo_Secure(time()),
                'price' => $price,
                'type' => $type,
                'location' => Wo_Secure($_POST['location']),
                'active' => Wo_Secure(1)
            );
            $product_data       = Wo_RegisterProduct($product_data_array);
            $product_id         = 0;
            if (!$product_data) {
                $errors[] = $error_icon . $wo['lang']['please_check_details'];
                header("Content-type: application/json");
                echo json_encode(array(
                    'errors' => $errors
                ));
                exit();
            }
            $product_id = $product_data;
            $post_data  = array(
                'user_id' => Wo_Secure($wo['user']['user_id']),
                'product_id' => Wo_Secure($product_id),
                'postPrivacy' => Wo_Secure(0),
                'time' => time()
            );
            $id         = Wo_RegisterPost($post_data);
            if (count($_FILES['postPhotos']) > 0 && !empty($id) && $id > 0) {
                $fileInfo      = array(
                    'file' => $_FILES["postPhotos"]["tmp_name"],
                    'name' => $_FILES['postPhotos']['name'],
                    'size' => $_FILES["postPhotos"]["size"],
                    'type' => $_FILES["postPhotos"]["type"],
                    'types' => 'jpg,png,jpeg,gif'
                );
                $file         = Wo_ShareFile($fileInfo);
                if (!empty($file)) {
                    $media_album = Wo_RegisterProductMedia($product_id, $file['filename']);
                }
            }
            $data = array(
                'status' => 200,
                'href' => Wo_SeoLink('index.php?link1=post&id=' . $id)
            );
        }
        header("Content-type: application/json");
        if (isset($errors)) {
        	$json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'api_version' => $api_version,
                'errors' => $errors
            );
            echo json_encode($json_error_data);
        } else {
            echo json_encode($data);
        }
        exit();  
    } else {
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
header("Content-type: application/json");
echo json_encode($json_success_data22);
exit();
?>