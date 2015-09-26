import 'babel/polyfill';
import React from 'react';
import { createHistory } from 'history';
import Root from './Root';

const history = createHistory();
/*(process.env.NODE_ENV === 'production')
  ? createBrowserHistory()
  : createHashHistory();*/

let rootElement = document.getElementById('app');

React.render(
  <Root {...{ history }} />,
  rootElement
);
