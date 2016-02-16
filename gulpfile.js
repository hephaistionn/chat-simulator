const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const watchify = require('watchify');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync').create();

const config = {
  entriesSass: './src/style.scss',
  output: './dist',
  browserifyOptions: {entries: ['./src/app.jsx'], debug: true},
  babelifyOptions: {presets: ['es2015', 'react']}
};

var bundler;

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.output))
    .on('end', function() {
      gulp.src('./index.html')
        .pipe(gulp.dest(config.output));
    });
}

gulp.task('watch-js', () => {
  bundler = watchify(browserify(config.browserifyOptions));
  bundler.transform(babelify.configure(config.babelifyOptions));
  bundler.on('error', gutil.log);
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);
  return bundle();
});

gulp.task('build-js', () => {
  bundler = browserify(config.browserifyOptions);
  bundler.transform(babelify.configure(config.babelifyOptions));
  return bundle();
});

gulp.task('build-css', function() {
  return gulp.src(config.entriesSass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.output));
});

gulp.task('watch-css', function() {
  gulp.watch('./src/**/*.scss', ['build-css']);
});

/**
 * To serve app (dev mode)
 **/
gulp.task('serve', () => {
  browserSync.init({
    server: "./dist"
  });
});

/**
 * Build
 */
gulp.task('build',['build-js', 'build-css']);

/**
 * Auto build
 */
gulp.task('dev', ['build-css', 'watch-css', 'watch-js']);

