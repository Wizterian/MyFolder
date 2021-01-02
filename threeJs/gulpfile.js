const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

const paths = {
  'scss' : 'src/css/**/*.scss',
  'pug' : 'src/pug/**/*.pug',
  'css' : 'dest/css/',
  'html' : 'dest/',
  'js' : 'dest/js/'
}

gulp.task('pug', () => {
  return (
    gulp
      .src(paths.pug)
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(pug({
        pretty: true,
        basedir: 'src/pug'
      }))
      .pipe(gulp.dest(paths.html))
  );
})

gulp.task('scss', () => {
  return (
    gulp
      .src(paths.scss)
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest(paths.css))
  )
});

gulp.task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: 'dest/'
    },
    port: 8081,
    reloadOnRestart: true
  });
});

gulp.task('reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch', (done) => {
  gulp.watch([paths.scss], gulp.series('scss', 'reload'))
  gulp.watch([paths.pug], gulp.series('pug', 'reload'))
  done();
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));