const gulp = require("gulp");
const concat = require("gulp-concat");
const aliases = require('gulp-style-aliases');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const stripCssComments = require("gulp-strip-css-comments");
const sourcemaps = require("gulp-sourcemaps");

const CSS_DIST = "dist/css";

const pkg = require("./package.json");
const tasks = [];

["base", "components", "utils", "all"].forEach(name => {
  const taskName = `compile-scss-${name}`;

  tasks.push(taskName);

  gulp.task(taskName, () => {
    return gulp
      .src(`src/_${name}.scss`)
      .pipe(concat(`${name}.scss`))
      .pipe(aliases({'~@petals': './node_modules/@petals'}))
      .pipe(sass({outputStyle: "expanded", noLineComments: true, keepSpecialComments: 0}).on("error", sass.logError))
      .pipe(stripCssComments({preserve: false}))
      .pipe(gulp.dest(CSS_DIST));
  });
});

gulp.task("compile", tasks, () => {
  return gulp
    .src(`${CSS_DIST}/**/*.css`, {base: CSS_DIST})
    .pipe(sourcemaps.init({largeFile: true, loadMaps: true}))
    .pipe(cssmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest(CSS_DIST));
});

gulp.task("compile-components", () => {
  return gulp
    .src("test/components/index.scss")
    .pipe(sass({outputStyle: "expanded", noLineComments: true, keepSpecialComments: 0}).on("error", sass.logError))
    .pipe(gulp.dest("test/components"));
});

gulp.task("compile-themes", () => {
  return gulp
    .src("test/themes/*/index.scss")
    .pipe(sass({outputStyle: "expanded", noLineComments: true, keepSpecialComments: 0}).on("error", sass.logError))
    .pipe(gulp.dest("test/themes"));
});

gulp.task("test", ["compile-components", "compile-themes"]);

gulp.task("default", ["compile"]);
