<?php
if ($wo['loggedin'] == false || $wo['config']['games'] == 0) {
	header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}
if (empty($_GET['id'])) {
	header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}
$wo['setting']['admin'] = false;
if (isset($_GET['id']) && !empty($_GET['id'])) {
    if (Wo_GameExists($_GET['id']) === false) {
        header("Location: " . Wo_SeoLink('index.php?link1=404'));
        exit();
    }
    $game_id  = Wo_Secure($_GET['id']);
    if (empty($game_id)) {
	    header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
        exit();
    }
    $wo['game'] = Wo_GameData($game_id);
}
$add_game = Wo_AddPlayGame($game_id);
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'game';
$wo['title']       =  $wo['game']['game_name'] . ' | ' . $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('games/game-page');