<?php 	
$fetch_top_music_data_array    = array(
    'table' => T_MUSIC,
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
            'function_name' => 'FL_GetMusic',
            'column' => 'id',
            'name' => 'music'
        )
    )
);

$top_music_html = '';
$top_music      = $fl['top_music'] = FL_FetchDataFromDB($fetch_top_music_data_array);

if (empty($top_music)) {
    unset($fetch_top_music_data_array['where'][1]);
    $top_music   = $fl['top_music'] = FL_FetchDataFromDB($fetch_top_music_data_array);
}

foreach ($fl['top_music'] as $key => $fl['top_music_data']) {
    $image_to_use = $fl['top_music_data']['music']['image'];
    if ($fl['top_music_data']['music']['hd'] == 1) {
        $url2_explode = explode('.', $image_to_use);
        $url2 = $url2_explode[0] . '_hd.' . $url2_explode[1];
        $fl['top_music_data']['music']['image'] = $url2;
    }
    $context_data = array(
        'TOP_MUSIC_URL' => $fl['top_music_data']['music']['url'],
        'TOP_MUSIC_IMAGE' => FL_GetMedia($fl['top_music_data']['music']['image']),
        'TOP_MUSIC_TITLE' => $fl['top_music_data']['music']['title'],
        'TOP_MUSIC_DESC' => $fl['top_music_data']['music']['description'],
        'TOP_MUSIC_POSTED' => $fl['top_music_data']['music']['posted'],
        'TOP_MUSIC_PUBLISHER__NAME' => $fl['top_music_data']['music']['publisher']['name'],
        'VERIFIED' => '',
    );

    if ($fl['top_music_data']['music']['publisher']['verified'] == 1) {
        $context_data['VERIFIED'] = '<span class="verified-icon"><i class="fa fa-check-circle"></i></span>';
    }
    
    $top_music_html .= FL_Loadpage('home/lists/top-music',$context_data);
}
 ?>