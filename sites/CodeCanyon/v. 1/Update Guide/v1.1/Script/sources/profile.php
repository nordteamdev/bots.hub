<?php
if (empty($_GET['u'])) {
	header("Location: " . FL_Link('404'));
	exit();
}
if (FL_UserExists($_GET['u']) === false) {
	header("Location: " . FL_Link('404'));
	exit();
}
$user_id = FL_UserIdFromUsername($_GET['u']);
$profile_data = $fl['profile_data'] = FL_UserData($user_id);
if (empty($user_id) || empty($profile_data)) {
	header("Location: " . FL_Link('404'));
	exit();
}

$fl['profile_data']['news_count']   = FL_CountUserPosts($profile_data['user_id'], 'news');
$fl['profile_data']['polls_count']  = FL_CountUserPosts($profile_data['user_id'], 'poll');
$fl['profile_data']['lists_count']  = FL_CountUserPosts($profile_data['user_id'], 'list');
$fl['profile_data']['videos_count'] = FL_CountUserPosts($profile_data['user_id'], 'video');
$fl['profile_data']['music_count']  = FL_CountUserPosts($profile_data['user_id'], 'music');
$fl['profile_data']['quiz_count']   = FL_CountUserPosts($profile_data['user_id'], 'quiz');

$fetch_latest_news_page_data_array = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 20,
    'order' => array(
        'type' => 'desc',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
         array(
            'column' => 'user_id',
            'value' => $profile_data['user_id'],
            'mark' => '='
        ),
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetNews',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$fl['latest_page_news'] = FL_FetchDataFromDB($fetch_latest_news_page_data_array);

$fetch_latest_news_page_data_array = array(
    'table' => T_LISTS,
    'column' => 'id',
    'limit' => 20,
    'order' => array(
        'type' => 'desc',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
         array(
            'column' => 'user_id',
            'value' => $profile_data['user_id'],
            'mark' => '='
        ),
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetLists',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$fl['latest_page_lists'] = FL_FetchDataFromDB($fetch_latest_news_page_data_array);

$fetch_latest_news_page_data_array = array(
    'table' => T_VIDEOS,
    'column' => 'id',
    'limit' => 20,
    'order' => array(
        'type' => 'desc',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
         array(
            'column' => 'user_id',
            'value' => $profile_data['user_id'],
            'mark' => '='
        ),
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetVideos',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$fl['latest_page_videos'] = FL_FetchDataFromDB($fetch_latest_news_page_data_array);


$fetch_latest_news_page_data_array = array(
    'table' => T_MUSIC,
    'column' => 'id',
    'limit' => 20,
    'order' => array(
        'type' => 'desc',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
         array(
            'column' => 'user_id',
            'value' => $profile_data['user_id'],
            'mark' => '='
        ),
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetMusic',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$fl['latest_page_music'] = FL_FetchDataFromDB($fetch_latest_news_page_data_array);

$fetch_latest_news_page_data_array = array(
    'table' => T_POLLS_PAGES,
    'column' => 'id',
    'limit' => 20,
    'order' => array(
        'type' => 'desc',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
         array(
            'column' => 'user_id',
            'value' => $profile_data['user_id'],
            'mark' => '='
        ),
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetPolls',
            'column' => 'id',
            'name' => 'news'
        )
    )
);

$fl['latest_page_polls'] = FL_FetchDataFromDB($fetch_latest_news_page_data_array);



$fetch_latest_news_page_data_array = array(
    'table' => T_QUIZZES,
    'column' => 'id',
    'limit' => 20,
    'order' => array(
        'type' => 'desc',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
         array(
            'column' => 'user_id',
            'value' => $profile_data['user_id'],
            'mark' => '='
        ),
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetQuizzes',
            'column' => 'id',
            'name' => 'news'
        )
    )
);
$fl['fields']              = array();
$fl['latest_page_quizzes'] = FL_FetchDataFromDB($fetch_latest_news_page_data_array);
$fl['pr_fields']           = FL_GetProfileFields('none');
$fl['pr_fields']           = (is_array($fl['pr_fields'])) ? $fl['pr_fields'] : array();
$fl['user_fields']         = FL_UserFieldsData($user_id);
$fl['title']               = $fl['profile_data']['name'];
$fl['description']         = $fl['profile_data']['about'];
$fl['page']                = 'profile';

foreach ($fl['pr_fields'] as $key => $fl['field']) {
    if (!empty($fl['user_fields'][$fl['field']['fid']])) {
        $fl['fields'][]    = $fl['field'];
    }
}
$fl['keywords']            = $fl['config']['keywords'];
$fl['profile_data']['verified'] = ($fl['profile_data']['verified'] == 1) ? '<span class="verified-icon"><i class="fa fa-check-circle"></i></span>' : '';
$fl['content']             = FL_LoadPage("profile/content", array(
	'USER_DATA'            => $fl['profile_data']
));
