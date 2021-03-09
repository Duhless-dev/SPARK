let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	// uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer');
	// pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const webpack = require("webpack-stream");

const dist = "./dist/";
// const dist = "/Users/nikitakuvasov/Sites/Test";


//gulp.task('pug', function () {
//	return gulp.src('app/*.pug')
//		.pipe(pug({
//			pretty: true
//		}))
//		.pipe(gulp.dest('app'))
//		.pipe(browserSync.reload({
//			stream: true
//		}))
//})



gulp.task('scss', function () {
	return gulp.src('app/assets/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions']
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(gulp.dest(dist+'/assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('css', function () {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
		//'node_modules/magnific-popup/dist/magnific-popup.css',
		'node_modules/simplebar/dist/simplebar.min.css',
		'node_modules/animate.css/animate.css',
		//'node_modules/rateyo/src/jquery.rateyo.css',
		//'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
		//'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
		//'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
	])
		.pipe(concat('_libs.scss'))
		.pipe(gulp.dest('app/assets/scss'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe(gulp.dest(dist))
		.pipe(browserSync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("app/assets/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'bundle.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    // debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
				}))
				.pipe(gulp.dest(dist + "/js"))
                .on("end", browserSync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src(["./app/assets/**/*.*", "!app/assets/scss/**/*.*", "!app/assets/js/**/*.*"])
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browserSync.reload);
});

gulp.task('watch', function () {
	browserSync.init({
		server: dist,
		port: 4000,
		notify: true
    });
	// gulp.watch('app/scss/**/*.scss', gulp.parallel('css'));
	gulp.watch('app/**/*.html', gulp.parallel('html'));
	gulp.watch('app/assets/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/assets/js/**/*.js', gulp.parallel('build-js'));
});


gulp.task ('images', function(){
	return gulp.src('app/assets/img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('dist/assets/img'));
});

gulp.task("build-prod-js", () => {
    return gulp.src("app/assets/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'bundle.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
				}))
				.pipe(gulp.dest(dist));
});
gulp.task('build', gulp.series("build-prod-js",'images'));

gulp.task('default', gulp.parallel('html', 'css','scss','build-js', "copy-assets", 'watch'));