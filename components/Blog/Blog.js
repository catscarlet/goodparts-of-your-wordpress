export default {
    data: function() {
        return {
            content: {
                'title': '',
                'link': '',
                'content': ''
            },
            list: [],
            'pointer': 0,
            itemlist: [],
            count: 0,
            itemperpage: 8,
            page: 1
        };
    },

    created() {
        this.getlist();
    },
    watch: {
        '$route': 'getlist'
    },
    methods: {
        getlist: function(id, event) {
            var self = this;
            this.$axios.get('./api/readlist.php')
                .then(function(response) {
                    //console.log(response.data);
                    self.list = response.data;
                    self.count = self.list.length;
                    self.itemlist = self.list.slice(self.pointer, self.itemperpage);
                    //console.log(self.itemlist);
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        prev: function() {
            var self = this;
            if (self.pointer > 0) {
                //console.log(self.pointer);
                self.pointer = self.pointer - self.itemperpage;
                self.itemlist = self.list.slice(self.pointer, self.pointer + self.itemperpage);
                self.page--;
            }
        },
        next: function() {
            var self = this;
            if (self.pointer < self.count + self.itemperpage) {
                //console.log(self.pointer);
                self.pointer = self.pointer + self.itemperpage;
                self.itemlist = self.list.slice(self.pointer, self.pointer + self.itemperpage);
                self.page++;
            }
        },
        show: function(id, event) {
            var self = this;
            this.$axios.get('./api/get_content.php?id=' + id)
                .then(function(response) {
                    self.draw(id, response.data.content);
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        draw: function(id, content) {
            var self = this;
            this.list.forEach(function(v, i) {
                if (v.ID == id) {
                    //console.log(v.ID);
                    //console.log(v.post_title);
                    //console.log(v.permalink);
                    self.content.title = v.post_title;
                    self.content.link = v.permalink;
                }
            });
            //console.log(content);
            var contentp = this.$autop(content);
            //console.log(contentp);
            if (contentp.indexOf('[caption') >= 0) {
                //console.log('contentps中包含caption');

                var regexp1 = new RegExp(/\[caption .*\"\]/, 'g');
                var regexp2 = new RegExp(/(\<img.*\>)(.*)\[\/caption\]/, 'g');

                //console.log(contentp.match(regexp1));
                contentp = contentp.replace(regexp1, '<br>');

                //console.log(contentp.match(regexp2));
                contentp = contentp.replace(regexp2, function(match, p1, p2) {
                    //console.log(p1);
                    //console.log(p2);
                    return p1 + '<br>' + p2;

                });

            }
            this.content.content = contentp;
        }
    }

};
