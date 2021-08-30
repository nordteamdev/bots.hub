<?php
$fl['title']       = $lang['search'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'search';

$keyword           = '';
if (!empty($_GET['keyword'])) {
    $keyword = $_GET['keyword'];
} else {
	header("Location:" . FL_Link(''));
    exit();
}

$search_results = FL_Search(array('keyword' => $keyword, 'limit' => 20));

$news_html   = '';
$lists_html  = '';
$videos_html = '';
$music_html  = '';
$polls_html  = '';
$quiz_html   = '';

foreach ($search_results as $key => $search_results_) {
	foreach ($search_results_ as $key_ => $results) {
		if ($key == 'news') {
			$news_html .= FL_Loadpage('search/lists/news', array(
				'NEWS_ID' => $results['id'],
		        'NEWS_URL' => $results['url'],
		        'NEWS_ENCODED_URL' => urlencode($results['url']),
		        'NEWS_IMAGE' => FL_GetMedia($results['image']),
		        'NEWS_TITLE' => $results['title'],
		        'NEWS_DESC' => mb_substr($results['description'], 0, 100, "UTF-8") . '..',
		        'NEWS_POSTED' => $results['posted'],
		        'NEWS_PUBLISHER__NAME' => $results['publisher']['name'],
		        'NEWS_PUBLISHER__URL' => $results['publisher']['url']
		    ));
		}
		if ($key == 'lists') {
			$lists_html .= FL_Loadpage('search/lists/news', array(
				'NEWS_ID' => $results['id'],
		        'NEWS_URL' => $results['url'],
		        'NEWS_ENCODED_URL' => urlencode($results['url']),
		        'NEWS_IMAGE' => FL_GetMedia($results['image']),
		        'NEWS_TITLE' => $results['title'],
		        'NEWS_DESC' => mb_substr($results['description'], 0, 100, "UTF-8") . '..',
		        'NEWS_POSTED' => $results['posted'],
		        'NEWS_PUBLISHER__NAME' => $results['publisher']['name'],
		        'NEWS_PUBLISHER__URL' => $results['publisher']['url']
		    ));
		}
		if ($key == 'videos') {
			$videos_html .= FL_Loadpage('search/lists/news', array(
				'NEWS_ID' => $results['id'],
		        'NEWS_URL' => $results['url'],
		        'NEWS_ENCODED_URL' => urlencode($results['url']),
		        'NEWS_IMAGE' => FL_GetMedia($results['image']),
		        'NEWS_TITLE' => $results['title'],
		        'NEWS_DESC' => mb_substr($results['description'], 0, 100, "UTF-8") . '..',
		        'NEWS_POSTED' => $results['posted'],
		        'NEWS_PUBLISHER__NAME' => $results['publisher']['name'],
		        'NEWS_PUBLISHER__URL' => $results['publisher']['url']
		    ));
		}
		if ($key == 'music') {
			$music_html .= FL_Loadpage('search/lists/news', array(
				'NEWS_ID' => $results['id'],
		        'NEWS_URL' => $results['url'],
		        'NEWS_ENCODED_URL' => urlencode($results['url']),
		        'NEWS_IMAGE' => FL_GetMedia($results['image']),
		        'NEWS_TITLE' => $results['title'],
		        'NEWS_DESC' => mb_substr($results['description'], 0, 100, "UTF-8") . '..',
		        'NEWS_POSTED' => $results['posted'],
		        'NEWS_PUBLISHER__NAME' => $results['publisher']['name'],
		        'NEWS_PUBLISHER__URL' => $results['publisher']['url']
		    ));
		}
		if ($key == 'polls') {
			$polls_html .= FL_Loadpage('search/lists/news', array(
				'NEWS_ID' => $results['id'],
		        'NEWS_URL' => $results['url'],
		        'NEWS_ENCODED_URL' => urlencode($results['url']),
		        'NEWS_IMAGE' => FL_GetMedia($results['image']),
		        'NEWS_TITLE' => $results['title'],
		        'NEWS_DESC' => mb_substr($results['description'], 0, 100, "UTF-8") . '..',
		        'NEWS_POSTED' => $results['posted'],
		        'NEWS_PUBLISHER__NAME' => $results['publisher']['name'],
		        'NEWS_PUBLISHER__URL' => $results['publisher']['url']
		    ));
		}

		if ($key == 'quiz') {
			$quiz_html .= FL_Loadpage('search/lists/news', array(
				'NEWS_ID' => $results['id'],
		        'NEWS_URL' => $results['url'],
		        'NEWS_ENCODED_URL' => urlencode($results['url']),
		        'NEWS_IMAGE' => FL_GetMedia($results['image']),
		        'NEWS_TITLE' => $results['title'],
		        'NEWS_DESC' => mb_substr($results['description'], 0, 100, "UTF-8") . '..',
		        'NEWS_POSTED' => $results['posted'],
		        'NEWS_PUBLISHER__NAME' => $results['publisher']['name'],
		        'NEWS_PUBLISHER__URL' => $results['publisher']['url']
		    ));
		}
	}
}
if (empty($news_html)) {
	$news_html = '<div class="center no-results empty_state"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z"></path></svg>' . $lang["no_posts_to_show"] . '</div>';
}

if (empty($lists_html)) {
	$lists_html = '<div class="center no-results empty_state"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5,9.5L7.5,14H2.5L5,9.5M3,4H7V8H3V4M5,20A2,2 0 0,0 7,18A2,2 0 0,0 5,16A2,2 0 0,0 3,18A2,2 0 0,0 5,20M9,5V7H21V5H9M9,19H21V17H9V19M9,13H21V11H9V13Z"></path></svg>' . $lang["no_posts_to_show"] . '</div>';
}

if (empty($videos_html)) {
	$videos_html = '<div class="center no-results empty_state"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"></path></svg>' . $lang["no_posts_to_show"] . '</div>';
}

if (empty($music_html)) {
	$music_html = '<div class="center no-results empty_state"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z"></path></svg>' . $lang["no_posts_to_show"] . '</div>';
}

if (empty($polls_html)) {
	$polls_html = '<div class="center no-results empty_state"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z"></path></svg>' . $lang["no_posts_to_show"] . '</div>';
}

if (empty($quiz_html)) {
	$quiz_html = '<div class="center no-results empty_state"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M16.5,8L11,13.5L7.5,10L8.91,8.59L11,10.67L15.09,6.59L16.5,8Z"></path></svg>' . $lang["no_posts_to_show"] . '</div>';
}
$fl['content'] = FL_LoadPage('search/content', array(
    'SEARCH_KEYWORD' => FL_Secure($keyword),
    'NEWS_RESULTS' => $news_html,
    'LISTS_RESULTS' => $lists_html,
    'VIDEOS_RESULTS' => $videos_html,
    'MUSIC_RESULTS' => $music_html,
    'POLLS_RESULTS' => $polls_html,
    'QUIZ_RESULTS' => $quiz_html,

    'NEWS_COUNT' => count($search_results['news']),
    'LISTS_COUNT' => count($search_results['lists']),
    'VIDEOS_COUNT' => count($search_results['videos']),
    'MUSIC_COUNT' => count($search_results['music']),
    'POLLS_COUNT' => count($search_results['polls']),
    'QUIZ_COUNT' => count($search_results['quiz']),
));