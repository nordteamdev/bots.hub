<?php
header("HTTP/1.0 404 Not Found");
$wo['description'] = '';
$wo['keywords']    = '';
$wo['page']        = '404';
$wo['title']       = $wo['lang']['sorry_page_not_found'];
$wo['content']     = Wo_LoadPage('404/content');