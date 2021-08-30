<?php
if (empty($_GET['page_name'])) {
	header("Location: " . $config['site_url']);
	exit();
}

$page_data = $wo['page_data'] = Wo_GetCustomPage($_GET['page_name']);
if (empty($page_data)) {
	header("Location: " . $config['site_url']);
	exit();
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'custom_page';
$wo['title']       = $page_data['page_title'];
$wo['content']     = Wo_LoadPage('terms/custom-page');