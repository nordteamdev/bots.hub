<?php 

if ($fl['loggedin'] == false || empty($_GET['ad_id']) || $fl['config']['usr_ads'] != 1) {
	header("Location:" . FL_Link(''));
	exit();
}

$id = FL_Secure($_GET['ad_id']);
$db = $db->where('user_id',$fl['user']['id']);
$ad = $db->where('id',$id)->getOne(T_USER_ADS);

if (empty($ad)) {
	header("Location:" . FL_Link('404'));
	exit();
}


$fl['title']       = 'Edit Ads  | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['keywords']    = $fl['config']['keywords'];
$fl['page']        = 'user_ads';
$image             = explode('/', $ad->media_file);

$fl['content']     = FL_LoadPage('ads/edit-ad',array(
	'ID'           => $ad->id,
	'NAME'         => $ad->title,
	'URL'          => $ad->url,
	'PLM1'         => (($ad->placement == 1) ? 'selected' : ''),
	'PLM2'         => (($ad->placement == 2) ? 'selected' : ''),
	'PLM3'         => (($ad->placement == 3) ? 'selected' : ''),
	'STAT1'        => (($ad->status == 1) ? 'selected' : ''),
	'STAT2'        => (($ad->status == 2) ? 'selected' : ''),
	'IMG_NAME'     => end($image),
));