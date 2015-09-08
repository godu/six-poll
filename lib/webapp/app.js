import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import New from './containers/New';
import newPoll from './reducers/polls';

let store = createStore(newPoll);

let rootElement = document.getElementById('root');

React.render(
  <Provider store={store}>
    {() => <New />}
  </Provider>,
  rootElement
);
