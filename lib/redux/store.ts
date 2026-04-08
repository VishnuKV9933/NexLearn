import { configureStore } from '@reduxjs/toolkit';
import examReducer from '@/lib/redux/slice/examSlice'; 

export const store = configureStore({
  reducer: {
    exam: examReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;