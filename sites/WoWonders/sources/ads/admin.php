<?php 
if ($wo['loggedin'] == false || $wo['config']['user_ads'] == 0 || $wo['user']['admin'] != 1) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
if (isset($_GET['id'])) {
	$ad_data = Wo_GetUserAdData($_GET['id']);
	$wo['countries_name'][0] = $wo['lang']['select'].' '.$wo['lang']['all'];
	if (!empty($ad_data) && Wo_IsAdsOwner($ad_data['id'])) {
		$wo['description'] = $wo['config']['siteDesc'];
		$wo['keywords']    = $wo['config']['siteKeywords'];
		$wo['page']        = 'ads';
		$wo['title']       = $wo['lang']['edit_ads'];
		$wo['ad-data']     = $ad_data;
		$wo['my-pages']    = Wo_GetMyPages($ad_data['user_id']);
		$wo['audience']    = $wo['countries_name'];
		$wo['content']     = Wo_LoadPage('ads/manage');
	}
}
?>