<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 08:36:42
         compiled from "..\template\popups\p_upload.html" */ ?>
<?php /*%%SmartyHeaderCode:17945c14af0acb2625-12696076%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'b264792164cba8aaada5b43083cc1fd4c265e63c' => 
    array (
      0 => '..\\template\\popups\\p_upload.html',
      1 => 1499365825,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '17945c14af0acb2625-12696076',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'this' => 0,
    'host' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14af0b0415c2_90903579',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14af0b0415c2_90903579')) {function content_5c14af0b0415c2_90903579($_smarty_tpl) {?>
<!--------------- Upload files [ popup layer ] -------------------------->

<div id="layer_popup"><div class="layer_ovr"></div><div class="up_music_layer_cnt" ><?php if ($_smarty_tpl->tpl_vars['this']->value->allow_upload_songs==="true") {?><div class="mus_upload_title">By clicking "Select files" you accept and agree to abide by the terms and conditions of&nbsp;<a href="http://<?php echo $_smarty_tpl->tpl_vars['host']->value;?>
/terms_and_condition.html" target="_blank" class="mus_upload_a il">regulations</a>.</div><div class="mus_upload_cnt"><label class="vl_btn" tabindex="0"><span>Select files</span><form name="musicformn" id="musicform" enctype="multipart/form-data"  method="post"><input type="hidden" data-upload-hiden="true" name="uploadin" value="mymusic"><input type="hidden" data-upload-playlist-cover="true" name="pl_cover" value=""><input accept="audio/mpeg" class="vl_btn_it" multiple="multiple" id="files" name="files[]" size="1" title="" type="file" value=""></form></label></div><div class="mus_upload_tx">You should upload music files in MP3 format. Uploaded<br>file should meet the following technical requirements: bit rate not less than<br>128kbps, sampling frequency not less than 44,1 kHz.<br>Uploaded file should contain in IS3-tags the info on the singer<br>the title of the song and the name of the album, where it is published.</div><?php } else { ?><div class="fff">The upload section is closed for the moment, please retry later.</div><?php }?><span class="layer_close ic ic_close"></span></div></div>
<?php }} ?>
