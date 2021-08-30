<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 09:40:53
         compiled from "..\template\popups\p_feedback.html" */ ?>
<?php /*%%SmartyHeaderCode:249705c14be150b3625-51801068%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '4f7b9aecbfe8131aad7450a9bccbb0a616dc23ab' => 
    array (
      0 => '..\\template\\popups\\p_feedback.html',
      1 => 1499365829,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '249705c14be150b3625-51801068',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'user_name' => 0,
    'user_family' => 0,
    'user_email' => 0,
    'host' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14be154b8c28_93029891',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14be154b8c28_93029891')) {function content_5c14be154b8c28_93029891($_smarty_tpl) {?>

<!---------- Feedback Popup Layer -------------------->


<div id="layer_popup" class="hookBlock" feedback-popup-layer="10" style="display: block;"><div id="hook_PopLayer_popLayer"><div class="layer_ovr _dark"></div><div id="popLayerBodyWrapper" class="modal_wrap" style="left:auto!important;visibility: visible;"><div id="popLayer_cc" class="popupSimple"><div class="mwt_cont"><table cellpadding="20" cellspacing="0" class="mw_tbl"><tbody><tr><td><div id="mp_mm_cont" class="mp_mm_cont"><div class="panelLayer layerPanelSimple" id="cfrmPopLayerHelpFeedback"><div class="panelLayer_head"><div class="layerPanelCloseContainer"><a href="javascript:void(0)"><div class="layer_close ic ic_close"></div></a></div><div class="panelLayer_head_headerSimple">Contact Support</div></div><div class="panelLayer_body"><div id="feedbackFormWrapper"><div><div class="hook" id="hook_Form_PopLayerHelpFeedbackForm"><form name="feedbackForm" action="" method="post"><div class="form form__gl-2-2" style="padding: 3px 20px 0 0;"><div class="mb-15"><font color="red">We will not be able to contact you if you will not enter your correct email address.</font></div><div class="form_i" style=""><span class="input-l"><label for="field_name">Full Name</label></span><div class="it_w"><input type="text" name="m_feedback_field_name" value="<?php echo $_smarty_tpl->tpl_vars['user_name']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['user_family']->value;?>
" id="field_name" class="it it_w__3gc" cols="35" maxlength="80" rows="3"></div><span class="input-e"></span></div><div class="form_i" style=""><span class="input-l"><label for="field_e-mail">E-mail</label></span><div class="it_w"><input type="text" name="m_feedback_u_email" value="<?php echo $_smarty_tpl->tpl_vars['user_email']->value;?>
" id="field_e-mail" class="it it_w__3gc" cols="35" maxlength="80" rows="3"></div><span class="input-e"></span></div><div class="form_i"><span class="input-l"><label for="field_subject">Subject</label></span><div class="it_w"><input type="text" name="m_feedback_u_subject" value="" id="field_subject" class="it it_w__3gc" cols="35" maxlength="80" rows="3"></div><span class="input-e"></span></div><div style=""><div class="form_i"><span class="input-l"><label for="field_message">Description</label></span><div class="itx_w"><textarea id="field_message" name="m_feedback_u_message" class="itx" cols="35" maxlength="1000" style="overflow-y: auto;" showremaining="50" rows="3"></textarea></div></div></form><form name="m_feedback_form" id="m_feedback_form" enctype="multipart/form-data"  method="post"><div class="form form__gl-2-2"><div class="form_i"><span class="input-d">Maximum file size 1024Kb</span><span class="input-l"><label for="attachment">Attach a file</label></span><div class="it_w"><input type="file" accept="image/*" name="feedback_file" value="" id="attachment"><input type="hidden" name="submit" value="submit"></div><span class="input-e"></span></div><div class="form_i"><div id="fileTransferBar" align="left" style="display: none;">Loading. Please wait.<br><br><img src="<?php echo $_smarty_tpl->tpl_vars['host']->value;?>
/music/css/images/filetransfer_220_orange.gif" alt=""></div><div id="feedback_upload_output"></div></div></div></form><div class="formButtonContainer" style="padding: 0px;"><input type="button" name="button_send" send-m-feedback="true" value="Send a message"><span class="lp vl_a-sw ml-15 curPointer">Cancel</span></div></div><input type="hidden" id="feedback_upl_file" value=""><div class="hook hookInvisible"></div><div class="hook"></div></div></div></div></div></td></tr></tbody></table></div></div></div></div></div><?php }} ?>
