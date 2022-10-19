const path = require('path');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    // Tells Webpack which built-in optimizations to use
    // In 'production' mode, Webpack will minify and uglify our JS code
    // If you leave this out, Webpack will default to 'production'
    mode: devMode ? 'development' : 'production',

    // Webpack needs to know where to start the bundling process,
    // so we define the main TS file
    entry: ['./src/main.ts'],
    devtool: 'inline-source-map',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        fallback: {
            "assert": require.resolve("assert"),
            "fs": false,
            "util": require.resolve("util")
        }
    },
    optimization: {
        minimize: true // Minimization seems to break the ANTLR parser in some cases, particularly the serialized ATN
    },

    // This is where we define the path where Webpack will place
    // the bundled JS file
    output: {
        path: path.resolve(__dirname, 'dist'),

        // The name of the output bundle. Path is also relative
        // to the output path
        filename: 'browser/bundle.js'
    },
    module: {
        // Array of rules that tells Webpack how the modules (output)
        // will be created
        rules: [
            {
                // Look for TypeScript files and apply the ts-loader
                // excluding the './node_modules' directory. It uses the
                // configuration in `tsconfig.json`
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true }
            },
            {
                // Look for JavaScript files and apply the babel-loader
                // excluding the './node_modules' directory. It uses the
                // configuration in `.babelrc`
                test: /\.(js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            }
        ]
    },
    plugins: [
        // https://github.com/TypeStrong/ts-loader#usage-with-webpack-watch
        new webpack.WatchIgnorePlugin({ paths: [ /\.js$/, /\.d\.ts$/ ]}),
        new webpack.EnvironmentPlugin({ 'NODE_DEBUG': false })
    ],
    target: 'web'
};