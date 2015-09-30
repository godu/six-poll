var path = require('path');
var Module = module.constructor;

var express = require('express');
var serveStatic = require('serve-static');
var morgan = require('morgan');
var errorhandler = require('errorhandler');

var webpack = require('webpack');
var clientConfig = require('./webpack/dev.client.config.babel');
var serverConfig = require('./webpack/dev.server.config.babel');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var MemoryFS = require('memory-fs');
var fs = new MemoryFS();

var clientBundler = webpack(clientConfig);
var serverBundler = webpack(serverConfig);
serverBundler.outputFileSystem = fs;

var API = require('./api');

function createServer() {
  var app = express();

  app.use(morgan('dev'));
  app.use(errorhandler());

  app.use(webpackDevMiddleware(clientBundler, {
    publicPath: clientConfig.output.publicPath,
    quiet: true,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(clientBundler));

  app.use('/api', API());

  var promise = new Promise(function(resolve, reject) {
    serverBundler.watch({
    }, function(err) {
      if(err) return reject(err);

      var filename = serverConfig.output.filename;
      var module = new Module(filename, module);
      module.filename = filename;
      module.paths = Module._nodeModulePaths(path.dirname(filename));
      module._compile(fs.readFileSync(serverConfig.output.filename, 'utf8'), filename);
      var APP = module.exports;
      resolve(APP());
    });
  });

  app.get('/public/app.css', function(req, res, next) {
    promise.then(function() {
      res.type('css');
      res.send(fs.readFileSync(path.join(__dirname, 'public/app.css'), 'utf8'));
    }, next);
  });

  app.use('/public', serveStatic(__dirname + 'public'));

  app.use(function(req, res, next) {
    var args = arguments;
    promise.then(function(app) {
      app.apply(null, args);
    }, next);
  });

  return app;
}

module.exports = createServer;
