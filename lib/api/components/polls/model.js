var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Answer = new Schema({
  value: {
    type: String,
    required: true,
    minlength: 1
  }
});

var Poll = new Schema({
  title: String,
  answers: {
    type: [Answer],
    required: true,
    validate: greaterThan(2)
  },
  date: {
    type: Date,
    default: Date.now
  }
});

function greaterThan(n) {
  return function(val) {
    return Array.isArray(val) && val.length >= n;
  };
}

module.exports = function (app) {
  var connection = app.get('db');
  return connection.model('polls', Poll);
};
