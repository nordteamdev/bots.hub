<?php

if ($fl['loggedin'] == false || (!FL_IsAdmin() && $fl['config']['can_post'] != 1)) {
    header("Location:" . $site_url);
    exit();
}

if ($fl['loggedin'] == false) {
    header("Location:" . FL_Link(''));
    exit();
}
if (empty($_GET['id'])) {
    header("Location:" . FL_Link(''));
    exit();
}
if (empty($_GET['type'])) {
    header("Location:" . FL_Link(''));
    exit();
}
$types = array(
    'news',
    'lists',
    'music',
    'videos',
    'polls',
    'quiz',
);
if (!in_array($_GET['type'], $types)) {
    header("Location:" . FL_Link(''));
    exit();
}
$type          = FL_Secure($_GET['type']);
$id            = FL_Secure($_GET['id']);
$is_post_owner = FL_IsPostOwner($id, $type);
if ($is_post_owner === false) {
    header("Location:" . FL_Link(''));
    exit();
}
$fl['post_data'] = array();
if ($type == 'news') {
    $include_type    = 'news';
}
if ($type == 'lists') {
    $include_type    = 'list';
}
if ($type == 'polls') {
    $include_type    = 'poll';
}
if ($type == 'videos') {
    $include_type    = 'video';
}
if ($type == 'music') {
    $include_type    = 'music';
}

if ($type == 'quiz') {
    $include_type    = 'quiz';
}

$fl['post_data'] = FL_GetEditPost($id, 0, $type);
if (empty($fl['post_data'])) {
    header("Location:" . FL_Link(''));
    exit();
}



$fl['post_data']['type'] = $type;
$fl['post_data']['type'] = $type;

$fl['title']       = $lang['edit_post'] . ' | ' . $fl['config']['title'];
$fl['description'] = $fl['config']['description'];
$fl['page']        = 'edit-post';
$fl['keywords']    = $fl['config']['keywords'];
$entries           = '';

$categories_string = $include_type . '_' . 'categories';
$categories = $fl[$categories_string];
$category_html = '';
foreach ($categories as $key => $category) {
    $selected = ($key == $fl['post_data']['category']) ? 'selected' : '';
    $category_html .= '<option value=" ' . $key . ' " ' . $selected . '> ' . $category . ' </option>';
}

if ($type == 'quiz') {
    $quiz_resilts = FL_GetQuizResults($id);
    if (empty($quiz_resilts)) {
        header("Location:" . FL_Link(''));
        exit();
    }

    $fl['post_data']['entries'] = array_merge($quiz_resilts,$fl['post_data']['entries']);
    $resilts   = "";
    $questions = "";

    foreach ($fl['post_data']['entries'] as $fl['key'] => $fl['entry']) {
        $entry_type = $fl['entry']['entry_type'];
        if ($entry_type == "result") {
            $values_to_change = array(
                'ENTRY_ID'        => $fl['entry']['id'],
                'ENTRY_TITLE'     => $fl['entry']['title'],
                'ENTRY_TEXT'      => $fl['entry']['text'],
                'ENTRY_IMAGE'     => FL_GetMedia($fl['entry']['image']),
            );
            $resilts .= FL_LoadPage("edit-post/entries/{$entry_type}", $values_to_change);
        }
        else if($entry_type == "question"){
            $values_to_change = array(
                'ENTRY_ID'        => $fl['entry']['id'],
                'ENTRY_TITLE'     => $fl['entry']['title'],
                'ENTRY_TEXT'      => $fl['entry']['text'],
                'ENTRY_IMAGE'     => $fl['entry']['image'],
            );
            $questions .= FL_LoadPage("edit-post/entries/{$entry_type}", $values_to_change);
        }
    }

    $entries = FL_LoadPage("edit-post/entries/quiz", array(
        'QUIZ_RESULTS'   => $resilts,
        'QUIZ_QUESTIONS' => $questions
    ));

}
else{

    foreach ($fl['post_data']['entries'] as $fl['key'] => $fl['entry']) {
        $entry_type = $fl['entry']['entry_type'];

        if (!empty($entry_type)) {
            $video_html               = '';
            $video_src                = '';
            $fl['entry']['poll_type'] = null;
            if (!empty($fl['entry']['poll_answers'][0])) {
                $fl['entry']['poll_type'] = $fl['entry']['poll_answers'][0]['type'];
            }
            if ($fl['entry']['entry_type'] == 'video') {
                $entry_content = 'entries/video';
                if ($fl['entry']['video_type'] == 'youtube') {
                    $html = FL_LoadPage('iframe/youtube');
                } else if ($fl['entry']['video_type'] == 'vine') {
                    $html = FL_LoadPage('iframe/vine');
                } else if ($fl['entry']['video_type'] == 'vimeo') {
                    $html = FL_LoadPage('iframe/vimeo');
                } else if ($fl['entry']['video_type'] == 'dailymotion') {
                    $html = FL_LoadPage('iframe/dailymotion');
                } else if ($fl['entry']['video_type'] == 'facebook') {
                    $html = FL_LoadPage('iframe/facebook');
                } else if ($fl['entry']['video_type'] == 'source') {
                    $html = FL_LoadPage('players/video',array(
                        'VIDEO_SRC' => FL_GetMedia($fl['entry']['video_url'])
                    ));
                    $video_src                = $fl['entry']['video_url'];
                    $_SESSION['uploads'][]    = $video_src;
                    $fl['entry']['video_url'] = '';

                }
                if (!empty($html)) {
                    $video_html = str_replace('{video_id}', $fl['entry']['video'], $html);
                }
            }
            $values_to_change = array(
                'ENTRY_ID' => $fl['entry']['id'],
                'ENTRY_TITLE' => $fl['entry']['title'],
                'ENTRY_TEXT' => $fl['entry']['text'],
                'ENTRY_IMAGE' => $fl['entry']['image'],
                'ENTRY_TWEET_URL' => $fl['entry']['tweet_url'],
                'ENTRY_TWEET' => html_entity_decode($fl['entry']['tweet']),
                'ENTRY_VIDEO' => $fl['entry']['video'],
                'ENTRY_VIDEO_TYPE' => $fl['entry']['video_type'],
                'ENTRY_VIDEO_URL' => $fl['entry']['video_url'],
                'ENTRY_VIDEO_SRC' => $video_src,
                'ENTRY_SOUNDCLOUD_ID' => $fl['entry']['soundcloud_id'],
                'ENTRY_INSTAGRAM' => html_entity_decode($fl['entry']['instagram']),
                'ENTRY_INSTAGRAM_URL' => $fl['entry']['instagram_url'],
                'ENTRY_FACEBOOK' => $fl['entry']['facebook_post'],
                'ENTRY_VIDEO_HTML' => $video_html
            );
            $entries .= FL_LoadPage("edit-post/entries/{$entry_type}", $values_to_change);

        }
    } 
}


// print_r($_SESSION['uploads']);
// exit();
$add_entries = "";
$new_pages   = array('quiz');
if (!in_array($type, $new_pages)) {
    $add_entries = FL_LoadPage("edit-post/add-entries");
}


$fl['content'] = FL_LoadPage("edit-post/content", array(
    'POST_ID' => $fl['post_data']['id'],
    'POST_TITLE' => $fl['post_data']['title'],
    'POST_SHORT_TITLE' => $fl['post_data']['short_title'],
    'POST_DESC' => $fl['post_data']['description'],
    'POST_TAGS' => $fl['post_data']['tags'],
    'POST_CATEGORY' => $fl['post_data']['category'],
    'POST_IMAGE' => FL_GetMedia($fl['post_data']['image']),
    'POST_ENTRIES' => $entries,
    'ADD_ENTRIES' => $add_entries,
    'PAGE_TYPE' => $include_type,
    'Categories' => $category_html,
    'SELECT_PER_PAGE_0' => ($fl['post_data']['entries_per_page'] == 0) ? ' selected' : '',
    'SELECT_PER_PAGE_1' => ($fl['post_data']['entries_per_page'] == 1) ? ' selected' : '',
    'SELECT_PER_PAGE_2' => ($fl['post_data']['entries_per_page'] == 2) ? ' selected' : '',
    'SELECT_PER_PAGE_4' => ($fl['post_data']['entries_per_page'] == 4) ? ' selected' : '',
    'SELECT_PER_PAGE_6' => ($fl['post_data']['entries_per_page'] == 6) ? ' selected' : '',
    'SELECT_PER_PAGE_8' => ($fl['post_data']['entries_per_page'] == 8) ? ' selected' : '',
    'SELECT_PER_PAGE_10' => ($fl['post_data']['entries_per_page'] == 10) ? ' selected' : ''
));
if (in_array($fl['page'], $fl['pages_home_array'])) {
    $fl['page_home'] = true;
}