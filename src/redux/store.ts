import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import revenueReducer from './slices/revenueSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    revenue: revenueReducer,
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
