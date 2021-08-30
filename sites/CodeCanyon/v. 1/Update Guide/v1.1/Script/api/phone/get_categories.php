<?php 
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2017 phpflame. All rights reserved.
// +------------------------------------------------------------------------+

/* 

   /app_api.php?type=get_cats
   GET:
    & page = < news page should be in this array [('news','poll','video','list','music','quiz')] >

   ERROR CODES: 
       1. Bad request, no type specified.
       2. Bad request, no page specified.

   JSON REPLY:
       {
        'api_status'     => '200',
        'api_text'       => 'success',
        'api_version'    => 'api_version',
        'cats'           => [array]
        
       }

    

*/


$json_error_data                 = array();
$json_success_data               = array();
$news_category_pages             = array('news','poll','video','list','music','quiz');
if (empty($_GET['type']) || !isset($_GET['type'])) {
    $json_error_data             = array(
        'api_status'             => '400',
        'api_text'               => 'failed',
        'api_version'            => $api_version,
        'errors'                 => array(
            'error_id'           => '1',
            'error_text'         => 'Bad request, no type specified.'
        )
    );
}
else if (!isset($_GET['page']) || !in_array($_GET['page'], $news_category_pages)) {
    $json_error_data             = array(
        'api_status'             => '400',
        'api_text'               => 'failed',
        'api_version'            => $api_version,
        'errors'                 => array(
            'error_id'           => '2',
            'error_text'         => 'Bad request, no page specified.'
        )
    );
}

$type                            = FL_Secure($_GET['type'], 0);

if ($type == 'get_cats') {
    if (!empty($json_error_data)) { 
        header("Content-type: application/json");
        echo json_encode($json_error_data);
        exit();
    }
    
    else {
        $page                    = FL_Secure($_GET['page'], 0);
        $json_success_data       = array(
                'api_status'     => '200',
                'api_text'       => 'success',
                'api_version'    => $api_version,
                'cats'           => $fl[$page.'_categories']
            );
        header("Content-type: application/json");
        echo json_encode($json_success_data, JSON_PRETTY_PRINT);
        exit();
    }
}
?>