import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, fetchStats } from '../../actions/polls';
import StatsPoll from '../../components/StatsPoll/StatsPoll';

@connect(state => ({
  polls: state.polls.items,
  stats: state.polls.stats
}))
export default class PollsStat extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    polls: PropTypes.object,
    stats: PropTypes.object
  }

  static fillStore(redux, props) {
    return Promise.all([
      redux.dispatch(fetchPoll(props.params.id)),
      redux.dispatch(fetchStats(props.params.id))
    ]);
  }

  render() {
    let poll = _.assign(
      {},
      this.props.polls[this.props.params.id]
    );

    poll.answers = poll.answers.map(answer => {
      return _.assign({}, answer, {
        stats: this.props.stats[answer._id] || 0
      });
    });

    return (
      poll
        ? <StatsPoll
          poll={poll}
          onVote={this.handleVote}
        />
        : null
    );
  }
}
