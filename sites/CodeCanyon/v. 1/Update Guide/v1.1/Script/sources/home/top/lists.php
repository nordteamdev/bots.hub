<?php 	
$fetch_top_lists_data_array    = array(
    'table' => T_LISTS,
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
            'function_name' => 'FL_GetLists',
            'column' => 'id',
            'name' => 'list'
        )
    )
);
$top_lists                     = $fl['top_lists'] = FL_FetchDataFromDB($fetch_top_lists_data_array);
$top_lists_html               = '';
foreach ($fl['top_lists'] as $key => $fl['top_lists_data']) {
    $top_lists_html .= FL_Loadpage('home/lists/top-lists', array(
        'TOP_LIST_URL' => $fl['top_lists_data']['list']['url'],
        'TOP_LIST_IMAGE' => FL_GetMedia($fl['top_lists_data']['list']['image']),
        'TOP_LIST_TITLE' => $fl['top_lists_data']['list']['title'],
        'TOP_LIST_SHORT_TITLE' => $fl['top_lists_data']['list']['short_title'],
        'TOP_LIST_DESC' => $fl['top_lists_data']['list']['description'],
        'TOP_LIST_POSTED' => $fl['top_lists_data']['list']['posted'],
        'TOP_LIST_PUBLISHER__NAME' => $fl['top_lists_data']['list']['publisher']['name']
    ));
}
?>