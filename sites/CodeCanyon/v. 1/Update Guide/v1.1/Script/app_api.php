<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2017 phpflame. All rights reserved.
// +------------------------------------------------------------------------+
require_once('assets/init.php');
header_remove('Server');
$api_version  = '1.0';
$type         = '';
$applications = array('phone');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$application = 'phone';
if (!empty($_GET['application'])) {
    if (in_array($_GET['application'], $applications)) {
        $application = FL_Secure($_GET['application']);
    }
}
if (!empty($_GET['type'])) {
    $type = FL_Secure($_GET['type']);
} 

if ($application == 'phone') {
    
    switch ($type) {
        case 'user_login':
            include "api/$application/login.php";
            break;
        case 'user_registration':
            include "api/$application/register_user.php";
            break;
        case 'reset_passwd':
            include "api/$application/reset_passwd.php";
            break;
        case 'get_cats':
            include "api/$application/get_categories.php";
            break;
        case 'post_data':
            include "api/$application/post_data.php";
            break;
        case 'latest_posts':
            include "api/$application/latest_posts.php";
            break;
        case 'posts_by_category':
            include "api/$application/posts_by_category.php";
            break;
        case 'search_posts':
            include "api/$application/search_posts.php";
            break;
        case 'get_settings':
            include "api/$application/get_settings.php";
            break;
    }
}
mysqli_close($sqlConnect);
unset($fl);
?>