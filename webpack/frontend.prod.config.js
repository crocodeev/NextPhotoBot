const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');


module.exports = [
  {
    entry: {
      main: './frontend/index.js'
    },
    stats: {
      errorDetails: true,
      children: true
    },
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    target: 'web',
    devtool: 'source-map',
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "ts-loader"
        },
        {
          // Loads the javacript into html template provided.
          // Entry point is set below in HtmlWebPackPlugin in Plugins 
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          // Loads images into CSS and Javascript files
          test: /\.jpg$/,
          use: [{loader: 'url-loader'}]
        },
        {
          // Loads CSS into a file when you import it via Javascript
          // Rules are set in MiniCssExtractPlugin
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts",".tsx"],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './frontend/index.html',
        filename: './index.html'
      })
    ]
  }
]