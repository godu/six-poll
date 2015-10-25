var parallel = require('mocha.parallel');
var _ = require('lodash');
var Request = require('__mock__');

describe('Poll middleware', function () {
  var request;

  var _poll = {
    title: 'yolo',
    answers: [{
      value: 'foo'
    }, {
      value: 'bar'
    }]
  };

  before(function () {
    request = Request.Api();
  });

  after(function (done) {
    request.close(done);
  });


  parallel('Find', function () {
    it('Should return an array of polls', function (done) {
      request.get('/polls/').expect(200).end(function (err, res) {
        res.body.should.be.instanceof(Array);
        done(err);
      });
    });
  });

  parallel('Create', function () {
    it('Should create poll and return content', function(done) {
      request.post('/polls/').expect(200).send(_poll).end(function (err, res) {
        res.body.should.have.properties('_id', 'title', 'answers');
        res.body.answers.should.be.instanceof(Array);
        res.body.answers.should.have.length(_poll.answers.length);
        res.body.answers.forEach(function(answer) {
          answer.should.have.properties('_id', 'value');
        });
        done(err);
      });
    });

    it('Shouldn\'t create poll without answers', function(done) {
      var poll = _.defaults({
        answers: []
      }, _poll);
      request.post('/polls/').send(poll).expect(400, done);
    });

    it('Shouldn\'t create poll with only one answer', function(done) {
      var poll = _.defaults({
        answers: [{
          value: 'foo'
        }]
      }, _poll);
      request.post('/polls/').send(poll).expect(400, done);
    });

    it('Shouldn\'t create poll if answer haven\'t value', function(done) {
      var poll = _.defaults({
        answers: [{
          value: 'foo'
        }, {}]
      }, _poll);
      request.post('/polls/').send(poll).expect(400, done);
    });

    it('Shouldn\'t create poll if answer have empty value', function(done) {
      var poll = _.defaults({
        answers: [{
          value: ''
        }, {}]
      }, _poll);
      request.post('/polls/').send(poll).expect(400, done);
    });
  });

  parallel('Get', function () {
    it('Should return poll by id', function (done) {
      request.post('/polls/').send(_poll).expect(200).end(function (err, res) {
        if (err) return done(err);
        var poll = res.body;

        request.get('/polls/' + poll._id).expect(200).end(function (err) {
          res.body.should.have.property('_id', poll._id);
          done(err);
        });
      });
    });

    it('Should return 404 if poll doesn\'t exists', function (done) {
      request.get('/polls/yolo').expect(404, done);
    });
  });

  parallel('Remove', function () {
    it('Should remove poll by id', function (done) {
      request.post('/polls/').send(_poll).expect(200).end(function (err, res) {
        if (err) return done(err);
        var poll = res.body;

        request.del('/polls/' + poll._id).expect(200).end(function (err) {
          if (err) return done(err);
          request.get('/polls/' + poll._id).expect(404, done);
        });
      });
    });
  });
});
