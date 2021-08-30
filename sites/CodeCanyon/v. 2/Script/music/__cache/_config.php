<?php
$from_music = true;

require_once("../../inc/_core.php");

$SITE_CORE = new _SOCIALPLUS;

$uid = (int)$SITE_CORE->USER['id'];

define('nobil_om_songs', tbl_songs); # all songs
define('nobil_om_my_music',tbl_music); # user's songs
define('nobil_om_playlists',tbl_playlists); # collections
define('nobil_om_playlist_pos',tbl_playlist_pos); # songs from collections
define('nobil_om_history',tbl_history); # recently played songs, user's history
define('nobil_om_purchased', tbl_purchased); # purchased songs 
define('nobil_om_feedback',tbl_feedback); # feedback
define('nobil_om_users',tbl_users); # users


// root of your server
//define('__ROOT__', $_SERVER['DOCUMENT_ROOT']);
// folder name of WindowMusic php files
define('__WindowMusic__', '/music/');
// USER ID
define('__USER_ID',isset($uid) ? $uid : 0);
// Folder where save all covers from files [v1.5]
define('__FILE_COVER_DIR', '../mp3_covers/');


$site_settings = array();
$wMusic_config = array(); // simple array, for storing all settings
$site_settings = $SITE_CORE->settings;
$wMusic_config['host']     = $SITE_CORE->settings['HOST']; // your hostname
$wMusic_config['musicpth'] = __WindowMusic__; // has been defined already
$wMusic_config['musicimg'] = $wMusic_config['musicpth'] . 'images/'; // images folder name

/** -- Payments [implemented in v1.5] **/

# Skrill (MoneyBookers)
$wMusic_config['skrill_pay_to_email'] =   'your@mail.com'; // your skrill email for receive money
$wMusic_config['skrill_am_description'] = 'Song Price';
$wMusic_config['skrill_language'] = 	    'EN'; // default language for skrill payment
$wMusic_config['skrill_confirmation_note'] =   'Purchased, thanks.';

# Fortumo SMS Payments System
/** please configure your Fortumo account
 find section "To which URL will your payment requests be forwarded to?" and "Where to redirect the user after completing the payment?"
and set the URL [http://yourhostname.com/music/downloads/download_song.php?s=fortumo]
**/
$wMusic_config['fortumo_secret_key'] = 'd6596b180f7c38f694ca122ae5051bbb'; // your fortumo account secret key, you need to have account to get this secret key code

# PayPal Payments
$wMusic_config['paypal_account_email'] = 'dobriisasa@gmail.com'; // your paypal email or id for receive money

/** End payment configuration **/

// purchase
$wMusic_config['download_song_price'] = '1'; // song price
$wMusic_config['download_song_currency'] = 'USD';
$wMusic_config['show_prch_icon']      = 'NO_SELL_MUSIC'; // show the purchase icon only for the songs with English language (deprecated in v1.1.3)


//other
$wMusic_config['int_date_new_pl']               = "+1 day"; // interval days for add new emblem to the playlist, default is 1 day
$wMusic_config['index_mus_limit']               = 80; // max songs show in popular page 
$wMusic_config['sharing_url'] 			= $wMusic_config['host'].__WindowMusic__.'media/share.php'; // url for sharing a song
$wMusic_config['sharing_cover'] 		= $wMusic_config['host'].__WindowMusic__.'media/getCover.php?i='; // url for sharing a song
$wMusic_config['sharing_title']  		= $SITE_CORE->settings['SITENAME']; // your site name


// playlists
$wMusic_config['playlists_having_tr']  = 5; // select only playlists who have more than 5 tracks in index page
$wMusic_config['limit_of_playlists']   = 20; /// how much items show in playlists page
$wMusic_config['playlist_limit_songs'] = 150; /// limit of songs in playlist details
$wMusic_config['collection_img']       = $wMusic_config['host'] . "/music/images/collection.png"; // default image for created playlists
$wMusic_config['index_playlist_limit'] = 4; // in index page limit of playlists


// history page
$wMusic_config['history_limit']          = 40; // limit of songs in history page
$wMusic_config['history_clean_interval'] = '-60 days'; // delete data older than two months from history


// users page
$wMusic_config['friends_songs_limit']   = 10; // limit of songs per page in user page, this work only if user have playlists
$wMusic_config['left_side_users_limit'] = 20; // friends per page limit

// radio settings
$wMusic_config['unknown_radio'] = 'FM Pop'; // replace the unknown genre name with FM Pop (work only in radio)
$wMusic_config['other_radio']   = 'Universal Pop'; // replace the other genre name with Universal Pop (work only in radio)

// my music
$wMusic_config['my_mus_songs_limit'] = 15; // limit of songs

// search
$wMusic_config['search_songs_limit']   = 25; // limit of songs in search result, tab songs
$wMusic_config['search_artists_limit'] = 100; // limit of songs in search result, tab artists
$wMusic_config['search_albums_limit']  = 100; // limit of songs in search result, tab albums
$wMusic_config['albums_default_cv']    = $wMusic_config['host'] . "/music/css/images/feed_cover__col.png"; // default cover


//upload settings
# vimeo settings 
$wMusic_config['VIMEO_APP_ID']     = "199b478062844d9098a14b4749d78b1bf7596d00"; // your vimeo app id, can find here http://developer.vimeo.com/apps/new
$wMusic_config['VIMEO_APP_SECRET'] = "bc8b8a3d26a3d58957dae00ec49e88f770adf33b"; // your vimeo app secret, can find here http://developer.vimeo.com/apps/new
$wMusic_config['singer']           = ""; // to improve the search result for covers, you can set: e.g -> [+singer] or [+pevitza] or [+music], NOTE: the singer string must begin with plus [ + ]
$wMusic_config['valid_formats']    = array("audio/mpeg","mp3"); // validate file format
$wMusic_config['max_file_size']    = 1024 * 100000; // 100 mb, the max mp3 file size for upload is 100mb
$wMusic_config['files_dir']        = "/mp3Files/"; // folder for upload mp3 files
$wMusic_config['output_dir']       = $_SERVER['DOCUMENT_ROOT'] . '/music/' . $wMusic_config['files_dir'];
$wMusic_config['defaultCover']     = $wMusic_config['host'] . "/music/css/images/feed_cover.png"; // default cover, if google return an empty result for cover




