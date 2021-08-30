<?php
if ($wo['loggedin'] == false) {
    header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
    exit();
}

global $sqlConnect;
$data = array();
$user_id       = Wo_Secure($wo['user']['user_id']);
$query         = " SELECT DISTINCT `send_user_id` FROM " . T_POKES . " WHERE `received_user_id` = {$user_id}";
$sql_query = mysqli_query($sqlConnect, $query);
while ($fetched_data = mysqli_fetch_assoc($sql_query)) {
    $data[] = Wo_UserData($fetched_data['send_user_id']);
}
$wo['poke'] = $data;

$wo['description'] = '';
$wo['keywords']    = '';
$wo['page']        = 'poke';
$wo['title']       = $wo['lang']['pokes'];
$wo['content']     = Wo_LoadPage('poke/content');