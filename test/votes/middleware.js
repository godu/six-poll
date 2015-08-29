﻿'use strict';

var should = require('should');
var App = require('../../lib/server');

describe('Vote middleware', function () {
  var app, request, poll;

  before(function () {
    var supertest = require('supertest');
    app = App();
    request = supertest(app);
  });
  
  beforeEach(function (done) {
    request.post('/api/polls/').send({
      title: 'yolo'
    }).expect(200).end(function (err, res) {
      poll = res.body;
      done(err);
    });
  });

  after(function (done) {
    app.get('db').close(done);
  });

  it('get', function (done) {
    request.get('/api/polls/' + poll._id + '/votes').expect(200).end(function (err, res) {
      res.body.should.be.instanceof(Array)
      done(err);
    });
  });

  it('post', function (done) {
    request.post('/api/polls/' + poll._id + '/votes').expect(200).send({
      answer: 0
    }).end(function (err, res) {
      res.body.should.have.properties('answer', '_id');
      done(err);
    });
  });
  
  it('get by id', function (done) {
    request.post('/api/polls/' + poll._id + '/votes').expect(200).send({
      answer: 0
    }).end(function (err, res) {
      var vote = res.body;
      request.get('/api/polls/' + poll._id + '/votes/' + vote._id).expect(200).end(function (err, res) {
        res.body.should.have.properties('answer', '_id');
        done(err);
      });
    });
  });
  
  it('get by id not found', function (done) {
    request.get('/api/polls/' + poll._id + '/votes/yolo').expect(404, done);
  });

  it('delete by id', function (done) {
    request.post('/api/polls/' + poll._id + '/votes/').expect(200).send({
      title: 'yolo'
    }).end(function (err, res) {
      var vote = res.body;
      request.del('/api/polls/' + poll._id + '/votes/' + vote._id).expect(200).end(function (err, res) {
        request.get('/api/polls/' + poll._id + '/votes/' + vote._id).expect(404).end(function (err, res) {
          done(err);
        });
      });
    });
  });
})
