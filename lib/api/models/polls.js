var mongoose = require('mongoose');
var POLL_TYPE = require('../constants/polls');

var Schema = mongoose.Schema;

var Answer = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  count: {
    type: Number,
    default: 0
  }
});

var Poll = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  options: {
    type: [Answer],
    required: true,
    validate: [{
      validator: greaterThan(2),
      msg: 'Path {PATH} must have length greater than 2'
    }, {
      validator: lowerThan(2),
      msg: 'Path {PATH} must have length lower than 2'
    }]
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  modified: {
    type: Date,
    required: true
  },
  finish: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    default: POLL_TYPE.ONCE,
    required: true
  }
});

Poll.pre('validate', function updateModified(next) {
  this.set('modified', Date.now());
  next();
});

Poll.pre('validate', function setDefaultFinish(next) {
  if(this.get('finish')) return next();

  var finish = new Date(this.get('created'));
  finish.setDate(finish.getDate() + 1);
  this.set('finish', finish);

  next();
});

function greaterThan(n) {
  return function(val) {
    return Array.isArray(val) && val.length >= n;
  };
}

function lowerThan(n) {
  return function(val) {
    return Array.isArray(val) && val.length <= n;
  };
}

module.exports = function(connection) {
  return connection.model('polls', Poll);
};
