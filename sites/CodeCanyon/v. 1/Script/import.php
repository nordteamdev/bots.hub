<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.phpflame.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: phpflamesocial@gmail.com   
// +------------------------------------------------------------------------+
// | FLAME - The Ultimate PHP Viral Media Platform
// | Copyright (c) 2016 phpflame. All rights reserved.
// +------------------------------------------------------------------------+
error_reporting(0);
require_once( "assets/import/hybridauth/hybridauth/Hybrid/Auth.php" );
require_once( "assets/import/hybridauth/hybridauth/Hybrid/Endpoint.php" );

Hybrid_Endpoint::process();