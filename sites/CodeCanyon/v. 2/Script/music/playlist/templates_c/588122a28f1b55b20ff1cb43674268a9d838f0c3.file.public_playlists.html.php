<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 06:55:03
         compiled from "..\template\playlist\public_playlists.html" */ ?>
<?php /*%%SmartyHeaderCode:39925c149737820a39-85283927%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '588122a28f1b55b20ff1cb43674268a9d838f0c3' => 
    array (
      0 => '..\\template\\playlist\\public_playlists.html',
      1 => 1499365825,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '39925c149737820a39-85283927',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'rows' => 0,
    'res' => 0,
    'days' => 0,
    'pl_id' => 0,
    'pl_songs_count' => 0,
    'pl_cover' => 0,
    'pl_name' => 0,
    'pl_new' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c149737a89cf9_73820166',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c149737a89cf9_73820166')) {function content_5c149737a89cf9_73820166($_smarty_tpl) {?><!------------------------------------- Playlists [template] ------------------------------------------>

<div class="mus_content_w"><div class="pl-mb-90"><!-- foreach loop --><?php  $_smarty_tpl->tpl_vars['res'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['res']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['rows']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['res']->key => $_smarty_tpl->tpl_vars['res']->value) {
$_smarty_tpl->tpl_vars['res']->_loop = true;
ob_start();?><?php echo urldecode($_smarty_tpl->tpl_vars['res']->value['name']);?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['pl_name'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo strtotime($_smarty_tpl->tpl_vars['days']->value,$_smarty_tpl->tpl_vars['res']->value['added']);?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['pl_new'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['res']->value['id'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['pl_id'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['res']->value['songs_count'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['pl_songs_count'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['res']->value['favorite_cover'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['pl_cover'] = new Smarty_variable($_tmp5, null, 0);?><div class="mus_card_i"><div id="crdI_<?php echo $_smarty_tpl->tpl_vars['pl_id']->value;?>
" data-pl-count="<?php echo $_smarty_tpl->tpl_vars['pl_songs_count']->value;?>
" class="mus_card" uid="card"><div class="col-card"><div class="mus_card_img_w mus_card_img_w__col"><img src="<?php echo $_smarty_tpl->tpl_vars['pl_cover']->value;?>
" class="mus_card_img"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" data-href="playlist" data-action="true" data-query="?action=playlist&play=true&i=<?php echo $_smarty_tpl->tpl_vars['pl_id']->value;?>
"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause"><span class="mus_card_play __pause"></span>Pause</span><span class="mus_card_ac_i mus_card_ac_i__add" uid="add"><span class="mus_card_add"></span>add</span><span class="mus_card_ac_i mus_card_ac_i__success"><span class="mus_card_add __added"></span>Added</span><span class="mus_card_ac_i mus_card_ac_i__more" data-href="playlist" data-action="true" data-query="?action=playlist&i=<?php echo $_smarty_tpl->tpl_vars['pl_id']->value;?>
"><span class="mus_card_more"></span>more</span></div></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap" data-href="playlist" data-action="true" data-query="?action=playlist&i=<?php echo $_smarty_tpl->tpl_vars['pl_id']->value;?>
"><span class="mus_card_n_a" title="<?php echo $_smarty_tpl->tpl_vars['pl_name']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['pl_name']->value;?>
</span></div></div><?php if ($_smarty_tpl->tpl_vars['pl_new']->value>=time()) {?><span class="mus_card_new"><?php }?></span></div></div><?php }
if (!$_smarty_tpl->tpl_vars['res']->_loop) {
?><div style="margin:10px 0px 10px;">Sorry, but there no playlists.</div><?php } ?></div></div><?php }} ?>
