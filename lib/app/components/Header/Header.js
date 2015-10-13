import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class Header extends React.Component {
  render() {
    return (
      <nav>
          <Link
            to="/"
            activeClassName=""
            title="Six-Poll"
          >
          <h1 styleName="title">SIX-POLL</h1>
          </Link>
      </nav>
    );
  }
}
