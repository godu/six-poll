import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, fetchStats } from '../../actions/polls';
import StatsPoll from '../../components/StatsPoll/StatsPoll';

@connect(state => ({
  polls: state.polls.items
}))
export default class PollsStat extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    polls: PropTypes.object
  }

  static fillStore(redux, props) {
    return Promise.all([
      redux.dispatch(fetchPoll(props.params.id)),
      redux.dispatch(fetchStats(props.params.id))
    ]);
  }

  render() {
    const poll = this.props.polls[this.props.params.id];

    return (
      poll
        ? <StatsPoll poll={poll} />
        : null
    );
  }
}
