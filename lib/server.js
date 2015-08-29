'use stict';

var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var connection = mongoose.createConnection('mongodb://localhost/six-poll');

var express = require('express');

var app = module.exports = express();
app.set('db', connection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var Polls = require('./middlewares/polls');
app.use('/api/polls', Polls(app));
