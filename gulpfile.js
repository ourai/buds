"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

const pkg = require("./bower.json");

gulp.task("concat-scss", function() {
  return gulp.src([
      "./scss/_variables.scss",
      "./scss/_base.scss"
    ])
    .pipe(concat(`_${pkg.name}.scss`))
    .pipe(gulp.dest("./scss"));
});

gulp.task("compile", ["concat-scss"], function() {
  return gulp.src(`./scss/_${pkg.name}.scss`)
    .pipe(concat(`${pkg.name}.scss`))
    .pipe(sass({outputStyle: "expanded", noLineComments: true, keepSpecialComments: 0}).on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("default", ["compile"]);
