import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage as setMetCurrentPage } from '../store/metSlice';
import { setCurrentPage as setVaCurrentPage } from '../store/vaSlice';
import { setSelectedObject } from '../store/curateSlice';
import PageNav from '../components/PageNav';
import Collapsible from './Collapsible';
import ObjectCard from './ObjectCard';
import ExhibitionsModal from './ExhiibitionsModal';
import statuses from '../constants/ajaxStatus';
import collectionNames from '../constants/collectionNames';
import './Results.css';

function Results({ collection }) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const { results, currentPageResults, status, currentPage, collectionName } =
    collection;
  const [isExhibiitionModalOpen, setIsExhibitionModalOpen] = useState(false);

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

  const handleOpenExhibitionModal = (object) => {
    dispatch(setSelectedObject(object));
    setIsExhibitionModalOpen(true);
  };

  const handleCloseExhibitionModal = () => {
    setIsExhibitionModalOpen(false);
    setSelectedObject(null);
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
          <div className="results-list-wrapper">
            <ul className="reset results-list">
              {currentPageResults?.fulfilled?.map((object) => (
                <li key={object.objectID}>
                  <ObjectCard object={object}>
                    <button
                      type="button"
                      onClick={() => handleOpenExhibitionModal(object)}
                    >
                      Add to exhibition
                    </button>
                  </ObjectCard>
                </li>
              ))}
            </ul>
          </div>
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
      <ExhibitionsModal
        isOpen={isExhibiitionModalOpen}
        onClose={handleCloseExhibitionModal}
      />
    </div>
  );
}

export default Results;
