#!/bin/bash
PWD=${PWD}
echo $PWD
for file in $PWD/*
do
    if test -f $file
    then
        echo $file 是文件
    fi
    if test -d $file
    then
        echo $file 是目录
        cd $file
        nowat=${PWD##*/}
        echo $nowat
        touch $nowat.template.html
        touch $nowat.css
        touch $nowat.js
        ls
        cd $PWD
    fi
done
