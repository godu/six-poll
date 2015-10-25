var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema( {
  poll_id: {
    type: ObjectId,
    ref: 'polls',
    required: true
  },
  option_id:  {
    type: ObjectId,
    require: true
  },
  value: {
    type: Number,
    required: true,
    validate: [{
      validator: contains([-1, 1]),
      msg: 'Path {PATH} must be contain in [-1, 1]'
    }]
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

function contains(arr) {
  return function(val) {
    return ~arr.indexOf(val);
  };
}

module.exports = function(connection) {
  return connection.model('votes', schema);
};
