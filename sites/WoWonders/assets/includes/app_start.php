<?php
error_reporting(0);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

@ini_set('max_execution_time', 0);
require_once('config.php');
require_once('assets/libraries/DB/vendor/autoload.php');

// require 'assets/libraries/ffmpeg-class/vendor/autoload.php';
$wo           = array();
// Connect to SQL Server
$sqlConnect   = $wo['sqlConnect'] = mysqli_connect($sql_db_host, $sql_db_user, $sql_db_pass, $sql_db_name, 3306);
// Handling Server Errors
$ServerErrors = array();
if (mysqli_connect_errno()) {
    $ServerErrors[] = "Failed to connect to MySQL: " . mysqli_connect_error();
}
if (!function_exists('curl_init')) {
    $ServerErrors[] = "PHP CURL is NOT installed on your web server !";
}
if (!extension_loaded('gd') && !function_exists('gd_info')) {
    $ServerErrors[] = "PHP GD library is NOT installed on your web server !";
}
if (!extension_loaded('zip')) {
    $ServerErrors[] = "ZipArchive extension is NOT installed on your web server !";
}

$query = mysqli_query($sqlConnect, "SET NAMES utf8mb4");
if (isset($ServerErrors) && !empty($ServerErrors)) {
    foreach ($ServerErrors as $Error) {
        echo "<h3>" . $Error . "</h3>";
    }
    die();
}

$baned_ips = Wo_GetBanned('user');

if (in_array($_SERVER["REMOTE_ADDR"], $baned_ips)) {
    exit();
}

$config              = Wo_GetConfig();
$db                  = new MysqliDb($sqlConnect);

if( ISSET( $_GET['theme'] ) ){
    $_SESSION['theme'] = $_GET['theme'];
}

if( ISSET( $_SESSION['theme'] ) ){
    $config['theme'] = $_SESSION['theme'];
    if( $_SERVER["REQUEST_URI"] == "/v2/wonderful" || $_SERVER["REQUEST_URI"] == "/v2/wowonder" ){
        header("Location: " . $_SERVER['HTTP_REFERER']);
    }
}

// Config Url
$config['theme_url'] = $site_url . '/themes/' . $config['theme'];

$config['site_url']  = $site_url;
$wo['site_url']      = $site_url;
$s3_site_url         = 'https://test.s3.amazonaws.com';
if (!empty($config['bucket_name'])) {
    $s3_site_url = "https://{bucket}.s3.amazonaws.com";
    $s3_site_url = str_replace('{bucket}', $config['bucket_name'], $s3_site_url);
}
$config['s3_site_url'] = $s3_site_url;


$wo['config']              = $config;
$ccode                     = Wo_CustomCode('g');
$ccode                     = (is_array($ccode))  ? $ccode    : array();
$wo['config']['header_cc'] = (!empty($ccode[0])) ? $ccode[0] : '';
$wo['config']['footer_cc'] = (!empty($ccode[1])) ? $ccode[1] : '';
$wo['config']['styles_cc'] = (!empty($ccode[2])) ? $ccode[2] : '';

$wo['site_pages'] = array(
    'home',
    'welcome',
    'activate',
    'search',
    'timeline',
    'pages',
    'page',
    'groups',
    'group',
    'create-group',
    'group-setting',
    'create-page',
    'setting',
    'page-setting',
    'messages',
    'logout',
    '404',
    'post',
    'games',
    'saved-posts',
    'hashtag',
    'terms',
    'contact-us',
    'albums',
    'album',
    'game',
    'go_pro',
    'upgraded',
    'oops',
    'user_activation',
    'boosted-pages',
    'boosted-posts',
    'video-call',
    'read-blog',
    'blog',
    'My-Blogs',
    'edit-blog',
    'create_blog',
    'developers',
    'ads',
    'password-reset',
    'admin-cp',
    'admincp',
    'adminPages',
    'start-up',
    'activated',
    'ads-create',
    'app',
    'messages',
    'terms',
    'video-call',
    'video-call-api',
    'post',
    'game',
    'upgraded',
    'get_news_feed',
    'new-game',
    'go-pro',
    'oops',
    'user-activation',
    'hashtag',
    'follow-requests',
    '404',
    'register',
    'confirm-sms',
    'forgot-password',
    'activate',
    'pages',
    'create-group',
    'create-page',
    'logout',
    'contact-us',
    'setting',
    'messages',
    'albums',
    'album',
    'products',
    'my-products',
    'blogs',
    'sharer',
    'app_api',
    'api_request',
    'authorize'
);

$wo['script_version']  = '2.1';
$http_header           = 'http://';
if (!empty($_SERVER['HTTPS'])) {
    $http_header = 'https://';
}
$wo['actual_link']   = $http_header . $_SERVER['HTTP_HOST'] . urlencode($_SERVER['REQUEST_URI']);
// Define Cache Vireble
$cache               = new Cache();

if (!is_dir('cache')) {
    $cache->Wo_OpenCacheDir();
}

$wo['purchase_code'] = '';
if (!empty($purchase_code)) {
    $wo['purchase_code'] = $purchase_code;
}



// Login With Url
$wo['facebookLoginUrl']   = $config['site_url'] . '/login-with.php?provider=Facebook';
$wo['twitterLoginUrl']    = $config['site_url'] . '/login-with.php?provider=Twitter';
$wo['googleLoginUrl']     = $config['site_url'] . '/login-with.php?provider=Google';
$wo['linkedInLoginUrl']   = $config['site_url'] . '/login-with.php?provider=LinkedIn';
$wo['VkontakteLoginUrl']  = $config['site_url'] . '/login-with.php?provider=Vkontakte';
$wo['instagramLoginUrl']  = $config['site_url'] . '/login-with.php?provider=Instagram';
// Defualt User Pictures 
$wo['userDefaultAvatar']  = 'upload/photos/d-avatar.jpg';
$wo['userDefaultCover']   = 'upload/photos/d-cover.jpg';
$wo['pageDefaultAvatar']  = 'upload/photos/d-page.jpg';
$wo['groupDefaultAvatar'] = 'upload/photos/d-group.jpg';
// Get LoggedIn User Data
$wo['loggedin']           = false;
$langs                    = Wo_LangsNamesFromDB();
if (Wo_IsLogged() == true) {
    $session_id         = (!empty($_SESSION['user_id'])) ? $_SESSION['user_id'] : $_COOKIE['user_id'];
    $wo['user_session'] = Wo_GetUserFromSessionID($session_id);
    $wo['user']         = Wo_UserData($wo['user_session']);
    if (!empty($wo['user']['language'])) {
        if (in_array($wo['user']['language'], $langs)) {
            $_SESSION['lang'] = $wo['user']['language'];
        }
    }
    if ($wo['user']['user_id'] < 0 || empty($wo['user']['user_id']) || !is_numeric($wo['user']['user_id']) || Wo_UserActive($wo['user']['username']) === false) {
        header("Location: " . Wo_SeoLink('index.php?link1=logout'));
    }
    $wo['loggedin'] = true;
}

if (!empty($_GET['c_id']) && !empty($_GET['user_id'])) {
    $application = 'windows';
    if (!empty($_GET['application'])) {
        if ($_GET['application'] == 'phone') {
            $application = Wo_Secure($_GET['application']);
        }
    }
    $c_id             = Wo_Secure($_GET['c_id']);
    $user_id          = Wo_Secure($_GET['user_id']);
    $check_if_session = Wo_CheckUserSessionID($user_id, $c_id, $application);
    if ($check_if_session === true) {
        $wo['user']          = Wo_UserData($user_id);
        $session             = Wo_CreateLoginSession($user_id);
        $_SESSION['user_id'] = $session;
        setcookie("user_id", $session, time() + (10 * 365 * 24 * 60 * 60));
        if ($wo['user']['user_id'] < 0 || empty($wo['user']['user_id']) || !is_numeric($wo['user']['user_id']) || Wo_UserActive($wo['user']['username']) === false) {
            header("Location: " . Wo_SeoLink('index.php?link1=logout'));
        }
        $wo['loggedin'] = true;
    }
}
if (!empty($_POST['user_id']) && (!empty($_POST['s']))) {
    $application = 'windows';
    $access_token = (!empty($_POST['s'])) ? $_POST['s'] : $_POST['access_token'];
    if (!empty($_GET['application'])) {
        if ($_GET['application'] == 'phone') {
            $application = Wo_Secure($_GET['application']);
        }
    }
    if ($application == 'windows') {
        $access_token = md5($access_token);
    }
    $s                = Wo_Secure($access_token);
    $user_id          = Wo_Secure($_POST['user_id']);
    $check_if_session = Wo_CheckUserSessionID($user_id, $s, $application);
    if ($check_if_session === true) {
        $wo['user'] = Wo_UserData($user_id);
        if ($wo['user']['user_id'] < 0 || empty($wo['user']['user_id']) || !is_numeric($wo['user']['user_id']) || Wo_UserActive($wo['user']['username']) === false) {
            $json_error_data = array(
                'api_status' => '400',
                'api_text' => 'failed',
                'errors' => array(
                    'error_id' => '7',
                    'error_text' => 'User id is wrong.'
                )
            );
            header("Content-type: application/json");
            echo json_encode($json_error_data, JSON_PRETTY_PRINT);
            exit();
        }
        $wo['loggedin'] = true;
    } else {
        $json_error_data = array(
            'api_status' => '400',
            'api_text' => 'failed',
            'errors' => array(
                'error_id' => '6',
                'error_text' => 'Session id is wrong.'
            )
        );
        header("Content-type: application/json");
        echo json_encode($json_error_data, JSON_PRETTY_PRINT);
        exit();
    }
}
// Language Function
if (isset($_GET['lang']) AND !empty($_GET['lang'])) {
    $lang_name = Wo_Secure(strtolower($_GET['lang']));
    if (in_array($lang_name, $langs)) {
        Wo_CleanCache();
        $_SESSION['lang'] = $lang_name;
        if ($wo['loggedin'] == true) {
            mysqli_query($sqlConnect, "UPDATE " . T_USERS . " SET `language` = '" . $lang_name . "' WHERE `user_id` = " . Wo_Secure($wo['user']['user_id']));
        }
    }
}
if ($wo['loggedin'] == true && $wo['config']['cache_sidebar'] == 1) {
    if (!empty($_COOKIE['last_sidebar_update'])) {
        if ($_COOKIE['last_sidebar_update'] < (time() - 120)) {
            Wo_CleanCache();
        }
    } else {
        Wo_CleanCache();
    }
}
if (empty($_SESSION['lang'])) {
    $_SESSION['lang'] = $wo['config']['defualtLang'];
}
$wo['language']      = $_SESSION['lang'];
$wo['language_type'] = 'ltr';
// Add rtl languages here.
$rtl_langs           = array(
    'arabic'
);
if (!isset($_COOKIE['ad-con'])) {
    setcookie('ad-con', htmlentities(serialize(array(
        'date' => date('Y-m-d'),
        'ads' => array()
    ))), time() + (10 * 365 * 24 * 60 * 60));
}
$wo['ad-con'] = array();
if (!empty($_COOKIE['ad-con'])) {
    $wo['ad-con'] = unserialize(html_entity_decode($_COOKIE['ad-con']));
}
if (!is_array($wo['ad-con']) || !isset($wo['ad-con']['date']) || !isset($wo['ad-con']['ads'])) {
    setcookie('ad-con', htmlentities(serialize(array(
        'date' => date('Y-m-d'),
        'ads' => array()
    ))), time() + (10 * 365 * 24 * 60 * 60));
}
if (is_array($wo['ad-con']) && isset($wo['ad-con']['date']) && strtotime($wo['ad-con']['date']) < strtotime(date('Y-m-d'))) {
    setcookie('ad-con', htmlentities(serialize(array(
        'date' => date('Y-m-d'),
        'ads' => array()
    ))), time() + (10 * 365 * 24 * 60 * 60));
}

if (!isset($_COOKIE['_us'])) {
    setcookie('_us', time() + (60 * 60 * 24) , time() + (10 * 365 * 24 * 60 * 60));
}

if (isset($_COOKIE['_us']) && $_COOKIE['_us'] < time() || 1) {
    setcookie('_us', time() + (60 * 60 * 24) , time() + (10 * 365 * 24 * 60 * 60));
    $expired_stories = $db->where('expire',time(),'<')->get(T_USER_STORY);
    foreach ($expired_stories as $key => $value) {
        $db->where('story_id',$value->id)->delete(T_STORY_SEEN);
    }
    @mysqli_query($sqlConnect, "DELETE FROM " . T_USER_STORY_MEDIA . " WHERE `expire` < ".time());
    @mysqli_query($sqlConnect, "DELETE FROM " . T_USER_STORY . " WHERE `expire` < ".time());
}


// checking if corrent language is rtl.
foreach ($rtl_langs as $lang) {
    if ($wo['language'] == strtolower($lang)) {
        $wo['language_type'] = 'rtl';
    }
}
// Icons Virables
$error_icon   = '<i class="fa fa-exclamation-circle"></i> ';
$success_icon = '<i class="fa fa-check"></i> ';
// Include Language File
$wo['lang']   = Wo_LangsFromDB($wo['language']);
if (file_exists('assets/languages/extra/' . $wo['language'] . '.php')) {
    require 'assets/languages/extra/' . $wo['language'] . '.php';
}
if (empty($wo['lang'])) {
    $wo['lang'] = Wo_LangsFromDB();
}
$wo['second_post_button_icon']  = ($config['second_post_button'] == 'wonder') ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>';
$theme_settings = array();
$theme_settings['theme'] = 'wowonder';

if (file_exists('./themes/' . $config['theme'] . '/layout/404/dont-delete-this-file.json')) {
    $theme_settings = json_decode(file_get_contents('./themes/' . $config['theme'] . '/layout/404/dont-delete-this-file.json'), true);
}
if ($theme_settings['theme'] == 'wonderful') {
    $wo['second_post_button_icon']  = ($config['second_post_button'] == 'wonder') ? 'exclamation-circle' : 'thumb-down';
}

$wo['second_post_button_text']  = ($config['second_post_button'] == 'wonder') ? $wo['lang']['wonder'] : $wo['lang']['dislike'];
$wo['second_post_button_texts'] = ($config['second_post_button'] == 'wonder') ? $wo['lang']['wonders'] : $wo['lang']['dislikes'];


$wo['marker']                   = '?';
if ($wo['config']['seoLink'] == 0) {
    $wo['marker'] = '&';
}
$wo['feelingIcons']                  = array(
    'happy' => 'smile',
    'loved' => 'heart-eyes',
    'sad' => 'disappointed',
    'so_sad' => 'sob',
    'angry' => 'angry',
    'confused' => 'confused',
    'smirk' => 'smirk',
    'broke' => 'broken-heart',
    'expressionless' => 'expressionless',
    'cool' => 'sunglasses',
    'funny' => 'joy',
    'tired' => 'tired-face',
    'lovely' => 'heart',
    'blessed' => 'innocent',
    'shocked' => 'scream',
    'sleepy' => 'sleeping',
    'pretty' => 'relaxed',
    'bored' => 'unamused'
);

$emo = array(
    ':)' => 'smile',
    '(&lt;' => 'joy',
    '**)' => 'relaxed',
    ':p' => 'stuck-out-tongue-winking-eye',
    ':_p' => 'stuck-out-tongue',
    'B)' => 'sunglasses',
    ';)' => 'wink',
    ':D' => 'grin',
    '/_)' => 'smirk',
    '0)' => 'innocent',
    ':_(' => 'cry',
    ':__(' => 'sob',
    ':(' => 'disappointed',
    ':*' => 'kissing-heart',
    '&lt;3' => 'heart',
    '&lt;/3' => 'broken-heart',
    '*_*' => 'heart-eyes',
    '&lt;5' => 'star',
    ':o' => 'open-mouth',
    ':0' => 'scream',
    'o(' => 'anguished',
    '-_(' => 'unamused',
    'x(' => 'angry',
    'X(' => 'rage',
    '-_-' => 'expressionless',
    ':-/' => 'confused',
    ':|' => 'neutral-face',
    '!_' => 'exclamation',
    ':|' => 'neutral-face',
    ':|' => 'neutral-face',
    ':yum:' => 'yum',
    ':triumph:' => 'triumph',
    ':imp:' => 'imp',
    ':hear_no_evil:' => 'hear-no-evil',
    ':alien:' => 'alien',
    ':yellow_heart:' => 'yellow-heart',
    ':sleeping:' => 'sleeping',
    ':mask:' => 'mask',
    ':no_mouth:' => 'no-mouth',
    ':weary:' => 'weary',
    ':dizzy_face:' => 'dizzy-face',
    ':man:' => 'man',
    ':woman:' => 'woman',
    ':boy:' => 'boy',
    ':girl:' => 'girl',
    ':оlder_man:' => 'older-man',
    ':оlder_woman:' => 'older-woman',
    ':cop:' => 'cop',
    ':dancers:' => 'dancers',
    ':speak_no_evil:' => 'speak-no-evil',
    ':lips:' => 'lips',
    ':see_no_evil:' => 'see-no-evil',
    ':dog:' => 'dog',
    ':bear:' => 'bear',
    ':rose:' => 'rose',
    ':gift_heart:' => 'gift-heart',
    ':ghost:' => 'ghost',
    ':bell:' => 'bell',
    ':video_game:' => 'video-game',
    ':soccer:' => 'soccer',
    ':books:' => 'books',
    ':moneybag:' => 'moneybag',
    ':mortar_board:' => 'mortar-board',
    ':hand:' => 'hand',
    ':tiger:' => 'tiger',
    ':elephant:' => 'elephant',
    ':scream_cat:' => 'scream-cat',
    ':monkey:' => 'monkey',
    ':bird:' => 'bird',
    ':snowflake:' => 'snowflake',
    ':sunny:' => 'sunny',
    ':оcean:' => 'ocean',
    ':umbrella:' => 'umbrella',
    ':hibiscus:' => 'hibiscus',
    ':tulip:' => 'tulip',
    ':computer:' => 'computer',
    ':bomb:' => 'bomb',
    ':gem:' => 'gem',
    ':ring:' => 'ring'
);

$wo['countries']                     = array(
    'united-states' => "United States",
    'china' => "China",
    'india' => "India",
    'iran' => "Iiran",
    'japan' => "japan",
    'turkey' => "Turkey",
    'russia' => "Russia",
    'france' => "France",
    'united-kingdom' => "United Kingdom"
);
$wo['film-genres']                   = array(
    'action' => "Action",
    'comedy' => "Comedy",
    'drama' => "Drama",
    'horror' => "Horror",
    'mythological' => "Mythological",
    'war' => "War",
    'adventure' => "Adventure",
    'family' => "Family",
    'sport' => "Sport",
    'animation' => "Animation",
    'crime' => "Crime",
    'fantasy' => "Fantasy",
    'musical' => "Musical",
    'romance' => "Romance",
    'thriller' => "Thriller",
    'history' => "History",
    'documentary' => "Documentary",
    'tvshow' => "TV Show"
);

$emo_full                            = array(
    ':)' => '🙂',
    '(&lt;' => '😂',
    '**)' => '😊',
    ':p' => '😛',
    ':_p' => '😜',
    'B)' => '😎',
    ';)' => '😉',
    ':D' => '😁',
    '/_)' => 'smirk',
    '0)' => 'innocent',
    ':_(' => 'cry',
    ':__(' => 'sob',
    ':(' => 'disappointed',
    ':*' => 'kissing-heart',
    '&lt;3' => 'heart',
    '&lt;/3' => 'broken-heart',
    '*_*' => 'heart-eyes',
    '&lt;5' => 'star',
    ':o' => 'open-mouth',
    ':0' => 'scream',
    'o(' => 'anguished',
    '-_(' => 'unamused',
    'x(' => 'angry',
    'X(' => 'rage',
    '-_-' => 'expressionless',
    ':-/' => 'confused',
    ':|' => 'neutral-face',
    '!_' => 'exclamation',
    ':|' => 'neutral-face'
);

$wo['emo']                           = $emo;
$wo['profile_picture_width_crop']    = 150;
$wo['profile_picture_height_crop']   = 150;
$wo['profile_picture_image_quality'] = 70;
$wo['redirect']                      = 0;
$wo['footer_pages']                  = array(
    'terms',
    'oops',
    'messages',
    'start_up',
    '404',
    'search',
    'admin',
    'user_activation',
    'upgraded',
    'go_pro',
    'video',
    'custom_page',
    'products',
    'read-blog',
    'blog',
    'My-Blogs',
    'edit-blog',
    'create_blog',
    'developers',
    'movies',
    'ads',
    'setting',
    'contact-us'
);

$wo['update_cache']                  = '';
if (!empty($wo['config']['last_update'])) {
    $update_cache = time() - 21600;
    if ($update_cache < $wo['config']['last_update']) {
        $wo['update_cache'] = '?' . sha1(time());
    }
}

$wo['css_file_header']   = "
<style>
.navbar-default {
   height:45px !important;
   display: block !important;
   visibility: visible !important;
}
</style>
";

$colors                  = $wo['colors'] = shuffle_assoc(array(
    '#b582af',
    '#a84849',
    '#fc9cde',
    '#f9c270',
    '#70a0e0',
    '#56c4c5',
    '#51bcbc',
    '#f33d4c',
    '#a1ce79',
    '#a085e2',
    '#ed9e6a',
    '#2b87ce',
    '#f2812b',
    '#0ba05d',
    '#f9a722',
    '#8ec96c',
    '#01a5a5',
    '#5462a5',
    '#609b41',
    '#ff72d2',
    '#008484',
    '#c9605e',
    '#aa2294',
    '#056bba',
    '#0e71ea'
));

$wo['currencies'] = array(
    array (
        'text' => 'USD',
        'symbol' => '$'
    ),
    array (
        'text' => 'EUR',
        'symbol' => '€'
    ),
    array (
        'text' => 'TRY',
        'symbol' => '₺'
    ),
);

$wo['family'] = array(
    1  => 'mother',
    2  => 'father',
    3  => 'daughter',
    4  => 'son',
    5  => 'sister',
    6  => 'brother',
    7  => 'auntie',
    8  => 'uncle',
    10 => 'niece' ,
    11 => 'nephew',
    12 => 'cousin_female',
    13 => 'cousin_male',
    14 => 'grandmother',
    15 => 'grandfather',
    16 => 'granddaughter',
    17 => 'grandson',
    18 => 'stepsister',
    19 => 'stepbrother',
    20 => 'stepmother',
    21 => 'stepfather',
    22 => 'stepdaughter',
    23 => 'sister_in_law',
    24 => 'brother_in_law',
    25 => 'mother_in_law',
    26 => 'father_in_law',
    27 => 'daughter_in_law',
    28 => 'son_in_law',
    29 => 'sibling_gender_neutral',
    30 => 'parent_gender_neutral',
    31 => 'child_gender_neutral',
    32 => 'sibling_of_parent_gender_neutral',
    33 => 'child_of_sibling_gender_neutral',
    34 => 'cousin_gender_neutral',
    35 => 'grandparent_gender_neutral',
    36 => 'grandchild_gender_neutral',
    37 => 'step_sibling_gender_neutral',
    38 => 'step_parent_gender_neutral',
    39 => 'stepchild_gender_neutral',
    40 => 'sibling_in_law_gender_neutral',
    41 => 'parent_in_law_gender_neutral',
    42 => 'child_in_law_gender_neutral',
);

$ad_media_types = array(
    'video/mp4',
    'video/mov',
    'video/mpeg',
    'video/flv',
    'video/avi',
    'video/webm',
    'video/quicktime',
    'image/png',
    'image/jpeg',
    'image/gif'
);

// night mode
if (empty($_COOKIE['mode'])) {
    setcookie("mode", 'day', time() + (10 * 365 * 24 * 60 * 60), '/');
    $_COOKIE['mode'] = 'day';
    $wo['mode_link'] = 'night';
    $wo['mode_text'] = $wo['lang']['night_mode'];
} else {
    if ($_COOKIE['mode'] == 'day') {
        $wo['mode_link'] = 'night';
        $wo['mode_text'] = $wo['lang']['night_mode'];
    }
    if ($_COOKIE['mode'] == 'night') {
        $wo['mode_link'] = 'day';
        $wo['mode_text'] = $wo['lang']['day_mode'];
    }
}

if (!empty($_GET['mode'])) {
    if ($_GET['mode'] == 'day') {
        setcookie("mode", 'day', time() + (10 * 365 * 24 * 60 * 60), '/');
        $_COOKIE['mode'] = 'day';
        $wo['mode_link'] = 'night';
        $wo['mode_text'] = $wo['lang']['night_mode'];
    } else if ($_GET['mode'] == 'night') {
        setcookie("mode", 'night', time() + (10 * 365 * 24 * 60 * 60), '/');
        $_COOKIE['mode'] = 'night';
        $wo['mode_link'] = 'day';
        $wo['mode_text'] = $wo['lang']['day_mode'];
    }
}

include_once('assets/includes/onesignal_config.php');

if (!empty($_GET['access']) || empty($_COOKIE['access'])) {
    include_once('assets/includes/paypal_config.php');
    setcookie("access", '1', time() + 24*60*60, '/');
}

$star_package_duration   = 604800; // week in seconds
$hot_package_duration    = 2629743; // month in seconds
$ultima_package_duration = 31556926; // year in seconds
$vip_package_duration    = 0; // life time package