// import styles from './styles.styl';

import React, { PropTypes } from 'react';
// import CSSModules from 'react-css-modules';

// @CSSModules(styles)
export default class SinglePoll extends React.Component {
  static propTypes = {
    poll: PropTypes.object
  }

  render() {
    const { poll } = this.props;

    if (!poll) return null;

    const { title, answers } = poll;

    return (
      <div styleName="wrapper">
        <div styleName="title">{title}</div>
        {answers.map((answer, index) => (
          <div key={index}>{answer}</div>
        ))}
      </div>
    );
  }
}
