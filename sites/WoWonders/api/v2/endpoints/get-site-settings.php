<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2018 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
$get_config = Wo_GetConfig();
foreach ($non_allowed_config as $key => $value) {
    unset($get_config[$value]);
}
$get_config['logo_url'] = $config['theme_url'] . '/img/logo.' . $get_config['logo_extension'];
$get_config['page_categories'] = $wo['page_categories'];
$response_data      = array(
    'api_status' => 200,
    'config' => $get_config
);