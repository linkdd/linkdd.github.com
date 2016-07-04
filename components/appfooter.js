define([
    'jquery',
    'ko',
    'text!templates/appfooter.html'
], function($, ko, AppFooterTemplate) {
    var AppFooterViewModel = function(app) {
        this.app = app;
    };

    return {
        name: 'appfooter',
        cls: function(app) {
            this.template = AppFooterTemplate;
            this.viewModel = function() {
                return new AppFooterViewModel(app);
            };
        }
    };
});
