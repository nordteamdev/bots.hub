<?php 	
$fetch_latest_news_data_array = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 6,
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
            'function_name' => 'FL_GetNews',
            'column' => 'id',
            'name' => 'news'
        )
    )
);
$latest_news                  = $fl['latest_news'] = FL_FetchDataFromDB($fetch_latest_news_data_array);
?>