var webpack = require('webpack');
var path = require("path");
var extract = require('extract-text-webpack-plugin');
var themecss = new extract('css/theme.css');

module.exports = {
  entry: {
    'theme': [
      path.resolve(__dirname, "theme") + '/assets/js/jquery-3.1.0.min.js',
      path.resolve(__dirname, "theme") + '/assets/js/bootstrap.min.js',
      path.resolve(__dirname, "theme") + '/assets/js/material.min.js',
      path.resolve(__dirname, "theme") + '/assets/js/bootstrap-notify.js'
    ],
    'react': [
      path.resolve(__dirname, "src") + '/components/App.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx?$/,
        exclude: /(node_modules|theme)/,
        loader: 'babel',
        //blacklist: ["useStrict"],
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /(\/theme\/assets\/js\/)(.*)\.js$/,
        loader: 'script?name=[name].[ext]'
      },
      {
        test: /(\.html)$/,
        loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
      },
      {
        test: /(\.css)$/,
        loader: themecss.extract('style-loader', '!css-loader?name=css/[name].[ext]')
      },
      {
        test: /(\.scss)$/,
        loader: themecss.extract('style-loader', '!css-loader?name=css/[name].[ext]!sass')
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(gif|jpeg|jpg|png|ico)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new (require('webpack-cleanup-plugin')),
    themecss
  ]
};
