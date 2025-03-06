import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exhibitions: [],
};

export const curateSlice = createSlice({
  name: 'curate',
  initialState,
  reducers: {
    setExhibitions: (state, action) => {
      state.exhibitions = action.payload;
    },
  },
});

export const { setExhibitions } = curateSlice.actions;

export default curateSlice.reducer;
