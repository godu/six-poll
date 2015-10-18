import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div styleName="menu-bar">
          <ul styleName="menu-left">
            <li styleName="menu-open">
              <Link
                to="#"
                styleName="menu-link"
                title="Toggle menu"
              >
                <i
                  styleName="menu-open-icon"
                />
              </Link>
            </li>
            <li styleName="menu-item">
              <Link
                to="/polls/new"
                styleName="menu-heading"
                title="Six-Poll"
              >
                <i
                  styleName="menu-create"
                />
              </Link>
            </li>
          </ul>
          <ul styleName="menu-center">
            <li styleName="menu-item">
              <Link
                to="/"
                styleName="menu-heading"
                title="Six-Poll"
              >
                Six-poll
              </Link>
            </li>
          </ul>
        </div>
        <div styleName="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
