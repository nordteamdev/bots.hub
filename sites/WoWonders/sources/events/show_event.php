<?php
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}

if ($wo['config']['events'] == 0) {
	header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}
if (isset($_GET['eid']) && is_numeric($_GET['eid'])){
		$event              = Wo_EventData($_GET['eid']);
	if ($event && !empty($event)) {
		$wo['description']  = $wo['config']['siteDesc'];
		$wo['keywords']     = $wo['config']['siteKeywords'];
		$wo['page']         = 'events';
		$wo['event']        = $event;
		$wo['event']['going']      = Wo_TotalGoingUsers($event['id']);
		$wo['event']['interested'] = Wo_TotalInterestedUsers($event['id']);
		$wo['event']['invited']    = Wo_TotalInvitedUsers($event['id']);
		$wo['events']       =  Wo_GetSuggestedEvents(array("limit" => 5));
		$wo['title']        = $event['name'];
		$wo['content']      = Wo_LoadPage('events/content');
	}
}
