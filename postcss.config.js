var autoprefixer = require('autoprefixer'); // 自动补全css前缀

module.exports = {
    plugins: [
        autoprefixer({
            browsers: 'last 5 versions'
        })
    ]
}