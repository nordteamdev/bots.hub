<?php
if (empty($_GET['id'])) {
    header("Location:" . FL_Link('404'));
    exit();
}
$page = (isset($_GET['page'])) ? (int) $_GET['page'] : 1;

if (!empty($_GET['publish'])) {
    if ($_GET['publish'] == 'true') {
         $id = @end(explode('-', $_GET['id']));
        $form_data_array = array('viewable' => 1);
        if (FL_IsAdmin() == true || $fl['config']['review_posts'] == 0) {
            $form_data_array['active'] = 1;
        }
        $update = FL_UpdatePost($id, $form_data_array, 'quiz');
    }
}

$quiz = $fl['quiz'] = FL_GetPost($_GET['id'], $page, 'quiz');

if (!empty($_GET['r']) && is_numeric($_GET['r']) && $_GET['r'] > 0) {
    $id                = @end(explode('-', $_GET['id']));
    $r_index           = $_GET['r'];
    $fl['quiz-result'] = false;
    if (!empty($id) && is_numeric($id)) {
        $fl['quiz-result'] = FL_GetQuizResult($id,$r_index);
    }
}


if (empty($quiz)) {
    header("Location:" . FL_Link('404'));
    exit();
}
$fl['is_post_owner'] = FL_IsPostOwner($quiz['id'], 'quiz');
if ($quiz['viewable'] == 0) {
    if ($fl['loggedin'] == false) {
        header("Location:" . FL_Link('404'));
        exit();
    } else if ($fl['is_post_owner'] === false) {
        header("Location:" . FL_Link('404'));
        exit();
    }
}
if ($quiz['active'] == 0) {
    if ($fl['loggedin'] == false) {
        header("Location:" . FL_Link('404'));
        exit();
    } else if ($fl['is_post_owner'] === false) {
        header("Location:" . FL_Link('404'));
        exit();
    }
}
if (empty($quiz['entries'][0])) {
    header("Location:" . FL_Link('404'));
    exit();
}

$update_views = FL_UpdateViews('quiz', $quiz['id']);


$fl['title']       = $quiz['title'];
$fl['description'] = $quiz['description'];
$fl['page']        = 'quiz';
$fl['keywords']    = $quiz['tags'];

$create_session    = FL_CreateSession();

$news_admin_option = '';
$publish_button    = '';

if ($fl['is_post_owner'] == true) {
	$news_admin_option = FL_LoadPage("story/admin-options");
	if ($fl['quiz']['active'] == 0 && $fl['quiz']['viewable'] == 1) {
		$publish_button = '<span class="btn btn-gray btn-sm"><i class="fa fa-clock-o"></i> ' . $lang['waiting_for_approval'] . '</span>';
	} else if ($fl['quiz']['viewable'] == 0 && $fl['quiz']['active'] == 0) {
        $publish_button = '<a class="btn btn-blue btn-sm" href="?publish=true"><i class="fa fa-upload"></i> ' . $lang['publish'] . '</a>';
	}
}

$share_onclick = "FL_ShareLink(this.href, event,"  . $fl['quiz']['id'] . ", 'quiz');";
$share_twitter_onclick = "FL_ShareLink('none', event,"  . $fl['quiz']['id'] . ", 'quiz');";

$tags = '';
foreach (FL_GetPostTags($fl['quiz']['tags']) as $key => $tag) {
    $tags .= '<a class="tags quiz" href="{{LINK tags/' . $tag . '}}">' . $tag . '</a> ';
}
$fl['story']['is_active'] = 0;
if ($fl['quiz']['active'] == 1) {
   $fl['story']['is_active'] = 1;
}

if ($fl['loggedin'] === true) {
    $fl['reported'] = false;
    
    $id = @end(explode('-', $_GET['id']));

    if (!is_numeric($id)) {
        preg_match('/^(?:.+)\-(?P<id>[0-9]+)(?:\.html|)$/',$id,$matches);
        if (!empty($matches['id']) && is_numeric($matches['id'])) {
            $id = $matches['id'];
        }
    }

    $table       = T_REPORTS;
    $page        = $fl['page']; 
    $user_id     = $fl['user']['user_id'];
    $where       = array();
    $query_cols  = array('`post_id`' => $id,'`user_id`' => $user_id,'`type`' => $page);
    foreach ($query_cols as $col => $col_val) {
        $where[] = array(
            'column' => $col,
            'value'  => $col_val,
            'mark'   => '=',
        );
    }
    $user_reports       = FL_CountData($where,$table);
    if (is_numeric($user_reports) && $user_reports > 0) {
        $fl['reported'] = true;
    }
}

$comments = '';
foreach (FL_GetStoryComments(array('post_id' => $fl['quiz']['id'],'page' => $fl['page'])) as $key => $fl['comment']) {
    $replies            = '';
    foreach ($fl['comment']['replies'] as $fl['reply']) {
        $replies           .=  FL_LoadPage("comment/comment-reply", array(
        'REPLY_ID'           => $fl['reply']['id'],
        'COMM_ID'            => $fl['reply']['comment'],
        'POST_ID'            => $fl['reply']['news_id'],
        'REPLY_TEXT'         => $fl['reply']['text'],
        'REPLY_TIME'         => FL_Time_Elapsed_String($fl['reply']['time']),
        'REPLY_USER_NAME'    => $fl['reply']['user_data']['name'],
        'REPLY_USER_URL'     => $fl['reply']['user_data']['url'],
        'USER_VERIFIED'      => ($fl['reply']['user_data']['verified'] == 1) ? '<span class="verified-icon"><i class="fa fa-check-circle"></i></span>' : '',
        'REPLY_USER_AVATAR'  => $fl['reply']['user_data']['avatar'],
        ));
    }

    $comments          .=  FL_LoadPage("comment/comment-content", array(
    'COMM_ID'           => $fl['comment']['id'],
    'POST_ID'           => $fl['quiz']['id'],
    'OWNER'             => $fl['comment']['owner'],
    'STORY_PAGE'        => $fl['page'],
    'COMM_TEXT'         => $fl['comment']['text'],
    'COMM_TIME'         => FL_Time_Elapsed_String($fl['comment']['time']),
    'COMM_USER_NAME'    => $fl['comment']['user_data']['name'],
    'USER_VERIFIED'     => ($fl['comment']['user_data']['verified'] == 1) ? '<span class="verified-icon"><i class="fa fa-check-circle"></i></span>' : '',
    'COMM_USER_URL'     => $fl['comment']['user_data']['url'],
    'COMM_USER_AVATAR'  => $fl['comment']['user_data']['avatar'],
    'COMM_REPLIES'      => $replies,
    ));
}

$fl['user_reactions']  = FL_GetPercentageOfReactions($fl['quiz']['id'],$fl['page']);
$user_reactions        = FL_LoadPage('story/user-reactions',array(
    'STORY_ID' => $fl['quiz']['id'],
    'STORY_PAGE' => $fl['page']
));

$page_context = array(
    'STORY_ID' => $fl['quiz']['id'],
    'STORY_TITLE' => $fl['quiz']['title'],
    'STORY_DESC' => $fl['quiz']['description'],
    'STORY_ADMIN_OPTIONS' => $news_admin_option,
    'STORY_VIEWS' => $fl['quiz']['views'],
    'STORY_ENTRIES' => FL_ForEachEntries($fl['quiz']['entries']),
    'STORY_AD' => FL_GetAd('between', false),
    'CATEGORY_NAME' => (!empty($fl['news_categories'][$fl['quiz']['category']])) ? $fl['news_categories'][$fl['quiz']['category']]: '',
    'CATEGORY_LINK' => '{{LINK latest-quiz/' . $fl['quiz']['category'] . '}}',
    'STORY_POSTED_TIME' => $fl['quiz']['posted'],
    'STORY_UPDATED_TIME' => $fl['quiz']['updated'],
    'STORY_LINK' => $fl['quiz']['url'],
    'STORY_ENCODED_URL' => urlencode($fl['quiz']['url']),
    'STORY_SHARES' => $fl['quiz']['shares'],

    'NEXT_LINK' => '',
    'BACK_LINK' => '',
    
    'EDIT_BUTTON' => FL_Link('edit-post/' . $fl['quiz']['id'] . '?type=quiz'),
    'DELETE_BUTTON' => FL_Link('delete-post/' . $fl['quiz']['id'] . '?type=quiz'),
    'PUBISH_BUTTON' => $publish_button,
    
    'PUBLISHER_NAME' => $fl['quiz']['publisher']['name'],
    'PUBLISHER_AVATAR' => $fl['quiz']['publisher']['avatar'],
    'PUBLISHER_VERIFIED' => ($fl['quiz']['publisher']['verified'] == 1) ? '<span class="verified-icon"><i class="fa fa-check-circle"></i></span>' : '',
    'PUBLISHER_URL' => $fl['quiz']['publisher']['url'],
    'PUBLISHER_GENDER' => ($fl['quiz']['publisher']['gender'] == 'male') ? $fl['lang']['male'] : $fl['lang']['female'],
    'PUBLISHER_COUNTRY' => (!empty($fl['quiz']['publisher']['country_id'])) ? ', Lives in ' . $fl['countries_name'][$fl['quiz']['publisher']['country_id']] : '',

    'NEW_SESSION_HASH' => $create_session,
    'SIDEBAR_HTML' => FL_LoadPage('sidebar/content', array('SIDEBAR_AD' => FL_GetAd('sidebar', false))),
    'MY_ID' => $fl['my_id'],
    'SHARE_BUTTON_ONE' => $share_onclick,
    'SHARE_BUTTON_TWITTER' => $share_twitter_onclick,

    'STORY_TAGS' => $tags,
    'STORY_COMMENT_TOTAL' => FL_CountPostComments($fl['quiz']['id'],$fl['page']),
    'STORY_COMMENTS' => $comments,
    'STORY_PAGE' => $fl['page'],
    'USER_REACTIONS' => $user_reactions,

    'SP_UAD_1' => '',
    'SP_UAD_2' => '',

    'SB_UAD_1' => '',
    'SB_UAD_2' => '',
    'SB_UAD_3' => '',
);


require_once('sources/ads/load_sp_ads.php');

$fl['content'] = FL_LoadPage("story/content", $page_context);
