var pkg = require('./package.json');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();//浏览器刷新工具
const del = require('del');//清除文件
const cleanCSS = require('gulp-clean-css');//css压缩
const cssVer = require('gulp-css-url-versioner');//css文件图片添加版本号
const rename = require('gulp-rename');//重命名
const autoprefixer = require('gulp-autoprefixer');//浏览器前缀
const uglify = require('gulp-uglify');//js压缩
const header = require('gulp-header');//添加头部注释

// 清除文件
gulp.task('clear', function(cb){ //清理
  return del(['./dist/*'], cb);
});
/*开发时实时预览*/
gulp.task('dev', function() {
    browserSync.init({
        // 关闭任何设置的操作镜像到所以设备
        ghostMode: false,
        server: {
            baseDir: './',
            startPath: "/info.html"
        }
    });
    //监听文件变化数组
    gulp.watch(['test/*','src/*']).on("change", browserSync.reload);
});
// 压缩CSS
gulp.task('mincss', () => {
    return gulp.src('src/*.css')
        .pipe(cssVer())
        .pipe(cleanCSS({
            //保留ie7及以下兼容写法
            compatibility: 'ie7',
            //保留所有特殊前缀
            keepSpecialComments: '*'
        }))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});
// 压缩JS
gulp.task('minjs', () => {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(header('/*! <%= pkg.realname %>-v<%= pkg.version %> <%= pkg.description %> <%= pkg.license %> License  <%= pkg.homepage %>  By <%= pkg.author %> */\n ;', {pkg: pkg}))
        .pipe(gulp.dest('dist'));
});
gulp.task('pack', ['clear'], function(){

    gulp.start('mincss', 'minjs');
});


