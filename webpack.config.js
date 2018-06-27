var path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLESS = new ExtractTextPlugin('main.css');

const { VueLoaderPlugin } = require('vue-loader');

var config = {
    // TODO: Add common Configuration
    module: {
      rules: [
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: extractLESS.extract([ 'css-loader', 'less-loader' ])
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' }
          ]
        },
        {
          test: /\.(svg|png|jpeg|jpg)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: "./../images/[name].[hash].[ext]",
            },
          },
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        }
      ]
    },
    plugins: [
      extractLESS,
      new VueLoaderPlugin()
    ]
};

var jsConfig = Object.assign({}, config, {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve('./public/js')
  },
});

var lessConfig = Object.assign({}, config, {
  entry: {
    main: './src/less/index.less'
  },
  output: {
    filename: 'main.css',
    path: path.resolve('./public/css')
  }
});



module.exports = [
   jsConfig, lessConfig
]
