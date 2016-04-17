'use strict'


const babel = require('gulp-babel')
const babelRegister = require('babel-register')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const jasmine = require('gulp-jasmine')
const jshint = require('gulp-jshint')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

const jsSourcePath = ('./client-scripts/**/*.js')
const sassSourcePath = ('./sass/**/*.scss')
const testSourcePath = ('./spec/**/*.spec')

gulp.task('lint', () => {
  return gulp.src(jsSourcePath)
    .pipe( jshint({'asi': true, 'esversion': 6}) )
    .pipe( jshint.reporter('jshint-stylish') )
    .pipe( jshint.reporter('fail') )
})

gulp.task('test', () => {
  return gulp.src(testSourcePath)
    .pipe( jasmine() )
})

gulp.task('scripts', () => {
  return gulp.src(jsSourcePath)
    .pipe( sourcemaps.init() )
    .pipe( concat('all.min.js') )
    .pipe( babel() )
    .pipe( uglify().on('error', gulpUtil.log) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./public/scripts') )
})
gulp.task('scripts:watch', () => {
  gulp.watch(jsSourcePath, ['scripts'])
})

gulp.task('sass', () => {
  return gulp.src(sassSourcePath)
    .pipe( sourcemaps.init() )
    .pipe( concat('all.min.css') )
    .pipe( sass().on('error', sass.logError) )
    .pipe( cleanCSS() )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./public/css') )
})
gulp.task('sass:watch', () => {
  gulp.watch(sassSourcePath, ['sass'])
})

gulp.task('default', ['lint', 'test', 'scripts', 'sass', 'scripts:watch', 'sass:watch'])
