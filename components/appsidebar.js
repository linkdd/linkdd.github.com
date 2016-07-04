define([
    'jquery',
    'ko',
    'text!templates/appsidebar.html'
], function($, ko, AppSidebarTemplate) {
    var AppSidebarViewModel = function(app) {
        this.app = app;
        this.pages = ko.observableArray(app.pages);
    };

    return {
        name: 'appsidebar',
        cls: function(app) {
            this.template = AppSidebarTemplate;
            this.viewModel = function() {
                return new AppSidebarViewModel(app);
            };
        }
    };
});
