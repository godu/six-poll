import React, { PropTypes } from 'react';
import PieChart from './PieChart';
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

    const { title } = poll;

    return (
      <div styleName="container">
        <h1 styleName="title">{title}</h1>
        <PieChart styleName="content" poll={poll} />
      </div>
    );
  }
}
