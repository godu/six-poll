import 'babel/polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import { createRedux } from './utils/redux';
import fillStore from './utils/fillStore';
import stringifyLocation from './utils/stringifyLocation';

const env = process.env.NODE_ENV || 'development';

export default function() {
  const app = express();

  app.use(cookieParser());

  const templatePath = path.join(__dirname, 'template.html');
  const templateSource = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  const template = _.template(templateSource);

  app.use((req, res, next) => {
    const location = createLocation(req.path, req.query);
    const store = createRedux({}, { silent: true });
    const routes = createRoutes(store, false);

    match({ routes, location }, async (err, redirectLocation, renderProps) => {
      if (err)
        return next(err);
      if (redirectLocation)
        return res.redirect(stringifyLocation(redirectLocation));
      if (renderProps === null)
        return res.send(404, 'Not found');

      await fillStore(store, renderProps, renderProps.components);

      const html = React.renderToString(
        <Provider store={store}>
          {() => <RoutingContext {...renderProps} />}
        </Provider>
      );
      const initialState = JSON.stringify(store.getState());
      res.send(template({ html, initialState, env }));
    });
  });

  return app;
}
