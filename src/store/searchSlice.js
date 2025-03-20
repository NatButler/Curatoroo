import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  artistOrMakerFlag: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setArtistOrMakerFlag: (state, action) => {
      state.artistOrMakerFlag = action.payload;
    },
  },
});

export const { setSearchTerm, setArtistOrMakerFlag } = searchSlice.actions;

export default searchSlice.reducer;
