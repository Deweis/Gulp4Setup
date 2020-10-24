const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browserSyncFunc() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    })
}
let scripts = () => {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/app.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}
let styles = () => {
    return src([
        'app/sass/main.sass',
        'node_modules/animate.css/animate.min.css'
    ])
        .pipe(sass())
        .pipe(concat('app.min.css'))
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(cleanCss(({ level: { 1: {specialComments: 0 } }, format: 'beautify' })))
        .pipe(dest('app/css/'))
        .pipe(cleanCss(({ level: { 1: {specialComments: 0 } },})))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream())
}
let fonts = () => {
    return src(
        'app/css/fonts.css'
    )
        .pipe(concat('fonts.min.css'))
        .pipe(cleanCss(({ level: { 1: {specialComments: 0 } },})))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream())
}
let unMinifyCss = () => {
    return src(
        'app/css/try.css'
    )
        .pipe(cleanCss(({ level: { 1: {specialComments: 0 } }, format: 'beautify' })))
        .pipe(dest('app/css/'))
}

let images = () => {
    return src ('app/img/src/**/*')
        .pipe(newer('app/img/dest'))
        .pipe(imageMin())
        .pipe(dest('app/img/dest'))
}

let cleanImg = () => {
    return del('app/img/dest/**/*', {force: true})
}
let cleanDist = () => {
    return del('dist/**/*', {force: true})
}

let buildCopy = () => {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/**/*.html'
    ], { base: 'app'})
        .pipe(dest('dist'));
}
let html = () => {
    return src(
        'app/index.html'
    )
        .pipe(concat('index.html'))
        .pipe(dest('dist'))
}

function startWatch() {
    watch(['app/**/*.sass'], styles);
    watch(['app/css/fonts.css'], fonts);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch(['app/img/src/**/*'], images);
}

exports.browserSyncFunc = browserSyncFunc;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.html = html;
exports.cleanImg = cleanImg;
exports.unMinifyCss = unMinifyCss;
exports.fonts = fonts;
exports.buildCopy = buildCopy;
exports.build = series(cleanDist, styles, scripts, images, buildCopy);

exports.default = parallel(scripts, html, styles, fonts, images, browserSyncFunc, startWatch);