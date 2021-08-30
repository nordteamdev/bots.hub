<?php

$action = $_GET['action'];
$votes_count = $_GET['votes-count'];

switch($action){
	
	
	case 'pay_success':
		?>
		<script>
		var votes_count = '<?php echo $votes_count;?>';
		
		var http = new XMLHttpRequest();
		var url = 'http://'+top.window.opener.location.hostname+'/cmd.php';
		var params = 'cmd=add-votes&votes='+votes_count;
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				
				
				
		top.close();
		
		top.window.opener.document.getElementById('d_paypal').style.display='none';
		top.window.opener.document.getElementById('buy_votes_sect').style.display='none';
		top.window.opener.document.getElementById('buy_votes_success').style.display='';
		top.window.opener.document.getElementById('reload_silent_page').setAttribute('href',top.window.opener.location.pathname+'?tk='+new Date().getTime());
			
			
				
				
			}
		}
		http.send(params);
		</script>

		<?php
	break;
	
	default:
	case 'pay_return':
		?>
		<script>
 
		top.close();

		</script>

		<?php
	break;
	
}

?>