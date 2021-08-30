<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:51:28
         compiled from "..\template\search\a_more_result.html" */ ?>
<?php /*%%SmartyHeaderCode:45225c14c090c1ce16-32344062%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f0758a9084ed0107c9aae773e1af900ed086f536' => 
    array (
      0 => '..\\template\\search\\a_more_result.html',
      1 => 1499365832,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '45225c14c090c1ce16-32344062',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'mrs' => 0,
    'this' => 0,
    'count' => 0,
    'query' => 0,
    'result' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14c090ef7bc5_44455373',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14c090ef7bc5_44455373')) {function content_5c14c090ef7bc5_44455373($_smarty_tpl) {?><!------------------ More results by respectively artist [ template ] ---------------------------->
<?php if ($_smarty_tpl->tpl_vars['mrs']->value!==false) {
echo $_smarty_tpl->tpl_vars['this']->value->search_build_header($_smarty_tpl->tpl_vars['this']->value->keyword);?>
<div class="m_c_s_scrollable" style="height: 590px;"><div class="mus_content_w" aria-hidden="false"><div><div class="mus_content_w mt-15"><?php }
if ($_smarty_tpl->tpl_vars['count']->value>0) {
if ($_smarty_tpl->tpl_vars['mrs']->value===false) {?><span class="gwt-InlineHTML"><div class="mus_separator mt-50"></div><div class="mus_h2">More Results</div></span><div id="search_result_more_artist"><?php }
$_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
?><div class="mus_card_i"><div class="mus_card" uid="card" id="crdI_<?php echo $_smarty_tpl->tpl_vars['result']->value['m_id'];?>
"><div  class="mus_card_img_w"><img src="<?php echo $_smarty_tpl->tpl_vars['result']->value['m_cover'];?>
" class="mus_card_img" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['m_artist']);?>
"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['m_artist']);?>
&play=true"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause"><span class="mus_card_play __pause"></span>pause</span><span class="mus_card_ac_i mus_card_ac_i__more" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['m_artist']);?>
"><span class="mus_card_more"></span>More</span></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['m_artist']);?>
"><span class="mus_card_n_a" title="<?php echo $_smarty_tpl->tpl_vars['result']->value['m_artist'];?>
"><?php echo $_smarty_tpl->tpl_vars['result']->value['m_artist'];?>
</span></div></div></div></div><?php }
} else {
if ($_smarty_tpl->tpl_vars['mrs']->value!==false) {
echo $_smarty_tpl->tpl_vars['this']->value->empty_result(null,null,'No artists that matched to your search');
}
}?><?php }} ?>
