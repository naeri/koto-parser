const fs = require('fs');
const path = require('path');
const async = require('async');

const browserify = require('browserify');
const UglifyJS = require('uglify-js');

const srcPath = path.join(__dirname, 'lib', 'index.js');
const distPath = path.join(__dirname, 'dist', 'koto-parser.js');
const minDistPath = path.join(__dirname, 'dist', 'koto-parser.min.js');

async.waterfall([
    function(callback) {
        browserify(srcPath, { standalone: 'KotoParser' })
            .transform('babelify', { presets: ['latest'] })
            .bundle(callback);
    },
    function(distBuffer, callback) {
        fs.writeFile(distPath, distBuffer, callback);
    },
    function(callback) {
        const minDist = UglifyJS.minify(distPath).code;
        fs.writeFile(minDistPath, minDist, callback);
    }
], function(error) {
    if (error) {
        console.log(error.stack);
    } else {
        console.log('> ' + distPath);
        console.log('> ' + minDistPath);
    }

    console.log('');
});