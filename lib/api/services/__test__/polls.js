import test from 'ava';
import createConnection from '../../models';
import createPollService from '../polls';
import { NotFound } from 'http-errors';

const MONGO_URI = 'mongodb://localhost:27017/test';

const db = createConnection();
const pollService = createPollService(db);

test.before('should open connection', t => db.open(MONGO_URI, () => t.end()));
test.after('should close connection', t => db.close(() => t.end()));

test('should find poll', t => {
  return pollService.find().then(polls => {
    t.ok(Array.isArray(polls));
  });
});

test('should create new poll', t => {
  const poll = {
    title: 'foo',
    options: [{
      title: 'bar'
    }, {
      title: 'baz'
    }]
  };
  return pollService.create(poll).then(poll => {
    t.ok(poll);
  });
});

test('should get poll by id', t => {
  const poll = {
    title: 'foo',
    options: [{
      title: 'bar'
    }, {
      title: 'baz'
    }]
  };
  return pollService.create(poll)
  .then(poll => pollService.get(poll._id))
  .then(poll => t.ok(poll));
});

test('should throw error on get falsy id', t => {
  return pollService.get('foo').catch(err => {
    t.ok(err instanceof NotFound);
    return Promise.resolve();
  });
});
