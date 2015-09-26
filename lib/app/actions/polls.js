import _ from 'lodash';
import axios from 'axios';

import {
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,

  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,

  SAVE_POLL_SUCCESS,
  SAVE_POLL_FAILURE
} from '../constants/actions';

// import getHeaders from '../utils/getHeaders';

const baseUrl = '/api';

export function fetchPolls() {
  return async (dispatch) => {
    try {
      let polls = (await axios.get(`${baseUrl}/polls`)).data;
      polls = polls.map(mapPoll);

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
      poll = mapPoll(poll);

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

export function savePoll(poll) {
  return async (dispatch,) => {
    try {
      // const { auth: { token } } = getState();
      // const headers = getHeaders(token);

      if (poll.id) {
        poll = (await axios.put(`${baseUrl}/polls/${poll.id}`, poll, {
          // headers
        })).data;
      } else {
        poll = (await axios.post(`${baseUrl}/polls`, poll, {
          // headers
        })).data;
      }
      poll = mapPoll(poll);

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

var mapPoll = poll => _.assign(_.omit(poll, '_id'), { id: poll._id });
