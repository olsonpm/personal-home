'use strict';

//---------//
// Imports //
//---------//

var path = require('path');


// this is a copy of the same client routes written for the client.  I will find a way to structure it better and the reason I'm not doing it now
//   is because I also don't want to hard-code every single route (would rather do it in a loop).  But I also want pages to not be restricted to
//   the static folder.  So before i modularize it, I would like to come up with a better structure.

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

module.exports = function(app, curEnv, currentDir) {
    Object.keys(ROUTES).forEach(function(e) {
        app.get('/' + ROUTES[e], function(req, res) {
            res.sendFile(path.join(currentDir, curEnv, 'index.html'));
        });
    });

    // special cases
    app.get('/', function(req, res) {
        res.sendFile(path.join(currentDir, curEnv, 'index.html'));
    });
    app.get("*", function(req, res) {
        res.status(404);
        res.sendFile(path.join(currentDir, curEnv, 'index.html'));
    });
}
