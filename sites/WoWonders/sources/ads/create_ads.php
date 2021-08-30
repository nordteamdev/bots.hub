<?php 
if ($wo['loggedin'] == false || $wo['config']['user_ads'] == 0) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();

}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'ads';
$wo['ap']          = 'create';
$wo['title']       = $wo['lang']['create_ads'];
$wo['my-pages']    = Wo_GetMyPages();
$wo['audience']    = $wo['countries_name'];
$wo['content']     = Wo_LoadPage('ads/create');
?>