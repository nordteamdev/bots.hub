 
--
-- Table structure for table `advertisement`
--

CREATE TABLE `advertisement` (
  `id` int(10) UNSIGNED NOT NULL,
  `markup` text NOT NULL,
  `added` int(33) NOT NULL,
  `page` varchar(255) NOT NULL DEFAULT '0',
  `click` int(99) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` int(40) NOT NULL,
  `name` varchar(240) NOT NULL,
  `added` varchar(50) NOT NULL DEFAULT '0',
  `cover` varchar(90) NOT NULL DEFAULT '0',
  `visible_to` text NOT NULL,
  `video` enum('yes','no') NOT NULL DEFAULT 'no',
  `removable` enum('yes','no') NOT NULL DEFAULT 'yes'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `apps`
--

CREATE TABLE `apps` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '0',
  `genre` int(9) NOT NULL,
  `added` varchar(44) NOT NULL DEFAULT '0',
  `cover` int(255) NOT NULL DEFAULT '0',
  `description` text,
  `iframe` text,
  `views` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `messenger_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `added` varchar(32) not null default '',
  `userid` varchar(100) not null default '',
  `recipient` varchar(100) not null default '',
  `settings` varchar(100) not null default '{}',
  `text` varchar(255) not null default '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `messenger_colors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `added` varchar(32) not null default '',
  `userid` varchar(100) not null default '',
  `recipient` varchar(100) not null default '',
  `color` varchar(100) not null default '#2196F3',
  `text` varchar(255) not null default '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;
 
CREATE TABLE IF NOT EXISTS `messenger_nicknames` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `added` varchar(32) not null default '',
  `userid` varchar(100) not null default '',
  `recipientid` varchar(100) not null default '',
  `nickname` varchar(200) not null default '',
  `text` varchar(255) not null default '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

--
-- Table structure for table `apps_covers`
--

CREATE TABLE `apps_covers` (
  `id` int(10) UNSIGNED NOT NULL,
  `filename` text NOT NULL,
  `app_id` int(99) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `id` int(90) UNSIGNED NOT NULL,
  `filename` text NOT NULL,
  `userid` varchar(255) NOT NULL DEFAULT '',
  `added` varchar(80) NOT NULL DEFAULT '',
  `sended_to` varchar(44) NOT NULL DEFAULT '',
  `file_size` varchar(40) NOT NULL DEFAULT '0',
  `s3` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `avps`
--

CREATE TABLE `avps` (
  `arg` varchar(20) NOT NULL DEFAULT '',
  `value_s` text NOT NULL,
  `value_i` int(11) NOT NULL DEFAULT '0',
  `value_u` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `avps`
--

INSERT INTO `avps` (`arg`, `value_s`, `value_i`, `value_u`) VALUES
('lastcleantime', '', 0, 1528732511);

-- --------------------------------------------------------

--
-- Table structure for table `blacklist`
--

CREATE TABLE `blacklist` (
  `id` int(99) NOT NULL,
  `employer` int(40) UNSIGNED NOT NULL DEFAULT '0',
  `userid` int(40) UNSIGNED NOT NULL DEFAULT '0',
  `added` int(40) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int(10) UNSIGNED NOT NULL,
  `itemid` int(99) NOT NULL DEFAULT '0',
  `categ` varchar(255) NOT NULL,
  `added` varchar(44) NOT NULL DEFAULT '0',
  `clubid` varchar(60) not null default '0',
  `uid` int(99) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `checked_in`
--

CREATE TABLE `checked_in` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` int(90) NOT NULL DEFAULT '0',
  `place_id` varchar(255) NOT NULL DEFAULT '0',
  `data` text,
  `added` int(44) NOT NULL DEFAULT '0',
  `place_type` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(255) UNSIGNED NOT NULL,
  `userid` int(255) NOT NULL,
  `itemid` int(255) NOT NULL,
  `categ` varchar(80) NOT NULL DEFAULT '',
  `added` varchar(40) NOT NULL DEFAULT '0',
  `text` text NOT NULL,
  `updated` varchar(44) NOT NULL DEFAULT '0',
  `available` enum('yes','no') NOT NULL DEFAULT 'yes',
  `community` enum('yes','no') NOT NULL DEFAULT 'no',
  `item_type` varchar(50) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `communities`
--

CREATE TABLE `communities` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` enum('group','public_page') NOT NULL DEFAULT 'group',
  `general_category` varchar(244) NOT NULL DEFAULT '',
  `category` varchar(244) NOT NULL DEFAULT '',
  `subcategory` varchar(244) NOT NULL DEFAULT '',
  `cover` text NOT NULL,
  `website` varchar(200) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `privacy` enum('Open','Closed','Private') NOT NULL DEFAULT 'Open',
  `admin` text NOT NULL,
  `created` varchar(40) NOT NULL DEFAULT '0',
  `status` text NOT NULL,
  `logo` text NOT NULL,
  `birthday` date NOT NULL,
  `cover_position` varchar(12) NOT NULL DEFAULT '',
  `location` enum('yes','no') NOT NULL DEFAULT 'no',
  `loc_lat` varchar(200) NOT NULL DEFAULT '',
  `loc_lon` varchar(200) NOT NULL DEFAULT '',
  `loc_data` text NOT NULL,
  `allow_to_post` enum('only_admins','only_followers','everyone') NOT NULL DEFAULT 'only_followers',
  `verified` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `communities_followers`
--

CREATE TABLE `communities_followers` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` varchar(50) NOT NULL DEFAULT '0',
  `added` varchar(50) NOT NULL DEFAULT '',
  `group_id` varchar(90) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `community_albums`
--

CREATE TABLE `community_albums` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `group_id` varchar(80) NOT NULL DEFAULT '',
  `added` varchar(32) NOT NULL DEFAULT '',
  `author` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `community_pictures`
--

CREATE TABLE `community_pictures` (
  `id` int(10) UNSIGNED NOT NULL,
  `filename` text NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT '',
  `group_id` varchar(80) NOT NULL DEFAULT '',
  `userid` varchar(32) NOT NULL DEFAULT '',
  `size` varchar(55) NOT NULL DEFAULT '0',
  `albumid` varchar(90) NOT NULL DEFAULT '0',
  `added` varchar(55) NOT NULL DEFAULT '0',
  `file` enum('video','picture') NOT NULL DEFAULT 'picture',
  `vd_name` text NOT NULL,
  `vd_duration` varchar(40) NOT NULL DEFAULT '-',
  `info` text NOT NULL,
  `vd_tags` text NOT NULL,
  `vd_external` varchar(255) NOT NULL DEFAULT '',
  `views` varchar(50) NOT NULL DEFAULT '0',
  `s3` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `deleted_photos`
--

CREATE TABLE `deleted_photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `photoid` varchar(90) NOT NULL DEFAULT '0',
  `userid` int(33) NOT NULL,
  `time` varchar(40) NOT NULL DEFAULT '0',
  `filename` text NOT NULL,
  `albumid` int(255) NOT NULL DEFAULT '0',
  `padded` varchar(44) NOT NULL DEFAULT '0',
  `extension` varchar(20) NOT NULL,
  `size` int(90) NOT NULL,
  `position` varchar(255) NOT NULL DEFAULT '0',
  `info` text NOT NULL,
  `s3` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

CREATE TABLE `feed` (
  `id` int(10) UNSIGNED NOT NULL,
  `byuser` text NOT NULL,
  `itemid` text NOT NULL,
  `added` varchar(51) DEFAULT NULL,
  `categ` varchar(255) NOT NULL DEFAULT '',
  `parent_id` varchar(255) DEFAULT NULL,
  `hide_for` text NOT NULL,
  `community` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(10) UNSIGNED NOT NULL,
  `sender` varchar(90) NOT NULL DEFAULT '0',
  `send_at` int(33) NOT NULL,
  `sender_email` varchar(255) NOT NULL DEFAULT '0',
  `attachment` varchar(255) NOT NULL DEFAULT '0',
  `subject` varchar(100) NOT NULL DEFAULT '',
  `message` text,
  `read` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feed_favorite_users`
--

CREATE TABLE `feed_favorite_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` int(90) NOT NULL DEFAULT '0',
  `fvid` int(90) NOT NULL DEFAULT '0',
  `added` int(33) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(255) UNSIGNED NOT NULL,
  `userid` int(99) NOT NULL,
  `friendid` int(99) NOT NULL,
  `added` varchar(50) NOT NULL DEFAULT '0',
  `status` enum('confirmed','pending') NOT NULL DEFAULT 'pending',
  `relationship` varchar(100) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friends_on_map`
--

CREATE TABLE `friends_on_map` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` varchar(99) NOT NULL,
  `time` varchar(50) NOT NULL DEFAULT '',
  `status` text NOT NULL,
  `location` text NOT NULL,
  `custom` enum('yes','no') NOT NULL DEFAULT 'no',
  `available` enum('yes','no') NOT NULL DEFAULT 'yes',
  `media` text NOT NULL,
  `lat_long` varchar(100) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gifts`
--

CREATE TABLE `gifts` (
  `id` int(10) UNSIGNED NOT NULL,
  `categ` varchar(99) NOT NULL,
  `price` varchar(50) NOT NULL DEFAULT '0',
  `added` int(32) NOT NULL,
  `gift` text,
  `tags` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(255) UNSIGNED NOT NULL,
  `userid` int(99) NOT NULL,
  `itemid` int(99) NOT NULL,
  `type` varchar(80) NOT NULL,
  `owner` int(99) NOT NULL,
  `categ` varchar(50) NOT NULL DEFAULT '',
  `added` varchar(55) NOT NULL DEFAULT '',
  `viewed` enum('yes','no') NOT NULL DEFAULT 'no',
  `data` varchar(255) NOT NULL DEFAULT '',
  `community` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` int(40) NOT NULL DEFAULT '0',
  `guestid` int(33) NOT NULL,
  `added` int(33) NOT NULL DEFAULT '0',
  `new` enum('yes','no') DEFAULT 'yes'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ip_log`
--

CREATE TABLE `ip_log` (
  `id` int(99) UNSIGNED NOT NULL,
  `data` text NOT NULL,
  `ip` varchar(99) NOT NULL DEFAULT '0',
  `userid` int(99) NOT NULL DEFAULT '0',
  `time` int(40) NOT NULL DEFAULT '0',
  `device_name` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `items_rating`
--

CREATE TABLE `items_rating` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_id` varchar(200) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `item_type` varchar(190) NOT NULL DEFAULT '',
  `userid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `klass`
--

CREATE TABLE `klass` (
  `id` int(10) UNSIGNED NOT NULL,
  `itemid` int(99) NOT NULL,
  `userid` int(99) NOT NULL,
  `type` varchar(80) NOT NULL DEFAULT '', 
  `item_deleted` enum('yes','no') not null default 'no',
  `community` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(20) NOT NULL,
  `msg` text NOT NULL,
  `fromUser` int(9) NOT NULL DEFAULT '0',
  `toUser` int(9) NOT NULL DEFAULT '0',
  `time` int(9) NOT NULL DEFAULT '0',
  `lastby` int(99) NOT NULL DEFAULT '0',
  `read` enum('yes','no') NOT NULL DEFAULT 'no',
  `deleteby` varchar(40) NOT NULL DEFAULT '',
  `hidden` enum('yes','no') NOT NULL DEFAULT 'no',
  `shared` enum('yes','no') DEFAULT 'no',
  `bg` enum('yes','no') NOT NULL DEFAULT 'yes'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages_typing`
--

CREATE TABLE `messages_typing` (
  `id` int(20) NOT NULL,
  `fromUser` int(9) NOT NULL DEFAULT '0',
  `toUser` int(9) NOT NULL DEFAULT '0',
  `typing` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `music_history`
--

CREATE TABLE `music_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `listen` int(33) NOT NULL,
  `user` int(40) NOT NULL DEFAULT '0',
  `song` int(99) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `music_my_music`
--

CREATE TABLE `music_my_music` (
  `id` int(10) UNSIGNED NOT NULL,
  `uploader` int(90) NOT NULL DEFAULT '0',
  `added` int(33) NOT NULL,
  `position` mediumint(9) NOT NULL DEFAULT '0',
  `owner` int(40) NOT NULL DEFAULT '0',
  `musid` int(99) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `music_playlists`
--

CREATE TABLE `music_playlists` (
  `id` int(10) UNSIGNED NOT NULL,
  `added` int(33) NOT NULL,
  `owner` int(40) NOT NULL DEFAULT '0',
  `name` text,
  `playcount` varchar(255) NOT NULL DEFAULT '0',
  `originalpid` varchar(255) NOT NULL DEFAULT '0',
  `favorite_cover` text,
  `updates` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `music_playlists_pos`
--

CREATE TABLE `music_playlists_pos` (
  `id` int(10) UNSIGNED NOT NULL,
  `position` mediumint(9) NOT NULL DEFAULT '0',
  `trackid` int(255) NOT NULL,
  `playlistid` int(40) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `music_purchased`
--

CREATE TABLE `music_purchased` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` int(40) NOT NULL DEFAULT '0',
  `song` int(99) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `music_songs`
--

CREATE TABLE `music_songs` (
  `id` int(10) UNSIGNED NOT NULL,
  `artist` text NOT NULL,
  `title` text NOT NULL,
  `time` varchar(50) NOT NULL DEFAULT '0',
  `album` text NOT NULL,
  `uploader` int(90) NOT NULL DEFAULT '0',
  `path` text NOT NULL,
  `added` int(33) NOT NULL,
  `cover` text,
  `year` varchar(33) NOT NULL DEFAULT '',
  `comment` text,
  `genre` varchar(160) NOT NULL DEFAULT '',
  `deleted` enum('yes','no') NOT NULL DEFAULT 'no',
  `video` varchar(222) NOT NULL DEFAULT '0',
  `language` varchar(100) NOT NULL DEFAULT 'unknown',
  `video_community` varchar(200) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `music_stars`
--

CREATE TABLE `music_stars` (
  `id` int(10) UNSIGNED NOT NULL,
  `artist` int(255) NOT NULL,
  `star` int(33) NOT NULL,
  `user` int(40) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `my_apps`
--

CREATE TABLE `my_apps` (
  `id` int(99) UNSIGNED NOT NULL,
  `appid` int(99) NOT NULL,
  `userid` int(99) NOT NULL DEFAULT '0',
  `added` varchar(40) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `nearby_people`
--

CREATE TABLE `nearby_people` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` int(99) NOT NULL DEFAULT '0',
  `lat` varchar(190) NOT NULL DEFAULT '0',
  `long` varchar(190) NOT NULL DEFAULT '0',
  `time` varchar(40) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `categ` varchar(90) NOT NULL DEFAULT '0',
  `userid` int(99) NOT NULL,
  `unread` enum('yes','no') NOT NULL DEFAULT 'no',
  `item` int(99) DEFAULT NULL,
  `json` text NOT NULL,
  `time` varchar(30) NOT NULL DEFAULT '0',
  `condition` varchar(255) NOT NULL DEFAULT '',
  `community` enum('yes','no') NOT NULL DEFAULT 'no',
  `mentioned` enum('yes','no') NOT NULL DEFAULT 'no',
  `dropdown_seen` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` text NOT NULL,
  `cover` text NOT NULL,
  `page_id` varchar(190) NOT NULL DEFAULT '0',
  `json` text NOT NULL,
  `type` varchar(200) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` int(40) NOT NULL,
  `filename` text NOT NULL,
  `added` varchar(50) NOT NULL DEFAULT '0',
  `albumid` int(90) NOT NULL,
  `size` int(90) NOT NULL DEFAULT '0',
  `extension` varchar(20) NOT NULL,
  `position` mediumint(9) NOT NULL DEFAULT '0',
  `info` text NOT NULL,
  `s3` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `photo_rate`
--

CREATE TABLE `photo_rate` (
  `id` int(11) NOT NULL,
  `id_photo` int(11) NOT NULL,
  `userid` varchar(40) NOT NULL,
  `rate` int(11) NOT NULL,
  `dt_rated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `community` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `poll_answers`
--

CREATE TABLE `poll_answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `poll_options`
--

CREATE TABLE `poll_options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `poll_questions`
--

CREATE TABLE `poll_questions` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(33) UNSIGNED NOT NULL,
  `userid` int(90) NOT NULL DEFAULT '0',
  `type` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `available` enum('yes','no') DEFAULT 'yes',
  `added` int(55) NOT NULL DEFAULT '0',
  `community` enum('yes','no') NOT NULL DEFAULT 'no',
  `clubid` varchar(66) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(100) NOT NULL,
  `type_id` int(50) NOT NULL DEFAULT '0',
  `report_by` int(50) NOT NULL DEFAULT '0',
  `added` int(32) NOT NULL DEFAULT '0',
  `seen` enum('yes','no') DEFAULT 'no',
  `reason` varchar(255) NOT NULL DEFAULT 'not_specified'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `search_history`
--

CREATE TABLE `search_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` int(190) NOT NULL DEFAULT '0',
  `added` int(33) NOT NULL,
  `owner` int(190) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shared_links`
--

CREATE TABLE `shared_links` (
  `id` int(99) UNSIGNED NOT NULL,
  `byuser` int(99) NOT NULL,
  `data` text NOT NULL,
  `link` text NOT NULL,
  `added` int(40) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shared_posts`
--

CREATE TABLE `shared_posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` varchar(90) NOT NULL DEFAULT '0',
  `added` varchar(40) NOT NULL DEFAULT '0',
  `post_id` varchar(255) NOT NULL DEFAULT '0',
  `post_type` varchar(255) NOT NULL DEFAULT '',
  `owner_id` varchar(100) NOT NULL DEFAULT '',
  `community` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `slideshow`
--

CREATE TABLE `slideshow` (
  `id` int(99) UNSIGNED NOT NULL,
  `userid` varchar(40) NOT NULL DEFAULT '0',
  `added` varchar(50) NOT NULL DEFAULT '0',
  `options` text NOT NULL,
  `enabled` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `slideshow_imgs`
--

CREATE TABLE `slideshow_imgs` (
  `id` int(99) UNSIGNED NOT NULL,
  `userid` int(40) NOT NULL,
  `added` varchar(50) NOT NULL DEFAULT '0',
  `position` mediumint(9) NOT NULL DEFAULT '0',
  `ex` varchar(40) NOT NULL DEFAULT '',
  `s3` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(99) UNSIGNED NOT NULL,
  `itemid` int(99) NOT NULL,
  `data` text NOT NULL,
  `community` enum('yes','no') not null default 'no',
  `type` varchar(100) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tags_albums`
--

CREATE TABLE `tags_albums` (
  `id` int(255) UNSIGNED NOT NULL,
  `photoid` int(99) NOT NULL DEFAULT '0',
  `userid` int(99) NOT NULL DEFAULT '0',
  `available` enum('yes','no') NOT NULL DEFAULT 'yes'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `id` int(10) UNSIGNED NOT NULL,
  `markup` text,
  `page` varchar(99) NOT NULL,
  `added` varchar(40) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `markup`, `page`, `added`) VALUES
(17, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'policy', '1480092207'),
(18, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'about', '1480092207'),
(20, '&lt;h1&gt;Terms of use&lt;/h1&gt;\r\n&lt;br/&gt;\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n&lt;br/&gt;', 'terms', '1482176805');

-- --------------------------------------------------------

--
-- Table structure for table `themes`
--

CREATE TABLE `themes` (
  `id` int(10) UNSIGNED NOT NULL,
  `photo` varchar(99) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `body` varchar(99) NOT NULL DEFAULT '0',
  `kn` enum('true','false') NOT NULL DEFAULT 'false',
  `userid` int(99) NOT NULL DEFAULT '0',
  `added` int(40) NOT NULL DEFAULT '0',
  `ext` varchar(20) NOT NULL DEFAULT '',
  `position` varchar(80) NOT NULL DEFAULT '0',
  `s3` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `themes`
--

INSERT INTO `themes` (`id`, `photo`, `name`, `body`, `kn`, `userid`, `added`, `ext`, `position`, `s3`) VALUES
(1, 'planet_earth.jpg', 'Planet Earth', '1.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(2, 'man_in_space.jpg', 'Man in space', '2.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(3, 'dark_side_of_the_moon.jpg', 'Dark side of the Moon', '3.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(4, 'gravity.jpg', 'Gravity', '3.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(5, 'solare_flare.jpg', 'Solare Flare', '4.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(6, 'in_the_kingdom_nature.jpg', 'In the Kingdom nature', '5.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(7, 'Mushroom_Harvest.jpg', 'Mushroom Harvest', '6.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(8, 'fruit_paradise.jpg', 'Fruit Paradise', '7.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(9, 'Watercolor_Softness.jpg', 'Watercolor Softness', '8.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(10, 'in_the_forest.jpg', 'In the Forest', '9.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(11, 'Do_not_Forget Umbrellas.jpg', 'Do not forget umbrellas!', '10.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(12, 'Rustling_of_Leaves.jpg', 'Rustling of Leaves', '11.jpg', 'true', 0, 1481043904, '', '0', 'no'),
(177, '-1480658607-955531806-34142817.jpg', 'Funny Robins', '0', 'true', 0, 1481210967, '', '0', 'no'),
(178, '-1528720110-143997681-513029688.png', 'Gifts from Father Frost', '0', 'true', 0, 1481223634, '', '0', 'no'),
(179, '-585005175-707050566-689909097.jpg', 'Snowboarding', '0', 'true', 0, 1481494678, '', '0', 'no'),
(180, '-902005584-1326151851-1236707946.jpg', 'Frosty Night', '0', 'true', 0, 1481494706, '', '0', 'no'),
(192, '11010951271765993256897251928.jpg', 'Frosty Night', '0', 'true', 0, 1520694088, '', '0', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL DEFAULT '',
  `fullname` varchar(150) NOT NULL DEFAULT '',
  `email` varchar(80) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `real_pass` varchar(90) NOT NULL DEFAULT '',
  `birthday` date NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `last_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `editsecret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `status` enum('confirmed','pending') NOT NULL DEFAULT 'pending',
  `profile_photo` int(80) NOT NULL DEFAULT '0',
  `online` int(60) NOT NULL DEFAULT '0',
  `theme` int(10) NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL DEFAULT '',
  `search` text NOT NULL,
  `class` enum('UC_MODERATOR','UC_ADMINISTRATOR','UC_SYSOP','UC_USER') NOT NULL DEFAULT 'UC_USER',
  `added` varchar(44) NOT NULL DEFAULT '0',
  `private` enum('yes','no') NOT NULL DEFAULT 'no',
  `privacy_age` enum('everyone','friends','only_me') NOT NULL DEFAULT 'everyone',
  `privacy_apps` enum('everyone','friends','only_me') NOT NULL DEFAULT 'everyone',
  `privacy_love` enum('everyone','friends') NOT NULL DEFAULT 'everyone',
  `allow_tag_photos` enum('friends','nobody') NOT NULL DEFAULT 'friends',
  `allow_tag_posts` enum('friends','nobody') NOT NULL DEFAULT 'friends',
  `allow_share_myphotos` enum('everyone','friends','nobody') NOT NULL DEFAULT 'everyone',
  `allow_comment_myphotos` enum('everyone','friends') NOT NULL DEFAULT 'everyone',
  `allow_send_pm` enum('everyone','friends') NOT NULL DEFAULT 'everyone',
  `display_online` enum('true','false') NOT NULL DEFAULT 'true',
  `balance` int(99) NOT NULL DEFAULT '0',
  `interests` text NOT NULL,
  `quotes` text NOT NULL,
  `aboutme` text NOT NULL,
  `political_views` varchar(250) NOT NULL DEFAULT '',
  `world_view` varchar(250) NOT NULL DEFAULT '',
  `personal_priority` varchar(250) NOT NULL DEFAULT '',
  `important_in_others` varchar(250) NOT NULL DEFAULT '',
  `views_on_smoking` varchar(250) NOT NULL DEFAULT '',
  `views_on_alcohol` varchar(250) NOT NULL DEFAULT '',
  `hobby` text NOT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'en',
  `show_embera` enum('yes','no') NOT NULL DEFAULT 'yes',
  `auto_play_videos` enum('yes','no') NOT NULL DEFAULT 'no',
  `ip` varchar(100) NOT NULL DEFAULT '',
  `location` text NOT NULL,
  `location_id` text NOT NULL,
  `text_post` text NOT NULL,
  `notifications_settings` text NOT NULL,
  `phone` varchar(60) NOT NULL DEFAULT '',
  `secret_code` varchar(4) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users_books`
--

CREATE TABLE `users_books` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` varchar(99) NOT NULL,
  `book_title` text NOT NULL,
  `book_cover` text NOT NULL,
  `book_id` varchar(190) NOT NULL DEFAULT '0',
  `page_id` varchar(200) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users_movies`
--

CREATE TABLE `users_movies` (
  `id` int(10) UNSIGNED NOT NULL,
  `userid` varchar(99) NOT NULL,
  `movie_title` text NOT NULL,
  `movie_cover` text NOT NULL,
  `movie_id` varchar(190) NOT NULL DEFAULT '0',
  `page_id` varchar(200) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_gifts`
--

CREATE TABLE `user_gifts` (
  `id` int(10) UNSIGNED NOT NULL,
  `gift_id` int(99) NOT NULL,
  `descr` text NOT NULL,
  `added` int(32) NOT NULL,
  `fromuser` int(99) NOT NULL,
  `private` enum('yes','no') NOT NULL DEFAULT 'no',
  `anonym` enum('yes','no') NOT NULL DEFAULT 'no',
  `userid` int(99) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `filename` text NOT NULL,
  `added` int(40) NOT NULL DEFAULT '0',
  `size` varchar(99) NOT NULL DEFAULT '0',
  `extension` varchar(15) NOT NULL DEFAULT '',
  `albumid` int(99) NOT NULL DEFAULT '0',
  `userid` int(160) NOT NULL DEFAULT '0',
  `tags` text NOT NULL,
  `views` int(255) NOT NULL DEFAULT '0',
  `external` varchar(255) NOT NULL DEFAULT '',
  `dur` varchar(62) NOT NULL DEFAULT '0',
  `s3` enum('yes','no') NOT NULL DEFAULT 'no'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;






CREATE TABLE if not exists `deleted_videos` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` varchar(40) not null default '',
  `videoid` varchar(200) not null default '',
  `title` text NOT NULL,
  `description` text NOT NULL,
  `filename` text NOT NULL,
  `added` int(40) NOT NULL DEFAULT '0',
  `size` varchar(99) NOT NULL DEFAULT '0',
  `extension` varchar(15) NOT NULL DEFAULT '',
  `albumid` int(99) NOT NULL DEFAULT '0',
  `userid` int(160) NOT NULL DEFAULT '0',
  `tags` text NOT NULL,
  `views` int(255) NOT NULL DEFAULT '0',
  `external` varchar(255) NOT NULL DEFAULT '',
  `dur` varchar(62) NOT NULL DEFAULT '0',
  `s3` enum('yes','no') NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `story_views` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `story_id` varchar(32) not null default '0',
  `added` varchar(32) not null default '',
  `userid` varchar(100) not null default '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `stories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `added` varchar(32) not null default '',
  `userid` varchar(100) not null default '',
  `public` enum('yes','no') not null default 'no',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `stories_files` (
   `id`  INT(40) unsigned NOT NULL AUTO_INCREMENT,
   `userid` VARCHAR(99) NOT NULL DEFAULT '0',
   `filename` TEXT NOT NULL,
   `added`      VARCHAR(50) NOT NULL DEFAULT '',
   `type`       VARCHAR(20) NOT NULL DEFAULT '',
   `story_id` VARCHAR(150) NOT NULL DEFAULT '0',
   `s3` enum('yes','no') not null default 'no',
   PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;




CREATE TABLE IF NOT EXISTS `market` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL default '',
  `product_category` varchar(200) NOT NULL DEFAULT '',
  `product_description` text NOT NULL DEFAULT '',
  `product_cover` varchar(150) NOT NULL DEFAULT '',
  `product_location` varchar(150) NOT NULL DEFAULT '',
  `price`  varchar(32) NOT NULL DEFAULT '0',
  `added` varchar(32) not null default '',
  `userid` varchar(100) not null default '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `market_pictures` (
   `id`  INT(40) unsigned NOT NULL AUTO_INCREMENT,
   `userid` VARCHAR(99) NOT NULL DEFAULT '0',
   `filename` TEXT NOT NULL,
   `added`      VARCHAR(50) NOT NULL DEFAULT '',
   `size`       VARCHAR(32) NOT NULL DEFAULT '',
   `type`       VARCHAR(20) NOT NULL DEFAULT '',
   `product_id` VARCHAR(150) NOT NULL DEFAULT '0',
   `s3` enum('yes','no') not null default 'no',
   PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `market_favorites` (
   `id`  INT(40) unsigned NOT NULL AUTO_INCREMENT,
   `userid` VARCHAR(99) NOT NULL DEFAULT '0',
   `added`      VARCHAR(50) NOT NULL DEFAULT '',
   `product_id` VARCHAR(150) NOT NULL DEFAULT '0',
   PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `apps_covers`
--
ALTER TABLE `apps_covers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `avps`
--
ALTER TABLE `avps`
  ADD PRIMARY KEY (`arg`);

--
-- Indexes for table `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checked_in`
--
ALTER TABLE `checked_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `communities_followers`
--
ALTER TABLE `communities_followers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `community_albums`
--
ALTER TABLE `community_albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `community_pictures`
--
ALTER TABLE `community_pictures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deleted_photos`
--
ALTER TABLE `deleted_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feed_favorite_users`
--
ALTER TABLE `feed_favorite_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends_on_map`
--
ALTER TABLE `friends_on_map`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gifts`
--
ALTER TABLE `gifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ip_log`
--
ALTER TABLE `ip_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items_rating`
--
ALTER TABLE `items_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `klass`
--
ALTER TABLE `klass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages_typing`
--
ALTER TABLE `messages_typing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_history`
--
ALTER TABLE `music_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_my_music`
--
ALTER TABLE `music_my_music`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_playlists`
--
ALTER TABLE `music_playlists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_playlists_pos`
--
ALTER TABLE `music_playlists_pos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_purchased`
--
ALTER TABLE `music_purchased`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_songs`
--
ALTER TABLE `music_songs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_stars`
--
ALTER TABLE `music_stars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `my_apps`
--
ALTER TABLE `my_apps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nearby_people`
--
ALTER TABLE `nearby_people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photo_rate`
--
ALTER TABLE `photo_rate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_answers`
--
ALTER TABLE `poll_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_options`
--
ALTER TABLE `poll_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_questions`
--
ALTER TABLE `poll_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_links`
--
ALTER TABLE `shared_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_posts`
--
ALTER TABLE `shared_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slideshow`
--
ALTER TABLE `slideshow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slideshow_imgs`
--
ALTER TABLE `slideshow_imgs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags_albums`
--
ALTER TABLE `tags_albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_books`
--
ALTER TABLE `users_books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_movies`
--
ALTER TABLE `users_movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_gifts`
--
ALTER TABLE `user_gifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `apps`
--
ALTER TABLE `apps`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `apps_covers`
--
ALTER TABLE `apps_covers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` int(90) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `id` int(99) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checked_in`
--
ALTER TABLE `checked_in`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `communities`
--
ALTER TABLE `communities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `communities_followers`
--
ALTER TABLE `communities_followers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `community_albums`
--
ALTER TABLE `community_albums`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `community_pictures`
--
ALTER TABLE `community_pictures`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deleted_photos`
--
ALTER TABLE `deleted_photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feed`
--
ALTER TABLE `feed`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feed_favorite_users`
--
ALTER TABLE `feed_favorite_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friends_on_map`
--
ALTER TABLE `friends_on_map`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gifts`
--
ALTER TABLE `gifts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ip_log`
--
ALTER TABLE `ip_log`
  MODIFY `id` int(99) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items_rating`
--
ALTER TABLE `items_rating`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `klass`
--
ALTER TABLE `klass`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages_typing`
--
ALTER TABLE `messages_typing`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `music_history`
--
ALTER TABLE `music_history`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `music_my_music`
--
ALTER TABLE `music_my_music`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `music_playlists`
--
ALTER TABLE `music_playlists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `music_playlists_pos`
--
ALTER TABLE `music_playlists_pos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `music_purchased`
--
ALTER TABLE `music_purchased`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `music_songs`
--
ALTER TABLE `music_songs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `music_stars`
--
ALTER TABLE `music_stars`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `my_apps`
--
ALTER TABLE `my_apps`
  MODIFY `id` int(99) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nearby_people`
--
ALTER TABLE `nearby_people`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `photo_rate`
--
ALTER TABLE `photo_rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poll_answers`
--
ALTER TABLE `poll_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poll_options`
--
ALTER TABLE `poll_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poll_questions`
--
ALTER TABLE `poll_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(33) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `search_history`
--
ALTER TABLE `search_history`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shared_links`
--
ALTER TABLE `shared_links`
  MODIFY `id` int(99) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shared_posts`
--
ALTER TABLE `shared_posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slideshow`
--
ALTER TABLE `slideshow`
  MODIFY `id` int(99) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slideshow_imgs`
--
ALTER TABLE `slideshow_imgs`
  MODIFY `id` int(99) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(99) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags_albums`
--
ALTER TABLE `tags_albums`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_books`
--
ALTER TABLE `users_books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_movies`
--
ALTER TABLE `users_movies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_gifts`
--
ALTER TABLE `user_gifts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

 
