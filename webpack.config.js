// ES5
// 使用命令 webpack-dev-server 

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./public/js/entry.js'], // 入口文件 
    output: {
        filename: 'bundle.js', // 出口文件的名字
        path: __dirname + '/dist' // 出口文件路径
    },
    plugins: [
        new HtmlWebpackPlugin({ // 自动生成index.html
            template: './index.html',
            filename: 'index.html',
            path: __dirname + '/dist'
        }),
        new webpack.HotModuleReplacementPlugin(), // 热替换
        // new webpack.optimize.UglifyJsPlugin(), // 压缩js
        new webpack.BannerPlugin('版权所有，翻版必究')
    ],
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'] }, // 匹配所有的js，编译成ES5
            { test: /\.(png|jpg|gif)$/, use: ['url-loader'] }, // 
            { test: /\.css$/, use: ['style-loader', 'css-loader'] } // 编译读取css
        ]
    },
    devtool: 'none',
    devServer: {
        port: 8090, // 设置默认端口号，省略默认为8080
        inline: true, // 设置为true，当源文件改变时会自动刷新页面
        contentBase: __dirname, // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        open: 'http://localhost:8090' // 自动打开网页
            // historyApiFallback: true // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    }


}