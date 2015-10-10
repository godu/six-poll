var Promise = require('bluebird');
var webpack = require('webpack');
var clientConfig = require('./webpack/prod.client.config.babel');
var serverConfig = require('./webpack/prod.server.config.babel');

var clientBundler = webpack(clientConfig);
var serverBundler = webpack(serverConfig);

if(process.env.NODE_ENV !== 'production') process.exit(0);

Promise.all([
  Promise.fromNode(function(callback) {
    clientBundler.run(callback);
  }),
  Promise.fromNode(function(callback) {
    serverBundler.run(callback);
  })
]).then(function(stats) {
  var output = stats.map(function(stat) {
    return stat.toString({
      colors: true
    });
  }).join('\n');
  process.stdout.write(output + '\n');
  if(stats.some(function(stat) {
    return stat.hasWarnings() || stat.hasErrors();
  })) process.exit(1);
}, function(err) {
  process.stderr.write(err.stack + '\n');
  process.exit(1);
});
