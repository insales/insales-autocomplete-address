const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-v3-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      InsalesAutocompleteAdress: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: {
        name: 'InsalesAutocompleteAdress',
        type: 'window',
        export: 'default'
      }
    },
    devtool: isDevelopment ? 'source-map' : false,
    optimization: {
      minimize: !isDevelopment,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: 'some'
            },
            compress: {
              drop_console: !isDevelopment
            }
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: `/*! InsalesAutocompleteAddress v${pkg.version}\nhttps://github.com/insales/insales-autocomplete-address/ */`,
        raw: true,
        entryOnly: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new BrowserSyncPlugin({
        https: true,
        host: 'localhost',
        port: 3000,
        server: ["test", "dist"]
      })
    ]
  }
};