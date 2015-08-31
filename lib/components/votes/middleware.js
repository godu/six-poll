'use strict';

var Router = require('express').Router;
var PollService = require('../polls/service');
var VoteService = require('./service');
var print = require('../../utils').print;

module.exports = function (app) {
  var voteRouter = Router();
  var voteService = VoteService(app);
  var pollService = PollService(app);

  var printVote = print('vote');
  var printVotes = print('votes');

  voteRouter.param('poll', function (req, res, next, id) {
    req.poll = pollService.get(id);
    next();
  });

  voteRouter.get('/polls/:poll/votes', function (req, res, next) {
    req.poll.then(function (poll) {
      req.votes = voteService.find({
        poll_id: poll.id
      });
      next();
    }, next);
  }, printVotes);

  voteRouter.post('/polls/:poll/votes', function (req, res, next) {
    req.poll.then(function (poll) {
      req.vote = voteService.create(req.body, {
        poll_id: poll.id
      });
      next();
    }, next);
  }, printVote);

  voteRouter.get('/polls/:poll/votes/:vote', function (req, res, next) {
    req.poll.then(function (poll) {
      req.vote = voteService.get(req.params.vote, {
        poll_id: poll.id
      });
      next();
    }, next);
  }, printVote);

  voteRouter.delete('/polls/:poll/votes/:vote', function (req, res, next) {
    req.poll.then(function (poll) {
      req.vote = voteService.remove(req.params.vote, {
        poll_id: poll.id
      });
      next();
    }, next);
  }, printVote);

  return voteRouter;
};
