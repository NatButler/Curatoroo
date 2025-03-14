import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeObjectFromExhibition,
  selectExhibition,
  setSelectedExhibitionId,
} from '../store/curateSlice';
import ObjectCard from '../components/ObjectCard';
import statuses from '../constants/ajaxStatus';
import ExhibitionSlider from '../components/ExhibitionSlider';

function Exhibition() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const exhibition = useSelector(selectExhibition);
  const curate = useSelector((state) => state.curate);
  const [currentPos, setCurrentPos] = useState(0);

  useEffect(() => {
    dispatch(setSelectedExhibitionId({ id, load: true }));
  }, [dispatch, id]);

  const handleRemoveObjectFromExhibition = (object) => {
    dispatch(
      removeObjectFromExhibition({ exhibitionId: exhibition.id, object })
    );
  };

  const handleSliderNav = (pos) => {
    setCurrentPos(pos);
  };

  if (curate.status === statuses.LOADING) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {exhibition && (
        <div>
          <h3 className="mt-0 mb-0">Title: {exhibition.title}</h3>
          <p className="mt-0">
            <strong>Description:</strong> {exhibition.description}
          </p>
          <div className="layout-row">
            <div className="layout-column _25">
              <span>{currentPos + 1}.</span>
              <ObjectCard
                object={curate.currentExhibitionObjects[currentPos]}
                dark
              >
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveObjectFromExhibition(
                      curate.currentExhibitionObjects[currentPos]
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
                    setCurrentPos={setCurrentPos}
                    currentPos={currentPos}
                    sliderObjectsCount={curate.currentExhibitionObjects.length}
                  >
                    {curate.currentExhibitionObjects.length > 0 &&
                      curate.currentExhibitionObjects.map((object) => (
                        <li key={object.objectID}>
                          <img src={object.primaryImageSmall} alt="" />
                        </li>
                      ))}
                  </ExhibitionSlider>
                  <ul className="reset slider-nav">
                    {curate.currentExhibitionObjects.map((object, i) => (
                      <li key={object.objectID}>
                        <button
                          type="button"
                          onClick={() => handleSliderNav(i)}
                          className={currentPos === i && 'active'}
                        >{`${i + 1}`}</button>
                      </li>
                    ))}
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
