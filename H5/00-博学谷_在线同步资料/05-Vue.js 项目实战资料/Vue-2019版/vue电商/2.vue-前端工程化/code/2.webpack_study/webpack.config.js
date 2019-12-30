const path = require('path')

//导入包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlguin = new HtmlWebpackPlugin({
    //设置生成预览页面的模板文件
    template: './src/index.html',
    //设置生成的预览页面名称
    filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 编译模式 dev 模式编译出来的文件压缩不完整, pro 压缩之后文件很小
    mode: 'development', // development  production
    // 拼接入口文件绝对路径
    entry: path.join(__dirname, './src/index.js'),
    output: {
        // 
        path: path.join(__dirname, './dist'), // 输出文件的存放路径
        filename: 'bundle.js' // 输出文件的名称
    },
    // 添加plugins信息, 打包期间会用到的一些插件列表
    plugins: [htmlPlguin, new VueLoaderPlugin()],
    module: {
        rules: [
            /**
            运行 npm i style-loader css-loader -D 命令, 安装处理 css 文件的 loader ;
	          运行 npm i less-loader less -D 命令, 安装处理 less 文件的 loader ;
	          运行 npm i sass-loader node-sass -D 命令, 安装处理 scss 文件的 loader;
           */
            // 安装postcss-loader加载器以及autoprefixer, 运行 npm i postcss-loader autoprefixer -D 命令;
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            // 注意这里 sass-loader 不是 scss-loader 
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=16941' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    }
}