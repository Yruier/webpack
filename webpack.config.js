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
            template: './index.html', // 获取html 将bundle.js 链入 
            filename: 'index.html', // 如果不写默认就是它
            path: __dirname + '/dist',
            title: 'webpack-demo', // .html 文件的 title 里写 <%= htmlWebpackPlugin.options.title %>
            inject: true, //默认为 true script标签位于html文件的body底部, 填 body 和 填true 效果一样; head=> script 标签位于 head 标签内; false => 不生成script 标签
            minify: { // 压缩html
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                collapseBooleanAttributes: true, //省略布尔属性的值 <input checked='true'/> ==> <input />
                removeEmptyAttributes: true, //删除所有空格作属性值 <input id='' /> ==> <input />
                removeScriptTypeAttributes: true, //删除<script>的type='text/javascript'
                removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type='text/css'
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            },
            hash: false, //hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 。
            showErrors: true, // 默认就是true  显示错误信息
            cache: true, // true 表示只有在内容变化时才生成一个新的文件。
            // chunks:['bundle.js','other.js'] 多入口的时候 会生成多个js  你可以通过这个字段 来选择需要将哪些js 引入你的html 默认是全部引入 所以一般不配置
            excludeChunks: ['webpack.config.js'], // 这个字段的意思是不包含某个js
            chunksSortMode: 'dependency', // 按照依赖循序引入
            /*
            这个选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'。
            'dependency' 不用说，按照不同文件的依赖关系来排序。
            'auto' 默认值，插件的内置的排序方式。
            'none' 应该是你chunks 那个数组的顺序。
            {function} 提供一个函数
            chunksSortMode: function (chunk1, chunk2) { // 多入口 多出口的依赖顺序。
                var order = ['module3', 'module2','module1'];  // 这是你想要的顺序 这是你的 入口文件的 属性名[键名]
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2 ;  
            }            
            */
            xhtml: false //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。
        }),
        new webpack.HotModuleReplacementPlugin(), // 热替换
        // new webpack.optimize.UglifyJsPlugin(), // 压缩js   
        new webpack.BannerPlugin('版权所有，翻版必究'),
        /*  new webpack.optimize.CommonsChunkPlugin({  // 提取公共模块的webpack内置插件
             // names:['公共模块1.js','公共模块2.js'],
             name: 'module1.js', // 当你只有一个公共模块的时候用 这个就是你的公共模块  可以传数组
             filename: 'public.js', // 这个是你的公共模块的 总文件 公共模块将被提取到这个文件中
             minChunks: 2 // 就是说 你有几个 引用了公共模块的文件 但是必须小于等引用公共模块的文件数 大于2
         }) */
    ],
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'] }, // 匹配所有的js，编译成ES5
            { test: /\.(png|jpg|gif)$/, use: ['url-loader'] }, // 
            { test: /\.css$/, use: ['style-loader', 'css-loader'] } // 编译读取css
        ]
    },
    devtool: 'none', // 详细文档地址 https://www.jianshu.com/p/42e11515c10f 
    devServer: {
        port: 8090, // 设置默认端口号，省略默认为8080
        hot: true, // 允许热替换
        inline: true, // 设置为true，当源文件改变时会自动刷新页面
        contentBase: __dirname, // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        open: 'http://localhost:8090' // 自动打开浏览器
            // historyApiFallback: true // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    }

}