let webpack = require('webpack');
let dirname = __dirname.replace( /\\/g, '/' );

console.log( __dirname );
console.log( dirname );

module.exports = {
    entry: {
        app: './react-test/dev/app.js'
    },
    output: {
        path: './react-test/production',
        filename: '[name].js'
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
                loader: 'style!css!less'
            }
        ]
    },
    resolve: {
        root: dirname,
        extensions: [ '', '.js', '.jsx', '.json', '.scss', '.less' ],
        alias: {
            //react: dirname + '/react-test/production/react.min',
            //reactDOM: '../production/react-dom.min'
        }
    },
    devServer: {
        // 配置react-test目录为服务器根目录，这样好像就不用刷新页面了
        //contentBase: `${ dirname }/react-test`,
        // 热加载
        hot: true,
        // 实时刷新
        inline: true,
        // 终端中输出结果为彩色
        colors: true
    }
};