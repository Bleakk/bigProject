const { series, src, dest, parallel, watch } = require('gulp');
const browsersync = require("browser-sync").create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const googleWebFonts = require('gulp-google-webfonts');
const del = require('del');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");







const clean = () => del(['dist']);

function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./dist/"
      },
      port: 3000,
      
    });
    done();
}
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function css() {
    return src('./sass/**/*.scss')
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
    }).on('error', sass.logError))
    .pipe(rename({ suffix: ".min" }))
    .pipe(autoprefixer())
    .pipe(cssnano({
        discardComments: {
            removeAll: true,
        }
    }))
    .pipe(dest('./dist/css'));
}

// const minifyGoogleFonts = () => {
//     return src('dist/css/googleFonts.css')
//     .pipe(rename({ suffix: ".min" }))
//     .pipe(autoprefixer())
//     .pipe(cssnano())
//     .pipe(dest('./dist/css'));
// }
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
    watch('dist', browserSyncReload)
}

const runDev = series(build, parallel(browserSync, watchFiles) )

exports.css = css;
exports.clean = clean;
exports.runDev = runDev;
exports.build = build;
exports.default = build;