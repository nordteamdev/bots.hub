<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 06:57:18
         compiled from "..\template\my_music\collections.html" */ ?>
<?php /*%%SmartyHeaderCode:296715c1497be5eb3b7-26478260%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '0031992044e9febfa57c792d4048d887d5b24df2' => 
    array (
      0 => '..\\template\\my_music\\collections.html',
      1 => 1499365825,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '296715c1497be5eb3b7-26478260',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'pl_count' => 0,
    'query' => 0,
    'result' => 0,
    'm_pl_original_pid' => 0,
    'm_pl_id' => 0,
    'm_pl_cover' => 0,
    'm_pl_name' => 0,
    'm_pl_songs_count' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c1497be66fb71_93563127',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c1497be66fb71_93563127')) {function content_5c1497be66fb71_93563127($_smarty_tpl) {?>
<!---------- Collections [ TEMPLATE ] ------------>

<div class="mt-20  mb0"><div class="mus_h2 __left">Playlists</div><div class="mus_album-list __left" aria-hidden="false"><div><div class="mus_card_i __mymus"><div class="m_c_ppl_create"><i id="myMusicPPLCreateIco" class="m_c_ppl_create_ico"></i><div id="myMusicPPLCreateText" class="m_c_create_text">Add a playlist</div></div></div><?php if ($_smarty_tpl->tpl_vars['pl_count']->value<=0) {?><div class="gwt-HTML"><div class="m_no_ppl_container"><div class="m_no_ppl_title">You haven't created a playlist yet.</div><div>Arrange your favourite music into playlists to make it easier for your friends to listen to music on MusicWindow!<br></div></div><?php } else { ?><span class="pl-mb-90"><?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp7=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_id'] = new Smarty_variable($_tmp7, null, 0);
ob_start();?><?php echo urldecode($_smarty_tpl->tpl_vars['result']->value['name']);?>
<?php $_tmp8=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_name'] = new Smarty_variable($_tmp8, null, 0);
ob_start();?><?php echo urldecode($_smarty_tpl->tpl_vars['result']->value['favorite_cover']);?>
<?php $_tmp9=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_cover'] = new Smarty_variable($_tmp9, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['originalpid'];?>
<?php $_tmp10=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_original_pid'] = new Smarty_variable($_tmp10, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['s_count'];?>
<?php $_tmp11=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_songs_count'] = new Smarty_variable($_tmp11, null, 0);
if ($_smarty_tpl->tpl_vars['m_pl_original_pid']->value>0) {
ob_start();?><?php echo $_smarty_tpl->tpl_vars['m_pl_original_pid']->value;?>
<?php $_tmp12=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['m_pl_id'] = new Smarty_variable($_tmp12, null, 0);
}?><div class="mus_card_i wd24"><div class="mus_card __s" uid="card" id="crdI_<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
"><div class="mus_card_img_w mus_card_img_w__col"><img src="<?php echo $_smarty_tpl->tpl_vars['m_pl_cover']->value;?>
" width="100%" height="100%"><div class="mus_card_ac_lst"><span class="mus_card_ac_i mus_card_ac_i__pl" uid="pl" title="Play" data-href="playlist" data-action="true" data-query="?action=playlist&play=true&i=<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
"><span class="mus_card_play"></span>Play</span><span class="mus_card_ac_i mus_card_ac_i__ps" uid="pause" title="pause"><span class="mus_card_play __pause"></span>pause</span><span class="mus_card_ac_i mus_card_ac_i__more" title="More" data-href="playlist" data-action="true" data-query="?action=my&i=<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
"><span class="mus_card_more"></span>More</span></div></div><div class="mus_card_n_w"><div class="mus_card_n textWrap" data-href="playlist" data-action="true" data-query="?action=my&i=<?php echo $_smarty_tpl->tpl_vars['m_pl_id']->value;?>
"><span class="mus_card_n_a" title="<?php echo $_smarty_tpl->tpl_vars['m_pl_name']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['m_pl_name']->value;?>
</span></div><div class="mus_card_n_artist ellip"><?php echo $_smarty_tpl->tpl_vars['m_pl_songs_count']->value;?>
 songs</div></div></div></div><?php } ?></span><?php }?></div></div><?php }} ?>
