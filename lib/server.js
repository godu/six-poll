var path = require('path');

var mongoose = require('mongoose');
var mongoUrl = process.env.MONGO_URL || 'localhost';
var connection = mongoose.createConnection('mongodb://' + mongoUrl + '/six-poll');

var express = require('express');
var bodyParser = require('body-parser');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var compiler = webpack(config);

var PollMiddleware = require('./components/polls/middleware');
var VoteMiddleware = require('./components/votes/middleware');
var StatMiddleware = require('./components/stats/middleware');

module.exports = function () {
  var app = express();

  app.set('db', connection);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use('/api', PollMiddleware(app));
  app.use('/api', VoteMiddleware(app));
  app.use('/api', StatMiddleware(app));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'));
  });

  return app;
};
