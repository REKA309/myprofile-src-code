// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer:rootReducer,
  // Additional store configuration options if needed
});

export default store;
