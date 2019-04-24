const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    compress: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'rxjsWorkshop',
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
