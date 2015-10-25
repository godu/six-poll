import test from 'ava';
import createConnection from '..';

const MONGO_URI = 'mongodb://localhost:27017/test';

const db = createConnection();

test.before('should open connection', t => db.open(MONGO_URI, () => t.end()));
test.after('should close connection', t => db.close(() => t.end()));

test('should attach schema to connection', t => {
  ['polls', 'votes'].forEach( modelName => {
    var Model = db.model(modelName);
    t.ok(Model);
  });
  t.end();
});
