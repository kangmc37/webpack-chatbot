const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html插件，生成html模板
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 抽离 css 文件

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: '[name].[hash:8].bundle.js',
        // publicPath: 'http://www.example.com/', 
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
                // ,options: {
                //     "presets": ["@babel/preset-env"], 
                //     "plugins": ["@babel/plugin-transform-runtime"]
                // }
            }],
            exclude: '/node_modules/'
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader'],
                publicPath:'../' //解决css背景图的路径问题
            })
        },{
            test: /\.s(c|a)ss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        },{
            test: /\.(png|svg|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, // 小于 8KB 的图片转为 base64 格式
                    name: 'images/[name].[hash:8].[ext]', // 图片打包后存放的路径和名称
                }
            }]
        },{
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
        }]
    },
    resolve: {
        extensions: ['.js', '.json', '.scss'], // 可省略的扩展名
        alias: { // 别名

        },
        modules: ['node_modules'] // 可配置自定义的模块查找目录
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // 服务器根目录
        hot: true, // 开启热更新
        compress: true, // 开启代码压缩
        host: 'localhost',
        port: 8888, // 监听端口
        historyApiFallback: true, // 页面 404 时重定向至 index.html
        open: true, // 自动打开浏览器
        proxy: {
            // 启用代理，跨域访问聊天机器人 api
            '/api.php': {
                target: 'http://api.qingyunke.com', // 目标地址
                changeOrigin: true, // target项为域名时，需设置为 true
                secure: false //
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Chatbot',
            filename: 'index.html',
            template: './index.html'
        }),
        new ExtractTextPlugin('css/style.css') // 将 css 文件打包到 styles.css 中
    ],
    devtool: 'none'
}