import { CREATE_POLL, ADD_ANSWER, RESET_NEW_POLL } from '../actions/polls';
import { EmptyPoll } from '../actions/polls';


function createNewPoll(state = EmptyPoll, action) {
  switch (action.type) {
  case CREATE_POLL:
    return EmptyPoll;
  case ADD_ANSWER:
    return Object.assign({}, state, {
      answers: state.answers.concat([action.text])
    });
  case RESET_NEW_POLL:
    return EmptyPoll;
  default:
    return state;
  }
}

export default createNewPoll;
