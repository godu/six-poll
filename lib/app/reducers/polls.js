import {
  FETCH_POLLS_SUCCESS,
  FETCH_POLL_SUCCESS,
  SAVE_POLL_SUCCESS,
  FETCH_STATS_SUCCESS
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
    case FETCH_STATS_SUCCESS:
      var stats = action.stats.reduce((curr, stat) => {
        curr[stat._id] = stat;
        return curr;
      }, {});

      return {
        ...state,
        stats: {
          ...state.stats,
          ...stats
        },

        list: state.list
      };

    default:
      return state;
  }
};
