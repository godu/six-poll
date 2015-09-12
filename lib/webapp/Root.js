import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import routes from './routes';
import { routerStateChange } from './actions/router';
import { createRedux } from './utils/redux';

const store = createRedux();

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Provider store={store}>{() => (
          <Router
            history={this.props.history}
            routes={routes(store, true)}

            onUpdate={function() {
              store.dispatch(routerStateChange(this.state));
            }}
          />
        )}</Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

window.store = store;
