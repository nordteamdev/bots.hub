<?php
if (empty($_SESSION['code_id'])) {
	header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}
$wo['description'] = '';
$wo['keywords']    = '';
$wo['page']        = 'welcome';
$wo['title']       = $wo['lang']['confirm_your_account'];

if (!empty($_GET['type'])) {
	if ($_GET['type'] == 'two-factor') {
		$wo['lang']['confirm_your_account'] = $wo['lang']['two_factor'];
		$wo['lang']['sign_in_attempt'] = $wo['lang']['to_log_in_two_factor'];
		if ($wo['config']['two_factor_type'] == 'both') {
			$wo['lang']['we_have_sent_you_code'] = $wo['lang']['sent_two_factor_both'];
		} else if ($wo['config']['two_factor_type'] == 'email') {
			$wo['lang']['we_have_sent_you_code'] =  $wo['lang']['sent_two_factor_email'];
		} else if ($wo['config']['two_factor_type'] == 'phone') {
			$wo['lang']['we_have_sent_you_code'] = $wo['lang']['sent_two_factor_phone'];
		}
	} else {
		header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
        exit();
	}
}
$wo['content']     = Wo_LoadPage('welcome/unusual-login');