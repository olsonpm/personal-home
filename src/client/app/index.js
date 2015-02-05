'use strict';

//---------//
// Imports //
//---------//

var angular = require('angular')
    , nh = require('node-helpers')
    , bunyan = require('bunyan')
    , config = require('../../../package.json')
    , path = require('path');

var BunyanStreams = nh.BunyanStreams;
var curEnv = (new nh.Environment(process.env[config.site_env])).curEnv();


//------//
// Init //
//------//

var appName = "Personal home";
var bstream = BunyanStreams(appName, curEnv);
var log = bunyan.createLogger({
    name: appName
    , src: bstream.source
    , streams: [{
        level: bstream.level
        , stream: bstream.stream
        , type: bstream.type
    }]
});

var app = angular.module('personalHome', [require('angular-route')]);
// load the template cache
require('./templates');


//------------//
// Add Routes //
//------------//

require('./routes')(app, curEnv);


//-----------------//
// Add Controllers //
//-----------------//

require('./components/application-controller')(app, log);


//----------------//
// Add Directives //
//----------------//

require('./components/error404.js')(app, log);
