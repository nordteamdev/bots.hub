<?php 	
$fetch_latest_news_data_array = array(
    'table' => T_MUSIC,
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
            'function_name' => 'FL_GetMusic',
            'column' => 'id',
            'name' => 'music'
        )
    )
);
$music   = $fl['music'] = FL_FetchDataFromDB($fetch_latest_news_data_array);
?>