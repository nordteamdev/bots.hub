<?php 	
$trending = array();

$fetch_latest_lists_data_array = array(
    'table' => T_LISTS,
    'column' => 'id',
    'limit' => 2,
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
$trending[] = FL_FetchDataFromDB($fetch_latest_lists_data_array);

///----------

$fetch_latest_news_data_array = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 2,
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
$trending[] = FL_FetchDataFromDB($fetch_latest_news_data_array);


///----------
$fetch_latest_polls_data_array = array(
    'table' => T_POLLS_PAGES,
    'column' => 'id',
    'limit' => 2,
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
$trending[] = FL_FetchDataFromDB($fetch_latest_polls_data_array);

$fetch_latest_quizzes_data_array = array(
    'table' => T_QUIZZES,
    'column' => 'id',
    'limit' => 2,
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

$trending[] = FL_FetchDataFromDB($fetch_latest_quizzes_data_array);
$array_fianl = array();
foreach ($trending as $key => $trending_) {
	foreach ($trending_ as $key => $trending__) {
		$array_fianl[] = $trending__;
	}
}
$trending_fianl = $fl['trending'] = $array_fianl;
?>