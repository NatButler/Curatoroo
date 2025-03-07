import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage as setMetCurrentPage } from '../store/metSlice';
import { setCurrentPage as setVaCurrentPage } from '../store/vaSlice';
import PageNav from '../components/PageNav';
import statuses from '../constants/ajaxStatus';
import ObjectCard from './ObjectCard';

function Results({ collection }) {
  const dispatch = useDispatch();
  const { searchTerm, selectedResults } = useSelector((state) => state.search);
  const { results, currentPageResults, status, currentPage } = collection;

  const handleNext = () => {
    if (currentPage < results.pages) {
      if (selectedResults === 'MET')
        dispatch(setMetCurrentPage(currentPage + 1));
      if (selectedResults === 'VA') dispatch(setVaCurrentPage(currentPage + 1));
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      if (selectedResults === 'MET')
        dispatch(setMetCurrentPage(currentPage - 1));
      if (selectedResults === 'VA') dispatch(setVaCurrentPage(currentPage - 1));
    }
  };

  if (status === statuses.LOADING) {
    return (
      <h3>
        Loading results page {currentPage} of {results.pages} for &quot;
        {searchTerm}
        &quot; ({results.record_count})
      </h3>
    );
  }

  return (
    <div>
      {results.pages > 0 && currentPageResults && (
        <>
          <h3>
            Displaying results page {currentPage} of {results.pages} for &quot;
            {searchTerm}
            &quot; ({results.record_count})
          </h3>
          {results?.pages > 1 && (
            <PageNav
              prevHandler={handlePrev}
              nextHandler={handleNext}
              currentPage={currentPage}
              pages={results.pages}
            />
          )}
          {currentPageResults.rejectedCount > 0 && (
            <p>{`${currentPageResults.rejectedCount} results failed to load`}</p>
          )}
          {currentPageResults.notPublicDomainCount > 0 && (
            <p>{`${currentPageResults.notPublicDomainCount} results are not in the public domain`}</p>
          )}
          {currentPageResults?.fulfilled?.map((object) => (
            <ObjectCard key={object.objectID} object={object} />
          ))}
        </>
      )}
      {results?.pages > 1 && (
        <PageNav
          prevHandler={handlePrev}
          nextHandler={handleNext}
          currentPage={currentPage}
          pages={results.pages}
        />
      )}
    </div>
  );
}

export default Results;
