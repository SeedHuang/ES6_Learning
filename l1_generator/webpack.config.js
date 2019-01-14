var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: "development",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    publicPath: 'http://127.0.0.1:8080'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /\/node_modules\/.*/,
        options: {
          "presets": ["@babel/preset-env"],
          "plugins": [
            [
              "@babel/plugin-transform-runtime",
              {
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
              }
            ]
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
};
