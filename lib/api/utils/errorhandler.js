var BadRequest = require('http-errors').BadRequest;
var mongoose = require('mongoose');
var ValidationError = mongoose.Error.ValidationError;

module.exports.ValidationErrorHandler = function ValidationErrorHandler() {
  return function(err, req, res, next) {
    if(err instanceof ValidationError)
      return next(new BadRequest());

    next(err);
  };
};
