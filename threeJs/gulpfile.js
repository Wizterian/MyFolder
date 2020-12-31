const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('default', () => {
  return gulp.watch('src/css/style.scss', () => {
    return (
      gulp
        .src('src/css/style.scss')
        .pipe(
          sass({
            outputStyle: 'expanded'
          })
          .on("error", sass.logError)
        )
        .pipe(gulp.dest('htdocs/css'))
    );
  });
});