<?php 	
$fetch_latest_news_data_array = array(
    'table' => T_POLLS_PAGES,
    'column' => 'id',
    'limit' => 5,
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
            'function_name' => 'FL_GetPolls',
            'column' => 'id',
            'name' => 'poll'
        )
    )
);
$polls   = $fl['polls'] = FL_FetchDataFromDB($fetch_latest_news_data_array);
?>