<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:15:26
         compiled from "..\template\users\addedTracks.html" */ ?>
<?php /*%%SmartyHeaderCode:173145c14b81e98f134-39761227%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e1f7327c934ebc5e8dbabb8ed69045aab1cbb8ef' => 
    array (
      0 => '..\\template\\users\\addedTracks.html',
      1 => 1499365833,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '173145c14b81e98f134-39761227',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'arr_ftc' => 0,
    'condition' => 0,
    'this' => 0,
    'result' => 0,
    's_lang' => 0,
    'purchase_ic' => 0,
    'randomize_id' => 0,
    's_id' => 0,
    'download' => 0,
    's_pth' => 0,
    's_cover' => 0,
    's_artist' => 0,
    's_song' => 0,
    's_album' => 0,
    's_time' => 0,
    's_video' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14b81eeffd87_07686193',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14b81eeffd87_07686193')) {function content_5c14b81eeffd87_07686193($_smarty_tpl) {?>
<!------------ User's songs -------------->

<?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['arr_ftc']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
if ($_smarty_tpl->tpl_vars['condition']->value===0) {?><div class="mus_content_w"><div class="mus_album"><div class="mus_album_i__fixed"><div class="mus_album_i_w"><div class="mus_album_side_w curPointer"><div class="mus_album_side mus_album_side__c"><img alt="" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['this']->value->defaultCover;?>
"></div><div class="mus_album_side mus_album_side__a"><img alt="" style="width:128px;height:128px;" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"></div></div></div><div class="m_c_s_c_go_to mt-5" title="<?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
"><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
</div></div><div class="mus-tr_lst mus_scroll-overlay" aria-hidden="false" style="min-height: 280px;"><div class="mus_scroll-overlay_dummy"></div><ol><?php }
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_id'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_artist'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_song'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_album'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_pth'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_cover'] = new Smarty_variable($_tmp6, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_time'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['video'];?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_video'] = new Smarty_variable($_tmp8, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['language'];?>
<?php $_tmp9=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_lang'] = new Smarty_variable($_tmp9, null, 0);
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
if ($_smarty_tpl->tpl_vars['s_lang']->value===$_smarty_tpl->tpl_vars['purchase_ic']->value) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
}?><li target="#<?php echo $_smarty_tpl->tpl_vars['randomize_id']->value;?>
_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><div class="mus-tr_i  __has-video soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
"  id="<?php echo $_smarty_tpl->tpl_vars['randomize_id']->value;?>
_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="<?php echo $_smarty_tpl->tpl_vars['randomize_id']->value;?>
_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['s_pth']->value;?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['s_cover']->value;?>
"}'>    </span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['s_artist']->value;?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['s_song']->value;?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['s_album']->value;?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['s_time']->value;?>
</span></div><?php if ($_smarty_tpl->tpl_vars['s_video']->value>'0') {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['s_video']->value;?>
"></div><?php }?></div></li><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['condition']->value++;?>
<?php $_tmp10=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['condition'] = new Smarty_variable($_tmp10, null, 0);
} ?></ol></div>
               <?php }} ?>
