<?php

include_once 'config.php';

$permalink_pattern = '#(\d\d\d\d)-(\d\d)-(\d\d)#';
$link_perfix = 'https://blog.catscarlet.com/';
$link_postfix = '.html';

$query = "SELECT ID, post_date, post_title FROM `wp_posts` WHERE post_status = 'publish'";
$result = $mysqli->query($query);
$list = array();

while ($row = $result->fetch_assoc()) {
    preg_match($permalink_pattern, $row['post_date'], $matches);
    $permalink = $matches[1].$matches[2].$matches[3].$row['ID'];
    $row['permalink'] = $link_perfix.$permalink.$link_postfix;
    $list[] = $row;
}

$result->free();
rsort($list);
$rst = json_encode($list, JSON_UNESCAPED_UNICODE /*+ JSON_PRETTY_PRINT*/);

print_r($rst);
