var express = require('express');

var API = require('./api');
var WebApp = require('./webapp');

module.exports = function () {
  var app = express();

  app.use('/api', API());
  app.use(WebApp());

  return app;
};
