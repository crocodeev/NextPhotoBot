const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

webpack.MiniCssExtractPlugin

module.exports = [
  {
    entry: {
      main: './frontend/index.js'
    },
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    target: 'web',
    devtool: 'source-map',
    // Webpack 4 does not have a CSS minifier, although
    // Webpack 5 will likely come with one
    optimization: {
      minimizer: [
        new webpack.UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new webpack.OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
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
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/html/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  },
  {
    entry: {
      admin: './frontend/admin.js'
    },
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    target: 'web',
    devtool: 'source-map',
    // Webpack 4 does not have a CSS minifier, although
    // Webpack 5 will likely come with one
    optimization: {
      minimizer: [
        new webpack.UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new webpack.OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
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
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/html/admin.html',
        filename: './admin.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
]