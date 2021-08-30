<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 07:27:01
         compiled from "..\template\search\songs.html" */ ?>
<?php /*%%SmartyHeaderCode:295425c149eb5399985-21748725%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '930012346ebfa8f9f74cdd442355403495cc5073' => 
    array (
      0 => '..\\template\\search\\songs.html',
      1 => 1499365829,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '295425c149eb5399985-21748725',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'count_songs' => 0,
    'this' => 0,
    'query' => 0,
    'result' => 0,
    'purchase_ic' => 0,
    'download' => 0,
    'count_albums' => 0,
    'albums_redir' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c149eb5576fc2_06281689',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c149eb5576fc2_06281689')) {function content_5c149eb5576fc2_06281689($_smarty_tpl) {?>
<!-------------------- Result of song search [ template ] -------------------------->

<?php if ($_smarty_tpl->tpl_vars['count_songs']->value>0) {
echo $_smarty_tpl->tpl_vars['this']->value->search_build_header($_smarty_tpl->tpl_vars['this']->value->keyword);?>
<div class="m_c_s_scrollable mus-custom-scrolling pl-mb-90" style="height: 590px;"><div class="mus_content_w"><div class="mus-tr_lst mus_scroll-overlay"><div class="mus_scroll-overlay_dummy"></div><ol><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
if ($_smarty_tpl->tpl_vars['result']->value['language']===$_smarty_tpl->tpl_vars['purchase_ic']->value) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
}?><li target="#p0m_song_search_result_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><div class="mus-tr_i  __has-video soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="tri_m_sec_search_result_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="p0m_song_search_result_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"}'></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_search_result_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
</span></div><?php if ($_smarty_tpl->tpl_vars['result']->value['video']>'0') {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['result']->value['video'];?>
"></div><?php }?></div></li><?php } ?></ol><div id="search_result_scr_ev" style="position:relative;bottom:-10px;padding:25px;left:45%;"></div><div data-search-key="<?php echo urlencode($_smarty_tpl->tpl_vars['this']->value->keyword);?>
" d-more-songs="true" data-search-scroll-event="<?php echo $_smarty_tpl->tpl_vars['this']->value->songs_limit;?>
"></div><?php } elseif ($_smarty_tpl->tpl_vars['count_albums']->value>0&&$_smarty_tpl->tpl_vars['albums_redir']->value>'0') {
echo $_smarty_tpl->tpl_vars['this']->value->empty_result('albums');
} elseif ($_smarty_tpl->tpl_vars['count_albums']->value>0&&$_smarty_tpl->tpl_vars['albums_redir']->value<=0) {
echo $_smarty_tpl->tpl_vars['this']->value->search_build_header($_smarty_tpl->tpl_vars['this']->value->keyword);
echo $_smarty_tpl->tpl_vars['this']->value->empty_result(null,null,'No songs that matched to your search');
} else {
echo $_smarty_tpl->tpl_vars['this']->value->empty_result();
}?><?php }} ?>
