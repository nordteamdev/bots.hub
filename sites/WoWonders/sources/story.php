<?php
$wo['content']     = '';
$wo['description'] = '';
$wo['keywords']    = '';
$wo['page']  = 'story';
$wo['title'] = '';

$wo['title'] .= ' | ' . $wo['config']['siteName'];
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $placement = '';
    if ($wo['loggedin'] == true) {
        if (Wo_IsAdmin()) {
            $placement = 'admin';
        }
    }
    $id          = Wo_GetPostIdFromUrl($_GET['id']);
    $wo['story'] = Wo_PostData($id, $placement, 'not_limited');
    if (empty($wo['story'])) {
        header("Location: " . $wo['config']['site_url']);
        exit();
    } else if (empty($wo['story']['post_id'])) {
        header("Location: " . $wo['config']['site_url']);
        exit();
    } else if (Wo_PostExists($wo['story']['post_id']) === false) {
        header("Location: " . $wo['config']['site_url']);
        exit();
    }
    $wo['story']['page'] = 1;
    $wo['content']       = Wo_LoadPage('story-content/content');
    $wo['description']   = Wo_Secure(mb_substr($wo['story']['Orginaltext'], 0, 156, "utf-8"));
    $wo['description']   = str_replace('<br>', "", $wo['description']);
    $wo['description']   = str_replace('</ br>', "", $wo['description']);
    $wo['description']   = str_replace('<br />', "", $wo['description']);
    $wo['keywords']      = '';
} else {
    header("Location: " . $wo['config']['site_url']);
    exit();
}

if (!empty($wo['description'])) {
    $wo['title'] = Wo_GetShortTitle($wo['story']['Orginaltext'], false, 50);
} else {
    $wo['title'] = $wo['config']['siteTitle'];
}

if (empty($wo['description'])) {
    $wo['description'] = $wo['config']['siteDesc'];
}
if (!empty($wo['story']['album_name'])) {
    $wo['title'] = $wo['story']['album_name'];
}
?>