var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  answers: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = function (app) {
  var connection = app.get('db');
  return connection.model('polls', schema);
};
