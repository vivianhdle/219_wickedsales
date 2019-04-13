<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output=[
    'success'=> false
];

$json_input = file_get_contents("php://input");
$input = json_decode($json_input,true);


if(empty($input['email'])){
    throw new Exception ('Email is a required value');
}
if(empty($input['password'])){
    throw new Exception ('Password is a required value');
}
$email = $input['email'];
$password = $input['password'];

$email=addslashes($email);

$hashed_password=sha1($password);

unset($input['password']);

$query = "SELECT `id`,`name` FROM `users`
    WHERE `email` = ? AND 
    `password` = ?
";

$statement = mysqli_prepare($conn,$query); //1)send safe query to DB

mysqli_stmt_bind_param($statement,'ss',$email,$hashed_password); //2)send dangerous data to db

$result=mysqli_stmt_execute($statement);//3)tell db to mix the query and the data

$result=mysqli_stmt_get_result($statement);//4)get the result pointer for the prepared query statement's data

// $result = mysqli_query($conn,$query);
//not needed anymore because of prepared statement


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