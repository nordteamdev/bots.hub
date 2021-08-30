<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:52:51
         compiled from "..\template\search\similar_songs.html" */ ?>
<?php /*%%SmartyHeaderCode:280335c14c0e3ea9dd8-38381048%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '21a17c345179b8747d21251488d1f65b417a4fdd' => 
    array (
      0 => '..\\template\\search\\similar_songs.html',
      1 => 1499365829,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '280335c14c0e3ea9dd8-38381048',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'query' => 0,
    'result' => 0,
    'this' => 0,
    'c' => 0,
    'download' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14c0e41655d5_74028713',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14c0e41655d5_74028713')) {function content_5c14c0e41655d5_74028713($_smarty_tpl) {?><!-------------------------------- SIMILAR SONGS (radio) [ template ] -------------------------->

<div class="mus_content_w"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
if ($_smarty_tpl->tpl_vars['result']->value['language']===$_smarty_tpl->tpl_vars['this']->value->show_prch_icon) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
}
if ($_smarty_tpl->tpl_vars['c']->value===0) {?><div class="mus_album"><div class="mus_album_i__fixed"><div class="mus_album_i_w"><div class="mus_album_side_w curPointer"><div class="mus_album_side mus_album_side__b"><img alt="" style="width:128px;height:128px;" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['this']->value->default_cover;?>
"></div><div class="mus_album_side mus_album_side__a"><img alt="" style="width:128px;height:128px;" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"><img alt="" style="width:128px;height:128px;" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['this']->value->default_cover;?>
"></div></div></div><div class="m_c_s_c_go_to mt-5"><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
</div></div><div><div class="mus_h2 mb-5"><span class="mus_h2_tx ellip">Similar to <?php echo $_smarty_tpl->tpl_vars['this']->value->keyword;?>
</span></div></div><div class="mus-tr_lst mus_scroll-overlay"><div class="mus_scroll-overlay_dummy"></div><ol><?php }?><li target="#p99m_sec_artist_radio_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><div class="mus-tr_i  __has-video soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="tri_m_sec_artist_radio_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="p99m_sec_artist_radio_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"}' ></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_artist_radio_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
</span></div><?php if ($_smarty_tpl->tpl_vars['result']->value['video']>'0') {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['result']->value['video'];?>
"></div><?php }?></div></li><?php $_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['c']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['c']->value++, true, 0);
} ?></ol></div></div></div></div></div></div></div><?php }} ?>
