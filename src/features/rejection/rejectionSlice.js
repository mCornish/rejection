import { createSlice } from '@reduxjs/toolkit';
import cuid from 'cuid';

export const name = 'rejection';
export const statuses = {
  default: 'Unanswered',
  accept: 'Accepted',
  reject: 'Rejected',
};


export const initialState = {
  questions: []
};

export const defaultQuestion = {
  text: 'What\'s up?'
};

export const rejectionSlice = createSlice({
  name,
  initialState,
  reducers: {
    addQuestion: {
      reducer: (state, { payload = defaultQuestion }) => {
        // this is the same, I think?: state.questions = state.questions.push(payload);
        return {...state, questions: state.questions.concat(payload) };
      },
      // you should do anything impure as default values
      // to make your unit testing easier (you can still get)
      // deterministic values for them
      prepare: ({ text, id = cuid(), timestamp = Date.now() } = {}) => ({
        payload: {
          text,
          id,
          status: statuses.default,
          timestamp,
        }
      })
    },
    removeQuestion: (state, { payload }) => {
      if (!payload) return state;
      const questions = state.questions.filter(({ id }) => id !== payload.id);
      return { ...state, questions };
    },
    updateQuestion: (state, { payload }) => {
      if (!payload) return state;
      const applyUpdate = (question) => question.id === payload.id ? payload : question;
      const questions = state.questions.map(applyUpdate);
      return {...state, questions };
    },
  },
});

export const { addQuestion, removeQuestion, updateQuestion } = rejectionSlice.actions;

export const selectQuestions = state => state.rejection.questions;
export const selectScore = state => state.rejection.questions.reduce(questionsToScore, 0);

export default rejectionSlice.reducer;

export const statusPoints = {
  [statuses.default]: 0,
  [statuses.accept]: 1,
  [statuses.reject]: 10,
};

function questionsToScore(score, question) {
  const points = statusPoints[question.status];
  return score + points;
}
