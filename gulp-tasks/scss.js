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
    , http = require('http')
    , bNcp = bPromise.promisifyAll(require('ncp')).ncp;

var OperationalError = bPromise.OperationalError;
var Environment = nh.Environment;
var envInstance = new Environment(config.site_env);
var curEnv = envInstance.curEnv();
var srcScss = 'src/client/assets/scss';
var cssOut = envInstance.isDev()
    ? 'index.css'
    : 'index.min.css';
var destCss = path.join(curEnv, 'css', cssOut);

gulp.task('build-scss', ['scss-clean'], buildCss);

function buildCss() {
    var res;

    var nodeSassOpts = {
        file: path.join(srcScss, 'index.scss')
        , outFile: 'index.css'
    };
    nodeSassOpts['sourceMap'] = (envInstance.isProd())
        ? false
        : true;

    if (envInstance.isProd()) {
        nodeSassOpts['outputStyle'] = 'compressed';
    }

    var bCompileAndCopySass = bSass.pRender(nodeSassOpts)
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

    if (envInstance.isProd()) {
        res = bCompileAndCopySass;
    } else {
        res = bPromise.join(
            bCompileAndCopySass
            , bNcp(srcScss, path.join(curEnv, 'css'))
        );
    }

    return res;
}

gulp.task('scss-clean', function() {
    var dirPath = path.join(curEnv, 'css');
    return rmContents(dirPath)
        .catch(OperationalError, function(err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });
});

function removeFiles(files, dirPath) {
    return bPromise.all(
        files.map(function(f) {
            return bFs.unlinkAsync(path.join(dirPath, f))
                .catch(OperationalError, function(err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                });
        })
    );
}

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

// need to separate this out into a module
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
