<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2016 phpflame. All rights reserved.
// +------------------------------------------------------------------------+

require_once('assets/init.php');

$page = '';
if (isset($_GET['link1'])) {
    $page = $_GET['link1'];
} 

else {
    $page = 'home';
}

$og_meta_tags = '';

if ($fl['loggedin'] == true) {
    $update = FL_UpdateUserData($fl['user']['user_id'], array('last_active' => time()));
} 

else if (!empty($_SERVER['HTTP_HOST'])) {
    $server_scheme = @$_SERVER["HTTPS"];
    $pageURL = ($server_scheme == "on") ? "https://" : "http://";
    $http_url = $pageURL . $_SERVER['HTTP_HOST'];
    $url = parse_url($fl['config']['site_url']);
    if (!empty($url)) {
        if ($url['scheme'] == 'http') {
            if ($http_url != 'http://' . $url['host']) { 
               header('Location: ' . $fl['config']['site_url']);
               exit();
            }
        } 
        else {
            if ($http_url != 'https://' . $url['host']) { 
               header('Location: ' . $fl['config']['site_url']);
               exit();
            }
        }
    }
}


switch ($page) {
    case 'home':
        include('sources/home.php');
        break;
    case 'activate':
        include('sources/activate.php');
        break;
    case 'login':
        include('sources/login.php');
        break;
    case 'register':
        include('sources/register.php');
        break;
    case 'timeline':
        include('sources/timeline.php');
        break;
    case 'logout':
        include('sources/logout.php');
        break;
    case 'forgot_password':
        include('sources/forgot_password.php');
        break;
    case 'reset-password':
        include('sources/reset_password.php');
        break;
    case 'profile':
        include('sources/profile.php');
        break;
    case 'settings':
        include('sources/settings.php');
        break;
    case 'create-new':
        include('sources/create_new.php');
        break;
    case 'news':
        include('sources/news.php');
        break;
    case 'lists':
        include('sources/lists.php');
        break;    
    case 'videos':
        include('sources/videos.php');
        break;   
    case 'music':
        include('sources/music.php');
        break;    
    case 'polls':
        include('sources/polls.php');
        break;
    case 'quiz':
        include('sources/quiz.php');
        break; 
    case 'delete-post':
        include('sources/delete_post.php');
        break;
    case 'edit-post':
        include('sources/edit_post.php');
        break;
    case 'admincp':
        header("Location: " . FL_Link('admin-cp'));
        exit();
        break;
    case 'search':
        include('sources/search.php');
        break;
    case 'latest-news':
        include('sources/latest-news.php');
        break;   
    case 'latest-lists':
        include('sources/latest-lists.php');
        break; 
    case 'latest-videos':
        include('sources/latest-videos.php');
        break; 
    case 'latest-music':
        include('sources/latest-music.php');
        break; 
    case 'latest-quizzes':
        include('sources/latest-quizzes.php');
        break;
    case 'latest-polls':
        include('sources/latest-polls.php');
        break; 
    case 'saved-drafts':
        include('sources/saved-drafts.php');
        break; 
    case 'create-new-mobile':
        include('sources/create-new-mobile.php');
        break;
    case 'terms':
        include('sources/terms.php');
        break;
    case 'tags':
        include('sources/tags.php');
        break;
    case 'feeds':
        include('sources/feeds.php');
        break;
    case 'rss':
        include('sources/rss.php');
        break;
    case 'post_data':
        include('sources/post_data.php');
        break;
    case 'go_pro':
        include('sources/go_pro/content.php');
        break;
    case 'ads':
        include('sources/ads/ads.php');
        break;
    case 'create_ad':
        include('sources/ads/create.php');
        break;
    case 'edit_ad':
        include('sources/ads/edit_ad.php');
        break;
        
}

if (empty($fl['content'])) {
    include('sources/404.php');
}


$background        = '';
$extra_js          = '';
$over = '';
if ($fl['page'] == 'forgot_password' || $fl['page'] == 'register' || $fl['page'] == 'login') {
    $background = 'body{background: url(' . $config['theme_url'] . '/img/background.jpg) repeat fixed !important;}';
    $over = '<div class="overlay"></div>';
}
if ($fl['page'] == 'news' || $fl['page'] == 'lists' || $fl['page'] == 'polls' || $fl['page'] == 'videos' || $fl['page'] == 'music' || ($fl['page'] == 'quiz' && empty($fl['quiz-result']))) {
    switch ($fl['page']) {
        case 'news':
            $fl['og_meta'] = $fl['news'];
            break;
        case 'polls':
            $fl['og_meta'] = $fl['polls'];
            break;
        case 'lists':
            $fl['og_meta'] = $fl['lists'];
            break;
        case 'videos':
            $fl['og_meta'] = $fl['videos'];
            break;
        case 'music':
            $fl['og_meta'] = $fl['music'];
            break;
        case 'quiz':
            $fl['og_meta'] = $fl['quiz'];
            break;
    }
    $og_meta_tags = FL_Loadpage('header/og-meta', array(
        'OG_TITLE' => $fl['title'],
        'OG_DESC' =>  $fl['description'],
        'OG_IMAGE' => FL_GetMedia($fl['og_meta']['image'])
    ));
}
if ($fl['page'] == 'create_new' || $fl['page'] == 'edit-post') {
    $extra_js = FL_Loadpage('extra-js');
}

if ($fl['page'] == 'quiz' && !empty($fl['quiz-result'])) {
    $og_meta_tags = FL_Loadpage('header/og-meta', array(
        'OG_TITLE' => $fl['quiz-result']['title'],
        'OG_DESC' =>  $fl['quiz-result']['text'],
        'OG_IMAGE' => $fl['quiz-result']['image']
    ));
}

if ($fl['loggedin'] == true) {
    $header = FL_LoadPage('header/is-logged', array(
        'USER_DATA' => $fl['user'],
    ));
} 

else {
    $header = FL_LoadPage('header/not-logged');
}


/* Get active Breaking news */ 
$breaking_news_data   = "";
if ($fl['page'] != 'profile') {
    $fetch_brnews_data_array = array(
        'table' => T_BR_NEWS,
        'column' => 'id',
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        ),
        'where' => array(
            array(
                'column' => 'expire',
                'value' =>  time(),
                'mark' => '>='
            ),
            array(
                'column' => 'active',
                'value' =>  1,
                'mark' => '='
            ),
        ),
        'final_data' => array(
            array(
                'function_name' => 'FL_GetBrNews',
                'column' => 'id'
            )
        )
    );
    
    $fl['breaking_news']  = FL_FetchDataFromDB($fetch_brnews_data_array);

    if (count($fl['breaking_news']) > 0) {
        $breaking_news_data = FL_LoadPage('br_news/content');
    }
}
/* Get active Announcements */ 
$announcement             = "";
if ($fl['loggedin'] === true && $fl['page'] != 'profile') {

    $fl['announcements']  = FL_GetAnnouncments();
    if(is_array($fl['announcements'])) {
        foreach ($fl['announcements'] as $fl['announcement']){
            $announcement   =  FL_LoadPage("announcement/content",array(
                'ANN_ID'    => $fl['announcement']['id'],
                'ANN_TEXT'  => FL_Decode($fl['announcement']['text']),
            ));
        }
    }
}

/* Get active Announcements */ 

$final_content = FL_LoadPage('container', array(
    'CONTAINER_TITLE' => $fl['title'],
    'CONTAINER_DESC' => $fl['description'],
    'CONTAINER_KEYWORDS' => $fl['keywords'],

    'OG_META_TAGS' => $og_meta_tags,

    'HEADER_HTML' => FL_LoadPage('header/content', array(
        'PAGE_IS_HOME' => ($fl['page_home'] == true || strpos($fl['page'], 'latest-') !== false) ? 'container-home' : '',
        'LOGGEDIN_HEADER' => $header,
		'ACTIVE_NAVBAR_HOME' => ($fl['page'] == 'home') ? 'active' : '',
        'ACTIVE_NAVBAR_NEWS' => ($fl['page'] == 'latest-news') ? 'active' : '',
        'ACTIVE_NAVBAR_LISTS' => ($fl['page'] == 'latest-lists') ? 'active' : '',
        'ACTIVE_NAVBAR_VIDEOS' => ($fl['page'] == 'latest-videos') ? 'active' : '',
        'ACTIVE_NAVBAR_MUSIC' => ($fl['page'] == 'latest-music') ? 'active' : '',
        'ACTIVE_NAVBAR_POLLS' => ($fl['page'] == 'latest-polls') ? 'active' : '',
        'ACTIVE_NAVBAR_QUZZES' => ($fl['page'] == 'latest-quizzes') ? 'active' : '',
    )),
    'FOOTER_HTML' => FL_LoadPage('footer/content'),

    'BACKGROUND_IMAGE' => $background,
    'OVER' => $over,
    'CONTAINER_SIZE' => ($fl['page_home'] == true || strpos($fl['page'], 'latest-') !== false) ? 'container-home' : '',
    'CONTENT_CONTAINER' => ($fl['page'] == 'profile') ? 'profile-content-container' : 'content-container',
    'LATEST_CONTAINER' => (strpos($fl['page'], 'latest-') !== false) ? 'latest-container' : '',
    'WHITE_BACKGROUND' => ($fl['page'] == 'news' || $fl['page'] == 'delete-post') ? 'class="news-page"' : '',

    'EXTRA_JS_CODE' => $extra_js,
    'BR_NEWS' => ($fl['page'] != 'login' && $fl['page'] != 'register' && $fl['page'] != 'reset_password' && $fl['page'] != 'forgot_password') ? $breaking_news_data: '',
    'ANNOUNCEMENT' => $announcement,

    'CONTAINER_CONTENT' => $fl['content'],
    'HEADER_AD' => FL_GetAd('header', false),
    'FOOTER_AD' => FL_GetAd('footer', false),
));

echo $final_content;
mysqli_close($sqlConnect);
unset($fl);
?>