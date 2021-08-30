<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 11:51:42
         compiled from "..\template\search\albums.html" */ ?>
<?php /*%%SmartyHeaderCode:281935c14dcbe958392-61438940%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'c357a7b063cbeb352d221e8e5d01ced8d98e7400' => 
    array (
      0 => '..\\template\\search\\albums.html',
      1 => 1499365832,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '281935c14dcbe958392-61438940',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'query' => 0,
    'result' => 0,
    'this' => 0,
    'alb_id' => 0,
    'alb_cv' => 0,
    'alb_ar' => 0,
    'alb_nm' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14dcbebc3bc5_51628914',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14dcbebc3bc5_51628914')) {function content_5c14dcbebc3bc5_51628914($_smarty_tpl) {?>
<!------------------ Albums [template] ----------------------->
<div class="m_c_s_scrollable mus-custom-scrolling pl-mb-90" style="height: 590px;"><div class="mus_content_w"><div class="mus_content_w" aria-hidden="false"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['alb_id'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['this']->value->defaultCover;?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['alb_cv'] = new Smarty_variable($_tmp2, null, 0);
if ($_smarty_tpl->tpl_vars['result']->value['cover']!==$_smarty_tpl->tpl_vars['this']->value->defaultCover) {
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['alb_cv'] = new Smarty_variable($_tmp3, null, 0);
}
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['alb_nm'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['alb_ar'] = new Smarty_variable($_tmp5, null, 0);?><div class="mus_card_i"><div class="mus_card" uid="card" id="crdI_<?php echo $_smarty_tpl->tpl_vars['alb_id']->value;?>
"><div class="mus_card_img_w mus_card_img_w__album"><img src="<?php echo $_smarty_tpl->tpl_vars['alb_cv']->value;?>
" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_nm']->value);?>
" class="mus_card_img"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_nm']->value);?>
&play=true"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause"><span class="mus_card_play __pause"></span>pause</span><span class="mus_card_ac_i mus_card_ac_i__more" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_nm']->value);?>
"><span class="mus_card_more"></span>More</span></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_nm']->value);?>
"><span class="mus_card_n_a" title="<?php echo $_smarty_tpl->tpl_vars['alb_nm']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['alb_nm']->value;?>
</span></div><div class="mus_card_n_artist ellip"><span class="mus_card_n_artist_a" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['alb_ar']->value);?>
" title="<?php echo $_smarty_tpl->tpl_vars['alb_ar']->value;?>
" uid="art"><?php echo $_smarty_tpl->tpl_vars['alb_ar']->value;?>
</span></div></div></div></div><?php } ?></div></div></div><?php }} ?>
