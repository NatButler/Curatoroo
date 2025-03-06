import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import searchReducer, { setSearchTerm } from './searchSlice';
import metReducer, {
  loadObjects,
  searchMetCollection,
  setCurrentPage,
} from './metSlice';
import { setCurrentPage as setVaCurrentPage } from './vaSlice';
import vaReducer, { searchVaCollection } from './vaSlice';
import curateReducer from './curateSlice';

const searchMiddleware = createListenerMiddleware();
const metPageMiddleware = createListenerMiddleware();
const vaPageMiddleware = createListenerMiddleware();

searchMiddleware.startListening({
  actionCreator: setSearchTerm,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(searchMetCollection({ searchTerm: action.payload }));
    listenerApi.dispatch(searchVaCollection({ searchTerm: action.payload }));
  },
});

metPageMiddleware.startListening({
  actionCreator: setCurrentPage,
  effect: async (action, listenerApi) => {
    const { results } = listenerApi.getState().met;
    listenerApi.dispatch(loadObjects(results[results.pages[action.payload]]));
  },
});

vaPageMiddleware.startListening({
  actionCreator: setVaCurrentPage,
  effect: async (action, listenerApi) => {
    const { searchTerm } = listenerApi.getState().search;
    listenerApi.dispatch(
      searchVaCollection({ searchTerm, page: action.payload })
    );
  },
});

export const store = configureStore({
  reducer: {
    search: searchReducer,
    curate: curateReducer,
    met: metReducer,
    va: vaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(searchMiddleware.middleware)
      .prepend(metPageMiddleware.middleware)
      .prepend(vaPageMiddleware.middleware),
});
