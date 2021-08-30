<?php
function foxy_dec($action, $string) {
    $output = false;
 
    $encrypt_method = "cast5-cbc";
    $secret_key = 'tost';
    $secret_iv = 'dfgfdg';
    $key = hash('sha256', $secret_key);
    $iv = substr(hash('sha256', $secret_iv), 0, 16);
 
    if( $action == 'encrypt' ) {
        $output = @openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);

        $out="";
		$text = preg_split('//u',$output,-1,PREG_SPLIT_NO_EMPTY);
		foreach ($text as $sumbol) {
			$out .= ord($sumbol)."|";
		}
		$output = substr($out, 0, -1);
    }
    else if( $action == 'decrypt' ){
    	$out="";
		$text = explode('|', $string);
		foreach ($text as $sumbol) {
			$out .= chr($sumbol);
		}
		$string=$out;

        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);

    }
 
    return $output;
}
?>