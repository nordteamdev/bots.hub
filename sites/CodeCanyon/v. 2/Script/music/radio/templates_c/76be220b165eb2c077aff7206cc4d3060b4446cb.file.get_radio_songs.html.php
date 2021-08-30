<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:19:00
         compiled from "..\template\radio\get_radio_songs.html" */ ?>
<?php /*%%SmartyHeaderCode:1395c14b8f4449666-17583487%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '76be220b165eb2c077aff7206cc4d3060b4446cb' => 
    array (
      0 => '..\\template\\radio\\get_radio_songs.html',
      1 => 1499365829,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1395c14b8f4449666-17583487',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'rows' => 0,
    'result' => 0,
    'track_lang' => 0,
    'd_ic' => 0,
    'track_id' => 0,
    'download' => 0,
    'track_pth' => 0,
    'track_cover' => 0,
    'artist' => 0,
    'track' => 0,
    'album' => 0,
    'track_length' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14b8f459b652_26313816',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14b8f459b652_26313816')) {function content_5c14b8f459b652_26313816($_smarty_tpl) {?>
<!-------------------- get the songs by radio station [ Template ]  --------------------->
<ol><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['rows']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['artist'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['album'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_length'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['language'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_lang'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_id'] = new Smarty_variable($_tmp6, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_pth'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_cover'] = new Smarty_variable($_tmp8, null, 0);
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
if ($_smarty_tpl->tpl_vars['track_lang']->value===$_smarty_tpl->tpl_vars['d_ic']->value) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
}?><li target="#tri_m_sec_rd_<?php echo $_smarty_tpl->tpl_vars['track_id']->value;?>
"><div class="mus-tr_i  soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="tri_m_sec_radio_<?php echo $_smarty_tpl->tpl_vars['track_id']->value;?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="p1m_sec_my_radio_<?php echo $_smarty_tpl->tpl_vars['track_id']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['track_pth']->value;?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['track_cover']->value;?>
"}' ></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['track']->value;?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['album']->value;?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_radio_<?php echo $_smarty_tpl->tpl_vars['track_id']->value;?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['track_length']->value;?>
</span></div></div></li><?php } ?></ol><?php }} ?>
