import test from 'ava';
import createConnection from '../../models';
import Poll from '../polls';

const MONGO_URI = 'mongodb://localhost:27017/test';

const db = createConnection();
const poll = Poll(db);

test.before('should open connection', t => db.open(MONGO_URI, () => t.end()));
test.after('should close connection', t => db.close(() => t.end()));

test('should find poll', t => {
  return poll.find().then(polls => {
    t.ok(Array.isArray(polls));
  });
});
