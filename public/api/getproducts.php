<?php

require_once('mysqlconnect.php');
set_exception_handler('handleError');
require_once('functions.php');


$query = 'SELECT p.`id`,p.`name`,p.`price`, i.`url` AS `images` FROM `products` AS p JOIN `images` AS i ON p.`id` = `i`.`products_id` ORDER by p.`id`';
//SELECT p.`id`,p.`name`,p.`price`, i.`url` AS `images` FROM `products` AS p JOIN `images` AS i ON p.`id` = `i`.`products_id`
/** procedural*/
$result = mysqli_query($conn,$query);

if (!$result){
    throw new Exception('invalid query: '. mysqli_error($conn));
}

$data = [];

while($row = mysqli_fetch_assoc($result)){ //when mysqli_fetch_assoc runs out of data, it will return false
    $currentID = $row['id'];
    $image = $row['images'];
    if(isset($data[$currentID])){
        // $data[[$row['id']]['images'][]=$row['images'];
        $data[$currentID]['images'][]=$image;
    } else {
        unset($row['images']); //deletes the image and puts the image in an array
        $row['images'] = [$image];
        $row['price'] = intval($row['price']);
        $data[$currentID] = $row;

        //data[$row['id']]['images']=[$row['images']];
    }
    // $data[]=$row;
}

$pureData=[];
foreach($data as $value){
    $pureData[]=$value;
}



$output = [
    'success'=>true,
    'products'=>$pureData
];

$json_output = json_encode($output);

print($json_output);



?>