'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Schema = new Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = function (app) {
  var connection = app.get('db');
  return connection.model('polls', Schema);
};
