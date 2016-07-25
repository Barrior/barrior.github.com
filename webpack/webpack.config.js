
let path = require('path');
let webpack = require('webpack');

module.exports = {

    entry: './src/js/dev.js',

    output: {
        path: './assets/js/',
        filename: 'index.js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'sass'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192'
            }
        ]
    },

    resolve: {
        //查找module的话从这里开始查找，绝对路径
        //root: 'D:/Github-Projects/barrior.github.com/webpack/src',
        root: __dirname,
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            //后续直接 require('jq') 即可
            jq : 'src/js/jquery.js'
        }
    }

};