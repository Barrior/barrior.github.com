const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirname = __dirname.replace( /\\/g, '/' );

//rm -rf ./react-test/production

module.exports = {
    entry: {
        lib: ['react', 'react-dom', 'jquery'],
        app: './react-test/dev/app.js',

        // 定义多个入口，在 HtmlWebpackPlugin 下使用
        user: './react-test/dev/user.js'
    },
    output: {
        path: './react-test/production',
        filename: '[name]-[hash:8].js',

        // require.ensure 按需加载的时候输出名称
        chunkFilename: 'chunk-[hash:8].js'
    },
    module: {

        // 忽略对已知文件解析，提高编译速度
        noParse:['react', 'react-dom', 'jquery'],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,

                // 注意：数组声明时，这里是loaders
                loaders: [ 'react-hot', 'babel' ]
            },
            {
                test: /\.less$/,

                // https://github.com/webpack/extract-text-webpack-plugin
                loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!less')
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$|\.woff$|\.ttf$|\.eot$/,

                // 将文件从上下文目录复制到输出目录并保留完整的目录结构
                loader: 'file?name=[path][name]-[hash:8].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },

    // https://github.com/postcss/postcss-loader
    postcss: [
        autoprefixer({
            browsers: [ "IE >= 9", "Firefox > 10", "chrome > 10" ]
        })
    ],
    plugins: [

        // https://github.com/ampedandwired/html-webpack-plugin#configuration
        new HtmlWebpackPlugin({
            title: 'INDEX PAGE',

            // 生成的文件名，可包含路径
            filename: 'index.html',
            template: './react-test/dev/index-tpl.html',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            },

            // 生成的文件指定入口文件(或多个)，对应 entry 里的key
            // 这里加入lib，不然，当多个模板时，css公用的时候，生成的模板不会加入lib.js
            chunks: ['lib', 'app']
        }),

        // new 两次，就执行两次该插件
        new HtmlWebpackPlugin({
            title: 'USER PAGE',
            filename: 'user.html',
            template: './react-test/dev/user-tpl.html',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            },
            chunks: ['lib', 'user']
        }),

        // 提取公共js文件
        new webpack.optimize.CommonsChunkPlugin({
            // 建立提取关系，对应entry的lib
            name: 'lib',
            // 输出的文件名
            filename: '[name]-[hash:8].js'
        }),

        // 将所有样式文件提取成独立css文件
        new ExtractTextPlugin('./css/[name]-[hash:8].css')
    ],
    resolve: {
        root: dirname,
        extensions: [ '', '.js', '.jsx', '.json', '.scss', '.less' ],
        alias: {}
    },
    devServer: {
        // 配置 react-test/production 目录为服务器根目录，这样好像就不用刷新页面了，需要绝对路径
        // production：产品输出目录，真实线上环境目录
        contentBase: `${ dirname }/react-test/production`,
        // 热加载
        hot: true,
        // 实时刷新
        inline: true,
        // 终端中输出结果为彩色
        colors: true
    }
};