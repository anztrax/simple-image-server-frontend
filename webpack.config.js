const path = require('path');
const fs = require('fs');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./package').config;

const nodeModules = {};
fs.readdirSync(path.join(process.cwd(), 'node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
      nodeModules[mod]= 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/client.js',
  output: {
    path : path.join(__dirname,'/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('style',
          `css?modules&localIdentName=${config.css}!postcss`),
      },
      {
        test : /\.json$/i,
        loader : 'json',
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url'
      }
    ]
  },
  postcss: [
    // small sugar for CSS
    require('postcss-font-magician'),
    require('autoprefixer'),
  ],
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('common.css', {
      allChunks: true
    }),
    new NpmInstallPlugin({
      cacheMin: 999999,
      saveDev: true,
      saveExact: true,
    }),
  ],
  // externals: nodeModules
};