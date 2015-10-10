import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class Wrapper extends React.Component {
  render() {
    return (
      <div styleName="layout">
        {this.props.children}
      </div>
    );
  }
}
