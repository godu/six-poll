import { combineReducers } from 'redux';
import router from './router';
import polls from './polls';

export default combineReducers({
  router,
  polls
});
