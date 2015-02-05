'use strict';

var $ = require('jquery');

module.exports = function(app, log) {
    app.directive('error404', function($location) {
        var linkFn = function(scope, element, attrs) {
            log.debug('this happened');
        };
        return {
            restrict: 'A'
            , link: linkFn
            , template: "The page '" + $location.path() + "' was not found."
        };
    });
};
