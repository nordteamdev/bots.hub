<?php
if ($wo['loggedin'] == false) {
    if ($wo['config']['profile_privacy'] == 0) {
        header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
        exit();
    }
}
if (isset($_GET['u'])) {
    $check_user = Wo_IsNameExist($_GET['u'], 1);
    if (in_array(true, $check_user)) {
        if ($check_user['type'] == 'user') {
            $id                 = $user_id = Wo_UserIdFromUsername($_GET['u']);
            $wo['user_profile'] = Wo_UserData($user_id);
            $type               = 'timeline';
            $about              = $wo['user_profile']['about'];
            $name               = $wo['user_profile']['name'];
            $wo['user_profile']['fields'] = Wo_UserFieldsData($user_id);
            $wo['have_stories'] = false;
            $user_stories = $db->where('user_id', $wo['user_profile']['user_id'])->get(T_USER_STORY,null,array('id'));
            if (!empty($user_stories)) {
                $wo['have_stories'] = true;
                $wo['story_seen_class'] = 'seen_story';

                foreach ($user_stories as $key => $value) {
                    $is_seen = $db->where('story_id',$value->id)->where('user_id',$wo['user']['user_id'])->getValue(T_STORY_SEEN,'COUNT(*)');

                    if ($is_seen == 0) {
                        $wo['story_seen_class'] = 'unseen_story';
                    }
                }
            }
        } else if ($check_user['type'] == 'page') {
            $id                 = $page_id = Wo_PageIdFromPagename($_GET['u']);
            $wo['page_profile'] = Wo_PageData($page_id);
            $type               = 'page';
            $about              = $wo['page_profile']['about'];
            $name               = $wo['page_profile']['name'];
        } else if ($check_user['type'] == 'group') {
            $id                  = $group_id = Wo_GroupIdFromGroupname($_GET['u']);
            $wo['group_profile'] = Wo_GroupData($group_id);
            $type                = 'group';
            $about               = $wo['group_profile']['about'];
            $name                = $wo['group_profile']['name'];
        }
    } else {
        header("Location: " . Wo_SeoLink('index.php?link1=404'));
        exit();
    }
} else {
    header("Location: " . $wo['config']['site_url']);
    exit();
}
if ($wo['config']['pages'] == 0 && $type == 'page') {
    header("Location: " . $wo['config']['site_url']);
    exit();
}
if ($wo['config']['groups'] == 0 && $type == 'group') {
    header("Location: " . $wo['config']['site_url']);
    exit();
}
if (!empty($_GET['ref'])) {
    if ($_GET['ref'] == 'se') {
        $regsiter_recent = Wo_RegsiterRecent($id, $type);
    }
}
$con2 = 1;
if ($type == 'timeline') {
    $user_data = Wo_UpdateUserDetails($wo['user_profile'], true, true, true);
    if (is_array($user_data)) {
        $wo['user_profile'] = $user_data;
        $about  = $wo['user_profile']['about'];
        $name   = $wo['user_profile']['name'];
        $wo['user_profile']['fields'] = Wo_UserFieldsData($user_id);
    }
}
if ($type == 'timeline' && $wo['loggedin'] == true) {
    $is_blocked = $wo['is_blocked'] = Wo_IsBlocked($user_id);
    if (isset($_GET['block_user']) && !empty($_GET['block_user'])) {
        if ($_GET['block_user'] == 'block' && $is_blocked === false && Wo_IsAdmin($user_id) === false) {
            $block = Wo_RegisterBlock($user_id);
            if ($block) {
                if (!empty($_GET['redirect'])) {
                    header("Location: " . Wo_SeoLink("index.php?link1={$_GET['redirect']}"));
                    exit();
                }
                header("Location: " . Wo_SeoLink('index.php?link1=welcome'));
                exit();
            }
        } else if ($_GET['block_user'] == 'un-block' && $is_blocked === true) {
            $unblock = Wo_RemoveBlock($user_id);
            if ($unblock) {
                header("Location: " . $wo['user_profile']['url']);
                exit();
            }
        }
    }
    if ($is_blocked) {
       $con2 = 0;
       if (!isset($came_from)) {
           header("Location: " . $wo['config']['site_url']);
           exit(); 
       } else {
           Wo_RedirectSmooth(Wo_SeoLink('index.php?link1=404'));
       }
    }
}

$can_ = 0;
if ($wo['loggedin'] == true && $wo['config']['profileVisit'] == 1 && $type == 'timeline' && $con2 == 1) {
    if ($wo['user_profile']['user_id'] != $wo['user']['user_id'] && $wo['user']['visit_privacy'] == 0) {
        if ($wo['config']['pro'] == 1) {
            if ($wo['user_profile']['is_pro'] == 1) {
                $can_ = 1;
            }
        } else {
            $can_ = 1;
        }
        if ($wo['user_profile']['visit_privacy'] == 0 && $can_ == 1) {
            $notification_data_array = array(
                'recipient_id' => $wo['user_profile']['user_id'],
                'type' => 'visited_profile',
                'url' => 'index.php?link1=timeline&u=' . $wo['user']['username']
            );
            Wo_RegisterNotification($notification_data_array);
        }
    }
}
if ($type == 'page') {
    if (isset($_GET['boosted']) && $wo['config']['pro'] == 1 && $wo['loggedin'] == true && $wo['page_profile']['boosted'] == 0) {
        if ($wo['page_profile']['is_page_onwer'] == true) {
            if ($wo['user']['is_pro'] == 1) {
                $user_id = $wo['user']['user_id'];
                $query = mysqli_query($sqlConnect, "SELECT COUNT(`page_id`) as count FROM " . T_PAGES . " WHERE `user_id` = {$user_id} AND `boosted` = '1'");
                $query_select_fetch = mysqli_fetch_assoc($query);
                $continue = 0;
                if ($wo['user']['pro_type'] == 2) {
                     if ($query_select_fetch['count'] > ($wo['config']['monthly_boosts'] - 1)) {
                           $continue = 1;
                     }
                } else if ($wo['user']['pro_type'] == 3) {
                     if ($query_select_fetch['count'] > ($wo['config']['yearly_boosts'] - 1)) {
                           $continue = 1;
                     }
                } else if ($wo['user']['pro_type'] == 4) {
                     if ($query_select_fetch['count'] > ($wo['config']['lifetime_boosts'] - 1)) {
                           $continue = 1;
                     }
                }
                if ($continue == 1) {
                    $query_textt = "UPDATE " . T_PAGES . " SET `boosted` = '0' WHERE `page_id` IN (SELECT * FROM (SELECT `page_id` FROM " . T_PAGES . " WHERE `boosted` = '1' AND (`user_id` = {$user_id} OR `page_id` IN (SELECT `page_id` FROM " . T_PAGES . " WHERE `user_id` = {$user_id})) ORDER BY `page_id` DESC LIMIT 1) as t)";
                    $query_two = mysqli_query($sqlConnect, $query_textt);
                }
                $array  = array(
                    'boosted' => 1
                );
                $update = Wo_UpdatePageData($page_id, $array);
                header("Location: " . $wo['page_profile']['url']);
                exit();
            }
        }
    }
    if (isset($_GET['un-boost']) && $wo['config']['pro'] == 1 && $wo['loggedin'] == true && $wo['page_profile']['boosted'] == 1) {
        if ($wo['page_profile']['is_page_onwer'] == true) {
            if ($wo['user']['is_pro'] == 1) {
                if ($wo['user']['pro_type'] > 1) {
                    $array  = array(
                        'boosted' => 0
                    );
                    $update = Wo_UpdatePageData($page_id, $array);
                    header("Location: " . $wo['page_profile']['url']);
                    exit();
                }
            }
        }
    }
}
$wo['description'] = $about;
$wo['keywords']    = '';
$wo['page']        = $type;
$wo['title']       = str_replace('&#039;', "'", $name);
$wo['content']     = Wo_LoadPage("{$type}/content");