import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../store/metSlice';
import PageNav from '../components/PageNav';
import statuses from '../constants/ajaxStatus';
import ObjectCard from './ObjectCard';

function Results() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const collection = useSelector((state) => state.met);
  const { results, currentPageResults, status, currentPage } = collection;

  const handleNext = () => {
    if (currentPage < results.pages.length - 1) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  if (status === statuses.LOADING) {
    return (
      <h3>
        Loading results {results.pages[currentPage]} for &quot;
        {searchTerm}
        &quot; ({results.total})
      </h3>
    );
  }

  return (
    <div>
      {currentPageResults && (
        <>
          <h3>
            Displaying results {results.pages[currentPage]} for &quot;
            {searchTerm}
            &quot; ({results.total})
          </h3>
          {results?.total > 10 && (
            <PageNav
              prevHandler={handlePrev}
              nextHandler={handleNext}
              currentPage={currentPage}
              pageLength={results.pages.length}
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
      {results?.total > 10 && (
        <PageNav
          prevHandler={handlePrev}
          nextHandler={handleNext}
          currentPage={currentPage}
          pageLength={results.pages.length}
        />
      )}
    </div>
  );
}

export default Results;
