import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { savePoll, fetchPoll } from '../../actions/polls';
import PollEditor from '../../components/PollEditor/PollEditor';

@connect(state => ({
  polls: state.polls.items
}), {
  savePoll,
  fetchPoll
})
export default class PollsEdit extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    polls: PropTypes.object,
    savePoll: PropTypes.func.isRequired
  }

  static fillStore(redux, props) {
    if (props.params.id) {
      return redux.dispatch(fetchPoll(props.params.id));
    }
  }

  handleSave = (poll) => {
    this.props.savePoll(poll).then(this.handleSuccess);
  }

  handleSuccess = (poll) => {
    this.props.history.replaceState(null, `/polls/${ poll.id }`);
  }

  render() {
    let poll;
    const { params: { id } } = this.props;

    if (id) {
      poll = this.props.polls[id];
    } else {
      poll = {
        title: '',
        answers: ['']
      };
    }

    return (
      <PollEditor
        poll={poll}
        onSave={this.handleSave}
      />
    );
  }
}
