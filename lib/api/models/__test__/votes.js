import test from 'ava';
import mongoose from 'mongoose';
import createConnection from '..';
const ObjectId = mongoose.Types.ObjectId;

const MONGO_URI = 'mongodb://localhost:27017/test';

const db = createConnection();
const Vote = db.model('votes');

test.before('should open connection', t => db.open(MONGO_URI, () => t.end()));
test.after('should close connection', t => db.close(() => t.end()));

test('should save correctly', t => {
  const vote = new Vote({
    poll_id: new ObjectId(),
    option_id: new ObjectId(),
    value: 1
  });
  vote.save(function(err) {
    t.ifError(err);
    t.ok(vote.get('created') instanceof Date);
    t.end();
  });
});

test('should not have value as 0', t => {
  new Vote({
    poll_id: new ObjectId(),
    option_id: new ObjectId(),
    value: 0
  }).save(function(err) {
    t.ok(err instanceof mongoose.Error.ValidationError);
    t.end();
  });
});

test('should not have value greather than 1', t => {
  new Vote({
    poll_id: new ObjectId(),
    option_id: new ObjectId(),
    value: 2
  }).save(function(err) {
    t.ok(err instanceof mongoose.Error.ValidationError);
    t.end();
  });
});

test('should not have value lower than -1', t => {
  new Vote({
    poll_id: new ObjectId(),
    option_id: new ObjectId(),
    value: -2
  }).save(function(err) {
    t.ok(err instanceof mongoose.Error.ValidationError);
    t.end();
  });
});
