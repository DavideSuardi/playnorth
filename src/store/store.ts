import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;