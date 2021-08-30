<?php
require("../../VK-UNIVERSE/vkue.php");
$options = [
'token' => "3f03bd3b419c61ce672bba2dc4a9d46c91c42eecad0548f927b300dc812dbc190ebdc79ec2b771af7122e",
];
$vkue = new VKUE($options);
$vkue->send($_GET['text'], ['user_id'=>$_GET['uid']]);
?>