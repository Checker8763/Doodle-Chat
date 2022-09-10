/*Imports*/
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const purgeCss = require('gulp-purgecss');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const uglify = require('gulp-uglify');
const htmlMin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

/*Config*/
const config = {
    in: {
        client: "./client",
        server: "./server"
    },
    out: "./dist"
}

/*Tasks*/
const compileSass = () => {
    return gulp.src(`${config.in.client}/sass/**/*.sass`)
        .pipe(sass()).pipe(gulp.dest(`${config.out}/css`));
}

const purge = () => {
    return gulp.src(`${config.out}/css/**/*.css`)
        .pipe(purgeCss({
            content: [`${config.in.client}/public/*.html`]
        }))
        .pipe(gulp.dest(`${config.out}/css`))
}

const minifyCss = () => {
    return gulp.src(`${config.out}/css/**/*.css`)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`${config.out}/css/`));
}

const compileHTML = () => {
    return gulp.src(`${config.in.client}/public/**/*.html`)
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest(`${config.out}/`));
}

const compileTypescript = () => {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest(`${config.out}/js/`));
}

const compress = () => {
    return gulp.src(`${config.out}/js/**/*.js`).pipe(sourcemaps.init()).pipe(uglify()).pipe(sourcemaps.write("./")).pipe(gulp.dest(`${config.out}/js/`))
}

const optimizeAssets = () => {
    return gulp.src(`${config.in.client}/public/assets/**/*.{png,gif,jpg,svg}`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${config.out}/assets/`))
}

const watch = () => {
    gulp.watch(`${config.in.client}/sass/**/*.sass`).on("change", gulp.series(compileSass, purge, minifyCss));
    gulp.watch(`${config.in.client}/public/**/*.html`).on("change", gulp.series(compileHTML, compileSass, purge, minifyCss));
    gulp.watch(`${config.in.client}/public/assets/**/*.{png,gif,jpg,svg}`).on("change", gulp.series(optimizeAssets));
    gulp.watch(`${config.in.client}/typescript/**/*.ts`).on("change", gulp.series(compileTypescript, compress));
}

/*Exports*/
exports.compileSass = compileSass;
exports.purge = purge;
exports.minifyCss = minifyCss;
exports.compileTypescript = compileTypescript;
exports.compress = compress;
exports.compileHTML = compileHTML;
exports.optimizeAssets = optimizeAssets;
exports.watch = watch;
exports.run = gulp.parallel(gulp.series(compileHTML, compileSass, purge, minifyCss), optimizeAssets, gulp.series(compileTypescript, compress));