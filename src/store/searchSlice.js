import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedResults: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.selectedResults = null;
    },
    setSelectedResults: (state, action) => {
      state.selectedResults = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedResults } = searchSlice.actions;

export default searchSlice.reducer;
