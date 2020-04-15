const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: {
      InsalesAutocompleteAdress: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: '[name]'
    },
    devtool: argv.development ? 'source-map' : '',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'postcss-loader',
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new BrowserSyncPlugin({
        https: true,
        host: 'localhost',
        port: 3000,
        server: ["test", "dist"]
      }),
      new webpack.BannerPlugin(`InsalesAutocompleteAdress v${pkg.version}\nhttps://github.com/insales/insales-autocomplete-adress/`)
    ]
  }
};
