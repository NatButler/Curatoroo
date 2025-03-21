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
  error: null,
};

export const searchVaCollection = createAsyncThunk(
  'va/searchVaCollection',
  async ({ searchTerm, page = 1, artistOrMakerFlag }) => {
    if (!searchTerm) {
      return;
    }

    let response;
    if (artistOrMakerFlag) {
      response = await searchCollection(undefined, page, searchTerm);
    } else {
      response = await searchCollection(searchTerm, page);
    }
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
      state.error = null;
    });
    builder.addCase(searchVaCollection.rejected, (state, action) => {
      state.status = statuses.ERROR;
      state.error = action.error;
    });
    builder.addCase(searchVaCollection.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.results = action.payload.info;
      state.currentPageResults = {
        fulfilled: action.payload.records.map((object) => vaObjectMap(object)),
        rejectedCount: 0,
        notPublicDomain: [],
      };
    });
  },
});

export const { setCurrentPage } = vaSlice.actions;

export default vaSlice.reducer;
