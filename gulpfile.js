const { series, src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const googleWebFonts = require('gulp-google-webfonts');
sass.compiler = require('node-sass');

const clean = () => del(['dist']);

function css() {
    return src('./sass/**/*.scss')
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
    }).on('error', sass.logError))
    .pipe(dest('./dist/css'));
}

const js = () => {
    return src('./js/**/*.js')
    .pipe(dest('./dist/js'));
}
const fonts = () => {
    return src('./fonts.list')
    .pipe(googleWebFonts({
        fontsDir: 'fonts/',
        cssDir: 'css/',
        cssFilename: 'googleFonts.css',
        relativePath: true

    }))
    .pipe(dest('./dist/'));
}

const fontawesome = () => {
    return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(dest('./dist/webfonts/'))
}

function html() {
    return src('./templates/**/*.html')
    .pipe(dest('./dist/'));
}
const images = () => src('./images/**/*').pipe(dest('./dist/images'));


const build = series(clean, parallel(html, images, fontawesome, fonts, css, js))

const watchFiles = () => {
    watch('./templates/**/*.html', html)
    watch('./images/**/*', images)
    watch('./sass/**/*.scss', css);
}

const runDev = series(build, watchFiles)

exports.css = css;
exports.clean = clean;
exports.runDev = runDev;
exports.build = build;
exports.default = build;