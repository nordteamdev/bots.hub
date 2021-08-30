<?php
if ($fl['loggedin'] == true) {
	header("Location:" . $site_url);
	exit();
}
$fl['title']           = $lang['create_new_account'] . ' | ' . $fl['config']['title'];
$fl['description']     = $fl['config']['description'];
$fl['keywords']        = $fl['config']['keywords'];
$fl['page']            = 'register'; 
$fl['profile_fields']  = FL_GetProfileFields('registration');
$fl['content']         = FL_LoadPage('register/content', array('CREATE_SESSION' => FL_CreateSession()));