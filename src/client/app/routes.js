'use strict';

var path = require('path');

var ROUTES = {
    home: 'home'
    , contact: 'contact'
    , linuxThangs: 'linux-thangs'
    , myStack: 'my-stack'
    , miscMusicTool: 'misc-music-tool'
    , twitterApiTester: 'twitter-api-tester'
    , myNodeTools: 'my-node-tools'
    , weatherAccuracy: 'weather-accuracy'
};

module.exports = function(app, curEnv) {
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        Object.keys(ROUTES).forEach(function(k) {
            $routeProvider.when('/' + ROUTES[k], {
                templateUrl: path.join(curEnv, 'app/components/static/' + ROUTES[k] + '.html')
            });
        });

        // special cases
        $routeProvider.when('/', {
                redirectTo: '/home'
            })
            .otherwise({
                templateUrl: path.join(curEnv, 'app/components/static/404.html')
            });

        $locationProvider.html5Mode(true);
    }]);
};

module.exports.ROUTES = ROUTES;
