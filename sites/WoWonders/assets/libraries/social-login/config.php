<?php 
$site_url_login = $config['site_url'];
if(substr($site_url_login, -1) == '/') {
    $site_url_login = substr($site_url_login, 0, -1);
}
$LoginWithConfig = array(
    'callback' => $site_url_login . '/login-with.php?provider=' . $provider,

    'providers' => array(
        "Google" => array(
			"enabled" => true,
			"keys" => array("id" => $config['googleAppId'], "secret" => $config['googleAppKey']),
		),
		"Facebook" => array(
			"enabled" => true,
			"keys" => array("id" => $config['facebookAppId'], "secret" => $config['facebookAppKey']),
			"scope" => "email",
			"trustForwarded" => false
		),
		"Twitter" => array(
			"enabled" => true,
			"keys" => array("key" => $config['twitterAppId'], "secret" => $config['twitterAppKey']),
			"includeEmail" => true
		),
		"LinkedIn" => array(
			"enabled" => true,
			"keys" => array("key" => $config['linkedinAppId'], "secret" => $config['linkedinAppKey'])
		),
		"Vkontakte" => array(
			"enabled" => true,
			"keys" => array("id" => $config['VkontakteAppId'], "secret" => $config['VkontakteAppKey'])
		),
		"Instagram" => array(
			"enabled" => true,
			"keys" => array("id" => $config['instagramAppId'], "secret" => $config['instagramAppkey'])
		),
    ),
);
?>