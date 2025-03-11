import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchCollection } from '../api/vaApi';
import { vaObjectMap } from '../utils/helpers';
import statuses from '../constants/ajaxStatus';
import collectionNames from '../constants/collectionNames';

const initialState = {
  results: {},
  currentPageResults: {},
  currentPage: 1,
  status: statuses.IDLE,
  collectionName: collectionNames.VA,
};

export const searchVaCollection = createAsyncThunk(
  'va/searchVaCollection',
  async ({ searchTerm, page = 1 }) => {
    if (!searchTerm) {
      return;
    }

    const response = await searchCollection(searchTerm, page);
    return response;
  }
);

export const vaSlice = createSlice({
  name: 'va',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchVaCollection.pending, (state) => {
      state.status = statuses.LOADING;
    });
    builder.addCase(searchVaCollection.rejected, (state) => {
      state.status = statuses.ERROR;
    });
    builder.addCase(searchVaCollection.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.results = action.payload.info;
      state.currentPageResults = {
        fulfilled: action.payload.records.map((object) => vaObjectMap(object)),
        rejectedCount: 0,
        notPublicDomainCount: 0,
      };
    });
  },
});

export const { setCurrentPage } = vaSlice.actions;

export default vaSlice.reducer;
