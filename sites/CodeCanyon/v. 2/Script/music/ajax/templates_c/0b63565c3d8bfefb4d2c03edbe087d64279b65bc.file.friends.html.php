<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 06:48:47
         compiled from "..\template\ajax_result\friends.html" */ ?>
<?php /*%%SmartyHeaderCode:76885c1495bf1c3d26-04554259%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '0b63565c3d8bfefb4d2c03edbe087d64279b65bc' => 
    array (
      0 => '..\\template\\ajax_result\\friends.html',
      1 => 1499365822,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '76885c1495bf1c3d26-04554259',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'query' => 0,
    'result' => 0,
    'this' => 0,
    'f_song_count' => 0,
    'c' => 0,
    'limit_of_users' => 0,
    'f_display' => 0,
    'aria_hidd' => 0,
    'l_a_h' => 0,
    'u_id' => 0,
    'u_name' => 0,
    'u_fam' => 0,
    'u_photo' => 0,
    'u_c_mus' => 0,
    's_display' => 0,
    'aria_hiddr' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c1495bf4275e1_59603475',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c1495bf4275e1_59603475')) {function content_5c1495bf4275e1_59603475($_smarty_tpl) {?><!--- HTML for users from left side --->
<div class="mml_subcat_ul"><?php $_smarty_tpl->tpl_vars['aria_hiddr'] = new Smarty_variable('true', null, 0);
$_smarty_tpl->tpl_vars['s_display'] = new Smarty_variable('none;', null, 0);
$_smarty_tpl->tpl_vars['c'] = new Smarty_variable('0', null, 0);
$_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['this']->value->get_friend_songs_count($_smarty_tpl->tpl_vars['result']->value['id']);?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['f_song_count'] = new Smarty_variable($_tmp1, null, 0);
$_smarty_tpl->tpl_vars['aria_hidd'] = new Smarty_variable('false', null, 0);
$_smarty_tpl->tpl_vars['aria_hiddr'] = new Smarty_variable('true', null, 0);
$_smarty_tpl->tpl_vars['l_a_h'] = new Smarty_variable('false', null, 0);
$_smarty_tpl->tpl_vars['f_display'] = new Smarty_variable('block;', null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['u_id'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['name'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['u_name'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['surname'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['u_fam'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['profile_photo'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['u_photo'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['f_song_count']->value;?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['u_c_mus'] = new Smarty_variable($_tmp6, null, 0);
if ($_smarty_tpl->tpl_vars['c']->value===$_smarty_tpl->tpl_vars['limit_of_users']->value) {
$_smarty_tpl->tpl_vars['f_display'] = new Smarty_variable('none;', null, 0);
$_smarty_tpl->tpl_vars['s_display'] = new Smarty_variable('block;', null, 0);
$_smarty_tpl->tpl_vars['aria_hidd'] = new Smarty_variable('true', null, 0);
$_smarty_tpl->tpl_vars['aria_hiddr'] = new Smarty_variable('false', null, 0);
$_smarty_tpl->tpl_vars['l_a_h'] = new Smarty_variable('true', null, 0);
}?><div class="mml_subcat_li mus_friends" style="display:<?php echo $_smarty_tpl->tpl_vars['f_display']->value;?>
" aria-hidden="<?php echo $_smarty_tpl->tpl_vars['aria_hidd']->value;?>
" aria-hidden-live="<?php echo $_smarty_tpl->tpl_vars['l_a_h']->value;?>
" data-href="users" data-action="true" data-query="?user=<?php echo $_smarty_tpl->tpl_vars['u_id']->value;?>
"><a class="mml_subcat_btn" style="padding-bottom:41px;" data-mymus-subcat="true" title="<?php echo $_smarty_tpl->tpl_vars['u_name']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['u_fam']->value;?>
"><div class="mml_ucard"><div class="mml_ucard_img"> <img class="mml_ucard_img_cnt" src="/getPhoto?p=<?php echo $_smarty_tpl->tpl_vars['u_photo']->value;?>
&sz=small" onerror="this.style.display='none';"><img src="/music/css/images/user50__dark-redesign.png"></div><div class="mml_ucard_n"><div class="mml_ucard_n_f ellip" style="margin-top:0px;"><?php echo $_smarty_tpl->tpl_vars['u_name']->value;?>
<br><?php echo $_smarty_tpl->tpl_vars['u_fam']->value;?>
</div></div></div><div class="mml_notif mml_notif__num __on"><?php echo $_smarty_tpl->tpl_vars['u_c_mus']->value;?>
</div></a></div><?php $_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['c']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['c']->value++, true, 0);
} ?></div><div class="mus_user-search_empty" id="mUSR" style="display: <?php echo $_smarty_tpl->tpl_vars['s_display']->value;?>
;"><p class="mus_user-search_empty-tx"></p><p class="mus_user-search_empty-tx" aria-hidden="<?php echo $_smarty_tpl->tpl_vars['aria_hiddr']->value;?>
"><a id="mus_show_all_friends" class="m_c_s_c_go_to">Show all friends</a></p><div class="mml_subcat_ul"></div></div></div><?php }} ?>
