"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const scssimport = require("gulp-shopify-sass");
const rename = require("gulp-rename");

const pkg = require("./package.json");

gulp.task("import-scss", function() {
  return gulp
    .src("./src/_exports.scss")
    .pipe(scssimport())
    .pipe(rename(`_${pkg.name}.scss`))
    .pipe(gulp.dest("./dist"));
});

gulp.task("compile", ["import-scss"], function() {
  return gulp
    .src(`./dist/_${pkg.name}.scss`)
    .pipe(rename(`${pkg.name}.scss`))
    .pipe(sass({outputStyle: "expanded", noLineComments: true, keepSpecialComments: 0}).on("error", sass.logError))
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["compile"]);
