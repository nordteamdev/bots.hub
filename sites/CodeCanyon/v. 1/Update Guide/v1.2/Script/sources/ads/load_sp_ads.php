<?php 

$story_page_ads = fl_get_user_ads(2,2);
$index          = 1;

foreach ($story_page_ads as $fl['ad']) {

    $fl['ad']   = FL_ObjectToArray($fl['ad']);
    $ad_context = array(
        'URL' => $fl['ad']['url'],
        'NAME' => $fl['ad']['title'],
        'IMAGE' => FL_GetMedia($fl['ad']['media_file']),
        'ATTR_ID' => '',
        'AD' => '',
    );

    if (!fl_adcon_exists($fl['ad']['id'])) {
        $ad_context['ATTR_ID'] = sprintf('data-id="%u"',$fl['ad']['id']);
        $ad_context['AD'] = ' ad';
    }

    $page_context["SP_UAD_$index"] = FL_LoadPage("ads/ad",$ad_context);

    $index++;
}

$sidebar_ads = fl_get_user_ads(1,3);
$index       = 1;

foreach ($sidebar_ads as $fl['ad']) {

	$fl['ad']   = FL_ObjectToArray($fl['ad']);
    $ad_context = array(
        'URL' => $fl['ad']['url'],
        'NAME' => $fl['ad']['title'],
        'IMAGE' => FL_GetMedia($fl['ad']['media_file']),
        'ATTR_ID' => '',
        'AD' => '',
    );

    if (!fl_adcon_exists($fl['ad']['id'])) {
        $ad_context['ATTR_ID'] = sprintf('data-id="%u"',$fl['ad']['id']);
        $ad_context['AD'] = ' ad';
    }

    $page_context["SB_UAD_$index"] = FL_LoadPage("ads/ad",$ad_context);

    $index++;
}
