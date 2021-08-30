<?php 
$fetch_top_news_data_array    = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 1,
    'order' => array(
        'type' => 'rand',
        'column' => 'id'
    ),
    'where' => array(
        array(
            'column' => 'active',
            'value' => '1',
            'mark' => '='
        ),
        array(
            'column' => 'featured',
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

$top_news      = $fl['top_news'] = FL_FetchDataFromDB($fetch_top_news_data_array);
$top_news_html = '';

if (empty($top_news)) {
    unset($fetch_top_news_data_array['where'][1]);
    $top_news   = $fl['top_news'] = FL_FetchDataFromDB($fetch_top_news_data_array);
}

foreach ($fl['top_news'] as $key => $fl['top_news_data']) {
    $image_to_use = $fl['top_news_data']['news']['image'];
    if ($fl['top_news_data']['news']['hd'] == 1) {
        $url2_explode = explode('.', $image_to_use);
        $url2 = $url2_explode[0] . '_hd.' . $url2_explode[1];
        $fl['top_news_data']['news']['image'] = $url2;
    }
    $context_data = array(
        'TOP_NEWS_URL' => $fl['top_news_data']['news']['url'],
        'TOP_NEWS_IMAGE' => FL_GetMedia($fl['top_news_data']['news']['image']),
        'TOP_NEWS_TITLE' => $fl['top_news_data']['news']['title'],
        'TOP_NEWS_DESC' => $fl['top_news_data']['news']['description'],
        'TOP_NEWS_POSTED' => $fl['top_news_data']['news']['posted'],
        'TOP_NEWS_PUBLISHER__NAME' => $fl['top_news_data']['news']['publisher']['name'],
        'VERIFIED' => '',
    );

    if ($fl['top_news_data']['news']['publisher']['verified'] == 1) {
        $context_data['VERIFIED'] = '<span class="verified-icon"><i class="fa fa-check-circle"></i></span>';
    }

    $top_news_html .= FL_Loadpage('home/lists/top-news',$context_data);
}

$fetch_top_news_data_array    = array(
    'table' => T_NEWS,
    'column' => 'id',
    'limit' => 6,
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