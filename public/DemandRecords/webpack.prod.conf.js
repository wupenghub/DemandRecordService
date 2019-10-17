const merge = require('webpack-merge');
// const webpack = require('webpack');
const path = require('path');
// const AutoDllPlugin = require('autodll-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
    mode: 'production',
    // devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        // new AutoDllPlugin({
        //     inject: true, // will inject the DLL bundle to index.html
        //     debug: true,
        //     filename: 'vues_[hash:5].js',
        //     path: './js',
        //     entry: {
        //         vendor: ['vue', 'vue-router', 'vuex']
        //     }
        // }),
        // new AutoDllPlugin({
        //     inject: true, // will inject the DLL bundle to index.html
        //     debug: true,
        //     filename: 'element-ui_[hash:5].js',
        //     path: './js',
        //     entry: {
        //         vendor: ['element-ui']
        //     }
        // }),
        // 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
        new MiniCssExtractPlugin({
            filename: "[name].[hash:5].css",
            chunkFilename: "[name].[hash:5].css"
        }),
        // 拷贝静态资源
        /* new CopyWebpackPlugin([{
             from: path.join(__dirname, '../src/static'),
             to: path.join(__dirname, '../dist/static')
         }]),*/
        // 压缩css
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {discardComments: {removeAll: true}}],
            },
            canPrint: true
        }),
        // 打包结果分析，如需看打包结果分析，放开下面注释即可
        // new BundleAnalyzerPlugin({analyzerPort: 8888})
    ],
    // 提取公共模块，包括第三方库和自定义工具库等
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
    }
})