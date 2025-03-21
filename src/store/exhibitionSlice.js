import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadResults } from '../api/metApi';
import { loadResults as loadVaResults } from '../api/vaApi';
import statuses from '../constants/ajaxStatus';
import collectionNames from '../constants/collectionNames';
import { filterExhibits } from '../utils/helpers';

const initialState = {
  currentExhibitionObjects: [],
  status: statuses.IDLE,
  error: null,
};

export const loadExhibition = createAsyncThunk(
  'curate/loadExhibition',
  async (id, thunkAPI) => {
    if (!id) return;
    const { exhibits } = thunkAPI
      .getState()
      .curate.exhibitions.find((exhibition) => exhibition.id === id);

    try {
      const metResponse = await loadResults(
        exhibits
          .filter((exhibit) => exhibit.collection === collectionNames.MET)
          .map((exhibit) => exhibit.objectID)
      );
      const vaResponse = await loadVaResults(
        exhibits
          .filter((exhibit) => exhibit.collection === collectionNames.VA)
          .map((exhibit) => exhibit.objectID)
      );

      const results = exhibits.map((exhibit) => {
        if (
          metResponse.fulfilled.some(
            (object) => object.objectID === exhibit.objectID
          )
        ) {
          return metResponse.fulfilled.find(
            (object) => object.objectID === exhibit.objectID
          );
        }
        if (
          vaResponse.fulfilled.some(
            (object) => object.objectID === exhibit.objectID
          )
        ) {
          return vaResponse.fulfilled.find(
            (object) => object.objectID === exhibit.objectID
          );
        }
        throw new Error('API error');
      });

      return results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const exhibitionSlice = createSlice({
  name: 'exhibition',
  initialState,
  reducers: {
    removeFromCurrentExhibitionObjects: (state, action) => {
      state.currentExhibitionObjects = filterExhibits(
        state.currentExhibitionObjects,
        action
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadExhibition.pending, (state) => {
      state.status = statuses.LOADING;
      state.error = null;
    });
    builder.addCase(loadExhibition.rejected, (state, action) => {
      state.status = statuses.ERROR;
      state.error = { message: action.payload };
    });
    builder.addCase(loadExhibition.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.currentExhibitionObjects = action.payload;
    });
  },
});

export const { removeFromCurrentExhibitionObjects } = exhibitionSlice.actions;

export default exhibitionSlice.reducer;
