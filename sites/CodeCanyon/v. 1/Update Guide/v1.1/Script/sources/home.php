<?php
$fl['title']       = $lang['home'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'home';
if (in_array($fl['page'], $fl['pages_home_array'])) {
    $fl['page_home'] = true;
}

// Get TOP content;
require 'sources/home/top/news.php';
require 'sources/home/top/lists.php';
require 'sources/home/top/polls.php';
require 'sources/home/top/videos.php';
require 'sources/home/top/music.php';


// Get Latest content;
require 'sources/home/latest/news.php';
require 'sources/home/latest/lists.php';
require 'sources/home/latest/videos.php';
require 'sources/home/latest/polls.php';
require 'sources/home/latest/music.php';
require 'sources/home/latest/quizzes.php';

// Get Random content;
require 'sources/home/random/news.php';

// Get trending
require 'sources/home/trending/content.php';

$fetch_most_watched_data_array = array(
    'table' => T_LISTS,
    'column' => 'id',
    'limit' => 2,
    'order' => array(
        'type' => 'desc',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        )
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetLists',
            'column' => 'id',
            'name' => 'list'
        )
    )
);
$most_watched      = $fl['most_watched'] = FL_FetchDataFromDB($fetch_most_watched_data_array);
$fl_rss_source     = false;
$fl['fl_rss_feed'] = array();

if (!empty($fl['config']['rss_feed']) && FL_IsUrl($fl['config']['rss_feed'])){    
    $fl['fl_rss_feed'] = FL_ImportRssFeed($fl['config']['rss_feed'],$fl['config']['rss_feed_limit']);
}


$fl['content'] = FL_LoadPage('home/content', array(
    'TOP_NEWS_HTML' => $top_news_html,
    'TOP_LISTS_HTML' => $top_lists_html,
    'TOP_POLLS_HTML' => $top_polls_html,
    'TOP_VIDEOS_HTML' => $top_videos_html,
    'TOP_MUSIC_HTML' => $top_music_html,

    'LATEST_NEWS_AD' => FL_GetAd('home_latest_news', false),
    'LATEST_LISTS_AD' => FL_GetAd('home_latest_lists', false),
    'LATEST_VIDEOS_AD' => FL_GetAd('home_latest_videos', false),
    'LATEST_MUSIC_AD' => FL_GetAd('home_latest_music', false),
));

