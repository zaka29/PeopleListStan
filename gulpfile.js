var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
    return gulp.src('./public/styles.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/build/css'));
});

gulp.task('js', function() {
	browserify('./public/index.js')
		.transform(babelify)
		.bundle()
		.on('error', function(e){
			gutil.log(e)
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public/build/js'))
});

gulp.task('default', [ 'js', 'less' ]);
