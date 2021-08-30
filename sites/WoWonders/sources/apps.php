<?php



if ($wo['loggedin'] == false) {

  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));

  exit();

}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'app_setting';
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('graph/apps');