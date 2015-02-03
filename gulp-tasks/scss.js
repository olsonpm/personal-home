'use strrict';

//---------//
// Imports //
//---------//

var gulp = require('gulp')
    , path = require('path')
    , vFs = require('vinyl-fs')
    , bSass = require('node-sass-bluebird')
    , bPromise = require('bluebird')
    , bFs = require('fs-bluebird')
    , nh = require('node-helpers')
    , config = require('../package.json')
    , http = require('http');

var OperationalError = bPromise.OperationalError;
var Environment = nh.Environment;
var curEnv = new Environment(config.site_env).curEnv();
var srcScss = 'src/client/assets/scss';
var destCss = path.join(curEnv, 'css/index.css');

gulp.task('build-scss', ['scss-clean'], buildCss);

function buildCss() {
    return bSass.pRender({
            file: path.join(srcScss, 'index.scss')
            , outFile: destCss
            , sourceMap: true
        })
        .then(function(successObj) {
            return bFs.mkdirAsync(path.join(curEnv, 'css'))
                .catch(function(err) {
                    if (err.code !== 'EEXIST') {
                        throw err;
                    }
                })
                .then(function() {
                    return bPromise.join(
                        bFs.writeFileAsync(destCss, successObj.css)
                        , bFs.writeFileAsync(destCss + '.map', successObj.map)
                    );
                });
        });
}

gulp.task('scss-clean', function() {
    return bFs.unlinkAsync(destCss)
        .catch(OperationalError, function(err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });
});

gulp.task('scss-watch', function() {
    var watcher = vFs.watch(path.join(srcScss, "**/*"));
    watcher.on('change', function(fpath) {
        buildCss()
            .then(function() {
                var options = {
                    host: 'localhost'
                    , port: 35729
                    , path: '/changed?files=/' + destCss
                    , agent: false
                };
                http.get(options);
            });
    });
});
