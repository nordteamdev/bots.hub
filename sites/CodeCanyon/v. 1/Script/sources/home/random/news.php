<?php 	
$fetch_random_news_data_array = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 1,
    'order' => array(
        'type' => 'rand'
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
            'function_name' => 'FL_GetNews',
            'column' => 'id',
            'name' => 'news'
        )
    )
);
$random_news                  = $fl['random_news'] = FL_FetchDataFromDB($fetch_random_news_data_array); 
?>