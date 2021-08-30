<?php

if ($fl['loggedin'] == false) {
    header("Location: " . $fl['config']['site_url']);
    exit();
}
$is_admin = FL_IsAdmin();
if ($is_admin === false) {
    header("Location: " . $fl['config']['site_url']);
    exit();
}
$page        = 'dashboard';
$page_src    = 'content';
$pages_array = array(
    'dashboard',
    'general',
    'site',
    'design',
    'social',
    'news',
    'lists',
    'videos',
    'polls',
    'music',
    'quizzes',
    'email',
    'users',
    'terms',
    'verifications_requests',
    'themes',
    'announcement',
    'breaking_news',
    'ads',
    'custom_fields',
    'create_field',
    'edit_field',
    'banned_ip',
    'post_reports',
    'back_up',
    'custom_code',
    's3',
    'apps_api',
);
$hr_keys     = array(
    'email',
    'quizzes',
    'verifications_requests',
    'users',
    'breaking_news',
    'custom_fields',
    'banned_ip',
    'post_reports',
    'back_up',
    's3',
    'apps_api',
);
$pages_urls_ = array(
    'dashboard' => array(
        'url' => 'admincp/dashboard',
        'name' => $lang['dashbaord']
    ),
    'general' => array(
        'url' => 'admincp/general',
        'name' => $lang['general_settings']
    ),
    'site' => array(
        'url' => 'admincp/site',
        'name' => $lang['site_settings']
    ),
    'design' => array(
        'url' => 'admincp/design',
        'name' => $lang['design']
    ),
    'themes' => array(
        'url' => 'admincp/themes',
        'name' => $lang['themes']
    ),
    'social' => array(
        'url' => 'admincp/social',
        'name' => $lang['social_login']
    ),
    'email' => array(
        'url' => 'admincp/email',
        'name' => $lang['email_settings']
    ),
    'users' => array(
        'url' => 'admincp/users',
        'name' => $lang['users']
    ),
    'news' => array(
        'url' => 'admincp/news',
        'name' => $lang['news']
    ),
    'lists' => array(
        'url' => 'admincp/lists',
        'name' => $lang['lists']
    ),
    'videos' => array(
        'url' => 'admincp/videos',
        'name' => $lang['videos']
    ),
    'music' => array(
        'url' => 'admincp/music',
        'name' => $lang['music']
    ),
    'polls' => array(
        'url' => 'admincp/polls',
        'name' => $lang['polls']
    ),
    'quizzes' => array(
        'url' => 'admincp/quizzes',
        'name' => 'Quizzes'
    ),
    'verifications_requests' => array(
        'url' => 'admincp/verifications_requests',
        'name' => $lang['verification']
    ),
    'breaking_news' => array(
        'url' => 'admincp/breaking_news',
        'name' => $lang['br_news']
    ),
    'announcement' => array(
        'url' => 'admincp/announcement',
        'name' => $lang['announcement']
    ),
    'custom_fields' => array(
        'url' => 'admincp/custom_fields',
        'name' => 'Custom Fields'
    ),
    'custom_code' => array(
        'url' => 'admincp/custom_code',
        'name' => 'Custom Css & Js'
    ),
    'banned_ip' => array(
        'url' => 'admincp/banned_ip',
        'name' => 'Ban User'
    ),
    'post_reports' => array(
        'url' => 'admincp/post_reports',
        'name' => 'Reports'
    ),
    'ads' => array(
        'url' => 'admincp/ads',
        'name' => $lang['advertisement']
    ),
    's3' => array(
        'url' => 'admincp/s3',
        'name' => 'Amazon S3'
    ),
    'apps_api' => array(
        'url' => 'admincp/apps_api',
        'name' => 'API Settings'
    ),
    'terms' => array(
        'url' => 'admincp/terms',
        'name' => $lang['terms_pages']
    ),
    'terms' => array(
        'url' => 'admincp/back_up',
        'name' => 'Backups'
    ),
    
    
);
if (!empty($_GET['page'])) {
    if (in_array($_GET['page'], $pages_array)) {
        $page = $_GET['page'];
    }
}
$list_menu = '';
foreach ($pages_urls_ as $key => $page_) {
    if (in_array($key, $pages_array)) {
        $active = ($page == $key) ? 'active' : '';
        $list_menu .= '<li class="list-group-item ' . $active . '"><a href="{{LINK ' . $page_['url'] . '}}">' . $page_['name'] . '</a></li>';
        if (in_array($key, $hr_keys)) {
            $list_menu .= '<hr>';
        }
    }
}
if ($page == 'news') {
   $fl['all_news'] = array();
}
$final_array = array(
    'ADMINCP_PAGE' => FL_LoadPage("admincp/{$page}/$page_src"),
    'LIST_MENU' => $list_menu,
);

if ($page == 'news') {
    $fetch_latest_news_data_array = array(
        'table' => T_NEWS,
        'column' => 'id',
        'limit' => 500000,
        'final_data' => array(
            array(
                'function_name' => 'FL_GetNews',
                'column' => 'id',
                'name' => 'news'
            )
        )
    );

    $latest_news  = FL_FetchDataFromDB($fetch_latest_news_data_array); 
    $latest_news_html = '';
    foreach ($latest_news as $key => $fl['news']) {
        $latest_news_html .=  FL_LoadPage("admincp/news/list", array(
            'POST_ID' => $fl['news']['id'],
            'POST_LINK' => $fl['news']['news']['url'],
            'POST_TITLE' => $fl['news']['news']['title'],
            'POST_TITLE_CROPPED' => mb_substr($fl['news']['news']['title'], 0, 20, "UTF-8") . '...',
            'POST_CATEGORY' => (!empty($fl['news_categories'][$fl['news']['news']['category']])) ? $fl['news_categories'][$fl['news']['news']['category']] : 0,
            'POST_AUTHOR' => $fl['news']['news']['publisher']['name'],
            'POST_AUTHOR_URL' => $fl['news']['news']['publisher']['url'],
            'POST_STATUS' => ($fl['news']['news']['active'] == 0) ? $lang['pending'] : $lang['active'],
            'POST_ACTIVE' => $fl['news']['news']['active'],
            'POST_FEATURED_TEXT' => ($fl['news']['news']['featured'] == 1) ? $lang['yes'] : $lang['no'],
            'POST_FEATURED' => $fl['news']['news']['featured'],
        ));
    }
    $final_array['NEWS_DATA'] = $latest_news_html;
}
if ($page == 'lists') {
    $fetch_latest_news_data_array = array(
        'table' => T_LISTS,
        'column' => 'id',
        'limit' => 500000,
        'final_data' => array(
            array(
                'function_name' => 'FL_GetLists',
                'column' => 'id',
                'name' => 'news'
            )
        )
    );

    $latest_news  = FL_FetchDataFromDB($fetch_latest_news_data_array); 
    $latest_news_html = '';
    foreach ($latest_news as $key => $fl['news']) {
        $latest_news_html .=  FL_LoadPage("admincp/lists/list", array(
            'POST_ID' => $fl['news']['id'],
            'POST_LINK' => $fl['news']['news']['url'],
            'POST_TITLE' => $fl['news']['news']['title'],
            'POST_TITLE_CROPPED' => mb_substr($fl['news']['news']['title'], 0, 20, "UTF-8") . '...',
            'POST_CATEGORY' => (!empty($fl['list_categories'][$fl['news']['news']['category']])) ? $fl['list_categories'][$fl['news']['news']['category']] : 0,
            'POST_AUTHOR' => $fl['news']['news']['publisher']['name'],
            'POST_AUTHOR_URL' => $fl['news']['news']['publisher']['url'],
            'POST_STATUS' => ($fl['news']['news']['active'] == 0) ? $lang['pending'] : $lang['active'],
            'POST_ACTIVE' => $fl['news']['news']['active'],
            'POST_FEATURED_TEXT' => ($fl['news']['news']['featured'] == 1) ? $lang['yes'] : $lang['no'],
            'POST_FEATURED' => $fl['news']['news']['featured'],
        ));
    }
    $final_array['LISTS_DATA'] = $latest_news_html;
}

if ($page == 'videos') {
    $fetch_latest_news_data_array = array(
        'table' => T_VIDEOS,
        'column' => 'id',
        'limit' => 500000,
        'final_data' => array(
            array(
                'function_name' => 'FL_GetVideos',
                'column' => 'id',
                'name' => 'news'
            )
        )
    );

    $latest_news  = FL_FetchDataFromDB($fetch_latest_news_data_array); 
    $latest_news_html = '';
    foreach ($latest_news as $key => $fl['news']) {
        $latest_news_html .=  FL_LoadPage("admincp/videos/list", array(
            'POST_ID' => $fl['news']['id'],
            'POST_LINK' => $fl['news']['news']['url'],
            'POST_TITLE' => $fl['news']['news']['title'],
            'POST_TITLE_CROPPED' => mb_substr($fl['news']['news']['title'], 0, 20, "UTF-8") . '...',
            'POST_CATEGORY' => (!empty($fl['video_categories'][$fl['news']['news']['category']])) ? $fl['video_categories'][$fl['news']['news']['category']] : 0,
            'POST_AUTHOR' => $fl['news']['news']['publisher']['name'],
            'POST_AUTHOR_URL' => $fl['news']['news']['publisher']['url'],
            'POST_STATUS' => ($fl['news']['news']['active'] == 0) ? $lang['pending'] : $lang['active'],
            'POST_ACTIVE' => $fl['news']['news']['active'],
            'POST_FEATURED_TEXT' => ($fl['news']['news']['featured'] == 1) ? $lang['yes'] : $lang['no'],
            'POST_FEATURED' => $fl['news']['news']['featured'],
        ));
    }
    $final_array['VIDEOS_DATA'] = $latest_news_html;
}


if ($page == 'music') {
    $fetch_latest_news_data_array = array(
        'table' => T_MUSIC,
        'column' => 'id',
        'limit' => 500000,
        'final_data' => array(
            array(
                'function_name' => 'FL_GetMusic',
                'column' => 'id',
                'name' => 'news'
            )
        )
    );

    $latest_news  = FL_FetchDataFromDB($fetch_latest_news_data_array); 
    $latest_news_html = '';
    foreach ($latest_news as $key => $fl['news']) {
        $latest_news_html .=  FL_LoadPage("admincp/music/list", array(
            'POST_ID' => $fl['news']['id'],
            'POST_LINK' => $fl['news']['news']['url'],
            'POST_TITLE' => $fl['news']['news']['title'],
            'POST_TITLE_CROPPED' => mb_substr($fl['news']['news']['title'], 0, 20, "UTF-8") . '...',
            'POST_CATEGORY' => (!empty($fl['music_categories'][$fl['news']['news']['category']])) ? $fl['music_categories'][$fl['news']['news']['category']] : 0,
            'POST_AUTHOR' => $fl['news']['news']['publisher']['name'],
            'POST_AUTHOR_URL' => $fl['news']['news']['publisher']['url'],
            'POST_STATUS' => ($fl['news']['news']['active'] == 0) ? $lang['pending'] : $lang['active'],
            'POST_ACTIVE' => $fl['news']['news']['active'],
            'POST_FEATURED_TEXT' => ($fl['news']['news']['featured'] == 1) ? $lang['yes'] : $lang['no'],
            'POST_FEATURED' => $fl['news']['news']['featured'],
        ));
    }
    $final_array['MUSIC_DATA'] = $latest_news_html;
}

if ($page == 'polls') {
    $fetch_latest_news_data_array = array(
        'table' => T_POLLS_PAGES,
        'column' => 'id',
        'limit' => 500000,
        'final_data' => array(
            array(
                'function_name' => 'FL_GetPolls',
                'column' => 'id',
                'name' => 'news'
            )
        )
    );

    $latest_news  = FL_FetchDataFromDB($fetch_latest_news_data_array); 
    $latest_news_html = '';
    foreach ($latest_news as $key => $fl['news']) {
        $latest_news_html .=  FL_LoadPage("admincp/polls/list", array(
            'POST_ID' => $fl['news']['id'],
            'POST_LINK' => $fl['news']['news']['url'],
            'POST_TITLE' => $fl['news']['news']['title'],
            'POST_TITLE_CROPPED' => mb_substr($fl['news']['news']['title'], 0, 20, "UTF-8") . '...',
            'POST_CATEGORY' => (!empty($fl['poll_categories'][$fl['news']['news']['category']])) ? $fl['poll_categories'][$fl['news']['news']['category']] : 0,
            'POST_AUTHOR' => $fl['news']['news']['publisher']['name'],
            'POST_AUTHOR_URL' => $fl['news']['news']['publisher']['url'],
            'POST_STATUS' => ($fl['news']['news']['active'] == 0) ? $lang['pending'] : $lang['active'],
            'POST_ACTIVE' => $fl['news']['news']['active'],
            'POST_FEATURED_TEXT' => ($fl['news']['news']['featured'] == 1) ? $lang['yes'] : $lang['no'],
            'POST_FEATURED' => $fl['news']['news']['featured'],
        ));
    }
    $final_array['POLLS_DATA'] = $latest_news_html;
}

if ($page == 'quizzes') {
    $fetch_latest_news_data_array = array(
        'table' => T_QUIZZES,
        'column' => 'id',
        'limit' => 500000,
        'final_data' => array(
            array(
                'function_name' => 'FL_GetQuizzes',
                'column' => 'id',
                'name' => 'news'
            )
        )
    );

    $latest_news  = FL_FetchDataFromDB($fetch_latest_news_data_array); 
    $latest_news_html = '';
    foreach ($latest_news as $key => $fl['news']) {
        $latest_news_html .=  FL_LoadPage("admincp/quizzes/list", array(
            'POST_ID' => $fl['news']['id'],
            'POST_LINK' => $fl['news']['news']['url'],
            'POST_TITLE' => $fl['news']['news']['title'],
            'POST_TITLE_CROPPED' => mb_substr($fl['news']['news']['title'], 0, 20, "UTF-8") . '...',
            'POST_CATEGORY' => (!empty($fl['poll_categories'][$fl['news']['news']['category']])) ? $fl['poll_categories'][$fl['news']['news']['category']] : 0,
            'POST_AUTHOR' => $fl['news']['news']['publisher']['name'],
            'POST_AUTHOR_URL' => $fl['news']['news']['publisher']['url'],
            'POST_STATUS' => ($fl['news']['news']['active'] == 0) ? $lang['pending'] : $lang['active'],
            'POST_ACTIVE' => $fl['news']['news']['active'],
            'POST_FEATURED_TEXT' => ($fl['news']['news']['featured'] == 1) ? $lang['yes'] : $lang['no'],
            'POST_FEATURED' => $fl['news']['news']['featured'],
        ));
    }
    $final_array['QUIZ_DATA'] = $latest_news_html;
}

if ($page == 'users') {
    $fetch_latest_users_data_array = array(
        'table' => T_USERS,
        'column' => 'user_id',
        'limit' => 500000,
        'order' => array(
            'type' => 'rand',
            'column' => 'id'
        ),
        'final_data' => array(
            array(
                'function_name' => 'FL_UserData',
                'column' => 'user_id',
                'name' => 'users'
            )
        )
    );

    $latest_users  = FL_FetchDataFromDB($fetch_latest_users_data_array); 
    $latest_news_html = '';
    foreach ($latest_users as $key => $fl['users']) {
        $latest_news_html .=  FL_LoadPage("admincp/users/list", array(
           'USER_DATA' => $fl['users']['users'],
           'USER_STATUS' => ($fl['users']['users']['active'] == 0) ? $lang['pending'] : $lang['active'],
        ));
    }
    $final_array['USERS_DATA'] = $latest_news_html;
}

if ($page == 'verifications_requests') {
    $fetch_verif_requests_array = array(
        'table' => T_VER_REQUESTS,
        'column' => '*',
        'limit' => 500000,
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        ),
    );

    $verification_users_req      = FL_FetchDataFromDB($fetch_verif_requests_array); 
    $verification_users_req_html = '';
    if (count($verification_users_req) > 0) {
        foreach ($verification_users_req as $fl['request']) {
            $verification_users_req_html .=  FL_LoadPage("admincp/verifications_requests/list", array(
                'REQUEST_ID'       => $fl['request']['id'],
                'REQUEST_USERNAME' => $fl['request']['name'],
                'REQUEST_TYPE'     => $fl['request']['type'],
                'REQUEST_AJAX'     => $fl['config']['site_url'] . '/ajax_requests.php?f=verification&s=load&id='.$fl['request']['id'],
            ));
        }
        $final_array['REQUESTS_DATA'] = $verification_users_req_html;
    }
    else{
        $final_array['REQUESTS_DATA'] = FL_LoadPage("admincp/verifications_requests/no-requests");
    }
    
    
}

if ($page == 'dashboard') {
    $count_users_array = array(
        'table' => T_USERS,
        'column' => 'user_id',
        'count' => true
    );
    $users = FL_FetchDataFromDB($count_users_array);
    $final_array['COUNT_USERS'] = $users[0]['count'];

    $count_news_array = array(
        'table' => T_NEWS,
        'column' => 'id',
        'count' => true
    );
    $news = FL_FetchDataFromDB($count_news_array);
    $final_array['COUNT_NEWS'] = $news[0]['count'];

    $count_lists_array = array(
        'table' => T_LISTS,
        'column' => 'id',
        'count' => true
    );
    $lists = FL_FetchDataFromDB($count_lists_array);
    $final_array['COUNT_LISTS'] = $lists[0]['count'];

    $count_videos_array = array(
        'table' => T_VIDEOS,
        'column' => 'id',
        'count' => true
    );
    $videos = FL_FetchDataFromDB($count_videos_array);
    $final_array['COUNT_VIDEOS'] = $videos[0]['count'];

    $count_music_array = array(
        'table' => T_MUSIC,
        'column' => 'id',
        'count' => true
    );
    $music = FL_FetchDataFromDB($count_music_array);
    $final_array['COUNT_MUSIC'] = $music[0]['count'];

    $count_polls_array = array(
        'table' => T_POLLS_PAGES,
        'column' => 'id',
        'count' => true
    );
    $polls = FL_FetchDataFromDB($count_polls_array);
    $final_array['COUNT_POLLS'] = $polls[0]['count'];



    $drafts = 0;

    $count_news_array = array(
        'table' => T_NEWS,
        'column' => 'id',
        'count' => true,
        'where' => array(
            array(
                'column' => 'active',
                'value' => '0',
                'mark' => '='
            ),
            array(
                'column' => 'viewable',
                'value' => '0',
                'mark' => '='
            ),
        )
    );
    $news = FL_FetchDataFromDB($count_news_array);
    $drafts += $news[0]['count'];

    $count_lists_array = array(
        'table' => T_LISTS,
        'column' => 'id',
        'count' => true,
        'where' => array(
            array(
                'column' => 'active',
                'value' => '0',
                'mark' => '='
            ),
            array(
                'column' => 'viewable',
                'value' => '0',
                'mark' => '='
            ),
        )
    );
    $lists = FL_FetchDataFromDB($count_lists_array);
    $drafts += $lists[0]['count'];

    $count_videos_array = array(
        'table' => T_VIDEOS,
        'column' => 'id',
        'count' => true,
        'where' => array(
            array(
                'column' => 'active',
                'value' => '0',
                'mark' => '='
            ),
            array(
                'column' => 'viewable',
                'value' => '0',
                'mark' => '='
            ),
        )
    );
    $videos = FL_FetchDataFromDB($count_videos_array);
    $drafts += $videos[0]['count'];

    $count_music_array = array(
        'table' => T_MUSIC,
        'column' => 'id',
        'count' => true,
        'where' => array(
            array(
                'column' => 'active',
                'value' => '0',
                'mark' => '='
            ),
            array(
                'column' => 'viewable',
                'value' => '0',
                'mark' => '='
            ),
        )
    );
    $music = FL_FetchDataFromDB($count_music_array);
    $drafts += $music[0]['count'];

    $count_polls_array = array(
        'table' => T_POLLS_PAGES,
        'column' => 'id',
        'count' => true,
        'where' => array(
            array(
                'column' => 'active',
                'value' => '0',
                'mark' => '='
            ),
            array(
                'column' => 'viewable',
                'value' => '0',
                'mark' => '='
            ),
        )
    );
    $polls = FL_FetchDataFromDB($count_polls_array);
    $drafts += $polls[0]['count'];

    $final_array['COUNT_DRAFTS'] = $drafts;

    $count_polls_array = array(
        'table' => T_POLLS_PAGES,
        'column' => 'id',
        'count' => true
    );
    $polls = FL_FetchDataFromDB($count_polls_array);
    $final_array['COUNT_POLLS'] = $polls[0]['count'];

    $online_users = 0;
    $count_online_array = array(
        'table' => T_USERS,
        'column' => 'user_id',
        'count' => true,
        'where' => array(
            array(
                'column' => 'active',
                'value' => '1',
                'mark' => '='
            ),
            array(
                'column' => 'last_active',
                'value' => time() - 60,
                'mark' => '>'
            ),
        )
    );
    $online_users = FL_FetchDataFromDB($count_online_array);
    $final_array['COUNT_ONLINE'] = $online_users[0]['count'];
}


if ($page == 'breaking_news') {
    $fetch_brnews_data_array = array(
        'table' => T_BR_NEWS,
        'column' => 'id',
        'limit' => 500000,
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        ),
        'final_data' => array(
            array(
                'function_name' => 'FL_GetBrNews',
                'column' => 'id'
            )
        )
    );

    $breaking_news_list          = FL_FetchDataFromDB($fetch_brnews_data_array); 
    $breaking_news_list_html     = '';
    if (count($breaking_news_list) > 0) {
        foreach ($breaking_news_list as $fl['brnews']) {
            $breaking_news_list_html .=  FL_LoadPage("admincp/breaking_news/list", array(
                'BRNEWS_ID'       => $fl['brnews']['id'],
                'BRNEWS_EXPIRE'   => $fl['brnews']['expire'],
                'BRNEWS_URL'      => $fl['brnews']['url'],
                'BRNEWS_STATUS'   => $fl['brnews']['active'],
            ));
        }
        $final_array['BR_NEWS_DATA'] = $breaking_news_list_html;
    }
    else{
        $final_array['BR_NEWS_DATA'] = FL_LoadPage("admincp/breaking_news/no-news");
    }
    
    
}


if ($page == 'announcement') {
    $fetch_active_ann_data_array = array(
        'table' => T_ANNOUNCEMENT,
        'column' => '*',
        'limit' => 500000,
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        ),
        'where' => array(
            array(
                'column' => 'active',
                'value' => '1',
                'mark' => '='
            )
        )
    );

    $active_announcement_list      = FL_FetchDataFromDB($fetch_active_ann_data_array); 
    $active_announcement_list_html = '';
    $table                         = T_ANNOUNCEMENT_VIEWS;
    foreach ($active_announcement_list as $fl['announcement']) {
        
        $fl['announcement']['time']  = FL_Time_Elapsed_String($fl['announcement']['time']);
        $fl['announcement']['views'] = FL_CountData(array( 0 => array(
            'column' => '`announcement_id`',
            'value' => $fl['announcement']['id'],
            'mark' => '='
        )),$table);

        $active_announcement_list_html .=  FL_LoadPage("admincp/announcement/active",array(
            'ANN_ID'    => $fl['announcement']['id'],
            'ANN_VIEWS' => $fl['announcement']['views'],
            'ANN_TEXT'  => FL_Decode($fl['announcement']['text']),
            'ANN_TIME'  => $fl['announcement']['time'],
        ));
    }

    $final_array['ANNOUNCEMENT_ACTIVE']   = $active_announcement_list_html;

    $fetch_inactive_ann_data_array = array(
        'table' => T_ANNOUNCEMENT,
        'column' => '*',
        'limit' => 500000,
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        ),
        'where' => array(
            array(
                'column' => 'active',
                'value' => '0',
                'mark' => '='
            )
        )
    );

    $inactive_announcement_list      = FL_FetchDataFromDB($fetch_inactive_ann_data_array); 
    $inactive_announcement_list_html = '';
    foreach ($inactive_announcement_list as $fl['announcement']) {
        
        $fl['announcement']['time']  = FL_Time_Elapsed_String($fl['announcement']['time']);
        $fl['announcement']['views'] = FL_CountData(array( 0 => array(
            'column' => '`announcement_id`',
            'value' => $fl['announcement']['id'],
            'mark' => '='
        )),$table);
        $inactive_announcement_list_html .=  FL_LoadPage("admincp/announcement/inactive",array(
            'ANN_ID'    => $fl['announcement']['id'],
            'ANN_VIEWS' => $fl['announcement']['views'],
            'ANN_TEXT'  => FL_Decode($fl['announcement']['text']),
            'ANN_TIME'  => $fl['announcement']['time'],
        ));
    }

    $final_array['ANNOUNCEMENT_INACTIVE'] = $inactive_announcement_list_html;
  
}

if ($page == 'custom_fields') {
    $fl_profile_fields_list    = '';
    $fetch_prfields_data_array = array(
        'table' => T_PR_FIELDS,
        'column' => '*',
        'limit' => 500000,
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        ),
        'where' => array(
            array(
                'column' => 'active',
                'value' => '1',
                'mark' => '='
            )
        )
    );
    
    $fl_profile_fields      = FL_FetchDataFromDB($fetch_prfields_data_array); 

    foreach ($fl_profile_fields as $fl['filed_data']) {
        if ($fl['filed_data']['select_type'] == 'yes') {
          $type  = 'Select box';
        }

        else if ($fl['filed_data']['type'] == 'textarea') {
          $type  = 'Text area';
        }

        else if ($fl['filed_data']['type'] == 'textbox') {
          $type  = 'Text box';
        } 

        else{
            $type  = 'Unknown';
        }  
          
        $fl_profile_fields_list .=  FL_LoadPage("admincp/custom_fields/list",array(
            'FIELD_ID'     => $fl['filed_data']['id'],
            'FIELD_NAME'   => $fl['filed_data']['name'],
            'FIELD_TYPE'   => $type,
            'FIELD_LEN'    => $fl['filed_data']['length'],
            'FIELD_PLACE'  => $fl['filed_data']['placement'],
            'EDIT'         => FL_Link('admincp/edit_field?id='.$fl['filed_data']['id']),
        ));
    }

    $final_array['FL_FILEDS_DATA'] = $fl_profile_fields_list;
  
}

if ($page == 'banned_ip') {
    $fl_banned_ip_list          = '';
    $fetch_banned_ip_data_array = array(
        'table' => T_BANNED_IPS,
        'column' => '*',
        'limit' => 500000,
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        )
    );
    
    $fl['banned_ips']       = FL_FetchDataFromDB($fetch_banned_ip_data_array); 
    if (count($fl['banned_ips']) > 0) {
        foreach ($fl['banned_ips'] as $fl['banned_ip']) {     
            $fl_banned_ip_list .=  FL_LoadPage("admincp/banned_ip/list",array(
                'BANNEDIP_ID'     => $fl['banned_ip']['id'],
                'BANNEDIP_TIME'   => FL_Time_Elapsed_String($fl['banned_ip']['time']),
                'BANNEDIP_ADDR'   => $fl['banned_ip']['ip_address'],
            ));
        }
        $final_array['FL_BANNEDIP_DATA'] = $fl_banned_ip_list;
    }
    else{
        $final_array['FL_BANNEDIP_DATA'] = FL_LoadPage("admincp/banned_ip/no-bannedip");
    }

}

if ($page == 'post_reports') {
    $fl_post_reports_list       = '';
    $fetch_post_reports_data_array = array(
        'table' => T_REPORTS,
        'column' => '*',
        'limit' => 500000,
        'order' => array(
            'type' => 'DESC',
            'column' => 'id'
        )
    );
    
    $fl['post_reports']            = FL_FetchDataFromDB($fetch_post_reports_data_array); 
    if (count($fl['post_reports']) > 0) {
        foreach ($fl['post_reports'] as $fl['report']) {
            $reporter              = FL_UserData($fl['report']['user_id']);
            if (!empty($reporter)) {
                $fl_post_reports_list .=  FL_LoadPage("admincp/post_reports/list",array(
                    'REPORT_ID'       => $fl['report']['id'],
                    'REPORT_TIME'     => FL_Time_Elapsed_String($fl['report']['time']),
                    'REPORT_USER'     => $reporter['url'],
                    'REPORT_USERNAME' => $reporter['name'],
                    'REPORT_POST'     => FL_Link($fl['report']['type'] . "/" . $fl['report']['post_id']),
                ));
            }
            
        }

        $final_array['FL_REPORTS_DATA'] = $fl_post_reports_list;
    }
    else{
        $final_array['FL_REPORTS_DATA'] = FL_LoadPage("admincp/post_reports/no-reports");
    }
}

if ($page == 'custom_code') {
    $code                  = FL_CustomCode('g');
    $error                 = "/*\n\t{{ERROR}}\n*/";
    $error                 = str_replace("{{ERROR}}", $lang['error_found_while_loading'], $error);

    $final_array['HEADER'] = (
        (isset($code[0]) && trim(strlen($code[0])) > 0) ? $code[0] : ((isset($code[0])) ? $fl['config']['header_ccx'] : $error)
    );

    $final_array['FOOTER'] = (
        (isset($code[1]) && trim(strlen($code[1])) > 0) ? $code[1] : ((isset($code[1])) ? $fl['config']['footer_ccx'] : $error)
    );

    $final_array['STYLE']  = (
        (isset($code[2]) && trim(strlen($code[2])) > 0) ? $code[2] : ((isset($code[2])) ? $fl['config']['styles_ccx'] : $error)
    );

}


if ($page == 's3') {

    $final_array['S3_1']   = ($fl['config']['amazone_s3'] == 1)   ? ' checked' : '';
    $final_array['S3_0']   = ($fl['config']['amazone_s3'] == 0)   ? ' checked' : '';
    $final_array['ALERT']  = 'Amazon S3 require PHP 5.5 or higher to run, your php version is: ' . PHP_VERSION;
    
}



$fl['title']       = $fl['config']['name'] . ' | Admin Panel';
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'admincp';
$fl['content']     = FL_LoadPage('admincp/content', $final_array);
