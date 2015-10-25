import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, votePoll } from '../../actions/polls';
import SinglePoll from '../../components/SinglePoll/SinglePoll';

@connect(state => ({
  polls: state.polls.items
}), {
  votePoll
})
export default class PollsView extends Component {
  static propTypes = {
    params: PropTypes.object,
    polls: PropTypes.object
  }

  static fillStore(redux, props) {
    return redux.dispatch(fetchPoll(props.params.id));
  }

  handleVote = (poll, vote) => {
    this.props.votePoll(poll, vote).then(() => this.handleSuccess(poll));
  }

  handleSuccess = (poll) => {
    this.props.history.replaceState(null, `/polls/${ poll._id }/stats`);
  }

  render() {
    const poll = this.props.polls[this.props.params.id];

    return (
      poll
        ? <SinglePoll
          poll={poll}
          onVote={this.handleVote}
        />
        : null
    );
  }
}
