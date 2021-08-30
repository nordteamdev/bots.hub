<?php
function myErrorHandler($errno, $errstr, $errfile, $errline)
{
    if (!(error_reporting() & $errno)) {
        return false;
    }

    switch ($errno) {
    case E_USER_ERROR:
        if(preg_match_all('/vkue.php|Updater.php/i', $errfile, $matches, PREG_SET_ORDER)){
            err("VKUE-ERROR", $errstr .", отчет отправлен разработчику.");
            global $vkue;
            get("https://vkue.unfox.ru/module/report.php?error=".urlencode("$errstr в строке: $errline файла: $errfile, Версия - ".$vkue->version));
        }else{
            err("ERROR", "$errstr в строке: $errline файла: $errfile");
        }
        break;

    case E_USER_WARNING:
        if(preg_match_all('/vkue.php|Updater.php/i', $errfile, $matches, PREG_SET_ORDER)){
            err("VKUE-ERROR", $errstr .", отчет отправлен разработчику.");
            global $vkue;
            get("https://vkue.unfox.ru/module/report.php?error=".urlencode("$errstr в строке: $errline файла: $errfile, Версия - ".$vkue->version));
        }else{
            err("WAR", "$errstr в строке: $errline файла: $errfile");
        }
        break;

    case E_USER_NOTICE:
        if(preg_match_all('/vkue.php|Updater.php/i', $errfile, $matches, PREG_SET_ORDER)){
            err("VKUE-ERROR", $errstr .", отчет отправлен разработчику.");
            global $vkue;
            get("https://vkue.unfox.ru/module/report.php?error=".urlencode("$errstr в строке: $errline файла: $errfile, Версия - ".$vkue->version));
        }else{
            err("NOTICE", "$errstr в строке: $errline файла: $errfile");
        }
        break;

    default:
        if(preg_match_all('/vkue.php|Updater.php/i', $errfile, $matches, PREG_SET_ORDER)){
            err("VKUE-ERROR", $errstr .", отчет отправлен разработчику.");
            global $vkue;
            get("https://vkue.unfox.ru/module/report.php?error=".urlencode("$errstr в строке: $errline файла: $errfile, Версия - ".$vkue->version));
        }else{
            err("UNKNOWN", "$errstr в строке: $errline файла: $errfile");
        }
        break;
    }
    return true;
}
function messagesHandler($errno, $errstr, $errfile, $errline)
{
    if (!(error_reporting() & $errno)) {
        return false;
    }

    switch ($errno) {
    case E_USER_ERROR:
        send_err("▌Произошла ошибка при выполнении кода!\nERROR - $errstr");
        break;

    case E_USER_WARNING:
        send_err("▌Произошла ошибка при выполнении кода!\nWAR - $errstr");
        break;

    case E_USER_NOTICE:
        send_err("▌Произошла ошибка при выполнении кода!\nNOTICE - $errstr");
        break;

    default:
        send_err("▌Произошла ошибка при выполнении кода!\nUNKNOWN - $errstr");
        break;
    }
    return true;
}
function my_eval($q, $settings){
	global $msg, $update,$data, $vkue, $cmds;
	ob_start();
	if(in_array($msg->from_id, $settings['admins'])){
		try {
			$tot = htmlspecialchars_decode($q);
			$tot = str_ireplace("\n", "", $tot);
			$tot = str_ireplace("<br>", "", $tot);
			$tot = str_ireplace("&quot;", "", $tot);
			   	eval($tot);
			$data = ob_get_contents();
		} catch (Exception $e) {
		}
		return "▌Result: ".strip_tags($data);
		}else{
		return "Вы не администратор!";
		}
		ob_end_clean();
        if(php_sapi_name() == 'cli'){
            $old_error_handler = set_error_handler("myErrorHandler");
        }
}
function regex($wrd){
global $msg;
if(preg_match_all($wrd, $msg->body, $matches, PREG_SET_ORDER)){
global $params;
$params = $matches[0];
return true;
}
}
function download($url, $filename) {

$fl = curl_init($url);
$file = fopen($filename, 'w+');
curl_setopt($fl, CURLOPT_FILE, $file);
curl_setopt($fl, CURLOPT_HEADER, 0);
curl_exec($fl);
curl_close($fl);
fclose($file);

}
function admin(){
  global $msg;
  global $admins;
  if(in_array($msg['from_id'], $admin)){
    return true;
  }
}
function ctime($name){
if(isset($GLOBALS['microtime'][$name])){
$start = $GLOBALS['microtime'][$name];
unset($GLOBALS['microtime'][$name]);
return '('.round(microtime(true) - $start, 5)." sec)";
}else{
$GLOBALS['microtime'][$name] = microtime(true);
}
}
function uptime(){

    if(date('H', time()-START_TIME) < 3600)return "0:".date('i:s', time()-START_TIME);
    return date('H:i:s', time()-START_TIME);
}
function get($url, $array=true){
    return json_decode(file_get_contents($url), $array);
}
function notif($des,$text){
    console(
        Colors::white_bold(date('[H:i:s]', time())),
        Colors::blue_bold('['),
        Colors::green_bold($des),
        Colors::blue_bold(']: '),
        Colors::white_bold($text)
        );
}
function perr($text){
    console(
        Colors::white_bold(date('[H:i:s]', time())),
        Colors::red_bold('[ERROR] : '),
        Colors::white_bold($text)
        );
}
function send_err($text){
    global $vkue;
    $vkue->send($text);
}
function err($not,$text){
    global $settings;
    global $vkue;
    if(isset($settings['err_send']) and $settings['err_send'] == true){
        send_err("▌Произошла ошибка при выполнении кода!\n$not - $text");
    }
    console(
        Colors::white_bold(date('[H:i:s]', time())),
        Colors::red_bold('['.$not.'] : '),
        Colors::white_bold($text)
    );
}
function curl($url){
    if( $curl = curl_init() ) {
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
        $out = curl_exec($curl);
        curl_close($curl);
        return json_decode($out, true);
    }
}
?>