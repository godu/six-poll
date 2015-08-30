'use stict';

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var express = require('express');

var PollMiddleware = require('./components/polls/middleware');
var VoteMiddleware = require('./components/votes/middleware');

module.exports = function () {
  var app = express();
  
  var connection = mongoose.createConnection('mongodb://localhost/six-poll');
  app.set('db', connection);
  
  //app.use(morgan('tiny'));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use('/api', PollMiddleware(app));
  app.use('/api', VoteMiddleware(app));

  return app;
}