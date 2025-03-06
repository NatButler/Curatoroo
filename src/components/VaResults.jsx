import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../store/vaSlice';
import PageNav from '../components/PageNav';
import ObjectCard from './ObjectCard';

function VaResults() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const collection = useSelector((state) => state.va);
  const { results, currentPageResults, currentPage } = collection;

  const handleNext = () => {
    if (currentPage < results.pages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div>
      {currentPageResults?.fulfilled.length > 0 && (
        <>
          <h3>
            Displaying results page {results.page} of {results.pages} for &quot;
            {searchTerm}
            &quot; ({results.record_count})
          </h3>
          {results?.record_count > 10 && (
            <PageNav
              prevHandler={handlePrev}
              nextHandler={handleNext}
              currentPage={currentPage}
              pageLength={results.pages}
            />
          )}
          {currentPageResults.fulfilled.map((object) => (
            <ObjectCard key={object.objectID} object={object} />
          ))}
        </>
      )}
      {results?.record_count > 10 && (
        <PageNav
          prevHandler={handlePrev}
          nextHandler={handleNext}
          currentPage={currentPage}
          pageLength={results.pages}
        />
      )}
    </div>
  );
}

export default VaResults;
