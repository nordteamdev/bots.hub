<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 06:56:25
         compiled from "..\template\ajax_result\recommendation_section.html" */ ?>
<?php /*%%SmartyHeaderCode:172875c1497897e7656-65208479%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ce3dc62b35bba508e8b8c6c6aff5665cb9a06194' => 
    array (
      0 => '..\\template\\ajax_result\\recommendation_section.html',
      1 => 1499365821,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '172875c1497897e7656-65208479',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'query' => 0,
    'result' => 0,
    'id' => 0,
    'download' => 0,
    'add_slash' => 0,
    'filep' => 0,
    'fcover' => 0,
    'artist' => 0,
    'song' => 0,
    'album' => 0,
    'ftime' => 0,
    'track_video' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c1497899838a0_95743382',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c1497899838a0_95743382')) {function content_5c1497899838a0_95743382($_smarty_tpl) {?><!--- SONGS FOR RECOMMENDATION SECTION ---->
<ol class="rec_pl"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['id'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['artist'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['song'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['album'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['filep'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['fcover'] = new Smarty_variable($_tmp6, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['ftime'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['video'];?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_video'] = new Smarty_variable($_tmp8, null, 0);?><li target="track_<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
" id="tr_rc_<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
"><div class="mus-tr_i  __has-video soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="tri_m_sec_ppl_rec_tr_<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="recommendation_tr<?php echo $_smarty_tpl->tpl_vars['add_slash']->value;
echo $_smarty_tpl->tpl_vars['id']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['filep']->value;?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['fcover']->value;?>
"}'></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" onclick="return call_buy_popup(jQuery(this));" title="Download"></span><?php }?><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['song']->value;?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['album']->value;?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_ppl_rec_tr_<?php echo $_smarty_tpl->tpl_vars['id']->value;?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['ftime']->value;?>
</span></div><?php if ($_smarty_tpl->tpl_vars['track_video']->value>'0') {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['track_video']->value;?>
"></div><?php }?></div></li><?php } ?></ol><?php }} ?>
