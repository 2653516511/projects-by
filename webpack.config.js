const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

const config = {
    // 模式： 开发  生产
    mode: 'development',        //production
    // source-map
    devtool: "source-map",
    // 优化，禁止压缩 最小化
    optimization: {
        minimize: false
    },
    // 入口文件  多文件入口
    entry: {
        index: resolve(__dirname, './src/js/index.js'),
        detail: resolve(__dirname, './src/js/detail.js'),
        collections: resolve(__dirname, './src/js/collections.js')
    },
    // 输出/打包设置
    output: {
        // 路径
        path: resolve(__dirname, './dist'),
        // 打包后的文件名
        filename: 'js/[name].js'
    },
    // 模块设置
    module: {
        // 模块匹配规则
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: resolve(__dirname, 'node_modules'),
                query: {
                    'presets': ['latest']
                }
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    // 从下往上
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
                loaders: 'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
            },
            
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, 'src/index.html'),
            title: 'news ap',
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
            title: 'news detail',
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
            filename: 'collections.html',
            template: resolve(__dirname, 'src/collections.html'),
            title: 'my news',
            chunks: ['collections'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

    ],
    // 开发服务器的配置
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        open: true,
        host: 'localhost',
        port: 3000
    }
}

module.exports = config