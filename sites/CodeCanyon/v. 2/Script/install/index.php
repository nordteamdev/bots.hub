<?php
/*
  Kontackt Installation
  By insociall.ru modified for Kontackt by Alex Dobrovolscki

*/
$version = '1.18';
if( isset( $_POST['install'] ) ) {
  
  $host = $_POST['host'];
  $user = $_POST['user'];
  $db = $_POST['db'];
  $pass = $_POST['pass'];
  $https = $_POST['https'];
  $domain = $_POST['domain'];
  
  $db_file = 'database.sql';
  $install_path = "../install/";
  
 
  
  /* Sql */

  ///$dbConnect = mysqli_connect($host, $user, $pass, $db);
  $dbConnect = new mysqli($host, $user, $pass) or die('error at connecting to db');
  //@mysqli_query( $dbConnect, "drop database if exists ".$db);// or die('<div style="background:blue;">'.$dbConnect->error.'</div>Error at deleteing your old database');
  //mysqli_query( $dbConnect, "CREATE DATABASE ".$db) or die('<div style="background:blue;">'.$dbConnect->error.'</div>Error at creating your database, if the error persist, please go to your phpmyadmin and delete your database, it will be generated automatically.');

  mysqli_set_charset($dbConnect, "utf8mb4") or die('An error occured at update your database charset, or your phpmyadmin not support <b>utf8mb4</b>.');
  mysqli_select_db($dbConnect,$db) or die('Error selecting MySQL database: ' . mysqli_error($dbConnect));

  $templine = '';
  $lines = file($db_file);
  
 

  foreach ($lines as $line) {
 
    if(substr($line, 0, 2) == '--' || $line == '')
      continue;

    $templine .= $line;
    if (substr(trim($line), -1, 1) == ';') {
      
      mysqli_query( $dbConnect, $templine) or die('Error performing query \'<strong>' . $templine . '\': ' . mysqli_error($dbConnect) . '<br /><br />');
      $templine = '';
      
    }

  }
  
  
  
  /* 
		update json file
  */
  
  // store site settings
  $dir = '../inc/json/ssettings/';
 
  $sc_settings = glob($dir."*.json");
 
	$sc_settings = $sc_settings[0];
	$_spst = json_decode(file_get_contents($sc_settings),true);
	$new_data = $_spst;
	$new_data['site']['host'] = $domain != 'localhost' ||  $domain != '127.0.0.1' ?  $https.'www.'.$domain : $https.$domain;
 
$json_update_err = false;
	

 if (file_exists($dir))
	deleteDir($dir);


    mkdir($dir, 0777, true);

	$random_string = generateRandomString(32);

		$fp = fopen($dir.$random_string . '.json', 'w');



if ( fwrite($fp, json_encode($new_data)) )
{
		fclose($fp);
			$json_update_err = true;
		
} 
  
  // create administrator
  		// check for admin
		$email = $_POST['sysop_email'];
		$sysop_name = $_POST['sysop_name'];
		$sysop_surname = $_POST['sysop_surname'];
		$fullname = $sysop_name.' '.$sysop_surname;
		$sysop_pass = $_POST['sysop_pass'];
		$user_class = 'UC_SYSOP';
		
		
		$secret = mksecret();
		$new_pass = md5($secret . $sysop_pass . $secret);
		$editsecret = mksecret();
		
		$admin_created = false;
		$sql = "insert into `users` SET  `name`='{$sysop_name}',`surname` = '{$sysop_surname}', `fullname` = '{$fullname}',
					 `birthday` = '', `secret_code`='7489', `phone`='', `added` = '".time()."', `gender`='male', `location` = 'Amsterdam, Netherlands', `location_id`='', `search`='',
					 `email`='{$email}', `password` = '{$new_pass}', `real_pass` = '{$sysop_pass}', `class`='{$user_class}', `secret`='{$secret}',`editsecret`='{$editsecret}',`status`='confirmed'";
		$insert =  mysqli_query( $dbConnect, $sql) or die('Error at creating administrator account. (err1)');;
		
		if ($insert){
			// create slideshow for respective user
			$sql_slideshow = "insert into `slideshow` set `userid`='{$insert}',`added`='".time()."'";
			
			mysqli_query( $dbConnect, $sql_slideshow) or die('Error at creating administrator account. (err2)');;
		
				$admin_created = true;
			 }
  
  
  
  
  
  
  
  
  
  /* Errors */
  
  if (!$dbConnect) {
    echo "Error: Error with connect to MySQL" . PHP_EOL;
    echo "Error number errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Error text: " . mysqli_connect_error() . PHP_EOL;
    exit;
  }
  
  if(!$json_update_err){
	  echo('An error occured at updating general settings!');
	  exit;
  }
  
  if(!$admin_created){
	  echo('An error occured at creating administrator account!');
	  exit;
  }
  
  
  if (empty($_POST["host"])) {
        echo('host is missing!');
  }
  if (empty($_POST["pass"])) {
        echo('password is missing!');
  }
  if (empty($_POST["db"])) {
        echo('database is missing!');
  }
  if (empty($_POST["user"])) {
        echo('user is missing!');
  }
  if (empty($_POST["domain"])) {
        echo('domain is missing!');
  }
  if (empty($_POST["https"])) {
        echo('https is missing!');
  }
  
  /* End */
 
 
  if(fconf($host,$user,$db,$pass,$https,$domain)){ 
  ///unlink($install_path);
  deleteDir($install_path);
  header("refresh:8; url=".$https.$domain."/?user=".$email."&tk=".time());
  echo('<h3>Congratulations, successfully installed.</h3><br/>Redirecting automatically... please wait.');

  }

} else {
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Kontackt Installation</title>
  <style>
    body, html {
      background: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    form {
      background: #fff;
      box-shadow: 0 0 3px #ccc;
      width: 600px;
      margin: 50px auto 20px;
      padding: 50px 20px;
    }
    form input {
      display: block;
      margin: 10px 0;
      border: 1px solid #2a80ba;
      padding: 10px;
      width: 50%;
    }
    .header {
      font-size: 25px;
      color: #2a80ba;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .button {
      width: 30%;
      background: #2a80ba;
      color: #fff;
      cursor: pointer;
    }
	select{
		
      margin: 10px 0;
      border: 1px solid #2a80ba;
      padding: 10px;box-sizing:border-box;
		width: 50%;
	}
  </style>
</head>
</body>
<form action="index.php" method="POST">
  <center>
  <div class="header">Kontackt Installation</div>
  <input name="host" type="text" value="" placeholder="Host">
  <input name="db" type="text" placeholder="Database name">
  <div style="font-size:11px;">Please go to your phpmyadmin and verify if the database exist, if not please create it.</div>
  <input name="user" type="text" placeholder="Database user">
  <input name="pass" type="text" placeholder="Database password">
  <input name="domain" type="text" value="" placeholder="Domain, e.g. your-site.org">
 
  <select name="https">
  <option value="http://">Use secure connection ? http or https</option>
  <option value="http://">http://</option>
  <option value="https://">https://</option>
  </select>
  
  <br/>
  <h2>Administrator Account</h2>
  
  <input name="sysop_email" type="text" value="" placeholder="Email">
  <input name="sysop_name" type="text" value="" placeholder="Name">
  <input name="sysop_surname" type="text" value="" placeholder="Surname">
  <input name="sysop_pass" type="text" value="" placeholder="Password">
  
  <input class="button" name="install"  type="submit" value="Install now">
  <br/>
  </center>
</form>
 



</body>
</html>
<?php
  
}

 
  
 function fconf($host,$user,$db,$pass,$https,$domain){
	 global $version;
	 
  /* Fconf.php */
  $fconf_file = '../inc/fconf.php';

$fconfHandle = fopen($fconf_file, 'w');
$is_https_on = $https == 'https://' ? 'true' : 'false';

 

$written =  <<<"FILE_CONTENTS"
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



// SQL connection
define('DBHOST', '{$host}'); # MySQL host
define('DBUSER', '{$user}'); # MySQL user
define('DBPASS', '{$pass}'); # MySQL password
define('DBNAME', '{$db}'); # MySQL database name


// version 1.1.7
define('_VERSION', '{$version}');

define('_INSTALLED', true);

// use https or http (secure connection)
define('HTTPS_ON', $is_https_on);

// default theme
define('_THEME', 'original'); 

define('IS_HTTPS', '{$https}');

// HOST
define('_HOST', IS_HTTPS.'{$domain}'); // your domain name without http://

FILE_CONTENTS;

fwrite($fconfHandle,$written);

fclose($fconfHandle);
  
  return true;
	 
 }
 
function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        throw new InvalidArgumentException("$dirPath must be a directory");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}





// generate random string
 function generateRandomString($length = 10) {
    /*$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;*/
	
	return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);

}
 function mksecret($len = 20) {
    $ret = "";
    for ($i = 0; $i < $len; $i++)
        $ret .= chr(rand(0,25)+65);
    return $ret;
}

?>