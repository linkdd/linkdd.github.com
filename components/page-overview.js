define([
    'jquery',
    'ko',
    'text!templates/page-overview.html'
], function($, ko, PageOverviewTemplate) {
    var PageOverviewViewModel = function(app, params) {
        var self = this;

        this.app = app;
        this.active = params.active;

        this.infos = ko.observable({});
        this.events = ko.observableArray();

        $.getJSON('https://api.github.com/users/linkdd').then(function(data) {
            self.infos(data);
        });

        $.getJSON('https://api.github.com/users/linkdd/events').then(function(events) {
            var eventsByDate = {};

            $.each(events, function(idx, evt) {
                var date = moment(evt.created_at).format('YYYY-MM-DD'),
                    time = moment(evt.created_at).fromNow();

                if (!(date in eventsByDate)) {
                    eventsByDate[date] = [];
                }

                var icon = 'fa fa-calendar-plus-o', title = '', description = '';

                if (evt.type === 'PushEvent') {
                    var nb_commit = evt.payload.commits.length;

                    icon = 'fa fa-upload bg-green-active';
                    title = 'Push ' + nb_commit + ' commit(s) ';
                    title += 'on <a href="' + evt.repo.url + '">' + evt.repo.name + '</a>';

                    description = '<ul>';

                    $.each(evt.payload.commits, function(idx, commit) {
                        description += '<li>';
                        description += '<span class="label label-success">' + commit.sha.slice(0, 7) + '</span> ';
                        description += '<a href="' + commit.url + '">' + commit.message + '</a>';
                        description += '</li>';
                    });

                    description += '</ul>';
                }
                else if (evt.type === 'CreateEvent') {
                    icon = 'fa fa-flag';

                    if (evt.payload.ref_type == 'tag') {
                        icon += ' bg-aqua';
                        title = 'Create tag <span class="label label-warning">' + evt.payload.ref + '</span> ';
                        title += 'on <a href="' + evt.repo.url + '">' + evt.repo.name + '</a>';
                    }
                    else if(evt.payload.ref_type == 'branch') {
                        icon += ' bg-purple';
                        title = 'Create branch <span class="label label-warning">' + evt.payload.ref + '</span> ';
                        title += 'on <a href="' + evt.repo.url + '">' + evt.repo.name + '</a>';
                    }
                    else if(evt.payload.ref_type == 'repository') {
                        icon = 'fa fa-code bg-red';
                        title = 'Create repository <a href="' + evt.repo.url + '">' + evt.repo.name + '</a>';
                    }

                    description = evt.payload.description;
                }

                eventsByDate[date].push({
                    icon: icon,
                    time: time,
                    title: title,
                    description: description
                });
            });

            var timeline = [];

            $.each(eventsByDate, function(date, items) {
                timeline.push({
                    timelabel: moment(date).calendar(),
                    items: items
                });
            });

            self.events(timeline);
        });
    };

    return {
        name: 'page-overview',
        cls: function(app) {
            this.template = PageOverviewTemplate;
            this.viewModel = function(params) {
                return new PageOverviewViewModel(app, params);
            };
        }
    };
});
