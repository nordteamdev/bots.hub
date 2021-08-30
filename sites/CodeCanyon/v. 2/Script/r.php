<?php 
$link = isset($_GET['u']) ? urldecode( $_GET['u'] ) : '';
header("refresh:3; url=$link");

echo 'Redirecting.. to '.$link;