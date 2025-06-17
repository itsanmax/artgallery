// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import artworksReducer from './artworksSlice';

const store = configureStore({
  reducer: {
    artworks: artworksReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;