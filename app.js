var morgan = require('morgan');

var App = require('./lib');
var app = App();

app.use(morgan('tiny'));

app.listen(process.env.PORT || 3000);
