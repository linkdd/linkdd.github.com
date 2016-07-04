define([
    'jquery',
    'ko',
    'text!templates/page-projects.html'
], function($, ko, PageProjectsTemplate) {
    var PageProjectsViewModel = function(app, params) {
        var self = this;

        this.app = app;
        this.active = params.active;
        this.projects = ko.observableArray();

        $.getJSON('https://api.github.com/users/linkdd/repos').then(function(data) {
            var sliced = [];

            data.sort(function(a, b) {
                /* sort in reverse order */
                if (a.pushed_at > b.pushed_at) {
                    return -1;
                }
                else if (a.pushed_at < b.pushed_at) {
                    return 1;
                }

                return 0;
            });

            for(var i = 0, l = data.length; i < data.length; i += 4) {
                sliced.push(data.slice(i, i + 4));
            }

            self.projects(sliced);
        });
    };

    PageProjectsViewModel.prototype.overBox = function(data, event) {
        if ($(event.currentTarget).hasClass('box-info')) {
            $(event.currentTarget).removeClass('box-info');
        }

        if (!$(event.currentTarget).hasClass('box-success')) {
            $(event.currentTarget).addClass('box-success');
        }

        if (!$(event.currentTarget).hasClass('box-solid')) {
            $(event.currentTarget).addClass('box-solid');
        }
    };

    PageProjectsViewModel.prototype.outBox = function(data, event) {
        if ($(event.currentTarget).hasClass('box-success')) {
            $(event.currentTarget).removeClass('box-success');
        }

        if ($(event.currentTarget).hasClass('box-solid')) {
            $(event.currentTarget).removeClass('box-solid');
        }

        if (!$(event.currentTarget).hasClass('box-info')) {
            $(event.currentTarget).addClass('box-info');
        }
    };

    return {
        name: 'page-projects',
        cls: function(app) {
            this.template = PageProjectsTemplate;
            this.viewModel = function(params) {
                return new PageProjectsViewModel(app, params);
            };
        }
    };
});
