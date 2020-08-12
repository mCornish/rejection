import { configureStore } from '@reduxjs/toolkit';
import persistState from 'redux-localstorage'
import rejectionReducer from '../features/Rejection/rejectionSlice';

export default configureStore({
  reducer: {
    rejection: rejectionReducer,
  },
  enhancers: [persistState('rejection')]
});
