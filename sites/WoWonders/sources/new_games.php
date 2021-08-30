<?php
if ($wo['loggedin'] == false || $wo['config']['games'] == 0) {
	header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'game';
$wo['title']       =  $wo['lang']['games'] . ' | ' . $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('games/new-games');