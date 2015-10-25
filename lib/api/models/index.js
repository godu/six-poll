var mongoose = require('mongoose');

var attachPoll = require('./polls');
var attachVote = require('./votes');

module.exports = function() {
  const db = mongoose.createConnection();

  attachPoll(db);
  attachVote(db);

  return db;
};
