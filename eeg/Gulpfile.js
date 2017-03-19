const path         = require('path');
const gulp         = require('gulp');
const wbpk         = require('gulp-webpack');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const notify       = require('gulp-notify');
const uglifycss    = require('gulp-uglifycss');
const del          = require('del');

const config     = require('./config');
const wbpkConfig = require('./webpack.config')

var autoprefixerOptions = {
    browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ]
}

gulp.task('clean-css', function() {
    return del([
        path.join(config.PATHS.outputCSS, '*.{css,css.map}')
    ]);
});

gulp.task('sass', [ 'clean-css' ], function() {
    gulp.src(config.PATHS.sassFile)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass().on('error', sass.logError))
        .on('error', notify.onError({ message: 'SASS compile error: <%= error.message %>' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(uglifycss({ uglyComments: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.PATHS.outputCSS));
});

gulp.task('webpack', function() {
    return gulp.src(config.PATHS.appFile)
        .pipe(wbpk(wbpkConfig({ watch: false })))
        .on('error', notify.onError({ message: 'Webpack compile error: <%= error.message %>' }))
        .pipe(gulp.dest(config.PATHS.outputJS));
});

gulp.task('default', [ 'build' ]);

gulp.task('build', [ 'webpack', 'sass' ]);

gulp.task('watch', [ 'build' ], function() {
    gulp.watch(path.join(config.PATHS.sassFolder, '**', '*.{sass,scss}'), [ 'sass' ])
        .on('change', function(e) {
            console.log('File ' + e.path + ' was ' + e.type + ', running Sass task...');
        });

    gulp.watch(path.join(config.PATHS.appFolder, '**', '*.{js,html}'), [ 'webpack' ])
        .on('change', function(e) {
            console.log('File ' + e.path + ' was ' + e.type + ', running Webpack task...');
        });
});
