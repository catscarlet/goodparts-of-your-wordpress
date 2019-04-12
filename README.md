# The good parts of your wordpress

**这个项目已经停止维护，请移步至新项目: <https://github.com/catscarlet/goodparts-of-your-wordpress-zwei>**

**[README in English, Click here](https://github.com/catscarlet/goodparts-of-your-wordpress/blob/master/README_EN.md)**

这个项目是用来展示你博客中精选出来的文章用的。项目名取自 **O'Reilly** 的梗：**The Good Parts**。

项目前端主要使用 vue2 + vue-router 编写，后端使用 PHP 编写。

使用到的库：vue2、vue-router、axios、wordpress-autop。

## 介绍

文章内容是从 **你自己的Wordpress** 中读取的，所以要使用这个项目，你需要有权限读取自己的 Wordpress 数据库。

这个项目的目的是制作另一个展示页，用来展示一部分你博客中一部分内容的用的。

像我这种人博客中不论吃喝游玩还是技术教程什么都写，在一定场合下，博客内容展示就会非常尴尬。这时候如果有一个独立的展示页面，只展示特定的文章，就可以避免这种尴尬了。

## 安装

### 环境

#### 服务端

- Linux
- MySQL，需要 Wordpress 数据库访问权限
- PHP （5.4 及以上；建议使用 7.0 以上版本）

#### 客户端

- Node (with yarn)
- Bash
- Git

### 编译部署和安装

#### 客户端部分

1. 执行 **yarn install** 安装依赖；
2. 执行 **yarn test** 编译开发版，或执行 **yarn build** 编译生产版；
3. 编辑 `index.html` 中的固定文本。

将 `index.html`, `favicon.ico`, `dist/` 和 `image/Ham_Shankx84.png` 文件上传到服务器上。_（因为 Ham_Shankx84.png 是由 index.html静态引用的 :P）_

#### 服务端 API 部分

服务端文件全部都在 api 目录下，请全部复制到服务器上。

1. `api/config.php` 文件为连接数据库的配置，修改成你的 Wordpress 数据库连接。`$allowed_referers` 中添加你网站的域名；
2. `api/generate_list.php` 为文章列表生成接口，会生成你现有博客的文章列表。默认关闭了固定链接，如果想在页面上展示固定链接，请根据博客的固定连接生成格式修改正则。
3. 执行或访问 `generate_list.php` 生成的文件，默认每行一条文章，请手工删除你不想展示的文章内容，并保存为 json 文件。
4. 修改 `api/readlist.php` 中对应的文件名。（其实等会直接读取 json 文件也没差，这里主要考虑可能会有跨域需求）

至此服务端就搞定了。到时候 `get_content.php` 会读取文章内容。如果考虑跨域或防盗链设置的话，请修改 get_content.php 中被注释的部分。

还有个 `logrecorder.php` 负责日志记录，默认关闭，如果想起用的话，请修改这个文件中的最后一行，并保证 **$path** 中的文件有写入权限。

剩下的好像就没啥好讲的了，文件很少，哪里不通，自己看一下就知道咋回事了。

安全起见，建议在生成列表文件之后，删除服务器端的 `generate_list.php`。

#### 服务器文件结构

```
.
├── api
│   ├── config.php          //数据库连接配置
│   ├── generate_list.php   //文章列表生成接口，建议删除
│   ├── get_content.php     //文章内容获取接口
│   ├── list.json           //文章列表
│   ├── logrecorder.php     //日志记录
│   └── readlist.php        //文章列表获取接口
├── dist
│   ├── build.js
│   └── snap495.jpg
├── favicon.ico
├── image
│   └── Ham_Shankx84.png
├── index.html
└── robots.txt
```

## 已知 问题

1. 文章生成列表是自己 `echo` 出来的，而没有用 `json_encode` （理由下文讲），如果文章名中包含本需要转义的字符，就会导致输出的列表出错。（解决办法不是没有，前端还是标准的 json 接口，所以这里直接改成 `json_encode` 也没差）
2. 刷新页面会直接恢复页面初始状态，无法回到刚才浏览的页面。这是因为文章内容没有使用路由做，是纯的变量渲染。之所以这么做的目的，是想禁止分享链接。项目目的就是纯展示，不是为博客而存在的。（所以这个 Bug 不会修复）（即所谓这是个功能，不是 Bug）

## LICENSE

MIT License - Copyright (c) 2017 Cat Scarlet
