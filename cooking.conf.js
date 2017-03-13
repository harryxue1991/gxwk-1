var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app:  ['babel-polyfill', './src/main.js'],
    // vendor:['vue','vue-router']
    vendor:['vue']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {
    // enable: true,
    hostname: '10.0.1.100',
    port: 8083,
    publicPath: '/',
    hot: true,
    // extractCSS: true,
    // protocol: 'http:'
  },
  // production
  clean: true,
  hash: true,
  sourceMap: false,
  format:'var',
  publicPath: '/weike',
  assetsPath: 'static',
  minimize: true,
   chunk: [
  	'vendor',
  	'manifest'
  ],
  postcss: [
    require('postcss-salad')
  ],
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2']
});

module.exports = cooking.resolve();
