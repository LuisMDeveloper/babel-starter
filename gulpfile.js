'use strict';

var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('build', function () {
  var bundleStream = browserify({
    entries: './client/app/main.js',
    debug: true
  })
  .transform(babelify)
  .bundle();

  bundleStream
    .pipe(source('app.bundle.js'))
    .pipe(gulp.dest('.dist'));
});

gulp.task('copy', function () {
  gulp.src('client/index.html')
  .pipe(gulp.dest('.dist'));
});

gulp.task('watch', function () {
  gulp.watch('client/**/*.js', ['build']);
  gulp.watch('client/*.html', ['copy']);
});

gulp.task('gitignore', function () {
  return gulp.src(['./gitignore/*.gitignore'])
          .pipe(concat('.gitignore'))
          .pipe(gulp.dest('./'));
});

gulp.task('default', ['copy', 'build', 'watch']);
