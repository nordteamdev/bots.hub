<?php
ini_set('default_socket_timeout', 900);
$bot = new Bot('токен от страницы');
while(true){
  $bot->bot();
}

class Bot{
  public $msg = [
    [
      'message' => 'Смотрите какой у меня классный канал, давайте вместе играть! Пожалуйста, не будь какафкой😏', //текст
      'resend' => '2758,2759', //ID сообщения
    ],
    [
      'message' => 'ребят, может быть кто то хочет дружить со мной? реально не хватает друзей.. если что пишите пожалуйста',
    ],
    [
      'message' => 'хочется нежностей...😈',
    ],
    [
      'message' => 'пощекотайте меня между ножек😈',
    ],
    [
      'message' => 'напишите мне под авой что я секси😍 ну и го общаться, или слабо?',
    ],
    [
      'message' => 'а сколько у вас см?))',
    ],
    [
      'message' => 'как же мне не хватает общения..(',
    ],
    [
      'message' => 'может кто то хочет поговорить о 18+ в лс?))'
    ]
  ];
  public $token, $api_v = '5.92';
  function __construct($token){
    $this->token = $token;
    $this->newServer();
  }
  public function newServer(){
    $s = json_decode(file_get_contents('https://api.vk.com/method/messages.getLongPollServer?v=5.92&access_token='.$this->token),1)['response'];
    $this->server = 'https://'.$s['server']."?act=a_check&key=".$s['key']."&wait=90&mode=2&version=3&ts=";
    if($this->server == null) die('vk gavno');
    $this->ts = $s['ts'];
    var_dump($s);
  }
  public function vstup(){
    $token2 = 'b5cc1f8fc1e8dfc92cdfee2597a185b5f19c638b199fd0bdd7293a28739ad981fbc9615fdecca39c6c72d';
    $gr = json_decode(file_get_contents('https://api.vk.com/method/groups.get?access_token='.$token2.'&v=5.92'),true)['response']['items'];
    $offset = 0;
      $r = json_decode(file_get_contents('https://api.vk.com/method/wall.get?count=100&offset='.$offset.'&owner_id=-'.$gr[array_rand($gr)].'&access_token='.$token2.'&v=5.87'),1)['response']['items'];
      for($i = 1; $i <= 100; $i++){
        if($r[$i]['from_id'] != $r[$i-1]['from_id']){
          $arr = preg_split('/vk.me\/join\//', $r[$i]['text']);
          if(isset($arr[1])){
            $link = str_replace(['https','[]'],'',preg_replace('/[^A-z0-9\/]/', '', explode(" ",$arr[1])[0]));
            $result = json_decode(file_get_contents('https://api.vk.com/method/messages.joinChatByInviteLink?access_token='.$this->token.'&v=5.87&link='.$link),1);
            if(isset($result['response']['chat_id'])){
              sleep(5);
              echo $this->vkApi('messages.send',['message' => 'приветики))) кто хочет познакомиться??', 'random_id'=>rand(), 'chat_id'=>$result['response']['chat_id']]);
              $res = 'Успех';
              $c++;
            }else{
              $res = $result['error']['error_msg'];
            }
            break;
          }
        }
    }
    echo 'Ссылка: '.$link.' / Результат: '.$res.PHP_EOL;
  }
  public function bot(){
    $data = $this->decode($this->server.$this->ts); 
    if(!isset($data['ts'])){
      $this->newServer(); return;
    }
    $this->ts = $data['ts']; if(!isset($data['updates'][0])) return;
    $d = $data['updates'][0];
    if($d[0] != 4) return;
    if($d[1]%50 != 0) return;
    var_dump($d);
    echo $this->vkApi('messages.setActivity',['type'=>'typing','chat_id'=>($d[3]-2000000000)]);
    sleep(mt_rand(3,5));
    $this->newMessage($d[3]-2000000000);
    $this->vstup();
  }
  public function decode($url){
    return json_decode(file_get_contents($url),1);
  }
  public function log($text){
    echo $text.PHP_EOL;
  }
  public function newMessage($cid){
    $mar = $this->msg[array_rand($this->msg)];
    echo $this->vkApi('messages.send',['message' => $mar['message'], 'forward_messages' => $mar['resend'], 'random_id'=>rand(), 'chat_id'=>$cid]);
  }
  public function vkApi($method,$params){
    $params['access_token'] = $this->token;
    $params['v'] = $this->api_v;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.vk.com/method/'.$method);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $curl_result = curl_exec($ch);
    curl_close($ch);
    var_dump(http_build_query($params));
    return $curl_result;
  }
}

 ?>
