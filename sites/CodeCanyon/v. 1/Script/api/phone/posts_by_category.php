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

   http://www.site.com/app_api.php? type = posts_by_category
   GET:
       & page  = < news page should be in this array [('news','poll','video','list','music','quiz')] >
       & cat   = < category id >
       & limit = < default 20 >

   ERROR CODES: 
       1. Bad request, no type specified.
       2. Bad request, no page specified.

   JSON REPLY:
       {
        'api_status'     => '200',
        'api_text'       => 'success',
        'api_version'    => 'api_version',
        'page_data'      => [News data array]
        
       }

    

*/

$json_error_data         = array();
$json_success_data       = array();
$latest_news_pages       = array('news','poll','video','list','music','quiz');
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
else if (empty($_GET['cat']) || !is_numeric($_GET['cat']) || $_GET['cat'] < 1) {
    $json_error_data     = array(
        'api_status'     => '400',
        'api_text'       => 'failed',
        'api_version'    => $api_version,
        'errors'         => array(
            'error_id'   => '2',
            'error_text' => 'Bad request, no page category specified.'
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




if ($type == 'posts_by_category') {
    if (!empty($json_error_data)) { 
        header("Content-type: application/json");
        echo json_encode($json_error_data);
        exit();
    }
    
    else {
        $function_name           = '';
        $table                   = T_NEWS;
        $page                    = FL_Secure($_GET['page'], 0);
        $type                    = FL_Secure($_GET['type'], 0);
        $limit                   = (!empty($_GET['limit']) && is_numeric($_GET['limit'])) ? $_GET['limit'] : 20;
        $category                = FL_Secure($_GET['cat']);
        switch ($page) {
            case 'news':
                $function_name   = 'FL_GetNews';
                break;
            case 'list':
                $function_name   = 'FL_GetLists';
                $table           = T_LISTS;
                break;
            case 'poll':
                $function_name   = 'FL_GetPolls';
                $table           = T_POLLS_PAGES;
                break;
            case 'video':
                $function_name   = 'FL_GetVideos';
                $table           = T_VIDEOS;
                break;
            case 'music':
                $function_name   = 'FL_GetMusic';
                $table           = T_MUSIC;
                break;
            case 'quiz':
                $function_name   = 'FL_GetQuizzes';
                $table           = T_QUIZZES;
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
                array(
                    'column' => 'category',
                    'value' => $category,
                    'mark' => '='
                )
            ),
            'final_data'         => array(
                array(
                 'function_name' => $function_name,
                 'column'        => 'id'
                )
            )
        );
        $news                    = FL_FetchDataFromDB($fetch_latest_data_array);
        $user_data               = array('name','username','email','avatar','gender','facebook','google','verified');
        $news_data               = array();

        foreach ($news as $value) {
            $value['publisher'] = array_intersect_key($value['publisher'], array_flip($user_data));
            $news_data[]        = $value;
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