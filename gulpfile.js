"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var del = require("del");
gulp.task('clean', function () {
    return del([
        '**/*.d.ts',
        '**/*.js',
        '**/*.js.map',
        '!node_modules/**/*',
        '!systemjs.config.extras.js',
        '!systemjs.config.js',
        '!karma-test-shim.js',
        '!karma.conf.js',
        '!protractor.config.js',
    ]);
});
//# sourceMappingURL=gulpfile.js.map