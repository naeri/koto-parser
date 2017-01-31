const path = require('path');
const webpack = require('webpack');

const entry = path.join(__dirname, 'lib', 'index.js');

module.exports = {
    entry: {
        'koto-parser': entry,
        'koto-parser.min': entry
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'KotoParser',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: { presets: ['latest'] }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};