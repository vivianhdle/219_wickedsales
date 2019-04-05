<?php
require_once('mysqlconnect.php');
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');

$product_id=1;
$product_quantity=1;
$user_id=1;

$query="SELECT `price` FROM `products` WHERE `id`= $product_id";

$result=mysqli_connect($conn,$query);

if (!$result){
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result)===0){
    throw new Exception ("no product matches product id $product_id");
}

$product_data= mysqli_fetch_assoc($result);

$product_price= (int)$product_data['price'];

$product_total=$product_quanity*$product_price;

if(empty($carts_id)){
    $cart_create_query="INSERT INTO `carts` SET
        `item_count` = $product_quantity,
        `total_price`= $product_total,
        `created` = NOW(),
        `users_id`= $user_id,
        `changed` = NOW()
    ";
    $cart_result=mysqli_query($conn,$cart_create_query);
    if (!cart_result){
        throw new Exception(mysqli_error($conn));
    }
    if(mysqli_affected_rows($conn)===0){
        throw new Exception('data was not added to cart table');
    };
    $carts_id = mysqli_insert_id($conn);
}

$cart_items_query = "INSERT INTO `cart_items` SET
    `products_id` = $product_id,
    `quantity`=$product_quanity,
    `carts_id`=$carts_id
";
print($cart_items_query);

$cart_item_result = mysqli_query($conn,$cart_items_query);

if(!$cart_item_result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn)===0){
    throw new Exception('failed to insert into cart items');
}

$output= [
    'success'=>true,
    'cartCount'=>$product_quanity,
    'cartTotal'=>$product_total

];

print(json_encode($output));






?>