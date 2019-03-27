"use strict";

/* параметры для gulp-autoprefixer */
const autoPrefixList = [
  'Chrome >= 45',
  'Firefox ESR',
  'Edge >= 12',
  'Explorer >= 10',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30'
];
/* пути к исходным файлам (src), к готовым файлам (public), а также к тем, за изменениями которых нужно наблюдать (watch) */
const path = {
  public: {
    js: 'public/js/',
    css: 'public/css/',
  },
  src: {
    js: 'src/js/**/*.js',
    style: 'src/scss/*.+(scss|sass)',
  },
  watch: {
    js: 'src/js/**/*.js',
    css: 'src/scss/**/*.+(scss|sass)',
  },
  clean: ['./public/css', './public/js']
};
/* настройки сервера */
const config = {
  server: {
    baseDir: 'public'
  },
  browser: 'chrome'
  //notify: false
};

/* подключаем gulp и плагины */
const gulp = require('gulp'),  // подключаем Gulp
  sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
  cssMin = require('gulp-csso'), // Подключаем пакет для минификации CSS
  minifyJs = require('gulp-terser'), // Подключаем gulp-terser (для сжатия JS)
  del = require('del'), // плагин для удаления файлов и каталогов
  plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
  rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
  sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
  autoPrefix = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
  cache = require('gulp-cache'), // модуль для кэширования
  rename = require('gulp-rename'), // Переименование файлов
  babel = require('gulp-babel');

/* задачи */

// сбор стилей
gulp.task('css', () => {
  return gulp.src(path.src.style) // получим main.scss
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(sourcemaps.init()) // инициализируем sourcemap
    .pipe(sass()) // scss -> css
    .pipe(autoPrefix({ // добавим префиксы
      browsers: autoPrefixList
    }))
    .pipe(cssMin())
    .pipe(sourcemaps.write('./')) // записываем sourcemap
    .pipe(gulp.dest(path.public.css)); // выгружаем в public
});

// сбор js
gulp.task('js', () => {
  return gulp.src(path.src.js) // получим файл main.js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указанные файлы в main.js
    // .pipe(sourcemaps.init()) //инициализируем sourcemap
    // .pipe(minifyJs()) //минификация
    .pipe(rename({
      suffix: '.min'
    }))
    // .pipe(sourcemaps.write('./')) //  записываем sourcemap
    .pipe(gulp.dest(path.public.js)); // положим готовый файл
});

// babel
gulp.task('js:babel', () => {
  return gulp.src(path.src.js) // получим файл main.js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(sourcemaps.init()) //инициализируем sourcemap
    .pipe(rigger()) // импортируем все указанные файлы в main.js
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minifyJs()) //минификация
    .pipe(rename({
      suffix: '.es5'
    }))
    .pipe(sourcemaps.write('./')) //  записываем sourcemap
    .pipe(gulp.dest(path.public.js)); // положим готовый файл
});

//библиотеки
gulp.task('libs', () => {
  return gulp.src(['src/libs/jquery.min.js', 'src/libs/jquery-ui.min.js', 'src/libs/vue.js'])
    .pipe(gulp.dest(path.public.js));
});

// удаление каталогов
gulp.task('clean', () => {
  return del(path.clean);
});

// очистка кэша
gulp.task('cache:clear', () => {
  return cache.clearAll();
});


// сборка
gulp.task('public', gulp.parallel(
  'css',
  'js',
  // 'js:babel',
  'libs'
));

//watch
gulp.task('css:watch', () => {
  return gulp.watch(path.watch.css, gulp.series('css'));
});
gulp.task('js:watch', () => {
  return gulp.watch(path.watch.js, gulp.parallel('js'));//, 'js:babel'));
});

gulp.task('watch', gulp.parallel(
  'css:watch',
  'js:watch'
));


// задача по умолчанию
gulp.task('default',
  gulp.series('clean', 'public', 'watch')
);
