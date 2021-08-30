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
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
if (file_exists('assets/init.php')) {
    require 'assets/init.php';
} else {
    die('Please put this file in the home directory !');
}

$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_users` ADD `is_pro` INT(15) NOT NULL DEFAULT '0' AFTER `active`, ADD INDEX (`is_pro`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_users` ADD `posts` INT NOT NULL DEFAULT '0' AFTER `is_pro`;");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_users` ADD `wallet` DECIMAL(13,2) NOT NULL DEFAULT '00.0' AFTER `posts`, ADD INDEX (`wallet`);");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES 
  (NULL, 'pro_pkg_price', '8'),
  (NULL, 'go_pro', '0'),
  (NULL, 'user_max_posts', '10'),
  (NULL, 'paypal_mode', 'sandbox'),
  (NULL, 'paypal_id', NULL),
  (NULL, 'paypal_secret', NULL),
  (NULL, 'ad_c_price', '0.2'),
  (NULL, 'usr_ads', '0');");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_payments` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL DEFAULT '0',
 `type` varchar(200) NOT NULL DEFAULT '',
 `amount` int(11) NOT NULL DEFAULT '0',
 `date` varchar(100) NOT NULL DEFAULT '',
 `expire` varchar(30) NOT NULL DEFAULT '',
 PRIMARY KEY (`id`),
 KEY `expire` (`expire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_user_ads` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL DEFAULT '0',
 `title` varchar(500) NOT NULL DEFAULT '',
 `url` varchar(3000) NOT NULL DEFAULT '',
 `placement` varchar(150) NOT NULL DEFAULT '',
 `status` int(5) NOT NULL DEFAULT '1',
 `spent` decimal(13,2) NOT NULL DEFAULT '0.00',
 `results` int(11) NOT NULL DEFAULT '0',
 `media_file` varchar(3000) NOT NULL DEFAULT '',
 `time` varchar(100) NOT NULL DEFAULT '0',
 `type` varchar(100) NOT NULL DEFAULT '',
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`),
 KEY `status` (`status`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;");
if (file_exists('.htaccess') && file_exists('htaccess.txt')) {
    $put = @file_put_contents('.htaccess', file_get_contents('htaccess.txt'));
}

echo 'The script is successfully updated to v1.2!';
$name = md5(microtime()) . '_updated.php';
rename('update.php', $name);
exit();