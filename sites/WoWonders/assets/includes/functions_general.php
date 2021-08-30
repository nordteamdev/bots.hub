<?php
// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2016 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+
function sanitize_output($buffer) {

    $search = array(
        '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
        '/[^\S ]+\</s',     // strip whitespaces before tags, except space
        '/(\s)+/s',         // shorten multiple whitespace sequences
        '/<!--(.|\s)*?-->/' // Remove HTML comments
    );

    $replace = array(
        '>',
        '<',
        '\\1',
        ''
    );

    $buffer = preg_replace($search, $replace, $buffer);

    return $buffer;
}
function Wo_LoadPage($page_url = '') {
    global $wo,$db;
    $create_file = false;
    if ($page_url == 'sidebar/content' && $wo['loggedin'] == true && $wo['config']['cache_sidebar'] == 1) {
        $file_path = './cache/sidebar-' . $wo['user']['user_id'] . '.tpl';
        if (file_exists($file_path)) {
           $get_file = file_get_contents($file_path);
           if (!empty($get_file)) {
               return $get_file;
           }
        } else {
            $create_file = true;
        }
    }
    $page         = './themes/' . $wo['config']['theme'] . '/layout/' . $page_url . '.phtml';
    $page_content = '';
    ob_start();
    require($page);
    $page_content = ob_get_contents();
    ob_end_clean();
    if ($create_file == true && $wo['config']['cache_sidebar'] == 1) {
        $create_sidebar_file = file_put_contents($file_path, $page_content);
        setcookie("last_sidebar_update", time(), time() + (10 * 365 * 24 * 60 * 60));
    }
    return $page_content;
}

function Wo_CleanCache($user_id = '', $where = 'sidebar') {
    global $wo;
    if ($wo['config']['cache_sidebar'] == 0 || $wo['loggedin'] == false) {
        return false;
    }
    $file_path = './cache/sidebar-' . $wo['user']['user_id'] . '.tpl';
    if (file_exists($file_path)) {
        unlink($file_path);
    }
}

function Wo_CustomCode($a = false,$code = array()){
    global $wo;
    $theme       = $wo['config']['theme'];
    $data        = array();
    $result      = false;
    $custom_code = array(
        "themes/$theme/custom/js/head.js",
        "themes/$theme/custom/js/footer.js",
        "themes/$theme/custom/css/style.css",
    );
    if ($a == 'g') {
        foreach ($custom_code as $key => $filepath) {
            if (is_readable($filepath)) {
                $data[$key] = file_get_contents($filepath);
            } 
        }
        $result = $data;
    }
    else if($a == 'p' && !empty($code)){
        foreach ($code as $key => $content) {
            if (is_writable($custom_code[$key])) {
                @file_put_contents($custom_code[$key],$content);
            } 
        }
        $result = true;
    }
    return $result;
}
function Wo_LoadAdminPage($page_url = '') {
    global $wo,$db;
    $page         = './admin-panel/pages/' . $page_url . '.phtml';
    $page_content = '';
    ob_start();
    require($page);
    $page_content = ob_get_contents();
    ob_end_clean();
    return $page_content;
}
function Wo_LoadAdminLinkSettings($link = '') {
    global $site_url;
    return $site_url . '/admin-cp/' . $link;
}
function Wo_LoadAdminLink($link = '') {
    global $site_url;
    return $site_url . '/admin-panel/' . $link;
}
function Wo_SizeUnits($bytes = 0){
    if ($bytes >= 1073741824)
    {
        $bytes = round(($bytes / 1073741824)) . ' GB';
    }
    elseif ($bytes >= 1048576)
    {
        $bytes = round(($bytes / 1048576)) . ' MB';
    }
    elseif ($bytes >= 1024)
    {
        $bytes = round(($bytes / 1024)) . ' KB';
    }
    return $bytes;
}
function Wo_MultipleArrayFiles($file_post) {
    if (!is_array($file_post)) {
        return array();
    }
    $wo_file_array = array();
    $wo_file_count = count($file_post['name']);
    $wo_file_keys  = array_keys($file_post);
    for ($i=0; $i < $wo_file_count; $i++) {
        foreach ($wo_file_keys as $key) {
            $wo_file_array[$i][$key] = $file_post[$key][$i];
        }
    }
    return $wo_file_array;
}
function Wo_IsValidMimeType($mimeTypes = array()){
    if (!is_array($mimeTypes) || empty($mimeTypes)) {
        return false;
    }
    $result = true;
    foreach ($mimeTypes as  $value) {
        $type   = explode('/', $value);
        
        if ($type[0] != 'image' && $type[0] != 'video') {
            $result = false;
            break;
        }   
    }
    return $result;
}
function url_slug($str, $options = array()) {
    // Make sure string is in UTF-8 and strip invalid UTF-8 characters
    $str      = mb_convert_encoding((string) $str, 'UTF-8', mb_list_encodings());
    $defaults = array(
        'delimiter' => '-',
        'limit' => null,
        'lowercase' => true,
        'replacements' => array(),
        'transliterate' => false
    );
    // Merge options
    $options  = array_merge($defaults, $options);
    $char_map = array(
        // Latin
        'À' => 'A',
        'Á' => 'A',
        'Â' => 'A',
        'Ã' => 'A',
        'Ä' => 'A',
        'Å' => 'A',
        'Æ' => 'AE',
        'Ç' => 'C',
        'È' => 'E',
        'É' => 'E',
        'Ê' => 'E',
        'Ë' => 'E',
        'Ì' => 'I',
        'Í' => 'I',
        'Î' => 'I',
        'Ï' => 'I',
        'Ð' => 'D',
        'Ñ' => 'N',
        'Ò' => 'O',
        'Ó' => 'O',
        'Ô' => 'O',
        'Õ' => 'O',
        'Ö' => 'O',
        'Ő' => 'O',
        'Ø' => 'O',
        'Ù' => 'U',
        'Ú' => 'U',
        'Û' => 'U',
        'Ü' => 'U',
        'Ű' => 'U',
        'Ý' => 'Y',
        'Þ' => 'TH',
        'ß' => 'ss',
        'à' => 'a',
        'á' => 'a',
        'â' => 'a',
        'ã' => 'a',
        'ä' => 'a',
        'å' => 'a',
        'æ' => 'ae',
        'ç' => 'c',
        'è' => 'e',
        'é' => 'e',
        'ê' => 'e',
        'ë' => 'e',
        'ì' => 'i',
        'í' => 'i',
        'î' => 'i',
        'ï' => 'i',
        'ð' => 'd',
        'ñ' => 'n',
        'ò' => 'o',
        'ó' => 'o',
        'ô' => 'o',
        'õ' => 'o',
        'ö' => 'o',
        'ő' => 'o',
        'ø' => 'o',
        'ù' => 'u',
        'ú' => 'u',
        'û' => 'u',
        'ü' => 'u',
        'ű' => 'u',
        'ý' => 'y',
        'þ' => 'th',
        'ÿ' => 'y',
        // Latin symbols
        '©' => '(c)',
        // Greek
        'Α' => 'A',
        'Β' => 'B',
        'Γ' => 'G',
        'Δ' => 'D',
        'Ε' => 'E',
        'Ζ' => 'Z',
        'Η' => 'H',
        'Θ' => '8',
        'Ι' => 'I',
        'Κ' => 'K',
        'Λ' => 'L',
        'Μ' => 'M',
        'Ν' => 'N',
        'Ξ' => '3',
        'Ο' => 'O',
        'Π' => 'P',
        'Ρ' => 'R',
        'Σ' => 'S',
        'Τ' => 'T',
        'Υ' => 'Y',
        'Φ' => 'F',
        'Χ' => 'X',
        'Ψ' => 'PS',
        'Ω' => 'W',
        'Ά' => 'A',
        'Έ' => 'E',
        'Ί' => 'I',
        'Ό' => 'O',
        'Ύ' => 'Y',
        'Ή' => 'H',
        'Ώ' => 'W',
        'Ϊ' => 'I',
        'Ϋ' => 'Y',
        'α' => 'a',
        'β' => 'b',
        'γ' => 'g',
        'δ' => 'd',
        'ε' => 'e',
        'ζ' => 'z',
        'η' => 'h',
        'θ' => '8',
        'ι' => 'i',
        'κ' => 'k',
        'λ' => 'l',
        'μ' => 'm',
        'ν' => 'n',
        'ξ' => '3',
        'ο' => 'o',
        'π' => 'p',
        'ρ' => 'r',
        'σ' => 's',
        'τ' => 't',
        'υ' => 'y',
        'φ' => 'f',
        'χ' => 'x',
        'ψ' => 'ps',
        'ω' => 'w',
        'ά' => 'a',
        'έ' => 'e',
        'ί' => 'i',
        'ό' => 'o',
        'ύ' => 'y',
        'ή' => 'h',
        'ώ' => 'w',
        'ς' => 's',
        'ϊ' => 'i',
        'ΰ' => 'y',
        'ϋ' => 'y',
        'ΐ' => 'i',
        // Turkish
        'Ş' => 'S',
        'İ' => 'I',
        'Ç' => 'C',
        'Ü' => 'U',
        'Ö' => 'O',
        'Ğ' => 'G',
        'ş' => 's',
        'ı' => 'i',
        'ç' => 'c',
        'ü' => 'u',
        'ö' => 'o',
        'ğ' => 'g',
        // Russian
        'А' => 'A',
        'Б' => 'B',
        'В' => 'V',
        'Г' => 'G',
        'Д' => 'D',
        'Е' => 'E',
        'Ё' => 'Yo',
        'Ж' => 'Zh',
        'З' => 'Z',
        'И' => 'I',
        'Й' => 'J',
        'К' => 'K',
        'Л' => 'L',
        'М' => 'M',
        'Н' => 'N',
        'О' => 'O',
        'П' => 'P',
        'Р' => 'R',
        'С' => 'S',
        'Т' => 'T',
        'У' => 'U',
        'Ф' => 'F',
        'Х' => 'H',
        'Ц' => 'C',
        'Ч' => 'Ch',
        'Ш' => 'Sh',
        'Щ' => 'Sh',
        'Ъ' => '',
        'Ы' => 'Y',
        'Ь' => '',
        'Э' => 'E',
        'Ю' => 'Yu',
        'Я' => 'Ya',
        'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'e',
        'ё' => 'yo',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'j',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'h',
        'ц' => 'c',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'sh',
        'ъ' => '',
        'ы' => 'y',
        'ь' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya',
        // Ukrainian
        'Є' => 'Ye',
        'І' => 'I',
        'Ї' => 'Yi',
        'Ґ' => 'G',
        'є' => 'ye',
        'і' => 'i',
        'ї' => 'yi',
        'ґ' => 'g',
        // Czech
        'Č' => 'C',
        'Ď' => 'D',
        'Ě' => 'E',
        'Ň' => 'N',
        'Ř' => 'R',
        'Š' => 'S',
        'Ť' => 'T',
        'Ů' => 'U',
        'Ž' => 'Z',
        'č' => 'c',
        'ď' => 'd',
        'ě' => 'e',
        'ň' => 'n',
        'ř' => 'r',
        'š' => 's',
        'ť' => 't',
        'ů' => 'u',
        'ž' => 'z',
        // Polish
        'Ą' => 'A',
        'Ć' => 'C',
        'Ę' => 'e',
        'Ł' => 'L',
        'Ń' => 'N',
        'Ó' => 'o',
        'Ś' => 'S',
        'Ź' => 'Z',
        'Ż' => 'Z',
        'ą' => 'a',
        'ć' => 'c',
        'ę' => 'e',
        'ł' => 'l',
        'ń' => 'n',
        'ó' => 'o',
        'ś' => 's',
        'ź' => 'z',
        'ż' => 'z',
        // Latvian
        'Ā' => 'A',
        'Č' => 'C',
        'Ē' => 'E',
        'Ģ' => 'G',
        'Ī' => 'i',
        'Ķ' => 'k',
        'Ļ' => 'L',
        'Ņ' => 'N',
        'Š' => 'S',
        'Ū' => 'u',
        'Ž' => 'Z',
        'ā' => 'a',
        'č' => 'c',
        'ē' => 'e',
        'ģ' => 'g',
        'ī' => 'i',
        'ķ' => 'k',
        'ļ' => 'l',
        'ņ' => 'n',
        'š' => 's',
        'ū' => 'u',
        'ž' => 'z'
    );
    // Make custom replacements
    $str      = preg_replace(array_keys($options['replacements']), $options['replacements'], $str);
    // Transliterate characters to ASCII
    if ($options['transliterate']) {
        $str = str_replace(array_keys($char_map), $char_map, $str);
    }
    // Replace non-alphanumeric characters with our delimiter
    $str = preg_replace('/[^\p{L}\p{Nd}]+/u', $options['delimiter'], $str);
    // Remove duplicate delimiters
    $str = preg_replace('/(' . preg_quote($options['delimiter'], '/') . '){2,}/', '$1', $str);
    // Truncate slug to max. characters
    $str = mb_substr($str, 0, ($options['limit'] ? $options['limit'] : mb_strlen($str, 'UTF-8')), 'UTF-8');
    // Remove delimiter from ends
    $str = trim($str, $options['delimiter']);
    return $options['lowercase'] ? mb_strtolower($str, 'UTF-8') : $str;
}
function Wo_SeoLink($query = '') {
    global $wo, $config;
    if ($wo['config']['seoLink'] == 1) {
        $query = preg_replace(array(
            '/^index\.php\?link1=forumaddthred&fid=(\d+)$/i',
            '/^index\.php\?link1=welcome&link2=password_reset&user_id=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=welcome&last_url=(.*)$/i',
            '/^index\.php\?link1=([^\/]+)&query=$/i',
            '/^index\.php\?link1=post&id=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=post&id=([A-Za-z0-9_]+)&ref=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=terms&page=contact-us$/i',
            '/^index\.php\?link1=([^\/]+)&u=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=timeline&u=([A-Za-z0-9_]+)&type=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=messages&user=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=setting&page=([A-Za-z0-9_-]+)$/i',
            '/^index\.php\?link1=setting&user=([A-Za-z0-9_]+)&page=([A-Za-z0-9_-]+)$/i',
            '/^index\.php\?link1=([^\/]+)&app_id=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=([^\/]+)&hash=([^\/]+)$/i',
            '/^index\.php\?link1=([^\/]+)&link2=([^\/]+)$/i',
            '/^index\.php\?link1=([^\/]+)&type=([^\/]+)$/i',
            '/^index\.php\?link1=([^\/]+)&p=([^\/]+)$/i',
            '/^index\.php\?link1=([^\/]+)&g=([^\/]+)$/i',
            '/^index\.php\?link1=page-setting&page=([A-Za-z0-9_]+)&link3=([A-Za-z0-9_-]+)$/i',
            '/^index\.php\?link1=page-setting&page=([^\/]+)$/i',
            '/^index\.php\?link1=group-setting&group=([A-Za-z0-9_]+)&link3=([A-Za-z0-9_-]+)$/i',
            '/^index\.php\?link1=group-setting&group=([^\/]+)$/i',
            '/^index\.php\?link1=admincp&page=([^\/]+)$/i',
            '/^index\.php\?link1=game&id=([^\/]+)$/i',
            '/^index\.php\?link1=albums&user=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=create-album&album=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=edit-product&id=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=products&c_id=([A-Za-z0-9_]+)$/i',
            '/^index\.php\?link1=site-pages&page_name=(.*)$/i',
            '/^index\.php\?link1=create-blog$/i',
            '/^index\.php\?link1=my-blogs$/i',
            '/^index\.php\?link1=forum$/i',
            '/^index\.php\?link1=forumsadd&fid=(\d+)$/i',
            '/^index\.php\?link1=forums&fid=(\d+)$/i',
            '/^index\.php\?link1=showthread&tid=(\d+)$/i',
            '/^index\.php\?link1=threadreply&tid=(\d+)$/i',
            '/^index\.php\?link1=threadquote&tid=(\d+)$/i',
            '/^index\.php\?link1=editreply&tid=(\d+)$/i',
            '/^index\.php\?link1=edithread&tid=(\d+)$/i',
            '/^index\.php\?link1=mythreads$/i',
            '/^index\.php\?link1=mymessages$/i',
            '/^index\.php\?link1=read-blog&id=([^\/]+)$/i',
            '/^index\.php\?link1=blog-category&id=([^\/]+)$/i',
            '/^index\.php\?link1=edit-blog&id=([^\/]+)$/i',
            '/^index\.php\?link1=forum-members$/i',
            '/^index\.php\?link1=forum-members-byname&char=([a-zA-Z])$/i',
            '/^index\.php\?link1=forum-search$/i',
            '/^index\.php\?link1=forum-search-result$/i',
            '/^index\.php\?link1=forum-events$/i',
            '/^index\.php\?link1=forum-help$/i',
            '/^index\.php\?link1=events$/i',
            '/^index\.php\?link1=show-event&eid=(\d+)$/i',
            '/^index\.php\?link1=create-event$/i',
            '/^index\.php\?link1=edit-event&eid=(\d+)$/i',
            '/^index\.php\?link1=events-going$/i',
            '/^index\.php\?link1=events-invited$/i',
            '/^index\.php\?link1=events-interested$/i',
            '/^index\.php\?link1=events-past$/i',
            '/^index\.php\?link1=my-events$/i',
            '/^index\.php\?link1=movies$/i',
            '/^index\.php\?link1=movies-genre&genre=([A-Za-z-]+)$/i',
            '/^index\.php\?link1=movies-country&country=([A-Za-z-]+)$/i',
            '/^index\.php\?link1=watch-film&film-id=(\d+)$/i',
            '/^index\.php\?link1=ads$/i',
            '/^index\.php\?link1=wallet$/i',
            '/^index\.php\?link1=create-ads$/i',
            '/^index\.php\?link1=edit-ads&id=(\d+)$/i',
            '/^index\.php\?link1=chart-ads&id=(\d+)$/i',
            '/^index\.php\?link1=manage-ads&id=(\d+)$/i',
            '/^index\.php\?link1=create-status$/i',
            '/^index\.php\?link1=friends-nearby$/i',
            '/^index\.php\?link1=([^\/]+)$/i',
            '/^index\.php\?link1=welcome$/i',
        ), array(
            $config['site_url'] . '/forums/add/$1/',
            $config['site_url'] . '/password-reset/$1',
            $config['site_url'] . '/welcome/?last_url=$1',
            $config['site_url'] . '/search/$2',
            $config['site_url'] . '/post/$1',
            $config['site_url'] . '/post/$1?ref=$2',
            $config['site_url'] . '/terms/contact-us',
            $config['site_url'] . '/$2',
            $config['site_url'] . '/$1/$2',
            $config['site_url'] . '/messages/$1',
            $config['site_url'] . '/setting/$1',
            $config['site_url'] . '/setting/$1/$2',
            $config['site_url'] . '/$1/$2',
            $config['site_url'] . '/$1/$2',
            $config['site_url'] . '/$1/$2',
            $config['site_url'] . '/$1/$2',
            $config['site_url'] . '/p/$2',
            $config['site_url'] . '/g/$2',
            $config['site_url'] . '/page-setting/$1/$2',
            $config['site_url'] . '/page-setting/$1',
            $config['site_url'] . '/group-setting/$1/$2',
            $config['site_url'] . '/group-setting/$1',
            $config['site_url'] . '/admincp/$1',
            $config['site_url'] . '/game/$1',
            $config['site_url'] . '/albums/$1',
            $config['site_url'] . '/create-album/$1',
            $config['site_url'] . '/edit-product/$1',
            $config['site_url'] . '/products/$1',
            $config['site_url'] . '/site-pages/$1',
            $config['site_url'] . '/create-blog/',
            $config['site_url'] . '/my-blogs/',
            $config['site_url'] . '/forum/',
            $config['site_url'] . '/forums/add/$1/',
            $config['site_url'] . '/forums/$1/',
            $config['site_url'] . '/forums/thread/$1/',
            $config['site_url'] . '/forums/thread/reply/$1/',
            $config['site_url'] . '/forums/thread/quote/$1/',
            $config['site_url'] . '/forums/thread/edit/$1/',
            $config['site_url'] . '/forums/user/threads/edit/$1/',
            $config['site_url'] . '/forums/user/threads/',
            $config['site_url'] . '/forums/user/messages/',
            $config['site_url'] . '/read-blog/$1',
            $config['site_url'] . '/blog-category/$1',
            $config['site_url'] . '/edit-blog/$1',
            $config['site_url'] . '/forum/members/',
            $config['site_url'] . '/forum/members/$1/',
            $config['site_url'] . '/forum/search/',
            $config['site_url'] . '/forum/search-result/',
            $config['site_url'] . '/forum/events/',
            $config['site_url'] . '/forum/help/',
            $config['site_url'] . '/events/',
            $config['site_url'] . '/events/$1/',
            $config['site_url'] . '/events/create-event/',
            $config['site_url'] . '/events/edit/$1/',
            $config['site_url'] . '/events/going/',
            $config['site_url'] . '/events/invited/',
            $config['site_url'] . '/events/interested/',
            $config['site_url'] . '/events/past/',
            $config['site_url'] . '/events/my/',
            $config['site_url'] . '/movies/',
            $config['site_url'] . '/movies/genre/$1/',
            $config['site_url'] . '/movies/country/$1/',
            $config['site_url'] . '/movies/watch/$1/',
            $config['site_url'] . '/ads/',
            $config['site_url'] . '/wallet/',
            $config['site_url'] . '/ads/create/',
            $config['site_url'] . '/ads/edit/$1/',
            $config['site_url'] . '/ads/chart/$1/',
            $config['site_url'] . '/admin/ads/edit/$1/',
            $config['site_url'] . '/status/create/',
            $config['site_url'] . '/friends-nearby/',
            $config['site_url'] . '/$1',
            $config['site_url'],
        ), $query);
    } else {
        $query = $config['site_url'] . '/' . $query;
    }
    return $query;
}
function Wo_IsLogged() {
    if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
        $id = Wo_GetUserFromSessionID($_SESSION['user_id']);
        if (is_numeric($id) && !empty($id)) {
            return true;
        }
    } else if (!empty($_COOKIE['user_id']) && !empty($_COOKIE['user_id'])) {
        $id = Wo_GetUserFromSessionID($_COOKIE['user_id']);
        if (is_numeric($id) && !empty($id)) {
            return true;
        }
    } else {
        return false;
    }
}
function Wo_Redirect($url) {
    return header("Location: {$url}");
}
function Wo_Link($string) {
    global $site_url;
    return $site_url . '/' . $string;
}
function Wo_Sql_Result($res, $row = 0, $col = 0) {
    $numrows = mysqli_num_rows($res);
    if ($numrows && $row <= ($numrows - 1) && $row >= 0) {
        mysqli_data_seek($res, $row);
        $resrow = (is_numeric($col)) ? mysqli_fetch_row($res) : mysqli_fetch_assoc($res);
        if (isset($resrow[$col])) {
            return $resrow[$col];
        }
    }
    return false;
}
function Wo_UrlDomain($url)
{
    $host = @parse_url($url, PHP_URL_HOST);
    if (!$host){
        $host = $url;
    }
    if (substr($host, 0, 4) == "www."){
        $host = substr($host, 4);
    }
    if (strlen($host) > 50){
        $host = substr($host, 0, 47) . '...';
    }
    return $host;
}
function Wo_Secure($string, $censored_words = 1, $br = true, $strip = 0) {
    global $sqlConnect;
    $string = trim($string);
    $string = cleanString($string);
    $string = mysqli_real_escape_string($sqlConnect, $string);
    $string = htmlspecialchars($string, ENT_QUOTES);
    if ($br == true) {
        $string = str_replace('\r\n', " <br>", $string);
        $string = str_replace('\n\r', " <br>", $string);
        $string = str_replace('\r', " <br>", $string);
        $string = str_replace('\n', " <br>", $string);
    } else {
        $string = str_replace('\r\n', "", $string);
        $string = str_replace('\n\r', "", $string);
        $string = str_replace('\r', "", $string);
        $string = str_replace('\n', "", $string);
    }
    if ($strip == 1) {
        $string = stripslashes($string);
    }
    $string = str_replace('&amp;#', '&#', $string);
    if ($censored_words == 1) {
        global $config;
        $censored_words = @explode(",", $config['censored_words']);
        foreach ($censored_words as $censored_word) {
            $censored_word = trim($censored_word);
            $string        = str_replace($censored_word, '****', $string);
        }
    }
    return $string;
}
function Wo_BbcodeSecure($string) {
    global $sqlConnect;
    $string = trim($string);
    $string = mysqli_real_escape_string($sqlConnect, $string);
    $string = htmlspecialchars($string, ENT_QUOTES);
    $string = str_replace('\r\n', "[nl]", $string);
    $string = str_replace('\n\r', "[nl]", $string);
    $string = str_replace('\r', "[nl]", $string);
    $string = str_replace('\n', "[nl]", $string);
    $string = str_replace('&amp;#', '&#', $string);
    $string = strip_tags($string);
    $string = stripslashes($string);
    return $string;
}
function Wo_Decode($string) {
    return htmlspecialchars_decode($string);
}
function Wo_GenerateKey($minlength = 20, $maxlength = 20, $uselower = true, $useupper = true, $usenumbers = true, $usespecial = false) {
    $charset = '';
    if ($uselower) {
        $charset .= "abcdefghijklmnopqrstuvwxyz";
    }
    if ($useupper) {
        $charset .= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if ($usenumbers) {
        $charset .= "123456789";
    }
    if ($usespecial) {
        $charset .= "~@#$%^*()_+-={}|][";
    }
    if ($minlength > $maxlength) {
        $length = mt_rand($maxlength, $minlength);
    } else {
        $length = mt_rand($minlength, $maxlength);
    }
    $key = '';
    for ($i = 0; $i < $length; $i++) {
        $key .= $charset[(mt_rand(0, strlen($charset) - 1))];
    }
    return $key;
}
$can = 0;

function Wo_CropAvatarImage($file = '', $data = array()) {
    global $wo;
    if (empty($file)) {
        return false;
    }
    if (!isset($data['x']) || !isset($data['y']) || !isset($data['w']) || !isset($data['h'])) {
        return false;
    }
   
    if (!file_exists($file)) {
        $get_media = file_put_contents($file, file_get_contents(Wo_GetMedia($file)));
    }

    if (!file_exists($file)) {
        return false;
    }

    $imgsize = @getimagesize($file);
    if (empty($imgsize)) {
        return false;
    }

    $width = $data['w'];
    $height = $data['h'];
    $source_x = $data['x'];
    $source_y = $data['y'];
    $mime    = $imgsize['mime'];
    $image   = "imagejpeg";
    switch ($mime) {
        case 'image/gif':
            $image_create = "imagecreatefromgif";
            break;
        case 'image/png':
            $image_create = "imagecreatefrompng";
            break;
        case 'image/jpeg':
            $image_create = "imagecreatefromjpeg";
            break;
        default:
            return false;
            break;
    }
    $dest = imagecreatetruecolor($width, $height);
    $src = $image_create($file);
    $file = str_replace('_full', '', $file);
    imagecopy($dest, $src, 30, 30, $source_x, $source_y, $width, $height);
    $to_crop_array = array('x' => $source_x , 'y' => $source_y, 'width' => $width, 'height' => $height);
    $dest = imagecrop($src, $to_crop_array);
    imagejpeg($dest, $file, 100);
    Wo_Resize_Crop_Image($wo['profile_picture_width_crop'], $wo['profile_picture_height_crop'], $file, $file, 80);
    $s3 = Wo_UploadToS3($file);
    return true;
}
function Wo_Resize_Crop_Image($max_width, $max_height, $source_file, $dst_dir, $quality = 80) {
    $imgsize = @getimagesize($source_file);
    $width   = $imgsize[0];
    $height  = $imgsize[1];
    $mime    = $imgsize['mime'];
    $image   = "imagejpeg";
    switch ($mime) {
        case 'image/gif':
            $image_create = "imagecreatefromgif";
            break;
        case 'image/png':
            $image_create = "imagecreatefrompng";
            break;
        case 'image/jpeg':
            $image_create = "imagecreatefromjpeg";
            break;
        default:
            return false;
            break;
    }
    $dst_img = @imagecreatetruecolor($max_width, $max_height);
    $src_img = @$image_create($source_file);
    if (function_exists('exif_read_data')) {
        $exif          = @exif_read_data($source_file);
        $another_image = false;
        if (!empty($exif['Orientation'])) {
            switch ($exif['Orientation']) {
                case 3:
                    $src_img = @imagerotate($src_img, 180, 0);
                    @imagejpeg($src_img, $dst_dir, $quality);
                    $another_image = true;
                    break;
                case 6:
                    $src_img = @imagerotate($src_img, -90, 0);
                    @imagejpeg($src_img, $dst_dir, $quality);
                    $another_image = true;
                    break;
                case 8:
                    $src_img = @imagerotate($src_img, 90, 0);
                    @imagejpeg($src_img, $dst_dir, $quality);
                    $another_image = true;
                    break;
            }
        }
        if ($another_image == true) {
            $imgsize = @getimagesize($dst_dir);
            if ($width > 0 && $height > 0) {
                $width  = $imgsize[0];
                $height = $imgsize[1];
            }
        }
    }
    @$width_new = $height * $max_width / $max_height;
    @$height_new = $width * $max_height / $max_width;
    if ($width_new > $width) {
        $h_point = (($height - $height_new) / 2);
        @imagecopyresampled($dst_img, $src_img, 0, 0, 0, $h_point, $max_width, $max_height, $width, $height_new);
    } else {
        $w_point = (($width - $width_new) / 2);
        @imagecopyresampled($dst_img, $src_img, 0, 0, $w_point, 0, $max_width, $max_height, $width_new, $height);
    }
    @imagejpeg($dst_img, $dst_dir, $quality);
    if ($dst_img)
        @imagedestroy($dst_img);
    if ($src_img)
        @imagedestroy($src_img);
    return true;
}
function str_replace_first($search, $replace, $subject) {
    $pos = strpos($subject, $search);
    if ($pos !== false) {
        return substr_replace($subject, $replace, $pos, strlen($search));
    }
    return $subject;
}
function Wo_Time_Elapsed_String($ptime) {
    global $wo;
    $etime = time() - $ptime;
    if ($etime < 1) {
        return '0 seconds';
    }
    $a        = array(
        365 * 24 * 60 * 60 => $wo['lang']['year'],
        30 * 24 * 60 * 60 => $wo['lang']['month'],
        24 * 60 * 60 => $wo['lang']['day'],
        60 * 60 => $wo['lang']['hour'],
        60 => $wo['lang']['minute'],
        1 => $wo['lang']['second']
    );
    $a_plural = array(
        $wo['lang']['year'] => $wo['lang']['years'],
        $wo['lang']['month'] => $wo['lang']['months'],
        $wo['lang']['day'] => $wo['lang']['days'],
        $wo['lang']['hour'] => $wo['lang']['hours'],
        $wo['lang']['minute'] => $wo['lang']['minutes'],
        $wo['lang']['second'] => $wo['lang']['seconds']
    );
    foreach ($a as $secs => $str) {
        $d = $etime / $secs;
        if ($d >= 1) {
            $r = round($d);
            if ($wo['language_type'] == 'rtl') {
                $time_ago = $wo['lang']['time_ago'] . ' ' . $r . ' ' . ($r > 1 ? $a_plural[$str] : $str);
            } else {
                $time_ago = $r . ' ' . ($r > 1 ? $a_plural[$str] : $str) . ' ' . $wo['lang']['time_ago'];
            }
            return $time_ago;
        }
    }
}
function Wo_FolderSize($dir) {
    $count_size = 0;
    $count      = 0;
    $dir_array  = scandir($dir);
    foreach ($dir_array as $key => $filename) {
        if ($filename != ".." && $filename != "." && $filename != ".htaccess") {
            if (is_dir($dir . "/" . $filename)) {
                $new_foldersize = Wo_FolderSize($dir . "/" . $filename);
                $count_size     = $count_size + $new_foldersize;
            } else if (is_file($dir . "/" . $filename)) {
                $count_size = $count_size + filesize($dir . "/" . $filename);
                $count++;
            }
        }
    }
    return $count_size;
}
function Wo_SizeFormat($bytes) {
    $kb = 1024;
    $mb = $kb * 1024;
    $gb = $mb * 1024;
    $tb = $gb * 1024;
    if (($bytes >= 0) && ($bytes < $kb)) {
        return $bytes . ' B';
    } elseif (($bytes >= $kb) && ($bytes < $mb)) {
        return ceil($bytes / $kb) . ' KB';
    } elseif (($bytes >= $mb) && ($bytes < $gb)) {
        return ceil($bytes / $mb) . ' MB';
    } elseif (($bytes >= $gb) && ($bytes < $tb)) {
        return ceil($bytes / $gb) . ' GB';
    } elseif ($bytes >= $tb) {
        return ceil($bytes / $tb) . ' TB';
    } else {
        return $bytes . ' B';
    }
}
function Wo_ClearCache() {
    $path = 'cache';
    if ($handle = opendir($path)) {
        while (false !== ($file = readdir($handle))) {
            if (strripos($file, '.tmp') !== false) {
                @unlink($path . '/' . $file);
            }
        }
    }
}
function Wo_GetThemes() {
    global $wo;
    $themes = glob('themes/*', GLOB_ONLYDIR);
    return $themes;
}
function Wo_ReturnBytes($val) {
    $val  = trim($val);
    $last = strtolower($val[strlen($val) - 1]);
    switch ($last) {
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }
    return $val;
}
function getBaseUrl() {
    $currentPath = $_SERVER['PHP_SELF']; 
    $pathInfo = pathinfo($currentPath); 
    $hostName = $_SERVER['HTTP_HOST']; 
    return $hostName.$pathInfo['dirname'];
}
function Wo_MaxFileUpload() {
    //select maximum upload size
    $max_upload   = Wo_ReturnBytes(ini_get('upload_max_filesize'));
    //select post limit
    $max_post     = Wo_ReturnBytes(ini_get('post_max_size'));
    //select memory limit
    $memory_limit = Wo_ReturnBytes(ini_get('memory_limit'));
    // return the smallest of them, this defines the real limit
    return min($max_upload, $max_post, $memory_limit);
}
function Wo_CompressImage($source_url, $destination_url, $quality) {
    $imgsize = getimagesize($source_url);
    $finfof  = $imgsize['mime'];
    $image_c = 'imagejpeg';
    if ($finfof == 'image/jpeg') {
        $image = @imagecreatefromjpeg($source_url);
    } else if ($finfof == 'image/gif') {
        $image = @imagecreatefromgif($source_url);
    } else if ($finfof == 'image/png') {
        $image = @imagecreatefrompng($source_url);
    } else {
        $image = @imagecreatefromjpeg($source_url);
    }
    $quality = 50;
    if (function_exists('exif_read_data')) {
        $exif = @exif_read_data($source_url);
        if (!empty($exif['Orientation'])) {
            switch ($exif['Orientation']) {
                case 3:
                    $image = @imagerotate($image, 180, 0);
                    break;
                case 6:
                    $image = @imagerotate($image, -90, 0);
                    break;
                case 8:
                    $image = @imagerotate($image, 90, 0);
                    break;
            }
        }
    }
    @imagejpeg($image, $destination_url, $quality);
    return $destination_url;
}

function get_ip_address() {
    if (!empty($_SERVER['HTTP_X_FORWARDED']) && validate_ip($_SERVER['HTTP_X_FORWARDED']))
        return $_SERVER['HTTP_X_FORWARDED'];
    if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && validate_ip($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
        return $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    if (!empty($_SERVER['HTTP_FORWARDED_FOR']) && validate_ip($_SERVER['HTTP_FORWARDED_FOR']))
        return $_SERVER['HTTP_FORWARDED_FOR'];
    if (!empty($_SERVER['HTTP_FORWARDED']) && validate_ip($_SERVER['HTTP_FORWARDED']))
        return $_SERVER['HTTP_FORWARDED'];
    return $_SERVER['REMOTE_ADDR'];
}

function validate_ip($ip) {
    if (strtolower($ip) === 'unknown')
        return false;
    $ip = ip2long($ip);
    if ($ip !== false && $ip !== -1) {
        $ip = sprintf('%u', $ip);
        if ($ip >= 0 && $ip <= 50331647)
            return false;
        if ($ip >= 167772160 && $ip <= 184549375)
            return false;
        if ($ip >= 2130706432 && $ip <= 2147483647)
            return false;
        if ($ip >= 2851995648 && $ip <= 2852061183)
            return false;
        if ($ip >= 2886729728 && $ip <= 2887778303)
            return false;
        if ($ip >= 3221225984 && $ip <= 3221226239)
            return false;
        if ($ip >= 3232235520 && $ip <= 3232301055)
            return false;
        if ($ip >= 4294967040)
            return false;
    }
    return true;
}
function Wo_Backup($sql_db_host, $sql_db_user, $sql_db_pass, $sql_db_name, $tables = false, $backup_name = false) {
    $mysqli = new mysqli($sql_db_host, $sql_db_user, $sql_db_pass, $sql_db_name);
    $mysqli->select_db($sql_db_name);
    $mysqli->query("SET NAMES 'utf8'");
    $queryTables = $mysqli->query('SHOW TABLES');
    while ($row = $queryTables->fetch_row()) {
        $target_tables[] = $row[0];
    }
    if ($tables !== false) {
        $target_tables = array_intersect($target_tables, $tables);
    }
    $content = "-- phpMyAdmin SQL Dump
-- http://www.phpmyadmin.net
--
-- Host Connection Info: " . $mysqli->host_info . "
-- Generation Time: " . date('F d, Y \a\t H:i A ( e )') . "
-- Server version: " . mysqli_get_server_info($mysqli) . "
-- PHP Version: " . PHP_VERSION . "
--\n
SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";
SET time_zone = \"+00:00\";\n
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;\n\n";
    foreach ($target_tables as $table) {
        $result        = $mysqli->query('SELECT * FROM ' . $table);
        $fields_amount = $result->field_count;
        $rows_num      = $mysqli->affected_rows;
        $res           = $mysqli->query('SHOW CREATE TABLE ' . $table);
        $TableMLine    = $res->fetch_row();
        $content       = (!isset($content) ? '' : $content) . "
-- ---------------------------------------------------------
--
-- Table structure for table : `{$table}`
--
-- ---------------------------------------------------------
\n" . $TableMLine[1] . ";\n";
        for ($i = 0, $st_counter = 0; $i < $fields_amount; $i++, $st_counter = 0) {
            while ($row = $result->fetch_row()) {
                if ($st_counter % 100 == 0 || $st_counter == 0) {
                    $content .= "\n--
-- Dumping data for table `{$table}`
--\n\nINSERT INTO " . $table . " VALUES";
                }
                $content .= "\n(";
                for ($j = 0; $j < $fields_amount; $j++) {
                    $row[$j] = str_replace("\n", "\\n", addslashes($row[$j]));
                    if (isset($row[$j])) {
                        $content .= '"' . $row[$j] . '"';
                    } else {
                        $content .= '""';
                    }
                    if ($j < ($fields_amount - 1)) {
                        $content .= ',';
                    }
                }
                $content .= ")";
                if ((($st_counter + 1) % 100 == 0 && $st_counter != 0) || $st_counter + 1 == $rows_num) {
                    $content .= ";\n";
                } else {
                    $content .= ",";
                }
                $st_counter = $st_counter + 1;
            }
        }
        $content .= "";
    }
    $content .= "
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;";
    if (!file_exists('script_backups/' . date('d-m-Y'))) {
        @mkdir('script_backups/' . date('d-m-Y'), 0777, true);
    }
    if (!file_exists('script_backups/' . date('d-m-Y') . '/' . time())) {
        mkdir('script_backups/' . date('d-m-Y') . '/' . time(), 0777, true);
    }
    if (!file_exists("script_backups/" . date('d-m-Y') . '/' . time() . "/index.html")) {
        $f = @fopen("script_backups/" . date('d-m-Y') . '/' . time() . "/index.html", "a+");
        @fwrite($f, "");
        @fclose($f);
    }
    if (!file_exists('script_backups/.htaccess')) {
        $f = @fopen("script_backups/.htaccess", "a+");
        @fwrite($f, "deny from all\nOptions -Indexes");
        @fclose($f);
    }
    if (!file_exists("script_backups/" . date('d-m-Y') . "/index.html")) {
        $f = @fopen("script_backups/" . date('d-m-Y') . "/index.html", "a+");
        @fwrite($f, "");
        @fclose($f);
    }
    if (!file_exists('script_backups/index.html')) {
        $f = @fopen("script_backups/index.html", "a+");
        @fwrite($f, "");
        @fclose($f);
    }
    $folder_name = "script_backups/" . date('d-m-Y') . '/' . time();
    $put         = @file_put_contents($folder_name . '/SQL-Backup-' . time() . '-' . date('d-m-Y') . '.sql', $content);
    if ($put) {
        $rootPath = realpath('./');
        $zip      = new ZipArchive();
        $open     = $zip->open($folder_name . '/Files-Backup-' . time() . '-' . date('d-m-Y') . '.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);
        if ($open !== true) {
            return false;
        }
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($rootPath), RecursiveIteratorIterator::LEAVES_ONLY);
        foreach ($files as $name => $file) {
            if (!preg_match('/\bscript_backups\b/', $file)) {
                if (!$file->isDir()) {
                    $filePath     = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($rootPath) + 1);
                    $zip->addFile($filePath, $relativePath);
                }
            }
        }
        $zip->close();
        $mysqli->query("UPDATE " . T_CONFIG . " SET `value` = '" . date('d-m-Y') . "' WHERE `name` = 'last_backup'");
        $mysqli->close();
        return true;
    } else {
        return false;
    }
}
function Wo_isSecure() {
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443;
}
function copy_directory($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while (false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            if (is_dir($src . '/' . $file)) {
                copy_directory($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}
function delete_directory($dirname) {
    if (is_dir($dirname))
        $dir_handle = opendir($dirname);
    if (!$dir_handle)
        return false;
    while ($file = readdir($dir_handle)) {
        if ($file != "." && $file != "..") {
            if (!is_dir($dirname . "/" . $file))
                unlink($dirname . "/" . $file);
            else
                delete_directory($dirname . '/' . $file);
        }
    }
    closedir($dir_handle);
    rmdir($dirname);
    return true;
}
function Wo_CheckUserSessionID($user_id = 0, $session_id = '', $platform = 'web') {
    global $wo, $sqlConnect;
    if (empty($user_id) || !is_numeric($user_id) || $user_id < 0) {
        return false;
    }
    if (empty($session_id)) {
        return false;
    }
    $platform  = Wo_Secure($platform);
    $query     = mysqli_query($sqlConnect, "SELECT COUNT(`id`) as `session` FROM " . T_APP_SESSIONS . " WHERE `user_id` = '{$user_id}' AND `session_id` = '{$session_id}' AND `platform` = '{$platform}'");
    $query_sql = mysqli_fetch_assoc($query);
    if ($query_sql['session'] > 0) {
        return true;
    }
    return false;
}

function Wo_ValidateAccessToken($access_token = '') {
    global $wo, $sqlConnect;
    if (empty($access_token)) {
        return false;
    }
    $access_token = Wo_Secure($access_token);
    $query     = mysqli_query($sqlConnect, "SELECT user_id FROM " . T_APP_SESSIONS . " WHERE `session_id` = '{$access_token}' LIMIT 1");
    $query_sql = mysqli_fetch_assoc($query);
    if ($query_sql['user_id'] > 0) {
        return $query_sql['user_id'];
    }
    return false;
}

function ip_in_range($ip, $range) {
    if (strpos($range, '/') == false) {
        $range .= '/32';
    }
    // $range is in IP/CIDR format eg 127.0.0.1/24
    list($range, $netmask) = explode('/', $range, 2);
    $range_decimal    = ip2long($range);
    $ip_decimal       = ip2long($ip);
    $wildcard_decimal = pow(2, (32 - $netmask)) - 1;
    $netmask_decimal  = ~$wildcard_decimal;
    return (($ip_decimal & $netmask_decimal) == ($range_decimal & $netmask_decimal));
}
function br2nl($st) {
    $breaks   = array(
        "\r\n",
        "\r",
        "\n"
    );
    $st       = str_replace($breaks, "", $st);
    $st_no_lb = preg_replace("/\r|\n/", "", $st);
    return preg_replace('/<br(\s+)?\/?>/i', "\r", $st_no_lb);
}
function br2nlf($st) {
    $breaks   = array(
        "\r\n",
        "\r",
        "\n"
    );
    $st       = str_replace($breaks, "", $st);
    $st_no_lb = preg_replace("/\r|\n/", "", $st);
    $st =  preg_replace('/<br(\s+)?\/?>/i', "\r", $st_no_lb);
    return str_replace('[nl]', "\r", $st);
}
use Aws\S3\S3Client;

function makeFTPdir($ftp, $dir) {
    
}
function Wo_UploadToS3($filename, $config = array()) {
    global $wo;
    include_once('assets/libraries/s3/aws-autoloader.php');
    include_once("assets/libraries/spaces/spaces.php");
    include_once('assets/libraries/ftp/vendor/autoload.php');
    
    if ($wo['config']['amazone_s3'] == 0 && $wo['config']['ftp_upload'] == 0 && $wo['config']['spaces'] == 0) {
        return false;
    }

    if ($wo['config']['ftp_upload'] == 1) {
        $ftp = new \FtpClient\FtpClient();
        $ftp->connect($wo['config']['ftp_host'], false, $wo['config']['ftp_port']);
        $login = $ftp->login($wo['config']['ftp_username'], $wo['config']['ftp_password']);

        if ($login) {
            if (!empty($wo['config']['ftp_path'])) {
                if ($wo['config']['ftp_path'] != "./") {
                    $ftp->chdir($wo['config']['ftp_path']);
                }
            }
            $file_path = substr($filename, 0, strrpos( $filename, '/'));
            $file_path_info = explode('/', $file_path);
            $path = '';
            if (!$ftp->isDir($file_path)) {
                foreach ($file_path_info as $key => $value) {
                    if (!empty($path)) {
                        $path .= '/' . $value . '/' ;
                    } else {
                        $path .= $value . '/' ;
                    }
                    if (!$ftp->isDir($path)) {
                        $mkdir = $ftp->mkdir($path);
                    }
                } 
            }
            $ftp->chdir($file_path);
            $ftp->pasv(true);
            if ($ftp->putFromPath($filename)) {
                if (empty($config['delete'])) {
                    if (empty($config['amazon'])) {
                        @unlink($filename);
                    }
                } 
                $ftp->close();
                return true;
            }
            $ftp->close();
        }
    } else if ($wo['config']['amazone_s3'] == 1){
        if (empty($wo['config']['amazone_s3_key']) || empty($wo['config']['amazone_s3_s_key']) || empty($wo['config']['region']) || empty($wo['config']['bucket_name'])) {
            return false;
        }
        $s3 = new S3Client([
            'version'     => 'latest',
            'region'      => $wo['config']['region'],
            'credentials' => [
                'key'    => $wo['config']['amazone_s3_key'],
                'secret' => $wo['config']['amazone_s3_s_key'],
            ]
        ]);
        $s3->putObject([
            'Bucket' => $wo['config']['bucket_name'],
            'Key'    => $filename,
            'Body'   => fopen($filename, 'r+'),
            'ACL'    => 'public-read',
            'CacheControl' => 'max-age=3153600',
        ]);
        if (empty($config['delete'])) {
            if ($s3->doesObjectExist($wo['config']['bucket_name'], $filename)) {
                if (empty($config['amazon'])) {
                    @unlink($filename);
                }
                return true;
            }
        } else {
            return true;
        }
    } else if ($wo['config']['spaces'] == 1) {
        $key = $wo['config']['spaces_key'];
        $secret = $wo['config']['spaces_secret'];
        $space_name = $wo['config']['space_name'];
        $region = $wo['config']['space_region'];
        $space = new SpacesConnect($key, $secret, $space_name, $region);
        $upload = $space->UploadFile($filename, "public");
        if ($upload) {
            if (empty($config['delete'])) {
                if ($space->DoesObjectExist($filename)) {
                    if (empty($config['amazon'])) {
                        @unlink($filename);
                    }
                    return true;
                }
            } else {
                return true;
            }
            return true;
        }
    }
}
function Wo_DeleteFromToS3($filename, $config = array()) {
    global $wo;
    include_once('assets/libraries/s3/aws-autoloader.php');
    include_once("assets/libraries/spaces/spaces.php");
    include_once('assets/libraries/ftp/vendor/autoload.php');
    if ($wo['config']['amazone_s3'] == 0 && $wo['config']['ftp_upload'] == 0 && $wo['config']['spaces'] == 0) {
        return false;
    }
    if ($wo['config']['ftp_upload'] == 1) {
        $ftp = new \FtpClient\FtpClient();
        $ftp->connect($wo['config']['ftp_host'], false, $wo['config']['ftp_port']);
        $login = $ftp->login($wo['config']['ftp_username'], $wo['config']['ftp_password']);
        
        if ($login) {
            if (!empty($wo['config']['ftp_path'])) {
                if ($wo['config']['ftp_path'] != "./") {
                    $ftp->chdir($wo['config']['ftp_path']);
                }
            }
            $file_path = substr($filename, 0, strrpos( $filename, '/'));
            $file_name = substr($filename, strrpos( $filename, '/') + 1);
            $file_path_info = explode('/', $file_path);
            $path = '';
            if (!$ftp->isDir($file_path)) {
                return false;
            }
            $ftp->chdir($file_path);
            $ftp->pasv(true);
            if ($ftp->remove($file_name)) {
                return true;
            }
        }
    } else if ($wo['config']['amazone_s3'] == 1) {
        if (empty($wo['config']['amazone_s3_key']) || empty($wo['config']['amazone_s3_s_key']) || empty($wo['config']['region']) || empty($wo['config']['bucket_name'])) {
            return false;
        }
        $s3 = new S3Client([
            'version'     => 'latest',
            'region'      => $wo['config']['region'],
            'credentials' => [
                'key'    => $wo['config']['amazone_s3_key'],
                'secret' => $wo['config']['amazone_s3_s_key'],
            ]
        ]);
        $s3->deleteObject([
            'Bucket' => $wo['config']['bucket_name'],
            'Key'    => $filename,
        ]);
        if (!$s3->doesObjectExist($wo['config']['bucket_name'], $filename)) {
            return true;
        }
    } else if ($wo['config']['spaces'] == 1) {
        $key = $wo['config']['spaces_key'];
        $secret = $wo['config']['spaces_secret'];
        $space_name = $wo['config']['space_name'];
        $region = $wo['config']['space_region'];
        $space = new SpacesConnect($key, $secret, $space_name, $region);
        $delete = $space->DeleteObject($filename);
        if (!$space->DoesObjectExist($filename)) {
            return true;
        }
    }
}

if (!function_exists('glob_recursive')) {
   function glob_recursive($pattern, $flags = 0){
     $files = glob($pattern, $flags);
     foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
       $files = array_merge($files, glob_recursive($dir.'/'.basename($pattern), $flags));
     }
     return $files;
   }
}
function unzip_file($file, $destination){
    // create object
    $zip = new ZipArchive() ;
    // open archive
    if ($zip->open($file) !== TRUE) {
        return false;
    }
    // extract contents to destination directory
    $zip->extractTo($destination);
    // close archive
    $zip->close();
        return true;
}

function Wo_CanBlog() {
    global $wo;
    if ($wo['config']['blogs'] == 1) {
        if ($wo['config']['can_blogs'] == 0) {
            if (Wo_IsAdmin()) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}
function shuffle_assoc($list) { 
  if (!is_array($list)) return $list; 

  $keys = array_keys($list); 
  shuffle($keys); 
  $random = array(); 
  foreach ($keys as $key) { 
    $random[$key] = $list[$key]; 
  }
  return $random; 
} 

function Wo_GetIcon($icon) {
    global $wo;
    return $wo['config']['theme_url'] . '/icons/png/' . $icon . '.png'; 
}

function Wo_IsFileAllowed($file_name) {
    global $wo;
    $new_string        = pathinfo($file_name, PATHINFO_FILENAME) . '.' . strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extension_allowed = explode(',', $wo['config']['allowedExtenstion']);
    $file_extension    = pathinfo($new_string, PATHINFO_EXTENSION);
    if(!in_array($file_extension, $extension_allowed)){
        return false;
    }
    return true;
}

function Wo_ShortText($text = "", $len = 100) {
    if (empty($text) || !is_string($text) || !is_numeric($len) || $len < 1) {
        return "****";
    }
    if (strlen($text) > $len) {
        $text = mb_substr($text, 0, $len, "UTF-8") . "..";
    }
    return $text;
}

function Wo_DelexpiredEnvents(){
    global $wo,$sqlConnect;
    $t_events     = T_EVENTS;
    $t_events_inv = T_EVENTS_INV;
    $t_events_go  = T_EVENTS_GOING;
    $t_events_int = T_EVENTS_INT;
    $t_posts = T_POSTS;
    $sql          = "SELECT `id` FROM `$t_events` WHERE `end_date` < CURDATE()";
    
    @mysqli_query($sqlConnect,"DELETE FROM `$t_posts` WHERE `event_id` IN ({$sql})");
    @mysqli_query($sqlConnect,"DELETE FROM `$t_posts` WHERE `page_event_id` IN ({$sql})");
    @mysqli_query($sqlConnect,"DELETE FROM `$t_events_inv` WHERE `event_id` IN ({$sql})");
    @mysqli_query($sqlConnect,"DELETE FROM `$t_events_go` WHERE `event_id` IN ({$sql})");
    @mysqli_query($sqlConnect,"DELETE FROM `$t_events_int` WHERE `event_id` IN ({$sql})");
    @mysqli_query($sqlConnect,"DELETE FROM `$t_events` WHERE `end_date` < CURDATE()");
}

function ToObject($array) {
    $object = new stdClass();
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $value = ToObject($value);
        }
        if (isset($value)) {
            $object->$key = $value;
        }
    }
    return $object;
}

function ToArray($obj) {
    if (is_object($obj))
        $obj = (array) $obj;
    if (is_array($obj)) {
        $new = array();
        foreach ($obj as $key => $val) {
            $new[$key] = ToArray($val);
        }
    } else {
        $new = $obj;
    }
    return $new;
}
function fetchDataFromURL($url = '') {
    if (empty($url)) {
        return false;
    }
    $ch = curl_init($url);
    curl_setopt( $ch, CURLOPT_POST, false );
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt( $ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.7.12) Gecko/20050915 Firefox/1.0.7");
    curl_setopt( $ch, CURLOPT_HEADER, false );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt( $ch, CURLOPT_TIMEOUT, 5);
    return curl_exec( $ch );
}

function getBrowser() {
      $u_agent = $_SERVER['HTTP_USER_AGENT'];
      $bname = 'Unknown';
      $platform = 'Unknown';
      $version= "";
      // First get the platform?
      if (preg_match('/linux/i', $u_agent)) {
        $platform = 'linux';
      } elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
        $platform = 'mac';
      } elseif (preg_match('/windows|win32/i', $u_agent)) {
        $platform = 'windows';
      } elseif (preg_match('/iphone|IPhone/i', $u_agent)) {
        $platform = 'IPhone Web';
      } elseif (preg_match('/android|Android/i', $u_agent)) {
        $platform = 'Android Web';
      } else if (preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $u_agent)) {
        $platform = 'Mobile';
      }
      // Next get the name of the useragent yes seperately and for good reason
      if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) {
        $bname = 'Internet Explorer';
        $ub = "MSIE";
      } elseif(preg_match('/Firefox/i',$u_agent)) {
        $bname = 'Mozilla Firefox';
        $ub = "Firefox";
      } elseif(preg_match('/Chrome/i',$u_agent)) {
        $bname = 'Google Chrome';
        $ub = "Chrome";
      } elseif(preg_match('/Safari/i',$u_agent)) {
        $bname = 'Apple Safari';
        $ub = "Safari";
      } elseif(preg_match('/Opera/i',$u_agent)) {
        $bname = 'Opera';
        $ub = "Opera";
      } elseif(preg_match('/Netscape/i',$u_agent)) {
        $bname = 'Netscape';
        $ub = "Netscape";
      }
      // finally get the correct version number
      $known = array('Version', $ub, 'other');
      $pattern = '#(?<browser>' . join('|', $known) . ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
      if (!preg_match_all($pattern, $u_agent, $matches)) {
        // we have no matching number just continue
      }
      // see how many we have
      $i = count($matches['browser']);
      if ($i != 1) {
        //we will have two since we are not using 'other' argument yet
        //see if version is before or after the name
        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
          $version= $matches['version'][0];
        } else {
          $version= $matches['version'][1];
        }
      } else {
        $version= $matches['version'][0];
      }
      // check if we have a number
      if ($version==null || $version=="") {$version="?";}
      return array(
          'userAgent' => $u_agent,
          'name'      => $bname,
          'version'   => $version,
          'platform'  => $platform,
          'pattern'    => $pattern,
          'ip_address' => get_ip_address()
      );
}

function Wo_RunInBackground($data = array()) {
    ob_end_clean();
    header("Content-Encoding: none");
    header("Connection: close");
    ignore_user_abort();
    ob_start();
    if (!empty($data)) {
        header('Content-Type: application/json');
        echo json_encode($data);
    }
    $size = ob_get_length();
    header("Content-Length: $size");
    ob_end_flush();
    flush();
    session_write_close();
    if (is_callable('fastcgi_finish_request')) {
        fastcgi_finish_request();
    }
}

function watermark_image($target) {
    global $wo;
    include_once('assets/libraries/SimpleImage-master/src/claviska/SimpleImage.php');
    if ($wo['config']['watermark'] != 1) {
        return false;
    }
    try {
      $image = new \claviska\SimpleImage();

      $image
        ->fromFile($target) 
        ->autoOrient() 
        ->overlay("./themes/{$wo['config']['theme']}/img/icon.png", 'top left', 1, 30, 30) 
        ->toFile($target, 'image/jpeg');

      return true;
    } catch(Exception $err) {
      return $err->getMessage();
    }
}


function Wo_IsMobile() {
    $useragent = $_SERVER['HTTP_USER_AGENT'];
    if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))) {
        return true;
    }
    return false;
}

function cleanString($string) {
    return $string = preg_replace("/&#?[a-z0-9]+;/i","", $string); 
}