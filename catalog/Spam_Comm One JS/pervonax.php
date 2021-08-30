<?php
//Токен брать тут u.to/token-vk-dlja-avtostatusa/EnTlBQ
//Токен брать тут u.to/super_access_token/uVy-Bw
$access_token = 'e39c74b0ad242588483a8c11019183f5e49636c066827162836505609cefc5afbea5c6fecf01eddeebdf2'; 
$ids = '166036059'; //ид группы , просто цифры
$RequestsGet = curl('https://api.vk.com/method/wall.get?owner_id=-'.$ids.'&count=1&filter=owner&access_token='.$access_token);
$json1 = json_decode($RequestsGet,1);
$countR = $json1[response][1][id];
$countD = $json1[response][1][reply_count];

if ($countD >= 1) {
$text="";
} else {
$text="Добавляйся%20к%20[darknetsu|нему](vk.com/darknetsu)%20в%20друзья!"; //вместо пробела используй "%20" ибо не запустит
}

$statusSet = curl('https://api.vk.com/method/wall.addComment?owner_id=-'.$ids.'&text='.$text.'&post_id='.$countR.'&access_token='.$access_token);
$jsonS = json_decode($statusSet,1);

if ($jsonS['response']=='1'){
addlog('OK');
}
else{
addlog('ERROR: '.$jsonS['error']['error_msg']);
}

function addlog($logtext){
$fp = fopen( './statusLog.txt', 'a' );
fwrite( $fp, '['.date( 'd.m.Y H:i:s', time() ).'] '.$logtext.PHP_EOL);
}

function curl( $url ){
$ch = curl_init( $url );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false );
curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
$response = curl_exec( $ch );
curl_close( $ch );
return $response;
}
?><!-- http://vk.com/Almazik2015 -->