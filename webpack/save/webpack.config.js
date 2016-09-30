"use strict";
const path = require('path');
const fs = require('fs');
const util = require("util");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const rootDir = __dirname;
const program = require('commander');
const host = require('../../bin/build/config/host');
const lessPluginFunctions = require('less-plugin-functions');

var CopyWebpackPlugin = require('copy-webpack-plugin');

const projDir = __dirname;
const entries = require('../../bin/build/webpack/getEntries')(__dirname, {
    resolvePath: function (moduleName) {
        return path.join(projDir, 'public/js/', moduleName);
    },
    globPattern: __dirname + '/**/*.?(s)html'
});

program
    .allowUnknownOption(true)
    .option('-e --env [env]', 'enviroment')
    .option('-p --proj [proj]', 'project name')
    .option('--use_cdn [proj]', 'whether use cdn')
    .parse(process.argv);

let env = (program.env || 'DEV').toUpperCase();

const isDebug = !program.use_cdn;

var entry = {};

var cssLoader;
var lessLoader;
var fileLoader = `file-loader?name=[path][name]-[hash:8].[ext]&context=${rootDir}`;

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:isDebug ? '[name].js' : "[name]-[hash:8].js"}),
    new ExtractTextPlugin({filename:'[name]-[chunkhash:8].css',
        allChunks: true
    }),
    new CopyWebpackPlugin([
        {
            from: '**/*.?(s)html'
        },
        {
            from: 'favicon.ico'
        },
        {
            from: '../../static_public/**/*.?(s)html',
            to: `projects/${program.proj}`
        },
        {
            from: '../../static_public/js/lib/ueditor/**/*',
            to: `projects/${program.proj}`
        }
    ]),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
];

if (!isDebug) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        compress: {
            warnings: false
        }
    }));
    //
    plugins.push(new webpack.optimize.DedupePlugin());
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

var publicPath = isDebug ? '/' : `//${host.CDN[env]}/dist/projects/${program.proj}/`;

plugins.push(
    new webpack.DefinePlugin({
        'process.env.env': JSON.stringify(env),
        'process.env.NODE_ENV': JSON.stringify(isDebug ? env : 'production'),
        'process.env.publicPath': JSON.stringify(publicPath)
    })
);

entry['vendor'] = ['jquery', 'angular', 'es6-promise'];

if (isDebug) {
    cssLoader = [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'resolvePathCss-loader',
        'rmUrlQuery-loader',
    ].join('!');
    lessLoader = [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'resolvePathCss-loader',
        'rmUrlQuery-loader',
        'less',
    ].join('!');
} else {
    cssLoader = ExtractTextPlugin.extract({fallbackLoader: 'style-loader',loader:[
        'css-loader',
        'postcss-loader',
        'resolvePathCss-loader',
        'rmUrlQuery-loader',
    ].join('!')});
    lessLoader = ExtractTextPlugin.extract({fallbackLoader: 'style-loader',loader:[
        'css-loader',
        'postcss-loader',
        'resolvePathCss-loader',
        'rmUrlQuery-loader',
        'less',
    ].join('!')});
}

var pageToEntryKey = {};
entries.map(item=> {
    var jsEntry = item.main;

    if (!jsEntry) {
        return;
    }

    var arr = [];
    if (isDebug) {
        arr.push(util.format(
            'webpack-dev-server/client?http://%s:%d',
            pkg.config.devHost,
            pkg.config.devPort
        ), 'webpack/hot/dev-server')
    }
    arr.push(jsEntry.pathAbs);

    var key = path.dirname(jsEntry.pathRel) + '/' + path.basename(jsEntry.pathRel, path.extname(jsEntry.pathRel));
    entry[key] = arr;

    var plugins2 = [
        new HtmlWebpackPlugin({
            filename: path.relative(__dirname, item.page),
            template: 'html?minimize=false!ssiHtml-loader!' + item.page,
            inject: true,
            chunks: ["vendor", key]
        })
    ];

    if (!isDebug) {
        plugins = plugins.concat(plugins2);
    } else {
        pageToEntryKey['/' + path.relative(__dirname, item.page).replace(/\\/g, '/')] = {
            entry: {[key]: arr},
            plugins: plugins2
        };
    }
});

module.exports = {
    context: __dirname,
    entry: entry,
    output: {
        path: path.join(__dirname, pkg.config.buildDir),
        filename: "[name]-[chunkhash:8].js",
        chunkFilename: '[id].chunk-[chunkhash:8].js',
        publicPath: publicPath
    },
    module: {
        noParse: [],
        loaders: [
            {
                loader: 'exports?angular',
                test: /angular\.min\.js/
            },
            {
                loader: 'expose?WdatePicker!exports?WdatePicker',
                test: /WdatePicker\.js/
            },
            {
                loader: 'expose?_',
                test: /underscore-min\.js/
            },
            {
                loader: 'expose?md5',
                test: /md5\.min\.js/
            },
            {
                loader: 'expose?$!expose?jQuery!',
                test: /jquery\.min\.js/
            },
            {
                loader: 'seajs-loader!resolvePath-loader!babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react',
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /WdatePicker\.js/,
                    /md5\.min\.js/,
                    /plupload\.min\.js/,
                    /moxie\.min\.js/,
                    /jquery\.min\.js/,
                    /angular\.min\.js/,
                    /moment\.min\.js/,
                    /ueditor\.all\.js/,
                    /umeditor\.js/,
                    /highcharts\.js/
                ]
            },
            {
                test: /\.css$/,
                loader: cssLoader
            },
            {
                test: /\.less$/,
                loader: lessLoader
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$/,
                loader: fileLoader
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    devtool: isDebug ? 'inline-source-map' : false,
    plugins: plugins,
    resolve: {
        alias: {
            "static_public": path.join(__dirname, '../../static_public/'),
            "storage": path.join(__dirname, '../../static_public/js/lib/storage/storage.min'),
            "serverTime": path.join(__dirname, "../../static_public/js/react_components/util/serverTime"),

            "myservice": path.join(__dirname, "public/js/myservice/"),
            "plugins": path.join(__dirname, "public/js/plugins/"),

            'jquery': path.join(__dirname, '../../static_public/node_modules/jquery/dist/jquery.min.js'),
            'jqueryui': path.join(__dirname, 'public/js/lib/jqueryui/jquery-ui.min'),
            "dialog": path.join(__dirname, "../../static_public/js/artdialog"),
            "datepicker": path.join(__dirname, "../../static_public/js/lib/wdatepicker.cmd"),
            "utils": path.join(__dirname, "../../static_public/js/util"),
            "angularPublicInterceptor": path.join(__dirname, "../../static_public/js/angular_public_interceptor"),
            "angular": path.join(__dirname, '../../static_public/node_modules/angular/angular.min'),
            "angular-interceptor": path.join(__dirname, 'public/js/plugins/angular-interceptor'),
            "angular-route": path.join(__dirname, "../../static_public/node_modules/angular-route/angular-route"),
            "angular-messages": path.join(__dirname, "../../static_public/node_modules/angular-messages/angular-messages"),
            "angular-ui": path.join(__dirname, "public/js/plugins/angular-ui"),
            "webuploader": path.join(__dirname, "public/js/lib/webuploader/webuploader.min"),
            "plupload": path.join(__dirname, "../../static_public/js/lib/plupload.js"),
            "moment": path.join(__dirname, "../../static_public/node_modules/moment/min/moment.min.js"),
            "underscore": path.join(__dirname, "../../static_public/node_modules/underscore/underscore-min"),
            "jqtree": path.join(__dirname, "../../static_public/js/lib/jqtree/jqtree.min"),
            "introjs": path.join(__dirname, "public/js/plugins/introjs/intro.min"),
            "dropdownlist": path.join(__dirname, "public/js/plugins/dropdownlist/dropdownlist.min"),
            "ui": path.join(__dirname, "../../static_public/js/ui.js"),
            "pagination": path.join(__dirname, "../../static_public/js/lib/pagination/jquery.pagination"),
            "tmpl": path.join(__dirname, "../../static_public/node_modules/art-template/dist/template"),
            "uploader": path.join(__dirname, "public/js/plugins/uploader/jquery.fileupload.min"),
            "select": path.join(__dirname, "public/js/plugins/select/select"),
            "permission": path.join(__dirname, "../../static_public/js/permission"),
            "authorize": path.join(__dirname, "/public/js/myservice/authorize"),
            "side": path.join(__dirname, "/public/js/myservice/side"),
            "ui-router": path.join(__dirname, "public/js/lib/angular/angular-ui-router.min"),
            "dragdrop": path.join(__dirname, "public/js/lib/angular/angular-dragdrop"),
            "areabox": path.join(__dirname, "../../static_public/js/lib/areabox/areabox"),
            "bootstrap.min": path.join(__dirname, "../../static_public/js/lib/bootstrap-cmd-min"),
            "environment": path.join(__dirname, "../../static_public/public_menu/environment/environment"),
            "apiService": path.join(__dirname, "public/js/apiService"),
            "placeholder": path.join(__dirname, "../../static_public/js/lib/fixPlaceholder/placeholder")
        }
    },
    devServer: {
        contentBase: path.resolve(pkg.config.buildDir),
        hot: true,
        noInfo: false,
        inline: true,
        stats: {colors: true},
        proxy: {
            '/api/index.php': {
                target: 'http://dev-rent.myscrm.cn:1002',
                secure: false
            }
        }
    },
    pageToEntryKey: pageToEntryKey,
    resolveLoader: {
        alias: {
            "ssi-loader": path.join(__dirname, "../../bin/build/webpack/ssiLoader"),
            "rmUrlQuery-loader": path.join(__dirname, "../../bin/build/webpack/rmUrlQueryLoader"),
            "resolvePath-loader": path.join(__dirname, "../../bin/build/webpack/resolvePathLoader"),
            "seajs-loader": path.join(__dirname, "../../bin/build/webpack/seajsLoader"),
            "resolvePathCss-loader": path.join(__dirname, "../../bin/build/webpack/resolvePathCssLoader"),
            "ssiHtml-loader": path.join(__dirname, "../../bin/build/webpack/ssiHtmlLoader")
        }
    },
    lessLoader: {
        lessPlugins: [
            new lessPluginFunctions()
        ]
    },
    ssiHtmlLoader: {
        webRootDir: __dirname
    }
};
