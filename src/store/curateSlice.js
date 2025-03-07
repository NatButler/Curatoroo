import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  exhibitions: [
    {
      id: '01',
      title: 'Test exhibition',
      description: 'Some blurb to describe the exhibition content.',
      objects: [
        {
          objectID: '436524',
          collection: 'MET',
        },
        {
          objectID: '436162',
          collection: 'MET',
        },
      ],
    },
    {
      id: '02',
      title: 'Test exhibitioon 2',
      description: 'Some more blurb...',
      objects: [
        {
          objectID: 'O1170785',
          collection: 'VA',
        },
      ],
    },
  ],
  selectedExhibitionId: '',
};

export const curateSlice = createSlice({
  name: 'curate',
  initialState,
  reducers: {
    setExhibitions: (state, action) => {
      state.exhibitions = action.payload;
    },
    setSelectedExhibitionId: (state, action) => {
      state.selectedExhibitionId = action.payload;
    },
  },
});

export const { setExhibitions, setSelectedExhibitionId } = curateSlice.actions;

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
