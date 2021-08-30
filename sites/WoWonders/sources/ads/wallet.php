<?php 
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();

}

if (isset($_SESSION['replenished_amount']) && $_SESSION['replenished_amount'] > 0){
	$wo['replenishment_notif']  = $wo['lang']['replenishment_notif'] . ' ' . Wo_GetCurrency($wo['config']['currency']) .  $_SESSION['replenished_amount'];
	unset($_SESSION['replenished_amount']);
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'ads';
$wo['ap']          = 'wallet';
$wo['title']       = $wo['lang']['wallet'];
$wo['ads']         = Wo_GetMyAds();
$wo['content']     = Wo_LoadPage('ads/wallet');
 ?>