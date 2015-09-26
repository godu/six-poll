import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { ROUTER_STATE_CHANGE } from '../constants/actions';
import reducer from '../reducers';

export function createRedux(initialState, options = {}) {
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production' && !options.silent) {
    middleware.push(createLogger({
      collapsed: true,
      predicate: (getState, action) => !(action.type === ROUTER_STATE_CHANGE)
    }));
  }

  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);
  const store = finalCreateStore(reducer, initialState);

  return store;
}
