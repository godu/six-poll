import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPoll } from '../../actions/polls';
import SinglePoll from '../../components/SinglePoll/SinglePoll';

@connect(state => ({
  polls: state.polls.items
}))
export default class PollsView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    polls: PropTypes.object
  }

  static fillStore(redux, props) {
    return redux.dispatch(fetchPoll(props.params.id));
  }

  render() {
    const poll = this.props.polls[this.props.params.id];

    return (
      poll
        ? <SinglePoll poll={poll} />
        : null
    );
  }
}
