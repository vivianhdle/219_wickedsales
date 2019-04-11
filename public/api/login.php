<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output=[
    'success'=> false
];

if(empty($_POST['email'])){
    throw new Exception ('Email is a required value');
}
if(empty($_POST['password'])){
    throw new Exception ('Password is a required value');
}
$email = $_POST['email'];
$password = $_POST['password'];
$hashed_password=sha1($password);

unset($_POST['password']);

$query = "SELECT `id`,`name` FROM `users`
    WHERE `email` = '$email' AND 
    `password` = '$hashed_password'";

$result = mysqli_query($conn,$query);

if (!$result){
    throw new Exception(mysqli_error($conn));
}
if(mysqli_num_rows($result) !== 1){
    throw new Exception('invalid username or password');
}

$data = mysqli_fetch_assoc($result);

$token = $email . $data['id'] .microtime();
$token = sha1($token);

$connect_query = "INSERT INTO `user_connections` SET 
    `token` = '$token',
    `users_id`= {$data['id']},
    `created`= NOW(),
    `ip_address` = '{$_SERVER['REMOTE_ADDR']}'    
";

$connect_result = mysqli_query($conn,$connect_query);

if(!$connect_result){
    throw new Exception(mysqli_error($conn));
}
if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Could not log you in: connection not saved');
}

$_SESSION['user_data'] = [
    'id'=>$data['id'],
    'username'=>$data['name'],
    'token'=>$token
];


$output['success'] = true;
$output['username'] = $data['name'];
$output['token']=$token;

$json_output = json_encode($output);
print($json_output);
?>