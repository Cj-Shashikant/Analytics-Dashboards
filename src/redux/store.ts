import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import analyticsDataReducer from './slices/analyticsDataSlice';
import relationReducer from './slices/relationSlice';
import importedDataReducer from './slices/importedDataSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    analyticsData: analyticsDataReducer,
    relation: relationReducer,
    importedData: importedDataReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['filter/setCustomDates'],
        ignoredPaths: ['filter.customStartDate', 'filter.customEndDate'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
