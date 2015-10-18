import webpack from 'webpack';
import path from 'path';
import cssnext from 'cssnext';

const cfg = {
  debug: true,

  target: 'web',

  devtool: '#eval-source-map',

  context: path.join(__dirname, '../app'),
  entry: [
    'webpack-hot-middleware/client',
    '../app/client'
  ],

  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/public',
    filename: 'app.js'
  },

  plugins: [
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
      { test: /\.css$/, loader: 'style!css?modules&localIdentName=[local]___[hash:base64:10]!postcss' },
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
