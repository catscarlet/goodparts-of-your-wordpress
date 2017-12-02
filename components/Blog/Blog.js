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
                    self.list = response.data;
                    self.count = self.list.length;
                    self.itemlist = self.list.slice(self.pointer, self.itemperpage);
                })
                .catch(function(error) {
                });
        },
        prev: function() {
            var self = this;
            if (self.pointer > 0) {
                self.pointer = self.pointer - self.itemperpage;
                self.itemlist = self.list.slice(self.pointer, self.pointer + self.itemperpage);
                self.page--;
            }
        },
        next: function() {
            var self = this;
            if (self.pointer + self.itemperpage < self.count) {
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
                });
        },
        draw: function(id, content) {
            function nocaption(contentp) {
                var regexp1 = new RegExp(/\[caption .*\"\]/, 'g');
                var regexp2 = new RegExp(/(\<img.*\>)(.*)\[\/caption\]/, 'g');
                contentp = contentp.replace(regexp1, '<br>');
                contentp = contentp.replace(regexp2, function(match, p1, p2) {
                    return p1 + '<br>' + p2;
                });
                return contentp;
            }

            var contentp;
            var self = this;
            this.list.forEach(function(v, i) {
                if (v.ID == id) {
                    self.content.title = v.post_title;
                    self.content.link = v.permalink;
                }
            });
            contentp = this.$autop(content);
            contentp = nocaption(contentp);

            this.content.content = contentp;
        }
    }
};
