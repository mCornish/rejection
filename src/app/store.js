import { configureStore } from '@reduxjs/toolkit';
import rejectionReducer from '../features/rejection/rejectionSlice';

export default configureStore({
  reducer: {
    rejection: rejectionReducer,
  },
});
