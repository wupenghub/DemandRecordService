const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');// 导入 在内存中自动生成 index 页面的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), // 源文件
    filename: 'index.html' // 生成的内存中首页的名称
});


// 向外暴露一个打包的配置对象；   因为 webpack 是基于Node构建的；所以 webpack 支持所有Node API 和语法
// webpack 默认只能打包处理 .js 后缀名类型的文件； 像 .png .vue 无法主动处理，所以要配置第三方的loader；
module.exports = {
    mode: 'development', // development   production
    // 在 webpack 4.x 中，有一个很大的特性，就是 约定大于配置  约定，默认的打包入口路径是 src -> index.js
    plugins: [
        htmlPlugin,
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:5].css",
            chunkFilename: "[name].[hash:5].css"
        }),
    ],
    optimization: {
        // 找到chunk中共享的模块,取出来生成单独的chunk
        splitChunks: {
            // async表示抽取异步模块，
            // all表示对所有模块生效，
            // initial表示对同步模块生效
            chunks: 'all',
            cacheGroups: {
                // 指定是node_modules下的第三方包
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // 抽取优先级
                    priority: -10,
                    automaticNameDelimiter: '_'
                },
                // 抽离vue,vue-router,vuex
                vuebase: {
                    test: /[\\/]node_modules[\\/]vue/,
                    name: 'vue_base',
                    priority: 100,
                    automaticNameDelimiter: '_'
                },
                // 抽离element-ui
                elementui: {
                    test: /[\\/]node_modules[\\/]element-ui/,
                    name: 'element_ui',
                    priority: 10,
                    automaticNameDelimiter: '_'
                },
                // 抽离echarts
                // echarts: {
                //   test: /[\\/]node_modules[\\/]echarts/,
                //   name: 'echarts',
                //   priority: 10,
                //   automaticNameDelimiter: '_'
                // },
                // 抽离自定义工具库
                utilCommon: {
                    name: 'util_common',
                    // 将引用模块分离成新代码文件的最小体积
                    minSize: 0,
                    // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    minChunks: 2,
                    priority: -20
                },
            }
        },
        // 为 webpack 运行时代码创建单独的chunk
        runtimeChunk: {
            name: 'manifest'
        },
        // minimizer: [
        //     new UglifyJsPlugin(),
        //     new OptimizeCSSAssetsPlugin({})
        // ]
    },
    module: { // 所有第三方 模块的配置规则
        rules: [ // 第三方匹配规则
            {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记添加 exclude 排除项
            {test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"]},
            {test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
            {test: /\.vue$/, use: "vue-loader"},
            {
                test: /\.(jpg|png|gif|bmp|jpeg|ttf|otf|eot|svg|woff|woff2)$/,
                use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 表示，这几个文件的后缀名，可以省略不写
        alias: { // 表示别名
            '@': path.join(__dirname, './src') // 这样，@ 就表示 项目根目录中 src 的这一层路径
        }
    }
};


// 行不行 ？  目前不行； // 这是 ES6 中 向外导出模块的API 与之对应的 是  import ** from '标识符'
// export default {}
// 那些 特性 Node 支持呢？  如果 chrome 浏览器支持哪些，则 Node 就支持哪些；