"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const rename = require("gulp-rename");

const pkg = require("./package.json");

gulp.task("compile-css", function() {
  return gulp
    .src("./src/_exports.scss")
    .pipe(concat("index.scss"))
    .pipe(sass({outputStyle: "expanded", noLineComments: true, keepSpecialComments: 0}).on("error", sass.logError))
    .pipe(rename(`${pkg.name}.css`))
    .pipe(gulp.dest("./dist"));
});

gulp.task("compile", ["compile-css"]);

gulp.task("default", ["compile"]);
