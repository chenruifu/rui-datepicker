var pkg = require('./package.json');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();//浏览器刷新工具
const del = require('del');//清除文件
const cleanCSS = require('gulp-clean-css');//css压缩
const cssVer = require('gulp-css-url-versioner');//css文件图片添加版本号
const rename = require('gulp-rename');//重命名
const autoprefixer = require('gulp-autoprefixer');//浏览器前缀
const uglify = require('gulp-uglify');//js压缩
const header = require('gulp-header');//添加头部注
const replace = require('gulp-replace');//替换文本

// 修改文件路径
function isDevelop(dev = true){
    const css = ['src/rui-datepicker.css', 'dist/rui-datepicker.min.css'];
    const js = ['src/rui-datepicker.js', 'dist/rui-datepicker.min.js'];
    if(dev){
        gulp.src('test/*.html')
        .pipe(replace(css[1], css[0]))
        .pipe(replace(js[1], js[0]))
        .pipe(gulp.dest('test'))
    }else{
        gulp.src('test/*.html')
        .pipe(replace(css[0], css[1]))
        .pipe(replace(js[0], js[1]))
        .pipe(gulp.dest('test'))
    }
}
// 清除文件
gulp.task('clear', function(cb){ //清理
  return del(['./dist/*'], cb);
});
/*开发时实时预览*/
gulp.task('dev', function() {
    browserSync.init({
        // 关闭任何设置的操作镜像到所以设备
        ghostMode: false,
        //默认开启的地址
        startPath: "/test/demo.html",
        server: {
            baseDir: './'
        }
    });
    // 修改static引入地址
    isDevelop(true)
    //监听文件变化数组
    gulp.watch(['test/*','src/*']).on("change", browserSync.reload);
});
// 压缩CSS
gulp.task('cssmin', () => {
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
gulp.task('jsmin', () => {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header('/*! <%= pkg.realname %>-v<%= pkg.version %> <%= pkg.description %> <%= pkg.license %> License  <%= pkg.homepage %>  By <%= pkg.author %> */\n ;', {pkg: pkg}))
        .pipe(gulp.dest('dist'))
});

// 发布打包
gulp.task('pack', ['clear'], function(){
    gulp.start('cssmin', 'jsmin');
    return isDevelop(false)
});

