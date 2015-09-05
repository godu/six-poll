var Router = require('express');
var PollService = require('../polls/service');
var StatService = require('./service');
var print = require('../../utils').print;

module.exports = function (app) {
  var statRouter = Router();

  var statService = StatService(app);
  var pollService = PollService(app);

  var printStats = print('stats');

  statRouter.param('poll', function (req, res, next, id) {
    req.poll = pollService.get(id);
    next();
  });

  statRouter.get('/polls/:poll/stats', function (req, res, next) {
    req.poll.then(function (poll) {
      req.stats = statService.find({
        poll_id: poll.get('_id')
      });
      next();
    }, next);
  }, printStats);
  return statRouter;
};
