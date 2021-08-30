<?php
if ($wo['loggedin'] == false) {
    if ($wo['config']['profile_privacy'] == 0) {
        header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
        exit();
    }
}
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'my_videos';
$wo['title']       = $wo['lang']['videos'];
$wo['content']     = Wo_LoadPage('videos/content');