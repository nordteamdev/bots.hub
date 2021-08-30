<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 07:27:00
         compiled from "..\template\search\index.html" */ ?>
<?php /*%%SmartyHeaderCode:186005c149eb4237077-15503393%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1a69a2becd74539904c502d2a57b18ce7e8713a0' => 
    array (
      0 => '..\\template\\search\\index.html',
      1 => 1499365832,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '186005c149eb4237077-15503393',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'inx' => 0,
    'key' => 0,
    'this' => 0,
    'count_rows' => 0,
    'query' => 0,
    'c' => 0,
    'result' => 0,
    '_SESSION' => 0,
    'artist' => 0,
    'cover' => 0,
    'more_details' => 0,
    'id' => 0,
    'play' => 0,
    'sub_activeClass_href_hits' => 0,
    'sub_similar_tracks' => 0,
    's_lang' => 0,
    'display_tracks' => 0,
    'aria_hidden' => 0,
    'song_id' => 0,
    'download' => 0,
    'song_p' => 0,
    'arts' => 0,
    'song' => 0,
    'album' => 0,
    'song_t' => 0,
    'video' => 0,
    'v' => 0,
    'mt' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c149eb470af74_63557207',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c149eb470af74_63557207')) {function content_5c149eb470af74_63557207($_smarty_tpl) {?><!----------------------------------  search [template] --------------------------->
<?php if ($_smarty_tpl->tpl_vars['inx']->value!=='') {
echo $_smarty_tpl->tpl_vars['this']->value->search_build_header($_smarty_tpl->tpl_vars['key']->value);
} else { ?><div class="m_c_s_alb" id="windowMusic_search_container"><div class="m_c_s_header"><div class="m_c_s_headerWrapper"><div class="m_c_s_header_title">Artist&nbsp;</div></div></div><?php }
if ($_smarty_tpl->tpl_vars['count_rows']->value>0) {
$_smarty_tpl->createLocalArrayVariable('_SESSION', null, 0);
$_smarty_tpl->tpl_vars['_SESSION']->value['rus_artist'] = 'pending';
$_smarty_tpl->createLocalArrayVariable('_SESSION', null, 0);
$_smarty_tpl->tpl_vars['_SESSION']->value['not_concr_artist'] = false;?><div class="m_c_s_scrollable mus-custom-scrolling pl-mb-90" style="height: 590px"><div class="mus_content_w"><div class="mus_content_w" aria-hidden="false"><div class="mus_album mb-10 mt-15"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
if ($_smarty_tpl->tpl_vars['c']->value===0) {
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_artist'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['artist'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_cover'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['cover'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_id'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['id'] = new Smarty_variable($_tmp3, null, 0);
if (!isset($_smarty_tpl->tpl_vars['_SESSION']->value['song_genre'])||isset($_smarty_tpl->tpl_vars['_SESSION']->value['song_genre'])!==$_smarty_tpl->tpl_vars['result']->value['m_genre']) {
$_smarty_tpl->createLocalArrayVariable('_SESSION', null, 0);
$_smarty_tpl->tpl_vars['_SESSION']->value['song_genre'] = $_smarty_tpl->tpl_vars['result']->value['m_genre'];
$_smarty_tpl->createLocalArrayVariable('_SESSION', null, 0);
$_smarty_tpl->tpl_vars['_SESSION']->value['song_artist_searched'] = $_smarty_tpl->tpl_vars['artist']->value;
}?><div class="mus_album_i__absolute" parent-for-cover="true"><span class="gwt-InlineHTML"><div class="mus_album_i_w"><div class="mus_card_img_w mus_card_img_w__artist"><img uid="active" class="mus_card_img" src="<?php echo $_smarty_tpl->tpl_vars['cover']->value;?>
"></div></div></span><?php if ($_smarty_tpl->tpl_vars['inx']->value) {?><div class="m_c_a_go_to" data-search-result="artist_albums" mus-search-result="artist_albums" <?php echo $_smarty_tpl->tpl_vars['more_details']->value;?>
><span class="m_c_s_c_go_to mt-5">More details</span></div><?php }?><span class="m_c_col-data"><div class="m_c_col-data_ac"><a class="mtico mus-dl m_c_col-data_ac_i __14" id="aBM_s_<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
" data-search-res-add="<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
" data-search-res-name="<?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
" data-search-res-count="<?php echo $_smarty_tpl->tpl_vars['count_rows']->value;?>
"><i class="mic14 mic14_add"></i><span id="aBM_st">Add to My music</span></a></div></span></div><?php if ($_smarty_tpl->tpl_vars['play']->value==='1') {?><div style="display:none;" id="this_playlist_active" data-collection-play="<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
"></div><?php }?><div class="gwt-HTML"><div class="mus_h2"><span class="mus_h2_tx ellip" m_ppl_title="true" data-id="<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
</span></div></div><div class="mus_submenu"><div class="mus_submenu_i"><span class="mus_submenu_a <?php echo $_smarty_tpl->tpl_vars['this']->value->sub_activeClass_hits;?>
" <?php echo $_smarty_tpl->tpl_vars['sub_activeClass_href_hits']->value;?>
>Hits</span></div><div class="mus_submenu_i" <?php echo $_smarty_tpl->tpl_vars['sub_similar_tracks']->value;?>
><span class="mus_submenu_a"><i class="mus_submenu_play"></i><span>Similar tracks</span></span></div><div class="mus_submenu_i" data-search-result="artist_albums"><span class="mus_submenu_a <?php echo $_smarty_tpl->tpl_vars['this']->value->sub_activeClass_albums;?>
" mus-search-result="artist_albums" data-href="search" data-action="true" data-query="?action=searchResult&method=artistalbums&key=<?php echo urlencode($_smarty_tpl->tpl_vars['key']->value);?>
"><span>Albums</span></span></div></div><div class="mus-tr_lst"><ol data-for-serialize="true"><?php }
if ($_smarty_tpl->tpl_vars['c']->value>4&&(!isset($_smarty_tpl->tpl_vars['_SESSION']->value['srch_display_tracks'])||$_smarty_tpl->tpl_vars['_SESSION']->value['srch_display_tracks']===false)) {
$_smarty_tpl->tpl_vars['display_tracks'] = new Smarty_variable('style="display:none"', null, 0);
$_smarty_tpl->tpl_vars['aria_hidden'] = new Smarty_variable('true', null, 0);
}
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_id'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['song_id'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_time'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['song_t'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_path'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['song_p'] = new Smarty_variable($_tmp6, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_title'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['song'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_artist'];?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['arts'] = new Smarty_variable($_tmp8, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_album'];?>
<?php $_tmp9=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['album'] = new Smarty_variable($_tmp9, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_video'];?>
<?php $_tmp10=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['video'] = new Smarty_variable($_tmp10, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['m_cover'];?>
<?php $_tmp11=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['cover'] = new Smarty_variable($_tmp11, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['language'];?>
<?php $_tmp12=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_lang'] = new Smarty_variable($_tmp12, null, 0);
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
if ($_smarty_tpl->tpl_vars['s_lang']->value===$_smarty_tpl->tpl_vars['this']->value->purchase_ic) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
}?><li <?php echo $_smarty_tpl->tpl_vars['display_tracks']->value;?>
 aria-hidden="<?php echo $_smarty_tpl->tpl_vars['aria_hidden']->value;?>
" target="#windowMusic_searchresult_inx_<?php echo $_smarty_tpl->tpl_vars['song_id']->value;?>
"><div class="mus-tr_i  __has-video soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="tri_m_sec_search_result_<?php echo $_smarty_tpl->tpl_vars['song_id']->value;?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="windowMusic_searchresult_inx_<?php echo $_smarty_tpl->tpl_vars['song_id']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['song_p']->value;?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['cover']->value;?>
"}' ></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a style="display:none;" class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['arts']->value;?>
</a><a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['song']->value;?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['album']->value;?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_search_result_<?php echo $_smarty_tpl->tpl_vars['song_id']->value;?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['song_t']->value;?>
</span></div><?php if ($_smarty_tpl->tpl_vars['video']->value>'0') {?><div class="mus-tr_video" data-showvideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['video']->value;?>
"></div><?php }?></div></li><?php if ($_smarty_tpl->tpl_vars['c']->value===$_smarty_tpl->tpl_vars['v']->value) {?></ol><?php }
if ($_smarty_tpl->tpl_vars['c']->value===4&&(!isset($_smarty_tpl->tpl_vars['_SESSION']->value['srch_display_tracks'])||$_smarty_tpl->tpl_vars['_SESSION']->value['srch_display_tracks']===false)) {?><div class="mt-10"><span class="m_c_s_c_go_to" data-srch-rs-mr="true">More songs</span></div><?php }
if ($_smarty_tpl->tpl_vars['c']->value===$_smarty_tpl->tpl_vars['v']->value) {?></div></div><?php }
if ($_smarty_tpl->tpl_vars['v']->value<3) {
$_smarty_tpl->tpl_vars['mt'] = new Smarty_variable('mt-40', null, 0);
}
if ($_smarty_tpl->tpl_vars['c']->value===$_smarty_tpl->tpl_vars['v']->value&&$_smarty_tpl->tpl_vars['inx']->value) {
echo $_smarty_tpl->tpl_vars['this']->value->getMoreArtists();
} elseif ($_smarty_tpl->tpl_vars['c']->value===$_smarty_tpl->tpl_vars['v']->value&&!$_smarty_tpl->tpl_vars['inx']->value) {
echo $_smarty_tpl->tpl_vars['this']->value->get_artistAlbums($_smarty_tpl->tpl_vars['key']->value,$_smarty_tpl->tpl_vars['mt']->value,$_smarty_tpl->tpl_vars['album']->value);
}
$_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['c']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['c']->value++, true, 0);
}
} else {
echo $_smarty_tpl->tpl_vars['this']->value->empty_result('songs');
}?><?php }} ?>
