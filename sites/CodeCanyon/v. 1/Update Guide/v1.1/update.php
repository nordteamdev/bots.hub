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

$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'wowonder_app_key', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'wowonder_app_ID', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'wowonder', '2');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'wownder_domain_uri', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'wownder_site_name', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'vkontakte_app_key', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'vkontakte', '2');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'vkontakte_app_ID', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'vkontakte_app_key', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'rss_feed', '');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'rss_feed_limit', '10');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'theme', 'default');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'logo_extension', 'png'), (NULL, 'icon_extension', 'png');");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'logo', 'themes/default/img/logo.png'), (NULL, 'favicon', 'themes/default/img/icon.png');");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_polls` ADD 
    `type` VARCHAR(10) CHARACTER SET utf8 COLLATE 
    utf8_general_ci NOT NULL DEFAULT '' AFTER `time`;");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_users` ADD 
    `timezone` VARCHAR( 50) CHARACTER SET utf8 COLLATE 
    utf8_general_ci NOT NULL DEFAULT 'UTC' AFTER `ip_address`;");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_users` ADD 
    `device_id` VARCHAR(100) CHARACTER SET utf8 COLLATE 
    utf8_general_ci NOT NULL DEFAULT '' AFTER `language`;");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_ads` (`id`, `type`, `code`, `active`) VALUES
(1, 'header', NULL, '0'),
(2, 'footer', NULL, '0'),
(3, 'sidebar', NULL, '0'),
(4, 'home_latest_news', NULL, '0'),
(5, 'home_latest_lists', NULL, '0'),
(6, 'home_latest_videos', NULL, '0'),
(7, 'home_latest_music', NULL, '0'),
(8, 'between', NULL, '0');");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_user_reactions` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL DEFAULT '0',
 `post_id` int(11) NOT NULL DEFAULT '0',
 `page` varchar(10) NOT NULL DEFAULT '',
 `ip_address` varchar(100) NOT NULL DEFAULT '',
 `option_id` int(11) NOT NULL DEFAULT '0',
 `time` varchar(50) NOT NULL DEFAULT '0',
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_comments` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL,
 `news_id` int(11) NOT NULL DEFAULT '0',
 `text` text,
 `likes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
 `dislikes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
 `time` varchar(30) NOT NULL DEFAULT '0',
 `page` varchar(10) NOT NULL DEFAULT '',
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`),
 KEY `news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_comm_replies` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL DEFAULT '0',
 `news_id` int(11) NOT NULL DEFAULT '0',
 `comment` int(11) NOT NULL DEFAULT '0',
 `text` text,
 `likes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
 `dislikes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
 `time` varchar(30) NOT NULL DEFAULT '0',
 `page` varchar(10) NOT NULL DEFAULT '',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_announcement` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `text` text,
 `time` int(32) NOT NULL DEFAULT '0',
 `active` enum('0','1') NOT NULL DEFAULT '1',
 PRIMARY KEY (`id`),
 KEY `active` (`active`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_announcement_views` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL DEFAULT '0',
 `announcement_id` int(11) NOT NULL DEFAULT '0',
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`),
 KEY `announcement_id` (`announcement_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_br_news` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL DEFAULT '0',
 `expire` varchar(50) NOT NULL DEFAULT '0',
 `url` varchar(3000) NOT NULL DEFAULT '',
 `text` varchar(1000) NOT NULL DEFAULT '',
 `active` enum('0','1') NOT NULL DEFAULT '0',
 `time` varchar(50) NOT NULL DEFAULT '0',
 `posted` varchar(50) NOT NULL DEFAULT '0',
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'news', '1'), (NULL, 'lists', '1'), (NULL, 'polls', '1'), (NULL, 'music', '1'), (NULL, 'quizzes', '1'), (NULL, 'videos', '1');");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_profile_fields` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
 `description` text COLLATE utf8_unicode_ci,
 `type` text COLLATE utf8_unicode_ci,
 `length` int(11) NOT NULL DEFAULT '0',
 `placement` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'profile',
 `registration_page` int(11) NOT NULL DEFAULT '0',
 `profile_page` int(11) NOT NULL DEFAULT '0',
 `select_type` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'none',
 `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
 PRIMARY KEY (`id`),
 KEY `registration_page` (`registration_page`),
 KEY `active` (`active`),
 KEY `profile_page` (`profile_page`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_uc_fields` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL DEFAULT '0',
 `fid_3` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
 `fid_1` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
 `fid_2` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_banned_ip` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `ip_address` varchar(32) NOT NULL DEFAULT '',
 `time` int(11) NOT NULL DEFAULT '0',
 PRIMARY KEY (`id`),
 KEY `ip_address` (`ip_address`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;");
$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_reports` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `post_id` int(11) NOT NULL DEFAULT '0',
 `profile_id` int(11) NOT NULL DEFAULT '0',
 `page_id` int(15) NOT NULL DEFAULT '0',
 `user_id` int(11) NOT NULL DEFAULT '0',
 `text` text,
 `type` varchar(30) NOT NULL DEFAULT '',
 `seen` int(11) NOT NULL DEFAULT '0',
 `time` int(11) NOT NULL DEFAULT '0',
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`),
 KEY `post_id` (`post_id`),
 KEY `seen` (`seen`),
 KEY `profile_id` (`profile_id`),
 KEY `page_id` (`page_id`),
 KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES 
    (NULL, 'last_backup', '00-00-0000'),
    (NULL, 'can_post', '1'),
    (NULL, 'header_ccx', '/* Add here your JavaScript Code. Note. the code entered here will be added in <head> tag Example: var x, y, z; x = 5; y = 6; z = x + y; */'), 
    (NULL, 'footer_ccx', ' /* The code entered here will be added in <footer> tag */'), 
    (NULL, 'styles_ccx', '/* Add here your custom css styles Example: p { text-align: center; color: red; } */ '),
    (NULL, 'amazone_s3', '0'),
    (NULL, 'bucket_name', ''), 
    (NULL, 'amazone_s3_key', ''), 
    (NULL, 'amazone_s3_s_key', ''), 
    (NULL, 'region', ''),
    (NULL, 'apps_api_id', '" . md5(microtime()) . "'), 
    (NULL, 'comment_system', 'both'), 
    (NULL, 'apps_api_key', '" . md5(time()) . "'),
    (NULL, 'google_code', ''),
    (NULL, 'review_posts', '0');");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_config` CHANGE `value` `value` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;");

$query = mysqli_query($sqlConnect, "INSERT INTO `fl_ads` (`id`, `type`, `code`, `active`) VALUES
(1, 'header', '', '0'),
(2, 'footer', '', '0'),
(3, 'sidebar', '', '0'),
(4, 'home_latest_news', '', '0'),
(5, 'home_latest_lists', '', '0'),
(6, 'home_latest_videos', '', '0'),
(7, 'home_latest_music', '', '0'),
(8, 'between', '', '0');");

$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_quizzes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` text COLLATE utf8_unicode_ci,
  `short_title` text COLLATE utf8_unicode_ci,
  `slug` text COLLATE utf8_unicode_ci,
  `description` text COLLATE utf8_unicode_ci,
  `tags` text COLLATE utf8_unicode_ci,
  `category` int(11) NOT NULL DEFAULT '0',
  `image` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `viewable` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `shares` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL DEFAULT '0',
  `last_update` int(11) NOT NULL DEFAULT '0',
  `entries_per_page` int(32) NOT NULL DEFAULT '0',
  `views` int(11) NOT NULL DEFAULT '0',
  `featured` int(11) NOT NULL DEFAULT '0',
  `registered` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0/0000',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");

$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_quiz_answers` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL DEFAULT '0',
  `result_index` int(11) NOT NULL DEFAULT '0',
  `text` varchar(3000) NOT NULL DEFAULT '',
  `image` varchar(5000) NOT NULL DEFAULT '',
  `time` varchar(50) NOT NULL DEFAULT '0',
  `type` varchar(30) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`),
  ADD KEY `active` (`active`),
  ADD KEY `featured` (`featured`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quizzes` ADD FULLTEXT KEY `slug` (`slug`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quizzes` ADD FULLTEXT KEY `short_title` (`short_title`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quizzes` ADD FULLTEXT KEY `title_2` (`title`,`description`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quiz_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `result_index` (`result_index`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quiz_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;");


$query = mysqli_query($sqlConnect, "CREATE TABLE `fl_verification_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(300) NOT NULL DEFAULT '',
  `message` text,
  `passport` varchar(3000) NOT NULL DEFAULT '',
  `photo` varchar(3000) NOT NULL DEFAULT '',
  `type` varchar(100) NOT NULL DEFAULT 'user',
  `time` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_verification_requests`
  ADD PRIMARY KEY (`id`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_verification_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;");

if (file_exists('.htaccess') && file_exists('htaccess.txt')) {
    $put = @file_put_contents('.htaccess', file_get_contents('htaccess.txt'));
}

echo 'The script is successfully updated to v1.1!';
$name = md5(microtime()) . '_updated.php';
rename('update.php', $name);
exit();