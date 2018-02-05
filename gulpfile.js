// Plugins
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    minify_css = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    imagemin = require("gulp-imagemin"),
    notify = require("gulp-notify"),
    prefix = require("gulp-autoprefixer"),
    jshint = require("gulp-jshint"),
    pngquant = require("imagemin-pngquant"),
    browserSync = require("browser-sync");

// ----------------------------------------------------

// Settings
var assets = {
    js: "assets/js",
    css: "assets/css",
    img: "assets/img",
    html: "assets/**/*.html",
    min_css: 'style.min.css',
    min_js: 'app.min.js'
};

var src = {
    sass: "src/sass/*.scss",
    js: "src/js/**/*.js",
    img: "src/img/*"
};

// ----------------------------------------------------

// Error Handler 
var onError = function(err) {
    console.log(err);
    this.emit('end');
}

// ----------------------------------------------------

// Sass to Css
gulp.task('sass', function() {
    return gulp.src(src.sass)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(assets.css))
        .pipe(minify_css())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assets.css))
        .pipe(browserSync.reload({stream: true}));
});

// ----------------------------------------------------

// Compile JS
gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assets.js))
        .pipe(browserSync.reload({ stream: true }));
});

// ----------------------------------------------------

// Images
gulp.task('img', function() {
    return gulp.src(src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(assets.img));
});

// ----------------------------------------------------

// Watch
gulp.task('watch', function() {
    browserSync.init({
        server: './assets'
    })
    gulp.watch(src.js, ['js']);
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.img, ['img']);
    gulp.watch(assets.html).on('change', browserSync.reload);
});

// ----------------------------------------------------

// Default
gulp.task('default', ['watch', 'sass', 'js', 'img']);