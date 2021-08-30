<?php
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
if ($wo['config']['events'] == 0) {
	header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'events';
$wo['active']      = 7;
$wo['title']       = $wo['lang']['my_events'] . ' | ' . $wo['config']['siteTitle'];
$wo['events']      = Wo_GetMyEvents();
$wo['content']     = Wo_LoadPage('events/my-events');
