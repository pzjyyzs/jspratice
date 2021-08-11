const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        minimize: false
    },
    entry: {
        index: resolve(__dirname, './src/js/Index.js'),
        list: resolve(__dirname, './src/js/List.js'),
        detail: resolve(__dirname, './src/js/Detail.js')
    },
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                loaders: 'babel-loader',
                exclude: resolve(__dirname, 'node_modules'),
                query: {
                    'presets': ['latest']
                }
            },
            {
                test: /\.tpl$/,
                loaders: 'ejs-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer('last 5 versions')];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer('last 5 versions')];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
                loaders: [
                    'url-loader?limit=1024name=img/[name]-[hash:16].[ext]',
                   /*  'image-webpack-loader' */
                ]
            }
        ]
    },
    plugins: [
       /*  new uglify(), */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, 'src/index.html'),
            title: '官网',
            chunks: ['index'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: resolve(__dirname, 'src/detail.html'),
            title: '官网',
            chunks: ['detail'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'list.html',
            template: resolve(__dirname, 'src/list.html'),
            title: '官网',
            chunks: ['list'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ],
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        open: true,
        host: 'localhost',
        port: 3000
    }
}