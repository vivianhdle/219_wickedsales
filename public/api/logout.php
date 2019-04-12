<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output=[
    'success'=>false,
    'message'=>'User has not been logged out'
];

if(empty($SESSION['user_data']['token'])){
    $output['success']=true;
    $output['message']="You werent' logged in";
    print(json_encode($output));
    exit();
}

$token = $_SESSION['user_data']['token'];

$logout_query= "DELETE FROM `user_connections` WHERE `token`='{$token}'";

$result = mysqli_query($conn,$logout_query);

if (!$result){
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1){
    throw new Exception('Could not log you out');
}

unset($_SESSION['user_data']);


$output['success'] = true;
$output['message']='User logged out';

print_r($_SESSION);
print(json_encode($output));











?>