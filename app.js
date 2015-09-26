require('babel/register');

var axios = require('axios');

var App = require('./lib');
var app = App();

var port = process.env.PORT || 3000;

axios.interceptors.request.use(function (config) {
  config.url = 'http://localhost:' + port + config.url;
  return config;
});

app.listen(port);
