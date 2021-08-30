<?php 
if ($wo['loggedin'] == false || $wo['config']['user_ads'] == 0) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();

}
if ($wo['user']['wallet'] == 0 || $wo['user']['wallet'] == '0.00') {
	$user_id = $wo['user']['user_id'];
	$query = mysqli_query($sqlConnect, "UPDATE " . T_USER_ADS . " SET status = 0 WHERE user_id = '$user_id'");
}
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'ads';
$wo['ap']          = 'ads';
$wo['title']       = $wo['lang']['manage_ads'];
$wo['ads']         = Wo_GetMyAds();
$wo['content']     = Wo_LoadPage('ads/content');
 ?>