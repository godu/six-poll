'use strict';

var Router = require('express').Router;
var PollService = require('../services/polls');
var print = require('../utils').print;

module.exports = function (app) {
  var router = Router();
  var service = PollService(app);
  
  var printPoll = print('poll');
  var printPolls = print('polls')
  
  router.get('/', function (req, res, next) {
    req.polls = service.find();
    next();
  }, printPolls);
  
  router.post('/', function (req, res, next) {
    req.poll = service.create(req.body)
    next();
  }, printPoll);
  
  router.get('/:poll', function (req, res, next) {
    req.poll = service.get(req.params.poll);
    next();
  }, printPoll);
  
  router.delete('/:poll', function (req, res, next) {
    req.poll = service.remove(req.params.poll);
    next();
  }, printPoll);
  
  router.put('/:poll', function (req, res, next) {
    req.poll = service.update(req.params.poll, req.body);
    next();
  }, printPoll);

  return router;
};
