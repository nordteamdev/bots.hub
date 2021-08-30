<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 08:46:46
         compiled from "..\template\popups\p_collection.html" */ ?>
<?php /*%%SmartyHeaderCode:275405c14b16624f6c8-11547551%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '406023259d54836ef336c6ccf7e9d5aa39c029a0' => 
    array (
      0 => '..\\template\\popups\\p_collection.html',
      1 => 1499365828,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '275405c14b16624f6c8-11547551',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'query' => 0,
    'result' => 0,
    'artist' => 0,
    'title' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c14b1663d2180_47666819',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c14b1663d2180_47666819')) {function content_5c14b1663d2180_47666819($_smarty_tpl) {?>
<!------------------------ Create new collection [ popup layer ] ----------------------------->

<div id="layer_popup">
  <div class="layer_ovr">
  </div>
  <div class="playlist_add_layer_cnt mus_playlist-add mml_popup">
    <div class="portlet-i_h">
      Create a playlist
    </div>
    <div class="form">
      <div class="form_i mb-5">
        <div class="it_w noPadding">
          <input class="it vl_it" maxlength="100" type="text" id="nameOfAlbum">
          <span class="mus_playlist-add_placeholder" data-input="#nameOfAlbum">
            What'd you call it?
          </span>
        </div>
      </div>
      <div class="form_i noMargin" id="emptyPlayList">
        <div>
          
          <span>
            This playlist is empty.
          </span>
          
          <span class="m_c_s_c_go_to">
            
            <span>
              Add
            </span>
            
          </span>
        </div>
      </div>
      <div class="m_hidden mus_playlist-add_hld">
        <div class="mus_playlist-add_h">
          <div class="jcol-l">
            <div class="mus_tabs">
              
              <span class="mus_tabs_i __active">
                
                <span class="mus_tabs_i_a">
                  My music
                </span>
                
              </span>
              <span class="mus_tabs_i">
                
                <span class="mus_tabs_i_a">
                  
                  <span>
                    Selected
                  </span>
                  
                  <span class="mus_tabs_i_a_count">
                    0
                  </span>
                  
                </span>
              </span>
            </div>
          </div>
          <div class="jcol-r">
            <div class="mus_playlist-add_search">
              <input id="livesearch" class="it vl_it mus_playlist-add_livesearch">
              
              <span data-input="#livesearch" class="mus_playlist-add_placeholder">
                Search for music
              </span>
              
              <span class="mus_playlist-add_searchicon">
              </span>
              
            </div>
          </div>
        </div>
        <div class="mus_playlist-add_cnt">
          <div class="mus_playlist-add_tracks" style="height: 425px;">
            <div class="mus_playlist-add_lst">
              <ul>
                <?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
?>
                <?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['artist'] = new Smarty_variable($_tmp1, null, 0);?>
                <?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['title'] = new Smarty_variable($_tmp2, null, 0);?>
                
                <li>
                  <div class="mus-tr_i __selectable soh-s">
                    <div class="mus-tr_hld">
                      <span class="mus-tr_play __play js-mus-tr_play" id="_pm_sec_<?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"}' title="Play">
                      </span>
                      <div class="mus-tr_cnt">
                        
                        <span class="mus-tr_artist">
                          <?php echo $_smarty_tpl->tpl_vars['artist']->value;?>

                        </span>
                        &nbsp;&#8211;&nbsp; 
                        <span class="mus-tr_song">
                          <?php echo $_smarty_tpl->tpl_vars['title']->value;?>

                        </span>
                        
                      </div>
                      <div class="mus-tr_right-controls foh-s">
                        
                        <span class="mus-tr_add">
                        </span>
                        
                      </div>
                    </div>
                  </div>
                </li>
                <?php } ?>
              </ul>
            </div>
          </div>
          <div class="mus_playlist-add_shadow m_hidden">
          </div>
        </div>
        
      </div>
      <div class="form-actions">
        
        <span class="vl_btn" id="gwt-uid">
          Create
        </span>
        
        <span class="vl_a-sw ml-15 curPointer" uid="closeIntoPPL">
          Cancel
        </span>
        
      </div>
      <div class="layer_close ic ic_close">
      </div>
    </div>
    
  </div>
</div>
<?php }} ?>
