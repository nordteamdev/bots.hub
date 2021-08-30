<?php

/* API / Developers (will be available on future updates) */



if ($wo['loggedin'] == false) {

  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));

  exit();

}

if (empty($_GET['app_id'])) {

  header("Location: " . $wo['config']['site_url']);

  exit();

}

if (Wo_IsAdmin() || Wo_IsModerator()) {

}else{
  if (Wo_IsAppOnwer($_GET['app_id']) === false) {
    header("Location: " . $wo['config']['site_url']);
    exit();
  }
}


$wo['app'] = Wo_GetApp($_GET['app_id']);

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'developers';
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('graph/app-page');