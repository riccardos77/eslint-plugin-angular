'use strict';

var gulp = require('gulp');
var del = require('del');
var execSync = require('child_process').exec;
var eslintPluginDist = './dist';
var eslintPluginSource = '.';

gulp.task('clean', function () {
  return del([eslintPluginDist]);
});

gulp.task('tsc', function (cb) {
  execSync('tsc --project ' + eslintPluginSource, function (err, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
});

gulp.task('copy-package-json', function () {
  return gulp.src([eslintPluginSource + '/package.json']).pipe(gulp.dest(eslintPluginDist));
});

gulp.task('copy-quickstart', function () {
  return gulp.src([eslintPluginSource + '/quickstart/**']).pipe(gulp.dest(eslintPluginDist + '/quickstart'));
});

gulp.task('pack', function (cb) {
  execSync('cd ' + eslintPluginDist + ' && npm pack', function (err, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
});

gulp.task(
  'build',
  gulp.series(
    'clean',
    'tsc',
    'copy-package-json',
    'copy-quickstart',
    'pack'
  )
);
