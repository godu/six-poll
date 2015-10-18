import '../styles/global.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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

  render() {
    return (
      <Header>
        {this.props.children}
      </Header>
    );
  }
}
