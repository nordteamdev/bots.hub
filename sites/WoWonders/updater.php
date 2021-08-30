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
// require_once('config.php');
// require_once('assets/includes/tabels.php');
// $f = '';
// $data = array();
// $s = '';
// if (isset($_GET['f'])) {
//     $f = Wo_Secure($_GET['f'], 0);
// }
// if (isset($_GET['s'])) {
//     $s = Wo_Secure($_GET['s'], 0);
// }
// $hash_id = '';
// if (!empty($_POST['hash_id'])) {
//     $hash_id = $_POST['hash_id'];
// } else if (!empty($_GET['hash_id'])) {
//     $hash_id = $_GET['hash_id'];
// } else if (!empty($_GET['hash'])) {
//     $hash_id = $_GET['hash'];
// } else if (!empty($_POST['hash'])) {
//     $hash_id = $_POST['hash'];
// }
// function Wo_CheckMainSession($hash = '') {
//     if (!isset($_SESSION['main_hash_id']) || empty($_SESSION['main_hash_id'])) {
//         return false;
//     }
//     if (empty($hash)) {
//         return false;
//     }
//     if ($hash == $_SESSION['main_hash_id']) {
//         return true;
//     }
//     return false;
// }
// $wo         = array();
// // Connect to SQL Server
// $sqlConnect = mysqli_connect($sql_db_host, $sql_db_user, $sql_db_pass, $sql_db_name, 3306);
// function Wo_Secure($string, $censored_words = 1) {
//     global $sqlConnect;
//     $string = trim($string);
//     $string = htmlspecialchars($string, ENT_QUOTES);
//     $string = str_replace('\\n', " <br>", $string);
//     $string = str_replace('\\r', " <br>", $string);
//     $string = str_replace('\\r\\n', " <br>", $string);
//     $string = str_replace('\\n\\r', " <br>", $string);
//     $string = str_replace('&amp;#', '&#', $string);
//     if ($censored_words == 1) {
//         global $config;
//         $censored_words = @explode(",", $config['censored_words']);
//         foreach ($censored_words as $censored_word) {
//             $censored_word = trim($censored_word);
//             $string        = str_replace($censored_word, '****', $string);
//         }
//     }
//     return $string;
// }
// function unzip_file($file, $destination) {
//     // create object
//     $zip = new ZipArchive() ;
//     // open archive
//     if ($zip->open($file) !== TRUE) {
//         return false;
//     }
//     // extract contents to destination directory
//     $zip->extractTo($destination);
//     // close archive
//     $zip->close();
//         return true;
// }

// $theme_name = 'wowonder';
// $query = mysqli_query($sqlConnect, "SELECT `value` FROM " . T_CONFIG . " WHERE `name` = 'theme'");
// $mysqli_fetch = mysqli_fetch_assoc($query);
// if (!empty($mysqli_fetch['value'])) {
//     $theme_name = $mysqli_fetch['value'];
// }

// $version = '';
// $query = mysqli_query($sqlConnect, "SELECT `value` FROM " . T_CONFIG . " WHERE `name` = 'script_version'");
// $mysqli_fetch = mysqli_fetch_assoc($query);
// if (!empty($mysqli_fetch['value'])) {
//     $version = Wo_Secure($mysqli_fetch['value']);
// }
// if ($f == 'run_updater') {
//     $arrContextOptions = array(
//         "ssl" => array(
//             "verify_peer" => false,
//             "verify_peer_name" => false
//         )
//     );
//     if (!empty($_GET['purchase_code'])) {
//         $purchase_code = Wo_Secure($_GET['purchase_code']);
//         if (empty($version)) {
//             $version = Wo_Secure($_GET['script_version']);
//         }
//         $siteurl = urlencode($_SERVER['SERVER_NAME']);
//         $file = file_get_contents("http://www.wowonder.com/check_for_updates.php?code={$purchase_code}&version=$version&url=$siteurl&check_for=true", false, stream_context_create($arrContextOptions));
//         $check = json_decode($file, true);
//         if (!empty($check['status'])) {
//             if ($check['status'] == 'SUCCESS') {
//                 if (!empty($check['versions'])) {
//                     foreach ($check['versions'] as $key => $version) {
//                         $updater = file_put_contents('script.zip', file_get_contents("https://www.wowonder.com/get_update.php?code={$purchase_code}&version=$version&url=$siteurl", false, stream_context_create($arrContextOptions)));
//                         if ($updater && file_exists('script.zip')) {
//                             $updater = file_put_contents('theme.zip', file_get_contents("https://www.wowonder.com/get_update.php?code={$purchase_code}&version=$version&theme=true&url=$siteurl", false, stream_context_create($arrContextOptions)));
//                             $updater = file_put_contents('wonderful.zip', file_get_contents("https://www.wowonder.com/get_update.php?code={$purchase_code}&version=$version&wonderful=true&url=$siteurl", false, stream_context_create($arrContextOptions)));
//                             if ($updater) {
//                                 $unzip_file = unzip_file('script.zip', './');
//                                 if ($unzip_file) {
//                                     if (file_exists('theme.zip') && file_exists('./themes/wowonder')) {
//                                         $unzip_file = unzip_file('theme.zip', './themes/wowonder/');
//                                     }
//                                     if (file_exists('wonderful.zip') && file_exists('./themes/wonderful')) {
//                                         $unzip_file = unzip_file('wonderful.zip', './themes/wonderful/');
//                                     }
//                                     if (file_exists('update.php')) {
//                                         $file = file_get_contents($site_url . "/update.php", false, stream_context_create($arrContextOptions));
//                                     }
//                                     if (file_exists('theme.zip')) {
//                                         unlink('theme.zip');
//                                     }
//                                     if (file_exists('script.zip')) {
//                                         unlink('script.zip');
//                                     }
//                                     if (file_exists('wonderful.zip')) {
//                                         unlink('wonderful.zip');
//                                     }
//                                     $data['status'] = 200;
//                                 } else {
//                                     $data['status'] = 400;
//                                     $data['ERROR_NAME'] = 'Error found while updating, please update your site manually.';
//                                 }
//                             }
//                         }  else {
//                             $data['status'] = 400;
//                             $data['ERROR_NAME'] = 'Error found while updating, please update your site manually.';
//                         }
//                     }
//                 } else {
//                     $data['status'] = 400;
//                     $data['ERROR_NAME'] = 'Error found while updating, please update your site manually.';
//                 } 
//             } else {
//                 $data['status'] = 400;
//                 $data['ERROR_NAME'] = $check['ERROR_NAME'];
//             }
//         } else {
//             $data['status'] = 400;
//             $data['ERROR_NAME'] = 'Error found while updating, please update your site manually.';
//         } 
//     }
//     header("Content-type: application/json");
//     echo json_encode($data);
//     exit();
// }