"use strict";
var elixir = require('laravel-elixir'),
	gulp   = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sass   = require('gulp-sass'),
 compass   = require('gulp-compass');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(function(mix) {
//     mix.less('app.less');
// });
gulp.task("default", function() {
    gulp.start("styles", "scripts");
});

gulp.task("watch", function() {
    gulp.watch("resources/assets/sass/**/*.scss", ["styles"]);
    gulp.watch("resources/assets/js/**/*.js", ["scripts"]);
});

gulp.task('styles', function(){
	// gulp.src('resources/assets/sass/**/*.scss')
	gulp.src('resources/assets/sass/*.scss')
	.pipe(compass({
        config_file: "./config/config.rb",
        sass: "resources/assets/sass",
        css: "public/assets/css"
    }))
	.pipe(sass())
	.pipe(gulp.dest("public/assets/css"))
    .pipe(concat('app.css'))
});

gulp.task('scripts', function(){
	gulp.src('resources/assets/js/**/*.js')
	.pipe(concat('app.js'))
	.pipe(gulp.dest('public/assets/js'))
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/assets/js'));
});