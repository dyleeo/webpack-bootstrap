const path = require('path');

//handle css bundling
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//rewrite html with bundled files
const HtmlWebpackPlugin = require('html-webpack-plugin');

//clean out dir
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/src/index.js'
  },
  devtool: 'inline-source-map', //enable webpack sourcemap
  devServer: { //setup autoreload (webpack-dev-server)
    contentBase: './dist',
    //hot: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')
              ],
                sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/fonts/',
              publicPath: '../fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({ // define where to save the file
      //filename: "assets/styles/main.bundle.css",
      filename: "./assets/styles/[name].bundle.css",
      chunkFilename: "[id].css"
    }),
    //this add all bundles into index.html (entry point)
    new HtmlWebpackPlugin({
      title: 'Webpack 4 - Development',
      template: "./app/index.html",
      filename: "./index.html"
    }),
    //new webpack.NamedModulesPlugin(),
    //new webpack.HotModuleReplacementPlugin()
  ]
};
