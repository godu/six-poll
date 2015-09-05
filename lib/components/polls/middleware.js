var Router = require('express').Router;
var PollService = require('./service');
var print = require('../../utils').print;

module.exports = function (app) {
  var pollRouter = Router();
  var pollService = PollService(app);

  var printPoll = print('poll');
  var printPolls = print('polls');

  pollRouter.get('/polls', function (req, res, next) {
    req.polls = pollService.find();
    next();
  }, printPolls);

  pollRouter.post('/polls', function (req, res, next) {
    req.poll = pollService.create(req.body);
    next();
  }, printPoll);

  pollRouter.get('/polls/:poll', function (req, res, next) {
    req.poll = pollService.get(req.params.poll);
    next();
  }, printPoll);

  pollRouter.delete('/polls/:poll', function (req, res, next) {
    req.poll = pollService.remove(req.params.poll);
    next();
  }, printPoll);

  return pollRouter;
};
