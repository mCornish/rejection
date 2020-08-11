import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

// Can't use due to CRA bug: https://github.com/facebook/create-react-app/pull/8768
// import { nanoid } from 'nanoid';

export const name = 'rejection';
export const statuses = {
  accept: 'Accepted',
  reject: 'Rejected',
  default: 'Unanswered'
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
        return {...state, questions: state.questions.concat(payload) };
      },
      prepare: ({ text } = {}) => ({
        payload: {
          text,
          id: uuid(),
          timestamp: (new Date()).getMilliseconds()
        }
      })
    },
    updateQuestion: (state, { payload }) => {
      const applyUpdate = (question) => question.id === payload.id ? payload : question;
      const questions = state.questions.map(applyUpdate);
      return {...state, questions };
    },
  },
});

export const { addQuestion, updateQuestion } = rejectionSlice.actions;

export const selectQuestions = state => state.rejection.questions;

export default rejectionSlice.reducer;