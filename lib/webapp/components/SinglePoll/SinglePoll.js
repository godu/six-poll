import styles from './styles.styl';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import CSSModules from 'react-css-modules';

// @CSSModules(styles)
export default class SinglePoll extends React.Component {
  static propTypes = {
    poll: PropTypes.object
  }

  render() {
    const { poll } = this.props;

    if (!poll) return null;

    const { id, title } = poll;

    return (
      <div styleName="wrapper">
        <div styleName="title">{title}</div>
        {/*<Link to={`/polls/${id}/edit`}>
          Edit
        </Link>*/}
      </div>
    );
  }
}
