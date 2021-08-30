<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 07:08:17
         compiled from "..\template\users\playlists.html" */ ?>
<?php /*%%SmartyHeaderCode:320125c149a51348bd1-58661326%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2f7b822a46fd8b8ccd8f88366715c1a14520f474' => 
    array (
      0 => '..\\template\\users\\playlists.html',
      1 => 1499365833,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '320125c149a51348bd1-58661326',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'pl_query' => 0,
    'result' => 0,
    'm_pl_original_pid' => 0,
    'm_pl_play_count' => 0,
    'condition' => 0,
    'm_pl_id' => 0,
    'm_pl_songs_count' => 0,
    'm_pl_cover' => 0,
    'm_pl_name' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c149a51459522_46874266',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c149a51459522_46874266')) {function content_5c149a51459522_46874266($_smarty_tpl) {?>
<!---------- User's playlists ---------->
<?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['pl_query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp11=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_id'] = new Smarty_variable($_tmp11, null, 0);
ob_start();?><?php echo urldecode($_smarty_tpl->tpl_vars['result']->value['name']);?>
<?php $_tmp12=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_name'] = new Smarty_variable($_tmp12, null, 0);
ob_start();?><?php echo urldecode($_smarty_tpl->tpl_vars['result']->value['favorite_cover']);?>
<?php $_tmp13=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_cover'] = new Smarty_variable($_tmp13, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['originalpid'];?>
<?php $_tmp14=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_original_pid'] = new Smarty_variable($_tmp14, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['s_count'];?>
<?php $_tmp15=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_songs_count'] = new Smarty_variable($_tmp15, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['playcount'];?>
<?php $_tmp16=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_play_count'] = new Smarty_variable($_tmp16, null, 0);
if ($_smarty_tpl->tpl_vars['m_pl_original_pid']->value&&$_smarty_tpl->tpl_vars['m_pl_play_count']->value!=='-0') {
ob_start();?><?php echo $_smarty_tpl->tpl_vars['m_pl_original_pid']->value;?>
<?php $_tmp17=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_id'] = new Smarty_variable($_tmp17, null, 0);
}
if ($_smarty_tpl->tpl_vars['condition']->value===0) {?><div class="mt-20  mb0"><div class="mus_h2 __left">Playlists</div><div class="mus_album-list __left" aria-hidden="false"><div><span class="pl-mb-90" id="user_have_playlist"><?php }?><div class="mus_card_i wd24"><div class="mus_card __s" uid="card" id="crdI_<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
" data-pl-count="<?php echo $_smarty_tpl->tpl_vars['m_pl_songs_count']->value;?>
"><div class="mus_card_img_w mus_card_img_w__col"><img src="<?php echo $_smarty_tpl->tpl_vars['m_pl_cover']->value;?>
" width="100%" height="100%"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" title="Play" data-href="playlist" data-action="true" data-query="?action=playlist&play=true&i=<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause" title="pause"><span class="mus_card_play __pause"></span>pause</span><span class="mus_card_ac_i mus_card_ac_i__add" uid="add" title="add"><span class="mus_card_add"></span>add</span><span class="mus_card_ac_i mus_card_ac_i__success" title="Added"><span class="mus_card_add __added"></span>Added</span><span class="mus_card_ac_i mus_card_ac_i__more" title="More" data-href="playlist" data-action="true" data-query="?action=my&i=<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
"><span class="mus_card_more"></span>More</span></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap" data-href="playlist" data-action="true" data-query="?action=my&i=<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
"><span class="mus_card_n_a" title="<?php echo $_smarty_tpl->tpl_vars['m_pl_name']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['m_pl_name']->value;?>
</span></div><span class="mus_card_n_artist ellip"><?php echo $_smarty_tpl->tpl_vars['m_pl_songs_count']->value;?>
 songs</span></div></div></div><?php $_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['condition']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['condition']->value++, true, 0);
} ?></span></div></div><?php }} ?>
