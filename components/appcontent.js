define([
    'jquery',
    'ko',
    'sammy',
    'text!templates/appcontent.html'
], function($, ko, Sammy, AppContentTemplate) {
    var AppContentViewModel = function(app) {
        var self = this;

        this.app = app;
        this.chosenPage = ko.observable();

        Sammy(function() {
            var sammy_this = this;

            $.each(self.app.pages, function(idx, page) {
                sammy_this.get(page.href, function() {
                    self.setActive(page.href);
                    self.chosenPage(page.href.slice(1));
                });
            });
        }).run();
    };

    AppContentViewModel.prototype.setActive = function(href) {
        $.each(this.app.pages, function(idx, page) {
            page.active(page.href === href);
        });
    };

    return {
        name: 'appcontent',
        cls: function(app) {
            this.template = AppContentTemplate;
            this.viewModel = function() {
                return new AppContentViewModel(app);
            };
        }
    };
});
