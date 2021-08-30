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
/* Script Main Functions (File 3) */

function Wo_RegisterPoint($post_id, $type, $action = '+'){
    global $wo, $sqlConnect;
    if ($wo['config']['point_level_system'] == 0 ){
        return false;
    }
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    if (empty($type)) {
        return false;
    }
    $user_id = Wo_Secure( $wo["user"]["id"] );
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }

    $points = 0;
    $dollar_to_point_cost = $wo['config']['dollar_to_point_cost'];

    switch ($type) {
        case "comments":
            $query_comments     = "SELECT `id` FROM `" . T_COMMENTS . "` WHERE `post_id` = ".$post_id." AND `user_id` = ".$user_id;
            $sql_query_comments = mysqli_query($sqlConnect, $query_comments);
            if ($sql_query_comments->num_rows == 1) {
                $points = $wo['config']['comments_point'];
            }
            break;
        case "likes":
            if( !Wo_IsWondered($post_id, $user_id) ){
                $points = $wo['config']['likes_point'];
            }
            break;
        case "dislikes":
            if( !Wo_IsLiked($post_id, $user_id) ){
                $points = $wo['config']['dislikes_point'];
            }
            break;
        case "wonders":
            if( !Wo_IsLiked($post_id, $user_id) ){
                $points = $wo['config']['wonders_point'];
            }
            break;
        case "reaction":
                $points = $wo['config']['reaction_point'];
            break;
        case "createpost":
            $points = $wo['config']['createpost_point'];
            break;
        default:
            $points = 0;
            break;
    }

    if( $points == 0 ){ 
        return false;
    }
    
    $wallet = $points / $dollar_to_point_cost;

    $user_data = Wo_UserData($user_id);

    $points_amount = 0;
    $wallet_amount = 0;
    $balance_amount = 0;

    if ( $action == '+' ) {
        $points_amount = ($user_data['points'] + $points);
        $wallet_amount = max(($user_data['wallet'] + $wallet),0);
        $balance_amount = max(($user_data['balance'] + $wallet),0);
    } else if ($action == '-') {
        $points_amount =($user_data['points'] - $points);
        $wallet_amount = max(($user_data['wallet'] - $wallet),0);
        $balance_amount = max(($user_data['balance'] - $wallet),0);
    }

    $query_one = "";
    if ($wo['config']['point_allow_withdrawal'] == 1 ){
        $query_one = "UPDATE " . T_USERS . " SET `points` = '{$points_amount}', `balance` = '{$balance_amount}' WHERE `user_id` = {$user_id} ";
    }else{
        $query_one = "UPDATE " . T_USERS . " SET `points` = '{$points_amount}', `wallet` = '{$wallet_amount}' WHERE `user_id` = {$user_id} ";
    }

    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
}

function logData($data) {
    file_put_contents('upload/log.txt', $data . PHP_EOL, FILE_APPEND);
}

function Wo_RegisterProductMedia($id, $media) {
    global $wo, $sqlConnect;
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    if (empty($media)) {
        return false;
    }
    $query_one = mysqli_query($sqlConnect, "INSERT INTO " . T_PRODUCTS_MEDIA . " (`product_id`,`image`) VALUES ({$id}, '{$media}')");
    if ($query_one) {
        return true;
    }
}
function Wo_IsUrl($uri) {
    if (empty($uri)) {
        return false;
    }
    if (filter_var($uri, FILTER_VALIDATE_URL)) {
        return true;
    }
    return false;
}
function Wo_RegisterProduct($registration_data) {
    global $wo, $sqlConnect;
    if (empty($registration_data)) {
        return false;
    }
    if (!empty($registration_data['description'])) {
        $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
        $i          = 0;
        preg_match_all($link_regex, $registration_data['description'], $matches);
        foreach ($matches[0] as $match) {
            $match_url                        = strip_tags($match);
            $syntax                           = '[a]' . urlencode($match_url) . '[/a]';
            $registration_data['description'] = str_replace($match, $syntax, $registration_data['description']);
        }
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_PRODUCTS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_GetProduct($id = 0) {
    global $wo, $sqlConnect;
    $data = array();
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    $query_one    = " SELECT * FROM " . T_PRODUCTS . " WHERE `id` = '{$id}' ORDER BY `id` DESC";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    if (empty($fetched_data)) {
        return array();
    }
    $fetched_data['images']           = Wo_GetProductImages($fetched_data['id']);
    $fetched_data['time_text']        = Wo_Time_Elapsed_String($fetched_data['time']);
    $fetched_data['post_id']          = Wo_GetPostIDFromProdcutID($fetched_data['id']);
    $fetched_data['edit_description'] = Wo_EditMarkup(br2nl($fetched_data['description'], true, false, false));
    $fetched_data['description']      = Wo_Markup($fetched_data['description'], true, false, false);
    $fetched_data['url']              = Wo_SeoLink('index.php?link1=post&id=' . $fetched_data['post_id']);
    return $fetched_data;
}
function Wo_GetProductImages($id = 0) {
    global $wo, $sqlConnect;
    $data      = array();
    $id        = Wo_Secure($id);
    $query_one = "SELECT `id`,`image`,`product_id` FROM " . T_PRODUCTS_MEDIA . " WHERE `product_id` = {$id} ORDER BY `id` DESC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $explode2                  = @end(explode('.', $fetched_data['image']));
        $explode3                  = @explode('.', $fetched_data['image']);
        $fetched_data['image_org'] = $explode3[0] . '_small.' . $explode2;
        $fetched_data['image_org'] = Wo_GetMedia($fetched_data['image_org']);
        $fetched_data['image']     = Wo_GetMedia($fetched_data['image']);
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_ProductImageData($data = array()) {
    global $wo, $sqlConnect;
     if (!empty($data['id'])) {
        if (is_numeric($data['id'])) {
            $id = Wo_Secure($data['id']);
        }
    }
    $order_by = '';
    if (!empty($data['after_image_id']) && is_numeric($data['after_image_id'])) {
        $data['after_image_id'] = Wo_Secure($data['after_image_id']);
        $subquery               = " `id` <> " . $data['after_image_id'] . " AND `id` < " . $data['after_image_id'];
        $order_by               = 'DESC';
    }
    
    else if (!empty($data['before_image_id']) && is_numeric($data['before_image_id'])) {
        $data['before_image_id'] = Wo_Secure($data['before_image_id']);
        $subquery                = " `id` <> " . $data['before_image_id'] . " AND `id` > " . $data['before_image_id'];
        $order_by                = 'ASC';
    }
    
    else {
        $subquery = " `id` = '{$id}'";
    }
    if (!empty($data['post_id']) && is_numeric($data['post_id'])) {
        $data['post_id'] = Wo_Secure($data['post_id']);
        $subquery .= " AND `post_id` = " . $data['post_id'];
    }
    if (!empty($data['product_id']) && is_numeric($data['product_id'])) {
        $data['product_id'] = Wo_Secure($data['product_id']);
        $subquery .= " AND `product_id` = " . $data['product_id'];
    }
    $query_one    = "SELECT * FROM " . T_PRODUCTS_MEDIA . " WHERE $subquery ORDER by `id` {$order_by}";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    if (!empty($fetched_data)) {
        $fetched_data['image_org'] = Wo_GetMedia($fetched_data['image']);
    }
    return $fetched_data;
}
function Wo_GetWelcomeFileds() {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT * FROM " . T_FIELDS . " WHERE `registration_page` = '1' ORDER BY `id` ASC";
    $sql       = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $fetched_data['fid'] = 'fid_' . $fetched_data['id'];
        $fetched_data['name'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['name']);
        $fetched_data['description'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['description']);
        $fetched_data['type'] = preg_replace_callback("/{{LANG (.*?)}}/", function($m) use ($wo) {
            return (isset($wo['lang'][$m[1]])) ? $wo['lang'][$m[1]] : '';
        }, $fetched_data['type']);
        $data[]               = $fetched_data;
    }
    return $data;
}
function Wo_MarkPostAsSold($post_id = 0, $product_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $post_id = Wo_Secure($post_id);
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 1) {
        return false;
    }
    if (empty($product_id) || !is_numeric($product_id) || $product_id < 1) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 1) {
        return false;
    }
    if (Wo_PostExists($post_id) === false) {
        return false;
    }
    if (Wo_IsPostOnwer($post_id, $user_id) === false) {
        return false;
    }
    if (Wo_IsProductSold($product_id)) {
        return false;
    }
    $query_text = "UPDATE " . T_PRODUCTS . " SET `status` = '1' WHERE `id` = '{$product_id}'";
    $query_two  = mysqli_query($sqlConnect, $query_text);
    if ($query_two) {
        return true;
    }
}
function Wo_IsProductSold($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id            = Wo_Secure($id);
    $query_one     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as `count` FROM " . T_PRODUCTS . " WHERE `id` = {$id} AND `status` = '1'");
    $sql_query_one = mysqli_fetch_assoc($query_one);
    return ($sql_query_one['count'] == 1) ? true : false;
}
function Wo_GetPostIDFromProdcutID($id) {
    global $sqlConnect;
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    $id            = Wo_Secure($id);
    $query_one     = "SELECT `id` FROM " . T_POSTS . " WHERE `product_id` = '{$id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
    return $sql_fetch_one['id'];
}
function Wo_UpdateProductData($product_id, $update_data) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($product_id) || !is_numeric($product_id) || $product_id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $product_id = Wo_Secure($product_id);
    $post_id    = Wo_GetPostIDFromProdcutID($product_id);
    if (empty($post_id)) {
        return false;
    }
    if (Wo_IsPostOnwer($post_id, $wo['user']['user_id']) === false) {
        return false;
    }
    $update = array();
    if (!empty($update_data['description'])) {
        $link_regex = '/(http\:\/\/|https\:\/\/|www\.)([^\ ]+)/i';
        $i          = 0;
        preg_match_all($link_regex, $update_data['description'], $matches);
        foreach ($matches[0] as $match) {
            $match_url                  = strip_tags($match);
            $syntax                     = '[a]' . urlencode($match_url) . '[/a]';
            $update_data['description'] = str_replace($match, $syntax, $update_data['description']);
        }
    }
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = " UPDATE " . T_PRODUCTS . " SET {$impload} WHERE `id` = {$product_id}";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_GetProducts($filter_data = array()) {
    global $wo, $sqlConnect;
    $data      = array();
    $query_one = " SELECT `id`, `user_id` FROM " . T_PRODUCTS . " WHERE status <> '1'";
    if (!empty($filter_data['c_id'])) {
        $category = $filter_data['c_id'];
        $query_one .= " AND `category` = '{$category}'";
    }
    if (!empty($filter_data['after_id'])) {
        if (is_numeric($filter_data['after_id'])) {
            $after_id = Wo_Secure($filter_data['after_id']);
            $query_one .= " AND `id` < '{$after_id}' AND `id` <> $after_id";
        }
    }
    if (!empty($filter_data['keyword'])) {
        $keyword = Wo_Secure($filter_data['keyword']);
        $query_one .= " AND `name` LIKE '%{$keyword}%'";
    }
    if (!empty($filter_data['user_id'])) {
        $user_id = Wo_Secure($filter_data['user_id']);
        $query_one .= " AND `user_id` = '{$user_id}'";
    }
    if (!empty($filter_data['order_by']) && $filter_data['order_by'] == 'price_low' && !empty($filter_data['price'])) {
        $price = Wo_Secure($filter_data['price']);
        $query_one .= " AND `price` >= '{$price}'";
    }
    else if (!empty($filter_data['order_by']) && $filter_data['order_by'] == 'price_high' && !empty($filter_data['price'])) {

        $price = Wo_Secure($filter_data['price']);
        $query_one .= " AND `price` <= '{$price}'";
    }
    if (!empty($filter_data['length'])) {
        $user_lat     = $wo['user']['lat'];
        $user_lng     = $wo['user']['lng'];
        $unit   = 6371;
        $query_one = " AND status <> '1'";
        $distance = Wo_Secure($filter_data['length']);
        if (!empty($filter_data['c_id'])) {
            $category = $filter_data['c_id'];
            $query_one .= " AND `category` = '{$category}'";
        }
        if (!empty($filter_data['after_id'])) {
            if (is_numeric($filter_data['after_id'])) {
                $after_id = Wo_Secure($filter_data['after_id']);
                $query_one .= " AND `id` < '{$after_id}' AND `id` <> $after_id";
            }
        }
        if (!empty($filter_data['keyword'])) {
            $keyword = Wo_Secure($filter_data['keyword']);
            $query_one .= " AND `name` LIKE '%{$keyword}%'";
        }
        if (!empty($filter_data['user_id'])) {
            $user_id = Wo_Secure($filter_data['user_id']);
            $query_one .= " AND `user_id` = '{$user_id}'";
        }

        $query_one  = "SELECT `id`, `user_id`, ( {$unit} * acos(cos(radians('$user_lat'))  * 
        cos(radians(lat)) * cos(radians(lng) - radians('$user_lng')) + 
        sin(radians('$user_lat')) * sin(radians(lat ))) ) AS distance 
        FROM " . T_PRODUCTS . " WHERE `lat` <> 0 AND `lng` <> 0 $query_one
        HAVING distance < '$distance'";
    }
    if (!empty($filter_data['order_by']) && $filter_data['order_by'] == 'price_low') {
        $query_one .= " ORDER BY `price` ASC";
    }
    else if (!empty($filter_data['order_by']) && $filter_data['order_by'] == 'price_high') {
        $query_one .= " ORDER BY `price` DESC";
    }
    else{
        $query_one .= " ORDER BY `id` DESC";
    }
    
    if (!empty($filter_data['limit'])) {
        if (is_numeric($filter_data['limit'])) {
            $limit = Wo_Secure($filter_data['limit']);
            $query_one .= " LIMIT {$limit}";
        }
    }
    $sql = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $products           = Wo_GetProduct($fetched_data['id']);
        $products['seller'] = Wo_UserData($fetched_data['user_id']);
        $data[]             = $products;
    }
    return $data;
}
function Wo_AddOption($post_id, $text) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($post_id) || !is_numeric($post_id) || $post_id < 0) {
        return false;
    }
    if (empty($text)) {
        return false;
    }
    $post_id   = Wo_Secure($post_id);
    $text      = Wo_Secure($text);
    $time      = time();
    $query_one = "INSERT INTO " . T_POLLS . " (`post_id`, `text`, `time`) VALUES ('{$post_id}', '{$text}', '{$time}')";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_GetPostOptions($post_id = 0) {
    global $sqlConnect;
    if (empty($post_id) or !is_numeric($post_id) or $post_id < 1) {
        return false;
    }
    $data          = array();
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT * FROM " . T_POLLS . " WHERE `post_id` = '{$post_id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = $fetched_data;
    }
    return $data;
}
function Wo_GetPostIDFromOptionID($id) {
    global $sqlConnect;
    if (empty($id) or !is_numeric($id) or $id < 1) {
        return false;
    }
    $id            = Wo_Secure($id);
    $query_one     = "SELECT `post_id` FROM " . T_POLLS . " WHERE `id` = '{$id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $sql_fetch_one = mysqli_fetch_assoc($sql_query_one);
    return $sql_fetch_one['post_id'];
}
function Wo_VoteUp($option_id = 0, $user_id = 0) {
    global $sqlConnect;
    if (empty($user_id) or !is_numeric($user_id) or $user_id < 1) {
        return false;
    }
    if (empty($option_id) or !is_numeric($option_id) or $option_id < 1) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $option_id = Wo_Secure($option_id);
    $post_id   = Wo_GetPostIDFromOptionID($option_id);
    if (empty($post_id)) {
        return false;
    }
    if (Wo_IsPostVoted($post_id, $user_id)) {
        return false;
    }
    if (Wo_IsOptionVoted($option_id, $user_id)) {
        return false;
    }
    $fields    = '(`option_id`, `user_id`, `post_id`)';
    $query_one = "INSERT INTO " . T_VOTES . " {$fields} VALUES ('{$option_id}', '{$user_id}', '{$post_id}')";
    $sql       = mysqli_query($sqlConnect, $query_one);
    if ($sql) {
        return true;
    }
}
function Wo_IsOptionVoted($option_id, $user_id) {
    global $wo, $sqlConnect;
    if (empty($user_id) || empty($option_id)) {
        return false;
    }
    if (!is_numeric($option_id)) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $option_id = Wo_Secure($option_id);
    $query_one = "SELECT COUNT(id) as count FROM " . T_VOTES . " WHERE `option_id` = '{$option_id}' AND `user_id` = '{$user_id}'";
    $sql       = mysqli_query($sqlConnect, $query_one);
    $sql_fetch = mysqli_fetch_assoc($sql);
    if ($sql_fetch['count'] > 0) {
        return true;
    }
    return false;
}
function Wo_IsPostVoted($post_id, $user_id) {
    global $wo, $sqlConnect;
    if (empty($user_id) || empty($post_id)) {
        return false;
    }
    if (!is_numeric($post_id)) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $post_id   = Wo_Secure($post_id);
    $query_one = "SELECT COUNT(id) as count FROM " . T_VOTES . " WHERE `post_id` = '{$post_id}' AND `user_id` = '{$user_id}'";
    $sql       = mysqli_query($sqlConnect, $query_one);
    $sql_fetch = mysqli_fetch_assoc($sql);
    if ($sql_fetch['count'] > 0) {
        return true;
    }
    return false;
}
function Ju_GetPercentageOfOptionPost($post_id) {
    global $wo, $sqlConnect;
    if (empty($post_id)) {
        return false;
    }
    if (!is_numeric($post_id)) {
        return false;
    }
    $data          = array();
    $post_id       = Wo_Secure($post_id);
    $query_one     = "SELECT * FROM " . T_POLLS . " WHERE `post_id` = '{$post_id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $all           = 0;
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $fetched_data['option_votes'] = Wo_GetVotes($fetched_data['id']);
        $data[]                       = $fetched_data;
    }
    foreach ($data as $key => $value) {
        $all += $value['option_votes'];
    }
    $percentage_total = $all;
    foreach ($data as $key => $value) {
        $percentage                   = 0;
        $data[$key]['percentage']     = '0%';
        $data[$key]['percentage_num'] = 0;
        $data[$key]['all']            = $all;
        if ($percentage_total > 0) {
            $data[$key]['percentage']     = number_format(($value['option_votes'] / $percentage_total) * 100) . '%';
            $data[$key]['percentage_num'] = number_format(($value['option_votes'] / $percentage_total) * 100);
            $data[$key]['all']            = $all;
        }
    }
    return $data;
}
function Wo_GetVotes($option_id) {
    global $wo, $sqlConnect;
    if (empty($option_id) || !is_numeric($option_id)) {
        return false;
    }
    $data         = array();
    $option_id    = Wo_Secure($option_id);
    $query_one    = "SELECT COUNT(id) as count FROM " . T_VOTES . " WHERE `option_id` = {$option_id}";
    $sql          = mysqli_query($sqlConnect, $query_one);
    $fetched_data = mysqli_fetch_assoc($sql);
    if (empty($fetched_data)) {
        return array();
    }
    return $fetched_data['count'];
}
function Wo_GetCustomPages() {
    global $sqlConnect;
    $data          = array();
    $query_one     = "SELECT * FROM " . T_CUSTOM_PAGES . " ORDER BY `id` DESC";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_GetCustomPage($fetched_data['page_name']);
    }
    return $data;
}
function Wo_GetCustomPage($page_name) {
    global $sqlConnect;
    if (empty($page_name)) {
        return false;
    }
    $data          = array();
    $page_name     = Wo_Secure($page_name);
    $query_one     = "SELECT * FROM " . T_CUSTOM_PAGES . " WHERE `page_name` = '{$page_name}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    return $fetched_data;
}
function Wo_RegisterNewPage($registration_data) {
    global $wo, $sqlConnect;
    if (empty($registration_data)) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_CUSTOM_PAGES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return true;
    }
    return false;
}
function Wo_DeleteCustomPage($id) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $id    = Wo_Secure($id);
    $query = mysqli_query($sqlConnect, "DELETE FROM " . T_CUSTOM_PAGES . " WHERE `id` = {$id}");
    if ($query) {
        return true;
    }
    return false;
}
function Wo_UpdateCustomPageData($id, $update_data) {
    global $wo, $sqlConnect, $cache;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id) || !is_numeric($id) || $id < 0) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    $id = Wo_Secure($id);
    if (Wo_IsAdmin() === false) {
        return false;
    }
    $update = array();
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_CUSTOM_PAGES . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_GetReferrers($user_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id)) {
        $user_id = Wo_Secure($wo['user']['user_id']);
    } else {
        $user_id = Wo_Secure($user_id);
    }
    $data          = array();
    $query_one     = "SELECT * FROM " . T_USERS . " WHERE `referrer` = '{$user_id}' ORDER BY `user_id` DESC";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_UpdateBalance($user_id = 0, $balance = 0, $type = '+') {
    global $wo, $sqlConnect;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if (empty($balance)) {
        return false;
    }
    $user_id   = Wo_Secure($user_id);
    $balance   = Wo_Secure($balance);
    $user_data = Wo_UserData($user_id);
    if ($type == '+') {
        $balance = ($user_data['balance'] + $balance);
    } else {
        $balance = ($user_data['balance'] - $balance);
    }
    $query_one = "UPDATE " . T_USERS . " SET `balance` = '{$balance}' WHERE `user_id` = {$user_id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_RequestNewPayment($user_id = 0, $amount = 0) {
    global $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    if (empty($amount)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $amount  = Wo_Secure($amount);
    if (Wo_IsUserPaymentRequested($user_id) === true) {
        return false;
    }
    $user_data   = Wo_UserData($user_id);
    $full_amount = Wo_Secure($user_data['balance']);
    $time        = time();
    $query_text  = "INSERT INTO " . T_A_REQUESTS . " (`user_id`, `amount`, `full_amount`, `time`) VALUES ('$user_id', '$amount', '$full_amount', '$time')";
    $query       = mysqli_query($sqlConnect, $query_text);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_IsUserPaymentRequested($user_id = 0) {
    global $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $query   = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) FROM " . T_A_REQUESTS . " WHERE `user_id` = '{$user_id}' AND status = '0'");
    return (Wo_Sql_Result($query, 0) == 1) ? true : false;
}
function Wo_GetPaymentsHistory($user_id = 0) {
    global $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    $user_id       = Wo_Secure($user_id);
    $data          = array();
    $query_one     = "SELECT `id` FROM " . T_A_REQUESTS . " WHERE `user_id` = '{$user_id}' ORDER BY `id` DESC";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_GetPaymentHistory($fetched_data['id']);
    }
    return $data;
}
function Wo_GetAllPaymentsHistory($type = 0) {
    global $sqlConnect;
    $type  = Wo_Secure($type);
    $data  = array();
    $where = "";
    if ($type != 'all') {
        $where = "WHERE `status` = '{$type}'";
    }
    $query_one     = "SELECT * FROM " . T_A_REQUESTS . " {$where} ORDER BY `id` DESC";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data[] = Wo_GetPaymentHistory($fetched_data['id']);
    }
    return $data;
}
function Wo_CountPaymentHistory($id) {
    global $sqlConnect;
    $data          = array();
    $id            = Wo_Secure($id);
    $query_one     = "SELECT COUNT(`id`) as count FROM " . T_A_REQUESTS . " WHERE `status` = '{$id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    return $fetched_data['count'];
}
function Wo_GetPaymentHistory($id) {
    global $sqlConnect, $wo;
    if (empty($id)) {
        return false;
    }
    $data                         = array();
    $id                           = Wo_Secure($id);
    $query_one                    = "SELECT * FROM " . T_A_REQUESTS . " WHERE `id` = '{$id}'";
    $sql_query_one                = mysqli_query($sqlConnect, $query_one);
    $fetched_data                 = mysqli_fetch_assoc($sql_query_one);
    $fetched_data['user']         = Wo_UserData($fetched_data['user_id']);
    $fetched_data['total_refs']   = Wo_CountRefs($fetched_data['user_id']);
    $fetched_data['time_text']    = Wo_Time_Elapsed_String($fetched_data['time']);
    $fetched_data['callback_url'] = $wo['config']['site_url'] . '/' . 'requests.php?f=admincp&paid_user_id=' . $fetched_data['user_id'] . '&paid_ref_id=' . $fetched_data['id'];
    return $fetched_data;
}
function Wo_CountRefs($user_id = 0) {
    global $sqlConnect;
    $data          = array();
    $user_id       = Wo_Secure($user_id);
    $query_one     = "SELECT COUNT(`user_id`) as count FROM " . T_USERS . " WHERE `referrer` = '{$user_id}'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    return $fetched_data['count'];
}
function Wo_InsertBlog($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_BLOG . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_RegisterBlogComment($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_BLOG_COMM . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_RegisterBlogCommentReply($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_BLOG_COMM_REPLIES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_GetBlogCommentsCount($id) {
    global $sqlConnect, $wo;
    $is_owner = false;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $count        = 0;
    $sql          = "SELECT COUNT(`id`) as blogComments FROM " . T_BLOG_COMM . " WHERE `blog_id` = '$id'";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    $count += $fetched_data['blogComments'];
    $sql          = "SELECT COUNT(`id`) as blogComments FROM " . T_BLOG_COMM_REPLIES . " WHERE `blog_id` = '$id'";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    return $count + $fetched_data['blogComments'];
}
function Wo_GetBlogComments($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "id" => false,
        "offset" => 0,
        "blog_id" => false
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $id        = Wo_Secure($args['id']);
    $blog_id   = Wo_Secure($args['blog_id']);
    $query_one = '';
    $data      = array();
    if ($offset > 0) {
        $query_one .= " AND `id` > {$offset} AND `id` <> {$offset} ";
    }
    if ($id && $id > 0 && is_numeric($id)) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($blog_id && $blog_id > 0 && is_numeric($blog_id)) {
        $query_one .= " AND `blog_id` = '$blog_id' ";
    }
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM  " . T_BLOG_COMM . " WHERE `id` > 0 {$query_one} ORDER BY `id` DESC LIMIT 10");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $comment = Wo_GetBlogCommentData($fetched_data['id']);
        if ($comment && !empty($comment)) {
            $data[] = $comment;
        }
    }
    return $data;
}
function Wo_GetBlogCommLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as blogCommentLikes FROM " . T_BM_LIKES . " WHERE `blog_comm_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['blogCommentLikes'];
    }
    return $likes;
}
function Wo_GetBlogCommReplyLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as blogCommentReplyLikes FROM " . T_BM_LIKES . " WHERE `blog_commreply_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['blogCommentReplyLikes'];
    }
    return $likes;
}
function Wo_GetBlogCommReplyDisLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as blogCommentReplyDisLikes FROM " . T_BM_DISLIKES . " WHERE `blog_commreply_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['blogCommentReplyDisLikes'];
    }
    return $likes;
}
function Wo_GetBlogCommDisLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as blogCommentDisLikes FROM " . T_BM_DISLIKES . " WHERE `blog_comm_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['blogCommentDisLikes'];
    }
    return $likes;
}
function Wo_GetBlogCommentReplies($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "id" => false,
        "comm_id" => false
    );
    $args      = array_merge($options, $args);
    $id        = Wo_Secure($args['id']);
    $comm_id   = Wo_Secure($args['comm_id']);
    $query_one = '';
    $data      = array();
    if ($id && $id > 0 && is_numeric($id)) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($comm_id && $comm_id > 0 && is_numeric($comm_id)) {
        $query_one .= " AND `comm_id` = '$comm_id' ";
    }
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM  " . T_BLOG_COMM_REPLIES . " WHERE `id` > 0 {$query_one} ORDER BY `id` ASC");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $comment = Wo_GetBlogCommReplyData($fetched_data['id']);
        if ($comment && !empty($comment)) {
            $data[] = $comment;
        }
    }
    return $data;
}
function Wo_IsBlogCommentOwner($id) {
    global $sqlConnect, $wo;
    $is_owner = false;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_BLOG_COMM . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    if (!empty($fetched_data) && is_array($fetched_data)) {
        if ($fetched_data['user_id'] == $wo['user']['id'] || $wo['user']['admin'] == 1) {
            $is_owner = true;
        }
    }
    return $is_owner;
}
function Wo_IsBlogCommReplyOwner($id) {
    global $sqlConnect, $wo;
    $is_owner = false;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_BLOG_COMM_REPLIES . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    if (!empty($fetched_data) && is_array($fetched_data)) {
        if ($fetched_data['user_id'] == $wo['user']['id'] || $wo['user']['admin'] == 1) {
            $is_owner = true;
        }
    }
    return $is_owner;
}
function Wo_GetBlogCommentData($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_BLOG_COMM . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    $data         = false;
    if (!empty($fetched_data)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['is_owner']  = Wo_IsBlogCommentOwner($fetched_data['id']);
        $fetched_data['likes']     = Wo_GetBlogCommLikes($fetched_data['id']);
        $fetched_data['dislikes']  = Wo_GetBlogCommDisLikes($fetched_data['id']);
        $fetched_data['replies']   = Wo_GetBlogCommentReplies(array(
            'comm_id' => $fetched_data['id']
        ));
        $data                      = $fetched_data;
    }
    return $data;
}
function Wo_GetBlogCommReplyData($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_BLOG_COMM_REPLIES . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    $data         = false;
    if (!empty($fetched_data)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['is_owner']  = Wo_IsBlogCommReplyOwner($fetched_data['id']);
        $fetched_data['likes']     = Wo_GetBlogCommReplyLikes($fetched_data['id']);
        $fetched_data['dislikes']  = Wo_GetBlogCommReplyDisLikes($fetched_data['id']);
        $data                      = $fetched_data;
    }
    return $data;
}
function Wo_IsBlogCommentLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_LIKES . " WHERE `blog_comm_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_IsBlogCommentDisLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_DISLIKES . " WHERE `blog_comm_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_IsBlogCommentReplyDisLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_DISLIKES . " WHERE `blog_commreply_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_IsBlogCommentReplyLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_LIKES . " WHERE `blog_commreply_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_RemoveBlogCommentLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_LIKES . " WHERE `blog_comm_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_RemoveBlogCommentReplyLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_LIKES . " WHERE `blog_commreply_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_RemoveBlogCommentReplyDisLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_DISLIKES . " WHERE `blog_commreply_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_RemoveBlogCommentDisLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_DISLIKES . " WHERE `blog_comm_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_AddBlogCommentLikes($id, $blog) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$blog || !is_numeric($blog)) {
        return false;
    }
    $id      = Wo_Secure($id);
    $blog    = Wo_Secure($blog);
    $comment = Wo_GetBlogCommentData($id);
    $result  = false;
    $user    = $wo['user']['id'];
    @Wo_RemoveBlogCommentDisLikes($id);
    if ($comment && !empty($comment) && !Wo_IsBlogCommentLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_LIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`,`movie_commreply_id`, `user_id`,`blog_id`) 
                        VALUES (NULL, '$id', '0', '0', '0', '$user','$blog')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
        }
    } else if ($comment && !empty($comment) && Wo_RemoveBlogCommentLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_AddBlogCommReplyLikes($id, $blog) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$blog || $blog < 1) {
        return false;
    }
    $id      = Wo_Secure($id);
    $blog    = Wo_Secure($blog);
    $comment = Wo_GetBlogCommReplyData($id);
    $result  = false;
    $user    = $wo['user']['id'];
    if ($comment && !empty($comment) && !Wo_IsBlogCommentReplyLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_LIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`, `movie_commreply_id`, `user_id`, `blog_id`) 
                        VALUES (NULL, '0', '$id','0','0', '$user','$blog')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
            @Wo_RemoveBlogCommentReplyDisLikes($id);
        }
    } else if ($comment && !empty($comment) && Wo_RemoveBlogCommentReplyLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_DeleteBlogComment($id, $blog = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !Wo_IsBlogCommentOwner($id)) {
        return false;
    }
    $blog_id = Wo_Secure($blog);
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG_COMM_REPLIES . " WHERE `comm_id` = '$id'");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_LIKES . " WHERE `blog_id` = '$blog_id' AND `blog_comm_id` = '$id'");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_DISLIKES . " WHERE `blog_id` = '$blog_id' AND `blog_comm_id` = '$id'");
    return mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG_COMM . " WHERE `id` = '$id'");
}
function Wo_DeleteBlogCommReply($id, $blog = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !Wo_IsBlogCommReplyOwner($id) || !$blog || $blog < 1) {
        return false;
    }
    $blog_id = Wo_Secure($blog);
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_LIKES . " WHERE `blog_id` = '$blog_id'    AND `blog_commreply_id` = '$id'");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_DISLIKES . " WHERE `blog_id` = '$blog_id' AND `blog_commreply_id` = '$id'");
    return mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG_COMM_REPLIES . " WHERE `id` = '$id'");
}
function Wo_IsBlogOwner($blog_id = 0, $user_id = 0) {
    global $sqlConnect, $wo;
    if (empty($blog_id)) {
        return false;
    }
    if (empty($user_id)) {
        $user_id = $wo['user']['user_id'];
    }
    $user_id = Wo_Secure($user_id);
    $blog_id = Wo_Secure($blog_id);
    $query   = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as count FROM " . T_BLOG . " WHERE `user` = {$user_id} AND `id` = $blog_id");
    $query_  = mysqli_fetch_assoc($query);
    return ($query_['count'] > 0) ? true : false;
}
function Wo_UpdateBlog($id = 0, $update_data = array()) {
    global $sqlConnect, $wo;
    $update = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $id = Wo_Secure($id);
    if (Wo_IsBlogOwner($id) === false) {
        return false;
    }
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0, false) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_BLOG . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_GetMyBlogs($user = 0, $offset = 0) {
    global $sqlConnect, $wo;
    $data = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    $after_blogs = '';
    if ($offset > 0) {
        $after_blogs = " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    $user   = Wo_Secure($user);
    $offset = Wo_Secure($offset);
    $t_blog = T_BLOG;
    $query  = mysqli_query($sqlConnect, "SELECT * FROM  `$t_blog` WHERE `user` = '$user' {$after_blogs} ORDER BY `id` DESC LIMIT 10");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_GetArticle($fetched_data['id']);
    }

    return $data;
}
function Wo_GetBlogs($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "category" => false,
        "offset" => 0,
        "limit" => 10,
        'order_by' => 'DESC',
        'user_id' => 0,
        'id' => '0',
        'keyword' => ''
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $limit     = Wo_Secure($args['limit']);
    $category  = Wo_Secure($args['category']);
    $order_by  = Wo_Secure($args['order_by']);
    $id        = Wo_Secure($args['id']);
    $user_id  = Wo_Secure($args['user_id']);
    $keyword  = Wo_Secure($args['keyword']);
    $query_one = 'WHERE posted > 0';
    if ($offset > 0) {
        $query_one .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    if ($category) {
        $query_one .= " AND `category` = '$category' ";
    }
    if ($user_id) {
        $query_one .= " AND `user` = '$user_id' ";
    }
    if ($keyword) {
        $query_one .= " AND `title` LIKE '%$keyword%' ";
    }
    if ($category && $offset > 0) {
        $query_one .= " AND `category` = '$category' AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    if (!empty($id)) {
        $query_one .= " AND `id` <> '$id' ";
    }
    $order_by_text = '';
    if ($order_by == 'DESC') {
        $order_by_text = '`id` DESC';
    } else if ($order_by == 'RAND') {
        $order_by_text = 'RAND()';
    }
    $query_two = "SELECT * FROM  " . T_BLOG . " {$query_one} ORDER BY $order_by_text LIMIT {$limit} ";
    $query     = mysqli_query($sqlConnect, $query_two);
    $data      = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_GetArticle($fetched_data['id']);
    }
    return $data;
}
function Wo_DeleteMyBlog($id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    if (Wo_IsBlogOwner($id) === false) {
        if (Wo_IsAdmin() === false && Wo_IsModerator() === false) {
            return false;
        }
    }
    $id        = Wo_Secure($id);
    $thumbnail = mysqli_query($sqlConnect, "SELECT `thumbnail` FROM " . T_BLOG . " WHERE `id` = '$id'");
    if ($thumbnail) {
        $path = mysqli_fetch_assoc($thumbnail);
        if ($path['thumbnail'] != 'upload/photos/d-blog.jpg') {
            if (file_exists($path['thumbnail'])) {
                unlink($path['thumbnail']);
            } else {
                @Wo_DeleteFromToS3($path['thumbnail']);
            }
        }
    }
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG_COMM . " WHERE `blog_id` = '$id' ");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BLOG_COMM_REPLIES . " WHERE `blog_id` = '$id' ");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_DISLIKES . " WHERE `blog_id` = '$id' ");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_LIKES . " WHERE `blog_id` = '$id' ");
    $query_one     = "DELETE FROM " . T_BLOG . " WHERE `id` = '$id'";
    $sql_query_one = mysqli_query($sqlConnect, $query_one);
    if ($sql_query_one) {
        $sql_query_two = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_POSTS . " WHERE `blog_id` = '$id' LIMIT 1");
        $mysqli        = mysqli_fetch_assoc($sql_query_two);
        $delete_post   = Wo_DeletePost($mysqli['id']);
    }
    return $sql_query_one;
}
function Wo_GetArticle($id = 0) {
    global $sqlConnect, $wo;
    if (empty($id)) {
        return false;
    }
    $id            = Wo_Secure($id);
    $sql_query_one = mysqli_query($sqlConnect, "SELECT * FROM " . T_BLOG . " WHERE `id` = '$id'");
    $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    if (!empty($fetched_data)) {
        $fetched_data['author']        = Wo_UserData($fetched_data['user']);
        $fetched_data['thumbnail']     = Wo_GetMedia($fetched_data['thumbnail']);
        $fetched_data['tags_array']    = @explode(',', $fetched_data['tags']);
        $fetched_data['url']           = Wo_SeoLink('index.php?link1=read-blog&id=' . $fetched_data['id'] . '_' . Wo_SlugPost($fetched_data['title']));
        $fetched_data['author']        = Wo_UserData($fetched_data['user']);
        $fetched_data['category_link'] = Wo_SeoLink('index.php?link1=blog-category&id=' . $fetched_data['category']);
        $fetched_data['category_name'] = '';
        $fetched_data['is_post_admin'] = false;
        if ($wo['loggedin'] == true) {
            $fetched_data['is_post_admin'] = ($fetched_data['user'] == $wo['user']['id']) ? true : false;
        }
        if (!empty($wo['page_categories'][$fetched_data['category']])) {
            $fetched_data['category_name'] = $wo['page_categories'][$fetched_data['category']];
        }
    }
    return $fetched_data;
}
function Wo_SearchBlogs($args = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options  = array(
        "category" => false,
        "keyword" => false
    );
    $args     = array_merge($options, $args);
    $category = Wo_Secure($args['category']);
    $keyword  = Wo_Secure($args['keyword']);
    if (!$keyword || !$category) {
        return false;
    }
    $query_two = "SELECT * FROM " . T_BLOG . " WHERE  `category` = '$category' AND  `title` LIKE '%$keyword%' OR `description` LIKE '%$keyword%' ";
    $query     = mysqli_query($sqlConnect, $query_two);
    $data      = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_GetArticle($fetched_data['id']);
    }
    return $data;
}
// *** Wo_Wonder Forum ***  //
function Wo_GetForumSec($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "id" => false,
        "offset" => 0,
        "limit" => false,
        "search" => false,
        "keyword" => false,
        "forums" => false,
        "order_by" => 'ASC'
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $id        = Wo_Secure($args['id']);
    $limit     = Wo_Secure($args['limit']);
    $search    = Wo_Secure($args['search']);
    $keyword   = Wo_Secure($args['keyword']);
    $forums    = Wo_Secure($args['forums']);
    $order_by  = Wo_Secure($args['order_by']);
    $query_one = "";
    if ($offset > 0) {
        $query_one .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    if ($id) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($order_by) {
        $query_one .= " ORDER BY `id` $order_by";
    }
    if ($limit) {
        $query_one .= " LIMIT {$limit} ";
    }
    $sql_query_one = mysqli_query($sqlConnect, "SELECT * FROM " . T_FORUM_SEC . " WHERE `id` > 0 {$query_one}");
    $data          = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        if ($forums) {
            $fetched_data['forums'] = Wo_GetForums(array(
                "section" => $fetched_data['id'],
                "search" => $search,
                "keyword" => $keyword
            ));
            if (count($fetched_data['forums']) > 0) {
                $data[] = $fetched_data;
            }
        } else {
            $data[] = $fetched_data;
        }
    }
    return $data;
}
function Wo_GetForums($args = array()) {
    global $sqlConnect;
    $options   = array(
        "section" => false,
        "offset" => 0,
        "limit" => false,
        "search" => false,
        "keyword" => false,
        'order_by' => 'ASC'
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $section   = Wo_Secure($args['section']);
    $limit     = Wo_Secure($args['limit']);
    $search    = Wo_Secure($args['search']);
    $keyword   = Wo_Secure($args['keyword']);
    $order_by  = Wo_Secure($args['order_by']);
    $sql_query = "";
    if ($section) {
        $sql_query .= " AND `sections` = '$section' ";
    }
    if ($search) {
        $sql_query .= " AND `name` LIKE '%$keyword%' ";
    }
    if ($order_by) {
        $sql_query .= " ORDER BY `id` $order_by";
    }
    if ($limit) {
        $sql_query .= " LIMIT {$limit} ";
    }
    $sql_queryset = mysqli_query($sqlConnect, "SELECT * FROM " . T_FORUMS . " WHERE `id` > 0 {$sql_query} ");
    $data         = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_queryset)) {
        $fetched_data['posts'] = Wo_GetTotalThreads(array(
            'forum' => $fetched_data['id']
        ));
        $data[]                = $fetched_data;
    }
    return $data;
}
function Wo_GetShortTitle($text = false, $preview = false, $len = 40) {
    if (!$text) {
        return false;
    }
    if (strlen($text) > $len && !$preview) {
        $text = mb_substr($text, 0, $len, "UTF-8") . "..";
    }
    return $text;
}
function Wo_GetForumInfo($fid) {
    global $sqlConnect;
    if (!$fid || !is_numeric($fid)) {
        return array();
    }
    $sql_query_one = mysqli_query($sqlConnect, "SELECT * FROM " . T_FORUMS . " WHERE `id` = '$fid'");
    $data          = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_query_one)) {
        $data['threads'] = Wo_GetForumThreads(array(
            "forum" => $fetched_data['id'],
            "limit" => 10
        ));
        $data['forum']   = $fetched_data;
        $data['forums']  = Wo_GetForums();
    }
    return $data;
}
function Wo_GetForum($fid) {
    global $sqlConnect;
    if (!$fid || !is_numeric($fid)) {
        return array();
    }
    $sql_query_one = mysqli_query($sqlConnect, "SELECT * FROM " . T_FORUMS . " WHERE `id` = '$fid'");
    $fetched_data  = mysqli_fetch_assoc($sql_query_one);
    if (!empty($fetched_data)) {
        $fetched_data['name'] = Wo_GetShortTitle($fetched_data['name'], true);
    }
    return $fetched_data;
}
function Wo_GetForumThreads($args = array()) {
    global $sqlConnect;
    $options   = array(
        "forum" => false,
        "offset" => 0,
        "limit" => 10,
        "id" => false,
        "search" => false,
        "subject" => false,
        "post" => false,
        "user" => false,
        "preview" => false,
        "order_by" => "DESC"
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $search    = Wo_Secure($args['search']);
    $subject   = Wo_Secure($args['subject']);
    $post      = Wo_Secure($args['post']);
    $limit     = Wo_Secure($args['limit']);
    $forum     = Wo_Secure($args['forum']);
    $order_by  = Wo_Secure($args['order_by']);
    $id        = Wo_Secure($args['id']);
    $user      = Wo_Secure($args['user']);
    $preview   = Wo_Secure($args['preview']);
    $query_one = "";
    $ordering  = "";
    if ($offset > 0) {
        $query_one .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    if ($id) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($user) {
        $query_one .= " AND `user` = '$user' ";
    }
    if ($forum) {
        $query_one .= " AND `forum` = '$forum' ";
    }
    if ($search) {
        if ($subject) {
            $query_one .= " AND `headline` LIKE '%$subject%' ";
        }
        if ($post) {
            $query_one .= " AND `post` LIKE '%$post%' ";
        }
    }
    if ($order_by == "DESC" || $order_by == "ASC") {
        $query_one .= " ORDER BY `id` $order_by ";
    }
    if ($limit && $limit > 0) {
        $query_one .= " LIMIT {$limit} ";
    }
    $sql_query    = "SELECT * FROM " . T_FORUM_THREADS . " WHERE `posted` > 0 {$query_one} ";
    $sql_queryset = mysqli_query($sqlConnect, $sql_query);
    $data         = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_queryset)) {
        $fetched_data['user_data']  = Wo_UserData($fetched_data['user']);
        $fetched_data['url']        = Wo_SeoLink("index.php?link1=showthread&tid=" . $fetched_data['id']);
        $fetched_data['author_url'] = Wo_SeoLink("index.php?link1=timeline&u=" . $fetched_data['user_data']['username']);
        $fetched_data['headline']   = Wo_GetShortTitle($fetched_data['headline'], $preview);
        $fetched_data['edit_url']   = Wo_SeoLink('index.php?link1=edithread&tid=' . $fetched_data['id']);
        if (empty($args['threadreplies'])) {
            $fetched_data['threadreplies'] = Wo_GetThreadReplies(array(
                "thread_id" => $fetched_data['id']
            ));
        }
        $fetched_data['replies'] = Wo_GetTotalReplies(array(
            "thread" => $fetched_data['id']
        ));
        $data[]                  = $fetched_data;
    }
    return $data;
}
function Wo_GetMyReplies($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "offset" => 0,
        "limit" => 10
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $limit     = Wo_Secure($args['limit']);
    $query_one = "";
    if ($offset > 0) {
        $query_one .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    if ($limit) {
        $query_one .= " ORDER BY `id` DESC LIMIT {$limit} ";
    }
    $user_id      = $wo['user']['id'];
    $sql_query    = "SELECT * FROM " . T_FORUM_THREAD_REPLIES . " WHERE `poster_id` = '$user_id' {$query_one} ";
    $sql_queryset = mysqli_query($sqlConnect, $sql_query);
    $data         = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_queryset)) {
        $fetched_data['user_data']    = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['forum']        = Wo_GetForum($fetched_data['forum_id']);
        $fetched_data['edit_url']     = Wo_SeoLink("index.php?link1=editreply&tid=" . $fetched_data['id']);
        $fetched_data['url']          = Wo_SeoLink("index.php?link1=showthread&tid=" . $fetched_data['thread_id']);
        $fetched_data['post_subject'] = Wo_GetShortTitle($fetched_data['post_subject']);
        $data[]                       = $fetched_data;
    }
    return $data;
}
function Wo_GetThreadReplies($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "thread_id" => false,
        "offset" => 0,
        "search" => false,
        "forum" => false,
        "subject" => false,
        "reply" => false,
        "user" => false,
        "limit" => 10,
        "id" => false,
        "order_by" => "ASC"
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $forum     = Wo_Secure($args['forum']);
    $limit     = Wo_Secure($args['limit']);
    $thread_id = Wo_Secure($args['thread_id']);
    $limit     = Wo_Secure($args['limit']);
    $order_by  = Wo_Secure($args['order_by']);
    $id        = Wo_Secure($args['id']);
    $poster_id = Wo_Secure($args['user']);
    $query_one = "";
    if ($thread_id) {
        $query_one .= " AND `thread_id` = '$thread_id' ";
    }
    if ($offset > 0) {
        $query_one .= " AND `id` > {$offset} AND `id` <> {$offset} ";
    }
    if ($id) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($poster_id) {
        $query_one .= " AND `poster_id` = '$poster_id' ";
    }
    if ($order_by == "DESC" || $order_by == "ASC") {
        $query_one .= " ORDER BY `id` $order_by ";
    }
    if ($limit) {
        $query_one .= " LIMIT {$limit} ";
    }
    $sql_query    = "SELECT * FROM " . T_FORUM_THREAD_REPLIES . " WHERE  `posted_time` > 0 {$query_one} ";
    $sql_queryset = mysqli_query($sqlConnect, $sql_query);
    $data         = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_queryset)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['is_owner']  = ($fetched_data['poster_id'] == $wo['user']['id']) ? true : false;
        $fetched_data['is_admin']  = ($wo['user']['admin'] == 1) ? true : false;
        $fetched_data['reply-url'] = Wo_SeoLink("index.php?link1=threadquote&tid=" . $fetched_data['id']);
        $fetched_data['edit-url']  = Wo_SeoLink("index.php?link1=editreply&tid=" . $fetched_data['id']);
        if ($forum) {
            $fetched_data['forum'] = Wo_GetForum($fetched_data['forum_id']);
        }
        $data[] = $fetched_data;
    }
    return $data;
}
function Wo_SearchThreadReplies($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "thread_id" => false,
        "offset" => 0,
        "subject" => false,
        "reply" => false,
        "user" => false,
        "limit" => 10
    );
    $args      = array_merge($options, $args);
    $subject   = Wo_Secure($args['subject']);
    $reply     = Wo_Secure($args['reply']);
    $thread_id = Wo_Secure($args['thread_id']);
    $limit     = Wo_Secure($args['limit']);
    $poster_id = Wo_Secure($args['user']);
    $query_one = "";
    if ($subject && $reply) {
        $search_q = "(`post_subject` LIKE '%$subject%' OR `post_text` LIKE '%$reply%')";
    } else if ($subject) {
        $search_q = " `post_subject` LIKE '%$subject%' ";
    } else if ($reply) {
        $search_q = " `post_text` LIKE '%$reply%' ";
    }
    if ($thread_id) {
        $query_one .= " AND `thread_id` = '$thread_id' ";
    }
    if ($poster_id) {
        $query_one .= " AND `poster_id` = '$poster_id' ";
    }
    if ($limit) {
        $query_one .= " LIMIT {$limit} ";
    }
    $sql_query    = "SELECT * FROM " . T_FORUM_THREAD_REPLIES . " WHERE {$search_q} AND `posted_time` > 0 {$query_one} ";
    $sql_queryset = mysqli_query($sqlConnect, $sql_query);
    $data         = array();
    while ($fetched_data = mysqli_fetch_assoc($sql_queryset)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['is_owner']  = ($fetched_data['poster_id'] == $wo['user']['id']) ? true : false;
        $fetched_data['is_admin']  = ($wo['user']['admin'] == 1) ? true : false;
        $fetched_data['reply-url'] = Wo_SeoLink("index.php?link1=threadquote&tid=" . $fetched_data['id']);
        $fetched_data['edit-url']  = Wo_SeoLink("index.php?link1=editreply&tid=" . $fetched_data['id']);
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_IsReplyOwner($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$id || !is_numeric($id)) {
        return false;
    }
    $sql_query    = "SELECT * FROM " . T_FORUM_THREAD_REPLIES . " WHERE `id` = '$id' ";
    $sql_queryset = mysqli_query($sqlConnect, $sql_query);
    $fetched_data = mysqli_fetch_assoc($sql_queryset);
    if (!empty($fetched_data)) {
        if ($fetched_data['poster_id'] == $wo['user']['id'] || $wo['user']['admin'] == 1) {
            return true;
        }
    }
    return false;
}
function Wo_GetForumUsers($args = array()) {
    global $wo, $sqlConnect;
    $data      = array();
    $options   = array(
        "key" => false,
        "offset" => 0,
        "name" => false,
        "id" => false,
        "limit" => false
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $limit     = Wo_Secure($args['limit']);
    $key       = Wo_Secure($args['key']);
    $name      = Wo_Secure($args['name']);
    $id        = Wo_Secure($args['id']);
    $query_one = "";
    if ($offset > 0) {
        $query_one .= " AND `user_id` < {$offset} AND `user_id` <> {$offset} ";
    }
    if ($key) {
        $query_one .= " AND `username` LIKE '$key%'";
    }
    if ($name) {
        $query_one .= " AND `username` LIKE '%$name%'";
    }
    $sql = mysqli_query($sqlConnect, " SELECT `user_id` FROM " . T_USERS . " WHERE `type` = 'user' {$query_one} ORDER BY `user_id` DESC LIMIT 10 ");
    while ($fetched_data = mysqli_fetch_assoc($sql)) {
        $data_user                = Wo_UserData($fetched_data['user_id']);
        $data_user['forum_posts'] = Wo_GetTotalThreads(array(
            'user' => $fetched_data['user_id']
        ));
        $data[]                   = $data_user;
    }
    return $data;
}
function Wo_IsThreadOwner($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$id || !is_numeric($id)) {
        return false;
    }
    $sql_query    = "SELECT * FROM " . T_FORUM_THREADS . " WHERE `id` = '$id' ";
    $sql_queryset = mysqli_query($sqlConnect, $sql_query);
    $fetched_data = mysqli_fetch_assoc($sql_queryset);
    if (!empty($fetched_data)) {
        if ($fetched_data['user'] == $wo['user']['id'] || $wo['user']['admin'] == 1) {
            return true;
        }
    }
    return false;
}
function Wo_AddTopic($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_FORUM_THREADS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return true;
    }
    return false;
}
function Wo_AddForumSection($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || Wo_IsAdmin() == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_FORUM_SEC . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return true;
    }
    return false;
}
function Wo_AddForum($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || Wo_IsAdmin() == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_FORUMS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return true;
    }
    return false;
}
function Wo_ThreadReply($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields    = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data      = '\'' . implode('\', \'', $registration_data) . '\'';
    $query_one = "INSERT INTO " . T_FORUM_THREAD_REPLIES . " ({$fields}) VALUES ({$data})";
    $query     = mysqli_query($sqlConnect, $query_one);
    if ($query) {
        $thread                  = Wo_GetForumThreads(array(
            'threadreplies' => true
        ));
        $notification_data_array = array(
            'recipient_id' => $thread[0]['user_data']['user_id'],
            'type' => 'forum_reply',
            'thread_id' => $registration_data['thread_id'],
            'url' => 'index.php?link1=showthread&tid=' . $registration_data['thread_id']
        );
        return true;
    }
    return false;
}
function Wo_BbcodeToHtml($bbtext) {
    $bbtags  = array(
        '[paragraph]' => '<p>',
        '[/paragraph]' => '</p>',
        '[left]' => '<p style="text-align:left;">',
        '[/left]' => '</p>',
        '[right]' => '<p style="text-align:right;">',
        '[/right]' => '</p>',
        '[center]' => '<p style="text-align:center;">',
        '[/center]' => '</p>',
        '[quote]' => '<blockquote class="quote">',
        '[/quote]' => '</blockquote>',
        '[justify]' => '<p style="text-align:justify;">',
        '[/justify]' => '</p>',
        '[bold]' => '<span style="font-weight:bold;">',
        '[/bold]' => '</span>',
        '[italic]' => '<span style="font-weight:bold;">',
        '[/italic]' => '</span>',
        '[underline]' => '<span style="text-decoration:underline;">',
        '[/underline]' => '</span>',
        '[b]' => '<span style="font-weight:bold;">',
        '[/b]' => '</span>',
        '[i]' => '<span style="font-weight:bold;">',
        '[/i]' => '</span>',
        '[u]' => '<span style="text-decoration:underline;">',
        '[/u]' => '</span>',
        '[sm]' => '<small>',
        '[/sm]' => '</small>',
        '[nl]' => '<br>',
        '[s]' => '<s>',
        '[/s]' => '</s>',
        '[unordered_list]' => '<ul>',
        '[/unordered_list]' => '</ul>',
        '[ordered_list]' => '<ol style="list-style-type:decimal;">',
        '[/ordered_list]' => '</ol>',
        '[*]' => '<li>',
        '[/*]' => '</li>',
        '[pre]' => '<pre>',
        '[/pre]' => '</pre>',
        '[code]' => '<code>',
        '[/code]' => '</code>'
    );

    $bbtext     = str_ireplace(array_keys($bbtags), array_values($bbtags), $bbtext);
    $bbextended = array(
        "/\[url](.*?)\[\/url]/i" => "<a href=\"$1\" title=\"$1\">$1</a>",

        "/\[url=(.*?)\](.*?)\[\/url\]/i" => "<a href=\"$1\" title=\"$1\">$2</a>",

        "/\[email=(.*?)\](.*?)\[\/email\]/i" => "<a href=\"mailto:$1\">$2</a>",

        "/\[mail=(.*?)\](.*?)\[\/mail\]/i" => "<a href=\"mailto:$1\">$2</a>",

        "/\[img\]([^[]*)\[\/img\]/i" => "<img src=\"$1\" alt=\" \" />",

        "/\[iframe\]([^[]*)\[\/iframe\]/i" => "<iframe src=\"$1\" frameborder=\"0\" allowfullscreen width=\"560\" height=\"315\" /></iframe>",

        "/\[image\]([^[]*)\[\/image\]/i" => "<img src=\"$1\" alt=\" \" />",

        "/\[image_left\]([^[]*)\[\/image_left\]/i" => "<img src=\"$1\" alt=\" \" class=\"img_left\" />",

        "/\[image_right\]([^[]*)\[\/image_right\]/i" => "<img src=\"$1\" alt=\" \" class=\"img_right\" />"
    );

    foreach ($bbextended as $match => $replacement) {
        $bbtext = preg_replace($match, $replacement, $bbtext);
    }

    return $bbtext;
}

function Wo_ThreadUpdate($id = 0, $update_data = array()) {
    global $sqlConnect, $wo;
    $update = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . $data . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_FORUM_THREAD_REPLIES . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_UpdateTopic($id = 0, $update_data = array()) {
    global $sqlConnect, $wo;
    $update = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . $data . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_FORUM_THREADS . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_DeleteThreadReply($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$id || !is_numeric($id)) {
        return false;
    }
    if (!Wo_IsReplyOwner($id)) {
        if (Wo_IsAdmin() == false && Wo_IsModerator() == false) {
            return false;
        }
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_THREAD_REPLIES . " WHERE `id` = '$id'");
    if ($query_one) {
        return true;
    }
    return false;
}
function Wo_DeleteForumThread($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$id || !is_numeric($id)) {
        return false;
    }
    if (!Wo_IsThreadOwner($id)) {
        if (Wo_IsAdmin() == false && Wo_IsModerator() == false) {
            return false;
        }
    }
    $query_one = mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_THREADS . " WHERE `id` = '$id'");
    $query_two = mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_THREAD_REPLIES . " WHERE `thread_id` = '$id'");
    $query_two = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `thread_id` = '{$id}'");
    if ($query_one && $query_two) {
        return true;
    }
    return false;
}
function Wo_DeleteForum($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false && Wo_IsAdmin() == false) {
        return false;
    }
    if (!$id || !is_numeric($id)) {
        return false;
    }
    $query_one   = mysqli_query($sqlConnect, "DELETE FROM " . T_FORUMS . " WHERE `id` = '$id'");
    $query_two   = mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_THREADS . " WHERE `forum` = '$id'");
    $query_three = mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_THREAD_REPLIES . " WHERE `forum_id` = '$id'");
    if ($query_one && $query_two && $query_three) {
        return true;
    }
    return false;
}
function Wo_DeleteForumSection($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false && Wo_IsAdmin() == false) {
        return false;
    }
    if (!$id || !is_numeric($id)) {
        return false;
    }
    $section = Wo_GetForumSec(array(
        'id' => $id,
        'forums' => true
    ));
    $query_0 = mysqli_query($sqlConnect, "DELETE FROM " . T_FORUM_SEC . " WHERE `id` = '$id'");
    if (count($section) > 0) {
        foreach ($section[0]['forums'] as $forum) {
            Wo_DeleteForum($forum['id']);
        }
        if ($query_0) {
            return true;
        }
    } else {
        return true;
    }
    return false;
}
function Wo_AddThreadView($id = false) {
    global $sqlConnect;
    if (!$id || !is_numeric($id)) {
        return false;
    }
    $query     = "UPDATE " . T_FORUM_THREADS . " SET `views` = `views` + 1 WHERE `id` = '$id'";
    $query_one = mysqli_query($sqlConnect, $query);
    if ($query_one) {
        return true;
    }
    return false;
}
function Wo_UpdateThreadLastPostTime($id = false) {
    global $sqlConnect;
    if (!$id || !is_numeric($id)) {
        return false;
    }
    $time      = time();
    $query     = "UPDATE " . T_FORUM_THREADS . " SET `last_post` = '$time' WHERE `id` = '$id'";
    $query_one = mysqli_query($sqlConnect, $query);
    if ($query_one) {
        return true;
    }
    return false;
}
function Wo_GetTotalForums() {
    global $sqlConnect;
    $sql_queryset = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS total FROM " . T_FORUMS);
    $fetched_data = mysqli_fetch_assoc($sql_queryset);
    return $fetched_data['total'];
}
function Wo_GetTotalThreads($args = array()) {
    global $sqlConnect;
    $options = array(
        "forum" => false,
        "user" => false
    );
    $args    = array_merge($options, $args);
    $forum   = Wo_Secure($args['forum']);
    $user    = Wo_Secure($args['user']);
    $query   = "";
    if ($forum) {
        $query .= " AND `forum` = '$forum' ";
    }
    if ($user) {
        $query .= " AND `user` = '$user' ";
    }
    $sql_queryset = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS total FROM " . T_FORUM_THREADS . " WHERE `id` > 0 {$query} ");
    $fetched_data = mysqli_fetch_assoc($sql_queryset);
    return $fetched_data['total'];
}
function Wo_GetTotalReplies($args = array()) {
    global $sqlConnect;
    $options = array(
        "thread" => false,
        "user" => false
    );
    $args    = array_merge($options, $args);
    $thread  = Wo_Secure($args['thread']);
    $user    = Wo_Secure($args['user']);
    $query   = "";
    if ($thread) {
        $query .= " AND `thread_id` = '$thread' ";
    }
    if ($user) {
        $query .= " AND `poster_id` = '$user' ";
    }
    $sql_queryset = mysqli_query($sqlConnect, "SELECT COUNT(`id`) AS total FROM " . T_FORUM_THREAD_REPLIES . " WHERE `id` > 0 {$query} ");
    $fetched_data = mysqli_fetch_assoc($sql_queryset);
    return $fetched_data['total'];
}
function Wo_GetTotalUsers() {
    global $sqlConnect;
    $sql_queryset = mysqli_query($sqlConnect, "SELECT COUNT(`user_id`) AS total FROM " . T_USERS);
    $fetched_data = mysqli_fetch_assoc($sql_queryset);
    return $fetched_data['total'];
}

function Wo_NotificationWebPushNotifier() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['push'] == 0) {
        return false;
    }
    if ($wo['config']['push_notifications'] == 0) {
        return false;
    }
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $to_ids    = array();
    $query_get = mysqli_query($sqlConnect, "SELECT * FROM " . T_NOTIFICATION . " WHERE `notifier_id` = '$user_id' AND `seen` = '0' AND `sent_push` = '0' AND `type` <> 'admin_notification' ORDER BY `id` DESC");
    if (mysqli_num_rows($query_get) > 0) {
        while ($sql_get_notification_for_push = mysqli_fetch_assoc($query_get)) {
            $get_session_data = Wo_GetSessionDataFromUserID($sql_get_notification_for_push['recipient_id']);
            if (empty($get_session_data) || !empty($get_session_data)) {
                $notification_id = $sql_get_notification_for_push['id'];
                $to_id           = $sql_get_notification_for_push['recipient_id'];
                $to_data         = Wo_UserData($sql_get_notification_for_push['recipient_id']);
                $ids             = '';
                if (!empty($to_data['web_device_id']) || !empty($to_data['device_id'])) {
                    if (!empty($to_data['web_device_id']) && !empty($to_data['device_id'])) {
                        $ids = array($to_data['web_device_id'], $to_data['device_id']);
                    } else if (!empty($to_data['web_device_id'])) {
                        $ids = array($to_data['web_device_id']);
                    } else {
                        $ids = array($to_data['device_id']);
                    }
                    if (!empty($to_data['web_device_id']) && empty($to_data['device_id'])) {
                        if ($wo['config']['web_push'] == 0) {
                            return false;
                        }
                    }
                    $send_array                                 = array(
                        'send_to' => $ids,
                        'notification' => array(
                            'notification_content' => '',
                            'notification_title' => $wo['user']['name'],
                            'notification_image' => $wo['user']['avatar'],
                            'notification_data' => array(
                                'user_id' => $user_id
                            )
                        )
                    );
                    $lang                                       = $wo['lang'] = Wo_LangsFromDB($to_data['language']);
                    $sql_get_notification_for_push['type_text'] = '';
                    $notificationText                           = $sql_get_notification_for_push['text'];
                    $notificationType2                          = $sql_get_notification_for_push['type2'];
                    if (isset($notificationType2) && !empty($notificationType2)) {
                        if ($notificationType2 == 'post_image') {
                            $type2 = $wo['lang']['photo_n_label'];
                        } elseif ($notificationType2 == 'post_youtube' || $notificationType2 == 'post_video') {
                            $type2 = $wo['lang']['video_n_label'];
                        } elseif ($notificationType2 == 'post_file') {
                            $type2 = $wo['lang']['file_n_label'];
                        } elseif ($notificationType2 == 'post_vine') {
                            $type2 = $wo['lang']['vine_n_label'];
                        } elseif ($notificationType2 == 'post_soundFile') {
                            $type2 = $wo['lang']['sound_n_label'];
                        } elseif ($notificationType2 == 'post_avatar') {
                            $type2 = $wo['lang']['avatar_n_label'];
                        } elseif ($notificationType2 == 'post_cover') {
                            $type2 = $wo['lang']['cover_n_label'];
                        } else {
                            $type2 = '';
                        }
                    } else {
                        $type2 = $wo['lang']['post_n_label'];
                    }
                    $orginal_txt  = array(
                        "{postType}",
                        "{post}"
                    );
                    $replaced_txt = array(
                        $type2,
                        $notificationText
                    );
                    if (!empty($sql_get_notification_for_push['type'])) {
                        if ($sql_get_notification_for_push['type'] == "following") {
                            $sql_get_notification_for_push['type_text'] .= $wo['lang']['followed_you'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'comment_mention') {
                            $sql_get_notification_for_push['type_text'] .= $wo['lang']['comment_mention'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'post_mention') {
                            $sql_get_notification_for_push['type_text'] .= $wo['lang']['post_mention'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'liked_post') {
                            $sql_get_notification_for_push['type_text'] = str_replace($orginal_txt, $replaced_txt, $wo['lang']['liked_post']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'wondered_post') {
                            $lang_type                                  = ($wo['config']['second_post_button'] == 'wonder') ? $wo['lang']['wondered_post'] : $wo['lang']['disliked_post'];
                            $sql_get_notification_for_push['type_text'] = str_replace($orginal_txt, $replaced_txt, $lang_type);
                        }
                        if ($sql_get_notification_for_push['type'] == 'share_post') {
                            $sql_get_notification_for_push['type_text'] = str_replace($orginal_txt, $replaced_txt, $wo['lang']['share_post']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'comment') {
                            $sql_get_notification_for_push['type_text'] = str_replace($orginal_txt, $replaced_txt, $wo['lang']['commented_on_post']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'comment_reply') {
                            $sql_get_notification_for_push['type_text'] = str_replace('{comment}', $sql_get_notification_for_push['text'], $wo['lang']['replied_to_comment']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'comment_reply_mention') {
                            $sql_get_notification_for_push['type_text'] = str_replace('{comment}', $sql_get_notification_for_push['text'], $wo['lang']['comment_reply_mention']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'also_replied') {
                            $sql_get_notification_for_push['type_text'] = str_replace('{comment}', $sql_get_notification_for_push['text'], $wo['lang']['also_replied']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'liked_comment') {
                            $sql_get_notification_for_push['type_text'] = str_replace('{comment}', $sql_get_notification_for_push['text'], $wo['lang']['liked_comment']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'wondered_comment') {
                            $lang_type                                  = ($wo['config']['second_post_button'] == 'wonder') ? $wo['lang']['wondered_comment'] : $wo['lang']['disliked_comment'];
                            $sql_get_notification_for_push['type_text'] = str_replace('{comment}', $sql_get_notification_for_push['text'], $lang_type);
                        }
                        if ($sql_get_notification_for_push['type'] == 'liked_reply_comment') {
                            $sql_get_notification_for_push['type_text'] = str_replace('{comment}', $sql_get_notification_for_push['text'], $wo['lang']['liked_reply_comment']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'wondered_reply_comment') {
                            $lang_type                                  = ($wo['config']['second_post_button'] == 'wonder') ? $wo['lang']['wondered_reply_comment'] : $wo['lang']['disliked_reply_comment'];
                            $sql_get_notification_for_push['type_text'] = str_replace('{comment}', $sql_get_notification_for_push['text'], $lang_type);
                        }
                        if ($sql_get_notification_for_push['type'] == 'profile_wall_post') {
                            $sql_get_notification_for_push['type_text'] = $wo['lang']['posted_on_timeline'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'visited_profile') {
                            $sql_get_notification_for_push['type_text'] = $wo['lang']['profile_visted'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'liked_page') {
                            $page                                       = Wo_PageData($sql_get_notification_for_push['page_id']);
                            $sql_get_notification_for_push['type_text'] = str_replace('{page_name}', $page['name'], $wo['lang']['liked_page']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'joined_group') {
                            $group                                      = Wo_GroupData($sql_get_notification_for_push['group_id']);
                            $sql_get_notification_for_push['type_text'] = str_replace('{group_name}', $group['name'], $wo['lang']['joined_group']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'accepted_invite') {
                            $page_id                                    = @end(explode('/', $sql_get_notification_for_push['url']));
                            $page                                       = Wo_PageData(Wo_PageIdFromPagename($page_id));
                            $sql_get_notification_for_push['type_text'] = str_replace('{page_name}', $page['name'], $wo['lang']['accepted_invited_page']);
                        }
                        
                        if ($sql_get_notification_for_push['type'] == 'invited_page') {
                            $page_id                                    = @end(explode('/', $sql_get_notification_for_push['url']));
                            $page                                       = Wo_PageData(Wo_PageIdFromPagename($page_id));
                            $sql_get_notification_for_push['type_text'] = str_replace('{page_name}', $page['name'], $wo['lang']['invited_page']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'accepted_join_request') {
                            $group_id                                   = @end(explode('/', $sql_get_notification_for_push['url']));
                            $group                                      = Wo_GroupData(Wo_GroupIdFromGroupname($group_id));
                            $sql_get_notification_for_push['type_text'] = str_replace('{group_name}', $group['name'], $wo['lang']['accepted_join_request']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'added_you_to_group') {
                            $group_id                                   = @end(explode('/', $sql_get_notification_for_push['url']));
                            $group                                      = Wo_GroupData(Wo_GroupIdFromGroupname($group_id));
                            $sql_get_notification_for_push['type_text'] = str_replace('{group_name}', $group['name'], $wo['lang']['added_you_to_group']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'requested_to_join_group') {
                            $sql_get_notification_for_push['type_text'] = $wo['lang']['requested_to_join_group'];
                        }
                        
                        if ($sql_get_notification_for_push['type'] == 'interested_event') {
                            $event_data                                 = Wo_EventData($sql_get_notification_for_push['event_id']);
                            $sql_get_notification_for_push['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['is_interested']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'going_event') {
                            $event_data                                 = Wo_EventData($sql_get_notification_for_push['event_id']);
                            $sql_get_notification_for_push['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['is_going']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'invited_event') {
                            $event_data                                 = Wo_EventData($sql_get_notification_for_push['event_id']);
                            $sql_get_notification_for_push['type_text'] = str_replace('{event_name}', $event_data['name'], $wo['lang']['invited_you_event']);
                        }
                        if ($sql_get_notification_for_push['type'] == 'forum_reply') {
                            $sql_get_notification_for_push['type_text'] = $wo['lang']['replied_to_topic'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'accepted_request') {
                            if ($wo['config']['connectivitySystem'] == 1) {
                                $sql_get_notification_for_push['type_text'] = $wo['lang']['accepted_friend_request'];
                            } else {
                                $sql_get_notification_for_push['type_text'] = $wo['lang']['accepted_follow_request'];
                            }
                        }
                        
                        if ($sql_get_notification_for_push['type'] == 'admin_notification') {
                            $sql_get_notification_for_push['type_text'] = $sql_get_notification_for_push['text'];
                            $sql_get_notification_for_push['url']       = $sql_get_notification_for_push['full_link'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'page_admin') {
                            $sql_get_notification_for_push['type_text'] = $wo['lang']['added_page_admin'];
                            $sql_get_notification_for_push['url']       = $sql_get_notification_for_push['url'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'group_admin') {
                            $sql_get_notification_for_push['type_text'] = $wo['lang']['added_group_admin'];
                            $sql_get_notification_for_push['url']       = $sql_get_notification_for_push['url'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'added_u_as') {
                            $sql_get_notification_for_push['type_text'] = $sql_get_notification_for_push['text'];
                            $sql_get_notification_for_push['url']       = $sql_get_notification_for_push['url'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'accept_u_as') {
                            $sql_get_notification_for_push['type_text'] = $sql_get_notification_for_push['text'];
                            $sql_get_notification_for_push['url']       = $sql_get_notification_for_push['url'];
                        }
                        if ($sql_get_notification_for_push['type'] == 'rejected_u_as') {
                            $sql_get_notification_for_push['type_text'] = $sql_get_notification_for_push['text'];
                            $sql_get_notification_for_push['url']       = $sql_get_notification_for_push['url'];
                        }
                    }
                    $send_array['notification']['notification_content']     = $sql_get_notification_for_push['type_text'];
                    $send_array['notification']['notification_data']['url'] = $sql_get_notification_for_push['url'];
                    $send       = Wo_SendPushNotification($send_array, 'native');
                }
                $query_get_messages_for_push = mysqli_query($sqlConnect, "UPDATE " . T_NOTIFICATION . " SET `sent_push` = '1' WHERE `notifier_id` = '$user_id' AND `sent_push` = '0'");
            }
        }
    }
    return true;
}

function Wo_MessagesPushNotifier() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if ($wo['config']['push'] == 0) {
        return false;
    }
    if ($wo['config']['push_messages'] == 0) {
        return false;
    }
    $user_id   = Wo_Secure($wo['user']['user_id']);
    $to_ids    = array();
    $query_get = mysqli_query($sqlConnect, "SELECT * FROM " . T_MESSAGES . " WHERE `from_id` = '$user_id' AND `seen` = '0' AND `sent_push` = '0' ORDER BY `id` DESC");
    if (mysqli_num_rows($query_get) > 0) {
        while ($sql_get_messages_for_push = mysqli_fetch_assoc($query_get)) {
            if (!in_array($sql_get_messages_for_push['to_id'], $to_ids)) {
                $get_session_data = Wo_GetSessionDataFromUserID($sql_get_messages_for_push['to_id']);
                if (empty($get_session_data)) {
                    $message_id = $sql_get_messages_for_push['id'];
                    $to_id      = $sql_get_messages_for_push['to_id'];
                    $to_data    = Wo_UserData($sql_get_messages_for_push['to_id']);
                    if (!empty($to_data['device_id'])) {
                        $send_array = array(
                            'send_to' => array(
                                $to_data['device_id']
                            ),
                            'notification' => array(
                                'notification_content' => $sql_get_messages_for_push['text'],
                                'notification_title' => $wo['user']['name'],
                                'notification_image' => $wo['user']['avatar'],
                                'notification_data' => array(
                                    'user_id' => $user_id
                                )
                            )
                        );
                        $send       = Wo_SendPushNotification($send_array);
                        if ($send) {
                            $query_get_messages_for_push = mysqli_query($sqlConnect, "UPDATE " . T_MESSAGES . " SET `notification_id` = '$send' WHERE `id` = '$message_id'");
                        }
                    }
                    $query_get_messages_for_push = mysqli_query($sqlConnect, "UPDATE " . T_MESSAGES . " SET `sent_push` = '1' WHERE `from_id` = '$user_id' AND `to_id` = '$to_id' AND `sent_push` = '0'");
                }
            }
            $to_ids[] = $sql_get_messages_for_push['to_id'];
        }
    }
    return true;
}
function Is_EventOwner($id, $user = false, $admin = true) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $user         = ($user && is_numeric($user)) ? $user : $wo['user']['id'];
    $query        = mysqli_query($sqlConnect, "SELECT * FROM " . T_EVENTS . "  WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    $result       = false;
    if (!empty($fetched_data)) {
        if ($fetched_data['poster_id'] == $user) {
            if ($admin == true) {
                if (Wo_IsAdmin($user)) {
                    $result = true;
                }
            }
            $result = true;
        }
    }
    return $result;
}
function Wo_InsertEvent($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_EVENTS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        $id            = mysqli_insert_id($sqlConnect);
        $register_post = Wo_RegisterPost(array(
            'user_id' => Wo_Secure($wo['user']['user_id']),
            'time' => time(),
            'postPrivacy' => '0',
            'page_event_id' => $id
        ));
        return $id;
    }
    return false;
}
function Wo_UpdateEvent($id = 0, $update_data = array()) {
    global $sqlConnect, $wo;
    $update = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $id = Wo_Secure($id);
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_EVENTS . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_EventGoingExists($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    $event_id = Wo_Secure($event_id);
    $user_id  = $wo['user']['id'];
    $data     = array();
    $sql      = "SELECT `id` FROM " . T_EVENTS_GOING . "  WHERE `event_id` = '$event_id' AND `user_id` = '$user_id ' ";
    $query    = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = $fetched_data;
    }
    if (count($data) > 0) {
        return true;
    }
    return false;
}
function Wo_EventInterestedExists($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    $event_id = Wo_Secure($event_id);
    $user_id  = $wo['user']['id'];
    $data     = array();
    $sql      = "SELECT `id` FROM " . T_EVENTS_INT . "  WHERE `event_id` = '$event_id' AND `user_id` = '$user_id' ";
    $query    = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = $fetched_data;
    }
    if (count($data) > 0) {
        return true;
    }
    return false;
}
function Wo_EventInvitedExists($event_id, $user_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    if (!$user_id || !is_numeric($user_id)) {
        return false;
    }
    $event_id = Wo_Secure($event_id);
    $user_id  = Wo_Secure($user_id);
    $data     = array();
    $sql      = "SELECT `id` FROM " . T_EVENTS_INV . "  WHERE `event_id` = '$event_id' AND `invited_id` = '$user_id' ";
    $query    = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = $fetched_data;
    }
    if (count($data) > 0) {
        return true;
    }
    return false;
}
function Wo_TotalInvitedUsers($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return 0;
    }
    $event_id     = Wo_Secure($event_id);
    $user_id      = $wo['user']['id'];
    $data         = array();
    $sql          = "SELECT COUNT(`id`) AS count FROM " . T_EVENTS_INV . " WHERE `event_id` = '$event_id'";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_TotalGoingUsers($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return 0;
    }
    $event_id     = Wo_Secure($event_id);
    $user_id      = $wo['user']['id'];
    $data         = array();
    $sql          = "SELECT COUNT(`id`) AS count FROM " . T_EVENTS_GOING . " WHERE `event_id` = '$event_id'";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_TotalInterestedUsers($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return 0;
    }
    $event_id     = Wo_Secure($event_id);
    $user_id      = $wo['user']['id'];
    $data         = array();
    $sql          = "SELECT COUNT(`id`) AS count FROM " . T_EVENTS_INT . " WHERE `event_id` = '$event_id'";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    return $fetched_data['count'];
}
function Wo_AddEventGoingUsers($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    if (Wo_EventGoingExists($event_id)) {
        return false;
    }
    $user_id    = $wo['user']['id'];
    $event_id   = Wo_Secure($event_id);
    $event_data = Wo_EventData($event_id);
    $sql        = "INSERT INTO " . T_EVENTS_GOING . " (`id`, `event_id`, `user_id`) VALUES (NULL, '$event_id', '$user_id')";
    $query      = mysqli_query($sqlConnect, $sql);
    if ($query) {
        $result                  = mysqli_query($sqlConnect, "DELETE FROM " . T_EVENTS_INV . "  WHERE `event_id` = '$event_id' AND `invited_id` = '$user_id'");
        $notification_data_array = array(
            'recipient_id' => $event_data['poster_id'],
            'type' => 'going_event',
            'event_id' => $event_id,
            'url' => 'index.php?link1=timeline&u=' . $wo['user']['username']
        );
        Wo_RegisterNotification($notification_data_array);
    }
    return $query;
}
function Wo_AddEventInvitedUsers($event_id, $user_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    if (!$user_id || !is_numeric($user_id)) {
        return false;
    }
    if (Wo_EventInvitedExists($event_id, $user_id)) {
        return false;
    }
    $invited_id = Wo_Secure($user_id);
    $inviter_id = $wo['user']['id'];
    $event_id   = Wo_Secure($event_id);
    $sql        = "INSERT INTO " . T_EVENTS_INV . " (`id`, `event_id`, `inviter_id`,`invited_id`) 
                                      VALUES (NULL, '$event_id', '$inviter_id','$invited_id')";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_AddEventInterestedUsers($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    if (Wo_EventInterestedExists($event_id)) {
        return false;
    }
    $user_id    = $wo['user']['id'];
    $event_id   = Wo_Secure($event_id);
    $event_data = Wo_EventData($event_id);
    $sql        = "INSERT INTO " . T_EVENTS_INT . " (`id`, `event_id`, `user_id`) VALUES (NULL, '$event_id', '$user_id')";
    $query      = mysqli_query($sqlConnect, $sql);
    if ($query) {
        $notification_data_array = array(
            'recipient_id' => $event_data['poster_id'],
            'type' => 'interested_event',
            'event_id' => $event_id,
            'url' => 'index.php?link1=timeline&u=' . $wo['user']['username']
        );
        Wo_RegisterNotification($notification_data_array);
    }
    return $query;
}
function Wo_UnsetEventInterestedUsers($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    $event_id = Wo_Secure($event_id);
    $user_id  = $wo['user']['id'];
    $sql      = "DELETE FROM " . T_EVENTS_INT . "  WHERE `user_id` = '$user_id' AND `event_id` = '$event_id'";
    $query    = mysqli_query($sqlConnect, $sql);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_UnsetEventGoingUsers($event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!$event_id || !is_numeric($event_id)) {
        return false;
    }
    $event_id = Wo_Secure($event_id);
    $user_id  = $wo['user']['id'];
    $sql      = "DELETE FROM " . T_EVENTS_GOING . "  WHERE `user_id` = '$user_id' AND `event_id` = '$event_id'";
    $sql2     = "DELETE FROM " . T_EVENTS_INT . "  WHERE `user_id` = '$user_id' AND `event_id` = '$event_id'";
    $query    = mysqli_query($sqlConnect, $sql);
    $query2   = mysqli_query($sqlConnect, $sql2);
    if ($query) {
        return true;
    }
    return false;
}
function Wo_GetEvents($args = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options = array(
        "offset" => 0,
        "limit" => 10,
        'is_admin' => 0
    );
    $args    = array_merge($options, $args);
    $sub_q   = "";
    $total   = "";
    $offset  = $args['offset'];
    $limit   = $args['limit'];
    $user    = $wo['user']['id'];
    if ($offset > 0) {
        $sub_q .= " AND `id` < {$offset} AND `id` <> {$offset}  ";
    }
    if ($limit && is_numeric($limit)) {
        $total = " LIMIT $limit  ";
    }
    $sql = "SELECT * FROM " . T_EVENTS;
    if (empty($args['is_admin'])) {
        $sql .= " WHERE `id` NOT IN 
    (SELECT `event_id` FROM " . T_EVENTS_GOING . " WHERE `user_id` = '$user') 
    AND `id` NOT IN (SELECT `event_id` FROM " . T_EVENTS_INT . " WHERE `user_id` = '$user') {$sub_q} ORDER BY `id` DESC {$total} ";
    }
    $query = mysqli_query($sqlConnect, $sql);
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data']  = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['start_date'] = date('F j Y, g:i a', strtotime($fetched_data['start_date'] . $fetched_data['start_time']));
        $fetched_data['cover']      = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['url']        = Wo_SeoLink("index.php?link1=show-event&eid=" . $fetched_data['id']);
        $data[]                     = $fetched_data;
    }
    return $data;
}
function Wo_GetSuggestedEvents($args = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options = array(
        "limit" => 5
    );
    $args    = array_merge($options, $args);
    $limit   = $args['limit'];
    $user    = $wo['user']['id'];
    $sql     = "SELECT * FROM " . T_EVENTS . " WHERE `id` NOT IN 
    (SELECT `event_id` FROM " . T_EVENTS_GOING . " WHERE `user_id` = '$user') 
    AND `id` NOT IN (SELECT `event_id` FROM " . T_EVENTS_INT . " WHERE `user_id` = '$user') ORDER BY RAND()";
    if ($limit && is_numeric($limit)) {
        $sql .= " LIMIT $limit  ";
    }
    $query = mysqli_query($sqlConnect, $sql);
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data']  = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['start_date'] = date('F j Y, g:i a', strtotime($fetched_data['start_date'] . $fetched_data['start_time']));
        $fetched_data['url']        = Wo_SeoLink("index.php?link1=show-event&eid=" . $fetched_data['id']);
        $data[]                     = $fetched_data;
    }
    return $data;
}
function Wo_GetGoingEvents($offset = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $sub_q = "";
    if ($offset > 0) {
        $sub_q = " AND `event_id` < {$offset} AND `event_id` <> {$offset} ";
    }
    $user_id = $wo['user']['id'];
    $sql     = "SELECT `event_id` FROM " . T_EVENTS_GOING . "  WHERE `user_id` = '$user_id' {$sub_q}  ORDER BY `event_id` DESC LIMIT 10";
    $query   = mysqli_query($sqlConnect, $sql);
    $data    = array();
    if ($query && !empty($query)) {
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $data[] = Wo_EventData($fetched_data['event_id']);
        }
    }
    return $data;
}
function Wo_GetInvitedEvents($offset = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $sub_q = "";
    if ($offset > 0) {
        $sub_q = " AND `event_id` < {$offset} AND `event_id` <> {$offset} ";
    }
    $user_id = $wo['user']['id'];
    $sql     = "SELECT `event_id` FROM " . T_EVENTS_INV . "  WHERE `invited_id` = '$user_id' {$sub_q}  ORDER BY `event_id` DESC LIMIT 10";
    $query   = mysqli_query($sqlConnect, $sql);
    $data    = array();
    if ($query && !empty($query)) {
        while ($fetched_data = mysqli_fetch_assoc($query)) {
            $data[] = Wo_EventData($fetched_data['event_id']);
        }
    }
    return $data;
}
function Wo_GetInterestedEvents($offset = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $sub_q = "";
    if ($offset > 0) {
        $sub_q = " AND `event_id` < {$offset} AND `event_id` <> {$offset} ";
    }
    $user_id = $wo['user']['id'];
    $sql     = "SELECT `event_id` FROM " . T_EVENTS_INT . " WHERE `user_id` = '$user_id' {$sub_q} ORDER BY `event_id` DESC LIMIT 10";
    $query   = mysqli_query($sqlConnect, $sql);
    $data    = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $event = Wo_EventData($fetched_data['event_id']);
        if ($event && !empty($event)) {
            $data[] = $event;
        }
    }
    return $data;
}
function Wo_GetPastEvents($offset = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $sub_q = "";
    if ($offset > 0) {
        $sub_q = " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    $sql   = "SELECT * FROM " . T_EVENTS . "  WHERE `end_date` < CURDATE() {$sub_q} ORDER BY `id` DESC LIMIT 10";
    $query = mysqli_query($sqlConnect, $sql);
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['cover']     = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['is_owner']  = Is_EventOwner($fetched_data['id']);
        $fetched_data['url']       = Wo_SeoLink("index.php?link1=show-event&eid=" . $fetched_data['id']);
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_GetMyEvents($offset = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $sub_q = "";
    if ($offset > 0) {
        $sub_q = " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    $user_id = $wo['user']['user_id'];
    $sql     = "SELECT * FROM " . T_EVENTS . "  WHERE `poster_id` = '$user_id' {$sub_q} ORDER BY `id` DESC LIMIT 10";
    $query   = mysqli_query($sqlConnect, $sql);
    $data    = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['cover']     = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['is_owner']  = Is_EventOwner($fetched_data['id']);
        $fetched_data['url']       = Wo_SeoLink("index.php?link1=show-event&eid=" . $fetched_data['id']);
        $data[]                    = $fetched_data;
    }
    return $data;
}

function Wo_DeleteApp($id = false) {
    global $sqlConnect, $wo;
    $result = false;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (Wo_IsAdmin() == false && Wo_IsModerator() == false) {
        return false;
    }
    $result = mysqli_query($sqlConnect, "DELETE FROM " . T_APPS . "  WHERE `id` = '$id'");
    if ($result) {
        return true;
    }
    return false;
}

function Wo_DeleteEvent($id = false) {
    global $sqlConnect, $wo;
    $result = false;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (!Is_EventOwner($id)) {
        if (Wo_IsAdmin() == false && Wo_IsModerator() == false) {
            return false;
        }
    }
    $result = mysqli_query($sqlConnect, "DELETE FROM " . T_EVENTS . "  WHERE `id` = '$id'");
    if ($result) {
        $result               = mysqli_query($sqlConnect, "DELETE FROM " . T_EVENTS_INT . "  WHERE `event_id` = '$id'");
        $result               = mysqli_query($sqlConnect, "DELETE FROM " . T_EVENTS_GOING . "  WHERE `event_id` = '$id'");
        $result               = mysqli_query($sqlConnect, "DELETE FROM " . T_EVENTS_INV . "  WHERE `event_id` = '$id'");
        $result               = mysqli_query($sqlConnect, "DELETE FROM " . T_NOTIFICATION . " WHERE `event_id` = {$id}");
        $query_9_delete_media = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_POSTS . " WHERE `event_id` = {$id}");
        if (mysqli_num_rows($query_9_delete_media) > 0) {
            while ($fetched_data = mysqli_fetch_assoc($query_9_delete_media)) {
                $delete_posts = Wo_DeletePost($fetched_data['id']);
            }
        }
        $query_10_delete_media = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_POSTS . " WHERE `page_event_id` = {$id}");
        if (mysqli_num_rows($query_10_delete_media) > 0) {
            while ($fetched_data = mysqli_fetch_assoc($query_10_delete_media)) {
                $delete_posts = Wo_DeletePost($fetched_data['id']);
            }
        }
        return true;
    }
    return false;
}
function Wo_EventData($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id)) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM " . T_EVENTS . "  WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    if (!empty($fetched_data)) {
        $fetched_data['user_data']  = Wo_UserData($fetched_data['poster_id']);
        $fetched_data['cover']      = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['is_owner']   = Is_EventOwner($fetched_data['id']);
        $fetched_data['start_date'] = date($fetched_data['start_date']);
        $fetched_data['end_edit_date'] = date($fetched_data['end_date']);
        $fetched_data['end_date']   = date($wo['config']['date_style'], strtotime($fetched_data['end_date']));
        $fetched_data['url']        = Wo_SeoLink("index.php?link1=show-event&eid=" . $fetched_data['id']);
        return $fetched_data;
    }
    return array();
}
function Wo_RegsiterEventInvite($user_id, $event_id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id) || !is_numeric($user_id)) {
        return false;
    }
    if (empty($event_id) || !is_numeric($event_id)) {
        return false;
    }
    if (!Is_EventOwner($event_id, $user_id) && Wo_AddEventInvitedUsers($event_id, $user_id)) {
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'type' => 'invited_event',
            'event_id' => $event_id,
            'url' => 'index.php?link1=show-event&eid=' . $event_id
        );
        Wo_RegisterNotification($notification_data_array);
        return true;
    }
    return false;
}
function DetermineUserLang() {
    global $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $lang     = $wo['user']['language'];
    $language = false;
    $wo_langs = array(
        'english' => 'en',
        'arabic' => 'ar',
        'dutch' => 'nl',
        'french' => 'fr',
        'german' => 'de',
        'italian' => 'it',
        'portuguese' => 'pt',
        'russian' => 'ru',
        'spanish' => 'es',
        'turkish' => 'tr'
    );
    if (array_key_exists($lang, $wo_langs)) {
        $language = $wo_langs[$lang];
    }
    return $language;
}
// *** Movies ***
function Wo_InsertFilm($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $sql    = "INSERT INTO " . T_MOVIES . " ({$fields}) VALUES ({$data})";
    $query = mysqli_query($sqlConnect, $sql) or die(mysqli_error($sqlConnect));
    if ($query) {
        $id = mysqli_insert_id($sqlConnect);
        return $id;
    }
    return false;
}
function Wo_UpdateFilm($id = 0, $update_data = array()) {
    global $sqlConnect, $wo;
    $update = array();
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($update_data)) {
        return false;
    }
    if (empty($id)) {
        return false;
    }
    $id = Wo_Secure($id);
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . Wo_Secure($data, 0) . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_MOVIES . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_AddBlogCommReplyDisLikes($id, $blog) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$blog || $blog < 1) {
        return false;
    }
    $id      = Wo_Secure($id);
    $blog    = Wo_Secure($blog);
    $comment = Wo_GetBlogCommReplyData($id);
    $result  = false;
    $user    = $wo['user']['id'];
    if ($comment && !empty($comment) && !Wo_IsBlogCommentReplyDisLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_DISLIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`,`movie_commreply_id`, `user_id`,`blog_id`) 
                        VALUES (NULL, '0', '$id','0','0', '$user','$blog')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
            @Wo_RemoveBlogCommentReplyLikes($id);
        }
    } else if ($comment && !empty($comment) && Wo_RemoveBlogCommentReplyDisLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_AddBlogCommentDisLikes($id, $blog) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$blog || $blog < 1) {
        return false;
    }
    $id      = Wo_Secure($id);
    $blog    = Wo_Secure($blog);
    $comment = Wo_GetBlogCommentData($id);
    $result  = false;
    $user    = $wo['user']['id'];
    @Wo_RemoveBlogCommentLikes($id);
    if ($comment && !empty($comment) && !Wo_IsBlogCommentDisLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_DISLIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`,`movie_commreply_id`, `user_id`,`blog_id`) 
                        VALUES (NULL, '$id', '0','0','0', '$user','$blog')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
        }
    } else if ($comment && !empty($comment) && Wo_RemoveBlogCommentDisLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_GetMovies($args = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options = array(
        "offset" => 0,
        "limit" => 26,
        "id" => false,
        "genre" => false,
        "country" => false
    );
    $args    = array_merge($options, $args);
    $offset  = $args['offset'];
    $limit   = $args['limit'];
    $genre   = Wo_Secure($args['genre']);
    $id      = Wo_Secure($args['id']);
    $country = Wo_Secure($args['country']);
    $sub_sql = "";
    $total   = "";
    if ($offset && $offset > 0) {
        $sub_sql .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    if ($id && is_numeric($id)) {
        $sub_sql .= " AND `id` = '$id' ";
    }
    if ($genre && is_string($genre)) {
        $sub_sql .= " AND `genre` = '$genre' ";
    }
    if ($country && is_string($country)) {
        $sub_sql .= " AND `country` = '$country' ";
    }
    if ($limit && is_numeric($limit)) {
        $total = " LIMIT $limit ";
    }
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_MOVIES . " WHERE `id` > 0 {$sub_sql} ORDER BY `id` DESC {$total}");
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['cover']  = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['source'] = Wo_GetMedia($fetched_data['source']);
        $fetched_data['url']    = Wo_SeoLink("index.php?link1=watch-film&film-id=" . $fetched_data['id']);
        $data[]                 = $fetched_data;
    }
    return $data;
}
function Wo_GetRecommendedFilms() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data  = array();
    $year  = date('Y');
    $sql   = "SELECT * FROM " . T_MOVIES . " WHERE `release` = '$year' OR `quality` IN ('hd','dvd','hd-tv') ORDER BY `id` DESC LIMIT 26";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['cover']  = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['source'] = Wo_GetMedia($fetched_data['source']);
        $fetched_data['url']    = Wo_SeoLink("index.php?link1=watch-film&film-id=" . $fetched_data['id']);
        $data[]                 = $fetched_data;
    }
    return $data;
}
function Wo_GetNewFilms() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data  = array();
    $year  = date('Y');
    $sql   = "SELECT * FROM " . T_MOVIES . " WHERE `release` = '$year' ORDER BY `id` DESC LIMIT 26";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['cover']  = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['source'] = Wo_GetMedia($fetched_data['source']);
        $fetched_data['url']    = Wo_SeoLink("index.php?link1=watch-film&film-id=" . $fetched_data['id']);
        $data[]                 = $fetched_data;
    }
    return $data;
}
function Wo_GetMtwFilms() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $data  = array();
    $year  = date('Y');
    $sql   = "SELECT * FROM " . T_MOVIES . "  ORDER BY `views` DESC LIMIT 26";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['cover']  = Wo_GetMedia($fetched_data['cover']);
        $fetched_data['source'] = Wo_GetMedia($fetched_data['source']);
        $fetched_data['url']    = Wo_SeoLink("index.php?link1=watch-film&film-id=" . $fetched_data['id']);
        $data[]                 = $fetched_data;
    }
    return $data;
}
function Wo_SearchFilms($key) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$key) {
        return false;
    }
    $data  = array();
    $key   = Wo_Secure($key);
    $sql   = "SELECT  *  FROM 
             " . T_MOVIES . "  
             WHERE `name` LIKE '%$key%' 
              OR `description` LIKE '%$key%'
               OR `genre` LIKE '%$key%'
                OR `stars` LIKE '%$key%'
                 OR `stars` LIKE '%$key%'
                  LIMIT 10";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['url']   = Wo_SeoLink("index.php?link1=watch-film&film-id=" . $fetched_data['id']);
        $fetched_data['name']  = Wo_GetShortTitle($fetched_data['name']);
        $fetched_data['cover'] = Wo_GetMedia($fetched_data['cover']);
        $data[]                = $fetched_data;
    }
    return $data;
}
function Wo_DeleteFilm($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($id) || ($wo['user']['admin'] != 1 && Wo_IsModerator() == false)) {
        return false;
    }
    $id  = Wo_Secure($id);
    $sql = "DELETE FROM " . T_MOVIES . " WHERE `id` = '$id'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_RegisterMovieComment($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_MOVIE_COMMS . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_RegisterMovieCommentReply($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $query  = mysqli_query($sqlConnect, "INSERT INTO " . T_MOVIE_COMM_REPLIES . " ({$fields}) VALUES ({$data})");
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_GetMovieCommentsCount($id) {
    global $sqlConnect, $wo;
    $is_owner = false;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $count        = 0;
    $sql          = "SELECT COUNT(`id`) as blogComments FROM " . T_MOVIE_COMMS . " WHERE `movie_id` = '$id'";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    $count += $fetched_data['blogComments'];
    $sql          = "SELECT COUNT(`id`) as blogComments FROM " . T_MOVIE_COMM_REPLIES . " WHERE `movie_id` = '$id'";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    return $count + $fetched_data['blogComments'];
}
function Wo_GetMovieComments($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "id" => false,
        "offset" => 0,
        "movie_id" => false
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $id        = Wo_Secure($args['id']);
    $movie_id  = Wo_Secure($args['movie_id']);
    $query_one = '';
    $data      = array();
    if ($offset > 0) {
        $query_one .= " AND `id` > {$offset} AND `id` <> {$offset} ";
    }
    if ($id && $id > 0 && is_numeric($id)) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($movie_id && $movie_id > 0 && is_numeric($movie_id)) {
        $query_one .= " AND `movie_id` = '$movie_id' ";
    }
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM  " . T_MOVIE_COMMS . " WHERE `id` > 0 {$query_one} ORDER BY `id` ASC LIMIT 10");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $comment = Wo_GetMovieCommentData($fetched_data['id']);
        if ($comment && !empty($comment)) {
            $data[] = $comment;
        }
    }
    return $data;
}
function Wo_GetMovieCommentReplies($args = array()) {
    global $sqlConnect, $wo;
    $options   = array(
        "id" => false,
        "movie_id" => false,
        "comm_id" => false
    );
    $args      = array_merge($options, $args);
    $id        = Wo_Secure($args['id']);
    $movie_id  = Wo_Secure($args['movie_id']);
    $comm_id   = Wo_Secure($args['comm_id']);
    $query_one = '';
    $data      = array();
    if ($id && $id > 0 && is_numeric($id)) {
        $query_one .= " AND `id` = '$id' ";
    }
    if ($movie_id && $movie_id > 0 && is_numeric($movie_id)) {
        $query_one .= " AND `movie_id` = '$movie_id' ";
    }
    if ($comm_id && $comm_id > 0 && is_numeric($comm_id)) {
        $query_one .= " AND `comm_id` = '$comm_id' ";
    }
    $query = mysqli_query($sqlConnect, "SELECT `id` FROM  " . T_MOVIE_COMM_REPLIES . " WHERE `id` > 0 {$query_one} ORDER BY `id` ASC");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $comment = Wo_GetMovieCommReplyData($fetched_data['id']);
        if ($comment && !empty($comment)) {
            $data[] = $comment;
        }
    }
    return $data;
}
function Wo_IsMovieCommentOwner($id) {
    global $sqlConnect, $wo;
    $is_owner = false;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_MOVIE_COMMS . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    if (!empty($fetched_data) && is_array($fetched_data)) {
        if ($fetched_data['user_id'] == $wo['user']['id'] || $wo['user']['admin'] == 1) {
            $is_owner = true;
        }
    }
    return $is_owner;
}
function Wo_IsMovieCommReplyOwner($id) {
    global $sqlConnect, $wo;
    $is_owner = false;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_MOVIE_COMM_REPLIES . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    if (!empty($fetched_data) && is_array($fetched_data)) {
        if ($fetched_data['user_id'] == $wo['user']['id'] || $wo['user']['admin'] == 1) {
            $is_owner = true;
        }
    }
    return $is_owner;
}
function Wo_GetMovieCommentData($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_MOVIE_COMMS . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    $data         = false;
    if (!empty($fetched_data)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['is_owner']  = Wo_IsMovieCommentOwner($fetched_data['id']);
        $fetched_data['likes']     = Wo_GetMovieCommLikes($fetched_data['id']);
        $fetched_data['dislikes']  = Wo_GetMovieCommDisLikes($fetched_data['id']);
        $fetched_data['replies']   = Wo_GetMovieCommentReplies(array(
            'comm_id' => $fetched_data['id']
        ));
        $data                      = $fetched_data;
    }
    return $data;
}
function Wo_GetMovieCommReplyData($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  " . T_MOVIE_COMM_REPLIES . " WHERE `id` = '$id'");
    $fetched_data = mysqli_fetch_assoc($query);
    $data         = false;
    if (!empty($fetched_data)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['is_owner']  = Wo_IsMovieCommReplyOwner($fetched_data['id']);
        $fetched_data['likes']     = Wo_GetMovieCommReplyLikes($fetched_data['id']);
        $fetched_data['dislikes']  = Wo_GetMovieCommReplyDisLikes($fetched_data['id']);
        $data                      = $fetched_data;
    }
    return $data;
}
function Wo_GetMovieCommLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as movieCommentLikes FROM " . T_BM_LIKES . " WHERE `movie_comm_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['movieCommentLikes'];
    }
    return $likes;
}
function Wo_GetMovieCommDisLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as movieCommentDisLikes FROM " . T_BM_DISLIKES . " WHERE `movie_comm_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['movieCommentDisLikes'];
    }
    return $likes;
}
function Wo_GetMovieCommReplyDisLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as movieCommentReplyDisLikes FROM " . T_BM_DISLIKES . " WHERE `movie_commreply_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['movieCommentReplyDisLikes'];
    }
    return $likes;
}
function Wo_GetMovieCommReplyLikes($id) {
    global $sqlConnect, $wo;
    $id    = Wo_Secure($id);
    $likes = 0;
    $sql   = "SELECT COUNT(`id`) as movieCommentReplyLikes FROM " . T_BM_LIKES . " WHERE `movie_commreply_id` = '$id'";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        $likes        = $fetched_data['movieCommentReplyLikes'];
    }
    return $likes;
}
function Wo_IsMovieCommentLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_LIKES . " WHERE `movie_comm_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_IsMovieCommentDisLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_DISLIKES . " WHERE `movie_comm_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_IsMovieCommentReplyLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_LIKES . " WHERE `movie_commreply_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_IsMovieCommentReplyDisLikeExists($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id     = Wo_Secure($id);
    $user   = $wo['user']['id'];
    $sql    = "SELECT `id` FROM " . T_BM_DISLIKES . " WHERE `movie_commreply_id` = '$id' AND `user_id` = '$user'";
    $exists = false;
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query && !empty($query)) {
        $likes = mysqli_num_rows($query);
        if ($likes > 0) {
            $exists = true;
        }
    }
    return $exists;
}
function Wo_RemoveMovieCommentLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_LIKES . " WHERE `movie_comm_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_RemoveMovieCommentDisLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_DISLIKES . " WHERE `movie_comm_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_RemoveMovieCommentReplyDisLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_DISLIKES . " WHERE `movie_commreply_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_RemoveMovieCommentReplyLikes($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $sql  = "DELETE  FROM " . T_BM_LIKES . " WHERE `movie_commreply_id` = '$id' AND `user_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_AddMovieCommentLikes($id, $movie) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$movie || $movie < 1) {
        return false;
    }
    $user    = $wo['user']['id'];
    $id      = Wo_Secure($id);
    $movie   = Wo_Secure($movie);
    $comment = Wo_GetMovieCommentData($id);
    $result  = false;
    @Wo_RemoveMovieCommentDisLikes($id);
    if ($comment && !empty($comment) && !Wo_IsMovieCommentLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_LIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`,`movie_commreply_id`, `user_id`,`movie_id`) 
                        VALUES (NULL, '0', '0', '$id', '0', '$user','$movie')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
        }
    } else if ($comment && !empty($comment) && Wo_RemoveMovieCommentLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_AddMovieCommentDisLikes($id, $movie) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$movie || $movie < 1) {
        return false;
    }
    $id      = Wo_Secure($id);
    $movie   = Wo_Secure($movie);
    $comment = Wo_GetMovieCommentData($id);
    $result  = false;
    $user    = $wo['user']['id'];
    @Wo_RemoveMovieCommentLikes($id);
    if ($comment && !empty($comment) && !Wo_IsMovieCommentDisLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_DISLIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`,`movie_commreply_id`, `user_id`,`movie_id`) 
                        VALUES (NULL, '0', '0','$id','0', '$user','$movie')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
        }
    } else if ($comment && !empty($comment) && Wo_RemoveMovieCommentDisLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_AddMovieCommReplyLikes($id, $movie) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$movie || $movie < 1) {
        return false;
    }
    $id      = Wo_Secure($id);
    $movie   = Wo_Secure($movie);
    $comment = Wo_GetMovieCommReplyData($id);
    $result  = false;
    $user    = $wo['user']['id'];
    if ($comment && !empty($comment) && !Wo_IsMovieCommentReplyLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_LIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`, `movie_commreply_id`, `user_id`,`movie_id`) 
                        VALUES (NULL, '0', '0','0','$id', '$user','$movie')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
            @Wo_RemoveMovieCommentReplyDisLikes($id);
        }
    } else if ($comment && !empty($comment) && Wo_RemoveMovieCommentReplyLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_AddMovieCommReplyDisLikes($id, $movie) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !$movie || $movie < 1) {
        return false;
    }
    $id      = Wo_Secure($id);
    $movie   = Wo_Secure($movie);
    $comment = Wo_GetMovieCommReplyData($id);
    $result  = false;
    $user    = $wo['user']['id'];
    if ($comment && !empty($comment) && !Wo_IsMovieCommentReplyDisLikeExists($id)) {
        $sql   = "INSERT INTO " . T_BM_DISLIKES . " 
                    (`id`, `blog_comm_id`,`blog_commreply_id`, `movie_comm_id`,`movie_commreply_id`, `user_id`,`movie_id`) 
                        VALUES (NULL, '0', '0','0','$id', '$user','$movie')";
        $query = mysqli_query($sqlConnect, $sql);
        if ($query) {
            $result = true;
            @Wo_RemoveMovieCommentReplyLikes($id);
        }
    } else if ($comment && !empty($comment) && Wo_RemoveMovieCommentReplyDisLikes($id)) {
        $result = true;
    }
    return $result;
}
function Wo_GetSideBarAds() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_gender  = $wo['user']['gender'];
    $user_id      = $wo['user']['user_id'];
    $user_country = $wo['user']['country_id'];
    $query_one    = '';
    $con_list     = implode(',', $wo['ad-con']['ads']);
    if ($con_list) {
        $query_one .= " AND `id` NOT IN ({$con_list}) ";
    }
    $sql   = "SELECT * FROM  " . T_USER_ADS . " 
    WHERE `user_id` IN (SELECT `user_id` FROM " . T_USERS . " WHERE `wallet` > 0)
        AND `status` = '1' AND `appears` = 'sidebar' AND
        (`gender` = '$user_gender' OR `gender` = 'all')  AND `audience` LIKE '%$user_country%'
        {$query_one}
        ORDER BY RAND() LIMIT 2";
    $query = mysqli_query($sqlConnect, $sql);
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['ad_media']    = Wo_GetMedia($fetched_data['ad_media']);
        $fetched_data['headline']    = Wo_GetShortTitle($fetched_data['headline'], false, 30);
        $fetched_data['description'] = Wo_GetShortTitle($fetched_data['description'], false, 60);
        if ($fetched_data['bidding'] == 'views') {
            @Wo_RegisterAdConversionView($fetched_data['id']);
        }
        $data[] = $fetched_data;
    }
    return $data;
}
function Wo_DeleteMovieComment($id, $movie) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !Wo_IsMovieCommentOwner($id) || !$movie || $movie < 1) {
        return false;
    }
    $movie = Wo_Secure($movie);
    @mysqli_query($sqlConnect, "DELETE FROM " . T_MOVIE_COMM_REPLIES . " WHERE `comm_id` = '$id'");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_LIKES . " WHERE `movie_comm_id` = '$id' AND `movie_id` = '$movie'");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_DISLIKES . " WHERE `movie_comm_id` = '$id' AND `movie_id` = '$movie'");
    return mysqli_query($sqlConnect, "DELETE FROM " . T_MOVIE_COMMS . " WHERE `id` = '$id'");
}
function Wo_DeleteMovieCommReply($id, $movie) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1 || !Wo_IsMovieCommReplyOwner($id) || !$movie || $movie < 1) {
        return false;
    }
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_LIKES . " WHERE `movie_commreply_id` = '$id' AND `movie_id` = '$movie'");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_BM_DISLIKES . " WHERE `movie_commreply_id` = '$id' AND `movie_id` = '$movie'");
    return mysqli_query($sqlConnect, "DELETE FROM " . T_MOVIE_COMM_REPLIES . " WHERE `id` = '$id'");
}

function Wo_UpdateUserAds($id, $update_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || empty($update_data)) {
        return false;
    }
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . $data . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_USER_ADS . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}

function Wo_IsAdsOwnerNotAdmin($ads_id = 0, $user_id = 0) {
    global $sqlConnect, $wo;
    if (empty($user_id)) {
        $user_id = $wo['user']['user_id'];
    }
    $user_id = Wo_Secure($user_id);
    $ads_id  = Wo_Secure($ads_id);
    $result  = false;
    $query   = mysqli_query($sqlConnect, "SELECT * FROM
            " . T_USER_ADS . " WHERE `id` = '$ads_id'");
    if (!empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        if ($fetched_data['user_id'] == $wo['user']['user_id']) {
            $result = true;
        }
    }
    return $result;
}
function Wo_IsAdsOwner($ads_id = 0, $user_id = 0) {
    global $sqlConnect, $wo;
    if (empty($user_id)) {
        $user_id = $wo['user']['user_id'];
    }
    $user_id = Wo_Secure($user_id);
    $ads_id  = Wo_Secure($ads_id);
    $result  = false;
    $query   = mysqli_query($sqlConnect, "SELECT * FROM
            " . T_USER_ADS . " WHERE `id` = '$ads_id'");
    if (!empty($query)) {
        $fetched_data = mysqli_fetch_assoc($query);
        if ($fetched_data['user_id'] == $wo['user']['user_id'] || $wo['user']['admin'] == 1 || Wo_IsModerator() == true) {
            $result = true;
        }
    }
    return $result;
}
function Wo_DeleteUserAd($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !Wo_IsAdsOwner($id)) {
        return false;
    }
    $query_one = "DELETE FROM " . T_USER_ADS . "  WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_GetMyAds($args = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options   = array(
        "id" => false,
        "offset" => 0
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $id        = Wo_Secure($args['id']);
    $user_id   = $wo['user']['user_id'];
    $query_one = '';
    $data      = array();
    if ($offset > 0) {
        $query_one .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    if ($id && $id > 0 && is_numeric($id)) {
        $query_one .= " AND `id` = '$id' ";
    }
    $sql   = "SELECT `id` FROM  
                " . T_USER_ADS . " 
                    WHERE `user_id` = '$user_id' 
                        {$query_one} ORDER BY `id` 
                            DESC LIMIT 30";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $ad = Wo_GetUserAdData($fetched_data['id']);
        if ($ad && !empty($ad)) {
            $ad['name']     = Wo_GetShortTitle($ad['name']);
            $ad['edit-url'] = Wo_SeoLink('index.php?link1=edit-ads&id=' . $ad['id']);
            $ad['chart-url'] = Wo_SeoLink('index.php?link1=chart-ads&id=' . $ad['id']);
            $data[]         = $ad;
        }
    }
    return $data;
}
function Wo_GetMytransactions($args = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options   = array(
        "id" => false,
        "offset" => 0
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $id        = Wo_Secure($args['id']);
    $user_id   = $wo['user']['user_id'];
    $data      = array();
    if ($offset > 0) {
        $query_one .= " AND `id` < {$offset} AND `id` <> {$offset} ";
    }
    $sql   = "SELECT * FROM " . T_PAYMENT_TRANSACTIONS . " WHERE `userid` = '$user_id' ORDER BY `id` DESC LIMIT 30";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = $fetched_data;
    }
    return $data;
}

function Wo_GetUserAdData($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }

    $table        = T_USER_ADS;
    $query        = mysqli_query($sqlConnect, "SELECT * FROM  `$table` WHERE `id` = '$id' ");
    $fetched_data = mysqli_fetch_assoc($query);
    $data         = false;

    if (!empty($fetched_data)) {
        $fetched_data['user_data']   = Wo_UserData($fetched_data['user_id']);
        $fetched_data['is_owner']    = Wo_IsAdsOwner($fetched_data['id']);
        $fetched_data['country_ids'] = array_values(explode(',', $fetched_data['audience']));
        $fetched_data['ad_media']    = Wo_GetMedia($fetched_data['ad_media']);
        $data                        = $fetched_data;
    }

    return $data;
}

function Wo_GetPostAds($last_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user_gender  = $wo['user']['gender'];
    $user_id      = $wo['user']['user_id'];
    $user_country = $wo['user']['country_id'];
    $query_one    = '';
    $con_list     = implode(',', $wo['ad-con']['ads']);
    if ($last_id && $last_id > 0) {
        $query_one .= " AND `id` < '$last_id' AND `id` <> '$last_id' ";
    }
    if ($con_list) {
        $query_one .= " AND `id` NOT IN ({$con_list}) ";
    }
    $sql          = "SELECT * FROM  " . T_USER_ADS . " 
    WHERE `user_id` IN (SELECT `user_id` FROM " . T_USERS . " WHERE `wallet` > 0)
        AND `status` = '1' AND `appears` = 'post' AND
        (`gender` = '$user_gender' OR `gender` = 'all')  AND `audience` LIKE '%$user_country%'
        {$query_one}
        ORDER BY `id` DESC LIMIT 100";
    $query        = mysqli_query($sqlConnect, $sql);
    $fetched_data = mysqli_fetch_assoc($query);
    $data         = array();
    if (is_array($fetched_data) && !empty($fetched_data)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['is_owner']  = Wo_IsAdsOwner($fetched_data['id']);
        $fetched_data['ad_media']  = Wo_GetMedia($fetched_data['ad_media']);
        $fetched_data['postType']  = 'ad';
        $data                      = $fetched_data;
    }
    return $data;
}
function Wo_GetAds($last_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $query_one = '';
    if ($last_id && $last_id > 0) {
        $query_one .= " AND `id` < '$last_id' AND `id` <> '$last_id' ";
    }
    $sql   = "SELECT * FROM  " . T_USER_ADS . " WHERE `id` > 0 {$query_one} ORDER BY `id` DESC";
    $query = mysqli_query($sqlConnect, $sql);
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['is_owner']  = Wo_IsAdsOwner($fetched_data['id']);
        $fetched_data['ad_media']  = Wo_GetMedia($fetched_data['ad_media']);
        $fetched_data['edit-url']  = Wo_SeoLink('index.php?link1=manage-ads&id=' . $fetched_data['id']);
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_GetAllStories($last_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $query_one = '';
    if ($last_id && $last_id > 0) {
        $query_one .= " AND `id` < '$last_id' AND `id` <> '$last_id' ";
    }
    $sql   = "SELECT * FROM  " . T_USER_STORY . " WHERE `id` > 0 {$query_one} ORDER BY `id` DESC LIMIT 1000000";
    $query = mysqli_query($sqlConnect, $sql);
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $story_expire              = $fetched_data['expire'];
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['expires']   = date("Y/m/d", strtotime("$story_expire +1 day"));
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_IsConversionExists($id) {
    global $wo;
    $adv_ids  = $wo['ad-con'];
    $result   = false;
    $is_admin = Wo_IsAdsOwnerNotAdmin($id);
    if ($id && is_array($adv_ids) && isset($adv_ids['ads'])) {
        if ($is_admin == false) {
            if (array_key_exists($id, $adv_ids['ads'])) {
                $result = true;
            } else {
                $adv_ids['ads'][$id] = $id;
                setcookie('ad-con', htmlentities(serialize($adv_ids)), time() + (10 * 365 * 24 * 60 * 60));
            }
        }
    } else {
        setcookie('ad-con', htmlentities(serialize(array(
            'date' => date('Y-m-d'),
            'ads' => array()
        ))), time() + (10 * 365 * 24 * 60 * 60));
        $result = true;
    }
    return $result;
}
function Wo_RegisterAdConversionClick($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $ad       = Wo_GetUserAdData($id);
    $user     = $wo['user']['user_id'];
    $result   = false;
    $is_admin = Wo_IsAdsOwnerNotAdmin($id);
    if ($ad && is_array($ad) && !empty($ad) && isset($ad['user_data']) && !Wo_IsConversionExists($id) && $is_admin == false) {
        $ad_user_id = $ad['user_data']['user_id'];
        $wallet     = $ad['user_data']['wallet'] -= $wo['config']['ad_c_price'];
        $result     = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `wallet` = '$wallet' WHERE `user_id` = '$ad_user_id'");
        Wo_RegisterAdClick($id);
    } else if ($ad && is_array($ad) && !empty($ad) && isset($ad['user_data']) && $is_admin == false) {
        $result = Wo_RegisterAdClick($id);
    } else {
        return true;
    }
    return $result;
}
function Wo_RegisterAdConversionView($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $ad       = Wo_GetUserAdData($id);
    $user     = $wo['user']['user_id'];
    $result   = false;
    $is_admin = Wo_IsAdsOwnerNotAdmin($id);
    if ($ad && is_array($ad) && !empty($ad) && isset($ad['user_data']) && !Wo_IsConversionExists($id) && $is_admin == false) {
        $ad_user_id = $ad['user_data']['user_id'];
        $wallet     = $ad['user_data']['wallet'] -= $wo['config']['ad_v_price'];
        $result     = mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `wallet` = '$wallet' WHERE `user_id` = '$ad_user_id'");
        Wo_RegisterAdView($id);
    } else if ($ad && is_array($ad) && !empty($ad) && isset($ad['user_data']) && $is_admin == false) {
        $result = Wo_RegisterAdView($id);
    } else {
        return true;
    }
    return $result;
}
function Wo_RegisterAdClick($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $ad     = Wo_GetUserAdData($id);
    $result = false;
    if ($ad && is_array($ad) && !empty($ad)) {
        $ad_user_id = $ad['user_data']['user_id'];
        //record click
        $result1 = mysqli_query($sqlConnect, "INSERT INTO " . T_USERADS_DATA . " (`id`, `user_id`, `ad_id`, `clicks`, `views`, `spend`, `dt`) VALUES (NULL, '".$ad_user_id."', '".$id."', '1', '0', '".$wo['config']['ad_c_price']."', CURRENT_TIMESTAMP);");
        $result = Wo_UpdateUserAds($id, array(
            'clicks' => ($ad['clicks'] + 1)
        ));
    }
    return $result;
}

function Wo_RegisterAdView($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $ad     = Wo_GetUserAdData($id);
    $result = false;
    if ($ad && is_array($ad) && !empty($ad)) {
        $ad_user_id = $ad['user_data']['user_id'];
        //record view
        $result1 = mysqli_query($sqlConnect, "INSERT INTO " . T_USERADS_DATA . " (`id`, `user_id`, `ad_id`, `clicks`, `views`, `spend`, `dt`) VALUES (NULL, '".$ad_user_id."', '".$id."', '0', '1', '".$wo['config']['ad_v_price']."',  CURRENT_TIMESTAMP);");
        $result = Wo_UpdateUserAds($id, array(
            'views' => ($ad['views'] + 1)
        ));
    }
    return $result;
}
function Wo_IsStoryOwner($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $sql    = "SELECT `user_id` FROM " . T_USER_STORY . " WHERE `id` = '$id'";
    $result = false;
    $user   = $wo['user']['id'];
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query) {
        $fetched_data = mysqli_fetch_assoc($query);
        if ($fetched_data['user_id'] == $user || Wo_IsAdmin() || Wo_IsModerator()) {
            $result = true;
        }
    }
    return $result;
}
function Wo_InsertUserStory($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $sql    = "INSERT INTO " . T_USER_STORY . " ({$fields}) VALUES ({$data})";
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_InsertUserStoryMedia($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $sql    = "INSERT INTO " . T_USER_STORY_MEDIA . " ({$fields}) VALUES ({$data})";
    $query  = mysqli_query($sqlConnect, $sql);
    return $query;
}
function Wo_GetStroies($args = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $options   = array(
        "user" => $wo['user']['id'],
        "id" => false,
        "offset" => 0
    );
    $args      = array_merge($options, $args);
    $offset    = Wo_Secure($args['offset']);
    $id        = Wo_Secure($args['id']);
    $user_id   = Wo_Secure($args['user']);
    $query_one = '';
    $data      = array();
    if ($user_id && $user_id > 0 && empty($id)) {
        $query_one .= " AND `user_id` = '$user_id'";
    }
    if ($id && $id > 0) {
        $query_one .= " AND `id` = '$id'";
    }
    if ($offset && $offset > 0) {
        $query_one .= " AND `id` < '$offset' AND `id` <> '$offset'";
    }
    $sql   = "SELECT * FROM " . T_USER_STORY . " WHERE `id` > 0 {$query_one} ORDER BY `id` DESC";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $story_images = Wo_GetStoryMedia($fetched_data['id'], 'image');
        if (count($story_images) > 0) {
            $fetched_data['thumb']  = array_shift($story_images);
            $fetched_data['images'] = $story_images;
        }
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $fetched_data['videos']    = Wo_GetStoryMedia($fetched_data['id'], 'video');
        $fetched_data['is_owner']  = ($fetched_data['user_id'] == $wo['user']['id'] || Wo_IsAdmin() || Wo_IsModerator()) ? true : false;
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_GetStoryMedia($id = false, $type = 'image') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $sql   = "SELECT * FROM " . T_USER_STORY_MEDIA . " WHERE `story_id` = '$id' AND `type` = '$type'";
    $query = mysqli_query($sqlConnect, $sql);
    $data  = array();
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['filename'] = Wo_GetMedia($fetched_data['filename']);
        $data[]                   = $fetched_data;
    }
    return $data;
}

function Wo_CountUserStatus($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user = $id;
    if (!$id || !is_numeric($id) || $id < 1) {
        $user = $wo['user']['id'];
    }
    $sql   = "SELECT COUNT(`id`) AS count FROM " . T_USER_STORY . " WHERE `user_id` = {$user} ";
    $count = 0;
    $query = mysqli_query($sqlConnect, $sql);
    if ($query) {
        $fetched_data = mysqli_fetch_assoc($query);
        $count        = $fetched_data['count'];
    }
    return $count;
}


function Wo_DeleteStatus($id) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsStoryOwner($id)) {
        return false;
    }
    $id         = Wo_Secure($id);
    $data       = array();
    $sql        = "SELECT `filename` FROM " . T_USER_STORY_MEDIA . " WHERE `story_id` = '$id'";
    $storyMedia = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($storyMedia)) {
        $data[] = $fetched_data['filename'];
    }
    if (count($data) > 0) {
        foreach ($data as $key => $path) {
            if (file_exists($path)) {
                //@unlink($path);
            } else {
                //@Wo_DeleteFromToS3($path);
            }
        }
    }
    @mysqli_query($sqlConnect, "DELETE FROM " . T_STORY_SEEN . " WHERE `story_id` = '$id'");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_USER_STORY_MEDIA . " WHERE `story_id` = '$id'");
    $query = mysqli_query($sqlConnect, "DELETE FROM " . T_USER_STORY . " WHERE `id` = '$id'");
    return $query;
}
function Wo_UpdateCommentReply($id, $update_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || empty($update_data) || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . $data . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_COMMENTS_REPLIES . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_GetUsersByName($name = '', $friends = false, $limit = 25) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$name) {
        return false;
    }
    $user        = $wo['user']['id'];
    $name        = Wo_Secure($name);
    $data        = array();
    $sub_sql     = "";
    $t_users     = T_USERS;
    $t_followers = T_FOLLOWERS;
    if ($friends == true) {
        $sub_sql = "
        AND ( `user_id` IN (SELECT `follower_id` FROM $t_followers WHERE `follower_id` <> {$user}  AND `active` = '1')  OR
        `user_id` IN (SELECT `following_id` FROM $t_followers WHERE  `following_id` <> {$user} AND `active` = '1'))";
    }
    $limit_text = '';
    if (!empty($limit) && is_numeric($limit)) {
        $limit      = Wo_Secure($limit);
        $limit_text = 'LIMIT ' . $limit;
    }
    $sql   = "SELECT `user_id` FROM " . T_USERS . " WHERE `user_id` <> {$user} AND `username`  LIKE '%$name%' {$sub_sql} $limit_text";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_GetUserIds() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsAdmin()) {
        return false;
    }
    $data  = array();
    $admin = $wo['user']['id'];
    $query = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_USERS . " WHERE active = '1' AND `user_id` <> {$admin}");
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = $fetched_data['user_id'];
    }
    return $data;
}
function Wo_RegisterAdminNotification($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsAdmin() || empty($registration_data) || empty($registration_data['text'])) {
        return false;
    }
    if (empty($registration_data['full_link']) || empty($registration_data['recipients'])) {
        return false;
    }
    if (!is_array($registration_data['recipients']) || count($registration_data['recipients']) < 1) {
        return false;
    }
    $text  = $registration_data['text'];
    $link  = $registration_data['full_link'];
    $admin = $wo['user']['id'];
    $time  = time();
    $sql   = "INSERT INTO " . T_NOTIFICATION . " (`notifier_id`,`recipient_id`,`type`,`text`,`full_link`,`time`) VALUES ";
    $val   = array();

    foreach ($registration_data['recipients'] as $user_id) {
        if ($admin != $user_id) {
            $val[] = "('$admin','$user_id','admin_notification','$text','$link','$time')";
        }
    }

    $query = mysqli_query($sqlConnect, ($sql . implode(',', $val)));
    return $query;
}

function Wo_HidePost($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || $id < 1) {
        return false;
    }
    $post_id = mysqli_query($sqlConnect, "SELECT `user_id` FROM " . T_POSTS . " WHERE `id` = {$id}");
    $user    = $wo['user']['id'];
    $result  = false;
    if ($post_id && mysqli_num_rows($post_id) > 0) {
        $post_data = mysqli_fetch_assoc($post_id);
        if ($post_data['user_id'] == $user) {
            return false;
        } else {
            $sql    = "INSERT INTO " . T_HIDDEN_POSTS . " (`post_id`, `user_id`) VALUES ('$id','$user')";
            $result = mysqli_query($sqlConnect, $sql);
        }
    }
    return $result;
}
function Wo_SendVerificationRequest($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_array($registration_data) || empty($registration_data) || Wo_IsAdmin()) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $sql    = "INSERT INTO " . T_VERIFICATION_REQUESTS . " ({$fields}) VALUES ({$data})";
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_UpdateVerificationRequest($id = false, $update_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_array($update_data) || empty($update_data) || !$id) {
        return false;
    }
    $id = Wo_Secure($id);
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . $data . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_VERIFICATION_REQUESTS . " SET {$impload} WHERE `id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_IsVerificationRequestExists() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user  = Wo_Secure($wo['user']['id']);
    $sql   = "SELECT `user_id` FROM " . T_VERIFICATION_REQUESTS . " WHERE `user_id` = {$user}";
    $query = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($query) > 0;
}
function Wo_IsThisPostShared($id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $user  = Wo_Secure($wo['user']['id']);
    $id    = Wo_Secure($id);
    $sql   = "SELECT `id` FROM " . T_POSTS . " WHERE parent_id = $id";
    $query = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($query) > 0;
}
function Wo_IsPostShared($id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $user  = Wo_Secure($wo['user']['id']);
    $id    = Wo_Secure($id);
    $sql   = "SELECT `id` FROM " . T_POSTS . " WHERE `id` = {$id} AND parent_id <> 0";
    $query = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($query) > 0;
}
function Wo_IsSharedPostExists($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id) || $id < 1) {
        return false;
    }
    $user  = Wo_Secure($wo['user']['id']);
    $id    = Wo_Secure($id);
    $sql   = "SELECT `id` FROM " . T_POSTS . " WHERE `user_id` = {$user} AND `parent_id` = {$id}";
    $query = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($query) > 0;
}
function Wo_SharePost($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || $id < 1) {
        return false;
    }
    $id   = Wo_Secure($id);
    $user = $wo['user']['id'];
    $time = time();
    $sql  = '';
    if (Wo_IsPostShared($id)) {
        $shared_post = Wo_PostData($id);
        $post = mysqli_query($sqlConnect, "SELECT * FROM " . T_POSTS . " WHERE `id` = {$shared_post['parent_id']}");
        $post_data = mysqli_fetch_assoc($post);
    } else {
        $post = mysqli_query($sqlConnect, "SELECT * FROM " . T_POSTS . " WHERE `id` = {$id}");
        $post_data = mysqli_fetch_assoc($post);
    }

        
    if ($post) {
        $post_data['id']          = 0;
        $post_data['post_id']     = 0;
        $post_data['shared_from'] = $post_data['user_id'];
        $post_data['post_url']    = Wo_SeoLink('index.php?link1=post&id=' . $id);
        $post_data['user_id']     = $user;
        $post_data['parent_id']   = $id;
        $post_data['boosted']     = 0;
        $post_data['time']        = time();
        $fields                   = '`' . implode('`, `', array_keys($post_data)) . '`';
        $data                     = '\'' . implode('\', \'', $post_data) . '\'';
        $sql                      = "INSERT INTO " . T_POSTS . " ({$fields}) VALUES ({$data})";
        $query1                   = mysqli_query($sqlConnect, $sql);
        $last                     = mysqli_insert_id($sqlConnect);
        $query2                   = mysqli_query($sqlConnect, "UPDATE " . T_POSTS . " SET `post_id` = {$last} WHERE `id` = {$last}");
        if ($query1 && $query2) {
            return true;
        }
    }
    return false;
}
function Wo_GenirateSiteMap($updating = 'daily') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsAdmin()) {
        return false;
    }
    include('assets/libraries/sitemap-php/Sitemap.php');
    $site    = $wo['config']['site_url'];
    $sitemap = new Sitemap($site . '/');
    $sitemap->setPath('./');
    if (!in_array($updating, array(
        'daily',
        'always',
        'hourly',
        'weekly',
        'monthly',
        'yearly',
        'never'
    ))) {
        $updating = 'daily';
    }
    $sitemap->setFilename('sitemap');
    $profiles = mysqli_query($sqlConnect, "SELECT `username` FROM " . T_USERS . " WHERE `active` = '1'");
    while ($fetched_data = mysqli_fetch_assoc($profiles)) {
        $sitemap->addItem($fetched_data['username'], '1.0', $updating, 'Today');
    }
    $groups = mysqli_query($sqlConnect, "SELECT `group_name` FROM " . T_GROUPS . " WHERE `active` = '1'");
    while ($fetched_data = mysqli_fetch_assoc($groups)) {
        $sitemap->addItem($fetched_data['group_name'], '0.9', $updating, 'Today');
    }
    $pages = mysqli_query($sqlConnect, "SELECT `page_name` FROM " . T_PAGES . " WHERE `active` = '1'");
    while ($fetched_data = mysqli_fetch_assoc($pages)) {
        $sitemap->addItem($fetched_data['page_name'], '0.9', $updating, 'Today');
    }
    $posts = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_POSTS . " WHERE `postPrivacy` = '0'");
    while ($fetched_data = mysqli_fetch_assoc($posts)) {
        $sitemap->addItem('post/' . $fetched_data['id'], '0.8', $updating, 'Today');
    }
    $blogs = mysqli_query($sqlConnect, "SELECT `id`,`title` FROM " . T_BLOG);
    while ($fetched_data = mysqli_fetch_assoc($blogs)) {
        $url = 'read-blog/' . $fetched_data['id'] . '_' . Wo_SlugPost($fetched_data['title']);
        $sitemap->addItem($url, '0.7', $updating, 'Today');
    }
    $sitemap->addItem('blog', '0.6', $updating, 'Today');
    $sitemap->addItem('forum', '0.5', $updating, 'Today');
    $sitemap->addItem('movies', '0.5', $updating, 'Today');
    $sitemap->addItem('terms/about-us', '0.1', 'never');
    $sitemap->addItem('contact-us', '0.1', 'never');
    $sitemap->addItem('terms/privacy-policy', '0.1', 'yearly');
    $sitemap->addItem('terms/terms', '0.1', 'yearly');
    $sitemap->addItem('developers', '0.1', 'yearly');
    $sitemap->createSitemapIndex($site . '/xml/', 'Today');
    return true;
}
function Wo_GetAdminInvitation() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsAdmin()) {
        return false;
    }
    $query = mysqli_query($sqlConnect, "SELECT * FROM " . T_INVITATIONS . " ORDER BY `id` DESC ");
    $data  = array();
    $site  = $wo['config']['site_url'] . '/register?invite=';
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['url'] = $site . $fetched_data['code'];
        $data[]              = $fetched_data;
    }
    return $data;
}
function Wo_InsertAdminInvitation() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsAdmin()) {
        return false;
    }
    $time  = time();
    $code  = uniqid(rand(), true);
    $sql   = "INSERT INTO " . T_INVITATIONS . " (`id`,`code`,`posted`) VALUES (NULL,'$code', '$time')";
    $site  = $wo['config']['site_url'] . '/register?invite=';
    $query = mysqli_query($sqlConnect, $sql);
    if ($query) {
        $last_id = mysqli_insert_id($sqlConnect);
        $data    = mysqli_query($sqlConnect, "SELECT * FROM " . T_INVITATIONS . " WHERE `id` = {$last_id}");
        if ($data && mysqli_num_rows($data) > 0) {
            $fetched_data        = mysqli_fetch_assoc($data);
            $fetched_data['url'] = $site . $fetched_data['code'];
            return $fetched_data;
        }
    }
    return false;
}
function Wo_DeleteAdminInvitation($col = '', $val = false) {
    global $sqlConnect, $wo;
    if (!$val && !$col) {
        return false;
    }
    $val = Wo_Secure($val);
    $col = Wo_Secure($col);
    return mysqli_query($sqlConnect, "DELETE FROM " . T_INVITATIONS . " WHERE `$col` = '$val'");
}
function Wo_IsAdminInvitationExists($code = false) {
    global $sqlConnect, $wo;
    if (!$code) {
        return false;
    }
    $code      = Wo_Secure($code);
    $data_rows = mysqli_query($sqlConnect, "SELECT `id` FROM " . T_INVITATIONS . " WHERE `code` = '$code'");
    return mysqli_num_rows($data_rows) > 0;
}
function Wo_FriendPrivacy($user_id = false, $friend_privacy = false) {
    global $sqlConnect, $wo;
    if (!$user_id) {
        return false;
    }
    if ($wo['loggedin'] == true) {
        if ($user_id == $wo['user']['user_id']) {
            return true;
        }
        $loggedin_user  = $wo['user']['id'];
        $user_id        = Wo_Secure($user_id);
        $friend_privacy = Wo_Secure($friend_privacy);
        $privacy        = false;
        if ($friend_privacy == 0) {
            return true;
        } elseif ($friend_privacy == 1) {
            
            $sql       = "SELECT `id` FROM " . T_FOLLOWERS . " 
                    WHERE  `follower_id`  = {$user_id} 
                    AND    `following_id` = {$loggedin_user} 
                    AND    `active`       = '1'";
            $data_rows = mysqli_query($sqlConnect, $sql);
            return mysqli_num_rows($data_rows) > 0;
        } elseif ($friend_privacy == 2) {
            $sql       = "SELECT `id` FROM " . T_FOLLOWERS . " 
                    WHERE  `follower_id`  = {$loggedin_user} 
                    AND    `following_id` = {$user_id}
                    AND    `active`       = '1'";
            $data_rows = mysqli_query($sqlConnect, $sql);
            return mysqli_num_rows($data_rows) > 0;
        }
    } else {
        if ($friend_privacy == 0) {
            return true;
        }
    }
    return false;
}
function Wo_IsGroupUserExists($user_id = false, $group_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($user_id) || !is_numeric($group_id)) {
        return false;
    }
    $sql       = " SELECT `id` FROM " . T_GROUP_ADMINS . " WHERE `user_id` = {$user_id} AND `group_id` = {$group_id} ";
    $data_rows = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($data_rows) > 0;
}
function Wo_IsPageAdminExists($user_id = false, $page_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($user_id) || !is_numeric($page_id)) {
        return false;
    }
    $sql       = " SELECT `id` FROM " . T_PAGE_ADMINS . " WHERE `user_id` = {$user_id} AND `page_id` = {$page_id} ";
    $data_rows = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($data_rows) > 0;
}
function Wo_AddGroupAdmin($user_id = false, $group_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($user_id) || !is_numeric($group_id)) {
        return false;
    }
    $user_id  = Wo_Secure($user_id);
    $group_id = Wo_Secure($group_id);
    $code     = false;
    $group    = Wo_GroupData($group_id);
    if ($wo['user']['id'] != $group['user_id'] && !Wo_IsGroupUserExists($wo['user']['id'], $group_id)) {
        return false;
    }
    if (Wo_IsGroupUserExists($user_id, $group_id)) {
        @mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_ADMINS . " WHERE `user_id` = {$user_id} AND `group_id` = {$group_id}");
        $code = 0;
    } else {
        @mysqli_query($sqlConnect, "INSERT INTO " . T_GROUP_ADMINS . " (`id`,`user_id`,`group_id`) VALUES (null,$user_id,$group_id)");
        $group                   = Wo_GroupData($group_id);
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'type' => 'group_admin',
            'user_id' => $wo['user']['id'],
            'url' => 'index.php?link1=timeline&u=' . $group['group_name']
        );
        Wo_RegisterNotification($notification_data_array);
        $code = 1;
    }
    return $code;
}
function Wo_CheckGroupAdminPassword($password = false, $group_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($password) || !is_numeric($group_id)) {
        return false;
    }
    $user_id  = Wo_Secure($wo['user']['user_id']);
    $group_id = Wo_Secure($group_id);
    $match    = false;
    if (Wo_IsGroupUserExists($user_id, $group_id)) {
        $sql  = "SELECT `password` FROM " . T_USERS . " WHERE `user_id` = {$user_id}";
        $data = mysqli_query($sqlConnect, $sql);
        if (mysqli_num_rows($data) == 1) {
            $fetched_data = mysqli_fetch_assoc($data);
            if (Wo_HashPassword($password, $fetched_data['password'])) {
                $match = true;
            }
        }
    }
    return $match;
}
function Wo_CheckPageAdminPassword($password = false, $page_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($page_id)) {
        return false;
    }
    $user_id = Wo_Secure($wo['user']['user_id']);
    $page_id = Wo_Secure($page_id);
    $match   = false;
    if (Wo_IsPageAdminExists($user_id, $page_id)) {
        $sql  = "SELECT `password` FROM " . T_USERS . " WHERE `user_id` = {$user_id}";
        $data = mysqli_query($sqlConnect, $sql);
        if (mysqli_num_rows($data) == 1) {
            $fetched_data = mysqli_fetch_assoc($data);
            if (Wo_HashPassword($password, $fetched_data['password'])) {
                $match = true;
            }
        }
    }
    return $match;
}
function Wo_AddPageAdmin($user_id = false, $page_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($user_id) || !is_numeric($page_id)) {
        return false;
    }
    $user_id = Wo_Secure($user_id);
    $page_id = Wo_Secure($page_id);
    $code    = false;
    $page    = Wo_PageData($page_id);
    if ($wo['user']['id'] != $page['user_id'] && !Wo_IsPageAdminExists($wo['user']['id'], $page_id)) {
        return false;
    }
    if (Wo_IsPageAdminExists($user_id, $page_id)) {
        @mysqli_query($sqlConnect, "DELETE FROM " . T_PAGE_ADMINS . " WHERE `user_id` = {$user_id} AND `page_id` = {$page_id}");
        $code = 0;
    } else {
        @mysqli_query($sqlConnect, "INSERT INTO " . T_PAGE_ADMINS . " (`id`,`user_id`,`page_id`) VALUES (null,$user_id,$page_id)");
        $code                    = 1;
        $page                    = Wo_PageData($page_id);
        $notification_data_array = array(
            'recipient_id' => $user_id,
            'type' => 'page_admin',
            'user_id' => $wo['user']['id'],
            'url' => 'index.php?link1=timeline&u=' . $page['page_name']
        );
        Wo_RegisterNotification($notification_data_array);
    }
    return $code;
}
function Wo_GetPageAdmins($page_id = false, $return = 'all') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($page_id)) {
        return false;
    }
    $page_id = Wo_Secure($page_id);
    $sql     = " SELECT `user_id` FROM " . T_PAGE_ADMINS . " WHERE `page_id` = {$page_id}";
    $data    = array();
    $query   = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        if ($return == 'all') {
            $user                  = Wo_UserData($fetched_data['user_id']);
        } else {
             $user['user_id']       = $fetched_data['user_id'];
        }
        $user['page_id']       = $page_id;
        $user['is_page_onwer'] = true;
        $data[]                = $user;
    }
    return $data;
}
function Wo_CreateGChat($name = false, $parts = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_array($parts) || !$name || count($parts) < 1) {
        return false;
    }
    $user  = Wo_Secure($wo['user']['id']);
    $time  = time();
    $id    = false;
    $sql   = "INSERT INTO " . T_GROUP_CHAT . " (`group_id`,`user_id`,`group_name`,`time`) VALUES (null,'$user','$name','$time')";
    $query = mysqli_query($sqlConnect, $sql);
    if ($query) {
        $id = mysqli_insert_id($sqlConnect);
        if ($id && is_numeric($id)) {
            foreach ($parts as $part_id) {
                $sub_sql = "INSERT INTO " . T_GROUP_CHAT_USERS . " (`id`,`user_id`,`group_id`) VALUES (null,'$part_id','$id')";
                @mysqli_query($sqlConnect, $sub_sql);
            }
        }
    }
    return $id;
}
function Wo_UpdateGChat($id = false, $update_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_array($update_data) || empty($update_data) || !$id) {
        return false;
    }
    $id = Wo_Secure($id);
    foreach ($update_data as $field => $data) {
        $update[] = '`' . $field . '` = \'' . $data . '\'';
    }
    $impload   = implode(', ', $update);
    $query_one = "UPDATE " . T_GROUP_CHAT . " SET {$impload} WHERE `group_id` = {$id} ";
    $query     = mysqli_query($sqlConnect, $query_one);
    return $query;
}
function Wo_GroupTabData($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id)) {
        return false;
    }
    $data  = null;
    $time  = time();
    $user  = $wo['user']['id'];
    $sql   = "SELECT * FROM " . T_GROUP_CHAT . " WHERE `group_id` = {$id} ";
    $query = mysqli_query($sqlConnect, $sql);
    @Wo_UpdateGChatLastSeen($id);
    if ($query && mysqli_num_rows($query) > 0) {
        $data             = mysqli_fetch_assoc($query);
        $data['messages'] = Wo_GetGroupMessages(array(
            'group_id' => $data['group_id']
        ));
    }
    return $data;
}
function Wo_UpdateGChatLastSeen($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id)) {
        return false;
    }
    $time = time();
    $user = $wo['user']['id'];
    $id   = Wo_Secure($id);
    return mysqli_query($sqlConnect, "UPDATE " . T_GROUP_CHAT_USERS . "  SET `last_seen` = '$time' WHERE `user_id` = {$user} AND `group_id` = {$id} ");
}
function Wo_IsGChatOwner($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id)) {
        return false;
    }
    $group = Wo_GroupTabData($id);
    $owner = false;
    if (is_array($group) && isset($group['user_id'])) {
        $group_admin = $group['user_id'];
        $user_id     = $wo['user']['id'];
        $owner       = ($group_admin == $user_id || Wo_IsAdmin()) ? true : false;
    }
    return $owner;
}
function Wo_GetChatGroupLastMessage($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !is_numeric($id)) {
        return false;
    }
    $sql   = "SELECT `from_id`,`time` FROM " . T_MESSAGES . " WHERE `group_id` = {$id} ORDER BY `id` DESC LIMIT 1";
    $data  = array();
    $query = mysqli_query($sqlConnect, $sql);
    if ($query && mysqli_num_rows($query) > 0) {
        $fetched_data              = mysqli_fetch_assoc($query);
        $fetched_data['user_data'] = Wo_UserData($fetched_data['from_id']);
        $data                      = $fetched_data;
    }
    return $data;
}
function Wo_GetChatGroups($after_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user    = Wo_Secure($wo['user']['id']);
    $data    = array();
    $sub_sql = '';
    if ($after_id && is_numeric($after_id) && $after_id > 0) {
        $sub_sql = " AND `group_id` > {$after_id} AND `group_id` <> {$after_id} ";
    }
    $sql   = "SELECT * FROM " . T_GROUP_CHAT . " 
                WHERE (`user_id` = {$user} OR `group_id` IN 
                   (SELECT `group_id` FROM Wo_GroupChatUsers  WHERE `user_id` = {$user})) {$sub_sql}";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data']    = Wo_UserData($fetched_data['user_id']);
        $fetched_data['owner']        = ($fetched_data['user_id'] == $user) ? true : false;
        $fetched_data['last_message'] = Wo_GetChatGroupLastMessage($fetched_data['group_id']);
        $fetched_data['parts']        = Wo_GetGChatMemebers($fetched_data['group_id']);
        $fetched_data['avatar']       = Wo_GetMedia($fetched_data['avatar']);
        $fetched_data['last_seen']    = Wo_CheckLastGroupAction();
        $data[]                       = $fetched_data;
    }
    return $data;
}
function Wo_CheckLastGroupAction() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user   = $wo['user']['id'];
    $groups = array();
    $time   = time();
    $sql    = "SELECT `last_seen`,`group_id` FROM " . T_GROUP_CHAT_USERS . " WHERE `user_id` = {$user}";
    $query  = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $last_message = Wo_GetChatGroupLastMessage($fetched_data['group_id']);
        if (!empty($last_message) && isset($last_message['time']) && isset($last_message['from_id'])) {
            if ($last_message['time'] > $fetched_data['last_seen'] && $last_message['from_id'] != $user) {
                $groups[] = $fetched_data['group_id'];
            }
        }
    }
    return $groups;
}
function Wo_GetGChatMemebers($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $id    = Wo_Secure($id);
    $data  = array();
    $sql   = " SELECT `user_id` FROM " . T_GROUP_CHAT_USERS . " WHERE `group_id` = {$id} AND `active` = '1'";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $data[] = Wo_UserData($fetched_data['user_id']);
    }
    return $data;
}
function Wo_ClearGChat($group_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsGChatOwner($group_id)) {
        return false;
    }
    return mysqli_query($sqlConnect, "DELETE FROM " . T_MESSAGES . " WHERE `group_id` = {$group_id}");
}
function Wo_DeleteGChat($group_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !Wo_IsGChatOwner($group_id)) {
        return false;
    }
    @mysqli_query($sqlConnect, "DELETE FROM " . T_MESSAGES . " WHERE `group_id` = {$group_id}");
    @mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_CHAT_USERS . " WHERE `group_id` = {$group_id}");
    return mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_CHAT . " WHERE `group_id` = {$group_id}");
}
function Wo_ExitGChat($group_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$group_id || $group_id < 1) {
        return false;
    }
    $user = Wo_Secure($wo['user']['id']);
    @mysqli_query($sqlConnect, "DELETE FROM " . T_MESSAGES . " WHERE `group_id` = {$group_id} AND `from_id` = {$user}");
    return mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_CHAT_USERS . " WHERE `group_id` = {$group_id} AND `user_id` = {$user}");
}
function Wo_IsGChatMemeberExists($group_id = false, $user_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$group_id || $group_id < 1) {
        return false;
    }
    $user  = Wo_Secure($user_id);
    $group = Wo_Secure($group_id);
    if ($user_id === false) {
        $user = $wo['user']['user_id'];
    }
    $sql       = " SELECT `id` FROM " . T_GROUP_CHAT_USERS . " WHERE `user_id` = {$user} AND `group_id` = {$group}";
    $data_rows = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($data_rows) > 0;
}
function Wo_AddGChatPart($group_id = false, $user_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$group_id || !$user_id) {
        return false;
    }
    $group = Wo_Secure($group_id);
    $user  = Wo_Secure($user_id);
    $code  = 0;
    if (!Wo_IsGChatOwner($group)) {
        return false;
    }
    if (Wo_IsGChatMemeberExists($group, $user)) {
        @mysqli_query($sqlConnect, "DELETE FROM " . T_GROUP_CHAT_USERS . " WHERE `user_id` = {$user} AND `group_id` = {$group}");
        $code = 0;
    } else {
        @mysqli_query($sqlConnect, "INSERT INTO " . T_GROUP_CHAT_USERS . " (`id`,`user_id`,`group_id`) VALUES (null,$user,$group)");
        $code = 1;
    }
    return $code;
}
function Wo_IsReportExists($id = false, $type = 'user') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !$type) {
        return false;
    }
    $id    = Wo_Secure($id);
    $type  = Wo_Secure($type);
    $user  = $wo['user']['id'];
    $match = null;
    if ($type == 'user') {
        $sql       = " SELECT `id` FROM " . T_REPORTS . " WHERE `profile_id` = {$id} AND `user_id` = {$user}";
        $data_rows = mysqli_query($sqlConnect, $sql);
        $match     = mysqli_num_rows($data_rows) > 0;
    } else if ($type == 'page') {
        $sql       = " SELECT `id` FROM " . T_REPORTS . " WHERE `page_id` = {$id} AND `user_id` = {$user}";
        $data_rows = mysqli_query($sqlConnect, $sql);
        $match     = mysqli_num_rows($data_rows) > 0;
    } else if ($type == 'group') {
        $sql       = " SELECT `id` FROM " . T_REPORTS . " WHERE `group_id` = {$id} AND `user_id` = {$user}";
        $data_rows = mysqli_query($sqlConnect, $sql);
        $match     = mysqli_num_rows($data_rows) > 0;
    }
    return $match;
}
function Wo_ReportUser($user = false, $text = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$user) {
        return false;
    }
    if ($user == $wo['user']['id']) {
        return false;
    }
    $user_id = $wo['user']['id'];
    $time    = time();
    $code    = null;
    if (!Wo_IsReportExists($user, 'user')) {
        $sql = " INSERT INTO " . T_REPORTS . " (`id`,`profile_id`,`user_id`,`text`,`time`)
                 VALUES (null,'$user','$user_id','$text','$time')";
        @mysqli_query($sqlConnect, $sql);
        $code = 1;
    } else {
        $sql = " DELETE FROM " . T_REPORTS . " WHERE `user_id` = {$user_id} AND `profile_id` = {$user} ";
        @mysqli_query($sqlConnect, $sql);
        $code = 0;
    }
    return $code;
}
function Wo_ReportPage($page = false, $text = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$page) {
        return false;
    }
    $user      = $wo['user']['id'];
    $page_data = Wo_PageData($page);
    if (!is_array($page_data) || !isset($page_data['user_id'])) {
        return false;
    }
    if ($page_data['user_id'] == $wo['user']['id']) {
        return false;
    }
    $user_id = $wo['user']['id'];
    $time    = time();
    $code    = null;
    if (!Wo_IsReportExists($page, 'page')) {
        $sql1 = " INSERT INTO " . T_REPORTS . " (`id`,`page_id`,`user_id`,`text`,`time`)
                 VALUES (null,'$page','$user_id','$text','$time')";
        @mysqli_query($sqlConnect, $sql1);
        $code = 1;
    } else {
        $sql2 = " DELETE FROM " . T_REPORTS . " WHERE `user_id` = {$user_id} AND `page_id` = {$page} ";
        @mysqli_query($sqlConnect, $sql2);
        $code = 0;
    }
    return $code;
}
function Wo_ReportGroup($group = false, $text = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$group) {
        return false;
    }
    $user       = $wo['user']['id'];
    $group_data = Wo_GroupData($group);
    if (!is_array($group_data) || !isset($group_data['user_id'])) {
        return false;
    }
    if ($group_data['user_id'] == $wo['user']['id']) {
        return false;
    }
    $user_id = $wo['user']['id'];
    $time    = time();
    $code    = null;
    if (!Wo_IsReportExists($group, 'group')) {
        $sql1 = " INSERT INTO " . T_REPORTS . " (`id`,`group_id`,`user_id`,`text`,`time`)
                 VALUES (null,'$group','$user_id','$text','$time')";
        @mysqli_query($sqlConnect, $sql1);
        $code = 1;
    } else {
        $sql2 = " DELETE FROM " . T_REPORTS . " WHERE `user_id` = {$user_id} AND `group_id` = {$group} ";
        @mysqli_query($sqlConnect, $sql2);
        $code = 0;
    }
    return $code;
}
function Wo_IsPageRatingExists($page_id = false, $user_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($user_id) || !is_numeric($page_id)) {
        return false;
    }
    $sql       = " SELECT `id` FROM " . T_PAGE_RATING . " WHERE `user_id` = {$user_id} AND `page_id` = {$page_id} ";
    $data_rows = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($data_rows) > 0;
}
function Wo_RatePage($page_id = false, $value = false, $text = '') {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$page_id || !$value) {
        return false;
    }
    if (!is_numeric($page_id) || $page_id < 1 || !is_numeric($value) || $value < 0) {
        return false;
    }
    $value   = Wo_Secure($value);
    $page_id = Wo_Secure($page_id);
    $text    = Wo_Secure($text);
    $user    = $wo['user']['id'];
    $rate    = false;
    if (Wo_IsPageRatingExists($page_id, $user)) {
        return false;
    }
    return mysqli_query($sqlConnect, "INSERT INTO " . T_PAGE_RATING . " (`user_id`,`page_id`,`valuation`,`review`) VALUES ('$user','$page_id','$value','$text')");
}
function Wo_PageRating($page_id = false, $user_id = 0) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$page_id || !is_numeric($page_id)) {
        return false;
    }
    $sql   = " SELECT `valuation` FROM " . T_PAGE_RATING . " WHERE `page_id` = {$page_id}";
    if (!empty($user_id) && is_numeric($user_id)) {
        $sql .= " AND user_id = '{$user_id}'";
    }
    $query = mysqli_query($sqlConnect, $sql);
    $one   = 0;
    $two   = 0;
    $three = 0;
    $four  = 0;
    $five  = 0;
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        if ($fetched_data['valuation'] == 1) {
            $one += $fetched_data['valuation'];
        } else if ($fetched_data['valuation'] == 2) {
            $two += $fetched_data['valuation'];
        } else if ($fetched_data['valuation'] == 3) {
            $three += $fetched_data['valuation'];
        } else if ($fetched_data['valuation'] == 4) {
            $four += $fetched_data['valuation'];
        } else {
            $five += $fetched_data['valuation'];
        }
    }
    if (($five + $four + $three + $two + $one) > 0) {
        return ($five * 5 + $four * 4 + $three * 3 + $two * 2 + $one * 1) / ($five + $four + $three + $two + $one);
    } else {
        return 0;
    }
}
function Wo_GetPageReviews($page_id = false, $after_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$page_id || !is_numeric($page_id)) {
        return false;
    }
    $page_id = Wo_Secure($page_id);
    $sub_sql = '';
    $data    = array();
    if ($after_id && is_numeric($after_id) && $after_id > 0) {
        $sub_sql = " AND `id` < '$after_id' AND `id` <> '$after_id' ";
    }
    $sql   = " SELECT * FROM " . T_PAGE_RATING . " WHERE `page_id` = {$page_id} {$sub_sql} ORDER BY `id` DESC LIMIT 50";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_RegisterFamilyMember($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_array($registration_data) || empty($registration_data)) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $sql    = "INSERT INTO " . T_FAMILY . " ({$fields}) VALUES ({$data})";
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_DeleteFamilyMember($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $user = $wo['user']['id'];
    $sql  = "DELETE FROM " . T_FAMILY . " WHERE (`member_id` = '$id' AND `user_id` = '$user') OR (`member_id` = '$user' AND `user_id` = '$id') ";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_AcceptFamilyMember($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $user = $wo['user']['id'];
    $sql  = "UPDATE " . T_FAMILY . " SET `active` = '1' WHERE (`member_id` = '$id' AND `user_id` = '$user') OR (`member_id` = '$user' AND `user_id` = '$id') ";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_AcceptRelationRequest($id = false, $member = fasle, $type = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id || !$member || !$type) {
        return false;
    }
    $user = $wo['user']['id'];
    $sql  = "UPDATE " . T_REL_SHIP . " SET `active` = '1' WHERE `id` = '$id'";
    $sql2 = "DELETE FROM " . T_REL_SHIP . " WHERE (`from_id` = '$user' OR `to_id` = '$user' OR `from_id` = '$member' OR `to_id` = '$member') AND `id` <> '$id'";
    $sql3 = "UPDATE " . T_REL_SHIP . " SET `relationship_id` = '$type' WHERE `user_id` = '$member'";
    @mysqli_query($sqlConnect, $sql2);
    @mysqli_query($sqlConnect, $sql3);
    return mysqli_query($sqlConnect, $sql);
}
function Wo_DeleteMyRelationShip() {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user = $wo['user']['id'];
    $sql  = "DELETE FROM " . T_REL_SHIP . " WHERE `from_id` = '$user' OR `to_id` = '$user'";
    return mysqli_query($sqlConnect, $sql);
}
function Wo_DeleteRelationRequest($id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$id) {
        return false;
    }
    $user = $wo['user']['id'];
    $sql  = "SELECT `id` FROM " . T_REL_SHIP . " WHERE `id` = '$id' AND `to_id` = '$user' ";
    $data = mysqli_query($sqlConnect, $sql);
    if (mysqli_num_rows($data) > 0) {
        return mysqli_query($sqlConnect, "DELETE FROM " . T_REL_SHIP . " WHERE  `id` = '$id'");
    }
    return false;
}
function Wo_IsRelationRequestExists($from_id = false, $to_id = false, $type = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !$from_id || !$to_id || !$type) {
        return false;
    }
    $to_id   = Wo_Secure($to_id);
    $from_id = Wo_Secure($from_id);
    $sql     = "SELECT `id` FROM " . T_REL_SHIP . " 
                WHERE (`from_id` = '$from_id' AND `to_id` = '$to_id') 
                OR (`to_id` = '$from_id' AND `from_id` = '$to_id') AND `active` = '0' AND `relationship` = '$type'";
    $data    = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($data) > 0;
}
function Wo_IsFamilyMemberExists($user_id = false, $member_id = false, $active = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($user_id) || !is_numeric($member_id)) {
        return false;
    }
    $sub_sql = '';
    if ($active === 1 || $active === 0) {
        $sub_sql = " AND `active` = '$active' ";
    }
    $sql       = " SELECT `id` FROM " . T_FAMILY . " WHERE `user_id` = {$user_id} AND `member_id` = {$member_id} {$sub_sql}";
    $data_rows = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($data_rows) > 0;
}
function Wo_GetFamalyMember($member_id = false, $user_id = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_numeric($user_id) || !is_numeric($member_id)) {
        return false;
    }
    $sql    = " SELECT * FROM " . T_FAMILY . " WHERE `user_id` = {$user_id} AND `member_id` = {$member_id} LIMIT 1";
    $status = '';
    $query  = mysqli_query($sqlConnect, $sql);
    if (mysqli_num_rows($query) > 0) {
        $fetched_data = mysqli_fetch_assoc($query);
        if ($fetched_data['active'] == 1) {
            $status = $wo['lang'][$wo['family'][$fetched_data['member']]];
        } else {
            $pendind = $wo['lang']['pending'];
            $status  = $wo['lang'][$wo['family'][$fetched_data['member']]] . " ($pendind) ";
        }
    }
    return $status;
}
function Wo_GetFamaly($user_id = false, $after_id = false, $active = 1, $requests = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || ($active != 1 && $active != 0)) {
        return false;
    }
    $user = Wo_Secure($user_id);
    $data = array();
    if (!is_numeric($user_id) || $user_id < 1) {
        $user = $wo['user']['id'];
    }
    $subquery = '';
    if ($after_id && is_numeric($after_id) && $after_id > 0) {
        $subquery = " AND `id` < '$after_id' AND `id` <> '$after_id' ";
    }
    $sql = "SELECT * FROM " . T_FAMILY . " WHERE `user_id` = '$user' {$subquery} AND `active` = '$active' ORDER BY `id` DESC ";
    if ($requests) {
        $sql = "SELECT * FROM " . T_FAMILY . " WHERE `member_id` = '$user' {$subquery} AND `active` = '$active' AND `requesting` <> '$user' ORDER BY `id` DESC";
    }
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $user_data                 = ($requests == true) ? $fetched_data['user_id'] : $fetched_data['member_id'];
        $fetched_data['user_data'] = Wo_UserData(($user_data));
        $fetched_data['type']      = 'family';
        $data[]                    = $fetched_data;
    }
    $sql   = " SELECT * FROM " . T_REL_SHIP . " WHERE `to_id` = '$user' AND `active` = '0' ORDER BY `id` DESC ";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data'] = Wo_UserData($fetched_data['from_id']);
        $fetched_data['type']      = 'rel_ship';
        $data[]                    = $fetched_data;
    }
    return $data;
}
function Wo_RegisterRelationship($registration_data = array()) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false || !is_array($registration_data) || empty($registration_data)) {
        return false;
    }
    $fields = '`' . implode('`, `', array_keys($registration_data)) . '`';
    $data   = '\'' . implode('\', \'', $registration_data) . '\'';
    $sql    = "INSERT INTO " . T_REL_SHIP . " ({$fields}) VALUES ({$data})";
    $query  = mysqli_query($sqlConnect, $sql);
    if ($query) {
        return mysqli_insert_id($sqlConnect);
    }
    return false;
}
function Wo_UserRelationship($user = false) {
    global $sqlConnect, $wo;
    if ($wo['loggedin'] == false) {
        return false;
    }
    $user = Wo_Secure($user);
    if (!$user || !is_numeric($user) || $user < 1) {
        $user = $wo['user']['id'];
    }
    $user_data = Wo_UserData($user);
    $sql       = "SELECT * FROM " . T_REL_SHIP . " WHERE (`from_id` = '$user' OR `to_id` = '$user') AND `active` = '1' LIMIT 1";
    $query     = mysqli_query($sqlConnect, $sql);
    $relation  = '';
    if (mysqli_num_rows($query) > 0) {
        $fetched_data = mysqli_fetch_assoc($query);
        $with_id      = ($fetched_data['to_id'] == $user) ? $fetched_data['from_id'] : $fetched_data['to_id'];
        $with_data    = Wo_UserData($with_id);
        if ($fetched_data['relationship'] == 1) {
            $relation = $wo['relationship'][1];
        }
        if ($fetched_data['relationship'] == 2) {
            $relation = $wo['lang']['relation_with'] . ' @' . $with_data['name'];
        } else if ($fetched_data['relationship'] == 3) {
            $relation = $wo['lang']['married_to'] . ' @' . $with_data['name'];
        } else if ($fetched_data['relationship'] == 4) {
            $relation = $wo['lang']['engaged_to'] . ' @' . $with_data['name'];
        }
    } else if (array_key_exists($user_data['relationship_id'], $wo['relationship'])) {
        $relation = $wo['relationship'][$user_data['relationship_id']];
    }
    return $relation;
}
function GetUserAge($birthday = false) {
    global $wo;
    if ($wo['loggedin'] == false || !$birthday || $birthday < 1) {
        return false;
    }
    $user_age = '';
    try {
        $birthday     = date("Y-m-d", strtotime($birthday));
        $birthday_obj = new DateTime($birthday);
        $current_date = new DateTime();
        $age          = $birthday_obj->diff($current_date);
        $years        = $age->y;
        if ($years) {
            $user_age = $age->y . ' ' . $wo['lang']['years_old'];
        }
        
    }
    catch (Exception $e) {
        
    }
    return $user_age;
}
function Wo_GetUserCountryName($user_data = array()) {
    global $wo;
    if ($wo['loggedin'] == false || empty($user_data)) {
        return false;
    }
    $age       = GetUserAge($user_data['birthday']);
    $user_from = (!empty($age)) ? $age : '';
    if ($user_data['country_id'] > 0 && in_array($user_data['country_id'], array_keys($wo['countries_name']))) {
        $user_from_arr = array(
            0 => $user_from,
            1 => $user_data['address'],
            2 => $wo['countries_name'][$user_data['country_id']]
        );
        $data          = array();
        foreach ($user_from_arr as $value) {
            if ($value) {
                $data[] = $value;
            }
        }
        $user_from = implode(', ', $data);
    }
    return $user_from;
}
function Wo_GetNearbyUsers($args = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false || empty($args)) {
        return false;
    }
    $options      = array(
        "offset" => false,
        "gender" => false,
        "name" => false,
        "distance" => false,
        "relship" => false,
        "status" => false,
        "limit" => 20
    );
    $args         = array_merge($options, $args);
    $offset       = Wo_Secure($args['offset']);
    $gender       = Wo_Secure($args['gender']);
    $name         = Wo_Secure($args['name']);
    $loc_distance = Wo_Secure($args['distance']);
    $status       = Wo_Secure($args['status']);
    $relship      = Wo_Secure($args['relship']);
    $limit        = Wo_Secure($args['limit']);
    $unit         = 6371;
    $user_lat     = $wo['user']['lat'];
    $user_lng     = $wo['user']['lng'];
    $user         = $wo['user']['id'];
    $t_users      = T_USERS;
    $t_followers  = T_FOLLOWERS;
    $distance     = 25;
    $data         = array();
    $sub_sql      = "";
    if ($loc_distance && is_numeric($loc_distance) && $loc_distance > 0) {
        $distance = $loc_distance;
    }
    if ($name) {
        $name = Wo_Secure($name);
        $sub_sql .= " AND (`username` LIKE '%$name%' OR `first_name` LIKE '%$name%' OR `last_name` LIKE '%$name%') ";
    }
    if (isset($status) && $status != false) {
        if ($status == 1) {
            $time = time() - 60;
            $sub_sql .= " AND `lastseen` > '$time'";
        } else if ($status == 0) {
            $time = time() - 60;
            $sub_sql .= " AND `lastseen` < '$time'";
        }
    }
    if ($relship && in_array($relship, array_keys($wo['relationship']))) {
        $sub_sql .= " AND `relationship_id`  = '$relship' ";
    }
    if ($offset && is_numeric($offset) && $offset > 0) {
        $sub_sql .= " AND `user_id` <  '$offset' AND `user_id` <> '$offset' ";
    }
    if ($gender && in_array($gender, array(
        'male',
        'female'
    ))) {
        $sub_sql .= " AND `gender` = '$gender' ";
    }
    $sql   = "
    SELECT `user_id`, ( {$unit} * acos(cos(radians('$user_lat'))  * 
    cos(radians(lat)) * cos(radians(lng) - radians('$user_lng')) + 
    sin(radians('$user_lat')) * sin(radians(lat ))) ) AS distance 
    FROM $t_users WHERE `user_id` <> '$user'   {$sub_sql}
    AND `user_id` NOT IN (SELECT `follower_id` FROM $t_followers WHERE `follower_id` <> {$user} AND `following_id` = {$user} AND `active` = '1')
    AND `user_id` NOT IN (SELECT `following_id` FROM $t_followers WHERE `follower_id` = {$user} AND `following_id` <> {$user} AND `active` = '1')
    AND `lat` <> 0 AND `lng` <> 0
    HAVING distance < '$distance' ORDER BY `user_id` DESC LIMIT 0, $limit ";
    $query = mysqli_query($sqlConnect, $sql);
    while ($fetched_data = mysqli_fetch_assoc($query)) {
        $fetched_data['user_data']        = Wo_UserData($fetched_data['user_id']);
        $fetched_data['user_data']['age'] = Wo_GetUserCountryName($fetched_data['user_data']);
        $fetched_data['user_geoinfo']     = $fetched_data['user_data']['lat'] . ',' . $fetched_data['user_data']['lng'];
        if ($fetched_data['user_data']['share_my_location'] == 1) {
            $data[] = $fetched_data;
        }
        
    }
    return $data;
}
function Wo_GetNearbyUsersCount($args = array()) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false || empty($args)) {
        return false;
    }
    $options      = array(
        "offset" => false,
        "gender" => false,
        "name" => false,
        "distance" => false,
        "relship" => false,
        "status" => false,
        "limit" => 20
    );
    $args         = array_merge($options, $args);
    $offset       = Wo_Secure($args['offset']);
    $gender       = Wo_Secure($args['gender']);
    $name         = Wo_Secure($args['name']);
    $loc_distance = Wo_Secure($args['distance']);
    $status       = Wo_Secure($args['status']);
    $relship      = Wo_Secure($args['relship']);
    $limit        = Wo_Secure($args['limit']);
    $unit         = 6371;
    $user_lat     = $wo['user']['lat'];
    $user_lng     = $wo['user']['lng'];
    $user         = $wo['user']['id'];
    $t_users      = T_USERS;
    $t_followers  = T_FOLLOWERS;
    $distance     = 25;
    $data         = array();
    $sub_sql      = "";
    if ($loc_distance && is_numeric($loc_distance) && $loc_distance > 0) {
        $distance = $loc_distance;
    }
    if ($name) {
        $name = Wo_Secure($name);
        $sub_sql .= " AND (`username` LIKE '%$name%' OR `first_name` LIKE '%$name%' OR `last_name` LIKE '%$name%') ";
    }
    if (isset($status) && $status != false) {
        if ($status == 1) {
            $time = time() - 60;
            $sub_sql .= " AND `lastseen` > '$time'";
        } else if ($status == 0) {
            $time = time() - 60;
            $sub_sql .= " AND `lastseen` < '$time'";
        }
    }
    if ($relship && in_array($relship, array_keys($wo['relationship']))) {
        $sub_sql .= " AND `relationship_id`  = '$relship' ";
    }
    if ($offset && is_numeric($offset) && $offset > 0) {
        $sub_sql .= " AND `user_id` <  '$offset' AND `user_id` <> '$offset' ";
    }
    if ($gender && in_array($gender, array(
        'male',
        'female'
    ))) {
        $sub_sql .= " AND `gender` = '$gender' ";
    }
    $sql   = "
    SELECT COUNT(user_id), ( {$unit} * acos(cos(radians('$user_lat'))  * 
    cos(radians(lat)) * cos(radians(lng) - radians('$user_lng')) + 
    sin(radians('$user_lat')) * sin(radians(lat ))) ) AS distance 
    FROM $t_users WHERE `user_id` <> '$user'   {$sub_sql}
    AND `user_id` NOT IN (SELECT `follower_id` FROM $t_followers WHERE `follower_id` <> {$user} AND `following_id` = {$user} AND `active` = '1')
    AND `user_id` NOT IN (SELECT `following_id` FROM $t_followers WHERE `follower_id` = {$user} AND `following_id` <> {$user} AND `active` = '1')
    AND `lat` <> 0 AND `lng` <> 0 GROUP BY user_id
    HAVING distance < '$distance' ORDER BY `user_id` DESC ";
    $query = mysqli_query($sqlConnect, $sql);
    return mysqli_num_rows($query);
}
function Wo_CountStories($user_id = 0) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($user_id)) {
        $user_id = $wo['user']['user_id'];
    }
    $data         = array();
    $user_id      = Wo_Secure($user_id);
    $query        = "SELECT COUNT(*) as count FROM " . T_USER_STORY . " WHERE (user_id IN (SELECT following_id FROM " . T_FOLLOWERS . " WHERE follower_id = '$user_id') OR user_id = $user_id) AND user_id IN (SELECT user_id FROM " . T_USERS . " WHERE active = '1') ORDER BY id DESC";
    $query_run    = mysqli_query($sqlConnect, $query);
    $fetched_data = mysqli_fetch_assoc($query_run);
    return $fetched_data['count'];
}
function Wo_GetFriendsStatus($data_array = array('limit' => 8, 'user_id' => 0)) {
    global $wo, $sqlConnect;
    if ($wo['loggedin'] == false) {
        return false;
    }
    if (empty($data_array['user_id'])) {
        $data_array['user_id'] = $wo['user']['user_id'];
    }
    $data      = array();
    $user_id   = Wo_Secure($data_array['user_id']);
    $group_by = "GROUP BY user_id";
    if (!empty($data_array['api'])) {
        $group_by = "";
    }
    // $query     = "SELECT * FROM " . T_USER_STORY . " WHERE (user_id IN (SELECT following_id FROM " . T_FOLLOWERS . " WHERE follower_id = '$user_id') OR user_id = $user_id) AND user_id IN (SELECT user_id FROM " . T_USERS . " WHERE active = '1') $group_by ORDER BY id DESC";
    $query     = "SELECT DISTINCT user_id,title,description,posted,expire,thumbnail,(SELECT MAX(us.id) FROM " . T_USER_STORY . " us WHERE us.user_id = " . T_USER_STORY . ".user_id) AS id  FROM " . T_USER_STORY . " WHERE (user_id IN (SELECT following_id FROM " . T_FOLLOWERS . " WHERE follower_id = '$user_id') OR user_id = $user_id) AND user_id IN (SELECT user_id FROM " . T_USERS . " WHERE active = '1') $group_by ORDER BY id DESC LIMIT ".$data_array['limit'];
    $query_run = mysqli_query($sqlConnect, $query);

    while ($fetched_data = mysqli_fetch_assoc($query_run)) {
        $story_images              = Wo_GetStoryMedia($fetched_data['id'], 'image');
        $fetched_data['user_data'] = Wo_UserData($fetched_data['user_id']);
        if (empty($fetched_data['thumbnail'])) {
            $fetched_data['thumb']['filename'] = $fetched_data['user_data']['avatar_org'];
        } else {
            $fetched_data['thumb']             = array();
            $fetched_data['thumb']['filename'] = $fetched_data['thumbnail'];
        }
        $fetched_data['thumb']['filename'] = Wo_GetMedia($fetched_data['thumb']['filename']);
        $fetched_data['videos']            = Wo_GetStoryMedia($fetched_data['id'], 'video');
        $fetched_data['is_owner']          = ($fetched_data['user_id'] == $wo['user']['id'] || Wo_IsAdmin() || Wo_IsModerator()) ? true : false;
        $data[]                            = $fetched_data;
    }

    return $data;
}

function Wo_HashPassword($password = '', $hashed_password) {
    global $wo, $sqlConnect;
    if (empty($password)) {
        return '';
    }
    $hash = 'md5';
    if (preg_match('/^[a-f0-9]{32}$/', $hashed_password)) {
        $hash = 'md5';
    } else if (preg_match('/^[0-9a-f]{40}$/i', $hashed_password)) {
        $hash = 'sha1';
    }
    $password = $hash($password);
    if ($password == $hashed_password) {
        return true;
    }
    return false;
}

function Wo_UpdateUserDetails($user_id = 0, $me = false, $time = true, $get_data = false, $counts = false) {
    global $wo, $sqlConnect;
    if (empty($user_id)) {
        return false;
    }
    if ($me == true && is_array($user_id)) {
        $wo['user_profile'] = $user_id;
    } else {
        $user_id = Wo_Secure($user_id);
        $wo['user_profile'] = Wo_UserData($user_id);
    }
    if (empty($wo['user_profile'])) {
        return false;
    }
    $last_data_update_time = time() - $wo['config']['update_user_profile'];

    $time_now = time();
    $cache = false;
    if ($time == true) {
       if ($wo['user_profile']['last_data_update'] < $last_data_update_time) {
          $cache = true;
       }
    } else {
        $cache = true;
    }
    if ($cache == true) {
        $final_data = array(
            'post_count' => Wo_CountUserPosts($wo['user_profile']['user_id']),
            'album_count' => Wo_CountUserAlbums($wo['user_profile']['user_id']),
            'following_count' => Wo_CountFollowing($wo['user_profile']['user_id']),
            'followers_count' => Wo_CountFollowers($wo['user_profile']['user_id']),
            'groups_count' => Wo_CountUserGroups($wo['user_profile']['user_id']),
            'likes_count' => Wo_CountUserLikes($wo['user_profile']['user_id']),
            'mutual_friends_count' => Wo_CountMutualFriends($wo['user_profile']['user_id'])
        );
        if ($counts == false) {
            $get_following_ids = Wo_GetFollowing($wo['user_profile']['user_id'], 'profile', 9);
            $following_ids = array();
            foreach ($get_following_ids as $key => $user) {
                $following_ids[] = $user['user_id'];
            }

            $get_followers_ids = Wo_GetFollowers($wo['user_profile']['user_id'], 'profile', 9);
            $followers_ids = array();
            foreach ($get_followers_ids as $key => $user) {
                $followers_ids[] = $user['user_id'];
            }

            $get_mutual_ids = Wo_GetMutualFriends($wo['user_profile']['user_id'], 'profile', 9);
            $mutual_ids = array();
            foreach ($get_mutual_ids as $key => $user) {
                $mutual_ids[] = $user['user_id'];
            }

            $get_likes_ids = Wo_GetLikes($wo['user_profile']['user_id'], 'profile', 9);
            $likes_ids = array();
            foreach ($get_likes_ids as $key => $page) {
                $likes_ids[] = $page['page_id'];
            }

            $get_groups_ids = Wo_GetUsersGroups($wo['user_profile']['user_id'], 9);
            $groups_ids = array();
            foreach ($get_groups_ids as $key => $group) {
                $groups_ids[] = $group['id'];
            }
            
            $sidebar_data = array(
                'following_data' => $following_ids,
                'followers_data' => $followers_ids,
                'likes_data' => $likes_ids,
                'groups_data' => $groups_ids,
                'mutual_friends_data' => $mutual_ids
            );
            $sidebar_data = serialize($sidebar_data);
        }
        
        $user_id = $wo['user_profile']['user_id'];
        $details = serialize($final_data);

        if ($counts == false) {
           $query = mysqli_query($sqlConnect, "UPDATE "  . T_USERS . " SET `last_data_update` = '$time_now', `details` = '$details', `sidebar_data` = '$sidebar_data' WHERE user_id = '$user_id'");
        } else {
            $query = mysqli_query($sqlConnect, "UPDATE "  . T_USERS . " SET `last_data_update` = '$time_now', `details` = '$details' WHERE user_id = '$user_id'");
        }
        
        if ($query && $get_data == true) {
            return Wo_UserData($wo['user_profile']['user_id']);
        }
    }
}

function Wo_DeleteAllData($type = 0) {
    global $wo, $sqlConnect;
    if (empty($type) || Wo_IsAdmin() == false) {
        return false;
    }
    $me = $wo['user']['user_id'];
    if ($type == 1) {
        $query = mysqli_query($sqlConnect, "SELECT user_id FROM " . T_USERS . " WHERE active = '0' OR active = '2'");
        while ($row = mysqli_fetch_assoc($query)) {
            $delete_user = Wo_DeleteUser($row['user_id']);
        }
    }
    if ($type == 2) {
        $time = strtotime("-1 week");
        $query = mysqli_query($sqlConnect, "SELECT user_id FROM " . T_USERS . " WHERE lastseen < $time AND status = '0' AND user_id <> $me");
        while ($row = mysqli_fetch_assoc($query)) {
            $delete_user = Wo_DeleteUser($row['user_id']);
        }
    }
    if ($type == 3) {
        $time = strtotime("-1 month");
        $query = mysqli_query($sqlConnect, "SELECT user_id FROM " . T_USERS . " WHERE lastseen < $time AND status = '0' AND user_id <> $me");
        while ($row = mysqli_fetch_assoc($query)) {
            $delete_user = Wo_DeleteUser($row['user_id']);
        }
    }
    if ($type == 4) {
        $time = strtotime("-1 year");
        $query = mysqli_query($sqlConnect, "SELECT user_id FROM " . T_USERS . " WHERE lastseen < $time AND status = '0' AND user_id <> $me");
        while ($row = mysqli_fetch_assoc($query)) {
            $delete_user = Wo_DeleteUser($row['user_id']);
        }
    }

    if ($type == 5) {
        $time = strtotime("-1 week");
        $query = mysqli_query($sqlConnect, "SELECT id FROM " . T_POSTS . " WHERE time < $time AND user_id <> $me");
        while ($row = mysqli_fetch_assoc($query)) {
            $delete_post = Wo_DeletePost($row['id']);
        }
    }
    if ($type == 6) {
        $time = strtotime("-1 month");
        $query = mysqli_query($sqlConnect, "SELECT id FROM " . T_POSTS . " WHERE time < $time AND user_id <> $me");
        while ($row = mysqli_fetch_assoc($query)) {
            $delete_post = Wo_DeletePost($row['id']);
        }
    }
    if ($type == 7) {
        $time = strtotime("-1 year");
        $query = mysqli_query($sqlConnect, "SELECT id FROM " . T_POSTS . " WHERE time < $time AND user_id <> $me");
        while ($row = mysqli_fetch_assoc($query)) {
            $delete_post = Wo_DeletePost($row['id']);
        }
    }
    return true;
}

function Wo_AutoFollow($user_id = 0) {
    global $wo, $db;
    if (empty($user_id)) {
        return false;
    }
    if (!is_numeric($user_id) || $user_id == 0) {
        return false;
    }
    $wo['loggedin'] = true;
    $wo['user']['user_id'] = $user_id;
    $get_users = explode(',', $wo['config']['auto_friend_users']);
    if (!empty($get_users)) {
        foreach ($get_users as $key => $user) {
            $user = trim($user);
            $user = Wo_Secure($user);
            $getUserID = Wo_UserIdFromUsername($user);
            if (!empty($getUserID)) {
                if ($wo['config']['connectivitySystem'] == 1) {
                    $registerFollow = Wo_RegisterFollow($wo['user']['user_id'], $getUserID);
                    $registerFollow = Wo_AcceptFollowRequest($getUserID, $wo['user']['user_id']);
                } else {
                    $registerFollow = Wo_RegisterFollow($getUserID, $wo['user']['user_id']);
                }
            }
        }
        return true;
    } else {
        return false;
    }
}

function Wo_MarkAllChatsAsRead($user_id = 0) {
    global $wo, $db;
    if (Wo_IsAdmin() === false) {
        if ($wo['user']['user_id'] != $user_id) {
            return false;
        }
    }
    $update = $db->where('to_id', $user_id)->update(T_MESSAGES, array('seen' => time()));
    if ($update) {
        return true;
    }
    return false;
}
function Wo_TwoFactor($username = '', $id_or_u = 'user') {
    global $wo, $db;
    if (empty($username)) {
        return true;
    }
    if ($wo['config']['two_factor'] == 0) {
        return true;
    }

    if ($id_or_u == 'id') {
        $getuser = Wo_UserData($username);
    } else {
        $getuser = Wo_UserData(Wo_UserIdForLogin($username));
    }

    if ($getuser['two_factor'] == 0) {
        return true;
    }

    $code = rand(111111, 999999);
    $hash_code = md5($code);
    $update_code =  $db->where('user_id', $getuser['user_id'])->update(T_USERS, array('email_code' => $hash_code));

    $message = "Your confirmation code is: $code";

    if (!empty($getuser['phone_number']) && ($wo['config']['two_factor_type'] == 'both' || $wo['config']['two_factor_type'] == 'phone')) {
        $send_message = Wo_SendSMSMessage($getuser['phone_number'], $message);
    }
    if ($wo['config']['two_factor_type'] == 'both' || $wo['config']['two_factor_type'] == 'email') {
        $send_message_data       = array(
            'from_email' => $wo['config']['siteEmail'],
            'from_name' => $wo['config']['siteName'],
            'to_email' => $getuser['email'],
            'to_name' => $getuser['name'],
            'subject' => 'Please verify that it’s you',
            'charSet' => 'utf-8',
            'message_body' => $message,
            'is_html' => true
        );
        $send = Wo_SendMessage($send_message_data);
    }
    return false;
}
function Wo_VerfiyIP($username = '') {
    global $wo, $db;
    if (empty($username)) {
        return false;
    }
    if ($wo['config']['login_auth'] == 0) {
        return true;
    }
    $getuser = Wo_UserData(Wo_UserIdForLogin($username));
    $get_ip = get_ip_address();
    $getIpInfo = fetchDataFromURL("http://ip-api.com/json/$get_ip");
    $getIpInfo = json_decode($getIpInfo, true);
    if ($getIpInfo['status'] == 'success' && !empty($getIpInfo['regionName']) && !empty($getIpInfo['countryCode']) && !empty($getIpInfo['timezone']) && !empty($getIpInfo['city'])) {
        $create_new = false;
        $_SESSION['last_login_data'] = $getIpInfo;
        if (empty($getuser['last_login_data'])) {
            $create_new = true;
        } else {
            $lastLoginData = unserialize($getuser['last_login_data']);
            if (($getIpInfo['regionName'] != $lastLoginData['regionName']) || ($getIpInfo['countryCode'] != $lastLoginData['countryCode']) || ($getIpInfo['timezone'] != $lastLoginData['timezone']) || ($getIpInfo['city'] != $lastLoginData['city'])) {
                // send email
                $code = rand(111111, 999999);
                $hash_code = md5($code);
                $wo['email']['username'] = $getuser['name'];
                $wo['email']['countryCode'] = $getIpInfo['countryCode'];
                $wo['email']['timezone'] = $getIpInfo['timezone'];
                $wo['email']['email'] = $getuser['email'];
                $wo['email']['ip_address'] = $get_ip;
                $wo['email']['code'] = $code;
                $wo['email']['city'] = $getIpInfo['city'];
                $wo['email']['date'] = date("Y-m-d h:i:sa");
                $update_code =  $db->where('user_id', $getuser['user_id'])->update(T_USERS, array('email_code' => $hash_code));
                $email_body = Wo_LoadPage("emails/unusual-login"); 
                $send_message_data       = array(
                    'from_email' => $wo['config']['siteEmail'],
                    'from_name' => $wo['config']['siteName'],
                    'to_email' => $getuser['email'],
                    'to_name' => $getuser['name'],
                    'subject' => 'Please verify that it’s you',
                    'charSet' => 'utf-8',
                    'message_body' => $email_body,
                    'is_html' => true
                );
                $send = Wo_SendMessage($send_message_data);
                if ($send && !empty($_SESSION['last_login_data'])) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
        if ($create_new == true) {
            $lastLoginData = serialize($getIpInfo);
            $update_user = $db->where('user_id', $getuser['user_id'])->update(T_USERS, array('last_login_data' => $lastLoginData));
            return true;
        }
        return false;
    } else {
        return true;
    }
}

function Wo_GetAllStatus()
{
    global $wo, $db;
    $user_id = $wo['user']['user_id'];
    return $db->rawQuery("SELECT DISTINCT user_id,title,description,posted,expire,thumbnail,(SELECT MAX(us.id) FROM " . T_USER_STORY . " us WHERE us.user_id = " . T_USER_STORY . ".user_id) AS id  FROM " . T_USER_STORY . " WHERE (user_id IN (SELECT following_id FROM " . T_FOLLOWERS . " WHERE follower_id = '$user_id') OR user_id = $user_id) AND user_id IN (SELECT user_id FROM " . T_USERS . " WHERE active = '1') GROUP BY user_id ORDER BY id DESC");
}
