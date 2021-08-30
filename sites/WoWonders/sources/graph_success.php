<?php
if (empty($_GET['access_token'])) {
    $errors = array(
    	'status' => 400,
        'errors' => array(
            'error_code' => 1,
            'message' => 'Unauthorized'
        )
    );
    header("Content-type: application/json");
    echo json_encode($errors, JSON_PRETTY_PRINT);
    exit();
}
$user_id = Wo_UserIdFromToken($_GET['access_token']);
if ($user_id === false) {
    $errors = array(
    	'status' => 400,
        'errors' => array(
            'error_code' => 2,
            'message' => 'Invalid or Unauthorized token'
        )
    );
    header("Content-type: application/json");
    echo json_encode($errors, JSON_PRETTY_PRINT);
    exit();
}

$user = Wo_UserData($user_id);
if (empty($user) || !is_array($user)) {
	$errors = array(
    	'status' => 400,
        'errors' => array(
            'error_code' => 3,
            'message' => 'Error found while fetching the data, please try again later.'
        )
    );
    header("Content-type: application/json");
    echo json_encode($errors, JSON_PRETTY_PRINT);
    exit();
}

$user_data = array(
    'status' => 200,
    'valid_until' => 3600,
    'api_version' => '1.4',
    'user_data' => array(
        'username' => $user['username'],
        'email' => $user['email'],
        'name' => $user['name'],
        'first_name' => $user['first_name'],
        'last_name' => $user['last_name'],
        'gender' => $user['gender'],
        'avatar' => $user['avatar'],
        'cover' => $user['cover'],
        'is_pro' => $user['is_pro'],
        'language' => $user['language'],
        'verified' => $user['verified'],
        'lastseen' => $user['lastseen'],
        'address' => $user['address'],
        'about' => $user['about']
    )
);
header("Content-type: application/json");
echo json_encode($user_data, JSON_PRETTY_PRINT);
exit();
?>