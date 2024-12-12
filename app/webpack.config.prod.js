const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production', // Enable production optimizations
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js', // Cache-busting with content hash
    publicPath: 'https://assets.kpvarma.com/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|avif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // CSS loaders
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
      template: './public/index.html',
      minify: { // Minify HTML
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['**/index.html'], // Avoid copying the HTML template
          },
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map', // Production-ready source maps
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new CssMinimizerPlugin(), // Minify CSS
    ],
    splitChunks: {
      chunks: 'all', // Code splitting for optimization
    },
  },
};