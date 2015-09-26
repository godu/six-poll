import path from 'path';
import cssnext from 'cssnext';
import webpack from 'webpack';

export default {
  context: __dirname,
  target: 'web',
  entry: [
    './client'
  ],
  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'bundle.js',
    publicPath: '/public'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
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
    }]
  },
  postcss: function() {
    return [cssnext];
  }
};
