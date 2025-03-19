import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setCurrentPage as setMetCurrentPage } from '../store/metSlice';
import { setCurrentPage as setVaCurrentPage } from '../store/vaSlice';
import { setSelectedObject } from '../store/curateSlice';
import PageNav from '../components/PageNav';
import Collapsible from './Collapsible';
import ObjectCard from './ObjectCard';
import ExhibitionsModal from './ExhiibitionsModal';
import ResultsSlider from './ResultsSlider';
import Loader from './Loader';
import statuses from '../constants/ajaxStatus';
import collectionNames from '../constants/collectionNames';
import './Results.css';

function Results({ collection }) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const { results, currentPageResults, status, currentPage, collectionName } =
    collection;
  const [isExhibiitionModalOpen, setIsExhibitionModalOpen] = useState(false);

  const handleStart = () => {
    if (collectionName === collectionNames.MET) dispatch(setMetCurrentPage(1));
    if (collectionName === collectionNames.VA) dispatch(setVaCurrentPage(1));
  };

  const handleNext = () => {
    if (currentPage < results.pages) {
      if (collectionName === collectionNames.MET)
        dispatch(setMetCurrentPage(currentPage + 1));
      if (collectionName === collectionNames.VA)
        dispatch(setVaCurrentPage(currentPage + 1));
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      if (collectionName === collectionNames.MET)
        dispatch(setMetCurrentPage(currentPage - 1));
      if (collectionName === collectionNames.VA)
        dispatch(setVaCurrentPage(currentPage - 1));
    }
  };

  const handleEnd = () => {
    if (collectionName === collectionNames.MET)
      dispatch(setMetCurrentPage(results.pages));
    if (collectionName === collectionNames.VA)
      dispatch(setVaCurrentPage(results.pages));
  };

  const handleOpenExhibitionModal = (object) => {
    dispatch(setSelectedObject(object));
    setIsExhibitionModalOpen(true);
  };

  const handleCloseExhibitionModal = () => {
    setIsExhibitionModalOpen(false);
    setSelectedObject(null);
  };

  if (!searchTerm) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <div>
      {results.pages > 0 && currentPageResults && (
        <>
          <h3>
            Displaying page {currentPage} of {results.pages} for &quot;
            {searchTerm}
            &quot; ({results.record_count} results)
          </h3>
          {status === statuses.IDLE && (
            <>
              {currentPageResults.rejectedCount > 0 && (
                <p className="error">{`${currentPageResults.rejectedCount} results failed to load`}</p>
              )}
              {currentPageResults.notPublicDomain?.length > 0 && (
                <Collapsible
                  label={`${currentPageResults.notPublicDomain.length} results are not in the public domain`}
                >
                  <ul>
                    {currentPageResults.notPublicDomain.map((result) => (
                      <li key={result.objectID}>
                        {result.title} | {result.artistDisplayName}
                      </li>
                    ))}
                  </ul>
                </Collapsible>
              )}
            </>
          )}
          <ResultsSlider
            key={
              currentPageResults?.fulfilled
                ? currentPageResults?.fulfilled[0]?.objectID
                : undefined
            }
            resultsLength={
              currentPageResults?.fulfilled?.length -
              currentPageResults?.notPublicDomain?.length -
              currentPageResults?.rejectedCount
            }
            itemWidth={265}
          >
            {status === statuses.LOADING ? (
              <Loader darkTheme />
            ) : (
              <>
                {currentPageResults?.fulfilled?.length === 0 && (
                  <p className="message">No results to display</p>
                )}
                <ul className="reset results-list">
                  {currentPageResults?.fulfilled?.map((object) => (
                    <li key={object.objectID}>
                      <ObjectCard object={object}>
                        <button
                          type="button"
                          onClick={() => handleOpenExhibitionModal(object)}
                          className="btn-action"
                        >
                          Add to exhibition
                        </button>
                      </ObjectCard>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ResultsSlider>
        </>
      )}
      {results?.pages > 1 && (
        <PageNav
          prevHandler={handlePrev}
          nextHandler={handleNext}
          startHandler={handleStart}
          endHandler={handleEnd}
          currentPage={currentPage}
          pages={results.pages}
        />
      )}
      <ExhibitionsModal
        isOpen={isExhibiitionModalOpen}
        onClose={handleCloseExhibitionModal}
      />
    </div>
  );
}

export default Results;
