<?php
if ($wo['loggedin'] == false) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
if ($wo['config']['classified'] == 0) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
if (empty($_GET['id'])) {
	header("Location: " . Wo_SeoLink('index.php?link1=home'));
    exit();
}

$product = $wo['product'] = Wo_GetProduct($_GET['id']);

if (empty($product)) {
	header("Location: " . Wo_SeoLink('index.php?link1=home'));
    exit();
}
$post_id = Wo_GetPostIDFromProdcutID($_GET['id']);
if (empty($post_id)) {
	header("Location: " . Wo_SeoLink('index.php?link1=home'));
    exit();
}

if (Wo_IsPostOnwer($post_id, $wo['user']['user_id']) === false) {
	header("Location: " . Wo_SeoLink('index.php?link1=home'));
    exit();
}
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'edit_product';
$wo['title']       = $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('products/edit');