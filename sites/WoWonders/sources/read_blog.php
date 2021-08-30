<?php
if ($wo['config']['blogs'] == 0) {
	header("Location: " . $wo['config']['site_url']);
    exit();
}

if (empty($_GET['id'])) {
  header("Location: " . $wo['config']['site_url']);
  exit();
}
$_GET['id'] = Wo_GetPostIdFromUrl($_GET['id']);
$article = Wo_GetArticle($_GET['id']);

$id = Wo_Secure($_GET['id']);

if (empty($article)) {
	header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}

$sql_query = mysqli_query($sqlConnect, "UPDATE `Wo_Blog` SET `view` = `view` + 1 WHERE `id` = '$id'");

$wo['description'] = $article['description'];
$wo['keywords']    = $article['tags'];
$wo['page']        = 'read-blog';
$wo['article']     = $article;
$wo['author']      = $article['author'];
$wo['title']       = $article['title'];
$wo['content']     = Wo_LoadPage('blog/read-blog');