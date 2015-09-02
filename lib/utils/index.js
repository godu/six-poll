'use strict';

module.exports.print = function (key) {
  return function (req, res, next) {
    req[key].then(res.json.bind(res), next);
  };
};
