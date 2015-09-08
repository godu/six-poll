var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:' + (process.env.PORT || 3000),
    'webpack-hot-middleware/client',
    './lib/app/index'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
        test: /\.jsx?$/,
        include: path.join(__dirname, 'lib'),
        loaders: ['react-hot', 'babel']
      }]
  }
};
