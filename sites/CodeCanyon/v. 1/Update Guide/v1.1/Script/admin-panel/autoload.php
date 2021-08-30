<?php 


$page = 'dashboard';
if (!empty($_GET['page'])) {
    $page = FL_Secure($_GET['page']);
}


$page_loaded = '';
$pages = array('dashboard', 'general-settings', 'site-settings', 'email-settings', 'social-login', 'manage-users', 'manage-news', 'manage-lists', 'manage-videos', 'manage-polls', 'manage-music', 'manage-quizzes', 'amazon-settings', 'manage-website-ads', 'manage-themes', 'change-site-desgin', 'custom-code', 'manage-verification-requests', 'manage-profile-fields', 'add-new-profile-field', 'edit-profile-field', 'manage-breaking-news', 'add-new-breaking-news', 'edit-breaking-news', 'manage-announcements', 'ban-users', 'manage-backups', 'manage-reports', 'manage-api-access-keys', 'changelog', 'manage-pages');

if (in_array($page, $pages)) {
    $page_loaded = FL_LoadAdminPage("$page/content");
} 
if (empty($page_loaded)) {
    header("Location: " . FL_Link('admin-cp'));
    exit();
}
$is_there_news = '';
if ($db->where('active', '0')->getValue(T_NEWS, 'count(*)') > 0 && $page != 'manage-news') {
    $is_there_news = 'style="color:#e62117"';
}

$is_there_lists = '';
if ($db->where('active', '0')->getValue(T_LISTS, 'count(*)') > 0 && $page != 'manage-lists') {
    $is_there_lists = 'style="color:#e62117"';
}


$is_there_videos = '';
if ($db->where('active', '0')->getValue(T_VIDEOS, 'count(*)') > 0 && $page != 'manage-videos') {
    $is_there_videos = 'style="color:#e62117"';
}

$is_there_music = '';
if ($db->where('active', '0')->getValue(T_MUSIC, 'count(*)') > 0 && $page != 'manage-music') {
    $is_there_music = 'style="color:#e62117"';
}

$is_there_polls = '';
if ($db->where('active', '0')->getValue(T_POLLS_PAGES, 'count(*)') > 0 && $page != 'manage-polls') {
    $is_there_polls = 'style="color:#e62117"';
}

$is_there_quizzes = '';
if ($db->where('active', '0')->getValue(T_QUIZZES, 'count(*)') > 0 && $page != 'manage-quizzes') {
    $is_there_quizzes = 'style="color:#e62117"';
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Admin Panel | <?php echo $fl['config']['title']; ?></title>
    <link rel="icon" href="<?php echo $fl['config']['theme_url']?>/img/icon.png" type="image/png">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery/jquery.min.js'); ?>"></script>
    <link href="<?php echo FL_LoadAdminLink('plugins/bootstrap/css/bootstrap.css'); ?>" rel="stylesheet">
    <link href="<?php echo FL_LoadAdminLink('plugins/node-waves/waves.css'); ?>" rel="stylesheet" />
    <link href="<?php echo FL_LoadAdminLink('plugins/animate-css/animate.css'); ?>" rel="stylesheet" />
    <link href="<?php echo FL_LoadAdminLink('plugins/morrisjs/morris.css'); ?>" rel="stylesheet" />
    <link href="<?php echo FL_LoadAdminLink('css/style.css'); ?>" rel="stylesheet">
    <link href="<?php echo FL_LoadAdminLink('plugins/sweetalert/sweetalert.css'); ?>" rel="stylesheet" />
    <link href="<?php echo FL_LoadAdminLink('plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.css'); ?>" rel="stylesheet">
    <link href="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css'); ?>" rel="stylesheet">
    <link href="<?php echo FL_LoadAdminLink('css/themes/all-themes.css'); ?>" rel="stylesheet" />
    <link href="<?php echo FL_LoadAdminLink('plugins/bootstrap-select/css/bootstrap-select.css'); ?>" rel="stylesheet" />
    <script type="text/javascript" src="<?php echo $fl['config']['theme_url']?>/js/jquery.form.min.js"></script>
    <script src="<?php echo $fl['config']['theme_url']?>/js/magnific-popup/dist/jquery.magnific-popup.min.js"></script>
    <link rel="stylesheet" href="<?php echo $fl['config']['theme_url']?>/js/magnific-popup/dist/magnific-popup.css">
    <script src="<?php echo $fl['config']['theme_url']?>/js/codemirror-5.30.0/lib/codemirror.js"></script>
    <script src="<?php echo $fl['config']['theme_url']?>/js/codemirror-5.30.0/mode/css/css.js"></script>
    <script src="<?php echo $fl['config']['theme_url']?>/js/codemirror-5.30.0/mode/javascript/javascript.js"></script>
    <link rel="stylesheet" href="<?php echo $fl['config']['theme_url']?>/js/codemirror-5.30.0/lib/codemirror.css">
    <link href="<?php echo $fl['config']['theme_url']?>/css/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <input type="hidden" value="<?php echo FL_CreateSession()?>" class="main_session">
</head>

<body class="theme-red">
    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="preloader">
                <div class="spinner-layer pl-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p>Please wait...</p>
        </div>
    </div>
    <!-- #END# Page Loader -->
    <!-- Overlay For Sidebars -->
    <div class="overlay"></div>
    <!-- #END# Overlay For Sidebars -->
    <!-- Top Bar -->
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                <a href="javascript:void(0);" class="bars"></a>
                <a class="navbar-brand" href="<?php echo FL_Link(''); ?>"><?php echo $fl['config']['title']?></a>
            </div>
        </div>
    </nav>
    <!-- #Top Bar -->
    <section>
        <!-- Left Sidebar -->
        <aside id="leftsidebar" class="sidebar">
            <!-- User Info -->
            <div class="user-info">
                <div class="image">
                    <img src="<?php echo $fl['user']['avatar']?>" width="48" height="48" alt="User" />
                </div>
                <div class="info-container">
                    <div class="name"><a href="<?php echo $fl['user']['url']?>" target="_blank"><?php echo $fl['user']['name']?></a></div>
                    <div class="email"><?php echo $fl['user']['email']?></div>
                </div>
            </div>
            <!-- #User Info -->
            <!-- Menu -->
            <div class="menu">
                <ul class="list">
                    <li <?php echo ($page == 'dashboard') ? 'class="active"' : ''; ?>>
                        <a href="<?php echo FL_LoadAdminLinkSettings(''); ?>">
                            <i class="material-icons">dashboard</i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li <?php echo ($page == 'general-settings' || $page == 'site-settings' || $page == 'email-settings' || $page == 'social-login' || $page == 'amazon-settings') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">settings</i>
                            <span>Settings</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'general-settings') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('general-settings'); ?>">General Settings</a>
                            </li>
                            <li <?php echo ($page == 'site-settings') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('site-settings'); ?>">Site Settings</a>
                            </li>
                            <li <?php echo ($page == 'email-settings') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('email-settings'); ?>">E-mail Settings</a>
                            </li>
                            <li <?php echo ($page == 'social-login') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('social-login'); ?>">Social Login Settings</a>
                            </li>
                            <li <?php echo ($page == 'amazon-settings') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('amazon-settings'); ?>">Amazon S3 Settings</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-users' || $page == 'manage-verification-requests' || $page == 'manage-profile-fields' || $page == 'add-new-profile-field' || $page == 'edit-profile-field') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">account_circle</i>
                            <span>Users</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-users') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-users'); ?>">Manage Users</a>
                            </li>
                            <li <?php echo ($page == 'manage-verification-requests') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-verification-requests'); ?>">Manage Verification Requests</a>
                            </li>
                            <li <?php echo ($page == 'manage-profile-fields') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-profile-fields'); ?>">Manage Custom Profile Fields</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-news') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons" <?php echo $is_there_news ?>>insert_drive_file</i>
                            <span <?php echo $is_there_news ?>>News</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-news') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-news'); ?>">Manage News</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-lists') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons" <?php echo $is_there_lists ?>>format_list_bulleted</i>
                            <span <?php echo $is_there_lists ?>>Lists</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-lists') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-lists'); ?>">Manage Lists</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-videos') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons" <?php echo $is_there_videos ?>>videocam</i>
                            <span <?php echo $is_there_videos ?>>Videos</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-videos') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-videos'); ?>">Manage Videos</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-music') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons" <?php echo $is_there_music ?>>music_note</i>
                            <span <?php echo $is_there_music ?>>Music</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-music') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-music'); ?>">Manage Music</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-polls') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons" <?php echo $is_there_polls ?>>data_usage</i>
                            <span <?php echo $is_there_polls ?>>Polls</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-polls') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-polls'); ?>">Manage Polls</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-quizzes') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons" <?php echo $is_there_quizzes ?>>question_answer</i>
                            <span <?php echo $is_there_quizzes ?>>Quizzes</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-quizzes') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-quizzes'); ?>">Manage Quizzes</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-website-ads') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">attach_money</i>
                            <span>Advertisement</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-website-ads') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-website-ads'); ?>">Manage Website Ads</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-themes' || $page == 'change-site-desgin' || $page == 'custom-code') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">color_lens</i>
                            <span>Design</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-themes') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-themes'); ?>">Themes</a>
                            </li>
                            <li <?php echo ($page == 'change-site-desgin') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('change-site-desgin'); ?>">Change Site Design</a>
                            </li>
                            <li <?php echo ($page == 'custom-code') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('custom-code'); ?>">Custom JS / CSS</a>
                            </li>
                        </ul>
                    </li>
                     
                    <li <?php echo ($page == 'manage-breaking-news' || $page == 'manage-announcements' || $page == 'ban-users' || $page == 'add-new-breaking-news' || $page == 'edit-breaking-news' || $page == 'manage-backups') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">build</i>
                            <span>Tools</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-breaking-news') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-breaking-news'); ?>">Breaking News</a>
                            </li>
                            <li <?php echo ($page == 'manage-announcements') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-announcements'); ?>">Manage Announcements</a>
                            </li>
                            <li <?php echo ($page == 'ban-users') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('ban-users'); ?>">Ban Users</a>
                            </li>
                            <li <?php echo ($page == 'manage-backups') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-backups'); ?>">Backup SQL & Files</a>
                            </li>
                        </ul>
                    </li>
                     <li <?php echo ($page == 'manage-pages') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">description</i>
                            <span>Pages</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-pages') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-pages'); ?>">Manage Pages</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'manage-reports') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">warning</i>
                            <span>Reports</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-reports') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-reports'); ?>">Manage Reports</a>
                            </li>
                        </ul>
                    </li>
                     <li <?php echo ($page == 'manage-api-access-keys') ? 'class="active"' : ''; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">compare_arrows</i>
                            <span>Mobile & API Settings</span>
                        </a>
                        <ul class="ml-menu">
                            <li <?php echo ($page == 'manage-api-access-keys') ? 'class="active"' : ''; ?>>
                                <a href="<?php echo FL_LoadAdminLinkSettings('manage-api-access-keys'); ?>">Manage API Access Keys</a>
                            </li>
                        </ul>
                    </li>
                    <li <?php echo ($page == 'changelog') ? 'class="active"' : ''; ?>>
                        <a href="<?php echo FL_LoadAdminLinkSettings('changelog'); ?>">
                            <i class="material-icons">update</i>
                            <span>Changelogs</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- #Menu -->
            <!-- Footer -->
            <div class="legal">
                <div class="copyright">
                    Copyright &copy; <?php  echo date('Y') ?> <a href="javascript:void(0);"><?php echo $fl['config']['name']?></a>.
                </div>
                <div class="version">
                    <b>Version: </b> <?php echo $fl['config']['script_version']?>
                </div>
            </div>
            <!-- #Footer -->
        </aside>
        <!-- #END# Left Sidebar -->
    </section>

    <section class="content">
        <?php echo $page_loaded; ?>
    </section>
    
    <!-- Bootstrap Core Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/bootstrap/js/bootstrap.js'); ?>"></script>

    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/jquery.dataTables.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/extensions/export/buttons.flash.min.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/extensions/export/jszip.min.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/extensions/export/pdfmake.min.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/extensions/export/vfs_fonts.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/extensions/export/buttons.html5.min.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-datatable/extensions/export/buttons.print.min.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('js/pages/tables/jquery-datatable.js'); ?>"></script>

    <!-- Select Plugin Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/bootstrap-select/js/bootstrap-select.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/sweetalert/sweetalert.min.js'); ?>"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-slimscroll/jquery.slimscroll.js'); ?>"></script>

    <!-- ColorPicker Plugin Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js'); ?>"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/node-waves/waves.js'); ?>"></script>

    <!-- Jquery CountTo Plugin Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-countto/jquery.countTo.js'); ?>"></script>

    <!-- Morris Plugin Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/raphael/raphael.min.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('plugins/morrisjs/morris.js'); ?>"></script>
    <!-- Sparkline Chart Plugin Js -->
    <script src="<?php echo FL_LoadAdminLink('plugins/jquery-sparkline/jquery.sparkline.js'); ?>"></script>

    <!-- Custom Js -->
    <script src="<?php echo FL_LoadAdminLink('js/admin.js'); ?>"></script>
    <script src="<?php echo FL_LoadAdminLink('js/pages/index.js'); ?>"></script>
</body>

</html>
<style> 
.sidebar .user-info {
    background:  #f7931a;
}
[type="checkbox"]:checked + label:before {
    border-right: 2px solid #333;
}
</style>
<?php 
echo FL_LoadAdminPage("js/content");
?>
<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
    var hash = $('.main_session').val();
      $.ajaxSetup({ 
        data: {
            hash_id: hash
        },
        cache: false 
      });
});
</script>
