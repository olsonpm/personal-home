'use strict';

var $ = require('jquery');

require('buddy-system')($);
var initSiteLayout = require('./site-layout');
var initNavBehavior = require('./nav-behavior');

module.exports = function(app, log) {
    app.controller('ApplicationController', ['$scope', '$location', function($scope, $location) {
        initSiteLayout($, $scope, log);
        initNavBehavior($, $scope, $location, log);
    }]);
};
