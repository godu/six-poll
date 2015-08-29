'use strict';

module.exports.print = function (key) {
  return function (req, res, next) {
    req[key].then(function (doc) {
      res.json(doc);
    }, next);
  };
};

module.exports.Error = require('./errors');
