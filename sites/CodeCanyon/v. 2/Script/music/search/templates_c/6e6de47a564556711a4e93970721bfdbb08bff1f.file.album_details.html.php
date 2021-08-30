<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:51:19
         compiled from "..\template\search\album_details.html" */ ?>
<?php /*%%SmartyHeaderCode:276065c14c0876a1e89-78540584%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '6e6de47a564556711a4e93970721bfdbb08bff1f' => 
    array (
      0 => '..\\template\\search\\album_details.html',
      1 => 1499365833,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '276065c14c0876a1e89-78540584',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'query_a' => 0,
    'result' => 0,
    'al_s_lg' => 0,
    'this' => 0,
    'play' => 0,
    'al_s_id' => 0,
    'c' => 0,
    'al_s_cv' => 0,
    'al_s_al' => 0,
    'count' => 0,
    'al_s_ar' => 0,
    'download' => 0,
    'al_s_pt' => 0,
    'al_s_tt' => 0,
    'al_s_tm' => 0,
    'al_s_vd' => 0,
    'ot_count' => 0,
    'query_b' => 0,
    'oc' => 0,
    'ot_alb_id' => 0,
    'ot_alb_cv' => 0,
    'ot_alb_ar' => 0,
    'ot_alb_nm' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14c087c59097_54369462',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14c087c59097_54369462')) {function content_5c14c087c59097_54369462($_smarty_tpl) {?><!--------------------- Album details [ Template ] --------------------------->

<span class="m_c_s_searchResult pl-mb-90"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query_a']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_id'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_tt'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_ar'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_al'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['video'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_vd'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_tm'] = new Smarty_variable($_tmp6, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_cv'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_pt'] = new Smarty_variable($_tmp8, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['language'];?>
<?php $_tmp9=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['al_s_lg'] = new Smarty_variable($_tmp9, null, 0);
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
if ($_smarty_tpl->tpl_vars['al_s_lg']->value===$_smarty_tpl->tpl_vars['this']->value->purchase_ic) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
}
if ($_smarty_tpl->tpl_vars['play']->value>0) {?><div style="display:none;" id="this_playlist_active" data-collection-play="<?php echo $_smarty_tpl->tpl_vars['al_s_id']->value;?>
"></div><?php }
if ($_smarty_tpl->tpl_vars['c']->value===0) {?><div class="mus_content_w" id="windowMusic_search_container"><div class="mus_album"><div class="mus_album_i__absolute" parent-for-cover="true"><div class="mus_album_i_w"><div class="mus_card_img_w mus_card_img_w__album"><img class="mus_card_img" src="<?php echo $_smarty_tpl->tpl_vars['al_s_cv']->value;?>
"></div></div><div class="m_c_col-data"><div class="m_c_col-data_ac"><a class="mtico mus-dl m_c_col-data_ac_i __14" data-search-res-add="<?php echo $_smarty_tpl->tpl_vars['al_s_id']->value;?>
" data-search-res-name="<?php echo $_smarty_tpl->tpl_vars['al_s_al']->value;?>
" data-search-res-count="<?php echo $_smarty_tpl->tpl_vars['count']->value;?>
"><i class="mic14 mic14_add"></i><span id="alBM_st">Add to My music</span></a></div></div></div><div class="mus_h2"><span class="mus_h2_tx ellip" m_ppl_title="true" data-id="<?php echo $_smarty_tpl->tpl_vars['al_s_id']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['al_s_al']->value;?>
</span></div><div class="mus_h3 ellip"><div class="mus_h2_tx ellip" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['al_s_ar']->value);?>
"><span class="mus-dl"><?php echo $_smarty_tpl->tpl_vars['al_s_ar']->value;?>
</span></div></div><div class="mus-tr_lst mus_scroll-overlay"><div class="mus_scroll-overlay_dummy"></div><ol data-for-serialize="true"><?php }?><li target="#p18m_sec_album_<?php echo $_smarty_tpl->tpl_vars['al_s_id']->value;?>
"><div class="mus-tr_i  __has-video soh-s <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="tri_m_sec_album_<?php echo $_smarty_tpl->tpl_vars['al_s_id']->value;?>
"><div class="mus-tr_hld"><span class="mus-tr_play __play js-mus-tr_play" id="p18m_sec_album_<?php echo $_smarty_tpl->tpl_vars['al_s_id']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['al_s_pt']->value;?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['al_s_cv']->value;?>
"}' ></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a style="display:none;" class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['al_s_ar']->value;?>
</a><a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['al_s_tt']->value;?>
</a><span class="foh-s mus-tr_info"></span></div><div class="mus-tr_right-controls foh-s" id="rc_m_sec_album_<?php echo $_smarty_tpl->tpl_vars['al_s_id']->value;?>
"><span class="mus-tr_add js-mus-tr_add" title="Add to My music"></span><span class="mus-tr_dropdown js-mus_dropdown_trigger" title="Add to the playlist"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['al_s_tm']->value;?>
</span></div><?php if ($_smarty_tpl->tpl_vars['al_s_vd']->value>'0') {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['al_s_vd']->value;?>
"></div><?php }?></div></li><?php $_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['c']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['c']->value++, true, 0);
} ?></ol></div><?php if ($_smarty_tpl->tpl_vars['count']->value<3) {?><div class="m_album_upload mt-10">Some songs are missing from the album?</div><a class="m_album_upload m_c_s_c_go_to" data-href="mymusic">Upload</a><?php }?></div><?php if ($_smarty_tpl->tpl_vars['ot_count']->value>0) {
$_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query_b']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp10=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['ot_alb_id'] = new Smarty_variable($_tmp10, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp11=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['ot_alb_ar'] = new Smarty_variable($_tmp11, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
<?php $_tmp12=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['ot_alb_cv'] = new Smarty_variable($_tmp12, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp13=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['ot_alb_nm'] = new Smarty_variable($_tmp13, null, 0);
if ($_smarty_tpl->tpl_vars['oc']->value===0) {?><div class="mus_h2" id="gwt-uid-435">Other artist's albums</div><div class="mus_album-list"><div><div><?php }?><div class="mus_card_i wd24"><div class="mus_card" uid="card" id="crdI_<?php echo $_smarty_tpl->tpl_vars['ot_alb_id']->value;?>
"><div class="mus_card_img_w mus_card_img_w__album"><img src="<?php echo $_smarty_tpl->tpl_vars['ot_alb_cv']->value;?>
" class="mus_card_img" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_nm']->value);?>
"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_nm']->value);?>
&play=true"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause"><span class="mus_card_play __pause"></span>pause</span><span class="mus_card_ac_i mus_card_ac_i__more" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_nm']->value);?>
"><span class="mus_card_more"></span>More</span></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_ar']->value);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_nm']->value);?>
"><span class="mus_card_n_a" title="<?php echo $_smarty_tpl->tpl_vars['ot_alb_nm']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['ot_alb_nm']->value;?>
</span></div><div class="mus_card_n_artist ellip"><span data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['ot_alb_ar']->value);?>
" class="mus_card_n_artist_a" title="<?php echo $_smarty_tpl->tpl_vars['ot_alb_ar']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['ot_alb_ar']->value;?>
</span></div></div></div></div><?php $_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['oc']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['oc']->value++, true, 0);
}
}?><?php }} ?>
