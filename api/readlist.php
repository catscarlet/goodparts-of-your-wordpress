<?php

header('Content-Type: text/json');
$list = file_get_contents('./list.json');

echo $list;
