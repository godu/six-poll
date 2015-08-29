'use strict';

var NotFoundError = require('../../utils/errors').NotFound;
var CastError = require('mongoose').Error.CastError;
var VoteModel = require('./model');

module.exports = function (app) {
  var Votes = VoteModel(app);

  return {
    find: function (params, callback) {
      return Votes.find(params).exec(callback);
    },
    get: function (id, params, callback) {
      return Votes.findById(id).exec().then(function (vote) {
        if (!vote) throw new NotFoundError;
        return vote;
      }, function (err) {
        if (err instanceof CastError && err.path === '_id')
          throw new NotFoundError();
      }).onResolve(callback);
    },
    create: function (data, params, callback) {
      var vote = new Votes(data);
      vote.set(params);
      return vote.save().onResolve(callback);
    },
    update: function (id, data, params, callback) {
      return this.get(id).then(function (vote) {
        vote.set(data);
        vote.set(params);
        return vote.save();
      }).onResolve(callback);
    },
    patch: function (id, data, params, callback) {
      return this.update(id, data, params, callback);
    },
    remove: function (id, params, callback) {
      return this.get(id, params).then(function (vote) {
        return vote.remove();
      }).onResolve(callback);
    }
  };
};
