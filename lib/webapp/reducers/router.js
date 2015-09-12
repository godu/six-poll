import {
  ROUTER_STATE_CHANGE,
  SAVE_POLL_SUCCESS
} from '../constants/actions';

export default (state = null, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE:
      return action.state;

    default:
      return state;
  }
};
