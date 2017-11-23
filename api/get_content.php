<?php

include_once 'config.php';

$id = $_GET['id'];

$query = "SELECT post_content FROM `wp_posts` WHERE post_status = 'publish' and ID = $id";
$result = $mysqli->query($query);

if ($row = $result->fetch_assoc()) {
}

$result = [];
$result['result'] = 0;
$result['content'] = $row['post_content'];

$rst = json_encode($result, JSON_UNESCAPED_UNICODE /*+ JSON_PRETTY_PRINT*/);

echo $rst;
