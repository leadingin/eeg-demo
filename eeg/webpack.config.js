const path           = require('path');
const config         = require('./config');
const UglifyJSPlugin = require('uglify-js-plugin');

module.exports = function(opts) {
    return {
        entry: {
            app: config.PATHS.appFile
        },
        output: {
            path: config.PATHS.outputJS,
            filename: '[name].bundle.js',
            chunkFilename: '[chunkhash].bundle.js',
            sourceMapFilename: '[name].bundle.map',
            devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]'
        },
        module: {
            loaders: [
                {
                    test: /\.html$/,
                    loader: 'html'
                }
            ]
        },
        plugins: [
            new UglifyJSPlugin({
                debug: true,
            })
        ],
        devtool: 'source-map',
        watch: opts.watch,
    }
};
