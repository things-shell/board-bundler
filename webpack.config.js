const path = require('path')

const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    'board-bundle': ['./src/index.mjs']
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: 'BoardBundle',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: ['./node_modules']
  },
  resolveLoader: {
    modules: ['./node_modules']
  },
  // externals: {
  //   '@hatiolab/things-scene': 'scene'
  // },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto'
      }
    ]
  },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/,
  //         exclude: /(node_modules)/,
  //         loader: 'babel-loader',
  //         options: {
  //           presets: [
  //             [
  //               '@babel/preset-env',
  //               {
  //                 targets: {
  //                   browsers: ['last 2 versions', 'safari >= 7', 'ie 11']
  //                 }
  //               }
  //             ]
  //           ]
  //         }
  //       },
  //       {
  //         test: /\.(gif|jpe?g|png)$/,
  //         loader: 'url-loader?limit=25000',
  //         query: {
  //           limit: 10000,
  //           name: '[path][name].[hash:8].[ext]'
  //         }
  //       },
  //       {
  //         test: /\.(obj|mtl|tga|3ds|max|dae)$/,
  //         use: [
  //           {
  //             loader: 'file-loader',
  //             options: {}
  //           }
  //         ]
  //       }
  //     ]
  //   },
  plugins: [
    new UglifyJsPlugin({
      test: /\-min\.js$/
    })
  ],
  devtool: 'cheap-module-source-map'
}
