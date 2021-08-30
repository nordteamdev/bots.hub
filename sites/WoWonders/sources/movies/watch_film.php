<?php 
if ($wo['loggedin'] == false || !isset($_GET['film-id']) || !is_numeric($_GET['film-id']) || $wo['config']['movies'] == 0) {
  header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
  exit();
}
$id = Wo_Secure($_GET['film-id']);
$source = Wo_GetMovies(array('id' => $id));
if (count($source) > 0) {
	$query = mysqli_query($sqlConnect, "UPDATE " . T_MOVIES . " SET views = views + 1 WHERE id = '$id'");
	$wo['description']   = $source[0]['description'];
	$wo['keywords']      = $wo['config']['siteKeywords'];
	$wo['page']          = 'watch_movie';
	$wo['movie']         = $source[0];
	$wo['related-films'] = Wo_SearchFilms($wo['movie']['name']);
	$wo['title']         = $source[0]['name'];
	$wo['content']       = Wo_LoadPage('movies/watch');
}
