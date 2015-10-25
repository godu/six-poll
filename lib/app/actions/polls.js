import axios from 'axios';

import {
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,

  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,

  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,

  SAVE_POLL_SUCCESS,
  SAVE_POLL_FAILURE,

  VOTE_POLL_SUCCESS,
  VOTE_POLL_FAILURE
} from '../constants/actions';

// import getHeaders from '../utils/getHeaders';

const baseUrl = '/api';

export function fetchPolls() {
  return async (dispatch) => {
    try {
      let polls = (await axios.get(`${baseUrl}/polls`)).data;

      dispatch({ type: FETCH_POLLS_SUCCESS, polls });
    } catch (error) {
      dispatch({
        type: FETCH_POLLS_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function fetchPoll(id) {
  return async (dispatch) => {
    try {
      // const { auth: { token } } = getState();
      // const headers = getHeaders(token);

      let poll = (await axios.get(`${baseUrl}/polls/${id}`, {
        // headers
      })).data;

      dispatch({ type: FETCH_POLL_SUCCESS, poll });

      return poll;
    } catch (error) {
      dispatch({
        type: FETCH_POLL_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });

      throw error;
    }
  };
}

export function fetchStats(id) {
  return async (dispatch) => {
    try {
      // const { auth: { token } } = getState();
      // const headers = getHeaders(token);

      let stats = (await axios.get(`${baseUrl}/polls/${id}/stats`, {
        // headers
      })).data;

      dispatch({ type: FETCH_STATS_SUCCESS, stats });

      return stats;
    } catch (error) {
      dispatch({
        type: FETCH_STATS_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });

      throw error;
    }
  };
}

export function savePoll(poll) {
  return async (dispatch) => {
    try {
      // const { auth: { token } } = getState();
      // const headers = getHeaders(token);

      if (poll._id) {
        poll = (await axios.put(`${baseUrl}/polls/${poll._id}`, poll, {
          // headers
        })).data;
      } else {
        poll = (await axios.post(`${baseUrl}/polls`, poll, {
          // headers
        })).data;
      }

      dispatch({ type: SAVE_POLL_SUCCESS, poll });

      return poll;
    } catch (error) {
      dispatch({
        type: SAVE_POLL_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });

      throw error;
    }
  };
}

export function votePoll(poll, vote) {
  return async (dispatch) => {
    try {
      vote = await axios.post(`${baseUrl}/polls/${poll._id}/votes`, {
        answer_id: vote._id
      }).data;

      dispatch({ type: VOTE_POLL_SUCCESS, vote });

      return vote;
    } catch (error) {
      dispatch({
        type: VOTE_POLL_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });

      throw error;
    }
  };
}
