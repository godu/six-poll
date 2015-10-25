var _ = require('lodash');

module.exports = function promisify(obj) {
  return _.mapValues(obj, function(fun) {
    return function() {
      return Promise.resolve(fun.apply(this, arguments));
    };
  });
};
