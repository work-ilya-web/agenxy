let project_folder = "dist";
let source_folder = "#src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    jsVendors: project_folder + '/js/',
    img: project_folder + "/img/",
    videos: project_folder + "/videos/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!"+source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    jsVendors: source_folder + "/js/vendors.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    videos: source_folder + "/videos/**/*.{mp4,avi,mkv}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    videos: source_folder + "/videos/**/*.{mp4,avi,mkv}",
  },
  // clean объект который будет содержать путь к папке проекта, будет отвечать за удаление этой папки когдмы мы каждый раз будем запускать gulp
  clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  // gulp-file-include плагин для сбора всех *html в один
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  // clean-css для сжатия css файлов
  clean_css = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  // собирает медиазапросы(одинакового разрешения) в одно
  group_media = require('gulp-group-css-media-queries'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webpcss = require('gulp-webpcss'),
  babel = require('gulp-babel'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + '/',
      directory: true
    },
    port: 3000,
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}
function css () {
  return src(path.src.css)
  .pipe(scss({
    outputStyle: "expanded"
  }))
  .pipe(group_media())
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 5 versions'],
    cascade: true
  }))
  .pipe(webpcss())
  .pipe(dest(path.build.css))
  .pipe(clean_css())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}
function jsVendors() {
  return src(path.src.jsVendors)
    .pipe(fileinclude())
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest(path.build.jsVendors))
    .pipe(browsersync.stream())
}
function fonts() {
  src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
  return src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
}
function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin({
      progressive: true,
      svgPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 5
    }))
    .pipe(dest(path.build.img))
    .pipe(src(source_folder + '/img/sprite.svg'))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}
function videos() {
  return src(path.src.videos)
    .pipe(dest(path.build.videos))
    .pipe(browsersync.stream())
}
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.videos], videos);
}

function clean(params) {
  return del(path.clean)
}
// series функции которые должны выполняться
let build = gulp.series(clean,gulp.parallel(css, html, js, jsVendors, images, videos, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

// Дружим галп с переменными
// Регестрируем задачи(т.к они просто сейчас как функции)
exports.fonts = fonts;
exports.html = html;
exports.css = css;
exports.js = js;
exports.videos = videos
exports.jsVendors = jsVendors;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;