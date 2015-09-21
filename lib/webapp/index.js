var path = require('path');

var express = require('express');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var compiler = webpack(config);

module.exports = function () {
  var app = express();

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));
  // app.use(webpackHotMiddleware(compiler));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  return app;
};
