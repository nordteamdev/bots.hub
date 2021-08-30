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

$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_music` ADD `hd` INT NOT NULL DEFAULT '0' AFTER `registered`, ADD INDEX (`hd`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_lists` ADD `hd` INT NOT NULL DEFAULT '0' AFTER `registered`, ADD INDEX (`hd`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_news` ADD `hd` INT NOT NULL DEFAULT '0' AFTER `registered`, ADD INDEX (`hd`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_poll_pages` ADD `hd` INT NOT NULL DEFAULT '0' AFTER `registered`, ADD INDEX (`hd`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_quizzes` ADD `hd` INT NOT NULL DEFAULT '0' AFTER `registered`, ADD INDEX (`hd`);");
$query = mysqli_query($sqlConnect, "ALTER TABLE `fl_videos` ADD `hd` INT NOT NULL DEFAULT '0' AFTER `registered`, ADD INDEX (`hd`);");
$query = mysqli_query($sqlConnect, "INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES (NULL, 'show_subscribe_box', '0'), (NULL, 'subscribe_box_username', NULL);");


echo 'The script is successfully updated to v1.3!';
$name = md5(microtime()) . '_updated.php';
rename('update.php', $name);
exit();