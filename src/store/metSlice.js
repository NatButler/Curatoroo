import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadResults, searchCollection } from '../api/metApi';
import statuses from '../constants/ajaxStatus';
import collectionNames from '../constants/collectionNames';

const initialState = {
  results: {
    record_count: 0,
    pageKeys: [],
    pages: 0,
  },
  currentPage: 1,
  currentPageResults: {},
  status: statuses.IDLE,
  collectionName: collectionNames.MET,
};

export const searchMetCollection = createAsyncThunk(
  'met/searchMetCollection',
  async ({ searchTerm }, thunkAPI) => {
    if (!searchTerm) {
      return;
    }

    const response = await searchCollection(searchTerm);
    thunkAPI.dispatch(loadObjects(response[response.pageKeys[0]]));
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
