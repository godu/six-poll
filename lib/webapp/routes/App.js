// import '../global.styl';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header/Header';

@connect(state => ({
  router: state.router
}))
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const {
      dispatch
    } = this.props;

    return (
      <div>
        <Header
          router={this.context.router}
        />

        {this.props.children}
      </div>
    );
  }
}