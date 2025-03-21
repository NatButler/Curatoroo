import { createSelector, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { filterExhibits } from '../utils/helpers';

const initialState = {
  exhibitions: [],
  selectedExhibitionId: '',
  selectedObject: null,
};

export const curateSlice = createSlice({
  name: 'curate',
  initialState,
  reducers: {
    setSelectedExhibitionId: (state, action) => {
      if (action.payload.id) {
        state.selectedExhibitionId = action.payload.id;
      } else {
        state.selectedExhibitionId = '';
      }
    },
    addExhibition: (state, action) => {
      if (state.selectedObject) {
        state.exhibitions = [
          ...state.exhibitions,
          {
            id: uuidv4(),
            exhibits: [
              {
                objectID: state.selectedObject.objectID,
                collection: state.selectedObject.collection,
              },
            ],
            ...action.payload,
          },
        ];
        state.selectedObject = null;
      } else {
        state.exhibitions = [
          ...state.exhibitions,
          {
            id: uuidv4(),
            exhibits: [],
            ...action.payload,
          },
        ];
      }
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

      state.selectedObject = null;
    },
    removeObjectFromExhibition: (state, action) => {
      const exhibition = state.exhibitions.find(
        (exhibition) => exhibition.id === action.payload.exhibitionId
      );

      exhibition.exhibits = filterExhibits(exhibition.exhibits, action);
    },
  },
});

export const {
  setSelectedExhibitionId,
  addExhibition,
  editExhibition,
  deleteExhibition,
  addObjectToExhibition,
  setSelectedObject,
  removeObjectFromExhibition,
} = curateSlice.actions;

export default curateSlice.reducer;

// Selectors
export const selectExhibitions = (state) => state.curate.exhibitions;
const selectSelectedObject = (state) => state.curate.selectedObject;
export const selectExhibitionsToAddObject = createSelector(
  [selectExhibitions, selectSelectedObject],
  (exhibitions, selectedObject) => {
    return exhibitions.filter(
      (exhibition) =>
        !exhibition.exhibits.some(
          (exhibit) =>
            exhibit.objectID === selectedObject?.objectID &&
            exhibit.collection === selectedObject?.collection
        )
    );
  }
);

const selectSelectedExhibitionId = (state) => state.curate.selectedExhibitionId;
export const selectExhibition = createSelector(
  [selectExhibitions, selectSelectedExhibitionId],
  (exhibitions, selectedId) => {
    return exhibitions.find((exhibition) => exhibition.id === selectedId);
  }
);
