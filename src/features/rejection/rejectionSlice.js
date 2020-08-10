import { createSlice } from '@reduxjs/toolkit';

export const name = 'rejection';

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
    addQuestion: (state, { payload = defaultQuestion }) => {
      return {...state, questions: state.questions.concat(payload)};
    },
  },
});

export const { addQuestion } = rejectionSlice.actions;

export const selectQuestions = state => state.rejection.questions;

export default rejectionSlice.reducer;
