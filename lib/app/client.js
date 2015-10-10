import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import Root from './Root';

const history = createHistory();

let rootElement = document.getElementById('app');

ReactDOM.render(
  <Root {...{ history }} />,
  rootElement
);
