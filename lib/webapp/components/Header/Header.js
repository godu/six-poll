// import styles from './styles.styl';

import React from 'react';
import { Link } from 'react-router';
// import CSSModules from 'react-css-modules';

// @CSSModules(styles)
export default class Header extends React.Component {
  render() {
    return (
      <nav styleName="navbar">
          <Link
            to="/"
            activeClassName=""
            title="Six-Poll"
          >
          <span styleName="brand">
            Six-Poll
          </span>
          </Link>
      </nav>
    );
  }
}
