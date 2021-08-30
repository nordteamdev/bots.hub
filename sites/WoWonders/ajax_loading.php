<?php 
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2017 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
require_once('assets/init.php');

if ($wo['loggedin'] == true) {
    $update_last_seen = Wo_LastSeen($wo['user']['user_id']);
}
$page = '';
if ($wo['loggedin'] == true && !isset($_GET['link1'])) {
    $page = 'home';
} elseif (isset($_GET['link1'])) {
    $page = Wo_Secure($_GET['link1'], 0);
}
if ((!isset($_GET['link1']) && $wo['loggedin'] == false) || (isset($_GET['link1']) && $wo['loggedin'] == false && $page == 'home')) {
    $page = 'welcome';
}
$came_from = false;
if ($page == 'timeline') {
    $came_from = true;
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if (strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
       exit("Restrcited Area");
    }
} else {
    exit("Restrcited Area");
}
switch ($page) {
    case 'home':
        include('sources/home.php');
        break;
    case 'welcome':
        include('sources/welcome.php');
        break;
    case 'start-up':
        include('sources/start_up.php');
        break;
    case 'activate':
        include('sources/activate.php');
        break;
    case 'search':
        include('sources/search.php');
        break;
    case 'timeline':
        include('sources/timeline.php');
        break;
    case 'pages':
        include('sources/my_pages.php');
        break;
    case 'suggested-pages':
        include('sources/suggested_pages.php');
        break;
    case 'poke':
        include('sources/poke.php');
        break;
    case 'most_liked':
        include('sources/most_liked.php');
        break;
    case 'go-pro':
        include('sources/go_pro.php');
        break;
    case 'page':
        include('sources/page.php');
        break;
    case 'groups':
        include('sources/my_groups.php');
        break;
    case 'suggested-groups':
        include('sources/suggested_groups.php');
        break;
    case 'group':
        include('sources/group.php');
        break;
    case 'create-group':
        include('sources/create_group.php');
        break;
    case 'group-setting':
        include('sources/group_setting.php');
        break;
    case 'create-page':
        include('sources/create_page.php');
        break;
    case 'setting':
        include('sources/setting.php');
        break;
    case 'page-setting':
        include('sources/page_setting.php');
        break;
    case 'messages':
        include('sources/messages.php');
        break;
    case 'logout':
        include('sources/logout.php');
        break;
    case '404':
        include('sources/404.php');
        break;
    case 'post':
        include('sources/story.php');
        break;
    case 'game':
        include('sources/game.php');
        break;
    case 'games':
        include('sources/games.php');
        break;
    case 'new-game':
        include('sources/new_games.php');
        break;
    case 'admincp':
        include('sources/admin.php');
        break;
    case 'saved-posts':
        include('sources/savedPosts.php');
        break;
    case 'hashtag':
        include('sources/hashtag.php');
        break;
    case 'terms':
        include('sources/term.php');
        break;
    case 'albums':
        include('sources/my_albums.php');
        break;
    case 'album':
        include('sources/album.php');
        break;
    case 'create-album':
        include('sources/create_album.php');
        break;
    case 'contact-us':
        include('sources/contact.php');
        break;
    case 'user-activation':
        include('sources/user_activation.php');
        break;
    case 'upgraded':
        include('sources/upgraded.php');
        break;
    case 'oops':
        include('sources/oops.php');
        break;
    case 'boosted-pages':
        include('sources/boosted_pages.php');
        break;
    case 'boosted-posts':
        include('sources/boosted_posts.php');
        break;
    case 'new-product':
        include('sources/new_product.php');
        break; 
    case 'edit-product':
        include('sources/edit_product.php');
        break;  
    case 'products':
        include('sources/products.php');
        break;      
    case 'my-products':
        include('sources/my_products.php');
        break;    
    case 'site-pages':
        include('sources/site_pages.php');
        break;
    case 'blogs':
        include('sources/blog.php');
        break;
    case 'my-blogs':
        include('sources/my_blogs.php');
        break;
    case 'create-blog':
        include('sources/create_blog.php');
        break;
    case 'read-blog':
        include('sources/read_blog.php');
        break;
    case 'edit-blog':
        include('sources/edit_blog.php');
        break;
    case 'oauth':
        include('sources/oauth.php');
        break;
    case 'graph-success':
        include('sources/graph_success.php');
        break;
    case 'app-setting':
        include('sources/app_setting.php');
        break;
    case 'developers':
        include('sources/developers.php');
        break;
    case 'create-app':
        include('sources/create_app.php');
        break;
    case 'app':
        include('sources/app_page.php');
        break;
    case 'apps':
        include('sources/apps.php');
        break;
   case 'blog-category':
        include('sources/blog_category.php');
        break;
     case 'create-event':
        include('sources/events/create_event.php');
        break;
    case 'edit-event':
        include('sources/events/edit_event.php');
        break;
    case 'events':
        include('sources/events/events_upcomming.php');
        break;
    case 'events-going':
        include('sources/events/events_going.php');
        break;
    case 'events-interested':
        include('sources/events/events_interested.php');
        break;
    case 'events-past':
        include('sources/events/events_past.php');
        break;
    case 'show-event':
        include('sources/events/show_event.php');
        break;
    case 'events-invited':
        include('sources/events/events_invited.php');
        break;
    case 'forum':
        include('sources/forum/forum.php');
        break;
    case 'forum-members':
        include('sources/forum/forum_members.php');
        break;
    case 'forum-members-byname':
        include('sources/forum/forum_members_byname.php');
        break;
    case 'forum-events':
        include('sources/forum/forum_events.php');
        break;
    case 'forum-search':
        include('sources/forum/forum_search.php');
        break;
    case 'forum-search-result':
        include('sources/forum/forum_search.php');
        break;
    case 'forum-help':
        include('sources/forum/forum_help.php');
        break;
    case 'forums':
        include('sources/forum/forumdisplay.php');
        break;
    case 'forumaddthred':
        include('sources/forum/forums_add_thread.php');
        break;
    case 'showthread':
        include('sources/forum/forum_showthread.php');
        break;
    case 'threadreply':
        include('sources/forum/forum_threadreply.php');
        break;
    case 'threadquote':
        include('sources/forum/forum_threadquote.php');
        break;
    case 'editreply':
        include('sources/forum/forum_editreply.php');
        break;
    case 'deletereply':
        include('sources/forum/forum_deletereply.php');
        break;
    case 'mythreads':
        include('sources/forum/forum_mythreads.php');
        break;
    case 'mymessages':
        include('sources/forum/forum_mymessages.php');
        break;
    case 'edithread':
        include('sources/forum/forum_edithread.php');
        break;
    case 'deletethread':
        include('sources/forum/forum_deletethread.php');
        break;
    case 'friends-nearby':
        include('sources/friends_nearby.php');
        break;
    case 'send_money':
        include('sources/ads/send_money.php');
        break;
    case 'wallet':
        include('sources/ads/wallet.php');
        break;
    case 'create-status':
        include('sources/status/create.php');
        break;
    case 'my-events':
        include('sources/events/my_events.php');
        break;
    case 'ads':
        include('sources/ads/ads.php');
        break;
    case 'wallet':
        include('sources/ads/wallet.php');
        break;
    case 'send_money':
        include('sources/ads/send_money.php');
        break;
    case 'create-ads':
        include('sources/ads/create_ads.php');
        break;
    case 'edit-ads':
        include('sources/ads/edit_ads.php');
        break;
    case 'chart-ads':
        include('sources/ads/chart_ads.php');
        break;
    case 'manage-ads':
        include('sources/ads/admin.php');
        break;
}

if (empty($wo['content'])) {
    include('sources/404.php');
}
if (empty($wo['title'])) {
    $data['title'] = $wo['config']['siteTitle'];
}
$data['url'] = '';
$actual_link = "http://$_SERVER[HTTP_HOST]";
$data['title'] = stripslashes(Wo_Secure($wo['title']));
$data['page'] = $wo['page'];
$data['welcome_page'] = 0;
$data['is_css_file'] = 0;
$data['css_file_header'] = '';
$data['welcome_url'] = Wo_SeoLink('index.php?link1=welcome');
if ($wo['page'] == 'welcome') {
    $data['welcome_page'] = 1;
}
if ($wo['page'] == 'timeline' && $wo['loggedin'] == true && $wo['config']['css_upload'] == 1 && !empty($wo['user_profile'])) {
    if (!empty($wo['user_profile']['css_file']) && file_exists($wo['user_profile']['css_file'])) {
      $data['is_css_file'] = 1;
      $data['css_file'] = '<link rel="stylesheet" class="styled-profile" href="' . Wo_GetMedia($wo['user_profile']['css_file']) . '">';
      $data['css_file_header'] = $wo['css_file_header'];
    } 
}

$data['is_footer'] = 0;
if (in_array($wo['page'], $wo['footer_pages'])) {
    $data['is_footer'] = 1;
}
$url = '';
if (!empty($_POST['url'])) {
    $url = $_POST['url'];
}
$data['redirect'] = 0;
if ($wo['redirect'] == 1) {
    $data['redirect'] = 1;
}

// if (strpos($_SERVER["HTTP_REFERER"], 'messages') !== false) {
//    $data['redirect'] = 1;
// }

$data['url'] = Wo_SeoLink('index.php' . $url);
?>
<input type="hidden" id="json-data" value='<?php echo htmlspecialchars(json_encode($data));?>'>
<?php
echo $wo['content'];
?>