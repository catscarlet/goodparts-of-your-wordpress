<?php

header('Content-Type: text/json');
include_once 'config.php';

if (!array_key_exists('HTTP_REFERER', $_SERVER) || !in_array(parse_url($_SERVER['HTTP_REFERER'])['host'], $allowed_referers)) {
    reject();
}

$list = file_get_contents('./list.json');

echo $list;

function reject()
{
    http_response_code(403);
    $result = [];
    $result['result'] = 403;
    $result['content'] = $_SERVER['HTTP_REFERER'];
    $rst = json_encode($result, JSON_UNESCAPED_UNICODE + JSON_PRETTY_PRINT + JSON_UNESCAPED_SLASHES);

    echo $rst;
    exit();
}
