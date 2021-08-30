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
$wo['active']      = 1;
$wo['events']      = Wo_GetEvents();
$wo['title']       = $wo['lang']['events_upcoming'] . ' | ' . $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('events/events-upcomming');