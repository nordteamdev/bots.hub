<?php
session_start();
include_once dirname(__FILE__ ). '/../config.php';

unset($_SESSION['vk_uid']);
unset($_SESSION['group_id']);
unset($_SESSION['vk_first_name']);
unset($_SESSION['vk_last_name']);
unset($_SESSION['vk_photo_rec']);

header('Location: ' . config\INDEX_PAGE);
