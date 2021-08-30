<?php
if (empty($_GET['tag'])) {
	header("Location:" . $site_url);
	exit();
}
$fl['title'] = $lang['tags'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['page'] = 'tags';
$fl['keywords'] = $fl['config']['keywords'];

$tag = FL_Secure($_GET['tag']);
$order_by = array('type' => 'desc', 'column' => 'id');
$where_function = array(
    array(
        'column' => 'active',
        'value' => '1',
        'mark' => '='
    ),
    array(
        'column' => 'tags',
        'value' => '%' . $tag . '%',
        'mark' => 'LIKE'
    ),
);

$count_user_darfts_news = array(
    'table' => T_NEWS,
    'column' => 'id',
    'count' => true,
    'where' => $where_function
);

$news = FL_FetchDataFromDB($count_user_darfts_news);

$count_user_darfts_lists = array(
    'table' => T_LISTS,
    'column' => 'id',
    'count' => true,
    'where' => $where_function
);

$lists = FL_FetchDataFromDB($count_user_darfts_lists);

$count_user_darfts_videos = array(
    'table' => T_VIDEOS,
    'column' => 'id',
    'count' => true,
    'where' => $where_function
);

$videos = FL_FetchDataFromDB($count_user_darfts_videos);

$count_user_darfts_music = array(
    'table' => T_MUSIC,
    'column' => 'id',
    'count' => true,
    'where' => $where_function
);

$music = FL_FetchDataFromDB($count_user_darfts_music);

$count_user_darfts_polls = array(
    'table' => T_POLLS_PAGES,
    'column' => 'id',
    'count' => true,
    'where' => $where_function
);

$polls = FL_FetchDataFromDB($count_user_darfts_polls);

///////

$get_user_darfts_news = array(
    'table' => T_NEWS,
    'column' => 'id',
    'order' => $order_by,
    'limit' => 50,
    'where' => $where_function,
    'final_data' => array(
        array(
            'function_name' => 'FL_GetNews',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$get_news = $fl['get_news_drafts'] = FL_FetchDataFromDB($get_user_darfts_news);

$get_user_darfts_lists = array(
    'table' => T_LISTS,
    'column' => 'id',
    'order' => $order_by,
    'limit' => 50,
    'where' => $where_function,
    'final_data' => array(
        array(
            'function_name' => 'FL_GetLists',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$get_lists = $fl['get_lists_drafts'] = FL_FetchDataFromDB($get_user_darfts_lists);

$get_user_darfts_videos = array(
    'table' => T_VIDEOS,
    'order' => $order_by,
    'column' => 'id',
    'limit' => 50,
    'where' => $where_function,
    'final_data' => array(
        array(
            'function_name' => 'FL_GetVideos',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$get_videos = $fl['get_videos_drafts'] = FL_FetchDataFromDB($get_user_darfts_videos);

$get_user_darfts_music = array(
    'table' => T_MUSIC,
    'order' => $order_by,
    'column' => 'id',
    'limit' => 50,
    'where' => $where_function,
    'final_data' => array(
        array(
            'function_name' => 'FL_GetMusic',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$get_music = $fl['get_music_drafts'] = FL_FetchDataFromDB($get_user_darfts_music);


$get_user_darfts_polls = array(
    'table' => T_POLLS_PAGES,
    'order' => $order_by,
    'column' => 'id',
    'limit' => 50,
    'where' => $where_function,
    'final_data' => array(
        array(
            'function_name' => 'FL_GetPolls',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$get_polls = $fl['get_polls_drafts'] = FL_FetchDataFromDB($get_user_darfts_polls);

$fl['content'] = FL_LoadPage('tags/content', array(
	'COUNT_NEWS_DRAFTS' => $news[0]['count'],
	'COUNT_LISTS_DRAFTS' => $lists[0]['count'],
	'COUNT_VIDEOS_DRAFTS' => $videos[0]['count'],
	'COUNT_MUSIC_DRAFTS' => $music[0]['count'],
	'COUNT_POLLS_DRAFTS' => $polls[0]['count'],
	'TAG' => $tag
));