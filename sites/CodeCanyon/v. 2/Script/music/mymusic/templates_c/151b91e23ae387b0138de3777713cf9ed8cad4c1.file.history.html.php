<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:15:34
         compiled from "..\template\my_music\history.html" */ ?>
<?php /*%%SmartyHeaderCode:99815c14b826dc1c39-05633901%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '151b91e23ae387b0138de3777713cf9ed8cad4c1' => 
    array (
      0 => '..\\template\\my_music\\history.html',
      1 => 1499365822,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '99815c14b826dc1c39-05633901',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'count' => 0,
    'this' => 0,
    'query' => 0,
    'result' => 0,
    'track_lang' => 0,
    'curr_year' => 0,
    'date' => 0,
    'day' => 0,
    'today' => 0,
    'yday' => 0,
    'condition' => 0,
    'nmt' => 0,
    'todaycl' => 0,
    's_id' => 0,
    'download' => 0,
    's_path' => 0,
    's_cover' => 0,
    'artist' => 0,
    'song' => 0,
    'album' => 0,
    's_time' => 0,
    'track_video' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14b827257926_20156604',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14b827257926_20156604')) {function content_5c14b827257926_20156604($_smarty_tpl) {?>
<!-------------------------- RECENTLY PLAYED (History) [ TEMPLATE ] -------------------->

<?php if ($_smarty_tpl->tpl_vars['count']->value<=0) {?><div class="pplmus_stub"><div class="mus_content_w"><div class="noMusic_c"><div class="ppl_empty_layer_hld"><div class="history_empty_layer_cnt"><div class="portlet-i_h">Here are displayed<br>all played songs</div><div class="mb-15"><span>Press button</span><span class="mus_stub_play"></span><span>to start<br>playback.</span></div><img alt="" src="<?php echo $_smarty_tpl->tpl_vars['this']->value->musicimg;?>
mus_stub_playlist.png"></div></div></div><?php } else { ?><div class="mus_history_cnt"><ol><?php $_smarty_tpl->tpl_vars['todaycl'] = new Smarty_variable('', null, 0);
$_smarty_tpl->tpl_vars['nmt'] = new Smarty_variable('', null, 0);
$_smarty_tpl->tpl_vars['date'] = new Smarty_variable('', null, 0);
$_smarty_tpl->tpl_vars['day'] = new Smarty_variable('', null, 0);
$_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['s_id'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_id'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_path'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_cover'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['s_time'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['artist'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['song'] = new Smarty_variable($_tmp6, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['album'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['video'];?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_video'] = new Smarty_variable($_tmp8, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['language'];?>
<?php $_tmp9=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_lang'] = new Smarty_variable($_tmp9, null, 0);
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
if ($_smarty_tpl->tpl_vars['track_lang']->value===$_smarty_tpl->tpl_vars['this']->value->show_prch_icon) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
}
if ($_smarty_tpl->tpl_vars['curr_year']->value===date('Y',$_smarty_tpl->tpl_vars['result']->value['listen'])) {
$_smarty_tpl->tpl_vars['date'] = new Smarty_variable(date('j F',$_smarty_tpl->tpl_vars['result']->value['listen']), null, 0);
$_smarty_tpl->tpl_vars['day'] = new Smarty_variable(explode(' ',$_smarty_tpl->tpl_vars['date']->value), null, 0);
} else {
$_smarty_tpl->tpl_vars['date'] = new Smarty_variable(date('d.m.Y',$_smarty_tpl->tpl_vars['result']->value['listen']), null, 0);
$_smarty_tpl->tpl_vars['day'] = new Smarty_variable(explode('.',$_smarty_tpl->tpl_vars['date']->value), null, 0);
}
if ($_smarty_tpl->tpl_vars['day']->value[0]===$_smarty_tpl->tpl_vars['today']->value) {
$_smarty_tpl->tpl_vars['date'] = new Smarty_variable('Today', null, 0);
$_smarty_tpl->tpl_vars['todaycl'] = new Smarty_variable('today', null, 0);
$_smarty_tpl->tpl_vars['nmt'] = new Smarty_variable('__no-mt', null, 0);
} elseif ($_smarty_tpl->tpl_vars['day']->value[0]===$_smarty_tpl->tpl_vars['yday']->value) {
$_smarty_tpl->tpl_vars['date'] = new Smarty_variable('Yesterday', null, 0);
}
if ($_smarty_tpl->tpl_vars['condition']->value!==$_smarty_tpl->tpl_vars['day']->value[0]) {?><div class="mus_timestamp <?php echo $_smarty_tpl->tpl_vars['nmt']->value;?>
"><div class="mus_timestamp_cnt"><div class="mus_timestamp_tx <?php echo $_smarty_tpl->tpl_vars['todaycl']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['date']->value;?>
</div></div></div><?php }?><li target="#p0m_sec_history_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><div class="mus-tr_i __has-video soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="tri_m_sec_history_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="p0m_sec_history_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['s_path']->value;?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['s_cover']->value;?>
"}'></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['song']->value;?>
</a><span class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['album']->value;?>
</a></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_history_<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['s_time']->value;?>
</span></div><?php if ($_smarty_tpl->tpl_vars['track_video']->value>'0') {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['track_video']->value;?>
"></div><?php }?></div></li><?php $_smarty_tpl->tpl_vars['condition'] = new Smarty_variable($_smarty_tpl->tpl_vars['day']->value[0], null, 0);
} ?></ol></div><div id="history_page_active"></div><div style="position:relative;bottom:-10px;padding:20px;left:45%;" id="history_dmm_scr_load"></div><?php }?>
    <?php }} ?>
