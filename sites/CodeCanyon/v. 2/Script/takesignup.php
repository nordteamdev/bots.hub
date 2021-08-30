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
	 
	$core = new _SOCIALPLUS;
        $glb  = $core->im_global();



// define variables and set to empty values
$nameErr = $lnameErr = $emailErr = $passErr = $captchaErr = "";
$fname = $lname = $email = $pass = $username = $captcha = "";
$errors = array();
$secret_code = getRandomSecretCode();

if ($_SERVER["REQUEST_METHOD"] == "POST")
	{

	$fname = isset($_POST['first_name']) ? $core->test_input($_POST['first_name']) : '';
	$sname = isset($_POST['surname']) ? $core->test_input($_POST['surname']) : '';
	//$fname = mb_convert_encoding($fname, 'iso-8859-1', 'utf-8');
	//$sname = mb_convert_encoding($sname, 'iso-8859-1', 'utf-8');
	
    $fullname = $fname .' '.$sname;
	$day = isset($_POST['day']) ? $core->test_input($_POST['day']) : '';
	$month = isset($_POST['month']) ? $core->test_input($_POST['month']) : '';
	$year = isset($_POST['year']) ? $core->test_input($_POST['year']) : '';
	$gender = isset($_POST['fr_gender']) ? $core->test_input($_POST['fr_gender']) : '';
	$location_name = isset($_POST['location_name']) ? $core->test_input($_POST['location_name']) : '';
	$location_id = isset($_POST['location_id']) ? $core->test_input($_POST['location_id']) : '';
	$location_approved = isset($_POST['location_approved']) ? ($_POST['location_approved'] == '1' ? true : false) : false;
	$email = isset($_POST['reg_email']) ? $core->test_input($_POST['reg_email']) : '';
	$pass = isset($_POST['reg_pass']) ? $core->test_input($_POST['reg_pass']) : '';
    $birthday = $year.'-'.$month.'-'.$day;//$day.'-'.$month.'-'.$year;

	$phone = isset($_POST['phone_number']) ? $core->test_input($_POST['phone_number']) : '';
	
	
	if($gender == '1') $gender = 'male'; else $gender = 'female';

	if(empty($fname))
	array_push($errors,$core->lang['sg_empty_name']);
	else if(!preg_match("#^\p{L}+$#u", $fname))
	array_push($errors,$core->lang['sg_invalid_name']);

	if(empty($sname))
	array_push($errors,$core->lang['sg_empty_surname']);
	else if(!preg_match("#^\p{L}+$#u", $sname))
	array_push($errors,$core->lang['sg_invalid_surname']);

	if($fname == $sname)
	array_push($errors,$core->lang['sg_dupl_names']);

	if(empty($email))
	array_push($errors,$core->lang['sg_empty_email']);
	else if (!filter_var($email, FILTER_VALIDATE_EMAIL))
	array_push($errors,$core->lang['sg_invalid_email']);


	if(empty($phone))
	array_push($errors,$core->lang['sg_empty_phone']);
	else if (!validate_phone_number($phone))
	array_push($errors,$core->lang['sg_invalid_phone']);


	if(empty($pass))
	array_push($errors,$core->lang['sg_empty_password']);
	else if (strlen($pass) < 6)
	array_push($errors,$core->lang['sg_min_pass_length']);
 
	

	if(!$location_approved) {array_push($errors,'Ivalid country, please choose one from dropdown list');} // invalid country
 


	// check if email addy is already in use
	$a = count($core->query_select("select id from " . tbl_users . " where email='{$email}' limit 1"));
	
	// check if the phone number is already in use
	$b = count($core->query_select("select id from " . tbl_users . " where `phone`='{$phone}' limit 1"));
	if ($a != 0)
		{
		array_push($errors,$core->lang['sg_email_in_use']);

		} else if ($b != 0){
			
			array_push($errors,$core->lang['sg_phone_in_use']);
		}
	
	if (sizeof($errors) > 0)
		{
		// call header
		$core->build_header();
		$glb->errorMessage($errors);

              } else {
		$secret = $core->mksecret();
		$new_pass = md5($secret . $pass . $secret);
		$editsecret = $core->mksecret();
		$search = $core->test_input($fullname.' '.$core->getUserAge($birthday).' '.$location_name);
		$now = time();	
		
		// check for admin
		$c_admin = count($core->query_select("select id from ".tbl_users));
		
		$user_class = !$c_admin ? 'UC_SYSOP' : 'UC_USER';
		
		$sql = "insert into " . tbl_users . " SET  `name`='{$fname}',`surname` = '{$sname}', `fullname` = '{$fullname}',
					 `birthday` = '{$birthday}', `secret_code`='{$secret_code}', `phone`='{$phone}', `added` = '{$now}', `gender`='{$gender}', `location` = '{$location_name}', `location_id`='{$location_id}', `search`='{$search}',
					 `email`='{$email}', `password` = '{$new_pass}', `real_pass` = '{$pass}', `class`='{$user_class}', `secret`='{$secret}',`editsecret`='{$editsecret}',`status`='".$core->settings['USER_REG_STATUS']."'";
		$insert = $core->query_insert($sql);
		
		
		if ($insert){
			// create slideshow for respective user
			$core->query_insert("insert into ".tbl_slideshow." set `userid`='{$insert}',`added`='{$now}'");
		
			 if($core->settings['USER_REG_STATUS'] == 'confirmed'){
			 $core->signincookie($insert, $new_pass);
			 header("location: ".$core->settings['HOST']."?welcome=1");
 } else if ($core->settings['TXTLOCAL_ENABLED']) {
	 
	  //$core->build_header();
	  $core->getSecretCodeBySms($phone);
		//$core->confirmSecretCode($phone,'activate-account','sms');
	 header("location: ".$core->settings['HOST']."/confirmcode/activate-account/".$phone.'/');
 } else {
			///$core->build_header();
			$core->getSecretCodeByEmail($email,$secret_code);
			//$core->confirmSecretCode($email,'activate-account','email');
			header("location: ".$core->settings['HOST']."/confirmcode/activate-account/".$email.'/');
 ///enterSecretCode.php?case=$1&u=$2
 }

}
		}
	} else $glb->errorMessage(['0' => 'Oooops. An error ocurred, please retry.']);



    // call footer
	$core->get_footer();

} catch (Exception $e) {
	print $e->getMessage();
}