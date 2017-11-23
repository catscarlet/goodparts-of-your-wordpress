#!/bin/bash
PWD_ROOT=$(dirname $0)
SHELL_ROOT=${PWD_ROOT/\./$(pwd)}
echo $SHELL_ROOT
for file in $SHELL_ROOT/*
do
    if test -d $file
    then
        #echo $file 是目录
        cd $file
        nowat=${PWD##*/}
        #echo 现在在：$nowat
        #echo 根在：$SHELL_ROOT
        vuefilepath=$SHELL_ROOT/$nowat.vue
        echo 创建：$vuefilepath
        touch $vuefilepath
        cat $nowat.template.html > $vuefilepath
        echo -e "\n" >> $vuefilepath

        echo '<script>' >> $vuefilepath
        cat $nowat.js >> $vuefilepath
        echo '</script>' >> $vuefilepath
        echo -e "\n" >> $vuefilepath

        echo '<style>' >> $vuefilepath
        cat $nowat.css >> $vuefilepath
        echo '</style>' >> $vuefilepath
        echo -e "\n" >> $vuefilepath

        #cat $vuefilepath
        cd $SHELL_ROOT
    fi
done
