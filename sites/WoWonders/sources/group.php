<?php
if (isset($_GET['g'])) {
    if (Wo_GroupExists($_GET['g']) === true && Wo_GroupActive($_GET['g'])) {
        $group_id            = Wo_GroupIdFromGroupname($_GET['g']);
        $wo['group_profile'] = Wo_GroupData($group_id);
    } else {
        header("Location: " . Wo_SeoLink('index.php?link1=404'));
        exit();
    }
} else {
    header("Location: " . $wo['config']['site_url']);
    exit();
}
if ($wo['config']['groups'] == 0) {
    header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}
$wo['description'] = $wo['group_profile']['about'];
$wo['keywords']    = '';
$wo['page']        = 'group';
$wo['title']       = $wo['group_profile']['name'];
$wo['content']     = Wo_LoadPage('group/content');