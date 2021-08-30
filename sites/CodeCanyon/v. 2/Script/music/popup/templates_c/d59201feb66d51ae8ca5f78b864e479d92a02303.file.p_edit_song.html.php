<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 08:42:24
         compiled from "..\template\popups\p_edit_song.html" */ ?>
<?php /*%%SmartyHeaderCode:324775c14b0604a23c2-98010580%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd59201feb66d51ae8ca5f78b864e479d92a02303' => 
    array (
      0 => '..\\template\\popups\\p_edit_song.html',
      1 => 1499365825,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '324775c14b0604a23c2-98010580',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    's_artist' => 0,
    's_title' => 0,
    's_album' => 0,
    'allow_change_cover' => 0,
    's_cover' => 0,
    's_id' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14b0605900e3_30346881',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14b0605900e3_30346881')) {function content_5c14b0605900e3_30346881($_smarty_tpl) {?>
<!-------------------------- Edit song [ popup layer ] --------------------->



<div id="layer_popup">
  <div class="layer_ovr">
    </div>
    <div class="track_edit_layer_cnt mml_popup">
      <div class="portlet-i_h mb-25">
        Info about the song
      </div>
      <div class="form form__gl-1-2">
        <div class="form_i mb-5">
          <label>
            
            <span class="input-l">
              Artist
            </span>
            <div class="it_w">
              <input data-query="mus_artist" class="it vl_it tred" maxlength="256" type="text" value="<?php echo $_smarty_tpl->tpl_vars['s_artist']->value;?>
">
            </div>
          </label>
        </div>
        <div class="form_i mb-5">
          <label>
            
            <span class="input-l">
              Title
            </span>
            <div class="it_w">
              <input data-query="mus_title" class="it vl_it tred" maxlength="256" type="text" value="<?php echo $_smarty_tpl->tpl_vars['s_title']->value;?>
">
            </div>
          </label>
        </div>
        <div class="form_i mb-5">
          <label>
            
            <span class="input-l">
              Album
            </span>
            <div class="it_w">
              <input data-query="mus_album" class="it vl_it tred" maxlength="256" type="text" value="<?php echo $_smarty_tpl->tpl_vars['s_album']->value;?>
">
            </div>
          </label>
        </div>
	<?php if ($_smarty_tpl->tpl_vars['allow_change_cover']->value) {?>
        <div class="form_i mb-5">
          <label>
            
            <span class="input-l">
              Cover
            </span>
            <div class="it_w">
              <input id="cover_input" style="opacity:.5;cursor:not-allowed" disabled="true" data-query="mus_cover" class="it vl_it tred" maxlength="256" type="text" value="<?php echo $_smarty_tpl->tpl_vars['s_cover']->value;?>
">

	      <div class="song_editable_info" style="font-size: 11px;white-space: nowrap;margin-left: -23px;">
	      <input onclick="var el = document.getElementById('cover_input'); if(!this.che) { this.che=true; el.removeAttribute('disabled');el.removeAttribute('style');}else{ this.che=false; el.setAttribute('disabled','true');el.setAttribute('style','opacity:.5;cursor:not-allowed;');}" type="checkbox" style="vertical-align: bottom;height: 11px;cursor: pointer;">Please enter a valid cover URL for respective song</div>
	      
            </div>
          </label>
        </div>
<?php } else { ?>
<div style="text-align: center;color: #C1C0C0;font-size: 8pt;">* This song contains its original cover and can't be changed.</div>
<?php }?>
      </div>
      <div class="form-actions">
        <button class="vl_btn" data-track="<?php echo $_smarty_tpl->tpl_vars['s_id']->value;?>
" data-action="trackSaveChanges">
          Ready
        </button>
        <span class="vl_a-sw ml-15 curPointer">
          Cancel
        </span>
        
      </div>
      
      <span class="layer_close ic ic_close">
      </span>
      
    </div>
    
</div>

<?php }} ?>
