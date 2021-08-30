<?php /* Smarty version Smarty-3.1.21-dev, created on 2018-12-15 07:27:00
         compiled from "..\template\search\header.html" */ ?>
<?php /*%%SmartyHeaderCode:204175c149eb4997497-22986774%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f4ea8668901a3aaaf17064994b903efe1bdfa43f' => 
    array (
      0 => '..\\template\\search\\header.html',
      1 => 1499365832,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '204175c149eb4997497-22986774',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'song_active' => 0,
    'songs_href' => 0,
    'songs_count' => 0,
    'inx_active' => 0,
    'artis_href' => 0,
    'artists_count' => 0,
    'album_active' => 0,
    'album_href' => 0,
    'albums_count' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_5c149eb49b8667_85659635',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c149eb49b8667_85659635')) {function content_5c149eb49b8667_85659635($_smarty_tpl) {?><!------------------------- Header (statistic of search result) [ template ] --------------------------->

<div class="m_c_s" aria-hidden="false">
  <div class="m_c_s_searchResult m_c_s_bestMatch_artist pl-mb-90" id="windowMusic_search_container">
    <div class="m_c_s_header">
      <div class="m_c_s_headerWrapper">
        <div class="m_c_s_header_search_title">
          Search results in:
        </div>
        <div class="mus_tabs">
          <div class="mus_tabs_i <?php echo $_smarty_tpl->tpl_vars['song_active']->value;?>
">
            <div class="mus_tabs_i_a" <?php echo $_smarty_tpl->tpl_vars['songs_href']->value;?>
>
              Songs 
              <span class="mus_tabs_i_a_count">
                <?php echo $_smarty_tpl->tpl_vars['songs_count']->value;?>

              </span>
            </div>
          </div>
          <div class="mus_tabs_i <?php echo $_smarty_tpl->tpl_vars['inx_active']->value;?>
">
            <div class="mus_tabs_i_a" <?php echo $_smarty_tpl->tpl_vars['artis_href']->value;?>
>
              Artists 
              <span class="mus_tabs_i_a_count">
                <?php echo $_smarty_tpl->tpl_vars['artists_count']->value;?>

              </span>
            </div>
          </div>
          <div class="mus_tabs_i <?php echo $_smarty_tpl->tpl_vars['album_active']->value;?>
">
            <div class="mus_tabs_i_a" <?php echo $_smarty_tpl->tpl_vars['album_href']->value;?>
>
              Albums 
              <span class="mus_tabs_i_a_count">
                <?php echo $_smarty_tpl->tpl_vars['albums_count']->value;?>

              </span>
            </div>
          </div>
        </div>
      </div>
    </div><?php }} ?>
