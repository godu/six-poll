var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    // 'webpack-dev-server/client?http://localhost:' + (process.env.PORT || 3000),
    // 'webpack-hot-middleware/client',
    './lib/app/app'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: __dirname,
      loaders: [/*'react-hot', */'babel']
    }]
  }
};
