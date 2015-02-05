'use strict';

//---------//
// Imports //
//---------//

var gulp = require('gulp')
    , path = require('path')
    , vFs = require('vinyl-fs')
    , bPromise = require('bluebird')
    , bFs = require('fs-bluebird')
    , nh = require('node-helpers')
    , config = require('../package.json');

var OperationalError = bPromise.OperationalError;
var Environment = nh.Environment;
var curEnv = new Environment(config.site_env).curEnv();
var srcImg = 'src/client/assets/img';
var destImg = path.join(curEnv, 'img');

gulp.task('build-img', ['img-clean'], function() {
    vFs.src(path.join(srcImg, '*'))
        .pipe(vFs.dest(destImg));
});

gulp.task('img-clean', function() {
    return bFs.readdirAsync(destImg)
        .then(function(files) {
            files.map(function(f) {
                return bFs.unlinkAsync(path.join(destImg, f));
            });
            return bPromise.all(files);
        })
        .catch(OperationalError, function(err) {
            if (err.code !== 'ENOENT') {
                throw err;
            } else {
                return bFs.existsAsync(curEnv)
                    .then(function(exists) {
                        var res;
                        if (!exists) {
                            res = bFs.mkdirAsync(curEnv)
                                .catch(OperationalError, function(err) {
                                    if (err.code !== 'EEXIST') {
                                        throw err;
                                    }
                                })
                                .then(function() {
                                    return bFs.mkdirAsync(destImg);
                                });
                        } else {
                            res = bFs.mkdirAsync(destImg);
                        }
                        return res;
                    });
            }
        });
});
