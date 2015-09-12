// import styles from './styles.styl';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import CSSModules from 'react-css-modules';

// @CSSModules(styles)
export default class PollsList extends React.Component {
  static propTypes = {
    polls: PropTypes.array
  }

  render() {
    return (
      <div styleName="wrapper">
        <Link to={`/polls/new`}>
          Create
        </Link>
        {this.props.polls
          // .filter(item => item.published)
          .map(poll => {
            // const publishedAt = moment(new Date(post.date));

            return (
              <div key={poll.id}>
                <Link to={`/polls/${poll.id}`}>
                  <h2 className="poll-header-link">{poll.title}</h2>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}
