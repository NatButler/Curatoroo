import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import searchReducer, { setSearchTerm } from './searchSlice';
import metReducer, {
  loadObjects,
  searchMetCollection,
  setCurrentPage,
} from './metSlice';
import vaReducer, {
  searchVaCollection,
  setCurrentPage as setVaCurrentPage,
} from './vaSlice';
import curateReducer, {
  addExhibition,
  addObjectToExhibition,
  deleteExhibition,
  editExhibition,
  loadExhibition,
  removeObjectFromExhibition,
  setSelectedExhibitionId,
} from './curateSlice';
import statuses from '../constants/ajaxStatus';

const searchMiddleware = createListenerMiddleware();
const metPageMiddleware = createListenerMiddleware();
const vaPageMiddleware = createListenerMiddleware();
const exhibitionMiddleware = createListenerMiddleware();
const localStorageMiddleware = createListenerMiddleware();

searchMiddleware.startListening({
  actionCreator: setSearchTerm,
  effect: async (action, listenerApi) => {
    const artistOrMakerFlag = listenerApi.getState().search.artistOrMakerFlag;
    listenerApi.dispatch(
      searchMetCollection({ searchTerm: action.payload, artistOrMakerFlag })
    );
    listenerApi.dispatch(setVaCurrentPage(1));
  },
});

metPageMiddleware.startListening({
  actionCreator: setCurrentPage,
  effect: async (action, listenerApi) => {
    const { results } = listenerApi.getState().met;
    listenerApi.dispatch(
      loadObjects(results[results.pageKeys[action.payload - 1]])
    );
  },
});

vaPageMiddleware.startListening({
  actionCreator: setVaCurrentPage,
  effect: async (action, listenerApi) => {
    const { searchTerm, artistOrMakerFlag } = listenerApi.getState().search;
    listenerApi.dispatch(
      searchVaCollection({
        searchTerm,
        page: action.payload,
        artistOrMakerFlag,
      })
    );
  },
});

exhibitionMiddleware.startListening({
  actionCreator: setSelectedExhibitionId,
  effect: async (action, listenerApi) => {
    if (action.payload.load) {
      listenerApi.dispatch(loadExhibition(action.payload.id));
    }
  },
});

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    addObjectToExhibition,
    removeObjectFromExhibition,
    addExhibition,
    deleteExhibition,
    editExhibition
  ),
  effect: (action, listenerApi) => {
    localStorage.setItem(
      'exhibitions',
      JSON.stringify(listenerApi.getState().curate.exhibitions)
    );
  },
});

const reHydrateExhibitions = () => {
  if (localStorage.getItem('exhibitions') !== null) {
    return JSON.parse(localStorage.getItem('exhibitions'));
  }
};

export const store = configureStore({
  reducer: {
    search: searchReducer,
    curate: curateReducer,
    met: metReducer,
    va: vaReducer,
  },
  preloadedState: {
    curate: {
      exhibitions: reHydrateExhibitions(),
      selectedExhibitionId: '',
      currentExhibitionObjects: [],
      selectedObject: {},
      status: statuses.IDLE,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(searchMiddleware.middleware)
      .prepend(metPageMiddleware.middleware)
      .prepend(vaPageMiddleware.middleware)
      .prepend(exhibitionMiddleware.middleware)
      .prepend(localStorageMiddleware.middleware),
});
