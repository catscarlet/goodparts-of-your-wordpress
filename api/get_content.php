<?php

include_once 'config.php';
include_once 'logrecorder.php';

/*
if (array_key_exists('HTTP_REFERER', $_SERVER) && 'articles.catscarlet.com' != parse_url($_SERVER['HTTP_REFERER'])['host']) {
    http_response_code(403);
    $result = [];
    $result['result'] = 1;
    $result['content'] = $_SERVER['HTTP_REFERER'];
    $rst = json_encode($result, JSON_UNESCAPED_UNICODE + JSON_PRETTY_PRINT);

    echo $rst;
    exit();
}
*/
if (!array_key_exists('id', $_GET)) {
    http_response_code(400);
    $result = [];
    $result['result'] = 400;
    $result['content'] = $_GET;
    $rst = json_encode($result, JSON_UNESCAPED_UNICODE + JSON_PRETTY_PRINT + JSON_UNESCAPED_SLASHES);

    echo $rst;
    exit();
} else {
    $id = $_GET['id'];
}

$query = "SELECT post_content FROM `wp_posts` WHERE post_status = 'publish' and ID = $id";
$result = $mysqli->query($query);

if (!($row = $result->fetch_assoc())) {
    http_response_code(404);
    $result = [];
    $result['result'] = 404;
    $result['content'] = $_GET;
    $rst = json_encode($result, JSON_UNESCAPED_UNICODE + JSON_PRETTY_PRINT + JSON_UNESCAPED_SLASHES);

    echo $rst;
    exit();
}

$result = [];
$result['result'] = 0;
$result['content'] = $row['post_content'];

$rst = json_encode($result, JSON_UNESCAPED_UNICODE /*+ JSON_PRETTY_PRINT*/);

echo $rst;
