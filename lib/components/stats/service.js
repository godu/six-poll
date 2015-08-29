'use strict';

var VoteModel = require('../votes/model');

module.exports = function (app) {
  var Votes = VoteModel(app);

  return {
    get: function (id, params, callback) {
      return Votes.
    },
  };
};
