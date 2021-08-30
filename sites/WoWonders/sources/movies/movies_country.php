<?php 
if ($wo['loggedin'] == false || $wo['config']['movies'] == 0|| $wo['config']['movies'] == 0) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}

if (isset($_GET['country'])) {
	$wo['description'] = $wo['config']['siteDesc'];
	$wo['keywords']    = $wo['config']['siteKeywords'];
	$wo['page']        = 'movies';
	$wo['movies']      = Wo_GetMovies(array('country' => $_GET['country']));
	$wo['country']       = ucfirst($_GET['country']);
	$wo['title']       = $wo['lang']['movies'];
	$wo['content']     = Wo_LoadPage('movies/movies-country');
}
