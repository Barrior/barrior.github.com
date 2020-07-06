/**
 * ELF 配置文件
 *
 * 详细说明：https://github.com/o2team/elf/blob/master/doc/CONFIGURATION.md
 */
module.exports = {
  devPort: '8002', // dev server 运行的端口
  designLayoutWidth: 750, // 设计稿的宽度 | 默认750，如果开启 Zoom 则直接按照设计稿宽度和屏幕宽度进行缩放
  designLayoutHeight: 1206, // 设计稿的高度 | 默认1206，如果开启 Zoom 则直接按照设计稿高度和屏幕高度进行缩放
  baseZoomRuler: 'width', // Zoom 缩放的基准 | 默认为 'width'，以屏幕的宽度进行缩放
  baseSize: 10, // 计算 rem 的基数，通常不用修改
  enableREM: true, // 是否用 rem 做适配
  enableZoom: true, // 是否用 zoom 做适配

  /**
   * webpack base config
   */
  entry: 'src/js/index.js',
  output: {
    path: 'dist',
    publicPath: './',
    filename: 'js/bundle-[hash:6].js'
  },
  outputCss: 'css/app-[hash:6].css',
  outputCssPublicPath: '../',
  imgLoaderQuery: {
    limit: 1000,
    name: 'img/[name]-[hash:6].[ext]'
  },
  audioLoaderQuery: {
    name: 'plugin/[name].[ext]'
  },
  imgToBase64Dir: /src\/img-base64/,
  rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
          loader: 'babel-loader',
          options: {
              cacheDirectory: true,
              babelrc: true,
          }
      }]
  }],

  px2remOptions: {
    // rootValue 由 config.designLayoutWidth / config.baseSize 而来，不用配置
    unitPrecision: 5,
    propWhiteList: [],
    propBlackList: [],
    selectorBlackList: [/.norem$/],
    ignoreIdentifier: false,
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  },

  enableSpritesOnDev: true,
  assetsOptions: {
    loadPaths: ['src/img/'],
    cache: true,
  },

  /**
   * webpack development config
   *
   * 只作用于 development 模式，会覆盖 base config 中相同的配置项
   **/
  DEVELOPMENT: {},

  /**
   * webpack production config
   *
   * 只作用于 production 模式，会覆盖 base config 中相同的配置项
   **/
  PRODUCTION: {
    // enableJSCompress: false,
    // enableCSSCompress: false,
    enableHTMLCompress: false // ！！！不要压缩，否则会把页面片注释就去掉
  }
};
