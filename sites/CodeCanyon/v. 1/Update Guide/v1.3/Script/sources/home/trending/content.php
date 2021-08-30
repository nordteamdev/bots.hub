<?php 
$fetch_latest_lists_data_array = array(
    'table' => T_LISTS,
    'column' => 'id',
    'limit' => 3,
    'order' => array(
        'type' => 'desc',
        'column' => 'views'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
        array(
            'column' => 'time',
            'value' => time() - 604800,
            'mark' => '>'
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
$trending_list = $fl['trending_list'] = FL_FetchDataFromDB($fetch_latest_lists_data_array);

///----------

$fetch_latest_news_data_array = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 3,
    'order' => array(
        'type' => 'desc',
        'column' => 'views'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
        array(
            'column' => 'time',
            'value' => time() - 604800,
            'mark' => '<'
        )
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetNews',
            'column' => 'id',
            'name' => 'news'
        )
    )
);
$trending_news = $fl['trending_news'] = FL_FetchDataFromDB($fetch_latest_news_data_array);


///----------
$fetch_latest_polls_data_array = array(
    'table' => T_POLLS_PAGES,
    'column' => 'id',
    'limit' => 3,
    'order' => array(
        'type' => 'desc',
        'column' => 'views'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
        array(
            'column' => 'time',
            'value' => time() - 604800,
            'mark' => '>'
        )
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetPolls',
            'column' => 'id',
            'name' => 'poll'
        )
    )
);
$trending_poll = $fl['trending_poll'] = FL_FetchDataFromDB($fetch_latest_polls_data_array);

$fetch_latest_quizzes_data_array = array(
    'table' => T_QUIZZES,
    'column' => 'id',
    'limit' => 3,
    'order' => array(
        'type' => 'desc',
        'column' => 'views'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
        array(
            'column' => 'time',
            'value' => time() - 604800,
            'mark' => '>'
        )
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetQuizzes',
            'column' => 'id',
            'name' => 'quiz'
        )
    )
);

$trending_quiz = $fl['trending_quiz'] = FL_FetchDataFromDB($fetch_latest_quizzes_data_array);
?>