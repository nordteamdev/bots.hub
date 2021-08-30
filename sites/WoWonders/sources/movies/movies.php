<?php 
if ($wo['loggedin'] == false || $wo['config']['movies'] == 0) {
	  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
	  exit();
}

$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'movies';
$wo['movies']      = Wo_GetMovies();
$wo['title']       = $wo['lang']['movies'];
$wo['content']     = Wo_LoadPage('movies/movies');