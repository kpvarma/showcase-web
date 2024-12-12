const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Enable development mode
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|avif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map', // Enable fast source maps
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve files from `public/`
    },
    historyApiFallback: true, // Enable React Router routing
    hot: true,
    port: 8080,
    host: '0.0.0.0', // Bind to all network interfaces
  },
};