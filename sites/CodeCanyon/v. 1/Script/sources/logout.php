<?php
if (!empty($_SESSION['user_id'])) {
	$query = mysqli_query($sqlConnect, "DELETE FROM " .  T_SESSIONS . " WHERE `session_id` = '" . FL_Secure($_SESSION['user_id']) . "'");
}
session_destroy();
if (isset($_COOKIE['user_id'])) {
	$query = mysqli_query($sqlConnect, "DELETE FROM " .  T_SESSIONS . " WHERE `session_id` = '" . FL_Secure($_COOKIE['user_id']) . "'");
    unset($_COOKIE['user_id']);
    setcookie('user_id', null, -1);
} 
header("Location: {$site_url}");
exit();