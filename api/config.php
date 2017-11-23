<?php


$mysqli = new mysqli('127.0.0.1', 'your_account', 'your_password', 'your_wp_database');
$mysqli->set_charset('utf8mb4');

if ($mysqli->connect_errno) {
    echo 'Failed to connect to MySQL: ('.$mysqli->connect_errno.') '.$mysqli->connect_error;
}
//echo $mysqli->host_info."\n";
