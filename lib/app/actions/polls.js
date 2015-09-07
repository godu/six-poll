export const CREATE_POLL = 'CREATE_POLL';
export const ADD_ANSWER = 'ADD_ANSWER';
export const RESET_NEW_POLL = 'RESET_NEW_POLL';

export const EmptyPoll = {
  title: 'azdazd',
  answer: []
};

export function createPoll() {
  return {
    type: ADD_TODO
  };
}

export function addAnswer(tetextst) {
  return {
    type: ADD_ANSWER,
    text
  };
}

export function resetNewPoll() {
  return {
    type: RESET_NEW_POLL
  };
}
