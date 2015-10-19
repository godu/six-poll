import React from 'react';
import CSSModules from 'react-css-modules';

import Navbar from '../Navbar/Navbar';

import styles from './styles.css';

@CSSModules(styles)
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div styleName="container">
          <div styleName="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
