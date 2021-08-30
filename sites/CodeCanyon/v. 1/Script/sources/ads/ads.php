<?php
if ($fl['loggedin'] == false || $fl['config']['usr_ads'] != 1) {
	header("Location:" . FL_Link(''));
	exit();
}

$fl['title']       = 'Ads  | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'user_ads';

$user_ads          = $db->where("user_id",$fl['user']['id'])->get(T_USER_ADS);
$user_ads_html     = "";
$ad_index          = 1;

foreach ($user_ads as $fl['user_ad']) {
	$fl['user_ad']  = FL_ObjectToArray($fl['user_ad']);
	$stat           = $fl['lang']['active'];

	if ($fl['user_ad']['status'] == 2) {
		$stat       = $fl['lang']['inactive'];
	}

	$user_ads_html .= FL_LoadPage('ads/includes/list',array(
		'ID' => $fl['user_ad']['id'],
		'STATUS' => $stat,
		'INDEX' => $ad_index,
		'NAME' => $fl['user_ad']['title'],
		'NAME' => $fl['user_ad']['title'],
		'RESULTS' => $fl['user_ad']['results'],
		'SPENT' => $fl['user_ad']['spent'],
		'TIME' => date('n M, Y h:m A',$fl['user_ad']['time']),
		'EDIT' => FL_Link(sprintf('ads/edit/%u/',$fl['user_ad']['id'])),
	));

	$ad_index = ($ad_index + 1);
}

$fl['content'] = FL_LoadPage('ads/content',array(
	'USER_ADS' => $user_ads_html
));