'use strict';

var should = require('should');

describe('Poll middleware', function () {
  var app, request;

  before(function () {
    var supertest = require('supertest');
    app = require('../../lib/server');
    request = supertest(app);
  });

  after(function () {
    app.get('db').close();
  });

  it('get', function (done) {
    request
      .get('/api/polls/')
      .expect(200)
      .end(function (err, res) {
        res.body.should.be.instanceof(Array)
        done(err);
      });
  });

  it('post', function (done) {
    request.post('/api/polls/')
      .expect(200)
      .send({
        title: 'yolo'
      })
      .end(function (err, res) {
        res.body.should.have.properties('title', '_id');
        done(err);
      });
  });
  
  it('get by id', function (done) {
    request.post('/api/polls/')
      .expect(200)
      .send({
      title: 'yolo'
    }).end(function (err, res) {
      var poll = res.body;
      
      request.get('/api/polls/' + poll._id)
        .expect(200)
        .end(function (err, res) {
          res.body.should.have.properties('title', '_id');
          done(err);
        });
    });
  });
  
  it.only('get by id not found', function (done) {
    request.get('/api/polls/yolo')
      .expect(404, done);
  });

  it('delete by id', function (done) {
    request.post('/api/polls/')
      .expect(200)
      .send({
        title: 'yolo'
      })
      .end(function (err, res) {
        var poll = res.body;

        request.del('/api/polls/' + poll._id)
          .expect(200)
          .end(function (err, res) {

            request.get('/api/polls/' + poll._id)
              .expect(404)
              .end(function (err, res) {
                done(err);
              });
          });
      });
  });
})
