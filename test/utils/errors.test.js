'use strict';

describe('Errors', function () {
  var errors = require('../../lib/utils/errors');

  Object.keys(errors).forEach(function (key) {
    var CustomError = errors[key];

    it('should be an instance of ' + key + ' Error', function () {
      var err = new CustomError();

      err.should.be.instanceof(Error);
      err.should.have.properties('stack', 'status');
    });
  });
});
