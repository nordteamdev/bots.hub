<?php

/* API / Developers (will be available on future updates) */



if ($wo['loggedin'] == false) {

  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));

  exit();

}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'create_app';
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('graph/create-app');