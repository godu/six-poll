import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import CSSModules from 'react-css-modules';

// import styles from './styles.css';

// @CSSModules(styles)
export default class PollsList extends React.Component {
  static propTypes = {
    polls: PropTypes.array
  }

  render() {
    return (
      <div>
        <Link to={`/polls/new`}>
          Create
        </Link>
        {this.props.polls.map(poll => (
          <div key={poll.id}>
            <Link to={`/polls/${poll.id}`}>
              <h2 className="poll-header-link">{poll.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
