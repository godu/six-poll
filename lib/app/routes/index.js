import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Home from '../components/Home/Home';
import NotFound from '../components/NotFound';
import fillStore from '../utils/fillStore';
import * as Polls from './Polls';

const routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/polls/new" component={Polls.Edit} />
    <Route path="/polls/:id" component={Polls.View} />
    <Route path="/polls/:id/edit" component={Polls.Edit}/>

    <Route path="*" component={NotFound} />
  </Route>
);

function walk(routes, cb) {
  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => walk(route, cb));
  }

  return routes;
}

export default (store, client) => {
  return walk(Route.createRouteFromReactElement(routes), route => {
    route.onEnter = (nextState) => {
      if (!client) return;
      fillStore(store, nextState, [route.component]);
    };
  });
};
