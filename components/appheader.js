define([
    'jquery',
    'ko',
    'text!templates/appheader.html'
], function($, ko, AppHeaderTemplate) {
    var AppHeaderViewModel = function(app) {
        this.app = app;
    };

    return {
        name: 'appheader',
        cls: function(app) {
            this.template = AppHeaderTemplate;
            this.viewModel = function() {
                return new AppHeaderViewModel(app);
            };
        }
    };
});
