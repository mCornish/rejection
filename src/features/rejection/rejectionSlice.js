import { createSlice, nanoid } from '@reduxjs/toolkit';

export const name = 'rejection';
export const statuses = {
  default: 'Unanswered',
  accept: 'Accepted',
  reject: 'Rejected',
};
export const statusPoints = {
  [statuses.default]: 0,
  [statuses.accept]: 1,
  [statuses.reject]: 10,
}

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
          id: nanoid(),
          status: statuses.default,
          timestamp: Number(new Date())
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

function questionsToScore(score, question) {
  const points = statusPoints[question.status];
  return score + points;
}
