var serveStatic = require('serve-static');

var express = require('express');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var compression = require('compression');

var API = require('./api');
var APP = require('./app');

function createServer() {
  var app = express();

  app.use(morgan());
  app.use(errorhandler());
  app.use(compression());
  app.use('/public', serveStatic(__dirname + '/public'));
  app.use('/api', API());
  app.use(APP());

  return app;
}

module.exports = createServer;
