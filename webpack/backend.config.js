//config for server
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {

  const SERVER_PATH = (argv.mode === 'production') ?
    './backend/server-prod.js' :
    './backend/server-develop.js';

  return({
    entry: {
      server: SERVER_PATH
    },
    output:{
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    target: "node",
    node: {
      __dirname: false,
      __filename: false,
    },
    //externals: [nodeExternals()],
    resolve: {
      extensions: ['.ts','.js']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "ts-loader"
        }
      ]
    }
  })
}
