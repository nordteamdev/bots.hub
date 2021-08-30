-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2018 at 09:49 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flame`
--

-- --------------------------------------------------------

--
-- Table structure for table `fl_ads`
--

CREATE TABLE `fl_ads` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL DEFAULT '',
  `code` text,
  `active` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fl_ads`
--

INSERT INTO `fl_ads` (`id`, `type`, `code`, `active`) VALUES
(1, 'header', NULL, '0'),
(2, 'footer', NULL, '0'),
(3, 'sidebar', NULL, '0'),
(4, 'home_latest_news', NULL, '0'),
(5, 'home_latest_lists', NULL, '0'),
(6, 'home_latest_videos', NULL, '0'),
(7, 'home_latest_music', NULL, '0'),
(8, 'between', NULL, '0');

-- --------------------------------------------------------

--
-- Table structure for table `fl_announcement`
--

CREATE TABLE `fl_announcement` (
  `id` int(11) NOT NULL,
  `text` text,
  `time` int(32) NOT NULL DEFAULT '0',
  `active` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_announcement_views`
--

CREATE TABLE `fl_announcement_views` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `announcement_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_banned_ip`
--

CREATE TABLE `fl_banned_ip` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(32) NOT NULL DEFAULT '',
  `time` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fl_br_news`
--

CREATE TABLE `fl_br_news` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `expire` varchar(50) NOT NULL DEFAULT '0',
  `url` varchar(3000) NOT NULL DEFAULT '',
  `text` varchar(1000) NOT NULL DEFAULT '',
  `active` enum('0','1') NOT NULL DEFAULT '0',
  `time` varchar(50) NOT NULL DEFAULT '0',
  `posted` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_comments`
--

CREATE TABLE `fl_comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `text` text,
  `likes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
  `dislikes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
  `time` varchar(30) NOT NULL DEFAULT '0',
  `page` varchar(10) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_comm_replies`
--

CREATE TABLE `fl_comm_replies` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `news_id` int(11) NOT NULL DEFAULT '0',
  `comment` int(11) NOT NULL DEFAULT '0',
  `text` text,
  `likes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
  `dislikes` varchar(10000) NOT NULL DEFAULT 'a:0:{}',
  `time` varchar(30) NOT NULL DEFAULT '0',
  `page` varchar(10) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_config`
--

CREATE TABLE `fl_config` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '',
  `value` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fl_config`
--

INSERT INTO `fl_config` (`id`, `name`, `value`) VALUES
(1, 'name', 'Flame'),
(2, 'theme', 'default'),
(3, 'title', 'Flame'),
(4, 'validation', '2'),
(5, 'registration', '1'),
(6, 'language', 'english'),
(7, 'smtp_or_mail', 'mail'),
(8, 'smtp_host', ''),
(9, 'smtp_username', ''),
(10, 'smtp_password', ''),
(11, 'smtp_encryption', 'tls'),
(12, 'smtp_port', ''),
(13, 'email', 'deendoughouz@gmail.com'),
(14, 'reCaptcha', '2'),
(15, 'google_app_ID', ''),
(16, 'google_app_key', ''),
(17, 'facebook_app_ID', 'asdasd'),
(18, 'facebook_app_key', 'asd'),
(19, 'twitter_app_ID', ''),
(20, 'twitter_app_key', ''),
(21, 'maintenance', '1'),
(22, 'delete_account', '1'),
(23, 'keywords', 'flame,viral,media,social media,videos,content'),
(24, 'description', 'FLAME is a PHP Viral Media Script, FLAME is the best way to start your own social media and viral website ! FLAME is fast, secured, and it will be regularly updated.'),
(26, 'censored', ''),
(27, 'reCaptcha_key', ''),
(28, 'analytics', ''),
(29, 'upload', '12000000'),
(33, 'facebook', '1'),
(34, 'twitter', '1'),
(35, 'google', '1'),
(36, 'fb_page', 'https://www.facebook.com/facebook/'),
(37, 'wowonder_app_key', ''),
(38, 'wowonder_app_ID', ''),
(39, 'wowonder', '1'),
(40, 'wownder_domain_uri', ''),
(41, 'wownder_site_name', 'asdasd'),
(42, 'vkontakte_app_key', ''),
(43, 'vkontakte', '1'),
(44, 'vkontakte_app_ID', ''),
(45, 'vkontakte_app_key', ''),
(46, 'rss_feed', ''),
(47, 'rss_feed_limit', '10'),
(48, 'theme', 'default'),
(49, 'logo_extension', 'png'),
(50, 'icon_extension', 'png'),
(51, 'logo', 'themes/default/img/logo.png'),
(52, 'favicon', 'themes/default/img/icon.png'),
(53, 'news', '1'),
(54, 'lists', '1'),
(55, 'polls', '1'),
(56, 'music', '1'),
(57, 'quizzes', '1'),
(58, 'videos', '1'),
(59, 'last_backup', '00-00-0000'),
(60, 'can_post', '1'),
(61, 'header_ccx', '/* Add here your JavaScript Code. Note. the code entered here will be added in <head> tag Example: var x, y, z; x = 5; y = 6; z = x + y; */'),
(62, 'footer_ccx', ' /* The code entered here will be added in <footer> tag */'),
(63, 'styles_ccx', '/* Add here your custom css styles Example: p { text-align: center; color: red; } */ '),
(64, 'amazone_s3', '0'),
(65, 'bucket_name', ''),
(66, 'amazone_s3_key', ''),
(67, 'amazone_s3_s_key', ''),
(68, 'region', ''),
(69, 'apps_api_id', '1ffa3c7d5195d13dc00e88d9ed68336d'),
(70, 'comment_system', 'default'),
(71, 'apps_api_key', '500e47f2fdc2b9ee3260e4d49e3ebe94'),
(72, 'google_code', ''),
(73, 'review_posts', '0'),
(74, 'pro_pkg_price', '23'),
(75, 'go_pro', '1'),
(76, 'user_max_posts', '10'),
(77, 'paypal_mode', 'sandbox'),
(78, 'paypal_id', ''),
(79, 'paypal_secret', ''),
(80, 'ad_c_price', '0.4'),
(81, 'usr_ads', '1'),
(82, 'show_subscribe_box', '0'),
(83, 'subscribe_box_username', 'phpflame');

-- --------------------------------------------------------

--
-- Table structure for table `fl_entries`
--

CREATE TABLE `fl_entries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `post_id` int(11) NOT NULL DEFAULT '0',
  `index_id` int(11) NOT NULL DEFAULT '0',
  `entry_type` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `text` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `image` varchar(120) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `facebook_post` varchar(120) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `tweet` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `tweet_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `soundcloud_id` varchar(120) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `instagram` text COLLATE utf8mb4_unicode_ci,
  `instagram_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `title` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `video` varchar(120) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `video_type` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `video_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `entry_page` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'news',
  `time` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_lists`
--

CREATE TABLE `fl_lists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `title` text COLLATE utf8_unicode_ci,
  `short_title` text COLLATE utf8_unicode_ci,
  `slug` text COLLATE utf8_unicode_ci,
  `description` text COLLATE utf8_unicode_ci,
  `tags` text COLLATE utf8_unicode_ci,
  `category` int(11) NOT NULL DEFAULT '0',
  `image` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `viewable` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `shares` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL DEFAULT '0',
  `last_update` int(11) NOT NULL DEFAULT '0',
  `entries_per_page` int(11) NOT NULL DEFAULT '0',
  `views` int(11) NOT NULL DEFAULT '0',
  `featured` int(11) NOT NULL DEFAULT '0',
  `registered` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0/0000',
  `hd` int(11) NOT NULL DEFAULT '0',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_music`
--

CREATE TABLE `fl_music` (
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
  `hd` int(11) NOT NULL DEFAULT '0',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_news`
--

CREATE TABLE `fl_news` (
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
  `hd` int(11) NOT NULL DEFAULT '0',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_payments`
--

CREATE TABLE `fl_payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `type` varchar(200) NOT NULL DEFAULT '',
  `amount` int(11) NOT NULL DEFAULT '0',
  `date` varchar(100) NOT NULL DEFAULT '',
  `expire` varchar(30) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_polls`
--

CREATE TABLE `fl_polls` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL DEFAULT '0',
  `text` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `image` varchar(120) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `time` int(11) NOT NULL DEFAULT '0',
  `type` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_poll_pages`
--

CREATE TABLE `fl_poll_pages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `title` text COLLATE utf8_unicode_ci,
  `short_title` text COLLATE utf8_unicode_ci,
  `slug` text COLLATE utf8_unicode_ci,
  `description` text COLLATE utf8_unicode_ci,
  `tags` text COLLATE utf8_unicode_ci,
  `category` int(11) NOT NULL DEFAULT '0',
  `image` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `viewable` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `shares` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL DEFAULT '0',
  `last_update` int(11) NOT NULL DEFAULT '0',
  `entries_per_page` int(11) NOT NULL DEFAULT '0',
  `views` int(11) NOT NULL DEFAULT '0',
  `featured` int(11) NOT NULL DEFAULT '0',
  `registered` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0/0000',
  `hd` int(11) NOT NULL DEFAULT '0',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_profile_fields`
--

CREATE TABLE `fl_profile_fields` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` text COLLATE utf8_unicode_ci,
  `type` text COLLATE utf8_unicode_ci,
  `length` int(11) NOT NULL DEFAULT '0',
  `placement` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'profile',
  `registration_page` int(11) NOT NULL DEFAULT '0',
  `profile_page` int(11) NOT NULL DEFAULT '0',
  `select_type` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'none',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_quizzes`
--

CREATE TABLE `fl_quizzes` (
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
  `hd` int(11) NOT NULL DEFAULT '0',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_quiz_answers`
--

CREATE TABLE `fl_quiz_answers` (
  `id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL DEFAULT '0',
  `result_index` int(11) NOT NULL DEFAULT '0',
  `text` varchar(3000) NOT NULL DEFAULT '',
  `image` varchar(5000) NOT NULL DEFAULT '',
  `time` varchar(50) NOT NULL DEFAULT '0',
  `type` varchar(30) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_reports`
--

CREATE TABLE `fl_reports` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL DEFAULT '0',
  `profile_id` int(11) NOT NULL DEFAULT '0',
  `page_id` int(15) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `text` text,
  `type` varchar(30) NOT NULL DEFAULT '',
  `seen` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_sessions`
--

CREATE TABLE `fl_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `session_id` varchar(140) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `platform` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'web',
  `time` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_terms`
--

CREATE TABLE `fl_terms` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL DEFAULT '',
  `text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fl_terms`
--

INSERT INTO `fl_terms` (`id`, `type`, `text`) VALUES
(1, 'terms_of_use', '<h4>1- Write your Terms Of Use here.</h4>       gh   \nLorem ipsum dolor sit amet, consectetur adisdpisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis sdnostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.          <br><br>          <h4>2- Random title</h4>          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.sdsd'),
(2, 'privacy_policy', ' <h4>1- Write your Privacy Policy here.</h4>          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.          <br><br>          <h4>2- Random title</h4>          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.sdsd'),
(3, 'about', '<h4>1- Write about your website here.</h4>          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.          <br><br>          <h4>2- Random title</h4>          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dxzcolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.sdsdsd');

-- --------------------------------------------------------

--
-- Table structure for table `fl_uc_fields`
--

CREATE TABLE `fl_uc_fields` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `fid_3` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fid_1` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `fid_2` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_users`
--

CREATE TABLE `fl_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(32) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `email` varchar(52) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `first_name` varchar(35) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `last_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(52) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `email_code` varchar(35) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `avatar` varchar(100) CHARACTER SET latin1 NOT NULL DEFAULT 'upload/photos/avatar.jpg',
  `cover` varchar(100) CHARACTER SET latin1 NOT NULL DEFAULT 'upload/photos/cover.jpg',
  `country_id` int(11) NOT NULL DEFAULT '0',
  `gender` varchar(10) CHARACTER SET latin1 NOT NULL DEFAULT 'male',
  `about` text COLLATE utf8_unicode_ci,
  `google` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `facebook` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `twitter` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ip_address` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0.0.0.0',
  `timezone` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT 'UTC',
  `language` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'english',
  `device_id` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `last_active` int(11) NOT NULL DEFAULT '0',
  `src` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `verified` int(11) NOT NULL DEFAULT '0',
  `admin` enum('0','1') CHARACTER SET latin1 NOT NULL DEFAULT '0',
  `registered` varchar(32) CHARACTER SET latin1 NOT NULL DEFAULT '00/0000',
  `active` enum('0','1','2') CHARACTER SET latin1 NOT NULL DEFAULT '0',
  `is_pro` int(15) NOT NULL DEFAULT '0',
  `posts` int(11) NOT NULL DEFAULT '0',
  `wallet` decimal(13,2) NOT NULL DEFAULT '0.00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_user_ads`
--

CREATE TABLE `fl_user_ads` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(500) NOT NULL DEFAULT '',
  `url` varchar(3000) NOT NULL DEFAULT '',
  `placement` varchar(150) NOT NULL DEFAULT '',
  `status` int(5) NOT NULL DEFAULT '1',
  `spent` decimal(13,2) NOT NULL DEFAULT '0.00',
  `results` int(11) NOT NULL DEFAULT '0',
  `media_file` varchar(3000) NOT NULL DEFAULT '',
  `time` varchar(100) NOT NULL DEFAULT '0',
  `type` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_user_reactions`
--

CREATE TABLE `fl_user_reactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `post_id` int(11) NOT NULL DEFAULT '0',
  `page` varchar(10) NOT NULL DEFAULT '',
  `ip_address` varchar(100) NOT NULL DEFAULT '',
  `option_id` int(11) NOT NULL DEFAULT '0',
  `time` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_verification_requests`
--

CREATE TABLE `fl_verification_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(300) NOT NULL DEFAULT '',
  `message` text,
  `passport` varchar(3000) NOT NULL DEFAULT '',
  `photo` varchar(3000) NOT NULL DEFAULT '',
  `type` varchar(100) NOT NULL DEFAULT 'user',
  `time` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fl_videos`
--

CREATE TABLE `fl_videos` (
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
  `hd` int(11) NOT NULL DEFAULT '0',
  `active` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fl_votes`
--

CREATE TABLE `fl_votes` (
  `id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL DEFAULT '0',
  `entry_id` int(11) NOT NULL DEFAULT '0',
  `ip_address` varchar(32) NOT NULL DEFAULT '0.0.0.0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fl_ads`
--
ALTER TABLE `fl_ads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `active` (`active`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `fl_announcement`
--
ALTER TABLE `fl_announcement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `active` (`active`);

--
-- Indexes for table `fl_announcement_views`
--
ALTER TABLE `fl_announcement_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `announcement_id` (`announcement_id`);

--
-- Indexes for table `fl_banned_ip`
--
ALTER TABLE `fl_banned_ip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ip_address` (`ip_address`);

--
-- Indexes for table `fl_br_news`
--
ALTER TABLE `fl_br_news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `fl_comments`
--
ALTER TABLE `fl_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `news_id` (`news_id`);

--
-- Indexes for table `fl_comm_replies`
--
ALTER TABLE `fl_comm_replies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fl_config`
--
ALTER TABLE `fl_config`
  ADD PRIMARY KEY (`id`),
  ADD KEY `value` (`value`(767)),
  ADD KEY `name` (`name`);

--
-- Indexes for table `fl_entries`
--
ALTER TABLE `fl_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `entry_type` (`entry_type`),
  ADD KEY `entry_page` (`entry_page`),
  ADD KEY `index_id` (`index_id`);

--
-- Indexes for table `fl_lists`
--
ALTER TABLE `fl_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`),
  ADD KEY `active` (`active`),
  ADD KEY `viewable` (`viewable`),
  ADD KEY `featured` (`featured`),
  ADD KEY `hd` (`hd`);
ALTER TABLE `fl_lists` ADD FULLTEXT KEY `short_title` (`short_title`);
ALTER TABLE `fl_lists` ADD FULLTEXT KEY `title_2` (`title`,`description`);

--
-- Indexes for table `fl_music`
--
ALTER TABLE `fl_music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`),
  ADD KEY `active` (`active`),
  ADD KEY `featured` (`featured`),
  ADD KEY `hd` (`hd`);
ALTER TABLE `fl_music` ADD FULLTEXT KEY `slug` (`slug`);
ALTER TABLE `fl_music` ADD FULLTEXT KEY `short_title` (`short_title`);
ALTER TABLE `fl_music` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Indexes for table `fl_news`
--
ALTER TABLE `fl_news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`),
  ADD KEY `active` (`active`),
  ADD KEY `featured` (`featured`),
  ADD KEY `hd` (`hd`);
ALTER TABLE `fl_news` ADD FULLTEXT KEY `slug` (`slug`);
ALTER TABLE `fl_news` ADD FULLTEXT KEY `short_title` (`short_title`);
ALTER TABLE `fl_news` ADD FULLTEXT KEY `title_2` (`title`,`description`);

--
-- Indexes for table `fl_payments`
--
ALTER TABLE `fl_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expire` (`expire`);

--
-- Indexes for table `fl_polls`
--
ALTER TABLE `fl_polls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`);

--
-- Indexes for table `fl_poll_pages`
--
ALTER TABLE `fl_poll_pages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`),
  ADD KEY `active` (`active`),
  ADD KEY `viewable` (`viewable`),
  ADD KEY `featured` (`featured`),
  ADD KEY `hd` (`hd`);
ALTER TABLE `fl_poll_pages` ADD FULLTEXT KEY `short_title` (`short_title`);
ALTER TABLE `fl_poll_pages` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Indexes for table `fl_profile_fields`
--
ALTER TABLE `fl_profile_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registration_page` (`registration_page`),
  ADD KEY `active` (`active`),
  ADD KEY `profile_page` (`profile_page`);

--
-- Indexes for table `fl_quizzes`
--
ALTER TABLE `fl_quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`),
  ADD KEY `active` (`active`),
  ADD KEY `featured` (`featured`),
  ADD KEY `hd` (`hd`);
ALTER TABLE `fl_quizzes` ADD FULLTEXT KEY `slug` (`slug`);
ALTER TABLE `fl_quizzes` ADD FULLTEXT KEY `short_title` (`short_title`);
ALTER TABLE `fl_quizzes` ADD FULLTEXT KEY `title_2` (`title`,`description`);

--
-- Indexes for table `fl_quiz_answers`
--
ALTER TABLE `fl_quiz_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entry_id` (`entry_id`),
  ADD KEY `result_index` (`result_index`);

--
-- Indexes for table `fl_reports`
--
ALTER TABLE `fl_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `seen` (`seen`),
  ADD KEY `profile_id` (`profile_id`),
  ADD KEY `page_id` (`page_id`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `fl_sessions`
--
ALTER TABLE `fl_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `platform` (`platform`),
  ADD KEY `time` (`time`);

--
-- Indexes for table `fl_terms`
--
ALTER TABLE `fl_terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fl_uc_fields`
--
ALTER TABLE `fl_uc_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `fl_users`
--
ALTER TABLE `fl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `active` (`active`),
  ADD KEY `admin` (`admin`),
  ADD KEY `last_active` (`last_active`),
  ADD KEY `is_pro` (`is_pro`),
  ADD KEY `wallet` (`wallet`);

--
-- Indexes for table `fl_user_ads`
--
ALTER TABLE `fl_user_ads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `fl_user_reactions`
--
ALTER TABLE `fl_user_reactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `fl_verification_requests`
--
ALTER TABLE `fl_verification_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fl_videos`
--
ALTER TABLE `fl_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`),
  ADD KEY `active` (`active`),
  ADD KEY `featured` (`featured`),
  ADD KEY `hd` (`hd`);
ALTER TABLE `fl_videos` ADD FULLTEXT KEY `slug` (`slug`);
ALTER TABLE `fl_videos` ADD FULLTEXT KEY `short_title` (`short_title`);
ALTER TABLE `fl_videos` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Indexes for table `fl_votes`
--
ALTER TABLE `fl_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `option_id` (`option_id`),
  ADD KEY `ip_address` (`ip_address`),
  ADD KEY `entry_id` (`entry_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fl_ads`
--
ALTER TABLE `fl_ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `fl_announcement`
--
ALTER TABLE `fl_announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_announcement_views`
--
ALTER TABLE `fl_announcement_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_banned_ip`
--
ALTER TABLE `fl_banned_ip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_br_news`
--
ALTER TABLE `fl_br_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_comments`
--
ALTER TABLE `fl_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_comm_replies`
--
ALTER TABLE `fl_comm_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_config`
--
ALTER TABLE `fl_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
--
-- AUTO_INCREMENT for table `fl_entries`
--
ALTER TABLE `fl_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_lists`
--
ALTER TABLE `fl_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_music`
--
ALTER TABLE `fl_music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_news`
--
ALTER TABLE `fl_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_payments`
--
ALTER TABLE `fl_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_polls`
--
ALTER TABLE `fl_polls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_poll_pages`
--
ALTER TABLE `fl_poll_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_profile_fields`
--
ALTER TABLE `fl_profile_fields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_quizzes`
--
ALTER TABLE `fl_quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_quiz_answers`
--
ALTER TABLE `fl_quiz_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_reports`
--
ALTER TABLE `fl_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_sessions`
--
ALTER TABLE `fl_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_terms`
--
ALTER TABLE `fl_terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `fl_uc_fields`
--
ALTER TABLE `fl_uc_fields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_users`
--
ALTER TABLE `fl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_user_ads`
--
ALTER TABLE `fl_user_ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_user_reactions`
--
ALTER TABLE `fl_user_reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_verification_requests`
--
ALTER TABLE `fl_verification_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_videos`
--
ALTER TABLE `fl_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fl_votes`
--
ALTER TABLE `fl_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
