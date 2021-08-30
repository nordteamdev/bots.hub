<?php

require_once('config.php');

/*
 * Support: VK API v. 5.80
 * Licence: MIT
 * Author: Sherzod Mamadaliev
 * Contact: mamadaliev@yahoo.com
 */

class VK
{
    private $version = VERSION;
    private $url = 'https://api.vk.com/method/';
    private $token = TOKEN;
    private $key = KEY;
    public $data = '';

    public function __construct() {
        $this->data = json_decode(file_get_contents('php://input'), true);
        if ($this->data['type'] == 'confirmation') exit($this->key);
        else print('ok');
    }

    public function call($method, $params = []) {
        $params['access_token'] = $this->token;
        $params['v'] = $this->version;
        $url = $this->url.$method.'?'.http_build_query($params);
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($curl);
        curl_close($curl);
        $response = json_decode($json, true);
        return $response['response'];
    }
    public function send($peer_id, $message, $attachments = []) {
        return $this->call('messages.send', [
            'random_id' => rand(),
            'peer_id' => $peer_id,
            'message' => $message,
            'attachment' => implode(',', $attachments),
        ]);
    }
}
