var path = require('path');

var mongoose = require('mongoose');
var mongoUrl = 'mongodb://' + (process.env.MONGO_URL || 'localhost') + '/six-poll';

var express = require('express');
var bodyParser = require('body-parser');

var PollMiddleware = require('./components/polls/middleware');
var VoteMiddleware = require('./components/votes/middleware');
var StatMiddleware = require('./components/stats/middleware');

module.exports = function () {
  var app = express();

  var connection = mongoose.createConnection(mongoUrl);
  app.set('db', connection);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(PollMiddleware(app));
  app.use(VoteMiddleware(app));
  app.use(StatMiddleware(app));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'));
  });

  return app;
};
