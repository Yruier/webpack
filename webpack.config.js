// ES5 写webpack 步骤 2-5

/* 用es6来书写 webpack.config.babel.js 步骤1-7

1、npm i babel --save-dev
2、npm i babel-core --save-dev
3、npm i babel-preset-env --save-dev (babel-preset-es2015 只支持es6转es5不支持es7 es8)
4、touch .babelrc
5、在 .babelrc 中写 { "presets":["env"] }
6、webpack.config.js => webpack.config.babel.js
7、把 require 换成 import from, module.exports 换成 export default , 可以使用其他的es6，7，8语法了 */
// （8、如果需要自动添加css前缀，则需创建 postcss.config.js 文件）


// 以下是es5写法
// 先使用命令 webpack 生成 dist 文件夹
// 然后使用命令 webpack-dev-server  启动服务
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成 .html 文件
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除多余或重复文件


module.exports = {
    entry: ['./src/entry.js'], // 入口文件 
    output: {
        filename: '[name]-[hash:5].js', // 出口文件的 名字+hash指纹 （name默认为 main）
        path: __dirname + '/dist' // 出口文件路径
    },
    plugins: [
        new HtmlWebpackPlugin({ // 自动生成index.html
            template: './index.html', // 要使用的模块的路径  
            filename: 'index.html', // 如果不写默认就是它
            path: __dirname + '/dist', // 可以不写
            title: 'webpack-demo', //html的 title
            minify: {
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                collapseBooleanAttributes: false, //省略布尔属性的值 <input checked='true'/> ==> <input />
                removeEmptyAttributes: true, //删除所有空格作属性值 <input id='' /> ==> <input />
                removeScriptTypeAttributes: true, //删除<script>的type='text/javascript'
                removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type='text/css'
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin('./dist/*.js') //清除dist文件夹重复的生成的 js文件
    ],
    module: {
        rules: [
            { test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/ }, // 匹配所有的js,除了node_modules文件夹下的js，编译成ES5
            { test: /\.(png|jpg|gif)$/, use: ['url-loader'] }, // 
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }, // 编译读取css
            { test: /\.vue$/, use: ['vue-loader'] } // 编译读取.vue文件
        ]
    },

    devServer: {
        port: 8090, // 设置默认端口号，省略默认为8080
        hot: true, // 允许热替换--默认true，不写即可
        inline: true, // 应用程默认序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
        contentBase: __dirname, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。也可使用"./dist/"
        open: 'http://localhost:8090', // 自动打开浏览器 或 直接写 true
        // historyApiFallback: true // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        progress: false, //在控制台 显示热更新时的打包的进度
        /* proxy: {
            '/': {
                target: '/user',
                secure: false, //若地址为https，需要设置为false
                onProxyReq: function(proxyReq, req, res) {
                    res.end()
                },
                onProxyRes: function(proxyRes, req, res) {

                },
                onError: function(error) {
                    // 不太确定
                },

            }
        }, */
        before(app) { // 用来向前端请求数据
            app.get('/user', (req, res) => {
                res.end();
            })
        }
    }


}