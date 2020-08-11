const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    entry: './src/index.jsx',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: argv.mode === "production" ? 'hidden-source-map' : 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new MiniCssPlugin(),
        new HtmlPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/i,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g)/i,
                use: 'file-loader'
            },
            // {
            //     test: /\.css$/i,
            //     use: [
            //         MiniCssPlugin.loader, 
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true
            //             }
            //         },
            //         'postcss-loader'
            //     ]
            // },
            {
                test: /\.(s*)css$/i,
                use: [
                    MiniCssPlugin.loader,
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
            // {
            //     test: /\.json/i,
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // }
        ]
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: { index: '/' },
        hot: true
    }
});