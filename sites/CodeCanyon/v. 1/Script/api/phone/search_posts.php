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

   http://www.site.com/app_api.php? type = search_posts
   GET:
    & q    = < search query/keyword>

   ERROR CODES: 
       1. Bad request, no type specified.
       2. Bad request, the search criterion is wrong.

   JSON REPLY:
       {
        'api_status'     => '200',
        'api_text'       => 'success',
        'api_version'    => 'api_version',
        'data'           => [
                                'news' :[],
                                'lists':[],
                                'videos':[],
                                'music':[],
                                'polls':[],
                                'quizzes':[]
                            ]
        
       }

    

*/

$json_error_data         = array();
$json_success_data       = array();

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
else if (!isset($_GET['q']) || !strlen($_GET['q']) >= 1) {
    $json_error_data     = array(
        'api_status'     => '400',
        'api_text'       => 'failed',
        'api_version'    => $api_version,
        'errors'         => array(
            'error_id'   => '2',
            'error_text' => 'Bad request, the search criterion is wrong.'
        )
    );
}


$type                    = FL_Secure($_GET['type'], 0);
$query                   = FL_Secure($_GET['q'], 0);
$limit                   = (!empty($_GET['limit']) && is_numeric($_GET['limit'])) ? $_GET['limit'] : 20;
if ($type == 'search_posts') {
    if (!empty($json_error_data)) { 
        header("Content-type: application/json");
        echo json_encode($json_error_data);
        exit();
    }
    
    else {
        $search_results  = FL_Search(array('keyword' => $query, 'limit' => $limit));
        $data            = array();
	    $data['news']    = array();
	    $data['lists']   = array();
	    $data['videos']  = array();
	    $data['music']   = array();
        $data['polls']   = array();
	    $data['quizzes'] = array();

        

        $user_data               = array('name','username','email','avatar','gender','facebook','google','verified');
        $posts_data              = array();

        foreach ($search_results as $key => $posts) {

            foreach ($posts as $value) {
                $value['publisher'] = array_intersect_key($value['publisher'], array_flip($user_data));
                $data[$key][]       = $value;
            } 
        }

        $json_success_data                 = array(
                 'api_status'              => '200',
                 'api_text'                => 'success',
                 'api_version'             => $api_version,
                 'data'                    => $data 
        );

        header("Content-type: application/json");
        echo json_encode($json_success_data, JSON_PRETTY_PRINT);
        exit();
    }
}


?>