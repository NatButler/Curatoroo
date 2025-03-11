import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSelectedResults } from '../store/searchSlice';
import Results from '../components/Results';
import statuses from '../constants/ajaxStatus';
import collectionNames from '../constants/collectionNames';

function Explore() {
  const dispatch = useDispatch();
  const { searchTerm, selectedResults } = useSelector((state) => state.search);
  const collection1 = useSelector((state) => state.met);
  const collection2 = useSelector((state) => state.va);
  const [query, setQuery] = useState(searchTerm);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (query) {
      dispatch(setSearchTerm(query));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search" className="hidden">
          Search:
        </label>
        <input
          type="search"
          id="search"
          name="search"
          onChange={(ev) => setQuery(ev.target.value)}
          value={query}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {collection1.status === statuses.SEARCHING ||
          (collection2.status === statuses.LOADING && <p>Searching...</p>)}
        {(collection1.currentPageResults.fulfilled?.length > 0 ||
          collection2.currentPageResults.fulfilled?.length > 0) && (
          <>
            <button
              type="button"
              onClick={() => dispatch(setSelectedResults(collectionNames.MET))}
              disabled={!collection1.results.record_count}
            >
              {collection1.results.record_count
                ? `Collection 1 (${collection1.results.record_count})`
                : 'Collection 1 returned 0 results'}
            </button>
            <button
              type="button"
              onClick={() => dispatch(setSelectedResults(collectionNames.VA))}
              disabled={!collection2.results.record_count}
            >
              {collection2.results.record_count
                ? `Collection 2 (${collection2.results.record_count})`
                : 'Collection 2 returned 0 results'}
            </button>
          </>
        )}
      </div>
      {selectedResults === collectionNames.MET && (
        <Results collection={collection1} />
      )}
      {selectedResults === collectionNames.VA && (
        <Results collection={collection2} />
      )}
    </>
  );
}

export default Explore;
