<?php 
if (Wo_CanBlog() == false) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}
if ($wo['loggedin'] == false) {
	  header("Location: " . $wo['config']['site_url']);
	  exit();
}
if (empty($_GET['id'])) {
	  header("Location: " . $wo['config']['site_url']);
	  exit();
}
if (Wo_IsBlogOwner($_GET['id']) === false) {
	  header("Location: " . $wo['config']['site_url']);
	  exit();
}
$data = Wo_GetArticle($_GET['id']);
if (empty($data)) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}
$wo['description'] = '';
$wo['keywords']    = '';
$wo['page']        = 'edit-blog';
$wo['title']       = $wo['lang']['edit'];
$wo['article']     = $data;
$wo['content']     = Wo_LoadPage('blog/edit-blog');