<?php

/*

Kontackt License Agreement (DMCA License)

Copyright (c) 2015, Alex Dobrovolscki (dobriisasa@gmail.com)
All rights reserved.

* Redistributions of source code is strictly forbidden.

* By using Kontackt you may have your own purchase copy, if you are not own a license, you can buy one from https://codecanyon.net/user/dobrovolscki/portfolio.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/


require_once("../__cache/_core.php");
session_start();

 
$music = new _MUSIC_MODULE;
?>
<link rel="stylesheet" type="text/css" href="../css/checkout.css?v=2">
<?
$action = isset($_GET['action']) ? $_GET['action'] : '';
$s = isset($_GET['s']) ? $_GET['s'] : 0;
$song_id = isset($_GET['q']) ? $_GET['q'] : 0;
$b = isset($_GET['b']) ? $_GET['b'] : 0;
$song_title = $song_artist = $count = $key = '';


$query = $music->__om_query("select artist,title from ".nobil_om_songs." where id='$song_id'");
foreach($query as $res):
$song_title = $res['title'];
$song_artist = $res['artist'];
$verif = $music->__om_query("select COUNT(id) as count from ".nobil_om_purchased." where song='$song_id' and `user`=".$music->USER['id']);
foreach($verif as $c)
$count = $c['count'];
endforeach;

if($count > 0)
error('The payment process can\'t be continued, because you have already purchased this song, thanks.');

// if payment process was successfully
if($s){
$secret_session = isset($_SESSION['_secret']) ? $_SESSION['_secret'] : 0;

if($s === $_SESSION['_secret'] || $s === 'fortumo'){
$query = $music->__get_ajax_request($_SESSION['_song_id']);
unset($_SESSION['_secret']);
unset($_SESSION['_song_id']);
}else error('Sorry, an error occurred at downloading song, please contact the administration with subject [Invalid secret code].',1);

}
else 
{
if(!(int)$song_id && !$b)
error('Sorry you don\'t have selected any song for purchasing.'); 

if(!$b){
$key = sha1(time()+mt_rand(9,9999999999));
$_SESSION['_secret'] = $key;
$_SESSION['_song_id'] = $song_id;
}


$success_url = $wMusic_config['host'].'/music/downloads/download_song.php?s='.($action !== "paypal_success" ? $key : $_SESSION['_secret']);
$p_success_url = $wMusic_config['host'].'/music/downloads/download_song.php?action=paypal_success&b=1';
$cancel_url  = $wMusic_config['host'].'/music/downloads/download_song.php?b=1';

switch($action){

default: error('Thank you for using our services, you can choose another payment method from below.',true);

case 'skrill':

$url = 'https://www.moneybookers.com/app/payment.pl';
$fields_string = '';
$fields = array(
            	'pay_to_email'=> $wMusic_config['skrill_pay_to_email'],
		'return_url_target'=> '_self',
		'cancel_url_target'=> '_self',
            	'return_url'=> $success_url,
		'cancel_url'=> $cancel_url,
		'status_url'=> $cancel_url,
		'amount2_description'=> $wMusic_config['skrill_am_description'],
		'amount2'=>  $wMusic_config['download_song_price'],
		'language'=> $wMusic_config['skrill_language'],
		'amount' =>  $wMusic_config['download_song_price'],
		'currency'=> $wMusic_config['download_song_currency'],
		'detail1_description'=>$song_artist,
		'detail1_text' => $song_title,
		'confirmation_note' => $wMusic_config['skrill_confirmation_note'],
		'hide_login' => '1'
           
        	);

//url-ify the data for the POST
foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string,'&');

//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_POST,count($fields));
curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);

//execute post
$result = curl_exec($ch);

if (empty($result)) 
    // some kind of an error happened
    echo(curl_error($ch));

curl_close($ch);

break;

case 'sms':
?>



<script>
var b;
document.write('<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>');

document.write('<script src="//fortumo.com/javascripts/fmp_loader.js" type="text/javascript"><\/script>');

</script>
<?php
printf('<a id="fmp-button" style="display:none;" href="#" rel="%s"><img src="//fortumo.com/images/fmp/fortumopay_96x47.png" width="96" height="47" alt="Mobile Payments by Fortumo" border="0"></a>',$wMusic_config['fortumo_secret_key']);
?>
<script>
window.onload = function(){
setTimeout(function(){
$fmpJQLoader('#fmpboxOverlay').remove();
document.getElementById('fmp-button').click();
visible_sms_popup();
},500);
}

function visible_sms_popup(){
setTimeout(function(){
b = setInterval(function(){
if($fmpJQLoader('body').find('iframe#fcb').length == 0){
clearInterval(b);
parent.document.getElementById('skrill').click();
}
},300); // interval
},500); // timeOut
}

</script>
<?

break;


case 'paypal':
?>
<script>
function pp(url){
 var w = 970;
 var h = 790;
 var left = (screen.width/2)-(w/2);
 var top = (screen.height/2)-(h/2)-20;
 document.getElementById('p_btn_text').classList.add('invisible');
 document.getElementById('p_btn_wait').classList.add('active');
 window.open(url,'_blank','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left,true);
 
}
</script>
<div class="p_paypal_content">
<div class="paypal_logo"></div>
<button type="submit" class="m_song_payment_button" onclick="pp(document.URL.replace('action=paypal','action=p_w_pop'));"><span class="text" id="p_btn_text">Proceed to Payment</span><span id="p_btn_wait" class="waiting"></span></button>
</div>
<?php

break;
case 'paypal_success':

?>
<script>
top.window.opener.document.getElementById('p_btn_text').classList.remove('invisible');
top.window.opener.document.getElementById('p_btn_wait').classList.remove('active');
top.close();
top.window.opener.location ='<?php echo $success_url;?>';
</script>

<?php

break;
case 'paypal_return':

?>
<script>
//top.window.opener.document.getElementById('p_btn_text').classList.remove('invisible');
//top.window.opener.document.getElementById('p_btn_wait').classList.remove('active');
top.close();
top.window.opener.location ='<?php echo $cancel_url;?>';
</script>

<?php

break;
case 'p_w_pop':
?>
<script>
window.onload = function(){
document.getElementById("paypal_form").submit();
};
</script>
<form method="post" action="https://www.paypal.com/cgi-bin/webscr" id="paypal_form" class="paypal-button" target="_self" style="opacity: 1;">
<div class="hide" id="errorBox"></div><input type="hidden" name="button" value="buynow">
<?php
printf('<input type="hidden" name="business" value="%s">
	<input type="hidden" name="receiver_email" value="%s">
	<input type="hidden" name="item_name" value="%s">
	<input type="hidden" name="quantity" value="%s">
	<input type="hidden" name="amount" value="%s">
	<input type="hidden" name="currency_code" value="%s">
	<input type="hidden" name="shipping" value="%s">
	<input type="hidden" name="tax" value="%s">
	<input type="hidden" name="notify_url" value="%s">
	<input type="hidden" name="cmd" value="_xclick">
	<input type="hidden" name="bn" value="JavaScriptButton_buynow">
	<input type="hidden" name="env" value="www">
	<input type="hidden" name="return" value="%s&action=paypal_return">
	<input type="hidden" name="cancel_return" value="%s&action=paypal_return">
	<input type="hidden" name="page_style" value="huang_checkout">',$wMusic_config['paypal_account_email'],$wMusic_config['paypal_account_email'],$song_artist.' - '.$song_title,$wMusic_config['download_song_price'],'1',$wMusic_config['download_song_currency'],'','0',$p_success_url,$cancel_url,$cancel_url);
?>
</form>

<?
break;


}

}

function error($msg,$a = 0){

!$a ? printf('<div class="m_already_purchased">%s</div>',$msg) : printf('<div class="payment_error_code"> <div class="p_error_msg">%s</div></div>',$msg);
exit;
}