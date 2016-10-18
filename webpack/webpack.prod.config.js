const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirname = __dirname.replace( /\\/g, '/' );

module.exports = {
    entry: {
        lib: ['react', 'react-dom'],
        app: './react-test/dev/app.js',
        //user: './react-test/dev/user.js',
    },
    output: {
        path: './react-test/production',
        filename: '[name]-[hash:8].js',
        //chunkFilename: 'chunk-[hash:8].js',
        // webpack-dev-server访问的路径
        //publicPath: './react-test/dev'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // 注意：数组声明时，这里是loaders
                loaders: [ 'react-hot', 'babel' ]
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
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
    postcss: [
        // 调用autoprefixer插件, npm install --save-dev postcss-loader autoprefixer
        require('autoprefixer')
    ],
    plugins: [
        // 压缩js css
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            // 建立提取关系，对应entry的lib
            name: 'lib',
            // 输出的文件名
            filename: '[name]-[hash:8].js'
        })
    ],
    resolve: {
        root: dirname,
        extensions: [ '', '.js', '.jsx', '.json', '.scss', '.less' ],
        alias: {
            //react: dirname + '/react-test/production/react.min',
            //reactDOM: '../production/react-dom.min'
        }
    },
    devServer: {
        // 配置react-test/production目录为服务器根目录，这样好像就不用刷新页面了，需要绝对路径
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