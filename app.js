var App = process.env.NODE_ENV === 'production' ? require('./lib') : require('./lib/dev');
var app = App();

var port = process.env.PORT || 3000;

var axios = require('axios');

axios.interceptors.request.use(function (config) {
  config.url = 'http://localhost:' + port + config.url;
  return config;
});

app.listen(port, function() {
  process.stdout.write('Server started : http://localhost:' + port + '\n');
});
