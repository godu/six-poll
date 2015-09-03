/*
var Router = require('express').Router;
var StatsService = require('./service');
var print = require('../../utils').print;

module.exports = function (app) {
  var statsRouter = Router();
  var statsService = StatsService(app);

  var printStats = print('stats');

  statsRouter.get('/polls/:poll/stats', function (req, res, next) {
    next();
  }, printStats);

  return statsRouter;
};
*/
