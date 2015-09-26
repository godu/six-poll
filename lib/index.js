var path = require('path');

var express = require('express');
var webpack = require('webpack');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var _ = require('lodash');

var API = require('./api');
var APP = require('./app');
var config = require('./app/webpack.config');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = function () {
  var app = express();

  app.use(morgan('tiny'));
  app.use(errorhandler({
    log: true
  }));

  app.use('/api', API());

  if(isProduction) {
    app.use('/public', express.static(path.join(__dirname, '../build')));
  }
  else {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    var devConfig = extendDev(config);
    var devCompiler = webpack(devConfig);

    app.use(webpackDevMiddleware(devCompiler, {
      publicPath: devConfig.output.publicPath,
      noInfo: true
    }));
    app.use(webpackHotMiddleware(devCompiler));
  }

  app.use(APP());

  return app;
};

function extendDev(config) {
  return _.extend({}, config, {
    debug: true,
    devtool: '#eval-source-map',
    entry: [].concat(
      [
        'webpack-hot-middleware/client'
      ],
      config.entry
    ),
    plugins: [].concat(
      config.plugins, [
        new webpack.HotModuleReplacementPlugin()
      ]
    ),
    module: _.extend(config.module, {
      loaders: [].concat(
        config.module.loaders, [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel']
        }]
      )
    })
  });
}
