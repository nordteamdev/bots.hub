<?php 
$fetch_top_news_data_array    = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 1,
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
$top_news  = $fl['top_news'] = FL_FetchDataFromDB($fetch_top_news_data_array);


$top_news_html  = '';
foreach ($fl['top_news'] as $key => $fl['top_news_data']) {
    $top_news_html .= FL_Loadpage('home/lists/top-news', array(
        'TOP_NEWS_URL' => $fl['top_news_data']['news']['url'],
        'TOP_NEWS_IMAGE' => FL_GetMedia($fl['top_news_data']['news']['image']),
        'TOP_NEWS_TITLE' => $fl['top_news_data']['news']['title'],
        'TOP_NEWS_DESC' => $fl['top_news_data']['news']['description'],
        'TOP_NEWS_POSTED' => $fl['top_news_data']['news']['posted'],
        'TOP_NEWS_PUBLISHER__NAME' => $fl['top_news_data']['news']['publisher']['name']
    ));
}

$fetch_top_news_data_array    = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 5,
    'order' => array(
        'type' => 'desc',
        'column' => 'views'
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
$top_news_multi                  = $fl['top_news_multi'] = FL_FetchDataFromDB($fetch_top_news_data_array);
?>