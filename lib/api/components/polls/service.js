var NotFoundError = require('http-errors').NotFound;
var CastError = require('mongoose').Error.CastError;
var PollModel = require('./model');

var options = {
  limit: 10,
  skip: 0
};

module.exports = function (app) {
  var Polls = PollModel(app);

  return {
    find: function (params, callback) {
      return Polls.find(params).setOptions(options).exec(callback);
    },
    get: function (id, params, callback) {
      return Polls.findById(id).exec().then(function (poll) {
        if (!poll) throw new NotFoundError();
        return poll;
      }, function (err) {
        if (err instanceof CastError) throw new NotFoundError();
      }).onResolve(callback);
    },
    create: function (data, params, callback) {
      var poll = new Polls(data);
      return poll.save().onResolve(callback);
    },
    remove: function (id, params, callback) {
      return this.get(id, params).then(function (poll) {
        return poll.remove();
      }).onResolve(callback);
    }
  };
};
