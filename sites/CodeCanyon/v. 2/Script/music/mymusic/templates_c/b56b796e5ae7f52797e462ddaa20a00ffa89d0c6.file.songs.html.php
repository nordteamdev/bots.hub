<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 06:57:18
         compiled from "..\template\my_music\songs.html" */ ?>
<?php /*%%SmartyHeaderCode:280705c1497be245a93-86493014%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'b56b796e5ae7f52797e462ddaa20a00ffa89d0c6' => 
    array (
      0 => '..\\template\\my_music\\songs.html',
      1 => 1499365822,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '280705c1497be245a93-86493014',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'count_a' => 0,
    'query' => 0,
    'condition' => 0,
    'defaultCover' => 0,
    'result' => 0,
    'this' => 0,
    'track_lang' => 0,
    'trackId' => 0,
    'download' => 0,
    'artist' => 0,
    'title' => 0,
    'album' => 0,
    'track_video' => 0,
    'count_b' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c1497be5620b6_95603436',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c1497be5620b6_95603436')) {function content_5c1497be5620b6_95603436($_smarty_tpl) {?><!-------------------------- My Music [ TEMPLATE ] ------------------>



<?php if ($_smarty_tpl->tpl_vars['count_a']->value<=0) {?>
        
        <div class="noMusic_c">
          <div class="mus_stub">
            <div class="no_mus_layer_hld">
              <div class="nomusic_layer_cnt">
                <div class="portlet_no-i_h">
                  Add more music!
                </div>
                <div class="mb-15">
                  
                  <span>
                    In order to add song to the list of your favorite music, 
                    <br>
                    press
                  </span>
                  
                  <span class="mus_stub_plus">
                  </span>
                  <span>
                    near to its title
                  </span>
                  
                </div>
                
                <img alt="" src="../css/images/mus_stub_mymusic.png">
                
              </div>
            </div>
            <div class="mus_stub_collection">
              Friends' music
            </div>
            <div class="mus_stub_search">
              Easy search
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  
  <?php } else { ?>
  <?php  $_smarty_tpl->tpl_vars['result'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['result']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['query']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['result']->key => $_smarty_tpl->tpl_vars['result']->value) {
$_smarty_tpl->tpl_vars['result']->_loop = true;
if ($_smarty_tpl->tpl_vars['condition']->value===0) {?><div id="mymusic_active_page"><div class="mus_content_w"><div class="mus_album"><div class="mus_album_i__fixed"><div class="mus_album_i_w"><div class="mus_album_side_w curPointer"><div class="mus_album_side mus_album_side__b"><img alt="" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['defaultCover']->value;?>
"></div><div class="mus_album_side mus_album_side__a"><img alt="" style="width:128px;height:128px;" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"><img alt="" style="width:128px;height:128px;" class="mus_album_i" src="<?php echo $_smarty_tpl->tpl_vars['defaultCover']->value;?>
"></div></div></div><div class="m_c_s_c_go_to mt-5" title="<?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
"><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
</div><div class="m_c_col-data"><div class="m_c_col-data_ac"><?php if ($_smarty_tpl->tpl_vars['this']->value->allow_upload_songs==="false") {?><a class="mtico mus-dl m_c_col-data_ac_i __14 js-hide-in-edit" id="mus_spupl"><i class="mic14 mic14_upload"></i><span>Upload music</span></a><?php }?><div aria-hidden="true" class="mb-10 mus_upload_prg_bar" style="display: none;"><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" class="progress __dark" role="progressbar"><div class="progress_bar" style="width: 0%;"></div><div aria-hidden="false" class="progress_tx ellip">0 from 0</div><span class="progress_ac"><span class="progress_ac_ic ic10 ic10_close-w m_hidden" role="button" title="Cancel"></span></span></div></div><div class="mtico m_c_col-data_ac_i __14" id="upload_succ" style="display:<?php echo $_smarty_tpl->tpl_vars['this']->value->display;?>
" aria-hidden="false"><div class="tico"><i class="tico_img ic ic_ok"></i><span class="mus-text __success">Uploaded <?php echo $_smarty_tpl->tpl_vars['this']->value->count_upl_songs;?>
 song<?php echo $_smarty_tpl->tpl_vars['this']->value->more_s;?>
</span></div></div><a data-href="mymusic" data-action="true" data-query="?action=playListEdit" class="mtico mus-dl m_c_col-data_ac_i __14 js-hide-in-edit js-pl-edit"><i class="mic14 ic14_edit"></i><span>Edit</span></a><a class="vl_btn m_c_col-data_finish js-pl-edit-finish m_hidden">Ready</a></div></div></div><div class="mus-tr_lst mus_scroll-overlay" id="mus_mymusc" style="min-height:280px;"><div id="mus_sort" data-act="my"><ol><?php }
$_smarty_tpl->tpl_vars[$_smarty_tpl->tpl_vars['condition']->value] = new Smarty_variable($_smarty_tpl->tpl_vars['condition']->value++, true, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['artist'];?>
<?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['artist'] = new Smarty_variable($_tmp1, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['title'];?>
<?php $_tmp2=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['title'] = new Smarty_variable($_tmp2, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['album'];?>
<?php $_tmp3=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['album'] = new Smarty_variable($_tmp3, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['id'];?>
<?php $_tmp4=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['trackId'] = new Smarty_variable($_tmp4, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['video'];?>
<?php $_tmp5=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_video'] = new Smarty_variable($_tmp5, null, 0);
ob_start();?><?php echo $_smarty_tpl->tpl_vars['result']->value['language'];?>
<?php $_tmp6=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['track_lang'] = new Smarty_variable($_tmp6, null, 0);
if ($_smarty_tpl->tpl_vars['track_lang']->value===$_smarty_tpl->tpl_vars['this']->value->show_prch_icon) {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('__download', null, 0);
} else {
$_smarty_tpl->tpl_vars['download'] = new Smarty_variable('', null, 0);
}?><li target="#pm_sec_<?php echo $_smarty_tpl->tpl_vars['trackId']->value;?>
" id="tracks_<?php echo $_smarty_tpl->tpl_vars['trackId']->value;?>
"><div class="mus-tr_i  __has-video soh-s mus_track <?php echo $_smarty_tpl->tpl_vars['download']->value;?>
" id="pm_sec_<?php echo $_smarty_tpl->tpl_vars['trackId']->value;?>
" data-position="<?php echo $_smarty_tpl->tpl_vars['result']->value['position'];?>
" data-added="<?php echo $_smarty_tpl->tpl_vars['result']->value['added'];?>
" style=""><div class="mus-tr_hld __pr-m"><span class="mus-tr_restore"><span class="mus-tr_restore_tx"><span class="mus-tr_il js-mus-tr_restore" trackId="track_<?php echo $_smarty_tpl->tpl_vars['trackId']->value;?>
" data-action="restore">Restore?</span>&nbsp;<?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
&nbsp;&#8211;&nbsp;<?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</span></span><span class="mus-tr_play __play js-mus-tr_play" id="pm_sec_<?php echo $_smarty_tpl->tpl_vars['trackId']->value;?>
" title="Play" data-action="play" data-quest='{"song":"<?php echo $_smarty_tpl->tpl_vars['result']->value['path'];?>
","cover":"<?php echo $_smarty_tpl->tpl_vars['result']->value['cover'];?>
"}' ></span><?php if ($_smarty_tpl->tpl_vars['download']->value!=='') {?><span class="mus-tr_download js-mus-tr_download" title="Download"></span><?php }?><div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist"><?php echo $_smarty_tpl->tpl_vars['artist']->value;?>
</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song"><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</a><span style="display:none;" class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span><?php echo $_smarty_tpl->tpl_vars['album']->value;?>
</a></span></div><div class="mus-tr_right-controls foh-s"  id="rc_m_sec_klass"><span class="js-mus_dropdown_trigger mus-tr_il mus-tr_right-controls_a" style="display:none;">Add to the playlist</span><span class="mus-tr_edit js-mus-tr_edit " title="Edit" data-action="edit"></span><span class="mus-tr_delete js-mus-tr_delete " title="Remove from my list" trackId="track_<?php echo $_smarty_tpl->tpl_vars['trackId']->value;?>
" data-action="delete"></span></div><span class="mus-tr_time"><?php echo $_smarty_tpl->tpl_vars['result']->value['time'];?>
</span></div><?php if ($_smarty_tpl->tpl_vars['track_video']->value>'0') {?><div class="mus-tr_video" data-showVideo="true" data-video="<?php echo $_smarty_tpl->tpl_vars['track_video']->value;?>
"></div><?php }?></div></li><?php } ?></div></ol></div><?php if ($_smarty_tpl->tpl_vars['count_b']->value>=$_smarty_tpl->tpl_vars['this']->value->my_mus_songs_limit) {?><div class="m_c_s_c_go_to mt-20" id="mus_more_song_my_mus" d-more-songs="true" data-disp-songs="<?php echo $_smarty_tpl->tpl_vars['this']->value->my_mus_songs_limit;?>
" data-more-songs="mymusic">More songs</div><?php }?><!--- start playlists ------><?php echo $_smarty_tpl->tpl_vars['this']->value->myPlaylists();?>
<!--- recommendation section ----><div class="m_recommendations_w js-hide-in-edit js-m_recommendations_w __visible-teaser"><div class="m_recommendations"><div class="m_recommendations_cnt"><span class="ic ic_close m_recommendations_close" title="OK"></span><div class="mus_h2 m_recommendations_h">Similar to your songs</div><div class="m_recommendations_track-list"><div class="mus-tr_lst mus_scroll-overlay"></div></div><div class="m_recommendations_more"><span class="m_c_s_c_go_to">Show more songs</span></div></div><div class="m_recommendations_teaser"><span>We have found songs that will suit you.</span><span class="m_c_s_c_go_to">&nbsp;Show.</span></div></div></div><?php }?><?php }} ?>
