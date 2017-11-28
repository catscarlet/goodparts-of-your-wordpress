# The good parts of your wordpress

This project is for displaying specific articles of your wordpress.

Writing front-end with vue2 + vue-router, back-end with PHP.

These are used：vue2、vue-router、axios、wordpress-autop.

## Introduction

The articles is from the wordpress database of yourself, so you have to have your Wordpress and the access to the database.

This project is for displaying **specific articles** of your wordpress. You can make a standalone list, see details below.

## Demo

[English Demo](www.catscarlet.com/site/goodparts-of-your-wordpress/) Notice that I didn't write in English so there aren't many articles. You can also check the Chinese demo.

[石樱灯笼博客 - The Good Parts](https://articles.catscarlet.com/)

## Installation

### Environment

#### Server Side

- Linux
- MySQL (Only access permission to the wordpress database required)
- PHP (At least 5.4\. Use 7.0+ for better performance)

#### Front-end

- Node (with yarn)
- Bash
- Git

### Setup

#### Front-end

1. Run **yarn install**
2. Run **yarn test** ,or run **yarn build**

Copy index.html, favicon.ico, dist/ and image/Ham_Shankx84.png to the server.

#### Server Side (API)

Copy all the files in `api/` to the server

1. `api/config.php` is the configuration to the database. Edit it for your own config.
2. `api/generate_list.php` is the list generator. Permalink is off by default. If you want to show permalink below your article, please edit the regex by yourself.
3. Run `generate_list.php` will generate the list. One article each line. Delete these which you don't want to display, and save it as json file.
4. Edit `api/readlist.php` for the json file.

OK. Done. Now the page will request `get_content.php` and read the article. If you need CORS, modify the comment in `get_content.php`.

And there is a `logrecorder.php` for logging. Off by default.

You can and you should delete the `generate_list.php` for security.

#### Files list on the server

```
.
├── api
│   ├── config.php
│   ├── generate_list.php
│   ├── get_content.php
│   ├── list.json
│   ├── logrecorder.php
│   └── readlist.php
├── dist
│   ├── build.js
│   └── snap495.jpg
├── favicon.ico
├── image
│   └── Ham_Shankx84.png
├── index.html
└── robots.txt
```

## Known bugs.

1. `generate_list.php` use `echo` instead of using `json_encode`. Something wrong will happen if there are some char that need to be `ESCAPED`
2. Reflash the page will return to the first page, bucause it doesn't use vue-router as articles loader.

## LICENSE

MIT License - Copyright (c) 2017 Cat Scarlet
