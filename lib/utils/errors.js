'use strict';

var util = require('util');

function createError(status, message) {
  var NewError = function () {
    Error.call(NewError, message);
    this.status = status;
  }
  util.inherits(NewError, Error);
  return NewError;
}

module.exports.NotFound = createError(404, 'Not found');
