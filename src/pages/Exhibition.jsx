import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeObjectFromExhibition,
  selectExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';
import { removeFromCurrentExhibitionObjects } from '../store/exhibitionSlice';
import ErrorPage from './ErrorPage';
import ObjectCard from '../components/ObjectCard';
import statuses from '../constants/ajaxStatus';
import ExhibitionSlider from '../components/ExhibitionSlider';
import Loader from '../components/Loader';
import BackLink from '../components/BackLink';
import ChevronLeftIcon from '../assets/chevron_left.svg?react';
import ChevronRightIcon from '../assets/chevron_right.svg?react';
import './Exhibition.css';

function Exhibition() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const exhibition = useSelector(selectExhibition);
  const currentExhibition = useSelector((state) => state.exhibition);
  const [currentPos, setCurrentPos] = useState(0);

  useEffect(() => {
    dispatch(setSelectedExhibitionId({ id, load: true }));
  }, [dispatch, id]);

  const handleRemoveObjectFromExhibition = (object) => {
    dispatch(
      removeObjectFromExhibition({ exhibitionId: exhibition.id, object })
    );
    dispatch(
      removeFromCurrentExhibitionObjects({
        exhibitionId: exhibition.id,
        object,
      })
    );

    if (exhibition.exhibits.length === 1) {
      navigate('/exhibitions');
    }

    // If removing last item from array, set currentPos to previous item
    if (currentPos === exhibition.exhibits.length - 1) {
      setCurrentPos(currentPos - 1);
    }
  };

  const handleSliderNav = (pos) => {
    setCurrentPos(pos);
  };

  const handleSliderControls = (dir) => {
    if (dir === 'prev' && currentPos > 0) {
      setCurrentPos(currentPos - 1);
    }
    if (
      dir === 'next' &&
      currentPos < currentExhibition.currentExhibitionObjects.length - 1
    ) {
      setCurrentPos(currentPos + 1);
    }
  };

  if (currentExhibition.status === statuses.LOADING) {
    return <Loader />;
  }

  if (currentExhibition.status === statuses.ERROR) {
    return <ErrorPage />;
  }

  return (
    <>
      {exhibition && (
        <div>
          <BackLink />
          <h3 className="mt-0 mb-0">Title: {exhibition.title}</h3>
          <p className="mt-0 mb-15">
            <strong>Description:</strong> {exhibition.description}
          </p>
          <div className="layout-row">
            <div className="layout-column _25">
              <nav className="object-card-nav">
                <button
                  type="button"
                  onClick={() => handleSliderControls('prev')}
                  disabled={!currentPos}
                  aria-label="Previous object"
                >
                  <ChevronLeftIcon />
                </button>
                <span>
                  {currentPos + 1} / {exhibition.exhibits.length}
                </span>
                <button
                  type="button"
                  onClick={() => handleSliderControls('next')}
                  disabled={
                    currentPos ===
                    currentExhibition.currentExhibitionObjects.length - 1
                  }
                  aria-label="Next object"
                >
                  <ChevronRightIcon />
                </button>
              </nav>
              <ObjectCard
                object={currentExhibition.currentExhibitionObjects[currentPos]}
                dark
              >
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveObjectFromExhibition(
                      currentExhibition.currentExhibitionObjects[currentPos]
                    )
                  }
                  className="btn-action"
                >
                  Remove from exhibition
                </button>
              </ObjectCard>
            </div>
            <div className="layout-column _75">
              <div className="center">
                <div className="slider-wrapper">
                  <ExhibitionSlider
                    currentPos={currentPos}
                    handleSliderControls={handleSliderControls}
                  >
                    {currentExhibition.currentExhibitionObjects.length > 0 &&
                      currentExhibition.currentExhibitionObjects?.map(
                        (object) => (
                          <li key={object.objectID}>
                            <img
                              src={object.primaryImageSmall}
                              alt={`Image of ${object.title}`}
                            />
                          </li>
                        )
                      )}
                  </ExhibitionSlider>
                  <ul className="reset slider-nav">
                    {currentExhibition.currentExhibitionObjects.map(
                      (object, i) => (
                        <li key={object.objectID}>
                          <button
                            type="button"
                            onClick={() => handleSliderNav(i)}
                            className={currentPos === i ? 'active' : undefined}
                          >{`${i + 1}`}</button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Exhibition;
