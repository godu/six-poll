'use strict';

var should = require('should');
var App = require('../../lib/server');

describe('Stats middleware', function () {
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

  it.only('should return right stats', function(done) {
    Promise.all( [
      addVotes(poll, 0, 10),
      addVotes(poll, 1, 20),
      addVotes(poll, 2, 30)
    ]).then(done.bind(null, null), done);
  });
  
  function addVote(poll, answer) {
    return new Promise(function (success, reject) {
      request.post('/api/polls/' + poll._id + '/votes').expect(200).send({
        answer: answer
      }).end(function (err, res) {
        res.body.should.have.properties('answer', '_id');
        if (err) return reject(err);
        success(res.body);
      });
    });
  }

  function addVotes(poll, answer, times) {
    var votes = [];
    while (times > 0) {
      votes.push(addVote(poll, answer));
      times--;
    }
    return Promise.all(votes);
  }
})
