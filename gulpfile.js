const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

// Task para compilar SASS
function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

// Task para comprimir imagens (rodar quando quiser)
function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

// Task de observação apenas do SASS (sem imagens)
function watchFiles() {
    gulp.watch('./src/styles/*.scss', styles);
    gulp.watch('./index.html');
}

// Exportações
exports.styles = styles;          // roda: npm run styles ou gulp styles
exports.images = images;          // roda: npm run images ou gulp images
exports.watch = watchFiles;       // roda: npm run watch ou gulp watch

// Build básico (só SASS)
exports.build = gulp.parallel(styles);

// Build completo (SASS + imagens, só quando quiser)
exports.default = gulp.parallel(styles, images);
