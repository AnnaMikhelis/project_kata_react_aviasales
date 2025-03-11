import { configureStore } from '@reduxjs/toolkit';
import checkboxesReducer from './checkboxReducer';
import sortReducer from './sortReducer';
import ticketsReducer from './ticketsReducer';

const store = configureStore({
  reducer: {
    checkboxes: checkboxesReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
