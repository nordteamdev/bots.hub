<?php 	
$fetch_top_music_data_array    = array(
    'table' => T_MUSIC,
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
            'function_name' => 'FL_GetMusic',
            'column' => 'id',
            'name' => 'music'
        )
    )
);
$top_music_html               = '';
$top_music                     = $fl['top_music'] = FL_FetchDataFromDB($fetch_top_music_data_array);
$top_music_html               = '';
foreach ($fl['top_music'] as $key => $fl['top_music_data']) {
    $top_music_html .= FL_Loadpage('home/lists/top-music', array(
        'TOP_MUSIC_URL' => $fl['top_music_data']['music']['url'],
        'TOP_MUSIC_IMAGE' => FL_GetMedia($fl['top_music_data']['music']['image']),
        'TOP_MUSIC_TITLE' => $fl['top_music_data']['music']['title'],
        'TOP_MUSIC_DESC' => $fl['top_music_data']['music']['description'],
        'TOP_MUSIC_POSTED' => $fl['top_music_data']['music']['posted'],
        'TOP_MUSIC_PUBLISHER__NAME' => $fl['top_music_data']['music']['publisher']['name']
    ));
}
 ?>