"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const rename = require("gulp-rename");

const pkg = require("./bower.json");

gulp.task("export-scss", function() {
  return gulp.src([
      "./src/_variables.scss"
    ])
    .pipe(concat("_exports.scss"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("concat-scss", function() {
  return gulp.src([
      "./src/_variables.scss",
      "./src/_base.scss"
    ])
    .pipe(concat(`_${pkg.name}.scss`))
    .pipe(gulp.dest("./dist"));
});

gulp.task("compile", ["export-scss", "concat-scss"], function() {
  return gulp.src(`./dist/_${pkg.name}.scss`)
    .pipe(rename(`${pkg.name}.scss`))
    .pipe(sass({outputStyle: "expanded", noLineComments: true, keepSpecialComments: 0}).on("error", sass.logError))
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["compile"]);
