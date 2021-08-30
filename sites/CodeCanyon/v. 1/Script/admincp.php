<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2017 phpflame. All rights reserved.
// +------------------------------------------------------------------------+
// You can access the admin panel by using the following url: http://yoursite.com/admin-cp 

require 'assets/init.php';

if (FL_IsAdmin() == false) {
	header("Location: " . FL_Link(''));
    exit();
}

// autoload admin panel files
require 'admin-panel/autoload.php';