var supertest = require('supertest');

var Api = require('../../lib/api');

module.exports.Api = function () {
  var app = Api();
  var request = supertest(app);

  app.set('env', 'test');
  request.close = function (done) {
    return app.get('db').close(done);
  };

  return request;
};
