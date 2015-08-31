'use strict';

var util = require('util');

function createError (status, message) {
  function NewError () {
    Error.call(this);
    Error.captureStackTrace(this, NewError);

    this.message = message;
    this.status = status;
  }

  util.inherits(NewError, Error);

  NewError.prototype.toString = function () {
    console.log('tolo');
    return Error.prototype.toString.call(this);
  };

  return NewError;
}

module.exports.NotFound = createError(404, 'Not found');
