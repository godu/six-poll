'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Schema = new Schema( {
  answer: Number,
  date: {
    type: Date,
    default: Date.now
  },
  poll_id: {
    type: ObjectId,
    ref: 'polls',
    required: true
  }
});

module.exports = function (app) {
  var connection = app.get('db');
  return connection.model('votes', Schema);
};
