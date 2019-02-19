const { series, src, dest, parallel } = require('gulp');
const cleanHandle = require('gulp-clean')
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const clean = () => {
    return src('dist', {read: false})
    .pipe(cleanHandle())
}

function css() {
    return src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'));
}

function html() {
    return src('./templates/**/*.html')
    .pipe(dest('./dist/'));
}

function js() {
    return src('./js/**/*.js')
    .pipe(dest('./dist/js'));
}
exports.css = css;
exports.clean = clean;
exports.default = series(clean, parallel(css, html, js));