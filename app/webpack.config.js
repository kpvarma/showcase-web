const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Ensure all assets are served from the root
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|avif)$/i,
        type: 'asset/resource', // Use Webpack 5's built-in asset modules
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env), // Inject all .env variables
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from the 'public' directory
    },
    // static: {
    //   directory: path.join(__dirname, 'dist'),
    // },
    historyApiFallback: { // Enable React Router routing
      index: '/index.html', 
    },
    hot: true,                // Enable Hot Module Replacement (HMR)
    liveReload: true,         // Enable live reloading
    port: 8080,               // The port inside the Docker container
    client: {
      webSocketURL: {
        hostname: 'localhost', // Hostname for WebSocket
        port: 6002,            // Port exposed on the host machine
        protocol: 'ws',        // Use ws (or wss for secure connections)
      },
    },
  },
};
