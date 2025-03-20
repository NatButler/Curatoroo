import { useState } from 'react';
import { NavLink, useOutlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setArtistOrMakerFlag, setSearchTerm } from '../store/searchSlice';
import ExploreLandingPage from './ExploreLandingPage';
import Loader from '../components/Loader';
import statuses from '../constants/ajaxStatus';
import './Explore.css';

const searchFlags = {
  ALL: '',
  ARTIST_OR_MAKER: 'Artist or maker',
};

function Explore() {
  const dispatch = useDispatch();
  const { searchTerm, artistOrMakerFlag } = useSelector(
    (state) => state.search
  );
  const collection1 = useSelector((state) => state.met);
  const collection2 = useSelector((state) => state.va);
  const [query, setQuery] = useState(searchTerm);
  const outlet = useOutlet();

  const handleSearchOption = (ev) => {
    if (ev.target.value === searchFlags.ARTIST_OR_MAKER) {
      dispatch(setArtistOrMakerFlag(true));
    } else {
      dispatch(setArtistOrMakerFlag(false));
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (query) {
      dispatch(setSearchTerm(query));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-bar">
        <label htmlFor="search" className="visually-hidden">
          Search:
        </label>
        <input
          type="search"
          id="search"
          name="search"
          onChange={(ev) => setQuery(ev.target.value)}
          value={query}
          required
          placeholder="Type to search all collections"
          autoFocus
        />
        <label htmlFor="search-option" className="visually-hidden">
          Search option:
        </label>
        <select
          name="search-option"
          id="search-option"
          onChange={handleSearchOption}
          className="search-options"
          defaultValue={artistOrMakerFlag ? searchFlags.ARTIST_OR_MAKER : ''}
        >
          {Object.entries(searchFlags).map(([key, val]) => (
            <option key={key} value={val}>
              {key}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
      <div>
        {collection1.status === statuses.SEARCHING ||
        collection2.status === statuses.LOADING ? (
          <Loader msg="Searching.." />
        ) : (
          <>
            {searchTerm && (
              <nav className="sub-nav">
                <ul className="reset">
                  <li>
                    <NavLink to="/explore/collection1">
                      {collection1.results.record_count
                        ? `Collection 1 (${collection1.results.record_count})`
                        : 'Collection 1 (0 results)'}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/explore/collection2">
                      {collection2.results.record_count
                        ? `Collection 2 (${collection2.results.record_count})`
                        : 'Collection 2 (0 results)'}
                    </NavLink>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
      {outlet || (
        <ExploreLandingPage
          searchResults={
            collection1.results.record_count > 0 ||
            collection2.results.record_count > 0
          }
        />
      )}
    </>
  );
}

export default Explore;
