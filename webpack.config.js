// ES5 写webpack 步骤 2-5

/* 用es6来书写 webpack.config.babel.js 步骤1-7

1、npm i babel --save-dev
2、npm i babel-core --save-dev
3、npm i babel-preset-env --save-dev (babel-preset-es2015 只支持es6转es5不支持es7 es8)
4、touch .babelrc
5、在 .babelrc 中写 { "presets":["env"] }
6、webpack.config.js => webpack.config.babel.js
7、把 require 换成 import from, module.exports 换成 export default , 可以使用其他的es6，7，8语法了 */

// 以下是es5写法
// 先使用命令 webpack 生成 dist 文件夹
// 然后使用命令 webpack-dev-server  启动服务
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成 .html 文件
var autoprefixer = require('autoprefixer'); // 自动补全css前缀

module.exports = {
    entry: ['./public/js/entry.js'], // 入口文件 
    output: {
        filename: 'bundle.js', // 出口文件的名字
        path: __dirname + '/dist' // 出口文件路径
    },
    plugins: [
        new HtmlWebpackPlugin({ // 自动生成index.html
            template: './index.html', // 要使用的模块的路径  
            filename: 'index.html', // 如果不写默认就是它
            path: __dirname + '/dist',
            title: 'webpack-demo'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
                { test: /\.js$/, use: ['babel-loader'] }, // 匹配所有的js，编译成ES5
                { test: /\.(png|jpg|gif)$/, use: ['url-loader'] }, // 
                { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] } // 编译读取css
            ]
            // postcss: [autoprefixer({ browsers: ['last 2 versions'] })] //自动补全css前缀
    },

    devServer: {
        port: 8090, // 设置默认端口号，省略默认为8080
        hot: true, // 允许热替换
        inline: true, // 设置为true，当源文件改变时会自动刷新页面
        contentBase: __dirname, // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        open: 'http://localhost:8090' // 自动打开浏览器
            // historyApiFallback: true // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    }

}