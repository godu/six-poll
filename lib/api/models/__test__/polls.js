import test from 'ava';
import mongoose from 'mongoose';
import createConnection from '..';

const MONGO_URI = 'mongodb://localhost:27017/test';

const db = createConnection();
const Poll = db.model('polls');

test.before('should open connection', t => db.open(MONGO_URI, () => t.end()));
test.after('should close connection', t => db.close(() => t.end()));

test('should save correctly', t => {
  const poll = new Poll({
    title: 'foo',
    options: [{
      title: 'bar'
    }, {
      title: 'baz'
    }]
  });
  poll.save(function(err) {
    t.ifError(err);
    t.ok(poll.get('created') instanceof Date);
    t.ok(poll.get('modified') instanceof Date);
    t.ok(poll.get('finish') instanceof Date);
    t.end();
  });
});

test('should not accept more than two options', t => {
  new Poll({
    title: 'foo',
    options: [{
      title: 'bar'
    }, {
      title: 'baz'
    }, {
      title: 'qux'
    }]
  }).save(function(err) {
    t.ok(err instanceof mongoose.Error.ValidationError);
    t.end();
  });
});

test('should not accept less than two options', t => {
  new Poll({
    title: 'foo',
    options: [{
      title: 'bar'
    }]
  }).save(function(err) {
    t.ok(err instanceof mongoose.Error.ValidationError);
    t.end();
  });
});

test('should attend title', t => {
  new Poll({
    options: [{
      title: 'bar'
    }]
  }).save(function(err) {
    t.ok(err instanceof mongoose.Error.ValidationError);
    t.end();
  });
});
