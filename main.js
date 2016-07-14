require.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min',
        ko: 'bower_components/knockout/dist/knockout',
        sammy: 'bower_components/sammy/lib/sammy',
        /* GUI */
        jqueryui: 'bower_components/jquery-ui/jquery-ui.min',
        bootstrap: 'bower_components/AdminLTE/bootstrap/js/bootstrap.min',
        adminlte: 'bower_components/AdminLTE/dist/js/app.min',
        /* RequireJS plugins */
        text: 'bower_components/text/text'
    },
    map: {
        '*': {
            'css': 'bower_components/require-css/css.min'
        }
    },
    shim: {
        ko: {
            exports: 'ko'
        },
        sammy: {
            deps: [
                'jquery'
            ],
            exports: 'Sammy'
        },
        jqueryui: {
            deps: [
                'jquery'
            ]
        },
        bootstrap: {
            deps: [
                'css!bower_components/AdminLTE/bootstrap/css/bootstrap.css'
            ]
        },
        adminlte: {
            deps: [
                'jqueryui',
                'bootstrap',
                'css!bower_components/AdminLTE/bootstrap/css/bootstrap.css',
                'css!bower_components/font-awesome/css/font-awesome.css',
                'css!bower_components/AdminLTE/dist/css/AdminLTE.css',
                'css!bower_components/AdminLTE/dist/css/skins/skin-blue.css',
                'css!bower_components/octicons/build/octicons.css',
                'css!bower_components/octicons/build/font/octicons.css'
            ]
        }
    }
});

require([
    'adminlte',
    'css!style.css',
    'css!syntax.css',
    'app'
], function(_, _, _, App) {
    window.App = App;
    App.init();

    if(!window.location.hash) {
        window.location.hash = '#overview';
    }
    else {
        var h = window.location.hash;

        if (h != '#overview' && h != '#projects' && h != '#blog') {
            window.location.hash = '#blog';
        }
    }
});
