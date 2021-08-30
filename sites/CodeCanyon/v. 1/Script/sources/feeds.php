<?php
$fl['title']       = $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'rss';
header('Content-type: text/rss+xml');



use Bhaktaraz\RSSGenerator\Item;
use Bhaktaraz\RSSGenerator\Feed;
use Bhaktaraz\RSSGenerator\Channel;

$rss_feed_xml    = "";
$fl_rss_feed     = new Feed();
$fl_rss_channel  = new Channel();


$fl_rss_channel
	->title($fl['title'])
	->description($fl['description'])
	->url($fl['config']['site_url'])
	->appendTo($fl_rss_feed);







$rss_posts        = array( 
    T_LISTS       => 'FL_GetLists',
    T_NEWS        => 'FL_GetNews',
    T_POLLS_PAGES => 'FL_GetPolls',
    T_MUSIC       => 'FL_GetMusic',
    T_VIDEOS      => 'FL_GetVideos',
    T_QUIZZES     => 'FL_GetQuizzes'
);


foreach ($rss_posts as $table => $func) {
    $fl_rss_feed_type = '';
    switch ($table) {
        case T_LISTS:
            $fl_rss_feed_type = 'list';
            break;
        case T_NEWS:
            $fl_rss_feed_type = 'news';
            break;
        case T_POLLS_PAGES:
            $fl_rss_feed_type = 'polls';
            break;
        case T_MUSIC:
            $fl_rss_feed_type = 'music';
            break;
        case T_VIDEOS:
            $fl_rss_feed_type = 'video';
            break;
        case T_QUIZZES:
            $fl_rss_feed_type = 'quiz';
            break;
    }

    $fetch_rss_feed_data_array = array(
        'table' => $table,
        'column' => 'id',
        'limit' => 50,
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
                'function_name' => $func,
                'column' => 'id',
                'name'   => 'feed'
            )
        )
    ); 
    $rss_feed_data   = FL_FetchDataFromDB($fetch_rss_feed_data_array);
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

}
echo $fl_rss_feed;
exit();


