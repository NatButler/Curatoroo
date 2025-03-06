import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadResults, searchCollection } from '../api/metApi';
import statuses from '../constants/ajaxStatus';

const initialState = {
  results: {
    total: 0,
    pages: [],
  },
  currentPage: 0,
  currentPageResults: {},
  status: statuses.IDLE,
};

export const searchMetCollection = createAsyncThunk(
  'met/searchMetCollection',
  async ({ searchTerm }, thunkAPI) => {
    if (!searchTerm) {
      return;
    }

    const response = await searchCollection(searchTerm);
    thunkAPI.dispatch(loadObjects(response[response.pages[0]]));
    return response;
  }
);

export const loadObjects = createAsyncThunk('met/loadObjects', async (ids) => {
  const response = await loadResults(ids);
  return response;
});

export const metSlice = createSlice({
  name: 'met',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMetCollection.pending, (state) => {
      state.status = statuses.SEARCHING;
    });
    builder.addCase(searchMetCollection.rejected, (state) => {
      state.status = statuses.ERROR;
    });
    builder.addCase(searchMetCollection.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.results = action.payload;
    });
    builder.addCase(loadObjects.pending, (state) => {
      state.status = statuses.LOADING;
    });
    builder.addCase(loadObjects.rejected, (state) => {
      state.status = statuses.ERROR;
    });
    builder.addCase(loadObjects.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.currentPageResults = action.payload;
    });
  },
});

export const { setCurrentPage } = metSlice.actions;

export default metSlice.reducer;
