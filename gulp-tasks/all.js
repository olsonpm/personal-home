'use strict';

//---------//
// Imports //
//---------//

var gulp = require('gulp')
    , path = require('path')
    , bPromise = require('bluebird')
    , bFs = require('fs-bluebird')
    , nh = require('node-helpers')
    , config = require('../package.json')
    , vTransform = require('vinyl-transform')
    , vFs = require('vinyl-fs')
    , through2 = require('through2')
    , Express = require('express')
    , tinyLr = require('tiny-lr')
    , http = require('http')
    , addRoutes = require('../src/server/routes.js')
    , compression = require('compression');

var OperationalError = bPromise.OperationalError;
var Environment = nh.Environment;
var envInstance = new Environment(config.site_env);
var curEnv = envInstance.curEnv();
var srcHtml = 'src/client/index.html';
var destHtml = curEnv;

// this is just a variable to hold all the site's environment variable dependencies.
//   Too often I've deployed and forgot to add the environment var to heroku causing errors.
var envVarsUsed = [
    'PERSONAL_HOME_NODE_ENV'
];

gulp.task('build', ['build-fonts', 'build-img', 'build-scss', 'build-js', 'clean-html'], build);

function build() {
    return (vFs.src(srcHtml))
        .pipe(injector())
        .pipe(vFs.dest(destHtml));
}

gulp.task('clean', function() {
    return rmContents(curEnv);
});

gulp.task('clean-html', cleanHtml);

function cleanHtml() {
    return bFs.unlinkAsync(path.join(destHtml, 'index.html'))
        .catch(OperationalError, function(err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });
};

gulp.task('start-server', function() {
    checkEnvVars();

    var app = Express();
    app.use(compression());

    app.use(Express.static(path.join(curEnv)));

    addRoutes(app, curEnv, process.cwd());

    var port = process.env.PERSONAL_HOME_PORT || process.env.PORT;
    app.listen(port);
    console.log("" + curEnv + " server listening on port " + port);
});

gulp.task('start-lr', function() {
    var port = 35729;
    tinyLr().listen(port, function() {
        console.log('Listening on port: %s ', port);
    });
});

gulp.task('html-watch', function() {
    var watcher = vFs.watch(srcHtml);
    watcher.on('change', function(fpath) {
        try {
            console.log('changed');
            cleanHtml();
            build();
            bPromise.delay(200)
                .then(function() {
                    var options = {
                        host: 'localhost'
                        , port: 35729
                        , path: '/changed?files=/index.html'
                        , agent: false
                    };
                    http.get(options);
                })
                .catch(function(err) {
                    console.log('%j', err);
                });
        } catch (e) {
            console.log('error happened while building after change communicating to lr');
            console.log('%j', e);
        }
    });
});


//-------------//
// Helper Fxns //
//-------------//

function injector() {
    return new vTransform(function(filename) {
        var cssInject = "<!-- inject:css -->";
        var jsInject = "<!-- inject:js -->";
        var endInject = "<!-- endinject -->";

        var indexCssRel = envInstance.isProd()
            ? "css/index.min.css"
            : "css/index.css";

        var indexJsRel = envInstance.isProd()
            ? "index.min.js"
            : "index.js";

        var indexCssOut = path.join(curEnv, indexCssRel);
        var indexJsOut = path.join(curEnv, indexJsRel);
        var injectedCss = '<link rel="stylesheet" type="text/css" href="' + indexCssRel + '">';
        var injectedJs = '<script src="' + indexJsRel + '"></script>';

        // (.|[\n\r])*? matches any character including newlines
        var css_regex = new RegExp(escapeRegExp(cssInject) + "(.|[\n\r])*?" + escapeRegExp(endInject));
        var js_regex = new RegExp(escapeRegExp(jsInject) + "(.|[\n\r])*?" + escapeRegExp(endInject));

        return through2.obj(function(chunk, enc, cb) {
            chunk = chunk.toString().replace(css_regex, injectedCss)
                .replace(js_regex, injectedJs);
            cb(null, chunk);
        });
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function rmContents(dir) {
    return bFs.readdirAsync(dir)
        .then(function(files) {
            files = files.map(function(f) {
                var fname = path.join(dir, f);
                return bPromise.join(
                    bFs.statAsync(fname)
                    , fname
                    , rmRecurse
                );
            });

            return bPromise.all(files);
        })
        .catch(OperationalError, function(err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });
}

function rmRecurse(finfo, fname) {
    // assuming either file or dir.  No special file types considered
    return (finfo.isFile())
        ? bFs.unlinkAsync(fname)
        : rmContents(fname)
        .then(function() {
            return bFs.rmdirAsync(fname);
        });
}

function checkEnvVars() {
    var envVarsWithNoValue = [];
    envVarsUsed.forEach(function(e) {
        if (!process.env[e]) {
            envVarsWithNoValue.push(e);
        }
    });

    if (envVarsWithNoValue.length > 0) {
        throw new Error("Invalid State: The following environment variables need to be set: " + envVarsWithNoValue);
    }
}
