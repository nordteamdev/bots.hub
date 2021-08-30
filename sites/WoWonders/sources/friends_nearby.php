<?php
if ($wo['loggedin'] == false || $wo['config']['find_friends'] != 1) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'friends_nearby';
$wo['title']       = $wo['lang']['find_friends_nearby'];
$wo['content']     = Wo_LoadPage('friends_nearby/content');