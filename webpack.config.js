const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env'],
          },
      },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [         
        { from: './src/assets', to: './assets'},
        { from: './src/style.css', to: './'},
        { from: './index.html', to: './'},
      ]
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
};