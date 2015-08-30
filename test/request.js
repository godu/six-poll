'use strict';
var supertest = require('supertest');
var App = require('../lib/server');

module.exports = function() {
    var app = App();
    var request = supertest(app);
	
    app.set('env', 'test');
	request.close = function(done) {
		return app.get('db').close(done);
	};
	
	return request;
};
