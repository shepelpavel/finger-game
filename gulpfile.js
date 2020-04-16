'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    minify = require('gulp-babel-minify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    svgsprite = require('gulp-svg-sprite'),
    concat = require('gulp-concat'),
    pump = require('pump');

var path = {
    src: {
        js: './_source/js/**/*.js',
        style: './_source/css/**/*\.scss',
        css: './_source/css/**/*\.css',
        img: './_source/img/**/*.*',
        svg: './_source/svg/**/*\.svg',
        font: './_source/font/**/*\.*',
        module: './_source/module/**/*.*',
    },
    build: {
        js: './_assets/js/',
        style: './_assets/css/',
        css: './_assets/css/',
        img: './_assets/img/',
        svg: './_assets/svg/',
        font: './_assets/font/',
        module: './_assets/module/',
    }
};

gulp.task('js:work:build', function (cb) {
    pump([
            gulp.src(path.src.js),
            minify(),
            rename(function (path) {
                path.extname = (path.extname).toLowerCase();
            }),
            gulp.dest(path.build.js)
        ],
        cb
    );
});

gulp.task('js:build', function (cb) {
    pump([
            gulp.src(path.src.js),
            minify(),
            rename(function (path) {
                path.extname = (path.extname).toLowerCase();
            }),
            gulp.dest(path.build.js)
        ],
        cb
    );
});

gulp.task('style:build', function (cb) {
    pump([
            gulp.src(path.src.style),
            sass({
                outputStyle: 'compressed'
            }),
            prefixer({
                browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],
                cascade: false
            }),
            gulp.dest(path.build.style)
        ],
        cb
    );
});

gulp.task('css:build', function (cb) {
    pump([
            gulp.src(path.src.css),
            prefixer({
                browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],
                cascade: false
            }),
            cssnano(),
            gulp.dest(path.build.css)
        ],
        cb
    );
});


gulp.task('img:build', function (cb) {
    pump([
            gulp.src(path.src.img),
            imagemin(),
            rename(function (path) {
                path.extname = (path.extname + "").toLowerCase();
            }),
            gulp.dest(path.build.img)
        ],
        cb
    );
});

gulp.task('img:work:build', function (cb) {
    pump([
            gulp.src(path.src.img),
            rename(function (path) {
                path.extname = (path.extname + "").toLowerCase();
            }),
            gulp.dest(path.build.img)
        ],
        cb
    );
});

gulp.task('svg:build', function (cb) {
    pump([
            gulp.src(path.src.svg),
            svgmin({
                js2svg: {
                    pretty: true
                }
            }),
            cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {
                    xmlMode: true
                }
            }),
            svgsprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            }),
            gulp.dest(path.build.svg)
        ],
        cb
    );
});

gulp.task('font:build', function (cb) {
    pump([
            gulp.src(path.src.font),
            gulp.dest(path.build.font)
        ],
        cb
    );
});

gulp.task('module:build', function (cb) {
    pump([
            gulp.src(path.src.module),
            gulp.dest(path.build.module)
        ],
        cb
    );
});

gulp.task('build', [
    'js:build',
    'style:build',
    'css:build',
    'img:build',
    'svg:build',
    'font:build',
    'module:build'
]);

gulp.task('watch', function () {
    watch([path.src.js], function () {
        gulp.start('js:work:build');
    });
    watch([path.src.style], function () {
        gulp.start('style:build');
    });
    watch([path.src.css], function () {
        gulp.start('css:build');
    });
    watch([path.src.img], function () {
        gulp.start('img:work:build');
    });
    watch([path.src.svg], function () {
        gulp.start('svg:build');
    });
    watch([path.src.font], function () {
        gulp.start('font:build');
    });
    watch([path.src.module], function () {
        gulp.start('module:build');
    });
});

gulp.task('default', ['build', 'watch']);