<?php 
if ($wo['loggedin'] == false || $wo['config']['user_ads'] == 0) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
if (isset($_GET['id'])) {
	$ad_data = Wo_GetUserAdData($_GET['id']);
	if (!empty($ad_data) && Wo_IsAdsOwner($ad_data['id'])) {
		global $sqlConnect;

		$wo['description'] = $wo['config']['siteDesc'];
		$wo['keywords']    = $wo['config']['siteKeywords'];
		$wo['page']        = 'ads';
		$wo['ap']          = 'chart';
		$wo['title']       = $wo['lang']['edit_ads'];
		$wo['ad-data']     = $ad_data;
		$wo['my-pages']    = Wo_GetMyPages($ad_data['user_id']);
		$wo['audience']    = $wo['countries_name'];

		$wo['clicks']	   = array();
		$wo['views']	   = array();
		$wo['ad_data']	   = $ad_data;
		
		$sqlclicks = "SELECT DATE(dt) DateOnly, SUM(clicks) AS ADClicks , SUM(spend) AS Spend FROM `" . T_USERADS_DATA ."` WHERE user_id = ". Wo_Secure($ad_data['user_id'])." AND ad_id = " . Wo_Secure($_GET['id']) . " AND clicks > 0 GROUP BY DateOnly,clicks,Spend ORDER BY dt DESC LIMIT 30";
		$queryclicks = mysqli_query($sqlConnect, $sqlclicks);
		while ($fetched_data = mysqli_fetch_assoc($queryclicks)) {
			$wo['clicks'][] = $fetched_data;
		}

		$sqlviews = "SELECT DATE(dt) DateOnly, SUM(views) AS ADviews , SUM(spend) AS Spend FROM `" . T_USERADS_DATA ."` WHERE user_id = ". Wo_Secure($ad_data['user_id'])." AND ad_id = " . Wo_Secure($_GET['id']) . " AND views > 0 GROUP BY DateOnly,views,Spend ORDER BY dt DESC LIMIT 30";
		$queryviews = mysqli_query($sqlConnect, $sqlviews);
		while ($fetched_data = mysqli_fetch_assoc($queryviews)) {
			$wo['views'][] = $fetched_data;
		}


		$wo['content']     = Wo_LoadPage('ads/chart');
	}
}

 ?>