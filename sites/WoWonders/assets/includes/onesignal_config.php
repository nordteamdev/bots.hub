<?php 
require_once('assets/libraries/onesignal/vendor/autoload.php');

use GuzzleHttp\Client as GuzzleClient;
use Http\Adapter\Guzzle5\Client as GuzzleAdapter;
use Http\Client\Common\HttpMethodsClient as HttpClient;
use Http\Message\MessageFactory\GuzzleMessageFactory;
use OneSignal\Config;
use OneSignal\Devices;
use OneSignal\OneSignal;

$One_config = new Config();
$One_config->setApplicationId($wo['config']['push_id']);
$One_config->setApplicationAuthKey($wo['config']['push_key']);

$Two_config = new Config();
$Two_config->setApplicationId($wo['config']['push_id_2']);
$Two_config->setApplicationAuthKey($wo['config']['push_key_2']);

$guzzle = new GuzzleClient();

function Wo_SendPushNotification($data = array(), $push_type = 'chat') {
    global $sqlConnect, $wo, $One_config, $Two_config, $guzzle;
    if (empty($data)) {
        return false;
    }
    if (empty($data['notification']['notification_content'])) {
        return false;
    }
    if (empty($data['send_to'])) {
        return false;
    }
    if ($wo['config']['push'] == 0) {
        return false;
    }
    $client = new HttpClient(new GuzzleAdapter($guzzle), new GuzzleMessageFactory());
    $config_data = ($push_type == 'native') ? $Two_config : $One_config;
    $api = new OneSignal($config_data, $client);
    $data['notification']['notification_content'] = Wo_EmoPhone($data['notification']['notification_content']);
    $data['notification']['notification_content'] = Wo_EditMarkup($data['notification']['notification_content']);
    $final_request_data = array(
        'include_player_ids' => $data['send_to'],
        'send_after' => new \DateTime('1 second'),
        'isChrome' => false,
        'contents' => array(
            'en' => $data['notification']['notification_content']
        ),
        'headings' => array(
            'en' => $data['notification']['notification_title']
        ),
        'android_led_color' => 'FF0000FF',
        'priority' => 10
    );
    if (!empty($data['notification']['notification_data'])) {
        $final_request_data['data'] = $data['notification']['notification_data'];
    }
    if (!empty($data['notification']['notification_image'])) {
        $final_request_data['large_icon'] = $data['notification']['notification_image'];
    }
    $send_notification = $api->notifications->add($final_request_data);
    if ($send_notification['id']) {
        return $send_notification['id'];
    }
    return false;
}
?>