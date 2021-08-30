<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:18:58
         compiled from "..\template\radio\radio.html" */ ?>
<?php /*%%SmartyHeaderCode:302985c14b8f2941d46-63684621%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7025f6a5c56d5e28d9ac0ba5ae282652d2f742ee' => 
    array (
      0 => '..\\template\\radio\\radio.html',
      1 => 1499365828,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '302985c14b8f2941d46-63684621',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'defaultcover' => 0,
    'rows' => 0,
    'result' => 0,
    'this' => 0,
    'radio_name' => 0,
    'rd_id_name' => 0,
    'radio' => 0,
    'artist' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14b8f2b5e5b8_60423176',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14b8f2b5e5b8_60423176')) {function content_5c14b8f2b5e5b8_60423176($_smarty_tpl) {?><!--------------------------------- RADIO PAGE [ TEMPLATE ] ------------------------------->
<div class="m_c_s" aria-hidden="false"><div><div class="m_c_s_myRadio"><div class="m_c_s_header"><div class="m_c_s_headerWrapper"><div class="m_c_s_header_title">Broadcast&nbsp;</div></div></div><div class="mus_radio_w __inactive" style="height: 614px;"><div class="mus_radio" style="height: 240px;"><div class="mus_radio_noise"><div class="mus_radio_dec"><div class="mus_radio_top-grad"></div><div class="mus_radio_bot-grad"></div><div class="mus_radio_active-track"></div></div><div class="mus_album_frame usel-off"><div class="mus_album_i_w"><div class="curPointer"><div class="mus_album_side mus_album_side__a"><img alt="" width="100%" height="100%" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['defaultcover']->value;?>
"></div></div><div class="mus_album_i_play"></div></div></div><div class="mus_album"><div class="mus_radio_tracks" style="top: -90px;"><div class="mus-tr_lst mus_scroll-overlay"><div class="mus_scroll-overlay_dummy"></div><div id="radio_station_tracks"><!-- ========= there appear the tracks of radio station selected ========= ---></div></div></div></div></div><div></div></div></div><div class="mus_radio_stations_w usel-off" style="top: 240px;"><div class="mus_radio_stations_top-fader"></div><div class="mus_radio_stations mus-custom-scrolling"><div class="mus_h2"><span>Choose Station</span><a class="mus_h2_a curPointer m_hidden">Reset</a></div><div class="mus_radio_stations_lst"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['rows']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['this']->value->getRadioArtists($_smarty_tpl->tpl_vars['result']->value['genre']);?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['artist'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['genre'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['radio_name'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['this']->value->replaceRadioName($_smarty_tpl->tpl_vars['radio_name']->value);?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['radio'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['this']->value->replaceRadioWhiteSpace($_smarty_tpl->tpl_vars['radio_name']->value);?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['rd_id_name'] = new Smarty_variable($_tmp4, null, 0);?><div class="mus_radio_stations_i" id="<?php echo $_smarty_tpl->tpl_vars['radio_name']->value;?>
" data-id="<?php echo $_smarty_tpl->tpl_vars['rd_id_name']->value;?>
"><div class="mus_radio_stations_i_b"><div class="mus_radio_station_h ellip"><?php echo $_smarty_tpl->tpl_vars['radio']->value;?>
</div><div class="mus_radio_station_d_w"><div class="mus_radio_station_d ellip"><?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
 and others</div><div class="mus_radio_station_d_l">updating broadcast...</div></div></div></div><?php }
if (!$_smarty_tpl->tpl_vars['result']->_loop) {
?>The radio is empty.<?php } ?></div></div></div></div></div></div></div><?php }} ?>
