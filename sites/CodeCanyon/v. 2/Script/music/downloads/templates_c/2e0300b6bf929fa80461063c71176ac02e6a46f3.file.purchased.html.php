<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 08:42:13
         compiled from "..\template\purchased\purchased.html" */ ?>
<?php /*%%SmartyHeaderCode:184515c14b0552e1c45-09378625%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2e0300b6bf929fa80461063c71176ac02e6a46f3' => 
    array (
      0 => '..\\template\\purchased\\purchased.html',
      1 => 1499365828,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '184515c14b0552e1c45-09378625',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'count' => 0,
    '_COOKIE' => 0,
    'rows' => 0,
    'row' => 0,
    's_id' => 0,
    's_path' => 0,
    's_cover' => 0,
    'c_tkm' => 0,
    's_artist' => 0,
    's_song' => 0,
    's_album' => 0,
    's_time' => 0,
    's_video' => 0,
    'random_song' => 0,
    'result' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14b055618594_88500489',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14b055618594_88500489')) {function content_5c14b055618594_88500489($_smarty_tpl) {?>
<!-------------------------------  My purchased music [ template ] --------------------->
<?php if ($_smarty_tpl->tpl_vars['count']->value>0) {?><div class="mus_content_w"><div class="mus-tr_lst mus_scroll-overlay"><div class="mus_scroll-overlay_dummy"></div><ol><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['_COOKIE']->value['tk_m'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['c_tkm'] = new Smarty_variable($_tmp1, null, 0);
$_smarty_tpl->tpl_vars['row'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['row']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['rows']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['row']->key => $_smarty_tpl->tpl_vars['row']->value) {
$_smarty_tpl->tpl_vars['row']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['id'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_id'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['path'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_path'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['cover'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_cover'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['video'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_video'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['time'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_time'] = new Smarty_variable($_tmp6, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['artist'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_artist'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['title'];?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_song'] = new Smarty_variable($_tmp8, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['row']->value['album'];?>
<?php $_tmp9=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_album'] = new Smarty_variable($_tmp9, null, 0);?><li target="#p0m_sec_purchased_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><div class="mus-tr_i __has-video soh-s __download" id="tri_m_sec_purchased_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="p0m_sec_purchased_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['s_path']->value;?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['s_cover']->value;?>
"}'></span><span class="mus-tr_download js-mus-tr_download" title="Download" onclick='window.open("download.php?file=<?php echo $_smarty_tpl->tpl_vars['s_path']->value;?>
&tk=<?php echo $_smarty_tpl->tpl_vars['c_tkm']->value;?>
", "_self","location=no, width=50,height=50,titlebar=no,menubar=no");'></span><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['s_artist']->value;?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['s_song']->value;?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['s_album']->value;?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_purchased_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['s_time']->value;?>
</span></div><?php if ($_smarty_tpl->tpl_vars['s_video']->value>0) {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['s_video']->value;?>
"></div><?php }?></div></li><?php } ?></ol></div><!--- recommended section for purchase another songs ---></div></div><div class="m_recommendations_w js-hide-in-edit js-m_recommendations_w __visible-teaser"><div class="m_recommendations"><div class="m_recommendations_cnt"><span class="ic ic_close m_recommendations_close" title="OK"></span><div class="mus_h2 m_recommendations_h">Similar to your songs</div><div class="m_recommendations_track-list"><div class="mus-tr_lst mus_scroll-overlay"></div></div><div class="m_recommendations_more"><span class="m_c_s_c_go_to">Show more songs</span></div></div><div class="m_recommendations_teaser"><span>We have found songs that will suit you.</span><span class="m_c_s_c_go_to">&nbsp;Show.</span></div></div></div><?php } else { ?><div style="height:100%;overflow:hidden;" class="mus_stub"><div class="mus_content_w"><div><div><div class="purchased_empty_layer_cnt"><div class="portlet-i_h">Listen. Buy. Download.</div><div class="mb-15"><div>If you see a green flag next to the "Play" button, it means that this song is also available for download.</div><div class="mus_stub_track"><div class="mus-tr_lst mus_scroll-overlay"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['random_song']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
?><ol><li target="#p0m_sec_featured_download_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><div class="mus-tr_i  __has-video soh-s __download" id="tri_m_sec_featured_download_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="p0m_sec_featured_download_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"}'></span><span class="mus-tr_download js-mus-tr_download" onclick="call_buy_popup(this);" title="Download"></span><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_featured_download_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
</span></div></div></div></div></li></ol><?php } ?><div>Download your favorite music to your computer, phone or<br>tablet and enjoy it anytime you want.</div></div></div><?php }?><?php }} ?>
