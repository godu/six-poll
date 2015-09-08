var Request = require('../request');

describe('Vote middleware', function () {
  var request, poll;

  before(function () {
    request = Request.Api();
  });

  after(function (done) {
    request.close(done);
  });

  beforeEach(function (done) {
    request.post('/polls/').send({
      title: 'yolo'
    }).expect(200).end(function (err, res) {
      poll = res.body;
      done(err);
    });
  });

  it('get', function (done) {
    request.get('/polls/' + poll._id + '/votes').expect(200).end(function (err, res) {
      res.body.should.be.instanceof(Array);
      done(err);
    });
  });

  it('post', function (done) {
    request.post('/polls/' + poll._id + '/votes').expect(200).send({
      answer: 0
    }).end(function (err, res) {
      res.body.should.have.properties('answer', '_id');
      done(err);
    });
  });

  it('get by id', function (done) {
    request.post('/polls/' + poll._id + '/votes').expect(200).send({
      answer: 0
    }).end(function (err, res) {
      if (err) return done(err);
      var vote = res.body;

      request.get('/polls/' + poll._id + '/votes/' + vote._id).expect(200).end(function (err) {
        res.body.should.have.properties('answer', '_id');
        done(err);
      });
    });
  });

  it('get by id not found', function (done) {
    request.get('/polls/' + poll._id + '/votes/yolo').expect(404, done);
  });

  it('delete by id', function (done) {
    request.post('/polls/' + poll._id + '/votes/').expect(200).send({
      title: 'yolo'
    }).end(function (err, res) {
      if (err) return done(err);
      var vote = res.body;

      request.del('/polls/' + poll._id + '/votes/' + vote._id).expect(200).end(function (err) {
        if (err) return done(err);
        request.get('/polls/' + poll._id + '/votes/' + vote._id).expect(404).end(function (err) {
          done(err);
        });
      });
    });
  });
});
