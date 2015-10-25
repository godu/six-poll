var Request = require('__mock__');

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
      title: 'yolo',
      answers: [{
        value: 'foo'
      }, {
        value: 'bar'
      }]
    }).expect(200).end(function (err, res) {
      poll = res.body;
      done(err);
    });
  });

  describe('Find', function() {
    it('Should return an array of votes', function (done) {
      request.get('/polls/' + poll._id + '/votes').expect(200).end(function (err, res) {
        res.body.should.be.instanceof(Array);
        done(err);
      });
    });
  });

  describe('Create', function() {
    it('Should create vote and return content', function (done) {
      request.post('/polls/' + poll._id + '/votes').expect(200).send({
        answer_id: poll.answers[0]._id
      }).end(function (err, res) {
        res.body.should.have.properties('answer_id', '_id');
        done(err);
      });
    });
  });

  describe('Get', function() {
    it('Should return vote by id', function (done) {
      request.post('/polls/' + poll._id + '/votes').expect(200).send({
        answer_id: poll.answers[0]._id
      }).end(function (err, res) {
        if (err) return done(err);
        var vote = res.body;

        request.get('/polls/' + poll._id + '/votes/' + vote._id).expect(200).end(function (err, res) {
          res.body.should.have.properties('answer_id', '_id');
          done(err);
        });
      });
    });

    it('Should return 404 if vote doesn\'t exists', function (done) {
      request.get('/polls/' + poll._id + '/votes/yolo').expect(404, done);
    });
  });

  describe('Remove', function() {
    it('Should remove vote by id', function (done) {
      request.post('/polls/' + poll._id + '/votes/').expect(200).send({
        answer_id: poll.answers[0]._id
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
});
