var NotFoundError = require('http-errors').NotFound;
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
        if (!vote) throw new NotFoundError();
        return vote;
      }, function (err) {
        if (err instanceof CastError) throw new NotFoundError();
      }).onResolve(callback);
    },
    create: function (data, params, callback) {
      var vote = new Votes(data);
      vote.set(params);
      return vote.save().onResolve(callback);
    },
    remove: function (id, params, callback) {
      return this.get(id, params).then(function (vote) {
        return vote.remove();
      }).onResolve(callback);
    }
  };
};
