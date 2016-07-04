define(['jquery', 'ko', 'components'], function($, ko, components) {
    var App = function() {

        this.pages = [
            {
                'href': '#overview',
                'title': 'Overview',
                'icon': 'glyphicon glyphicon-home',
                'active': ko.observable(true)
            },
            {
                'href': '#projects',
                'title': 'Projects',
                'icon': 'fa fa-code',
                'active': ko.observable(false)
            },
            {
                'href': '#blog',
                'title': 'Blog',
                'icon': 'fa fa-rss-square',
                'active': ko.observable(false)
            }
        ];
    };

    App.prototype.init = function() {
        var self = this;

        $.each(components, function(idx, comp) {
            ko.components.register(comp.name, new comp.cls(self));
        });

        ko.applyBindings();
    };

    return new App();
});
