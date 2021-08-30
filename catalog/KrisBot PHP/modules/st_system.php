<?php
function setStatus($uid, $status){
	$starr=get('modules/base/statuses.json');
	$starr[$uid]=$status;
	file_put_contents('modules/base/statuses.json', json_encode($starr));
}

?>