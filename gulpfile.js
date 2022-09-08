const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const uglify = require('gulp-uglify');

const compileSass = () => {
    return gulp.src("./client/sass/**/*.sass")
        .pipe(sass()).pipe(gulp.dest("./client/public/css/"));
}

const minifyCss = () => {
    return gulp.src("./client/public/css/**/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./client/public/css/"));
}

const purge = () => {
    return gulp.src('./client/public/css/**/*.css')
        .pipe(purgecss({
            content: ["./client/public/*.html"]
        }))
        .pipe(gulp.dest('./client/public/css/'))
}

const compileTypescript = () => {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("./client/public/js/"));
}

const compress = () => {
    return gulp.src("./client/public/js/**/*.js").pipe(sourcemaps.init()).pipe(uglify()).pipe(sourcemaps.write("./")).pipe(gulp.dest("./client/public/js/"))
}

const watch = () => {
    gulp.watch("./client/sass/**/*.sass", gulp.series(compileSass, purge, minifyCss));
    gulp.watch("./client/public/**/*.html").on("change", gulp.series(compileSass, purge, minifyCss));
    gulp.watch("./client/typescript/**/*.ts").on("change", gulp.series(compileTypescript, compress));
}

exports.compileSass = compileSass;
exports.purge = purge;
exports.minifyCss = minifyCss;
exports.compileTypescript = compileTypescript;
exports.compress = compress;
exports.watch = watch;