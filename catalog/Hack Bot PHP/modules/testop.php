<?php

function getRating($type){
	global $UserInfo,$userId,$Nick,$mysqli;
	$result_set = $mysqli->query("SELECT * FROM `users` ORDER BY `users`.`dollar` DESC");
	$i = 1;
	$str = '';
	while(($row = $result_set->fetch_assoc()) !=false){
		if ($row['role']>=2 
		if($row['nicknf']==0){
			$Nickc = $row['name'];
		}else{
			$Nickc = "[id".$row['id_VK']."|".$row['name']."]";
		}
		$str.= ConvertNumberEmoji($i).' '.$Nickc.' — 💰'.ConvertValute($row['dollar'])."<br>";
		if($i>=10){
			if (getMyRating() != 'Вы не можете быть в топе.'){
				$str .= '—————————————————<br>'.getMyRating().' '.$Nick.' — 💰'.ConvertValute($UserInfo['dollar']);
			}else{
				$str .= '—————————————————<br>'.getMyRating();
			}
			
			return $str;
		}
		$i+=1;
	}
	
}
?>