import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from 'slices/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;