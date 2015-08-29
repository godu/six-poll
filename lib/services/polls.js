'use strict';

var NotFoundError = require('../utils/errors').NotFound;
var CastError = require('mongoose').Error.CastError;
var PollModel = require('../models/polls');

module.exports = function (app) {
  var Polls = PollModel(app);

  return {
    find: function (params, callback) {
      return Polls.find(params).exec(callback);
    },
    get: function (id, params, callback) {
      return Polls.findById(id).exec().then(function (doc) {
        if (!doc) throw new NotFoundError;
        return doc;
      }, function (err) {
        if (err instanceof CastError && err.path === '_id')
          throw new NotFoundError();
      }).onResolve(callback);
    },
    create: function (data, params, callback) {
      var poll = new Polls(data);
      return poll.save().onResolve(callback);
    },
    update: function (id, data, params, callback) {
      return this.get(id).then(function (poll) {
        poll.set(data, params);
        return poll.save();
      }).onResolve(callback);
    },
    patch: function (id, data, params, callback) {
      return this.update(id, data, callback);
    },
    remove: function (id, params, callback) {
      return this.get(id).then(function (poll) {
        return poll.remove();
      }).onResolve(callback);
    }
  };
};
