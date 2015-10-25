import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class StatsPoll extends React.Component {
  static propTypes = {
    poll: PropTypes.object
  }

  render() {
    const { poll } = this.props;

    if (!poll) return null;

    const { title, answers = [] } = poll;

    return (
      <div styleName="container">
        <h1 styleName="title">{title}</h1>
        {answers.map((answer) => (
          <a styleName="answer" key={answer._id}>{answer.value}</a>
        ))}
      </div>
    );
  }
}
