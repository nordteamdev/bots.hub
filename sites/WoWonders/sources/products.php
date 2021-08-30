<?php
if ($wo['loggedin'] == false) {
  // header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  // exit();
}
if ($wo['config']['classified'] == 0) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'products';
$wo['title']       = $wo['lang']['latest_products'];
$wo['content']     = Wo_LoadPage('products/content');