const { series, src, dest, parallel, watch } = require('gulp');
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

function js() {
    return src('./js/**/*.js')
    .pipe(dest('./dist/js'));
}

function html() {
    return src('./templates/**/*.html')
    .pipe(dest('./dist/'));
}

const dev = () => {
    watch('./templates/**/*.html', html)
    watch('./sass/**/*.scss', css)
}

exports.css = css;
exports.clean = clean;
exports.dev = dev;
exports.default = series(clean, parallel(css, html, js));