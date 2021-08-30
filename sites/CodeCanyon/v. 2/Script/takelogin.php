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

// engine file
require_once('inc/_core.php');


try {
	// build engine
	$core = new _SOCIALPLUS;


} catch (Exception $e) {
	print $e->getMessage();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$c_expires = time() + (10 * 365 * 24 * 60 * 60);
$row = '';
$login = isset($_POST['st_email']) ? $core->test_input($_POST['st_email']) : '';
$pass  = isset($_POST['st_password']) ? $core->test_input($_POST['st_password']) : '';
$return_to = isset($_POST['returnto']) ? (!empty($_POST['returnto']) ? $_POST['returnto'] : false) : false;

// check if required fields are not empty
if(empty($login)) die("email|*|".$core->lang['lg_empty_email']);
else if(empty($pass)) die("pass|*|".$core->lang['lg_empty_pass']);

$phone_v1 = $login;
$phone_v2 = $core->settings['PHONE_PREFIX_CD'].$login;

$sql = "select id, secret_code,phone, email, password, secret, status, `username` from ".tbl_users." where ((`phone` = '{$phone_v1}' OR `phone`='{$phone_v2}') || email='{$login}' OR `username`='{$login}' OR `id`='{$login}')";
$query = $core->query_select($sql);

if(count($query) <= 0){

printf("!INVALID_ACC|*|".$core->lang['lg_invalid_account'], $login);
exit;

} else {

foreach($query as $result)
$row = $result;

if(!$row){

die("!SERVER_ERROR|*|".$core->lang['lg_error_occur']);

} else if($row['status'] == 'pending'){

$check_via_sms = (isset($row['phone']) && isset($row['secret_code']) && !empty($row['phone']) && !empty($row['secret_code']));
$link_via_email = '/getcode/activate-account/email/'.$row['phone'];
$link_via_sms = '/getcode/activate-account/sms/'.$row['email'];
$activate_account_link = $core->settings['TXTLOCAL_ENABLED'] ? ($check_via_sms ? $link_via_sms : $link_via_email) : $link_via_email;

die('!PENDING_ACC|*|<A hrefattr="true" href="'.$activate_account_link.'">'.$core->lang['lg_pending_account'].'</a>');

} else if ($row["password"] != md5($row["secret"] . $pass . $row["secret"]) || !$row['email']){

die("!INCORRECT_DETAILS|*|".$core->lang['lg_incorrect_pass_or_email']);

} else {

$core->signincookie($row["id"], $row["password"], 1, isset($_POST['st_remember']) ? $c_expires : '');

if( $return_to )
echo("location|*|".$return_to);
else {
echo("1");

}


}


}





} else 
die('0');