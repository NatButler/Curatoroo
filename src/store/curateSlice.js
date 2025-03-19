import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadResults } from '../api/metApi';
import { loadResults as loadVaResults } from '../api/vaApi';
import { filterExhibits } from '../utils/helpers';
import statuses from '../constants/ajaxStatus';
import collectionNames from '../constants/collectionNames';

const initialState = {
  exhibitions: [],
  selectedExhibitionId: '',
  currentExhibitionObjects: [],
  selectedObject: {},
  status: statuses.IDLE,
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
      });

      return results;
    } catch (err) {
      console.error(err);
    }
  }
);

export const curateSlice = createSlice({
  name: 'curate',
  initialState,
  reducers: {
    addExhibition: (state, action) => {
      state.exhibitions = [
        ...state.exhibitions,
        {
          id: uuidv4(),
          exhibits: [],
          ...action.payload,
        },
      ];
    },
    editExhibition: (state, action) => {
      const exhibition = state.exhibitions.find(
        (exhibition) => exhibition.id === state.selectedExhibitionId
      );

      exhibition.title = action.payload.title;
      exhibition.description = action.payload.description;
      state.selectedExhibitionId = '';
    },
    deleteExhibition: (state, action) => {
      state.exhibitions = state.exhibitions.filter(
        (exhibition) => exhibition.id !== action.payload
      );
      state.selectedExhibitionId = '';
    },
    setSelectedExhibitionId: (state, action) => {
      if (action.payload.id) {
        state.selectedExhibitionId = action.payload.id;
      } else {
        state.selectedExhibitionId = '';
        state.currentExhibitionObjects = [];
      }
    },
    setSelectedObject: (state, action) => {
      state.selectedObject = action.payload;
    },
    addObjectToExhibition: (state, action) => {
      const exhibition = state.exhibitions.find(
        (exhibition) => exhibition.id === action.payload
      );

      exhibition.exhibits = [
        ...exhibition.exhibits,
        {
          objectID: state.selectedObject.objectID,
          collection: state.selectedObject.collection,
        },
      ];

      state.selectedObject = {};
    },
    removeObjectFromExhibition: (state, action) => {
      const exhibition = state.exhibitions.find(
        (exhibition) => exhibition.id === action.payload.exhibitionId
      );

      exhibition.exhibits = filterExhibits(exhibition.exhibits, action);
      state.currentExhibitionObjects = filterExhibits(
        state.currentExhibitionObjects,
        action
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadExhibition.pending, (state) => {
      state.status = statuses.LOADING;
    });
    builder.addCase(loadExhibition.rejected, (state) => {
      state.status = statuses.ERROR;
    });
    builder.addCase(loadExhibition.fulfilled, (state, action) => {
      state.status = statuses.IDLE;
      state.currentExhibitionObjects = action.payload;
    });
  },
});

export const {
  addExhibition,
  editExhibition,
  deleteExhibition,
  setSelectedExhibitionId,
  addObjectToExhibition,
  setSelectedObject,
  removeObjectFromExhibition,
} = curateSlice.actions;

export default curateSlice.reducer;

// Selectors
const selectExhibitions = (state) => state.curate.exhibitions;
const selectSelectedExhibitionId = (state) => state.curate.selectedExhibitionId;
export const selectExhibition = createSelector(
  [selectExhibitions, selectSelectedExhibitionId],
  (exhibitions, selectedId) => {
    return exhibitions.find((exhibition) => exhibition.id === selectedId);
  }
);
const selectSelectedObject = (state) => state.curate.selectedObject;
export const selectExhibitionsToAddObject = createSelector(
  [selectExhibitions, selectSelectedObject],
  (exhibitions, selectedObject) => {
    return exhibitions.filter(
      (exhibition) =>
        !exhibition.exhibits.some(
          (exhibit) =>
            exhibit.objectID === selectedObject.objectID &&
            exhibit.collection === selectedObject.collection
        )
    );
  }
);
