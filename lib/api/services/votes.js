var promisify = require('./utils/promisify');

var NotFound = require('http-errors').NotFound;
var CastError = require('mongoose').Error.CastError;

module.exports = function (connection) {
  var Votes = connection.model('votes');

  return promisify({
    find: function (params, callback) {
      return Votes.find(params).exec(callback);
    },
    get: function (id, params, callback) {
      return Votes.findById(id).exec().then(function (vote) {
        if (!vote) return Promise.reject(new NotFound());
        return vote;
      }, function (err) {
        if (err instanceof CastError) return Promise.reject(new NotFound());
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
  });
};
