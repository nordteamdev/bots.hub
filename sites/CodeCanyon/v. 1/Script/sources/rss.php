<?php
if (empty($_GET['page'])) {
    header("Location: " . $fl['config']['site_url']);
    exit();
}
 
$fl['title']       = $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = FL_Secure($_GET['page']);
header('Content-type: text/rss+xml');



use Bhaktaraz\RSSGenerator\Item;
use Bhaktaraz\RSSGenerator\Feed;
use Bhaktaraz\RSSGenerator\Channel;

$rss_feed_xml      = "";
$fl_rss_feed       = new Feed();
$fl_rss_channel    = new Channel();


$fl_rss_channel
	->title($fl['title'])
	->description($fl['description'])
	->url($fl['config']['site_url'])
	->appendTo($fl_rss_feed);



$rss_feed_table    = T_NEWS;
$rss_feed_func     = 'FL_GetNews';


switch ($fl['page']) {
    case 'lists':
        $rss_feed_table = T_LISTS;
        $rss_feed_func  = 'FL_GetLists';
        break;
    case 'videos':
        $rss_feed_table = T_VIDEOS;
        $rss_feed_func  = 'FL_GetVideos';
        break;
    case 'music':
        $rss_feed_table = T_MUSIC;
        $rss_feed_func  = 'FL_GetMusic';
        break;
    case 'polls':
        $rss_feed_table = T_POLLS_PAGES;
        $rss_feed_func  = 'FL_GetPolls';
        break;
    case 'quizzes':
        $rss_feed_table = T_QUIZZES;
        $rss_feed_func  = 'FL_GetQuizzes';
        break;
}


$fetch_rss_feed_data_array = array(
    'table'  => $rss_feed_table,
    'column' => 'id',
    'limit'  => 50,
    'order'  => array(
        'type'   => 'desc',
        'column' => 'id'
    ),
    'where'          => array(
        array(
            'column' => 'active',
            'value'  => '1',
            'mark'   => '='
        )
    ),
    'final_data' => array(
        array(
            'function_name'  => $rss_feed_func,
            'column' => 'id',
            'name'   => 'feed'
        )
    )
); 

$rss_feed_data        = FL_FetchDataFromDB($fetch_rss_feed_data_array);
if (is_array($rss_feed_data)) {
    foreach ($rss_feed_data as  $feed_item_data) {
        $fl_rss_item  = new Item();
        $fl_rss_item
         ->title($feed_item_data['feed']['title'])
         ->description($feed_item_data['feed']['description'])
         ->url($feed_item_data['feed']['url'])
         ->pubDate($feed_item_data['feed']['time'])
         ->guid($feed_item_data['feed']['url'],true)
         ->media(array(
            'attr'  => 'url',
            'ns'    => 'thumbnail',
            'link'  => FL_GetMedia($feed_item_data['feed']['image'])))
         ->appendTo($fl_rss_channel);
    }
}

echo $fl_rss_feed;
exit();


