import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class Home extends React.Component {
  render() {
    return (
      <div
        styleName="container"
      >
        <Link
          to="/polls/new"
          styleName="button-create"
          title="Six-Poll"
        >
          <i
            styleName="icon-create"
          />
          Create
        </Link>
      </div>
    );
  }
}
