import { configureStore } from '@reduxjs/toolkit';
import rejectionReducer from '../features/Rejection/rejectionSlice';

export default configureStore({
  reducer: {
    rejection: rejectionReducer,
  },
});
