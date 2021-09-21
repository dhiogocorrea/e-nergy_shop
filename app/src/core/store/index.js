import {configureStore} from '@reduxjs/toolkit';
import suppliersReducer from './suppliersSlice';

const store = configureStore({
  reducer: {
    suppliers: suppliersReducer,
  },
});

export default store;
