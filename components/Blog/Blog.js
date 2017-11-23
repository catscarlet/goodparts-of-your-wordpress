/*
import store from '../vuex/index.js';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import {
    mapGetters,
    mapActions
} from 'vuex';
*/

export default {
    data: function() {
        return {
            content: {
                'title': '',
                'link': '',
                'content': '',
            },
            itemlist: [{
                'ID': '2930',
                'post_date': '2017-10-18 02:32:21',
                'post_title': '社交网络断链',
                'permalink': 'https:\/\/blog.catscarlet.com\/201710182930.html'
            }, {
                'ID': '2916',
                'post_date': '2017-09-27 22:24:07',
                'post_title': '从北京联通开始大规模部署不正规的运营商级NAT，谈互联网和运营商',
                'permalink': 'https:\/\/blog.catscarlet.com\/201709272916.html'
            }, {
                'ID': '2898',
                'post_date': '2017-09-23 15:58:16',
                'post_title': '变得不好玩的魔兽世界',
                'permalink': 'https:\/\/blog.catscarlet.com\/201709232898.html'
            }, {
                'ID': '2887',
                'post_date': '2017-08-18 15:28:10',
                'post_title': '百度想与作业帮撇清关系……呢',
                'permalink': 'https:\/\/blog.catscarlet.com\/201708182887.html'
            }, {
                'ID': '2882',
                'post_date': '2017-08-15 20:29:39',
                'post_title': '一键删除微博 oneClickRemoveWeiboPost',
                'permalink': 'https:\/\/blog.catscarlet.com\/201708152882.html'
            }]
        };
    },

    created() {
        this.list();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'list'
    },
    methods: {
        list: function(id, event) {
            var self = this;
            this.$axios.get('./api/readlist.php')
                .then(function(response) {
                    console.log(response.data);
                    self.itemlist = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        test: function(message, event) {},
        show: function(id, event) {
            var self = this;
            this.$axios.get('./api/get_content.php?id=' + id)
                .then(function(response) {
                    self.draw(id, response.data.content);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        draw: function(id, content) {
            var self = this;
            this.itemlist.forEach(function(v, i) {
                if (v.ID == id) {
                    console.log(v.ID);
                    //console.log(v.post_title);
                    console.log(v.permalink);
                    self.content.title = v.post_title;
                    self.content.link = v.permalink;
                }
            });
            //console.log(content);
            var contentp = this.$autop(content);
            console.log(contentp);
            this.content.content = contentp;
        }
    }

};
