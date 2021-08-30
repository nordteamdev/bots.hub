<?php 

// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2017 phpflame. All rights reserved.
// +------------------------------------------------------------------------+

/* 

   http://www.flame.com/app_api.php? type = latest_news
   GET:
       & page  = < news page should be in this array [('news','poll','video','list','music')] >
       & limit = < default 20>


   ERROR CODES: 
       1. Bad request, no type specified.
       2. Bad request, no page specified.

   JSON REPLY:
       {
        'api_status'     => '200',
        'api_text'       => 'success',
        'api_version'    => 'api_version',
        'page_data'      => [array]
        
       }

    

*/



$json_error_data         = array();
$json_success_data       = array();
$latest_news_pages       = array('news','poll','video','list','music');
if (empty($_GET['type']) || !isset($_GET['type'])) {
    $json_error_data     = array(
        'api_status'     => '400',
        'api_text'       => 'failed',
        'api_version'    => $api_version,
        'errors'         => array(
            'error_id'   => '1',
            'error_text' => 'Bad request, no type specified.'
        )
    );
}
else if (!isset($_GET['page']) || !in_array($_GET['page'], $latest_news_pages)) {
    $json_error_data     = array(
        'api_status'     => '400',
        'api_text'       => 'failed',
        'api_version'    => $api_version,
        'errors'         => array(
            'error_id'   => '2',
            'error_text' => 'Bad request, no page specified.'
        )
    );
}

$type                    = FL_Secure($_GET['type'], 0);
$limit                   = (!empty($_GET['limit']) && is_numeric($_GET['limit'])) ? $_GET['limit'] : 20;


if ($type == 'latest_news') {
    if (!empty($json_error_data)) { 
        header("Content-type: application/json");
        echo json_encode($json_error_data);
        exit();
    }
    
    else {
        $function_name           = '';
        $table  = '';
        $page                    = FL_Secure($_GET['page'], 0);
        switch ($page) {
            case 'news':
                $function_name   = 'FL_GetNews';
                $table  = T_NEWS;
                break;
            case 'list':
                $function_name   = 'FL_GetLists';
                $table  = T_LISTS;
                break;
            case 'poll':
                $function_name   = 'FL_GetPolls';
                $table  = T_POLLS;
                break;
            case 'video':
                $function_name   = 'FL_GetVideos';
                $table  = T_VIDEOS;
                break;
            case 'music':
                $function_name   = 'FL_GetMusic';
                $table  = T_MUSIC;
                break;
        }
        

        $fetch_latest_data_array = array(
            'table'              => $table,
            'column'             => 'id',
            'limit'              => $limit,
            'user_data'          => 'public',
            'order'              => array(
                'type'           => 'desc',
                'column'         => 'id'
            ),
            'where'              => array(
                array(
                    'column'     => 'active',
                    'value'      => '1',
                    'mark'       => '='
                ),
            ),
            'final_data'         => array(
                array(
                 'function_name' => $function_name,
                 'column'        => 'id',
                 'name'          => 'news'
                )
            )
        );
        $news                    = FL_FetchDataFromDB($fetch_latest_data_array);
        $news_data               = array();

        foreach ($news as $value) {
            if (!empty($value['news'])) {
                $publisher_data                                 = array();
                $publisher_data['name']        = $value['news']['publisher']['name'];
                $publisher_data['username']    = $value['news']['publisher']['username'];
                $publisher_data['email']       = $value['news']['publisher']['email'];
                $publisher_data['avatar']      = $value['news']['publisher']['avatar'];
                $publisher_data['gender']      = $value['news']['publisher']['gender'];
                $publisher_data['facebook']    = $value['news']['publisher']['facebook'];
                $publisher_data['twitter']     = $value['news']['publisher']['twitter'];
                $publisher_data['google']      = $value['news']['publisher']['google'];
                $publisher_data['verified']    = $value['news']['publisher']['verified'];
                $value['news']['publisher']    = $publisher_data;
                $news_data[]                   = $value;
            }
        }
        $json_success_data                 = array(
                 'api_status'              => '200',
                 'api_text'                => 'success',
                 'api_version'             => $api_version,
                 $page.'_data'             => $news_data
        );
        header("Content-type: application/json");
        echo json_encode($json_success_data, JSON_PRETTY_PRINT);
        exit();
    }
}


?>