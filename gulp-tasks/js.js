'use strict';

//---------//
// Imports //
//---------//
var gulp = require('gulp')
    , path = require('path')
    , browserify = require('browserify')
    , vss = require('vinyl-source-stream')
    , vFs = require('vinyl-fs')
    , vTransform = require('vinyl-transform')
    , bPromise = require('bluebird')
    , bFs = require('fs-bluebird')
    , nh = require('node-helpers')
    , through2 = require('through2')
    , config = require('../package.json')
    , streamToPromise = require('stream-to-promise')
    , templateCache = require('gulp-angular-templatecache');

var OperationalError = bPromise.OperationalError;
var Environment = nh.Environment;
var envInstance = new Environment({
    serverEnv: config.site_env
});
var curEnv = envInstance.curEnv();
var srcApp = 'src/client/app';
var jsOut = envInstance.isDev()
    ? 'index.js'
    : 'index.min.js';
var destJs = path.join(curEnv, jsOut);

gulp.task('build-js', ['js-clean'], function(cb) {
    var fileIn = './' + path.join(srcApp, 'index.js')

    vFs.src(path.join(srcApp, '**/*.html'))
        .pipe(templateCache('templates.js', {
            moduleSystem: 'Browserify'
            , module: 'personalHome'
            , root: path.join(curEnv, 'app')
        }))
        .pipe(vFs.dest(srcApp))
        .on('end', function() {
            var bundler = browserify({
                debug: true
            });
            bundler.add(fileIn);

            if (envInstance.isProd()) { // and if prod, uglify
                bundler.plugin('minifyify', {
                    output: path.join(curEnv, 'index.map.js')
                    , map: 'index.map.js'
                });
            }

            streamToPromise(
                    bundler.bundle()
                    .pipe(vss(getJsOut(envInstance)))
                    .pipe(replaceENV(envInstance))
                    .pipe(vFs.dest(curEnv))
                )
                .then(function() {
                    cb();
                });
        });
});

gulp.task('js-clean', function() {
    return bFs.unlinkAsync(destJs)
        .catch(OperationalError, function(err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });
});

// replaced ENV_NODE_ENV in order to have environment-specific behavior on the front-end
function replaceENV() {
    return new vTransform(function(filename) {
        return through2.obj(function(chunk, enc, cb) {
            cb(null, chunk.toString().replace("ENV_NODE_ENV", curEnv));
        });
    });
}

function getJsOut(envInst) {
    return (envInst.isProd())
        ? 'index.min.js'
        : 'index.js';
}
