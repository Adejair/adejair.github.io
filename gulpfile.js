/*
* @ Gulp file, Task Mannager.
*/

/**
* @ Inject direct files in build if this variable is true.
*/
const INJECT_BUILD = false;

const gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , browserSync = require('browser-sync')
  , uglify = require('gulp-uglify')
  , imagemin = require('gulp-imagemin')
  , exec = require('child_process').exec;


/**
* @ Array with path of files  to watch
*/
const PATH_WATCH_HTML = ['./*.html', './_includes/*.html', './_layouts/*.html']
  , PATH_WATCH_STYLUS = ['./src/stylus/**/*.styl', './src/stylus/*.styl']
  , PATH_WATCH_JS = ['./src/js/**/*.js', './src/js/*.js']
  , PATH_WATCH_PNG = ['./src/images/**/*.png', './src/images/*.png'];
/**
* @ Compile stylus file to css.
*/
gulp.task('stylus', () => {
  return gulp.src('./src/stylus/*.styl')
  .pipe(stylus())
  .pipe(gulp.dest('./css'))
});

/**
* @ Build files to _site
*/
gulp.task('jekyll-build', (cb) => {
  exec('jekyll build', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr)
    cb(err);
  });
});

/**
* @ Create local server with resources of sync.
*/
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './_site'
    }
  });
});

/**
* @ Minify files javascript
*/
gulp.task('minjs', () => {
  return gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./assets/js'))
});

/**
* @ Minify images .png
*/
gulp.task('minimage', () => {
  return gulp.src('./src/images/*.png')
  // TODO: by default imagemin render value is : 3
  .pipe(imagemin())
  .pipe(gulp.dest('./assets/images'))
});

/**
* @ Build Jekyll files and reload browser.
*/
gulp.task('jekyll-reload', ['jekyll-build'], () => browserSync.reload());

/**
* @ Watch Files and "compile" or reload.
* FIXME: All files is sync twice because delay, first time page is reloaded and
* reload is fired, now, .on('change') file is reloaded again to see changes.
*/

gulp.watch(PATH_WATCH_HTML, ['jekyll-reload']).on('change', browserSync.reload)
gulp.watch(PATH_WATCH_STYLUS, ['stylus', 'jekyll-reload']).on('change', browserSync.reload);
gulp.watch(PATH_WATCH_JS, ['minjs', 'jekyll-reload']).on('change', browserSync.reload);
gulp.watch(PATH_WATCH_PNG, ['minimage', 'jekyll-reload']).on('change', browserSync.reload);




gulp.task('default', ['stylus', 'minjs', 'minimage', 'jekyll-build', 'browser-sync']);
