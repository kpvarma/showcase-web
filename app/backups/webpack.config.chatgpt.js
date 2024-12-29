const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[contenthash].js', // Save JS in static/js
    publicPath: '/', // Serve all assets from the root
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]', // Save assets in static/media
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use public/index.html as template
      inject: true, // Inject assets into the template
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css', // Save CSS in static/css
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env), // Inject environment variables
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: isProduction ? 'source-map' : 'inline-source-map', // Optimize source maps
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), // Serve files from the build directory
    },
    historyApiFallback: true, // Enable SPA routing fallback
    hot: true,
    liveReload: true,
    port: 8080,
    client: {
      webSocketURL: {
        hostname: 'localhost',
        port: 6001,
        protocol: 'ws',
      },
    },
  },
};