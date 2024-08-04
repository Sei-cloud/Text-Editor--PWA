const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates the HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),
      // Injects the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      // Creates the manifest file
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'TextEditor',
        description: 'A simple text editor PWA',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: '.',
        publicPath: '.',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
