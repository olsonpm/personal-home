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
    , templateCache = require('gulp-angular-templatecache');

var OperationalError = bPromise.OperationalError;
var Environment = nh.Environment;
var curEnv = new Environment(config.site_env).curEnv();
var srcApp = 'src/client/app';
var destJs = path.join(curEnv, 'index.js');

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
            browserify(fileIn)
                .bundle()
                .pipe(vss('index.js'))
                .pipe(replaceENV())
                .pipe(vFs.dest('dev'))
                .on('end', function() {
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
