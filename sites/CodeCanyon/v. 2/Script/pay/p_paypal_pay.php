<?php
$bussines_mail = base64_decode($_GET['k']);
$price = $_GET['price'];
$currency = $_GET['currency'];
$count = $_GET['count'];
$host = $_GET['host'];
$url = $_GET['url'];
 

$p_success_url = $host.'/'.$url.'&votes-count='.$count;
$cancel_url  = $host.'/'.$url.'&votes-count='.$count;


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
	<input type="hidden" name="notify_url" value="%s&action=pay_success">
	<input type="hidden" name="cmd" value="_xclick">
	<input type="hidden" name="bn" value="JavaScriptButton_buynow">
	<input type="hidden" name="env" value="www">
	<input type="hidden" name="return" value="%s&action=pay_return">
	<input type="hidden" name="cancel_return" value="%s&action=pay_return">
	<input type="hidden" name="page_style" value="huang_checkout">',$bussines_mail,$bussines_mail,'Buy Votes',$count,$price,$currency,'','0',$p_success_url,$cancel_url,$cancel_url);
?>
</form>