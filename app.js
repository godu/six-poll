require('babel/register');

var morgan = require('morgan');

var App = require('./lib/server');
var app = App();

app.use(morgan('tiny'));

app.listen(8000);
