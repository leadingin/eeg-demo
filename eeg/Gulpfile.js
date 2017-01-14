const path         = require('path');
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const notify       = require('gulp-notify');
const uglifycss    = require('gulp-uglifycss');
const del          = require('del');

const autoprefixer_options = {
    browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ]
}

const INPUT_SASS_FILE   = path.join(__dirname, 'sass', 'base.scss');
const INPUT_SASS_FOLDER = path.join(__dirname, 'sass');
const OUTPUT_CSS_FOLDER = path.join(__dirname, 'static', 'css');

gulp.task('clean-css', function() {
    return del([
        path.join(OUTPUT_CSS_FOLDER, '*.{css,css.map}')
    ]);
});

gulp.task('build', [ 'clean-css' ], function() {
    gulp.src(INPUT_SASS_FILE)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass().on('error', sass.logError))
        .on('error', notify.onError({ message: 'SASS compile error: <%= error.message %>' }))
        .pipe(autoprefixer(autoprefixer_options))
        .pipe(uglifycss({ uglyComments: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(OUTPUT_CSS_FOLDER))
});

gulp.task('watch', [ 'build' ], function() {
    gulp.watch(path.join(INPUT_SASS_FOLDER, '**', '*.{sass,scss}'), [ 'build' ])
        .on('change', function(e) {
            console.log('File ' + e.path + ' was ' + e.type + ', running Sass task...');
        });
});

gulp.task('default', [ 'build' ]);
