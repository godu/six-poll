var path = require('path');
var cssnext = require('cssnext');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  target: 'web',
  debug: true,
  devtool: '#eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    './client'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css/,
      loader: 'style!css'
    }, {
      test: /\.styl$/,
      loader: 'style!css?modules&localIdentName=[local]___[hash:base64:10]!stylus'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }]
  },
  postcss: function() {
    return [cssnext];
  }
};
