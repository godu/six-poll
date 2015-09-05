var VoteModel = require('../votes/model');

module.exports = function (app) {
  var Votes = VoteModel(app);

  return {
    find: function (params, callback) {
      return Votes.aggregate([
        {
          $match: params
        },
        {
          $group: {
            _id: '$answer',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            answer: '$_id',
            count: 1
          }
        }
      ]).exec(callback);
    }
  };
};
