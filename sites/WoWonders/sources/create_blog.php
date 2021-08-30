<?php 
if (Wo_CanBlog() == false) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'create_blog';
$wo['title']       = $wo['lang']['create_new_article'];
$wo['content']     = Wo_LoadPage('blog/create-blog');