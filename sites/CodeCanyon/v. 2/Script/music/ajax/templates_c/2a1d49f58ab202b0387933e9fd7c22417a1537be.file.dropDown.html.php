<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 07:27:28
         compiled from "..\template\ajax_result\dropDown.html" */ ?>
<?php /*%%SmartyHeaderCode:262795c149ed08fa7f7-71725908%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2a1d49f58ab202b0387933e9fd7c22417a1537be' => 
    array (
      0 => '..\\template\\ajax_result\\dropDown.html',
      1 => 1499365822,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '262795c149ed08fa7f7-71725908',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'count' => 0,
    'query' => 0,
    'result' => 0,
    'd' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c149ed0a416c3_26089890',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c149ed0a416c3_26089890')) {function content_5c149ed0a416c3_26089890($_smarty_tpl) {?><!---------- DropDown for add songs to the playlist --------->
<div class="mus_dropDown_active"><div class="mus_dropdown_w __active"><div class="mus_dropdown"><ul class="mus_dropdown_lst"><?php if ($_smarty_tpl->tpl_vars['count']->value>0) {
$_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
?><li data-hv-pl="true" class="mus_dropdown_i" pid="<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><a class="mus_dropdown_a mus-tr_a" uid="personalPL" ><?php echo urldecode($_smarty_tpl->tpl_vars['result']->value['name']);?>
<i class="fader-img"></i></a></li><?php }
} else { ?><div class="textWrap mus_dropdown_txt">You doesn't have any<br>playlists yet.<?php if ($_smarty_tpl->tpl_vars['d']->value==='') {?><br>Create one by entering<br>the title:</div><?php }
}
if ($_smarty_tpl->tpl_vars['d']->value==='') {?><li class="mus_dropdown_i"><div class="mus_dropdown_f"><a class="mus_dropdown_f_a mtico tdn"><i class="mic12 mic12_add" uid="addPersonalPL"></i><label uid="addPersonalPL" for="inputId" class="mus-tr_il">&nbsp;Add a playlist</label></a><div class="m_add_ppl_input_cont" id="addPersonalPLInputWrapper"><div class="m_add_ppl_input_wrapper"><input uid="pplName" class="m_add_ppl_input" maxlength="100"><div class="m_ppl_input_enter"><i class="tico_img m_enter_ppl_ico" uid="createPPL"></i></div></div></div></div></li></ul></div></div></div><?php }?><?php }} ?>
