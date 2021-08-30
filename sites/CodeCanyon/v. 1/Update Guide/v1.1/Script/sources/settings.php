<?php
if ($fl['loggedin'] == false) {
	header("Location:" . $site_url);
	exit();
}

$user_id            = $fl['user']['user_id'];

$fl['is_admin']     = FL_IsAdmin();
$fl['setting']['admin'] = false;
if (isset($_GET['user']) && !empty($_GET['user']) && ($fl['is_admin'] === true)) {
    if (FL_UserExists($_GET['user']) === false) {
        header("Location: " . $fl['config']['site_url']);
        exit();
    }
    $user_id                = FL_UserIdFromUsername($_GET['user']);
    $fl['setting']['admin'] = true;
}
$fl['setting'] = FL_UserData($user_id);
$fl['setting_page'] = 'general';
$pages_array = array(
	   'general',
	   'profile',
	   'password',
	   'privacy',
	   'change',
	   'social',
	   'avatar',
	   'email',
	   'verification',
	   'delete'
);
if ($fl['setting']['user_id'] == $fl['user']['user_id']) {
  $pages_array = array(
	   'general',
	   'profile',
	   'password',
	   'privacy',
	   'change',
	   'social',
	   'avatar',
	   'email',
	   'verification',
	   'delete'
   );
}

if (!empty($_GET['page'])) {
   if (in_array($_GET['page'], $pages_array)) {
      $fl['setting_page'] = $_GET['page'];
   }
}
$fl['user_setting'] = '';
if (!empty($_GET['user'])) {
    $fl['user_setting'] = 'user=' . $_GET['user']. '&';
}
$COUNTRIES_LAYOUT = '';
foreach ($fl['countries_name'] as $key => $value) {
	$selected = ($key == $fl['setting']['country_id']) ? 'selected' : '';
	$COUNTRIES_LAYOUT .= '<option value="' . $key . '" ' . $selected . '>' . $value . '</option>';
}



$fl['profile_fields']     = null;

$fl['user']['fields']     = FL_UserFieldsData($fl['user']['user_id']);

if ($fl['setting_page'] == 'general') {
	$fl['profile_fields'] = FL_GetProfileFields('general');
}

elseif ($fl['setting_page'] == 'profile') {
	$fl['profile_fields'] = FL_GetProfileFields('profile');
}



$fl['content'] = FL_LoadPage('settings/content', array( 
    'SETTINGS_PAGE' => FL_LoadPage("settings/" . $fl['setting_page'], array(
    	'USER_DATA' => $fl['setting'], 
    	'COUNTRIES_LAYOUT' => $COUNTRIES_LAYOUT, 
    	'ADMIN_LAYOUT' => FL_LoadPage('settings/admin', array('USER_DATA' => $fl['setting']))))
));



$fl['title'] = $lang['settings'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['page'] = 'settings';
$fl['keywords'] = $fl['config']['keywords'];