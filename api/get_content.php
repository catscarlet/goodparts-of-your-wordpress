<?php

include_once 'config.php';
include_once 'logrecorder.php';

/*
if (array_key_exists('HTTP_REFERER', $_SERVER) && 'articles.catscarlet.com' != parse_url($_SERVER['HTTP_REFERER'])['host']) {
    header('HTTP/1.0 403 Forbidden');
    $result = [];
    $result['result'] = 1;
    $result['content'] = $_SERVER['HTTP_REFERER'];
    $rst = json_encode($result, JSON_UNESCAPED_UNICODE + JSON_PRETTY_PRINT);

    echo $rst;
    exit();
}
*/

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
