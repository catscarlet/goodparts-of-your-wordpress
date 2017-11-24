# The good parts of your wordpress

这个项目是用来展示你博客中精选出来的文章用的。项目名取自 **O'Reilly** 的梗：**The Good Parts**。

项目前端主要使用 vue2 + vue-router 编写，后端使用 PHP 编写。

使用到的库：vue2、vue-router、axios、wordpress-autop。

## 介绍

文章内容是从 **你自己的Wordpress** 中读取的，所以要使用这个项目，你需要有权限读取自己的 Wordpress 数据库。

这个项目的目的是制作另一个展示页，用来展示一部分你博客中一部分内容的用的。

像我这种人博客中不论吃喝游玩还是技术教程什么都写，在一定场合下，博客内容展示就会非常尴尬。这时候如果有一个独立的展示页面，只展示特定的文章，就可以避免这种尴尬了。

## Demo

[石樱灯笼博客 - The Good Parts](https://articles.catscarlet.com/)

## 安装

### 环境

#### 服务端

- Linux
- MySQL，需要 Wordpress 数据库访问权限
- PHP

#### 客户端

- Node (with yarn)
- Bash
- Git

### 编译部署和安装

#### 客户端部分

1. 执行 **yarn install** 安装依赖
2. 执行 **yarn test** 编译开发版，或执行 **yarn build** 编译生产版。

将 index.html, favicon.ico, dist/ 和 image/Ham_Shankx84.png 文件上传到服务器上。_（因为 Ham_Shankx84.png 是由 index.html静态引用的 :P）_

#### 服务端 API 部分

服务端文件全部都在 api 目录下，请全部复制到服务器上。

1. api/config.php 文件为连接数据库的配置，请修改成你的 Wordpress 数据库连接
2. api/generate_list.php 为文章列表生成接口，会生成你现有博客的文章列表。默认关闭了固定链接，如果想在页面上展示固定链接，请根据博客的固定连接生成格式修改正则。
3. generate_list.php 生成的文件，默认每行一条文章，请手工删除你不想展示的文章内容，并保存为 json 文件。
4. 修改 api/readlist.php 中对应的文件名。（其实等会直接读取 json 文件也没差，这里主要考虑可能会有跨域需求）

至此服务端就搞定了。到时候 get_content.php 会读取文章内容。还有个 logrecorder.php 负责日志记录，默认关闭，如果想起用的话，请修改这个文件中的最后一行，并保证 **$path** 中的文件有写入权限。

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

1. 文章生成列表是自己 echo 出来的，而没有用 json_encode （理由下文讲），如果文章名中包含本需要转义的字符，就会导致输出的列表出错。（解决办法不是没有，前端还是标准的 json 接口，所以这里直接改成 json_encode 也没差）
2. 刷新页面会直接恢复页面初始状态，无法回到刚才浏览的页面。这是因为文章内容没有使用路由做，是纯的变量渲染。之所以这么做的目的，是想禁止分享链接。项目目的就是纯展示，不是为博客而存在的。（所以这个 Bug 不会修复）（即所谓这是个功能，不是 Bug）

## 技术介绍

就从后端向前端讲吧。

后端实现挺简单的。因为需求原因，所以纯手动修改文章列表要放在第一位考虑，所以首先写了个 generate_list.php 生成文章列表。之所以不使用 json_encode 是为了保证 **一行一条** ，以方便手工删除不想展示的文章内容，当然这里有 Bug ，有办法可以一劳永逸（既可保证一行一个，又可保证 100% 成功率），但是暂时不想做到完美。

至于文章内容，Wordpress 把文章都保存在 wp_posts 表中，文章ID 、标题以及内容都能直接获取。Wordpress 的固定链接是根据配置实时实现的，所以只能靠正则，当然根据需求来讲，没有固定链接也没差。本身这就是纯展示用的项目，前端还是 vue 渲染的，所以用了 robots.txt 屏蔽了搜索引擎。

到了前端，首先使用了 axios 请求 readlist.php 获得 list.json ，有了 **文章ID** 和 **文章标题**（为啥要获取'post_date'我给忘了），渲染到右侧列表。

列表分页是靠前端做的，没什么特别的理由，毕竟我将近200条的博客走了 **Content-Encoding:gzip** 后才10K。

当用户点击列表内容时，axios 发送请求到 **/api/get_content.php?id=ID** ，get_content.php 从数据库中获取数据并返回前端。

这里要说明一下，Wordpress保存文件内容是纯 HTML 的，但是普通文本是没有 `<p>` 的，但但是 Wordpress 再渲染时又会把这个 `<p>` 加回来，行为诡异。所以这里用到了 wordpress-autop ，在前端为每行文本都增加一组 `<p>` 。另外还有 `[caption]` ，不过相应的库没有找到，所以也靠正则把这段自己改写了。

哦对了，项目中是没有 `*.vue` 文件存在的，这是属于我自己的代码洁癖。在经历过 html + php + js +css 混写的年代过后，MVC、RESTFUL 这些概念以及开发方式好不容易被接受之后，一些新兴技术贪图效率又来了个猛倒车，加上整个行业本身就良莠不齐，本身就有大量素质不高的开发者产出的低质量代码大行其道。我不太喜欢把多门语言写到同一个文件中，所以为每个组件单独建立了个目录，依靠 Bash 进行创建和合并。

本来项目是打算使用 vuex 的，奈何智商不够看了三个星期也没看懂 vuex2 是怎么实现的。一年前还用 vuex1 做过项目，到了现在看 vuex 的文档就越看越恶心。本身 vue 的组件化提高了内聚性，vuex 的变量保存提供了统一化管理。然而光是 vuex 引用的文件就得保存得到处都是，高耦合问题过于严重了。不过这年头也没人在意像 **高内聚低耦合** 这样的传统概念。

编写后端 PHP 接口，成型只用了3分钟，前端 vue + vue-router 用了 3 小时，vuex 看了 3 星期都没看懂。

## LICENSE

MIT License - Copyright (c) 2017 Cat Scarlet
