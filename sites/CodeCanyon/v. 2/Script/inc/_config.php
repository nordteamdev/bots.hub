<?php

/*

Kontackt License Agreement (DMCA License)

Copyright (c) 2015, Alex Dobrovolscki (dobriisasa@gmail.com)
All rights reserved.

* Redistributions of source code is strictly forbidden.

* By using Kontackt you may have your own purchase copy, if you are not own a license, you can buy one from https://codecanyon.net/user/dobrovolscki/portfolio.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

// Report all php error
error_reporting(E_ALL | E_STRICT);

// site directories path
define('__ROOT__', getcwd());

require_once('fconf.php');  


 
$path_st = isset($from_music) ? "../../" : (isset($upload_media) ? "../" : __ROOT__);
 



// store site settings
$sc_settings = glob($path_st."/inc/json/ssettings/*.json");
 
$sc_settings = $sc_settings[0];
$_spst = json_decode(file_get_contents($sc_settings),true);

// store general settings
$g_settings = glob($path_st."/inc/json/gsettings/*.json");
$g_settings = $g_settings[0];
$_gst = json_decode(file_get_contents($g_settings),true);


 
 
// memory size
ini_set('memory_limit', $_spst['server']['memory_limit']);


// max execution time
ini_set('max_execution_time', $_spst['server']['max_exec_time']); // 300 seconds = 5 minutes

// SITE TimeZone
date_default_timezone_set($_spst['site']['time_zone']);


// sql tables
define('tbl_countries','`countries`'); # countries
define('tbl_states','`states`'); # states
define('tbl_cities','`cities`'); # cities
define('tbl_users','`users`'); # users
define('tbl_photos', '`photos`'); # photos
define('tbl_albums', '`albums`'); # albums
define('tbl_videos', '`videos`'); # videos
define('tbl_feed', '`feed`'); # wall
define('tbl_friends', '`friends`'); # friends
define('tbl_notif', '`notifications`'); # notifications
define('tbl_posts', '`posts`'); # posts
define('tbl_guests', '`guests`'); # guests
define('tbl_msg', '`messages`'); # messages
define('tbl_msg_typing', '`messages_typing`'); # messages typing
define('tbl_themes', '`themes`'); # themes
define('tbl_blacklist', '`blacklist`'); # blacklist
define('tbl_attach', '`attachments`'); # attachments
define('tbl_report', '`report`'); # report/spam
define('tbl_klass', '`klass`'); # likes
define('tbl_feed_fv', '`feed_favorite_users`'); # favorite user, filter feed
define('tbl_photo_rate', '`photo_rate`'); # stars (ratings)
define('tbl_comments', '`comments`'); # comments 
define('tbl_tags', '`tags`'); # tags
define('tbl_tag_album', '`tags_albums`'); # tags album
define('tbl_grades', '`grades`'); # grades
define('tbl_iplog', '`ip_log`'); # ip log (save user's ip)
define('tbl_slinks', '`shared_links`'); # shared links
define('tbl_checkin', '`checked_in`'); # checked in
define('tbl_slideshow_imgs', '`slideshow_imgs`'); # slideshow images
define('tbl_slideshow', '`slideshow`'); # slideshow
define('tbl_search_history', '`search_history`'); # search history
define('tbl_deleted_photos', '`deleted_photos`'); # deleted photos
define('tbl_deleted_videos', '`deleted_videos`'); # deleted videos
define('tbl_apps', '`apps`'); # applications/games
define('tbl_apps_covers', '`apps_covers`'); # applications/games covers
define('tbl_my_apps', '`my_apps`'); # store user's applications/games
define('tbl_ads', '`advertisement`'); # ads on pages
define('tbl_terms', '`terms`'); # terms/policy/about
define('tbl_feedback','`feedback`'); # feedback
define('tbl_bookmarks','`bookmarks`'); # bookmarks
define('tbl_gifts','`gifts`'); # gifts
define('tbl_ugifts','`user_gifts`'); # user's gifts
define('tbl_communities','`communities`'); # communities
define('tbl_communities_admin','`communities_admin`'); # communities's administrators
define('tbl_communities_followers','`communities_followers`'); # communities's followers
define('tbl_communities_pics','`community_pictures`'); # communities's pictures
define('tbl_communities_albums','`community_albums`'); # communities's albums
define('tbl_shared_posts','`shared_posts`'); # shared posts
define('tbl_friends_on_map','`friends_on_map`'); # friends on map
define('tbl_users_movies','`users_movies`'); # users movies
define('tbl_users_books','`users_books`'); # users movies
define('tbl_pages','`pages`'); # pages
define('tbl_ratings','`items_rating`'); # items rating
define('tbl_nearby_people','`nearby_people`'); # nearby friends
define('tbl_market','`market`'); # market
define('tbl_market_pictures','`market_pictures`'); # market pictures
define('tbl_market_favorites', '`market_favorites`'); # market favorites
define('tbl_stories','`stories`'); # stories
define('tbl_stories_files','`stories_files`'); # stories files
define('tbl_stories_views','`story_views`'); # stories views
define('tbl_messenger_colors','`messenger_colors`'); # messenger colors
define('tbl_messenger_nicknames','`messenger_nicknames`'); # messenger nicknames
define('tbl_messenger_settings','`messenger_settings`'); # messenger nicknames


// poll tables
define('tbl_poll_questions','`poll_questions`'); # all questions
define('tbl_poll_answers','`poll_answers`'); # all answers
define('tbl_poll_options','`poll_options`'); # all answers

// music tables
define('tbl_songs','`music_songs`'); # all songs
define('tbl_music','`music_my_music`'); # user's songs
define('tbl_playlists','`music_playlists`'); # collections
define('tbl_playlist_pos','`music_playlists_pos`'); # songs from collections
define('tbl_history','`music_history`'); # recently played songs, user's history
define('tbl_purchased','`music_purchased`'); # purchased songs 


// constants
define('__IMG_DIR', '/stcmd/uphoto/');
define('__COVERS_DIR', '/stcmd/covers/');
define('__VD_DIR', '/stcmd/uvideo/');
define('__AT_DIR', '/stcmd/attachments/');
define('__TRASH_', '/stcmd/trash/');
define('__POPUPS', '/popups/');
define('__MESSENGER_VOICE_CLIPS', '/stcmd/messenger/voice-clips/');
define('__COMMUNITIES_COVERS_DIR', '/stcmd/communities/covers/');
define('__COMMUNITIES_IMAGES_DIR','/stcmd/communities/images/');
define('__COMMUNITIES_VIDEOS_DIR','/stcmd/communities/videos/');
define('__COMMUNITIES_DEFAULT_IMAGE', '/template/'._THEME.'/css/images/community_100.png');
define('__MARKET_IMAGES_DIR','/stcmd/market/images/');
define('__STORIES_FILES_DIR','/stcmd/stories/');
define('__STORIES_STICKERS','/cmd/smilies/stickers/stories/');
define('_MARKET_DEFAULT_COVER', '/template/'._THEME.'/css/images/market_camera.png');
define('_BIG_IMAGE_PRELOAD', '/template/'._THEME.'/css/images/preloaders/process-50x50.gif'); // ic preload big images
define('__SLIDER_BLANK','/template/'._THEME.'/css/images/preloaders/slider-preloader.gif');
define('__ATTACH_BLANK', '/template/'._THEME.'/css/images/preloaders/imagefile-18.png');
define('__ATTACH_BLANK_8', '/template/'._THEME.'/css/images/preloaders/imagefile-8.png');
define('__TRANS_BG', '/template/'._THEME.'/css/images/trans.gif');
define('_EMPTY_ALBUM',  '/template/'._THEME.'/css/images/post/VideoCall-36-v2.png');
define('__WATERMARK', '/template/'._THEME.$_spst['upload_photos']['watermark_url']);
define('__CUR_URL', $_SERVER['REQUEST_URI']);

// youtube api key
define('__YOUTUBE_API_KEY', $_spst['youtube']['youtube_api_key']);
//print_r($_spst['apps']['genres']);die;

// site email
define('SITE_MAIL', $_spst['site']['email']);

$site_lang = array(); // array for site language
$site_config = array(); // array for storing all settings


/* search movies */
$site_config['MOVIES_DB_API'] = $_spst['movies']['moviesdb_api_key']; 
 
/* Gifs */
$site_config['GLIPHY_API'] = $_spst['gliphy']['gliphy_api_key']; 

 
/* SMS */
$site_config['TXTLOCAL_EMAIL'] = $_spst['sms']['sms_email']; 
$site_config['TXTLOCAL_PASS'] = $_spst['sms']['sms_password']; 
$site_config['TXTLOCAL_SENDER'] = $_spst['sms']['sms_sender']; 
$site_config['TXTLOCAL_ENABLED'] = $_spst['sms']['enabled'] ? true : false; 
$site_config['PHONE_PREFIX_CD'] = $_spst['sms']['sms_telcode']; 

/* Ip stack api */
$site_config['IP_STACK_API'] = $_spst['ip_stack_api']['api'];

/* Google 
-----------------------------*/
$site_config['GOOGLE_API_KEY'] = $_spst['google']['google_api_key']; 

/* Site config
----------------------*/

$site_config['NODE_ENABLED'] = $_spst['site']['real_time']['enabled'];
$site_config['_NODE_ENABLED'] = $site_config['NODE_ENABLED'] == 'yes' ? 1 : 0;
$site_config['NODE_PORT'] = $_spst['site']['real_time']['port'];
$site_config['NODE_HOSTNAME'] = $_spst['site']['real_time']['host'];
$site_config['NODE_HOST'] = (HTTPS_ON ? "https://" : "http://").$site_config['NODE_HOSTNAME'].':'.$site_config['NODE_PORT']; // node host
$site_config['ICESERVERS'] = $_spst['site']['real_time']['iceservers'];

$site_config['HOST']     = !empty($_spst['site']['host']) ? $_spst['site']['host'] : _HOST; // your hostname
$site_config['SITENAME'] = $_spst['site']['sitename']; // Site name
$site_config['SITE_SLOGAN'] = $_spst['site']['site_slogan']; // site slogan
$site_config['sitename'] = $_spst['site']['sitename_lower'];
$site_config['SITE_LANG'] = $_spst['site']['site_lang']; // Site language
$site_config['GET_USER_LOCATION_BY_IP'] = $_spst['site']['detect_user_location']; // site url that provide full details by ip

// messenger
$site_config['MESSENGER_DEFAULT_COLOR'] = "#2196F3"; // messenger default color


// mobile view
$site_config['mob_HOST'] = $_spst['site']['mobile']['host']; // Mobile site domain name
$site_config['mob_view_enabled'] = $_spst['site']['mobile']['enabled'] == 'yes' ? true : false; // Mobile site installed

// site general settings
$site_config['site_offline'] = $_gst['siteoffline']; // site offline mode
$site_config['open_user_registration'] = $_gst['user_registration']; // allow users to create accounts
$site_config['upload_videos'] = $_gst['allow_videoupload']; // allow users to upload video files
$site_config['upload_audios'] = $_gst['allow_audioupload']; // allow users to upload audio files
$site_config['delete_user_account'] = $_gst['delete_user_account']; // allow users to delete their accounts
$site_config['invite_friends'] = $_gst['invite_friends']; // allow users to invite friends from other social networks
$site_config['collapsed_menu'] = $_gst['collapsed_menu']; // left menu as default, open or collapsed
$site_config['private_user_account'] = $_gst['private_user_account']; // allow users to close their profile (to make visible only for their friends)

/* Pay config */
$site_config['SMS_FORTUMO_KEY'] = 'e72454e098bfe39b772d7e9d545a7837';
$site_config['PAYPAL_ACCOUNT'] = 'dobriisasa@gmail.com';
$site_config['VOTE_PRICE'] = '0.06'; // vote price ( eg. 1 vote = 0.06 USD)
$site_config['VOTE_CURRENCY'] = 'USD'; // vote currency

/* Amazon S3 */
$site_config['AMAZON_S3_ENABLED'] = $_spst['s3']['enabled'] == 'yes' ? true : false; // enable disable amazon s3 cloud service
$site_config['AMAZON_S3_ACCESS_KEY'] = $_spst['s3']['awsAccessKey']; // AWS access key
$site_config['AMAZON_S3_SECRET_KEY'] = $_spst['s3']['awsSecretKey']; // AWS secret key
$site_config['AMAZON_S3_BUCKET_NAME'] = isset($_spst['s3']['bucket_name']) ? $_spst['s3']['bucket_name'] : '_SOCIALPLUS_'; // AWS bucket name
define('AWS_S3_BUCKET_NAME',$site_config['AMAZON_S3_BUCKET_NAME']);
define('AWS_S3_BUCKET_LOCATION',false);

$site_config['AMAZON_S3_PICTURES_BUCKETS'] = array("large","medium","small","thumb","exp","grid");  // pictures copies
$site_config['AMAZON_S3_USER_COVERS_BUCKETS'] = array("ucovers"); // user's themes pics
$site_config['AMAZON_S3_USER_VIDEO_BUCKET'] = array("uvideos"); // video bucket
$site_config['AMAZON_S3_USER_VIDEO_COVERS_BUCKET'] = array("uvideos-covers"); // video covers bucket
$site_config['AMAZON_S3_ATTACHMENTS_BUCKET'] = array("attachments"); // video covers bucket
$site_config['AMAZON_S3_COMMUNITIES_COVERS_BUCKET'] = array("communities-covers"); // cover for communities
$site_config['AMAZON_S3_COMMUNITIES_PICTURES_BUCKETS'] = array("large","medium","small"); // pictures for communities
$site_config['AMAZON_S3_COMMUNITIES_VIDEO_BUCKET'] = array("communities-videos-file"); // videos for community
$site_config['AMAZON_S3_COMMUNITIES_VIDEO_COVERS_BUCKET'] = array("communities-videos-covers"); // video covers bucket for communities


/* Themes */
$site_config['THEMES_DIR'] = $_spst['themes']['themes_dir']; // dir where stored all jpg themes
$site_config['DEFAULT_THEME'] = $_spst['themes']['default_theme']; // default theme

/* Apps */
$site_config['APPS_GENRES'] = $_spst['apps']['genres'];


/* Stories */
$site_config['STORIES_SMALL_IMAGES_SIZE'] = 100;


/* Marketplace */
$site_config['MARKETPLACE_CURRENCY'] = $_spst['marketplace']['currency'];
$site_config['MARKETPLACE_PRODUCTS_CATEGORIES'] = $_spst['marketplace']['products_categories'];
$site_config['AMAZON_S3_MARKET_PICTURES_BUCKETS'] = array("large","medium","small"); // pictures for market
$site_config['MARKET_PRODUCTS_SMALL_IMAGES_SIZE'] = 100;
$site_config['MARKET_PRODUCTS_MEDIUM_IMAGES_SIZE'] = 200;

/* Communities */
$site_config['GROUPS_GENRES'] = $_spst['communities']['genres'];
$site_config['GROUPS_SMALL_COVERS_SIZE'] = $_spst['communities']['community_small_images_size'];
$site_config['GROUPS_SMALL_IMAGES_SIZE'] = $_spst['communities']['community_small_images_size'];
$site_config['GROUPS_MEDIUM_IMAGES_SIZE'] = $_spst['communities']['community_medium_images_size'];
$site_config['GROUPS_DEFAULT_COVER'] = $_spst['communities']['group_default_cover'];

/* Gifts */
$site_config['GIFTS_GENRES'] = $_spst['gifts']['genres'];
$site_config['GIFT_EXPIRES_TIME'] = $_spst['gifts']['expires_time'];


/* Smilies */
$site_config['SMILIES_PATH'] = $_spst['emoticons_path']['smilies']; // dir where stored all gif smilies

/* Stickers */
$site_config['STICKERS_PATH'] = $_spst['emoticons_path']['stickers']; // dir where stored all meep icons


/* Users configuration
-------------------------*/
$site_config['USER_REG_STATUS'] = $_spst['user_config']['user_reg_status']; // user's status after signup, ( confirmed | pending )
$site_config['TIME_KEEP_USER_LOGGED'] = $_spst['user_config']['time_keep_user_logged']; // boolean true|false, keep user logged (calculated in days)
$site_config['USER_DEFAULT_PHOTO'] = array(
											"male" => '/template/'._THEME."/css/images/user/c/camera_100.png",
											"female" => '/template/'._THEME."/css/images/user/c/camera_100.png",
											"online_male" => '/template/'._THEME."/css/images/user/c/camera_100.png",
											"online_female" => '/template/'._THEME."/css/images/user/c/camera_100.png"
											);
$site_config['CORRUPTED_PHOTO_DEFAULT'] = '/template/'._THEME.'/css/images/photo-layer.png'; // default photo for corrupted photos
$site_config['ONLINE_INTERVAL'] = $_spst['user_config']['online_interval']; // interval of online user in minutes

/* Upload photos */
$site_config['MAX_FILE_UPLOAD'] = $_spst['upload_photos']['max_file_upload']; // calculated in mb
$site_config['VALID_FORMATS']   = $_spst['upload_photos']['valid_formats']; // valid photos formats
$site_config['PH_OUTPUT_DIR']   = __IMG_DIR; //  dir where store user's photos
$site_config['AT_OUTPUT_DIR']   = __AT_DIR; //  dir where store attachments

/* Upload videos */
$site_config['VD_MAX_FILE_UPLOAD'] = $_spst['upload_videos']['vd_max_file_upload']; // calculated in mb
$site_config['VD_VALID_FORMATS']   = $_spst['upload_videos']['vd_valid_formats']; // valid videos formats
$site_config['VD_OUTPUT_DIR']   = __VD_DIR; //  dir where store user's videos

/* Chat */

// photo sizes
$site_config['MEDIUM_SIZE'] = $_spst['upload_photos']['size']['medium']; // medium
$site_config['THUMB_SIZE'] = $_spst['upload_photos']['size']['thumb']; // thumbs
$site_config['GRID_SIZE'] = $_spst['upload_photos']['size']['grid']; // grid
$site_config['EXP_SIZE'] = $_spst['upload_photos']['size']['exp']; // EXP (600x600)
$site_config['SMALL_SIZE'] = $_spst['upload_photos']['size']['small']; // small
$site_config['WATERMARK'] = $_spst['upload_photos']['watermark']; // watermark

// sql result limit
$site_config['P_PHOTOS_LIMIT'] = $_spst['limit']['p_photos_limit']; // limit of photos in personal photos album
$site_config['A_PHOTOS_LIMIT'] = $_spst['limit']['a_photos_limit']; // limit of photos in photo albums
$site_config['PM_CONVERSATIONS_LIMIT'] = $_spst['limit']['pm_conversation_limit']; // limit of conversations in private messages
$site_config['PM_MESSAGES_LIMIT'] = $_spst['limit']['pm_messages_limit']; // limit of messages in chatbox
$site_config['CHAT_LIMIT'] = $_spst['limit']['chat_messages_limit']; // limit of messages in chat
$site_config['FRIENDS_PER_PAGE_LIMIT'] = $_spst['limit']['friends_per_page_limit']; // limit of friends per page or per one request
$site_config['FRIENDS_ONLINE_LIMIT'] = $_spst['limit']['friends_online_limit']; // limit of online friends
$site_config['PHOTO_VIEWER_COMMENTS_LIMIT'] = $_spst['limit']['photoviewer_comments_limit']; // limit of comments in photo viewer
$site_config['PHOTO_VIEWER_COMMENTS_REPLIES_LIMIT'] = $_spst['limit']['photo_viewer_comments_replies_limit']; // limit of replies at comments in photo viewer
$site_config['GRADES_LIMIT'] = $_spst['limit']['grades_limit']; // limit of grades in Grades Popup
$site_config['CMWIDGET_COMMENTS_LIMIT'] = $_spst['limit']['post_comments_limit']; // limit of comments in posts
$site_config['FEED_RESULT_LIMIT'] = $_spst['limit']['feed_res']; // feed results limit
$site_config['USER_FEED_LIMIT'] = $_spst['limit']['user_feed_limit']; // user's wall limit of posts
$site_config['POSTS_PAGE_RES_LIMIT'] = $_spst['limit']['post_per_page_limit']; // posts page result limit
$site_config['PROFILE_WALL_PHOTOS_LIMIT'] = $_spst['limit']['profile_wall_photos_limit']; // profile wall photos (all photos) limit
$site_config['VIDEO_POPUP_SIMILAR_LIMIT'] = $_spst['limit']['vide_popup_similar_limit']; // in popup videos, limit of similar vid
$site_config['SEARCH_SUGGESTIONS_LIMIT'] = $_spst['limit']['search_suggestions_limit']; // tophead search suggestion limit
$site_config['SEARCH_CONTENT_LIMIT'] = $_spst['limit']['search_content_limit']; // search content limit
$site_config['COMMUNITIES_LIMIT'] = $_spst['limit']['communities_limit'];  // limit of groups per page
$site_config['GROUP_FEED_LIMIT'] = $_spst['limit']['community_feed_items_limit']; // group feed limit
$site_config['COMMUNITIES_ALBUM_ITEMS_LIMIT'] = $_spst['limit']['community_album_items_limit']; // group items limit in album



