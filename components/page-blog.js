define([
    'jquery',
    'ko',
    'text!templates/page-blog.html'
], function($, ko, PageBlogTemplate) {
    var PageBlogViewModel = function(app, params) {
        var self = this;

        this.app = app;
        this.active = params.active;
        this.articles = ko.observableArray();

        $.get('/linkdd.atom').then(function(data) {
            var $xml = $(data),
                articles = [];

            $xml.find('entry').each(function() {
                var $this = $(this),
                    tags = [];

                $this.find('category').each(function() {
                    var $cat = $(this);

                    tags.push($cat.attr('term'));
                });

                articles.push({
                    title: $this.find('title').text(),
                    link: $this.find('link').attr('href'),
                    content: $this.find('content').text(),
                    published: $this.find('published').text(),
                    updated: $this.find('updated').text(),
                    rights: $this.find('rights').text(),
                    tags: tags
                });
            });

            self.articles(articles);
        });
    };

    return {
        name: 'page-blog',
        cls: function(app) {
            this.template = PageBlogTemplate;
            this.viewModel = function(params) {
                return new PageBlogViewModel(app, params);
            };
        }
    };
});
