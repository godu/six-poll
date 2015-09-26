import {
  FETCH_POLLS_SUCCESS,
  FETCH_POLL_SUCCESS,
  SAVE_POLL_SUCCESS
} from '../constants/actions';

export default (state = { list: [], items: {} }, action) => {
  switch (action.type) {
    case FETCH_POLLS_SUCCESS:
      const list = action.polls.map(item => item.id);
      const items = {};

      action.polls.forEach(poll => { items[poll.id] = poll; });

      return { list, items };
    case SAVE_POLL_SUCCESS:
    case FETCH_POLL_SUCCESS:
      return {
        items: {
          ...state.items,
          [action.poll.id]: action.poll
        },

        list: state.list
      };

    default:
      return state;
  }
};
