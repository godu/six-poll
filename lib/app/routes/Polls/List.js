import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../../actions/polls';
import Polls from '../../components/PollsList/PollsList';

@connect(state => ({
  polls: state.polls.list.map(id => state.polls.items[id])
}))
export default class PollsList extends Component {
  static propTypes = {
    polls: PropTypes.array
  }

  static fillStore(redux) {
    return redux.dispatch(fetchPolls());
  }

  render() {
    return (
      <Polls polls={this.props.polls} />
    );
  }
}
