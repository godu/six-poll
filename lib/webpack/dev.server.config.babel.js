import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import cssnext from 'cssnext';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cfg = {
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  externals: fs.readdirSync(path.join(__dirname, '../../node_modules')).reduce(function(externals, module) {
    externals[module] = 'commonjs ' + module;
    return externals;
  }, {
    'react-dom/server': 'commonjs react-dom/server'
  }),

  debug: true,
  devtool: '#eval-source-map',

  context: path.join(__dirname, '../app'),
  entry: [
    '../app/server'
  ],

  output: {
    path: path.join(__dirname, '../public'),
    filename: path.join(__dirname, '../app/index.js'),
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      __DEVTOOLS__: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]___[hash:base64:10]!postcss') },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },

  postcss: () => {
    return [
      cssnext()
    ];
  }
};

module.exports = cfg;
