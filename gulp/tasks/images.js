
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import responsive from "gulp-responsive";

let images = () => {
    return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "IMG",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(imagemin({
        progressive: true,
        svgPlugins: [{ removeVievBox: false }],
        interlaced: true,
        optimizationLevel: 3
    }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(responsive({
        width: 15,
        quality: 10,
        compressionLevel: 7,
    }))
    .pipe(rename(function(opt) {
        opt.basename = `${opt.basename}-low`
        return opt;
      }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream())
}

export { images }