<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 11:50:58
         compiled from "..\template\search\a_albums.html" */ ?>
<?php /*%%SmartyHeaderCode:271225c14dc9246a6d9-02417912%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '13053c20c7d674641fc20d7849b7caafb5a0adeb' => 
    array (
      0 => '..\\template\\search\\a_albums.html',
      1 => 1499365832,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '271225c14dc9246a6d9-02417912',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'count_a' => 0,
    'mt' => 0,
    'query_a' => 0,
    'c' => 0,
    'display_sm_art' => 0,
    'aria_hidden' => 0,
    'result' => 0,
    'count_b' => 0,
    'query_b' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14dc92ba5d03_84713677',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14dc92ba5d03_84713677')) {function content_5c14dc92ba5d03_84713677($_smarty_tpl) {?><!--------------------- Artist's albums [ template ] ------------------------->

<?php if ($_smarty_tpl->tpl_vars['count_a']->value>0) {?><div class="m_c_s_searchResult" m_mus_similar_artists="1"><div class="mus_h2 <?php echo $_smarty_tpl->tpl_vars['mt']->value;?>
">Similar artists</div><div aria-hidden="false"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query_a']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
if (($_smarty_tpl->tpl_vars['c']->value>7)) {
$_smarty_tpl->tpl_vars['display_sm_art'] = new Smarty_variable('style="display:none"', null, 0);
$_smarty_tpl->tpl_vars['aria_hidden'] = new Smarty_variable('true', null, 0);
}?><div class="mus_card_i" <?php echo $_smarty_tpl->tpl_vars['display_sm_art']->value;?>
 aria-hidden="<?php echo $_smarty_tpl->tpl_vars['aria_hidden']->value;?>
"><div class="mus_card __s" uid="card" id="crdI_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
"><div class="mus_card_img_w"><img data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['artist']);?>
" src="<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
" width="100%" height="100%"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['artist']);?>
&play=true" title="Play"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause" title="pause"><span class="mus_card_play __pause"></span>pause</span><span data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['artist']);?>
" class="mus_card_ac_i mus_card_ac_i__more" title="More"><span class="mus_card_more"></span>More</span></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['artist']);?>
"><span class="mus_card_n_a" title="<?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
"><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
</span></div></div></div></div><?php $_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['c']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['c']->value++, true, 0);
} ?><div style="width: 500px;"><span class="m_c_s_c_go_to" data-srch-mr-sm-ar="true">More artists</span></div></div></div><?php }
if ($_smarty_tpl->tpl_vars['count_b']->value>0) {?><div class="mus_separator mt-20"></div><div class="mus_h2" id="artists_albums">Artist's albums</div><div class="mus_album-list" aria-hidden="false"><div><div><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query_b']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
?><div class="mus_card_i wd24"><div class="mus_card" uid="card" id="crdI_<?php echo $_smarty_tpl->tpl_vars['result']->value['b_id'];?>
"><div class="mus_card_img_w mus_card_img_w__album"><img src="<?php echo $_smarty_tpl->tpl_vars['result']->value['b_cover'];?>
" class="mus_card_img" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_artist']);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_album']);?>
"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_artist']);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_album']);?>
&play=true"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause"><span class="mus_card_play __pause"></span>pause</span><span class="mus_card_ac_i mus_card_ac_i__more" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_artist']);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_album']);?>
"><span class="mus_card_more"></span>More</span></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap"><span class="mus_card_n_a" data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_artist']);?>
&alb=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_album']);?>
" title="<?php echo $_smarty_tpl->tpl_vars['result']->value['b_album'];?>
"><?php echo $_smarty_tpl->tpl_vars['result']->value['b_album'];?>
</span></div><div class="mus_card_n_artist ellip"><span class="mus_card_n_artist_a" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=<?php echo urlencode($_smarty_tpl->tpl_vars['result']->value['b_artist']);?>
" title="<?php echo $_smarty_tpl->tpl_vars['result']->value['b_artist'];?>
"><?php echo $_smarty_tpl->tpl_vars['result']->value['b_artist'];?>
</span></div></div></div></div><?php } ?></div></div></div><?php } else { ?><div class="mus_h2">Sorry, but did't found any albums</div><?php }?><?php }} ?>
