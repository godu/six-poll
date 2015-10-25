var _ = require('lodash');
var promisify = require('./utils/promisify');

var NotFound = require('http-errors').NotFound;
var CastError = require('mongoose').Error.CastError;

var OPTIONS = {
  limit: 10,
  sort : { date : -1 },
  skip: 0
};

module.exports = function (connection, options) {
  options = _.defaults({}, options, OPTIONS);
  var Polls = connection.model('polls');

  return promisify({
    find: function (params, callback) {
      return Polls.find(params).setOptions(options).exec(callback);
    },
    get: function (id, params, callback) {
      return Polls.findById(id).exec().then(function (poll) {
        if (!poll) return Promise.reject(new NotFound());
        return poll;
      }, function (err) {
        if (err instanceof CastError) return Promise.reject(new NotFound());
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
  });
};
