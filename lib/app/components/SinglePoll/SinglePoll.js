import React, { PropTypes } from 'react';
// import CSSModules from 'react-css-modules';

// import styles from './styles.css';

// @CSSModules(styles)
export default class SinglePoll extends React.Component {
  static propTypes = {
    poll: PropTypes.object
  }

  render() {
    const { poll } = this.props;

    if (!poll) return null;

    const { title, answers = [] } = poll;

    return (
      <div>
        <div>{title}</div>
        <ul>
          {answers.map((answer) => (
            <li key={answer._id}><button >{answer.value}</button></li>
          ))}
        </ul>
      </div>
    );
  }
}
