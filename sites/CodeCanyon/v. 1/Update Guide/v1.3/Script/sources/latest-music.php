<?php 
$fl['title']       = $lang['latest_music'] .' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'latest-music';
$fetch_latest_news_data_array = array(
    'table' => T_MUSIC,
    'column' => 'id',
    'limit' => 4,
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
$big_top_news_html = '';
$latest_news  = $fl['latest_news'] = (!empty($_GET['c_id'])) ? array() : FL_FetchDataFromDB($fetch_latest_news_data_array);
$top_news_html = '';
foreach ($latest_news as $key => $fl['top_news_data']) {
	$top_news_html1 = FL_Loadpage('latest/lists/top_4', array(
        'TOP_NEWS_URL' => $fl['top_news_data']['news']['url'],
        'TOP_NEWS_IMAGE' => $fl['top_news_data']['news']['small_image'],
        'TOP_NEWS_TITLE' => $fl['top_news_data']['news']['title'],
        'TOP_NEWS_SHORT_TITLE' => $fl['top_news_data']['news']['short_title'],
        'TOP_NEWS_DESC' => $fl['top_news_data']['news']['description'],
        'TOP_NEWS_POSTED' => $fl['top_news_data']['news']['posted'],
        'TOP_NEWS_PUBLISHER__NAME' => $fl['top_news_data']['news']['publisher']['name']
    ));
	if ($key < 3) {
		$top_news_html  .= $top_news_html1;
	} else {
		$top_news_html2 = FL_Loadpage('latest/lists/top_1', array(
	        'TOP_NEWS_URL' => $fl['top_news_data']['news']['url'],
	        'TOP_NEWS_IMAGE' => $fl['top_news_data']['news']['small_image'],
	        'TOP_NEWS_TITLE' => $fl['top_news_data']['news']['title'],
	        'TOP_NEWS_SHORT_TITLE' => $fl['top_news_data']['news']['short_title'],
	        'TOP_NEWS_DESC' => $fl['top_news_data']['news']['description'],
	        'TOP_NEWS_POSTED' => $fl['top_news_data']['news']['posted'],
	        'TOP_NEWS_PUBLISHER__NAME' => $fl['top_news_data']['news']['publisher']['name']
	    ));
		$big_top_news_html = $top_news_html2;
	}
}

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
    ),
    'final_data' => array(
        array(
            'function_name' => 'FL_GetMusic',
            'column' => 'id',
            'name' => 'news'
        )
    )
);
if (!empty($_GET['c_id'])) {
	if (in_array($_GET['c_id'], array_keys($fl['music_categories']))) {
		$fetch_latest_news_page_data_array['where'][] = array(
            'column' => 'category',
            'value' => $_GET['c_id'],
            'mark' => '='
        );
	}
}
$latest_page_music = $fl['latest_page_music'] = FL_FetchDataFromDB($fetch_latest_news_page_data_array);

$fl['content'] = FL_LoadPage('latest/music', array('TOP_4' => $top_news_html, 'TOP_BIG' => $big_top_news_html));
?>