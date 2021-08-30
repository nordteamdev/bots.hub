<?php 
$fetch_top_polls_data_array    = array(
    'table' => T_POLLS_PAGES,
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
            'function_name' => 'FL_GetPolls',
            'column' => 'id',
            'name' => 'poll'
        )
    )
);
$top_polls    = $fl['top_polls'] = FL_FetchDataFromDB($fetch_top_polls_data_array);
$top_polls_html               = '';
foreach ($fl['top_polls'] as $key => $fl['top_polls_data']) {
    $top_polls_html .= FL_Loadpage('home/lists/top-polls', array(
        'TOP_POLL_URL' => $fl['top_polls_data']['poll']['url'],
        'TOP_POLL_IMAGE' => FL_GetMedia($fl['top_polls_data']['poll']['image']),
        'TOP_POLL_TITLE' => $fl['top_polls_data']['poll']['title'],
        'TOP_POLL_DESC' => $fl['top_polls_data']['poll']['description'],
        'TOP_POLL_POSTED' => $fl['top_polls_data']['poll']['posted'],
        'TOP_POLL_PUBLISHER__NAME' => $fl['top_polls_data']['poll']['publisher']['name']
    ));
}


?>