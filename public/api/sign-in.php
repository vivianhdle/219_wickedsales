<?php
session_start();

$postData = json_decode(file_get_contents('php://input'), true);//true will make it an associative array
$_SESSION['user'] = $postData['email'];

$output=[
    'success' => true,
    'email' => $postData['email'],
    'message' => 'Signed in'
];

print(json_encode($output));



?>