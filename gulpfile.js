var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = {
  srcCSS: 'styles/**/*.css',
  srcJS: 'scripts/**/*.js',
  dest: 'dest',
};

gulp.task('js', function () {
  return gulp.src(paths.srcJS)
  			.pipe(concat('script.js'))
  			.pipe(gulp.dest(paths.dest));
});

gulp.task('css', function () {
  return gulp.src(
  			['styles/main.css', 
  			'styles/menu.css', 
  			'styles/about.css', 
  			'styles/skicams.css', 
  			'styles/message_form.css'])
  			.pipe(concat('style.css'))
  			.pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['js', 'css'], function () {
	gulp.watch([paths.srcCSS, paths.srcJS], ['js', 'css']);
});

gulp.task('default', ['watch']);
