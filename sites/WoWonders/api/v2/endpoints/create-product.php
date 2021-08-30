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
    'product_title',
    'product_category',
    'product_description',
    'product_price',
    'product_location'
);

foreach ($required_fields as $key => $value) {
    if (empty($_POST[$value]) && empty($error_code)) {
        $error_code    = 3;
        $error_message = $value . ' (POST) is missing';
    }
}

if (empty($_FILES['images']['name'])) {
    $error_code    = 3;
    $error_message = 'images (STREAM FILE) is missing';
}


if (empty($error_code)) {
    $product_title       = Wo_Secure($_POST['product_title']);
    $product_category    = Wo_Secure($_POST['product_category']);
    $product_description = Wo_Secure($_POST['product_description']);
    $product_location    = Wo_Secure($_POST['product_location']);
    $product_price       = Wo_Secure($_POST['product_price']);
    $lat       = (!empty($_POST['lat'])) ? Wo_Secure($_POST['lat']) : 0;
    $lng       = (!empty($_POST['lng'])) ? Wo_Secure($_POST['lng']) : 0;
    $product_type        = (!empty($_POST['product_type'])) ? 1 : 0;
    
    if ($product_price == '0.00') {
        $error_code    = 4;
        $error_message = 'Please choose a price for your product';
    } else if (!is_numeric($product_price)) {
        $error_code    = 5;
        $error_message = 'Please choose a correct value for your price';
    }
    
    if (isset($_FILES['images']['name'])) {
        $allowed = array(
            'gif',
            'png',
            'jpg',
            'jpeg'
        );
        for ($i = 0; $i < count($_FILES['images']['name']); $i++) {
            $new_string = pathinfo($_FILES['images']['name']);
            if (!in_array(strtolower($new_string['extension']), $allowed)) {
                $error_code    = 6;
                $error_message = 'Image format is not supported, (jpg, png, gif, jpeg) are supported';
            }
        }
    }
    
    if (empty($error_code)) {
        $product_data = array(
            'user_id' => $wo['user']['user_id'],
            'name' => $product_title,
            'category' => $product_category,
            'description' => $product_description,
            'time' => time(),
            'price' => $product_price,
            'type' => $product_type,
            'location' => $product_location,
            'active' => 1,
            'lat' => $lat ,
            'lng' => $lng
        );
        $last_id      = Wo_RegisterProduct($product_data);
        if ($last_id && is_numeric($last_id)) {
            $post_data = array(
                'user_id' => Wo_Secure($wo['user']['user_id']),
                'product_id' => Wo_Secure($last_id),
                'postPrivacy' => 0,
                'time' => time()
            );
            $post_id   = Wo_RegisterPost($post_data);
            if (count($_FILES['images']) > 0 && !empty($post_id) && $post_id > 0) {
                $fileInfo = array(
                    'file' => $_FILES["images"]["tmp_name"],
                    'name' => $_FILES['images']['name'],
                    'size' => $_FILES["images"]["size"],
                    'type' => $_FILES["images"]["type"],
                    'types' => 'jpg,png,jpeg,gif'
                );
                $file     = Wo_ShareFile($fileInfo, 1);
                if (!empty($file)) {
                    $media_album = Wo_RegisterProductMedia($last_id, $file['filename']);
                }
            }
            $response_data = array(
                'api_status' => 200,
                'product_id' => $last_id,
                'product_post_id' => $post_id
            );
        }
    }
}