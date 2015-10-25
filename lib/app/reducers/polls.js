import {
  FETCH_POLLS_SUCCESS,
  FETCH_POLL_SUCCESS,
  SAVE_POLL_SUCCESS,
  FETCH_STATS_SUCCESS
} from '../constants/actions';

export default (state = { list: [], items: {}, stats: {} }, action) => {
  switch (action.type) {
    case FETCH_POLLS_SUCCESS:
      return {
        ...state,
        list: action.polls.map(item => item._id),
        items: action.polls.reduce((items, poll) => {
          items[poll._id] = poll;
          return items;
        }, state.items)
      };
    case SAVE_POLL_SUCCESS:
    case FETCH_POLL_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.poll._id]: action.poll
        }
      };
    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.stats.reduce((stats, stat) => {
            stats[stat.answer_id] = stat.count;
            return stats;
          })
        }
      };

    default:
      return state;
  }
};
