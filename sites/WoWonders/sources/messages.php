<?php
$wo['description'] = $wo['config']['siteDesc'];
$wo['keywords']    = $wo['config']['siteKeywords'];
$wo['page']        = 'messages';
$wo['title']       = $wo['lang']['messages'] . ' | ' . $wo['config']['siteTitle'];
$wo['content']     = Wo_LoadPage('messages/content');