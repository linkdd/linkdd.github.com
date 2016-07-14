define([
    'jquery',
    'ko',
    'github-events',
    'text!templates/page-overview.html'
], function($, ko, GithubEventHandler, PageOverviewTemplate) {
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
                var handler = GithubEventHandler[evt.type];

                if(handler !== undefined) {
                    var date = moment(evt.created_at).format('YYYY-MM-DD'),
                        time = moment(evt.created_at).fromNow();

                    var result = handler(evt);
                    result.time = time;

                    if (!(date in eventsByDate)) {
                        eventsByDate[date] = [];
                    }

                    eventsByDate[date].push(result);
                }
                else {
                    console.error('Undefined event type:', evt.type);
                    console.log('See: https://developer.github.com/v3/activity/events/types/#' + evt.type.toLowerCase());
                }
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
