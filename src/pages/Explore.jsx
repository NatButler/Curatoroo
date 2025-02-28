import { useEffect, useState } from 'react';
import { loadResults, searchCollection } from '../api/metApi';
import PageNav from '../components/PageNav';

function Explore() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageResults, setCurrentPageResults] = useState(null);

  useEffect(() => {
    setCurrentPageResults(null);

    const fetchResults = async () => {
      const results = await loadResults(
        searchResults[searchResults.pages[currentPage]]
      );
      setCurrentPageResults(results);
      setIsLoading(false);
    };

    if (searchResults?.total) {
      setIsLoading(true);
      try {
        fetchResults();
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  }, [searchResults, currentPage]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSearchResults(null);
    setCurrentPageResults(null);
    setCurrentPage(0);

    if (query) {
      setIsSearching(true);
      setSearchTerm(query);

      try {
        const results = await searchCollection(query);
        setSearchResults(results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < searchResults.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <h2>Explore</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
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
        {isSearching && <p>Searching...</p>}
        {searchResults?.total > 10 && (
          <PageNav prevHandler={handlePrev} nextHandler={handleNext} />
        )}
        {isLoading && (
          <h3>
            Loading results {searchResults.pages[currentPage]} for &quot;
            {searchTerm}
            &quot; ({searchResults.total})
          </h3>
        )}
        {searchResults && !searchResults.total && (
          <>
            <p>There were no results for &quot;{searchTerm}&quot;</p>
          </>
        )}
        {currentPageResults && (
          <>
            <h3>
              Displaying results {searchResults.pages[currentPage]} for &quot;
              {searchTerm}
              &quot; ({searchResults.total})
            </h3>
            {currentPageResults.rejectedCount > 0 && (
              <p>{`${currentPageResults.rejectedCount} results failed to load`}</p>
            )}
            {currentPageResults.notPublicDomainCount > 0 && (
              <p>{`${currentPageResults.notPublicDomainCount} results are not in the public domain`}</p>
            )}
            {currentPageResults.fulfilled.map((object) => (
              <div key={object.objectID}>
                <p>
                  {object.title}, {object.artistDisplayName}
                </p>
                <p>{object.objectDate}</p>
                <p>{object.medium}</p>
                {object.primaryImageSmall ? (
                  <img src={object.primaryImageSmall} />
                ) : (
                  <p>No image available</p>
                )}
                <hr />
              </div>
            ))}
          </>
        )}
        {searchResults?.total > 10 && (
          <PageNav prevHandler={handlePrev} nextHandler={handleNext} />
        )}
      </div>
    </>
  );
}

export default Explore;
