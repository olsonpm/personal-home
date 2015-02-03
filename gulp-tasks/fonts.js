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
var srcFonts = 'src/client/assets/fonts';
var destFonts = path.join(curEnv, 'fonts');

gulp.task('build-fonts', ['fonts-clean'], function() {
    return vFs.src(path.join(srcFonts, '*'))
        .pipe(vFs.dest(destFonts));
});

gulp.task('fonts-clean', function(cb) {
    return bFs.readdirAsync(destFonts)
        .then(function(files) {
            files.map(function(f) {
                return bFs.unlinkAsync(path.join(destFonts, f));
            });
            return bPromise.all(files);
        })
        .catch(OperationalError, function(err) {
            if (err.code !== 'ENOENT') {
                throw err;
            } else {
                return bFs.mkdirAsync(destFonts);
            }
        });
});
