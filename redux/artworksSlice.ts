import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artwork } from '../types/artwork';

const artworksSlice = createSlice({
  name: 'artworks',
  initialState: [] as Artwork[],
  reducers: {
    addArtwork: (state, action: PayloadAction<any>) => {
        console.log('addArtwork', action.payload);
      state.push(action.payload);
    },
    updateArtwork: (state, action: PayloadAction<any>) => {
        console.log('updateArtwork', action.payload);
        const { id, ...updates } = action.payload;
        const index = state.findIndex(art => art.id === id);
        if (index !== -1) {
            state[index] = { ...state[index], ...updates };
        }
    },
    deleteArtwork: (state, action: PayloadAction<number>) => {
        console.log('deleteArtwork', action.payload);
        return state.filter(art => art.id !== action.payload);
    },
    addOrUpdateArtwork: (state, action: PayloadAction<any>) => {
        console.log('addOrUpdateArtwork', action.payload);
        const { id, ...updates } = action.payload;
        const index = state.findIndex(art => art.id === id);
        if (index !== -1) {
            state[index] = { ...state[index], ...updates };
        } else {
            state.push(action.payload);
        }
    },
  },
});

export const { addArtwork, updateArtwork, deleteArtwork, addOrUpdateArtwork } = artworksSlice.actions;
export default artworksSlice.reducer;
