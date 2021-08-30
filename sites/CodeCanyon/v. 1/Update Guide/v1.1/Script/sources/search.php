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
	$news_html = '<div class="center no-results">No results found</div>';
}

if (empty($lists_html)) {
	$lists_html = '<div class="center no-results">No results found</div>';
}

if (empty($videos_html)) {
	$videos_html = '<div class="center no-results">No results found</div>';
}

if (empty($music_html)) {
	$music_html = '<div class="center no-results">No results found</div>';
}

if (empty($polls_html)) {
	$polls_html = '<div class="center no-results">No results found</div>';
}

if (empty($quiz_html)) {
	$quiz_html = '<div class="center no-results">No results found</div>';
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